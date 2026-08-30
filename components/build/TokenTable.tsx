'use client';

import { useEffect, useState } from 'react';

/**
 * The palette, read from the running stylesheet rather than transcribed.
 *
 * A design system page that lists colours someone typed into it is a document,
 * and documents drift. This resolves every token against the live cascade and
 * computes its contrast, so the page cannot claim a value the site does not
 * actually use, and a token that has no definition is reported as missing
 * instead of quietly falling back.
 *
 * That last case is not hypothetical. `--sc-ink-mute` had 44 references and no
 * definition until 2026-08-29, so every one of them fell through to full ink
 * and the quiet tier of the hierarchy did not exist. Building this table is
 * what surfaced it.
 */

/**
 * A ground is measured by what body text does ON it. Ink is measured against
 * the ground it sits on. Reporting a background's own contrast against another
 * background is a number with no meaning, and printing "fails" next to it on a
 * page about rigour is worse than printing nothing.
 */
type Role = {
  token: string;
  use: string;
  kind: 'ink' | 'ground';
  /** Ink: the ground it is read on. Ground: the ink read on it. */
  against: string;
};

const ROLES: Role[] = [
  { token: '--sc-canvas', kind: 'ground', against: '--sc-ink', use: 'The ground. Warm near-black, never #000.' },
  { token: '--sc-surface', kind: 'ground', against: '--sc-ink', use: 'Raised panels and cards.' },
  { token: '--sc-ink', kind: 'ink', against: '--sc-canvas', use: 'Body copy and headings.' },
  { token: '--sc-ink-soft', kind: 'ink', against: '--sc-canvas', use: 'Secondary prose. Tinted from the ink hue, never flat grey.' },
  { token: '--sc-ink-mute', kind: 'ink', against: '--sc-canvas', use: 'Dates, captions, table headers, hints.' },
  { token: '--sc-accent', kind: 'ink', against: '--sc-canvas', use: 'Brass. The chrome and the call to action, nothing else.' },
  { token: '--sc-accent-ink', kind: 'ink', against: '--sc-accent', use: 'Text on the accent.' },
];

type Resolved = Role & {
  value: string;
  rgb: [number, number, number] | null;
  ratio: number | null;
  pairLabel: string;
};

const lin = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const luminance = ([r, g, b]: [number, number, number]) =>
  0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

function contrast(a: [number, number, number], b: [number, number, number]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Ask the browser what a value actually is, rather than parsing it here. */
function resolve(el: HTMLElement, value: string): [number, number, number] | null {
  el.style.color = '';
  el.style.color = value;
  const m = getComputedStyle(el).color.match(/-?[\d.]+/g);
  if (!m || m.length < 3) return null;
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

export function TokenTable() {
  const [rows, setRows] = useState<Resolved[] | null>(null);
  const [ground, setGround] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const probe = document.createElement('span');
    probe.style.display = 'none';
    document.body.appendChild(probe);

    const canvas = resolve(probe, cs.getPropertyValue('--sc-canvas').trim() || '#000');
    const next = ROLES.map((r) => {
      const value = cs.getPropertyValue(r.token).trim();
      const rgb = value ? resolve(probe, value) : null;
      const otherValue = cs.getPropertyValue(r.against).trim();
      const other = otherValue ? resolve(probe, otherValue) : null;
      return {
        ...r,
        value: value || '',
        rgb,
        ratio: rgb && other ? contrast(rgb, other) : null,
        pairLabel: r.kind === 'ground' ? `${r.against} on it` : `on ${r.against}`,
      };
    });

    probe.remove();
    setGround(canvas);
    setRows(next);
  }, []);

  if (!rows) {
    return (
      <p className="tokens__pending">Reading the stylesheet…</p>
    );
  }

  return (
    <div className="tokens">
      <table>
        <thead>
          <tr>
            <th scope="col">
              <span className="visually-hidden">Swatch</span>
            </th>
            <th scope="col">Token</th>
            <th scope="col">Resolved</th>
            <th scope="col">Contrast</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const missing = !r.value;
            // Every row now measures a real text-on-background pair, so every
            // row can be judged. Nothing is reported without a verdict, and no
            // verdict is invented for a pair that does not exist.
            const judged = !missing && r.ratio !== null;
            return (
              <tr key={r.token} className={missing ? 'tokens__missing' : undefined}>
                <td>
                  <span
                    className="tokens__swatch"
                    style={missing ? undefined : { background: `var(${r.token})` }}
                    aria-hidden="true"
                  />
                </td>
                <th scope="row">
                  <code>{r.token}</code>
                </th>
                <td>
                  <code>{missing ? 'not defined' : r.value}</code>
                </td>
                <td className="tokens__ratio">
                  {r.ratio === null ? (
                    '—'
                  ) : (
                    <>
                      {r.ratio.toFixed(2)}:1{' '}
                      <span className="tokens__pair">{r.pairLabel}</span>{' '}
                      {judged && (
                        <span className={r.ratio >= 4.5 ? 'tokens__pass' : 'tokens__warn'}>
                          {r.ratio >= 4.5 ? 'AA' : r.ratio >= 3 ? 'large only' : 'fails'}
                        </span>
                      )}
                    </>
                  )}
                </td>
                <td className="tokens__use">{r.use}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="tokens__foot">
        Ratios are computed in your browser, now, using the WCAG 2.2 relative luminance
        formula, and AA for body text is 4.5:1. Each row measures a real pair: an ink
        against the ground it is read on, or a ground against the ink read on it. The
        canvas resolves to <code>{ground ? `rgb(${ground.join(', ')})` : 'unknown'}</code>.
        Nothing here is transcribed, so a token missing from the stylesheet is reported
        as missing rather than quietly falling back.
      </p>
    </div>
  );
}
