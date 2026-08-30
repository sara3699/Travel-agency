import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/**
 * Whether search engines may list this site.
 *
 * 2026-08-30: false. أنيس is live so it can be looked at and sent to people,
 * not so it can be found. The catalogue carries illustrative fares and a
 * demonstration inventory, and a page quoting invented prices for real cities
 * has no business turning up in someone's search for a real holiday.
 *
 * Flipping this to true is the entire indexing decision. It restores the
 * allow-list in app/robots.ts, puts the sitemap back in front of crawlers, and
 * drops the noindex header below. One constant, one commit, reversible.
 */
const INDEXABLE = false;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second process build without fighting the dev server for `.next`.
  // Two agents in one working tree will otherwise clobber each other's chunks,
  // which surfaces as `TypeError: a[d] is not a function` at runtime rather
  // than as anything that looks like a build problem.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  reactStrictMode: true,
  // Inlined at build time so app/robots.ts reads the same constant this file
  // declares. Two places deciding the same thing is how a site ends up
  // serving a noindex header alongside a robots.txt that invites crawlers.
  env: { SITE_INDEXABLE: String(INDEXABLE) },
  images: {
    // Bounded on purpose: an unbounded matrix multiplies billable transformations
    // and cache entries per image. Master doc, Part 7.
    formats: ['image/webp'],
    deviceSizes: [360, 640, 828, 1200, 1920],
  },
  async headers() {
    if (INDEXABLE) return [];
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
