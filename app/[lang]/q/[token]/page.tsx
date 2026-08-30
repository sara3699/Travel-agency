import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getEnquiryByToken } from '@/lib/db/enquiries';
import { getPackageBySlug } from '@/lib/db/packages';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StatusPill } from '@/components/StatusPill';

/* The account-free journey: the link someone opens after arriving from
   WhatsApp. Never prerendered and never indexed, because the token in the URL
   is the whole credential. */
export const dynamic = 'force-dynamic';

export const metadata = { robots: { index: false, follow: false } };

export default async function EnquiryStatus({
  params,
}: {
  params: Promise<{ lang: string; token: string }>;
}) {
  const { lang, token } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const enquiry = await getEnquiryByToken(token);

  if (!enquiry) {
    return (
      <>
        <SiteHeader locale={locale} />
        <main className="sheet">
          <h1 className="sheet__title">{t('q.notFound')}</h1>
          <p className="sheet__lede">{t('q.notFoundLede')}</p>
          <a className="btn btn--quiet" href={`/${locale}`}>
            {t('nav.home')}
          </a>
        </main>
      <SiteFooter locale={locale} />
      </>
    );
  }

  const e = enquiry as Record<string, unknown>;
  const slug = (e.package_slug as string) ?? null;
  const pkg = slug ? await getPackageBySlug(slug) : null;

  const adults = Number(e.party_adults ?? 0);
  const children = Number(e.party_children ?? 0);
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });
  const df = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
  });
  const monthOnly = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    numberingSystem: 'latn',
  });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet">
        <header className="sheet__head">
          <p className="sheet__kicker">{t('q.title')}</p>
          <h1 className="sheet__ref">{String(e.reference ?? '')}</h1>
          <StatusPill status={String(e.status ?? 'new')} />
        </header>

        <dl className="facts">
          <div>
            <dt>{t('q.name')}</dt>
            <dd>{String(e.contact_name ?? '')}</dd>
          </div>
          <div>
            <dt>{t('q.trip')}</dt>
            <dd>
              {pkg ? `${pkg.destination[locale]}, ${pkg.country[locale]}` : t('q.noTrip')}
            </dd>
          </div>
          <div>
            <dt>{t('q.party')}</dt>
            <dd>
              {nf.format(adults + children)}
              {children > 0 && ` (${nf.format(adults)} + ${nf.format(children)})`}
            </dd>
          </div>
          <div>
            <dt>{t('q.when')}</dt>
            <dd>
              {e.preferred_departure
                ? monthOnly.format(new Date(String(e.preferred_departure)))
                : t('q.noDate')}
            </dd>
          </div>
          <div>
            <dt>{t('q.received')}</dt>
            <dd>{e.received_at ? df.format(new Date(String(e.received_at))) : ''}</dd>
          </div>
        </dl>

        {/* Saying what this page deliberately does NOT show is the point. The
            narrow shape is enforced by the security-definer function, not by
            leaving fields out of this markup. */}
        <p className="note note--rule">{t('q.privacy')}</p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
