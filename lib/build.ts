import type { Locale } from '@/i18n/routing';

/**
 * The /build layer. Master doc 14.4: the practitioner argument as live evidence,
 * on its own routes, reaching the traveller's path only as one footer line.
 *
 * Language policy, decided 2026-08-28: the shell is trilingual like the rest of
 * the site, and long-form pieces are written in the languages that piece is
 * actually for. The Arabic typography piece is written in Arabic as well as
 * English, because publishing an argument about Arabic craft in English only
 * would undercut the argument. A piece missing in the reader's language says so
 * rather than silently serving English under an Arabic header.
 */

export type Block =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'code'; text: string; caption?: string }
  | { kind: 'note'; text: string }
  /** A run of Arabic shown inside running text. Rendered direction-isolated. */
  | { kind: 'sample'; text: string; label: string }
  | { kind: 'list'; items: string[] };

export interface Piece {
  id: string;
  /** Locales this piece is actually written in. Not the shell's locales. */
  written: Locale[];
  date: string;
  title: Record<string, string>;
  dek: Record<string, string>;
  body: Record<string, Block[]>;
}

const arabicShareCards: Piece = {
  id: 'arabic-share-cards',
  written: ['en', 'ar'],
  date: '2026-08-28',
  title: {
    en: 'The share card that reversed its own Arabic',
    ar: 'بطاقة المشاركة التي قلبت عربيتها',
  },
  dek: {
    en: 'Shaping a script and ordering it are two different jobs. A generated image can get the first one right and the second one wrong, and if you do not read the script you will never notice.',
    ar: 'تشكيل الحروف وترتيبها عمليتان مختلفتان. الصورة المولّدة قد تُتقن الأولى وتُخطئ الثانية، ومن لا يقرأ العربية لن يلاحظ ذلك أبدًا.',
  },
  body: {
    en: [
      { kind: 'p', text: 'This site sells travel packages to Arabic-speaking travellers, and the link to a package is forwarded into a family group chat long before it is posted anywhere public. The unfurled preview card is therefore the first impression more often than the homepage is. It is a designed object here, not an afterthought.' },
      { kind: 'p', text: 'Arabic leads the design, so the card had to be right in Arabic first. It was not.' },

      { kind: 'h', text: 'What the generator did' },
      { kind: 'p', text: 'The obvious tool is next/og, which renders JSX to an image using satori. It handles Latin well. Given a pure-Arabic string it produced something that looked, to anyone who does not read Arabic, entirely correct: the letters were joined, the shapes were right, the line was set nicely inside the card.' },
      { kind: 'p', text: 'The words were in the wrong order.' },
      { kind: 'sample', label: 'What the card should say', text: 'سعر تجريبي' },
      { kind: 'sample', label: 'What the generator produced', text: 'تجريبي سعر' },
      { kind: 'p', text: 'Two words, swapped. Every glyph correct, every join correct, the meaning gone. It is the kind of output that passes review by everyone on a team who cannot read the script, which is most teams.' },

      { kind: 'h', text: 'Shaping is not ordering' },
      { kind: 'p', text: 'The reason the letters looked right while the words did not is that rendering Arabic is two jobs, and they are done by different machinery.' },
      { kind: 'p', text: 'Shaping decides which glyph to draw. Arabic letters change form depending on their neighbours, so the same letter has initial, medial, final and isolated shapes, and adjacent letters fuse into ligatures. HarfBuzz does this, and it does it well. Satori uses it, which is why the sample above is beautifully joined.' },
      { kind: 'p', text: 'Ordering decides where each run goes on the line. That is the Unicode Bidirectional Algorithm, specified in UAX 9, and it is a separate pass over the text. It resolves embedding levels, handles neutral characters like spaces and punctuation, and works out the visual order of runs that may switch direction several times in one paragraph.' },
      { kind: 'p', text: 'A renderer can implement the first and approximate the second. Approximating it by reversing runs is enough to make mixed Latin and Arabic look plausible in a screenshot, and it is not enough to be correct. In a pure-Arabic string with no direction changes to disguise the error, the approximation shows.' },
      { kind: 'note', text: 'Stated as observation, not as a reading of anyone\'s source: what was tested is the output. A pure-Arabic string came back with its words in reverse order while its glyphs were correctly shaped. The explanation above is the mechanism that accounts for that symptom.' },

      { kind: 'h', text: 'Why this is worse than a missing card' },
      { kind: 'p', text: 'A card that fails to render is a gap. Someone notices a gap. A card that renders confidently in the wrong order is a claim, made in a language the person who shipped it may not read, forwarded into a group chat where every reader does read it.' },
      { kind: 'p', text: 'The whole positioning of this product is that the price shown is the price paid and that nothing is hidden. Delivering that promise in scrambled Arabic says something about how much the Arabic was cared about, and it says it to precisely the audience that matters.' },

      { kind: 'h', text: 'The fix: let a browser do it' },
      { kind: 'p', text: 'Browsers implement UAX 9 completely, because they have to. So the card stopped being a generated image and became a real page: an HTML route at exactly 1200 by 630, laid out with the same CSS as the rest of the site, screenshotted by headless Chromium at publish time.' },
      { kind: 'code', caption: 'The card is a visitable route, kept out of the index', text: `// app/[lang]/destinations/[slug]/card/page.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};` },
      { kind: 'p', text: 'Keeping it visitable was deliberate. A card you can open in a browser is a card you can check, in every locale, without running the build. The noindex keeps it from competing with the package page it advertises.' },
      { kind: 'p', text: 'The cost is that cards are now static files produced by a script rather than computed per request. A price change reaches every page and not the image. That is a real tradeoff and the admin screen says so at the point where prices are edited, rather than leaving it to be discovered.' },

      { kind: 'h', text: 'Two bugs the fix created' },
      { kind: 'p', text: 'Screenshotting an element seemed obvious: find the card, capture its bounding box. In English this worked. In Arabic it returned a mostly empty image of about 5KB.' },
      { kind: 'p', text: 'In a right-to-left document the layout origin is the right edge. A 1200 pixel card in a narrower viewport sits at a negative x offset relative to the capture box the element API computes, so the capture was of empty canvas beside the card. The fix was to stop capturing the element: pin the card to the viewport origin, size the viewport to the card, and clip that instead.' },
      { kind: 'code', caption: 'Capture a known box rather than trusting a computed one', text: `await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.screenshot({
  clip: { x: 0, y: 0, width: 1200, height: 630 },
  type: 'jpeg',
  quality: 82,
});` },
      { kind: 'p', text: 'The second bug was size. PNG output ran between 700KB and 1MB per card, which looks fine until you learn what WhatsApp does with an oversized preview image. It does not scale it down or degrade it. It shows no image at all.' },
      { kind: 'p', text: 'For a product whose distribution is a link pasted into a family group, that is the entire feature failing silently. JPEG at quality 82 brought all 36 cards to between 62KB and 113KB, comfortably inside the ceiling, with no visible loss on a photograph behind a scrim.' },

      { kind: 'h', text: 'The example above is itself direction-isolated' },
      { kind: 'p', text: 'Showing the two Arabic samples inside an English page has the same problem the essay is about. Dropped into a left-to-right paragraph, the bidi algorithm resolves them against surrounding neutral characters, and the demonstration rearranges itself into something that no longer demonstrates anything.' },
      { kind: 'code', caption: 'Each sample carries its own direction and language', text: `<span dir="rtl" lang="ar">{sample}</span>` },
      { kind: 'p', text: 'Isolating each sample is what keeps the wrong example reliably wrong on your screen. It is a small thing, and it is the same class of care the card needed.' },

      { kind: 'h', text: 'What generalises' },
      { kind: 'list', items: [
        'A rendering pipeline can be correct at one layer and wrong at another. Correct glyphs are not evidence of correct text.',
        'Bugs in a script the team does not read are invisible to review. They need a reader or a test, and everything else is luck.',
        'Verify generated output in the hardest locale first. English passing tells you almost nothing about Arabic; Arabic passing tells you a great deal about English.',
        'When a platform has a hard limit, find out what it does at the limit. A silent nothing is a different failure from a degraded something, and it changes what you build.',
      ] },
      { kind: 'p', text: 'The card was rebuilt because a demonstration site that gets Arabic backwards has argued the opposite of what it set out to argue. That is the only reason it was worth the second approach.' },
    ],

    ar: [
      { kind: 'p', text: 'هذا الموقع يبيع برامج سفر لمسافرين عرب، ورابط البرنامج يُمرَّر إلى مجموعة العائلة قبل أن يُنشر في أي مكان عام بوقت طويل. لذلك فبطاقة المعاينة هي الانطباع الأول أكثر مما هي الصفحة الرئيسية. هي هنا كائن مُصمَّم، لا أثر جانبي.' },
      { kind: 'p', text: 'العربية هي التي تقود التصميم، فكان على البطاقة أن تكون صحيحة بالعربية أولًا. ولم تكن كذلك.' },

      { kind: 'h', text: 'ما الذي فعله المولّد' },
      { kind: 'p', text: 'الأداة البديهية هي next/og، التي تحوّل JSX إلى صورة عبر satori. تتعامل مع اللاتينية جيدًا. وحين أعطيناها نصًا عربيًا خالصًا أخرجت شيئًا يبدو لمن لا يقرأ العربية سليمًا تمامًا: الحروف موصولة، والأشكال صحيحة، والسطر مضبوط داخل البطاقة.' },
      { kind: 'p', text: 'لكن ترتيب الكلمات كان معكوسًا.' },
      { kind: 'sample', label: 'ما كان يجب أن تقوله البطاقة', text: 'سعر تجريبي' },
      { kind: 'sample', label: 'ما أخرجه المولّد', text: 'تجريبي سعر' },
      { kind: 'p', text: 'كلمتان تبادلتا موضعيهما. كل حرف صحيح، وكل وصل صحيح، والمعنى ذهب. هذا نوع من المخرجات يمرّ من المراجعة عند كل من لا يقرأ الخط، وهم أغلب الفرق.' },

      { kind: 'h', text: 'التشكيل ليس الترتيب' },
      { kind: 'p', text: 'سبب صحة الحروف مع خطأ الكلمات أن عرض العربية عملان لا عمل واحد، وتقوم بهما آلتان مختلفتان.' },
      { kind: 'p', text: 'التشكيل يقرر أي رسم يُرسم. فالحرف العربي يتغير شكله بحسب جيرانه، فله صور أولية ووسطية ونهائية ومنفردة، وتتحد الحروف المتجاورة في تراكيب. هذا ما تقوم به HarfBuzz، وتقوم به جيدًا. وsatori تستعملها، ولهذا جاء المثال أعلاه موصولًا على أحسن وجه.' },
      { kind: 'p', text: 'أما الترتيب فيقرر أين يقع كل مقطع على السطر. وذلك هو خوارزمية الاتجاه ثنائي المسار الموصوفة في UAX 9، وهي مرور منفصل على النص. تحلّ مستويات التضمين، وتتعامل مع المحايدات كالمسافات وعلامات الترقيم، وتستخرج الترتيب البصري لمقاطع قد يتغير اتجاهها مرات في فقرة واحدة.' },
      { kind: 'p', text: 'يستطيع المحرك أن يُتقن الأولى ويقارب الثانية. والمقاربة بعكس المقاطع تكفي لأن يبدو خليط اللاتينية والعربية معقولًا في لقطة شاشة، ولا تكفي لأن يكون صحيحًا. وفي نص عربي خالص لا تغييرَ اتجاهٍ فيه يُخفي الخطأ، تنكشف المقاربة.' },
      { kind: 'note', text: 'هذا وصف لما لوحظ، لا قراءة في شفرة أحد: ما اختُبر هو المُخرَج. نص عربي خالص عاد بكلماته معكوسة بينما حروفه مشكّلة تشكيلًا صحيحًا. والتفسير أعلاه هو الآلية التي تُفسّر هذا العَرَض.' },

      { kind: 'h', text: 'لماذا هذا أسوأ من غياب البطاقة' },
      { kind: 'p', text: 'البطاقة التي لا تظهر فجوة، والفجوة يلاحظها أحد. أما البطاقة التي تظهر بثقة وترتيبها معكوس فهي دعوى تُقال بلغة قد لا يقرأها من نشرها، وتُمرَّر إلى مجموعة كل قارئ فيها يقرأها.' },
      { kind: 'p', text: 'وموقف هذا المنتج كله أن السعر المعروض هو السعر المدفوع وأن لا شيء مخفيًا. وتقديم هذا الوعد بعربية مبعثرة يقول شيئًا عن مقدار العناية بالعربية، ويقوله للجمهور الذي يعنينا بالضبط.' },

      { kind: 'h', text: 'الحل: دع المتصفح يفعلها' },
      { kind: 'p', text: 'المتصفحات تنفّذ UAX 9 كاملة لأنها مضطرة. فتوقفت البطاقة عن كونها صورة مولّدة وصارت صفحة حقيقية: مسار HTML بقياس 1200 في 630 بالضبط، مبنيًا بنفس CSS الموقع، تلتقطه نسخة Chromium بلا واجهة وقت النشر.' },
      { kind: 'code', caption: 'البطاقة مسار يمكن زيارته، وهي خارج الفهرسة', text: `// app/[lang]/destinations/[slug]/card/page.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};` },
      { kind: 'p', text: 'وإبقاؤه مسارًا يمكن زيارته كان مقصودًا. البطاقة التي تفتحها في متصفح بطاقة تستطيع فحصها، بكل اللغات، دون تشغيل البناء. وnoindex يمنعها من مزاحمة صفحة البرنامج التي تُعلن عنه.' },
      { kind: 'p', text: 'والثمن أن البطاقات صارت ملفات ثابتة يُنتجها سكربت لا تُحسب مع كل طلب. فتغيير السعر يصل كل صفحة ولا يصل الصورة. هذه مقايضة حقيقية، وشاشة الإدارة تقولها عند تحرير الأسعار بدل أن تُترك لتُكتشف.' },

      { kind: 'h', text: 'خطآن أنتجهما الحل' },
      { kind: 'p', text: 'بدا التقاط العنصر بديهيًا: جد البطاقة، والتقط صندوقها. نجح هذا بالإنجليزية. وبالعربية أعاد صورة شبه فارغة حجمها نحو 5 كيلوبايت.' },
      { kind: 'p', text: 'في مستند من اليمين إلى اليسار يكون أصل التخطيط هو الحافة اليمنى. فبطاقة عرضها 1200 بكسل داخل إطار أضيق تقع عند إزاحة سالبة على المحور الأفقي بالنسبة للصندوق الذي تحسبه واجهة العنصر، فكان الالتقاط لفراغ بجوار البطاقة. والحل أن نكفّ عن التقاط العنصر: نثبّت البطاقة عند أصل الإطار، ونضبط الإطار على قياسها، ونقتطع ذلك.' },
      { kind: 'code', caption: 'التقط صندوقًا معلومًا بدل الوثوق بصندوق محسوب', text: `await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.screenshot({
  clip: { x: 0, y: 0, width: 1200, height: 630 },
  type: 'jpeg',
  quality: 82,
});` },
      { kind: 'p', text: 'والخطأ الثاني كان الحجم. خرجت ملفات PNG بين 700 كيلوبايت وميغابايت للبطاقة الواحدة، وهو ما يبدو مقبولًا حتى تعرف ماذا يفعل واتساب بصورة معاينة أكبر من حدّه. لا يصغّرها ولا يخفض جودتها. لا يعرض صورة إطلاقًا.' },
      { kind: 'p', text: 'ولمنتج توزيعه رابط يُلصق في مجموعة عائلية، فذلك سقوط الميزة كلها في صمت. وبتحويلها إلى JPEG بجودة 82 صارت البطاقات الست والثلاثون بين 62 و113 كيلوبايت، داخل الحدّ بمريح، دون خسارة مرئية على صورة خلف طبقة تعتيم.' },

      { kind: 'h', text: 'المثال أعلاه معزول الاتجاه بنفسه' },
      { kind: 'p', text: 'عرض المثالين العربيين داخل صفحة إنجليزية فيه المشكلة نفسها التي يتحدث عنها هذا النص. فإذا وُضعا في فقرة من اليسار إلى اليمين، حلّت خوارزمية الاتجاه موضعهما بالنسبة للمحايدات حولهما، فيعيد المثال ترتيب نفسه ولا يعود يُثبت شيئًا.' },
      { kind: 'code', caption: 'كل مثال يحمل اتجاهه ولغته', text: `<span dir="rtl" lang="ar">{sample}</span>` },
      { kind: 'p', text: 'وعزل كل مثال باتجاهه هو ما يُبقي المثال الخاطئ خاطئًا على شاشتك بشكل موثوق. أمر صغير، وهو من جنس العناية نفسها التي احتاجتها البطاقة.' },

      { kind: 'h', text: 'ما الذي يُعمَّم' },
      { kind: 'list', items: [
        'قد يكون خط الإنتاج صحيحًا في طبقة وخاطئًا في أخرى. صحة الرسوم ليست دليلًا على صحة النص.',
        'الأخطاء في خط لا يقرأه الفريق أخطاء غير مرئية للمراجعة. تحتاج قارئًا أو اختبارًا، وما عدا ذلك حظ.',
        'افحص المخرجات المولّدة في أصعب لغة أولًا. نجاح الإنجليزية لا يكاد يخبرك شيئًا عن العربية، ونجاح العربية يخبرك الكثير عن الإنجليزية.',
        'حين يكون للمنصة حدّ صارم، اعرف ماذا تفعل عنده. الصمت التام سقوط مختلف عن التدهور الجزئي، وهو يغيّر ما تبنيه.',
      ] },
      { kind: 'p', text: 'أُعيد بناء البطاقة لأن موقع عرض يقلب العربية يكون قد جادل عكس ما قام ليجادل به. وهذا وحده ما جعل الطريق الثاني يستحق.' },
    ],
  },
};

export const PIECES: Piece[] = [arabicShareCards];

export const findPiece = (id: string): Piece | undefined => PIECES.find((p) => p.id === id);

/** Index copy, in every shell locale. */
export const BUILD_SHELL: Record<string, { title: string; lede: string; note: string; readIn: string; unavailable: string; dated: string }> = {
  en: {
    title: 'How this was built',
    lede: 'Working notes from building this site. Written for people who build things, and kept off the traveller\'s path.',
    note: 'This site is a demonstration with an invented catalogue. The engineering is not invented: everything described here was built, and the problems described were hit.',
    readIn: 'Read in',
    unavailable: 'This piece is not written in your language yet. It is shown in English.',
    dated: 'Written',
  },
  ar: {
    title: 'كيف بُني هذا',
    lede: 'ملاحظات عمل من بناء هذا الموقع. كُتبت لمن يبنون، وأُبقيت خارج طريق المسافر.',
    note: 'هذا الموقع عرض توضيحي بكتالوج من وضعنا. أما الهندسة فليست كذلك: كل ما يُوصف هنا بُني فعلًا، والمشكلات الموصوفة وقعت فعلًا.',
    readIn: 'اقرأه بـ',
    unavailable: 'هذه المادة لم تُكتب بلغتك بعد، وهي معروضة بالإنجليزية.',
    dated: 'كُتب في',
  },
  fr: {
    title: 'Comment ceci a été construit',
    lede: 'Notes de travail issues de la construction de ce site. Écrites pour celles et ceux qui construisent, et tenues à l\'écart du parcours du voyageur.',
    note: "Ce site est une démonstration au catalogue inventé. L'ingénierie, elle, ne l'est pas : tout ce qui est décrit ici a été construit, et les problèmes décrits ont bien été rencontrés.",
    readIn: 'Lire en',
    unavailable: "Cette page n'est pas encore écrite dans votre langue. Elle est affichée en anglais.",
    dated: 'Écrit le',
  },
};
