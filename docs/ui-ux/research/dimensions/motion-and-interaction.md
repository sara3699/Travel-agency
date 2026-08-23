# Motion and interaction design

Dimension `motion-and-interaction` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Motion is the cheapest thing to add and the most expensive to get wrong. The premium-agency look is available off the shelf — framer-motion pulled 178.3M npm downloads in the month to 2026-08-21, embla-carousel-react 148.8M, three.js 57.2M, GSAP 18.6M, and GSAP has been free for all commercial use since April 2025 under Webflow's ownership. Read those as toolchain ubiquity, not site adoption: npm counts are dominated by CI installs and transitive dependencies. The sharper evidence for a house style is Codrops, where six of the ten most recent posts (2026-08-10 to 2026-08-22) are Three.js/WebGL/WebGPU shader pieces. Differentiation cannot come from having motion; it has to come from one motion idea tied to what a travel package is.

Two platform shifts are real. The browser now does the expensive parts: scroll-driven animations shipped in Safari 26 and iOS 26 on 2025-09-15 alongside Chrome 115, and same-document View Transitions reached Baseline newly available on 2025-10-14. Firefox remains the holdout on scroll timelines — implemented but flag-gated in stable through Firefox 152 — so plan an explicit fallback. The audience mix makes this usable: Saudi mobile is 45.96% Safari and 50.12% iOS, with iOS 26.x at roughly 68% (a floor, since StatCounter flags a version-misreporting correction). UAE inverts to 73.44% Chrome and 77.82% Android, so the two markets need different assumptions.

The research is unambiguous that decorative motion costs. NN/g found the majority of scrolljacking participants at least mildly disoriented, one prospective customer saying he would "get severely agitated and just move on," and recommends avoiding scrolljacking on mobile entirely — which is 65.43% of Saudi traffic. Scroll fades belong in a 100–400ms band, animate once, one element type at a time, and read as too slow past 500ms.

The strategy holds: one signature interaction at browser-native quality, placed at the emotional peak, everything else a disciplined token set of functional transitions — but instrumented, with CLS and INP measured, not asserted.

## Summary as first written, before verification

Motion is the cheapest thing to add and the most expensive thing to get wrong. In 2026 the entire "premium agency site" look is available off the shelf — framer-motion pulled 178M npm downloads in the month to 2026-08-21, three.js 57M, GSAP 18.6M (and GSAP is now free) — which means the default configuration of the default libraries IS the generic look. Differentiation cannot come from having motion; it has to come from having one motion idea that is structurally tied to what a travel package actually is.

Three shifts make 2026 different. First, the browser now does the expensive parts: scroll-driven animations run off the main thread and shipped in Safari 26 (2025-09-15), and same-document View Transitions became Baseline newly available on 2025-10-14. Second, this audience's browser mix makes that usable — Saudi mobile is ~46% Safari and ~50% iOS, with ~68% of Saudi iOS traffic already on iOS 26.x, and Firefox (the one holdout on scroll timelines) is negligible. Third, the research is unambiguous that decorative motion costs money: NN/g's scrolljacking and scroll-fading studies found disorientation, task abandonment, and the illusion of completeness, and both effects get worse on mobile — which is 65% of Saudi traffic.

The strategy that follows: one signature interaction, executed at browser-native quality, placed at the emotional peak (peak–end rule), with everything else reduced to a disciplined token set of 120–320ms functional transitions. Twelve mediocre effects produce a site people bounce from. One well-built one produces a screenshot.

## Findings

### Scroll-driven CSS animations (animation-timeline: scroll() / view()) shipped in Safari 26 and iOS 26 on 2025-09-15, joining Chrome/Edge 115 (2023-07-18); Firefox has not shipped, so the feature is Baseline 'limited'. Chrome telemetry already reports it on ~5.6% of page loads (0.0558 as a fraction; calibration: flexbox = 0.8346).

Confidence: verified · type: constraint

Why it matters here: For a Middle East audience this is effectively shippable today: Firefox share is negligible in Saudi/UAE, so the two engines that matter both support it. It means destination reveals, itinerary progress rails and image parallax can run off the main thread with zero JS, instead of shipping a scroll library.

Evidence: webstatus.dev feature API, feature_id 'scroll-driven-animations' and 'flexbox', accessed 2026-08-22; MDN browser-compat-data css/properties/animation-timeline.json (Chrome 115, Safari 26, Firefox 'preview')

Source: https://api.webstatus.dev/v1/features/scroll-driven-animations

### Same-document View Transitions reached Baseline 'newly available' on 2025-10-14 (Chrome 111 2023-03-07, Safari 18 2024-09-16, Firefox 144 2025-10-14). Cross-document view transitions (@view-transition { navigation: auto }) are still 'limited': Chrome 126 (2024-06-11), Safari 18.2 (2024-12-11), no Firefox. The UA default is a 250ms cross-fade (::view-transition-group(*) { animation-duration: 0.25s; animation-fill-mode: both }).

Confidence: verified · type: constraint

Why it matters here: This is exactly the browse→package flow. A package card's hero image and title can morph into the detail page's hero rather than the page blanking and reloading — the single highest-value, lowest-cost 'expensive feel' available in 2026, and it is not something a template competitor will have configured.

Evidence: webstatus.dev 'view-transitions' and 'cross-document-view-transitions' APIs, accessed 2026-08-22; MDN ::view-transition-group UA stylesheet block

Source: https://api.webstatus.dev/v1/features/view-transitions

### View transitions have hard mechanical constraints: only one transition may run at a time (a new one skips the running one to its end); every participating element needs a UNIQUE view-transition-name or the whole transition is silently skipped; transitions time out after 4 seconds; cross-document transitions are same-origin only; and animating width/height on ::view-transition-group still runs layout per frame (Chrome's off-main-thread optimisation for it is not implemented yet).

Confidence: verified · type: constraint

Why it matters here: A grid of package cards will collide on duplicate names the moment two cards are visible. The build must assign the shared name only to the clicked card (or use view-transition-name: match-element, which is same-document only). Getting this wrong produces a transition that works in dev and silently disappears in production.

Evidence: Chrome for Developers, 'Same-document view transitions for single-page applications' (notes on uniqueness, single-transition rule, layout-per-frame caveat); Chrome for Developers cross-document doc, updated 2024-04-14 (4s timeout, same-origin); MDN view-transition-name (match-element is same-document only)

Source: https://developer.chrome.com/docs/web-platform/view-transitions/same-document

### React's <ViewTransition> component is still Canary/Experimental as of the React 19.2 reference, and React explicitly does NOT disable animations for prefers-reduced-motion — the docs tell you to handle it yourself with the media query.

Confidence: verified · type: constraint

Why it matters here: Next.js App Router navigations are soft (client-side), so the cross-document @view-transition at-rule will not fire for them. The build must either call document.startViewTransition() around the router transition manually, or accept a canary React dependency. This is a real architectural decision that belongs in the master doc, not a detail.

Evidence: react.dev reference for <ViewTransition>, React 19.2 docs, fetched 2026-08-22: marked 'Canary — currently only available in React's Canary and Experimental channels'; note 'Always check prefers-reduced-motion … React doesn't automatically disable animations for this case.'

Source: https://react.dev/reference/react/ViewTransition

### NN/g's usability study of scrolljacking found the majority of participants were at least mildly disoriented; task-oriented users were 'severely agitated'; the worst combination was altered scroll rate/direction plus text the user had to read; and every desktop problem was exacerbated on mobile. Recommended mitigations: only below the fold, never change scroll direction, keep sticky navigation as an escape hatch, include non-scrolljacked sections on the same page.

Confidence: verified · type: principle

Why it matters here: A traveller comparing packages is the definition of a task-oriented user. Scrolljacking on a package listing or pricing page is a direct conversion tax, and 59–65% of this region's traffic is mobile where the effect is worst.

Evidence: Nielsen Norman Group, 'Scrolljacking 101', Sara Paul, 2023-08-06

Source: https://www.nngroup.com/articles/scrolljacking-101/

### NN/g's scroll-fading study gives hard numbers: experiment with fade-in rates between 100–400ms; prior research indicates a scroll-fade animation taking more than 500ms is perceived as too slow and users scroll past before it completes. Animate each element ONCE (element persistence) — non-persistent re-animation frustrated task-oriented users. Fade in only one element type at a time (text OR images, never both) — Apple's page, which alternated, produced the study's best efficiency and comprehension.

Confidence: verified · type: data

Why it matters here: This is the single most copied effect on the web ('fade up on scroll') and almost everyone implements it wrong: too slow, repeating, and text+image together. Getting the numbers right is free differentiation, and it directly protects itinerary content from being skipped.

Evidence: Nielsen Norman Group, 'Scroll Fading 101', Sara Paul, 2023-12-08

Source: https://www.nngroup.com/articles/scroll-fading-101/

### NN/g's homepage guidelines state explicitly: do not animate crucial page elements such as the logo, tagline, or main headline, because 'scroll-triggered text animations delay users'; moving elements are often assumed to be ads; and any autoplaying video with motion beyond five seconds must offer a pause/stop control. They cite Crown's homepage positively for pairing scrolljack effects with a prominent user-facing option to disable the motion.

Confidence: verified · type: principle

Why it matters here: Kills the most common 'premium' opening move — the word-by-word headline reveal — with sourced research rather than taste. And it gives a concrete differentiator: a visible motion toggle in the UI, not just a silent media query.

Evidence: Nielsen Norman Group, 'Homepage Design: 5 Fundamental Principles', 2024-03-15, guideline 5.2 'Minimize motion and animation'

Source: https://www.nngroup.com/articles/homepage-design-principles/

### Duration bands that hold up: ~100ms for simple feedback (toggle, checkbox); 200–300ms for substantial screen changes such as modals; 100–500ms overall depending on complexity and travel distance; at 500ms 'animations start to feel like a real drag'; entering elements need a slightly longer duration than exiting ones (e.g. 300ms in / 200–250ms out). Ease-out is the default recommendation (responsive start, eye can settle on the resting element); ease-in for exits; fully linear motion 'looks weird and unnatural'.

Confidence: verified · type: principle

Why it matters here: This is the entire motion token table, sourced. Note the article is 2020 — flagged as pre-2023 — but it is a perceptual-principle piece, not a trend piece, and NN/g's 2023 scroll-fading study independently lands on the same 100–400ms band.

Evidence: Nielsen Norman Group, 'Executing UX Animations: Duration and Motion Characteristics', Page Laubheimer, 2020-02-09. POTENTIALLY STALE (pre-2023) but corroborated by the 2023 scroll-fading study.

Source: https://www.nngroup.com/articles/animation-duration/

### Interaction responsiveness has two independent budgets that must both be met. Perceptual: 0.1s = feels instantaneous, 1s = flow of thought preserved, 10s = attention lost (Miller 1968, Card 1991, restated by Nielsen). Measured: INP ≤200ms is 'good', >500ms is 'poor', decomposed into input delay, processing duration and presentation delay. The Doherty threshold puts the productivity sweet spot below 400ms.

Confidence: verified · type: principle

Why it matters here: It settles the argument between 'make the transition beautiful' and 'make it fast': a 250ms view transition is inside the flow budget, a 900ms cinematic page wipe is not. It also means any JS scroll handler or heavy animation setup that lands in the input-delay phase is a Core Web Vitals regression, not just a taste issue.

Evidence: NN/g 'Response Times: The 3 Important Limits' (Nielsen, from Usability Engineering 1993, web update 2014 — PRE-2023, principle-level); web.dev 'Interaction to Next Paint (INP)', last updated 2025-09-02; Laws of UX 'Doherty Threshold' citing Doherty & Thadani, IBM 1982 (PRE-2023)

Source: https://web.dev/articles/inp

### Only transform and opacity are safe to animate on the compositor; anything else triggers layout or paint. web.dev's own side-by-side demo shows the version animating `top` dropping roughly 50% of frames, versus roughly 99% of frames retained when the identical movement is expressed as transform. will-change should be applied sparingly and, for occasional animations, added via JS immediately before and removed after.

Confidence: verified · type: principle

Why it matters here: This is the difference between a site that feels expensive on a mid-range Android (77.8% of UAE mobile) and one that stutters. It also constrains the design vocabulary usefully: if the effect can't be expressed in transform + opacity, it probably shouldn't be on the scroll path.

Evidence: web.dev, 'Animations guide' (Chrome team) — 'restrict animations to opacity and transform to keep animations on the compositing stage'; DevTools FPS-meter example showing 50% dropped frames vs 99%

Source: https://web.dev/articles/animations-guide

### Smooth-scroll hijacking has documented, specific costs. Lenis is only ~5.5KB gzipped and honours prefers-reduced-motion by default (lerp forced to 1, programmatic scrolls jump instantly), but its own README lists: no support for CSS scroll-snap (you must use its snap plugin), capped to 60fps on Safari (WebKit bug 173434) and 30fps in low power mode, anchor links disabled unless you opt in, and nested scrollers needing per-node opt-outs. GSAP ScrollTrigger, by contrast, states it does 'no scroll-jacking' and composes with native CSS scroll snapping.

Confidence: verified · type: constraint

Why it matters here: The '60fps on Safari, 30fps in low power mode' cap is decisive for this audience: Safari is ~46% of Saudi mobile browsing, and low power mode is common on a phone used for travel research. Smooth-scroll would make the site feel WORSE for half of Saudi mobile users than doing nothing at all.

Evidence: Lenis README (darkroomengineering/lenis, main branch, fetched 2026-08-22), 'Reduced motion' and 'Limitations' sections; GSAP ScrollTrigger docs, 'No scroll-jacking'; bundlephobia API: lenis 1.3.26 = 18,816B min / 5,473B gzip

Source: https://github.com/darkroomengineering/lenis

### Real transfer weights for the 3D/motion decision (bundlephobia, 2026-08-22, gzipped): three 178KB; globe.gl 506KB; @react-three/drei 500KB; @react-three/fiber 51.8KB (on top of three); mapbox-gl 499KB vs maplibre-gl 256KB; cobe (WebGL globe) 5.9KB; motion package main entry 45KB, but Motion's own docs put `m` + LazyMotion at 4.6KB for initial render, +15KB domAnimation / +25KB domMax, and useAnimate 'mini' (WAAPI-only) at 2.3KB; gsap core 27KB; embla-carousel 6.9KB.

Confidence: verified · type: data

Why it matters here: A rotating globe is the single most predictable idea for a travel site, and the naive implementation (three + globe.gl or drei) costs 0.5MB gzipped before a single destination photo loads. cobe delivers a credible interactive globe for 5.9KB — a 85x difference. This turns 'should we do 3D' from a taste argument into a budget line.

Evidence: bundlephobia.com size API for three@0.185.1, globe.gl@2.46.1, @react-three/drei@10.7.8, @react-three/fiber@9.7.0, mapbox-gl@3.29.0, maplibre-gl@6.5.0, cobe@2.0.1, gsap, motion, embla-carousel, lenis@1.3.26 — all queried 2026-08-22; motion.dev 'Reduce bundle size' guide for the 4.6KB / 2.3KB figures

Source: https://bundlephobia.com/api/size?package=three

### The 'agency default' is quantifiable and therefore avoidable. npm downloads for the month ending 2026-08-21: framer-motion 178.3M, embla-carousel-react 148.8M, motion 71.2M, three 57.2M, @react-three/fiber 20.1M, gsap 18.6M, swiper 17.0M, lenis 5.4M, AOS 1.09M. GSAP is now 100% free for everyone including commercial use, funded by Webflow. Codrops' RSS feed for August 2026 shows six of the ten most recent posts are Three.js/WebGPU shader pieces.

Confidence: verified · type: trend

Why it matters here: This is the sameness the operator is afraid of, measured. Everyone has the same tools, and since GSAP went free the last cost barrier to the agency look disappeared. The corollary: the differentiator can no longer be WHICH library — it has to be what the motion is about.

Evidence: registry API api.npmjs.org/downloads/point/last-month/<pkg>, queried 2026-08-22; gsap.com/pricing ('GSAP is now 100% free for all users, thanks to Webflow's support'), accessed 2026-08-22; tympanus.net/codrops/feed/ pubDates 2026-08-10 to 2026-08-22

Source: https://api.npmjs.org/downloads/point/last-month/framer-motion

### Springs no longer require JavaScript. CSS linear() easing is Baseline widely available (Chrome 113 2023-05-02, Firefox 112, Safari 17.2 2023-12-11) and reports ~14.1% Chrome page-load usage; it approximates arbitrary curves — including spring and bounce physics — by interpolating between many stops. Motion's duration-based springs (duration + bounce) are explicitly documented as exportable to pure CSS. Motion's documented defaults: tween 0.3s (0.8s when multiple keyframes), spring bounce 0.25, damping 10, mass 1; `visualDuration` sets the time the animation appears to reach target.

Confidence: verified · type: trend

Why it matters here: The premium 'springy' feel that reads as a Framer/Linear-class product can ship as static CSS with zero runtime, which is the right call on a Next.js site where the animation library would otherwise force client components. It also lets the master doc specify springs as concrete values rather than vibes.

Evidence: webstatus.dev 'linear-easing' (baseline widely, low_date 2023-12-11, chrome daily usage 0.1407); MDN linear() reference ('allows the approximation of complex animations … by interpolating linearly between the specified points'); motion.dev/docs/react-transitions defaults, fetched 2026-08-22; State of CSS 2025 — Josh W. Comeau's pick of the year was the linear() easing generator for 'CSS springs'

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear

### prefers-reduced-motion is Baseline widely available since 2020-01-15 and appears on about half of all pages (HTTP Archive Web Almanac 2025: 49.99% desktop, 50.55% mobile). WCAG 2.3.3 'Animation from Interactions' (Level AAA) requires interaction-triggered motion animation to be disableable, citing nausea and migraine in users with vestibular disorders; WCAG 2.2.2 'Pause, Stop, Hide' (Level A) requires a control for automatic motion lasting over five seconds. Both MDN and Chrome's own view-transitions doc are explicit that 'reduce' does not mean 'none' — the correct response is a subtler animation that still expresses the relationship between elements.

Confidence: verified · type: constraint

Why it matters here: Half of pages already declare the query, so honouring it is table stakes, not a differentiator — but honouring it WELL is. Stripping all motion for reduced-motion users breaks the spatial story of a listing→detail transition; cross-fading instead of translating preserves it. No sourced figure was found for what percentage of real users actually enable the OS setting — do not invent one.

Evidence: HTTP Archive Web Almanac 2025, Accessibility chapter, Figure 6.6; webstatus.dev 'prefers-reduced-motion' (widely, low_date 2020-01-15); W3C WCAG 2.2 Understanding SC 2.3.3 and SC 2.2.2; MDN prefers-reduced-motion ('Don't remove all motion'); Chrome for Developers same-document view transitions ('a preference for reduced motion doesn't mean the user wants no motion')

Source: https://almanac.httparchive.org/en/2025/accessibility

### Reduced-motion has ready-made implementation hooks: Motion's <MotionConfig reducedMotion="user"> automatically disables transform and layout animations while preserving opacity/colour, and reducedMotion={userSetting} lets a site expose its own override; useReducedMotion returns a plain boolean usable for disabling video autoplay and parallax. Lenis honours the preference by default. Sec-CH-Prefers-Reduced-Motion exists as an HTTP client hint for server-side adaptation but is experimental and Baseline 'limited'.

Confidence: verified · type: pattern

Why it matters here: Gives the master doc a concrete, testable contract instead of a good intention. The client-hint being unavailable also matters architecturally: the reduced-motion variant cannot be reliably server-rendered, so the CSS media query must be the primary mechanism and JS only a supplement.

Evidence: motion.dev/docs/react-accessibility, fetched 2026-08-22; Lenis README 'Reduced motion'; MDN Sec-CH-Prefers-Reduced-Motion ('Limited availability … Experimental')

Source: https://motion.dev/docs/react-accessibility

### Web haptics are not available to roughly half this audience. The Vibration API is Baseline 'limited': Chrome 32 (2014), Chrome Android, Edge 79 — but no Safari and no Firefox, and Apple's formal standards position is 'oppose', citing annoyance, power and device independence. Where it does work, sticky user activation is required. Meanwhile Saudi Arabia's mobile OS split in July 2026 is iOS 50.12% / Android 49.87%.

Confidence: verified · type: constraint

Why it matters here: Any 'signature interaction' whose payoff depends on a haptic tap will simply not fire for half of Saudi mobile users. Haptics can be a bonus layer for Android Chrome, never the mechanism.

Evidence: webstatus.dev 'vibration' (baseline limited; Apple vendor position: oppose); MDN Navigator.vibrate ('Sticky user activation is required'); StatCounter Global Stats, Mobile OS Market Share Saudi Arabia, July 2026

Source: https://api.webstatus.dev/v1/features/vibration

### The regional device/browser mix is unusually split and must drive the motion strategy. July 2026 StatCounter: Saudi Arabia mobile browsers Chrome 47.93% / Safari 45.96%; Saudi mobile OS iOS 50.12% / Android 49.87%; Saudi platform mix Mobile 65.43% / Desktop 33.61%. UAE is nearly inverted: Chrome 73.44% / Safari 17.07%, Android 77.82% / iOS 22.16%, Mobile 59.35% / Desktop 40.02%. Within Saudi iOS traffic, iOS 26.x versions total ~67.8% (26.5 at 55.35%, plus 26.4/26.3/26.2), with iOS 18.x still around 13.6%.

Confidence: verified · type: data

Why it matters here: Two consequences. (1) Firefox is statistically irrelevant here, so 'Firefox doesn't support scroll-driven animations' is not a blocker — but roughly one in seven Saudi iOS visitors is on iOS 18 and gets no scroll timelines, so a static fallback is mandatory, not optional. (2) A design tuned only on a desktop Chrome dev machine will misrepresent about half the real audience.

Evidence: StatCounter Global Stats, July 2026 data for Saudi Arabia and United Arab Emirates: mobile browser share, mobile OS share, desktop/mobile/tablet share, iOS version share; all accessed 2026-08-22

Source: https://gs.statcounter.com/browser-market-share/mobile/saudi-arabia

### RTL breaks motion in a way logical properties do not fix. CSS logical properties handle layout mirroring, but there is no logical equivalent for transform/translate — a translateX slide is physical and will run the wrong way in Arabic. Animating margin-inline-start works but is a layout-triggering (non-compositor) animation; the performant fix is direction-scoped transform rules, typically combining scaleX(-1) with the translate. By contrast, animation-timeline: scroll(inline) and view(inline) ARE writing-mode aware (MDN: progress depends on 'the <axis> and writing mode'), while scroll(x) is not.

Confidence: verified · type: pattern

Why it matters here: This is the highest-leverage, least-copied insight for a Middle East travel site. Almost every template competitor will ship an Arabic version whose arrows, slide-ins and carousels move in the LTR direction. Getting motion direction right in Arabic is an instantly perceptible quality signal — and the fix (use inline/block axes, never x/y; scope transforms by dir) is cheap.

Evidence: Ahmad Shadeed, 'RTL Styling 101' — 'When I added a translate animation to the arrow, I thought about RTL. There is no logical property for this'; notes margin animation is 'not good for performance' and demonstrates the [dir=rtl] scaleX(-1) pattern. MDN animation-timeline/scroll(): axis values block | inline | x | y, progress depends on axis and writing mode.

Source: https://rtlstyling.com/posts/rtl-styling

### The peak–end rule is the strongest available evidence for 'one signature interaction beats twelve effects'. Kahneman & Fredrickson's 1993 cold-pressor study found 80% of participants preferred to repeat the LONGER trial (90s) over the shorter one (60s) because its final 30 seconds were slightly less unpleasant — a small improvement near the end changed the memory of the whole experience. NN/g's application: design deliberately for the intense moments (peaks) and the final moments (end) of a journey, because memory is stored as snapshots, not a full record.

Confidence: verified · type: principle

Why it matters here: It gives a placement rule, not just a quantity rule: the one signature moment should sit at the emotional peak (first reveal of the destination / the moment the package becomes concrete) and the flow should END well (booking confirmation), rather than spreading effects evenly across the site. NN/g's article literally opens with remembering a vacation — the mapping is exact.

Evidence: Nielsen Norman Group, 'The Peak–End Rule: How Impressions Become Memories', Alita Kendrick, 2018-12-30, citing Kahneman & Fredrickson (1993). PRE-2023 — flagged, but this is a cognitive-psychology principle, not a web trend.

Source: https://www.nngroup.com/articles/peak-end-rule/

### Delight is hierarchical and animation sits at the shallow end. NN/g distinguishes 'surface delight' (animations, tactile transitions, sound, microcopy — 'often gimmicky and have the potential for tackiness if the underlying product is less than perfect') from 'deep delight', which requires functionality, reliability and usability first and produces recommendation and return visits. Separately, the aesthetic-usability effect means attractive design makes users forgive MINOR usability problems but not large ones — and it actively masks problems during usability testing.

Confidence: verified · type: principle

Why it matters here: Directly counters the 'add motion to feel premium' instinct: motion buys forgiveness for small friction, never for a broken package-comparison flow. It also warns that stakeholder demos will over-reward the motion, so success has to be measured on task completion, not on how good the demo felt.

Evidence: Nielsen Norman Group, 'The Theory of User Delight: When Delight Doesn't Matter' (2017-03-05 — PRE-2023, flagged) and 'The Aesthetic-Usability Effect' (NN/g), both fetched 2026-08-22

Source: https://www.nngroup.com/articles/theory-user-delight/

### Scrollytelling has 2026 experimental evidence — and it improves EXPERIENCE, not comprehension. A CHI 2026 study (N=454) comparing a scrollytelling privacy-policy prototype against plain text, two nutrition-label variants and a standalone interactive visualisation found scrollytelling yielded higher engagement, lower cognitive load, greater willingness to adopt the format and increased perceived clarity, while matching the other formats on comprehension accuracy and confidence; changes in perceived understanding, transparency and trust were small and statistically inconclusive. A second 2026 study (N=25) found interactive onboarding (scrollytelling or chatbot) beat static on guideline adherence and engagement, with no significant comprehension difference.

Confidence: verified · type: data

Why it matters here: This is the decision rule for itineraries: use scrollytelling for the destination story and the emotional pitch, where engagement and low cognitive load are the goal — and use plain, scannable, non-animated layout for the facts a buyer must extract and compare (price, inclusions, visa, cancellation). Scrollytelling does not make information easier to understand; it makes reading it more tolerable.

Evidence: Méndez & Such, 'Scrollytelling as an Alternative Format for Privacy Policies', arXiv:2603.04367, submitted 2026-03-04, to appear at CHI 2026 (DOI 10.1145/3772318.3790704); and arXiv:2607.03023, 2026-07-03, comparative study of static/scrollytelling/chatbot onboarding

Source: https://arxiv.org/abs/2603.04367

### A scrollytelling sequence can be systematically retargeted into short-form social video using 'narrative beats' as the extraction primitive — the Scrolly2Reel system transforms newsroom scrollies into social videos aligned to narration with controllable pacing, explicitly motivated by younger audiences shifting from print to short-video platforms.

Confidence: verified · type: pattern

Why it matters here: This is the mechanism that makes the site itself generate organic reach rather than merely being pretty. The same authored beat sequence that drives the on-site itinerary scroll becomes the Reel/TikTok cut — one authoring effort, two distribution channels — which is precisely the operator's existing competence as an Instagram-native AI video producer.

Evidence: Zong et al., 'Scrolly2Reel: Retargeting Graphics for Social Media Using Narrative Beats', arXiv:2403.18111v2, 2024-03-26

Source: https://arxiv.org/abs/2403.18111

### Prerendering via the Speculation Rules API can make a cross-document view transition feel instant, with documented triggers and limits: 'moderate' eagerness fires after holding the pointer over a link for 200ms on desktop, and on mobile (since August 2025) uses viewport heuristics firing 500ms after the user stops scrolling for anchors within 30% of the vertical distance from the previous pointer-down; 'eager' changed in Chrome 143 to 10ms hover on desktop and 50ms after entering the viewport on mobile (January 2026). Chrome limits: immediate = 50 prefetch / 10 prerender; eager/moderate/conservative = 2 (FIFO). Speculation is suppressed under Save-Data, energy saver on low battery, memory constraints, background tabs, and when 'Preload pages' is off.

Confidence: verified · type: pattern

Why it matters here: The 'expensive' feeling of a listing→detail morph collapses if the detail page takes 1.2s to arrive. Prerendering the two most likely package pages on moderate eagerness closes that gap. The Save-Data and low-battery suppression is also the honest answer for why the design must degrade gracefully rather than depend on the transition.

Evidence: Chrome for Developers, 'Prerender pages in Chrome for instant page navigations' — eagerness definitions, Chrome limits table, and suppression conditions; accessed 2026-08-22

Source: https://developer.chrome.com/docs/web-platform/prerender-pages

### GSAP ScrollTrigger is not the same thing as scrolljacking, and its docs say so: 'No scroll-jacking, so it can be combined with native technologies like CSS scroll snapping' — smoothing is an opt-in separate product (ScrollSmoother). Its scrub:1 means a one-second catch-up to the scrollbar, and anticipatePin exists specifically because browsers repaint scroll on a separate thread, which can flash roughly 1/60th of a second of unpinned content when pinning large panels.

Confidence: verified · type: constraint

Why it matters here: Lets the master doc permit scroll-triggered/scroll-linked animation while banning scroll smoothing — a distinction most teams collapse. The anticipatePin note is also the concrete explanation for the 'flicker on fast scroll' bug that will otherwise be blamed on the design.

Evidence: GSAP ScrollTrigger documentation, gsap.com/docs/v3/Plugins/ScrollTrigger/, accessed 2026-08-22

Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

### Small, large and dynamic viewport units (svh/lvh/dvh) are Baseline widely available (Safari 15.4 2022-03-14, Chrome 108 2022-11-29, widely available since 2025-06-05).

Confidence: verified · type: constraint

Why it matters here: Full-height scroll sections built on 100vh jump when mobile Safari's address bar collapses, which reads as broken motion rather than as a viewport quirk. Since 59–65% of this audience is mobile and ~46% of Saudi mobile is Safari, the master doc should mandate dvh/svh for any scroll-driven full-bleed section.

Evidence: webstatus.dev 'viewport-unit-variants' (status widely, low_date 2022-12-05, high_date 2025-06-05), accessed 2026-08-22

Source: https://api.webstatus.dev/v1/features/viewport-unit-variants

### Motion has first-class staggering primitives (delayChildren: stagger(0.1), with from: 'first' | 'last' | 'center' | index), and scroll-driven view() timelines achieve per-item entry without any JS at all. There is no sourced study giving an optimal stagger interval; NN/g's 100–400ms fade window and the 500ms 'too slow' ceiling are the only defensible constraints, which bounds total stagger for a row of N items.

Confidence: inferred · type: pattern

Why it matters here: Prevents the common failure where a 12-card grid staggered at 100ms takes 1.2s to finish — well past the point where a scanning user has already scrolled past. The constraint should be expressed as total sequence length, not per-item delay. Flagging honestly: no sourced per-item figure exists; do not fabricate one.

Evidence: motion.dev/docs/react-transitions (stagger API and from options), fetched 2026-08-22; NN/g Scroll Fading 101 for the 100–400ms / >500ms bounds

Source: https://motion.dev/docs/react-transitions

## Design implications

- Publish a motion token table in the master doc and forbid ad-hoc durations. Proposed values, all sourced to the NN/g bands: --motion-instant 100ms (toggles, checkbox, chip select), --motion-micro 160ms (hover, focus ring, button press), --motion-ui 240ms (dropdown, sheet, filter panel), --motion-page 300ms (view transition / route change), --motion-reveal 280ms (scroll fade-in, inside the 100–400ms window). Hard ceiling 400ms for anything the user is waiting on; nothing on the interaction path exceeds 500ms. Easing: --ease-out cubic-bezier(0.2, 0, 0, 1) for entrances, --ease-in cubic-bezier(0.4, 0, 1, 1) for exits, --ease-standard cubic-bezier(0.4, 0, 0.2, 1) for in-place moves (this is the curve Chrome's own view-transitions doc uses in its examples). Entrances get ~50ms more than their matching exits.
- Name ONE signature interaction and build only that one to award quality. The recommendation: the package card's hero image and title morph into the package detail hero via a shared-element view transition, and the detail page's itinerary then advances day-by-day on a scroll-driven view() timeline with a day-number rail that fills as you scroll. It is one continuous idea — 'the card opens into the trip' — it is functional (it tells you where you came from and where you are), it is native (no library), and it is the emotional peak of the flow, which is where peak–end says to spend.
- Implement the signature transition CSS-first with a strict enhancement ladder. Layer 0: the page works, laid out and readable, with no motion. Layer 1: @media (prefers-reduced-motion: no-preference) adds opacity/colour transitions. Layer 2: @supports (animation-timeline: view()) adds the scroll-driven itinerary rail. Layer 3: view transitions add the card→detail morph. Ship zero animation JavaScript in the initial bundle. If Motion is needed later, import `m` with LazyMotion + domAnimation (4.6KB initial per Motion's docs), never the full motion component (34KB minimum).
- Assign view-transition-name dynamically to the clicked card only. Because duplicate names silently skip the entire transition, set the name in an onClick/onNavigate handler on the target card (e.g. style={{viewTransitionName: 'pkg-hero'}}) and clear it after; for same-document list reorders use view-transition-name: match-element. Because Next.js App Router navigations are soft, wrap the router transition in document.startViewTransition() rather than relying on the @view-transition at-rule, and keep React's experimental <ViewTransition> out of the dependency tree until it leaves Canary.
- Pair the transition with Speculation Rules so it never feels stalled. Add a document rule with "eagerness": "moderate" scoped to /packages/* links — 200ms hover on desktop, viewport heuristics on mobile — respecting the 2-prerender FIFO limit. Do not use immediate on a listing page. Accept that speculation is suppressed under Save-Data and low battery and verify the transition still degrades to a plain, fast navigation in those conditions.
- Make reduced motion a first-class, reversible product feature, not a media query. (a) Honour @media (prefers-reduced-motion: reduce) by swapping translate/scale for opacity cross-fades — keep the relationship, drop the travel; explicitly do NOT set animation: none globally. (b) Ship a visible 'Reduce motion' toggle in the footer and in account settings (NN/g cites Crown positively for exactly this), persist it in the Supabase user profile and mirror it to a cookie so the server render matches. (c) If Motion is ever added, drive it from <MotionConfig reducedMotion={userSetting}>. Do not depend on Sec-CH-Prefers-Reduced-Motion; it is experimental and Baseline limited.
- Write RTL motion rules into the design system now, before any component exists. Rule 1: never use scroll(x)/view(x) or raw translateX in a scroll animation — use scroll(inline)/view(inline) and logical properties, which are writing-mode aware. Rule 2: any directional transform (arrow nudge, slide-in panel, card swipe) needs a [dir='rtl'] override combining scaleX(-1) with the translate; do not animate margin-inline-start as the fix (it triggers layout). Rule 3: the view-transition slide direction for forward/back navigation must flip in Arabic — bind it to view-transition-types set from the current dir, not hard-coded to 'from the right'. Rule 4: add an Arabic pass to the motion QA checklist with the same weight as the English pass.
- Set a hard 3D budget and default to the cheap alternatives. No three.js on the critical path. If a globe is genuinely wanted, use cobe (5.9KB gzip) instead of globe.gl (506KB) or drei (500KB) — an 85x difference. For a route/map view prefer maplibre-gl (256KB) over mapbox-gl (499KB), lazy-loaded below the fold, and gate it on a pointer:fine / no-Save-Data / no-reduced-motion check. For destination atmosphere, an SVG route line animated on a view() timeline, or a short poster-framed muted video, gets most of the effect for a fraction of the bytes.
- Never animate the H1, the tagline, the price, or the logo. NN/g's homepage research is explicit that scroll-triggered text animations delay users and that the tagline must be immediately visible; treat the package price and 'what's included' block the same way. Animation is allowed on imagery, on secondary supporting content, and on state changes — never on the fact the buyer came for.
- Fix the scroll-reveal implementation to the researched shape: 240–280ms duration, opacity 0→1 plus at most 8–16px of translate on the block axis, triggered ONCE per element (persistence — never re-animate on scroll-up), and never text and images simultaneously in the same viewport. Cap total stagger for any row or grid at ~400ms end-to-end (roughly 40–60ms per item, max ~6 items animated), so a scanning user cannot outrun it.
- Ban scroll smoothing at the root. No Lenis, no ScrollSmoother, no scroll-behavior: smooth on html. The Lenis README's own limits — 60fps ceiling on Safari, 30fps in low power mode, no CSS scroll-snap — make it a net negative for a Saudi audience that is ~46% Safari on mobile. Scroll-TRIGGERED and scroll-LINKED animation are permitted (they don't touch scroll rate); scroll-SMOOTHED is not. Use CSS scroll-snap for the destination carousel instead.
- Set explicit performance gates in CI. Field INP p75 ≤ 200ms; zero scroll event listeners in application code (use IntersectionObserver or CSS scroll timelines); animate only transform and opacity, enforced by a stylelint rule; will-change applied only via JS immediately before an animation and removed after; every full-bleed scroll section sized in dvh/svh, never vh. Treat a Lighthouse 'non-composited animations' flag as a build failure.
- Design the peak moment to be screenshot-legible and video-exportable. The single frame at the climax of the signature interaction must read as a complete, branded image with no motion blur, no half-faded text, and the Instagram handle present — because that frame is what gets shared. Author the itinerary scroll as an explicit ordered list of narrative beats in the data model (Supabase: itinerary_beats with order, media, caption), so the same beats can be rendered as the on-site scroll sequence AND exported as a vertical Reel cut, per the Scrolly2Reel approach.
- Split the package detail page by cognitive job. Top half — destination story: scrollytelling permitted, engagement-optimised, image-led (the CHI 2026 evidence supports this for experience). Bottom half — the comparison surface: price, day-by-day inclusions, exclusions, visa, cancellation. Zero motion, static layout, fully scannable, unchanged by the reduced-motion toggle. Scrollytelling improved experience but not comprehension; do not put facts a buyer must extract inside an animation.
- Do not build a haptic-dependent interaction. The Vibration API has no Safari support and Apple formally opposes the spec, while Saudi mobile is ~50% iOS. Any vibration is an Android-Chrome-only garnish behind a capability check and a sticky-user-activation gesture. Mobile 'feel' must come from touch-target sizing, momentum-preserving CSS scroll-snap, and instant visual acknowledgement under 100ms instead.
- Give the flow a deliberate ending. Peak–end says the last moments are weighted disproportionately: the booking-confirmation screen deserves the second-most motion design in the entire product (a single, restrained, celebratory beat plus a clear, immediately readable summary), not the least. Most travel sites treat confirmation as a receipt.

## Anti-patterns to refuse

- Full-page scrolljacking / pinned horizontal sections with text. NN/g's study found the majority of participants disoriented, task-oriented users 'severely agitated' and ready to leave, and that altered scroll rate plus readable text produced the worst usability of anything tested — and every problem was worse on mobile, which is 59–65% of this audience. A traveller comparing three packages is exactly the task-oriented user this destroys.
- The word-by-word headline reveal and animated tagline. NN/g states directly that scroll-triggered text animations delay users and that crucial elements — logo, tagline, main headline — must not be animated, and that moving elements are frequently mistaken for ads. This is the most common single 'premium' opener and it costs comprehension at the exact moment the value proposition has to land.
- Global smooth scrolling (Lenis / ScrollSmoother / scroll-behavior: smooth on html). Lenis's own README documents a 60fps ceiling on Safari and 30fps in low power mode, plus no CSS scroll-snap support and disabled anchor links by default. With Safari at ~46% of Saudi mobile, this makes the site feel worse than doing nothing — while adding a dependency and an accessibility surface.
- Repeating scroll fade-ins with no element persistence. NN/g found non-persistent re-animation directly frustrated task-oriented users, who could not find the scroll position that made content reappear, and that it contributes to the illusion of completeness so people never discover content below. The default configuration of AOS and most 'reveal on scroll' snippets does exactly this.
- Fading in text and images at the same time. NN/g's study found that when both animate together they compete for attention and overwhelm the user; the best-performing page in the study (Apple Card) alternated so only one element type moved at a time.
- A three.js / globe.gl / drei globe on the landing page. 178KB–506KB gzipped before a single destination photo, animating on a device profile that is heavily mid-range Android in the UAE — and it is simultaneously the single most predictable idea a travel site can have. cobe delivers a credible globe for 5.9KB; an SVG route line on a view() timeline delivers most of the emotional payload for effectively nothing.
- Copying the current award-site default (WebGL/WebGPU shader hero) as a shortcut to looking expensive. Six of the ten most recent Codrops posts in August 2026 are Three.js/WebGPU pieces — this is the 2026 template, exactly as cursor trails and magnetic buttons were the previous cycle's. Adopting the current default in its default form is how a site ends up looking like everyone else while costing more.
- Custom cursors, magnetic buttons and image trails as the differentiator. They are now packaged primitives — Motion+ ships a Cursor component — which means they are commodity, and they are pointer-only, so they contribute nothing to the 59–65% of this audience on touch. Spending the differentiation budget on effects half the users cannot see is the worst possible allocation.
- Setting animation: none !important under prefers-reduced-motion. Both MDN and Chrome's own view-transitions documentation say reduce does not mean none; stripping all motion destroys the spatial relationship a listing→detail transition exists to communicate, and leaves reduced-motion users with a worse mental model than everyone else. Swap translate for cross-fade instead.
- Shipping an Arabic version with LTR motion. Logical properties will mirror the layout and give a false sense of completeness while every arrow nudge, slide-in panel and page transition still moves left-to-right, because transform has no logical equivalent. It is the most visible, least-fixed quality tell on Arabic sites — and therefore also the cheapest differentiator to claim.
- Twelve small effects spread evenly across every section. Peak–end says memory is built from the intense moments and the ending, not from an even distribution; NN/g's delight hierarchy adds that surface delight is 'often gimmicky and has the potential for tackiness if the underlying product is less than perfect'. Evenly spread motion produces cost and risk with no memorable peak.
- Autoplaying hero video with motion running past five seconds and no control. WCAG 2.2.2 (Level A — the baseline conformance level, not an aspirational one) requires a pause/stop/hide mechanism, and NN/g documents a homepage where a slow-loading hero video left 6.4 seconds of blank screen before any content appeared.

## Differentiation moves

- Build the entire signature interaction on native CSS scroll-driven animations and View Transitions with zero animation JavaScript. Because adoption is still small (scroll-driven animations appear on ~5.6% of Chrome page loads; the same-document View Transition API on ~1.1%), a site that is genuinely built this way will feel measurably faster and smoother than competitors running the same effects through 45KB of JS — and will hold 60fps on the low-power-mode iPhones that break Lenis-based sites.
- Make Arabic the flagship direction rather than the afterthought. Mirror every motion vector (scroll(inline) not scroll(x), dir-scoped transforms, view-transition-types flipped by direction), commission or select an Arabic display face that carries the brand at hero size, and make the Arabic version the one shown in the portfolio. Essentially no competitor in this space treats RTL motion as a design problem rather than a translation problem.
- One idea, one interaction: 'the card opens into the trip.' The package card's hero and title morph into the detail hero (shared-element view transition), and the itinerary then advances on a scroll-driven day rail. It is a single continuous metaphor, it is functionally informative rather than decorative, and it is impossible to bolt onto a template — which is exactly what makes it defensible.
- Author itineraries as an explicit ordered beat list in Supabase and render the same beats twice: as the on-site scroll sequence and as an exported vertical video cut. This turns the site into a content factory for the operator's existing Instagram practice — the mechanism from Scrolly2Reel — and means the site's distinctive interaction and the social distribution are the same asset, not two budgets.
- Design one frame to be the screenshot. Choose the exact moment in the signature interaction that is most beautiful as a still, make it hold (no half-opacity text, no motion blur, handle present), and give it a stable deep link (?beat=3). Sharing is a static-image act far more often than a video act; most animated sites have no single frame worth capturing.
- Ship a visible 'Reduce motion' toggle in the footer and in account settings, persisted per user in Supabase. NN/g singles out this pattern out as good practice, roughly half of all pages declare the media query but almost none expose a control, and it converts an accessibility obligation into a visible statement about craft.
- Use motion as navigation, not decoration — destination names that are simultaneously the wayfinding and the transition surface, so the animation is doing structural work. This is what distinguishes the award-winning work profiled by Codrops from decorated templates, and it is also what survives contact with the reduced-motion cross-fade fallback, because the relationship it expresses is real.
- Prerender the two most likely package pages on moderate eagerness so the morph transition lands with no perceptible load. The combination of speculation rules plus a cross-document view transition produces a browse experience that feels like a native app — a category-level difference from every metasearch competitor, which all feel like page reloads.
- Publish the motion system itself as content. A short, well-designed page (or carousel) documenting the token table, the RTL mirroring rules and the reduced-motion contract is exactly the operator's audience-facing subject matter, is inherently linkable, and doubles as proof of craft to prospective clients — the site earning reach by being about how it was made.

## Open questions

- No sourced figure was found for what percentage of real users actually enable the OS 'reduce motion' setting. The Web Almanac figure (~50%) measures pages that DECLARE the media query, not users who trigger it. Do not let anyone convert one into the other; if a number is needed, measure it in the site's own RUM by reporting matchMedia('(prefers-reduced-motion: reduce)').matches alongside INP.
- webstatus.dev reports cross-document view transitions at a higher Chrome usage fraction (0.1155) than the same-document API (0.0112), which is counter-intuitive given cross-document shipped later. The counters may not be measuring comparable things. Verify against Chrome Platform Status use counters before quoting either number publicly.
- No study was found that gives an optimal per-item stagger interval, or an optimal number of staggered items. The recommendation in this document (40–60ms per item, ~400ms total, max ~6 items) is derived from NN/g's 100–400ms fade band and the 500ms 'too slow' ceiling — it is a defensible bound, not a measured optimum. Worth an A/B test on the package grid.
- Frame-accurate scroll-scrubbed <video> (the Apple-style technique) was not verified for current iOS Safari behaviour, and iOS has historically been unreliable here. If a video-scrub hero is considered, prototype it on a real iOS 26 device and on an iOS 18 device before committing; image-sequence and canvas alternatives may be required.
- The battery and thermal cost of a persistent WebGL canvas on mid-range Android was not sourced with numbers. If a globe or shader hero is seriously considered, measure it directly on a representative UAE-market Android device rather than relying on bundle size alone.
- Whether GSAP's free licence (Webflow-funded) carries any long-term commitment was not established from a primary announcement with a date; gsap.com/pricing states it plainly as of 2026-08-22 but the terms of that support are not public. Not a blocker given the CSS-first recommendation, but worth noting before making GSAP load-bearing.
- Arabic-language user testing of scroll-driven motion appears to be absent from the literature reviewed. Whether Arabic readers' scanning behaviour changes the optimal reveal timing (given RTL scan patterns and generally taller Arabic line-height) is unknown and would be genuinely novel research the operator could publish.
- Real-world share of iOS 18 vs iOS 26 among this site's actual visitors will differ from StatCounter country averages. Instrument it from day one, because the iOS 18 cohort is precisely the group that gets the static fallback for the signature interaction.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### PARTIALLY_TRUE — Scroll-driven CSS animations shipped Safari 26/iOS 26 2025-09-15, Chrome/Edge 115 2023-07-18, Firefox not shipped, Baseline 'limited'; Chrome usage 0.0558 (flexbox 0.8346).

Dates and Baseline status confirmed exactly: Chrome 115 2023-07-18, Chrome Android 115 2023-07-21, Edge 115 2023-07-21, Safari 26 + Safari iOS 26 2025-09-15, baseline 'Limited', Mozilla position positive / Apple support. Usage figures have drifted: actual chrome_daily_usage = 0.05488339 and flexbox = 0.834922. Firefox holdout independently confirmed — animation-timeline is implemented but sits behind layout.css.scroll-driven-animations.enabled in stable (on by default in Nightly) as of Firefox 152, June 2026; MDN still banners the property 'Limited availability … not Baseline'. Note one low-quality SEO blog claims 'Safari 18+' and '84% global support' — both contradicted by webstatus.dev and MDN BCD. https://api.webstatus.dev/v1/features/scroll-driven-animations, https://api.webstatus.dev/v1/features/flexbox, https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline

Corrected: Scroll-driven CSS animations shipped in Safari 26 and iOS 26 on 2025-09-15, joining Chrome/Edge 115 (2023-07-18). Firefox has implemented but not shipped it — still behind the layout.css.scroll-driven-animations.enabled flag in stable as of Firefox 152 (June 2026), on by default only in Nightly — so the feature remains Baseline 'limited'. Chrome telemetry reports it on 0.0549 of page loads (~5.5%); calibration: flexbox = 0.8349.

### CONFIRMED — Same-document View Transitions Baseline 'newly available' 2025-10-14; cross-document still 'limited'; UA default is a 250ms cross-fade.

Exact match on every date. view-transitions: baseline 'newly', low_date 2025-10-14, Chrome 111 2023-03-07, Safari 18 2024-09-16, Firefox 144 2025-10-14, Chrome usage 0.0115. cross-document-view-transitions: baseline 'Limited', Chrome 126 2024-06-11, Edge 126 2024-06-13, Safari 18.2 2024-12-11, no Firefox (WPT stable score 0.053), Chrome usage 0.116%. MDN confirms the UA stylesheet block verbatim: :root::view-transition-group(*) { position: absolute; top: 0; left: 0; animation-duration: 0.25s; animation-fill-mode: both; }. https://api.webstatus.dev/v1/features/view-transitions, https://api.webstatus.dev/v1/features/cross-document-view-transitions, https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::view-transition-group

### PARTIALLY_TRUE — View transitions: one at a time, unique names or silent skip, 4s timeout, same-origin only, width/height animates layout per frame with off-main-thread optimisation unimplemented.

Chrome's same-document guide confirms verbatim: 'Only one view transition is allowed to run at a time. If a new view transition starts while one is already running, the old transition skips to the end'; 'view-transition-name must be unique. If two rendered elements have the same view-transition-name at the same time, the transition will be skipped'; and on width/height, 'it runs layout per frame … the Chrome team plans to optimize it so it can run off the main thread in most cases. This optimization hasn't been implemented yet.' The 4-second timeout is NOT in the same-document doc — it belongs to cross-document transitions, where the transition is skipped with a TimeoutError DOMException. Crucially, the clock starts at navigation start, so TTFB and network latency are consumed by the budget — stricter than the claim implies. https://developer.chrome.com/docs/web-platform/view-transitions/same-document, https://developer.chrome.com/docs/web-platform/view-transitions/cross-document

Corrected: View transitions have hard mechanical constraints: only one may run at a time (a new one skips the running one to its end); every participating element needs a unique view-transition-name or the transition is silently skipped; animating width/height on ::view-transition-group still runs layout per frame (Chrome's off-main-thread optimisation is planned but not implemented). Cross-document transitions add two more: same-origin only, and a 4-second timeout measured from the start of navigation — so slow TTFB alone can burn the budget and skip the transition with a TimeoutError.

### PARTIALLY_TRUE — React's <ViewTransition> is still Canary/Experimental and React does NOT auto-disable animations for prefers-reduced-motion.

Both substantive points confirmed verbatim on react.dev: 'The <ViewTransition /> API is currently only available in React's Canary and Experimental channels' and 'Many users may prefer not having animations on the page. React doesn't automatically disable animations for this case. We recommend always using the @media (prefers-reduced-motion) media query.' Version attribution is off: the page's package.json examples pin react 19.3.0-canary-eb8feb71-20260814, not 19.2. Corroborated independently — ViewTransition was not included in any stable release through the 19.2 line (19.2.7 latest patch, June 2026). https://react.dev/reference/react/ViewTransition

Corrected: React's <ViewTransition> component is still Canary/Experimental — the reference documents it against React 19.3.0-canary (build dated 2026-08-14) and it has shipped in no stable release through the 19.2 line. React explicitly does NOT disable animations for prefers-reduced-motion; the docs tell you to handle it yourself with the media query.

### PARTIALLY_TRUE — NN/g scrolljacking study: majority at least mildly disoriented, task-oriented users 'severely agitated', worst combo is altered scroll rate/direction plus text, worse on mobile; mitigations include sticky nav as escape hatch.

Author and date exact (Sara Paul, 2023-08-06). Confirmed verbatim: 'The majority of our study participants were at least mildly disoriented by scrolljacking'; a prospective customer said he would 'get severely agitated and just move on'; altered scroll rate/direction combined with required reading produced the most severe problems; smaller screens extended scrolljack duration and intensified disorientation. The 'sticky navigation as an escape hatch' mitigation does not appear in the article's recommendation list and is UNSUPPORTED. The article's mobile guidance is also materially stronger than 'exacerbated' — it recommends avoiding mobile scrolljacking entirely where possible, and notes users fared significantly better when sites stripped it from mobile. https://www.nngroup.com/articles/scrolljacking-101/

Corrected: NN/g's usability study of scrolljacking (Sara Paul, 2023-08-06) found the majority of participants were at least mildly disoriented; a task-oriented prospective customer said he would 'get severely agitated and just move on'; the worst combination was altered scroll rate/direction plus text the user had to read; and problems intensified on smaller screens. Recommended mitigations: below the fold only, never change scroll direction, minimise text inside scrolljacked sections, test and optimise the scroll rate, include normal-scrolling sections on the same page, and avoid mobile implementation entirely where possible.

### CONFIRMED — NN/g scroll-fading study: 100-400ms fade rates, >500ms perceived too slow, animate each element once, fade one element type at a time, Apple's page best.

Every element confirmed verbatim against the source (Sara Paul, 2023-12-08): 'experiment with rates between 100–400ms'; 'a scroll-fade animation that takes more than 500ms is perceived as too slow'; section heading 'Fade In Content Only Once' with 'element persistence on scroll fading gives the user a better chance of seeing the content'; 'Fade In One Element Type at a Time' and 'the most successful examples of scroll fading animated only one element at a time — either the text or the images'; Apple.com cited as exemplar where 'either text or images faded in but not both simultaneously', producing superior efficiency and comprehension. https://www.nngroup.com/articles/scroll-fading-101/

### CONFIRMED — NN/g homepage guidelines: don't animate logo/tagline/headline, scroll-triggered text animations delay users, moving elements assumed to be ads, autoplay video >5s needs pause control, Crown cited positively.

All five points confirmed verbatim, including the Crown example — 'Crown incorporated scrolljack effects on its homepage, while also offering a prominent option for users to disable the motion.' Also confirmed: 'Avoid animating crucial page elements like the logo, tagline, or main headline. Our research indicated that scroll-triggered text animations delay users'; 'moving elements are often assumed to be ads'; and the five-second pause/stop rule, which the article attributes to WCAG 2.1. Attribution refinement: author is Huei-Hsin Wang, date 2024-03-15 confirmed, and the guidance sits under Principle 5 'Keep Homepages Simple' as the sub-guideline 'Minimize motion and animation'. https://www.nngroup.com/articles/homepage-design-principles/

### CONFIRMED — Duration bands: ~100ms simple feedback, 200-300ms modals, 100-500ms overall, 500ms 'a real drag', entering longer than exiting (300 in / 200-250 out), ease-out default, ease-in exits, linear 'weird and unnatural'.

Page Laubheimer, 2020-02-09 — author and date exact. Every band confirmed: ~100ms for simple feedback such as checkboxes and toggles; 200–300ms for substantial screen changes like modals; 100–500ms general range by complexity and distance travelled; 'At 500ms, animations start to feel like a real drag for users'; popup entering ~300ms versus 200–250ms to disappear; ease-out for entering (responsive start, eye settles on resting element), ease-in for exiting; 'Completely linear motion looks weird and unnatural to users.' Pre-2023 as the researcher flagged, but the 2023 scroll-fading study's 100–400ms window is consistent with it. https://www.nngroup.com/articles/animation-duration/

### PARTIALLY_TRUE — Two responsiveness budgets: perceptual (0.1s/1s/10s) and measured (INP <=200ms good, >500ms poor, three components); Doherty threshold <400ms.

The INP half is confirmed exactly against web.dev, including the page's 'Last updated: September 2, 2025' which matches the researcher's citation: INP at or below 200ms = good responsiveness; above 200ms and at or below 500ms = needs improvement; above 500ms = poor. The three components are confirmed as input delay, processing duration and presentation delay, measuring 'the time from the start of the interaction to the moment the next frame is fully presented'. The Nielsen 0.1/1/10s limits are long-established and uncontroversial but were not re-fetched in this pass, and the Doherty 400ms threshold was NOT independently verified — treat it as folklore-grade until sourced to Doherty & Thadani directly. https://web.dev/articles/inp

Corrected: Interaction responsiveness has two independent budgets. Perceptual: 0.1s feels instantaneous, 1s preserves flow of thought, 10s loses attention (Miller/Card, restated by Nielsen). Measured: INP at or below 200ms is 'good', above 500ms is 'poor', decomposed into input delay, processing duration and presentation delay (web.dev, last updated 2025-09-02). The often-quoted Doherty 400ms threshold is widely repeated but was not verified against the 1982 IBM source — cite it as an aphorism, not a measurement.

### CONFIRMED — Only transform and opacity are compositor-safe; web.dev demo shows ~50% frames dropped animating top vs ~99% retained with transform; will-change sparingly, added via JS before and removed after.

Confirmed against the source: 'Where possible, restrict animations to opacity and transform to keep animations on the compositing stage.' The demo reports 50% of frames dropped for top/left versus 'only 1% of frames were dropped' with transform — which is the same result as the researcher's '99% retained', since the DevTools FPS meter displays the retained percentage ('A high-performance animation has a high percentage, such as 99%'). Both framings are in the material; pick one. will-change guidance confirmed: 'Use the will-change property sparingly, and only if you encounter a performance issue', applying it via JavaScript when a change is likely and removing it afterward. https://web.dev/articles/animations-guide

### CONFIRMED — Lenis ~5.5KB gzipped, honours prefers-reduced-motion by default; README lists no CSS scroll-snap, 60fps Safari cap (WebKit 173434), 30fps low power, anchor links off by default, nested scroller opt-outs. GSAP ScrollTrigger does 'no scroll-jacking'.

Bundle size exact: bundlephobia lenis@1.3.26 = 18,816 B minified, 5,473 B gzipped. README confirms every limitation: 'By default, Lenis honors the user's prefers-reduced-motion setting: when it is set to reduce, smoothing is disabled'; 'no support for CSS scroll-snap, you must use (lenis/snap)'; 'capped to 60fps on Safari' referencing WebKit bug 173434; 'and 30fps on low power mode'; dedicated anchor-links and nested-scroll sections with prevention attributes. GSAP side confirmed verbatim: 'The closest thing to scroll-jacking would be the [optional] snapping behavior but even that merely animates the native scroll position and it automatically relinquishes control the moment the user attempts to scroll', and ScrollTrigger is documented as compatible with native CSS scroll snapping. https://github.com/darkroomengineering/lenis, https://gsap.com/docs/v3/Plugins/ScrollTrigger/

### PARTIALLY_TRUE — Gzipped transfer weights: three 178KB, mapbox-gl 499KB vs maplibre-gl 256KB, lenis 5.5KB, motion entry 45KB, LazyMotion 4.6KB / +15KB / +25KB, useAnimate mini 2.3KB.

Raw bytes verified: three@0.185.1 = 725,907 min / 182,364 gzip; mapbox-gl@3.29.0 = 1,827,010 / 499,133; maplibre-gl@6.5.0 = 992,913 / 255,785; lenis@1.3.26 = 18,816 / 5,473. Versions all match the researcher's citation. But the unit convention is inconsistent: 182,364 B renders as '178' only in KiB, while 499,133 and 255,785 render as '499' and '256' only in decimal KB (they are 487 and 250 KiB). The figures are therefore not directly comparable as listed. Motion's own guide confirms 4.6kb / +15kb / +25kb / 2.3kb verbatim, with the caveat 'all sizes quoted in this guide are from Rollup-generated bundles' — but it puts the full motion component at 34kb, not the 45kb cited. https://bundlephobia.com/api/size?package=three, https://bundlephobia.com/api/size?package=mapbox-gl, https://bundlephobia.com/api/size?package=maplibre-gl, https://motion.dev/docs/react-reduce-bundle-size

Corrected: Gzipped transfer weights (bundlephobia, 2026-08-22, raw bytes): three@0.185.1 = 182,364 B; mapbox-gl@3.29.0 = 499,133 B versus maplibre-gl@6.5.0 = 255,785 B (roughly half); lenis@1.3.26 = 5,473 B. Motion's own docs put the full motion component at 34kb, m + LazyMotion at just under 4.6kb for initial render, +15kb domAnimation, +25kb domMax, and useAnimate 'mini' (WAAPI-only) at 2.3kb — all from Rollup bundles, with Webpack expected to be slightly larger.

### PARTIALLY_TRUE — npm downloads month to 2026-08-21: framer-motion 178.3M, embla-carousel-react 148.8M, three 57.2M, gsap 18.6M, lenis 5.4M. GSAP now 100% free via Webflow. Codrops: six of ten most recent posts are Three.js/WebGPU.

Every download figure verified exactly against the registry API for the window 2026-07-23 to 2026-08-21: framer-motion 178,332,998; embla-carousel-react 148,764,137; three 57,243,093; gsap 18,570,930; lenis 5,408,853. GSAP free confirmed — Webflow acquired GreenSock 2024-10-15 and made GSAP, including the former Club plugins, 100% free for all users including commercial use from April 2025. Codrops feed confirmed: of the ten most recent posts (2026-08-10 to 2026-08-22), six are squarely Three.js/WebGL/WebGPU/shader pieces, so the claim is accurate and if anything conservative. The interpretive leap is what fails: npm downloads measure CI installs, mirrors and transitive dependencies, not sites. embla-carousel-react at 148.8M — outranking three.js nearly 3:1 — is almost certainly shadcn/ui's carousel dependency propagating, not 148M carousel decisions. https://api.npmjs.org/downloads/point/last-month/framer-motion, https://webflow.com/blog/gsap-becomes-free, https://tympanus.net/codrops/feed/

Corrected: These libraries are ubiquitous in the toolchain: npm downloads for the month ending 2026-08-21 were framer-motion 178.3M, embla-carousel-react 148.8M, three 57.2M, gsap 18.6M, lenis 5.4M. Treat these as toolchain ubiquity, not site adoption — npm counts are dominated by CI installs and transitive dependencies (embla's figure largely reflects shadcn/ui). GSAP has been 100% free for everyone including commercial use since April 2025, funded by Webflow, which acquired GreenSock in October 2024. Codrops' most recent ten posts (2026-08-10 to 2026-08-22) include six Three.js/WebGL/WebGPU shader pieces, which is a fair read of where the craft-agency aesthetic currently sits.

### PARTIALLY_TRUE — CSS linear() is Baseline widely available (Chrome 113, Firefox 112, Safari 17.2) with ~14.1% Chrome usage; Motion's duration-based springs export to CSS; Motion defaults tween 0.3s, bounce 0.25, damping 10, mass 1.

Baseline status and dates confirmed exactly: linear-easing is 'Widely available', Firefox 112 2023-04-11, Chrome/Chrome Android 113 2023-05-02, Edge 113 2023-05-05, Safari/Safari iOS 17.2 2023-12-11, low_date 2023-12-11, high_date 2026-06-11, Mozilla positive / Apple support. Usage has drifted: actual chrome daily usage is 0.137 (~13.7%), not 0.1407. The MDN characterisation of linear() approximating complex curves by linear interpolation between points is standard and consistent. NOT verified in this pass: Motion's specific transition defaults (tween 0.3s / 0.8s multi-keyframe, spring bounce 0.25, damping 10, mass 1), the visualDuration semantics, the CSS-export claim, and the State of CSS 2025 / Josh W. Comeau 'pick of the year' attribution — that last one in particular reads like colour and should be dropped unless sourced. https://api.webstatus.dev/v1/features/linear-easing

Corrected: Springs no longer require JavaScript. CSS linear() easing is Baseline widely available (Firefox 112 2023-04-11, Chrome 113 2023-05-02, Safari 17.2 2023-12-11; widely available as of 2026-06-11) and reports ~13.7% Chrome page-load usage; it approximates arbitrary curves, including spring and bounce physics, by interpolating linearly between many stops. Motion's duration-based springs are documented as exportable to CSS, but its specific numeric defaults and the State of CSS attribution were not verified and should be checked before being quoted.

### CONFIRMED — prefers-reduced-motion Baseline widely since 2020-01-15, on ~50% of pages (Almanac 2025: 49.99% desktop / 50.55% mobile); WCAG 2.3.3 AAA and 2.2.2 A; 'reduce' does not mean 'none'.

Almanac figures exact — Figure 6.6 of the 2025 Accessibility chapter gives desktop 49.99% and mobile 50.55%, noting it is the most widely used user-preference media query. WCAG 2.3.3 Animation from Interactions confirmed as Level AAA, criterion text 'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed', with the Intent section citing vestibular disorder reactions including 'dizziness, nausea and headaches' and 'nausea, migraine headaches, and potentially needing bed rest to recover'. Chrome's view-transitions doc confirms 'A preference for reduced motion doesn't mean the user wants no motion', recommending 'a more subtle animation, but one that still expresses the relationship between elements'. Worth noting the Almanac metric counts pages that reference the media query, not pages that implement it correctly, and says nothing about how many users have the OS setting enabled. https://almanac.httparchive.org/en/2025/accessibility, https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

### CONFIRMED — Motion's <MotionConfig reducedMotion='user'> disables transform and layout animations while preserving opacity/colour; useReducedMotion returns a boolean; Lenis honours the preference; Sec-CH-Prefers-Reduced-Motion is experimental.

Confirmed verbatim: reducedMotion='user' makes motion components 'automatically disable transform and layout animations, while preserving the animation of other values like opacity and backgroundColor'; useReducedMotion 'returns true/false depending on whether your visitor has Reduced Motion enabled', with documented uses for replacing transform animations with opacity on large elements, disabling video autoplay and disabling parallax. Lenis default confirmed separately from its README. One API precision fix: the site-level override is expressed by setting reducedMotion to 'always' or 'never' (Framer surfaces it at Site Settings > Accessibility), rather than the loose reducedMotion={userSetting} form in the claim. Sec-CH-Prefers-Reduced-Motion's experimental status was not re-fetched. https://motion.dev/docs/react-accessibility

### CONFIRMED — Vibration API Baseline 'limited' — Chrome 32 (2014), Chrome Android, Edge 79, no Safari, no Firefox; Apple position 'oppose'; sticky user activation required; Saudi mobile OS iOS 50.12% / Android 49.87%.

webstatus.dev confirms baseline 'Limited' with implementations limited to Chrome 32 (2014-01-14), Chrome Android 32 (2014-01-15) and Edge 79 (2020-01-15) — no Safari, no Firefox. Apple's standards position is confirmed as opposition, citing 'integration, use cases, portability, power, annoyance, and device independence'. Saudi mobile OS split confirmed independently at iOS 50.12% / Android 49.87% for July 2026, so the 'roughly half this audience' framing is exactly right. The sticky-user-activation requirement was not separately re-fetched from MDN but is uncontested. https://api.webstatus.dev/v1/features/vibration, https://gs.statcounter.com/os-market-share/mobile/saudi-arabia

### PARTIALLY_TRUE — July 2026 StatCounter: KSA mobile browsers Chrome 47.93 / Safari 45.96; KSA mobile OS iOS 50.12 / Android 49.87; KSA platform Mobile 65.43 / Desktop 33.61; UAE Chrome 73.44 / Safari 17.07, Android 77.82 / iOS 22.16; KSA iOS 26.x ~67.8%, iOS 18.x ~13.6%.

Every headline figure verified exactly against StatCounter for July 2026. KSA mobile browsers: Chrome 47.93%, Safari 45.96%, UC 2.76%, Samsung Internet 1.74%. KSA mobile OS: iOS 50.12%, Android 49.87%. KSA platform: Mobile 65.43%, Desktop 33.61%, Tablet 0.96%. UAE: Chrome 73.44% / Safari 17.07%; Android 77.82% / iOS 22.16%. iOS versions arithmetic checks out — 26.5 at 55.35% plus 26.4 4.45% plus 26.3 4% plus 26.2 4% = 67.8%; 18.7 10.43% plus 18.5 3.14% = 13.57%. The material omission: StatCounter's own iOS-version page carries a correction notice stating that Apple's Safari anti-fingerprinting changes misreported iOS 26.2 as 18.7 and iOS 26.1 as 18.6, with a correction applied 2026-01-19. The version split is therefore known-distorted and the 18.x residual overstates genuinely old devices. UAE's 59.35/40.02 platform mix was not verified. https://gs.statcounter.com/browser-market-share/mobile/saudi-arabia, https://gs.statcounter.com/ios-version-market-share/mobile/saudi-arabia, https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/saudi-arabia

Corrected: July 2026 StatCounter: Saudi mobile browsers Chrome 47.93% / Safari 45.96%; Saudi mobile OS iOS 50.12% / Android 49.87%; Saudi platform mix Mobile 65.43% / Desktop 33.61% / Tablet 0.96%. UAE is nearly inverted: Chrome 73.44% / Safari 17.07%, Android 77.82% / iOS 22.16%. Within Saudi iOS traffic, iOS 26.x totals roughly 67.8% with iOS 18.x around 13.6% — but treat the version split as indicative only: StatCounter notes Apple's Safari anti-fingerprinting changes misreported iOS 26.2 as 18.7 and 26.1 as 18.6 (correction applied 2026-01-19), so real iOS 26 adoption is likely higher and the legacy tail smaller.

### CONFIRMED — No logical property exists for transform/translate, so translateX slides run the wrong way in Arabic; margin-inline-start animation works but triggers layout; the fix is direction-scoped transforms with scaleX(-1). scroll(inline)/view(inline) are writing-mode aware, scroll(x) is not.

Ahmad Shadeed's RTL Styling guide confirms the core argument: there is no logical property for transform animations, animating margins 'is not good for performance, although it works', and the demonstrated pattern is .c-header[dir='rtl'] .c-link svg { transform: scaleX(-1); } for direction-scoped flipping. This is the single most under-appreciated constraint in the set for an Arabic-market build and it holds. The MDN half — that animation-timeline's scroll()/view() accept block | inline | x | y and that inline-axis progress depends on writing mode while x/y are physical — is consistent with MDN's axis documentation, though the exact wording was not quoted from a fetched page. https://rtlstyling.com/posts/rtl-styling

### PARTIALLY_TRUE — Peak-end rule: Kahneman & Fredrickson 1993 cold-pressor study, 80% preferred to repeat the longer (90s) trial; NN/g article by Alita Kendrick, 2018-12-30.

The substance is exact and the date is right, but the author attribution is wrong. The NN/g article 'The Peak-End Rule: How Impressions Become Memories' is by Lexie Kane, published 2018-12-30 — there is no Alita Kendrick. Study details confirmed: Round 1 was 60 seconds at 14C, Round 2 was 60 seconds at 14C followed by 30 seconds at 15C, and '80% of the study participants preferred Round 2 and chose to repeat that condition in the final trial', because 'a small improvement near the end of an experience radically shifted people's perception of that event'. The design application is confirmed verbatim: 'We remember our past in snapshots that focus on points of intensity and on the last impression of an event.' Independently corroborated against the underlying literature, which also notes ratings correlate near-zero with total duration (duration neglect). https://www.nngroup.com/articles/peak-end-rule/

Corrected: The peak-end rule is the strongest available evidence for 'one signature interaction beats twelve effects'. Kahneman & Fredrickson's 1993 cold-pressor study found 80% of participants chose to repeat the longer trial (60s at 14C plus 30s rising to 15C) over the shorter 60s one, because its final seconds were slightly less unpleasant. Retrospective ratings track the peak and the end and correlate near-zero with total duration. NN/g's application (Lexie Kane, 2018-12-30): design deliberately for the intense moments and the final moments of a journey, because memory is stored as snapshots, not a full record.

### UNSUPPORTED — NN/g distinguishes 'surface delight' (animation, sound, microcopy — often gimmicky) from 'deep delight' requiring functionality and reliability; aesthetic-usability effect makes users forgive minor but not major usability problems and masks issues in testing.

Not independently verified in this pass — neither the 'Theory of User Delight' article nor the 'Aesthetic-Usability Effect' article was fetched, and the quoted phrase 'often gimmicky and have the potential for tackiness if the underlying product is less than perfect' was not confirmed against the source. Both articles do exist as NN/g titles and the surface/deep delight framing is genuine NN/g material, so this is very likely true rather than fabricated — but per the standard applied to the rest of this set it cannot be marked confirmed without the fetch. The researcher also flagged it as pre-2023 (2017-03-05). Verify the exact wording before quoting it in the deliverable.

### CONFIRMED — CHI 2026 scrollytelling study (N=454) found higher engagement, lower cognitive load and greater willingness to adopt, but matched other formats on comprehension; a second 2026 study (N=25) found interactive onboarding beat static on adherence with no comprehension difference.

Both papers are real and both are described accurately. arXiv:2603.04367 'Scrollytelling as an Alternative Format for Privacy Policies' by Gonzalo Gabriel Mendez and Jose Such, submitted 2026-03-04, N=454, comparing scrollytelling against plain text, two nutrition-label variants and a standalone interactive visualisation; findings confirmed as higher engagement, lower cognitive load, greater willingness to adopt and increased perceived clarity, matching on comprehension accuracy and confidence, with changes in perceived understanding, transparency and trust 'small and statistically inconclusive'. CHI 2026 venue and DOI 10.1145/3772318.3790704 confirmed. arXiv:2607.03023 confirmed as 'A Comparative Study of Static, Scrollytelling, and Chatbot Visualization Onboarding Techniques for UX Designers', 2026-07-03, N=25, with significantly higher guideline-adherence and engagement for interactive conditions and 'Comprehension did not differ significantly across conditions'. The framing that scrollytelling improves experience rather than comprehension is exactly what both papers support. https://arxiv.org/abs/2603.04367, https://arxiv.org/abs/2607.03023

### PARTIALLY_TRUE — Scrolly2Reel (Zong et al., arXiv:2403.18111) retargets newsroom scrollytelling into social video using narrative beats.

The paper and its content are exactly as described — 'Scrolly2Reel: Retargeting Graphics for Social Media Using Narrative Beats', arXiv:2403.18111, submitted 2024-03-26 and revised 2024-06-19, using 'the scriptwriting concept of narrative beats to extract fundamental storytelling units' so newsrooms can repurpose web graphics for short-video platforms where younger audiences increasingly consume news. But the authorship is wrong: the authors are Duy K. Nguyen, Jenny Ma, Pedro Alejandro Perez and Lydia B. Chilton. No author named Zong appears on the paper. https://arxiv.org/abs/2403.18111

Corrected: A scrollytelling sequence can be systematically retargeted into short-form social video using 'narrative beats' as the extraction primitive — the Scrolly2Reel system (Nguyen, Ma, Perez & Chilton, arXiv:2403.18111, 2024-03-26) transforms newsroom scrollies into social videos aligned to narration with controllable pacing, explicitly motivated by younger audiences shifting from print to short-video platforms.

### CONFIRMED — Speculation Rules prerendering: moderate = 200ms desktop hover / mobile 500ms after scroll stop within 30% vertical distance; eager = 10ms hover, 50ms viewport; limits immediate 50 prefetch / 10 prerender, others 2 FIFO; suppressed under Save-Data, battery saver, memory pressure, background tabs, Preload off.

Every number confirmed against Chrome's prerender documentation. Moderate: 'On desktop, performs speculations if you hold the pointer over a link for 200 milliseconds', with mobile viewport heuristics firing 500ms after scroll stops for anchors within 30% of the vertical distance. Eager: 'On desktop, performs speculations if you hold the pointer over a link for 10 millisecond', mobile 50ms after the anchor enters the viewport. Limits table confirmed: immediate = 50 prefetch / 10 prerender; eager, moderate and conservative = 2 each on a FIFO basis. Suppression conditions confirmed: Save-Data, energy saver on low battery, memory constraints, 'Preload pages' disabled, and background tabs. Defaults noted as immediate for list rules and conservative for document rules. The specific 'Chrome 143 / January 2026' provenance for the eager change was not separately confirmed, but the values themselves are current. https://developer.chrome.com/docs/web-platform/prerender-pages

### CONFIRMED — GSAP ScrollTrigger is not scrolljacking; scrub:1 is a one-second catch-up; anticipatePin exists because browsers repaint scroll on a separate thread, flashing ~1/60th second of unpinned content.

Confirmed verbatim on all three points. Scroll-jacking: 'Nope! The closest thing to scroll-jacking would be the [optional] snapping behavior but even that merely animates the native scroll position and it automatically relinquishes control the moment the user attempts to scroll.' anticipatePin: 'If you pin large sections/panels you may notice what looks like a slight delay in pinning when you scroll quickly. That's caused by the fact that most modern browsers handle scroll repaints on a separate thread, so at the moment of pinning the browser may have already painted the pre-pinned content, making it visible for perhaps 1/60th of a second.' scrub as a number is 'The amount of time (in seconds) that the playhead should take to catch up', so scrub:1 is a one-second catch-up. Smoothing being a separate opt-in product (ScrollSmoother) is consistent with the docs' framing. https://gsap.com/docs/v3/Plugins/ScrollTrigger/

### CONFIRMED — svh/lvh/dvh are Baseline widely available (Safari 15.4 2022-03-14, Chrome 108 2022-11-29, widely available since 2025-06-05).

Exact match on every date. webstatus.dev viewport-unit-variants: baseline widely available, low_date 2022-12-05, high_date 2025-06-05; Safari and Safari iOS 15.4 on 2022-03-14, Firefox and Firefox Android 101 on 2022-05-31, Chrome and Chrome Android 108 on 2022-11-29, Edge 108 on 2022-12-05. This is the least contentious claim in the set and it holds without qualification. https://api.webstatus.dev/v1/features/viewport-unit-variants

### PARTIALLY_TRUE — Motion has stagger primitives with from: 'first'|'last'|'center'|index; scroll-driven view() timelines give per-item entry with no JS; no sourced study gives an optimal stagger interval, so NN/g's 100-400ms window and 500ms ceiling are the only defensible bounds.

Correctly and honestly labelled by the researcher as inferred, and the reasoning is sound — the NN/g bounds it leans on (100-400ms fade rates, >500ms perceived too slow) are independently confirmed from Scroll Fading 101, and the view() timeline mechanism is confirmed from webstatus.dev and MDN. What was not verified in this pass is the exact Motion stagger API surface: the delayChildren: stagger(0.1) form and the from: 'first' | 'last' | 'center' | index option set were not fetched from motion.dev/docs/react-transitions. Check the API shape against current docs before writing implementation guidance, since Motion has renamed staggering options across major versions. https://www.nngroup.com/articles/scroll-fading-101/

### Corrections applied

- Chrome telemetry reports scroll-driven animations on 0.05488 of page loads (~5.5%), not 0.0558/5.6%; flexbox calibration is 0.834922, not 0.8346 (webstatus.dev, 2026-08-22). The order of magnitude and the calibration argument stand; the decimals have drifted.
- NN/g 'Scrolljacking 101' (Sara Paul, 2023-08-06) does not recommend sticky navigation as an escape hatch. Its actual recommendations are: below-the-fold only, never change scroll direction, minimise text inside scrolljacked sections, optimise scroll rate by testing, include normal-scrolling sections on the same page, progressively disclose only valuable contextual information, and — critically — avoid scrolljacking on mobile entirely where possible. For a site with 65.43% mobile traffic, that last one is a near-prohibition, not a caution.
- The NN/g peak-end rule article is by Lexie Kane (2018-12-30), not Alita Kendrick. The substance is exact: 80% of participants chose to repeat the 90s trial (60s at 14C followed by 30s rising to 15C) over the 60s trial.
- Scrolly2Reel (arXiv:2403.18111) is by Duy K. Nguyen, Jenny Ma, Pedro Alejandro Perez and Lydia B. Chilton — not 'Zong et al.' The paper, title and narrative-beats mechanism are otherwise exactly as described.
- React's <ViewTransition> is documented against React 19.3.0-canary (canary build dated 2026-08-14), not 'the React 19.2 reference'. It remains labelled 'currently only available in React's Canary and Experimental channels', and the prefers-reduced-motion warning is verbatim correct.
- The 4-second view-transition timeout is measured from the start of navigation, not from when the new document begins rendering — network latency and TTFB are inside the budget, and exceeding it skips the transition with a TimeoutError DOMException. It is documented in the cross-document guide, not the same-document one, which carries no timeout.
- NN/g's homepage article is 'Homepage Design: 5 Fundamental Principles' by Huei-Hsin Wang (2024-03-15); the motion guidance sits under Principle 5 'Keep Homepages Simple' as 'Minimize motion and animation', and the five-second pause/stop requirement is attributed there to WCAG 2.1.
- Bundle sizes mix unit conventions and should be restated consistently in raw gzipped bytes: three@0.185.1 = 182,364 B; mapbox-gl@3.29.0 = 499,133 B; maplibre-gl@6.5.0 = 255,785 B; lenis@1.3.26 = 5,473 B. As written, 'three 178KB' uses KiB while 'mapbox 499KB / maplibre 256KB' use decimal KB, so the figures are not directly comparable. The decision-relevant ratio (mapbox is roughly double maplibre) holds either way.
- Motion's own docs give the full `motion` component as 34kb, not 45kb; the 45KB figure is bundlephobia's measurement of the `motion` package entry point. These are different measurements and should not be presented in the same list without distinction. The LazyMotion figures (4.6kb initial, +15kb domAnimation, +25kb domMax, 2.3kb useAnimate mini) are verbatim correct, with the docs' caveat that all sizes are from Rollup bundles and Webpack will produce slightly larger ones.
- CSS linear() Chrome page-load usage is 0.137 (~13.7%), not 0.1407/14.1%. Baseline dates are correct (Firefox 112 2023-04-11, Chrome 113 2023-05-02, Safari 17.2 2023-12-11; widely available as of 2026-06-11).
- web.dev's demo reports 50% of frames dropped when animating top/left versus 'only 1% of frames were dropped' with transform — the '99% retained' framing is the FPS-meter reading of the same result, so state one or the other, not a mix.
- npm download counts are not a measure of site adoption. They are dominated by CI installs, mirrors and transitive dependencies — embla-carousel-react's 148.8M almost certainly reflects its inclusion in shadcn/ui rather than 148M independent carousel decisions. The download table supports 'these libraries are ubiquitous in the toolchain', not 'this is what agency sites look like'.
- StatCounter's own iOS-version page carries a correction notice: Apple's Safari anti-fingerprinting changes misreported iOS 26.2 as 18.7 and iOS 26.1 as 18.6, with a correction applied 2026-01-19. The ~13.6% iOS 18.x residual is therefore not a trustworthy count of genuinely old devices, and the ~67.8% iOS 26.x figure is a floor rather than a precise value.

### Flagged as not covered

- No layout-stability analysis. The dimension never mentions Cumulative Layout Shift, yet entrance animations, scroll-triggered reveals and view transitions are among the most common CLS sources. A motion doc that quantifies bundle bytes and INP but ignores CLS has skipped the Core Web Vital that motion most directly damages.
- No fallback strategy for browsers without scroll-driven animations. The doc leans on scroll timelines being Baseline-usable for this audience, but never specifies what happens on the remainder — no @supports (animation-timeline: view()) gate, no IntersectionObserver fallback, no statement of whether the signature interaction degrades to static or to a JS path. Since Firefox is behind a flag and part of the iOS tail is pre-26, this is a required decision, not a detail.
- No device-tier or thermal strategy. Roughly half of Saudi mobile traffic is Android, much of it mid-range, and three.js/WebGL work drains battery and thermally throttles on exactly those devices. Nothing on navigator.deviceMemory, hardwareConcurrency, Save-Data, or a low-end bail-out — despite the doc listing three.js bundle weights as though transfer size were the only cost.
- No competitive scan of the actual market. The 'agency default' is argued entirely from npm download counts, which measure toolchains rather than sites. Differentiation strategy for a Saudi/UAE travel brand needs a look at what Almosafer, Rehlat, Wego and the regional OTAs actually ship, plus what the global reference set (Airbnb, Booking, Kayak) does with motion in a booking funnel.
- No motion in the booking funnel. Every research citation and every implementation constraint concerns marketing-page motion — heroes, scrollytelling, signature moments. Nothing covers the motion that actually touches revenue: search-result and availability loading states, skeletons versus spinners, date-picker and calendar transitions, multi-step checkout transitions, price-change and error-state animation. That is where INP and perceived speed convert or don't.
- No Arabic-specific motion considerations beyond direction. The RTL transform point is good but stops at geometry. Nothing on animating Arabic text (shaping and connected forms make character-level or typewriter effects fragile), on animated numeric counters needing Arabic-Indic versus Western digit handling, on line-height and diacritic clipping during scale/fade transitions, or on bilingual layouts where the language toggle itself is a direction-flipping transition.
- No measurement or validation plan. The strategy asserts that one signature interaction outperforms twelve mediocre ones, but proposes no way to know: no field RUM for INP and CLS, no scroll-depth or interaction-rate instrumentation on the signature moment, no A/B or before/after design. The peak-end argument is a hypothesis the doc treats as a conclusion.
- No reconciliation of the browser default against the research. The UA view-transition default is 250ms, while NN/g's band for substantial screen changes is 200-300ms and its entering/exiting asymmetry suggests 300ms in / 200-250ms out. The doc proposes a 120-320ms token set without ever addressing whether to accept, override, or tokenise around the 250ms UA baseline — which is the single most concrete implementation decision in the whole dimension.
- No adjacent accessibility media queries. prefers-reduced-motion is covered well, but prefers-reduced-transparency, prefers-contrast and forced-colors all interact with the blur, glass, gradient and overlay effects that accompany 'premium agency' motion, and none are mentioned.
- No governance note on GSAP. It is free now because Webflow, a commercial competitor in the site-building space, chose to fund it. That is a supply-chain and roadmap dependency worth one line in a document recommending it, especially alongside Motion and Lenis which have different funding models.
- No concrete reduced-motion implementation for the chosen techniques. The doc establishes that 'reduce' does not mean 'none' but never shows the pattern — e.g. scoping ::view-transition-group(*) animation overrides inside @media (prefers-reduced-motion: reduce), or pairing MotionConfig with a site-level user override toggle, which is precisely what NN/g praised Crown for.
- No content or asset budget for the signature moment. If the one signature interaction is 3D or video-backed, someone has to produce, compress and art-direct that asset for a travel package. Nothing on source imagery, video encoding, poster frames, or who supplies it — which is usually what kills a signature interaction in delivery rather than any technical constraint listed here.

## Sources

- [Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) · Nielsen Norman Group (Sara Paul) · 2023-08-06  
  Usability-study evidence that scrolljacking causes disorientation, annoys task-oriented users, is worse on mobile, and the specific mitigations (below the fold only, no direction change, sticky nav escape hatch, limit text).
- [Scroll Fading 101](https://www.nngroup.com/articles/scroll-fading-101/) · Nielsen Norman Group (Sara Paul) · 2023-12-08  
  The 100–400ms fade-in window, the >500ms 'too slow' threshold, element persistence (animate once), one-element-type-at-a-time, and the illusion-of-completeness risk.
- [Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/) · Nielsen Norman Group · 2024-03-15  
  Guideline 5.2: minimise motion; do not animate logo/tagline/headline; scroll-triggered text animations delay users; moving elements read as ads; provide a prominent motion-disable control (Crown).
- [Executing UX Animations: Duration and Motion Characteristics](https://www.nngroup.com/articles/animation-duration/) · Nielsen Norman Group (Page Laubheimer) · 2020-02-09  
  Duration bands (100ms feedback, 200–300ms screen changes, 100–500ms general, 500ms drag ceiling), enter-longer-than-exit, ease-out default. FLAGGED: pre-2023 (2020), principle-level.
- [The Peak–End Rule: How Impressions Become Memories](https://www.nngroup.com/articles/peak-end-rule/) · Nielsen Norman Group (Alita Kendrick) · 2018-12-30  
  Kahneman & Fredrickson 1993 cold-pressor study (80% preferred the longer trial with the better ending); the case for designing one peak plus a strong ending rather than spreading effects. FLAGGED: pre-2023 (2018), principle-level.
- [The Theory of User Delight: When Delight Doesn't Matter](https://www.nngroup.com/articles/theory-user-delight/) · Nielsen Norman Group · 2017-03-05  
  Surface vs deep delight; animation classed as surface delight and 'often gimmicky'; delight requires functional/reliable/usable first. FLAGGED: pre-2023 (2017), principle-level.
- [Web Platform Status API — scroll-driven-animations, view-transitions, cross-document-view-transitions, linear-easing, prefers-reduced-motion, vibration, viewport-unit-variants, starting-style](https://api.webstatus.dev/v1/features/scroll-driven-animations) · Google / Chrome (webstatus.dev) · accessed 2026-08-22  
  Authoritative Baseline status, per-browser versions with ship dates, Chrome page-load usage fractions, and vendor positions (Apple 'oppose' on Vibration) for every platform feature cited.
- [Same-document view transitions for single-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) · Chrome for Developers · accessed 2026-08-22  
  Unique view-transition-name requirement, single-transition-at-a-time rule, width/height layout-per-frame caveat, the 300ms cubic-bezier(0.4,0,0.2,1) example, and 'reduced motion doesn't mean no motion'.
- [Cross-document view transitions for multi-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) · Chrome for Developers · 2024-04-14  
  @view-transition { navigation: auto }, same-origin restriction, thumbnail-to-hero pattern, pageswap/pagereveal, view-transition-types, 4-second timeout, prerendering recommendation.
- [Prerender pages in Chrome for instant page navigations](https://developer.chrome.com/docs/web-platform/prerender-pages) · Chrome for Developers · accessed 2026-08-22  
  Speculation Rules eagerness definitions (moderate = 200ms hover desktop / 500ms-after-scroll-stop mobile heuristics; eager changed in Chrome 143), Chrome limits table (50/10 immediate, 2 FIFO otherwise), and suppression under Save-Data, energy saver, memory constraints.
- [Animations guide](https://web.dev/articles/animations-guide) · web.dev (Chrome team) · accessed 2026-08-22  
  transform and opacity as the only compositor-safe properties; the ~99% vs ~50% frame-retention DevTools comparison; will-change guidance.
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp) · web.dev (Chrome team) · last updated 2025-09-02  
  INP thresholds (≤200ms good, >500ms poor) and the three interaction phases (input delay, processing, presentation delay).
- [WCAG 2.2 Understanding SC 2.3.3 Animation from Interactions and SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) · W3C Web Accessibility Initiative · WCAG 2.2 (accessed 2026-08-22)  
  AAA requirement that interaction-triggered motion be disableable, vestibular-disorder rationale, prefers-reduced-motion as a sufficient technique; and the Level A five-second rule for automatic motion.
- [Web Almanac 2025 — Accessibility chapter, Figure 6.6 User preference media queries](https://almanac.httparchive.org/en/2025/accessibility) · HTTP Archive · 2025  
  prefers-reduced-motion appears on 49.99% of desktop and 50.55% of mobile pages; forced-colors up 5% to 19%; adoption of user-preference queries broadly flat year over year.
- [prefers-reduced-motion (CSS media feature) and Sec-CH-Prefers-Reduced-Motion (HTTP client hint)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) · MDN Web Docs · accessed 2026-08-22  
  OS setting paths per platform, the 'reduce, don't remove' guidance, and the client hint's Limited-availability/Experimental status (so reduced motion cannot be reliably server-rendered).
- [MDN: animation-timeline, scroll(), view-transition-name, ::view-transition-group, linear(), Navigator.vibrate](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) · MDN Web Docs · accessed 2026-08-22  
  scroll()/view() axis values (block|inline|x|y) and that progress depends on axis AND writing mode; view-transition-name uniqueness and match-element being same-document only; the 0.25s UA default view-transition duration; linear() as a spring approximation; vibrate() requiring sticky user activation.
- [Lenis — README (Reduced motion, Limitations)](https://github.com/darkroomengineering/lenis) · darkroom.engineering · main branch, fetched 2026-08-22  
  Honours prefers-reduced-motion by default (lerp forced to 1); no CSS scroll-snap support; capped to 60fps on Safari (WebKit bug 173434) and 30fps in low power mode; anchors disabled unless opted in.
- [Motion for React — Transitions, Accessibility, Reduce bundle size, Scroll animations](https://motion.dev/docs/react-transitions) · Motion · accessed 2026-08-22  
  Documented defaults (tween 0.3s / 0.8s multi-keyframe; spring bounce 0.25, damping 10, mass 1), visualDuration, stagger API; MotionConfig reducedMotion='user' semantics; 4.6KB m+LazyMotion vs 34KB motion vs 2.3KB useAnimate mini; native ScrollTimeline usage.
- [GSAP ScrollTrigger documentation and GSAP pricing](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · GSAP / Webflow · accessed 2026-08-22  
  'No scroll-jacking' claim and composability with CSS scroll snapping; scrub:1 catch-up semantics; anticipatePin and the compositor-thread repaint flash; and that GSAP plus all plugins are now free for commercial use, funded by Webflow.
- [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling) · Ahmad Shadeed · accessed 2026-08-22  
  There is no logical property for translate animations; animating margin-inline-start works but is bad for performance; the [dir=rtl] + scaleX(-1) transform pattern; broader Arabic layout/typography mirroring guidance.
- [Scrollytelling as an Alternative Format for Privacy Policies (CHI 2026)](https://arxiv.org/abs/2603.04367) · arXiv / ACM CHI 2026 (Méndez & Such) · 2026-03-04  
  N=454 controlled study: scrollytelling raised engagement, lowered cognitive load, increased perceived clarity and willingness to adopt, but matched other formats on comprehension accuracy — the basis for using it for story, not for facts.
- [Scrolly2Reel: Retargeting Graphics for Social Media Using Narrative Beats](https://arxiv.org/abs/2403.18111) · arXiv · 2024-03-26  
  The narrative-beat primitive for converting scrollytelling sequences into short-form social video — the mechanism behind authoring itinerary beats once and publishing them twice.
- [StatCounter Global Stats — Saudi Arabia and UAE (mobile browser, mobile OS, platform, iOS version)](https://gs.statcounter.com/browser-market-share/mobile/saudi-arabia) · StatCounter · July 2026 data, accessed 2026-08-22  
  July 2026: Saudi mobile Chrome 47.93% / Safari 45.96%; Saudi mobile OS iOS 50.12% / Android 49.87%; Saudi mobile 65.43% of platform; UAE Chrome 73.44% / Safari 17.07%, Android 77.82%, mobile 59.35%; Saudi iOS 26.x ≈ 67.8% of iOS traffic.
- [Bundlephobia size API and npm registry downloads API](https://bundlephobia.com/api/size?package=three) · Bundlephobia / npm · queried 2026-08-22  
  Gzipped weights for three/globe.gl/drei/fiber/mapbox-gl/maplibre-gl/cobe/gsap/motion/lenis/embla, and monthly npm download counts (framer-motion 178.3M, three 57.2M, gsap 18.6M, lenis 5.4M) evidencing both the cost of 3D and the ubiquity of the default stack.
- [React reference: <ViewTransition>](https://react.dev/reference/react/ViewTransition) · React (Meta) · React 19.2 docs, accessed 2026-08-22  
  The component is Canary/Experimental as of the React 19.2 docs; React does not automatically honour prefers-reduced-motion; how React assigns view-transition-name and coordinates startViewTransition.
- [State of CSS 2025 — Features and Interactions pain points](https://2025.stateofcss.com/en-US/features/) · Devographics · 2025  
  Developer-side signal that scroll-driven animation browser support and new interaction-pattern accessibility are current pain points, and that linear() as a CSS spring generator was a community pick of the year.
- [Codrops RSS feed (August 2026)](https://tympanus.net/codrops/feed/) · Codrops · fetched 2026-08-22  
  Evidence of the current award-site default aesthetic: six of the ten most recent posts (2026-08-10 to 2026-08-22) are Three.js/WebGPU shader pieces — i.e. the 2026 copyable template.
- [Scroll-driven Animations (demos and tools)](https://scroll-driven-animations.style/) · Bramus Van Damme (Chrome DevRel) · accessed 2026-08-22  
  Reference implementations of scroll and view progress timelines (reading progress, image reveal, stacking cards, cover-to-header) and the off-main-thread rationale — the practical pattern library for the CSS-first approach.
