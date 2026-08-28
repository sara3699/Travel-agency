import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { TripCard } from '@/components/destinations/TripCard';

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
  const month = sp.month ?? '';
  const budget = Number(sp.budget) || 0;
  const sort = sp.sort ?? 'soonest';

  // Every departure city and month the catalogue actually offers, so the
  // controls can never propose a combination that returns nothing by
  // construction.
  const cities = [...new Map(all.map((p) => [p.departureCity.iata, p.departureCity[locale]])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], locale));
  const months = [...new Set(all.map((p) => p.nextDeparture?.slice(0, 7)).filter(Boolean))].sort() as string[];

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    numberingSystem: 'latn',
  });
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  let rows = all.filter((p) => {
    if (from && p.departureCity.iata !== from) return false;
    if (month && p.nextDeparture?.slice(0, 7) !== month) return false;
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
      <main className="sheet sheet--wide">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('dest.title')}</h1>
          <p className="sheet__lede">{t('dest.lede')}</p>
        </header>

        <form className="finder" method="get">
          <p className="field">
            <label htmlFor="from">{t('dest.from')}</label>
            <select id="from" name="from" defaultValue={from}>
              <option value="">{t('dest.anyCity')}</option>
              {cities.map(([iata, name]) => (
                <option key={iata} value={iata}>
                  {name}
                </option>
              ))}
            </select>
          </p>

          <p className="field">
            <label htmlFor="travellers">{t('dest.travellers')}</label>
            <select id="travellers" name="travellers" defaultValue={String(party)}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {nf.format(n)}
                </option>
              ))}
            </select>
          </p>

          <p className="field">
            <label htmlFor="month">{t('dest.month')}</label>
            <select id="month" name="month" defaultValue={month}>
              <option value="">{t('dest.anyMonth')}</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel.format(new Date(`${m}-01T00:00:00`))}
                </option>
              ))}
            </select>
          </p>

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
            <button type="submit" className="btn">
              {t('dest.apply')}
            </button>
            <a className="linklike" href={`/${locale}/destinations`}>
              {t('dest.clear')}
            </a>
          </p>
        </form>

        <p className="finder__count" aria-live="polite">
          {rows.length === 1 ? t('dest.oneResult') : t('dest.results', { n: nf.format(rows.length) })}
        </p>

        {rows.length === 0 ? (
          <div className="empty">
            <p className="empty__line">{t('dest.noResults')}</p>
            <p className="note">{t('dest.noResultsHint')}</p>
          </div>
        ) : (
          <div className="tgrid">
            {rows.map((p, i) => (
              <TripCard key={p.slug} pkg={p} locale={locale} party={party} priority={i < 3} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
