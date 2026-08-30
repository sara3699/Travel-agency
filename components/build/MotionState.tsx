'use client';

import { useEffect, useState } from 'react';

/**
 * The motion contract, read from the running page rather than described.
 *
 * Three things decide whether something moves here, and a reader can only
 * check the claim if all three are visible at once: what the device asks for,
 * what the footer control was set to, and which of those two wins. A page that
 * merely says "we honour prefers-reduced-motion" is unfalsifiable.
 */

type State = {
  mediaQuery: boolean;
  attribute: string | null;
  stored: string | null;
  resolved: 'reduce' | 'full';
  tokens: Record<string, string>;
};

const TOKENS = ['--sc-d-fast', '--sc-d-base', '--sc-d-slow', '--sc-ease-out', '--sc-ease-in-out'];

export function MotionState() {
  const [s, setS] = useState<State | null>(null);

  useEffect(() => {
    const read = () => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const attribute = root.getAttribute('data-motion');
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('motion-pref');
      } catch {
        // private mode: the control still works, it just is not remembered
      }
      const resolved =
        attribute === 'reduce' ? 'reduce' : attribute === 'full' ? 'full' : mediaQuery ? 'reduce' : 'full';

      setS({
        mediaQuery,
        attribute,
        stored,
        resolved,
        tokens: Object.fromEntries(TOKENS.map((t) => [t, cs.getPropertyValue(t).trim() || 'not defined'])),
      });
    };

    read();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', read);
    // The footer control writes the attribute, so the panel has to watch it or
    // it would show a stale answer the moment anyone used the thing it documents.
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    return () => {
      mq.removeEventListener('change', read);
      obs.disconnect();
    };
  }, []);

  if (!s) return <p className="tokens__pending">Reading the page…</p>;

  return (
    <div className="motionstate">
      <dl className="motionstate__grid">
        <dt>Your device asks for</dt>
        <dd>{s.mediaQuery ? 'reduced motion' : 'no preference'}</dd>

        <dt>The control on this site is set to</dt>
        <dd>{s.attribute ?? 'match my device'}</dd>

        <dt>Remembered in this browser</dt>
        <dd>{s.stored ?? 'nothing stored'}</dd>

        <dt>So this page is currently</dt>
        <dd className="motionstate__resolved">
          {s.resolved === 'reduce' ? 'reducing motion' : 'showing full motion'}
        </dd>
      </dl>

      <p className="motionstate__hint">
        Change it in the footer of any page and these four lines update without a reload.
        An explicit choice beats the device preference in both directions, which is why
        the control has three states and not a checkbox.
      </p>

      <table className="tokens__inline">
        <caption>Durations and easings, resolved from the stylesheet now</caption>
        <tbody>
          {Object.entries(s.tokens).map(([k, v]) => (
            <tr key={k}>
              <th scope="row">
                <code>{k}</code>
              </th>
              <td>
                <code>{v}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
