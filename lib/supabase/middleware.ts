import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import type { Database } from '../database.types';

/**
 * Refreshes the auth session on every request and writes the rotated cookies
 * onto a response that some OTHER middleware produced.
 *
 * Written this way on purpose: this project's middleware already belongs to
 * next-intl for locale routing. Rather than fight over ownership of the
 * response, this helper takes next-intl's response and adds cookies to it.
 *
 * Without this, an access token expires after an hour and the user is silently
 * logged out mid-session.
 */
export async function refreshSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Must be getUser(), not getSession(). getSession() reads the cookie without
  // verifying it against the auth server, so it can be spoofed. getUser()
  // revalidates and is the only safe check in middleware.
  await supabase.auth.getUser();

  return response;
}
