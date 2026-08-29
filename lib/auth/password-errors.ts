/**
 * Reading a rejected password out of a Supabase auth error.
 *
 * Its own module because `lib/auth/actions.ts` is a 'use server' file, where
 * every export has to be an async server action, and `lib/db/admin-users.ts`
 * needs the same answer when it creates a staff account.
 *
 * The structured fields are read by shape rather than imported.
 * `isAuthWeakPasswordError` is not re-exported by @supabase/supabase-js, and
 * @supabase/auth-js is a transitive dependency this project has not agreed to
 * depend on directly. The fields themselves are part of the wire contract:
 * GoTrue returns code 'weak_password' with a reasons array.
 */

/** The reasons array off a weak-password error, or null if it is not one. */
export function weakPasswordReasons(error: unknown): string[] | null {
  if (typeof error !== 'object' || error === null) return null;
  const e = error as { code?: unknown; reasons?: unknown };
  if (e.code !== 'weak_password') return null;
  return Array.isArray(e.reasons) ? e.reasons.filter((r): r is string => typeof r === 'string') : [];
}

/**
 * A message key for a rejected password, or null when the error is something
 * else and the caller should fall back to its own handling.
 *
 * Ordered by how surprising each reason is to the person typing. A leaked
 * password looks perfectly good to its owner, so it needs the most
 * explanation. Length comes last because both forms already check it, and
 * reaching this branch means the app's limit and the project's disagree.
 */
export function weakPasswordKey(error: unknown): string | null {
  const reasons = weakPasswordReasons(error);
  if (reasons) {
    if (reasons.includes('pwned')) return 'auth.passwordLeaked';
    if (reasons.includes('characters')) return 'auth.passwordCharacters';
    if (reasons.includes('length')) return 'auth.passwordTooShort';
    return 'auth.passwordWeak';
  }

  // Fallback for a server older than the code property. The wording is stable
  // enough to match on, and the alternative is telling someone their password
  // was refused without saying why.
  const message = (error as { message?: unknown })?.message;
  if (typeof message !== 'string') return null;
  const m = message.toLowerCase();
  if (m.includes('should contain at least one character')) return 'auth.passwordCharacters';
  if (m.includes('pwned') || m.includes('known to be weak')) return 'auth.passwordLeaked';
  if (m.includes('weak')) return 'auth.passwordWeak';
  return null;
}
