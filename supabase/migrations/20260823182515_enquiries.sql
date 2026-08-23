-- enquiries.sql
--
-- The conversion event. An enquiry row is written BEFORE any human replies,
-- so the booking reference matches on both sides of the WhatsApp handoff.
--
-- Three security properties this file is responsible for:
--   1. Anyone may WRITE an enquiry. Almost nobody may READ one. A visitor who
--      can insert must not be able to list other people's enquiries.
--   2. A visitor cannot set their own status, assignment, reference or token.
--      Those are set server-side by trigger, not accepted from the browser.
--   3. Internal notes live in their own table with NO customer-facing policy.
--      Not a hidden column -- a separate table, so one careless select cannot
--      leak "quoted high, he is price-shopping".

create type public.enquiry_status as enum (
  'new', 'assigned', 'responded', 'quoted', 'won', 'lost', 'archived'
);

-- ------------------------------------------------------------ enquiries ----

create table public.enquiries (
  id                 uuid primary key default gen_random_uuid(),

  -- Human-readable, spoken aloud on WhatsApp. Server-generated.
  reference          text not null unique,
  -- Unguessable URL for /q/[token]. No login, no password, no account.
  access_token       text not null unique,

  package_id         uuid references public.packages (id) on delete set null,
  -- Set from the session by trigger, never accepted from the client.
  customer_id        uuid references auth.users (id) on delete set null,

  contact_name       text not null check (length(btrim(contact_name)) between 1 and 120),
  contact_phone      text check (length(contact_phone) <= 32),
  contact_email      text check (length(contact_email) <= 254),

  party_adults       smallint not null default 2 check (party_adults   between 1 and 12),
  party_children     smallint not null default 0 check (party_children between 0 and 12),
  preferred_departure date,
  message            text check (length(message) <= 4000),

  locale             text not null default 'ar' check (locale in ('ar', 'en', 'fr')),
  market             text check (market in ('gcc', 'levant_egypt', 'north_africa', 'other')),

  -- Captured server-side on first request. WebKit caps JavaScript-written
  -- cookies at 24 hours once it sees link decoration, which is exactly what a
  -- UTM-tagged Instagram link is, so client-side attribution is worthless.
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  referrer           text,

  status             public.enquiry_status not null default 'new',
  assigned_to        uuid references auth.users (id) on delete set null,

  received_at        timestamptz not null default now(),
  first_response_at  timestamptz,
  archived_at        timestamptz,

  -- At least one way to reach the person back.
  constraint enquiry_has_a_contact_route
    check (contact_phone is not null or contact_email is not null)
);

create index enquiries_status_idx      on public.enquiries (status);
create index enquiries_assigned_idx    on public.enquiries (assigned_to);
create index enquiries_customer_idx    on public.enquiries (customer_id);
create index enquiries_received_at_idx on public.enquiries (received_at desc);

comment on table public.enquiries is
  'Conversion event. Insertable by anyone, readable by almost nobody.';

-- ----------------------------------------------------------------- notes ----

create table public.enquiry_notes (
  id          uuid primary key default gen_random_uuid(),
  enquiry_id  uuid not null references public.enquiries (id) on delete cascade,
  author_id   uuid references auth.users (id) on delete set null,
  body        text not null check (length(btrim(body)) > 0),
  created_at  timestamptz not null default now()
);

create index enquiry_notes_enquiry_idx on public.enquiry_notes (enquiry_id);

comment on table public.enquiry_notes is
  'Staff-only. There is deliberately no customer-readable policy on this table.';

-- ---------------------------------------------------------------- events ----

create table public.enquiry_events (
  id          uuid primary key default gen_random_uuid(),
  enquiry_id  uuid not null references public.enquiries (id) on delete cascade,
  actor_id    uuid references auth.users (id) on delete set null,
  from_status public.enquiry_status,
  to_status   public.enquiry_status not null,
  occurred_at timestamptz not null default now()
);

create index enquiry_events_enquiry_idx on public.enquiry_events (enquiry_id);

-- ------------------------------------------------- server-side stamping ----

-- Reference and token are generated here, not in the browser, and customer_id
-- comes from the session rather than the request body. A visitor who forges
-- either field is silently overruled.
create or replace function public.stamp_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.reference    := 'TA-' || upper(encode(extensions.gen_random_bytes(4), 'hex'));
  new.access_token := encode(extensions.gen_random_bytes(24), 'hex');
  new.customer_id  := (select auth.uid());
  new.status       := 'new';
  new.assigned_to  := null;
  new.received_at  := now();
  new.first_response_at := null;
  new.archived_at  := null;
  return new;
end;
$$;

create trigger enquiries_stamp_new
  before insert on public.enquiries
  for each row execute function public.stamp_new_enquiry();

-- The first response median is the private operational metric. It can only be
-- honest if the clock is stopped by the system, not typed in by the person
-- being measured.
create or replace function public.log_enquiry_transition()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    if new.status = 'responded' and new.first_response_at is null then
      new.first_response_at := now();
    end if;

    if new.status = 'archived' and new.archived_at is null then
      new.archived_at := now();
    end if;

    insert into public.enquiry_events (enquiry_id, actor_id, from_status, to_status)
    values (new.id, (select auth.uid()), old.status, new.status);
  end if;

  return new;
end;
$$;

create trigger enquiries_log_transition
  before update on public.enquiries
  for each row execute function public.log_enquiry_transition();

-- ----------------------------------------------- column-level privileges ----

-- RLS decides WHICH ROWS. Column grants decide WHICH FIELDS. Both are needed:
-- a policy cannot stop a visitor from setting status = 'won' on their own row.
revoke all on table public.enquiries      from anon, authenticated;
revoke all on table public.enquiry_notes  from anon, authenticated;
revoke all on table public.enquiry_events from anon, authenticated;

-- What a visitor is allowed to put in the box, and nothing else.
grant insert (
  package_id, contact_name, contact_phone, contact_email,
  party_adults, party_children, preferred_departure, message,
  locale, market, utm_source, utm_medium, utm_campaign, referrer
) on table public.enquiries to anon, authenticated;

grant select on table public.enquiries to authenticated;

-- What staff may change. Note the absence of contact fields: staff correct a
-- customer's phone number through a note, not by overwriting what was sent.
grant update (status, assigned_to) on table public.enquiries to authenticated;

grant select, insert on table public.enquiry_notes  to authenticated;
grant select          on table public.enquiry_events to authenticated;

-- ------------------------------------------------------------------ RLS ----

alter table public.enquiries      enable row level security;
alter table public.enquiry_notes  enable row level security;
alter table public.enquiry_events enable row level security;

-- Anyone may send an enquiry. No account, no gate. Refusal list item 21.
create policy enquiries_insert_anyone on public.enquiries
  for insert to anon, authenticated
  with check (true);

-- A signed-in customer sees their own, and only their own.
create policy enquiries_select_own on public.enquiries
  for select to authenticated
  using (customer_id = (select auth.uid()));

create policy enquiries_select_staff on public.enquiries
  for select to authenticated
  using (public.is_staff());

-- Staff may move an enquiry along. An employee may only take it for
-- themselves or release it; only an admin may hand it to someone else.
create policy enquiries_update_staff on public.enquiries
  for update to authenticated
  using (public.is_staff())
  with check (
    public.is_staff()
    and (
      public.is_admin()
      or assigned_to is null
      or assigned_to = (select auth.uid())
    )
  );

-- No delete policy on any of the three tables. Nothing here is ever destroyed;
-- 'archived' is the end state. A deleted enquiry is a lost customer with no
-- record that they existed.

create policy enquiry_notes_staff_read on public.enquiry_notes
  for select to authenticated
  using (public.is_staff());

create policy enquiry_notes_staff_write on public.enquiry_notes
  for insert to authenticated
  with check (public.is_staff() and author_id = (select auth.uid()));

create policy enquiry_events_staff_read on public.enquiry_events
  for select to authenticated
  using (public.is_staff());

-- ------------------------------------------------------ the token journey ----

-- Lets a customer arriving from a WhatsApp link see their own enquiry with no
-- account at all. Returns a deliberately narrow shape: no assignment, no
-- notes, no internal timestamps.
create or replace function public.enquiry_by_token(p_token text)
returns table (
  reference           text,
  status              public.enquiry_status,
  contact_name        text,
  party_adults        smallint,
  party_children      smallint,
  preferred_departure date,
  locale              text,
  received_at         timestamptz,
  package_slug        text
)
language sql
stable
security definer
set search_path = ''
as $$
  select e.reference, e.status, e.contact_name, e.party_adults, e.party_children,
         e.preferred_departure, e.locale, e.received_at, p.slug
    from public.enquiries e
    left join public.packages p on p.id = e.package_id
   where e.access_token = p_token
     and e.archived_at is null
   limit 1;
$$;

revoke execute on function public.enquiry_by_token(text) from public;
grant  execute on function public.enquiry_by_token(text) to anon, authenticated;
