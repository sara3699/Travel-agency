-- seed_specimen_catalogue.sql
--
-- The three specimen packages, lifted verbatim from lib/packages.ts so the
-- database and the hard-coded array agree during the swap-over.
--
-- Every row is provenance 'illustrative': invented packages under an invented
-- house brand. No real supplier, no real property, no real price. The renderer
-- reads that enum to pick the call-to-action verb, so none of these can ever
-- say "Book". Catalogue-provenance decision of 2026-08-22.
--
-- Cancellation ladders are invented too, and are the one thing here with no
-- counterpart in lib/packages.ts -- the publish gate requires a ladder, and an
-- illustrative package may carry an illustrative one.
--
-- Idempotent: safe to re-run.

insert into public.packages
  (slug, provenance, nights, hotel_tier, board_basis, price_minor, price_currency,
   party_adults, party_sharing, departure_iata, next_departure, hero_image)
values
  ('tbilisi-kazbegi-7',    'illustrative', 7, 4, 'breakfast', 438000, 'SAR', 2, 2, 'JED', '2026-09-14', '/img/kazbegi.jpg'),
  ('baku-5-short',         'illustrative', 5, 4, 'breakfast', 319000, 'AED', 2, 2, 'DXB', '2026-09-04', '/img/baku.jpg'),
  ('samarkand-bukhara-8',  'illustrative', 8, 4, 'half_board', 742000, 'KWD', 2, 2, 'KWI', '2026-10-02', '/img/samarkand.jpg')
on conflict (slug) do nothing;

-- ar and en are natively written. fr is marked translated, because French
-- content scope is an OPEN decision of 2026-08-23 and claiming otherwise would
-- make natively_written a lie the moment it mattered.
insert into public.package_i18n
  (package_id, locale, destination, destination_latin, country, departure_city,
   difference_line, not_for, natively_written)
select p.id, v.locale, v.destination, v.latin, v.country, v.city, v.diff, v.not_for, v.native
from (values
  ('tbilisi-kazbegi-7','ar','تبليسي',null,'جورجيا','جدة',
   'الوحيدة هنا بسبع ليالٍ منها ليلتان في كازباغي',
   'ليست لك إن كنت تريد منتجعًا شاملًا. فيها يومان طويلان على الطريق ونزل عائلي في الليلة الثالثة.', true),
  ('tbilisi-kazbegi-7','en','Tbilisi','Tbilisi','Georgia','Jeddah',
   'The only 7-night here with two nights in Kazbegi',
   'Not for you if you want a 5-star all-inclusive. Two long driving days and a family-run guesthouse on night three.', true),
  ('tbilisi-kazbegi-7','fr','Tbilissi','Tbilisi','Géorgie','Djeddah',
   'La seule de 7 nuits avec deux nuits à Kazbegi',
   'Pas pour vous si vous voulez un tout-inclus. Deux longues journées de route et une maison d''hôtes la troisième nuit.', false),

  ('baku-5-short','ar','باكو',null,'أذربيجان','دبي',
   'الأرخص من دبي في سبتمبر',
   'ليست لك إن كنت تسافر مع أطفال تحت الثامنة. المشي في المدينة القديمة طويل والأرصفة حجرية.', true),
  ('baku-5-short','en','Baku','Baku','Azerbaijan','Dubai',
   'Cheapest from Dubai in September',
   'Not for you if you travel with under-8s. Long walks in the old city and the paving is rough.', true),
  ('baku-5-short','fr','Bakou','Baku','Azerbaïdjan','Dubaï',
   'La moins chère au départ de Dubaï en septembre',
   'Pas pour vous avec des enfants de moins de 8 ans. Longues marches et pavés irréguliers.', false),

  ('samarkand-bukhara-8','ar','سمرقند',null,'أوزبكستان','الكويت',
   'أطول إقامة هنا، وبنصف إقامة بدل الإفطار فقط',
   'ليست لك إن كنت تريد راحة. أربع مدن في ثماني ليالٍ، وقطاران داخليان مبكران.', true),
  ('samarkand-bukhara-8','en','Samarkand','Samarkand','Uzbekistan','Kuwait City',
   'Longest stay on this page, and half-board rather than breakfast only',
   'Not for you if you want to rest. Four cities in eight nights and two early domestic trains.', true),
  ('samarkand-bukhara-8','fr','Samarcande','Samarkand','Ouzbékistan','Koweït',
   'Le plus long séjour ici, en demi-pension plutôt que petit-déjeuner',
   'Pas pour vous si vous voulez du repos. Quatre villes en huit nuits, deux trains matinaux.', false)
) as v(slug, locale, destination, latin, country, city, diff, not_for, native)
join public.packages p on p.slug = v.slug
on conflict (package_id, locale) do nothing;

insert into public.package_ledger_lines
  (package_id, key, position, included, estimate_minor, estimate_currency, estimate_source)
select p.id, v.key, v.pos, v.included, v.est, v.cur::public.currency_code, v.src
from (values
  ('tbilisi-kazbegi-7','flights',0,true,null::bigint,null::text,null::text),
  ('tbilisi-kazbegi-7','hotel',1,true,null,null,null),
  ('tbilisi-kazbegi-7','transfers',2,true,null,null,null),
  ('tbilisi-kazbegi-7','breakfast',3,true,null,null,null),
  ('tbilisi-kazbegi-7','bags',4,true,null,null,null),
  ('tbilisi-kazbegi-7','visa',5,false,0,'SAR','visa-free for GCC passports'),

  ('baku-5-short','flights',0,true,null,null,null),
  ('baku-5-short','hotel',1,true,null,null,null),
  ('baku-5-short','transfers',2,true,null,null,null),
  ('baku-5-short','breakfast',3,true,null,null,null),
  ('baku-5-short','bags',4,false,14000,'AED','carrier hold-bag fee, checked 2026-08-01'),
  ('baku-5-short','visa',5,false,9500,'AED','ASAN e-visa, published fee'),

  ('samarkand-bukhara-8','flights',0,true,null,null,null),
  ('samarkand-bukhara-8','hotel',1,true,null,null,null),
  ('samarkand-bukhara-8','transfers',2,true,null,null,null),
  ('samarkand-bukhara-8','breakfast',3,true,null,null,null),
  ('samarkand-bukhara-8','bags',4,true,null,null,null),
  ('samarkand-bukhara-8','visa',5,true,null,null,null)
) as v(slug, key, pos, included, est, cur, src)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

-- Verifier and date on the facet row, never on the package.
insert into public.package_facets (package_id, key, state, verified_by, verified_at)
select p.id, v.key, v.state::public.facet_state, v.by, v.at::date
from (values
  ('tbilisi-kazbegi-7','halal_food_nearby','green','Layla H.','2026-06-02'),
  ('tbilisi-kazbegi-7','prayer_room','amber','Layla H.','2026-06-02'),
  ('tbilisi-kazbegi-7','alcohol_free_property','red','Layla H.','2026-06-02'),
  ('tbilisi-kazbegi-7','family_section','na',null::text,null::text),

  ('baku-5-short','halal_food_nearby','green','Omar D.','2026-05-19'),
  ('baku-5-short','prayer_room','green','Omar D.','2026-05-19'),
  ('baku-5-short','alcohol_free_property','red','Omar D.','2026-05-19'),
  ('baku-5-short','family_section','amber','Omar D.','2026-05-19'),

  ('samarkand-bukhara-8','halal_food_nearby','green','Layla H.','2026-07-11'),
  ('samarkand-bukhara-8','prayer_room','green','Layla H.','2026-07-11'),
  ('samarkand-bukhara-8','alcohol_free_property','green','Layla H.','2026-07-11'),
  ('samarkand-bukhara-8','family_section','na',null,null)
) as v(slug, key, state, by, at)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

insert into public.cancellation_rules (package_id, days_before, refund_pct)
select p.id, v.days, v.pct
from (values (60, 90), (30, 50), (14, 25), (7, 0)) as v(days, pct)
cross join public.packages p
where p.slug in ('tbilisi-kazbegi-7','baku-5-short','samarkand-bukhara-8')
on conflict (package_id, days_before) do nothing;

-- Publish last: the gate runs on UPDATE and needs the children to exist first.
update public.packages
   set status = 'published'
 where slug in ('tbilisi-kazbegi-7','baku-5-short','samarkand-bukhara-8')
   and status = 'draft';
