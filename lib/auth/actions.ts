'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';

export interface AuthResult {
  ok: boolean;
  /** A message key for next-intl, never a sentence. Copy lives in messages/. */
  errorKey?: string;
}

/**
 * Sign-up. Email confirmation is OFF by decision of 2026-08-23, so the session
 * is live the moment this returns -- there is no inbox round-trip.
 *
 * Every signup is a customer. The database trigger assigns that role; nothing
 * here can request a different one, and a forged role in the request body would
 * be ignored because the browser has no write access to user_roles at all.
 */
export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const displayName = String(formData.get('displayName') ?? '').trim();
  const locale = String(formData.get('locale') ?? 'ar');

  if (!email || !password) return { ok: false, errorKey: 'auth.missingFields' };
  if (password.length < 8) return { ok: false, errorKey: 'auth.passwordTooShort' };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Read by handle_new_user() to populate the profile row.
      data: { display_name: displayName || null, locale },
    },
  });

  if (error) return { ok: false, errorKey: mapAuthError(error.message) };

  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) return { ok: false, errorKey: 'auth.missingFields' };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { ok: false, errorKey: mapAuthError(error.message) };

  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  return { ok: true };
}

/**
 * Never surface Supabase's own English error text. It is not translated, it
 * leaks implementation detail, and "Invalid login credentials" deliberately
 * does not distinguish a wrong password from an unknown address -- keep that
 * property rather than helpfully explaining which it was.
 */
function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('already registered') || m.includes('already been registered'))
    return 'auth.emailTaken';
  if (m.includes('invalid login credentials')) return 'auth.invalidCredentials';
  if (m.includes('rate limit') || m.includes('too many')) return 'auth.tooManyAttempts';
  return 'auth.unknown';
}
