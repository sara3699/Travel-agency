import { defineRouting } from 'next-intl/routing';

// Locale-count agnostic by construction. Adding a locale here is content work,
// never a rewrite: routing, hreflang, direction and static params all read from
// this one list. Master doc Part 4, PRODUCT.md Stack.
export const locales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

// Settled 2026-08-28: French joins the shipping set. The open question was
// content scope, not architecture, and the content now exists — the interface
// strings, the whole question set and the catalogue all carry French. The
// asterisk this list drives was telling readers a working locale was broken.
//
// The catalogue's French rows are still marked translated rather than natively
// written, which is a content-provenance fact recorded per row, not a reason to
// hide the locale.
export const shippingLocales: readonly Locale[] = ['ar', 'en', 'fr'];

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
