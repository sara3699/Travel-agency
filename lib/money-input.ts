import { exponentOf, type CurrencyCode } from './money';

/**
 * Turning what a person types into the integer the database stores, and back.
 *
 * Lives apart from the catalogue's data layer because the editor needs it in
 * the browser to show a running party total, and that file imports the
 * server-side Supabase client.
 */

/**
 * "5120.50" -> 512050, without going through a float.
 *
 * parseFloat('1.15') * 100 is 114.99999999999999, and Math.round hides that
 * until the day it does not. Money is integers here for exactly this reason, so
 * the parser has to stay in integers too. The exponent is per currency: three
 * decimals for KWD and BHD, which is why this is not a hardcoded 100.
 */
export function majorToMinor(input: string, currency: CurrencyCode): number | null {
  const cleaned = input.trim().replace(/[\s,]/g, '');
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;

  const exp = exponentOf(currency);
  const [whole, frac = ''] = cleaned.split('.');
  if (frac.length > exp) return null; // more precision than the currency has
  const padded = (frac + '0'.repeat(exp)).slice(0, exp);
  const minor = Number(whole + padded);
  return Number.isSafeInteger(minor) ? minor : null;
}

export function minorToMajor(minor: number, currency: CurrencyCode): string {
  const exp = exponentOf(currency);
  if (exp === 0) return String(minor);
  const s = String(Math.abs(minor)).padStart(exp + 1, '0');
  return `${minor < 0 ? '-' : ''}${s.slice(0, -exp)}.${s.slice(-exp)}`;
}
