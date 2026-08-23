import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '../database.types';

/**
 * Server client for Server Components, Route Handlers and Server Actions.
 * Carries the publishable key and the caller's session cookie, so every query
 * runs AS THAT USER and every policy applies. This is the default client for
 * anything on the server that acts on a person's behalf.
 *
 * Use createAdminClient() only where the work is genuinely the system's.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components cannot set cookies. Harmless when middleware is
            // refreshing the session, which it is. Do not "fix" this by moving
            // auth into a client effect.
          }
        },
      },
    },
  );
}
