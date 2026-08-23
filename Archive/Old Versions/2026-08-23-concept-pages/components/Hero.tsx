'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/** Full-bleed editorial statement. Deliberately carries type only: the search
 *  lives on solid ground below, because a photo with a search box floating on
 *  it is the exact anatomy every competitor ships. */
export function Hero({ eyebrow, headline, sub, scrollLabel }: { eyebrow: string; headline: string; sub: string; scrollLabel: string }) {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let f = 0;
    const on = () => { if (f) return; f = requestAnimationFrame(() => { f = 0; setY(window.scrollY); }); };
    window.addEventListener('scroll', on, { passive: true });
    return () => { if (f) cancelAnimationFrame(f); window.removeEventListener('scroll', on); };
  }, []);

  return (
    <section className="hero">
      <div className="hero-media" style={{ transform: `translate3d(0, ${y * 0.24}px, 0) scale(1.08)` }}>
        <Image src="/img/hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="hero-scrim" />
      <div className="hero-inner" style={{ transform: `translate3d(0, ${y * -0.06}px, 0)`, opacity: Math.max(0, 1 - y / 620) }}>
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 className="hero-h1 display">{headline}</h1>
        <p className="hero-sub">{sub}</p>
      </div>
      <div className="hero-scroll" style={{ opacity: Math.max(0, 1 - y / 260) }}>
        <span>{scrollLabel}</span>
        <i />
      </div>
    </section>
  );
}
