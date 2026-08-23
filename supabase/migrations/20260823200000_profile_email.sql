-- profile_email.sql
--
-- Adds email to profiles, 2026-08-23, at the operator's request.
--
-- Why this duplication is correct rather than lazy. Supabase does not expose the
-- auth.users table through PostgREST, deliberately, so there is no way to join a
-- person to their email address from application code or from the table editor.
-- A staff screen listing enquiries or employees could show a name and never an
-- address. Copying the column into profiles is the standard answer.
--
-- Duplication is only safe when something keeps it true, so this adds a trigger
-- on auth.users that follows an email change. Without it, a customer who updates
-- their address leaves a stale one behind for staff to contact.
--
-- Privacy note: profiles carries no anonymous read grant (revoked 2026-08-23) and
-- its policies are self, staff, and admin. Staff seeing a customer's email is
-- intended -- they have to reply to them. Do not widen this to anon.

alter table public.profiles add column if not exists email text;

comment on column public.profiles.email is
  'Mirror of auth.users.email, kept current by the on_auth_user_email_changed '
  'trigger. auth.users is not reachable through the API, so this is the only way '
  'a staff screen can show an address. Never written by hand.';

-- Backfill everyone who already exists.
update public.profiles p
   set email = u.email
  from auth.users u
 where u.id = p.id
   and p.email is distinct from u.email;

create index if not exists profiles_email_idx on public.profiles (email);

-- New signups: capture it at creation alongside the name and locale.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name, phone, locale)
  values (
    new.id,
    new.email,
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

-- Existing users who change their address.
create or replace function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_email_changed on auth.users;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (new.email is distinct from old.email)
  execute function public.sync_profile_email();

-- Trigger bodies are not part of the public API.
revoke execute on function public.sync_profile_email() from anon, authenticated, public;
