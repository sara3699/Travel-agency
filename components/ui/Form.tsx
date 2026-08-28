'use client';

import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

/* Shared controls. Every screen uses these rather than hand-rolling inputs,
   which is what keeps focus rings, hint wiring and error copy identical
   across the enquiry form, the auth screens and the staff surface. */

export function Field({
  name,
  label,
  hint,
  type = 'text',
  required,
  defaultValue,
  autoComplete,
  inputMode,
  min,
  max,
  maxLength,
  value,
  onChange,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  min?: number;
  max?: number;
  maxLength?: number;
  /* Controlled mode, used only where one field has to move another: the
     catalogue editor rewrites the price when the length changes. Passing
     `value` without `onChange` would make the input read-only, so the pair
     travels together and `defaultValue` is ignored while it is present. */
  value?: string;
  onChange?: (next: string) => void;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <p className="field">
      <label htmlFor={name}>
        {label}
        {required && (
          <span className="field__req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        {...(value !== undefined
          ? { value, onChange: (e) => onChange?.(e.target.value) }
          : { defaultValue })}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        max={max}
        maxLength={maxLength}
        aria-describedby={hintId}
      />
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
    </p>
  );
}

export function TextArea({
  name,
  label,
  hint,
  rows = 4,
  maxLength,
}: {
  name: string;
  label: string;
  hint?: string;
  rows?: number;
  maxLength?: number;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <p className="field">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={rows} maxLength={maxLength} aria-describedby={hintId} />
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
    </p>
  );
}

export function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <p className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={defaultValue}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </p>
  );
}

/**
 * A field a person never sees and a bot fills in. The backend answers success
 * when it is filled, so the bot never learns it was caught.
 *
 * Hidden with position and clip rather than display:none or type=hidden: both
 * of those are trivially detected and skipped by anything worth stopping.
 */
export function Honeypot() {
  return (
    <div className="honeypot" aria-hidden="true">
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function Submit({
  label,
  pendingLabel,
  variant = 'primary',
}: {
  label: string;
  pendingLabel?: string;
  variant?: 'primary' | 'quiet';
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={variant === 'primary' ? 'btn' : 'btn btn--quiet'}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? (pendingLabel ?? label) : label}
    </button>
  );
}

/**
 * The server never sends a sentence, only a key, so the translation happens
 * here. An unknown key renders as the generic failure rather than as a raw
 * dotted path leaking into the interface.
 */
export function FormError({ errorKey }: { errorKey?: string }) {
  const t = useTranslations();
  if (!errorKey) return null;
  let text: string;
  try {
    text = t(errorKey);
    if (text === errorKey) text = t('auth.unknown');
  } catch {
    text = t('auth.unknown');
  }
  return (
    <p className="form-error" role="alert">
      {text}
    </p>
  );
}

export function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="fieldset">
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}
