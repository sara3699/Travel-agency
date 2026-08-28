import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { faqFor } from '@/lib/faq';

/** One topic as a server-rendered document, so a WhatsApp reply can link to
 *  the exact answer rather than to a page and an instruction to scroll. */
export function generateStaticParams() {
  return locales.flatMap((lang) => faqFor(lang).map((c) => ({ lang, topic: c.id })));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string; topic: string }> }): Promise<Metadata> {
  const { lang, topic } = await params;
  const cat = faqFor(lang as Locale).find((c) => c.id === topic);
  return cat ? { title: cat.title, description: cat.blurb } : {};
}

export default async function FaqTopicPage({
  params,
}: { params: Promise<{ lang: string; topic: string }> }) {
  const { lang, topic } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const all = faqFor(locale);
  const cat = all.find((c) => c.id === topic);
  if (!cat) notFound();

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cat.items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="faq">
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: t('dest.crumbHome'), href: `/${locale}` },
            { label: t('faq.title'), href: `/${locale}/faq` },
            { label: cat.title },
          ]}
        />

        <header className="faq__head">
          <h1 className="faq__title display">{cat.title}</h1>
          <p className="faq__lead">{cat.blurb}</p>
        </header>

        {/* Open prose, not collapsed accordions. On a topic page the reader
            has already chosen the subject, so hiding the answers behind a
            second click is an interaction cost with nothing bought by it. */}
        <div className="faq__open">
          {cat.items.map((i, n) => (
            <article className="qaOpen" key={n} id={`q${n + 1}`}>
              <h2 className="qaOpen__q">{i.q}</h2>
              <p className="qaOpen__a">{i.a}</p>
            </article>
          ))}
        </div>

        <nav className="faq__topics" aria-label={t('faq.allTopics')}>
          {all.filter((c) => c.id !== cat.id).map((c) => (
            <a className="faq__topicCard" key={c.id} href={`/${locale}/faq/${c.id}`}>
              <span>{c.title}<br /><span className="faq__topicN">{t('faq.results', { n: c.items.length })}</span></span>
            </a>
          ))}
        </nav>

        <aside className="faq__still">
          <h2>{t('faq.stillHelp')}</h2>
          <p>{t('faq.stillBody')}</p>
          <a className="btn" href={`/${locale}/enquire`}>{t('faq.ask')}</a>
        </aside>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
