import { createClient } from '../supabase/server';
import { money, type CurrencyCode } from '../money';
import type { Provenance } from '../provenance';
import type { TravelPackage, LedgerLine, Facet, FacetState } from '../packages';
import { ledgerOrder } from '../packages';
import { nextDeparture } from '../departures';

/**
 * Reads the catalogue and returns the SAME TravelPackage shape that
 * lib/packages.ts exports as a hard-coded array.
 *
 * That is the whole point: a component swaps
 *     import { packages } from '@/lib/packages'
 * for
 *     const packages = await getPublishedPackages()
 * and nothing else changes. PackageCard, the difference engine and the money
 * formatting all keep working untouched.
 *
 * Only published rows come back -- not because this filters them out, but
 * because the database refuses to return drafts to anyone who is not staff.
 * Deleting the filter would change nothing for a visitor.
 */

type LocaleKey = 'ar' | 'en' | 'fr';

const SELECT = `
  slug, provenance, hero_image, nights, hotel_tier, board_basis,
  price_minor, price_currency, party_adults, party_sharing,
  departure_iata, next_departure, departure_interval_days,
  package_i18n ( locale, destination, destination_latin, country,
                 departure_city, difference_line, not_for ),
  package_ledger_lines ( key, position, included, estimate_minor,
                         estimate_currency, estimate_source ),
  package_facets ( key, state, verified_by, verified_at )
` as const;

export async function getPublishedPackages(): Promise<TravelPackage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select(SELECT)
    .eq('status', 'published')
    .order('next_departure', { ascending: true });

  if (error) throw new Error(`getPublishedPackages: ${error.message}`);
  return (data ?? []).map(toTravelPackage);
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select(SELECT)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`getPackageBySlug: ${error.message}`);
  return data ? toTravelPackage(data) : null;
}

/** The cancellation ladder, for the date-aware refund calculator. */
export async function getCancellationLadder(
  slug: string,
): Promise<{ daysBefore: number; refundPct: number }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('packages')
    .select('cancellation_rules ( days_before, refund_pct )')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`getCancellationLadder: ${error.message}`);
  return (data?.cancellation_rules ?? [])
    .map((r) => ({ daysBefore: r.days_before, refundPct: r.refund_pct }))
    .sort((a, b) => b.daysBefore - a.daysBefore);
}

/* ------------------------------------------------------------------ mapper */

/* eslint-disable @typescript-eslint/no-explicit-any */
function toTravelPackage(row: any): TravelPackage {
  const i18n: Record<string, any> = {};
  for (const r of row.package_i18n ?? []) i18n[r.locale] = r;

  // A locale with no row falls back to English, then Arabic, then empty
  // string. Never a machine translation and never the raw key: the master
  // document treats a visible untranslated string as a defect, and an empty
  // string is at least honest about the gap.
  const pick = (field: string) => (l: LocaleKey) =>
    i18n[l]?.[field] ?? i18n.en?.[field] ?? i18n.ar?.[field] ?? '';

  const dest = pick('destination');
  const country = pick('country');
  const city = pick('departure_city');
  const diff = pick('difference_line');
  const notFor = pick('not_for');

  const ledger: LedgerLine[] = (row.package_ledger_lines ?? [])
    .map((l: any) => ({
      key: l.key,
      included: l.included,
      ...(l.estimate_minor !== null && l.estimate_currency !== null
        ? {
            estimate: money(Number(l.estimate_minor), l.estimate_currency as CurrencyCode),
            estimateSource: l.estimate_source ?? undefined,
          }
        : {}),
    }))
    .sort((a: LedgerLine, b: LedgerLine) => {
      const ia = ledgerOrder.indexOf(a.key as (typeof ledgerOrder)[number]);
      const ib = ledgerOrder.indexOf(b.key as (typeof ledgerOrder)[number]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

  const facets: Facet[] = (row.package_facets ?? []).map((f: any) => ({
    key: f.key,
    state: f.state as FacetState,
    verifiedBy: f.verified_by,
    verifiedAt: f.verified_at,
  }));

  return {
    slug: row.slug,
    provenance: row.provenance as Provenance,
    image: row.hero_image ?? '',
    destination: {
      ar: dest('ar'),
      en: dest('en'),
      fr: dest('fr'),
      latin: i18n.en?.destination_latin ?? i18n.en?.destination ?? '',
    },
    country: { ar: country('ar'), en: country('en'), fr: country('fr') },
    nights: row.nights,
    departureCity: {
      ar: city('ar'),
      en: city('en'),
      fr: city('fr'),
      iata: row.departure_iata,
    },
    // The stored column is the ANCHOR and may sit in the past on purpose.
    // Everything downstream, the rail, the listing, the calendar dots and the
    // sitemap, wants the live date, so the roll-forward happens once here
    // rather than at each of those call sites.
    nextDeparture: nextDeparture(row.next_departure, row.departure_interval_days) ?? '',
    departureAnchor: row.next_departure ?? '',
    departureIntervalDays: row.departure_interval_days ?? null,
    // Minor units straight from bigint. Never divided here: the exponent
    // belongs to formatMoney, and KWD/BHD/OMR/TND have three decimals.
    pricePerPerson: money(Number(row.price_minor), row.price_currency as CurrencyCode),
    partyAssumption: { adults: row.party_adults, sharing: row.party_sharing },
    hotelTier: row.hotel_tier as 3 | 4 | 5,
    boardBasis: row.board_basis,
    differenceLine: { ar: diff('ar'), en: diff('en'), fr: diff('fr') },
    ledger,
    facets,
    notFor: { ar: notFor('ar'), en: notFor('en'), fr: notFor('fr') },
  };
}
