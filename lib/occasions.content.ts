import type { Locale } from '@/i18n/routing';

/**
 * One hand-written paragraph per window per locale. Deliberately not a template
 * with the destination names mail-merged in: the whole point of grouping by
 * occasion is that the reason for the trip is different each time, and a
 * sentence that could be about any of them says nothing about this one.
 */
export interface WindowCopy {
  title: string;
  /** why someone travels in this window */
  intent: string;
  /** shown when the window is not currently open, instead of a countdown */
  closed: string;
  /** what to look for in a trip for this occasion */
  advice: string;
}

type Bundle = Record<string, WindowCopy>;

const EN: Bundle = {
  'eid-al-fitr': {
    title: 'Eid al-Fitr',
    intent:
      'A month of early nights ends and everyone wants to be somewhere else by the second day. The flights that matter are the ones leaving in the fortnight before, because by Eid itself the good ones have gone.',
    closed:
      'The window is not open yet. Trips for it appear here as departures are confirmed, and the dates below move with the sighting rather than with a calendar we printed in advance.',
    advice:
      'Book the outbound earlier than feels necessary and keep the return loose. Families travel in blocks at Eid and the return leg is what sells out first.',
  },
  'eid-al-adha': {
    title: 'Eid al-Adha',
    intent:
      'A longer break than Eid al-Fitr and a quieter one to travel in, because a large share of the region is occupied with Hajj. Prices on the corridors that are not Makkah-bound are usually the softest of the year.',
    closed:
      'Not open yet. When it is, the trips that fit sit here. The first day depends on the sighting, so treat the dates below as accurate to about a day.',
    advice:
      'If your dates can move by two or three days, this is the window where that flexibility is worth the most money.',
  },
  'summer-escape': {
    title: 'Escaping the heat',
    intent:
      'June to September is not beach season here, it is the season for leaving. Fifty degrees at home makes twenty-two somewhere green a different kind of holiday, and the destinations that work are cool, high, or both.',
    closed:
      'The heat window runs June to September. Outside it these same destinations are still good, but they are competing on their own merits rather than on the thermometer.',
    advice:
      'Compare the temperature difference, not the flight time. Four hours to somewhere twenty degrees cooler beats two hours to somewhere five degrees cooler.',
  },
  'school-holiday': {
    title: 'The school holiday',
    intent:
      'July and August, when the whole family can actually go and the calendar is set by a term timetable rather than by anyone at work. School terms differ by country, so the exact fortnight that works for you is not the same as your neighbour.',
    closed:
      'Outside the school break these trips run with smaller groups and lower prices, which is the trade if you can travel without children in tow.',
    advice:
      'Tell us the ages. Room configuration, not price, is what usually decides which of these actually works for a family.',
  },
  honeymoon: {
    title: 'Honeymoon',
    intent:
      'The one trip where the room matters more than the itinerary. Fewer moves, later starts, and somewhere you are not sharing a breakfast room with a tour group.',
    closed: '',
    advice:
      'Say it is a honeymoon when you enquire. It changes which room we ask for, not what we charge you for it.',
  },
  'first-trip': {
    title: 'A first trip abroad',
    intent:
      'Short, visa-light and close enough that a wrong turn is recoverable. The aim is a trip that ends with someone wanting to go again, not one that proves travel is stressful.',
    closed: '',
    advice:
      'Pick the shorter flight over the better photograph. Everything else about a first trip is easier when the journey is under five hours.',
  },
  'family-reunion': {
    title: 'A family reunion',
    intent:
      'Three generations, one booking, and a set of requirements nobody else has to think about: connecting rooms, a lift, a family section, somewhere the grandparents can sit while the children run.',
    closed: '',
    advice:
      'These are the trips where the facet list matters most. Check the family section state on each one; it names who verified it and when.',
  },
};

const AR: Bundle = {
  'eid-al-fitr': {
    title: 'عيد الفطر',
    intent:
      'شهر من السهر ينتهي، والجميع يريد أن يكون في مكان آخر بحلول اليوم الثاني. الرحلات المهمة هي التي تغادر في الأسبوعين السابقين، لأن الجيد منها ينفد قبل العيد نفسه.',
    closed:
      'النافذة لم تُفتح بعد. تظهر هنا الرحلات كلما تأكدت المغادرات، والتواريخ أدناه تتحرك مع الرؤية لا مع تقويم طبعناه مسبقًا.',
    advice:
      'احجز الذهاب أبكر مما تظن، واترك العودة مرنة. العائلات تسافر جماعات في العيد، ورحلة العودة هي أول ما ينفد.',
  },
  'eid-al-adha': {
    title: 'عيد الأضحى',
    intent:
      'إجازة أطول من عيد الفطر وأهدأ للسفر، لأن جزءًا كبيرًا من المنطقة مشغول بالحج. الأسعار على المسارات غير المتجهة إلى مكة تكون عادة ألين ما تكون في السنة.',
    closed:
      'لم تُفتح بعد. وحين تُفتح تجد هنا الرحلات المناسبة. اليوم الأول يعتمد على الرؤية، فاعتبر التواريخ أدناه دقيقة في حدود يوم.',
    advice:
      'إن كانت تواريخك تحتمل التحرك يومين أو ثلاثة، فهذه النافذة هي التي تستحق فيها تلك المرونة أكبر فرق في السعر.',
  },
  'summer-escape': {
    title: 'الهروب من الحر',
    intent:
      'من يونيو إلى سبتمبر ليس موسم بحر هنا، بل موسم مغادرة. خمسون درجة في البيت تجعل اثنتين وعشرين في مكان أخضر إجازة من نوع مختلف، والوجهات التي تنجح باردة أو مرتفعة أو كلاهما.',
    closed:
      'نافذة الحر من يونيو إلى سبتمبر. خارجها تبقى هذه الوجهات جيدة، لكنها تنافس بجدارتها لا بدرجة الحرارة.',
    advice:
      'قارن فرق الحرارة لا مدة الطيران. أربع ساعات إلى مكان أبرد بعشرين درجة أفضل من ساعتين إلى مكان أبرد بخمس.',
  },
  'school-holiday': {
    title: 'إجازة المدارس',
    intent:
      'يوليو وأغسطس، حين تستطيع العائلة كلها السفر فعلًا ويضبط التقويمَ جدولُ الفصل الدراسي لا جدول العمل. الفصول تختلف بين الدول، فالأسبوعان المناسبان لك ليسا نفسهما لجارك.',
    closed:
      'خارج إجازة المدارس تسير هذه الرحلات بمجموعات أصغر وأسعار أقل، وهذه هي المقايضة إن استطعت السفر دون أطفال.',
    advice:
      'أخبرنا بالأعمار. توزيع الغرف لا السعر هو ما يحدد عادة أي من هذه الرحلات يصلح لعائلة.',
  },
  honeymoon: {
    title: 'شهر العسل',
    intent:
      'الرحلة الوحيدة التي تهم فيها الغرفة أكثر من البرنامج. تنقلات أقل، وبدايات متأخرة، ومكان لا تتشارك فيه صالة الإفطار مع مجموعة سياحية.',
    closed: '',
    advice:
      'قل إنها شهر عسل عند الطلب. هذا يغيّر الغرفة التي نطلبها، لا ما نحاسبك عليه.',
  },
  'first-trip': {
    title: 'أول سفرة',
    intent:
      'قصيرة، بلا تعقيد تأشيرة، وقريبة بما يكفي ليكون الخطأ قابلًا للإصلاح. الهدف رحلة تنتهي برغبة في التكرار، لا رحلة تثبت أن السفر متعب.',
    closed: '',
    advice:
      'اختر الرحلة الأقصر لا الصورة الأجمل. كل شيء في أول سفرة أسهل حين يكون الطيران أقل من خمس ساعات.',
  },
  'family-reunion': {
    title: 'لمّة العائلة',
    intent:
      'ثلاثة أجيال وحجز واحد، ومتطلبات لا يفكر فيها غيركم: غرف متصلة، ومصعد، وقسم عائلي، ومكان يجلس فيه الأجداد بينما يجري الأطفال.',
    closed: '',
    advice:
      'هذه الرحلات التي تهم فيها قائمة الخصائص أكثر من غيرها. راجع حالة القسم العائلي في كل رحلة؛ فهي تذكر من تحقق منها ومتى.',
  },
};

const FR: Bundle = {
  'eid-al-fitr': {
    title: 'Aïd el-Fitr',
    intent:
      "Un mois de nuits courtes s'achève et tout le monde veut être ailleurs dès le deuxième jour. Les vols qui comptent sont ceux de la quinzaine précédente : le jour de l'Aïd, les bons sont déjà partis.",
    closed:
      "La fenêtre n'est pas encore ouverte. Les voyages y apparaissent à mesure que les départs se confirment, et les dates ci-dessous suivent l'observation plutôt qu'un calendrier imprimé à l'avance.",
    advice:
      "Réservez l'aller plus tôt qu'il ne semble nécessaire et gardez le retour souple. Les familles partent en bloc et c'est le retour qui se remplit en premier.",
  },
  'eid-al-adha': {
    title: 'Aïd el-Adha',
    intent:
      "Une pause plus longue que l'Aïd el-Fitr et plus calme pour voyager, une grande partie de la région étant occupée par le Hajj. Sur les couloirs qui ne vont pas vers La Mecque, les prix sont souvent les plus doux de l'année.",
    closed:
      "Pas encore ouverte. Le premier jour dépend de l'observation : considérez les dates ci-dessous comme exactes à un jour près.",
    advice:
      "Si vos dates peuvent bouger de deux ou trois jours, c'est la fenêtre où cette souplesse rapporte le plus.",
  },
  'summer-escape': {
    title: 'Fuir la chaleur',
    intent:
      "De juin à septembre, ce n'est pas la saison de la plage ici, c'est la saison du départ. Cinquante degrés chez soi rendent vingt-deux degrés ailleurs très différents, et les destinations qui marchent sont fraîches, en altitude, ou les deux.",
    closed:
      "La fenêtre de chaleur va de juin à septembre. En dehors, ces destinations restent bonnes, mais sur leurs propres mérites plutôt que sur le thermomètre.",
    advice:
      "Comparez l'écart de température, pas la durée du vol. Quatre heures vers vingt degrés de moins valent mieux que deux heures vers cinq.",
  },
  'school-holiday': {
    title: 'Les vacances scolaires',
    intent:
      "Juillet et août, quand toute la famille peut réellement partir et que le calendrier est fixé par le rythme scolaire. Les périodes diffèrent d'un pays à l'autre : la quinzaine qui vous convient n'est pas celle de votre voisin.",
    closed:
      "Hors vacances scolaires, ces voyages partent en plus petits groupes et à des prix plus bas : c'est l'arbitrage si vous pouvez voyager sans enfants.",
    advice:
      "Donnez-nous les âges. C'est la configuration des chambres, pas le prix, qui décide en général lequel convient à une famille.",
  },
  honeymoon: {
    title: 'Voyage de noces',
    intent:
      "Le seul voyage où la chambre compte plus que le programme. Moins de déplacements, des départs plus tardifs, et un endroit où l'on ne partage pas la salle du petit-déjeuner avec un groupe.",
    closed: '',
    advice:
      "Dites-le au moment de la demande. Cela change la chambre que nous demandons, pas ce que nous vous facturons.",
  },
  'first-trip': {
    title: 'Un premier voyage',
    intent:
      "Court, sans complication de visa, et assez proche pour qu'une erreur reste rattrapable. Le but est un voyage qui donne envie de recommencer, pas un qui prouve que voyager est éprouvant.",
    closed: '',
    advice:
      "Choisissez le vol le plus court plutôt que la plus belle photo. Tout est plus simple sous cinq heures de vol.",
  },
  'family-reunion': {
    title: 'Réunion de famille',
    intent:
      "Trois générations, une seule réservation, et des exigences auxquelles personne d'autre ne pense : chambres communicantes, ascenseur, espace familial, un endroit où les grands-parents s'assoient pendant que les enfants courent.",
    closed: '',
    advice:
      "Ce sont les voyages où la liste des critères compte le plus. Vérifiez l'état de l'espace familial : il nomme qui l'a vérifié et quand.",
  },
};

export function occasionCopy(locale: Locale): Bundle {
  return locale === 'ar' ? AR : locale === 'fr' ? FR : EN;
}
