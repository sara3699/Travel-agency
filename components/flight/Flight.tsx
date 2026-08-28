'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { formatMoney, scale, type Money } from '@/lib/money';

/* ====================================================================== *
 * THREE COASTS
 * ----------------------------------------------------------------------
 * One unbroken world, six legs, no acts. Grammar: continuous world
 * (scrollcraft uniqueness.md 2.4), which requires worldflight mode.
 *
 * The engine reads the data-sc-* attributes below and drives them. It
 * generates no DOM and it is never edited per project: everything bespoke
 * here is ordinary React and CSS reading the engine's published state.
 * ====================================================================== */

export interface TripView {
  slug: string;
  dest: string;
  country: string;
  nights: number;
  from: string;
  /** All-in, per person, on the stated sharing assumption. Never a "from". */
  pricePerPerson: Money;
  sharing: number;
  /** Sum of the priced exclusions, per person. Zero when nothing is excluded. */
  excludedPerPerson: Money | null;
  excludedNames: string;
  ctaVerb: string;
  provenanceLabel: string;
}

export interface FlightCopy {
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  aTitle: string;
  aBody: string;
  bTitle: string;
  bBody: string;
  cTitle: string;
  cBody: string;
  /* Templates, not functions: a function cannot cross the server/client
     boundary, and the server is where the translation belongs. The client
     only fills in the one value that is genuinely live. */
  laidFor: string; // {n}
  travelling: string;
  fewer: string;
  more: string;
  partyLive: string;
  sharingNote: string;
  nights: string; // {n}
  forParty: string; // {n}
  plusExcluded: string; // {amount} {names}
  nothingExcluded: string;
  askAll: string;
  skip: string;
  routeLabel: string;
  waypoints: string[];
}

/** weight = viewport-heights this leg owns. weight / clip-seconds is held at
 *  0.24 across every leg including the peak, so the world never surges: the
 *  peak gets its room by being a longer clip, not a faster one. */
const LEGS = [
  { id: 1, w: 1.2, linger: 0 },
  { id: 2, w: 1.2, linger: 0 },
  { id: 3, w: 1.2, linger: 0 },
  { id: 4, w: 1.2, linger: 0 },
  { id: 5, w: 1.2, linger: 0 },
  { id: 6, w: 2.4, linger: 0.3 }, // the peak. The linger is what makes it settle on the table.
] as const;

const TOTAL_W = LEGS.reduce((a, l) => a + l.w, 0);

/** The engine is a global IIFE and mounts document-wide. React 19 strict mode
 *  double-invokes effects in dev, and a second mount would run a second rAF
 *  loop over the same nodes. */
let mounted = false;

const fill = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export function Flight({
  copy,
  trips,
  locale,
  askHref,
  localeSwitcher,
  accountSlot,
  signInSlot,
}: {
  copy: FlightCopy;
  trips: TripView[];
  locale: string;
  askHref: string;
  /** Server-rendered so a crawler can follow the hreflang links. Passed in as
   *  a slot rather than positioned separately: two fixed elements competing for
   *  the same corner is how a chrome bar drifts out of alignment. */
  localeSwitcher: React.ReactNode;
  /** Destinations, About, and the staff links when the session has them. */
  accountSlot: React.ReactNode;
  /** The account control, kept apart so it can sit at the very end of the bar. */
  signInSlot: React.ReactNode;
}) {
  const [party, setParty] = useState(2);
  const [leg, setLeg] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      // @ts-expect-error vendored plain-JS engine, no types by design
      await import('@/vendor/scrollcraft/scrollcraft.js');
      if (!alive || mounted) return;
      mounted = true;
      const w = window as unknown as {
        ScrollCraft?: { mount: (d: Document) => unknown };
        __sc?: unknown;
      };
      // The verification harness reads the real playhead records off __sc: a
      // screenshot taken mid-lerp is a frame the page never actually holds, so
      // it has to be able to ask whether the playhead has arrived rather than
      // guess with a timeout. Not an API for the page itself.
      w.__sc = w.ScrollCraft?.mount(document);

      // worldflight.md 7b: the spacer is sized once at mount, and if innerHeight
      // reports 0 at that moment it is set to 0px, the page has no scroll track,
      // and the flight silently never advances. One resize makes it re-measure.
      const relayout = () => window.dispatchEvent(new Event('resize'));
      window.addEventListener('load', relayout);
      // A webfont swapping in changes every measured copy block too.
      document.fonts?.ready.then(relayout);
      requestAnimationFrame(relayout);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onWaypoint = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (detail) setLeg(detail.index);
    };
    window.addEventListener('sc:waypoint', onWaypoint);
    return () => window.removeEventListener('sc:waypoint', onWaypoint);
  }, []);

  /** A world you cannot skip around in is a video. Smooth is scoped to this
   *  call because the reader asked for it by clicking; it is never global. */
  const goToLeg = useCallback((index: number) => {
    const before = LEGS.slice(0, index).reduce((a, l) => a + l.w, 0);
    window.scrollTo({
      top: before * window.innerHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, []);

  const fmt = (m: Money) => formatMoney(m, locale, { compact: true });
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  return (
    <>
      <a className="skip" href="#the-table">
        {copy.skip}
      </a>

      <div
        ref={rootRef}
        data-sc-mode="worldflight"
        data-sc-seam="0.16"
      >
        {/* ---- the single fixed stage. Every leg stays mounted for the life of
                the page; nothing ever swaps a src, because a src swap is a
                black frame and a black frame is the cut this mode removes. */}
        <div data-sc-world>
          {LEGS.map((l, i) => (
            <div
              key={l.id}
              data-sc-segment
              data-sc-w={l.w}
              {...(l.linger ? { 'data-sc-linger': l.linger } : {})}
              data-sc-waypoint={copy.waypoints[i]}
            >
              <img
                className="sc-world__poster"
                src={`/flight/p-leg${l.id}.webp`}
                srcSet={`/flight/p-leg${l.id}-m.webp 800w, /flight/p-leg${l.id}.webp 1600w`}
                sizes="100vw"
                width={1600}
                height={900}
                alt=""
                /* The first poster is the LCP element. Never lazy. */
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
              <video
                data-sc-src={`/flight/leg${l.id}.mp4`}
                data-sc-src-mobile={`/flight/leg${l.id}-m.mp4`}
                /* 0.12 rather than the engine's 0.18 default. worldflight.md
                   7c: a flight has more legs mounted and more seams than an
                   act page, and the extra damping is what actually removes
                   wheel-event judder. The engine reads this per <video>; on
                   the mode root it is ignored. */
                data-sc-lerp="0.12"
                playsInline
                muted
                preload="none"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* ---- copy. One fixed layer above the world. Each block declares a
                window against the WHOLE track, not against a leg.
                Leg 5 (0.57 to 0.71) carries no block on purpose: that is the
                authored silence the landing arrives from. */}
        <div data-sc-world-copy>
          <div className="sc-world__scrim sc-scrim sc-scrim--band" />

          <div className="sc-copy sc-copy--lead" data-sc-copy data-sc-window="hero">
            <p className="copy__kicker">{copy.heroKicker}</p>
            <h1 className="copy__h1">{copy.heroTitle}</h1>
            <p className="copy__body">{copy.heroBody}</p>
          </div>

          <div className="sc-copy sc-copy--trail" data-sc-copy data-sc-window="0.16 0.27">
            <h2 className="copy__h2">{copy.aTitle}</h2>
            <p className="copy__body">{copy.aBody}</p>
          </div>

          <div className="sc-copy sc-copy--lead" data-sc-copy data-sc-window="0.31 0.41">
            <h2 className="copy__h2">{copy.bTitle}</h2>
            <p className="copy__body">{copy.bBody}</p>
          </div>

          <div className="sc-copy sc-copy--trail" data-sc-copy data-sc-window="0.45 0.55">
            <h2 className="copy__h2">{copy.cTitle}</h2>
            <p className="copy__body">{copy.cBody}</p>
          </div>

          {/* ---- the landing. The catalogue is INSIDE the world: these are
                  objects laid on the generated table, not a section appended
                  under the flight. Worldflight allows nothing in document flow
                  but the spacer, and the grammar wants the close to be arrival
                  at a place with the CTA as an object in it. */}
          <div className="table-copy" id="the-table" data-sc-copy data-sc-window="finale">
            <div className="laid">
              <p className="laid__line">{fill(copy.laidFor, { n: nf.format(party) })}</p>
              <div className="settings" aria-hidden="true">
                {Array.from({ length: party }, (_, i) => (
                  <span
                    key={i}
                    className="settings__glass"
                    style={{ animationDelay: `${i * 55}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="trips">
              {trips.map((t) => {
                const total = scale(t.pricePerPerson, party);
                const excl = t.excludedPerPerson ? scale(t.excludedPerPerson, party) : null;
                return (
                  <a
                    className="trip"
                    key={t.slug}
                    href={`/${locale}/destinations/${t.slug}?travellers=${party}`}
                  >
                    <span className="trip__where">
                      <span className="trip__dest">{t.dest}</span>
                      <span className="trip__meta">
                        {fill(copy.nights, { n: nf.format(t.nights) })} · {t.from}
                      </span>
                    </span>
                    <span className="trip__total">
                      {/* The party total IS the price. Refusal list item 11:
                          never a per-person figure without it. */}
                      <span className="trip__figure">{fmt(total)}</span>
                      <span className="trip__for">{fill(copy.forParty, { n: nf.format(party) })}</span>
                    </span>
                    <p className="trip__excl">
                      {excl && excl.amountMinor > 0
                        ? fill(copy.plusExcluded, { amount: fmt(excl), names: t.excludedNames })
                        : copy.nothingExcluded}
                    </p>
                    <span className="trip__prov">{t.provenanceLabel}</span>
                  </a>
                );
              })}
            </div>

            <div className="table-foot">
              <p className="note">{copy.sharingNote}</p>
              <a className="ask" href={`/${locale}/destinations?travellers=${party}`}>
                {copy.askAll}
              </a>
            </div>
          </div>
        </div>

        {/* The only element in document flow. The engine sets its height. */}
        <div data-sc-spacer aria-hidden="true" />
      </div>

      {/* ---- chrome. Outlives every leg, so the dial can be operated at any
              altitude and the rail can be reached from anywhere. */}
      <div className="chrome">
        <div className="chrome__top">
        <div className="chrome__bar">
          <a className="wordmark" href={`/${locale}`}>
            <span className="wordmark__name">Mars</span>
            <span className="wordmark__tag">{copy.partyLive}</span>
          </a>

          <div className="chrome__right">
            {accountSlot}
            {localeSwitcher}

            {/* THE SIGNATURE MOVE. One control, airborne the whole way down,
                that lays the table on landing. */}
            <div className="dial">
              <button
                type="button"
                className="dial__btn"
                onClick={() => setParty((n) => Math.max(1, n - 1))}
                disabled={party <= 1}
                aria-label={copy.fewer}
              >
                &minus;
              </button>
              <span className="dial__label">
                <span>{copy.travelling}</span>
                <span className="dial__count" aria-live="polite">
                  {nf.format(party)}
                </span>
              </span>
              <button
                type="button"
                className="dial__btn"
                onClick={() => setParty((n) => Math.min(8, n + 1))}
                disabled={party >= 8}
                aria-label={copy.more}
              >
                +
              </button>
            </div>

            {signInSlot}
          </div>
        </div>

        {/* ---- the map. The grammar requires the nav to be one, and requires
                it to be clickable. The engine renders no rail: it publishes the
                leg index and the page draws whatever it needs. */}
        <nav className="rail" aria-label={copy.routeLabel}>
          {LEGS.map((l, i) => (
            <button
              key={l.id}
              type="button"
              className="rail__leg"
              /* Share of the track, so the rail reports the flight's real
                 shape rather than six equal steps. */
              style={{ flex: `${l.w} 1 0` }}
              aria-current={leg === i}
              onClick={() => goToLeg(i)}
              /* The visible label is hidden below 860px, so the accessible
                 name lives on the button rather than in a duplicate span
                 that would read twice wherever the label IS visible. */
              aria-label={copy.waypoints[i]}
            >
              <span className="rail__tick" aria-hidden="true" />
              <span className="rail__name" aria-hidden="true">
                {copy.waypoints[i]}
              </span>
            </button>
          ))}
        </nav>

        </div>

        <div className="chrome__rest" />
      </div>
    </>
  );
}

export { TOTAL_W };
