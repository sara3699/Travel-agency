import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { SITE } from '@/lib/seo';

/**
 * AI crawlers are allowed explicitly.
 *
 * Blocking them is a reflex that costs the site its place in assistant answers
 * while achieving nothing about training data the models already hold, and
 * blocking Google-Extended does not opt a site out of AI Overviews — Google
 * says so. These pages are written to be quoted.
 *
 * The disallow list is locale-explicit rather than wildcarded. `/*​/account`
 * would also match `/en/faq/account`, the question page about what we store,
 * and blocking a page written specifically to be read is the opposite of the
 * point. Listing the locales is longer and cannot misfire.
 */
const PRIVATE = [
  '/api/',
  ...locales.flatMap((l) => [
    `/${l}/account`,
    `/${l}/q/`,
    `/${l}/staff`,
    `/${l}/admin`,
    `/${l}/destinations/*/card`,
  ]),
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      // Named rather than left to the wildcard, so the intent is legible to a
      // person reading the file as well as to the crawler.
      { userAgent: 'GPTBot', allow: '/', disallow: PRIVATE },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: PRIVATE },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: PRIVATE },
      { userAgent: 'ClaudeBot', allow: '/', disallow: PRIVATE },
      { userAgent: 'Claude-User', allow: '/', disallow: PRIVATE },
      { userAgent: 'PerplexityBot', allow: '/', disallow: PRIVATE },
      { userAgent: 'Google-Extended', allow: '/', disallow: PRIVATE },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
