import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FaqBrowser } from '@/components/faq/FaqBrowser';
import { faqFor } from '@/lib/faq';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'faq' });
  return { title: t('title'), description: t('lead') };
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const categories = faqFor(locale);

  // FAQPage structured data. It no longer earns a Google rich result — the
  // feature was retired in May 2026 — but it is still what makes the answers
  // quotable by an assistant, which is the reason to ship it.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((c) =>
      c.items.map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      })),
    ),
  };

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="faq">
        <header className="faq__head">
          <h1 className="faq__title display">{t('faq.title')}</h1>
          <p className="faq__lead">{t('faq.lead')}</p>
        </header>

        {/* Compact three-column category grid, the shape the reference site
            uses for its help hub. Each card carries its question count so the
            reader can judge whether the topic is worth opening. */}
        <nav className="faq__topics" aria-label={t('faq.allTopics')}>
          {categories.map((c) => (
            <a className="faq__topicCard" key={c.id} href={`/${locale}/faq/${c.id}`}>
              <span>
                {c.title}
                <br />
                <span className="faq__topicN">{t('faq.results', { n: c.items.length })}</span>
              </span>
            </a>
          ))}
        </nav>

        <FaqBrowser categories={categories} askHref={`/${locale}/enquire`} />

        <aside className="faq__still">
          <h2>{t('faq.stillHelp')}</h2>
          <p>{t('faq.stillBody')}</p>
          <a className="btn" href={`/${locale}/enquire`}>{t('faq.ask')}</a>
        </aside>
      </main>
      <SiteFooter locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
