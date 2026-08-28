import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import { getPackageBySlug } from '@/lib/db/packages';
import { formatMoney, scale, divide } from '@/lib/money';
import { needsProvenanceChip } from '@/lib/provenance';

/**
 * The share card, as real HTML at exactly 1200x630.
 *
 * It is a page rather than an ImageResponse because satori, which sits behind
 * next/og, does not do Unicode bidi. Tested on 2026-08-28: it joins Arabic
 * glyphs correctly through HarfBuzz but REVERSES word order inside a
 * pure-Arabic string, so "سعر تجريبي" came out as "تجريبي سعر". A card whose
 * Arabic is backwards is worse than no card, and Arabic is the design lead
 * here.
 *
 * So the card is laid out by a real browser engine and screenshotted at publish
 * time by scripts/build-share-cards.mjs. Master doc Part 13 reached the same
 * resolution before this was built; this is the confirmation.
 *
 * Kept as a visitable route on purpose: a card you can open is a card you can
 * check, and it is noindex so it never competes with the package page.
 */
export const revalidate = 300;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CardPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });
  const total = scale(pkg.pricePerPerson, 2);
  const perNight = divide(pkg.pricePerPerson, pkg.nights);

  return (
    <div className="card1200" data-card>
      <div className="card1200__bg" style={{ backgroundImage: `url(${pkg.image})` }} />
      <div className="card1200__veil" />

      <div className="card1200__inner">
        <div className="card1200__top">
          <span className="card1200__mark">Mars</span>
          {needsProvenanceChip(pkg.provenance) && (
            <span className="card1200__spec">{t('flight.prov')}</span>
          )}
        </div>

        <div className="card1200__mid">
          <p className="card1200__from">
            {t('dest.nightsFrom', { n: nf.format(pkg.nights), city: pkg.departureCity[locale] })}
          </p>
          <p className="card1200__dest">{pkg.destination[locale]}</p>
          <p className="card1200__country">{pkg.country[locale]}</p>
        </div>

        <div className="card1200__foot">
          <span className="card1200__price">
            <span className="card1200__total num">{formatMoney(total, locale, { compact: true })}</span>
            <span className="card1200__for">{t('dest.totalFor', { n: nf.format(2) })}</span>
          </span>
          <span className="card1200__unit">
            <span className="num">{t('dest.perNight', { amount: formatMoney(perNight, locale, { compact: true }) })}</span>
            <span className="card1200__allin">{t('dest.allIn')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
