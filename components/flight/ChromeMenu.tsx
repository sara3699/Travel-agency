'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/**
 * The chrome bar's small-screen menu.
 *
 * The bar holds a wordmark, five navigation links, a three-language switcher
 * and a sign-in button, in one fixed row over a page that does not scroll
 * sideways. At 375px that row could not fit, and what did not fit was not
 * cramped, it was clipped and unreachable: measured on 2026-08-30, the nav ran
 * 340px starting at x = -121, and the language switcher and sign-in button had
 * been off-screen at that width for longer than that.
 *
 * Letting the bar wrap made everything reachable and made it 230px tall, which
 * is a quarter of a phone screen of fixed chrome sitting over the film. The
 * accessibility contract names exactly this: watch the fixed-position pile-up,
 * because the focused element still has to land somewhere unobstructed.
 *
 * ## Why the button appears only after hydration
 *
 * The collapsed state is an enhancement, never the baseline. Server-rendered
 * markup carries no button and no collapse, so a browser that never runs this
 * file gets the wrapping bar: tall, but every link reachable. The button and
 * the collapse arrive together, or neither does. The alternative - rendering
 * the panel hidden and depending on hydration to open it - fails closed, and
 * failing closed here means the navigation disappears.
 *
 * It costs a paint. It costs no layout shift: `.chrome` is `position: fixed`,
 * so its height change moves nothing in document flow and contributes nothing
 * to CLS.
 */
export function ChromeMenu({ label, children }: { label: string; children: ReactNode }) {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setEnhanced(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      // Focus goes back to the control that opened the panel. Leaving it on a
      // link inside a panel that has just been hidden strands the keyboard.
      btnRef.current?.focus();
    };

    // Pointerdown rather than click: a click that starts outside and ends
    // inside would otherwise close the panel out from under the press.
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // The pre-hydration shape, and the permanent shape for anyone without JS.
  if (!enhanced) return <div className="chrome__right">{children}</div>;

  return (
    <div className="chrome__menu" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="chrome__menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Two bars, not three. The icon is decorative and carries no name of
            its own; the word beside it is the accessible name, which is why
            there is a word at all. A tooltip would not survive touch, and the
            master document is explicit that a visitor has to be able to
            predict what is behind a control. The glyph is symmetric on the
            inline axis, so it reads the same in Arabic without any mirroring
            step - which is the point, since a global icon flip is on the
            refusal list. */}
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
          {open ? (
            <path
              d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2.5 5 H13.5 M2.5 11 H13.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
        <span>{label}</span>
      </button>

      <div className="chrome__right" id={panelId} data-open={open || undefined}>
        {children}
      </div>
    </div>
  );
}
