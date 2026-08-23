'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import {
  createEmployeeAction,
  revokeRoleAction,
  revokeSessionsAction,
  type FormState,
} from '@/lib/actions/forms';
import { Field, Select, Submit, FormError } from '@/components/ui/Form';

export interface StaffRow {
  userId: string;
  role: 'admin' | 'employee';
  name: string;
  grantedISO: string;
}

export function StaffAdmin({ rows, locale }: { rows: StaffRow[]; locale: string }) {
  const t = useTranslations();
  const [createState, create] = useActionState<FormState, FormData>(createEmployeeAction, { ok: null });
  const [revokeState, revoke] = useActionState<FormState, FormData>(revokeRoleAction, { ok: null });
  const [sessState, revokeSess] = useActionState<FormState, FormData>(revokeSessionsAction, { ok: null });

  const df = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'short', day: 'numeric', numberingSystem: 'latn',
  });

  return (
    <>
      <section className="panel">
        <h2 className="panel__title">{t('admin.create')}</h2>
        <form action={create} className="form" noValidate>
          <FormError errorKey={createState.errorKey} />
          <Field name="displayName" label={t('auth.displayName')} maxLength={120} />
          <Field name="email" label={t('auth.email')} type="email" inputMode="email" required autoComplete="off" />
          {/* 12 characters, not the 8 a customer needs. A staff account reads
              every traveller's phone number. */}
          <Field
            name="password"
            label={t('auth.password')}
            type="password"
            required
            autoComplete="new-password"
            hint={t('admin.staffPasswordTooShort')}
          />
          <Select
            name="role"
            label={t('admin.role')}
            defaultValue="employee"
            options={[
              { value: 'employee', label: t('admin.employee') },
              { value: 'admin', label: t('admin.adminRole') },
            ]}
          />
          <input type="hidden" name="locale" value={locale} />
          <Submit label={t('admin.create')} pendingLabel={t('auth.working')} />
          <p className="note">{t('admin.passwordOnce')}</p>
        </form>
      </section>

      <FormError errorKey={revokeState.errorKey ?? sessState.errorKey} />

      {rows.length === 0 ? (
        <p className="empty__line">{t('admin.noStaff')}</p>
      ) : (
        <ul className="rows">
          {rows.map((r) => (
            <li key={`${r.userId}-${r.role}`} className="row-card">
              <span className="row-card__ref">{r.name || r.userId.slice(0, 8)}</span>
              <span className="pill" data-status={r.role === 'admin' ? 'won' : 'assigned'}>
                {r.role === 'admin' ? t('admin.adminRole') : t('admin.employee')}
              </span>
              <span className="row-card__meta">
                {t('admin.granted')} {df.format(new Date(r.grantedISO))}
              </span>
              <span className="row-card__acts">
                <form action={revoke}>
                  <input type="hidden" name="userId" value={r.userId} />
                  <input type="hidden" name="role" value={r.role} />
                  <input type="hidden" name="locale" value={locale} />
                  <Submit label={t('admin.revoke')} variant="quiet" />
                </form>
                <form action={revokeSess}>
                  <input type="hidden" name="userId" value={r.userId} />
                  <input type="hidden" name="locale" value={locale} />
                  <Submit label={t('admin.revokeSessions')} variant="quiet" />
                </form>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
