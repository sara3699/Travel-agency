import { locales, type Locale } from '@/i18n/routing';

/** The canonical origin. One value, so nothing has to guess it per route. */
export const SITE = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');

/**
 * Reciprocal, self-referencing hreflang for a path.
 *
 * Google ignores a non-reciprocal set entirely, so a half-implementation is
 * worth zero rather than half: every locale must list every locale INCLUDING
 * itself. x-default points at English rather than at a redirector, because
 * automatic language redirection strands crawlers on one locale.
 *
 * `path` is the part AFTER the locale segment, with a leading slash or empty.
 */
export function alternates(path = '') {
  const clean = path === '/' ? '' : path;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE}/${l}${clean}`;
  languages['x-default'] = `${SITE}/en${clean}`;
  return { languages };
}

export function canonicalFor(locale: Locale, path = '') {
  const clean = path === '/' ? '' : path;
  return `${SITE}/${locale}${clean}`;
}
