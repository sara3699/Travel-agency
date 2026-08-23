import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second process build without fighting the dev server for `.next`.
  // Two agents in one working tree will otherwise clobber each other's chunks,
  // which surfaces as `TypeError: a[d] is not a function` at runtime rather
  // than as anything that looks like a build problem.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  reactStrictMode: true,
  images: {
    // Bounded on purpose: an unbounded matrix multiplies billable transformations
    // and cache entries per image. Master doc, Part 7.
    formats: ['image/webp'],
    deviceSizes: [360, 640, 828, 1200, 1920],
  },
};

export default withNextIntl(nextConfig);
