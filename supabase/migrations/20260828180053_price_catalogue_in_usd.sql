-- price_catalogue_in_usd.sql
--
-- Operator's call, 2026-08-28: show every price in US dollars.
--
-- The Gulf currencies here are pegged to the dollar, so this is arithmetic
-- rather than an invented exchange rate: SAR 3.75, AED 3.6725, QAR 3.64 and
-- BHD 0.376 are all fixed pegs. KWD floats against a basket, so its rate is
-- approximate and is the one figure here that will drift.
--
-- What this costs: the catalogue no longer exercises a three-decimal currency,
-- which is what KWD and BHD were doing. The money model still carries the
-- exponent per currency, so the capability is intact; it is simply no longer
-- demonstrated by live rows.
--
-- Applied to the project on 2026-08-28; this file records it so a fresh
-- checkout reproduces the same state.

update public.packages set price_minor = 61400,  price_currency = 'USD' where slug = 'albania-riviera-7';
update public.packages set price_minor = 158300, price_currency = 'USD' where slug = 'almaty-mountains-6';
update public.packages set price_minor = 86800,  price_currency = 'USD' where slug = 'baku-5-short';
update public.packages set price_minor = 77000,  price_currency = 'USD' where slug = 'istanbul-bosphorus-5';
update public.packages set price_minor = 140800, price_currency = 'USD' where slug = 'langkawi-islands-7';
update public.packages set price_minor = 256000, price_currency = 'USD' where slug = 'maldives-atoll-5';
update public.packages set price_minor = 136500, price_currency = 'USD' where slug = 'marrakech-medina-7';
update public.packages set price_minor = 241700, price_currency = 'USD' where slug = 'samarkand-bukhara-8';
update public.packages set price_minor = 81100,  price_currency = 'USD' where slug = 'sarajevo-green-6';
update public.packages set price_minor = 116800, price_currency = 'USD' where slug = 'tbilisi-kazbegi-7';
update public.packages set price_minor = 90900,  price_currency = 'USD' where slug = 'trabzon-highlands-6';
update public.packages set price_minor = 168100, price_currency = 'USD' where slug = 'zanzibar-coast-7';

-- The exclusion estimates have to move with them, or a card would show a
-- dollar total beside a riyal exclusion.
update public.package_ledger_lines l
   set estimate_minor = case l.estimate_currency
         when 'SAR' then round(l.estimate_minor / 3.75)
         when 'AED' then round(l.estimate_minor / 3.6725)
         when 'QAR' then round(l.estimate_minor / 3.64)
         when 'BHD' then round(l.estimate_minor / 0.376 / 10)
         when 'KWD' then round(l.estimate_minor / 0.307 / 10)
         else l.estimate_minor
       end,
       estimate_currency = 'USD'
 where l.estimate_minor is not null
   and l.estimate_currency is not null
   and l.estimate_currency <> 'USD';
