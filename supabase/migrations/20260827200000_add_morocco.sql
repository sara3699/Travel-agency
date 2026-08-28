-- add_morocco.sql
--
-- A twelfth specimen package, and the first in North Africa. The operator asked
-- on 2026-08-27 for another country on the flight rail; the rail must never name
-- a country the catalogue cannot actually sell, so the country is added here
-- first and the label follows.
--
-- Same rules as the two seeds before it: provenance 'illustrative', money in
-- minor units, every exclusion estimate carries its source, every facet claim
-- names who checked it and when, ar and en natively written and fr marked
-- translated. No reviews, no ratings, no licence number.
--
-- Idempotent: safe to re-run.

insert into public.packages
  (slug, provenance, nights, hotel_tier, board_basis, price_minor, price_currency,
   party_adults, party_sharing, departure_iata, next_departure, hero_image)
values
  ('marrakech-medina-7', 'illustrative', 7, 4, 'breakfast', 512000, 'SAR', 2, 2, 'JED', '2026-10-24', '/img/dest/marrakech.webp')
on conflict (slug) do nothing;

insert into public.package_i18n
  (package_id, locale, destination, destination_latin, country, departure_city,
   difference_line, not_for, natively_written)
select p.id, v.locale, v.destination, v.latin, v.country, v.city, v.diff, v.not_for, v.native
from (values
  ('marrakech-medina-7','ar','مراكش',null,'المغرب','جدة',
   'الوحيدة هنا بإقامة داخل المدينة القديمة، في رياض',
   'ليست لك إن كنت تسافر بحقائب كبيرة. السيارات لا تصل إلى باب الرياض، وآخر مئة متر مشيًا على أرض غير مستوية.', true),
  ('marrakech-medina-7','en','Marrakech','Marrakech','Morocco','Jeddah',
   'The only trip here staying inside the medina, in a riad',
   'Not for you if you travel with large cases. Cars cannot reach the riad door and the last hundred metres are on foot over uneven ground.', true),
  ('marrakech-medina-7','fr','Marrakech','Marrakech','Maroc','Djeddah',
   'Le seul séjour ici à l''intérieur de la médina, dans un riad',
   'Pas pour vous avec de grandes valises. Les voitures n''atteignent pas la porte du riad et les cent derniers mètres se font à pied sur un sol irrégulier.', false)
) as v(slug, locale, destination, latin, country, city, diff, not_for, native)
join public.packages p on p.slug = v.slug
on conflict (package_id, locale) do nothing;

insert into public.package_ledger_lines
  (package_id, key, position, included, estimate_minor, estimate_currency, estimate_source)
select p.id, v.key, v.pos, v.included, v.est, v.cur::public.currency_code, v.src
from (values
  ('marrakech-medina-7','flights',0,true,null::bigint,null::text,null::text),
  ('marrakech-medina-7','hotel',1,true,null,null,null),
  ('marrakech-medina-7','transfers',2,true,null,null,null),
  ('marrakech-medina-7','breakfast',3,true,null,null,null),
  ('marrakech-medina-7','bags',4,true,null,null,null),
  ('marrakech-medina-7','visa',5,false,0,'SAR','visa-free for GCC passports, checked 2026-08-27')
) as v(slug, key, pos, included, est, cur, src)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

insert into public.package_facets (package_id, key, state, verified_by, verified_at)
select p.id, v.key, v.state::public.facet_state, v.by, v.at::date
from (values
  ('marrakech-medina-7','halal_food_nearby','green','Layla H.','2026-07-16'),
  ('marrakech-medina-7','prayer_room','green','Layla H.','2026-07-16'),
  ('marrakech-medina-7','alcohol_free_property','amber','Layla H.','2026-07-16'),
  ('marrakech-medina-7','family_section','na',null,null)
) as v(slug, key, state, by, at)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

insert into public.cancellation_rules (package_id, days_before, refund_pct)
select p.id, v.days, v.pct
from (values
  ('marrakech-medina-7',45,100),('marrakech-medina-7',21,50),('marrakech-medina-7',7,0)
) as v(slug, days, pct)
join public.packages p on p.slug = v.slug
on conflict (package_id, days_before) do nothing;

update public.packages p
   set status = 'published',
       published_at = coalesce(p.published_at, now())
 where p.slug = 'marrakech-medina-7'
   and cardinality(public.package_incompleteness(p.id)) = 0;
