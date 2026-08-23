'use client';

import Image from 'next/image';
import { useScrollProgress, useReducedMotion, beat, easeInOut, easeOut, lerp } from '@/lib/useScrollProgress';

export type Chapter = {
  image: string;
  eyebrow: string;
  line: string;
  body?: string;
};

/**
 * The story, told in pinned chapters as the visitor scrolls.
 *
 * Emotion before inventory: no price, no card, no call to action until the
 * narrative has earned it. Each chapter cross-fades its full-bleed frame and
 * holds a slow scale, so the imagery breathes rather than cutting.
 *
 * Scroll-driven, never scroll-jacked: the page moves exactly as the browser
 * intends and we only read the position.
 */
export function StoryScroll({ chapters }: { chapters: Chapter[] }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = useReducedMotion();
  const n = chapters.length;
  const span = 1 / n;

  return (
    <div ref={ref} className="story" style={{ height: `${n * 110}svh` }}>
      <div className="story-stage">
        {chapters.map((c, i) => {
          const start = i * span;
          const end = start + span;
          // Overlap the fades so frames dissolve into one another.
          const fadeIn = beat(progress, start - span * 0.28, start + span * 0.22);
          const fadeOut = 1 - beat(progress, end - span * 0.22, end + span * 0.28);
          const vis = reduced ? (i === 0 ? 1 : 0) : Math.max(0, Math.min(fadeIn, fadeOut));
          const local = beat(progress, start - span * 0.3, end + span * 0.3);

          return (
            <figure key={i} className="story-frame" style={{ opacity: vis, visibility: vis < 0.01 ? 'hidden' : 'visible' }}>
              <div
                className="story-media"
                style={{ transform: reduced ? 'scale(1.04)' : `scale(${lerp(1.14, 1.02, easeInOut(local))})` }}
              >
                <Image src={c.image} alt="" fill sizes="100vw" priority={i === 0} style={{ objectFit: 'cover' }} />
              </div>
              <div className="story-veil" />
              <figcaption
                className="story-copy"
                style={{
                  transform: reduced ? 'none' : `translate3d(0, ${(1 - easeOut(fadeIn)) * 44}px, 0)`,
                }}
              >
                <p className="story-eyebrow">{c.eyebrow}</p>
                <p className="story-line display">{c.line}</p>
                {c.body && <p className="story-body">{c.body}</p>}
              </figcaption>
            </figure>
          );
        })}

        {/* Chapter ticks: quiet progress, no numbers shouting. */}
        <div className="story-ticks" aria-hidden>
          {chapters.map((_, i) => {
            const on = progress >= i * span - span * 0.2 && progress < (i + 1) * span;
            return <i key={i} className={on ? 'is-on' : ''} />;
          })}
        </div>
      </div>
    </div>
  );
}
