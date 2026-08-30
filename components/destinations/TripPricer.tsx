'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { money, formatMoney, scale, divide, type Money } from '@/lib/money';

/**
 * Price the trip for the party actually travelling, on the page, without a
 * round trip.
 *
 * Two controls, because those are the two things a caller always changes first:
 * how many of us, and how long. Travellers is exact — the package price is per
 * person, so multiplying is the real figure. Nights is NOT exact: a package is
 * a contracted set of nights, and stretching it is a different product. So the
 * moment the length moves off what we sell, the figure is labelled an estimate
 * and the copy says a human confirms it. Master doc Part 13: any "from" figure
 * carries its assumption inline, and where a component is genuinely live we
 * show that rather than an asterisk.
 */
export function TripPricer({
  slug,
  locale,
  perPerson,
  soldNights,
  excludedPerPerson,
  initialParty,
  enquireHref,
}: {
  slug: string;
  locale: string;
  perPerson: { amountMinor: number; currency: string };
  soldNights: number;
  excludedPerPerson: { amountMinor: number; currency: string } | null;
  initialParty: number;
  enquireHref: string;
}) {
  const t = useTranslations('pricer');
  const [party, setParty] = useState(initialParty);
  const [nights, setNights] = useState(soldNights);

  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });
  const base = money(perPerson.amountMinor, perPerson.currency as never);
  const perNight = divide(base, soldNights);

  // Off the sold length, price from the nightly rate. Honest arithmetic, and
  // labelled as an estimate rather than presented as a quote.
  const adjusted: Money = nights === soldNights ? base : scale(perNight, nights);
  const total = scale(adjusted, party);
  const excl =
    excludedPerPerson && excludedPerPerson.amountMinor > 0
      ? scale(money(excludedPerPerson.amountMinor, excludedPerPerson.currency as never), party)
      : null;

  const fmt = (m: Money) => formatMoney(m, locale, { compact: true });
  const changed = nights !== soldNights;
  const href = `${enquireHref}&party=${party}&nights=${nights}`;

  return (
    <section className="pricer" aria-labelledby="pricer-h">
      <h2 className="pricer__h" id="pricer-h">{t('heading')}</h2>

      <div className="pricer__controls">
        <div className="stepper">
          <span className="stepper__label" id={`lbl-party-${slug}`}>{t('travellers')}</span>
          <div className="stepper__row">
            <button type="button" onClick={() => setParty((n) => Math.max(1, n - 1))}
              disabled={party <= 1} aria-label={t('fewer')}>&minus;</button>
            <output className="stepper__val num" aria-live="polite">{nf.format(party)}</output>
            <button type="button" onClick={() => setParty((n) => Math.min(12, n + 1))}
              disabled={party >= 12} aria-label={t('more')}>+</button>
          </div>
        </div>

        <div className="stepper">
          <span className="stepper__label">
            {t('nights')}
            {!changed && <span className="stepper__hint"> · {t('nightsSet')}</span>}
          </span>
          <div className="stepper__row">
            <button type="button" onClick={() => setNights((n) => Math.max(2, n - 1))}
              disabled={nights <= 2} aria-label={t('shorter')}>&minus;</button>
            <output className="stepper__val num" aria-live="polite">{nf.format(nights)}</output>
            <button type="button" onClick={() => setNights((n) => Math.min(21, n + 1))}
              disabled={nights >= 21} aria-label={t('longer')}>+</button>
          </div>
        </div>
      </div>

      <p className="pricer__total num">{fmt(total)}</p>
      <p className="pricer__for">{t('total', { n: nf.format(party) })}</p>
      <p className="pricer__unit">
        {t('each', { amount: fmt(adjusted) })} · {t('perNight', { amount: fmt(divide(adjusted, nights)) })}
      </p>

      <p className={changed ? 'pricer__note pricer__note--est' : 'pricer__note'}>
        {changed
          ? t('estimate', { sold: nf.format(soldNights), chosen: nf.format(nights) })
          : t('asSold', { n: nf.format(party) })}
      </p>
      {changed && (
        <button type="button" className="linklike pricer__reset" onClick={() => setNights(soldNights)}>
          {t('reset', { n: nf.format(soldNights) })}
        </button>
      )}

      <p className="pricer__excl">
        {excl ? t('excl', { amount: fmt(excl), n: nf.format(party) }) : t('noExcl')}
      </p>

      <a className="btn pricer__cta" href={href}>{t('ask')}</a>
    </section>
  );
}
