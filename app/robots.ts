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

/**
 * 2026-08-30: the site is deliberately kept out of search. The switch lives in
 * next.config.mjs, which inlines it here, so the robots file and the noindex
 * header can never disagree.
 */
const INDEXABLE = process.env.SITE_INDEXABLE === 'true';

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    /**
     * Crawling is ALLOWED here on purpose, while every response carries
     * `X-Robots-Tag: noindex, nofollow` from next.config.mjs.
     *
     * The intuitive move is `Disallow: /`, and it is the wrong one. Disallow
     * stops a crawler FETCHING the page, which means it never reads the
     * noindex. A URL that gets shared - on Instagram, in a message, from
     * anywhere Google can see a link - can then still surface as a bare,
     * snippetless result that nothing on the site can retract. Letting Google
     * fetch the page and read "noindex" is what actually keeps it out.
     *
     * The private paths stay disallowed regardless. Those should not be
     * fetched at all, indexed or not.
     */
    return { rules: [{ userAgent: '*', allow: '/', disallow: PRIVATE }] };
  }

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
