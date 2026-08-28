import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { formatMoney, scale, divide } from '@/lib/money';
import { needsProvenanceChip } from '@/lib/provenance';
import type { TravelPackage } from '@/lib/packages';
import type { Locale } from '@/i18n/routing';

/**
 * One trip as a horizontal result row: picture, then the detail that decides
 * it, then a right-aligned price block.
 *
 * The shape is taken from the reference site's listing, measured on 2026-08-28.
 * One detail there is worth stating because it agrees with this project's own
 * position rather than contradicting it: on their result the nightly rate is
 * regular weight and the TOTAL is bold. The heavier figure is the one you pay.
 * So the party total is the display figure here and the per-night rate sits
 * under it as the comparator, never the other way round.
 */
export async function TripRow({
  pkg,
  locale,
  party,
  priority,
}: {
  pkg: TravelPackage;
  locale: Locale;
  party: number;
  priority?: boolean;
}) {
  const t = await getTranslations();
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });
  const df = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', numberingSystem: 'latn' });

  const total = scale(pkg.pricePerPerson, party);
  const perNight = divide(pkg.pricePerPerson, pkg.nights);
  const priced = pkg.ledger.filter((l) => !l.included && l.estimate && l.estimate.amountMinor > 0);
  const excludedMinor = priced.reduce((s, l) => s + (l.estimate?.amountMinor ?? 0), 0) * party;

  const included = pkg.ledger.filter((l) => l.included).map((l) => t(`ledger.${l.key}`));

  return (
    <a className="trow" href={`/${locale}/destinations/${pkg.slug}?travellers=${party}`}>
      <span className="trow__shot">
        <Image
          src={pkg.image}
          alt=""
          fill
          sizes="(max-width: 760px) 100vw, 260px"
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
      </span>

      <span className="trow__body">
        <span className="trow__dest">{pkg.destination[locale]}</span>
        <span className="trow__country">{pkg.country[locale]}</span>
        <span className="trow__meta">
          {t('dest.nightsFrom', { n: nf.format(pkg.nights), city: pkg.departureCity[locale] })}
        </span>
        <span className="trow__diff">{pkg.differenceLine[locale]}</span>

        {/* What is in the price, named. The reference site shows this as
            "Stay added / Flight added" pills; ours are fixed per package, so
            they are stated rather than toggled. */}
        <span className="trow__inc">
          {included.slice(0, 5).map((n) => (
            <span className="chip" key={n}>{n}</span>
          ))}
        </span>

        <span className="trow__foot">
          {needsProvenanceChip(pkg.provenance) && <span className="trip__prov">{t('flight.prov')}</span>}
          {pkg.nextDeparture && (
            <span className="trow__when">{t('dest.departs', { date: df.format(new Date(pkg.nextDeparture)) })}</span>
          )}
        </span>
      </span>

      <span className="trow__price">
        <span className="trow__unit num">
          {t('dest.perNight', { amount: formatMoney(perNight, locale, { compact: true }) })}
        </span>
        <span className="trow__total num">{formatMoney(total, locale, { compact: true })}</span>
        <span className="trow__for">{t('dest.totalFor', { n: nf.format(party) })}</span>
        <span className="trow__allin">{t('dest.allIn')}</span>
        <span className="trow__excl">
          {excludedMinor > 0
            ? t('dest.plusExcl', {
                amount: formatMoney({ amountMinor: excludedMinor, currency: pkg.pricePerPerson.currency }, locale, { compact: true }),
              })
            : t('flight.nothingExcluded')}
        </span>
      </span>
    </a>
  );
}
