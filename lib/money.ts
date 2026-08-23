// FOUND-06. Money is a minor-unit integer carrying its own exponent.
//
// Never toFixed(2). Never a numeric(10,2) column. Never "store cents, divide
// by 100". KWD, BHD, OMR, JOD and TND have THREE decimal places under ISO 4217,
// so a two-decimal assumption is wrong by a factor of ten, silently, and it
// surfaces first in a refund. Master doc Part 4.

export type CurrencyCode = 'SAR' | 'AED' | 'KWD' | 'QAR' | 'BHD' | 'OMR' | 'EGP' | 'TND' | 'USD';

const EXPONENT: Record<CurrencyCode, number> = {
  SAR: 2, AED: 2, QAR: 2, EGP: 2, USD: 2,
  KWD: 3, BHD: 3, OMR: 3, TND: 3,
};

export interface Money {
  readonly amountMinor: number;
  readonly currency: CurrencyCode;
}

export const money = (amountMinor: number, currency: CurrencyCode): Money => ({ amountMinor, currency });

export const exponentOf = (c: CurrencyCode): number => EXPONENT[c];

export const scale = (m: Money, factor: number): Money => ({
  ...m,
  amountMinor: Math.round(m.amountMinor * factor),
});

export const divide = (m: Money, by: number): Money => ({
  ...m,
  amountMinor: Math.round(m.amountMinor / by),
});

/**
 * Format through Intl only. Hand-concatenating `${amount} ${currency}` puts the
 * symbol on the wrong side in Arabic and drops the RLM that ICU inserts.
 * Any .trim() or regex strip applied to the result silently re-breaks it.
 */
export function formatMoney(m: Money, locale: string, opts?: { compact?: boolean }): string {
  const exp = exponentOf(m.currency);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: m.currency,
    minimumFractionDigits: opts?.compact ? 0 : exp,
    maximumFractionDigits: opts?.compact ? 0 : exp,
    // Gulf audiences read Western digits for prices even in Arabic copy.
    numberingSystem: 'latn',
  }).format(m.amountMinor / 10 ** exp);
}
