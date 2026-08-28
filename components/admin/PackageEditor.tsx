'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { majorToMinor } from '@/lib/money-input';
import { money, formatMoney, scale, type CurrencyCode } from '@/lib/money';
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

  // The field holds the PER PERSON price, which is the one thing about this
  // screen that can be misread into doubling every price on the site. So the
  // party total is computed as it is typed and shown underneath, in the same
  // words the traveller sees it in.
  const [priceText, setPriceText] = useState(pkg.priceMajor);
  const minor = majorToMinor(priceText, pkg.priceCurrency as CurrencyCode);
  const partyTotal =
    minor === null
      ? null
      : formatMoney(scale(money(minor, pkg.priceCurrency as CurrencyCode), pkg.partyAdults), locale);

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

      <div onInput={(e) => {
        const el = e.target as HTMLInputElement;
        if (el.name === 'price') setPriceText(el.value);
      }}>
        <Field
          name="price"
          label={t('cat.price', { currency: pkg.priceCurrency })}
          defaultValue={pkg.priceMajor}
          inputMode="numeric"
          required
          hint={t('cat.priceHint')}
        />
      </div>
      {partyTotal && (
        <p className="pkged__total" aria-live="polite">
          {t('cat.partyTotal', { amount: partyTotal, n: pkg.partyAdults })}
        </p>
      )}

      <Field
        name="nights"
        label={t('cat.nights')}
        type="number"
        defaultValue={pkg.nights}
        min={1}
        max={30}
        required
      />

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
