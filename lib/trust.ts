import type { Locale } from '@/i18n/routing';

/**
 * The verify page.
 *
 * The governing rule: every claim here is either checkable or visibly marked as
 * a specimen. A demonstration site that prints a licence number it does not
 * hold is not a weaker design, it is a forged document, so the licence block
 * renders as a labelled placeholder with the real register link beside it and
 * no number in it.
 *
 * Deliberately absent, and stated as absent: trust seals, security badges, a
 * bare IATA logo, and "X travellers served" counters. The market leader's own
 * footer carries none of them either, and an unverifiable badge is an assertion
 * rather than evidence.
 */

export interface Person { name: string; role: string; languages: string; hours: string; }
export interface Promise_ { claim: string; caveat: string; }
export interface TrustContent {
  specimenNotice: string;
  people: { heading: string; body: string; list: Person[]; noPhotos: string };
  licence: { heading: string; body: string; placeholder: string; registerNote: string };
  data: { heading: string; where: string; never: string; breach: string };
  promises: { heading: string; list: Promise_[] };
  prices: { heading: string; body: string };
  reviews: { heading: string; body: string; threshold: string };
  changelog: { heading: string; body: string; entries: { date: string; what: string }[] };
  absent: { heading: string; body: string };
}

const EN: TrustContent = {
  specimenNotice:
    'This is a demonstration site. The agency, the packages and the prices are invented. Everything on this page that would normally be checkable is therefore shown as a labelled placeholder rather than filled in with something that looks real.',
  people: {
    heading: 'Who answers you',
    body: 'Two people handle enquiries. You get one of them, by name, not a queue number and not a bot.',
    list: [
      { name: 'Layla H.', role: 'Georgia, Türkiye and the Caucasus', languages: 'Arabic, English, Turkish', hours: '09:00–21:00 Riyadh, Sunday to Thursday' },
      { name: 'Omar D.', role: 'Central Asia, the Balkans and the Indian Ocean', languages: 'Arabic, English', hours: '11:00–20:00 Riyadh, Saturday to Wednesday' },
    ],
    noPhotos:
      'There are no photographs here because there are no real people behind these names yet. A stock portrait presented as a colleague is the same category of thing as an invented review.',
  },
  licence: {
    heading: 'Registration and licence',
    body: 'A travel agency selling packages in this region is licensed, and the number belongs on the page where you can copy it and check it yourself rather than in a badge you cannot verify.',
    placeholder: 'No licence number — specimen site',
    registerNote:
      'When there is a real one, it sits here as copyable text next to a link into the regulator’s own search, so you can confirm it without taking our word for it.',
  },
  data: {
    heading: 'Your data',
    where:
      'Enquiries are held outside the Gulf, on managed infrastructure, because our database provider has no Middle East region. That is a disclosure rather than a footnote, and it is the honest answer to a question most sites do not answer at all.',
    never:
      'We never ask for a passport number to show you a price, and never store card details: there is no payment on this site, so there is nothing to store.',
    breach:
      'If something goes wrong with your data you are told, and told what happened, rather than finding out later.',
  },
  promises: {
    heading: 'What we promise, with the catch inside it',
    list: [
      { claim: 'A person replies to you.', caveat: 'Within the hours published above. Outside them your message waits, and we would rather say that than publish a response time we cannot hold at 2am.' },
      { claim: 'The quote is itemised before you commit.', caveat: 'Every included line and every excluded line with its estimate. What we cannot itemise is a supplier price that moves between quote and confirmation, so the quote carries an expiry.' },
      { claim: 'Nothing is booked until you say so.', caveat: 'An enquiry is a question. Acceptance is written and explicit; there is no step here that quietly commits you.' },
      { claim: 'If the trip changes, we requote free.', caveat: 'The requote is free. Whatever a supplier charges to change a confirmed booking is not ours to waive, and the quote states those terms before you accept.' },
    ],
  },
  prices: {
    heading: 'How the prices work',
    body: 'One all-in figure per party, computed before you ask, with mandatory taxes and fees already inside it. What falls outside is named and priced at the same visual weight as what is included. There is no crossed-out reference price, no countdown, and no "three people are viewing this" — each of those needs a number we do not have.',
  },
  reviews: {
    heading: 'Why there are no reviews',
    body: 'Because there are no customers yet. A review section on a site with no bookings is either empty, which tells you nothing, or filled in, which is fabrication. Both are worse than saying this.',
    threshold:
      'Reviews appear when a package has twenty genuine ones tied to completed bookings, and not before. That number is stated here so you can hold us to it.',
  },
  changelog: {
    heading: 'Privacy notice changelog',
    body: 'Policy documents change quietly on most sites. Every change to ours is dated here.',
    entries: [
      { date: '2026-08-23', what: 'First version published alongside accounts and enquiries.' },
      { date: '2026-08-28', what: 'Added where enquiry data is held, after the database region was settled.' },
    ],
  },
  absent: {
    heading: 'What is deliberately not on this page',
    body: 'No trust seals, no security badges, no IATA logo without a number behind it, and no counter claiming how many travellers we have served. A logo with no number is an assertion, not evidence, and a counter on a site with no bookings would be an invented figure.',
  },
};

const AR: TrustContent = {
  specimenNotice:
    'هذا موقع عرض. الوكالة والباقات والأسعار متخيلة. لذلك كل ما في هذه الصفحة مما يُفترض أن يكون قابلًا للتحقق يظهر كعنصر نائب معلَّم، لا كشيء يبدو حقيقيًا.',
  people: {
    heading: 'من يرد عليك',
    body: 'شخصان يتوليان الطلبات. يصلك أحدهما بالاسم، لا رقم في طابور ولا روبوت.',
    list: [
      { name: 'ليلى ح.', role: 'جورجيا وتركيا والقوقاز', languages: 'العربية والإنجليزية والتركية', hours: '٩ صباحًا إلى ٩ مساءً بتوقيت الرياض، الأحد إلى الخميس' },
      { name: 'عمر د.', role: 'آسيا الوسطى والبلقان والمحيط الهندي', languages: 'العربية والإنجليزية', hours: '١١ صباحًا إلى ٨ مساءً بتوقيت الرياض، السبت إلى الأربعاء' },
    ],
    noPhotos:
      'لا توجد صور هنا لأنه لا يوجد أشخاص حقيقيون خلف هذه الأسماء بعد. صورة من بنك صور تُقدَّم كزميل هي من نفس نوع التقييم المختلَق.',
  },
  licence: {
    heading: 'السجل والترخيص',
    body: 'وكالة السفر التي تبيع الباقات في هذه المنطقة مرخّصة، ومكان الرقم هو الصفحة التي تستطيع نسخه منها والتحقق بنفسك، لا شارة لا يمكن التثبت منها.',
    placeholder: 'لا رقم ترخيص — موقع تجريبي',
    registerNote:
      'حين يوجد رقم حقيقي، يظهر هنا نصًا قابلًا للنسخ بجانب رابط إلى بحث الجهة المنظِّمة نفسها، فتتأكد دون أن تأخذ كلامنا.',
  },
  data: {
    heading: 'بياناتك',
    where:
      'الطلبات محفوظة خارج الخليج على بنية تحتية مُدارة، لأن مزود قاعدة البيانات لدينا لا يملك منطقة في الشرق الأوسط. هذا إفصاح لا هامش، وهو الجواب الصادق لسؤال لا تجيبه أغلب المواقع أصلًا.',
    never:
      'لا نطلب رقم جواز لعرض سعر عليك، ولا نخزّن بيانات بطاقة: لا يوجد دفع على هذا الموقع، فلا شيء يُخزَّن.',
    breach:
      'إن حدث خلل ببياناتك تُخبَر، وتُخبَر بما حدث، لا أن تكتشفه لاحقًا.',
  },
  promises: {
    heading: 'ما نعد به، ومعه شرطه',
    list: [
      { claim: 'يرد عليك شخص.', caveat: 'ضمن الساعات المذكورة أعلاه. خارجها تنتظر رسالتك، ونفضّل قول ذلك على نشر زمن رد لا نستطيع الوفاء به الثانية فجرًا.' },
      { claim: 'عرض السعر مفصَّل قبل أن تلتزم.', caveat: 'كل بند مشمول وكل بند غير مشمول بتقديره. ما لا نستطيع تفصيله هو سعر مورّد يتحرك بين العرض والتأكيد، ولذلك يحمل العرض تاريخ انتهاء.' },
      { claim: 'لا يُحجز شيء حتى تقول أنت.', caveat: 'الطلب سؤال. والقبول مكتوب وصريح؛ لا خطوة هنا تلزمك بصمت.' },
      { claim: 'إن تغيّرت الرحلة نعيد التسعير مجانًا.', caveat: 'إعادة التسعير مجانية. أما ما يفرضه المورّد لتعديل حجز مؤكد فليس لنا أن نتنازل عنه، وعرض السعر يذكر تلك الشروط قبل قبولك.' },
    ],
  },
  prices: {
    heading: 'كيف تعمل الأسعار',
    body: 'رقم واحد شامل للمجموعة، محسوب قبل أن تسأل، والضرائب والرسوم الإلزامية داخله. وما يقع خارجه مذكور ومسعَّر بنفس الوزن البصري للمشمول. لا سعر مشطوب، ولا عدّاد تنازلي، ولا «ثلاثة يشاهدون الآن» — كل واحدة منها تحتاج رقمًا لا نملكه.',
  },
  reviews: {
    heading: 'لماذا لا توجد تقييمات',
    body: 'لأنه لا يوجد عملاء بعد. قسم تقييمات في موقع بلا حجوزات إما فارغ فلا يقول شيئًا، أو مملوء فيكون تزويرًا. وكلاهما أسوأ من قول هذا.',
    threshold:
      'تظهر التقييمات حين تجمع الباقة عشرين تقييمًا حقيقيًا مرتبطًا بحجوزات مكتملة، لا قبل ذلك. الرقم مذكور هنا لتحاسبنا عليه.',
  },
  changelog: {
    heading: 'سجل تغييرات إشعار الخصوصية',
    body: 'وثائق السياسات تتغير بصمت في أغلب المواقع. كل تغيير في وثيقتنا مؤرَّخ هنا.',
    entries: [
      { date: '2026-08-23', what: 'نُشرت النسخة الأولى مع الحسابات والطلبات.' },
      { date: '2026-08-28', what: 'أضيف مكان حفظ بيانات الطلبات بعد تحديد منطقة قاعدة البيانات.' },
    ],
  },
  absent: {
    heading: 'ما لا يوجد في هذه الصفحة عمدًا',
    body: 'لا شارات ثقة، ولا شارات أمان، ولا شعار «إياتا» بلا رقم خلفه، ولا عدّاد يدّعي كم مسافرًا خدمنا. شعار بلا رقم ادّعاء لا دليل، وعدّاد في موقع بلا حجوزات رقم مختلَق.',
  },
};

const FR: TrustContent = {
  specimenNotice:
    "Ceci est un site de démonstration. L'agence, les forfaits et les prix sont inventés. Tout ce qui devrait normalement être vérifiable apparaît donc comme un élément indicatif signalé, plutôt que rempli avec quelque chose qui aurait l'air vrai.",
  people: {
    heading: 'Qui vous répond',
    body: "Deux personnes traitent les demandes. Vous en avez une, par son nom, pas un numéro de file ni un robot.",
    list: [
      { name: 'Layla H.', role: 'Géorgie, Türkiye et Caucase', languages: 'arabe, anglais, turc', hours: '09h00–21h00 Riyad, du dimanche au jeudi' },
      { name: 'Omar D.', role: "Asie centrale, Balkans et océan Indien", languages: 'arabe, anglais', hours: '11h00–20h00 Riyad, du samedi au mercredi' },
    ],
    noPhotos:
      "Il n'y a pas de photographies ici parce qu'il n'y a pas encore de personnes réelles derrière ces noms. Un portrait de banque d'images présenté comme un collègue relève de la même catégorie qu'un avis inventé.",
  },
  licence: {
    heading: 'Immatriculation et licence',
    body: "Une agence qui vend des forfaits dans cette région est licenciée, et le numéro a sa place sur la page où vous pouvez le copier et le vérifier vous-même, pas dans un badge invérifiable.",
    placeholder: 'Aucun numéro de licence — site spécimen',
    registerNote:
      "Quand il y en aura un vrai, il figurera ici en texte copiable, à côté d'un lien vers la recherche du registre officiel, pour que vous puissiez vérifier sans nous croire sur parole.",
  },
  data: {
    heading: 'Vos données',
    where:
      "Les demandes sont hébergées hors du Golfe, sur une infrastructure gérée, car notre fournisseur de base de données n'a pas de région au Moyen-Orient. C'est une divulgation, pas une note de bas de page.",
    never:
      "Nous ne demandons jamais un numéro de passeport pour afficher un prix, et ne stockons aucune donnée de carte : il n'y a pas de paiement sur ce site, donc rien à stocker.",
    breach:
      "En cas d'incident sur vos données, vous êtes prévenu, et informé de ce qui s'est passé, plutôt que de l'apprendre plus tard.",
  },
  promises: {
    heading: 'Ce que nous promettons, avec la réserve à l’intérieur',
    list: [
      { claim: 'Une personne vous répond.', caveat: "Pendant les horaires publiés ci-dessus. En dehors, votre message attend, et nous préférons le dire plutôt que d'afficher un délai intenable à 2h du matin." },
      { claim: 'Le devis est détaillé avant tout engagement.', caveat: "Chaque ligne incluse et chaque ligne exclue avec son estimation. Ce que nous ne pouvons pas détailler, c'est un prix fournisseur qui bouge entre devis et confirmation : d'où l'expiration du devis." },
      { claim: "Rien n'est réservé tant que vous ne le dites pas.", caveat: "Une demande est une question. L'acceptation est écrite et explicite ; aucune étape ici ne vous engage discrètement." },
      { claim: 'Si le voyage change, nous refaisons le devis gratuitement.', caveat: "Le nouveau devis est gratuit. Ce qu'un fournisseur facture pour modifier une réservation confirmée ne nous appartient pas, et le devis énonce ces conditions avant votre acceptation." },
    ],
  },
  prices: {
    heading: 'Comment fonctionnent les prix',
    body: "Un montant unique tout compris pour le groupe, calculé avant votre demande, taxes et frais obligatoires inclus. Ce qui en sort est nommé et chiffré au même poids visuel que ce qui est inclus. Aucun prix barré, aucun compte à rebours, aucun « trois personnes regardent » : chacun exigerait un chiffre que nous n'avons pas.",
  },
  reviews: {
    heading: "Pourquoi il n'y a pas d'avis",
    body: "Parce qu'il n'y a pas encore de clients. Une section d'avis sur un site sans réservations est soit vide, ce qui n'apprend rien, soit remplie, ce qui est une falsification. Les deux valent moins que de le dire.",
    threshold:
      "Les avis apparaîtront quand un forfait en comptera vingt authentiques, liés à des réservations effectuées, et pas avant. Le seuil est indiqué ici pour que vous puissiez nous y tenir.",
  },
  changelog: {
    heading: 'Journal des modifications de la politique de confidentialité',
    body: "Les documents de politique changent discrètement sur la plupart des sites. Chaque modification de la nôtre est datée ici.",
    entries: [
      { date: '2026-08-23', what: 'Première version publiée avec les comptes et les demandes.' },
      { date: '2026-08-28', what: "Ajout du lieu d'hébergement des demandes, après le choix de la région de base de données." },
    ],
  },
  absent: {
    heading: "Ce qui ne figure délibérément pas ici",
    body: "Aucun sceau de confiance, aucun badge de sécurité, aucun logo IATA sans numéro derrière, aucun compteur de voyageurs servis. Un logo sans numéro est une affirmation, pas une preuve, et un compteur sur un site sans réservations serait un chiffre inventé.",
  },
};

export function trustContent(locale: Locale): TrustContent {
  return locale === 'ar' ? AR : locale === 'fr' ? FR : EN;
}
