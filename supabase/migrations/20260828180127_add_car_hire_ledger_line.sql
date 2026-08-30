-- add_car_hire_ledger_line.sql
--
-- Operator asked on 2026-08-28 for hotels and car hire to be visible.
--
-- The hotel was already a ledger line on every package. Car hire was not, and
-- leaving it off is exactly the omission this ledger exists to prevent: a
-- traveller who needs a car finds out the cost after the quote rather than on
-- the card. So it is added as a line that is NOT included, with an estimate and
-- a source, like every other exclusion.
--
-- The estimate is a per-person share on the party assumption the package
-- carries (two sharing a car), because every other figure on the card is per
-- person and mixing units would be worse than omitting it.
--
-- Idempotent: safe to re-run.

insert into public.package_ledger_lines
  (package_id, key, position, included, estimate_minor, estimate_currency, estimate_source)
select p.id, 'car', 6, false, v.est, 'USD'::public.currency_code,
       'indicative compact-class daily rate, per person on two sharing, checked 2026-08-28'
from (values
  ('albania-riviera-7',    14000),
  ('almaty-mountains-6',   16500),
  ('baku-5-short',         11000),
  ('istanbul-bosphorus-5',  9500),
  ('langkawi-islands-7',   12500),
  ('maldives-atoll-5',         0),
  ('marrakech-medina-7',   15000),
  ('samarkand-bukhara-8',  17500),
  ('sarajevo-green-6',     13000),
  ('tbilisi-kazbegi-7',    15500),
  ('trabzon-highlands-6',  13500),
  ('zanzibar-coast-7',     14500)
) as v(slug, est)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;
