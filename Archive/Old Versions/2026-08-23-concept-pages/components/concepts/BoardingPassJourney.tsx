'use client';

import { useScrollProgress, useReducedMotion, beat, easeInOut, easeOut, lerp } from '@/lib/useScrollProgress';

type Stamp = { label: string; x: number; y: number; rot: number };

/**
 * Concept 2 — BOARDING PASS.
 *
 * Tactile, material, object-based. No WebGL at all: real CSS 3D transforms on
 * real DOM, so it stays light, accessible and selectable. The passport opens,
 * stamps land, the pass slides out, the itinerary unfolds like a concertina.
 */
export function BoardingPassJourney({
  copy,
  stamps,
  footer,
}: {
  copy: { eyebrow: string; title: string; body: string }[];
  stamps: Stamp[];
  footer: React.ReactNode;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const p = reduced ? 1 : progress;

  const open = easeInOut(beat(p, 0.06, 0.30));       // passport cover swings open
  const stampIn = beat(p, 0.28, 0.50);                // stamps land in sequence
  const passOut = easeOut(beat(p, 0.46, 0.70));       // boarding pass slides out
  const unfold = easeInOut(beat(p, 0.66, 0.94));      // concertina opens

  return (
    <>
      <div ref={ref} className="relative" style={{ height: '520vh' }}>
        <div
          className="sticky top-0 h-dvh overflow-hidden flex items-center justify-center"
          style={{ background: 'radial-gradient(120% 90% at 50% 20%, #f3ece0 0%, #ded2c0 55%, #c9bba6 100%)' }}
        >
          {/* Stage. perspective gives the objects real depth. */}
          <div style={{ perspective: '1600px', perspectiveOrigin: '50% 42%' }} className="relative">
            <div
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: reduced ? 'none' : `rotateX(${lerp(16, 4, open)}deg) rotateZ(${lerp(-7, -1, open)}deg)`,
                transition: 'none',
              }}
            >
              {/* Passport, inner spread */}
              <div
                className="relative rounded-[3px]"
                style={{
                  width: 'min(38vw, 330px)',
                  aspectRatio: '0.71',
                  background: 'linear-gradient(160deg,#fbf6ec,#efe4d2)',
                  boxShadow: '0 40px 80px -30px rgba(60,40,20,.55), 0 2px 0 rgba(255,255,255,.7) inset',
                }}
              >
                <div className="absolute inset-0 p-5">
                  <p className="m-0 text-[0.55rem] tracking-[0.28em] uppercase" style={{ color: '#9a8a74' }}>
                    Mars · مارس
                  </p>
                  <div className="mt-3 h-px w-full" style={{ background: '#ded0ba' }} />
                  {stamps.map((s, i) => {
                    const t = Math.min(1, Math.max(0, (stampIn - i * 0.18) / 0.34));
                    return (
                      <div
                        key={s.label}
                        className="absolute font-semibold"
                        style={{
                          insetInlineStart: `${s.x}%`,
                          top: `${s.y}%`,
                          transform: `rotate(${s.rot}deg) scale(${lerp(2.2, 1, easeOut(t))})`,
                          opacity: t,
                          color: '#a0442c',
                          border: '2px solid #a0442c',
                          borderRadius: 3,
                          padding: '4px 8px',
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Passport cover, hinged on the inline start edge */}
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotateY(${lerp(0, -168, open)}deg)`,
                  background: 'linear-gradient(150deg,#1f4034,#12271f)',
                  boxShadow: '0 30px 60px -25px rgba(0,0,0,.6)',
                  backfaceVisibility: 'hidden',
                  display: open > 0.985 ? 'none' : 'block',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ color: '#c9a668' }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', border: '1.5px solid #c9a668' }} />
                  <p className="m-0 text-[0.6rem] tracking-[0.3em] uppercase">Mars</p>
                </div>
              </div>

              {/* Boarding pass slides out from under the passport */}
              <div
                className="absolute"
                style={{
                  insetInlineStart: '38%',
                  top: '46%',
                  width: 'min(46vw, 400px)',
                  transform: `translate3d(${passOut * 44}%, ${-passOut * 26}%, ${passOut * 90}px) rotate(${lerp(-4, 2.5, passOut)}deg)`,
                  opacity: passOut,
                  background: 'linear-gradient(100deg,#fffdf8,#f6efe2)',
                  boxShadow: '0 30px 60px -24px rgba(60,40,20,.5)',
                  borderRadius: 4,
                  padding: '14px 16px',
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#22303a' }}>JED</span>
                  <span style={{ color: '#a0442c', fontSize: '0.9rem' }}>✈</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#22303a' }}>TBS</span>
                </div>
                <div className="mt-2 h-px w-full" style={{ background: '#e2d8c8' }} />
                <div className="mt-2 flex justify-between text-[0.62rem] tracking-[0.14em] uppercase" style={{ color: '#8a7c6c' }}>
                  <span>14 SEP 2026</span><span>7 nights</span><span>SAR 4,380</span>
                </div>
              </div>

              {/* Itinerary concertina */}
              <div
                className="absolute flex"
                style={{
                  insetInlineStart: '10%',
                  top: '104%',
                  transformStyle: 'preserve-3d',
                  opacity: Math.min(1, unfold * 1.6),
                }}
              >
                {[1, 2, 3, 4].map((d, i) => (
                  <div
                    key={d}
                    style={{
                      width: 'min(15vw, 118px)',
                      height: 'min(19vw, 150px)',
                      background: i % 2 ? '#f2e9da' : '#fbf6ec',
                      borderInlineEnd: '1px solid #e0d5c2',
                      transformOrigin: i % 2 ? 'left center' : 'right center',
                      transform: `rotateY(${lerp(i % 2 ? 74 : -74, 0, easeInOut(Math.min(1, Math.max(0, (unfold - i * 0.12) / 0.5))))}deg)`,
                      padding: 10,
                      boxShadow: '0 14px 30px -18px rgba(60,40,20,.5)',
                    }}
                  >
                    <p className="m-0 text-[0.52rem] tracking-[0.2em] uppercase" style={{ color: '#a0442c' }}>Day {d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="absolute start-0 top-[16vh] px-[6vw] max-w-[40ch] pointer-events-none">
            {copy.map((c, i) => {
              const from = 0.04 + i * 0.30;
              const o = reduced ? (i === copy.length - 1 ? 1 : 0)
                : Math.min(beat(p, from, from + 0.06), 1 - beat(p, from + 0.24, from + 0.30));
              return (
                <div key={i} className="absolute" style={{ opacity: o, visibility: o < 0.02 ? 'hidden' : 'visible' }}>
                  <p className="m-0 text-[0.62rem] tracking-[0.24em] uppercase" style={{ color: '#a0442c' }}>{c.eyebrow}</p>
                  <h2 className="m-0 mt-2 text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.08]" style={{ color: '#2a2118', fontWeight: 600 }}>{c.title}</h2>
                  <p className="m-0 mt-2.5 text-[0.98rem] leading-relaxed" style={{ color: '#6b5c4a' }}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {footer}
    </>
  );
}
