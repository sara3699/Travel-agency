import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { formatMoney, scale } from '@/lib/money';
import { needsProvenanceChip } from '@/lib/provenance';
import type { TravelPackage } from '@/lib/packages';
import type { Locale } from '@/i18n/routing';

/**
 * One trip in the grid. The number on it is the total for the party, never a
 * "from" price: refusal list item 11, and the reason the party control exists
 * at all.
 */
export async function TripCard({
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
  const df = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    numberingSystem: 'latn',
  });

  const total = scale(pkg.pricePerPerson, party);
  const priced = pkg.ledger.filter((l) => !l.included && l.estimate && l.estimate.amountMinor > 0);
  const excluded = priced.length
    ? priced.reduce((sum, l) => sum + (l.estimate?.amountMinor ?? 0), 0) * party
    : 0;

  return (
    <a className="tcard" href={`/${locale}/destinations/${pkg.slug}`}>
      <span className="tcard__shot">
        <Image
          src={pkg.image}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
      </span>

      <span className="tcard__body">
        <span className="tcard__head">
          <span className="tcard__dest">{pkg.destination[locale]}</span>
          <span className="tcard__country">{pkg.country[locale]}</span>
        </span>

        <span className="tcard__meta">
          {t('dest.nightsFrom', { n: nf.format(pkg.nights), city: pkg.departureCity[locale] })}
        </span>

        <span className="tcard__price">
          <span className="tcard__figure">{formatMoney(total, locale, { compact: true })}</span>
          <span className="tcard__for">{t('dest.totalFor', { n: nf.format(party) })}</span>
        </span>

        <span className="tcard__excl">
          {excluded > 0
            ? t('card.notIncluded') +
              ': ' +
              formatMoney(
                { amountMinor: excluded, currency: pkg.pricePerPerson.currency },
                locale,
                { compact: true },
              )
            : t('flight.nothingExcluded')}
        </span>

        <span className="tcard__foot">
          {needsProvenanceChip(pkg.provenance) && (
            <span className="trip__prov">{t('flight.prov')}</span>
          )}
          {pkg.nextDeparture && (
            <span className="tcard__when">
              {t('dest.departs', { date: df.format(new Date(pkg.nextDeparture)) })}
            </span>
          )}
        </span>
      </span>
    </a>
  );
}
