import { money, type Money, type CurrencyCode } from './money';
import type { Provenance } from './provenance';

// DATA-02/03/05. Specimen catalogue. Every package here is INVENTED, under an
// invented house brand, and carries provenance 'illustrative'. No real supplier,
// no real property, no real price. Master doc 14.1.

export type FacetState = 'green' | 'amber' | 'red' | 'na';

export interface Facet {
  key: string;
  state: FacetState;
  /** Verifier and date live on the facet row, never on the package. */
  verifiedBy: string | null;
  verifiedAt: string | null;
}

export interface LedgerLine {
  key: string;
  included: boolean;
  /** Exclusions carry an estimate. An estimate with no source is an invented
   *  number, so the source is required whenever this is set. */
  estimate?: Money;
  estimateSource?: string;
}

export interface TravelPackage {
  slug: string;
  provenance: Provenance;
  image: string;
  destination: { ar: string; en: string; fr: string; latin: string };
  country: { ar: string; en: string; fr: string };
  nights: number;
  departureCity: { ar: string; en: string; fr: string; iata: string };
  nextDeparture: string;
  /** All-in, per person, for the stated party. Never a "from" price. */
  pricePerPerson: Money;
  partyAssumption: { adults: number; sharing: number };
  hotelTier: 3 | 4 | 5;
  boardBasis: 'room_only' | 'breakfast' | 'half_board' | 'full_board';
  /** The computed sentence naming what makes this unlike its neighbours. */
  differenceLine: { ar: string; en: string; fr: string };
  ledger: LedgerLine[];
  facets: Facet[];
  notFor: { ar: string; en: string; fr: string };
}

const SAR: CurrencyCode = 'SAR';
const AED: CurrencyCode = 'AED';
const KWD: CurrencyCode = 'KWD';

const verified = (by: string, at: string) => ({ verifiedBy: by, verifiedAt: at });

export const packages: TravelPackage[] = [
  {
    slug: 'tbilisi-kazbegi-7',
    provenance: 'illustrative',
    image: '/img/kazbegi.jpg',
    destination: { ar: 'تبليسي', en: 'Tbilisi', fr: 'Tbilissi', latin: 'Tbilisi' },
    country: { ar: 'جورجيا', en: 'Georgia', fr: 'Géorgie' },
    nights: 7,
    departureCity: { ar: 'جدة', en: 'Jeddah', fr: 'Djeddah', iata: 'JED' },
    nextDeparture: '2026-09-14',
    pricePerPerson: money(438000, SAR),
    partyAssumption: { adults: 2, sharing: 2 },
    hotelTier: 4,
    boardBasis: 'breakfast',
    differenceLine: {
      ar: 'الوحيدة هنا بسبع ليالٍ منها ليلتان في كازباغي',
      en: 'The only 7-night here with two nights in Kazbegi',
      fr: 'La seule de 7 nuits avec deux nuits à Kazbegi',
    },
    ledger: [
      { key: 'flights', included: true },
      { key: 'hotel', included: true },
      { key: 'transfers', included: true },
      { key: 'breakfast', included: true },
      { key: 'bags', included: true },
      { key: 'visa', included: false, estimate: money(0, SAR), estimateSource: 'visa-free for GCC passports' },
    ],
    facets: [
      { key: 'halal_food_nearby', state: 'green', ...verified('Layla H.', '2026-06-02') },
      { key: 'prayer_room', state: 'amber', ...verified('Layla H.', '2026-06-02') },
      { key: 'alcohol_free_property', state: 'red', ...verified('Layla H.', '2026-06-02') },
      { key: 'family_section', state: 'na', verifiedBy: null, verifiedAt: null },
    ],
    notFor: {
      ar: 'ليست لك إن كنت تريد منتجعًا شاملًا. فيها يومان طويلان على الطريق ونزل عائلي في الليلة الثالثة.',
      en: 'Not for you if you want a 5-star all-inclusive. Two long driving days and a family-run guesthouse on night three.',
      fr: "Pas pour vous si vous voulez un tout-inclus. Deux longues journées de route et une maison d'hôtes la troisième nuit.",
    },
  },
  {
    slug: 'baku-5-short',
    provenance: 'illustrative',
    image: '/img/baku.jpg',
    destination: { ar: 'باكو', en: 'Baku', fr: 'Bakou', latin: 'Baku' },
    country: { ar: 'أذربيجان', en: 'Azerbaijan', fr: 'Azerbaïdjan' },
    nights: 5,
    departureCity: { ar: 'دبي', en: 'Dubai', fr: 'Dubaï', iata: 'DXB' },
    nextDeparture: '2026-09-04',
    pricePerPerson: money(319000, AED),
    partyAssumption: { adults: 2, sharing: 2 },
    hotelTier: 4,
    boardBasis: 'breakfast',
    differenceLine: {
      ar: 'الأرخص من دبي في سبتمبر',
      en: 'Cheapest from Dubai in September',
      fr: 'La moins chère au départ de Dubaï en septembre',
    },
    ledger: [
      { key: 'flights', included: true },
      { key: 'hotel', included: true },
      { key: 'transfers', included: true },
      { key: 'breakfast', included: true },
      { key: 'bags', included: false, estimate: money(14000, AED), estimateSource: 'carrier hold-bag fee, checked 2026-08-01' },
      { key: 'visa', included: false, estimate: money(9500, AED), estimateSource: 'ASAN e-visa, published fee' },
    ],
    facets: [
      { key: 'halal_food_nearby', state: 'green', ...verified('Omar D.', '2026-05-19') },
      { key: 'prayer_room', state: 'green', ...verified('Omar D.', '2026-05-19') },
      { key: 'alcohol_free_property', state: 'red', ...verified('Omar D.', '2026-05-19') },
      { key: 'family_section', state: 'amber', ...verified('Omar D.', '2026-05-19') },
    ],
    notFor: {
      ar: 'ليست لك إن كنت تسافر مع أطفال تحت الثامنة. المشي في المدينة القديمة طويل والأرصفة حجرية.',
      en: 'Not for you if you travel with under-8s. Long walks in the old city and the paving is rough.',
      fr: "Pas pour vous avec des enfants de moins de 8 ans. Longues marches et pavés irréguliers.",
    },
  },
  {
    slug: 'samarkand-bukhara-8',
    provenance: 'illustrative',
    image: '/img/samarkand.jpg',
    destination: { ar: 'سمرقند', en: 'Samarkand', fr: 'Samarcande', latin: 'Samarkand' },
    country: { ar: 'أوزبكستان', en: 'Uzbekistan', fr: 'Ouzbékistan' },
    nights: 8,
    departureCity: { ar: 'الكويت', en: 'Kuwait City', fr: 'Koweït', iata: 'KWI' },
    nextDeparture: '2026-10-02',
    pricePerPerson: money(742000, KWD),
    partyAssumption: { adults: 2, sharing: 2 },
    hotelTier: 4,
    boardBasis: 'half_board',
    differenceLine: {
      ar: 'أطول إقامة هنا، وبنصف إقامة بدل الإفطار فقط',
      en: 'Longest stay on this page, and half-board rather than breakfast only',
      fr: 'Le plus long séjour ici, en demi-pension plutôt que petit-déjeuner',
    },
    ledger: [
      { key: 'flights', included: true },
      { key: 'hotel', included: true },
      { key: 'transfers', included: true },
      { key: 'breakfast', included: true },
      { key: 'bags', included: true },
      { key: 'visa', included: true },
    ],
    facets: [
      { key: 'halal_food_nearby', state: 'green', ...verified('Layla H.', '2026-07-11') },
      { key: 'prayer_room', state: 'green', ...verified('Layla H.', '2026-07-11') },
      { key: 'alcohol_free_property', state: 'green', ...verified('Layla H.', '2026-07-11') },
      { key: 'family_section', state: 'na', verifiedBy: null, verifiedAt: null },
    ],
    notFor: {
      ar: 'ليست لك إن كنت تريد راحة. أربع مدن في ثماني ليالٍ، وقطاران داخليان مبكران.',
      en: 'Not for you if you want to rest. Four cities in eight nights and two early domestic trains.',
      fr: 'Pas pour vous si vous voulez du repos. Quatre villes en huit nuits, deux trains matinaux.',
    },
  },
];

export const ledgerOrder = ['flights', 'hotel', 'transfers', 'breakfast', 'bags', 'visa'] as const;
