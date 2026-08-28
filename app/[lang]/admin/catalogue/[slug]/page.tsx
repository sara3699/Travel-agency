import { redirect, notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { getCatalogueRow, minorToMajor } from '@/lib/db/catalogue';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PackageEditor } from '@/components/admin/PackageEditor';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function EditPackage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const user = await getCurrentUser();
  if (!isAdmin(user)) redirect(`/${locale}/account/sign-in`);

  const pkg = await getCatalogueRow(slug);
  if (!pkg) notFound();

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet">
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: t('nav.adminArea'), href: `/${locale}/admin` },
            { label: t('cat.title'), href: `/${locale}/admin/catalogue` },
            { label: pkg.slug },
          ]}
        />

        <header className="sheet__head">
          <h1 className="sheet__title">{pkg.slug}</h1>
          <p className="sheet__lede">
            {t('cat.editLede', { city: pkg.departureIata, tier: pkg.hotelTier })}
          </p>
        </header>

        <PackageEditor
          locale={locale}
          pkg={{
            slug: pkg.slug,
            status: pkg.status,
            nights: pkg.nights,
            priceMajor: minorToMajor(pkg.priceMinor, pkg.priceCurrency),
            priceCurrency: pkg.priceCurrency,
            nextDeparture: pkg.nextDeparture ?? '',
            departureIata: pkg.departureIata,
            partyAdults: pkg.partyAdults,
          }}
        />

        <p className="note">
          <a href={`/${locale}/destinations/${pkg.slug}`}>{t('cat.viewLive')}</a>
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
