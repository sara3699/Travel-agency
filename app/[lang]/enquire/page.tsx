import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { EnquiryForm } from '@/components/EnquiryForm';
import { SiteHeader } from '@/components/SiteHeader';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/* Not statically rendered: the catalogue comes from the database and the form
   reflects whichever trip the visitor arrived from. */
export const dynamic = 'force-dynamic';

export default async function Enquire({
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

  const packages = await getPublishedPackages();
  const trips = packages.map((p) => ({
    slug: p.slug,
    label: `${p.destination[locale]}, ${p.country[locale]} · ${p.nights}`,
  }));

  const party = Math.min(12, Math.max(1, Number(sp.party) || 2));
  const defaultTrip = packages.some((p) => p.slug === sp.trip) ? sp.trip : '';

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('enquiry.title')}</h1>
          <p className="sheet__lede">{t('enquiry.lede')}</p>
        </header>

        <EnquiryForm
          locale={locale}
          trips={trips}
          defaultTrip={defaultTrip}
          defaultAdults={party}
          utm={{ source: sp.utm_source, medium: sp.utm_medium, campaign: sp.utm_campaign }}
        />
      </main>
    </>
  );
}
