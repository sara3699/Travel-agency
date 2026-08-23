'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { enquiryAction, type EnquiryState } from '@/lib/actions/forms';
import { Field, TextArea, Select, Honeypot, Submit, FormError, Fieldset } from '@/components/ui/Form';

export interface TripOption {
  slug: string;
  label: string;
}

/**
 * The only write path a visitor has. It posts to a server action because the
 * public key cannot insert into `enquiries` at all: a client-side Supabase
 * call would 401, and that is the design rather than a bug.
 */
export function EnquiryForm({
  locale,
  trips,
  defaultTrip,
  defaultAdults,
  utm,
}: {
  locale: string;
  trips: TripOption[];
  defaultTrip?: string;
  defaultAdults: number;
  utm: { source?: string; medium?: string; campaign?: string };
}) {
  const t = useTranslations();
  const [state, action] = useActionState<EnquiryState, FormData>(enquiryAction, { ok: null });

  if (state.ok && state.reference) {
    return (
      <div className="sent" role="status">
        <p className="sent__kicker">{t('enquiry.sentTitle')}</p>
        <p className="sent__ref">{state.reference}</p>
        <p className="note">{t('enquiry.sentLede')}</p>
        {state.statusPath && (
          <a className="btn" href={state.statusPath}>
            {t('enquiry.trackLink')}
          </a>
        )}
        <p className="note">{t('enquiry.responseWindow')}</p>
      </div>
    );
  }

  return (
    <form action={action} className="form" noValidate>
      <FormError errorKey={state.errorKey} />

      <Select
        name="packageSlug"
        label={t('enquiry.trip')}
        defaultValue={defaultTrip}
        options={[{ value: '', label: t('enquiry.noTrip') }, ...trips.map((x) => ({ value: x.slug, label: x.label }))]}
      />

      <Field
        name="contactName"
        label={t('enquiry.name')}
        required
        autoComplete="name"
        maxLength={120}
      />

      <Fieldset legend={t('enquiry.contactHint')}>
        <Field name="contactPhone" label={t('enquiry.phone')} type="tel" inputMode="tel" autoComplete="tel" />
        <Field name="contactEmail" label={t('enquiry.email')} type="email" inputMode="email" autoComplete="email" />
      </Fieldset>

      <div className="row">
        <Field
          name="partyAdults"
          label={t('enquiry.adults')}
          type="number"
          inputMode="numeric"
          min={1}
          max={12}
          defaultValue={defaultAdults}
        />
        <Field
          name="partyChildren"
          label={t('enquiry.children')}
          type="number"
          inputMode="numeric"
          min={0}
          max={12}
          defaultValue={0}
        />
      </div>

      {/* A month is enough. A full calendar picker for a trip that is months
          out is a precision the traveller does not have yet. */}
      <Field
        name="preferredDeparture"
        label={t('enquiry.when')}
        hint={t('enquiry.whenHint')}
        type="month"
      />

      <TextArea
        name="message"
        label={t('enquiry.message')}
        hint={t('enquiry.messageHint')}
        maxLength={4000}
      />

      <Honeypot />
      <input type="hidden" name="locale" value={locale} />
      {/* Attribution is also read server-side from the request, which is what
          survives WebKit capping script-written cookies at 24 hours. These
          carry it when the visitor arrived on a tagged link. */}
      <input type="hidden" name="utmSource" value={utm.source ?? ''} />
      <input type="hidden" name="utmMedium" value={utm.medium ?? ''} />
      <input type="hidden" name="utmCampaign" value={utm.campaign ?? ''} />

      <Submit label={t('enquiry.send')} pendingLabel={t('enquiry.sending')} />
      <p className="note">{t('enquiry.responseWindow')}</p>
    </form>
  );
}
