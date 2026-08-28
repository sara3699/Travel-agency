'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  locale: string;
  /** yyyy-mm-dd */
  initialFrom?: string;
  initialTo?: string;
  initialFlex?: number;
  /** Departure dates the catalogue actually offers, yyyy-mm-dd. */
  available: string[];
};

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parse = (s?: string) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? new Date(s + 'T00:00:00') : null);
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameDay = (a: Date, b: Date) => iso(a) === iso(b);

/** Which day starts the week, and which days are the weekend, for THIS locale.
 *  Saudi Arabia's weekend is Friday and Saturday; the UAE's is Saturday and
 *  Sunday. Hardcoding Sat/Sun ships a wrong product on a travel site, where the
 *  calendar is the primary control. Master doc, Part 4. */
function weekInfo(locale: string): { firstDay: number; weekend: number[] } {
  try {
    // @ts-expect-error getWeekInfo is newer than the lib types here
    const info = new Intl.Locale(locale).getWeekInfo?.();
    if (info) {
      // Intl uses 1=Mon..7=Sun; JS getDay() uses 0=Sun..6=Sat.
      const conv = (n: number) => n % 7;
      return { firstDay: conv(info.firstDay), weekend: (info.weekend as number[]).map(conv) };
    }
  } catch {
    /* fall through */
  }
  return locale === 'ar'
    ? { firstDay: 6, weekend: [5, 6] } // Saturday first, Fri+Sat weekend
    : { firstDay: 1, weekend: [0, 6] };
}

export function DateRangePicker({ locale, initialFrom, initialTo, initialFlex = 0, available }: Props) {
  const t = useTranslations('cal');
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<Date | null>(parse(initialFrom));
  const [to, setTo] = useState<Date | null>(parse(initialTo));
  const [flex, setFlex] = useState(initialFlex);
  const [cursor, setCursor] = useState<Date>(startOfMonth(parse(initialFrom) ?? new Date()));
  const box = useRef<HTMLDivElement>(null);

  const { firstDay, weekend } = useMemo(() => weekInfo(locale), [locale]);
  const availableSet = useMemo(() => new Set(available), [available]);

  const dayFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: 'short', numberingSystem: 'latn' }),
    [locale],
  );
  const monthFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', numberingSystem: 'latn' }),
    [locale],
  );
  const fullFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', numberingSystem: 'latn' }),
    [locale],
  );
  /** Hijri alongside Gregorian. ar-SA resolves to the Gregorian calendar by
   *  default, so the Umm al-Qura calendar has to be asked for explicitly. */
  const hijriFmt = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
        month: 'long', year: 'numeric', numberingSystem: 'latn',
      });
    } catch { return null; }
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const weekdayNames = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2026, 1, 1 + ((firstDay + i - 1 + 7) % 7)); // 2026-02-01 is a Sunday
      out.push(dayFmt.format(new Date(2026, 1, 1 + ((firstDay + i) % 7))));
    }
    return out;
  }, [dayFmt, firstDay]);

  function pick(d: Date) {
    if (!from || (from && to)) { setFrom(d); setTo(null); return; }
    if (d < from) { setFrom(d); return; }
    setTo(d);
  }

  function monthGrid(base: Date) {
    const first = startOfMonth(base);
    const lead = (first.getDay() - firstDay + 7) % 7;
    const days: (Date | null)[] = Array(lead).fill(null);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= end; i++) days.push(new Date(base.getFullYear(), base.getMonth(), i));
    while (days.length % 7) days.push(null);
    return days;
  }

  const label = from
    ? to
      ? `${fullFmt.format(from)} – ${fullFmt.format(to)}`
      : fullFmt.format(from)
    : t('any');

  const flexOptions = [0, 1, 2, 3, 7];

  return (
    <div className="cal" ref={box}>
      <span className="cal__label">{t('dates')}</span>
      <button type="button" className="field cal__trigger" onClick={() => setOpen((o) => !o)}
        aria-expanded={open} aria-haspopup="dialog">
        <span>{label}</span>
        {flex > 0 && <span className="cal__flexTag">± {flex}</span>}
      </button>

      {/* The form still posts these, so the URL keeps carrying every filter. */}
      <input type="hidden" name="dateFrom" value={from ? iso(from) : ''} />
      <input type="hidden" name="dateTo" value={to ? iso(to) : ''} />
      <input type="hidden" name="flex" value={String(flex)} />

      {open && (
        <div className="cal__pop" role="dialog" aria-label={t('dates')}>
          <div className="cal__nav">
            <button type="button" onClick={() => setCursor(addMonths(cursor, -1))} aria-label={t('prev')} />
            <button type="button" onClick={() => setCursor(addMonths(cursor, 1))} aria-label={t('next')} />
          </div>

          <div className="cal__months">
            {[0, 1].map((offset) => {
              const base = addMonths(cursor, offset);
              return (
                <div className="cal__month" key={offset}>
                  <p className="cal__mhead">
                    {monthFmt.format(base)}
                    {hijriFmt && locale === 'ar' && (
                      <span className="cal__hijri">{hijriFmt.format(base)}</span>
                    )}
                  </p>
                  <div className="cal__grid" role="grid">
                    {weekdayNames.map((w, i) => (
                      <span className="cal__wd" key={w + i} aria-hidden="true">{w}</span>
                    ))}
                    {monthGrid(base).map((d, i) => {
                      if (!d) return <span className="cal__pad" key={`p${i}`} />;
                      const k = iso(d);
                      const isFrom = from && sameDay(d, from);
                      const isTo = to && sameDay(d, to);
                      const inRange = from && to && d > from && d < to;
                      const isWeekend = weekend.includes(d.getDay());
                      const hasTrip = availableSet.has(k);
                      const cls = [
                        'cal__day',
                        isFrom || isTo ? 'is-end' : '',
                        inRange ? 'is-in' : '',
                        isWeekend ? 'is-weekend' : '',
                        hasTrip ? 'has-trip' : '',
                      ].filter(Boolean).join(' ');
                      return (
                        <button type="button" key={k} className={cls} onClick={() => pick(d)}
                          aria-pressed={Boolean(isFrom || isTo)}
                          aria-label={`${fullFmt.format(d)}${hasTrip ? ` · ${t('hasTrip')}` : ''}`}>
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flexibility, the way the reference site offers it. On a catalogue
              of fixed departures this is what makes a date search usable at
              all: exact dates would return nothing most of the time. */}
          <div className="cal__flex">
            {flexOptions.map((f) => (
              <button type="button" key={f}
                className={`cal__chip${flex === f ? ' is-on' : ''}`}
                onClick={() => setFlex(f)}
                aria-pressed={flex === f}>
                {f === 0 ? t('exact') : `± ${f} ${f === 1 ? t('day') : t('days')}`}
              </button>
            ))}
          </div>

          <div className="cal__foot">
            <button type="button" className="linklike" onClick={() => { setFrom(null); setTo(null); setFlex(0); }}>
              {t('clear')}
            </button>
            <button type="button" className="btn btn--sm" onClick={() => setOpen(false)}>{t('done')}</button>
          </div>

          <p className="cal__legend"><span className="cal__dot" /> {t('legend')}</p>
        </div>
      )}
    </div>
  );
}
