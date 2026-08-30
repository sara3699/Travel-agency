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
  | { kind: 'list'; items: string[] }
  /** Mounts a live component. The point of this layer is evidence that reads
   *  the running system rather than a description of it, so a piece can embed
   *  something that computes rather than something that was typed. */
  | { kind: 'live'; id: 'tokens' | 'motion' | 'a11y' | 'perf' };

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

const designSystem: Piece = {
  id: 'design-system',
  written: ['en'],
  date: '2026-08-29',
  title: {
    en: 'A palette that reads itself',
  },
  dek: {
    en: 'The colours below are resolved from the running stylesheet and their contrast is computed in your browser. Building this page found a token with 44 references and no definition.',
  },
  body: {
    en: [
      { kind: 'p', text: 'Every design system page eventually lies. Someone types the hex values into a document, the stylesheet moves, and the document keeps saying what used to be true. The lie is comfortable because nobody checks a page whose whole job is to be checked.' },
      { kind: 'p', text: 'So this one resolves each token against the live cascade and computes its contrast in the browser you are reading it in. It cannot claim a colour the site does not use, and a token with no definition is reported missing rather than quietly falling back.' },

      { kind: 'live', id: 'tokens' },

      { kind: 'h', text: 'What building it found' },
      { kind: 'p', text: 'The table was written before the palette was checked, which turned out to be the useful order. On first render one row came back with no value: --sc-ink-mute, the quiet third tier used for dates, captions, table headers and hints, had 44 references across the stylesheet and no definition anywhere.' },
      { kind: 'p', text: 'It had never looked broken. Every reference was written defensively as var(--sc-ink-mute, var(--sc-ink)), so all 44 fell through to full ink. Text meant to recede was rendering at the same weight as body copy, and in a few places brighter than it, because body copy on those pages is ink-soft.' },
      { kind: 'code', caption: 'The measured difference on a legal page, before and after', text: `.legal__updated   rgb(246, 236, 220)  ->  rgb(140, 127, 108)
.legal__log time  rgb(246, 236, 220)  ->  rgb(140, 127, 108)
.legal__block p   rgb(172, 156, 134)  (unchanged, ink-soft)` },
      { kind: 'p', text: 'A fallback is the right defensive habit and it is also what hid this for weeks. The fallback made every use survive, so nothing ever failed loudly enough to investigate. The hierarchy was simply flatter than the CSS said it was.' },

      { kind: 'h', text: 'Choosing the value by measurement' },
      { kind: 'p', text: 'The replacement was not picked by eye. The two tiers above it sit at 17.00:1 and 7.44:1 against the canvas, so the third had to be visibly quieter than 7.44 while still clearing 4.5:1, which is where WCAG AA puts body text. This token is used at 0.72rem to 0.85rem, so it is small text and the large-text allowance of 3:1 does not apply to it.' },
      { kind: 'code', caption: 'Candidates, mixed from ink-soft toward the canvas', text: `85%  #948673   5.60:1   AA body
80%  #8c7f6c   5.08:1   AA body      <- chosen
75%  #847766   4.56:1   AA body, thin margin
70%  #7c7060   4.11:1   large text only` },
      { kind: 'p', text: 'It is a literal hex rather than a color-mix, so the ratio is the number that was measured rather than whatever an interpolation space produces. The hairline tokens next to it do use color-mix, because a hairline is not text and does not have to clear a threshold.' },

      { kind: 'h', text: 'Why this belongs on the site rather than in a wiki' },
      { kind: 'p', text: 'A page that computes cannot go stale, and it stays honest under change: swap a token tomorrow and this table tells you what that did to contrast before anyone has to notice on a phone in daylight. It is also the cheapest possible regression test for a class of bug that has no stack trace.' },
      { kind: 'p', text: 'The type scale, the motion contract and the accessibility statement belong here on the same argument, and are not written yet.' },
    ],
  },
};

const motionContract: Piece = {
  id: 'motion',
  written: ['en'],
  date: '2026-08-30',
  title: { en: 'What moves, and what turns it off' },
  dek: {
    en: 'A motion contract is only worth reading if you can check it. This one shows the live state of the three things that decide whether anything moves, and is honest about the parts the control does not reach.',
  },
  body: {
    en: [
      { kind: 'p', text: 'Roughly half of all sites declare prefers-reduced-motion and almost none expose a control for it. That strands the person whose device preference is right for them in general and wrong for the room they are in: somebody on a bus with motion sickness cannot change an operating system setting for one page.' },
      { kind: 'p', text: 'So there is a control in the footer, and it has three states rather than two. An explicit choice has to beat the device preference in both directions, because a person whose device says reduce may want the full thing here, and a checkbox cannot express that.' },

      { kind: 'live', id: 'motion' },

      { kind: 'h', text: 'Reduce does not mean none' },
      { kind: 'p', text: 'Setting animation to none strips out the spatial relationship an entrance or a transition exists to communicate, which leaves the reduced-motion reader with a worse mental model than everyone else rather than a calmer one. The rule here is that reduced motion gets the end state immediately, not a stripped-out one.' },
      { kind: 'code', caption: 'The entrance component, which shows the destination rather than nothing', text: `useEffect(() => {
  if (prefersReducedMotion()) return setShown(true);
  // ...otherwise observe and animate in
}, []);` },
      { kind: 'p', text: 'The same reasoning applies to the jump between legs of the scroll world: it moves instantly rather than smoothly, and it still moves, so the reader keeps the sense of having travelled somewhere.' },

      { kind: 'h', text: 'What the control actually reaches' },
      { kind: 'p', text: 'This is the part most motion contracts leave out, and it is the only part worth publishing. Counted from the stylesheet on 2026-08-30: thirteen transition declarations, one animation, one set of keyframes.' },
      { kind: 'p', text: 'The reduced branch covers three of them, written twice so it applies both through the media query and through the explicit control. Everything it covers was chosen because it is the motion a person notices: a glass panel animating in, and two hover transforms that lift a card under the pointer.' },
      { kind: 'p', text: 'It does not cover the other transitions, and it does not need to. They are short colour and opacity changes on focus and hover, and a colour change is not vestibular motion. Naming that distinction is the difference between a contract and a list.' },
      { kind: 'note', text: 'Smooth scrolling is off globally by a deliberate choice, not by the reduced-motion branch: `html { scroll-behavior: auto }`. Per-call behaviour is chosen at the point a reader clicks something, which is a scoped decision they made rather than one imposed on every anchor on the page.' },

      { kind: 'h', text: 'What it does not reach, stated plainly' },
      { kind: 'p', text: 'The scroll-driven world on the home page is rendered by a vendored engine loaded on demand. Whether that engine consults the preference has not been verified here, and until it has, this page will not claim it does. That is the largest piece of motion on the site and the honest status of it is unknown.' },
      { kind: 'p', text: 'Two hooks written for this, useReducedMotion and useScrollProgress, currently have no importers. They are correct and they are dead, which is worth knowing before someone reads the codebase and assumes the coverage is wider than it is.' },
      { kind: 'p', text: 'And the reduced-motion branch has never been tested by anyone whose device actually requests it. Every check so far has been made by setting the control by hand, which exercises the same code path and is not the same evidence.' },

      { kind: 'h', text: 'Why publish the gaps' },
      { kind: 'p', text: 'Because a motion contract that lists only what works is marketing, and because the gaps are the useful part for anyone building the same thing. The parts that hold are cheap to copy. The parts that do not are where the work is.' },
    ],
  },
};

const accessibility: Piece = {
  id: 'accessibility',
  written: ['en', 'ar'],
  date: '2026-08-30',
  title: {
    en: 'Accessibility: what has been checked, and what has not',
    ar: 'إتاحة الوصول: ما جرى فحصه وما لم يُفحص',
  },
  dek: {
    en: 'A dated statement of where this site stands against WCAG 2.2 Level AA, separating what was measured from what was assumed. The checks below run in your browser, on this page, now.',
    ar: 'بيان مؤرَّخ لموقع هذا الموقع من WCAG 2.2 المستوى AA، يفصل ما قيس عمّا افتُرض. الفحوص أدناه تعمل في متصفحك، على هذه الصفحة، الآن.',
  },
  body: {
    en: [
      { kind: 'p', text: 'The target is WCAG 2.2 Level AA. This is a statement of position rather than a claim of conformance, because a conformance claim you cannot check is worth nothing and most of them cannot be checked.' },

      { kind: 'live', id: 'a11y' },

      { kind: 'h', text: 'Measured' },
      { kind: 'list', items: [
        'Colour contrast. Every text-on-background pair in the palette is computed live and every one clears 4.5:1. The quietest tier sits at 5.08:1 and the call to action reads 9.51:1 on its own button. See the design system page, which computes them in front of you.',
        'Direction and language. Both are server-rendered on the document, so a right-to-left page never paints left-to-right first and snaps. Layout uses logical properties throughout, enforced by a lint across 85 files, so nothing is positioned by a hardcoded left or right.',
        'Reduced motion. Honoured, with a visible three-state control rather than only the device preference, and reduced means the end state rather than nothing.',
        'Arabic type. No letter-spacing and no opacity on Arabic text, both of which break letterforms in a connected script.',
      ] },

      { kind: 'h', text: 'Not measured' },
      { kind: 'p', text: 'These are the parts a statement usually implies without saying. None has been tested here.' },
      { kind: 'list', items: [
        'Screen readers. Nothing on this site has been through NVDA, JAWS or VoiceOver. The markup is semantic and that is an argument, not evidence.',
        'Keyboard navigation end to end. Individual controls take focus, and no one has driven the whole enquiry flow without a pointer.',
        'Focus visibility against the sticky elements, which is where WCAG 2.2 criterion 2.4.11 usually fails.',
        'The scroll-driven home page, which is the least conventional thing here and therefore the most likely to be the worst.',
        'Real assistive technology in Arabic, where support is thinner and the bugs are different.',
      ] },

      { kind: 'h', text: 'Known and unresolved' },
      { kind: 'p', text: 'The scroll-driven world on the home page has no tested alternative path. A reader who cannot use it can reach every trip through the destinations listing, which is an ordinary document, but that route has not been verified as equivalent and should not be assumed to be.' },

      { kind: 'h', text: 'If something here excludes you' },
      { kind: 'p', text: 'Say so through the enquiry form and it will be read by a person. A specimen site cannot promise a remediation timeline honestly, and it can promise that a report will not disappear into a queue nobody empties.' },
      { kind: 'note', text: 'Dated 2026-08-30. An accessibility statement without a date is a claim about a site that may no longer exist. When this one stops matching the site, it is wrong, and it is more useful wrong and dated than vague and undated.' },
    ],
    ar: [
      { kind: 'p', text: 'الهدف هو WCAG 2.2 المستوى AA. وهذا بيان موقف لا ادعاء مطابقة، لأن ادعاء المطابقة الذي لا تستطيع التحقق منه لا قيمة له، ومعظمها لا يمكن التحقق منه.' },

      { kind: 'live', id: 'a11y' },

      { kind: 'h', text: 'ما جرى قياسه' },
      { kind: 'list', items: [
        'تباين الألوان. كل زوج من نص وخلفية في اللوحة يُحسب حيًّا، وكلها تتجاوز 4.5:1. أخفت الطبقات عند 5.08:1، ونص زر الإجراء عند 9.51:1 على زره. انظر صفحة نظام التصميم، فهي تحسبها أمامك.',
        'الاتجاه واللغة. كلاهما يُرسَل من الخادم في وسم المستند، فلا تُرسم صفحة من اليمين إلى اليسار بالاتجاه المعاكس أولًا ثم تقفز. التخطيط يستعمل الخصائص المنطقية بالكامل، ويفرض ذلك فاحص آلي على 85 ملفًا، فلا شيء يُوضع بيمين أو يسار مثبّتين.',
        'تقليل الحركة. مُحترَم، مع أداة تحكم ظاهرة بثلاث حالات لا بتفضيل الجهاز وحده، والتقليل يعني الوصول إلى الحالة النهائية لا إلغاءها.',
        'الخط العربي. لا تباعد بين الحروف ولا شفافية على النص العربي، وكلاهما يكسر أشكال الحروف في خط متصل.',
      ] },

      { kind: 'h', text: 'ما لم يُقَس' },
      { kind: 'p', text: 'هذه هي الأجزاء التي يلمّح إليها أي بيان عادةً دون أن يقولها. لم يُختبر منها شيء هنا.' },
      { kind: 'list', items: [
        'قارئات الشاشة. لم يمر شيء من هذا الموقع على NVDA أو JAWS أو VoiceOver. البنية الدلالية سليمة، وهذه حجة لا دليل.',
        'التنقل بلوحة المفاتيح من أوله إلى آخره. عناصر التحكم المفردة تستقبل التركيز، ولم يقُد أحد مسار الاستفسار كاملًا دون مؤشر.',
        'وضوح التركيز أمام العناصر الثابتة، وهو الموضع الذي يسقط فيه المعيار 2.4.11 من WCAG 2.2 عادةً.',
        'الصفحة الرئيسية المدفوعة بالتمرير، وهي أقل ما هنا تقليدية وبالتالي أرجح ما يكون أسوأه.',
        'تقنيات مساعدة حقيقية بالعربية، حيث الدعم أرقّ والأخطاء مختلفة.',
      ] },

      { kind: 'h', text: 'معروف ولم يُحلّ' },
      { kind: 'p', text: 'العالم المدفوع بالتمرير في الصفحة الرئيسية ليس له مسار بديل مُختبَر. من لا يستطيع استعماله يصل إلى كل رحلة عبر صفحة الوجهات، وهي مستند عادي، لكن تكافؤ هذا المسار لم يُتحقق منه ولا ينبغي افتراضه.' },

      { kind: 'h', text: 'إن كان شيء هنا يستبعدك' },
      { kind: 'p', text: 'قل ذلك عبر نموذج الاستفسار، وسيقرأه إنسان. موقع عرض لا يستطيع أن يعد بجدول زمني للإصلاح بصدق، ويستطيع أن يعد بألّا يضيع البلاغ في طابور لا يفرغه أحد.' },
      { kind: 'note', text: 'مؤرَّخ في 2026-08-30. بيان إتاحة بلا تاريخ هو ادعاء عن موقع قد لا يكون موجودًا الآن. وحين يكفّ هذا البيان عن مطابقة الموقع يصير خاطئًا، وهو خاطئًا ومؤرَّخًا أنفع منه غامضًا بلا تاريخ.' },
    ],
  },
};

const performanceBudget: Piece = {
  id: 'performance',
  written: ['en'],
  date: '2026-08-30',
  title: { en: 'A budget, and the field data that does not exist' },
  dek: {
    en: 'The budget is real and enforced by nothing. The measurements below are real and are one load on one device. Saying which is which is most of the work.',
  },
  body: {
    en: [
      { kind: 'p', text: 'Performance is a differentiator in this category because almost nobody is fast. Under half of mobile origins pass Core Web Vitals, and being genuinely quick on a photography-led site is rare enough to read as a brand attribute rather than an engineering one.' },
      { kind: 'p', text: 'The regional picture inverts the usual assumption. Gulf bandwidth is world-leading, so bytes are not the binding constraint in Riyadh or Dubai. Latency, round trips and main-thread work are. Over-correcting is its own mistake: Egypt\'s networks are weaker, roughly a third of Gulf traffic is desktop, and object count predicts bandwidth sensitivity even on a fast connection.' },

      { kind: 'live', id: 'perf' },

      { kind: 'h', text: 'Why the right-hand column is not a p75' },
      { kind: 'p', text: 'Every threshold in the middle column is defined at the 75th percentile of real visits. The right-hand column is one load, on your device, on your network, from a machine that is probably serving this from localhost. Those are different kinds of number and putting them in the same table is only honest if the difference is stated where someone reading quickly will see it.' },
      { kind: 'p', text: 'A lab measurement tells you whether something is plausibly within budget. Only field data tells you whether it is, for the people who actually arrive, on the devices they actually hold, on the third bar of signal in a car park.' },
      { kind: 'note', text: 'There is no field data for this site and none is invented here. PRODUCT.md lists traffic and field performance data among the things that do not exist, alongside contracted inventory and customer reviews, and the rule for all of them is the same: absent rather than filled in.' },

      { kind: 'h', text: 'The architectural risk, which is not a UI decision' },
      { kind: 'p', text: 'The largest performance constraint on this project is geography and it cannot be optimised away in a component. Vercel has a Dubai region. The database provider has no Middle East region at all, and the round trip from Dubai to Frankfurt runs about four times the trip to Mumbai.' },
      { kind: 'p', text: 'Four sequential queries against a Frankfurt Postgres spends a large fraction of an LCP budget before a single byte ships. That has two consequences that are already built in: queries avoid sequential round trips, and the destination and package pages are statically generated rather than rendered per request. It also has a legal consequence, which is why the privacy notice names where enquiries are held instead of leaving it to be discovered.' },

      { kind: 'h', text: 'What is missing, and it is the enforcement' },
      { kind: 'p', text: 'The budget says to enforce these in CI, on the grounds that a budget nobody fails is a wish. There is no CI in this repository at all: no workflow file, no check on a pull request, nothing that fails when a page gets heavier.' },
      { kind: 'p', text: 'That is the honest status of the budget. The numbers are agreed, the architecture respects the expensive one, and nothing stops the next commit from quietly breaking any of it. Two other rules are in the same position, including the gate that is supposed to fail the build if a review or a rating ever appears on a specimen catalogue.' },
      { kind: 'p', text: 'Naming that is more useful than a green dashboard, because it tells you what to build next rather than what to feel good about.' },
    ],
  },
};

export const PIECES: Piece[] = [designSystem, motionContract, performanceBudget, accessibility, arabicShareCards];

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
