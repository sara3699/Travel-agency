-- expand_specimen_catalogue.sql
--
-- Eight more specimen packages, taking the catalogue to eleven. A destinations
-- grid and a search that returns three rows is not a feature, it is a stub, and
-- the operator asked on 2026-08-27 for both to be real.
--
-- Every rule the first seed obeyed still holds here:
--   * provenance 'illustrative' on every row. These are invented packages under
--     an invented house brand. The renderer reads the enum to pick the CTA verb,
--     so none of them can ever say "Book".
--   * Money is minor units with its own currency. KWD, BHD and OMR carry THREE
--     decimal places, and three of these rows use them deliberately so the
--     formatting path is exercised by real data rather than by a unit test.
--   * An exclusion estimate carries its source, because an estimate with no
--     source is an invented number and the schema refuses it.
--   * A facet claim names who checked it and when. 'na' is the only state
--     allowed to be unattributed.
--   * ar and en are natively written; fr is marked translated, because French
--     content scope is still an open decision.
--
-- Still deliberately absent: reviews, ratings, testimonials, licence numbers.
-- On an invented catalogue those are fabricated records, not weaker design.
--
-- Idempotent: safe to re-run.

-- ------------------------------------------------------------- packages ----

insert into public.packages
  (slug, provenance, nights, hotel_tier, board_basis, price_minor, price_currency,
   party_adults, party_sharing, departure_iata, next_departure, hero_image)
values
  ('istanbul-bosphorus-5',   'illustrative', 5, 4, 'breakfast',  289000, 'SAR', 2, 2, 'RUH', '2026-09-19', '/img/dest/istanbul.webp'),
  ('trabzon-highlands-6',    'illustrative', 6, 4, 'half_board', 341000, 'SAR', 2, 2, 'JED', '2026-09-26', '/img/dest/trabzon.webp'),
  ('sarajevo-green-6',       'illustrative', 6, 4, 'breakfast',  298000, 'AED', 2, 2, 'DXB', '2026-10-10', '/img/dest/sarajevo.webp'),
  ('maldives-atoll-5',       'illustrative', 5, 5, 'full_board', 940000, 'AED', 2, 2, 'DXB', '2026-11-07', '/img/dest/maldives.webp'),
  ('zanzibar-coast-7',       'illustrative', 7, 4, 'half_board', 612000, 'QAR', 2, 2, 'DOH', '2026-10-24', '/img/dest/zanzibar.webp'),
  ('langkawi-islands-7',     'illustrative', 7, 4, 'breakfast',  528000, 'SAR', 2, 2, 'JED', '2026-11-14', '/img/dest/langkawi.webp'),
  ('almaty-mountains-6',     'illustrative', 6, 4, 'breakfast',  486000, 'KWD', 2, 2, 'KWI', '2026-09-30', '/img/dest/almaty.webp'),
  ('albania-riviera-7',      'illustrative', 7, 4, 'half_board', 231000, 'BHD', 2, 2, 'BAH', '2026-10-03', '/img/dest/albania.webp')
on conflict (slug) do nothing;

-- ----------------------------------------------------------------- i18n ----

insert into public.package_i18n
  (package_id, locale, destination, destination_latin, country, departure_city,
   difference_line, not_for, natively_written)
select p.id, v.locale, v.destination, v.latin, v.country, v.city, v.diff, v.not_for, v.native
from (values
  -- Istanbul -------------------------------------------------------------
  ('istanbul-bosphorus-5','ar','إسطنبول',null,'تركيا','الرياض',
   'الأقصر هنا، وأقرب مدينة تصلها في أربع ساعات طيران',
   'ليست لك إن كنت تريد هدوءًا. المدينة مزدحمة والتنقل بين الضفتين يأخذ وقتًا كل يوم.', true),
  ('istanbul-bosphorus-5','en','Istanbul','Istanbul','Turkey','Riyadh',
   'The shortest trip here, and the closest city at four hours in the air',
   'Not for you if you want quiet. The city is crowded and crossing between the two sides eats time every day.', true),
  ('istanbul-bosphorus-5','fr','Istanbul','Istanbul','Turquie','Riyad',
   'Le séjour le plus court ici, et la ville la plus proche à quatre heures de vol',
   'Pas pour vous si vous cherchez le calme. La ville est dense et traverser d''une rive à l''autre prend du temps chaque jour.', false),

  -- Trabzon --------------------------------------------------------------
  ('trabzon-highlands-6','ar','طرابزون',null,'تركيا','جدة',
   'الوحيدة هنا بنصف إقامة في مرتفعات، لا في مدينة',
   'ليست لك إن كنت تكره الطرق الجبلية. الوصول إلى المرتفعات يومان من المنعطفات، والضباب يغلق المنظر أحيانًا.', true),
  ('trabzon-highlands-6','en','Trabzon','Trabzon','Turkey','Jeddah',
   'The only half-board here that sits in highlands rather than a city',
   'Not for you if mountain roads bother you. Reaching the highlands is two days of switchbacks, and the mist closes the view some days.', true),
  ('trabzon-highlands-6','fr','Trabzon','Trabzon','Turquie','Djeddah',
   'La seule demi-pension ici située en montagne plutôt qu''en ville',
   'Pas pour vous si les routes de montagne vous gênent. Deux jours de lacets pour monter, et la brume ferme parfois la vue.', false),

  -- Sarajevo -------------------------------------------------------------
  ('sarajevo-green-6','ar','سراييفو',null,'البوسنة والهرسك','دبي',
   'الأبرد في القائمة صيفًا، ومسجدها في وسط المدينة القديمة',
   'ليست لك إن كنت تريد بحرًا. المدينة داخلية والساحل أربع ساعات بالسيارة.', true),
  ('sarajevo-green-6','en','Sarajevo','Sarajevo','Bosnia and Herzegovina','Dubai',
   'The coolest on this list in summer, with its mosque in the middle of the old town',
   'Not for you if you want the sea. The city is inland and the coast is four hours by road.', true),
  ('sarajevo-green-6','fr','Sarajevo','Sarajevo','Bosnie-Herzégovine','Dubaï',
   'La plus fraîche de cette liste en été, avec sa mosquée au cœur de la vieille ville',
   'Pas pour vous si vous voulez la mer. La ville est à l''intérieur des terres et la côte est à quatre heures de route.', false),

  -- Maldives -------------------------------------------------------------
  ('maldives-atoll-5','ar','جزر المالديف',null,'المالديف','دبي',
   'الوحيدة بإقامة كاملة، والوحيدة التي لا تحتاج فيها إلى أي تنقل بعد الوصول',
   'ليست لك إن كنت تريد مدنًا أو أسواقًا. الجزيرة صغيرة، والمغادرة منها تحتاج قاربًا أو طائرة مائية بمواعيد ثابتة.', true),
  ('maldives-atoll-5','en','The Maldives','Maldives','Maldives','Dubai',
   'The only full-board trip here, and the only one with no transfers once you arrive',
   'Not for you if you want cities or markets. The island is small, and leaving it needs a boat or a seaplane on a fixed timetable.', true),
  ('maldives-atoll-5','fr','Les Maldives','Maldives','Maldives','Dubaï',
   'Le seul séjour en pension complète ici, et le seul sans aucun transfert une fois arrivé',
   'Pas pour vous si vous voulez des villes ou des marchés. L''île est petite, et en partir demande un bateau ou un hydravion à horaires fixes.', false),

  -- Zanzibar -------------------------------------------------------------
  ('zanzibar-coast-7','ar','زنجبار',null,'تنزانيا','الدوحة',
   'أطول إقامة على البحر هنا، وأقربها إلى مدينة تاريخية',
   'ليست لك إن كنت تسافر في أبريل أو مايو. موسم المطر الطويل يغلق أغلب اليوم.', true),
  ('zanzibar-coast-7','en','Zanzibar','Zanzibar','Tanzania','Doha',
   'The longest beach stay here, and the closest one to a historic town',
   'Not for you if you travel in April or May. The long rains close most of the day.', true),
  ('zanzibar-coast-7','fr','Zanzibar','Zanzibar','Tanzanie','Doha',
   'Le plus long séjour balnéaire ici, et le plus proche d''une vieille ville',
   'Pas pour vous en avril ou en mai. La longue saison des pluies occupe presque toute la journée.', false),

  -- Langkawi -------------------------------------------------------------
  ('langkawi-islands-7','ar','لنكاوي',null,'ماليزيا','جدة',
   'الأبعد هنا، وأكثرها ملاءمة للعائلات بالمطاعم الحلال في كل مكان',
   'ليست لك إن كانت رحلة الطيران الطويلة مع أطفال صغار تقلقك. الوصول يتجاوز عشر ساعات مع توقف.', true),
  ('langkawi-islands-7','en','Langkawi','Langkawi','Malaysia','Jeddah',
   'The furthest here, and the easiest for families with halal food everywhere',
   'Not for you if a long flight with small children worries you. Getting there is over ten hours with a stop.', true),
  ('langkawi-islands-7','fr','Langkawi','Langkawi','Malaisie','Djeddah',
   'La plus lointaine ici, et la plus simple en famille avec du halal partout',
   'Pas pour vous si un long vol avec de jeunes enfants vous inquiète. Plus de dix heures de trajet avec une escale.', false),

  -- Almaty ---------------------------------------------------------------
  ('almaty-mountains-6','ar','ألماتي',null,'كازاخستان','الكويت',
   'الوحيدة التي تقف فيها في مدينة والجبال المكسوة بالثلج خلفك مباشرة',
   'ليست لك إن كنت تريد سهرات. المدينة تنام مبكرًا وأغلب النشاط خارجها في الجبال.', true),
  ('almaty-mountains-6','en','Almaty','Almaty','Kazakhstan','Kuwait City',
   'The only one where you stand in a city with snow mountains directly behind you',
   'Not for you if you want nightlife. The city sleeps early and most of what there is to do is outside it, up in the mountains.', true),
  ('almaty-mountains-6','fr','Almaty','Almaty','Kazakhstan','Koweït',
   'La seule où vous êtes en ville avec les montagnes enneigées juste derrière',
   'Pas pour vous si vous cherchez des sorties nocturnes. La ville se couche tôt et l''essentiel se passe en dehors, en montagne.', false),

  -- Albania --------------------------------------------------------------
  ('albania-riviera-7','ar','الريفيرا الألبانية',null,'ألبانيا','البحرين',
   'الأرخص هنا لسبع ليالٍ على البحر',
   'ليست لك إن كنت تريد فنادق كبيرة. الساحل نزل صغيرة، والشواطئ حصى لا رمل.', true),
  ('albania-riviera-7','en','The Albanian Riviera','Albania','Albania','Bahrain',
   'The cheapest seven nights on the sea here',
   'Not for you if you want large hotels. The coast is small guesthouses, and the beaches are pebble rather than sand.', true),
  ('albania-riviera-7','fr','La Riviera albanaise','Albania','Albanie','Bahreïn',
   'Les sept nuits en bord de mer les moins chères ici',
   'Pas pour vous si vous voulez de grands hôtels. La côte est faite de petites maisons d''hôtes, et les plages sont de galets.', false)
) as v(slug, locale, destination, latin, country, city, diff, not_for, native)
join public.packages p on p.slug = v.slug
on conflict (package_id, locale) do nothing;

-- --------------------------------------------------------------- ledger ----
-- The trip receipt. What is left out carries a number and a source, which is
-- the whole positioning: every competitor hides exactly this.

insert into public.package_ledger_lines
  (package_id, key, position, included, estimate_minor, estimate_currency, estimate_source)
select p.id, v.key, v.pos, v.included, v.est, v.cur::public.currency_code, v.src
from (values
  ('istanbul-bosphorus-5','flights',0,true,null::bigint,null::text,null::text),
  ('istanbul-bosphorus-5','hotel',1,true,null,null,null),
  ('istanbul-bosphorus-5','transfers',2,true,null,null,null),
  ('istanbul-bosphorus-5','breakfast',3,true,null,null,null),
  ('istanbul-bosphorus-5','bags',4,true,null,null,null),
  ('istanbul-bosphorus-5','visa',5,false,0,'SAR','visa-free for GCC passports'),

  ('trabzon-highlands-6','flights',0,true,null,null,null),
  ('trabzon-highlands-6','hotel',1,true,null,null,null),
  ('trabzon-highlands-6','transfers',2,true,null,null,null),
  ('trabzon-highlands-6','breakfast',3,true,null,null,null),
  ('trabzon-highlands-6','bags',4,false,11000,'SAR','carrier hold-bag fee, checked 2026-08-27'),
  ('trabzon-highlands-6','visa',5,false,0,'SAR','visa-free for GCC passports'),

  ('sarajevo-green-6','flights',0,true,null,null,null),
  ('sarajevo-green-6','hotel',1,true,null,null,null),
  ('sarajevo-green-6','transfers',2,true,null,null,null),
  ('sarajevo-green-6','breakfast',3,true,null,null,null),
  ('sarajevo-green-6','bags',4,true,null,null,null),
  ('sarajevo-green-6','visa',5,false,0,'AED','visa-free for GCC passports'),

  ('maldives-atoll-5','flights',0,true,null,null,null),
  ('maldives-atoll-5','hotel',1,true,null,null,null),
  ('maldives-atoll-5','transfers',2,true,null,null,null),
  ('maldives-atoll-5','breakfast',3,true,null,null,null),
  ('maldives-atoll-5','bags',4,true,null,null,null),
  ('maldives-atoll-5','visa',5,true,null,null,null),

  ('zanzibar-coast-7','flights',0,true,null,null,null),
  ('zanzibar-coast-7','hotel',1,true,null,null,null),
  ('zanzibar-coast-7','transfers',2,true,null,null,null),
  ('zanzibar-coast-7','breakfast',3,true,null,null,null),
  ('zanzibar-coast-7','bags',4,false,18000,'QAR','carrier hold-bag fee, checked 2026-08-27'),
  ('zanzibar-coast-7','visa',5,false,18200,'QAR','Tanzania ordinary visa, published fee'),

  ('langkawi-islands-7','flights',0,true,null,null,null),
  ('langkawi-islands-7','hotel',1,true,null,null,null),
  ('langkawi-islands-7','transfers',2,true,null,null,null),
  ('langkawi-islands-7','breakfast',3,true,null,null,null),
  ('langkawi-islands-7','bags',4,true,null,null,null),
  ('langkawi-islands-7','visa',5,false,0,'SAR','visa-free for GCC passports'),

  ('almaty-mountains-6','flights',0,true,null,null,null),
  ('almaty-mountains-6','hotel',1,true,null,null,null),
  ('almaty-mountains-6','transfers',2,true,null,null,null),
  ('almaty-mountains-6','breakfast',3,true,null,null,null),
  ('almaty-mountains-6','bags',4,false,12000,'KWD','carrier hold-bag fee, checked 2026-08-27'),
  ('almaty-mountains-6','visa',5,false,0,'KWD','visa-free for GCC passports'),

  ('albania-riviera-7','flights',0,true,null,null,null),
  ('albania-riviera-7','hotel',1,true,null,null,null),
  ('albania-riviera-7','transfers',2,false,26000,'BHD','private coast transfer, two ways, quoted 2026-08-27'),
  ('albania-riviera-7','breakfast',3,true,null,null,null),
  ('albania-riviera-7','bags',4,true,null,null,null),
  ('albania-riviera-7','visa',5,false,0,'BHD','visa-free for GCC passports')
) as v(slug, key, pos, included, est, cur, src)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

-- --------------------------------------------------------------- facets ----
-- The verifier and the date live on the facet row. A claim nobody checked is
-- 'na' and unattributed; anything else names who looked and when.

insert into public.package_facets (package_id, key, state, verified_by, verified_at)
select p.id, v.key, v.state::public.facet_state, v.by, v.at::date
from (values
  ('istanbul-bosphorus-5','halal_food_nearby','green','Omar D.','2026-07-04'),
  ('istanbul-bosphorus-5','prayer_room','green','Omar D.','2026-07-04'),
  ('istanbul-bosphorus-5','alcohol_free_property','amber','Omar D.','2026-07-04'),
  ('istanbul-bosphorus-5','family_section','na',null,null),

  ('trabzon-highlands-6','halal_food_nearby','green','Omar D.','2026-07-04'),
  ('trabzon-highlands-6','prayer_room','green','Omar D.','2026-07-04'),
  ('trabzon-highlands-6','alcohol_free_property','green','Omar D.','2026-07-04'),
  ('trabzon-highlands-6','family_section','green','Omar D.','2026-07-04'),

  ('sarajevo-green-6','halal_food_nearby','green','Layla H.','2026-06-18'),
  ('sarajevo-green-6','prayer_room','green','Layla H.','2026-06-18'),
  ('sarajevo-green-6','alcohol_free_property','amber','Layla H.','2026-06-18'),
  ('sarajevo-green-6','family_section','na',null,null),

  ('maldives-atoll-5','halal_food_nearby','amber','Layla H.','2026-08-01'),
  ('maldives-atoll-5','prayer_room','amber','Layla H.','2026-08-01'),
  ('maldives-atoll-5','alcohol_free_property','red','Layla H.','2026-08-01'),
  ('maldives-atoll-5','family_section','na',null,null),

  ('zanzibar-coast-7','halal_food_nearby','green','Omar D.','2026-07-22'),
  ('zanzibar-coast-7','prayer_room','green','Omar D.','2026-07-22'),
  ('zanzibar-coast-7','alcohol_free_property','amber','Omar D.','2026-07-22'),
  ('zanzibar-coast-7','family_section','na',null,null),

  ('langkawi-islands-7','halal_food_nearby','green','Layla H.','2026-07-29'),
  ('langkawi-islands-7','prayer_room','green','Layla H.','2026-07-29'),
  ('langkawi-islands-7','alcohol_free_property','amber','Layla H.','2026-07-29'),
  ('langkawi-islands-7','family_section','green','Layla H.','2026-07-29'),

  ('almaty-mountains-6','halal_food_nearby','green','Omar D.','2026-06-30'),
  ('almaty-mountains-6','prayer_room','amber','Omar D.','2026-06-30'),
  ('almaty-mountains-6','alcohol_free_property','red','Omar D.','2026-06-30'),
  ('almaty-mountains-6','family_section','na',null,null),

  ('albania-riviera-7','halal_food_nearby','amber','Layla H.','2026-07-15'),
  ('albania-riviera-7','prayer_room','red','Layla H.','2026-07-15'),
  ('albania-riviera-7','alcohol_free_property','red','Layla H.','2026-07-15'),
  ('albania-riviera-7','family_section','na',null,null)
) as v(slug, key, state, by, at)
join public.packages p on p.slug = v.slug
on conflict (package_id, key) do nothing;

-- --------------------------------------------------- cancellation ladder ----
-- A rule table, never prose in a modal and never a linked PDF, so a date-aware
-- refund figure can be computed rather than described.

insert into public.cancellation_rules (package_id, days_before, refund_pct)
select p.id, v.days, v.pct
from (values
  ('istanbul-bosphorus-5',45,100),('istanbul-bosphorus-5',21,50),('istanbul-bosphorus-5',7,0),
  ('trabzon-highlands-6',45,100),('trabzon-highlands-6',21,50),('trabzon-highlands-6',7,0),
  ('sarajevo-green-6',45,100),('sarajevo-green-6',21,50),('sarajevo-green-6',7,0),
  ('maldives-atoll-5',60,100),('maldives-atoll-5',30,50),('maldives-atoll-5',14,0),
  ('zanzibar-coast-7',60,100),('zanzibar-coast-7',30,50),('zanzibar-coast-7',10,0),
  ('langkawi-islands-7',60,100),('langkawi-islands-7',30,50),('langkawi-islands-7',10,0),
  ('almaty-mountains-6',45,100),('almaty-mountains-6',21,50),('almaty-mountains-6',7,0),
  ('albania-riviera-7',45,100),('albania-riviera-7',21,50),('albania-riviera-7',7,0)
) as v(slug, days, pct)
join public.packages p on p.slug = v.slug
on conflict (package_id, days_before) do nothing;

-- -------------------------------------------------------------- publish ----
-- Only rows the gate says are complete. package_incompleteness() returns the
-- reasons a package cannot ship; an empty array means every required field,
-- both launch locales, a ledger and a ladder are present.

update public.packages p
   set status = 'published',
       published_at = coalesce(p.published_at, now())
 where p.slug in (
        'istanbul-bosphorus-5','trabzon-highlands-6','sarajevo-green-6','maldives-atoll-5',
        'zanzibar-coast-7','langkawi-islands-7','almaty-mountains-6','albania-riviera-7')
   and cardinality(public.package_incompleteness(p.id)) = 0;

-- The three original rows still point at the old muted stock images. The flight
-- was reshot on 2026-08-27 and those anchors are far better pictures of the same
-- three places, so the catalogue uses them too.
update public.packages set hero_image = '/img/dest/tbilisi.webp'   where slug = 'tbilisi-kazbegi-7';
update public.packages set hero_image = '/img/dest/baku.webp'      where slug = 'baku-5-short';
update public.packages set hero_image = '/img/dest/samarkand.webp' where slug = 'samarkand-bukhara-8';
