import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { packages } from '@/lib/packages';
import { PackageCard } from '@/components/PackageCard';
import { BoardingPassJourney } from '@/components/concepts/BoardingPassJourney';
import { ConceptChrome } from '@/components/concepts/ConceptChrome';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const STAMPS = [
  { label: 'TBILISI', x: 16, y: 26, rot: -11 },
  { label: 'BAKU', x: 44, y: 46, rot: 7 },
  { label: 'SAMARKAND', x: 12, y: 64, rot: -4 },
];

export default async function BoardingPassPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const copy = {
    ar: [
      { eyebrow: 'الجواز', title: 'كل رحلة تبدأ بورقة.', body: 'قبل الصور وقبل الوعود، هناك وثيقة تقول أين كنت وإلى أين تذهب.' },
      { eyebrow: 'الأختام', title: 'ثلاث وجهات، بلا تأشيرة.', body: 'تبليسي، باكو، سمرقند. جميعها مفتوحة لجواز خليجي دون إجراءات مسبقة.' },
      { eyebrow: 'البطاقة', title: 'جدة إلى تبليسي.', body: '١٤ سبتمبر، سبع ليالٍ، ٤٬٣٨٠ ريالًا للفرد. هذا هو السعر الكامل.' },
      { eyebrow: 'البرنامج', title: 'أربعة أيام تُفتح أمامك.', body: 'كل يوم مكتوب، لا مفاجآت في الطريق ولا رسوم تظهر لاحقًا.' },
    ],
    en: [
      { eyebrow: 'The passport', title: 'Every trip begins as paper.', body: 'Before the photographs and before the promises, there is a document saying where you have been and where you are going.' },
      { eyebrow: 'The stamps', title: 'Three destinations, no visa.', body: 'Tbilisi, Baku, Samarkand. All open on a Gulf passport with nothing to arrange in advance.' },
      { eyebrow: 'The pass', title: 'Jeddah to Tbilisi.', body: '14 September, seven nights, 4,380 SAR per person. That is the complete price.' },
      { eyebrow: 'The itinerary', title: 'Four days, folded open.', body: 'Every day written down. No surprises on the road and no fees appearing later.' },
    ],
    fr: [
      { eyebrow: 'Le passeport', title: 'Tout voyage commence sur papier.', body: "Avant les photographies et les promesses, il y a un document qui dit d'où vous venez et où vous allez." },
      { eyebrow: 'Les tampons', title: 'Trois destinations, sans visa.', body: 'Tbilissi, Bakou, Samarcande. Toutes ouvertes avec un passeport du Golfe.' },
      { eyebrow: 'La carte', title: 'Djeddah — Tbilissi.', body: '14 septembre, sept nuits, 4 380 SAR par personne. Prix complet.' },
      { eyebrow: "L'itinéraire", title: 'Quatre jours, dépliés.', body: 'Chaque journée écrite. Aucune surprise en route, aucun frais ajouté ensuite.' },
    ],
  }[locale];

  return (
    <div data-direction="ledger" style={{ minHeight: '100dvh' }}>
      <ConceptChrome current="boarding-pass" locale={locale} tone="light" />
      <BoardingPassJourney
        copy={copy}
        stamps={STAMPS}
        footer={
          <section className="px-[6vw] py-20" style={{ background: '#e6dccb' }}>
            <p className="m-0 mb-6 text-[0.66rem] tracking-[0.22em] uppercase" style={{ color: '#8a7c6c' }}>
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
