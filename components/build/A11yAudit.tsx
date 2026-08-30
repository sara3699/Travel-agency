'use client';

import { useEffect, useState } from 'react';

/**
 * A handful of WCAG checks, run against the page you are reading, now.
 *
 * The point is falsifiability. An accessibility statement is the easiest
 * document in a codebase to write dishonestly, because nothing in it is
 * checkable by the person reading it. These checks are, and they run in the
 * reader's own browser with the reader's own settings.
 *
 * The limits are stated on the page rather than buried here: this audits one
 * page, catches only what static inspection can catch, and cannot tell you
 * whether a screen reader makes sense of any of it. A green result here is
 * evidence, not a pass.
 */

type Check = { id: string; label: string; found: number; detail: string };

/** An element is interactive if a keyboard or pointer can act on it. */
const INTERACTIVE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The box that actually activates a control, which is not always the control.
 *
 * A radio wrapped in a label is activated by clicking anywhere on the label, so
 * the label is the target WCAG 2.5.8 is talking about. Measuring the input
 * instead reports every 16 pixel radio on the web as a failure, which is how
 * this check first read the site's own motion toggle: three flags on controls
 * whose labels are 138, 74 and 46 pixels wide and all 24 tall.
 */
function targetBox(el: Element): DOMRect {
  const own = el.getBoundingClientRect();
  const wrapping = el.closest('label');
  const id = el.getAttribute('id');
  const referencing = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
  const label = wrapping ?? referencing;
  if (!label) return own;
  const lr = label.getBoundingClientRect();
  // The larger of the two: a label can be smaller than the control it names.
  return lr.width * lr.height > own.width * own.height ? lr : own;
}

/**
 * Whether an element is exposed to assistive technology at all.
 *
 * A hidden input is form plumbing, not a control: React's own server-action
 * fields alone put eight of them on the enquiry form, and none is reachable by
 * anyone. Counting them reported a correctly labelled form as having eight
 * unnamed inputs.
 *
 * Zero AREA rather than zero size, so a visually-hidden label at one pixel
 * square still counts. Those are exactly the elements that must keep a name.
 */
function inAccessibilityTree(el: Element): boolean {
  if (el.getAttribute('type') === 'hidden') return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  const r = el.getBoundingClientRect();
  return r.width * r.height > 0;
}

function accessibleNameMissing(el: Element): boolean {
  const aria = el.getAttribute('aria-label');
  if (aria && aria.trim()) return false;
  if (el.getAttribute('aria-labelledby')) return false;
  if (el.getAttribute('title')) return false;
  if ((el as HTMLElement).innerText?.trim()) return false;
  // A labelled form control counts, whether wrapped or referenced by id.
  const id = el.getAttribute('id');
  if (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) return false;
  if (el.closest('label')) return false;
  // An image button carries its name on the image.
  const img = el.querySelector('img[alt]');
  if (img && img.getAttribute('alt')?.trim()) return false;
  return true;
}

export function A11yAudit() {
  const [checks, setChecks] = useState<Check[] | null>(null);

  useEffect(() => {
    const results: Check[] = [];

    const imgs = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt'));
    results.push({
      id: 'alt',
      label: 'Images with no alt attribute',
      found: imgs.length,
      detail: 'A decorative image needs alt="", not a missing attribute. The two mean different things to a screen reader.',
    });

    const unnamed = [...document.querySelectorAll(INTERACTIVE)]
      .filter(inAccessibilityTree)
      .filter(accessibleNameMissing);
    results.push({
      id: 'name',
      label: 'Interactive elements with no accessible name',
      found: unnamed.length,
      detail: 'A control nobody can name is a control nobody can be told about. Hidden inputs are form plumbing rather than controls and are not counted.',
    });

    // 2.4.6 and 1.3.1: a level skipped is a level a screen reader user has to
    // guess at when navigating by heading.
    const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
    let skips = 0;
    for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skips++;
    results.push({
      id: 'headings',
      label: 'Heading levels skipped',
      found: skips,
      detail: `${levels.length} headings on this page, read in order.`,
    });

    // WCAG 2.2, 2.5.8 Target Size (Minimum): 24 by 24 CSS pixels, with
    // exceptions this check does not model, so treat a count as a prompt to
    // look rather than as a failure.
    const small = [...document.querySelectorAll(INTERACTIVE)].filter(inAccessibilityTree).filter((el) => {
      const r = targetBox(el);
      if (el.closest('p, li, span, h1, h2, h3')) return false; // inline text links are exempt
      return r.width < 24 || r.height < 24;
    });
    results.push({
      id: 'target',
      label: 'Targets under 24 by 24 pixels',
      found: small.length,
      detail: 'WCAG 2.2 criterion 2.5.8. Measured on whatever actually activates the control, so a small radio inside a large label counts as the label. Links inside a sentence are exempt.',
    });

    const langMissing = document.documentElement.getAttribute('lang') ? 0 : 1;
    results.push({
      id: 'lang',
      label: 'Document missing a lang attribute',
      found: langMissing,
      detail: `This document declares lang="${document.documentElement.getAttribute('lang') ?? 'nothing'}" and dir="${document.documentElement.getAttribute('dir') ?? 'nothing'}".`,
    });

    setChecks(results);
  }, []);

  if (!checks) return <p className="tokens__pending">Running the checks…</p>;

  const total = checks.reduce((n, c) => n + c.found, 0);

  return (
    <div className="a11y">
      <ul className="a11y__list">
        {checks.map((c) => (
          <li key={c.id} className={c.found === 0 ? 'a11y__ok' : 'a11y__flag'}>
            <span className="a11y__count">{c.found}</span>
            <span className="a11y__label">{c.label}</span>
            <span className="a11y__detail">{c.detail}</span>
          </li>
        ))}
      </ul>
      <p className="a11y__foot">
        {total === 0
          ? 'Nothing flagged on this page, by these checks, in this browser.'
          : `${total} thing${total === 1 ? '' : 's'} flagged on this page. A count is a prompt to look, not a verdict.`}{' '}
        These run on the page you are reading and catch only what static inspection can
        catch. They cannot tell you whether a screen reader makes sense of any of it, and
        a clean result here is evidence rather than a pass.
      </p>
    </div>
  );
}
