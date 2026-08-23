import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, localeDirection, type Locale } from '@/i18n/routing';
import { packages } from '@/lib/packages';
import { PackageCard } from '@/components/PackageCard';
import { RouteLineJourney, type Leg } from '@/components/concepts/RouteLineJourney';
import { ConceptChrome } from '@/components/concepts/ConceptChrome';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Depth comparison, option 1 — inside the master doc. See the component header. */
export default async function RouteLinePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const geometry = [
    { x: 12, y: 79, image: '/img/gate.jpg' },
    { x: 35, y: 61, image: '/img/road.jpg' },
    { x: 61, y: 45, image: '/img/kazbegi.jpg' },
    { x: 87, y: 22, image: '/img/table.jpg' },
  ];

  const copy = {
    ar: [
      { time: '٠٥:٤٠ — الإقلاع', title: 'تغادر جدة قبل الفجر.', body: 'أربع ساعات ونصف في الجو. الحقيبة مشمولة، والتنقل من المطار مشمول.' },
      { time: '٠٨:١٠ — فوق البحر', title: 'البحر الأسود تحتك.', body: 'لا تأشيرة مطلوبة. جوازك الخليجي يكفي، وهذا محقق في مارس ٢٠٢٦.' },
      { time: '١٦:٣٠ — الهبوط', title: 'تبليسي، والجبال خلفها.', body: 'ليلتان من سبع في كازباغي. هذا ما يميز هذه الباقة عن جاراتها.' },
      { time: '٢٢:٠٠ — الليلة الأولى', title: '٤٬٣٨٠ ريالًا. لا شيء يُضاف.', body: 'قلنا لك ما هو مشمول، وقلنا لك ما ليس مشمولًا. السعر لا يتحرك بعد هذه الصفحة.' },
    ],
    en: [
      { time: '05:40 — departure', title: 'You leave Jeddah before dawn.', body: 'Four and a half hours in the air. Bags included, airport transfer included.' },
      { time: '08:10 — over water', title: 'The Black Sea underneath.', body: 'No visa needed. Your Gulf passport is enough, and that was verified in March 2026.' },
      { time: '16:30 — descent', title: 'Tbilisi, mountains behind it.', body: 'Two of your seven nights are in Kazbegi. That is what separates this trip from its neighbours.' },
      { time: '22:00 — first night', title: '4,380 SAR. Nothing added.', body: 'We told you what is included and what is not. The price does not move after this page.' },
    ],
    fr: [
      { time: '05:40 — départ', title: "Vous quittez Djeddah avant l'aube.", body: 'Quatre heures et demie de vol. Bagages et transfert inclus.' },
      { time: '08:10 — au-dessus de la mer', title: 'La mer Noire en dessous.', body: 'Aucun visa requis avec un passeport du Golfe, vérifié en mars 2026.' },
      { time: '16:30 — descente', title: 'Tbilissi, les montagnes derrière.', body: 'Deux de vos sept nuits à Kazbegi. Voilà ce qui distingue ce voyage.' },
      { time: '22:00 — première nuit', title: '4 380 SAR. Rien ajouté.', body: "Nous disons ce qui est inclus et ce qui ne l'est pas. Le prix ne bouge plus après cette page." },
    ],
  }[locale];

  const legs: Leg[] = geometry.map((g, i) => ({ ...g, ...copy[i] }));

  return (
    <div data-direction="atlas" style={{ minHeight: '100dvh' }}>
      <ConceptChrome current="route-line" locale={locale} tone="dark" />
      <RouteLineJourney
        legs={legs}
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
