'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { majorToMinor, minorToMajor } from '@/lib/money-input';
import { money, formatMoney, scale, divide, type CurrencyCode } from '@/lib/money';
import { savePackageAction, type FormState } from '@/lib/actions/forms';
import { Field, Select, Submit, FormError } from '@/components/ui/Form';

export interface EditablePackage {
  slug: string;
  status: 'draft' | 'published' | 'archived';
  nights: number;
  priceMajor: string;
  priceCurrency: string;
  nextDeparture: string;
  departureIata: string;
  partyAdults: number;
}

/**
 * Slice one of the catalogue editor: the four fields that go stale.
 *
 * Deliberately not a general-purpose CMS. Copy, the ledger and the facets are
 * later slices, and putting a half-working version of them here would invite
 * someone to type English into the Arabic column, which is the one thing this
 * project cannot recover from quietly.
 */
export function PackageEditor({ pkg, locale }: { pkg: EditablePackage; locale: string }) {
  const t = useTranslations();
  const [state, save] = useActionState<FormState, FormData>(savePackageAction, { ok: null });

  const currency = pkg.priceCurrency as CurrencyCode;

  const [priceText, setPriceText] = useState(pkg.priceMajor);
  const [nightsText, setNightsText] = useState(String(pkg.nights));

  /**
   * The rate the price is re-derived from when the length changes. Operator's
   * decision, 2026-08-28: the price follows the nights.
   *
   * It is an anchor rather than a running per-night figure, and that matters.
   * Re-deriving from the CURRENT price each time compounds the rounding, so
   * seven to six and back to seven would not return the price it started at.
   * Anchored, the arithmetic at the original length is exact, and the anchor
   * re-bases only when a price is typed by hand.
   */
  const [anchor, setAnchor] = useState({
    minor: majorToMinor(pkg.priceMajor, currency) ?? 0,
    nights: pkg.nights,
  });

  function onNights(next: string) {
    setNightsText(next);
    const n = Number(next);
    if (!Number.isInteger(n) || n < 1 || anchor.nights < 1) return;
    // Integer arithmetic, so the rounding happens once, here, and never
    // through a per-night float that would drift on every keystroke.
    const derived = Math.round((anchor.minor * n) / anchor.nights);
    setPriceText(minorToMajor(derived, currency));
  }

  function onPrice(next: string) {
    setPriceText(next);
    const m = majorToMinor(next, currency);
    const n = Number(nightsText);
    // A hand-typed price becomes the new truth, so the next length change
    // scales from what was just written rather than from what was saved.
    if (m !== null && Number.isInteger(n) && n > 0) setAnchor({ minor: m, nights: n });
  }

  const minor = majorToMinor(priceText, currency);
  const nightsNum = Number(nightsText);
  const nightsOk = Number.isInteger(nightsNum) && nightsNum > 0;

  const partyTotal =
    minor === null ? null : formatMoney(scale(money(minor, currency), pkg.partyAdults), locale);
  const perNight =
    minor === null || !nightsOk ? null : formatMoney(divide(money(minor, currency), nightsNum), locale);

  const lengthChanged = nightsOk && nightsNum !== pkg.nights;

  return (
    <form action={save} className="form pkged" noValidate>
      <FormError errorKey={state.errorKey} />

      {/* The database refuses to publish an incomplete package, and it says
          exactly what is missing. Repeating that list here is the difference
          between a screen that teaches and one that just says no. */}
      {state.reasons && state.reasons.length > 0 && (
        <ul className="pkged__blockers" role="alert">
          {state.reasons.map((r) => (
            <li key={r}>{t(`cat.r_${r}`)}</li>
          ))}
        </ul>
      )}

      {state.ok && (
        <p className="pkged__saved" role="status">
          {t('cat.saved')}
        </p>
      )}

      <Field
        name="nights"
        label={t('cat.nights')}
        type="number"
        value={nightsText}
        onChange={onNights}
        min={1}
        max={30}
        required
        hint={t('cat.nightsHint')}
      />

      <Field
        name="price"
        label={t('cat.price', { currency: pkg.priceCurrency })}
        value={priceText}
        onChange={onPrice}
        inputMode="numeric"
        required
        hint={t('cat.priceHint')}
      />

      <div className="pkged__sums" aria-live="polite">
        {partyTotal && <p>{t('cat.partyTotal', { amount: partyTotal, n: pkg.partyAdults })}</p>}
        {perNight && <p>{t('cat.perNightSum', { amount: perNight, nights: nightsNum })}</p>}
        {lengthChanged && <p className="pkged__warn">{t('cat.lengthNote')}</p>}
      </div>

      {/* A real date input, so the calendar is the operating system's and the
          value that reaches the server is always ISO regardless of whether the
          person thinks in dd/mm or mm/dd. */}
      <Field
        name="nextDeparture"
        label={t('cat.departure')}
        type="date"
        defaultValue={pkg.nextDeparture}
        required
        hint={t('cat.departureHint')}
      />

      <Select
        name="status"
        label={t('cat.status')}
        defaultValue={pkg.status}
        options={[
          { value: 'draft', label: t('cat.draft') },
          { value: 'published', label: t('cat.published') },
          { value: 'archived', label: t('cat.archived') },
        ]}
      />

      <input type="hidden" name="slug" value={pkg.slug} />
      <input type="hidden" name="locale" value={locale} />

      <Submit label={t('cat.save')} pendingLabel={t('auth.working')} />

      {/* The share card is a JPEG built at publish time, not something the page
          renders, so a price change here does not reach it. Said on the screen
          where the price changes, because that is the only moment anyone would
          act on it. */}
      <p className="note">{t('cat.cardNote')}</p>
    </form>
  );
}
