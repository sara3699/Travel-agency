/**
 * Departure dates that do not go stale.
 *
 * The catalogue used to hold a single hand-typed `next_departure`. On
 * 2026-08-28 the earliest was seven days out and four trips departed inside a
 * month, so the site was days from advertising trips that had already left,
 * with nothing in the system to notice. Fixing that by hand took a migration,
 * and it would have needed another one every season.
 *
 * So a trip that runs on a rhythm stores the rhythm instead: an anchor, which
 * is a real departure that really happened or will, and an interval in days.
 * The live date is computed forward from those two, which means the stored row
 * never needs touching and no scheduled job has to run.
 *
 * A trip with no interval is a one-off. Its date CAN pass, deliberately: some
 * departures happen once, and pretending otherwise would be a different lie
 * from the one this fixes. The admin list flags those, because they are the
 * only ones that still need a human.
 */

const DAY = 86_400_000;

/** Midnight UTC for a YYYY-MM-DD string. */
function utcDay(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const t = Date.parse(`${iso}T00:00:00Z`);
  return Number.isNaN(t) ? null : t;
}

/** Today at midnight UTC. The column is a date, not a moment: comparing in
 *  local time would make the answer depend on who is looking. */
export function todayUtc(now: Date = new Date()): number {
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/**
 * The next departure on or after today.
 *
 * Returns the anchor untouched when there is no interval, when the anchor is
 * already in the future, or when the input is unusable. Never returns a date
 * before the anchor: a cadence extends a trip forward, it does not invent
 * departures that predate the one that was entered.
 */
export function nextDeparture(
  anchor: string | null,
  intervalDays: number | null,
  now: Date = new Date(),
): string | null {
  if (!anchor) return null;
  const start = utcDay(anchor);
  if (start === null) return null;

  // A one-off, or a nonsense interval. Either way the stored date stands.
  if (!intervalDays || !Number.isFinite(intervalDays) || intervalDays <= 0) return anchor;

  const today = todayUtc(now);
  if (start >= today) return anchor;

  const step = Math.round(intervalDays) * DAY;
  const elapsed = today - start;
  // Integer division on whole days, so no rounding drift accumulates over a
  // year of fortnights.
  const hops = Math.ceil(elapsed / step);
  return toIso(start + hops * step);
}

/** Whole days from today until a date. Negative once it has passed. */
export function daysUntil(iso: string | null, now: Date = new Date()): number | null {
  if (!iso) return null;
  const t = utcDay(iso);
  return t === null ? null : Math.round((t - todayUtc(now)) / DAY);
}

/**
 * Whether a trip can still fall out of date on its own.
 *
 * A trip on a cadence cannot: its date is computed, so it is always ahead. A
 * one-off can, and that is the whole content of the warning on the admin list.
 */
export const canGoStale = (intervalDays: number | null): boolean =>
  !intervalDays || intervalDays <= 0;

/**
 * The cadences offered in the editor. Days, because that is what the column
 * holds and what the arithmetic uses; the labels are translated.
 *
 * The range matters. A trip's next departure can never be further out than one
 * interval, so a catalogue of fortnightly trips has every departure inside a
 * fortnight and a listing that looks broken while being correct. The long
 * intervals are what let departures spread, and they are also true: a guided
 * eight night itinerary runs quarterly, not every other Friday.
 */
export const CADENCES = [0, 7, 14, 21, 28, 42, 56, 84] as const;

/**
 * Whether a trip departs at any point inside a window.
 *
 * The occasion pages ask "which trips run during Eid", and before cadences
 * existed the only departure a package had was its next one, so matching that
 * single date was the same question. It stopped being the same question the
 * moment a trip could repeat: a fortnightly departure is never more than two
 * weeks away, so matching only the next one would have emptied every window
 * further out than that and made Eid al-Adha look like it had no trips.
 *
 * Bounds are inclusive at both ends. `k` is clamped at zero so a cadence only
 * ever extends a trip forward from its anchor, matching `nextDeparture`.
 */
export function departsWithin(
  anchor: string | null,
  intervalDays: number | null,
  windowStart: Date,
  windowEnd: Date,
): boolean {
  if (!anchor) return false;
  const start = utcDay(anchor);
  if (start === null) return false;

  const lo = windowStart.getTime();
  const hi = windowEnd.getTime();
  if (hi < lo) return false;

  if (!intervalDays || intervalDays <= 0) return start >= lo && start <= hi;

  const step = Math.round(intervalDays) * DAY;
  // The first departure at or after the window opens, never before the anchor.
  const k = Math.max(0, Math.ceil((lo - start) / step));
  return start + k * step <= hi;
}
