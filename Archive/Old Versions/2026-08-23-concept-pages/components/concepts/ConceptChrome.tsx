import Link from 'next/link';
import { locales, localeAutonym, type Locale } from '@/i18n/routing';

const CONCEPTS = [
  { key: 'boarding-pass', ar: 'بطاقة الصعود', en: 'Boarding Pass', fr: "Carte d'embarquement" },
  { key: 'window-seat', ar: 'مقعد النافذة', en: 'Window Seat', fr: 'Hublot' },
  // 2026-08-23 depth comparison. route-line is inside the master doc;
  // flight-3d is a deliberate override of Part 6. See each page header.
  { key: 'route-line', ar: 'خط الرحلة', en: 'Route Line', fr: 'Ligne de vol' },
  { key: 'flight-3d', ar: 'رحلة ثلاثية الأبعاد', en: '3D Flight ⚠', fr: 'Vol 3D ⚠' },
] as const;

/** Comparison harness across the concepts. Not part of any of them. */
export function ConceptChrome({
  current,
  locale,
  tone,
}: {
  current: string;
  locale: Locale;
  tone: 'dark' | 'light';
}) {
  const fg = tone === 'dark' ? '#efe2d6' : '#2b241c';
  const mute = tone === 'dark' ? '#8d7566' : '#8a7c6c';
  const line = tone === 'dark' ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.14)';

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-4 flex-wrap
                 px-4 py-2 backdrop-blur-md"
      style={{ background: tone === 'dark' ? 'rgba(10,7,5,.72)' : 'rgba(255,255,255,.72)', borderBottom: `1px solid ${line}` }}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span style={{ color: mute }} className="text-[0.62rem] tracking-[0.2em] uppercase">
          {locale === 'ar' ? 'ثلاثة تصاميم' : locale === 'fr' ? 'Trois concepts' : 'Three concepts'}
        </span>
        {CONCEPTS.map((c) => (
          <Link
            key={c.key}
            href={`/${locale}/${c.key}`}
            aria-current={current === c.key ? 'page' : undefined}
            className="px-2.5 py-1 text-[0.78rem] no-underline rounded-sm"
            style={{
              color: current === c.key ? (tone === 'dark' ? '#0a0705' : '#fff') : fg,
              background: current === c.key ? fg : 'transparent',
              border: `1px solid ${current === c.key ? fg : line}`,
            }}
          >
            {c[locale]}
          </Link>
        ))}
      </div>
      <nav aria-label="Language" className="flex items-center gap-1">
        {locales.map((l) => (
          <Link
            key={l}
            href={`/${l}/${current}`}
            hrefLang={l}
            className="px-2 py-1 text-[0.75rem] no-underline"
            style={{ color: l === locale ? fg : mute }}
          >
            {localeAutonym[l]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
