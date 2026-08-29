import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PIECES, BUILD_SHELL } from '@/lib/build';
import { alternates, canonicalFor } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const s = BUILD_SHELL[locale];
  return {
    title: s.title,
    description: s.lede,
    alternates: { canonical: canonicalFor(locale, '/build'), ...alternates('/build') },
  };
}

export default async function BuildIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const s = BUILD_SHELL[locale];

  const df = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'UTC',
  });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet build">
        <Breadcrumbs
          locale={locale}
          trail={[{ label: t('dest.crumbHome'), href: `/${locale}` }, { label: s.title }]}
        />

        <header className="sheet__head">
          <h1 className="sheet__title">{s.title}</h1>
          <p className="sheet__lede">{s.lede}</p>
        </header>

        {/* The one thing a practitioner needs to know before reading anything
            here: which parts of this site are invented and which are not. */}
        <p className="build__note">{s.note}</p>

        <ul className="build__list">
          {PIECES.map((piece) => {
            const lang = piece.written.includes(locale) ? locale : 'en';
            return (
              <li key={piece.id}>
                <a href={`/${locale}/build/${piece.id}`}>
                  <h2>{piece.title[lang]}</h2>
                  <p>{piece.dek[lang]}</p>
                </a>
                <p className="build__meta">
                  <time dateTime={piece.date}>
                    {s.dated} {df.format(new Date(`${piece.date}T00:00:00Z`))}
                  </time>
                  {/* Which languages the piece exists in, stated up front rather
                      than discovered after clicking. */}
                  <span className="build__langs">
                    {s.readIn} {piece.written.map((l) => l.toUpperCase()).join(' · ')}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
