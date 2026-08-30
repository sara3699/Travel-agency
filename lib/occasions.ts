import type { TravelPackage } from './packages';
import type { Locale } from '@/i18n/routing';
import { departsWithin } from './departures';

/**
 * The version-one information architecture: grouping by the occasion someone is
 * travelling FOR, rather than by facet. On a dozen packages a facet wall does
 * not earn its place, and "Eid al-Fitr" is a thing people actually search.
 *
 * Two rules this file exists to keep:
 *
 *  1. No lunar date is ever hardcoded. Ramadan and both Eids move with the moon
 *     and a hardcoded date means a redeploy under pressure at the highest
 *     traffic moment of the year. The Gregorian dates here are DERIVED from the
 *     Umm al-Qura calendar at request time.
 *  2. The window is evergreen. When it is not open the page says so plainly
 *     instead of running a countdown, so the route holds its ranking all year.
 */

export type WindowKind = 'lunar' | 'seasonal' | 'evergreen';

export interface OccasionWindow {
  id: string;
  kind: WindowKind;
  /** lunar: [hijriMonth, hijriDay] of the first day. 10 = Shawwal, 12 = Dhu al-Hijja. */
  hijri?: [number, number];
  /** how many days the travel window runs from that first day */
  spanDays?: number;
  /** seasonal: inclusive Gregorian month numbers */
  months?: number[];
  /** how a trip qualifies when the window is not about dates at all */
  match?: (p: TravelPackage) => boolean;
}

export const WINDOWS: OccasionWindow[] = [
  { id: 'eid-al-fitr', kind: 'lunar', hijri: [10, 1], spanDays: 10 },
  { id: 'eid-al-adha', kind: 'lunar', hijri: [12, 10], spanDays: 10 },
  { id: 'summer-escape', kind: 'seasonal', months: [6, 7, 8, 9] },
  { id: 'school-holiday', kind: 'seasonal', months: [7, 8] },
  {
    id: 'honeymoon',
    kind: 'evergreen',
    // Every package is tier 4 or better, so tier alone matched all twelve and
    // told the reader nothing. Length is what actually separates a honeymoon
    // from a short break here.
    match: (p) => p.hotelTier >= 5 || (p.hotelTier >= 4 && p.nights >= 7),
  },
  {
    id: 'first-trip',
    kind: 'evergreen',
    // Short, visa-light, and nothing longer than a week: the things that make a
    // first trip abroad survivable rather than memorable for the wrong reason.
    match: (p) =>
      p.nights <= 6 &&
      p.ledger.some((l) => l.key === 'visa' && (l.included || (l.estimate?.amountMinor ?? 0) === 0)),
  },
  {
    id: 'family-reunion',
    kind: 'evergreen',
    match: (p) => p.facets.some((f) => f.key === 'family_section' && f.state === 'green'),
  },
];

export const windowIds = WINDOWS.map((w) => w.id);

/** Hijri parts for a Gregorian date, read from the Umm al-Qura calendar. */
function hijriParts(d: Date): { y: number; m: number; d: number } {
  const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC',
  });
  const parts = fmt.formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value.replace(/\D/g, '') ?? 0);
  return { y: get('year'), m: get('month'), d: get('day') };
}

/**
 * The next Gregorian date on which a given Hijri month and day falls.
 *
 * Scanning forwards a day at a time is unglamorous, but it asks ICU rather than
 * reimplementing a lunar calendar, which is the failure mode that puts Eid on
 * the wrong day. Two years of lookahead covers the case where the window has
 * just passed.
 */
export function nextHijriDate(month: number, day: number, from = new Date()): Date | null {
  const cur = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  for (let i = 0; i < 800; i++) {
    const probe = new Date(cur.getTime() + i * 86400000);
    const h = hijriParts(probe);
    if (h.m === month && h.d === day) return probe;
  }
  return null;
}

export interface WindowDates {
  open: boolean;
  start: Date | null;
  end: Date | null;
  /** true where the first day depends on a sighting and can shift a day */
  moonSighting: boolean;
}

export function windowDates(w: OccasionWindow, now = new Date()): WindowDates {
  if (w.kind === 'lunar' && w.hijri) {
    const start = nextHijriDate(w.hijri[0], w.hijri[1], now);
    if (!start) return { open: false, start: null, end: null, moonSighting: true };
    const end = new Date(start.getTime() + (w.spanDays ?? 7) * 86400000);
    return { open: now >= start && now <= end, start, end, moonSighting: true };
  }
  if (w.kind === 'seasonal' && w.months?.length) {
    const m = now.getMonth() + 1;
    const year = now.getFullYear();
    const first = Math.min(...w.months);
    const last = Math.max(...w.months);
    const start = new Date(Date.UTC(m > last ? year + 1 : year, first - 1, 1));
    const end = new Date(Date.UTC(m > last ? year + 1 : year, last, 0));
    return { open: w.months.includes(m), start, end, moonSighting: false };
  }
  return { open: true, start: null, end: null, moonSighting: false };
}

/** Trips that genuinely belong in this window. */
export function tripsFor(w: OccasionWindow, all: TravelPackage[], now = new Date()): TravelPackage[] {
  if (w.kind === 'evergreen') return all.filter((p) => (w.match ? w.match(p) : true));

  const { start, end } = windowDates(w, now);
  if (!start || !end) return [];
  // A lunar window is short, so departures are matched with a fortnight of
  // approach on either side: nobody flies out on the morning of Eid.
  const pad = w.kind === 'lunar' ? 14 * 86400000 : 0;
  const lo = new Date(start.getTime() - pad);
  const hi = new Date(end.getTime() + pad);
  // Ask whether the trip DEPARTS in the window, not whether its next departure
  // happens to fall there. Those were the same question while every package
  // had exactly one date. They stopped being the same the moment a trip could
  // repeat: a fortnightly departure is never more than two weeks out, so
  // matching only the next one would empty every window further away than that
  // and make Eid al-Adha look like it had nothing.
  return all.filter((p) =>
    departsWithin(p.departureAnchor ?? p.nextDeparture, p.departureIntervalDays ?? null, lo, hi),
  );
}

export function findWindow(id: string): OccasionWindow | undefined {
  return WINDOWS.find((w) => w.id === id);
}
