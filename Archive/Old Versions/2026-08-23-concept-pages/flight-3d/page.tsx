import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, localeDirection, type Locale } from '@/i18n/routing';
import { packages } from '@/lib/packages';
import { PackageCard } from '@/components/PackageCard';
import { FlightJourney, type Scene } from '@/components/concepts/FlightJourney';
import { ConceptChrome } from '@/components/concepts/ConceptChrome';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Depth comparison, option 3 — OUTSIDE the master doc, on purpose.
 * Breaks Part 6 bans 1 (scroll-jacking), 2 (pinned stage carrying text) and the
 * spirit of the three.js-globe refusal. Override note dated 2026-08-23 on the
 * project page. Not a candidate for the real site unless that note is upgraded
 * to a decision.
 */
export default async function Flight3DPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const scenes: Record<Locale, Scene[]> = {
    ar: [
      { title: 'قبل الفجر، فوق الضباب.', body: 'الجبال تحتك ما زالت في العتمة. الرحلة بدأت.' },
      { title: 'البحر الأسود.', body: 'لا تأشيرة، لا توقف. جوازك الخليجي يكفي.' },
      { title: 'الجبال تقترب.', body: 'كازباغي. ليلتان من سبع، وهنا يبدأ الفرق.' },
      { title: 'ثم تبتعد الأرض.', body: '٤٬٣٨٠ ريالًا، شاملة. لا شيء يُضاف بعد هذه الصفحة.' },
    ],
    en: [
      { title: 'Before dawn, above the mist.', body: 'The mountains below you are still dark. The trip has started.' },
      { title: 'The Black Sea.', body: 'No visa, no stopover. Your Gulf passport is enough.' },
      { title: 'The mountains close in.', body: 'Kazbegi. Two of your seven nights, and where the difference starts.' },
      { title: 'Then the ground falls away.', body: '4,380 SAR, all in. Nothing is added after this page.' },
    ],
    fr: [
      { title: "Avant l'aube, au-dessus de la brume.", body: 'Les montagnes en dessous sont encore sombres. Le voyage a commencé.' },
      { title: 'La mer Noire.', body: 'Pas de visa, pas d’escale. Votre passeport du Golfe suffit.' },
      { title: 'Les montagnes se rapprochent.', body: 'Kazbegi. Deux de vos sept nuits, et là commence la différence.' },
      { title: "Puis la terre s'éloigne.", body: '4 380 SAR, tout compris. Rien ne s’ajoute après cette page.' },
    ],
  };

  const labels = {
    ar: { skip: 'تخطَّ الرحلة', held: 'الصفحة متوقفة', released: 'تابع التمرير' },
    en: { skip: 'Skip flight', held: 'Page held', released: 'Scroll on' },
    fr: { skip: 'Passer le vol', held: 'Page bloquée', released: 'Continuez' },
  }[locale];

  return (
    <div data-direction="atlas" style={{ minHeight: '100dvh' }}>
      <ConceptChrome current="flight-3d" locale={locale} tone="dark" />
      <FlightJourney
        scenes={scenes[locale]}
        labels={labels}
        rtl={localeDirection[locale] === 'rtl'}
        footer={
          <section className="px-[6vw] py-20" style={{ background: '#0b0e14' }}>
            <p className="m-0 mb-6 text-[0.66rem] tracking-[0.22em] uppercase" style={{ color: '#7f8899' }}>
              {t('home.resultsLead')}
            </p>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(330px,1fr))]">
              {packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </section>
        }
      />
    </div>
  );
}
