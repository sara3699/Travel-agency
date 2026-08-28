import type { Locale } from '@/i18n/routing';

/**
 * The privacy notice, written once per locale rather than translated.
 *
 * Master doc 1591: legal pages are bilingual and the Arabic is written, not
 * machine-translated. Kuwait requires bilingual explicitly, and everywhere else
 * a machine-translated consent document fails the informed-consent standard.
 *
 * Everything in here is checked against what the code actually does. The
 * enquiry columns are the columns on public.enquiries, the token length is the
 * real one, and the hosting sentence matches what the trust page already says.
 * A privacy notice that describes a different system than the one running is
 * worse than none, because it reads as compliance theatre the moment anyone
 * checks it.
 *
 * The trust page carries a dated changelog for this document. The two lists are
 * the same list; if one moves, move the other.
 */

export type LegalDoc = 'privacy';
export const LEGAL_DOCS: readonly LegalDoc[] = ['privacy'] as const;

export type LegalSection = { heading: string; body: string[] };

export type LegalContent = {
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
  changelog: { date: string; what: string }[];
};

const EN: LegalContent = {
  title: 'Privacy notice',
  lede: 'What this site collects, where it is held, and how to have it removed.',
  updated: '2026-08-28',
  sections: [
    {
      heading: 'Read this part first',
      body: [
        'The agency is not real. The packages, the prices and the hotels on this site are invented, and every price carries a label saying so.',
        'The enquiry form is real. If you fill it in, what you type reaches a live database and a person can read it. Send us a name you are happy to be called and one way to reach you, and nothing else. There is no reason to put anything sensitive into a demonstration.',
      ],
    },
    {
      heading: 'What an enquiry collects',
      body: [
        'Your name. A phone number or an email address, whichever one you chose, because the form asks for one and not both. How many adults and children are travelling. Roughly when you want to go. The trip you were looking at when you asked. Anything you typed into the message box. The language you were reading in.',
        'That is the entire list. There is no hidden field.',
      ],
    },
    {
      heading: 'What an account collects',
      body: [
        'You do not need an account to enquire. It exists so your enquiries sit in one place afterwards.',
        'If you open one: your email address, a password, and optionally a display name and a phone number. The password is stored by our authentication provider as a hash. It is not readable by us, and we cannot tell you what it is if you forget it.',
      ],
    },
    {
      heading: 'What we never ask for',
      body: [
        'No passport number. A price does not need one, and a site that asks for one before quoting is collecting it for another reason.',
        'No card details. There is no payment on this site, so there is nothing to capture and nothing to store.',
      ],
    },
    {
      heading: 'Where it is held',
      body: [
        'On managed Postgres run by Supabase, outside the Gulf, because that provider has no Middle East region. That is a disclosure rather than a footnote: if where your data sits matters to you, it should be on the page and not in an answer you have to request.',
      ],
    },
    {
      heading: 'Who can read it',
      body: [
        'You. Staff, who need to in order to answer you. And whoever holds the private link to your enquiry.',
        'That last one is worth understanding. The status page link ends in a 48-character token, which is what stands in for a password on it. Anyone who has the link can read that enquiry, which is the point: you can forward it to whoever is travelling with you without making them sign in. Treat it as you would a key, and do not post it anywhere public.',
        'The status page shows what you sent us. It does not show your phone number, your email address, or anything staff wrote internally.',
      ],
    },
    {
      heading: 'Counting visits',
      body: [
        'Page views are counted by Vercel Web Analytics. It sets no cookie, so this site has no cookie banner to dismiss. It counts pages, not people, and it cannot see anything you send through the enquiry form.',
      ],
    },
    {
      heading: 'Having it deleted',
      body: [
        'Ask, through the same channel you used to reach us, and quote the reference on your enquiry. It is removed rather than flagged as hidden.',
        'Because this is a demonstration and not a trading company, there is no tax or accounting rule keeping anything here. Nothing needs to be retained, so nothing is.',
      ],
    },
    {
      heading: 'If something goes wrong',
      body: [
        'If your data is exposed you are told what happened and when, rather than finding out from somewhere else. Saying so is easy. It is written here so it can be held against us.',
      ],
    },
  ],
  changelog: [
    { date: '2026-08-23', what: 'First version, published alongside accounts and enquiries.' },
    { date: '2026-08-28', what: 'Added where enquiry data is held, after the database region was settled.' },
  ],
};

const AR: LegalContent = {
  title: 'إشعار الخصوصية',
  lede: 'ما يجمعه هذا الموقع، وأين يُحفظ، وكيف تطلب حذفه.',
  updated: '2026-08-28',
  sections: [
    {
      heading: 'اقرأ هذا أولًا',
      body: [
        'الوكالة غير حقيقية. البرامج والأسعار والفنادق المعروضة هنا من وضعنا لغرض العرض، وكل سعر يحمل بطاقة تقول ذلك.',
        'أما نموذج الاستفسار فحقيقي. إذا ملأته، يصل ما تكتبه إلى قاعدة بيانات فعلية ويستطيع شخص أن يقرأه. اكتب اسمًا لا تمانع أن نناديك به ووسيلة واحدة للتواصل، ولا شيء غير ذلك. لا داعي لوضع أي معلومة حساسة في موقع للعرض.',
      ],
    },
    {
      heading: 'ما يجمعه الاستفسار',
      body: [
        'اسمك. رقم هاتف أو بريد إلكتروني، أيهما اخترت، لأن النموذج يطلب واحدًا لا الاثنين. عدد البالغين والأطفال المسافرين. الوقت التقريبي الذي تريد السفر فيه. الرحلة التي كنت تنظر إليها حين سألت. ما كتبته في خانة الرسالة. واللغة التي كنت تقرأ بها.',
        'هذه هي القائمة كاملة. لا يوجد حقل مخفي.',
      ],
    },
    {
      heading: 'ما يجمعه الحساب',
      body: [
        'لست بحاجة إلى حساب كي ترسل استفسارًا. الحساب موجود ليجمع استفساراتك في مكان واحد بعد ذلك.',
        'إذا فتحت حسابًا: بريدك الإلكتروني، وكلمة مرور، واسم للعرض ورقم هاتف إن أردت. كلمة المرور تُحفظ لدى مزود المصادقة على هيئة بصمة مشفّرة، لا نستطيع قراءتها، ولا نستطيع أن نخبرك بها إذا نسيتها.',
      ],
    },
    {
      heading: 'ما لا نطلبه أبدًا',
      body: [
        'لا رقم جواز. السعر لا يحتاج إليه، والموقع الذي يطلبه قبل أن يعطيك سعرًا يجمعه لسبب آخر.',
        'لا بيانات بطاقة. لا يوجد دفع على هذا الموقع، فلا شيء يُؤخذ ولا شيء يُحفظ.',
      ],
    },
    {
      heading: 'أين يُحفظ',
      body: [
        'على قاعدة بيانات Postgres مُدارة لدى Supabase، خارج الخليج، لأن هذا المزود لا يملك منطقة في الشرق الأوسط. نقولها هنا صراحةً لا في هامش: إذا كان مكان بياناتك يهمك، فمكانه الصفحة لا إجابة تضطر إلى طلبها.',
      ],
    },
    {
      heading: 'من يستطيع قراءته',
      body: [
        'أنت. والموظفون، لأنهم يحتاجون إلى ذلك للرد عليك. ومن يملك الرابط الخاص باستفسارك.',
        'هذه النقطة الأخيرة تستحق التوضيح. رابط صفحة الحالة ينتهي برمز من 48 خانة، وهو ما يقوم مقام كلمة المرور فيها. من يملك الرابط يستطيع قراءة ذلك الاستفسار، وهذا هو المقصود: تستطيع إرساله لمن يسافر معك دون أن يسجّل دخوله. تعامل معه كما تتعامل مع مفتاح، ولا تنشره في مكان عام.',
        'صفحة الحالة تعرض ما أرسلته أنت. لا تعرض رقم هاتفك ولا بريدك ولا ما كتبه الموظفون داخليًا.',
      ],
    },
    {
      heading: 'عدّ الزيارات',
      body: [
        'تُحصى مشاهدات الصفحات عبر Vercel Web Analytics. لا يضع ملف تعريف ارتباط، ولذلك لا يوجد في هذا الموقع شريط موافقة تضطر إلى إغلاقه. يعدّ الصفحات لا الأشخاص، ولا يرى شيئًا مما ترسله عبر نموذج الاستفسار.',
      ],
    },
    {
      heading: 'كيف تطلب الحذف',
      body: [
        'اطلبه عبر القناة نفسها التي راسلتنا بها، مع ذكر الرقم المرجعي لاستفسارك. يُحذف فعليًا، لا يُخفى فقط.',
        'ولأن هذا موقع عرض لا شركة تعمل، لا توجد قاعدة ضريبية أو محاسبية تُلزمنا بالاحتفاظ بشيء. لا شيء يحتاج إلى البقاء، فلا شيء يبقى.',
      ],
    },
    {
      heading: 'إذا حدث خلل',
      body: [
        'إذا انكشفت بياناتك، تُخبَر بما حدث ومتى حدث، بدل أن تعرف من مكان آخر. قول هذا سهل. وهو مكتوب هنا كي يُحتجّ به علينا.',
      ],
    },
  ],
  changelog: [
    { date: '2026-08-23', what: 'النسخة الأولى، نُشرت مع الحسابات والاستفسارات.' },
    { date: '2026-08-28', what: 'أُضيف مكان حفظ بيانات الاستفسارات بعد تحديد منطقة قاعدة البيانات.' },
  ],
};

const FR: LegalContent = {
  title: 'Avis de confidentialité',
  lede: 'Ce que ce site collecte, où cela est conservé, et comment en demander la suppression.',
  updated: '2026-08-28',
  sections: [
    {
      heading: 'À lire en premier',
      body: [
        "L'agence n'existe pas. Les séjours, les prix et les hôtels présentés ici sont inventés, et chaque prix porte une étiquette qui le dit.",
        "Le formulaire, lui, est réel. Si vous le remplissez, ce que vous écrivez arrive dans une base de données active et une personne peut le lire. Donnez un nom qui vous convient et un seul moyen de vous joindre, rien de plus. Rien ne justifie de confier quoi que ce soit de sensible à une démonstration.",
      ],
    },
    {
      heading: 'Ce que collecte une demande',
      body: [
        "Votre nom. Un numéro de téléphone ou une adresse email, selon ce que vous avez choisi, car le formulaire en demande un et non les deux. Le nombre d'adultes et d'enfants qui voyagent. La période approximative. Le séjour que vous regardiez au moment de la demande. Ce que vous avez écrit dans le message. La langue dans laquelle vous lisiez.",
        "C'est la liste complète. Il n'y a pas de champ caché.",
      ],
    },
    {
      heading: 'Ce que collecte un compte',
      body: [
        "Un compte n'est pas nécessaire pour envoyer une demande. Il sert à regrouper vos demandes ensuite.",
        "Si vous en ouvrez un : votre adresse email, un mot de passe, et si vous le souhaitez un nom affiché et un numéro. Le mot de passe est conservé par notre fournisseur d'authentification sous forme d'empreinte. Nous ne pouvons pas le lire, ni vous le rappeler si vous l'oubliez.",
      ],
    },
    {
      heading: 'Ce que nous ne demandons jamais',
      body: [
        "Aucun numéro de passeport. Un prix n'en a pas besoin, et un site qui le réclame avant de chiffrer le collecte pour autre chose.",
        "Aucune donnée bancaire. Il n'y a pas de paiement sur ce site : rien à saisir, rien à conserver.",
      ],
    },
    {
      heading: 'Où cela est conservé',
      body: [
        "Sur une base Postgres gérée par Supabase, hors du Golfe, car ce fournisseur n'a pas de région au Moyen-Orient. Nous l'écrivons ici plutôt qu'en note de bas de page : si l'endroit où vivent vos données compte pour vous, il doit figurer sur la page et non dans une réponse qu'il faut réclamer.",
      ],
    },
    {
      heading: 'Qui peut le lire',
      body: [
        "Vous. Le personnel, qui en a besoin pour vous répondre. Et toute personne détenant le lien privé de votre demande.",
        "Ce dernier point mérite une explication. Le lien de suivi se termine par un jeton de 48 caractères, qui y tient lieu de mot de passe. Quiconque a le lien peut lire cette demande, et c'est voulu : vous pouvez le transmettre à ceux qui voyagent avec vous sans les obliger à créer un compte. Traitez-le comme une clé et ne le publiez pas.",
        "La page de suivi affiche ce que vous avez envoyé. Elle n'affiche ni votre téléphone, ni votre email, ni les notes internes.",
      ],
    },
    {
      heading: 'Le comptage des visites',
      body: [
        "Les pages vues sont comptées par Vercel Web Analytics. Aucun cookie n'est déposé, et ce site n'a donc pas de bandeau à refuser. L'outil compte des pages et non des personnes, et il ne voit rien de ce que vous envoyez par le formulaire.",
      ],
    },
    {
      heading: 'Demander la suppression',
      body: [
        "Demandez-la par le canal que vous avez utilisé pour nous joindre, en citant la référence de votre demande. Elle est supprimée, pas seulement masquée.",
        "Comme il s'agit d'une démonstration et non d'une société en activité, aucune obligation fiscale ou comptable n'impose de conserver quoi que ce soit. Rien n'a besoin d'être gardé, donc rien ne l'est.",
      ],
    },
    {
      heading: "En cas d'incident",
      body: [
        "Si vos données sont exposées, vous saurez ce qui s'est passé et quand, plutôt que de l'apprendre ailleurs. C'est facile à écrire. C'est écrit ici pour qu'on puisse nous le rappeler.",
      ],
    },
  ],
  changelog: [
    { date: '2026-08-23', what: 'Première version, publiée avec les comptes et les demandes.' },
    { date: '2026-08-28', what: "Ajout du lieu d'hébergement des demandes, une fois la région de la base fixée." },
  ],
};

const BY_LOCALE: Record<Locale, Record<LegalDoc, LegalContent>> = {
  ar: { privacy: AR },
  en: { privacy: EN },
  fr: { privacy: FR },
};

export function legalContent(locale: Locale, doc: LegalDoc): LegalContent {
  return BY_LOCALE[locale][doc];
}

export const isLegalDoc = (v: string): v is LegalDoc =>
  (LEGAL_DOCS as readonly string[]).includes(v);
