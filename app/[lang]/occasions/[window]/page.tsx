import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TripRow } from '@/components/destinations/TripRow';
import { WINDOWS, findWindow, windowDates, tripsFor } from '@/lib/occasions';
import { occasionCopy } from '@/lib/occasions.content';

/** Revalidated hourly rather than prerendered forever: the lunar windows are
 *  computed at request time and a page that opened this morning has to say so. */
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.flatMap((lang) => WINDOWS.map((w) => ({ lang, window: w.id })));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string; window: string }> }): Promise<Metadata> {
  const { lang, window } = await params;
  const c = occasionCopy(lang as Locale)[window];
  return c ? { title: c.title, description: c.intent } : {};
}

export default async function OccasionPage({
  params,
}: { params: Promise<{ lang: string; window: string }> }) {
  const { lang, window: id } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const w = findWindow(id);
  const c = occasionCopy(locale)[id];
  if (!w || !c) notFound();

  const all = await getPublishedPackages();
  const trips = tripsFor(w, all);
  const dates = windowDates(w);

  // UTC, for the same reason the index pins it: these Date objects are UTC
  // midnights and a local-zone format shifts them a day.
  const df = new Intl.DateTimeFormat(locale, {
    day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn', timeZone: 'UTC',
  });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide">
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: t('dest.crumbHome'), href: `/${locale}` },
            { label: t('occ.crumb'), href: `/${locale}/occasions` },
            { label: c.title },
          ]}
        />

        <header className="sheet__head occ__head">
          <h1 className="sheet__title">{c.title}</h1>
          <p className="sheet__lede">{c.intent}</p>

          {/* The window states its own dates, computed rather than printed in
              advance, and says plainly when it is shut instead of counting
              down at a reader who arrived in the wrong month. */}
          {w.kind !== 'evergreen' && dates.start && (
            <div className={`occ__window${dates.open ? ' is-open' : ''}`}>
              <p className="occ__windowLine">
                <span className="occ__windowK">{t('occ.dates')}</span>
                <span className="num">
                  {df.format(dates.start)}
                  {dates.end ? ` – ${df.format(dates.end)}` : ''}
                </span>
                <span className="occ__badge">{dates.open ? t('occ.openNow') : t('occ.opens')}</span>
              </p>
              {dates.moonSighting && <p className="occ__moon">{t('occ.moon')}</p>}
              {!dates.open && c.closed && <p className="occ__closed">{c.closed}</p>}
            </div>
          )}
        </header>

        <aside className="occ__advice">
          <h2>{t('occ.advice')}</h2>
          <p>{c.advice}</p>
        </aside>

        {trips.length === 0 ? (
          <div className="empty">
            <p className="empty__line">{t('occ.none')}</p>
            <p className="finder__go">
              <a className="btn" href={`/${locale}/enquire?occasion=${w.id}`}>{t('occ.ask')}</a>
              <a className="linklike" href={`/${locale}/destinations`}>{t('occ.all')}</a>
            </p>
          </div>
        ) : (
          <>
            <p className="finder__count">{t('occ.nTrips', { n: trips.length })}</p>
            <div className="trows">
              {trips.map((p, i) => (
                <TripRow key={p.slug} pkg={p} locale={locale} party={2} priority={i < 2} />
              ))}
            </div>
            {/* Ends in a conversation, not a longer list. */}
            <div className="occ__foot">
              <a className="btn" href={`/${locale}/enquire?occasion=${w.id}`}>{t('occ.ask')}</a>
              <a className="linklike" href={`/${locale}/destinations`}>{t('occ.all')}</a>
            </div>
          </>
        )}
      </main>
    </>
  );
}
