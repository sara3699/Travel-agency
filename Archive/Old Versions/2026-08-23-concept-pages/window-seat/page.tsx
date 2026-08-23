import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { packages } from '@/lib/packages';
import { PackageCard } from '@/components/PackageCard';
import { WindowSeatJourney } from '@/components/concepts/WindowSeatJourney';
import { ConceptChrome } from '@/components/concepts/ConceptChrome';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function WindowSeatPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const copy = {
    ar: [
      { time: '٠٥:٤٠ — الإقلاع', title: 'تغادر جدة قبل الفجر.', body: 'الرحلة أربع ساعات ونصف. الحقيبة مشمولة، والتنقل من المطار مشمول.' },
      { time: '٠٨:١٠ — فوق البحر', title: 'البحر الأسود تحتك.', body: 'لا تأشيرة مطلوبة. جوازك الخليجي يكفي، وهذا محقق في مارس ٢٠٢٦.' },
      { time: '١٦:٣٠ — الهبوط', title: 'تبليسي، والجبال خلفها.', body: 'ليلتان منها في كازباغي. هذا ما يميز هذه الباقة عن جاراتها.' },
      { time: '٢٢:٠٠ — الليلة الأولى', title: '٤٬٣٨٠ ريالًا. لا شيء يُضاف.', body: 'التأشيرة غير مشمولة لأنها غير مطلوبة أصلًا. قلنا لك ما ليس مشمولًا أيضًا.' },
    ],
    en: [
      { time: '05:40 — departure', title: 'You leave Jeddah before dawn.', body: 'Four and a half hours in the air. Bags included, airport transfer included.' },
      { time: '08:10 — over water', title: 'The Black Sea underneath.', body: 'No visa needed. Your Gulf passport is enough, and that was verified in March 2026.' },
      { time: '16:30 — descent', title: 'Tbilisi, mountains behind it.', body: 'Two of your seven nights are in Kazbegi. That is what separates this trip from its neighbours.' },
      { time: '22:00 — first night', title: '4,380 SAR. Nothing added.', body: 'Visa is listed as not included because it is not required. We tell you what is missing too.' },
    ],
    fr: [
      { time: '05:40 — départ', title: "Vous quittez Djeddah avant l'aube.", body: "Quatre heures et demie de vol. Bagages et transfert inclus." },
      { time: '08:10 — au-dessus de la mer', title: 'La mer Noire en dessous.', body: 'Aucun visa requis avec un passeport du Golfe, vérifié en mars 2026.' },
      { time: '16:30 — descente', title: 'Tbilissi, les montagnes derrière.', body: 'Deux de vos sept nuits à Kazbegi. Voilà ce qui distingue ce voyage.' },
      { time: '22:00 — première nuit', title: '4 380 SAR. Rien ajouté.', body: "Le visa est marqué non inclus parce qu'il n'est pas requis. Nous disons aussi ce qui manque." },
    ],
  }[locale];

  return (
    <div data-direction="atlas" style={{ minHeight: '100dvh' }}>
      <ConceptChrome current="window-seat" locale={locale} tone="dark" />
      <WindowSeatJourney
        copy={copy}
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
