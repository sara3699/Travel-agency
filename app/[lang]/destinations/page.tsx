import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { TripRow } from '@/components/destinations/TripRow';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DateRangePicker } from '@/components/destinations/DateRangePicker';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const revalidate = 300;

/**
 * Browse and choose. The filter is a plain GET form, so every state this page
 * can be in has its own URL: shareable, back-buttonable, indexable, and it
 * works with JavaScript off. Refusal list item 47 forbids holding filter state
 * in component state for exactly that reason.
 */
export default async function Destinations({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const all = await getPublishedPackages();

  const party = Math.min(12, Math.max(1, Number(sp.travellers) || 2));
  const from = sp.from ?? '';
  const to = sp.to ?? '';   // where to, not just where from
  const month = sp.month ?? '';
  // A real departure window rather than a month bucket. `month` is still read
  // so older shared links keep resolving.
  const dateFrom = sp.dateFrom ?? '';
  const dateTo = sp.dateTo ?? '';
  const flex = Math.min(7, Math.max(0, Number(sp.flex) || 0));
  const budget = Number(sp.budget) || 0;
  const sort = sp.sort ?? 'soonest';

  // Every departure city and month the catalogue actually offers, so the
  // controls can never propose a combination that returns nothing by
  // construction.
  const cities = [...new Map(all.map((p) => [p.departureCity.iata, p.departureCity[locale]])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], locale));
  // Where to, keyed on the stable English country so the value survives a
  // language switch and the URL stays meaningful in every locale.
  const countries = [...new Map(all.map((p) => [p.country.en, p.country[locale]])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], locale));
  const months = [...new Set(all.map((p) => p.nextDeparture?.slice(0, 7)).filter(Boolean))].sort() as string[];
  // The exact days something leaves, so the calendar can mark them.
  const departureDates = [...new Set(all.map((p) => p.nextDeparture).filter(Boolean))].sort() as string[];

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    numberingSystem: 'latn',
  });
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  let rows = all.filter((p) => {
    if (from && p.departureCity.iata !== from) return false;
    if (to && p.country.en !== to) return false;
    if (month && p.nextDeparture?.slice(0, 7) !== month) return false;
    if (dateFrom || dateTo) {
      const dep = p.nextDeparture;
      if (!dep) return false;
      // Flexibility widens the window on both sides, which is what makes a date
      // search usable against fixed departures: exact dates would almost always
      // return nothing.
      const shift = (d: string, days: number) => {
        const x = new Date(d + 'T00:00:00');
        x.setDate(x.getDate() + days);
        return x.toISOString().slice(0, 10);
      };
      if (dateFrom && dep < shift(dateFrom, -flex)) return false;
      if (dateTo && dep > shift(dateTo, flex)) return false;
      if (dateFrom && !dateTo && dep > shift(dateFrom, flex)) return false;
    }
    // Budget is compared against the party total, because that is the number
    // shown on the card. Comparing against the per-person fare would filter on
    // a figure the visitor never sees.
    if (budget > 0) {
      const exp = p.pricePerPerson.currency === 'KWD' || p.pricePerPerson.currency === 'BHD' ? 3 : 2;
      const totalMajor = (p.pricePerPerson.amountMinor * party) / 10 ** exp;
      if (totalMajor > budget) return false;
    }
    return true;
  });

  rows = rows.sort((a, b) => {
    if (sort === 'priceLow' || sort === 'priceHigh') {
      const v = (p: typeof a) => {
        const exp = p.pricePerPerson.currency === 'KWD' || p.pricePerPerson.currency === 'BHD' ? 3 : 2;
        return p.pricePerPerson.amountMinor / 10 ** exp;
      };
      return sort === 'priceLow' ? v(a) - v(b) : v(b) - v(a);
    }
    return (a.nextDeparture ?? '').localeCompare(b.nextDeparture ?? '');
  });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide dest">
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: t('dest.crumbHome'), href: `/${locale}` },
            { label: t('dest.crumbDest') },
          ]}
        />
        <header className="sheet__head">
          <h1 className="sheet__title">{t('dest.title')}</h1>
          <p className="sheet__lede">{t('dest.lede')}</p>
        </header>

        {/* The search sits across the top, the way the reference site does it.
            It was in the 288px rail, where a two-month calendar had nowhere to
            open and collided with the results. Secondary filters stay in the
            rail; the things you actually search on are up here. */}
        <form className="searchbar" method="get">
          <div className="searchbar__row">
            <p className="field field--sb">
              <label htmlFor="from">{t('dest.from')}</label>
              <select id="from" name="from" defaultValue={from}>
                <option value="">{t('dest.anyCity')}</option>
                {cities.map(([iata, name]) => (
                  <option key={iata} value={iata}>{name}</option>
                ))}
              </select>
            </p>

            <p className="field field--sb">
              <label htmlFor="to">{t('dest.to')}</label>
              <select id="to" name="to" defaultValue={to}>
                <option value="">{t('dest.anywhere')}</option>
                {countries.map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </p>

            <div className="field--sb">
              <DateRangePicker
                locale={locale}
                initialFrom={dateFrom}
                initialTo={dateTo}
                initialFlex={flex}
                available={departureDates}
              />
            </div>

            <p className="field field--sb field--narrow">
              <label htmlFor="travellers">{t('dest.travellers')}</label>
              <select id="travellers" name="travellers" defaultValue={String(party)}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{nf.format(n)}</option>
                ))}
              </select>
            </p>

            <button type="submit" className="btn searchbar__go">{t('dest.apply')}</button>
          </div>
        </form>

        <div className="dest__cols">
        <aside className="dest__rail">
        <h2 className="dest__railH">{t('dest.filters')}</h2>
        <form className="finder" method="get">
          {/* The rail posts its own GET, so it carries the search across. */}
          <input type="hidden" name="from" value={from} />
          <input type="hidden" name="to" value={to} />
          <input type="hidden" name="travellers" value={String(party)} />
          <input type="hidden" name="dateFrom" value={dateFrom} />
          <input type="hidden" name="dateTo" value={dateTo} />
          <input type="hidden" name="flex" value={String(flex)} />

          <p className="field">
            <label htmlFor="budget">{t('dest.maxBudget')}</label>
            <input
              id="budget"
              name="budget"
              type="number"
              inputMode="numeric"
              min={0}
              step={100}
              placeholder={t('dest.anyBudget')}
              defaultValue={budget || ''}
            />
          </p>

          <p className="field">
            <label htmlFor="sort">{t('dest.sort')}</label>
            <select id="sort" name="sort" defaultValue={sort}>
              <option value="soonest">{t('dest.sortSoonest')}</option>
              <option value="priceLow">{t('dest.sortPriceLow')}</option>
              <option value="priceHigh">{t('dest.sortPriceHigh')}</option>
            </select>
          </p>

          <p className="finder__go">
            <button type="submit" className="btn">{t('dest.apply')}</button>
            <a className="linklike" href={`/${locale}/destinations`}>{t('dest.clear')}</a>
          </p>
        </form>
        </aside>

        <div className="dest__results">

        <p className="finder__count" aria-live="polite">
          {rows.length === 1 ? t('dest.oneResult') : t('dest.results', { n: nf.format(rows.length) })}
        </p>

        {rows.length === 0 ? (
          <div className="empty">
            <p className="empty__line">{t('dest.noResults')}</p>
            <p className="note">{t('dest.noResultsHint')}</p>
          </div>
        ) : (
          <div className="trows">
            {rows.map((p, i) => (
              <TripRow key={p.slug} pkg={p} locale={locale} party={party} priority={i < 3} />
            ))}
          </div>
        )}
        </div>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
