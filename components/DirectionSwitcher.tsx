'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const DIRECTIONS = ['ledger', 'majlis', 'atlas'] as const;
type Direction = (typeof DIRECTIONS)[number];

/**
 * DIR-04. Comparison harness, not a product feature.
 *
 * Each direction is a token set and nothing else, so switching swaps one
 * attribute on <html>. No component knows which direction is active.
 */
export function DirectionSwitcher() {
  const t = useTranslations();
  const [active, setActive] = useState<Direction>('ledger');

  useEffect(() => {
    document.documentElement.setAttribute('data-direction', active);
  }, [active]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="eyebrow">{t('direction.label')}</span>
      <div role="radiogroup" aria-label={t('direction.label')} className="flex gap-1">
        {DIRECTIONS.map((d) => (
          <button
            key={d}
            role="radio"
            aria-checked={active === d}
            onClick={() => setActive(d)}
            className={`px-3 py-1.5 text-[0.82rem] border rounded-[var(--radius-sm)] cursor-pointer
              ${active === d
                ? 'bg-accent text-on-accent border-accent'
                : 'bg-transparent text-ink-soft border-rule'}`}
          >
            {t(`direction.${d}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
