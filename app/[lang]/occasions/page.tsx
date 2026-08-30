import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { WINDOWS, windowDates, tripsFor } from '@/lib/occasions';
import { occasionCopy } from '@/lib/occasions.content';

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'occ' });
  return { title: t('title'), description: t('lede') };
}

export default async function OccasionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const all = await getPublishedPackages();
  const copy = occasionCopy(locale);
  // UTC: the window dates are constructed in UTC, and formatting them in the
  // reader's zone moved Eid a day earlier west of Greenwich.
  const df = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', numberingSystem: 'latn', timeZone: 'UTC' });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet sheet--wide">
        <Breadcrumbs
          locale={locale}
          trail={[{ label: t('dest.crumbHome'), href: `/${locale}` }, { label: t('occ.crumb') }]}
        />
        <header className="sheet__head">
          <h1 className="sheet__title">{t('occ.title')}</h1>
          <p className="sheet__lede">{t('occ.lede')}</p>
        </header>

        <div className="occ__grid">
          {WINDOWS.map((w) => {
            const c = copy[w.id];
            const d = windowDates(w);
            const n = tripsFor(w, all).length;
            return (
              <a className="occ__card" key={w.id} href={`/${locale}/occasions/${w.id}`}>
                <span className="occ__cardHead">
                  <span className="occ__name">{c.title}</span>
                  {w.kind !== 'evergreen' && (
                    <span className={`occ__state${d.open ? ' is-open' : ''}`}>
                      {d.open ? t('occ.openNow') : d.start ? `${t('occ.opens')} ${df.format(d.start)}` : ''}
                    </span>
                  )}
                </span>
                <span className="occ__intent">{c.intent}</span>
                <span className="occ__count">{t('occ.nTrips', { n })}</span>
              </a>
            );
          })}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
