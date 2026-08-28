import { createClient } from '../supabase/server';
import { requireAdmin } from '../auth/session';
import { exponentOf, type CurrencyCode } from '../money';

/**
 * The catalogue's write side. Slice one: the four fields that go stale.
 *
 * Every query here goes through the ordinary user-session client, never the
 * secret key. `packages_admin_write` already says `is_admin()` on ALL commands,
 * so the database is the thing refusing the wrong person. Reaching for the
 * service key would bypass the only control that actually holds, in order to
 * re-implement it in TypeScript where a future session can quietly delete it.
 *
 * `requireAdmin()` on top of that is a courtesy: it produces a clean redirect
 * instead of an opaque row-level-security failure.
 */

export type PackageStatus = 'draft' | 'published' | 'archived';

export interface CatalogueRow {
  id: string;
  slug: string;
  status: PackageStatus;
  nights: number;
  priceMinor: number;
  priceCurrency: CurrencyCode;
  nextDeparture: string | null;
  provenance: string;
  departureIata: string;
  hotelTier: number;
}

const SELECT =
  'id, slug, status, nights, price_minor, price_currency, next_departure, provenance, departure_iata, hotel_tier';

type Row = {
  id: string;
  slug: string;
  status: PackageStatus;
  nights: number;
  price_minor: number;
  price_currency: CurrencyCode;
  next_departure: string | null;
  provenance: string;
  departure_iata: string;
  hotel_tier: number;
};

const toRow = (r: Row): CatalogueRow => ({
  id: r.id,
  slug: r.slug,
  status: r.status,
  nights: r.nights,
  priceMinor: r.price_minor,
  priceCurrency: r.price_currency,
  nextDeparture: r.next_departure,
  provenance: r.provenance,
  departureIata: r.departure_iata,
  hotelTier: r.hotel_tier,
});

/** Everything, drafts and archived included. Staff can already SELECT those. */
export async function listCatalogue(): Promise<CatalogueRow[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from('packages')
    .select(SELECT)
    .order('next_departure', { ascending: true, nullsFirst: false });
  return ((data ?? []) as Row[]).map(toRow);
}

export async function getCatalogueRow(slug: string): Promise<CatalogueRow | null> {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from('packages').select(SELECT).eq('slug', slug).maybeSingle();
  return data ? toRow(data as Row) : null;
}

/* ------------------------------------------------------------------ money */

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

/* ----------------------------------------------------------------- update */

export type SaveResult =
  | { ok: true; slug: string }
  | { ok: false; errorKey: string; reasons?: string[] };

/** The database's publish guard, mapped to keys the interface can translate. */
const REASON_KEYS: Record<string, string> = {
  'missing hero image': 'heroImage',
  'price is zero': 'priceZero',
  'no next departure date': 'noDeparture',
  'missing ar translation': 'missingAr',
  'missing en translation': 'missingEn',
  'no priced inclusions or exclusions': 'noLedger',
  'no cancellation ladder': 'noLadder',
};

const STATUSES: readonly PackageStatus[] = ['draft', 'published', 'archived'];

export async function updatePackageBasics(formData: FormData): Promise<SaveResult> {
  await requireAdmin();

  const slug = String(formData.get('slug') ?? '');
  const priceRaw = String(formData.get('price') ?? '');
  const nightsRaw = String(formData.get('nights') ?? '');
  const departure = String(formData.get('nextDeparture') ?? '').trim();
  const status = String(formData.get('status') ?? '') as PackageStatus;

  if (!slug) return { ok: false, errorKey: 'cat.notFound' };
  if (!STATUSES.includes(status)) return { ok: false, errorKey: 'cat.statusInvalid' };

  const current = await getCatalogueRow(slug);
  if (!current) return { ok: false, errorKey: 'cat.notFound' };

  const priceMinor = majorToMinor(priceRaw, current.priceCurrency);
  if (priceMinor === null) return { ok: false, errorKey: 'cat.priceInvalid' };
  if (priceMinor <= 0) return { ok: false, errorKey: 'cat.priceZero' };

  const nights = Number(nightsRaw);
  if (!Number.isInteger(nights) || nights < 1 || nights > 30) {
    return { ok: false, errorKey: 'cat.nightsInvalid' };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(departure)) return { ok: false, errorKey: 'cat.dateInvalid' };
  const d = new Date(`${departure}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return { ok: false, errorKey: 'cat.dateInvalid' };

  // The whole reason this screen exists. A next departure in the past is the
  // bug we just spent a migration fixing by hand, so the form refuses to
  // recreate it. Comparing in UTC because the column is a date, not a moment:
  // local midnight would make the answer depend on who is typing.
  const todayUtc = new Date();
  const today = Date.UTC(todayUtc.getUTCFullYear(), todayUtc.getUTCMonth(), todayUtc.getUTCDate());
  if (d.getTime() < today) return { ok: false, errorKey: 'cat.datePast' };

  const supabase = await createClient();
  const { error } = await supabase
    .from('packages')
    .update({
      price_minor: priceMinor,
      nights,
      next_departure: departure,
      status,
    })
    .eq('slug', slug);

  if (error) {
    // Publishing an incomplete package raises check_violation from
    // package_incompleteness(). That is a real editorial answer, not a crash,
    // so it is unpacked into the reasons the interface can list.
    const reasons = Object.entries(REASON_KEYS)
      .filter(([text]) => error.message.includes(text))
      .map(([, key]) => key);
    if (reasons.length) return { ok: false, errorKey: 'cat.cannotPublish', reasons };
    return { ok: false, errorKey: 'cat.saveFailed' };
  }

  return { ok: true, slug };
}
