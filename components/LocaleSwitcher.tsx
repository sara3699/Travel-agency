import Link from 'next/link';
import { locales, localeAutonym, shippingLocales, type Locale } from '@/i18n/routing';

/**
 * Autonyms, never flags: no flag can represent Arabic, spoken across roughly two
 * dozen states. Language, market and currency stay independent controls so a
 * Lebanese expatriate in Dubai can browse in English and pay in USD.
 *
 * A locale that does not yet carry full content is marked, rather than hidden.
 * Hiding it makes the gap invisible; marking it makes it a decision.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <nav aria-label="Language" className="locales">
      {locales.map((l, i) => (
        <span key={l} style={{ display: 'contents' }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <Link
            href={`/${l}`}
            hrefLang={l}
            aria-current={l === current ? 'true' : undefined}
            title={shippingLocales.includes(l) ? undefined : 'in progress'}
          >
            {localeAutonym[l]}
            {!shippingLocales.includes(l) && <span aria-hidden="true">*</span>}
          </Link>
        </span>
      ))}
    </nav>
  );
}
