'use client';

import Image from 'next/image';
import { useScrollProgress, useReducedMotion, beat, easeInOut, easeOut, lerp } from '@/lib/useScrollProgress';

/**
 * CONCEPT — ROUTE LINE.  Option 1 of the 2026-08-23 depth comparison.
 *
 * The brief was "can we get Montfort's feeling". Montfort is three ingredients:
 * scrollytelling, parallax depth, and a WebGL flight. This concept takes the
 * first two at full strength and replaces the third with the substitute the
 * master doc names by hand in Part 6:
 *
 *   "an SVG route line on a view() timeline delivers most of the emotional
 *    payload for effectively nothing."
 *
 * Everything here is scroll-DRIVEN and never scroll-JACKED. The page moves
 * exactly as far per wheel tick as the browser intends; we only read position.
 * That distinction is the entire reason this concept is inside the rules and
 * FlightJourney is outside them.
 *
 * Payload: zero new dependencies.
 */

/** Stage palette. Deliberately not the direction tokens: this concept is a dark
 *  photographic stage and `atlas` is a light ground with a violet accent. */
const INK = '#0b0e14';
const LINE = '#e8c98a';

export interface Leg {
  time: string;
  title: string;
  body: string;
  image: string;
  /** Point on the 0..100 x 0..100 route viewBox. */
  x: number;
  y: number;
}

export function RouteLineJourney({
  legs,
  rtl,
  footer,
}: {
  legs: Leg[];
  rtl: boolean;
  footer?: React.ReactNode;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();

  // Where each leg sits along the journey's travel. This is GEOMETRY, not taste:
  // the legs are 100dvh each stacked under a 100dvh sticky stage, so leg i fills
  // the viewport at exactly i/(n-1) of the scroll. Hand-picked values drift the
  // photo out of sync with its own caption, which is the one thing this layout
  // cannot survive.
  const ats = legs.map((_, i) => (legs.length < 2 ? 0 : i / (legs.length - 1)));

  // Reduced motion is a second aesthetic, not a stripped one (Part 6). The line
  // still draws — it carries information about where you are in the itinerary —
  // but nothing translates and nothing blurs. Cross-fade only.
  const drawn = reduced ? Math.max(progress, 0.001) : easeOut(progress);

  // In RTL the journey should still read start-to-end in the direction the
  // reader travels, so the route is reflected across the viewBox by coordinate
  // rather than by transform.
  const mx = (x: number) => (rtl ? 100 - x : x);
  const path = buildPath(legs, mx);

  return (
    // This concept is a dark full-bleed photographic stage, so it sets its own
    // ground rather than inheriting the direction's (atlas ground is near-white
    // and its accent is violet — both wrong over photography).
    <div style={{ background: INK }}>
     {/* The ref wraps the journey and NOT the footer. Measuring an element that
         includes the footer inflates the travel denominator, and the stage then
         lags its own captions by the footer's height. */}
     <div
       ref={ref}
       style={{ position: 'relative', height: `${legs.length * 100}dvh` }}
     >
      {/* The stage is sticky so the map holds while the legs scroll past it.
          Sticky is not scroll-jacking: the scrollbar stays honest and a flick
          still travels the distance the user expects. */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflow: 'hidden',
          background: INK,
        }}
      >
        {legs.map((leg, i) => {
          // Each photo owns a window of the scroll and cross-fades with its
          // neighbours. Depth is scale-and-blur as distance plus differential
          // drift — Part 6's depth toolkit minus anything that needs a GPU.
          //
          // The weight has to reach 1 at the first leg when progress is 0, and
          // at the last leg when progress is 1, or the stage opens and closes on
          // an empty frame.
          const w = layerWeight(progress, ats, i);
          if (w <= 0.002) return null;
          const eased = easeInOut(w);

          return (
            <div
              key={leg.image}
              aria-hidden={w < 0.5}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: w,
                // Only one element type moves at a time (Part 6: fading text and
                // images together overwhelms). Here the image moves, the text
                // below cross-fades on its own beat.
                //
                // Drift is driven by distance from this leg's own centre, so the
                // active photo sits still and sharp while its neighbours pull
                // away — that stillness is what reads as depth.
                transform: reduced
                  ? undefined
                  : `scale(${lerp(1.1, 1.0, eased)}) translate3d(0, ${lerp(2.5, 0, eased)}%, 0)`,
                filter: reduced ? undefined : `blur(${(1 - eased) * 5}px)`,
                willChange: 'transform, opacity',
              }}
            >
              <Image
                src={leg.image}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to bottom, rgba(8,10,14,.34) 0%, rgba(8,10,14,.12) 38%, rgba(8,10,14,.86) 100%)',
                }}
              />
            </div>
          );
        })}

        {/* The route line. This is the whole substitute for the WebGL globe:
            one SVG path, drawn by stroke-dashoffset against scroll. In RTL the
            map mirrors with the layout, so the line reads start-to-end in the
            direction the reader is already travelling. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <path
            d={path}
            fill="none"
            stroke="rgba(255,255,255,.30)"
            strokeWidth={0.35}
            strokeDasharray="1.4 1.9"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={path}
            fill="none"
            stroke={LINE}
            strokeWidth={0.7}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - drawn}
            style={{ transition: reduced ? 'stroke-dashoffset 300ms linear' : undefined }}
          />
          {legs.map((leg, i) => {
            const hit = progress >= ats[i] - 0.02;
            return (
              <circle
                key={`${leg.x}-${leg.y}`}
                cx={mx(leg.x)}
                cy={leg.y}
                r={hit ? 1.05 : 0.55}
                fill={hit ? LINE : 'rgba(255,255,255,.45)'}
                style={{ transition: 'r 260ms ease, fill 260ms ease' }}
              />
            );
          })}
        </svg>

        {/* Progress readout. A pinned stage without one is disorienting, which
            is half of what NN/g actually measured. */}
        <div
          style={{
            position: 'absolute',
            insetInlineStart: '6vw',
            bottom: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.6rem',
            color: 'rgba(255,255,255,.62)',
            fontSize: '.62rem',
            letterSpacing: '.22em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ display: 'inline-block', width: '7rem', height: 2, background: 'rgba(255,255,255,.22)' }}>
            <span
              style={{
                display: 'block',
                height: '100%',
                width: `${Math.round(progress * 100)}%`,
                background: LINE,
              }}
            />
          </span>
          {Math.round(progress * 100)}%
        </div>
      </div>

      {/* The legs themselves. One viewport each, overlaid on the tall track so
          the sticky stage shows through. Normal scroll distance throughout —
          each leg is a landmark the reader scrolls to, not a slide the page
          decided to hold them on. */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {legs.map((leg, i) => (
          <section
            key={leg.title}
            style={{
              minHeight: '100dvh',
              display: 'flex',
              alignItems: 'center',
              padding: '0 6vw',
            }}
          >
            <div style={{ maxWidth: '30rem' }}>
              <p
                style={{
                  margin: '0 0 .9rem',
                  fontSize: '.66rem',
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  color: LINE,
                }}
              >
                {leg.time}
              </p>
              <h2
                style={{
                  margin: '0 0 1rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.6rem, 4.2vw, 2.6rem)',
                  lineHeight: 1.14,
                  letterSpacing: '-0.018em',
                  color: '#f4ece2',
                  textWrap: 'balance',
                }}
              >
                {leg.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '1rem',
                  lineHeight: 1.62,
                  color: 'rgba(244,236,226,.78)',
                  maxWidth: '38ch',
                }}
              >
                {leg.body}
              </p>
              <p
                // A counter is a ratio, not prose. Without isolation the bidi
                // algorithm reorders the run under RTL and "02 / 04" renders as
                // "04 / 02" — a wrong leg number, not just a cosmetic flip.
                dir="ltr"
                style={{
                  margin: '1.6rem 0 0',
                  fontSize: '.62rem',
                  letterSpacing: '.2em',
                  color: 'rgba(244,236,226,.34)',
                  unicodeBidi: 'isolate',
                  width: 'fit-content',
                }}
              >
                {String(i + 1).padStart(2, '0')} / {String(legs.length).padStart(2, '0')}
              </p>
            </div>
          </section>
        ))}
      </div>

      </div>
      {footer}
    </div>
  );
}

/**
 * Cross-fade weight for leg `i` at the given progress, 0..1.
 *
 * Ramps up from the previous leg's centre and down toward the next one. The
 * first and last legs get a virtual neighbour off the ends of the scroll so the
 * stage opens on a full frame at progress 0 and closes on one at progress 1,
 * instead of fading from black at both ends.
 */
function layerWeight(progress: number, ats: number[], i: number): number {
  const at = ats[i];
  const prev = i > 0 ? ats[i - 1] : at - 0.35;
  const next = i < ats.length - 1 ? ats[i + 1] : at + 0.35;
  const raw = progress <= at
    ? (progress - prev) / (at - prev)
    : (next - progress) / (next - at);
  return Math.min(1, Math.max(0, raw));
}

/** Catmull-Rom-ish smooth path through the leg points, in the 0..100 viewBox. */
function buildPath(legs: Leg[], mx: (x: number) => number): string {
  if (legs.length === 0) return '';
  const pts = legs.map((l) => [mx(l.x), l.y] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[Math.max(0, i - 1)];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${x2} ${y2}`;
  }
  return d;
}
