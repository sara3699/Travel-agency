'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Scroll-DRIVEN, never scroll-JACKED.
 *
 * The distinction matters and it is the whole reason this is safe to build.
 * Scroll-jacking overrides how far the page moves per wheel tick; NN/g found
 * that disorients the majority of users and enrages task-focused ones. This
 * does not touch scroll speed at all. The page scrolls exactly as the browser
 * intends; we only READ the position and map it to animation progress.
 *
 * Returns 0..1 across the referenced element's scrollable travel.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return setProgress(0);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const read = () => setReduced(prefersReducedMotion());
    read();

    // Two things can change the answer. The device preference, and the footer
    // control writing <html data-motion>. Watching only the media query would
    // leave the flight animating after someone had just asked it not to.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', read);
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });

    return () => {
      mq.removeEventListener('change', read);
      obs.disconnect();
    };
  }, []);
  return reduced;
}

/** Map a sub-range of overall progress to its own 0..1, with easing. */
export function beat(p: number, from: number, to: number): number {
  if (to <= from) return 0;
  return Math.min(1, Math.max(0, (p - from) / (to - from)));
}

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
export const easeOut = (t: number) => 1 - (1 - t) ** 3;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
