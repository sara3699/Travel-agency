import Link from 'next/link';
import { locales, localeAutonym, shippingLocales, type Locale } from '@/i18n/routing';
import { Flag } from '@/components/Flag';

/**
 * Flag plus autonym. The operator asked for flags on 2026-08-27; the master
 * document's refusal list bans them, because no flag stands for Arabic. Both
 * are honoured by showing the two together: the flag is the thing you spot, the
 * word is the thing that is true. Dated override recorded on the project page.
 *
 * A locale without full content yet is marked rather than hidden. Hiding it
 * makes the gap invisible; marking it makes it a decision.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <nav aria-label="Language" className="locales">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? 'true' : undefined}
          title={shippingLocales.includes(l) ? undefined : 'in progress'}
          className="locales__item"
        >
          <Flag locale={l} />
          <span>{localeAutonym[l]}</span>
          {!shippingLocales.includes(l) && <span aria-hidden="true">*</span>}
        </Link>
      ))}
    </nav>
  );
}
