import { createClient } from '../supabase/server';

export type AppRole = 'admin' | 'employee' | 'customer';

export interface CurrentUser {
  id: string;
  email: string | null;
  role: AppRole;
  displayName: string | null;
  locale: string;
}

/**
 * Who is asking, and what are they allowed to be.
 *
 * The role is read from the signed access token, which is where
 * custom_access_token_hook puts it at login. If the hook is not yet enabled in
 * the dashboard the claim is absent, and this falls back to a table read --
 * slower, never wrong. Same fallback the SQL function auth_role() uses.
 *
 * Returns null for a signed-out visitor, which is the common case and not an
 * error: the whole public site works signed out.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();

  // getUser() revalidates against the auth server. getSession() only reads the
  // cookie and can be spoofed -- never use it for an access decision.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const claimed = (user.app_metadata as Record<string, unknown> | undefined)?.user_role;
  let role: AppRole = isAppRole(claimed) ? claimed : 'customer';

  if (!isAppRole(claimed)) {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    // A person may hold several rows. The strongest wins, matching the
    // ordering inside custom_access_token_hook.
    const held = new Set((data ?? []).map((r) => r.role));
    role = held.has('admin') ? 'admin' : held.has('employee') ? 'employee' : 'customer';
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, locale')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    role,
    displayName: profile?.display_name ?? null,
    locale: profile?.locale ?? 'ar',
  };
}

function isAppRole(v: unknown): v is AppRole {
  return v === 'admin' || v === 'employee' || v === 'customer';
}

export const isStaff = (u: CurrentUser | null): boolean =>
  u?.role === 'admin' || u?.role === 'employee';

export const isAdmin = (u: CurrentUser | null): boolean => u?.role === 'admin';

/**
 * For a page or action that must not run for the wrong person.
 *
 * This is a convenience, NOT the security boundary. RLS is the boundary: even
 * if this check were deleted, the database would still refuse. Treat a thrown
 * error here as a bug in routing, not as the thing keeping data safe.
 */
export async function requireStaff(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!isStaff(user)) throw new Error('FORBIDDEN: staff only');
  return user!;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!isAdmin(user)) throw new Error('FORBIDDEN: admin only');
  return user!;
}
