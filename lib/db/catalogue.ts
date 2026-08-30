import { createClient } from '../supabase/server';
import { requireAdmin } from '../auth/session';
import { type CurrencyCode } from '../money';
import { majorToMinor, minorToMajor } from '../money-input';
import { nextDeparture, todayUtc, canGoStale, CADENCES } from '../departures';

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
  /** The stored anchor. With a cadence this may legitimately be in the past. */
  nextDeparture: string | null;
  /** Days between departures, or null for a one-off. */
  intervalDays: number | null;
  /** The live date a traveller sees, rolled forward from the anchor. */
  liveDeparture: string | null;
  provenance: string;
  departureIata: string;
  hotelTier: number;
  partyAdults: number;
  /** Used to tell whether the share card was cut from this revision. */
  updatedAt: string;
}

const SELECT =
  'id, slug, status, nights, price_minor, price_currency, next_departure, provenance, departure_iata, hotel_tier, party_adults, departure_interval_days, updated_at';

type Row = {
  id: string;
  slug: string;
  status: PackageStatus;
  nights: number;
  price_minor: number;
  price_currency: CurrencyCode;
  next_departure: string | null;
  departure_interval_days: number | null;
  provenance: string;
  departure_iata: string;
  hotel_tier: number;
  party_adults: number;
  updated_at: string;
};

const toRow = (r: Row): CatalogueRow => ({
  id: r.id,
  slug: r.slug,
  status: r.status,
  nights: r.nights,
  priceMinor: r.price_minor,
  priceCurrency: r.price_currency,
  nextDeparture: r.next_departure,
  intervalDays: r.departure_interval_days,
  liveDeparture: nextDeparture(r.next_departure, r.departure_interval_days),
  provenance: r.provenance,
  departureIata: r.departure_iata,
  hotelTier: r.hotel_tier,
  partyAdults: r.party_adults,
  updatedAt: r.updated_at,
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

export { majorToMinor, minorToMajor };

/**
 * `price_minor` is ALL-IN, PER PERSON, for the party the trip is sold at. The
 * schema says so on the column and the interface must not paraphrase it into
 * something friendlier: the first version of this screen called it the total
 * price, which would have had every price on the site entered at double.
 */

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

  const intervalRaw = String(formData.get('intervalDays') ?? '0');
  const interval = Number(intervalRaw);
  if (!Number.isInteger(interval) || !(CADENCES as readonly number[]).includes(interval)) {
    return { ok: false, errorKey: 'cat.cadenceInvalid' };
  }
  const intervalDays = interval > 0 ? interval : null;

  // A past date is only wrong for a one-off. With a cadence the stored value is
  // an anchor, and an anchor in the past is how the roll-forward works: the
  // trip that started running last spring should keep its real first date.
  // Comparing in UTC because the column is a date and not a moment, so local
  // midnight would make the answer depend on who is typing.
  if (canGoStale(intervalDays) && d.getTime() < todayUtc()) {
    return { ok: false, errorKey: 'cat.datePast' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('packages')
    .update({
      price_minor: priceMinor,
      nights,
      next_departure: departure,
      departure_interval_days: intervalDays,
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
