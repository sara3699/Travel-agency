'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../database.types';

/**
 * Browser client. Carries the PUBLISHABLE key, which is public by design and
 * ships inside the JavaScript bundle.
 *
 * That is safe only because Row Level Security is switched on for all ten
 * tables and is the actual access control. Never put SUPABASE_SECRET_KEY behind
 * a NEXT_PUBLIC_ prefix: the prefix is a publication decision, not a scoping
 * convenience, and the secret key carries bypassrls.
 *
 * What this client CANNOT do, by design: write an enquiry (no browser write
 * path exists), read anyone else's data, or change a role.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
