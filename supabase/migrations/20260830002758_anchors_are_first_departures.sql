-- The roll-forward migration of 2026-08-28 put every departure in the future by
-- hand, which was right at the time and is wrong now that cadences exist. With
-- a rhythm stored, next_departure is the ANCHOR: the date the trip first ran.
-- Leaving the anchors in the future made the roll-forward a no-op, so the
-- feature looked like it worked while never actually doing anything.
--
-- Superseded the same day by spread_departures_by_rhythm, which recomputes
-- these anchors against varied intervals. Kept because it is the step that
-- turned next_departure from a date into an anchor.

update public.packages set next_departure = v.d
from (values
  ('baku-5-short',         date '2026-02-06'),
  ('tbilisi-kazbegi-7',    date '2026-02-20'),
  ('istanbul-bosphorus-5', date '2026-03-13'),
  ('sarajevo-green-6',     date '2026-03-06'),
  ('almaty-mountains-6',   date '2026-03-20'),
  ('trabzon-highlands-6',  date '2026-04-10'),
  ('albania-riviera-7',    date '2026-04-17'),
  ('langkawi-islands-7',   date '2026-04-24'),
  ('marrakech-medina-7',   date '2026-05-08'),
  ('zanzibar-coast-7',     date '2026-05-15'),
  ('samarkand-bukhara-8',  date '2026-06-12')
) as v(slug, d)
where public.packages.slug = v.slug
  and public.packages.departure_interval_days is not null;
