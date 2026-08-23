-- identity_and_roles.sql
--
-- Identity and role model for the three actors: customer, employee, admin.
-- Design decision of 2026-08-23 (approach B): the role lives in ONE table,
-- `user_roles`, and is copied into the login token by an auth hook so that
-- every row-level policy reads it off the token instead of doing a lookup.
--
-- Two properties this file is responsible for and must never lose:
--   1. A user can NEVER change their own role. There is no client-side write
--      policy on user_roles at all; grants happen server-side only.
--   2. Every new signup is a customer. Staff are made deliberately, never by
--      self-service.

-- ---------------------------------------------------------------- enums ----

create type public.app_role as enum ('admin', 'employee', 'customer');

-- --------------------------------------------------------------- tables ----

create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone        text,
  -- Locale is stored so staff know which language to answer in. Not a UI pref.
  locale       text not null default 'ar' check (locale in ('ar', 'en', 'fr')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.profiles is
  'Human-readable record of every authenticated person. Never holds the role.';

create table public.user_roles (
  user_id    uuid not null references auth.users (id) on delete cascade,
  role       public.app_role not null,
  granted_by uuid references auth.users (id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

comment on table public.user_roles is
  'Single source of truth for who is staff. No client write policy exists by '
  'design: a grant can only be made with the server-side secret key.';

create index user_roles_user_id_idx on public.user_roles (user_id);

-- ------------------------------------------------------------ timestamps ----

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- --------------------------------------------------------- signup wiring ----

-- Every new auth user gets a profile and the customer role, atomically with
-- the signup itself. security definer because the signing-up user has no
-- rights on these tables yet.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, phone, locale)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(nullif(new.raw_user_meta_data ->> 'locale', ''), 'ar')
  );

  insert into public.user_roles (user_id, role)
  values (new.id, 'customer')
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------- the hook ----

-- Runs at login. Copies the role out of user_roles and into the access token
-- as app_metadata.user_role. app_metadata is chosen over user_metadata
-- deliberately: user_metadata is writable by the user themselves, which would
-- make the role self-assignable and defeat the entire model.
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
set search_path = ''
as $$
declare
  claims     jsonb;
  found_role public.app_role;
begin
  select ur.role
    into found_role
    from public.user_roles ur
   where ur.user_id = (event ->> 'user_id')::uuid
   -- A user could hold more than one row; the strongest wins.
   order by case ur.role
              when 'admin'    then 1
              when 'employee' then 2
              when 'customer' then 3
            end
   limit 1;

  claims := event -> 'claims';

  if jsonb_typeof(claims -> 'app_metadata') is distinct from 'object' then
    claims := jsonb_set(claims, '{app_metadata}', '{}'::jsonb);
  end if;

  claims := jsonb_set(
    claims,
    '{app_metadata,user_role}',
    to_jsonb(coalesce(found_role::text, 'customer'))
  );

  return jsonb_set(event, '{claims}', claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from authenticated, anon, public;
grant select on table public.user_roles to supabase_auth_admin;

-- ---------------------------------------------------------- role readers ----

-- Reads the role off the token. Falls back to a direct lookup so that the
-- system is correct even before the hook is switched on in the dashboard --
-- slower, but never wrong. security definer so the fallback can read
-- user_roles without tripping that table's own policies.
create or replace function public.auth_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true), '')::jsonb
      -> 'app_metadata' ->> 'user_role',
    (
      select ur.role::text
        from public.user_roles ur
       where ur.user_id = (select auth.uid())
       order by case ur.role
                  when 'admin'    then 1
                  when 'employee' then 2
                  when 'customer' then 3
                end
       limit 1
    )
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.auth_role() in ('admin', 'employee');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.auth_role() = 'admin';
$$;

-- ------------------------------------------------------------------ RLS ----

alter table public.profiles   enable row level security;
alter table public.user_roles enable row level security;

-- profiles: you see and edit yourself; staff can see everyone (they need a
-- name to answer to); only an admin can edit someone else.
create policy profiles_select_self on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy profiles_select_staff on public.profiles
  for select to authenticated
  using (public.is_staff());

create policy profiles_update_self on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy profiles_admin_all on public.profiles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- user_roles: readable, never writable from a browser. The absence of an
-- insert/update/delete policy IS the security control -- do not add one.
create policy user_roles_select_self on public.user_roles
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy user_roles_select_staff on public.user_roles
  for select to authenticated
  using (public.is_staff());

-- The auth service reads this table at login to build the token.
create policy user_roles_auth_admin_read on public.user_roles
  for select to supabase_auth_admin
  using (true);
