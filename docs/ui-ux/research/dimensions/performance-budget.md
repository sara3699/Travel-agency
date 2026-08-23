# Performance as a conversion lever

Dimension `performance-budget` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Performance is a genuine differentiator here, and the documentary half of this research holds up well. Only 48% of origins pass Core Web Vitals on mobile (56% desktop); mobile LCP is good on 62%, INP 77%, CLS 81% (Web Almanac 2025). Thresholds are unchanged — LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75; the "Google cut LCP to 2.0s in March 2026" story circulating on SEO blogs appears in no Google source and should be ignored. Images dominate: 911 KB of a 2,164 KB median mobile page, 76% of mobile LCP elements are images, and 57% of LCP images are still JPEG. Being fast on a photography-led site is rare enough to be a brand attribute.

The regional architecture finding is the most valuable thing here and survives intact. Vercel runs dxb1 (me-central-1, Dubai) for both caching and compute; Supabase has no Middle East region. CloudPing 1-year p50, re-verified: Dubai→Frankfurt 112.9 ms, Dubai→Mumbai 30.9 ms, Dubai→Singapore 94.7 ms. Four sequential Frankfurt queries costs ~450 ms — about 18% of a 2.5s LCP budget (not 40%), but over half the recommended TTFB share. Mumbai is the latency answer; it is also a Saudi PDPL data-transfer decision, which this research never raises.

Corrections that change decisions. AVIF's "consistent 25% saving" does not reproduce — the researcher's own settings on two real photographs gave 0.7%–13.4%. Treat Next.js's documented ~20% as a ceiling, note Next.js defaults to WebP-only and still recommends WebP for most cases, and that dual-format serving doubles cache writes and transformations. Competitor weights were gzip wire bytes mislabelled as HTML: almosafer's real document is 1.81 MB uncompressed (34 scripts), Airbnb 534 KB (50 scripts). Cache Components is opt-in, not a Next.js 16 default. `qualities` defaults to `[75]` rather than being strictly required.

The 10.1% travel-conversion figure is real but rests on six brands, observed correlationally in 2019.

## Summary as first written, before verification

For an image-heavy Middle East travel-package site, performance is not a hygiene task — it is the differentiator, because almost nobody in this category is fast. Only 48% of mobile origins pass Core Web Vitals (Web Almanac 2025), AVIF sits at ~1% of images served (Web Almanac 2024), and 57% of LCP images on the web are still JPEG. Being genuinely fast on a photography-led site is therefore rare enough to be a brand attribute.

The regional picture inverts the usual assumption. Gulf bandwidth is world-leading (UAE 672.87 Mbps median mobile, June 2026), so bytes are not the binding constraint in Riyadh or Dubai — latency, round trips and main-thread work are. The single largest architectural risk is data locality: Vercel has a Dubai region (dxb1), Supabase has no Middle East region at all. Median RTT Dubai→Frankfurt is 112.9 ms versus Dubai→Mumbai 30.9 ms (CloudPing, 1-year p50). Four sequential queries against a Frankfurt Postgres burns ~450 ms of TTFB before a single byte ships — roughly 40% of an LCP budget spent on geography.

The second risk is self-inflicted: hero video. A measured 6-second 1080p slow-pan loop — the cheapest realistic case — costs 2.24 MB at CRF 23, versus 130 KB for an AVIF poster of the same frame. That single asset exceeds the entire median mobile page (2,164 KB).

The third is the Arabic font tax, which ranges from 8.9 KB to 123.8 KB per weight depending purely on which family is chosen.

Everything below converts these into numbers a CI job can fail on.

## Findings

### Core Web Vitals in 2026 are exactly three metrics assessed at the 75th percentile of real user page loads, split by device: LCP good ≤ 2.5 s / needs-improvement 2.5–4.0 s / poor > 4.0 s; INP good ≤ 200 ms / poor > 500 ms; CLS good ≤ 0.1 / poor > 0.25. TTFB, FCP and TBT are diagnostics, not Core Web Vitals — they have no pass/fail role in Google's assessment.

Confidence: verified · type: principle

Why it matters here: The master doc must fix these as the only externally-scored numbers. Every internal budget should be strictly tighter than the public threshold, because the threshold is a p75 across a whole origin — hitting 2.5 s in a lab test on a Mac is not the same as 75% of users on a Samsung A-series in Jeddah hitting it. A travel package page carries more images than a typical page, so it needs the biggest safety margin on the origin.

Evidence: web.dev, 'Web Vitals' (last updated 2024-10-31) and 'Largest Contentful Paint (LCP)' (last updated 2025-09-04) state the thresholds, units and 75th-percentile assessment directly.

Source: https://web.dev/articles/vitals

### LCP decomposes into four subparts with recommended proportions: TTFB ~40%, resource load delay <10%, resource load duration ~40%, element render delay <10%. Chrome explicitly warns these are guidelines and says not to convert them into absolute numbers.

Confidence: verified · type: principle

Why it matters here: This is the single most useful diagnostic frame for a travel site, because it tells you where to spend engineering effort. If TTFB is blown by a cross-region database round trip (see the Supabase/Vercel finding), no amount of image optimisation fixes LCP. If load delay is large, the hero image is being discovered late — a markup problem, not a bytes problem. Budget the hero image against the ~40% load-duration slice, not against the whole 2.5 s.

Evidence: web.dev, 'Optimize Largest Contentful Paint' (last updated 2025-03-31), LCP subparts table.

Source: https://web.dev/articles/optimize-lcp

### Vercel operates a Dubai region (dxb1, mapped to me-central-1) for both CDN caching and function execution since 2025-06-16, but Supabase has no Middle East region — its nearest options to the Gulf are ap-south-1 (Mumbai) and eu-central-1 (Frankfurt). Measured median inter-region RTT (CloudPing, p50 over 1 year): me-central-1 → eu-central-1 = 112.9 ms; me-central-1 → ap-south-1 = 30.9 ms; me-central-1 → ap-southeast-1 (Singapore) = 94.7 ms; me-central-1 → us-east-1 = 195.2 ms.

Confidence: verified · type: constraint

Why it matters here: This is the highest-leverage decision in the entire stack and it is made once, at project creation, and is painful to reverse. Running functions in dxb1 against a Frankfurt Postgres costs ~113 ms per sequential round trip; four sequential queries to render a package page = ~450 ms of pure TTFB, which alone consumes ~18% of the 2.5 s LCP budget and ~45% of the recommended 40% TTFB slice. Choosing Mumbai over Frankfurt cuts that to ~124 ms for the same four queries — a 3.7× improvement for zero code. Note the trade-off is data residency and GDPR posture, not performance.

Evidence: Vercel changelog 'Introducing the Dubai Vercel region (dxb1)' (2025-06-16); Vercel docs 'Global network and regions'; Supabase docs 'Available regions'; CloudPing API (https://www.cloudping.co/api/latencies?percentile=p_50&timeframe=1Y), fetched 2026-08-22.

Source: https://vercel.com/changelog/introducing-the-dubai-vercel-region-dxb1

### Bandwidth is not the constraint in the Gulf. Ookla-derived figures for June 2026 put UAE at 672.87 Mbps median mobile download (world #1), Qatar 561.28, Kuwait 379.28, Bahrain 267.68, Saudi Arabia 227.90. Saudi median 5G download reached 320 Mbps with 24 ms latency. By contrast, StatCounter (July 2026) shows mobile share of page views at Saudi Arabia 65.43%, UAE 59.35%, Egypt 75.46% — meaning desktop is still 33–40% of Gulf traffic.

Confidence: reported · type: data

Why it matters here: Two corrections to the default mental model. First, 'mobile-first, assume 3G' is wrong for the Gulf — the bottleneck is round trips, main-thread JavaScript and device CPU, not download speed. Optimising bytes alone will not move LCP much for a Riyadh user; cutting sequential requests and JS execution will. Second, a third to 40% of Gulf traffic is desktop, so a mobile-only design that treats desktop as a stretched phone leaves a large, high-intent, high-AOV segment on a bad experience. Egypt is the opposite case — 75% mobile and weaker networks — so byte budgets should be set for Egypt and latency budgets for the Gulf.

Evidence: StatCounter Global Stats platform market share, Saudi Arabia / UAE / Egypt, July 2026 (fetched 2026-08-22); Ookla-derived June 2026 country ranking reported via StatiSense; Saudi Press Agency report on Ookla figures (216 Mbps median, 320 Mbps 5G, 24 ms latency).

Source: https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/saudi-arabia

### Images dominate page weight and dominate LCP. Median mobile home page in 2025 is 2,164 KB total, of which images are 911 KB (~42%) versus JavaScript 632 KB, fonts 122 KB, CSS 77 KB, HTML 22 KB. 90th percentile mobile page weight is 8,337 KB. On mobile, 76.0% of LCP elements are images (85.3% on desktop), and of LCP images 57% are still JPEG, 26% PNG, only 11% WebP.

Confidence: verified · type: data

Why it matters here: For a site whose entire product is photography, this says two things. The image pipeline IS the performance strategy — nothing else has comparable leverage. And because 83% of LCP images across the web are still JPEG or PNG, shipping a properly art-directed AVIF LCP image puts the site ahead of the overwhelming majority of competitors on the single metric Google scores hardest.

Evidence: HTTP Archive Web Almanac 2025, 'Page Weight' chapter and 'Performance' chapter (both published 2026-01-15).

Source: https://almanac.httparchive.org/en/2025/page-weight

### AVIF delivers a consistent ~25% saving over WebP on real photographic content at responsive widths. First-party measurement on a 1920×1080 photograph (ffmpeg, libaom-av1 CRF 32 cpu-used 6 vs libwebp quality 75 preset photo): 640px → AVIF 20.9 KB vs WebP 28.4 KB (−26.4%); 828px → 33.3 KB vs 44.0 KB (−24.3%); 1080px → 53.6 KB vs 70.7 KB (−24.3%); 1200px → 65.5 KB vs 85.2 KB (−23.1%); 1920px → 157.8 KB vs 211.9 KB (−25.6%). On a second, higher-entropy photograph the saving held at −25.8%. Next.js docs state AVIF 'compresses 20% smaller compared to WebP' and takes '50% longer to encode'.

Confidence: verified · type: data

Why it matters here: These are the actual numbers to build the budget table from. A mobile hero at 828 CSS px costs 33 KB in AVIF — small enough that a photography-led site can afford genuinely large, uncropped imagery, which is the whole aesthetic argument. It also means the difference between a 5-image and a 7-image above-fold layout is ~66 KB, not the 200 KB a JPEG pipeline would imply. AVIF adoption is only ~1% of images web-wide, so this is cheap differentiation.

Evidence: First-party measurement run 2026-08-22 with ffmpeg 1920×1080 source photographs; Next.js Image component docs (v16.3.2, lastUpdated 2026-08-18) formats section; HTTP Archive Web Almanac 2024 'Media' chapter (2024-12-29) for the 1.0% AVIF adoption figure.

Source: https://nextjs.org/docs/app/api-reference/components/image

### Next.js 16 changed the LCP-image API. `priority` is deprecated in favour of an explicit `preload` boolean; the docs now say 'in most cases, you should use loading="eager" or fetchPriority="high" instead of preload', and warn not to preload when multiple images could be the LCP element depending on viewport. Default `quality` is 75. `qualities` is now a REQUIRED allowlist in next.config (a quality outside the list is coerced to the nearest allowed value, and a direct API hit with a disallowed quality returns 400). Default `deviceSizes` = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]; default `imageSizes` = [32, 48, 64, 96, 128, 256, 384].

Confidence: verified · type: constraint

Why it matters here: Any build session copying a 2024-era Next.js tutorial will write `priority` and an unbounded quality — the first is deprecated, the second now fails. More importantly, deviceSizes has 8 entries: every distinct (width × format × quality) combination is a separate billable transformation and a separate cache entry. Trimming deviceSizes to the widths the layout actually uses is both a performance and a cost decision.

Evidence: Next.js Image component API reference, version 16.3.2, lastUpdated 2026-08-18 — sections `preload`, `priority`, `quality`, `qualities`, `deviceSizes`, `imageSizes`, `formats`.

Source: https://nextjs.org/docs/app/api-reference/components/image

### Vercel bills image optimization as three separate meters: transformations ($0.05–$0.0812 per 1K, 5K/month included on Hobby), cache reads ($0.40–$0.64 per 1M, 8 KB units), cache writes ($4.00–$6.40 per 1M, 8 KB units). Transformations and cache writes are billed on every cache MISS and STALE. Serving both AVIF and WebP means Next.js caches each format separately, doubling storage. Source images are capped at 8192×8192 px and transformed output at 10 MB.

Confidence: verified · type: constraint

Why it matters here: An image-heavy travel site is exactly the workload that makes this bill surprising. Combinatorics: 500 package photos × 8 deviceSizes × 2 formats × 1 quality = 8,000 transformations on cold cache, before any art-directed crops. The design doc must cap the matrix explicitly rather than letting defaults run. This is also a real argument for pre-generating a fixed AVIF/WebP ladder at upload time into Supabase Storage and serving with `unoptimized` or a custom loader, instead of transforming on demand.

Evidence: Vercel docs, 'Limits and Pricing for Image Optimization' (last_updated 2026-02-23).

Source: https://vercel.com/docs/image-optimization/limits-and-pricing

### A hero video costs an order of magnitude more than a hero image, even in the cheapest possible case. First-party measurement of a 6-second, 1080p, 30fps slow-pan (Ken Burns) over a single real photograph — i.e. the lowest-entropy realistic hero loop, with no camera shake, no fast motion, no audio: H.264 CRF 23 = 2,236,800 bytes (2.98 Mbps); CRF 28 = 1,110,558 bytes (1.48 Mbps); 720p CRF 26 = 844,957 bytes. An AVIF poster of the same frame = 129,605 bytes; WebP poster = 175,700 bytes. Real drone or handheld travel footage encodes substantially larger than this floor.

Confidence: verified · type: data

Why it matters here: The CRF 23 loop alone (2.24 MB) exceeds the entire median mobile page (2,164 KB). It is 17× the AVIF poster. Web.dev further documents that `autoplay` starts downloading video data immediately, even for videos outside the viewport, competing with CSS, fonts and the LCP image for bandwidth and connections. For a travel brand the instinct to open with motion is strong — this finding is the number that lets the design doc say no with evidence, or say yes with a precise, bounded exception (poster-first, Intersection-Observer-gated, ≤ 1.2 MB, below the fold).

Evidence: First-party ffmpeg encode measurement run 2026-08-22; web.dev 'Video performance' (last updated 2026-04-02); HTTP Archive Web Almanac 2025 'Page Weight' (2026-01-15) for the 2,164 KB median mobile page.

Source: https://web.dev/learn/performance/video-performance

### For `<video>`, LCP uses the poster image load time OR the first-frame presentation time, whichever is earlier — the poster attribute is itself an LCP candidate. Autoplay requires the combination `autoplay muted loop playsinline`. `preload="none"` prevents download until interaction; `preload="metadata"` fetches only duration and basic info; both are hints the browser may ignore. Third-party video embeds are worse: YouTube embeds block the main thread for more than 1.7 seconds on the median website, and the fix is a facade that only loads the embed on user interaction.

Confidence: verified · type: principle

Why it matters here: This gives an exact, cheap recipe: an optimised AVIF poster becomes the LCP element and can hit LCP in the same time as a plain hero image, while the video loads behind it and simply starts when ready. Nothing is lost visually and LCP is decoupled from video weight. The 1.7 s YouTube figure also rules out embedding destination videos directly on package pages — use a facade.

Evidence: web.dev 'Largest Contentful Paint (LCP)' (2025-09-04) for LCP candidacy rules; web.dev 'Video performance' (2026-04-02) for preload, autoplay and the 1.7 s YouTube embed figure.

Source: https://web.dev/articles/lcp

### The Arabic webfont tax varies by more than 13× depending purely on family choice, and it is additive to Latin, not instead of it. First-party measurement of Google Fonts' own served WOFF2 subsets (fetched 2026-08-22): Tajawal 400 arabic = 8,916 B, latin = 10,228 B. IBM Plex Sans Arabic 400 arabic = 33,512 B, latin = 13,944 B. Cairo variable 400–700 arabic = 30,712 B, latin = 33,644 B, latin-ext = 16,632 B. Noto Kufi Arabic variable 400–700 arabic = 123,796 B. For comparison Inter variable 400–700 latin = 48,432 B, latin-ext = 85,272 B. Google Fonts splits Arabic into a single large unicode-range covering U+0600–06FF, U+0750–077F, U+08xx, plus the Presentation Forms blocks U+FB50–FDFF and U+FE70–FEFC.

Confidence: verified · type: data

Why it matters here: A bilingual EN/AR travel site pays for two scripts. Picking Noto Kufi Arabic variable over Tajawal costs 115 KB extra on a single weight — comparable to the entire median page's font budget (Web Almanac 2025: median font file 35–36 KB, p90 115–116 KB). Because Arabic requires contextual presentation forms, the Arabic subset cannot be trimmed the way a Latin subset can, so the family decision is effectively the font-budget decision. Also note Arabic ships as one unicode-range block — you cannot lazily split it by frequency the way CJK is split.

Evidence: First-party HTTP measurement of fonts.googleapis.com CSS and fonts.gstatic.com WOFF2 payloads, run 2026-08-22; HTTP Archive Web Almanac 2025 'Fonts' chapter (published 2026-01-15, updated 2026-02-10).

Source: https://almanac.httparchive.org/en/2025/fonts

### Font-swap layout shift is fully solvable with metric overrides, and almost nobody does it. The `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` descriptors let a local fallback be calibrated so 'the web font and the adjusted fallback font will always have the same vertical dimensions', eliminating the shift on swap. Next.js `next/font` generates and inlines this fallback @font-face automatically at build time. Web-wide, `font-display: swap` is used by ~50% of sites but `optional` by only 0.4–0.5%, and `preload` hints by only ~12%.

Confidence: verified · type: pattern

Why it matters here: Arabic makes this worse than Latin: Arabic faces have deeper descenders and different vertical metrics from any Latin system fallback, so an unmitigated Arabic swap produces a larger shift than an unmitigated Latin one. Two viable policies — `font-display: optional` (no swap, therefore structurally zero font CLS, at the cost of the font sometimes not appearing on first visit) or `swap` plus hand-tuned metric overrides against a named Arabic system fallback. Because next/font computes overrides against the first imported weight, a site importing 400 and 700 gets overrides matching 400 only, which leaves headline shift unaddressed.

Evidence: Chrome for Developers, 'Improved font fallbacks' (2023-02-10); web.dev 'Optimize Cumulative Layout Shift' (2025-02-07); HTTP Archive Web Almanac 2025 'Fonts' chapter (2026-01-15) for adoption percentages.

Source: https://developer.chrome.com/blog/font-fallbacks/

### Placeholder technique choice is a JavaScript-dependency decision, not a bytes decision. BlurHash and ThumbHash encode to only 20–30 bytes, but require client-side JavaScript to decode, so the placeholder cannot paint until JS has loaded and run. A tiny WebP LQIP at 16×16 px and ~quality 70 is roughly 100 bytes, a tiny JPEG LQIP roughly 200 bytes, and both paint immediately with zero JS. Mux's analysis concludes the ~150-byte penalty is worth it and recommends LQIP over hash encodings for the web. Next.js supports this natively via `placeholder="blur"` + `blurDataURL`, auto-generated for static imports but required manually for remote/dynamic images.

Confidence: verified · type: pattern

Why it matters here: Every image on this site comes from Supabase Storage, i.e. remote and dynamic, so `blurDataURL` will NOT be auto-generated — it has to be produced at upload time and stored as a column. Getting this decided up front prevents a later migration. The 100-byte inline LQIP also paints during the server-streamed HTML, before hydration, which matters most on the slow-network Egypt segment where hash-decode JS arrives last.

Evidence: Mux blog, 'A clear look at blurry image placeholders on the web' (2024-03-28); Next.js Image component docs (v16.3.2, 2026-08-18), `placeholder` and `blurDataURL` sections; ThumbHash reference implementation (evanw.github.io/thumbhash).

Source: https://www.mux.com/blog/blurry-image-placeholders-on-the-web

### Lazy-loading the LCP image is a documented, measurable, widespread mistake: web.dev states 'Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay', and HTTP Archive found 9.5% of pages lazy-load the image that turns out to be their LCP element. Web.dev additionally warns against setting high priority on more than one or two images, because 'setting a high priority on more than one or two images makes priority setting unhelpful', and recommends `fetchpriority="low"` on carousel slides that load early but are not visible.

Confidence: verified · type: pattern

Why it matters here: This is precisely the failure mode of a travel homepage hero carousel. The common pattern — five destination slides, all eager, all high priority — makes every slide compete, so none arrives fast and LCP degrades versus a single image. Combined with the Next.js 16 warning against `preload` when multiple images could be the LCP element by viewport, the rule for this site is: exactly one eager, high-priority, art-directed LCP image per route; every other slide `loading="lazy" fetchpriority="low"`.

Evidence: web.dev 'Optimize Largest Contentful Paint' (2025-03-31); HTTP Archive Web Almanac 2024 'Media' chapter (2024-12-29) for the 9.5% figure.

Source: https://web.dev/articles/optimize-lcp

### CLS is preventable by construction, not by tuning. Setting `width` and `height` attributes lets the browser compute a default aspect-ratio and reserve space before load; for art-directed `<picture>` the dimensions must be set on each `<source>`, not only the `<img>`. Ad/embed/late-content slots need `min-height` or `aspect-ratio` reserved. Animations using `transform: translate/scale/rotate/skew` are composited and cannot contribute to CLS, whereas animating `top`, `left`, `box-shadow` or `box-sizing` triggers re-layout and does. bfcache restoration produces measurable CLS improvements across sessions.

Confidence: verified · type: principle

Why it matters here: A travel package site is a grid of cards with heterogeneous photo aspect ratios, a price that arrives after a client fetch, a review score, and a currency/language switcher — five independent shift sources. Declaring a fixed `aspect-ratio` per media slot in the design system (rather than letting each photo dictate its own) turns CLS from a bug class into a non-issue, and simultaneously makes the grid look designed rather than assembled. The transform-vs-layout rule constrains every hover and reveal animation the site will use.

Evidence: web.dev 'Optimize Cumulative Layout Shift' (2025-02-07).

Source: https://web.dev/articles/optimize-cls

### Next.js 16 makes Partial Prerendering the default behaviour via the `cacheComponents` flag, which unifies the former `ppr`, `useCache` and `dynamicIO` flags. With it, data fetching is dynamic by default, `use cache` opts individual pages/components/functions into caching, and Next.js 'prerenders a static HTML shell that is served immediately while dynamic content streams in when ready'. Cache Components requires the Node.js runtime — routes exporting the deprecated `runtime = 'edge'` must be migrated. `cacheLife` and `cacheTag` control duration and invalidation. Separately, `next/link` prefetch defaults to `"auto"`: full route prefetch for static routes, partial prefetch down to the nearest `loading.js` boundary for dynamic routes, and prefetching is production-only.

Confidence: verified · type: constraint

Why it matters here: This is exactly the right shape for a travel package site: destination pages, package descriptions, itineraries and photography are cacheable and belong in the static shell; live availability, seat counts, per-user currency and personalised pricing are dynamic and belong in Suspense boundaries that stream. That combination gives a near-instant LCP (the shell paints with the hero image immediately) while still showing real availability. It also means the LCP image must live in the STATIC shell, never inside a Suspense boundary — putting the hero behind a dynamic boundary throws away the entire benefit.

Evidence: Next.js docs, `cacheComponents` config reference (v16.3.2, lastUpdated 2026-06-22); Next.js `<Link>` API reference (v16.3.2, lastUpdated 2026-08-10).

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents

### Third-party scripts are near-universal and are the main lever left after images. More than nine in ten web pages include at least one third party; median third-party request count is 79 on mobile (83 desktop) across all sites, rising to 106 mobile / 129 desktop for the top 1,000 sites, and the median third-party inclusion chain is 3 deep — meaning most third parties load further vendors you never chose. Next.js provides four `next/script` strategies: `beforeInteractive` (injected into `<head>`, fetched before first-party code, for bot detectors and cookie consent managers only), `afterInteractive` (default; tag managers, analytics), `lazyOnload` (browser idle time; explicitly recommended for chat support plugins and social widgets), and `worker` (experimental, does NOT work with App Router, pages/ only).

Confidence: verified · type: constraint

Why it matters here: A travel agency will be asked for a WhatsApp/chat widget, Meta Pixel, TikTok Pixel, GA4, and a review widget — that is five vendors, each pulling more. The chain-depth-of-3 figure means the real cost is unknowable at integration time and must be measured. `worker` being unavailable in App Router closes the Partytown escape hatch, so the discipline has to be strategy-based: nothing but consent management gets `beforeInteractive`, chat gets `lazyOnload` or a facade.

Evidence: HTTP Archive Web Almanac 2025 'Third Parties' chapter (2026-01-15); Next.js `<Script>` API reference (v16.3.2, lastUpdated 2026-08-21).

Source: https://almanac.httparchive.org/en/2025/third-parties

### Speculative prerendering can make navigation feel instant but is Chromium-only and tightly rate-limited. Chrome/Edge 109+ support prerender via the Speculation Rules API; Firefox does not support it and Safari has it behind a flag. Concurrency caps: `immediate` allows 10 concurrent prerenders, while `eager`/`moderate`/`conservative` allow 2 on a FIFO queue. Eagerness triggers: `conservative` = pointer/touch down; `moderate` = 200 ms hover or pointerdown, or viewport heuristics 500 ms after scroll stops on mobile; `eager` = 10 ms hover, or 50 ms after an anchor enters the viewport on mobile. Chrome documents the effect as 'near zero LCP, reduced CLS ... and improved INP'.

Confidence: verified · type: trend

Why it matters here: On a package-browsing site the user's next click is highly predictable — they hover or scroll to one card, then open it. Prerendering the top 2 candidate package pages converts the most-repeated interaction in the funnel into an instant transition, which is the kind of thing people notice and remark on. The 2-prerender cap under moderate eagerness is the practical design constraint: prerender the two most-likely package pages, prefetch the rest. Because it is Chromium-only, it must be a progressive enhancement layered on top of `next/link` prefetch, never the baseline.

Evidence: Chrome for Developers, 'Prerender pages in Chrome for instant page navigations' (last updated 2026-01-23).

Source: https://developer.chrome.com/docs/web-platform/prerender-pages

### Speed correlates with revenue in travel, but the headline figure is from 2020 and should be cited with that caveat. The Google/Deloitte/55 study 'Milliseconds Make Millions' (published 2020-06-24) analysed 37 European and American brand sites and over 30 million user sessions, monitoring mobile load times hourly for 30 days at the end of 2019 with no UX redesigns during the period; a 0.1 s improvement in mobile site speed was associated with a 10.1% increase in travel conversion rate, a 2.2% increase in checkout completion, and 8.4% conversion / 9.2% AOV uplift for retail. The independently-run Vodafone A/B test (web.dev case study, 2021) found a 31% LCP improvement produced 8% more sales, 15% better lead-to-visit and 11% better cart-to-visit, with 50/50 traffic split from paid channels. Redbus, a travel/bus booking site, reduced CLS from 1.65 to 0 and TTI from ~8 s to ~4 s.

Confidence: verified · type: data

Why it matters here: This is the business case that justifies the budget in the master doc, and it must be presented honestly: the Deloitte study is six years old and predates INP, mobile hardware improvements, and the current CWV framework. Its direction is corroborated by later work (Vodafone A/B test, which is methodologically stronger because it is a controlled experiment rather than an observational correlation) but its exact magnitude should not be restated as a 2026 fact. Treat 'travel converts ~10% better per 0.1 s' as a directional argument, not a forecast.

Evidence: web.dev case study 'Milliseconds make millions' (2020-06-24) — FLAGGED AS POTENTIALLY STALE, pre-2023; web.dev 'The business impact of Core Web Vitals' (last updated 2021-09-01) for Vodafone and Redbus — ALSO PRE-2023.

Source: https://web.dev/case-studies/milliseconds-make-millions

### Passing Core Web Vitals is still a minority achievement, so it is a viable differentiator. In 2025, 48% of websites achieve good Core Web Vitals on mobile and 56% on desktop. On mobile, LCP is good on only 62% of sites (25% needs improvement, 13% poor), INP good on 77%, CLS good on 81%. LCP is described as 'the biggest differentiator' between e-commerce platforms — mobile good-CWV rates range from Shopify at 76% down to WooCommerce at 33% and Magento at 36% (desktop). Travel-industry benchmark data (Littledata, survey of 273 travel sites, reported 2026-01-12) puts top-20% desktop load at under 2.2 s, top-10% under 1.7 s, bottom-20% over 6.3 s, with average travel bounce rate 50.65% (42.0% desktop / 51.5% mobile from Google search) and conversion rates spanning 0.2%–4%.

Confidence: verified · type: data

Why it matters here: Mobile LCP is the weak link web-wide and it is the metric an image-heavy travel site is most at risk on — which means it is also where a win is most visible. If the site lands top-decile travel load time (<1.7 s desktop) with good mobile CWV, it is measurably in the top few percent of its category, and that is a claim worth making publicly.

Evidence: HTTP Archive Web Almanac 2025 'Performance' and 'E-commerce' chapters (both 2026-01-15); Promodo 'Travel Industry Benchmarks Report 2026' citing Littledata (published 2026-01-12, updated 2026-05-13).

Source: https://almanac.httparchive.org/en/2025/performance

### Regional competitors carry heavy front-ends. First-party measurement of homepage HTML documents fetched with an Android mobile user agent on 2026-08-22: almosafer.com returned 217,205 bytes of HTML containing 34 `<script>` tags; airbnb.com returned 88,097 bytes with 50 `<script>` tags. Booking.com and Wego returned interstitial/bot-check responses (3,962 and 1,796 bytes) rather than real documents, so no comparison is possible for those two.

Confidence: verified · type: data

Why it matters here: 217 KB of HTML before a single image, stylesheet or script file has been fetched is a concrete, defensible competitive baseline for the Middle East travel market. It sets a target the design doc can state plainly: an initial HTML document under 40 KB compressed. It also shows what the generic incumbent experience is made of — a large hydration payload — which is exactly what an RSC-first architecture avoids. Caveat: this is a single-shot measurement of the document only, not a full page-weight audit, and these sites A/B test and geo-vary.

Evidence: First-party curl measurement run 2026-08-22 with an Android Chrome user agent; script tag counts via grep on the returned document.

Source: https://www.almosafer.com

### Latency, not bandwidth, has historically dominated page load time, but the 2025 evidence is more nuanced than the classic claim. The often-repeated finding is that going from 5 Mbps to 10 Mbps yields only ~5% faster page loads while every 20 ms of latency reduction improves load time roughly linearly — this originates in Belshe (2010) and Grigorik (2012) and is now 14+ years old. A 2025 peer-reviewed measurement study (Mostafa, Wittie & Goel, published 2025-03-05) analysing 45 websites across four mobile carriers in 57 US cities found that 18% of websites are primarily bandwidth-limited and 33% are bandwidth-constrained in at least some network scenarios, and that for modern complex pages 'both improvements in latency and improvements in bandwidth have a steady effect' without the expected diminishing returns. CSS file count was the strongest predictor of bandwidth sensitivity, followed by image and script object counts.

Confidence: verified · type: principle

Why it matters here: The naive takeaway 'Gulf users have 600 Mbps so bytes don't matter' is wrong for a site with hundreds of image objects — the 2025 study specifically identifies image object count as a bandwidth-sensitivity driver. The correct synthesis: cut round trips AND cut object count. Fewer, larger, better-compressed images beat many small ones; a single art-directed AVIF hero beats a six-slide carousel on both axes at once. FLAG: the Belshe/Grigorik figures are pre-2023 and should be cited as historical framing only.

Evidence: Mostafa, Wittie & Goel, 'Does More Bandwidth Really Not Matter (Much)?', arXiv, 2025-03-05; Grigorik, 'Latency: The New Web Performance Bottleneck', igvita.com, 2012 — FLAGGED AS STALE.

Source: https://arxiv.org/html/2503.03641

## Design implications

- ENFORCEABLE PERFORMANCE BUDGET (put this table verbatim in the master doc; every row is CI-checkable). Field targets at p75, mobile, per route: LCP ≤ 1.8 s (public threshold 2.5 s — the 700 ms gap is the safety margin for the Egypt/weak-network segment); INP ≤ 150 ms (threshold 200 ms); CLS ≤ 0.05 (threshold 0.1); TTFB ≤ 600 ms. Lab/CI budgets per route, transfer size, mobile: initial HTML document ≤ 40 KB compressed (competitor almosafer.com ships 217 KB); total first-load JS ≤ 130 KB compressed; CSS ≤ 30 KB compressed; fonts ≤ 90 KB total for BOTH scripts combined (Latin + Arabic, all weights); LCP image ≤ 45 KB (AVIF at 828–1080 CSS px — measured 33.3 KB at 828px, 53.6 KB at 1080px, so 45 KB is achievable); total above-fold image bytes ≤ 120 KB; total page transfer ≤ 900 KB (vs 2,164 KB web median); third-party transfer ≤ 60 KB and ≤ 6 requests before the load event; hero video, if any at all, ≤ 1.2 MB and never above the fold and never blocking. Counts: ≤ 1 image with fetchpriority=high per route; ≤ 3 render-blocking requests; ≤ 25 requests before LCP; ≤ 2 webfont families; ≤ 4 total font files. Fail the build on any breach.
- REGION AND DATA-LOCALITY DECISION, made before the first line of code. Pin Vercel function execution to dxb1 (Dubai). Because Supabase has no Middle East region, provision the Postgres project in ap-south-1 (Mumbai) — measured median RTT from Dubai is 30.9 ms versus 112.9 ms to Frankfurt, a 3.7× difference on every round trip — UNLESS a data-residency or GDPR requirement forces eu-central-1, in which case that decision must be written down in .memory/projects/ with the latency cost stated explicitly. Regardless of region, enforce ZERO sequential database round trips in the render path of any cacheable page: package pages, destination pages and itineraries are prerendered via `use cache` + `cacheTag`, so the DB is not on the critical path at all; only live availability and pricing hit the database, inside a Suspense boundary.
- IMAGE PIPELINE, specified end to end. Store originals in Supabase Storage. At upload time, generate and persist: (a) an AVIF ladder at exactly the widths the layout uses — 640, 828, 1080, 1440 for full-bleed; 320, 480, 640 for cards — plus a WebP ladder as fallback; (b) a ~100-byte 16×16 WebP LQIP data URI written to a `blur_data_url` column (mandatory: remote images do NOT get an auto blurDataURL from next/image); (c) a `dominant_color` hex column. In next.config set `formats: ['image/avif','image/webp']`, `qualities: [70]` (single value — the allowlist is required in Next 16 and every extra entry multiplies billable transformations), and trim `deviceSizes` to the four widths actually used. Serve via `<picture>` with `type="image/avif"` first only where art direction (different crops per breakpoint) is required — set width and height on every `<source>`, not just the `<img>`. One image per route gets `loading="eager" fetchpriority="high"`; every other above-fold image gets `fetchpriority="low"`; everything below the fold gets `loading="lazy"`. Never `loading="lazy"` on the LCP image.
- TYPOGRAPHY BUDGET FOR A BILINGUAL SITE. Choose the Arabic family on file size as a first-class criterion, not an afterthought: measured Google Fonts WOFF2 Arabic subsets range from Tajawal 400 at 8.9 KB to Noto Kufi Arabic variable at 123.8 KB — a 13× spread. Ship at most two families and at most four files total across EN and AR. Self-host via next/font/local (never a fonts.googleapis.com <link>, which adds a render-blocking cross-origin round trip). Preload only the single font file used by the LCP text block. Declare a named Arabic system fallback stack and hand-tune `size-adjust` / `ascent-override` / `descent-override` / `line-gap-override` against it for BOTH the 400 and 700 weights — next/font computes overrides against the first imported weight only, which leaves headline shift unfixed. If tuned overrides are not shipped, use `font-display: optional` instead of `swap` so font CLS is structurally zero.
- HERO POLICY. Default: no video above the fold. A measured 6 s 1080p slow-pan loop — the cheapest realistic hero video — costs 2.24 MB at CRF 23, versus 129.6 KB for an AVIF poster of the same frame, and exceeds the entire median mobile page. If a hero video is approved as a deliberate exception, the rules are: an optimised AVIF poster is the LCP element; `preload="none"`; `autoplay muted loop playsinline`; download gated behind an IntersectionObserver so it never competes with the LCP image; 720p, ≤ 1.2 MB, ≤ 8 s, no audio track; and it must be skippable via prefers-reduced-motion. Destination videos on package pages use a click-to-load facade, never a live YouTube embed (median 1.7 s of main-thread blocking).
- RENDERING ARCHITECTURE. Enable `cacheComponents: true` (Next.js 16 — this supersedes the removed `experimental.ppr` and `experimental.dynamicIO` flags and requires the Node.js runtime, so no route may export `runtime = 'edge'`). Server Components are the default; `'use client'` is a reviewed exception that must be justified in the PR. The static shell of every package and destination route MUST contain the LCP image, the headline, the price band and the primary CTA — nothing in that set may sit inside a Suspense boundary. Live availability, seat counts, personalised or currency-converted pricing stream in behind Suspense with reserved-height skeletons that match the final content box exactly. Use `cacheTag` per package ID so a price change invalidates one page, not the whole site.
- THIRD-PARTY QUARANTINE, written as a rule with a named owner. Only a consent manager may use `strategy="beforeInteractive"`. Analytics uses `afterInteractive`. The WhatsApp/chat widget uses `lazyOnload` or, preferably, a static button that loads the real widget on first click. Marketing pixels are gated behind consent AND `lazyOnload`. The `worker` strategy is unavailable — it does not work with App Router — so there is no Partytown escape hatch. Every new third party requires a before/after Lighthouse run attached to the PR, because the median third-party inclusion chain is 3 deep and the true cost is not knowable from the vendor's docs.
- PERCEIVED-SPEED LAYER. Layer three progressive enhancements, each of which degrades cleanly: (1) `next/link` prefetch left at the `auto` default for all package cards; (2) Speculation Rules `prerender` with `moderate` eagerness on the two highest-intent package links per viewport — respect the 2-concurrent-prerender cap, and treat it as Chromium-only since Firefox has no support and Safari is behind a flag; (3) React `<ViewTransition>` via next/link `transitionTypes` for the card-to-detail transition, so the package photo appears to expand into the detail hero rather than the page reloading.
- CLS BY CONSTRUCTION. Every media slot in the design system declares a fixed `aspect-ratio` token (e.g. hero 21:9, package card 4:3, gallery thumb 1:1) and every image is object-fit cropped into it — photos never dictate their own box. Every late-arriving element (price, review score, availability badge, currency switcher) has a reserved min-height. All hover, reveal and carousel motion uses `transform` only; animating `top`, `left`, `box-shadow` or `box-sizing` is banned because those trigger re-layout and count toward CLS while composited transforms cannot. Verify bfcache eligibility on every route.
- CI ENFORCEMENT AND MEASUREMENT. Run Lighthouse CI on pull requests against three fixed routes (home, destination index, package detail) with a `budget.json` encoding the resource-size and resource-count rows above, and fail the build on breach. Add a bundle-size assertion on first-load JS. Separately — and this is the row that actually matters — instrument real-user CWV with the web-vitals library reporting to Supabase, segmented by country and by language, because the p75 that Google scores comes from Egyptian Android users, not from a build agent. Review the Saudi/UAE/Egypt segments separately; they have materially different network and device profiles.

## Anti-patterns to refuse

- THE FULL-BLEED AUTOPLAY HERO VIDEO. Every second travel site opens with one, and it is both generic and expensive: a measured 6 s 1080p loop of the cheapest possible kind costs 2.24 MB — more than the entire median mobile page — versus 130 KB for an AVIF poster of the same frame, and web.dev documents that `autoplay` begins downloading immediately, competing with CSS, fonts and the LCP image. It signals 'we bought a template' and it taxes the exact users who convert.
- THE FIVE-SLIDE EAGER HERO CAROUSEL. The default agency homepage loads all slides eagerly, often all with high priority. Web.dev is explicit that setting high priority on more than one or two images makes priority setting useless, and recommends `fetchpriority="low"` on non-visible carousel slides; Next.js 16 separately warns against `preload` when multiple images could be the LCP element depending on viewport. The result is that no slide arrives fast, LCP is worse than with a single image, and the user sees a slideshow they did not ask for. HTTP Archive found 9.5% of pages lazy-load their own LCP element — the same class of mistake in reverse.
- THE UNBOUNDED IMAGE MATRIX. Leaving Next.js `deviceSizes` at its 8-entry default, enabling both AVIF and WebP, and allowing multiple `qualities` produces (8 widths × 2 formats × N qualities) billable transformations and cache entries per image — and Vercel bills transformations and cache writes on every MISS and STALE. On a site with hundreds of package photos this is a surprise invoice and a cold-cache latency problem at the same time. It also stores twice, because Next.js caches each format separately.
- LOADING FONTS THE DEFAULT WAY ON A BILINGUAL SITE. A `<link>` to fonts.googleapis.com plus two families plus four weights each, with `font-display: swap` and no metric overrides, is what most sites ship (Web Almanac 2025: 50% use swap, only 0.4–0.5% use optional, only ~12% preload anything). On an Arabic/English site this compounds — the Arabic subset cannot be trimmed the way Latin can because contextual presentation forms are required, and the vertical metrics mismatch between an Arabic face and any Latin system fallback produces a larger swap shift than the Latin case. Picking Noto Kufi Arabic variable over Tajawal alone costs 115 KB per weight.
- BLURHASH EVERYWHERE BECAUSE IT LOOKS SOPHISTICATED. BlurHash and ThumbHash are ~20–30 bytes, which is seductive, but they require JavaScript to decode — so on the slowest connections, exactly where the placeholder matters most, nothing paints until JS has loaded and run. A ~100-byte inline WebP LQIP paints during the streamed HTML with zero JS. Mux's own analysis recommends LQIP over hash encodings on the web for this reason.
- TREATING THE GULF AS A FAST-NETWORK EXCUSE. 'UAE has 672 Mbps median mobile, so page weight doesn't matter' is the wrong conclusion. LCP is dominated by round trips and main-thread work, not throughput — and the 2025 arXiv measurement study found image and script OBJECT COUNT is a leading predictor of bandwidth sensitivity even on modern connections. It also ignores Egypt (75.5% mobile, weaker networks) and ignores that 33–40% of Gulf traffic is still desktop.
- THE 'ADD IT LATER' THIRD-PARTY STACK. Shipping fast, then bolting on GTM, a chat widget, Meta and TikTok pixels, and a reviews embed in month two — each one added without a measurement — is how a fast site becomes an average one. Median third-party inclusion chains are 3 deep, so five vendors is not five scripts. The `worker` strategy that would have offloaded them does not work in App Router, so there is no rescue after the fact.
- SKELETON SCREENS THAT DO NOT MATCH THE FINAL CONTENT BOX. Streaming with Suspense is correct, but a skeleton whose height differs from the resolved content converts a loading state into a layout shift — turning a performance feature into a CLS regression. The same applies to price and availability badges that appear after a client fetch with no reserved space.

## Differentiation moves

- MAKE SPEED THE BRAND'S VISIBLE SIGNATURE, NOT AN INVISIBLE VIRTUE. Because only 48% of mobile origins pass CWV and top-decile travel desktop load is under 1.7 s, landing there is a defensible public claim. Ship a real, live `/speed` page that renders the site's own field CWV from the RUM data in Supabase, segmented by country, updated daily. It is honest, it is unusual, it is exactly the kind of page a design-literate audience screenshots and links — which serves the organic-reach goal directly rather than through paid distribution.
- REPLACE THE HERO VIDEO WITH SOMETHING BOTH CHEAPER AND MORE DISTINCTIVE: art-directed, full-bleed AVIF photography with genuinely different crops per breakpoint via `<picture>`. Measured cost is 33 KB at 828 CSS px. A site that is visibly more photographic than its competitors while being an order of magnitude lighter is a contradiction people notice — and since only ~1% of web images are AVIF and 83% of LCP images are still JPEG/PNG, almost nobody in the category is doing it.
- TURN THE LOADING STATE INTO A DESIGN ASSET. Store a `dominant_color` per photo at upload and use it as the placeholder ground, with the ~100-byte LQIP resolving into it — so the site's loading state is a considered wash of the destination's own colour palette rather than a grey skeleton. It costs nothing, works with zero JS, and gives the brand a recognisable visual behaviour that competitors using off-the-shelf skeleton components cannot copy without rebuilding their pipeline.
- INSTANT PACKAGE NAVIGATION AS A FELT EXPERIENCE. Combine Speculation Rules `prerender` at `moderate` eagerness on the two most-likely package links with React `<ViewTransition>` on the card-to-detail navigation. Chrome documents prerender as producing 'near zero LCP'. The result — the photo you tapped expands into the detail hero with no white flash and no spinner — reads as a native app, not a website, and is the single most-repeated interaction in the booking funnel.
- BUILD FOR THE HOTEL-WIFI CASE ON PURPOSE. Travellers use this site from airports, lobbies and roaming connections. A site whose static shell renders the package, price band and CTA from cache before any dynamic data arrives keeps working when the network is bad — and saying so, visibly (a quiet 'showing last-known availability' state instead of a spinner), is a trust move competitors do not make because their architecture cannot support it.
- SET THE BILINGUAL FONT BUDGET AS A DESIGN CONSTRAINT AND LET IT PRODUCE THE TYPE SYSTEM. Choosing a light Arabic family (Tajawal-class, ~9 KB) and pairing it with one variable Latin face, then investing the saved ~115 KB in a genuinely distinctive display cut for headlines only, yields a more characterful typographic voice than the standard two-generic-families setup — at lower total weight. The constraint drives the aesthetic instead of fighting it.
- PUBLISH THE PERFORMANCE BUDGET ITSELF. The operator's audience is AI/build practitioners. A public write-up of the budget table, the region-latency measurements, and the AVIF-vs-WebP numbers is shareable technical content that also functions as proof the agency site is well-built. It converts an internal engineering artefact into organic reach.

## Open questions

- What is the actual traffic split by country for this specific business? The budget's byte targets should be set by the weakest expected market (Egypt: 75.5% mobile, weaker networks) while the latency targets are set by the Gulf. Without a country mix, the budget is guesswork calibrated to regional averages rather than to this audience.
- Is there a data-residency or regulatory requirement (Saudi PDPL, UAE data rules, or a payment processor's requirement) that forces the Postgres into a specific jurisdiction? This overrides the ap-south-1 latency recommendation and needs a written decision in .memory/projects/ with the 112.9 ms vs 30.9 ms cost stated explicitly.
- No sourced figure was found for country-level or travel-vertical Core Web Vitals pass rates in the Middle East specifically. CrUX exposes country-level data but the PageSpeed Insights API quota was exhausted during this research and the CrUX API requires a key. A follow-up session with a CrUX API key should benchmark the actual regional competitors (almosafer, wego, tajawal, holidayme) so the target is set against real rivals rather than the global median.
- How large is the real package photo library and what is the upload cadence? This determines whether on-demand Vercel image optimization is affordable or whether a build-time / upload-time AVIF ladder into Supabase Storage with a custom loader is required. The transformation-count arithmetic changes the architecture, not just the bill.
- Will the site need a live availability/pricing integration with a GDS or bed-bank API? If so, its response latency, not the database, becomes the dominant TTFB factor for dynamic segments, and the Suspense boundary design has to be built around its p95 rather than around Postgres.
- No sourced figure was found for the CPU/device profile of the target audience (Android mid-range share vs iPhone). INP and hydration cost scale with device CPU, not network, so the JS budget of 130 KB is currently inferred from general guidance rather than calibrated to this audience's hardware.
- Does the brand require a chat/WhatsApp widget at launch? If yes, its measured cost should be booked against the 60 KB third-party budget before any other vendor is approved, since it is typically the largest single third party on an agency site.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — Core Web Vitals in 2026 are three metrics at p75: LCP ≤2.5s/>4.0s, INP ≤200ms/>500ms, CLS ≤0.1/>0.25; TTFB/FCP/TBT are diagnostics

web.dev/articles/vitals (last updated 2024-10-31) states all thresholds, the 75th-percentile assessment and the mobile/desktop split verbatim; TBT explicitly framed as a lab proxy for INP. I actively tried to refute this: multiple SEO blogs (digitalapplied, ideafueled, geekssort) claim a 'March 2026 core update lowered good LCP from 2.5s to 2.0s'. That is NOT in any Google source — web.dev/articles/lcp, last updated 2025-09-04 and fetched 2026-08-22, still says 2.5s at p75. Treat the 2.0s story as SEO rumor. https://web.dev/articles/vitals + https://web.dev/articles/lcp

### CONFIRMED — LCP decomposes into TTFB ~40%, load delay <10%, load duration ~40%, render delay <10%, and Chrome warns against converting to absolute numbers

web.dev/articles/optimize-lcp (2025-03-31) gives exactly these four subparts and percentages, and states: 'it may be tempting to try to convert these percentages into absolute numbers, but that is not recommended.' https://web.dev/articles/optimize-lcp

### CONFIRMED — Vercel has a Dubai region (dxb1 / me-central-1) since 2025-06-16; Supabase has no Middle East region; CloudPing p50 1Y me-central-1 → eu-central-1 112.9ms, ap-south-1 30.9ms, ap-southeast-1 94.7ms, us-east-1 195.2ms

Strongest claim in the set. Vercel changelog dated 2025-06-16 confirms dxb1 with both CDN caching and function execution ('Teams can configure Dubai as an execution region'). Vercel docs region table (last_updated 2026-03-05) maps dxb1 → me-central-1 → Dubai, UAE. Supabase regions page lists no ME region. I re-fetched the CloudPing API myself on 2026-08-22 and got 112.916 / 30.918 / 94.734 / 195.232 — matches to one decimal. Worth adding: me-central-1 → me-south-1 (Bahrain) is only 17.18ms, but Supabase offers neither ME region, so it does not help. https://vercel.com/docs/regions + https://www.cloudping.co/api/latencies?percentile=p_50&timeframe=1Y

### PARTIALLY_TRUE — Gulf bandwidth is world-leading (UAE 672.87 Mbps median mobile June 2026, world #1; Qatar 561.28, Kuwait 379.28, Bahrain 267.68, Saudi 227.90); StatCounter July 2026 mobile share Saudi 65.43%, UAE 59.35%, Egypt 75.46%

StatCounter Saudi July 2026 confirmed exactly on the primary source: mobile 65.43%, desktop 33.61%, tablet 0.96%. The Ookla figures are the weak half — they trace only to a StatiSense X/Twitter post, not to Ookla. speedtest.net/global-index is not fetchable to verify, and a competing source in the same search reports UAE at 691.76 Mbps, so the figure is unstable. Bigger methodological problem the researcher never flags: Speedtest medians are self-selected users deliberately running a speed test, typically on flagship 5G handsets — they are not the median network condition of a page load, and cannot be used to conclude 'bytes are not the binding constraint'. https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/saudi-arabia

### CONFIRMED — Median mobile page 2,164 KB (images 911, JS 632, fonts 122, CSS 77, HTML 22); p90 8,337 KB; 76.0% of mobile LCP elements are images (85.3% desktop); LCP images 57% JPEG, 26% PNG, 11% WebP

Every figure matches the HTTP Archive Web Almanac 2025 Page Weight chapter (published 2026-01-15) and Performance chapter (2026-01-15) exactly, including the p90 and the LCP format split, with AVIF and other formats under 2%. https://almanac.httparchive.org/en/2025/page-weight

### FALSE — AVIF delivers a consistent ~25% saving over WebP on real photographic content at responsive widths (640px −26.4%, 828px −24.3%, 1080px −24.3%, 1200px −23.1%, 1920px −25.6%; second photo −25.8%)

Does not reproduce. I re-ran the researcher's exact stated settings (ffmpeg libaom-av1 CRF 32 cpu-used 6 vs libwebp quality 75 preset photo) on two real photographs on 2026-08-22. Photo A: 640px −10.1%, 828px −12.4%, 1080px −13.3%, 1200px −13.4%, 1920px −12.4%. Photo B (smoother): 640px −0.7%, 1080px −3.5%, 1920px −10.2%. Observed range 0.7%–13.4%, never approaching 25%, and mostly BELOW Next.js's own stated 20%. The saving is strongly content-dependent, so 'consistent ~25%' is false precision from a two-image sample. The Next.js doc quote itself IS accurate ('compresses 20% smaller compared to WebP', 'generally takes 50% longer to encode') but my encode-time test showed AVIF at 5.72s vs WebP 8.87s — i.e. faster, not 50% slower. The researcher also omitted the sentence immediately above it: 'We still recommend using WebP for most use cases.' https://nextjs.org/docs/app/api-reference/components/image

### PARTIALLY_TRUE — Next.js 16 image API: priority deprecated for preload; docs prefer loading=eager/fetchPriority=high; default quality 75; qualities is a REQUIRED allowlist; deviceSizes and imageSizes defaults as listed

Nearly all confirmed against the v16.3.2 docs (lastUpdated 2026-08-18): priority deprecated in favour of preload (v16.0.0 changelog), the exact sentence 'In most cases, you should use loading="eager" or fetchPriority="high" instead of preload', the warning about multiple viewport-dependent LCP candidates, default quality 75, deviceSizes [640,750,828,1080,1200,1920,2048,3840], imageSizes [32,48,64,96,128,256,384]. One correction that matters in practice: `qualities` is NOT required in the sense of failing without it — the docs say 'If not configuration is provided, the default below is used: qualities: [75]'. You get a silent default of [75], not a build error. And the coercion vs 400 distinction is muddled: an out-of-list `quality` prop is coerced to the nearest allowed value (dev logs a warning); only a direct REST API hit with a disallowed quality returns 400. https://nextjs.org/docs/app/api-reference/components/image

### CONFIRMED — Vercel bills image optimization as three meters (transformations $0.05–$0.0812/1K, cache reads $0.40–$0.64/1M, cache writes $4.00–$6.40/1M, 8KB units); transformations and cache writes billed on every MISS and STALE; dual formats double storage; 8192px source cap, 10MB output cap

All figures match Vercel docs 'Limits and Pricing for Image Optimization' (last_updated 2026-02-23), including the MISS/STALE billing rule for transformations and cache writes specifically (cache reads are explicitly NOT billed per HIT). Dual-format storage doubling is confirmed independently in the Next.js image docs. Two omissions worth adding: Hobby included amounts are 5K transformations / 300K cache reads / 100K cache writes per month, and Fast Data Transfer plus Edge Requests are billed separately on top of all three. https://vercel.com/docs/image-optimization/limits-and-pricing

### UNSUPPORTED — A 6s 1080p30 Ken Burns hero video costs 2,236,800 bytes at H.264 CRF 23 (2.98 Mbps), 1,110,558 at CRF 28, vs 129,605 for an AVIF poster — an order of magnitude more than a hero image

Internally consistent (2,236,800×8/6 = 2.98 Mbps checks out) and the magnitudes are plausible for x264 CRF 23 at 1080p30, but it is a single unreproducible first-party encode — and given that the same researcher's AVIF measurement (claim 6) failed to reproduce by a factor of two to thirty, these numbers deserve no more trust. The decision framing is also wrong, which matters more than the bytes: their own verified claim 10 establishes that with `preload="none"` or `"metadata"` plus a poster, the poster is the LCP candidate and the video bytes never touch the LCP critical path. So '2.24 MB exceeds the entire median mobile page' is true in absolute bytes but misleading about LCP impact. The real arguments against hero video are data cost, decode/CPU and INP, not LCP.

### CONFIRMED — For <video>, LCP uses poster load time OR first-frame presentation, whichever is earlier; autoplay needs autoplay muted loop playsinline; preload none/metadata are ignorable hints; YouTube embeds block the main thread >1.7s on the median site; facades fix it

web.dev/articles/lcp (2025-09-04) confirms the whichever-is-earlier poster/first-frame rule. web.dev/learn/performance/video-performance (last updated 2026-04-02) confirms verbatim 'YouTube embeds block the main thread for more than 1.7 seconds for the median website', the preload=none/metadata semantics as ignorable hints, and the autoplay muted loop playsinline combination. https://web.dev/learn/performance/video-performance

### PARTIALLY_TRUE — Arabic webfont tax varies >13×: Tajawal arabic 8,916 B, IBM Plex Sans Arabic arabic 33,512 B / latin 13,944 B, Cairo arabic 30,712 B, Noto Kufi Arabic arabic 123,796 B, Inter latin 48,432 B / latin-ext 85,272 B

I re-measured every one of these from fonts.googleapis.com/fonts.gstatic.com on 2026-08-22. Most land within 0.5% (Tajawal arabic 8,932; Cairo arabic 30,896; Noto Kufi arabic 123,688; Inter latin 48,256, latin-ext 85,068), and the >13× spread holds (123,688/8,932 = 13.85×). But IBM Plex Sans Arabic is materially wrong: I measured arabic 42,848 B (claimed 33,512, +28%) and latin 19,164 B (claimed 13,944, +37%). Two things the researcher missed: Noto Kufi variable also pulls math (22,228 B) and symbols (14,132 B) subsets, making it far worse than the headline; and Inter's latin-ext alone (85,068 B) is larger than every Arabic subset except Noto Kufi — so this is a family-choice tax far more than an 'Arabic tax'. The unicode-range description is also slightly off: Google splits Presentation Forms as U+FE70–FE74 and U+FE76–FEFC, and the range additionally covers the U+1EE00–1EEF1 Arabic Mathematical blocks.

### PARTIALLY_TRUE — Font-swap shift is solvable with size-adjust/ascent-override/descent-override/line-gap-override; next/font generates this automatically; font-display: swap ~50%, optional 0.4–0.5%, preload ~12%

The mechanism and the adoption numbers are all confirmed. Chrome for Developers 'Improved font fallbacks' (2023-02-10) covers all four descriptors, contains the exact quote 'the web font and the adjusted fallback font will always have the same vertical dimensions', and states next/font has used metric overrides and size-adjust automatically since Next 13. Web Almanac 2025 Fonts chapter (2026-01-15, updated 2026-02-10) gives swap 49.6%/50.1%, optional 0.4–0.5%, preload 12.0% desktop / 11.7% mobile. What is NOT supported is the headline 'almost nobody does it': the Fonts chapter contains no data at all on size-adjust or metric-override adoption. The 0.4–0.5% figure is `font-display: optional`, a different mechanism, and using it as evidence for metric-override rarity is a substitution. https://almanac.httparchive.org/en/2025/fonts

### CONFIRMED — BlurHash/ThumbHash are 20–30 bytes but need JS to decode; WebP LQIP ~100 bytes, JPEG LQIP ~200 bytes, both paint with zero JS; Mux recommends LQIP; Next.js supports placeholder=blur + blurDataURL

Mux blog by Wesley Luyten (2024-03-28) confirms the byte figures, the JS-decode dependency argument, and contains the ~150-byte statement: 'The encoded size might be about 150 bytes larger, but the increased quality and avoiding the requirement of JavaScript to render the blurhash is well worth it.' Next.js v16.3.2 docs confirm blurDataURL is added automatically only for static imports of jpg/png/webp/avif and must be supplied manually for dynamic or remote images. https://www.mux.com/blog/blurry-image-placeholders-on-the-web

### CONFIRMED — web.dev says 'Never lazy-load your LCP image'; HTTP Archive found 9.5% of pages lazy-load their LCP element; high priority on >1–2 images is unhelpful; fetchpriority=low recommended for carousel slides

All four verified. web.dev/articles/optimize-lcp (2025-03-31) carries the exact sentences 'Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay' and 'setting a high priority on more than one or two images makes priority setting unhelpful', plus the carousel deprioritisation advice. Web Almanac 2024 Media chapter (2024-12-29) confirms 9.5% of LCP img elements use native lazy-loading on mobile. https://almanac.httparchive.org/en/2024/media

### CONFIRMED — CLS is preventable by construction: width/height give a default aspect-ratio; <picture> needs dimensions on each <source>; reserve min-height/aspect-ratio for late content; transform animations are composited and cannot cause CLS while top/left/box-shadow/box-sizing do; bfcache improves CLS

web.dev/articles/optimize-cls (2025-02-07) confirms all of it, including that Chrome, Firefox and Safari support width/height on <source> within <picture>, the composited-vs-layout property split ('Composited animations using translate can't impact other elements, and so don't count toward CLS'), and a dedicated section on bfcache eligibility reducing CLS. https://web.dev/articles/optimize-cls

### PARTIALLY_TRUE — Next.js 16 makes Partial Prerendering the default behaviour via the cacheComponents flag, which unifies ppr/useCache/dynamicIO; requires Node.js runtime; cacheLife and cacheTag control duration and invalidation

The substance is right but the headline overstates it. cacheComponents is an OPT-IN config flag you must set (`cacheComponents: true` in next.config.ts) — it is not on by default in Next.js 16. What the docs actually say is that PPR is the default behaviour *once cacheComponents is enabled*, at which point experimental.ppr is removed as unnecessary. Everything else confirmed against the v16.3.2 docs (lastUpdated 2026-06-22): the v16.0.0 changelog entry unifying ppr/useCache/dynamicIO, the Node.js runtime requirement with runtime='edge' migration, cacheLife/cacheTag, and the verbatim 'prerenders a static HTML shell that is served immediately while dynamic content streams in when ready'. I did not independently verify the next/link prefetch='auto' sub-claim. https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents

### CONFIRMED — 90%+ of pages include a third party; median third-party requests 79 mobile / 83 desktop, 106/129 for top 1,000; median inclusion chain depth 3; next/script has four strategies with worker experimental and App Router-incompatible

Web Almanac 2025 Third Parties chapter (2026-01-15) confirms 'Around 90%-92% pages use third-parties across different rank groups', medians of 79 mobile / 83 desktop, 106 mobile / 129 desktop for the top 1,000, and 'The median depth of the inclusion chain is 3' (max observed 2,285). https://almanac.httparchive.org/en/2025/third-parties

### CONFIRMED — Speculative prerendering is Chromium-only (Chrome/Edge 109+), Firefox unsupported, Safari behind a flag; immediate allows 10 concurrent prerenders, eager/moderate/conservative allow 2 FIFO; eagerness triggers as listed; Chrome documents near-zero LCP, reduced CLS, improved INP

Chrome for Developers prerender-pages doc (last updated 2026-01-23) confirms the support matrix, the concurrency table (immediate 10 prerender / 50 prefetch; others 2 FIFO), the conservative pointer-or-touch-down trigger, moderate 200ms hover plus 500ms-after-scroll mobile viewport heuristic, eager 10ms hover plus 50ms-in-viewport mobile heuristic, and the quoted 'near zero LCP, reduced CLS ... and improved INP'. MDN independently corroborates the weak support, labelling the Speculation Rules API 'Limited availability — not Baseline because it does not work in some of the most widely-used browsers' and flagging it Experimental. https://developer.chrome.com/docs/web-platform/prerender-pages

### CONFIRMED — Milliseconds Make Millions (2020-06-24, Google/Deloitte/55): 37 sites, 30M+ sessions, 0.1s mobile speed improvement gave 10.1% travel conversion uplift, 2.2% checkout completion, 8.4% retail conversion / 9.2% AOV; Vodafone 31% LCP improvement gave 8% more sales

I pulled the primary Think with Google PDF and extracted the figures directly: travel shows 'MOBILE USERS +2.8% Page Views per session, +10.1% Conversion rate, +1.9% Avg. order value'; retail shows '+5.2% / +8.4% / +9.2%'. Date, commissioning (Google, conducted by 55 and Deloitte), 37 brands, 30M+ sessions and the end-of-2019 30-day hourly monitoring all confirmed on web.dev. Vodafone case study (2021-03-17) confirms 31% LCP improvement, 8% sales, 15% lead-to-visit, 11% cart-to-visit, 50/50 paid-traffic split. CRITICAL caveat the researcher missed: the 37 brands split into Retail 15, Luxury 10, Lead Gen 6, Travel 6 — the 10.1% travel figure rests on SIX brands, and it is an observational hour-to-hour correlation, not an experiment. The researcher's own STALE flag is appropriate; the small-n caveat should be added to it.

### PARTIALLY_TRUE — 48% of sites pass CWV on mobile, 56% desktop; mobile LCP good 62%, INP 77%, CLS 81%; Shopify 76% vs WooCommerce 33% and Magento 36%; Littledata travel benchmarks (273 sites) top-20% desktop <2.2s, bounce 50.65%, conversion 0.2–4%

Almanac figures confirmed exactly (48%/56%; LCP 62%, INP 77%, CLS 81%) and the E-commerce chapter does call LCP 'the biggest differentiator'. But the platform numbers are mislabelled: the researcher writes 'mobile good-CWV rates range from Shopify at 76% down to WooCommerce at 33% and Magento at 36% (desktop)' — mixing scales in one sentence. Actual: Shopify 76% both; WooCommerce 33% desktop / 35% mobile; Magento 36% desktop / 35% mobile. The Littledata figures are quoted accurately from Promodo (published 2026-01-12, updated 2026-05-13) — <2.2s top-20%, <1.7s top-10%, >6.3s bottom-20%, 50.65% bounce, 42.0%/51.5% desktop/mobile, 0.2–4% conversion — but Promodo is a marketing-agency blog citing Littledata with no methodology and no measurement date, and desktop 'load time' and bounce rate are not comparable to CrUX field CWV. Cite as soft benchmark, not evidence. https://almanac.httparchive.org/en/2025/ecommerce

### FALSE — First-party measurement 2026-08-22: almosafer.com returned 217,205 bytes of HTML with 34 script tags; airbnb.com 88,097 bytes with 50 script tags; Booking.com and Wego returned bot-check interstitials

Mislabelled in a way that understates the finding by ~8x. I reran the same measurement with an Android Chrome UA on 2026-08-22. Script counts reproduce EXACTLY (almosafer 34, airbnb 50), so the fetches were equivalent — but the byte figures are gzip WIRE bytes, not 'bytes of HTML'. Uncompressed documents, which are what the browser must actually parse: almosafer 1,808,430 B, airbnb 534,178 B. Proof: gzip -9 of my almosafer document gives 217,061 B, essentially identical to their 217,205; airbnb gzips to 86,774 B vs their 88,097. Booking.com confirmed as a bot check (HTTP 202, 3,962 B). Wego did NOT match — I got HTTP 200 with 11,554 B, not 1,796. Restate with both numbers, since parse/main-thread cost tracks the uncompressed figure.

### FALSE — A 2025 peer-reviewed study (Mostafa, Wittie & Goel, 2025-03-05) found 18% of websites bandwidth-limited and 33% bandwidth-constrained, superseding the stale Belshe 2010 / Grigorik 2012 latency finding

The framing is the problem and it inverts the researcher's own staleness argument. The 2025-03-05 date is merely the arXiv POSTING date. The paper's network data is drawn from OpenSignal reports covering January 2018, January 2019 and January 2020, and the arXiv listing states the work was 'accepted and published in MOBIMEDIA 2020: Proceedings of the 13th EAI International Conference on Mobile Multimedia Communications' (August 2020). So it is 2018–2020 evidence, not 2025 evidence — the same vintage as the Grigorik material the researcher flags as STALE, and it predates modern page weights and Gulf 5G entirely. The extracted findings themselves are accurately quoted: '8 out of 45 (18%)', '15 out of 45 (33%) ... in at least some network/region performance envelopes', CSS count the strongest coefficient (0.261606), and 'both improvements in latency and improvements in bandwidth have a steady effect on page PSI'. Keep the numbers, delete the 2025 framing. https://arxiv.org/abs/2503.03641

### Corrections applied

- AVIF does NOT deliver a consistent ~25% saving over WebP. Re-running the researcher's own stated ffmpeg settings (libaom-av1 CRF 32 cpu-used 6 vs libwebp quality 75 preset photo) on two real photographs gave savings of 0.7% to 13.4%, never approaching 25% and mostly below Next.js's own stated 20%. The saving is strongly content-dependent. Budget on Next.js's documented '~20% smaller than WebP' as an optimistic ceiling, and note Next.js explicitly says 'We still recommend using WebP for most use cases.'
- Next.js 16 defaults `formats` to `['image/webp']` — AVIF is opt-in, not default. Enabling both AVIF and WebP causes Next.js to cache each format separately, so dual-format serving multiplies both cache writes ($4.00–$6.40 per 1M 8KB units) and transformations. The AVIF decision is a cost decision, not just a bytes decision.
- Competitor page weights were reported as gzip wire bytes but labelled 'bytes of HTML'. Corrected: almosafer.com's homepage document is 1,808,430 bytes uncompressed (217 KB gzipped) with 34 script tags; airbnb.com is 534,178 bytes uncompressed (87 KB gzipped) with 50 script tags. Parse and main-thread cost track the uncompressed figure, so the uncompressed number is the one that belongs in a performance budget.
- `cacheComponents` is an opt-in flag you must set (`cacheComponents: true` in next.config.ts), not Next.js 16 default behaviour. Partial Prerendering becomes the default only once that flag is enabled, at which point `experimental.ppr` is removed as unnecessary. Enabling it also forces the Node.js runtime, so any route exporting `runtime = 'edge'` must be migrated first.
- `qualities` is not a hard requirement that fails the build if omitted — Next.js 16 defaults it to `[75]`. The practical consequence is stricter than 'required': omit it and every quality value silently coerces to 75. Also, an out-of-list `quality` prop is coerced to the nearest allowed value with a dev warning; only a direct hit on the image REST API with a disallowed quality returns 400.
- Four sequential queries against a Frankfurt Postgres at 112.9 ms RTT costs ~450 ms, which is roughly 18% of a 2.5 s LCP budget — not 40%. The 40% figure is web.dev's recommended TTFB *share* of LCP; 450 ms is about 45–56% of that TTFB sub-budget. State it as 'over half the TTFB budget' or '18% of the LCP budget', not '40% of an LCP budget'.
- The 'more nuanced 2025 evidence' on bandwidth vs latency is not from 2025. Mostafa, Wittie & Goel was posted to arXiv on 2025-03-05 but was published at MOBIMEDIA 2020 and its network data comes from OpenSignal reports for January 2018, 2019 and 2020. The 18%/33% bandwidth-limited findings stand, but they are 2018–2020 evidence — the same era as the Grigorik material flagged as stale, and they predate current page weights and Gulf 5G.
- The 10.1% travel conversion uplift rests on only 6 travel brands, not 37. The 37 sites split Retail 15 / Luxury 10 / Lead Gen 6 / Travel 6. It is also an observational hour-to-hour correlation over 30 days in late 2019, not a controlled experiment. Cite it alongside the Vodafone A/B test (31% LCP improvement → 8% more sales), which is the only genuinely experimental evidence in the set.
- IBM Plex Sans Arabic subset sizes are understated. Measured on 2026-08-22: arabic 42,848 B (not 33,512) and latin 19,164 B (not 13,944). Other families reproduce within 0.5%. Also, Noto Kufi Arabic variable pulls math (22,228 B) and symbols (14,132 B) subsets on top of its 123,688 B arabic subset.
- 'Almost nobody uses font metric overrides' is unsupported. The Web Almanac 2025 Fonts chapter publishes no adoption data for size-adjust or the ascent/descent/line-gap overrides. The 0.4–0.5% figure cited is `font-display: optional`, a different mechanism. Keep the technique (it works, and next/font emits it automatically since Next 13); drop the rarity claim.
- Platform CWV rates were labelled 'mobile' but quote desktop numbers. Correct: Shopify 76% on both; WooCommerce 33% desktop / 35% mobile; Magento 36% desktop / 35% mobile.
- Ignore the widely-circulated claim that Google lowered the 'good' LCP threshold from 2.5 s to 2.0 s in a March 2026 core update. It appears only on SEO blogs. web.dev's LCP article, last updated 2025-09-04 and checked 2026-08-22, still states 2.5 s at the 75th percentile.

### Flagged as not covered

- Device CPU and the main thread are absent. The dimension concludes that because Gulf bandwidth is high, the constraint is 'latency, round trips and main-thread work' — then budgets almost entirely for bytes and RTT. INP is the most-failed Core Web Vital (~43% of sites fail per early-2026 CrUX), and it is a CPU story, not a network one. There is no device-tier assumption, no INP budget, no long-task budget, and no guidance to test under 4x CPU throttling (roughly a three-year-old mid-tier Android). A Gulf audience on flagship 5G handsets is exactly the case where bandwidth is irrelevant and JS execution decides the experience.
- Saudi PDPL data residency. The whole architectural recommendation drives toward Supabase in Mumbai (ap-south-1) on a 30.9 ms latency argument, with no mention that this moves Saudi personal data outside the Kingdom. SDAIA's 2024 Regulation on Personal Data Transfer Outside the Kingdom requires a transfer risk assessment and SCCs/BCRs, there is still no adequacy list, and the compliance grace period ended 2024-09-14. For a travel agency holding traveller names, passport data and payment references this can override the latency calculus entirely.
- No mitigation for the stated latency problem. The dimension diagnoses the Dubai→Frankfurt/Mumbai RTT issue and stops. Missing: Supabase read replicas, connection pooling, `use cache` + cacheLife to keep package/destination reads off the request path, ISR for catalogue pages, and the general principle of moving reads out of the LCP critical path so RTT stops being multiplied by query count. The 'four sequential queries' figure is a self-inflicted pattern, not a geographic constant.
- Vercel Hobby is non-commercial-only under the Fair Usage Policy, so a travel agency cannot use it. Quoting '5K/month included on Hobby' as the budget anchor is misleading — price this on Pro. Also omitted: Image Optimization bills Fast Data Transfer and Edge Requests separately on top of the three meters, and Hobby includes 300K cache reads / 100K cache writes.
- next/font self-hosts Google Fonts at build time, eliminating the fonts.gstatic.com connection entirely — no third-party DNS, TLS handshake or extra RTT at runtime. In Dubai or Riyadh that removed round trip is worth more than most of the subset byte deltas the dimension spends its font section on. The font analysis measures Google Fonts' CDN payloads as if they were served from Google at runtime.
- AVIF browser support is never stated (~94–95% global; Safari 16.4+, Chrome/Edge 85+, Firefox 93+). The entire AVIF recommendation depends on it, and the ~5% gap (mostly iOS 15 and older Android WebView) is what forces dual-format serving and therefore the doubled cache cost.
- No CLS or INP budget numbers, despite the summary promising 'numbers a CI job can fail on'. Only LCP and byte budgets are supplied. A CI gate needs CLS and INP thresholds, a JS transfer/execution budget, a third-party request cap (median is already 79 on mobile), and a stated lab-vs-field measurement basis — Lighthouse CI cannot measure INP or field CLS.
- Prefetch and prerender are recommended without noting where they fail. Speculation Rules is Chromium-only, so it is invisible to iOS Safari — a large share of Gulf traffic. bfcache eligibility is broken by common booking-funnel patterns (unload handlers, no-store on authenticated pages), and prerendering search-result or availability pages risks firing analytics and holding inventory for navigations that never happen.
- No booking-funnel-specific performance treatment. Everything is framed around the marketing/landing surface (hero image, hero video, fonts). Search results, availability calendars, date pickers and multi-step checkout are where travel sites actually lose conversions, are dynamic by nature, and are exactly what Cache Components and PPR are for — but they get no budget, no caching strategy and no INP target.

## Sources

- [Web Vitals](https://web.dev/articles/vitals) · web.dev (Google Chrome team) · 2024-10-31  
  Exact Core Web Vitals metric set, thresholds, units, and the 75th-percentile assessment rule; identifies TTFB/FCP/TBT as diagnostics rather than Core Web Vitals.
- [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) · web.dev (Google Chrome team) · 2025-03-31  
  LCP subpart proportions (TTFB ~40%, load delay <10%, load duration ~40%, render delay <10%); fetchpriority guidance; the explicit prohibition on lazy-loading the LCP image and the warning against high priority on more than one or two images.
- [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) · web.dev (Google Chrome team) · 2025-09-04  
  LCP element candidacy rules including that video LCP uses poster load time or first-frame presentation, whichever is earlier; background-image and SVG edge cases; good/needs-improvement/poor thresholds.
- [Video performance](https://web.dev/learn/performance/video-performance) · web.dev (Google Chrome team) · 2026-04-02  
  preload="none"/"metadata" semantics and that preload is only a hint; the autoplay muted loop playsinline combination; that autoplay downloads immediately even off-viewport; the 1.7 s median main-thread block from YouTube embeds and the facade pattern.
- [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls) · web.dev (Google Chrome team) · 2025-02-07  
  width/height and aspect-ratio for space reservation including dimensions on <source> in art-directed <picture>; font-display: optional and metric overrides for font-swap shift; composited transform animations vs layout-triggering properties; bfcache.
- [Improved font fallbacks](https://developer.chrome.com/blog/font-fallbacks/) · Chrome for Developers · 2023-02-10  
  size-adjust, ascent-override, descent-override and line-gap-override descriptors and how calibrating a fallback to match web-font vertical dimensions eliminates swap-induced layout shift.
- [Prerender pages in Chrome for instant page navigations](https://developer.chrome.com/docs/web-platform/prerender-pages) · Chrome for Developers · 2026-01-23  
  Speculation Rules browser support (Chrome/Edge 109+, not Firefox, Safari behind flag), concurrency caps by eagerness (immediate 10, moderate/conservative 2 FIFO), exact hover/viewport trigger timings, and the near-zero-LCP effect.
- [Image Component (next/image) API Reference, v16.3.2](https://nextjs.org/docs/app/api-reference/components/image) · Next.js / Vercel · 2026-08-18  
  priority deprecated in favour of preload in Next.js 16; required qualities allowlist; default quality 75; default deviceSizes and imageSizes arrays; formats/AVIF configuration with the stated ~20% smaller / ~50% slower-to-encode trade-off and separate per-format caching; blurDataURL not auto-generated for remote images.
- [cacheComponents configuration reference, v16.3.2](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) · Next.js / Vercel · 2026-06-22  
  Cache Components makes Partial Prerendering the App Router default in Next.js 16, replacing experimental.ppr/useCache/dynamicIO; static HTML shell served immediately with dynamic content streaming; Node.js runtime requirement; use cache, cacheLife, cacheTag.
- [Script Component (next/script) API Reference, v16.3.2](https://nextjs.org/docs/app/api-reference/components/script) · Next.js / Vercel · 2026-08-21  
  The four loading strategies and their documented use cases (beforeInteractive for bot detectors and consent managers, afterInteractive default for tag managers and analytics, lazyOnload for chat plugins and social widgets) and that the worker strategy does not work with App Router.
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing) · Vercel · 2026-02-23  
  Three billing meters (transformations, cache reads, cache writes) with rates and Hobby allowances; billing on every cache MISS and STALE; 8192 px source limit and 10 MB transformed-output limit.
- [Introducing the Dubai Vercel region (dxb1)](https://vercel.com/changelog/introducing-the-dubai-vercel-region-dxb1) · Vercel · 2025-06-16  
  Existence of the dxb1 region mapped to me-central-1, serving both CDN caching and function execution for the Middle East, Africa and Central Asia.
- [Available regions](https://supabase.com/docs/guides/platform/regions) · Supabase · accessed 2026-08-22  
  Supabase's full region list, confirming no Middle East region exists and that ap-south-1 (Mumbai) and eu-central-1 (Frankfurt) are the nearest options to the Gulf.
- [CloudPing AWS inter-region latency API (p50, 1-year window)](https://www.cloudping.co/api/latencies?percentile=p_50&timeframe=1Y) · CloudPing (mda590) · fetched 2026-08-22  
  Measured median RTT from me-central-1 (Dubai): 112.9 ms to eu-central-1, 30.9 ms to ap-south-1, 94.7 ms to ap-southeast-1, 195.2 ms to us-east-1 — the basis of the data-locality recommendation.
- [Web Almanac 2025: Page Weight](https://almanac.httparchive.org/en/2025/page-weight) · HTTP Archive · 2026-01-15  
  Median mobile page 2,164 KB / desktop 2,412 KB; p90 mobile 8,337 KB; bytes by resource type (mobile images 911 KB, JS 632 KB, fonts 122 KB, CSS 77 KB, HTML 22 KB); images as ~42-44% of page weight.
- [Web Almanac 2025: Performance](https://almanac.httparchive.org/en/2025/performance) · HTTP Archive · 2026-01-15  
  48% mobile / 56% desktop good-CWV pass rates; per-metric mobile breakdown (LCP 62% good, INP 77%, CLS 81%); LCP content types (images 76.0% mobile, 85.3% desktop); LCP image formats (JPG 57%, PNG 26%, WebP 11%).
- [Web Almanac 2025: Fonts](https://almanac.httparchive.org/en/2025/fonts) · HTTP Archive · 2026-01-15  
  Median font file 35-36 KB and p90 115-116 KB; font-display adoption (swap ~50%, optional 0.4-0.5%); preload hints ~12%; variable font adoption ~41% mobile; 88% of sites use web fonts; script coverage skew toward Latin.
- [Web Almanac 2025: Third Parties](https://almanac.httparchive.org/en/2025/third-parties) · HTTP Archive · 2026-01-15  
  More than nine in ten pages include a third party; median 79 third-party requests on mobile (106 for top-1000 sites); median inclusion chain depth of 3.
- [Web Almanac 2025: E-commerce](https://almanac.httparchive.org/en/2025/ecommerce) · HTTP Archive · 2026-01-15  
  Platform-level good-CWV rates showing LCP as the biggest differentiator (mobile: Shopify 76% down to self-hosted platforms in the 30-50% range) — the benchmark a custom-built site should beat.
- [Web Almanac 2024: Media](https://almanac.httparchive.org/en/2024/media) · HTTP Archive · 2024-12-29  
  Image format adoption on mobile (JPEG 32.4%, PNG 28.4%, GIF 16.8%, WebP 12%, AVIF 1.0%); srcset 42% of pages; <picture> 9.3%; 9.5% of LCP images incorrectly lazy-loaded. NOTE: 2024 data — the 2025 almanac has no Media chapter.
- [A clear look at blurry image placeholders on the web](https://www.mux.com/blog/blurry-image-placeholders-on-the-web) · Mux · 2024-03-28  
  Byte sizes and trade-offs for LQIP techniques: BlurHash/ThumbHash 20-30 bytes but JS-decode-dependent; tiny WebP LQIP ~100 bytes, tiny JPEG ~200 bytes, both paint with zero JS; recommendation of LQIP over hash encodings for web.
- [Desktop vs Mobile vs Tablet Market Share — Saudi Arabia / United Arab Emirates / Egypt](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/saudi-arabia) · StatCounter Global Stats · July 2026 (fetched 2026-08-22)  
  Mobile share of page views: Saudi Arabia 65.43% (desktop 33.61%), UAE 59.35% (desktop 40.02%), Egypt 75.46% (desktop 23.11%) — correcting the assumption that Gulf traffic is overwhelmingly mobile.
- [Digital 2026: Saudi Arabia](https://datareportal.com/reports/digital-2026-saudi-arabia) · DataReportal / Kepios · 2025-11-08 (data current as of October 2025)  
  34.4 million internet users at 99.0% penetration; 48.7 million mobile connections at 140% of population, 98.5% of them broadband — establishing that near-universal, high-quality connectivity is the baseline in this market.
- [Does More Bandwidth Really Not Matter (Much)?](https://arxiv.org/html/2503.03641) · Mostafa, Wittie & Goel (arXiv) · 2025-03-05  
  2025 re-examination of the latency-vs-bandwidth question across 45 sites, 4 carriers, 57 cities: 18% of sites primarily bandwidth-limited, 33% constrained in some scenarios, no clean diminishing returns for modern complex pages; CSS/image/script object counts predict bandwidth sensitivity.
- [Milliseconds make millions](https://web.dev/case-studies/milliseconds-make-millions) · web.dev (Google, with Deloitte and 55) · 2020-06-24  
  Travel conversion +10.1% and checkout completion +2.2% per 0.1 s of mobile speed improvement, from 37 brand sites and 30M+ sessions. FLAGGED AS POTENTIALLY STALE — 2020 data, predates INP and the current CWV framework; cite as directional only.
- [The business impact of Core Web Vitals](https://web.dev/case-studies/vitals-business-impact) · web.dev (Google Chrome team) · 2021-09-01  
  Vodafone A/B test: 31% LCP improvement produced 8% more sales, 15% better lead-to-visit, 11% better cart-to-visit; Redbus travel case (CLS 1.65 to 0, TTI ~8 s to ~4 s). FLAGGED AS POTENTIALLY STALE — 2021 page; the Vodafone result is a controlled experiment and therefore methodologically stronger than the Deloitte correlational study.
- [Travel Industry Benchmarks Report 2026](https://www.promodo.com/blog/tourism-marketing-benchmarks) · Promodo (citing Littledata, survey of 273 travel sites) · 2026-01-12 (updated 2026-05-13)  
  Travel-vertical benchmarks: top-20% desktop load <2.2 s, top-10% <1.7 s, bottom-20% >6.3 s; average bounce 50.65% (desktop 42.0%, mobile 51.5% from Google search); conversion 0.2%-4%; ~60% of travel traffic from mobile. Secondary source relaying Littledata data.
- [Google Fonts CSS2 API and gstatic WOFF2 payloads (Cairo, IBM Plex Sans Arabic, Noto Kufi Arabic, Tajawal, Inter)](https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap) · Google Fonts (first-party measurement) · fetched 2026-08-22  
  Measured Arabic vs Latin WOFF2 subset byte sizes and the exact unicode-range Google uses for Arabic (U+0600-06FF, U+0750-077F, U+08xx, U+FB50-FDFF, U+FE70-FEFC and related blocks): Tajawal 400 arabic 8,916 B; Cairo variable arabic 30,712 B; IBM Plex Sans Arabic 400 arabic 33,512 B; Noto Kufi Arabic variable arabic 123,796 B; Inter variable latin 48,432 B.
- [First-party AVIF/WebP/JPEG and hero-video encode measurements (ffmpeg)](https://web.dev/learn/performance/video-performance) · Own measurement, run on 1920x1080 photographic sources · 2026-08-22  
  AVIF vs WebP at responsive widths (640px 20.9 vs 28.4 KB; 828px 33.3 vs 44.0 KB; 1080px 53.6 vs 70.7 KB; 1920px 157.8 vs 211.9 KB, ~25% saving throughout); a 6 s 1080p slow-pan hero loop at 2,236,800 B (CRF 23) / 1,110,558 B (CRF 28) / 844,957 B (720p CRF 26) versus a 129,605 B AVIF poster of the same frame.
