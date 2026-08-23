import { defineRouting } from 'next-intl/routing';

// Locale-count agnostic by construction. Adding a locale here is content work,
// never a rewrite: routing, hreflang, direction and static params all read from
// this one list. Master doc Part 4, PRODUCT.md Stack.
export const locales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

// Which locales carry full content at launch is an OPEN decision (2026-08-23).
// The architecture does not depend on the answer.
export const shippingLocales: readonly Locale[] = ['ar', 'en'];

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
  fr: 'ltr',
};

// Autonyms, never flags. No flag can represent Arabic. Master doc Part 4.
export const localeAutonym: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
  fr: 'Français',
};

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: 'en',
  // Never auto-redirect on IP or Accept-Language: it strands crawlers on one
  // locale and halves the indexable surface. Master doc Part 4.
  localeDetection: false,
  localePrefix: 'always',
});
