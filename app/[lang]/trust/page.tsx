import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { trustContent } from '@/lib/trust';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'trust' });
  return { title: t('title'), description: t('lede') };
}

export default async function TrustPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();
  const c = trustContent(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="sheet trust">
        <Breadcrumbs
          locale={locale}
          trail={[{ label: t('dest.crumbHome'), href: `/${locale}` }, { label: t('trust.title') }]}
        />

        <header className="sheet__head">
          <h1 className="sheet__title">{t('trust.title')}</h1>
          <p className="sheet__lede">{t('trust.lede')}</p>
        </header>

        {/* Said once, at the top, in the page's own voice rather than in a
            footnote nobody reaches. */}
        <p className="trust__specimen">{c.specimenNotice}</p>

        <section className="trust__block">
          <h2>{c.people.heading}</h2>
          <p>{c.people.body}</p>
          <ul className="trust__people">
            {c.people.list.map((p) => (
              <li key={p.name}>
                <span className="trust__avatar" aria-hidden="true">{p.name.slice(0, 1)}</span>
                <span className="trust__personBody">
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                  <span className="trust__meta">{p.languages}</span>
                  <span className="trust__meta">{p.hours}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="trust__note">{c.people.noPhotos}</p>
        </section>

        <section className="trust__block">
          <h2>{c.licence.heading}</h2>
          <p>{c.licence.body}</p>
          {/* A placeholder that reads as a placeholder. Never a number. */}
          <p className="trust__placeholder">{c.licence.placeholder}</p>
          <p className="trust__note">{c.licence.registerNote}</p>
        </section>

        <section className="trust__block">
          <h2>{c.data.heading}</h2>
          <p>{c.data.where}</p>
          <p>{c.data.never}</p>
          <p>{c.data.breach}</p>
        </section>

        <section className="trust__block">
          <h2>{c.promises.heading}</h2>
          <dl className="trust__promises">
            {c.promises.list.map((p) => (
              <div key={p.claim}>
                <dt>{p.claim}</dt>
                <dd>{p.caveat}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="trust__block">
          <h2>{c.prices.heading}</h2>
          <p>{c.prices.body}</p>
        </section>

        <section className="trust__block">
          <h2>{c.reviews.heading}</h2>
          <p>{c.reviews.body}</p>
          <p className="trust__threshold">{c.reviews.threshold}</p>
        </section>

        <section className="trust__block">
          <h2>{c.changelog.heading}</h2>
          <p>{c.changelog.body}</p>
          <ol className="trust__log">
            {c.changelog.entries.map((e) => (
              <li key={e.date}>
                <time className="num" dateTime={e.date}>{e.date}</time>
                <span>{e.what}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="trust__block trust__block--absent">
          <h2>{c.absent.heading}</h2>
          <p>{c.absent.body}</p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
