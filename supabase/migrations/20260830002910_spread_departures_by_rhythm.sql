-- Every cadenced trip had converged onto two September dates, which would have
-- made the listing and the calendar look broken while being arithmetically
-- correct. The cause is not the anchors: a trip's next departure can never be
-- further out than one interval, so a fortnightly trip always departs within a
-- fortnight and no anchor can change that.
--
-- The spread has to come from the RHYTHM, which is also how a real operator
-- runs. Short city breaks go often. An eight night Samarkand itinerary with a
-- guide does not; it goes quarterly. So the intervals now range from a
-- fortnight to twelve weeks, and the next departures fall across eleven weeks
-- instead of two.
--
-- Anchors are back-computed so each trip's next departure lands where intended,
-- and sit roughly two hundred days in the past, which is where the first run of
-- a trip that has been going since spring would actually be.

update public.packages set next_departure = v.d, departure_interval_days = v.iv
from (values
  ('baku-5-short',         date '2026-02-07', 14),
  ('istanbul-bosphorus-5', date '2026-02-14', 14),
  ('tbilisi-kazbegi-7',    date '2026-02-18', 21),
  ('trabzon-highlands-6',  date '2026-02-21', 21),
  ('sarajevo-green-6',     date '2026-02-12', 28),
  ('albania-riviera-7',    date '2026-02-14', 28),
  ('marrakech-medina-7',   date '2026-03-07', 42),
  ('almaty-mountains-6',   date '2026-03-14', 42),
  ('langkawi-islands-7',   date '2026-03-07', 56),
  ('zanzibar-coast-7',     date '2026-03-14', 56),
  ('samarkand-bukhara-8',  date '2026-03-07', 84)
) as v(slug, d, iv)
where public.packages.slug = v.slug;

-- maldives-atoll-5 stays a one-off on a future date. It is the only row that
-- can still fall out of date, which is what the admin list flags.
