import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, localeDirection, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PIECES, findPiece, BUILD_SHELL, type Block } from '@/lib/build';
import { alternates, canonicalFor } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((lang) => PIECES.map((p) => ({ lang, piece: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; piece: string }>;
}): Promise<Metadata> {
  const { lang, piece } = await params;
  const p = findPiece(piece);
  if (!p) return {};
  const locale = lang as Locale;
  const written = p.written.includes(locale) ? locale : 'en';
  return {
    title: p.title[written],
    description: p.dek[written],
    alternates: {
      canonical: canonicalFor(locale, `/build/${piece}`),
      ...alternates(`/build/${piece}`),
    },
  };
}

export default async function BuildPiece({
  params,
}: {
  params: Promise<{ lang: string; piece: string }>;
}) {
  const { lang, piece } = await params;
  const p = findPiece(piece);
  if (!p) notFound();

  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const s = BUILD_SHELL[locale];

  // The piece is served in the reader's language when it exists in it, and in
  // English otherwise. The substitution is announced rather than silent: an
  // Arabic reader landing on English prose under an Arabic header should be
  // told that is what happened.
  const written = (p.written.includes(locale) ? locale : 'en') as Locale;
  const substituted = written !== locale;

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
      <main className="sheet essay">
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: t('dest.crumbHome'), href: `/${locale}` },
            { label: s.title, href: `/${locale}/build` },
            { label: p.title[written] },
          ]}
        />

        {substituted && <p className="essay__sub">{s.unavailable}</p>}

        {/* The body carries its own direction when it is not the page's. An
            English essay inside an Arabic shell has to be laid out
            left-to-right or every paragraph in it is wrong. */}
        <article
          className="essay__body"
          lang={written}
          dir={localeDirection[written]}
        >
          <header className="sheet__head">
            <h1 className="sheet__title">{p.title[written]}</h1>
            <p className="sheet__lede">{p.dek[written]}</p>
            <p className="essay__date">
              {s.dated} <time dateTime={p.date}>{df.format(new Date(`${p.date}T00:00:00Z`))}</time>
            </p>
          </header>

          {p.body[written].map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </article>

        {p.written.length > 1 && (
          <p className="essay__other">
            {s.readIn}{' '}
            {p.written.map((l) => (
              <a key={l} href={`/${l}/build/${p.id}`} hrefLang={l}>
                {l.toUpperCase()}
              </a>
            ))}
          </p>
        )}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'h':
      return <h2 className="essay__h">{block.text}</h2>;
    case 'p':
      return <p>{block.text}</p>;
    case 'note':
      return <p className="essay__note">{block.text}</p>;
    case 'list':
      return (
        <ul className="essay__list">
          {block.items.map((it) => (
            <li key={it.slice(0, 30)}>{it}</li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <figure className="essay__code">
          <pre dir="ltr" lang="en">
            <code>{block.text}</code>
          </pre>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'sample':
      // The whole point of the essay. A right-to-left run dropped into
      // left-to-right prose gets reordered against the neutral characters
      // around it, so the wrong example would silently correct itself and
      // demonstrate nothing. `dir` on the span isolates it.
      return (
        <p className="essay__sample">
          <span className="essay__sample-label">{block.label}</span>
          <span className="essay__sample-text" dir="rtl" lang="ar">
            {block.text}
          </span>
        </p>
      );
  }
}
