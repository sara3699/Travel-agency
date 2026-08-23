import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { refreshSession } from './lib/supabase/middleware';

// This file is SHARED between the locale layer and the auth layer.
//
// next-intl owns the routing decision and produces the response. Supabase then
// writes refreshed session cookies onto that same response. Order matters:
// next-intl may redirect (e.g. / -> /en), and the cookies must ride on whatever
// response actually goes back.
//
// Without refreshSession, an access token expires after an hour and the user is
// silently signed out mid-session.
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  return refreshSession(request, response);
}

export const config = {
  matcher: ['/', '/(ar|en|fr)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
