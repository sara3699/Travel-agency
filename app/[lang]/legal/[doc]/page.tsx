import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { legalContent, isLegalDoc, LEGAL_DOCS, type LegalDoc } from '@/lib/legal';
import { alternates, canonicalFor } from '@/lib/seo';

/**
 * Legal documents, one route for all of them.
 *
 * There is one document today. It is a [doc] segment rather than /legal/privacy
 * because the terms page and the accessibility statement land here next, and a
 * second hand-built route would be the moment the two drift apart in layout.
 */

export function generateStaticParams() {
  return locales.flatMap((lang) => LEGAL_DOCS.map((doc) => ({ lang, doc })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!isLegalDoc(doc)) return {};
  const locale = lang as Locale;
  const c = legalContent(locale, doc);
  return {
    title: c.title,
    description: c.lede,
    alternates: { canonical: canonicalFor(locale, `/legal/${doc}`), ...alternates(`/legal/${doc}`) },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  if (!isLegalDoc(doc)) notFound();

  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = legalContent(locale, doc as LegalDoc);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet legal">
        <Breadcrumbs
          locale={locale}
          trail={[{ label: t('dest.crumbHome'), href: `/${locale}` }, { label: c.title }]}
        />

        <header className="sheet__head">
          <h1 className="sheet__title">{c.title}</h1>
          <p className="sheet__lede">{c.lede}</p>
          {/* A legal document with no date on it is not a legal document. */}
          <p className="legal__updated">
            {t('legal.updated')} <time dateTime={c.updated}>{c.updated}</time>
          </p>
        </header>

        {c.sections.map((s) => (
          <section className="legal__block" key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}

        <section className="legal__block legal__changes">
          <h2>{t('legal.changesHeading')}</h2>
          <p>{t('legal.changesBody')}</p>
          <ol className="legal__log">
            {c.changelog.map((e) => (
              <li key={e.date}>
                <time dateTime={e.date}>{e.date}</time>
                <span>{e.what}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
