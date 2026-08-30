-- Departure dates that do not go stale.
--
-- next_departure was a single hand-typed date, and on 2026-08-28 the catalogue
-- was days from advertising trips that had already left. Fixing it took a
-- migration, and it would have taken another one every season.
--
-- A trip that runs on a rhythm now stores the rhythm. next_departure becomes
-- the ANCHOR: a real departure, which may be in the past. The live date is
-- computed forward from the anchor and the interval at read time, so the row
-- never needs touching and no scheduled job has to run. lib/departures.ts owns
-- that arithmetic and is verified against a brute-force oracle.
--
-- Deliberately NOT a generated column: Postgres cannot use CURRENT_DATE in one,
-- because a stored generated value has to be stable and "the next departure" is
-- not. Computing at read time is the honest place for a value that depends on
-- when you ask.
--
-- A null interval means a genuine one-off. Its date can pass, on purpose: some
-- departures happen once, and the admin list flags those because they are the
-- only ones that still need a person.

alter table public.packages
  add column if not exists departure_interval_days smallint
    check (departure_interval_days is null or departure_interval_days between 1 and 365);

comment on column public.packages.departure_interval_days is
  'Days between departures. NULL means a one-off trip whose date can pass. The live next departure is computed from next_departure plus a whole number of these, never stored.';

comment on column public.packages.next_departure is
  'The ANCHOR departure, not necessarily the next one. With departure_interval_days set, the live date is computed forward from here at read time; this column may legitimately sit in the past. See lib/departures.ts.';

-- Specimen cadences. Short city breaks run often, longer and more specialist
-- itineraries run monthly, and one trip stays a one-off so the path that can
-- still go stale is exercised rather than theoretical.
update public.packages set departure_interval_days = v.d
from (values
  ('baku-5-short',         14),
  ('istanbul-bosphorus-5', 14),
  ('trabzon-highlands-6',  14),
  ('tbilisi-kazbegi-7',    14),
  ('sarajevo-green-6',     21),
  ('albania-riviera-7',    21),
  ('marrakech-medina-7',   21),
  ('almaty-mountains-6',   28),
  ('langkawi-islands-7',   28),
  ('zanzibar-coast-7',     28),
  ('samarkand-bukhara-8',  28)
) as v(slug, d)
where public.packages.slug = v.slug;

-- maldives-atoll-5 keeps a null interval on purpose.
