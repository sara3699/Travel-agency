'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { signInAction, signUpAction, type FormState } from '@/lib/actions/forms';
import { Field, Honeypot, Submit, FormError } from '@/components/ui/Form';

export function AuthForm({ mode, locale }: { mode: 'in' | 'up'; locale: string }) {
  const t = useTranslations();
  const [state, action] = useActionState<FormState, FormData>(
    mode === 'in' ? signInAction : signUpAction,
    { ok: null },
  );

  return (
    <form action={action} className="form" noValidate>
      <FormError errorKey={state.errorKey} />

      {mode === 'up' && (
        <Field
          name="displayName"
          label={t('auth.displayName')}
          hint={t('auth.displayNameHint')}
          autoComplete="name"
          maxLength={120}
        />
      )}

      <Field
        name="email"
        label={t('auth.email')}
        type="email"
        inputMode="email"
        required
        autoComplete="email"
      />
      <Field
        name="password"
        label={t('auth.password')}
        type="password"
        required
        hint={mode === 'up' ? t('auth.passwordHint') : undefined}
        /* current-password on sign-in, new-password on sign-up: getting this
           backwards is what makes password managers offer to "update" a
           credential the person was only signing in with. */
        autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
      />

      {mode === 'up' && <Honeypot />}
      <input type="hidden" name="locale" value={locale} />

      <Submit
        label={mode === 'in' ? t('auth.signIn') : t('auth.signUp')}
        pendingLabel={t('auth.working')}
      />
    </form>
  );
}
