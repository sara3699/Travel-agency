import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { getPublishedPackages } from '@/lib/db/packages';
import { faqFor } from '@/lib/faq';
import { WINDOWS } from '@/lib/occasions';
import { SITE } from '@/lib/seo';

export const revalidate = 3600;

/**
 * Every public page, in every locale, each entry carrying the full reciprocal
 * hreflang set.
 *
 * Reciprocity is the whole point: Google ignores a non-reciprocal set outright,
 * so listing only the "other" languages is worth nothing. Each URL therefore
 * declares all three plus x-default. The reference site conspicuously does not
 * serve a usable sitemap at all — theirs returns AccessDenied — so this is one
 * of the cheapest places to be better than it.
 *
 * Deliberately absent: /account, /q/[token], /staff, /admin and the /card
 * routes. An enquiry reference in a public index is a leak, not a listing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packages = await getPublishedPackages();
  const now = new Date();

  // Paths after the locale segment. Everything here is public and indexable.
  const staticPaths = ['', '/destinations', '/occasions', '/faq', '/trust', '/about', '/enquire'];
  const faqPaths = faqFor('en').map((c) => `/faq/${c.id}`);
  const occasionPaths = WINDOWS.map((w) => `/occasions/${w.id}`);
  const packagePaths = packages.map((p) => `/destinations/${p.slug}`);

  const all = [...staticPaths, ...faqPaths, ...occasionPaths, ...packagePaths];

  const priorityFor = (path: string) => {
    if (path === '') return 1;
    if (path.startsWith('/destinations/')) return 0.9;
    if (path === '/destinations' || path === '/occasions') return 0.8;
    return 0.6;
  };

  return all.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: (path.startsWith('/destinations/') ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: priorityFor(path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE}/${l}${path}`])),
          'x-default': `${SITE}/en${path}`,
        },
      },
    })),
  );
}
