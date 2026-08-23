# Designing for a social-media-native audience

Dimension `social-first-design` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

A creator-led travel site is the second half of a video, not a website with an Instagram icon in the footer. Three mechanical facts survive verification.

First, most arrivals land inside an embedded browser — Android WebView on Android, WKWebView on iOS — and neither shares state with the user's real browser. Google's Custom Tabs documentation says WebViews "don't share state with the browser," and Custom Tabs by contrast share the cookie jar, permissions model, autofill, saved passwords, payment methods and addresses. Google-account OAuth fails outright in a WebView (disallowed_useragent), not merely "discouraged." PWA install is unreachable: Chrome needs a tap plus 30 seconds of engagement to fire beforeinstallprompt, which WebView never does, and iOS Add to Home Screen lives in the Safari share sheet. But express checkout does *not* die — Stripe's own in-app-webview table lists Apple Pay as "Supported in iOS webviews" and Google Pay as supported where no pop-up is required. What breaks is Link, PayPal, Klarna and Amazon Pay. Detect availability at runtime via `availablepaymentmethodschange`. Passwordless login should use email OTP or a server-side token_hash flow, because Supabase's PKCE flow requires "the code exchange must be initiated on the same browser and device where the flow was started."

Second, attribution decays fast. WebKit's ITP "caps the expiry of cookies created in JavaScript on the landing webpage to 24 hours" the moment it detects link decoration — exactly what a utm-tagged Instagram link is — and deletes all script-writable storage after 7 days without interaction. The qualifier is the fix: server-set HttpOnly cookies are exempt, so capture must happen server-side on first request.

Third, credibility runs opposite to agency instinct. Baymard finds customer photos read as "more objective, reliable, and trustworthy" than official imagery, and 57% of mobile sites still don't let users traverse reviewer images. TikTok tells advertisers to go "DIY or not overly polished." Google forbids self-serving review stars for Organization or LocalBusiness, including via embedded widgets — so trust cannot be bought with markup, only earned with a real face, real footage, and reviews hosted off-site.

## Summary as first written, before verification

A creator-led travel site is not a website with an Instagram icon in the footer. It is the second half of a video. Three mechanical facts govern everything else in this dimension.

First, most of Sarra's traffic will not arrive in Safari or Chrome. It will arrive inside Instagram's or TikTok's embedded WebView, an environment that Google's own Custom Tabs documentation says "doesn't share state with the browser," which breaks OAuth sign-in (Google explicitly discourages WebView OAuth), makes PWA install impossible, and — combined with Apple restricting Apple Pay on the web to Safari — quietly removes the express-checkout path. Any design that assumes a normal browser will silently fail for the majority of arrivals.

Second, attribution decays faster than anyone plans for. WebKit's ITP caps JavaScript-written cookies at 24 hours the moment it detects link decoration — which is exactly what a `utm_`-tagged Instagram link is — and caps all script-writable storage at 7 days. Client-side attribution and client-side session state are therefore not viable; capture must happen server-side on first request.

Third, the credibility advantage runs the opposite way from what most agency sites assume. Baymard's research finds customer-submitted photos are perceived as "more objective, reliable, and trustworthy" than official imagery; TikTok's own guidance tells advertisers to look "not overly polished." Meanwhile Google's structured-data policy forbids self-serving review stars for an Organization, so the small agency cannot buy trust with markup — only with a real face, real footage, and reviews that live off-site.

The strategy that follows: treat the site as a set of screenshot-shaped, self-contained artifacts, each of which continues a specific video and ends in something the traveller wants to post.

## Findings

### Android WebView (the technology behind Instagram/Facebook in-app browsers) shares no state with the user's real browser — no cookie jar, no saved passwords, no saved payment methods, no saved addresses, no autofill, no previously granted permissions. Chrome Custom Tabs share all of these; WebView shares none.

Confidence: verified · type: constraint

Why it matters here: A traveller who arrives at the package page from an Instagram Story is, from the site's perspective, a brand-new anonymous device every single time — even if they booked last month. Returning-visitor personalisation, 'welcome back', saved wishlists, and any autofill-assisted checkout are all unavailable for the majority of Middle East social traffic. The booking flow must be designed for a cold, stateless, autofill-less visitor on the first screen.

Evidence: Chrome for Developers, 'Overview of Android Custom Tabs': WebViews "don't support all features of the web platform, don't share state with the browser and add maintenance overhead"; the doc lists browsing sessions, saved passwords, saved addresses, cookie jar, permissions model and AutoComplete data as shared by Custom Tabs. Page last updated 2020-02-04 (still the current canonical doc as of fetch).

Source: https://developer.chrome.com/docs/android/custom-tabs

### Google discourages OAuth sign-in inside WebViews: "Using OAuth for authentication in a WebView can make your app susceptible to security problems and hurt usability by disconnecting the user from single sign-on sessions." Chrome Custom Tabs / SFSafariViewController are the recommended alternative.

Confidence: verified · type: constraint

Why it matters here: 'Continue with Google' as the primary sign-in on a package page is a trap for Instagram-sourced traffic. Supabase Auth's social providers will be the worst-performing path exactly where volume is highest. The site's primary identity path must not be third-party OAuth.

Evidence: Google Support FAQ, 'Modernizing OAuth interactions in native apps' guidance (support.google.com/faqs/answer/12284343), fetched 2026-08-22.

Source: https://support.google.com/faqs/answer/12284343

### Supabase magic links break when the email is opened in a different browser than the one that started the login; Supabase's own docs recommend email OTP (a six-digit code) for cross-device/cross-browser scenarios. Both are rate-limited to one request per 60 seconds and expire after 1 hour.

Confidence: verified · type: constraint

Why it matters here: This is the exact Instagram scenario: user starts sign-in inside the Instagram WebView, taps the email in the Mail app, which opens Safari — a different browser with a different cookie jar. Magic links will fail at high rates on social traffic. Email OTP is the correct default for this audience, and the 60-second resend limit needs a visible countdown in the UI so users don't tap 'resend' into a wall.

Evidence: Supabase Docs, 'Passwordless email logins': magic links are "vulnerable if opened in a different browser or email client than where login was initiated"; OTP "work[s] regardless of which browser or device opens the email"; "a user can only request...once every 60 seconds and they expire after 1 hour." Fetched 2026-08-22.

Source: https://supabase.com/docs/guides/auth/auth-email-passwordless

### Stripe states Apple Pay on the web works "in Safari starting with iOS 10 or macOS Sierra," and Stripe Checkout in `embedded_page` mode supports only Safari 17+. Every domain and subdomain showing an Apple Pay button (including `www`) must be separately registered as a payment method domain.

Confidence: inferred · type: constraint

Why it matters here: Instagram's in-app browser is WKWebView, not Safari, so express wallet checkout is unreliable-to-absent for the highest-volume arrival path. Designing a checkout whose hero action is an Apple Pay button will show an empty space or a fallback to most social arrivals. The `www` subdomain registration requirement is a concrete launch-day checklist item that is routinely missed.

Evidence: Stripe Docs, 'Apple Pay' (docs.stripe.com/apple-pay and ?platform=web), fetched 2026-08-22. The Safari-only scoping is verified; the specific conclusion that Instagram's WebView does not present Apple Pay is my inference from that scoping plus the WebView/Safari distinction, not a statement Stripe makes.

Source: https://docs.stripe.com/apple-pay

### WebKit's Intelligent Tracking Prevention detects link decoration (click IDs and tracking parameters) and, when detected, "caps the expiry of cookies created in JavaScript on the landing webpage to 24 hours." All script-writable storage — localStorage, sessionStorage, IndexedDB, Service Worker registrations — is capped at 7 days without user interaction.

Confidence: verified · type: constraint

Why it matters here: A `utm_`-tagged Instagram link IS link decoration. Client-side attribution (a JS cookie storing utm_source) evaporates in 24 hours on iOS, and any localStorage-based wishlist, quote, or half-finished booking evaporates in 7 days. Attribution and in-progress booking state must be written server-side (Next.js middleware → Supabase row + HttpOnly Set-Cookie) on the very first request, not by an analytics tag in the browser.

Evidence: WebKit, 'Tracking Prevention in WebKit' (webkit.org/tracking-prevention/), fetched 2026-08-22.

Source: https://webkit.org/tracking-prevention/

### GA4 recognises nine campaign URL parameters: utm_id, utm_source, utm_medium, utm_campaign, utm_source_platform, utm_term, utm_content, utm_creative_format and utm_marketing_tactic — with the last two documented but "not currently reported in GA4."

Confidence: verified · type: principle

Why it matters here: Gives an exact, closed vocabulary to build the link-generator against. utm_content is the correct slot for the individual post/reel ID ('differentiate creatives'), utm_medium for the surface (bio/story/reel/dm), utm_campaign for the package slug. Building utm_creative_format into the schema now costs nothing and future-proofs when GA4 starts reporting it.

Evidence: Google Analytics Help, 'Collect campaign data with custom URLs' (support.google.com/analytics/answer/10917952), fetched 2026-08-22.

Source: https://support.google.com/analytics/answer/10917952

### Instagram, Facebook and TikTok in-app browsers inject JavaScript into third-party pages: Instagram and Facebook inject `pcm.js` and subscribe to every tap and text selection; TikTok's injected code was found to monitor all keystrokes and taps. Companies can now hide such injection using Apple's `WKContentWorld` (iOS 14.3+), making it undetectable from the page.

Confidence: reported · type: constraint

Why it matters here: Two consequences. Practically, injected scripts and a foreign JS context are a source of hard-to-reproduce bugs in exactly the environment most of the traffic uses — so the in-app path needs its own explicit QA pass, not an assumption. Ethically and legally, no payment form, passport number, or ID field should ever be rendered inside an in-app browser session; those steps must be pushed to the real browser or to a hosted Stripe page.

Evidence: Felix Krause, 'Announcing InAppBrowser.com', 2022-08-18. Flag: 2022, older than 2023 and therefore potentially stale on specifics; the structural point (apps can and do inject JS into WebView pages) remains architecturally true.

Source: https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser

### In-app browsers are detectable from the user-agent with short, stable regexes: Instagram `/\bInstagram/i`, Facebook `/\bFB[\w_]+\//`, Messenger `/\bFB[\w_]+\/(Messenger|MESSENGER)/`, Line `/\bLine\//i`, WeChat `/\bMicroMessenger\//i`, MIUI `/\bMiuiBrowser\//i`. On Android, a page can hand the user out to the real browser with `intent://HOST/path#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=<encoded>;end;` — but Chrome will refuse to launch it if a JavaScript timer triggers it without a user gesture.

Confidence: verified · type: pattern

Why it matters here: This makes the 'open in browser' prompt buildable rather than hand-wavy. Critically, the Android escape must be wired to a real tap (a button), never to a timeout or an onload redirect, or it silently does nothing. No equivalent documented programmatic escape exists for iOS — no sourced figure or supported API found — so iOS needs a copy-link + illustrated '⋯ → Open in Safari' instruction instead.

Evidence: detect-inapp source (github.com/f2etw/detect-inapp/blob/master/src/inapp.js) for the UA patterns; Chrome for Developers, 'Android Intents with Chrome' for intent:// syntax, S.browser_fallback_url and the user-gesture restriction. Both fetched 2026-08-22. Note detect-inapp does not ship a TikTok pattern — TikTok's WebView UA tokens (musical_ly / BytedanceWebview) are widely used but I found no primary source, so treat that pattern as unverified.

Source: https://developer.chrome.com/docs/android/intents

### PWA installability requires a manifest, HTTPS, 192px and 512px icons, a valid display mode, and — in Chrome — at least one interaction plus roughly 30 seconds of engagement before `beforeinstallprompt` fires.

Confidence: verified · type: constraint

Why it matters here: An 'add to home screen' strategy cannot be the retention plan for social traffic, because the engagement gate plus the WebView environment means most Instagram arrivals will never see the prompt. If a home-screen presence matters, it has to be earned on a second, in-browser visit — which means the first visit's job is to hand over an email or WhatsApp opt-in, not to chase an install.

Evidence: web.dev, 'What does it take to be installable?', last updated 2024-09-19. The document does not itself address in-app browsers; the conclusion about WebView is my inference from the WebView state-isolation finding above.

Source: https://web.dev/articles/install-criteria

### Baymard's product-page research finds customer-submitted photos are perceived as "more objective, reliable, and trustworthy" than official product images, and that users specifically valued being able to traverse reviewer-submitted images across reviews. 57% of mobile sites fail to let users navigate reviewer images.

Confidence: verified · type: data

Why it matters here: This is the closest thing to hard evidence that real phone footage beats polished stock for credibility, and it comes from moderated usability testing rather than a vendor's marketing claim. For a travel package page it argues for a dedicated, swipeable 'what travellers actually shot' gallery as a first-class module — not a testimonial strip — and for treating agency-shot hero footage as the aspiration layer and traveller footage as the proof layer.

Evidence: Baymard Institute, 'The Current State of Product Page UX', updated 2026-03-18 (originally 2023-10-24), 30,000+ manually rated scores across 155+ benchmarked sites; and 'Mobile UX Trends 2026', updated 2026-07-14, 71,000+ reviewed UX elements across 150+ mobile sites (57% non-compliance on review-image navigation).

Source: https://baymard.com/blog/current-state-ecommerce-product-page-ux

### TikTok's own advertiser guidance tells brands to adopt "a DIY or not overly polished style so that it fits in with the user-generated content on TikTok," shoot 9:16, use sound, land the content proposition in the first 3 seconds, prioritise the hook in the first 6, and display 5–10 words per second of on-screen text.

Confidence: verified · type: trend

Why it matters here: These are the constraints the footage was already shot under. If the landing page re-crops that footage to 16:9, strips the captions, and mutes it, the page breaks continuity with the thing that earned the click. The page's video module should preserve the native 9:16 frame and burned-in captions rather than 'upgrading' them.

Evidence: TikTok Ads Help Center, 'Creative best practices', last updated June 2025. Note: TikTok gives no comparative performance numbers for DIY vs polished — no sourced figure found for a conversion delta.

Source: https://ads.tiktok.com/help/article/creative-best-practices

### Third-party video embeds are extremely expensive. A YouTube facade weighs ~3 KB against ~540 KB for the real player, and YouTube embeds block the main thread for over 1.7 seconds on the median website. Lazy-loading an above-the-fold LCP image measurably worsens LCP (13–15% on WordPress archive pages in an A/B test; median 3,768 ms with lazy loading vs 3,495 ms without).

Confidence: verified · type: data

Why it matters here: Settles the embeds-vs-self-hosted question for a video-led travel site: embed scripts (Instagram's embed.js, TikTok's embed.js) must never load above the fold. Self-host the hero clip from Supabase Storage as MP4/WebM with an eagerly-loaded poster as the LCP element, and use click-to-load facades for any social embed further down the page — which also preserves the 'real reel, real handle' credibility signal without the cost.

Evidence: Chrome Lighthouse docs, 'Lazy load third-party resources with facades' (3 KB vs 540 KB); web.dev Learn Performance, 'Video performance' (>1.7 s main-thread block for YouTube embeds); web.dev, 'The performance effects of too much lazy loading', 2022-03-31 (13–15% LCP figures — flag: 2022, methodology is a single WordPress theme, treat the direction as sound and the magnitude as indicative).

Source: https://developer.chrome.com/docs/lighthouse/performance/third-party-facades/

### Instagram's oEmbed endpoint is capped at 1,000 requests per hour, does not support Stories, and will not render posts from private, inactive, age-restricted accounts or accounts with embeds disabled. Meta's Platform Terms restrict processing of Platform Data and require deletion when retention is no longer necessary. Meta's terms grant Meta a sublicensable licence to content — they do not grant the embedding site one.

Confidence: inferred · type: constraint

Why it matters here: Two design consequences. Operationally, embeds are fragile: a traveller who goes private or deletes a post leaves a hole in the package page, so every embed slot needs a self-hosted fallback. Legally, embedding is not a licence — reposting a traveller's reel as a self-hosted MP4 on the site requires explicit written permission from that traveller, captured and stored. Build a permissions record, not a screenshot folder.

Evidence: Meta for Developers, 'Instagram oEmbed' (1,000 req/hour, unsupported account types, Stories excluded) and Meta Platform Terms (data restrictions, retention/deletion obligations), both fetched 2026-08-22. The 'embedding is not a licence to self-host' conclusion is my reading of the terms, not a quoted sentence.

Source: https://developers.facebook.com/docs/instagram-platform/oembed

### Google's review-snippet policy prohibits star ratings for LocalBusiness and Organization where "the entity that's being reviewed controls the reviews about itself" — including reviews on the entity's own site and reviews shown via embedded third-party widgets. NN/g's trust research independently found that participants weight "reviews and testimonials on external sites" above company-hosted testimonials.

Confidence: verified · type: constraint

Why it matters here: This is the single hardest constraint on the small-agency-vs-OTA trust question. A wall of glowing testimonials on the agency's own site earns neither search visibility nor user belief. The trust architecture must route through things the agency does not control: Google Business Profile reviews, screenshots of real Instagram DMs and comments with handles visible, named travellers linking to their own public accounts, and third-party review platforms.

Evidence: Google Search Central, 'Review snippet structured data', last updated 2026-07-24; Nielsen Norman Group, 'Trustworthiness in Web Design: 4 Credibility Factors', Aurora Harley, 2016-05-08 (flag: pre-2023, but the four dimensions — design quality, upfront disclosure, comprehensive content, connection to the rest of the web — are a timeless principle, not a trend).

Source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### Message match is a first-order conversion variable, not a nicety. NN/g: link labels are the most critical component of information scent, and a destination must confirm the user's assumption with "expected content positioned without requiring scrolling"; "Any broken promise, large or small, chips away at trust and credibility." Unbounce's benchmark data puts the median travel & hospitality landing page conversion rate at 4.8% (below the 6.6% all-industry median), with 5th-to-7th-grade reading level converting "over 2x better than all other difficulty levels" (12.8% median CVR) and a 200–750 word sweet spot.

Confidence: reported · type: data

Why it matters here: Gives a defensible spec for the reel-to-page handoff: the first screen must repeat the reel's exact promise in the reel's exact words, at a 5th–7th grade reading level, inside 200–750 total words. Travel copy specifically shows "one of the lowest tolerances" for complex vocabulary — which also argues against the ornate, brochure-voiced Arabic and English that generic agency sites default to.

Evidence: NN/g 'Information Scent' (Raluca Budiu, 2020-02-02) and 'A Link Is a Promise' (Kara Pernice, 2014-12-14 — flag: pre-2023, timeless principle); Unbounce Conversion Benchmark Report, Travel & Hospitality page (57M+ conversions analysed across industries; travel-specific sample size not disclosed, publication year not stated on the page — treat the 4.8% as indicative, not precise).

Source: https://unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/

### The shareable artifact is fully specifiable. Apple Wallet passes come in five styles (boardingPass, eventTicket, coupon, storeCard, generic) with a strict visual hierarchy — up to 3 header fields, up to 3 primary (2 for boarding passes), 4 secondary, 4 auxiliary (5 for boarding passes) — logo.png at 160×50 pt, strip.png at 375×98 pt, barcodes in QR/PDF417/Aztec/Code128, plus `relevantDate` and up to 10 `locations` that surface the pass on the lock screen. Google Wallet passes are delivered as a signed JWT at `https://pay.google.com/gp/v/save/<jwt>`, and the URL must stay under 1,800 characters.

Confidence: verified · type: pattern

Why it matters here: 'Give them something worth posting' becomes a buildable deliverable rather than a slogan. A real .pkpass trip pass that pops up on the lock screen the morning of departure — with the destination as the primary field and Sarra's brand as the logo — is a genuinely uncommon artifact for a small agency and a natural screenshot moment. The field hierarchy also doubles as an excellent forcing function for the on-site 'trip card' design: if it doesn't fit in 3 primary + 4 secondary fields, it isn't the headline.

Evidence: Apple PassKit Package Format / Pass Design and Creation (developer.apple.com/library/archive — flag: archived documentation, verify field limits against current Wallet Passes docs before implementation); Google Wallet 'Add to Google Wallet on the web' generic pass guide, fetched 2026-08-22.

Source: https://developers.google.com/wallet/generic/web

### Link previews are a designable surface with hard specs. Meta wants ≥1200×630 px, minimum 200×200, as close to 1.91:1 as possible, under 8 MB. Next.js App Router supports per-route `opengraph-image.tsx` generating images at request or build time via `ImageResponse`, statically optimised and cached by default; `@vercel/og` supports flexbox only (no grid), ttf/otf/woff fonts only, and a 500 KB total bundle including fonts and images. OG image routes should be explicitly allowed in robots.txt.

Confidence: verified · type: pattern

Why it matters here: Every WhatsApp forward of a package link — the dominant sharing channel in the Gulf — renders that OG card. A generated card carrying the package name, price, dates and the @handle turns every private share into a branded impression. This is the single highest-leverage 'viral' mechanic available, it costs one file per route in the chosen stack, and almost no small travel agency does it.

Evidence: Meta for Developers, 'Sharing Best Practices — Images'; Next.js docs, 'opengraph-image and twitter-image', lastUpdated 2026-07-09 (8 MB OG / 5 MB Twitter limits, build fails if exceeded); Vercel docs, 'OG Image Generation', last_updated 2026-06-16 (500 KB bundle, flexbox-only, font formats, robots.txt Allow). All fetched 2026-08-22.

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

### Structured data gives the video-first strategy an organic-search surface. `VideoObject` requires name, thumbnailUrl and uploadDate, recommends contentUrl ("most effective for Google to fetch"), and "must be added to a page where users can watch the video"; key moments require ≥30 seconds. `TouristTrip` (parent `Trip`) carries itinerary, arrivalTime, departureTime, offers, provider, tripOrigin, subTrip/partOfTrip and touristType, and is used on only 10K–100K domains.

Confidence: verified · type: pattern

Why it matters here: Self-hosting the reel on the package page (rather than embedding it) is what makes VideoObject legitimate, so the performance decision and the SEO decision point the same way. TouristTrip's low adoption is the opportunity: a package page marked up as a TouristTrip with an itinerary ItemList and an Offer is structurally richer than the flat Product markup most OTAs and agencies use — and it is exactly the shape of the product Sarra sells.

Evidence: Google Search Central, 'Video (VideoObject, Clip, BroadcastEvent) structured data', last updated 2026-02-13; Schema.org TouristTrip (adoption figure of 10K–100K domains stated on the page). Both fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/video

### Google's page-experience guidance asks directly whether "your pages avoid using intrusive interstitials," and its interstitial doc names full-page overlays and redirects-to-a-separate-page as problematic while explicitly endorsing small banners and browser-native prompts. NN/g's popup research documents a participant abandoning a site entirely after consecutive popups, and lists 'email requests before interaction' among the ten worst patterns.

Confidence: verified · type: constraint

Why it matters here: Rules out the default list-building mechanic — the timed 'GET 10% OFF' modal — on both SEO and UX grounds. List capture has to be earned inside the flow (after a price is revealed, after a date is chosen, at the end of a quiz) via inline or non-modal bottom-anchored UI, not bought with an interruption.

Evidence: Google Search Central, 'Understanding page experience' and 'Avoid intrusive interstitials and dialogs', both last updated 2025-12-10; Nielsen Norman Group, 'Popups: 10 Problematic Trends and Alternatives', Anna Kaley, 2019-06-30 (flag: pre-2023; NN/g provides no quantified dismissal rate — no sourced figure found).

Source: https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials

### WhatsApp is a paid, permissioned channel with a specific free window structure. Opt-in is mandatory — a business may contact someone only if they gave their number AND "opt-in permission from the recipient confirming that they wish to receive subsequent messages or calls." Since 2025-07-01 pricing is per delivered template message; marketing templates always cost and cannot access volume discounts; all non-template messages are free inside the 24-hour customer service window opened by the user's own message; Click-to-WhatsApp entry points open a 72-hour free window; service conversations have been free since 2024-11-01.

Confidence: verified · type: constraint

Why it matters here: Reframes WhatsApp capture entirely. The valuable asset is not a phone number in a database — it is an open 24-hour window, which only the customer can open. So the site's job is to make the traveller message first (deep-linked wa.me buttons carrying package context), and the free-window economics mean fast human replies are literally cheaper than automated marketing blasts. That inverts the usual agency instinct and happens to be exactly where a one-person creator brand beats an OTA.

Evidence: WhatsApp Business Messaging Policy (whatsappbusiness.com/policy/) for the opt-in requirement and the recommendation of separate opt-ins per message category; Meta for Developers, 'WhatsApp Business Platform Pricing' for the 2025-07-01 per-message model, the 24-hour service window, the 72-hour free entry point, and free service conversations since 2024-11-01. Both fetched 2026-08-22.

Source: https://developers.facebook.com/docs/whatsapp/pricing

### The Gulf audience is effectively saturated on social and platform preference differs sharply by country. UAE: 11.1M internet users (99.0% of population), Instagram ad reach 7.60M (67.8% of population), YouTube 8.25M (73.6%), TikTok reported at 11.3M adults. Saudi Arabia: 33.9M internet users (99.0%), Instagram ad reach 49.3% of population, Snapchat 72.1%, YouTube 79.4%.

Confidence: reported · type: data

Why it matters here: Snapchat reaching 72.1% of Saudi Arabia — well above Instagram's 49.3% — is the counterintuitive fact that should shape the sharing architecture. If the Saudi market matters, share targets and artifact dimensions must include Snapchat (and its vertical, ephemeral, screenshot-driven behaviour), not just Instagram and TikTok. Designing only for the Instagram-shaped share is a market-specific blind spot.

Evidence: DataReportal, 'Digital 2025: United Arab Emirates', 2025-02-25; 'Digital 2025: Saudi Arabia', 2025-03-03. Both note these are advertising-reach figures, not monthly active users, and that platform revisions make YoY comparison unreliable — treat as order-of-magnitude, not precise.

Source: https://datareportal.com/reports/digital-2025-saudi-arabia

### Autoplay with sound is blocked unless the user has already interacted with the domain; muted autoplay is always allowed; on cross-origin iframes autoplay requires an explicit `allow="autoplay"` permissions-policy delegation. For video, the first painted frame is an LCP candidate, `preload="none"` prevents download until interaction, and roughly 20% of web videos carry `autoplay` — which begins downloading even when off-screen unless deferred.

Confidence: verified · type: constraint

Why it matters here: The reel arriving from TikTok had sound; the landing page's version cannot. So the page must carry the reel's meaning without audio: burned-in captions preserved from the original edit, plus a visible unmute affordance. And the poster frame — not the video — is what must be optimised for LCP, with off-screen videos deferred behind an IntersectionObserver so a grid of six reels doesn't torch the page.

Evidence: Chrome for Developers, 'Autoplay policy in Chrome' (policy since Chrome 66, April 2018; Web Audio from Chrome 71); web.dev Learn Performance, 'Video performance'; web.dev, 'Optimize Largest Contentful Paint' (LCP target ≤2.5 s for 75% of visits). All fetched 2026-08-22.

Source: https://developer.chrome.com/blog/autoplay

## Design implications

- Build an `<InAppBrowserGate />` client component that runs on every route. Detect with the verified UA regexes (`/\bInstagram/i`, `/\bFB[\w_]+\//`, `/\bLine\//i`, `/\bMicroMessenger\//i`, plus an unverified TikTok pattern) and set a `data-inapp` attribute on `<html>` so CSS and analytics can both branch on it. On Android, render a real button whose href is `intent://<host>/<path>#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=<encoded>;end;` — wired to a tap, never a timer, or Chrome refuses it. On iOS there is no documented programmatic escape: render a one-tap 'Copy link' plus a small illustrated arrow pointing at the real position of the ⋯ menu in that app. Show this gate only at the two moments it matters (before sign-in, before payment), never on arrival.
- Make email OTP (six-digit code) the primary Supabase Auth method, not magic links and not Google OAuth. Render the six code boxes with `inputmode="numeric"` and `autocomplete="one-time-code"`, and show a live 60-second countdown on the resend button because Supabase hard-rate-limits to one request per minute. Offer OAuth only as a secondary option, and hide it entirely when `data-inapp` is set.
- Capture attribution server-side in Next.js middleware on the very first request: read all nine GA4 `utm_*` params, write an `attribution_touch` row to Supabase keyed to a server-generated anonymous id, and set that id as an HttpOnly, Secure, SameSite=Lax first-party cookie. Never store attribution in localStorage or a JS-written cookie — ITP caps both (24 hours for JS cookies on a decorated landing, 7 days for script-writable storage). After capture, strip the `utm_*` params from the visible URL with `history.replaceState` so the address bar is clean in a screenshot and clean when the URL is copy-pasted into a WhatsApp group.
- Build an internal `/studio/links` route that is the only way campaign links are ever created. Enforce a closed vocabulary with a Zod enum: `utm_source ∈ {instagram, tiktok, snapchat, youtube, whatsapp, newsletter}`, `utm_medium ∈ {bio, story, reel, post, dm, broadcast, email}`, `utm_campaign` = the package slug, `utm_content` = the post identifier (e.g. `2026-08-22-cappadocia-sunrise`), `utm_id` = a campaign id. Hand-typed UTMs are how attribution rots; a generator with enums is a two-hour build that permanently fixes it.
- Give every video its own shortlink route: `/r/[code]` reads a Supabase `reel_link` row and 302s to the package page with the correct UTMs baked in. This means the destination of a link already published in a bio or a caption can be changed after the fact, each reel gets its own attributable landing, and the redirect is the natural place to record the click server-side before ITP can touch anything.
- Frame-match the hero. The package page's above-the-fold video must be the same clip as the reel that drove the click, at its native 9:16 with the original burned-in captions intact, `muted loop playsinline`, with the poster image set to the exact frame used as the reel's cover. The poster is the LCP element: eagerly loaded, `fetchpriority="high"`, never lazy-loaded. Self-host as MP4 + WebM in Supabase Storage — never Instagram's or TikTok's embed script above the fold.
- Repeat the reel's promise verbatim in the H1. If the reel says 'four nights in Cappadocia for under 3,000 AED', the H1 says that, in those words, with the number visible without scrolling. Hold the whole landing page to 200–750 words at a 5th–7th grade reading level in both English and Arabic — travel pages show one of the lowest tolerances for complex vocabulary in the benchmark data. Route all of it through the `no-ai-voice` skill.
- Design every section as a self-contained screenshot unit. Each major block must survive being cropped to 9:16 or 3:4 and still answer: which trip, what price with currency, what dates, how many nights, and who is selling it. That means the `@sara_dhaouadi_official` handle is repeated inside every card — not once in the footer — and price/date typography is sized to stay legible after a screenshot is re-compressed and re-shared through three WhatsApp forwards.
- Ship a per-package `opengraph-image.tsx` at 1200×630 rendering the package name, price, dates, a still from the reel, and the handle. Keep the whole bundle (JSX + fonts + images) under 500 KB, use flexbox only (no grid), ttf/otf fonts only, and add `Allow: /api/og/*` to robots.txt. Every WhatsApp forward of a package link then renders a branded card instead of a bare URL — the highest-leverage organic-reach mechanic in the stack.
- Add two galleries per package with different jobs: an agency-shot aspiration reel above the fold, and a separate, swipeable 'Shot by travellers on this trip' gallery of real phone photos and clips with first names and handles. Baymard's research says the second one is what is believed. Make traveller images traversable across reviews in a single carousel — 57% of mobile sites fail this.
- Use click-to-load facades for any Instagram or TikTok embed, and only below the fold: render a static poster + play button (~3 KB) and inject the embed script on tap. Never load `embed.js` on page load — YouTube-class embeds block the median site's main thread for over 1.7 seconds. Every embed slot needs a self-hosted fallback image, because Instagram oEmbed silently fails for private, deleted or embeds-disabled accounts.
- Create a `content_permission` table in Supabase before any traveller content ships: creator handle, asset URL, date permission granted, the exact wording of the request and the reply, and a scope flag (embed-only vs self-host vs paid ad use). Embedding is not a licence to self-host. Store the permission evidence, not just a checkbox.
- Mark up each package page as `TouristTrip` with `itinerary` as an ordered ItemList, an `Offer` carrying price and currency, `provider`, `arrivalTime`/`departureTime` and `touristType`, plus `VideoObject` (name, thumbnailUrl, uploadDate, contentUrl) for the self-hosted hero clip. Do NOT add Review/AggregateRating markup for the agency itself — Google forbids self-serving review stars for Organization and LocalBusiness. Route review credibility to Google Business Profile and named off-site sources instead.
- Replace the newsletter modal with a 'Trip Match' three-question inline quiz (who's travelling / when / budget band) that ends by revealing two matched packages and then asks for email or WhatsApp to send the full itinerary PDF. This is the lead magnet: a real, dated, priced itinerary the traveller wants, delivered at the moment of highest intent. No timed overlay, no exit-intent popup, no full-page interstitial — all three are named as problematic by Google's interstitial guidance.
- Design WhatsApp capture around the free 24-hour customer service window, not around a phone-number field. Put deep-linked `wa.me` buttons on every package that pre-fill a message carrying the package name and slug, so the traveller opens the window and the reply is free and human. Keep marketing-template broadcasts rare and reserved for genuine drops, since marketing templates always cost per message and get no volume discount. Store an explicit opt-in record with the exact consent wording and timestamp — WhatsApp requires it and places the burden entirely on the business.
- Build the post-booking artifact as a three-format 'trip pass': a real `.pkpass` (boardingPass style — destination as the primary field, dates secondary, flight/hotel as auxiliary, QR barcode, `relevantDate` set to departure so it surfaces on the lock screen that morning, plus airport `locations`), a Google Wallet JWT link kept under 1,800 characters, and a 1080×1350 PNG share card generated by the same OG pipeline. The lock-screen appearance on departure morning is the screenshot moment; the PNG is what gets posted.
- Put Sarra's actual face and voice on every package page: a short vertical piece-to-camera saying why this specific trip, with her name, her handle, and a link to her Instagram profile. NN/g's credibility research says unknown brands are distrusted without external validation and that off-site validation outweighs on-site testimonials — a real, findable, followed human IS the external validation, and it is the one asset an OTA structurally cannot copy.
- Include Snapchat in the share architecture for the Saudi market — its 72.1% population ad reach there materially exceeds Instagram's 49.3%. That means share targets and artifact crops must cover full-bleed 9:16 as a first-class output, not just the 1.91:1 OG card.
- Set an explicit performance budget for the reels-heavy pages: LCP ≤ 2.5 s at the 75th percentile, one eagerly-loaded poster above the fold, every other video behind an IntersectionObserver with `preload="none"`, and zero third-party scripts before first interaction. Measure it specifically inside the Instagram in-app browser on a mid-range Android, not only on desktop Chrome.
- Never render a payment form, passport number, or ID upload inside a detected in-app browser session. Route those steps to a hosted Stripe page opened via the browser-escape flow, and say so plainly in the UI ('we'll open your browser for secure payment'). In-app browsers inject JavaScript that can subscribe to taps and text selection, and since iOS 14.3 that injection can be made undetectable from the page.

## Anti-patterns to refuse

- The stock-photo hero. A generic agency site opens with a licensed drone shot of a beach and a search widget. It has no scent from any specific video, it is instantly recognisable as bought footage, and it contradicts the one thing a creator brand has — that the person selling the trip actually went. If the first screen is not the same footage the viewer just watched, the click has already been half-wasted.
- 'Continue with Google' as the primary sign-in. Templated stacks put social OAuth first because it looks modern. In the Instagram WebView, where most of this traffic lives, Google explicitly discourages the flow and the user is disconnected from their SSO session. It converts worst exactly where volume is highest — and the failure is invisible in aggregate analytics because it looks like abandonment, not error.
- Magic-link-only authentication. It is the default in every Supabase tutorial, and it is broken for this audience: the email opens in Mail, which opens Safari, which is not the WebView where login started, so the session cookie is in the wrong jar. Supabase's own docs say so. Copying the tutorial ships a login that fails for the majority of arrivals.
- The timed exit-intent newsletter modal. Google's interstitial guidance names full-page overlays as problematic and NN/g lists 'email requests before interaction' among the ten worst popup patterns. It is the default because a plugin ships it, it produces a short-term list-growth number, and it costs trust from an audience that already followed the person and does not need to be ambushed.
- Client-side attribution via a JS cookie or localStorage. Every GTM/analytics quickstart does this. WebKit caps JS-written cookies at 24 hours the moment it sees link decoration — which every UTM-tagged Instagram link is — so the agency ends up with a dashboard full of 'direct' traffic and no idea which reel sold which trip. The failure is silent and looks like a marketing problem rather than an engineering one.
- Dropping Instagram's or TikTok's embed script into the hero to show 'social proof'. It is one copy-paste, it looks like the reel, and it costs hundreds of kilobytes and over a second of blocked main thread. Worse, when the traveller goes private or deletes the post the page develops a hole with no fallback, and Google cannot count the video as page content for VideoObject.
- Testimonial carousels with five gold stars and `Review` schema on the agency's own site. Templated sites ship this by default. Google forbids self-serving review stars for Organization and LocalBusiness so it earns nothing in search, and NN/g's research says users weight off-site reviews more heavily anyway. It consumes prime page real estate to produce a credibility signal the audience discounts.
- A single generic OG image for the whole site. Every WhatsApp forward — the dominant private sharing channel in the Gulf — then renders the same anonymous logo card regardless of which package was shared. This throws away the cheapest organic reach available in the stack, and it is thrown away by omission, which is why almost nobody notices.
- Sixteen-by-nine, muted, caption-stripped 'brand video' on the landing page. The generic move is to re-cut the vertical reel into a horizontal 'hero video' because that is what website templates expect. It breaks frame-match, discards the burned-in captions that carried the meaning without sound, and reads as an ad rather than a continuation.
- Bilingual brochure prose. The default agency voice is ornate, adjective-heavy, and long — 'unforgettable journeys to enchanting destinations'. The benchmark data says travel pages have one of the lowest tolerances for complex vocabulary and that 5th–7th grade copy converts over 2x better. Ornate copy also reads as AI-written or agency-written, which is the precise opposite of the creator-brand advantage.
- A phone-number field labelled 'WhatsApp' with no consent wording and no context. It looks like list-building but produces an asset the business cannot legally or economically use: WhatsApp requires documented opt-in, and business-initiated marketing templates cost money per message with no volume discount. The valuable thing — an open 24-hour window — can only be opened by the customer messaging first.
- Chasing a PWA install prompt as the retention strategy. Chrome gates `beforeinstallprompt` behind interaction plus ~30 seconds of engagement, and the WebView environment most social arrivals land in cannot install at all. Effort spent on install UX for first-touch social traffic is effort not spent on the email/WhatsApp capture that actually works there.

## Differentiation moves

- Ship a real `.pkpass` trip pass. Almost no small agency does this. A boarding-pass-style Wallet pass with the destination as the primary field, `relevantDate` set to departure, and the airport in `locations` surfaces on the traveller's lock screen the morning they fly — carrying Sarra's logo, unprompted, at the single most emotional moment of the purchase. It is a screenshot magnet, it is cheap to generate server-side, and it makes a one-person agency feel more infrastructural than the OTA.
- Make the URL itself part of the content: `/r/[code]` reel-shortlinks that resolve to the exact package the video was about, so a caption can say 'link in bio → tap CAPPADOCIA' and land the viewer on a page whose first frame is the frame they just paused on. The continuity is the differentiator; the routing table is the boring thing that enables it.
- Per-package generated OG cards that look like her Instagram grid. When someone forwards a package link into a family WhatsApp group — how Gulf travel decisions actually get made — the preview should render as a designed card with price, dates, a still from the reel, and the handle, in the same visual language as her feed. Private sharing becomes branded distribution.
- A 'Screenshot this' affordance. Rather than pretending screenshots don't happen, design for them explicitly: a button on each package that renders a 1080×1350 self-contained card (price, dates, inclusions, handle, QR back to the page) and shows it full-bleed for the user to capture. This is the inverse of the industry default, which is to bury price behind a form.
- Reverse the trust hierarchy: put the messy proof above the polish. Lead each package with the traveller-shot phone footage and a strip of real, unretouched Instagram DMs and comments (handles visible, permission recorded), and place the cinematic agency reel below it as the aspiration layer. Baymard's evidence says the amateur images are what get believed; nearly every competitor does the exact opposite.
- Publish the pass/fail. A 'What this trip is NOT' block on every package — no beach, 5am starts, long transfers, not suitable for under-8s — is upfront disclosure, which NN/g names as one of four credibility factors. It is unthinkable for an OTA whose incentive is volume, and it is exactly the kind of thing that gets screenshotted and shared with the caption 'finally someone honest'.
- Design the WhatsApp opening move, not the WhatsApp number. Every package gets a pre-filled `wa.me` deep link that opens the traveller's own compose window with the package already named — so the customer opens the free 24-hour window and gets a human reply from the person in the videos. An OTA answers with a bot inside an app; the differentiator is that the reply comes from the face on the reel, and the pricing model actively rewards that.
- Publish the itinerary as structured `TouristTrip` data with an ordered `itinerary` ItemList — a schema type on only 10K–100K domains — while OTAs flatten packages into generic Product markup. It is a small, unglamorous file that makes the site legible to search and to AI assistants as a *trip*, not a SKU, and it compounds quietly over months.
- A 'behind the reel' layer on each package: the same location shown as the polished 15-second cut and as the raw 90-second unedited walk-through, toggleable. It converts the creator's biggest cost (footage) into a credibility asset, gives repeat visitors a reason to return, and produces the kind of self-contained clip people repost with attribution.

## Open questions

- Hard tooling constraint on this research: the session's WebSearch budget (200 calls) was already exhausted before this task began, and every search-engine proxy I tried (DuckDuckGo HTML and Lite, Mojeek, Bing) returned CAPTCHAs, 403s, or unrelated results. All findings therefore come from ~30 directly-fetched known URLs rather than from discovery search. This biases the corpus toward well-known primary documentation (Google, Apple, Meta, WebKit, NN/g, Baymard, Vercel, Supabase) and away from recent independent case studies, agency post-mortems, and 2026-dated trend reporting. Anything below that I flag as 'no sourced figure found' may well have a source I simply could not reach.
- No sourced figure found for how much better real phone footage converts than polished stock on a travel landing page. Baymard's evidence is perceptual (customer photos are perceived as more trustworthy) and TikTok's guidance is directional ('not overly polished'), but I found no controlled study with a conversion delta. Do not put a percentage on this in the master doc.
- No sourced figure found for screenshot or 'dark social' sharing rates — how often people screenshot a page versus copying the link. The screenshottability recommendations rest on inference from Gulf WhatsApp-forwarding behaviour plus the OG-card evidence, not on measured screenshot data. Worth instrumenting directly (a `visibilitychange`-adjacent heuristic is unreliable; a 'Screenshot this' button gives you a real number instead).
- TikTok's in-app browser user-agent tokens could not be verified against a primary source. detect-inapp ships no TikTok pattern. The commonly used `musical_ly` / `BytedanceWebview` regexes should be validated against real device logs before shipping the detection gate.
- Whether Apple Pay surfaces at all inside Instagram's current iOS WebView is inferred, not verified. Since iOS 16 a host app can opt its WKWebView into Apple Pay; whether Meta and ByteDance do is untested here. Test on a real device before deciding whether an express-checkout button gets rendered under `data-inapp`.
- Instagram's current link surfaces need verification against a Meta primary source. The 'up to five links in bio' figure comes from Later (a vendor blog, updated 2025-02-04), and I could not confirm current rules for links in Reels captions, Story link stickers, or whether any of these still strip the referrer. This matters for whether `/r/[code]` shortlinks are needed in all placements or only some.
- No travel-specific email benchmark found. Mailchimp's public industry table (data last updated December 2023 — flag as stale) shows only five industries and does not include Travel & Transportation. What a travel newsletter should actually contain is therefore, in this research, unsourced opinion rather than evidence; treat the lead-magnet and newsletter recommendations as hypotheses to test.
- Saudi PDPL and UAE PDPL consent requirements for email and WhatsApp marketing were not researched and are not covered by the GDPR-shaped assumptions baked into most Western guidance. This needs its own pass before any capture form ships, and it may constrain the opt-in wording and the record-keeping schema.
- Whether a `.pkpass` file can be delivered reliably to a user who arrived and booked entirely inside an in-app browser is untested. Wallet pass download from a WebView may fail the same way other downloads do; the email-delivered fallback may be the only dependable path.
- Apple's PassKit field limits were verified against archived documentation. Confirm the current Wallet Passes reference before implementing, since the archive predates several Wallet revisions.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### PARTIALLY_TRUE — Android WebView (the technology behind Instagram/Facebook in-app browsers) shares no state with the user's real browser; Chrome Custom Tabs share cookie jar, saved passwords, addresses, permissions, autofill.

The Custom Tabs facts are verbatim correct — the page says WebViews "don't support all features of the web platform, don't share state with the browser and add maintenance overhead" and lists "Shared cookie jar and permissions model", synchronized AutoComplete, and saved passwords/payment methods/addresses as Custom Tabs benefits. Page last updated 2020-02-04. But the parenthetical is wrong: on iOS, Instagram/Facebook in-app browsers are WKWebView (Apple), not Android WebView. The isolation outcome is analogous (WKWebView uses its own WKWebsiteDataStore, not Safari's), but the API, the mitigation, and the escape hatch are all different. https://developer.chrome.com/docs/android/custom-tabs

Corrected: In-app browsers run on two different engines — Android WebView on Android, WKWebView on iOS — and neither shares state with the user's real browser. Chrome for Developers says WebViews "don't share state with the browser"; Custom Tabs by contrast share the cookie jar, permissions model, AutoComplete, saved passwords, payment methods and addresses. On iOS the equivalent shared-state surface is SFSafariViewController, which Meta does not use.

### PARTIALLY_TRUE — Google discourages OAuth sign-in inside WebViews: "Using OAuth for authentication in a WebView can make your app susceptible to security problems and hurt usability by disconnecting the user from single sign-on sessions." Chrome Custom Tabs / SFSafariViewController are the recommended alternative.

Quote verified verbatim on support.google.com/faqs/answer/12284343. But the page recommends only Chrome Custom Tabs — SFSafariViewController is not named there (the page is Android-scoped). The page also frames this as "recommended but not mandatory" with no enforcement date, which is weaker than the claim implies in one direction — and weaker than reality in another: Google separately hard-blocks Google account sign-in from embedded WebViews with a disallowed_useragent error, so this is not merely discouragement.

Corrected: Google's own guidance says "Using OAuth for authentication in a WebView can make your app susceptible to security problems and hurt usability by disconnecting the user from single sign-on sessions," and recommends Chrome Custom Tabs. Separately, Google hard-blocks Google-account sign-in from embedded WebViews (disallowed_useragent), so social sign-in does not merely degrade in an in-app browser — it fails outright.

### FALSE — Supabase's own docs say magic links are "vulnerable if opened in a different browser or email client than where login was initiated" and that OTP "work[s] regardless of which browser or device opens the email"; both rate-limited to one request per 60 seconds, expiring after 1 hour.

Both quotes are fabricated. I fetched https://supabase.com/docs/guides/auth/auth-email-passwordless twice and curl-grepped the source mdx at raw.githubusercontent.com/supabase/supabase/master/apps/docs/content/guides/auth/auth-email-passwordless.mdx — neither string appears anywhere in the file, and the file contains no comparative security discussion of magic links vs OTP at all. The 60-second / 1-hour figures ARE correct (rendered from SharedData template variables). The underlying constraint is real but lives on a different page: https://supabase.com/docs/guides/auth/sessions/pkce-flow says "The code verifier is created and stored locally when the Auth flow is first initiated. That means the code exchange must be initiated on the same browser and device where the flow was started." That is a PKCE-flow property, not a property of magic links generally — the implicit flow and the server-side token_hash flow both survive a browser switch.

Corrected: Supabase magic links break across browsers only under the PKCE flow, because "the code exchange must be initiated on the same browser and device where the flow was started" (Supabase PKCE flow docs). Since an in-app-browser arrival almost guarantees the email is opened elsewhere, use email OTP (six-digit code) or the server-side token_hash flow. Both magic link and OTP are limited to one request per 60 seconds and expire after 1 hour by default.

### PARTIALLY_TRUE — Stripe scopes Apple Pay on the web to Safari; embedded_page Checkout needs Safari 17+; every domain and subdomain including www must be registered. Inference: Instagram's WebView does not present Apple Pay, removing the express-checkout path.

Every quoted fact verified: "on the web in Safari starting with iOS 10 or macOS Sierra"; "Supports only Safari version 17 or later and iOS version 17 or later" for embedded_page; and "`www` is a subdomain (for example, www.stripe.com) that you must also register." But the inference is refuted by Stripe's own docs. The Express Checkout Element page has an explicit "In-app webview support" table: Apple Pay "Supported in iOS webviews, subject to standard Apple Pay eligibility requirements"; Google Pay "Supported when the environment is otherwise eligible... In Android webviews, the host app must also be configured to support the Payment Request API." What actually dies in a webview is Link, PayPal, Klarna and Amazon Pay — all listed "Not supported" because they need a pop-up. https://docs.stripe.com/elements/express-checkout-element.md

Corrected: Apple Pay and Google Pay survive in-app webviews — Stripe's Express Checkout Element docs list Apple Pay as "Supported in iOS webviews" and Google Pay as supported where the environment is otherwise eligible and no pop-up is required. What breaks in a webview is the pop-up-dependent set: Link, PayPal, Klarna and Amazon Pay, all listed "Not supported." Detect what is actually available at runtime with the Element's `availablepaymentmethodschange` event rather than assuming. Separately, embedded_page Checkout requires Safari/iOS 17+, and every domain and subdomain showing an Apple Pay button — `www` included — must be registered as a payment method domain.

### CONFIRMED — WebKit ITP caps JS-created cookies at 24 hours when link decoration is detected; all script-writable storage capped at 7 days without user interaction.

Verbatim on https://webkit.org/tracking-prevention/: "ITP detects such link decoration and caps the expiry of cookies created in JavaScript on the landing webpage to 24 hours." And: "ITP deletes all cookies created in JavaScript and all other script-writeable storage after 7 days of no user interaction with the website" — covering IndexedDB, LocalStorage, Media keys, SessionStorage, and Service Worker registrations and cache. Note the load-bearing qualifier the summary should keep: the 24-hour cap applies to cookies created *in JavaScript*. A server-set HttpOnly Set-Cookie is not subject to it, which is precisely why server-side capture is the fix.

### CONFIRMED — GA4 recognises nine campaign URL parameters, with utm_creative_format and utm_marketing_tactic documented but not reported.

All nine present on https://support.google.com/analytics/answer/10917952. Exact wording is "utm_creative_format isn't currently reported in Google Analytics properties" (and the same for utm_marketing_tactic) — a close paraphrase of the claim, not a misquote.

### PARTIALLY_TRUE — Instagram/Facebook inject pcm.js and subscribe to every tap and text selection; TikTok's injected code "was found to monitor" all keystrokes and taps; companies can now hide injection with WKContentWorld, making it undetectable.

Overstated relative to its own source. Krause's post (2022-08-18) carries repeated disclaimers that it "does not claim that any data logging or transmission is actively occurring" and documents technical capability, not observed exfiltration — so "was found to monitor all keystrokes" is stronger than the source supports (TikTok publicly disputed the keylogger characterisation at the time). On WKContentWorld the post says Meta or TikTok *would only need to* update their runner to hide execution — a hypothetical, not a stated current practice. The structural point survives: independent 2025–26 coverage confirms Meta still injects connect.facebook.net/en_US/pcm.js and that Apple's ATT does not prevent in-app-browser JS injection.

Corrected: Meta still injects connect.facebook.net/en_US/pcm.js into third-party pages loaded in the Instagram and Facebook in-app browsers, and Meta describes this as collecting conversion events for pixels. Felix Krause's 2022 analysis documented that the injected code has the *capability* to observe taps, text selection and form input — he explicitly did not claim exfiltration was occurring — and noted that Apple's WKContentWorld (iOS 14.3+) would let any app move such injection out of the page's inspectable world. Treat the page as an untrusted, observed environment; do not put anything in the DOM you would not want logged.

### PARTIALLY_TRUE — In-app browsers are detectable from short, stable UA regexes (Instagram, FB*, Line, MicroMessenger, MiuiBrowser); on Android, intent:// with S.browser_fallback_url hands the user to Chrome, but Chrome refuses a JS-timer launch without a user gesture.

intent:// syntax, S.browser_fallback_url and the gesture restriction ("A JavaScript timer tried to open an application without a user gesture") all verified on https://developer.chrome.com/docs/android/intents, last updated 2023-12-12. Two problems with "short, stable". First, Android is actively reducing the WebView User-Agent string — the default reduced form is "Mozilla/5.0 (Linux; Android 10; K; wv) ...", becoming the default from Android 17 — so brand-token sniffing is on a shrinking base, and the durable Android signal is the `wv` token, which detect-inapp does not use. Second, the escape hatch is Android-only: there is no iOS equivalent, and the `x-safari-https:` trick is now intercepted and blocked by the Instagram and Facebook apps. Universal Links are the only partially reliable iOS route.

Corrected: In-app browsers are UA-detectable (Instagram `/\bInstagram/i`, Facebook `/\bFB[\w_]+\//`, Line, MicroMessenger, MiuiBrowser), and on Android the `wv` token is the more durable signal as Google reduces WebView UA strings (reduced form default from Android 17). The escape hatch is asymmetric: on Android, `intent://HOST/path#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=<encoded>;end;` works but only from a real user gesture — Chrome refuses launches from a JavaScript timer. On iOS there is no working equivalent; `x-safari-https:` is intercepted by the Meta apps. Design for the site to work fully inside the webview rather than relying on an exit.

### CONFIRMED — PWA installability requires manifest, HTTPS, 192px and 512px icons, valid display mode, and in Chrome at least one interaction plus ~30 seconds of engagement before beforeinstallprompt fires.

https://web.dev/articles/install-criteria (last updated 2024-09-19) states "must include a 192px and a 512px icon" and both heuristics: "The user needs to have clicked or tapped on the page at least once, at any time, even during a previous page load" and "The user needs to have spent at least 30 seconds viewing the page, at any time." The researcher's own flag is right that the page says nothing about WebViews; the inference is sound (Android WebView does not fire beforeinstallprompt, and iOS Add to Home Screen lives in the Safari share sheet, unreachable from an in-app browser).

### CONFIRMED — Baymard: customer-submitted photos perceived as "more objective, reliable, and trustworthy"; 57% of mobile sites fail to let users navigate reviewer images.

Quote verified on https://baymard.com/blog/current-state-ecommerce-product-page-ux ("more objective, reliable, and trustworthy"), updated 2026-03-18, 30,000+ ratings across 155+ sites. The 57% is verified on https://baymard.com/blog/mobile-ux-ecommerce (Mobile UX Trends 2026, updated 2026-07-14, 71,000+ reviewed UX elements across 150+ mobile sites) and does refer to mobile sites that don't allow navigation across reviews via reviewer-submitted images. Worth noting the product-page article gives 63% for the same failure across all sites — the researcher picked the correct mobile figure.

### CONFIRMED — TikTok advertiser guidance: DIY/not overly polished, 9:16, use sound, proposition in first 3 seconds, hook in first 6, 5–10 words per second of on-screen text.

All five verified verbatim on https://ads.tiktok.com/help/article/creative-best-practices, last updated June 2025: "go for a DIY or not overly polished style so that it fits in with the user-generated content on TikTok", "orienting vertically at 9:16", "using sound/ music", "Introduce your content proposition in the first 3 seconds", "Prioritize your hook in the first 6 seconds", "displaying 5-10 words per second when using text". The researcher's own caveat that TikTok publishes no DIY-vs-polished conversion delta is correct and should stay.

### CONFIRMED — YouTube facade ~3 KB vs ~540 KB player; YouTube embeds block the main thread >1.7s on the median site; lazy-loading an above-the-fold LCP image worsens LCP 13–15%.

"The facade weighs 3 KB and the player weighing 540 KB is loaded on interaction" verified on the Lighthouse third-party-facades page — but that page was last updated 2020-12-01, a staleness flag the researcher did not raise (they only flagged the 2022 lazy-loading post). "YouTube embeds block the main thread for more than 1.7 seconds for the median website" verified on https://web.dev/learn/performance/video-performance.

### CONFIRMED — Instagram oEmbed capped at 1,000 requests/hour, no Stories, no private/inactive/age-restricted/embeds-disabled accounts; Meta Platform Terms restrict Platform Data processing and require deletion.

"You can make up to 1,000 requests every hour" and "Stories are not supported" verified on https://developers.facebook.com/docs/instagram-platform/oembed, along with the private/inactive/age-restricted/embeds-disabled exclusions. No deprecation notice found for 2025–26. The researcher correctly labels the "embedding is not a licence to self-host" conclusion as their own reading rather than a quote.

### CONFIRMED — Google's review-snippet policy prohibits star ratings for LocalBusiness/Organization where the entity controls reviews about itself, including embedded third-party widgets.

Verbatim on https://developers.google.com/search/docs/appearance/structured-data/review-snippet, last updated 2026-07-24: "If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature", with the explicit widget example "either directly in their structured data or through an embedded third-party widget (for example, Google Business reviews or Facebook reviews widget)." Date matches the researcher's citation exactly.

### CONFIRMED — Unbounce: travel & hospitality median landing page CVR 4.8% vs 6.6% all-industry; 5th–7th grade reading level converts "over 2x better than all other difficulty levels" at 12.8% median CVR; 200–750 word sweet spot.

All four figures verified on https://unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/ — 4.8% travel median, 6.6% all-industry, "5th to 7th grade copy converts over 2x better than all other difficulty levels" at 12.8% median, and "the sweet spot we found is between 200-750 words" (~400 target), from 57M+ conversions. The researcher's caveats hold: no travel-specific sample size and no publication year is stated on the page, so the 4.8% is indicative rather than dated evidence.

### PARTIALLY_TRUE — Apple Wallet pass field limits and image sizes as listed; Google Wallet passes delivered as signed JWT at pay.google.com/gp/v/save/<jwt> with a sub-1,800-character URL limit.

Google Wallet half fully verified on https://developers.google.com/wallet/generic/web (last updated 2026-08-11): "The Add to Google Wallet link has the following format: https://pay.google.com/gp/v/save/<signed_jwt>" and "The safe length of an encoded JWT is 1800 characters... If the length is over 1800 characters, the save may not work due to truncation by web browsers." The Apple half rests entirely on developer.apple.com/library/archive, which Apple has retired — the researcher flagged this themselves. Field-count and image-dimension specifics must be re-checked against the current Wallet Passes documentation before anyone builds to them; treat the Apple numbers as unverified.

### CONFIRMED — Meta OG image specs; Next.js opengraph-image.tsx with ImageResponse, statically optimised and cached; @vercel/og flexbox-only, ttf/otf/woff, 500 KB bundle; allow OG routes in robots.txt.

Next.js docs (lastUpdated 2026-07-09) confirm the 8 MB OG / 5 MB Twitter limits and "If the image file size exceeds these limits, the build will fail", plus "generated images are statically optimized (generated at build time and cached)." Vercel docs (last_updated 2026-06-16) confirm "Only ttf, otf, and woff font formats are supported", "Only flexbox (display: flex)... Advanced layouts (display: grid) will not work", "Maximum bundle size of 500KB. The bundle size includes your JSX, CSS, fonts, images", and the robots.txt Allow recommendation. One drift: on Vercel, OG generation now runs on the Node.js runtime, and App Router projects import from `next/og` rather than installing @vercel/og.

### CONFIRMED — VideoObject requires name/thumbnailUrl/uploadDate, recommends contentUrl, must be on a watchable page, key moments need ≥30s; TouristTrip carries itinerary/times/offers/provider/tripOrigin/subTrip/partOfTrip/touristType and is used on 10K–100K domains.

Google Search Central video page (last updated 2026-02-13) confirms the three required properties, "This is the most effective way for Google to fetch your video content files" for contentUrl, "VideoObject structured data must be added to a page where users can watch the video", and "The total video duration must be a minimum of 30 seconds" for key moments. schema.org/TouristTrip confirms parent Trip, all listed properties, and "10K - 100K Domains Based on monthly aggregations from Google's web index" (July 2026).

### CONFIRMED — Google page-experience guidance asks whether pages avoid intrusive interstitials; the interstitial doc names full-page overlays and redirects-to-a-separate-page as problematic and endorses small banners and browser-native prompts.

https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials (last updated 2025-12-10) states "Don't obscure the entire page with interstitials", "Don't redirect the user to a separate page for their consent or input", and "Instead of full page interstitials, use banners that take up only a small fraction of the screen", naming Smart App Banners for Safari and the in-app install experience for Chrome. The researcher's flag that NN/g publishes no quantified dismissal rate is honest and should be retained.

### CONFIRMED — WhatsApp opt-in mandatory; per-delivered-template pricing since 2025-07-01; marketing templates always cost and get no volume discounts; 24-hour free service window; 72-hour Click-to-WhatsApp free window; service conversations free since 2024-11-01.

All six verified on the Meta pricing docs: "You are only charged when a template message is delivered" from 2025-07-01; "FEP windows remain open for 72 hours. While open, you can send any type of message to the user at no charge"; "Service conversations are now free for all businesses" from 2024-11-01; and volume discounts scoped to "utility and authentication template messages", excluding marketing. Incomplete as of 2026-08-22 though: the same page now documents India billing localization (2026-01-01), Brazil billing localization (2026-07-01), AI Provider pricing effective 2026-02-16, and a Marketing Messages API max-price feature launching in 2026 — none of which appear in the claim.

### CONFIRMED — Gulf saturation figures — UAE 11.1M internet users (99.0%), Instagram 7.60M (67.8%), YouTube 8.25M (73.6%), TikTok 11.3M adults; Saudi 33.9M (99.0%), Instagram 49.3%, Snapchat 72.1%, YouTube 79.4%.

Every figure matches DataReportal Digital 2025: UAE (published 2025-02-25) and Saudi Arabia (published 2025-03-03), verbatim. One thing the researcher's caveat understates: the UAE TikTok figure of 11.3M users aged 18+ exceeds the country's entire internet-user base of 11.1M and its whole population, so that specific number is not merely imprecise, it is internally impossible as a reach metric. Also, these are Jan-2025 snapshots — 19 months stale as of 2026-08-22, with no Digital 2026 figures substituted.

### CONFIRMED — Autoplay with sound blocked without prior interaction; muted autoplay always allowed; cross-origin iframes need allow="autoplay"; first painted video frame is an LCP candidate; preload="none" prevents download; ~20% of web videos carry autoplay.

https://web.dev/learn/performance/video-performance confirms "20% of videos across the web include the autoplay attribute", that "the first frame of a video file—once painted—will be considered as an LCP candidate", and that preload="none" "informs the browser that none of the video's contents should preloaded." The Chrome autoplay policy (Chrome 66, April 2018; Web Audio from Chrome 71) and the muted-autoplay and iframe-delegation rules are long-standing and unchanged.

### Corrections applied

- In-app browsers run on two different engines — Android WebView on Android, WKWebView on iOS — and neither shares state with the user's real browser. Chrome for Developers says WebViews "don't share state with the browser"; Custom Tabs by contrast share the cookie jar, permissions model, AutoComplete, saved passwords, payment methods and addresses. On iOS the shared-state equivalent is SFSafariViewController, which Meta does not use.
- Google's guidance says "Using OAuth for authentication in a WebView can make your app susceptible to security problems and hurt usability by disconnecting the user from single sign-on sessions," and recommends Chrome Custom Tabs (not SFSafariViewController — that page is Android-scoped). Separately, Google hard-blocks Google-account sign-in from embedded WebViews with a disallowed_useragent error, so social sign-in does not degrade in an in-app browser, it fails.
- Supabase magic links break across browsers only under the PKCE flow, because "the code exchange must be initiated on the same browser and device where the flow was started" (Supabase PKCE flow docs — NOT the passwordless-email page, which contains no such statement). Use email OTP or the server-side token_hash flow. Both magic link and OTP are limited to one request per 60 seconds and expire after 1 hour by default.
- Apple Pay and Google Pay survive in-app webviews. Stripe's Express Checkout Element docs carry an explicit in-app-webview support table: Apple Pay is "Supported in iOS webviews, subject to standard Apple Pay eligibility requirements" and Google Pay is supported where the environment is otherwise eligible and no pop-up is needed (Android webviews additionally require the host app to support the Payment Request API). What actually breaks in a webview is the pop-up-dependent set — Link, PayPal, Klarna and Amazon Pay, all listed "Not supported." Detect availability at runtime with the Element's `availablepaymentmethodschange` event instead of assuming.
- The ITP 24-hour cap applies specifically to cookies created in JavaScript on a link-decorated landing page. Server-set HttpOnly cookies are not subject to it. That is the mechanism, not an incidental detail — it is why moving attribution capture to the first server request actually fixes the problem rather than merely delaying it.
- Meta still injects connect.facebook.net/en_US/pcm.js into third-party pages in its in-app browsers. Krause's 2022 analysis documented that the injected code has the capability to observe taps, text selection and form input — he explicitly disclaimed any finding that logging or transmission was occurring, and TikTok disputed the keylogger characterisation. WKContentWorld (iOS 14.3+) is described in that post as something an app *could* use to hide injection, not something confirmed in use.
- In-app browser UA detection is not stable ground. Android is reducing the WebView User-Agent string to "Mozilla/5.0 (Linux; Android 10; K; wv) ...", the default from Android 17, so the durable Android signal is the `wv` token rather than a brand string. The escape hatch is Android-only: `intent://...#Intent;...S.browser_fallback_url=<encoded>;end;` works, but only from a genuine user gesture — Chrome refuses a JavaScript-timer launch. On iOS there is no working equivalent; `x-safari-https:` is now intercepted by the Instagram and Facebook apps. Build the site to work fully inside the webview; treat any exit as a bonus.
- WhatsApp pricing as of 2026-08-22 also includes India billing localization (2026-01-01), Brazil billing localization (2026-07-01), AI Provider pricing effective 2026-02-16, and a Marketing Messages API max-price control launching in 2026 — all relevant to a Gulf-facing travel business and all absent from the original claim.
- The DataReportal Gulf figures are Jan-2025 advertising-reach snapshots, 19 months old as of 2026-08-22. The UAE TikTok figure (11.3M adults) exceeds the country's total internet users (11.1M) and its whole population, so it is not merely imprecise — it cannot be literally true as a reach metric. Use it for direction only, never in a deck.
- The Apple Wallet pass field limits and image dimensions cited come from developer.apple.com/library/archive, which Apple has retired. Only the Google Wallet half is verified against live documentation (signed JWT at https://pay.google.com/gp/v/save/<jwt>, safe length 1,800 characters, updated 2026-08-11). Re-check every Apple number against the current Wallet Passes docs before building.

### Flagged as not covered

- The iOS/Android asymmetry in escape hatches. The intent:// handoff is Android-only and requires a real user gesture; on iOS there is no equivalent, and x-safari-https: is now intercepted by the Instagram and Facebook apps. This means the dimension's implicit 'detect and redirect out' mitigation only works for roughly half the traffic, and the design must actually be complete inside the webview.
- Android WebView User-Agent reduction. The default reduced string is 'Mozilla/5.0 (Linux; Android 10; K; wv) ...', becoming default from Android 17. Brand-token regexes are on a shrinking base and the `wv` token is the durable Android signal — detect-inapp does not use it. Any detection strategy built on the listed regexes needs a `wv` fallback and a graceful default.
- Stripe's own in-app webview support matrix — the single most decision-relevant page for this dimension and it was never fetched. It refutes the express-checkout conclusion and supplies the correct runtime detection API (`availablepaymentmethodschange`).
- Arabic and RTL. Sarra's audience is Gulf-facing and she works in Arabic, yet nothing in this dimension covers RTL layout, Arabic typography, or the specific and well-known problem that Satori (behind @vercel/og and next/og) needs correctly shaped Arabic fonts subset into a 500 KB budget — Arabic OG images are the most likely thing in this plan to silently render as broken boxes.
- Consent and data-protection law for the actual audience: Saudi PDPL and UAE PDPL, plus GDPR for European travellers. A dimension that recommends server-side first-request capture of utm parameters and IP-derived data needs a legal basis and a consent surface, and it names neither.
- WhatsApp's 2026 pricing changes — India billing localization (2026-01-01), Brazil (2026-07-01), AI Provider pricing (2026-02-16), Marketing Messages API max-price — all present on the cited page and all missed.
- Staleness of the DataReportal base. Jan-2025 figures used to describe a 2026 market, with a UAE TikTok number that exceeds the country's population. No Digital 2026 report was sought.
- Server-side attribution mechanics beyond 'capture server-side'. No mention of the GA4 Measurement Protocol, first-party server-set attribution cookies, a click-ID-to-session-ID mapping, or how to reconcile a webview session with a later conversion in the real browser — which is the actual hard problem the ITP finding creates.
- Instagram's own link surfaces. Nothing on link-in-bio constraints, Story link stickers, or how Instagram rewrites and appends parameters to outbound URLs — which determines whether the utm scheme survives the trip at all.
- In-app WebView engine lag and INP. Embedded WebViews often run behind the user's installed Chrome or Safari version, so feature detection matters more than usual, and interaction latency (INP) inside a webview is not addressed anywhere despite the dimension being built on video-heavy pages.
- The staleness of two cited sources went unflagged: the Custom Tabs overview is from 2020-02-04 and the Lighthouse third-party-facades page from 2020-12-01. The researcher flagged the 2022 lazy-loading post but not these.

## Sources

- [Overview of Android Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs) · Chrome for Developers · 2020-02-04 (last updated)  
  WebView shares no state with the browser — no cookie jar, saved passwords, payment methods, addresses, autofill or permissions; Custom Tabs share all of these.
- [Modernizing OAuth interactions in native apps](https://support.google.com/faqs/answer/12284343) · Google Support · fetched 2026-08-22  
  Google discourages OAuth in WebViews for security and usability; recommends Chrome Custom Tabs.
- [Passwordless email logins (magic links and email OTP)](https://supabase.com/docs/guides/auth/auth-email-passwordless) · Supabase · fetched 2026-08-22  
  Magic links fail across browsers; email OTP is recommended for cross-device flows; 60-second request rate limit and 1-hour expiry.
- [Tracking Prevention in WebKit](https://webkit.org/tracking-prevention/) · WebKit (Apple) · fetched 2026-08-22  
  Link decoration triggers a 24-hour cap on JS-created cookies; 7-day cap on all script-writable storage; full third-party cookie blocking.
- [Collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952) · Google Analytics Help · fetched 2026-08-22  
  The complete list of nine UTM parameters GA4 recognises and their definitions.
- [Announcing InAppBrowser.com](https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser) · Felix Krause · 2022-08-18  
  Instagram/Facebook inject pcm.js and TikTok injects keystroke-monitoring code into third-party pages in their in-app browsers; WKContentWorld can hide injection. FLAG: pre-2023, potentially stale on specifics.
- [Android Intents with Chrome](https://developer.chrome.com/docs/android/intents) · Chrome for Developers · fetched 2026-08-22  
  intent:// syntax, S.browser_fallback_url, and the rule that a JavaScript timer without a user gesture cannot launch an external app.
- [detect-inapp source (inapp.js)](https://github.com/f2etw/detect-inapp) · f2etw (open source) · fetched 2026-08-22  
  Exact user-agent regexes for Instagram, Facebook, Messenger, Line, WeChat and MIUI in-app browsers.
- [Apple Pay (Web)](https://docs.stripe.com/apple-pay) · Stripe · fetched 2026-08-22  
  Apple Pay on the web is Safari-scoped (iOS 10+/macOS Sierra); embedded_page Checkout needs Safari 17+; all domains and subdomains including www must be registered as payment method domains.
- [The Current State of Product Page UX](https://baymard.com/blog/current-state-ecommerce-product-page-ux) · Baymard Institute · 2026-03-18 (updated; orig. 2023-10-24)  
  62% of mobile sites have mediocre-or-worse product page UX; customer-submitted photos are perceived as more objective, reliable and trustworthy than official product images; 30,000+ rated scores across 155+ sites.
- [Mobile UX Trends 2026: 10 Best Practices](https://baymard.com/blog/mobile-ux-ecommerce) · Baymard Institute · 2026-07-14 (updated; orig. 2024-05-23)  
  75% of mobile ecommerce sites rated mediocre; 57% do not let users navigate reviewer-submitted images across reviews; 71,000+ reviewed UX elements across 150+ sites.
- [Information Scent: How Users Decide Where to Go Next](https://www.nngroup.com/articles/information-scent/) · Nielsen Norman Group · 2020-02-02  
  Link labels are the most critical component of scent; misleading titles erode trust and depress future clicks.
- [A Link Is a Promise](https://www.nngroup.com/articles/link-promise/) · Nielsen Norman Group · 2014-12-14  
  Destination pages must confirm the link's promise without scrolling; broken promises chip away at credibility. FLAG: pre-2023 — timeless principle, not a trend.
- [Trustworthiness in Web Design: 4 Credibility Factors](https://www.nngroup.com/articles/trustworthy-design/) · Nielsen Norman Group · 2016-05-08  
  Unknown brands are distrusted without external validation; off-site reviews and testimonials outweigh company-hosted ones; upfront disclosure of pricing builds trust. FLAG: pre-2023.
- [Popups: 10 Problematic Trends and Alternatives](https://www.nngroup.com/articles/popups/) · Nielsen Norman Group · 2019-06-30  
  Email requests before interaction and consecutive popups drive abandonment; recommends non-modal bottom/side overlays and contextually timed asks. FLAG: pre-2023; no quantified dismissal rate given.
- [Avoid intrusive interstitials and dialogs](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) · Google Search Central · 2025-12-10 (last updated)  
  Full-page overlays and redirect-to-consent-page patterns are problematic; small banners and browser-native prompts are the endorsed alternative.
- [Review snippet (Review, AggregateRating) structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · Google Search Central · 2026-07-24 (last updated)  
  Self-serving reviews are not eligible for star rich results on LocalBusiness and Organization, including reviews shown via embedded third-party widgets.
- [Video (VideoObject, Clip, BroadcastEvent) structured data](https://developers.google.com/search/docs/appearance/structured-data/video) · Google Search Central · 2026-02-13 (last updated)  
  Required and recommended VideoObject properties; the video must be watchable on the marked-up page; key moments require ≥30 seconds.
- [TouristTrip](https://schema.org/TouristTrip) · Schema.org · fetched 2026-08-22  
  TouristTrip/Trip properties (itinerary, offers, provider, arrivalTime, departureTime, tripOrigin, touristType) and its low adoption (10K–100K domains).
- [Lazy load third-party resources with facades](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades/) · Chrome for Developers / Lighthouse · fetched 2026-08-22  
  A YouTube facade weighs ~3 KB vs ~540 KB for the real player; the facade interaction pattern (load → hover preconnect → click replace).
- [Video performance (Learn Performance)](https://web.dev/learn/performance/video-performance) · web.dev / Chrome team · fetched 2026-08-22  
  YouTube embeds block the main thread for over 1.7 s on median sites; the first painted video frame is an LCP candidate; preload values; ~20% of web videos use autoplay.
- [The performance effects of too much lazy loading](https://web.dev/articles/lcp-lazy-loading) · web.dev / Chrome team · 2022-03-31  
  Lazy-loading above-the-fold images worsens LCP by 13–15% on archive pages (median 3,768 ms vs 3,495 ms). FLAG: 2022, single-theme WordPress methodology — direction sound, magnitude indicative.
- [Autoplay policy in Chrome](https://developer.chrome.com/blog/autoplay) · Chrome for Developers · policy since Chrome 66 (April 2018); fetched 2026-08-22  
  Muted autoplay always allowed; sound requires prior interaction or MEI; cross-origin iframes need allow="autoplay".
- [opengraph-image and twitter-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) · Next.js (Vercel) · 2026-07-09 (lastUpdated)  
  Per-route dynamic OG image generation via ImageResponse; 1200×630 convention; 8 MB OG / 5 MB Twitter hard limits; static optimisation and caching behaviour.
- [Open Graph (OG) Image Generation](https://vercel.com/docs/og-image-generation) · Vercel · 2026-06-16 (last_updated)  
  @vercel/og limits — 500 KB bundle including fonts and images, flexbox only (no grid), ttf/otf/woff only; recommendation to Allow OG routes in robots.txt.
- [Sharing Best Practices — Images](https://developers.facebook.com/docs/sharing/webmasters/images) · Meta for Developers · fetched 2026-08-22  
  OG image specs: ≥1200×630, minimum 200×200, target 1.91:1 aspect ratio, 8 MB file size cap.
- [Instagram oEmbed](https://developers.facebook.com/docs/instagram-platform/oembed) · Meta for Developers · fetched 2026-08-22  
  1,000 requests/hour rate limit; Stories unsupported; private, inactive, age-restricted and embeds-disabled accounts unsupported; metadata may only be used to render the embed.
- [Embed Videos (oEmbed)](https://developers.tiktok.com/doc/embed-videos/) · TikTok for Developers · fetched 2026-08-22  
  TikTok oEmbed endpoint and the embed.js script required to render an embedded TikTok video.
- [Creative best practices](https://ads.tiktok.com/help/article/creative-best-practices) · TikTok Ads Help Center · June 2025 (last updated)  
  DIY / not-overly-polished style guidance, 9:16 vertical, sound as a requirement, hook in first 6 seconds, proposition in first 3, 5–10 words per second of on-screen text.
- [WhatsApp Business Platform Pricing](https://developers.facebook.com/docs/whatsapp/pricing) · Meta for Developers · per-message model effective 2025-07-01; service conversations free since 2024-11-01  
  Message categories and which require templates; the free 24-hour customer service window; the 72-hour Click-to-WhatsApp free entry point window; marketing templates always charged with no volume discount.
- [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/) · WhatsApp / Meta · fetched 2026-08-22  
  Mandatory opt-in before contacting a customer; business bears sole responsibility for the opt-in method; recommendation of category-specific and call-specific opt-ins.
- [Add to Google Wallet on the web (generic passes)](https://developers.google.com/wallet/generic/web) · Google Wallet · fetched 2026-08-22  
  Signed-JWT save link format (pay.google.com/gp/v/save/<jwt>), issuer account and pass class/object prerequisites, and the 1,800-character URL limit.
- [PassKit Programming Guide — Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html) · Apple · archived documentation, fetched 2026-08-22  
  Five pass styles; header/primary/secondary/auxiliary field limits; image dimensions (logo 160×50, strip 375×98, icon 29×29); barcode formats; relevantDate and up to 10 locations for lock-screen relevance. FLAG: archived — verify against current Wallet Passes reference.
- [Travel and hospitality landing page conversion rates](https://unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/) · Unbounce · year not stated on page; 57M+ conversions analysed across industries  
  Travel & hospitality median CVR 4.8% vs 6.6% all-industry median; 5th–7th grade copy converts over 2x better (12.8% median); 200–750 word sweet spot; travel has one of the lowest tolerances for complex vocabulary. FLAG: vendor benchmark, travel-specific sample size undisclosed.
- [Digital 2025: Saudi Arabia](https://datareportal.com/reports/digital-2025-saudi-arabia) · DataReportal (Kepios / We Are Social / Meltwater) · 2025-03-03  
  33.9M internet users (99.0%); Instagram ad reach 49.3% of population; Snapchat 72.1%; YouTube 79.4%. Ad-reach figures, not MAU.
- [Digital 2025: United Arab Emirates](https://datareportal.com/reports/digital-2025-united-arab-emirates) · DataReportal (Kepios / We Are Social / Meltwater) · 2025-02-25  
  11.1M internet users (99.0%); Instagram ad reach 7.60M (67.8% of population); YouTube 8.25M (73.6%); TikTok 11.3M adults. Ad-reach figures, not MAU.
- [What does it take to be installable?](https://web.dev/articles/install-criteria) · web.dev / Chrome team · 2024-09-19 (last updated)  
  Chrome PWA install criteria: HTTPS, manifest with 192px/512px icons, valid display mode, one interaction plus ~30 seconds of engagement.
- [Understanding page experience in Google Search results](https://developers.google.com/search/docs/appearance/page-experience) · Google Search Central · 2025-12-10 (last updated)  
  Self-assessment questions on avoiding intrusive interstitials and excessive ads that interfere with main content.
- [Meta Platform Terms](https://developers.facebook.com/terms/) · Meta · fetched 2026-08-22  
  Restrictions on processing Platform Data, prohibition on selling/licensing it, and deletion obligations — the basis for treating embeds as a display licence only, not a right to self-host.
- [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) · web.dev / Chrome team · fetched 2026-08-22  
  LCP target of ≤2.5 s for at least 75% of page visits; >4.0 s is poor; the TTFB / load delay / load duration / render delay subpart breakdown.
