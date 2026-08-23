import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { formatMoney, divide } from '@/lib/money';
import { ctaKindFor, needsProvenanceChip } from '@/lib/provenance';
import { ledgerOrder, type TravelPackage } from '@/lib/packages';

type Lang = 'ar' | 'en' | 'fr';

/**
 * The package card, as a STATEMENT rather than a spec sheet.
 *
 * A grid of ticks and crosses reads as a comparison table and looks cheap. An
 * itemised ruled statement is how the honest-price thesis actually wants to be
 * drawn: every line named, every line settled, the excluded ones priced instead
 * of hidden. Nobody in the category renders exclusions at all, so this is the
 * differentiation and the visual signature at the same time.
 */
export function PackageCard({ pkg, priority = false }: { pkg: TravelPackage; priority?: boolean }) {
  const t = useTranslations();
  const locale = useLocale() as Lang;
  const cta = ctaKindFor(pkg.provenance);
  const perDay = divide(pkg.pricePerPerson, pkg.nights);
  const exponent = pkg.pricePerPerson.currency;

  // Split the money so the numeral can carry the weight and the code recedes.
  // Headline figure drops zero decimals: ".00" is noise at display size. The
  // underlying value keeps its currency exponent, so nothing is lost.
  const full = formatMoney(pkg.pricePerPerson, locale, { compact: true });
  const numeral = full.replace(/[^\d.,\u066B\u066C]/g, '').trim();

  return (
    <article className="pkg group">
      <div className="pkg-media">
        <Image
          src={pkg.image}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="pkg-img"
        />
        <div className="pkg-media-veil" />
        <span className="pkg-nights num">{t('card.nights', { count: pkg.nights })}</span>
        {needsProvenanceChip(pkg.provenance) && <span className="pkg-prov">{t('card.specimen')}</span>}
      </div>

      <div className="pkg-body">
        <p className="pkg-route">
          {pkg.departureCity[locale]} <span className="pkg-arrow" aria-hidden>—</span> {pkg.destination[locale]}
        </p>
        <h3 className="pkg-name display">{pkg.destination[locale]}</h3>
        <p className="pkg-diff">{pkg.differenceLine[locale]}</p>

        <div className="pkg-price">
          <span className="pkg-cur num">{exponent}</span>
          <span className="pkg-fig num">{numeral}</span>
          <span className="pkg-per">{t('card.perPerson')}</span>
          <span className="pkg-day num">{formatMoney(perDay, locale, { compact: true })} / {t('card.perDay')}</span>
        </div>
        <p className="pkg-assume">
          {t('card.assumption', { adults: pkg.partyAssumption.adults, sharing: pkg.partyAssumption.sharing })}
        </p>

        {/* The statement. Words, ruled and aligned. No ticks. */}
        <dl className="pkg-ledger">
          {ledgerOrder.map((key) => {
            const line = pkg.ledger.find((l) => l.key === key);
            if (!line) return null;
            return (
              <div key={key} className={`pkg-row${line.included ? '' : ' is-out'}`}>
                <dt>{t(`ledger.${key}`)}</dt>
                <dd className={line.included ? '' : 'num'}>
                  {line.included
                    ? t('card.included')
                    : line.estimate && line.estimate.amountMinor > 0
                      ? formatMoney(line.estimate, locale, { compact: true })
                      : t('card.notRequired')}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="pkg-notfor">
          <span className="pkg-notfor-k">{t('card.notFor')}</span> {pkg.notFor[locale]}
        </p>

        <div className="pkg-foot">
          <a href="#" className="pkg-cta">
            {cta === 'book' ? t('card.book') : cta === 'partner' ? t('card.partner') : t('card.enquire')}
          </a>
          <span className="pkg-dep num">{pkg.nextDeparture}</span>
        </div>
      </div>
    </article>
  );
}
