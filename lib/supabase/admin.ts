import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

/**
 * Secret-key client. Carries `bypassrls`: every policy in this project is
 * INERT for this client. It is the correct tool for exactly three jobs:
 *
 *   1. writing an enquiry (there is deliberately no browser write path),
 *   2. granting or revoking a staff role in user_roles,
 *   3. creating an employee account through the Auth admin API.
 *
 * Everything else should use lib/supabase/server.ts so that policies apply.
 * Reach for this client only when you can name which of the three jobs it is.
 */
export function createAdminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!secret) {
    throw new Error(
      'SUPABASE_SECRET_KEY is missing. It is server-only and must never carry a NEXT_PUBLIC_ prefix.',
    );
  }

  // A bundler that pulls this into client code would inline the secret key.
  // Fail loudly at import time rather than shipping it to a browser.
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient() was imported into browser code. This is a security bug.');
  }

  return createSupabaseClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
