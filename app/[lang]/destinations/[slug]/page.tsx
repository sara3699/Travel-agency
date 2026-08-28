import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getPackageBySlug, getCancellationLadder } from '@/lib/db/packages';
import { formatMoney, scale } from '@/lib/money';
import { ctaKindFor, needsProvenanceChip } from '@/lib/provenance';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { alternates, canonicalFor, SITE } from '@/lib/seo';
import { TripPricer } from '@/components/destinations/TripPricer';

export const revalidate = 300;

/* No generateStaticParams here. It runs outside a request scope, and the data
   layer reads the session cookie so every query runs as the caller with the
   policies applied. Prerendering the slugs would mean reaching for the secret
   key at build time to save one render. With revalidate set, the first request
   for a slug renders it and the rest are served from cache, which is the same
   outcome for a crawler. */

/**
 * Per-package share card, never a single global og:image. Because the OG spec
 * prefers the FIRST og:image it finds, a card set in a root layout silently
 * overrides every per-route card added later — which renders the sameness
 * failure straight into the channel this market actually shares in.
 *
 * The card is a static JPEG built by scripts/build-share-cards.mjs, per locale,
 * so the Arabic one is laid out by a browser engine rather than by satori.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};

  const path = `/destinations/${slug}`;
  const title = `${pkg.destination[locale]} — ${pkg.country[locale]}`;
  const description = pkg.differenceLine[locale];
  const card = `${SITE}/share/${locale}/${slug}.jpg`;

  return {
    title,
    description,
    alternates: { canonical: canonicalFor(locale, path), ...alternates(path) },
    openGraph: {
      title,
      description,
      url: canonicalFor(locale, path),
      locale,
      type: 'website',
      images: [{ url: card, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [card] },
  };
}

export default async function PackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { lang, slug } = await params;
  const sp = await searchParams;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const ladder = await getCancellationLadder(slug);
  const party = Math.min(12, Math.max(1, Number(sp.travellers) || 2));

  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });
  const df = new Intl.DateTimeFormat(locale, {
    day: 'numeric', month: 'long', year: 'numeric', numberingSystem: 'latn',
  });

  const total = scale(pkg.pricePerPerson, party);
  // Per-person sum of what the ledger says is NOT included, so the pricer can
  // scale it with the party the same way the headline figure scales.
  const excludedTotal = pkg.ledger.reduce<{ amountMinor: number; currency: string } | null>((acc, l) => {
    if (l.included || !l.estimate || l.estimate.amountMinor <= 0) return acc;
    return acc
      ? { amountMinor: acc.amountMinor + l.estimate.amountMinor, currency: acc.currency }
      : { amountMinor: l.estimate.amountMinor, currency: l.estimate.currency };
  }, null);
  const included = pkg.ledger.filter((l) => l.included);
  const excluded = pkg.ledger.filter((l) => !l.included);

  // The CTA verb comes from the provenance enum, never from a string. Nothing
  // illustrative may say "Book".
  const verb = ctaKindFor(pkg.provenance);

  return (
    <>
      <SiteHeader locale={locale} />

      <main className="pkg">
        <a className="pkg__back linklike" href={`/${locale}/destinations`}>
          {t('pkg.back')}
        </a>

        <header className="pkg__hero">
          <Image
            src={pkg.image}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="pkg__heroCopy">
            <h1 className="pkg__title">{pkg.destination[locale]}</h1>
            <p className="pkg__country">{pkg.country[locale]}</p>
          </div>
        </header>

        {/* The price is now something you operate, not something you read.
            Travellers and nights are the two things every caller changes
            first, so they belong on the page rather than in a query string. */}
        <TripPricer
          slug={pkg.slug}
          locale={locale}
          perPerson={{ amountMinor: pkg.pricePerPerson.amountMinor, currency: pkg.pricePerPerson.currency }}
          soldNights={pkg.nights}
          excludedPerPerson={
            excludedTotal && excludedTotal.amountMinor > 0
              ? { amountMinor: excludedTotal.amountMinor, currency: excludedTotal.currency }
              : null
          }
          initialParty={party}
          enquireHref={`/${locale}/enquire?trip=${pkg.slug}`}
        />
        {needsProvenanceChip(pkg.provenance) && (
          <p className="pkg__provline"><span className="trip__prov">{t('flight.prov')}</span></p>
        )}

        <dl className="facts pkg__facts">
          <div>
            <dt>{t('pkg.nights')}</dt>
            <dd>{nf.format(pkg.nights)}</dd>
          </div>
          <div>
            <dt>{t('pkg.from')}</dt>
            <dd>{pkg.departureCity[locale]}</dd>
          </div>
          <div>
            <dt>{t('pkg.departs')}</dt>
            <dd>{pkg.nextDeparture ? df.format(new Date(pkg.nextDeparture)) : '-'}</dd>
          </div>
          <div>
            <dt>{t('pkg.board')}</dt>
            <dd>{t(`pkg.board_${pkg.boardBasis}`)}</dd>
          </div>
          <div>
            <dt>{t('pkg.tier')}</dt>
            <dd>{t('pkg.tierStars', { n: nf.format(pkg.hotelTier) })}</dd>
          </div>
        </dl>

        {pkg.differenceLine[locale] && (
          <section className="pkg__block">
            <h2 className="pkg__h2">{t('pkg.difference')}</h2>
            <p className="pkg__lead">{pkg.differenceLine[locale]}</p>
          </section>
        )}

        <div className="pkg__ledger">
          <section className="pkg__block">
            <h2 className="pkg__h2">{t('pkg.whatsIncluded')}</h2>
            <ul className="lines">
              {included.map((l) => (
                <li key={l.key} className="lines__in">
                  {t(`ledger.${l.key}`)}
                </li>
              ))}
            </ul>
          </section>

          <section className="pkg__block">
            <h2 className="pkg__h2">{t('pkg.whatsNot')}</h2>
            {excluded.length === 0 && <p className="note">{t('flight.nothingExcluded')}</p>}
            <ul className="lines">
              {excluded.map((l) => (
                <li key={l.key} className="lines__out">
                  <span>{t(`ledger.${l.key}`)}</span>
                  <span className="lines__amt">
                    {l.estimate && l.estimate.amountMinor > 0
                      ? formatMoney(scale(l.estimate, party), locale, { compact: true })
                      : t('pkg.notRequired')}
                  </span>
                  {/* An estimate with no source is an invented number, and the
                      schema refuses to store one. Showing the source is what
                      makes the figure checkable rather than decorative. */}
                  {l.estimateSource && (
                    <span className="lines__src">{t('pkg.source', { src: l.estimateSource })}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="pkg__block">
          <h2 className="pkg__h2">{t('pkg.facetsTitle')}</h2>
          <ul className="facetlist">
            {pkg.facets.map((f) => (
              <li key={f.key} data-state={f.state}>
                <span className="facetlist__k">{t(`facets.${f.key}`)}</span>
                {/* The answer in words. It was previously carried only by the
                    colour of a border, which meant "alcohol-free property: no"
                    and "yes" were the same row to anyone who could not tell the
                    two colours apart. */}
                <span className="facetlist__state">{t(`facets.state_${f.state}`)}</span>
                <span className="facetlist__v">
                  {f.verifiedBy && f.verifiedAt
                    ? t('facets.verifiedBy', { date: f.verifiedAt, who: f.verifiedBy })
                    : t('facets.unverified')}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {ladder.length > 0 && (
          <section className="pkg__block">
            <h2 className="pkg__h2">{t('pkg.cancelTitle')}</h2>
            <p className="note">{t('pkg.cancelLede')}</p>
            <table className="ladder">
              <tbody>
                {ladder.map((r) => (
                  <tr key={r.daysBefore}>
                    <th scope="row">{t('pkg.daysBefore', { n: nf.format(r.daysBefore) })}</th>
                    <td>{t('pkg.refund', { pct: nf.format(r.refundPct) })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {pkg.notFor[locale] && (
          <section className="pkg__block pkg__notfor">
            <h2 className="pkg__h2">{t('pkg.beforeYouDecide')}</h2>
            <p>{pkg.notFor[locale]}</p>
          </section>
        )}
      </main>
    </>
  );
}
