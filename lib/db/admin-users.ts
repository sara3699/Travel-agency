'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../supabase/admin';
import { createClient } from '../supabase/server';
import { requireAdmin } from '../auth/session';

/**
 * Staff administration. This is one of the only three jobs that legitimately
 * needs the secret key: creating an auth user and granting a role both happen
 * outside what any browser is permitted to do.
 *
 * There is no self-service path to becoming staff. That is the point.
 */

export async function listStaff() {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_roles')
    .select('user_id, role, granted_at, profiles:user_id ( display_name, email, locale )')
    .in('role', ['admin', 'employee'])
    .order('granted_at', { ascending: true });

  if (error) throw new Error(`listStaff: ${error.message}`);
  return data ?? [];
}

/**
 * Creates an employee. Email confirmation is off by decision, so the account is
 * usable immediately; the admin hands over the password out of band.
 *
 * The password is never stored or logged here. It goes straight to Supabase
 * Auth, which hashes it.
 */
export async function createEmployee(formData: FormData) {
  const admin = await requireAdmin();

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const displayName = String(formData.get('displayName') ?? '').trim();
  const role = String(formData.get('role') ?? 'employee');

  if (!email || !password) return { ok: false, errorKey: 'admin.missingFields' };
  if (password.length < 12) return { ok: false, errorKey: 'admin.staffPasswordTooShort' };
  if (role !== 'employee' && role !== 'admin')
    return { ok: false, errorKey: 'admin.roleInvalid' };

  const client = createAdminClient();

  const { data, error } = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName || null },
  });

  if (error || !data.user) return { ok: false, errorKey: 'admin.createFailed' };

  // The signup trigger already granted 'customer'. Add the staff row alongside
  // it; the login hook resolves the strongest role.
  const { error: roleError } = await client
    .from('user_roles')
    .insert({ user_id: data.user.id, role, granted_by: admin.id });

  if (roleError) return { ok: false, errorKey: 'admin.roleGrantFailed' };

  revalidatePath('/', 'layout');
  return { ok: true, userId: data.user.id };
}

/**
 * Removes a staff grant. The person keeps their customer account and their own
 * enquiry history -- this revokes access, it does not delete a human being.
 *
 * NOTE: the role is carried in the access token, so this takes effect on their
 * next token refresh (about an hour). To cut access immediately, follow it with
 * revokeSessions().
 */
export async function revokeStaffRole(userId: string, role: 'admin' | 'employee') {
  await requireAdmin();
  const client = createAdminClient();

  const { error } = await client
    .from('user_roles')
    .delete()
    .eq('user_id', userId)
    .eq('role', role);

  if (error) return { ok: false, errorKey: 'admin.revokeFailed' };
  revalidatePath('/', 'layout');
  return { ok: true };
}

/** Ends every active session for a user, so a revoked role bites at once. */
export async function revokeSessions(userId: string) {
  await requireAdmin();
  const client = createAdminClient();
  const { error } = await client.auth.admin.signOut(userId, 'global');
  if (error) return { ok: false, errorKey: 'admin.revokeFailed' };
  return { ok: true };
}
