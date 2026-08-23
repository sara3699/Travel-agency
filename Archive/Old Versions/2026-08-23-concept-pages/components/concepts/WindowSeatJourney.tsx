'use client';

import { useScrollProgress, useReducedMotion, beat, easeInOut, lerp } from '@/lib/useScrollProgress';

/**
 * Concept 3 — WINDOW SEAT.
 *
 * Immersive and atmospheric. The viewport IS the cabin window. Scroll advances
 * the flight through a day: the sky moves dawn → noon → dusk → night, parallax
 * terrain layers move at genuinely different depths, and the trip facts arrive
 * as quiet overlays rather than cards.
 */

type Sky = { at: number; top: string; bottom: string; sun: string; land: string; haze: string };

const SKIES: Sky[] = [
  { at: 0.00, top: '#0d1b3e', bottom: '#c9633f', sun: '#ffb367', land: '#1b2338', haze: '#e08a4f' },
  { at: 0.34, top: '#3f83c9', bottom: '#bfe0f2', sun: '#fff6df', land: '#3c5a49', haze: '#cfe6f2' },
  { at: 0.66, top: '#243a6b', bottom: '#e0794c', sun: '#ffcf8f', land: '#2c3346', haze: '#e8a06a' },
  { at: 1.00, top: '#05070f', bottom: '#141d33', sun: '#dfe8ff', land: '#0a0d16', haze: '#2b3450' },
];

function mixHex(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const p = pa.map((v, i) => Math.round(lerp(v, pb[i], t)));
  return `#${p.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function skyAt(p: number): Sky {
  let i = 0;
  while (i < SKIES.length - 2 && p > SKIES[i + 1].at) i++;
  const a = SKIES[i], b = SKIES[i + 1];
  const t = easeInOut(Math.min(1, Math.max(0, (p - a.at) / (b.at - a.at))));
  return {
    at: p,
    top: mixHex(a.top, b.top, t),
    bottom: mixHex(a.bottom, b.bottom, t),
    sun: mixHex(a.sun, b.sun, t),
    land: mixHex(a.land, b.land, t),
    haze: mixHex(a.haze, b.haze, t),
  };
}

export function WindowSeatJourney({
  copy,
  footer,
}: {
  copy: { time: string; title: string; body: string }[];
  footer: React.ReactNode;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const p = reduced ? 0.34 : progress;
  const sky = skyAt(p);

  return (
    <>
      <div ref={ref} className="relative" style={{ height: '600vh' }}>
        <div className="sticky top-0 h-dvh overflow-hidden" style={{ background: '#07090f' }}>
          {/* Cabin interior: the window is a hole cut through it. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: 'min(76vw, 640px)',
                height: 'min(76vh, 720px)',
                borderRadius: '48% 48% 48% 48% / 34% 34% 34% 34%',
                boxShadow: '0 0 0 18px #d9d5cd, 0 0 0 24px #b9b4aa, 0 40px 90px -30px rgba(0,0,0,.8), inset 0 0 60px rgba(0,0,0,.35)',
                background: `linear-gradient(${lerp(178, 186, p)}deg, ${sky.top} 0%, ${sky.bottom} 100%)`,
              }}
            >
              {/* Sun / moon, tracking across the arc of the flight */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 'clamp(38px, 7vw, 74px)',
                  aspectRatio: '1',
                  background: sky.sun,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 90px 30px ${sky.haze}55`,
                  insetInlineStart: `${lerp(8, 74, p)}%`,
                  top: `${28 + Math.sin(p * Math.PI) * -14}%`,
                  opacity: 0.95,
                }}
              />
              {/* Cloud deck: nearest layer, fastest */}
              {[0, 1, 2].map((i) => (
                <div
                  key={`c${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${38 + i * 16}%`,
                    height: `${9 + i * 3}%`,
                    background: sky.haze,
                    opacity: 0.24 - i * 0.05,
                    filter: 'blur(14px)',
                    top: `${44 + i * 9}%`,
                    insetInlineStart: `${((1 - p) * (120 + i * 90) + i * 30) % 160 - 30}%`,
                  }}
                />
              ))}
              {/* Terrain: three depths, three speeds. Real parallax. */}
              {[
                { d: 0.22, h: 20, o: 1 },
                { d: 0.46, h: 15, o: 0.82 },
                { d: 0.82, h: 11, o: 0.6 },
              ].map((layer, i) => (
                <div
                  key={`l${i}`}
                  className="absolute inset-x-0"
                  style={{
                    bottom: `${-2 + i * 4}%`,
                    height: `${layer.h}%`,
                    background: sky.land,
                    opacity: layer.o,
                    transform: `translate3d(${(0.5 - p) * layer.d * 260}%, 0, 0)`,
                    clipPath:
                      i === 0
                        ? 'polygon(0 62%,9% 34%,17% 56%,27% 22%,38% 50%,49% 18%,58% 46%,69% 26%,80% 54%,91% 30%,100% 58%,100% 100%,0 100%)'
                        : i === 1
                        ? 'polygon(0 54%,12% 30%,24% 52%,36% 26%,50% 48%,63% 24%,76% 50%,88% 28%,100% 52%,100% 100%,0 100%)'
                        : 'polygon(0 48%,15% 32%,32% 50%,50% 30%,68% 48%,85% 32%,100% 46%,100% 100%,0 100%)',
                  }}
                />
              ))}
              {/* Glass: reflection and the double-pane bloom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(118deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 66%, rgba(255,255,255,.09) 100%)',
                }}
              />
            </div>
          </div>

          {/* Overlaid facts, timed to the flight */}
          <div className="absolute start-0 bottom-[8vh] px-[5vw] max-w-[38ch] pointer-events-none">
            {copy.map((c, i) => {
              const from = i * 0.26;
              const o = reduced
                ? (i === 0 ? 1 : 0)
                : Math.min(beat(p, from, from + 0.07), 1 - beat(p, from + 0.19, from + 0.26));
              return (
                <div key={i} className="absolute bottom-0" style={{ opacity: o, visibility: o < 0.02 ? 'hidden' : 'visible' }}>
                  <p className="m-0 text-[0.62rem] tracking-[0.26em] uppercase" style={{ color: sky.sun }}>{c.time}</p>
                  <h2 className="m-0 mt-2 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.1] text-white font-semibold">{c.title}</h2>
                  <p className="m-0 mt-2 text-[0.96rem] leading-relaxed" style={{ color: 'rgba(255,255,255,.78)' }}>{c.body}</p>
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
