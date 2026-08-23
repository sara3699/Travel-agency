-- catalogue.sql
--
-- The specimen catalogue. Mirrors lib/money.ts and lib/provenance.ts exactly;
-- if you change an enum here, change it there in the same commit.
--
-- Deliberately ABSENT, per the catalogue-provenance decision of 2026-08-22:
-- there is no reviews table, no ratings table, no testimonials table, no
-- licence-number column and no complaint log. On an invented catalogue those
-- are not weaker design, they are fabricated records. They must be absent,
-- not empty -- an empty table is an invitation.

-- ---------------------------------------------------------------- enums ----

-- Must match PROVENANCE in lib/provenance.ts.
create type public.provenance as enum (
  'contracted', 'supplier_live', 'partner_listed', 'public_sample', 'illustrative'
);

-- Must match CurrencyCode in lib/money.ts. KWD, BHD, OMR and TND carry THREE
-- decimal places under ISO 4217, which is why money is never numeric(10,2).
create type public.currency_code as enum (
  'SAR', 'AED', 'KWD', 'QAR', 'BHD', 'OMR', 'EGP', 'TND', 'USD'
);

create type public.board_basis  as enum ('room_only', 'breakfast', 'half_board', 'full_board');
create type public.facet_state  as enum ('green', 'amber', 'red', 'na');
create type public.content_status as enum ('draft', 'published', 'archived');

-- Mirrors EXPONENT in lib/money.ts, for any SQL that has to render money.
create or replace function public.currency_exponent(c public.currency_code)
returns int
language sql
immutable
set search_path = ''
as $$
  select case c when 'KWD' then 3 when 'BHD' then 3 when 'OMR' then 3
                when 'TND' then 3 else 2 end;
$$;

-- ------------------------------------------------------------- packages ----

create table public.packages (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,

  -- DATA-01. NOT NULL and no default: every priced row must state where it
  -- came from, and the renderer picks the call-to-action verb from this.
  -- Only 'contracted' and 'supplier_live' may ever say "Book".
  provenance     public.provenance not null,

  status         public.content_status not null default 'draft',
  published_at   timestamptz,

  nights         int not null check (nights > 0 and nights <= 60),
  hotel_tier     smallint not null check (hotel_tier in (3, 4, 5)),
  board_basis    public.board_basis not null,

  -- All-in, per person, for the stated party. Never a "from" price.
  price_minor    bigint not null check (price_minor >= 0),
  price_currency public.currency_code not null,
  party_adults   smallint not null default 2 check (party_adults  between 1 and 12),
  party_sharing  smallint not null default 2 check (party_sharing between 1 and 12),

  departure_iata char(3) not null check (departure_iata ~ '^[A-Z]{3}$'),
  next_departure date,
  hero_image     text,

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  constraint packages_published_has_date
    check (status <> 'published' or published_at is not null)
);

create index packages_status_idx     on public.packages (status);
create index packages_departure_idx  on public.packages (next_departure);
create index packages_provenance_idx on public.packages (provenance);

create trigger packages_touch_updated_at
  before update on public.packages
  for each row execute function public.touch_updated_at();

-- --------------------------------------------------------------- i18n ------

-- Locale parity as a row count rather than a hope (master doc, Part 14).
-- natively_written records whether a human wrote this locale or whether it was
-- translated, because "Arabic at true parity" is a claim that has to be
-- falsifiable.
create table public.package_i18n (
  package_id        uuid not null references public.packages (id) on delete cascade,
  locale            text not null check (locale in ('ar', 'en', 'fr')),

  destination       text not null,
  destination_latin text,
  country           text not null,
  departure_city    text not null,
  difference_line   text,
  not_for           text,
  summary           text,

  natively_written  boolean not null default false,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  primary key (package_id, locale)
);

create trigger package_i18n_touch_updated_at
  before update on public.package_i18n
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------- ledger (price) ----

-- The trip receipt. Allocates the selling price; it does not expose net cost.
create table public.package_ledger_lines (
  id                uuid primary key default gen_random_uuid(),
  package_id        uuid not null references public.packages (id) on delete cascade,
  key               text not null,
  position          int  not null default 0,
  included          boolean not null,

  estimate_minor    bigint,
  estimate_currency public.currency_code,
  estimate_source   text,

  unique (package_id, key),

  -- An estimate with no source is an invented number.
  constraint ledger_estimate_needs_source
    check (estimate_minor is null or estimate_source is not null),
  constraint ledger_estimate_needs_currency
    check ((estimate_minor is null) = (estimate_currency is null)),
  -- Something included in the price cannot also carry an exclusion estimate.
  constraint ledger_included_has_no_estimate
    check (not included or estimate_minor is null)
);

create index package_ledger_lines_package_idx on public.package_ledger_lines (package_id);

-- ---------------------------------------------------------- faith facets ----

-- The verifier and the date live on the FACET row, never on the package, so a
-- claim about the women-only pool carries its own provenance (master doc 14).
create table public.package_facets (
  id          uuid primary key default gen_random_uuid(),
  package_id  uuid not null references public.packages (id) on delete cascade,
  key         text not null,
  state       public.facet_state not null,
  verified_by text,
  verified_at date,

  unique (package_id, key),

  -- A stated claim must name who checked it and when. 'na' means not checked,
  -- and is the only state allowed to be unattributed.
  constraint facet_claim_carries_its_verifier
    check (state = 'na' or (verified_by is not null and verified_at is not null))
);

create index package_facets_package_idx on public.package_facets (package_id);

-- ----------------------------------------------------- cancellation ladder ----

-- Structured, never prose in a modal and never a linked PDF, so the
-- date-aware refund calculator can be built over it.
create table public.cancellation_rules (
  id          uuid primary key default gen_random_uuid(),
  package_id  uuid not null references public.packages (id) on delete cascade,
  days_before int not null check (days_before >= 0),
  refund_pct  smallint not null check (refund_pct between 0 and 100),

  unique (package_id, days_before)
);

create index cancellation_rules_package_idx on public.cancellation_rules (package_id);

-- ------------------------------------------------------- the publish gate ----

-- Draft states routinely bypass required-field validation, so the gate is
-- hand-written rather than hoped for. Returns the list of reasons a package
-- cannot be published; an empty array means it is complete.
create or replace function public.package_incompleteness(p_package_id uuid)
returns text[]
language sql
stable
set search_path = ''
as $$
  select coalesce(array_agg(reason), array[]::text[])
  from (
    select 'missing hero image' as reason
      from public.packages p
     where p.id = p_package_id and (p.hero_image is null or p.hero_image = '')
    union all
    select 'price is zero'
      from public.packages p
     where p.id = p_package_id and p.price_minor = 0
    union all
    select 'no next departure date'
      from public.packages p
     where p.id = p_package_id and p.next_departure is null
    union all
    -- Arabic and English are the launch locales. French is deliberately not
    -- required here: its content scope is an open decision of 2026-08-23.
    select 'missing ' || l.locale || ' translation'
      from (values ('ar'), ('en')) as l(locale)
     where not exists (
       select 1 from public.package_i18n i
        where i.package_id = p_package_id and i.locale = l.locale
     )
    union all
    select 'no priced inclusions or exclusions'
     where not exists (
       select 1 from public.package_ledger_lines g where g.package_id = p_package_id
     )
    union all
    select 'no cancellation ladder'
     where not exists (
       select 1 from public.cancellation_rules c where c.package_id = p_package_id
     )
  ) reasons;
$$;

create or replace function public.enforce_publish_gate()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  problems text[];
begin
  if new.status = 'published'
     and (tg_op = 'INSERT' or old.status is distinct from 'published') then

    problems := public.package_incompleteness(new.id);

    if array_length(problems, 1) > 0 then
      raise exception 'Cannot publish %: %', new.slug, array_to_string(problems, '; ')
        using errcode = 'check_violation';
    end if;

    new.published_at := coalesce(new.published_at, now());
  end if;

  return new;
end;
$$;

-- AFTER-row timing would be too late to block, BEFORE on insert cannot see
-- child rows that do not exist yet -- so a package is always created as a
-- draft and published by a later update, which is the intended workflow.
create trigger packages_publish_gate
  before update on public.packages
  for each row execute function public.enforce_publish_gate();

-- ------------------------------------------------------------------ RLS ----

alter table public.packages             enable row level security;
alter table public.package_i18n         enable row level security;
alter table public.package_ledger_lines enable row level security;
alter table public.package_facets       enable row level security;
alter table public.cancellation_rules   enable row level security;

-- The world sees published packages only. Drafts are staff-visible.
create policy packages_select_published on public.packages
  for select to anon, authenticated
  using (status = 'published');

create policy packages_select_staff on public.packages
  for select to authenticated
  using (public.is_staff());

create policy packages_admin_write on public.packages
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Child tables inherit their parent's visibility. security definer so the
-- lookup does not re-enter packages' own policies and recurse.
create or replace function public.package_is_published(p_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.packages p
     where p.id = p_id and p.status = 'published'
  );
$$;

create policy package_i18n_select_published on public.package_i18n
  for select to anon, authenticated
  using (public.package_is_published(package_id));
create policy package_i18n_select_staff on public.package_i18n
  for select to authenticated using (public.is_staff());
create policy package_i18n_admin_write on public.package_i18n
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy ledger_select_published on public.package_ledger_lines
  for select to anon, authenticated
  using (public.package_is_published(package_id));
create policy ledger_select_staff on public.package_ledger_lines
  for select to authenticated using (public.is_staff());
create policy ledger_admin_write on public.package_ledger_lines
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy facets_select_published on public.package_facets
  for select to anon, authenticated
  using (public.package_is_published(package_id));
create policy facets_select_staff on public.package_facets
  for select to authenticated using (public.is_staff());
create policy facets_admin_write on public.package_facets
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy cancellation_select_published on public.cancellation_rules
  for select to anon, authenticated
  using (public.package_is_published(package_id));
create policy cancellation_select_staff on public.cancellation_rules
  for select to authenticated using (public.is_staff());
create policy cancellation_admin_write on public.cancellation_rules
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
