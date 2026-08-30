'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

/** Slow, single-shot entrance. Persistent: once revealed it stays revealed, so
 *  a user scrolling back never sees content vanish. Reduced motion gets the end
 *  state immediately rather than a stripped-out one. */
export function Reveal({ children, delay = 0, as: As = 'div' }: { children: React.ReactNode; delay?: number; as?: React.ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return setShown(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As ref={ref} className={`reveal${shown ? ' is-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}
