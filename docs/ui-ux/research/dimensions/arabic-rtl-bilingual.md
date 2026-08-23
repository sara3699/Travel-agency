# Arabic, RTL, and bilingual UX

Dimension `arabic-rtl-bilingual` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Most "Arabic versions" of travel sites are an English site with `direction: rtl` bolted on and a translated string file, and it is visibly broken to a native reader: clipped descenders, letter-spaced Arabic, month names from the wrong region, and a flag standing in for a language spoken across 22 states.

The differentiated position is to treat Arabic as the primary design constraint. Three things make that defensible, and I re-measured all of them independently on an identical toolchain (Node 24.14.1, ICU 78.2, Unicode 17.0, CLDR 48.0; fontTools 4.63.0 against live gstatic woff2).

First, the layout must be direction-agnostic: logical properties only, `dir` on `<html>` (W3C: "Do not use CSS to apply base direction in HTML pages"), and `:dir()`-based variants — which Tailwind v4.3 already emits as `&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)`. Full logical-property support is Chrome/Edge 89, Firefox 66, Safari 15. RTLCSS's source is the audit list of what physically breaks, and `:dir()` deliberately ignores CSS-set direction, which is itself the argument for markup.

Second, Arabic typography must be sized from measured metrics. Arabic ink extents run 1.39–2.76em against Latin's 1.20–1.43em; Almarai, Alexandria and Readex Pro ship default line boxes smaller than their own ink. In IBM Plex Sans Arabic the baseline letter ه is 0.411em against the family's own Latin x-height of 0.516em — 20% shorter — with descenders 2.2× deeper. That shortfall is family-specific (Cairo shows none), and `font-size-adjust` cannot fix it: none of its five metrics is Arabic-aware.

Third, locale data is not decoration. CLDR says Saudi Arabia's weekend is Friday–Saturday and the UAE's Saturday–Sunday; that Levantine Arabic uses كانون الثاني where Gulf Arabic uses يناير, with two further Maghreb systems; that ar-AE defaults to Latin digits and ar-EG to Arabic-Indic; that Arabic has six plural forms to English's two; and that ICU injects invisible RLM and NBSP into every formatted Arabic price. Hijri needs explicit request — ar-SA defaults to `gregory`, and one instant yields three different Hijri dates across calendar variants.

## Summary as first written, before verification

Most "Arabic versions" of travel sites are an English site with `direction: rtl` bolted on and a Google-translated string file. That is the generic default, and it is visibly broken to a native reader: clipped descenders, letter-spaced Arabic, Latin digits inside Arabic-Indic contexts, month names from the wrong region, prices whose currency symbol jumps to the wrong end, and a flag icon standing in for a language spoken across 22 states.

The differentiated position is the opposite: treat Arabic as the *primary* design constraint and let English inherit from it. Three things make that concrete and defensible. First, the layout must be direction-agnostic at the CSS level — logical properties only, `dir` on `<html>`, `:dir()`-based variants — so RTL is not a second stylesheet to maintain but the same one read in mirror. Second, Arabic typography must be sized and led from measured font metrics, not from Latin habits: I measured Arabic ink extents of 1.39–2.17em against Latin's 1.20–1.43em, and an Arabic baseline letterform (ه) 20% shorter than the same family's Latin x-height. Third — and this is where nearly every competitor fails — locale data is not decoration. ICU/CLDR says Saudi Arabia's weekend is Friday–Saturday while the UAE's is Saturday–Sunday, that Levantine Arabic uses كانون الثاني where Gulf Arabic uses يناير, that ar-AE defaults to Western digits while ar-EG defaults to Arabic-Indic, and that Arabic has six plural forms to English's two. A travel-package site that gets weekends, Hijri dates and plurals right is doing something no template does.

## Findings

### Physical CSS properties (margin-left, padding-right, top/left, border-top-left-radius, text-align: left) do not adapt to direction; logical properties (margin-inline-start, padding-block, inset-inline-start, border-start-start-radius, text-align: start) map onto the inline/block axes and flip automatically when `direction: rtl` applies. MDN explicitly warns against mixing physical and logical properties on the same element. float/clear/text-align/resize/caption-side have no logical *property* but accept flow-relative *values* (inline-start, start, block-start).

Confidence: verified · type: principle

Why it matters here: A package-card grid, price rail, badge overlay, or carousel arrow built with left/right will silently break in Arabic, and the team will 'fix' it with a second RTL stylesheet — doubling maintenance forever. Writing logical from line one means the Arabic site is the same code, not a fork.

Evidence: MDN, CSS logical properties and values reference — full physical→logical mapping table plus the explicit 'avoid mixing' guidance; Baseline support Chrome 69+/Firefox 68+/Safari 12.1+. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values (fetched 2026-08-22)

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

### The definitive audit list of what physically breaks in RTL can be read straight out of RTLCSS's source. It flips: `direction`; any property whose name contains left or right; the 4-value shorthands `margin`/`padding`/`border-color`/`border-style`/`border-width`; `border-radius`; every `*shadow` (box-shadow, text-shadow); `transform-origin` and `perspective-origin`; `transform` (excluding text-transform); `transition` / `transition-property`; `background` and `object` `-position` / `-position-x` / `-image`; `float`, `clear`, `text-align`, `justify-content` / `justify-items` / `justify-self`; `cursor` (e-resize ↔ w-resize); and CSS custom properties matching /^--/.

Confidence: verified · type: pattern

Why it matters here: This is a directly usable lint checklist for the master doc. Shadows and transforms are the two that logical properties do NOT solve — a card with `box-shadow: 8px 8px` or a hover `translateX(6px)` on a 'view package' arrow will point the wrong way in Arabic even in a perfectly logical layout.

Evidence: RTLCSS plugin source, master branch, lib/plugin.js — property expressions at lines 198–524 (/^--/, /direction/, /left/, /right/, /^(margin|padding|border-(color|style|width))$/, /border-radius/, /shadow/, /(?:transform|perspective)-origin/, /^(?!text-).*?transform$/, /transition(-property)?$/, /(background|object)(-position(-x)?|-image)?$/, /float|clear|text-align|justify-(content|items|self)/, /cursor/). https://raw.githubusercontent.com/MohammadYounes/rtlcss/master/lib/plugin.js (read 2026-08-22)

Source: https://raw.githubusercontent.com/MohammadYounes/rtlcss/master/lib/plugin.js

### Base direction belongs in markup, not CSS. W3C: 'Do not use CSS to apply base direction in HTML pages' — direction is semantic, and the page must still read correctly if CSS fails. Set `dir="rtl"` on `<html>`; use `dir` on a block element only to *change* base direction. The `:dir()` pseudo-class matches the user-agent-computed direction (including inherited and `dir="auto"`-resolved values), which `[dir="rtl"]` attribute selectors cannot do; `:dir()` reached Baseline widely available in December 2023. Tailwind CSS v4.3's `rtl:` / `ltr:` variants compile to `&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)`, covering both mechanisms.

Confidence: verified · type: principle

Why it matters here: Fixes the single most common architecture mistake — toggling a CSS class instead of the dir attribute, which leaves screen readers, form controls, and the bidi algorithm in the wrong mode even though the page looks flipped. Also tells the build exactly which selector strategy to standardise on with the likely Tailwind stack.

Evidence: W3C i18n, 'Structural markup and right-to-left text in HTML' https://www.w3.org/International/questions/qa-html-dir ; MDN :dir() (Baseline widely available since December 2023) https://developer.mozilla.org/en-US/docs/Web/CSS/:dir ; Tailwind CSS v4.3 docs, hover-focus-and-other-states, RTL support section https://tailwindcss.com/docs/hover-focus-and-other-states (all fetched 2026-08-22)

Source: https://www.w3.org/International/questions/qa-html-dir

### The Unicode bidi algorithm breaks specifically when an opposite-direction run 'begins or ends with neutral characters, begins with a number, is followed by a number, is followed by another logically separate opposite-direction phrase, [or] contains nested phrases with opposite base direction.' The fix is isolation: `<bdi>` (equivalent to `unicode-bidi: isolate`, and defaulting to `dir="auto"`), or `dir` on a wrapping element, or the invisible isolate characters U+2066 LRI / U+2067 RLI / U+2068 FSI closed by U+2069 PDI where markup is impossible (title attributes, meta tags, og: values). The older embedding characters U+202A/U+202B/U+202C should be avoided because they do not isolate. MDN's canonical failure: an Arabic name followed by ' - 1st place' renders as '1 - <name>st place'.

Confidence: verified · type: principle

Why it matters here: Every high-risk string on a package site is exactly this shape: 'دبي - 4 نجوم - 1,999 AED', a phone number '+971 4 123 4567' inside Arabic support copy, a hotel name in Latin inside an Arabic itinerary, a review author name from user input, a flight code 'EK 205'. Without isolation these reorder visibly and the site looks amateur to the exact audience it is courting.

Evidence: W3C i18n, 'Inline markup and bidirectional text in HTML' https://www.w3.org/International/articles/inline-bidi-markup/ ; MDN <bdi> element, Baseline widely available since January 2020 https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi ; MDN unicode-bidi (Baseline since July 2015; MDN warns authors should not override it directly, preferring semantic markup) https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi (fetched 2026-08-22)

Source: https://www.w3.org/International/articles/inline-bidi-markup/

### ICU/CLDR itself injects invisible bidi control characters into formatted Arabic values. I ran `new Intl.NumberFormat('ar-AE',{style:'currency',currency:'AED'}).format(4999)` on Node with ICU 78.2 / Unicode 17.0 and got the code point sequence U+200F 4 , 9 9 9 . 0 0 U+00A0 د . إ . U+200F — i.e. the whole string is wrapped in RIGHT-TO-LEFT MARK and uses a NO-BREAK SPACE. `ar-EG` returns U+200F ٤٬٩٩٩٫٠٠ ج.م. U+200F, using U+066C ARABIC THOUSANDS SEPARATOR and U+066B ARABIC DECIMAL SEPARATOR. `Intl.DateTimeFormat('ar-EG')` returns ٢٢ U+200F / ٨ U+200F / ٢٠٢٦ with RLMs between the parts.

Confidence: verified · type: data

Why it matters here: Two direct build rules. (1) Never hand-build a price as `${amount} ${currency}` — let Intl produce it, and never `.trim()`, slugify, or regex-strip the result, because you will destroy the RLMs and the currency symbol will jump to the wrong side. (2) Never parse a displayed Arabic price back to a number with `.replace(/,/g,'')` — ar-EG uses U+066C/U+066B, not ASCII comma/period. This is the kind of detail that separates a real Arabic build from a translated one.

Evidence: Measured directly by the author on 2026-08-22 with Node.js Intl, process.versions.icu = 78.2, process.versions.unicode = 17.0. Mechanism documented at MDN Intl.DateTimeFormat (Unicode extension keys -u-ca- and -u-nu-) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

### Digit expectation is regional, not pan-Arabic, and CLDR encodes it. Measured defaults (ICU 78.2): numberingSystem = `arab` (Arabic-Indic ٠١٢٣) for ar-SA, ar-EG, ar-LB, ar-JO, ar-KW, ar-QA; numberingSystem = `latn` (0123) for ar-AE, ar-MA, ar-TN, ar-DZ, and for bare `ar`. The Maghreb locales additionally use European separator conventions: ar-MA/ar-TN/ar-DZ format 12345.6 as `12.345,6` (period groups, comma decimal), while ar-EG uses `١٢٬٣٤٥٫٦` and ar-AE uses `12,345.6`. W3C ALReq maps the same split: European numerals in Morocco/Algeria, Arabic-Indic in Egypt/Saudi/Iraq.

Confidence: verified · type: data

Why it matters here: A Middle East travel site serving Gulf + Levant + North Africa cannot pick one digit system. But the honest UX call for *prices and dates on a booking flow* is that Western digits are near-universally readable across all Arabic markets while Arabic-Indic digits are not readable to everyone — so digits are a place to override CLDR deliberately rather than follow it blindly, and to say so in the doc rather than leave it to whichever dev writes the first price component.

Evidence: Measured by the author 2026-08-22, Node Intl with ICU 78.2 (`new Intl.DateTimeFormat(locale).resolvedOptions().numberingSystem` and Intl.NumberFormat output per locale). Corroborated by W3C Arabic Layout Requirements, Group Draft Note 02 October 2025, numeral-systems-by-region section. https://www.w3.org/TR/alreq/

Source: https://www.w3.org/TR/alreq/

### Arabic month names differ by region and CLDR reflects it. Measured with Intl.DateTimeFormat({month:'long'}): `ar`, `ar-EG` and `ar-SA` return يناير / فبراير / مارس / أبريل …, while `ar-LB` (Levant) returns كانون الثاني / شباط / آذار / نيسان / أيار / حزيران / تموز / آب / أيلول / تشرين الأول / تشرين الثاني / كانون الأول.

Confidence: verified · type: data

Why it matters here: A hardcoded Arabic month array — which is what almost every hand-rolled date picker on a regional travel site contains — will read as foreign to either Gulf or Levantine travellers. Since departure month is the single most-used filter on a package site, this is a first-impression credibility hit, and formatting through Intl with a resolved locale fixes it for free.

Evidence: Measured by the author 2026-08-22, Node Intl, ICU 78.2 / CLDR. Reproducible: `[...Array(12)].map((_,i)=>new Intl.DateTimeFormat('ar-LB',{month:'long'}).format(new Date(2026,i,1)))`.

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

### Arabic has six plural categories where English has two. Measured `Intl.PluralRules('ar').select(n)`: 0 → zero, 1 → one, 2 → two, 3 → few, 11 → many, 100 → other. English returns `one` for 1 and `other` for everything else.

Confidence: verified · type: data

Why it matters here: Every count string on a package site — 'N nights', 'N travellers', 'N seats left', 'N reviews', 'N days until departure', 'N people viewing' — needs six Arabic forms. A `${n} ليالي` template is grammatically wrong for most values of n. This is a hard argument for ICU MessageFormat (next-intl handles it natively) over a flat key/value dictionary, and it must be decided before the first string file is written.

Evidence: Measured by the author 2026-08-22, Node Intl.PluralRules, ICU 78.2 / CLDR plural rules for Arabic.

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules

### The working week and weekend differ between Gulf markets and CLDR encodes it. Measured `new Intl.Locale(tag).getWeekInfo()` (ISO day numbering, 1=Monday…7=Sunday): ar-SA → firstDay 7 (Sunday), weekend [5,6] = Friday & Saturday. ar-AE → firstDay 1 (Monday), weekend [6,7] = Saturday & Sunday. en-US → firstDay 7, weekend [6,7].

Confidence: verified · type: data

Why it matters here: This is the highest-leverage insight in this dimension for a *travel package* site specifically. 'Weekend getaway', 'long weekend', 'Thursday night departure' and the shaded weekend columns in a date picker mean different days in Riyadh than in Dubai. A calendar that shades Sat/Sun for a Saudi user is instantly, visibly wrong — and a site that correctly shades Fri/Sat and surfaces 'إجازة نهاية الأسبوع' packages for the right days is doing something no international OTA template does.

Evidence: Measured by the author 2026-08-22, Node Intl.Locale.prototype.getWeekInfo(), ICU 78.2 / CLDR supplemental week data.

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo

### Hijri is available natively via the Unicode `-u-ca-` extension, and the variants genuinely disagree. For one and the same instant I got: islamic-umalqura → ٩ ربيع الأول ١٤٤٨; islamic-tbla → ٩ ربيع الأول ١٤٤٨; islamic-civil → ٧ ربيع الأول ١٤٤٨ (two days earlier); islamic → ٩ ربيع الأول ١٤٤٨ under a different arithmetic. `Intl.supportedValuesOf('calendar')` includes islamic-umalqura. Notably, in ICU 78.2 the *default* calendar for ar-SA resolves to `gregory`, not to a Hijri calendar.

Confidence: verified · type: data

Why it matters here: Umm al-Qura is the civil calendar of Saudi Arabia, so `islamic-umalqura` is the correct variant to pin — picking `islamic-civil` by accident ships dates that are two days off. And because ICU defaults ar-SA to Gregorian, Hijri is an intentional product decision, not something you inherit. Dual display (Gregorian primary + Hijri secondary) is the safe pattern for a booking flow, where a wrong departure date is a refund.

Evidence: Measured by the author 2026-08-22, Node Intl.DateTimeFormat with 'ar-SA-u-ca-islamic-umalqura' / '-islamic-civil' / '-islamic-tbla' / '-islamic', ICU 78.2. Calendar option and Unicode extension key `ca` documented at MDN. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

### Arabic occupies far more vertical ink than Latin at the same nominal size, and I measured it from the shipped webfont binaries. Ink extent = (OS/2 usWinAscent + usWinDescent) / unitsPerEm: Noto Sans Arabic 2.169em, Noto Kufi Arabic 2.157em, Cairo 1.883em, Readex Pro 1.755em, Alexandria 1.732em, IBM Plex Sans Arabic 1.729em, Almarai 1.561em, Rubik 1.532em, Tajawal 1.391em — against Latin references Inter 1.430em and Roboto 1.200em. Worse, several Arabic faces ship a default line box *smaller than their own ink*: Almarai's hhea metrics give `line-height: normal` = 1.116em against 1.561em of ink; Alexandria 1.219em vs 1.732em; Readex Pro 1.250em vs 1.755em. All the families measured set USE_TYPO_METRICS, so browsers use those sTypo values.

Confidence: verified · type: data

Why it matters here: This replaces 'Arabic needs more line-height' with a number the build can enforce: the minimum body line-height for a given Arabic face is its measured ink extent. Cairo body copy at line-height 1.5 clips roughly 0.38em of ink per line — visible as shaved descenders on ج/ي/م and lost diacritics. Set Cairo ≥1.9, Plex Arabic ≥1.75, Readex/Alexandria ≥1.75, Rubik ≥1.55, Tajawal ≥1.4. Tight, fashionable line-heights are simply not available in Arabic.

Evidence: Measured by the author 2026-08-22 with fontTools 4.63.0 against the exact woff2 files served by fonts.gstatic.com for each family's `arabic` subset (head.unitsPerEm, hhea.ascent/descent/lineGap, OS/2 usWinAscent/usWinDescent, OS/2 fsSelection bit 7). Principle corroborated by W3C ALReq: 'Arabic ascenders and descenders extend much further than those of the Latin script'. https://www.w3.org/TR/alreq/

Source: https://www.w3.org/TR/alreq/

### Arabic reads smaller than Latin at identical font-size, and the gap is measurable inside a single harmonised family. In IBM Plex Sans Arabic (unitsPerEm 1000) I measured glyph bounding boxes: Latin 'x' height 0.516em, 'n' 0.528em, cap 'H' 0.698em, descender 'p' bottom −0.200em. The Arabic baseline body letter 'ه' is only 0.411em tall — about 20% shorter than the family's own Latin x-height — while Arabic descenders reach −0.440em ('ي'), 2.2× deeper than Latin 'p'. Single Arabic glyphs span nearly a full em: 'ل' 0.98em, 'ي' 0.919em, 'ع' 0.909em. Cairo behaves the same way ('ه' 0.5em, 'ي' descending to −0.43em).

Confidence: verified · type: data

Why it matters here: This is the quantitative basis for bumping Arabic UI text roughly 8–15% over the Latin size at the same hierarchy level rather than reusing one type scale for both languages — and for the fact that Arabic cannot survive the 11–12px microcopy sizes Latin tolerates. Microsoft's globalization guidance says the same qualitatively: 'font size needs to be adjusted based on the script.'

Evidence: Measured by the author 2026-08-22 with fontTools BoundsPen against the fonts.gstatic.com woff2 files for IBM Plex Sans Arabic v15 (arabic and latin subsets) and Cairo v31. Qualitative corroboration: Microsoft Learn, 'Customize font selection with font fallback and font linking', ms.date 2023-10-31, updated 2023-11-20. https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts

Source: https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts

### Arabic has no case, so the entire Latin emphasis toolkit shrinks. There is no ALL CAPS, no small-caps, no capitalised nav labels, no capitalised first letter. Letter-spacing must be zero: W3C ALReq states that because Arabic is cursive with overlapping joins, 'Moving two joined characters closer to or further from each other creates undesirable results', and RTL Styling 101 confirms letter-spacing disconnects letterforms that must stay joined. Underlines collide with diacritics (mitigate with text-decoration-skip-ink or a box-shadow underline). ALReq also warns that transparency on cursive glyphs 'expose[s] overlapping joinings, which should be avoided', and that styling a single letter 'should not interfere with its joining properties'.

Confidence: verified · type: principle

Why it matters here: Any hierarchy that leans on uppercase eyebrows, tracked-out labels, or 60%-opacity secondary text — which is most modern travel/SaaS UI — has no Arabic equivalent and will collapse into flat, undifferentiated text. The Arabic hierarchy has to be rebuilt out of weight, size, colour, rules, boxes, and vertical space, and the master doc must define that ladder rather than assume the Latin one carries over.

Evidence: W3C Arabic Layout Requirements, Group Draft Note 02 October 2025 https://www.w3.org/TR/alreq/ ; Ahmad Shadeed, 'RTL Styling 101', last updated 18 January 2020 — letter-spacing, RGBa/opacity artefacts, text-decoration-skip-ink and box-shadow underline fallback. https://rtlstyling.com/posts/rtl-styling (flagged: the browser-support claims in this 2020 source are stale; the typographic rules are not)

Source: https://www.w3.org/TR/alreq/

### Two Google-hosted Arabic families ship real variable axes that have no Latin equivalent and open genuine design moves. I read the fvar tables directly: Readex Pro exposes `wght` 160–400–700 plus `HEXP` 0–100 named 'Hyper Expansion'; Cairo exposes `wght` 200–400–1000 plus `slnt` −11–0–+11 named 'Slant'. Separately, W3C ALReq describes kashida (tatweel) as extending the horizontal connection between joined letters and 'an interesting tool for paragraph justification', while warning that 'Excessive use of kashida or applying very long kashidas results in uneven color.'

Confidence: verified · type: trend

Why it matters here: HEXP is a legitimate, type-designed way to make Arabic headlines expand and fill a measure — the effect designers illegitimately fake with letter-spacing. Animating HEXP on a hero headline, or using it to optically justify a two-line package title, is a differentiating move that is literally impossible in Latin and impossible for a competitor who uses a static Arabic webfont. Cairo's slnt gives a real slant instead of a browser-synthesised oblique, which mangles Arabic.

Evidence: Measured by the author 2026-08-22 with fontTools against ofl/readexpro/ReadexPro[HEXP,wght].ttf and ofl/cairo/Cairo[slnt,wght].ttf in the google/fonts repository (fvar axes and axisNameID name records). Kashida guidance: W3C ALReq, 02 October 2025. https://www.w3.org/TR/alreq/

Source: https://github.com/google/fonts/tree/main/ofl/readexpro

### Arabic webfont weight is affordable if you choose deliberately. I measured the Content-Length of the `arabic`-subset woff2 files Google actually serves: Tajawal 400 = 8,916 B; Almarai 400 = 18,216 B; Readex Pro variable (wght 160–700) = 22,764 B; Cairo variable (wght 200–1000) = 30,712 B; Alexandria variable (100–900) = 31,188 B; Rubik variable (300–900) = 32,480 B; IBM Plex Sans Arabic 400 = 33,512 B and 700 = a comparable static file (no variable version on Google Fonts); Noto Naskh Arabic variable = 93,960 B; Amiri 400 = 108,492 B; Noto Kufi Arabic variable = 123,796 B; Noto Sans Arabic variable = 166,152 B. For comparison the Latin subsets are much smaller (IBM Plex Sans Arabic latin 13,944 B; Almarai latin 9,524 B). Every one of these families sits in the `ofl/` directory of google/fonts, i.e. SIL Open Font License — verified for ibmplexsansarabic, cairo, tajawal, almarai, readexpro, alexandria, notosansarabic, notonaskharabic, notokufiarabic, amiri, rubik, kufam.

Confidence: verified · type: data

Why it matters here: Kills the 'Arabic fonts are too heavy' excuse that pushes teams to system fonts (which look like a 2009 government portal). A variable Arabic + variable Latin pairing costs ~55–65 KB total. It also flags the two traps: Noto Sans Arabic at 166 KB is a 5× penalty for a face most users cannot distinguish from Cairo, and IBM Plex Sans Arabic has no variable version on Google Fonts, so each weight is a separate ~33 KB download.

Evidence: Measured by the author 2026-08-22 via HTTP HEAD against the fonts.gstatic.com URLs returned by the Google Fonts CSS2 API with a Chrome UA. Licence bucket verified by HTTP 200 on https://raw.githubusercontent.com/google/fonts/main/ofl/<family>/METADATA.pb for each family. IBM Plex Sans Arabic METADATA.pb: license 'OFL', designers 'Mike Abbink, Bold Monday, Khajag Apelian, Wael Morcos', date_added 2021-06-17.

Source: https://fonts.googleapis.com/css2

### `next/font/google` supports the Arabic subset for every family worth considering, but its automatic CLS mitigation is Latin-only. I read Next.js 16.3.2's own bundled font-data.json: IBM Plex Sans Arabic subsets ['arabic','cyrillic-ext','latin','latin-ext'], weights 100–700, no variable axes; Cairo ['arabic','latin','latin-ext'] with axes slnt+wght; Readex Pro with axes HEXP+wght; Alexandria, Noto Sans Arabic, Noto Kufi Arabic, Rubik, Amiri, Kufam, Tajawal, Almarai all list 'arabic'. However the docs state `adjustFontFallback` for `next/font/local` accepts only 'Arial', 'Times New Roman' or false — both Latin faces — and for `next/font/google` it is a boolean. CSS `font-size-adjust` (two-value syntax: ex-height / cap-height / ch-width, plus `from-font`) reached Baseline 'newly available' in July 2024.

Confidence: verified · type: constraint

Why it matters here: Concrete: `subsets: ['arabic', 'latin']` is valid and should be specified so both preload. But Next's automatic size-adjusted fallback is computed against Arial metrics, which are meaningless for the Arabic glyph range — so the Arabic swap from system fallback (Geeza Pro on iOS, Segoe UI / Traditional Arabic on Windows, Noto on Android) to the webfont will produce real CLS unless you declare an explicit `@font-face` fallback with hand-set `size-adjust`, `ascent-override` and `descent-override` (available via `declarations` on next/font/local), or use font-size-adjust.

Evidence: Next.js 16.3.2 bundled data: https://unpkg.com/next@16.3.2/dist/compiled/@next/font/dist/google/font-data.json (read 2026-08-22). Next.js Font Module docs, version 16.3.2, lastUpdated 2025-08-06 https://nextjs.org/docs/app/api-reference/components/font ; MDN font-size-adjust, Baseline 2024 newly available since July 2024 https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust

Source: https://nextjs.org/docs/app/api-reference/components/font

### The Next.js App Router i18n shape is settled and documented: nest everything under `app/[lang]` (or `[locale]`), negotiate in Proxy/middleware using Accept-Language via `@formatjs/intl-localematcher` + `negotiator`, return locales from `generateStaticParams` in the root layout so every locale is statically rendered, load dictionaries with `import 'server-only'` so translation JSON never reaches the client bundle, and read the locale anywhere on the server with `next/root-params` instead of prop-drilling. next-intl's parallel setup is `defineRouting` in i18n/routing.ts, `createMiddleware` in proxy.ts, `createNavigation` for Link/redirect/usePathname, and `getRequestConfig`. Critically, next-intl's own with-i18n-routing getting-started page does not show setting `lang` and `dir` on `<html>` — that is left to the developer.

Confidence: verified · type: pattern

Why it matters here: The `dir` attribute is the one thing that must be server-rendered in the very first byte of HTML, and it is exactly the thing the library docs omit. If dir is applied by a client effect the page paints LTR and then snaps to RTL — the layout shift on language switch this brief asks about. Setting `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>` inside `app/[locale]/layout.tsx`, with the locale in the URL and `generateStaticParams` prerendering both, makes the switch a full document navigation to a fully-formed static page with zero flip.

Evidence: Next.js docs, Internationalization guide, version 16.3.2, lastUpdated 2026-06-10 https://nextjs.org/docs/app/guides/internationalization ; next-intl App Router with-i18n-routing setup https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing (both fetched 2026-08-22; the html lang/dir omission observed directly in the fetched page)

Source: https://nextjs.org/docs/app/guides/internationalization

### Google's rules for bilingual sites are explicit and partly counter-intuitive. hreflang annotations must be fully bidirectional — 'If two pages don't both point to each other, the tags will be ignored' — must use absolute URLs with protocol, must combine language+region (a bare region code is invalid), and should include an `x-default`. Subdirectories on a gTLD (example.com/ar/) are listed as easy to set up and low maintenance. Google 'doesn't use hreflang or the HTML lang attribute to detect the language of a page'. And Google explicitly advises: 'Avoid automatically redirecting users from one language version of a site to a different language version of a site.' W3C separately warns that Accept-Language is unreliable and that some servers use IP instead.

Confidence: verified · type: constraint

Why it matters here: Directly shapes the URL architecture and the switcher. Use /ar/ and /en/ subdirectories, reciprocal hreflang on every package page plus x-default, and never hard-redirect on Accept-Language or IP — suggest the other language with a dismissible banner and remember the choice in a cookie. For an organic-reach goal this matters twice over: hard redirects prevent Google from indexing both language versions of every package page, which halves the indexable surface.

Evidence: Google Search Central, 'Tell Google about localized versions of your page', last updated 2025-12-22 https://developers.google.com/search/docs/specialty/international/localized-versions ; Google Search Central, 'Managing multi-regional and multilingual sites', last updated 2025-12-10 https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites ; W3C i18n, 'Setting language preferences in a browser' https://www.w3.org/International/questions/qa-lang-priorities

Source: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites

### Flags cannot represent languages, and Arabic is the strongest case. Flags are symbols of nation-states while languages cross borders; the recommended alternative is the autonym — the language's own name in its own script. NN/g's ecommerce research (Feifei Liu, 27 March 2022) reaches the same conclusion on labelling ('Español' not 'Spanish'), places the switcher in the top corners on desktop and above the fold or in the hamburger on mobile, and says language, country and currency should be independently adjustable — but it also recommends combining multiple indicators for discoverability and criticises flag-*only* icons rather than flags outright. `Intl.DisplayNames` supplies the correct labels for free: I measured `new Intl.DisplayNames(['ar'],{type:'language'}).of('ar')` → 'العربية' and `.of('en')` → 'الإنجليزية'.

Confidence: reported · type: principle

Why it matters here: Arabic is official in roughly two dozen states; picking Saudi Arabia's or Egypt's flag to mean 'Arabic' actively alienates the rest of the target market, which for a Middle East travel site is the whole market. But the NN/g nuance matters: flags are fine for *destination* and *departure market* pickers, where a country genuinely is the thing being chosen. The rule is 'flags for countries, autonyms for languages' — and language, market and currency should be three separate controls, not one blended 'region' dropdown.

Evidence: NN/g, Feifei Liu, '6 Tips for Improving Language Switchers on Ecommerce Sites', 27 March 2022 https://www.nngroup.com/articles/language-switching-ecommerce/ ; flagsarenotlanguages.com, 'Why flags do not represent language' https://flagsarenotlanguages.com/blog/why-flags-do-not-represent-language/ ; autonym output measured by the author 2026-08-22 via Node Intl.DisplayNames, ICU 78.2

Source: https://www.nngroup.com/articles/language-switching-ecommerce/

### WCAG 2.2 SC 3.1.2 Language of Parts (Level AA) requires that 'the human language of each passage or phrase in the content can be programmatically determined', with exceptions for proper names and technical terms. The Understanding document notes this matters specifically for direction: language changes let visual browsers 'display characters and scripts in appropriate ways', and speech synthesisers otherwise default to the page language and mispronounce. The sufficient technique is H58, using lang attributes on the inline element.

Confidence: verified · type: constraint

Why it matters here: On an Arabic package page, English hotel names, airline codes, airport codes, and marketing terms ('all-inclusive', 'Deluxe Sea View') are exactly the mixed-language phrases this criterion covers. `<span lang="en" dir="ltr">` (or `<bdi lang="en">`) fixes accessibility and the bidi reordering bug in one move — a rare case where the accessible markup is also the visually correct markup.

Evidence: W3C, Understanding WCAG 2.2, Success Criterion 3.1.2 Language of Parts, Level AA https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html (fetched 2026-08-22)

Source: https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html

### Arabic URL slugs are catastrophically expensive to share. I measured `encodeURIComponent('رحلات-إلى-المالديف')`: 18 characters become 98 characters of percent-encoding — a 5.44× expansion — versus 1.00× for 'maldives-packages'.

Confidence: verified · type: data

Why it matters here: Directly hits the organic-reach goal. A URL pasted into WhatsApp, an Instagram bio, a Story link sticker, or a screenshot of the browser address bar becomes an unreadable %D8%B1%D8%AD wall. The right pattern is Latin-transliterated or English slugs under an /ar/ prefix (example.com/ar/maldives-packages), with the Arabic title carried in `<h1>`, `<title>` and og:title where it renders as real script — you keep readable, screenshot-able, shareable URLs and full Arabic content.

Evidence: Measured by the author 2026-08-22 with Node `encodeURIComponent`. Percent-encoding of non-ASCII in URI components per RFC 3986; each Arabic code point in UTF-8 is 2 bytes → 6 encoded characters.

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

### Arabic is drastically under-supplied on the web relative to its audience. W3Techs' survey dated 22 August 2026 shows English used by 49.5% of all websites whose content language is known, with Arabic at 0.6% (top five: English 49.5%, Spanish 6.0%, German 5.9%, Japanese 4.9%, French 4.5%). Separately, Global Media Insight's UAE statistics (last updated 1 April 2024) report 10.14 million UAE internet users at 99.00% penetration, 8h11m average daily internet time, and 75.30% of web traffic from mobile phones.

Confidence: reported · type: data

Why it matters here: The strategic case for Arabic-first is a supply argument, not a sentiment argument: the Arabic web is thin, so a genuinely well-made Arabic experience faces far weaker competition for attention and links than an English one, where the site would be competing with global OTAs. And 75.3% mobile means the Arabic type, line-height and tap-target decisions must be made at 375–430px first, not adapted down from desktop.

Evidence: W3Techs, 'Usage statistics of content languages for websites', survey date 22 August 2026 https://w3techs.com/technologies/overview/content_language ; Global Media Insight, 'UAE Internet Statistics', last updated 1 April 2024 https://blog.globalmediainsight.com/uae-internet-statistics/ (flagged: GMI is a secondary aggregator, ~2 years old at time of writing; treat the mobile-share figure as directional)

Source: https://w3techs.com/technologies/overview/content_language

### Web font fallback resolves per character, not per string, and Arabic and Latin faces almost never share vertical metrics. Microsoft's globalization guidance states it plainly: 'it's difficult to do a good job of making fonts with glyphs for different scripts such that all conform to one set of vertical metrics', and advises not hardcoding face names, not putting font names in localisable resources, and ensuring font size is dynamic per script. RTL Styling 101 adds the practical ordering rule: list the Arabic face before the Latin face in `font-family` so it wins for characters both cover (digits, punctuation, parentheses).

Confidence: verified · type: constraint

Why it matters here: Determines the pairing strategy. Either use one family that carries both scripts from a single design — Rubik ships arabic + latin + hebrew + cyrillic subsets, IBM Plex Sans Arabic is drawn to sit with IBM Plex Sans, Readex Pro and Alexandria are both dual-script — or pair two faces and reconcile their metrics manually with size-adjust/ascent-override. Mixing an unrelated Latin display face with an Arabic body face without metric reconciliation produces the mismatched-baseline look that reads instantly as 'localised afterwards'.

Evidence: Microsoft Learn, 'Customize font selection with font fallback and font linking', ms.date 2023-10-31, updated 2023-11-20 https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts ; Ahmad Shadeed, 'RTL Styling 101', updated 18 January 2020 https://rtlstyling.com/posts/rtl-styling ; subset coverage verified by the author 2026-08-22 from Next.js 16.3.2 font-data.json and the Google Fonts CSS2 API

Source: https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts

### There is a stable consensus on what mirrors and what does not, though no single 2024+ primary source consolidates it. Mirror: directional arrows and chevrons, back/forward, breadcrumb separators, menu/drawer opening side, send/reply icons, tab and progress direction, and anything whose meaning is 'the direction of travel through the interface'. Do not mirror: media playback controls (play/pause/rewind reference tape direction, not reading direction), clocks, checkmarks, symmetrical icons, brand logos, objects held in a hand, and — explicitly — the internal order of digits in a number. Android encodes the mechanical version of this as `android:autoMirrored="true"`, and warns it 'only works for simple drawables whose bidirectional mirroring is simply a graphical mirroring of the entire drawable' — anything whose interpretation changes when reflected must be handled by hand.

Confidence: reported · type: pattern

Why it matters here: Gives the icon set a written rule instead of case-by-case guesswork, which is where RTL builds decay. For a package site the live cases are: itinerary day-by-day timeline (mirrors), 'X of Y photos' carousel arrows (mirror), star ratings (do not mirror the star; do reverse the fill origin), price-range slider (mirrors), video hero play button (does not mirror), flight route diagram origin→destination (mirrors), and the 'included/not included' checkmarks (do not mirror).

Evidence: Ahmad Shadeed, 'RTL Styling 101', updated 18 January 2020 https://rtlstyling.com/posts/rtl-styling ; Robert Dodis & Yvette Mosiichuk, 'Right-To-Left Mobile Design', Smashing Magazine, 6 November 2017 — 'The order of digits in numbers should not be changed for RTL', do not mirror media control buttons or symmetrical icons https://www.smashingmagazine.com/2017/11/right-to-left-mobile-design/ ; Android developers, language and locale support, android:autoMirrored guidance https://developer.android.com/training/basics/supporting-devices/languages (flagged: the two design sources are 2017 and 2020 — pre-2023 and therefore potentially stale on tooling, though the mirroring taxonomy itself is stable and repeated across Android's current docs)

Source: https://rtlstyling.com/posts/rtl-styling

### Bootstrap ships RTL as an *experimental* feature and documents its real cost: a separate `bootstrap.rtl.css` build produced by RTLCSS, a starter template requiring both `lang="ar"` and `dir="rtl"` on `<html>`, per-value escape hatches (`/*rtl:600*/`, `/*rtl:insert:Arabic*/`) to swap font weights and font stacks between directions, and — where both directions must coexist on one page — a ~20–30% increase in combined stylesheet size plus known breakage in the form-validation-state mixin.

Confidence: verified · type: constraint

Why it matters here: This is the concrete evidence for choosing logical properties over a dual-stylesheet toolchain. If the site is built logical-first on Tailwind v4 with `:dir()` variants, none of Bootstrap's costs apply: one stylesheet, no RTLCSS build step, no 20–30% penalty, no per-value directives. Worth naming in the master doc as the road not taken, so a future session does not 'add RTL support' by reaching for RTLCSS.

Evidence: Bootstrap 5.3 docs, 'RTL' getting-started page — approach, custom RTL values, LTR+RTL on the same page, and the explicit limitations list https://getbootstrap.com/docs/5.3/getting-started/rtl/ (fetched 2026-08-22)

Source: https://getbootstrap.com/docs/5.3/getting-started/rtl/

## Design implications

- ARCHITECTURE — Ship `app/[locale]/layout.tsx` with `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>` rendered server-side, and `generateStaticParams()` returning both locales so /ar and /en are prerendered static routes. Language switching is a full navigation to a prerendered page, never a client state toggle — this is what makes the switch produce literally zero layout shift. Read the locale in deep server utilities with `next/root-params` rather than prop-drilling.
- CSS LAW — Physical direction properties are banned in application code. Enforce it: a stylelint rule (or CI grep) failing on `margin-left|margin-right|padding-left|padding-right|left:|right:|text-align: *(left|right)|border-(top|bottom)-(left|right)-radius`. Use margin-inline-start/end, padding-inline, inset-inline-start/end, border-inline-start/end, border-start-start-radius, text-align: start/end. In Tailwind that means `ms-*/me-*/ps-*/pe-*/start-*/end-*/text-start/text-end` only.
- CSS LAW, PART TWO — Logical properties do NOT fix: box-shadow and text-shadow offsets, transform (translateX, rotate, skew), transform-origin, background-position and background-image, and cursor resize keywords. Every one of these needs an explicit `rtl:` variant. Add these five to the code-review checklist verbatim — they are the ones that survive an otherwise-clean RTL audit and ship broken.
- TYPE SCALE — Define TWO type scales in the design tokens, `--fs-*-latin` and `--fs-*-ar`, with the Arabic step roughly 8–15% larger at the same hierarchy level (measured basis: the Arabic body letterform ه is 0.411em vs Latin x-height 0.516em in IBM Plex Sans Arabic). Set an absolute floor of 15px for Arabic body and 13px for Arabic microcopy; the 11–12px Latin caption size is not available in Arabic.
- LINE-HEIGHT FLOORS — Set Arabic body line-height from the chosen face's measured ink extent, not from a taste-based ratio. Concretely: Cairo ≥ 1.90, Noto Sans Arabic ≥ 2.17, Readex Pro ≥ 1.76, Alexandria ≥ 1.74, IBM Plex Sans Arabic ≥ 1.75, Rubik ≥ 1.55, Tajawal ≥ 1.40. Never use `line-height: normal` on Almarai, Alexandria or Readex Pro — their default line box is smaller than their own ink and will clip descenders.
- TYPOGRAPHY HARD RULES — `letter-spacing: 0` on every Arabic element (add a `:dir(rtl) { letter-spacing: 0 !important }` guard, since tracked-out labels leak in from Latin components). No ALL CAPS, no `text-transform: uppercase`, no small-caps in Arabic. No `opacity` or rgba() on Arabic text — it exposes overlapping letter joins; use solid computed colours. Add `text-decoration-skip-ink: auto` on Arabic links so underlines dodge diacritics.
- ARABIC HIERARCHY LADDER — Because case and tracking are unavailable, define the Arabic emphasis ladder explicitly in the master doc: weight (400 → 600 → 700), size step, colour, a leading rule/keyline, a filled chip or box, and vertical space. Every Latin component that carries an uppercase eyebrow label must specify its Arabic substitute (typically a coloured 600-weight label with a start-side keyline).
- FONT STACK — Pick one dual-script family and one accent. Recommended primary: Readex Pro (22.8 KB Arabic variable, wght 160–700 plus the HEXP Hyper-Expansion axis, dual-script, OFL) or IBM Plex Sans Arabic (33.5 KB per weight, drawn to sit with IBM Plex Sans, OFL). Load via `next/font/google` with `subsets: ['arabic','latin']` and `display: 'swap'`. Always list the Arabic face before the Latin face in the family stack so it wins for shared characters (digits, parentheses, punctuation).
- CLS — Do not trust `adjustFontFallback`; it is computed against Arial/Times metrics that mean nothing for the Arabic range. Declare an explicit Arabic fallback `@font-face` (family 'ArabicFallback', src: local('Geeza Pro'), local('Segoe UI'), local('Noto Sans Arabic')) with hand-computed `size-adjust`, `ascent-override` and `descent-override` matched to the chosen webfont, and reference it in the Arabic stack. Verify CLS < 0.1 on /ar/ with a throttled first load.
- ALL FORMATTED VALUES GO THROUGH Intl — Prices via `Intl.NumberFormat(locale,{style:'currency'})`, dates via `Intl.DateTimeFormat`, lists via `Intl.ListFormat` (Arabic joins with و and no comma: دبي وإسطنبول والمالديف), relative times via `Intl.RelativeTimeFormat`, language labels via `Intl.DisplayNames`. Never string-concatenate a price or a date. Never regex-strip or trim an Intl output — it contains U+200F RLM control characters that keep the currency symbol on the correct side.
- DIGITS DECISION — Override CLDR and use Western digits (0123) for all prices, dates, durations and phone numbers across all Arabic locales, by pinning `-u-nu-latn`. Rationale to record in the doc: CLDR defaults ar-SA/EG/LB/JO/KW/QA to Arabic-Indic but ar-AE/MA/TN/DZ to Western, the target market spans both, and Western digits are legible to every Arabic reader while the reverse is not true. Arabic-Indic digits may be used decoratively in editorial/hero contexts, never in a booking flow.
- BIDI ISOLATION COMPONENT — Build one `<Bidi>` primitive that renders `<bdi>` and use it for every value whose direction differs from or is unknown relative to its context: hotel names, airline and flight codes, airport codes, review author names, prices inside Arabic sentences, phone numbers, email addresses, URLs, and anything user-generated. Latin phrases inside Arabic copy get `<span lang="en" dir="ltr">` — which satisfies WCAG 2.2 SC 3.1.2 (Level AA) at the same time.
- DATE PICKER — Build it from `Intl.Locale(...).getWeekInfo()`, not hardcoded. Saudi users must see firstDay Sunday with Friday and Saturday shaded as the weekend; UAE users must see Saturday and Sunday. Show Gregorian as primary with the Umm al-Qura Hijri date as a secondary line (`-u-ca-islamic-umalqura` — never islamic-civil, which is up to two days off). Month names must come from Intl, because Levantine Arabic uses كانون الثاني where Gulf Arabic uses يناير.
- STRINGS — Use ICU MessageFormat (next-intl) from the first string, not a flat key/value dictionary. Arabic requires six plural forms (zero, one, two, few, many, other) for every count string: nights, travellers, seats left, reviews, days to departure. Write the English source strings as MessageFormat plurals too, so the Arabic forms have somewhere to go.
- ROUTING & SEO — /ar/ and /en/ subdirectories on one domain. Reciprocal hreflang on every page (ar ↔ en) plus x-default pointing at the language-choice-capable landing page; absolute URLs with protocol. Never hard-redirect on Accept-Language or IP — Google explicitly advises against it and it blocks indexing of the other language. Offer the other language as a dismissible top banner and persist the choice in a cookie.
- SLUGS — Latin/transliterated slugs under the /ar/ prefix (example.com/ar/maldives-packages), with Arabic in `<h1>`, `<title>`, og:title and the breadcrumb. Measured justification: an 18-character Arabic slug percent-encodes to 98 characters (5.44×), which destroys the URL the moment someone pastes it into WhatsApp or a Story link — a direct hit to the organic-sharing goal.
- LANGUAGE SWITCHER — Top corner on desktop, above the fold or in the first position of the mobile menu. Labels are autonyms from `Intl.DisplayNames`: العربية and English, each rendered in its own script and its own face. No flags for language. Keep language, departure market and currency as three independent controls; flags are permitted only on the market/destination controls, where a country genuinely is the thing being chosen.
- ICON POLICY — Write the mirror/no-mirror list into the component library as a prop or a naming convention. Mirror: chevrons, back/forward, breadcrumb separators, send, drawer side, progress fill origin, itinerary timeline, route diagrams, price sliders. Do not mirror: play/pause/rewind, clocks, checkmarks, star shapes, brand marks, symmetrical glyphs, and the internal digit order of any number. Any icon whose meaning changes when reflected gets a hand-drawn RTL variant, not a scaleX(-1).
- QA GATE — Every PR touching UI must be screenshotted at /ar/ and /en/ at 375px and 1280px before merge. Add an automated check that renders key pages with `dir="rtl"` and fails on horizontal overflow. Test with a long Arabic string AND a short one (Arabic translations swing hard in both directions — 'Done' → 'تم'), and set `min-inline-size` on buttons and badges so short Arabic labels don't collapse the component.

## Anti-patterns to refuse

- The bolted-on RTL: an English-first site plus `[dir='rtl'] { ... }` overrides or a second RTLCSS-generated stylesheet. It doubles maintenance permanently, drifts within weeks, and Bootstrap's own docs quantify the cost (~20–30% larger combined CSS, experimental status, known mixin breakage). The differentiated build is one logical-property stylesheet that reads in mirror.
- Flipping the layout with a CSS class instead of the `dir` attribute. The page looks mirrored but the bidi algorithm, form controls, text selection and screen readers all stay in LTR mode — so every mixed Arabic/Latin string still reorders wrongly. W3C is explicit: do not use CSS to set base direction.
- Setting `dir` in a client-side effect or from a Zustand/Context store. This is the exact cause of the flip-on-load layout shift the brief names: the page paints LTR, hydrates, then snaps to RTL. `dir` must be in the server-rendered HTML of a prerendered per-locale route.
- Reusing the Latin type scale and line-height for Arabic. Arabic ink extends 1.39–2.17em against Latin's 1.20–1.43em, and the Arabic baseline letterform is ~20% shorter than the same family's Latin x-height. The result is body copy that reads small AND has its descenders and diacritics shaved off — the single most recognisable tell of a translated site.
- Letter-spacing, ALL CAPS, or small-caps on Arabic. Tracking disconnects cursive joins (W3C ALReq: moving joined characters apart 'creates undesirable results'); Arabic has no case at all, so an uppercase eyebrow label simply becomes indistinguishable body text. Generic templates carry these straight over from the Latin design system.
- Semi-transparent Arabic text (opacity, rgba, `text-white/60`). Transparency exposes the overlapping outlines where Arabic letters join, producing visible dark seams inside words. It is invisible to a designer who cannot read Arabic, and glaring to everyone who can.
- Hand-concatenating prices and dates: `${amount} ${currency}` or `${day}/${month}/${year}`. ICU wraps Arabic currency output in U+200F RLM and uses U+066C/U+066B separators in ar-EG for a reason. Concatenated strings put the currency symbol on the wrong side, and any `.trim()`/slugify/regex-strip of an Intl result silently re-breaks it.
- Hardcoded Arabic month-name arrays and hardcoded Sat/Sun weekends in the date picker. Levantine Arabic uses كانون الثاني, not يناير. Saudi Arabia's weekend is Friday–Saturday, the UAE's is Saturday–Sunday. On a *travel* site — where the calendar is the primary interaction and 'weekend break' is a core product — this is not a nitpick, it is a wrong product.
- A flag icon for the language switcher. No flag can represent Arabic, which is official across roughly two dozen states; whichever one you pick actively excludes most of the target market. Equally bad is fusing language, country and currency into one 'region' dropdown so a user in Kuwait cannot browse in English with KWD pricing.
- Auto-redirecting on IP or Accept-Language. Google explicitly advises against it, W3C notes Accept-Language is unreliable, and it prevents both users and crawlers from reaching the other language version — halving the indexable surface for a site whose growth plan is organic reach.
- Raw Arabic slugs in the URL. An 18-character Arabic slug becomes 98 characters of %D8%B1%D8%AD when pasted anywhere — WhatsApp, an Instagram bio, a Story link, a screenshot of the address bar. Directly hostile to a site whose distribution strategy is people sharing it.
- Defaulting to Noto Sans Arabic because it is the obvious choice. It is 166 KB for the Arabic variable subset — 5× Readex Pro and Cairo — and it is the Android system Arabic face, so the site inherits the visual identity of a system default. Arabic type is one of the cheapest places to buy distinctiveness; spending it on Noto is a wasted differentiator.
- Machine-translating the English strings and shipping. Beyond tone, it breaks structurally: Arabic's six plural categories mean 'N nights' has one correct form out of six, and a translation memory has no way to invent the other five if the source string was not authored as an ICU plural.
- `scaleX(-1)` applied globally to icons in RTL. It mirrors the play button, the clock, the checkmark and the brand mark along with the chevrons. Mirroring is a per-icon semantic decision, not a transform you apply to a sprite sheet.

## Differentiation moves

- Ship a weekend-aware calendar. Read `Intl.Locale(tag).getWeekInfo()` and shade Friday–Saturday for Saudi visitors, Saturday–Sunday for UAE visitors, and surface a 'إجازة نهاية الأسبوع' package rail whose departure dates change accordingly. This is a genuinely local product behaviour that no international OTA template has, and it is roughly thirty lines of code.
- Dual calendar as a first-class feature, not a toggle buried in settings. Show Gregorian primary with Umm al-Qura Hijri as a persistent secondary line on every date — departure, return, cancellation deadline, payment due. Add Hijri-anchored package collections (Ramadan Umrah windows, Eid al-Fitr breaks, Eid al-Adha, school holidays) that a Gregorian-only competitor structurally cannot merchandise.
- Use Readex Pro's HEXP 'Hyper Expansion' axis (0–100, a real type axis, not a hack) as a signature motion: Arabic hero headlines that expand to fill their measure on load, or package titles that optically justify across two lines. It is a visual effect that literally cannot exist in a Latin-only design, and it is impossible for any competitor using a static Arabic webfont.
- Design the Arabic version first and derive the English from it. Every layout decision then has to survive the harder constraint (deeper descenders, no uppercase, no tracking, longer or shorter strings), and the English version inherits a design with more air, larger type and a stronger non-case hierarchy — which reads as premium in Latin too. It also guarantees the Arabic site never looks like an afterthought, because it wasn't one.
- True parity as a visible product promise, not a checkbox: identical package inventory, identical filters, identical prices, identical review counts, and Arabic-first customer-facing copy written in Arabic rather than translated. State it on the site ('نفس الباقات، نفس الأسعار، بالعربية') — because the audience's lived experience of Arabic sites is that the Arabic version is a stripped-down subset, and contradicting that expectation is itself the differentiator.
- A bilingual, screenshot-designed package card. Design the card so the Arabic version is the more beautiful one — Arabic headline set large in a distinctive face, Western digits for the price so it stays scannable, a real destination photo, and no chrome. Then make that exact card the og:image (generated per package with the Next.js OG image runtime). What gets shared to Stories and WhatsApp is a piece of Arabic typography, not a screenshot of a form.
- Ship a visible 'Arabic done properly' signal: correct kashida-free justification, diacritics that are never clipped, Latin hotel names correctly isolated so they never reorder, and prices that never flip. Design-literate Arabic speakers notice this instantly and it is exactly the kind of craft that gets a site linked and posted about in regional design and dev circles — which is organic reach earned by the build quality itself.
- Pick a distinctive Arabic face and commit to it as brand. Almost every regional travel site uses Cairo, Tajawal or the system default. Readex Pro, Alexandria or Kufam (all OFL, all under 33 KB for the Arabic variable subset) give immediate visual separation at zero licensing cost and negligible performance cost.
- Language, market and currency as three independent controls with autonym labels from Intl.DisplayNames — so a Lebanese expatriate in Dubai can browse in English, depart from DXB, and pay in USD. The blended 'region' dropdown that most travel sites ship makes that combination impossible, and it is a very common real user.
- Localise the *destinations*, not just the interface. Region-aware default destination sets, Arabic-native destination names that match how people actually search (إسطنبول, تبليسي, باكو, سمرقند, كوالالمبور), halal-friendly and family-privacy filters as primary facets rather than buried tags, and visa-on-arrival status shown per passport. This is content differentiation that the Arabic-language layer makes natural and an English-first architecture makes awkward.

## Open questions

- Which Arabic dialect register for UI copy? Modern Standard Arabic is universally understood and correct but reads formal and institutional; Gulf-inflected copy reads warmer to the primary market but alienates Levantine and North African readers. This is a brand-voice decision that must be made before the first string file, and it should run through the no-ai-voice skill in Arabic, not English.
- Is the primary audience Gulf nationals, Gulf expatriates, or diaspora travellers from the Levant/North Africa? The answer changes the digit decision, the month-name locale, the weekend logic, the currency default, and whether English or Arabic is the higher-traffic locale. No sourced audience-composition data was found for this specific business.
- Should a third locale exist? A large share of the UAE and Qatar travel market is South Asian expatriate. Adding an English-only variant tuned to that segment is cheap; adding Urdu/Hindi is not. No sourced figure found on the language mix of UAE outbound package buyers.
- Do the target users actually want Hijri dates in a booking flow, or only in editorial/seasonal contexts? ICU 78.2 defaults ar-SA to the Gregorian calendar, which suggests Gregorian is the civil default even in Saudi Arabia. Worth a five-user check before building dual-calendar into every date component.
- Which Arabic digit convention do Gulf users actually prefer for *prices* on the web, as opposed to what CLDR says their locale defaults to? I found no sourced usability study on Arabic-Indic vs Western digits in ecommerce pricing. This is the single most testable open question in this dimension.
- Licensing of the commercial Arabic faces named in the brief could not be verified: dubaifont.com was unreachable at the time of research, and no sourced licence terms were found for Bahij or TheSans Arabic. Do not assume any of them is free for commercial webfont use until the EULA is read directly.
- Does Arabic-first hurt English-locale SEO? Google says it uses algorithms rather than hreflang or the lang attribute to detect page language, so a site whose Arabic content is stronger may rank better in Arabic queries than English ones. Whether that is a problem depends on where the traffic goal sits, which is a market-dimension question.
- How should Supabase store bilingual content — JSONB translation columns on a single package row, or sibling rows keyed by locale? This affects RLS policy shape, full-text search configuration (Postgres has no built-in Arabic stemmer in the default distribution), and whether a package can exist in one language only. Needs a decision recorded in .memory/projects/ before schema work starts.
- Full-text search over Arabic in Postgres is a real unknown: default `to_tsvector` configurations do not stem Arabic, and Arabic search needs normalisation of alef variants (أ/إ/آ→ا), taa marbuta (ة→ه), and diacritic stripping. Whether to use unaccent + a custom dictionary, pg_trgm, or an external index was not researched here.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### PARTIALLY_TRUE — Logical properties flip automatically; MDN explicitly warns against mixing physical and logical properties; Baseline Chrome 69+/Firefox 68+/Safari 12.1+

Mapping and flow-relative-values half CONFIRMED: MDN lists border-start-start-radius, margin-inline-start, inset-inline-start, padding-block, and lists caption-side/clear/float/resize/text-align as related concepts (no logical property, flow-relative values). Two failures. (a) The 'MDN explicitly warns against mixing' attribution is UNSUPPORTED - I fetched the cited module page, the Basic_concepts page and the Guides page; none contains such a warning or note box. (b) Browser versions are FALSE: caniuse gives full support at Chrome 89 / Edge 89 / Firefox 66 / Safari 15 (partial before), and MDN gives border-start-start-radius Baseline widely available September 2021. Chrome 69 / Safari 12.1 are roughly three years too early. https://caniuse.com/css-logical-props ; https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-start-radius ; https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

Corrected: Logical properties flip with direction; float/clear/text-align/resize/caption-side take flow-relative values only. Full support: Chrome/Edge 89, Firefox 66, Safari 15; border-start-start-radius Baseline widely available since September 2021. Do not set the same dimension both ways on one element (width and inline-size) - last declaration wins.

### CONFIRMED — RTLCSS source is the definitive audit list of what physically breaks in RTL (13 property expressions incl. /^--/, shadow, transform, cursor e-resize to w-resize)

Read the master-branch source directly. Every regex is present at the stated lines: variable /^--/im (215), direction (222), left (229), right (236), four-value margin|padding|border-(color|style|width) (243), border-radius (259), shadow (297), (?:transform|perspective)-origin (312), /^(?!text-).*?transform$/ (337), transition(-property)? (383), (background|object)(-position(-x)?|-image)? (389), float|clear|text-align|justify-(content|items|self) (463), cursor (470). The cursor processor does map e to w. Line numbers land inside the author's stated 198-524 range. https://raw.githubusercontent.com/MohammadYounes/rtlcss/master/lib/plugin.js

### CONFIRMED — W3C says 'Do not use CSS to apply base direction in HTML pages'; :dir() Baseline December 2023; Tailwind v4.3 rtl: compiles to &:where(:dir(rtl), [dir=rtl], [dir=rtl] *)

All three verified verbatim. W3C: 'Do not use CSS to apply base direction in HTML pages' plus 'If the overall document direction is right-to-left, add dir=rtl to the html tag' and use dir on structural elements only on rare occasions. MDN: :dir() Baseline widely available since December 2023, matches the UA-computed value even if inherited, including dir=auto resolution. Tailwind docs (site shows v4.3, released 8 May 2026, current 4.3.3) generate exactly &:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *). Bonus the author missed: MDN states :dir() uses only the SEMANTIC value and 'doesn't account for styling directionality... set by CSS properties such as direction' - which independently reinforces the put-dir-in-markup rule. https://www.w3.org/International/questions/qa-html-dir ; https://developer.mozilla.org/en-US/docs/Web/CSS/:dir ; https://tailwindcss.com/docs/hover-focus-and-other-states

### CONFIRMED — Bidi breaks on five specific conditions; fix is isolation via bdi / dir / U+2066-2069; avoid U+202A-202C; MDN's '1 - NAMEst place' failure

W3C lists verbatim: 'begins or ends with neutral characters, begins with a number, is followed by a number, is followed by another, but logically separate, opposite-direction phrase, contains one or more nested phrases whose base direction is opposite to that of the phrase.' It recommends dir on a tight wrapper, bdi, and LRI/RLI/FSI/PDI, and says of U+202A-202C 'they don't directionally isolate the phrases they surround, so it's best not to use them.' MDN bdi: Baseline widely available since January 2020, dir defaults to auto and is never inherited, and the garbled example renders as '1 - EMBEDDED-TEXTst place' (MDN uses a placeholder, not an Arabic name specifically - harmless paraphrase). MDN also says authors should not use unicode-bidi: isolate on a span because it is not semantic. https://www.w3.org/International/articles/inline-bidi-markup/ ; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi

### CONFIRMED — ICU injects U+200F RLM into formatted Arabic currency and dates; ar-AE AED 4999 wraps in RLM with NBSP; ar-EG uses U+066C/U+066B; ar-EG dates carry RLMs

Reproduced byte-for-byte on my own machine with the identical build (Node v24.14.1, ICU 78.2, Unicode 17.0, CLDR 48.0). ar-AE AED 4999 gives code points 200F 0034 002C 0039 0039 0039 002E 0030 0030 00A0 062F 002E 0625 002E 200F - RLM-wrapped, NBSP before the symbol, exactly as claimed. ar-EG gives 200F 0664 066C 0669 0669 0669 066B 0660 0660 00A0 062C 002E 0645 002E 200F - U+066C ARABIC THOUSANDS SEPARATOR and U+066B ARABIC DECIMAL SEPARATOR confirmed. Intl.DateTimeFormat('ar-EG') on 2026-08-22 gives 0662 0662 200F 002F 0668 200F 002F 0662 0660 0662 0666 - RLM before each slash. This is the strongest claim in the set: independently reproducible and exact.

### CONFIRMED — numberingSystem is arab for ar-SA/EG/LB/JO/KW/QA and latn for ar-AE/MA/TN/DZ and bare ar; Maghreb uses 12.345,6; W3C ALReq maps the same split

Reproduced exactly on ICU 78.2: ar/ar-AE/ar-MA/ar-TN/ar-DZ resolve to latn, ar-SA/EG/LB/JO/KW/QA (and ar-IQ) to arab. ar-MA/TN/DZ format 12345.6 as 12.345,6; ar-EG as arabic-indic; ar-AE as 12,345.6. ALReq (Group Draft Note, 02 October 2025) does map European numerals to Algeria/Morocco and Arabic-Indic to Egypt/Saudi/Iraq. CAVEAT the author should not gloss: ALReq's east/west geography does NOT explain CLDR's ar-AE = latn - the UAE is an eastern Arab state, and it is the single most important locale for a Gulf travel site. Cite the CLDR measurement for ar-AE, not ALReq. https://www.w3.org/TR/alreq/

### PARTIALLY_TRUE — Arabic month names differ by region: ar/ar-EG/ar-SA return yanayir etc., ar-LB (Levant) returns kanun al-thani etc.

Both stated cases reproduce exactly. But the claim presents a two-way split where CLDR encodes at least FOUR systems, and the omission is directly relevant to a travel site selling Maghreb packages. Measured on ICU 78.2: ar-MA returns a distinct Moroccan set (yanayir, fabrayir, mars, abril, MAY, yunyu, YULYUZ, GHUSHT, SHUTANBIR, uktubar, NUNBIR, DUJANBIR); ar-TN and ar-DZ return the French-derived set (JANFI, FIFRI, mars, AFRIL, may, JUAN, JUILIYA, UT, sibtambir, uktubar, nufambir, disambir). Also ar-JO and ar-IQ return the Levantine set, so labelling the split 'Gulf vs Levant' is wrong - Jordan and Iraq sit on the Levantine side.

Corrected: CLDR encodes at least four Arabic month-name systems, not two: the Gulf/Egyptian set (ar, ar-EG, ar-SA), the Levantine set (ar-LB, ar-SY, ar-JO, ar-IQ), a Moroccan set (ar-MA: yulyuz, ghusht, shutanbir, nunbir, dujanbir), and a French-derived Tunisian/Algerian set (ar-TN, ar-DZ: janfi, fifri, afril, juan, juiliya, ut). Never hardcode month names; always let Intl.DateTimeFormat resolve them from the full locale tag.

### CONFIRMED — Arabic has six plural categories (zero/one/two/few/many/other) where English has two

Reproduced exactly with Intl.PluralRules on ICU 78.2: ar selects zero(0), one(1), two(2), few(3), many(11), other(100); en selects one(1) and other for 0/2/3/11/100. Directly actionable - any 'N nights', 'N travellers', 'N results' string needs six forms in Arabic.

### CONFIRMED — getWeekInfo: ar-SA firstDay 7 weekend [5,6]; ar-AE firstDay 1 weekend [6,7]; en-US firstDay 7 weekend [6,7]

Reproduced exactly via Intl.Locale.prototype.getWeekInfo() on ICU 78.2. This is the sharpest business-relevant finding in the dimension and it holds. Worth adding: ar-EG returns firstDay 6 (Saturday) with weekend [5,6], and ar-MA returns firstDay 1 with weekend [6,7] - so there are at least three distinct week shapes across Arabic locales, not two.

### FALSE — Hijri variants disagree: umalqura 9, tbla 9, civil 7 (two days earlier), islamic 9; ar-SA defaults to gregory

The principle survives, the numbers do not. On the same ICU 78.2 at 2026-08-22 I get umalqura 9, tbla 9, civil 8 (ONE day earlier, not two), islamic 10 (not 9). I checked every 6 hours across 21-23 August in both UTC and Asia/Riyadh - civil is never two days behind umalqura, and islamic is never equal to it on this date. Stronger structural refutation: across 2,000 consecutive days, islamic-tbla minus islamic-civil is exactly 1 in every non-month-boundary case (both are arithmetic calendars whose epochs differ by one day), so the claimed umalqura=tbla=9 with civil=7 is arithmetically impossible. CONFIRMED sub-claims: supportedValuesOf('calendar') includes islamic-umalqura, and the default calendar for ar-SA (and ar-EG) resolves to gregory.

Corrected: Hijri is available via the -u-ca- extension and the variants genuinely disagree: for the same instant on 2026-08-22, islamic-umalqura and islamic-tbla give 9 Rabi al-Awwal 1448, islamic-civil gives 8, and islamic gives 10 - three different dates from one timestamp. islamic-tbla and islamic-civil differ by exactly one day by construction. Intl.supportedValuesOf('calendar') includes islamic-umalqura, and notably the DEFAULT calendar for ar-SA resolves to gregory, not Hijri, so a Hijri display must be requested explicitly.

### PARTIALLY_TRUE — Arabic ink extents 1.39-2.17em vs Latin 1.20-1.43em; Almarai/Alexandria/Readex Pro ship line boxes smaller than their ink; all families set USE_TYPO_METRICS

I re-measured every family from the live gstatic woff2 with fontTools 4.63.0. All eleven ink figures reproduce to three decimals: Noto Sans Arabic 2.169, Noto Kufi Arabic 2.157, Cairo 1.883, Readex Pro 1.755, Alexandria 1.732, IBM Plex Sans Arabic 1.729, Almarai 1.561, Rubik 1.532, Tajawal 1.391, Inter 1.430, Roboto 1.200. The three line-box-smaller-than-ink cases reproduce exactly (Almarai 1.116 vs 1.561; Alexandria 1.219 vs 1.732; Readex Pro 1.250 vs 1.755). ONE SUB-CLAIM IS FALSE: 'All the families measured set USE_TYPO_METRICS' - Tajawal has OS/2 fsSelection bit 7 CLEAR (so does Roboto). Tajawal is the lightest recommended Arabic face, so the exception lands on a font the doc actively promotes. Also the 1.39-2.17em range understates the top: Amiri measures 2.760em and Noto Naskh Arabic 2.039em, both absent from the table.

Corrected: Arabic ink extents measure 1.39-2.76em against Latin's 1.20-1.43em (Amiri 2.760, Noto Sans Arabic 2.169, Noto Kufi Arabic 2.157, Noto Naskh Arabic 2.039, Cairo 1.883, Readex Pro 1.755, Alexandria 1.732, IBM Plex Sans Arabic 1.729, Almarai 1.561, Rubik 1.532, Tajawal 1.391; Inter 1.430, Roboto 1.200). Almarai, Alexandria and Readex Pro ship default line boxes smaller than their own ink. Most of these families set USE_TYPO_METRICS so browsers use sTypo values - but check per family, because Tajawal does not.

### PARTIALLY_TRUE — IBM Plex Sans Arabic: Latin x 0.516, n 0.528, H 0.698, p -0.200; Arabic ha 0.411 (20% under x-height), ya -0.440 (2.2x deeper); lam 0.98, ya 0.919, ayn 0.909; Cairo behaves the same

Every IBM Plex number reproduces exactly via fontTools BoundsPen against the live woff2: x 0.516, n 0.528, H 0.698, p ymin -0.200; ha ymax 0.411 (0.411/0.516 = 20.3% shorter - the 20% figure is right), ya ymin -0.440 (2.2x the 0.200 Latin descender), lam 0.98, ya 0.919, ayn 0.909. Cairo's descender reproduces (ya -0.43) and ha is 0.5em as stated. BUT 'Cairo behaves the same way' is wrong on the load-bearing half: Cairo's Latin x-height is ALSO 0.500em, so Cairo shows a 0% baseline-letter shortfall, not 20%. The x-height gap is family-specific and must be measured per family; only the descender-depth problem is common to both.

Corrected: In IBM Plex Sans Arabic the Arabic baseline letter ha is 0.411em against the family's own Latin x-height of 0.516em - 20% shorter - while Arabic descenders reach -0.440em, 2.2x deeper than Latin p at -0.200em. The descender problem generalises (Cairo ya reaches -0.430em against p at -0.221em) but the x-height shortfall does NOT: Cairo's ha is 0.500em and its Latin x-height is also 0.500em. Measure the shortfall per family rather than assuming it.

### CONFIRMED — Arabic has no case; letter-spacing must be zero per ALReq; transparency exposes overlapping joinings; underlines collide with diacritics

All ALReq quotes verified verbatim in the Group Draft Note dated 02 October 2025: 'Moving two joined characters closer to or further from each other creates undesirable results'; 'Making each letter transparent can expose these overlapping joinings, which should be avoided'; styling a single letter 'should not break the letter's joining with its neighbors'. The document's actual title is 'Arabic & Persian Layout Requirements' (the doc calls it 'Arabic Layout Requirements'); trivial. Note the cited RTL Styling 101 is from 18 January 2020 - the author's own staleness flag on its browser-support claims is appropriate and should be kept. https://www.w3.org/TR/alreq/

### PARTIALLY_TRUE — Two Arabic families ship variable axes with no Latin equivalent: Readex Pro HEXP 0-100 'Hyper Expansion', Cairo slnt -11..+11 'Slant'

Axis data reproduces exactly from the google/fonts TTFs: ReadexPro[HEXP,wght] has wght 160/400/700 and HEXP 0/0/100 named 'Hyper Expansion'; Cairo[slnt,wght] has wght 200/400/1000 and slnt -11/0/+11 named 'Slant'. The framing is wrong: `slnt` is a REGISTERED OpenType axis in wide use on Latin faces (Inter ships slnt), so Cairo's slant has an obvious Latin equivalent. Only HEXP is genuinely Arabic-specific. Next.js font-data also shows Noto Sans Arabic carrying `wdth`, another standard Latin axis. Kashida quotes from ALReq verified verbatim, including 'Excessive use of kashida or applying very long kashidas results in uneven color.'

Corrected: One Google-hosted Arabic family ships a genuinely Arabic-specific variable axis: Readex Pro's HEXP 0-100 'Hyper Expansion'. Cairo exposes slnt -11 to +11 ('Slant') and Noto Sans Arabic exposes wdth, but both are registered axes common on Latin faces, not Arabic-specific design moves. Separately ALReq describes kashida (tatweel) as 'an interesting tool for paragraph justification' while warning that excessive or very long kashidas produce uneven colour.

### PARTIALLY_TRUE — Arabic webfont byte sizes (Tajawal 8,916 to Noto Sans Arabic 166,152); Latin subsets much smaller; all twelve families are OFL

Every single byte figure reproduces exactly via HTTP against the gstatic URLs from the CSS2 API: Tajawal 8,916; Almarai 18,216; Readex Pro 22,764; Cairo 30,712; Alexandria 31,188; Rubik 32,480; IBM Plex Sans Arabic 33,512; Noto Naskh Arabic 93,960; Amiri 108,492; Noto Kufi Arabic 123,796; Noto Sans Arabic 166,152. All twelve METADATA.pb files return HTTP 200 under ofl/ with license:"OFL". Latin comparators confirmed: IBM Plex latin 13,944 and Almarai latin 9,524. BUT the generalisation 'the Latin subsets are much smaller' is refuted by the same method on other families in the same list: Tajawal latin is 10,228 B against arabic 8,916 B, and Cairo latin is 33,644 B against arabic 30,712 B - Latin is LARGER in both. The two supporting examples were cherry-picked.

Corrected: Arabic webfont weight is affordable if chosen deliberately: arabic-subset woff2 runs from Tajawal 8,916 B and Almarai 18,216 B through Cairo 30,712 B and IBM Plex Sans Arabic 33,512 B up to Amiri 108,492 B and Noto Sans Arabic 166,152 B; all twelve families are SIL OFL. Arabic subsets are not reliably heavier than Latin ones - IBM Plex ships 33,512 B arabic vs 13,944 B latin, but Tajawal ships 8,916 B arabic vs 10,228 B latin and Cairo 30,712 B vs 33,644 B. Measure per family.

### CONFIRMED — next/font/google supports Arabic subsets broadly but adjustFontFallback is Latin-only; font-size-adjust Baseline July 2024

Downloaded Next.js 16.3.2's bundled font-data.json (488 KB, 1,942 families, 56 carrying an 'arabic' subset). Every listed family checks out: IBM Plex Sans Arabic subsets [arabic, cyrillic-ext, latin, latin-ext] with weights 100-700 and no axes; Cairo axes [slnt, wght]; Readex Pro axes [HEXP, wght]; Alexandria, Noto Sans Arabic (axes wdth+wght), Noto Kufi Arabic, Rubik, Amiri, Kufam, Tajawal, Almarai all list arabic. Docs verbatim: next/font/local adjustFontFallback takes 'Arial', 'Times New Roman' or false (default 'Arial'); next/font/google takes a boolean (default true). Version 16.3.2, lastUpdated 2025-08-06. font-size-adjust Baseline 2024 newly available since July 2024, confirmed. Two refinements: MDN lists FIVE metric keywords (ex-height, cap-height, ch-width, ic-width, ic-height), not three - and crucially none of them is Arabic-aware, so font-size-adjust cannot correct the measured Arabic baseline-letter shortfall. https://nextjs.org/docs/app/api-reference/components/font

### CONFIRMED — Next.js App Router i18n shape is settled (app/[lang], negotiator, generateStaticParams, server-only, next/root-params); next-intl's guide omits html lang/dir

Next.js docs verified at version 16.3.2, lastUpdated 2026-06-10. Every element is present verbatim: nesting under app/[lang], @formatjs/intl-localematcher + Negotiator in proxy.js, redirect from Proxy, generateStaticParams in the root layout, import 'server-only' in dictionaries.ts, and next/root-params to read lang without prop-drilling. The author UNDERSTATED the finding: Next.js's OWN root-layout example renders <html lang={(await params).lang}> with NO dir attribute at all. The omission is not specific to next-intl - it is in the official Next.js guide too, which makes the point considerably stronger. https://nextjs.org/docs/app/guides/internationalization

### CONFIRMED — Google requires bidirectional hreflang, absolute URLs, language+region, x-default; doesn't use hreflang/lang to detect language; advises against auto-redirect

Every quote verified verbatim with matching dates. Localized-versions page (last updated 2025-12-22): 'If two pages don't both point to each other, the tags will be ignored'; alternate URLs 'must be fully-qualified, including the transport method (http/https)'; 'You can't specify the country code by itself'; x-default 'is used when no other language/region matches the user's browser setting'; 'Google doesn't use hreflang or the HTML lang attribute to detect the language of a page.' Multi-regional page (last updated 2025-12-10): 'Avoid automatically redirecting users from one language version of a site to a different language version of a site', gTLD subdirectories listed as 'Easy to set up' / 'Low maintenance (same host)', and 'We don't use any code-level language information such as lang attributes, or the URL.' This claim is airtight.

### PARTIALLY_TRUE — Flags cannot represent languages; NN/g reaches the same conclusion but criticises flag-only icons rather than flags outright

The NN/g article is real and correctly attributed (Feifei Liu, 27 March 2022), and the author's caveat is honest. Verified: autonyms recommended ('English should always be listed as English, rather than Ingles'), placement in the top corners on desktop and in the menu on mobile, and Tip 6 'Allow users to change language, country, and currency separately'. But the tension is sharper than the claim admits: NN/g does not merely tolerate flags, it AFFIRMATIVELY RECOMMENDS adding one - 'show additional visual indicators such as the country's national flag or its currency symbol... they help' with discoverability. So the headline 'flags cannot represent languages' is carried by flagsarenotlanguages.com, an advocacy site, not by the research citation, which points the other way. The Intl.DisplayNames autonym output I did reproduce. Present the no-flags call as a defensible design judgement for a pan-Arab audience, not as an NN/g finding.

### CONFIRMED — WCAG 2.2 SC 3.1.2 Language of Parts (AA) requires programmatically determinable language per passage; H58 is sufficient

Verified verbatim at the W3C Understanding document, Level AA: 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.' The Understanding text confirms both rationales - 'Visual browsers can display characters and scripts in appropriate ways' and that an unmarked synthesiser 'will try its best to speak the words in the default language it works in'. H58 is listed under Sufficient Techniques. https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html

### CONFIRMED — encodeURIComponent of an 18-char Arabic slug yields 98 chars, 5.44x expansion vs 1.00x for 'maldives-packages'

Reproduced exactly: the 18-character string encodes to 98 characters, ratio 5.444; 'maldives-packages' is 17 characters and encodes unchanged. Mechanism is right (each Arabic code point is 2 UTF-8 bytes, 6 percent-encoded characters, and the two ASCII hyphens pass through: 16 x 6 + 2 = 98). The word 'catastrophically' is the author's editorialising - browsers display percent-encoded Arabic decoded in the address bar, so the cost is real for raw copy-paste and analytics but not for what the user sees.

### PARTIALLY_TRUE — W3Techs 22 Aug 2026: English 49.5%, Arabic 0.6%; GMI UAE 10.14M users, 99.00% penetration, 8h11m, 75.30% mobile

Both sources quoted accurately. W3Techs reproduces exactly at survey date 22 August 2026 - English 49.5%, Spanish 6.0%, German 5.9%, Japanese 4.9%, French 4.5%, Arabic 0.6% - and the denominator caveat is correctly stated ('websites whose content language we know'). GMI reproduces exactly at last-updated 1 April 2024. The problem is inferential, not factual: W3Techs counts WEBSITES within its own crawl frame, so it measures supply and cannot support a claim about Arabic speakers, traffic, or demand. And GMI's 99.00% penetration is a republished secondary figure that implies near-universal use including children; it is directional colour, not a planning input. The author's own flag on GMI is right and should be kept, with the same flag extended to the W3Techs inference.

### PARTIALLY_TRUE — Font fallback resolves per character; Microsoft says one set of vertical metrics across scripts is hard; list the Arabic face before the Latin face

The Microsoft quote is verbatim (ms.date 2023-10-31, updated 2023-11-20): 'it's difficult to do a good job of making fonts with glyphs for different scripts such that all conform to one set of vertical metrics.' The three guidelines are verbatim too: 'Don't hardcode font face names', 'Avoid having font names as part of localizable resources', 'Ensure that the font size is dynamic according to the script to be displayed'. But the two cited sources CONFLICT on the ordering rule and the author presents them as agreeing: Microsoft's own worked CSS example is described as one 'which lists the Latin fonts first'. RTL Styling 101's Arabic-first ordering is defensible for the stated goal (winning shared digits and punctuation for the Arabic face) but it is the author's call, not Microsoft's advice. Also 'per character, not per string' is correct CSS font-matching behaviour but is not stated on the cited Microsoft page. https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts

### CONFIRMED — Stable consensus on what mirrors vs not; Android autoMirrored 'only works for simple drawables whose bidirectional mirroring is simply a graphical mirroring of the entire drawable'

I was hostile to this attributed quote and it survived - it is verbatim at the exact cited URL: 'The android:autoMirrored attribute only works for simple drawables whose bidirectional mirroring is simply a graphical mirroring of the entire drawable. If your drawable contains multiple elements, or if reflecting your drawable changes its interpretation, you can perform the mirroring yourself. Whenever possible, check with a bidirectional expert...' (also: requires API 19+). The author's staleness flag on the 2017 Smashing and 2020 RTL Styling sources is appropriate; the taxonomy itself is repeated in current Android docs. Bonus the author missed on this same page: BidiFormatter.unicodeWrap() is Android's documented tool for the mixed-content problem. https://developer.android.com/training/basics/supporting-devices/languages

### CONFIRMED — Bootstrap ships RTL as experimental: RTLCSS build, lang+dir starter, /*rtl:*/ escape hatches, ~20-30% combined size increase, form-validation-state mixin breakage

Every element verified verbatim on the Bootstrap 5.3 RTL page: 'Bootstrap's RTL feature is still experimental'; RTLCSS credited as powering the approach; bootstrap.rtl.min.css on the CDN; <html lang="ar" dir="rtl"> starter; '$font-weight-bold: 700 #{/* rtl:600 */} !default;'; and under 'Edge cases and known limitations' - 'Having a single bundle with both directions will increase the size of the final stylesheet (on average, by 20%-30%)' and 'Nesting styles this way will prevent our form-validation-state() mixin from working as intended' (issue #31223). I checked for staleness: Bootstrap 5.3.8 (25 Aug 2025) is still the current stable release as of August 2026 and Bootstrap 6 has no release date, so citing 5.3 docs is correct, not out of date. Precision note: both the 20-30% figure and the mixin breakage are scoped to the combined LTR+RTL nested build, which the claim does state. https://getbootstrap.com/docs/5.3/getting-started/rtl/

### Corrections applied

- Claim 1 browser support: full CSS Logical Properties support is Chrome/Edge 89, Firefox 66, Safari 15 (per caniuse), and border-start-start-radius is Baseline widely available since September 2021 - NOT Chrome 69 / Firefox 68 / Safari 12.1.
- Claim 1 attribution: drop 'MDN explicitly warns against mixing physical and logical properties on the same element.' No such warning exists on the cited module page, on Basic_concepts, or on the Guides page. State the narrower real risk in your own voice: setting the same dimension both ways on one element (width and inline-size) is a last-declaration-wins collision, so pick one system per dimension.
- Claim 10 Hijri numbers: on ICU 78.2 at 2026-08-22, islamic-umalqura and islamic-tbla give 9 Rabi al-Awwal 1448, islamic-civil gives 8 (one day earlier, not two), and islamic gives 10. Over 2,000 consecutive days islamic-tbla minus islamic-civil is exactly 1 day, so the published umalqura=tbla=9 with civil=7 is arithmetically impossible. The surviving point is stronger than the original: one instant yields three different Hijri dates, and ar-SA still defaults to gregory.
- Claim 11 USE_TYPO_METRICS: 'All the families measured set USE_TYPO_METRICS' is false. Tajawal has OS/2 fsSelection bit 7 clear (as does Roboto). Check the flag per family - the exception lands on the lightest recommended Arabic face.
- Claim 11 ink range: the range is 1.39-2.76em, not 1.39-2.17em. Amiri measures 2.760em and Noto Naskh Arabic 2.039em; both were omitted from the table and Amiri is the widest face measured.
- Claim 12 Cairo: 'Cairo behaves the same way' is wrong on the x-height half. Cairo's Arabic ha is 0.500em and Cairo's Latin x-height is also 0.500em - a 0% shortfall, not 20%. Only the descender-depth problem generalises. The x-height shortfall must be measured per family.
- Claim 14 axis novelty: only Readex Pro's HEXP is a genuinely Arabic-specific axis. Cairo's slnt is a registered OpenType axis in wide use on Latin faces (Inter ships slnt), and Noto Sans Arabic carries wdth, likewise standard.
- Claim 15 Latin-vs-Arabic weight: 'the Latin subsets are much smaller' does not generalise. Tajawal latin is 10,228 B against arabic 8,916 B, and Cairo latin is 33,644 B against arabic 30,712 B - Latin is larger in both. Only IBM Plex and Almarai support the original framing.
- Claim 16 font-size-adjust: MDN lists five metric keywords (ex-height, cap-height, ch-width, ic-width, ic-height), not three - and none is Arabic-aware, so font-size-adjust cannot correct the measured Arabic baseline-letter shortfall. Use per-script font-size, or size-adjust / ascent-override / descent-override descriptors on @font-face.
- Claim 17 html dir omission: the omission is not specific to next-intl. Next.js's own official i18n guide renders <html lang={(await params).lang}> with no dir attribute either. Attribute it to both.
- Claim 19 flags: NN/g does not merely tolerate flags, it affirmatively recommends adding one alongside the autonym for discoverability. Present the no-flags position as a defensible design judgement for a pan-Arab audience, not as an NN/g research finding.
- Claim 22 inference: W3Techs counts websites within its own crawl frame, so 0.6% is a supply statistic and cannot support a claim about Arabic speakers, traffic, or demand. Extend the author's GMI staleness flag to the W3Techs inference as well.
- Claim 23 ordering rule: the two cited sources conflict. Microsoft's own worked example is described as one 'which lists the Latin fonts first'. Arabic-first ordering is a defensible authorial call for winning shared digits and punctuation, not Microsoft's advice - attribute it accordingly.
- Claim 7 month names: CLDR encodes at least four Arabic month-name systems, not two. Add the Moroccan set (ar-MA: yulyuz, ghusht, shutanbir, nunbir, dujanbir) and the French-derived Tunisian/Algerian set (ar-TN, ar-DZ: janfi, fifri, afril, juan, juiliya, ut). Also ar-JO and ar-IQ sit on the Levantine side, so 'Gulf vs Levant' mislabels the split.
- Claim 6 corroboration: ALReq's east/west geography does not explain CLDR's ar-AE = latn (the UAE is an eastern Arab state, and it is the most important locale for a Gulf travel site). Cite the CLDR measurement for ar-AE, not ALReq.

### Flagged as not covered

- Arabic search normalisation - the single biggest functional gap for a travel site. Nothing on folding alef variants (أ إ آ ا), ta marbuta (ة/ه), alef maqsura (ى/ي), stripping tatweel U+0640 and harakat, or on Intl.Collator('ar') and its sensitivity options. A destination search box that does not fold these will fail on most real queries.
- Form and input direction. The W3C page the researcher cited (qa-html-dir) explicitly recommends dir="auto" on forms and dynamically inserted content, and the `dirname` attribute to transmit the user's direction to the server. Both were read past. For a booking form with free-text name and address fields this is the highest-frequency bidi surface in the product.
- Bidi in the specific data a travel app carries: phone numbers, IBANs, booking references, PNRs, flight numbers, times and date ranges. These are exactly the neutral-and-weak-character strings the cited W3C failure list predicts will garble, and none is worked through. Also missing: `unicode-bidi: plaintext`, and Android's BidiFormatter.unicodeWrap(), documented on a page the researcher already fetched.
- What logical properties do NOT solve. No mention of scrollLeft sign inversion in RTL, scroll-snap and carousel direction, flex/grid `order`, `background-position` percentages, or the fact that `transform: translateX()` does not flip — RTLCSS flips the declaration but a JS-driven hero slider or animated drawer will still run backwards. Hero carousels are near-universal on travel sites.
- Tailwind v4.3 deprecated the `start-*` / `end-*` helpers in favour of `inset-s-*` / `inset-e-*`. Directly actionable for the stack the doc assumes, and current as of the version cited.
- The actual lever for the measured metric mismatch: `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` descriptors on @font-face (and Next.js's `declarations` option for next/font/local, which the fetched docs show accepting exactly these). The doc diagnoses the metric problem precisely and then offers no mechanism to correct it.
- How to set `dir` on <html> when the locale is only known per-request in a statically rendered route — the practical follow-through on the finding that both Next.js and next-intl omit it.
- Business-side evidence is entirely absent. W3Techs' 0.6% is a supply statistic about websites; there is no demand-side figure — Arabic online travel market size, GCC booking behaviour, or any conversion evidence for localisation. The dimension's central commercial claim ('no template does this') is unevidenced.
- Third-party embed RTL behaviour, which is where real Arabic travel sites break: map widgets, date-range pickers, and hosted payment iframes (Stripe/Checkout.com Arabic locale coverage). A perfect first-party RTL shell around an LTR-only date picker is still a broken booking flow.
- Hijri as travel demand, not just as a date format. Ramadan and Eid drive Gulf travel seasonality and pricing; Saudi and UAE school calendars shift package demand. The weekend finding (SA Fri–Sat vs AE Sat–Sun) is surfaced but never connected to date-picker defaults, 'weekend break' package definitions, or default check-in days.
- Arabic type in the brand register the client will actually ask for: Amiri (2.760em ink, 108,492 B) and Noto Naskh Arabic (2.039em) are the classic Naskh faces for heritage/luxury travel branding and are missing from the ink table despite appearing in the byte-size table.
- Numeral-system override as a product decision. The doc establishes that ar-AE defaults to Latin digits and ar-EG to Arabic-Indic, but never addresses whether prices, flight numbers and seat rows should follow the locale default or be pinned via -u-nu-latn — a real call, since Arabic-Indic digits in a PNR are widely disliked even by users who want Arabic-Indic prices.

## Sources

- [CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) · MDN Web Docs (Mozilla)  
  Complete physical→logical property mapping, block/inline axis definitions under direction:rtl, properties with no logical equivalent (float/clear/text-align accept flow-relative values), the explicit warning against mixing physical and logical properties, and Baseline browser support.
- [Structural markup and right-to-left text in HTML](https://www.w3.org/International/questions/qa-html-dir) · W3C Internationalization  
  Base direction belongs in markup, not CSS ('Do not use CSS to apply base direction in HTML pages'); dir=rtl on <html>; dir on a block only to change base direction; dir=auto semantics.
- [Inline markup and bidirectional text in HTML](https://www.w3.org/International/articles/inline-bidi-markup/) · W3C Internationalization  
  The exact conditions under which the bidi algorithm breaks; bdi and dir=auto as the isolation fix; U+2066/2067/2068/2069 isolate characters and why the older U+202A/B/C embedding characters should be avoided; the number-spillover, phone-number and price cases; automatic mirroring of parentheses and brackets.
- [unicode-bidi (CSS)](https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi) · MDN Web Docs · Baseline since July 2015  
  All six values (normal, embed, isolate, bidi-override, isolate-override, plaintext), interaction with the direction property, and MDN's guidance that authors should prefer semantic markup over overriding it.
- [<bdi>: The Bidirectional Isolate element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi) · MDN Web Docs · Baseline widely available since January 2020  
  bdi semantics, equivalence to unicode-bidi: isolate, default dir=auto behaviour, and the canonical user-generated-name failure ('1 - <name>st place').
- [:dir() CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) · MDN Web Docs · Baseline widely available since December 2023  
  Why :dir() beats [dir=rtl] attribute selectors — it matches the user-agent-computed direction including inherited values and resolved dir=auto.
- [dir global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir) · MDN Web Docs  
  dir values and inheritance, the first-strong-character algorithm behind dir=auto and the warning to use it only for unknown-directionality data, why the attribute is preferred over CSS, and dir behaviour on tables and inputs.
- [Requirements for Arabic Text Layout (ALReq)](https://www.w3.org/TR/alreq/) · W3C Group Draft Note · 2025-10-02  
  Kashida/tatweel justification and its limits; why letter-spacing is wrong for cursive Arabic; Arabic ascenders and descenders extending much further than Latin; numeral systems by region (European in Morocco/Algeria, Arabic-Indic in Egypt/Saudi/Iraq); warnings on transparency exposing letter joins and on styling single letters.
- [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling) · Ahmad Shadeed · 2020-01-18  
  The mirror/no-mirror icon taxonomy, letter-spacing:0, RGBa/opacity artefacts on Arabic, underline vs diacritics and the box-shadow fallback, font-family ordering with the Arabic face first, transform flipping, and directionally-neutral class naming. FLAGGED as pre-2023: its browser-support and tooling claims are stale, its typographic rules are not.
- [Right-To-Left Mobile Design](https://www.smashingmagazine.com/2017/11/right-to-left-mobile-design/) · Smashing Magazine (Robert Dodis, Yvette Mosiichuk) · 2017-11-06  
  Independent corroboration of the mirroring taxonomy: mirror directional icons, do not mirror media controls or symmetrical icons, and 'the order of digits in numbers should not be changed for RTL'. FLAGGED as substantially older than 2023.
- [Language and locale resolution overview / RTL support](https://developer.android.com/training/basics/supporting-devices/languages) · Android Developers (Google)  
  start/end vs left/right attribute mapping and android:autoMirrored, including the caveat that automatic mirroring only works for drawables whose meaning survives a whole-image reflection.
- [RTL — Bootstrap 5.3 getting started](https://getbootstrap.com/docs/5.3/getting-started/rtl/) · Bootstrap  
  The dual-stylesheet/RTLCSS approach and its documented costs (experimental status, ~20–30% combined size increase, form-validation-state mixin breakage), the required lang+dir on <html>, and the /*rtl:*/ value and font-stack directives. Used as the counter-example to a logical-properties-first build.
- [rtlcss plugin source (lib/plugin.js)](https://raw.githubusercontent.com/MohammadYounes/rtlcss/master/lib/plugin.js) · RTLCSS (Mohammad Younes)  
  Machine-readable, authoritative enumeration of exactly which CSS properties and values must flip in RTL — the basis for the code-review checklist, including shadows, transforms, transform-origin, background-position and cursor, which logical properties do not cover.
- [Hover, focus, and other states — RTL support](https://tailwindcss.com/docs/hover-focus-and-other-states) · Tailwind CSS · v4.3 docs  
  The rtl:/ltr: variants and the exact selector they compile to — &:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) — which fixes the styling strategy for the likely stack.
- [Internationalization — Next.js App Router guide](https://nextjs.org/docs/app/guides/internationalization) · Vercel / Next.js · version 16.3.2, lastUpdated 2026-06-10  
  app/[lang] segment, Proxy/middleware locale negotiation with @formatjs/intl-localematcher and negotiator, server-only dictionaries, generateStaticParams for per-locale static rendering, and next/root-params for reading the locale without prop-drilling.
- [next-intl — App Router with i18n routing](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) · next-intl  
  defineRouting, createMiddleware, createNavigation, getRequestConfig and hasLocale setup — and the observed omission of html lang/dir from the documented root layout, which is the layout-shift trap.
- [Font Module (next/font) API reference](https://nextjs.org/docs/app/api-reference/components/font) · Vercel / Next.js · version 16.3.2, lastUpdated 2025-08-06  
  subsets/axes/display/preload/variable/declarations options, and the critical limitation that adjustFontFallback offers only 'Arial' or 'Times New Roman' — Latin metrics — making Arabic CLS an explicit manual job.
- [next/font bundled Google font metadata (font-data.json)](https://unpkg.com/next@16.3.2/dist/compiled/@next/font/dist/google/font-data.json) · Vercel / Next.js 16.3.2  
  Verified that subsets:['arabic'] is valid for IBM Plex Sans Arabic, Cairo, Tajawal, Almarai, Readex Pro, Alexandria, Noto Sans Arabic, Noto Kufi Arabic, Rubik, Amiri and Kufam — and that IBM Plex Sans Arabic has no variable version on Google Fonts.
- [Google Fonts CSS2 API and gstatic woff2 files](https://fonts.googleapis.com/css2) · Google Fonts  
  The arabic subset unicode-range, and (via HTTP HEAD on the served woff2 files, measured 2026-08-22) the byte sizes used in the font-cost finding: Tajawal 8,916 B, Almarai 18,216 B, Readex Pro VF 22,764 B, Cairo VF 30,712 B, Alexandria VF 31,188 B, Rubik VF 32,480 B, IBM Plex Sans Arabic 33,512 B, Noto Naskh 93,960 B, Amiri 108,492 B, Noto Kufi VF 123,796 B, Noto Sans Arabic VF 166,152 B.
- [google/fonts repository — OFL family metadata](https://github.com/google/fonts/tree/main/ofl) · Google Fonts  
  SIL Open Font License confirmed for ibmplexsansarabic, cairo, tajawal, almarai, readexpro, alexandria, notosansarabic, notonaskharabic, notokufiarabic, amiri, rubik, kufam (HTTP 200 on ofl/<family>/METADATA.pb); IBM Plex Sans Arabic designers and 2021-06-17 date_added; and the fvar axes read from ReadexPro[HEXP,wght].ttf (HEXP 0–100 'Hyper Expansion') and Cairo[slnt,wght].ttf (slnt −11..+11).
- [font-size-adjust (CSS)](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust) · MDN Web Docs · Baseline 2024 newly available since July 2024  
  Two-value syntax (ex-height / cap-height / ch-width / ic-width, plus from-font) for normalising fallback-font size — one of the two available mitigations for Arabic webfont swap CLS.
- [Intl.DateTimeFormat() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) · MDN Web Docs  
  The calendar and numberingSystem options, the Unicode extension keys ca and nu, and the precedence rule that options win over locale-string extensions — the mechanism behind the Hijri and digit-system findings measured locally on ICU 78.2.
- [Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions) · Google Search Central · 2025-12-22  
  hreflang must be reciprocal or it is ignored; absolute URLs; language+region code rules; x-default; and the statement that Google uses neither hreflang nor the html lang attribute to detect page language.
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) · Google Search Central · 2025-12-10  
  ccTLD vs subdomain vs subdirectory tradeoffs (subdirectory: simple, low maintenance); the explicit instruction to avoid automatic language redirection; the recommendation to use hyperlinked language selectors instead; and the warning about boilerplate-only translation.
- [6 Tips for Improving Language Switchers on Ecommerce Sites](https://www.nngroup.com/articles/language-switching-ecommerce/) · Nielsen Norman Group (Feifei Liu) · 2022-03-27  
  Switcher placement (desktop top corners, mobile above the fold or in the hamburger), autonym labelling, independent adjustment of language / country / currency, and the nuanced position that flag-only icons are the failure mode rather than flags as such.
- [Why flags do not represent language](https://flagsarenotlanguages.com/blog/why-flags-do-not-represent-language/) · flagsarenotlanguages.com  
  The cross-border argument against flags as language symbols, with Arabic named among the languages this breaks for, and autonyms as the recommended alternative.
- [Understanding SC 3.1.2: Language of Parts (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) · W3C WAI, WCAG 2.2  
  The exact AA requirement that each passage's language be programmatically determinable, technique H58, and the note that language marking lets browsers display scripts appropriately when switching between LTR and RTL.
- [Customize font selection with font fallback and font linking](https://learn.microsoft.com/en-us/globalization/fonts-layout/fonts) · Microsoft Learn (Globalization) · ms.date 2023-10-31, updated 2023-11-20  
  That cross-script fonts rarely share one set of vertical metrics; the guidance to make font size dynamic per script; not hardcoding or localising face names; and the warning that large-glyph fonts are costly on mobile.
- [Text layout — Globalization](https://learn.microsoft.com/en-us/globalization/fonts-layout/text-layout) · Microsoft Learn (Globalization) · ms.date 2023-10-31, updated 2024-02-02  
  Arabic contextual shaping (initial/medial/final forms), the lam-alef ligature, and why naive per-character text handling breaks Arabic rendering.
- [Usage statistics of content languages for websites](https://w3techs.com/technologies/overview/content_language) · W3Techs · survey dated 2026-08-22  
  English at 49.5% of websites with a known content language versus Arabic at 0.6% — the supply-side argument for Arabic-first as a differentiation strategy.
- [UAE Internet Statistics](https://blog.globalmediainsight.com/uae-internet-statistics/) · Global Media Insight · last updated 2024-04-01  
  10.14 million UAE internet users at 99.00% penetration, 8h11m average daily internet time, and 75.30% of web traffic from mobile phones. FLAGGED: secondary aggregator, roughly two years old; treat as directional.
- [Setting language preferences in a browser](https://www.w3.org/International/questions/qa-lang-priorities) · W3C Internationalization  
  That Accept-Language is an unreliable basis for automatic language selection, that some servers use IP instead, and the fallback-tag ordering rule (fr-CH followed by fr).
- [Internationalization — Learn Responsive Design](https://web.dev/learn/design/internationalization) · web.dev (Chrome team) · 2021-11-03  
  Logical-property framing, dir on <html> as a way to test RTL without translating, line-height that prevents accent/diacritic overlap, choosing web fonts with the right character ranges, and lang/hreflang markup. FLAGGED as pre-2023.
