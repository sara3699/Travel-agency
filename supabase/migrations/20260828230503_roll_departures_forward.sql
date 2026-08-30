-- The catalogue's departure dates ran 2026-09-04 to 2026-11-14, set by hand when
-- the packages were seeded. The earliest was seven days out and four departed
-- inside a month, so within a week the site would have advertised trips that had
-- already left, with nothing in the system to notice.
--
-- These are placed rather than shifted. A constant offset would have preserved
-- the spread and emptied the occasion windows, because those match on
-- next_departure against real Hijri and seasonal dates: every trip would have
-- slid out of one window without landing in another.
--
-- The windows, computed with the same islamic-umalqura calendar the app uses:
--   Eid al-Fitr 1448   2027-03-09, span 10 days, matched with 14 days padding
--   Eid al-Adha 1448   2027-05-16, span 10 days, same padding
--   summer-escape      June to September
--   school-holiday     July and August
--
-- Season is respected per destination, since a specimen catalogue that sells
-- Maldives in the monsoon is a catalogue nobody in the region believes:
-- Zanzibar and Langkawi in their dry seasons, Trabzon and Almaty for the Gulf
-- summer, Marrakech in autumn rather than July.
--
-- This is still a manual fix to a manual problem, and it will need doing again.
-- The durable answer is an admin screen (master doc 14.2), not a longer runway.

update public.packages set next_departure = v.d
from (values
  -- autumn and winter, nothing sooner than six weeks out
  ('sarajevo-green-6',     date '2026-10-16'),
  ('marrakech-medina-7',   date '2026-11-06'),
  ('zanzibar-coast-7',     date '2026-12-04'),
  ('maldives-atoll-5',     date '2027-01-15'),
  ('langkawi-islands-7',   date '2027-02-05'),
  -- Eid al-Fitr window
  ('istanbul-bosphorus-5', date '2027-03-05'),
  ('baku-5-short',         date '2027-03-18'),
  -- Eid al-Adha window
  ('tbilisi-kazbegi-7',    date '2027-05-14'),
  ('albania-riviera-7',    date '2027-05-28'),
  -- Gulf summer, the last two also inside the school holiday
  ('trabzon-highlands-6',  date '2027-06-25'),
  ('almaty-mountains-6',   date '2027-07-16'),
  ('samarkand-bukhara-8',  date '2027-08-13')
) as v(slug, d)
where public.packages.slug = v.slug;
