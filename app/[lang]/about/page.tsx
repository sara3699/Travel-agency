import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sections = [1, 2, 3, 4, 5] as const;

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet">
        <header className="sheet__head">
          <h1 className="sheet__title">{t('about.title')}</h1>
          <p className="sheet__lede">{t('about.lede')}</p>
        </header>

        <div className="prose">
          {sections.map((n) => (
            <section key={n}>
              <h2>{t(`about.h${n}`)}</h2>
              <p>{t(`about.p${n}`)}</p>
            </section>
          ))}
        </div>

        <a className="btn" href={`/${locale}/destinations`}>
          {t('nav.destinations')}
        </a>
      </main>
    </>
  );
}
