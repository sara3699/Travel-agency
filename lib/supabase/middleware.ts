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
  // A signed-out visitor carries no Supabase cookie, so there is no session to
  // refresh and nothing for getUser() to verify. Calling it anyway spent an
  // intercontinental round trip on every anonymous page view - which is nearly
  // all of them on a site whose job is to be shared as a link - and put a
  // network dependency in front of pages that need no auth at all.
  //
  // Supabase writes its auth cookies under an `sb-` prefix. No such cookie
  // means no session, and the response goes back untouched.
  const hasSupabaseCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-'));
  if (!hasSupabaseCookie) return response;

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
  //
  // Guarded twice, because this one call is the only thing in the whole
  // middleware that touches the network, and the middleware runs in front of
  // every page. On 2026-08-30 it timed out and the site answered
  // 504 MIDDLEWARE_INVOCATION_TIMEOUT on the landing page - not one route,
  // all of them.
  try {
    await Promise.race([
      supabase.auth.getUser(),
      // Resolve, do not reject: a slow auth server should cost this request
      // its cookie refresh, never the page. The visitor's existing token stays
      // valid, and every protected page calls getUser() again server-side, so
      // nothing is trusted that was not verified there.
      new Promise((resolve) => setTimeout(resolve, AUTH_TIMEOUT_MS)),
    ]);
  } catch {
    // A network failure is the same story: serve the page.
  }

  return response;
}

/**
 * Long enough that a healthy round trip always wins, short enough that a sick
 * one cannot reach the platform's own middleware ceiling and turn a slow
 * session refresh into a site-wide outage.
 *
 * Part 7 of the master document names geography as the largest architectural
 * risk here: the database has no Middle East region, so every one of these is
 * an intercontinental round trip for the audience this site is for.
 */
const AUTH_TIMEOUT_MS = 2500;
