'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * The visible reduced-motion control the master doc asks for (Part 7).
 *
 * Roughly half of all sites declare `prefers-reduced-motion` and almost none
 * expose a control, which strands anyone whose device preference is wrong for
 * the room they are in rather than wrong for them. A person on a bus with
 * motion sickness cannot change an OS setting for one page.
 *
 * Three states, not two. `system` follows the media query, and the two explicit
 * choices override it in BOTH directions: someone whose OS says reduce can turn
 * the motion back on here, which a boolean toggle cannot express.
 *
 * The chosen value lands on <html data-motion>, and `app/[lang]/layout.tsx`
 * replays it from localStorage before first paint. Without that the page would
 * paint with motion and snap, which is the same class of bug as setting `dir`
 * in an effect.
 */

type Pref = 'system' | 'reduce' | 'full';
const KEY = 'motion-pref';
const VALUES: readonly Pref[] = ['system', 'reduce', 'full'];

const isPref = (v: unknown): v is Pref => VALUES.includes(v as Pref);

function apply(p: Pref) {
  const el = document.documentElement;
  if (p === 'system') el.removeAttribute('data-motion');
  else el.setAttribute('data-motion', p);
}

export function MotionToggle() {
  const t = useTranslations('motion');
  // `system` on the server and on the first client render, so the markup
  // matches and hydration does not warn. The effect below corrects it.
  const [pref, setPref] = useState<Pref>('system');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (isPref(saved)) setPref(saved);
    } catch {
      // Private mode, or storage disabled. The control still works for this
      // page; it just will not be remembered.
    }
  }, []);

  function choose(next: Pref) {
    setPref(next);
    apply(next);
    try {
      if (next === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      /* nothing to do: the preference applies, it just does not persist */
    }
  }

  return (
    <fieldset className="motion">
      <legend className="motion__legend">{t('legend')}</legend>
      <div className="motion__opts">
        {VALUES.map((v) => (
          <label className="motion__opt" key={v}>
            <input
              type="radio"
              name="motion-pref"
              value={v}
              checked={pref === v}
              onChange={() => choose(v)}
            />
            <span>{t(v)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
