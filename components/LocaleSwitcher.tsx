'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { locales, localeAutonym, shippingLocales, type Locale } from '@/i18n/routing';
import { Flag } from '@/components/Flag';

/**
 * Flag plus autonym, and it keeps you where you are.
 *
 * This used to link at `/${l}`, so switching language from any page below the
 * root threw the reader back to the homepage and lost what they were reading.
 * From the outside that reads as "the French version doesn't work", which is
 * exactly how it was reported on 2026-08-28.
 *
 * The locale is the first path segment, so swapping it is a segment splice
 * rather than a route table. The query string comes along, which matters
 * because the listing holds its filters there and a language switch must not
 * silently reset someone's search.
 *
 * The operator asked for flags on 2026-08-27; the master document's refusal
 * list bans them, because no flag stands for Arabic. Both are honoured by
 * showing the two together: the flag is the thing you spot, the word is the
 * thing that is true.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;
  const params = useSearchParams();

  const hrefFor = (l: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length && (locales as readonly string[]).includes(segments[0])) {
      segments[0] = l;
    } else {
      segments.unshift(l);
    }
    const qs = params?.toString();
    return `/${segments.join('/')}${qs ? `?${qs}` : ''}`;
  };

  return (
    <nav aria-label="Language" className="locales">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
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
