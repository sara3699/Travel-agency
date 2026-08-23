# How websites actually spread

Dimension `virality-mechanics` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Organic reach is three loops, and a generic travel site ships none of them.

Loop one, the ARTIFACT: the site must emit a portable object that carries meaning after it leaves the page. Wordle is the canonical case and it survives scrutiny — 90 daily players on 1 Nov 2021, over 300,000 by 2 Jan 2022, acquired by the NYT on 31 Jan 2022 for an undisclosed low-seven-figure sum (the often-quoted 2 million is weekly, not daily). The mechanic is the point: spoiler-free coloured emoji squares as plain text. Spotify Wrapped 2025 confirms the shape — 3.4m mentions in week one, but the real finding is longevity: a 14% day-two drop versus 60% in 2024. The format is now commoditised (Amazon's "2025 Delivered", Apple Replay, YouTube recap): "shifting from a Spotify differentiator to a baseline expectation."

Loop two, the PREVIEW. WhatsApp's own docs are strict and verified: og:title/description/url in <head> within the first 300KB, og:image absolute, under 600KB, 300px+ wide, aspect ratio 4:1 or less, ~10s to render. Previews are cached for days to weeks and there is no purge — WhatsApp ships no cache-clearing tool, and Facebook's Sharing Debugger does not help. The card is effectively write-once per URL. And satori — behind @vercel/og and next/og — states plainly that "Full Unicode bidirectional layout is not yet supported"; issue #74 is open, backlogged, with no plan. Arabic glyphs join (HarfBuzz) but mixed Arabic/Latin ordering breaks. The binding constraint nobody has priced: Vercel's 500KB bundle ceiling includes fonts, and Arabic webfaces are large.

Loop three, REPUTATION. Awwwards scores Usability at 30% against Design 40%, so hostile experiments lose. Original data assets earn links and LLM citations — though AI referral is still only 0.32% of traffic (SE Ranking, 101,574 sites).

Arousal, not valence, is the lever: awe, anger and anxiety spread; sadness does not (Berger & Milkman). Design the object the visitor forwards to five people in a group chat — in their language, at their screen size, under 600KB.

## Summary as first written, before verification

Organic reach for a website is not one mechanic, it is three separate loops, and a generic travel site ships none of them. Loop one is the ARTIFACT: the site must emit a portable object — an image, a plain-text grid, a number — that carries meaning after it leaves the page. Wordle's emoji grid and Spotify Wrapped's card are the canonical cases; both are brag-safe, spoiler-free, and identity-scoring. Loop two is the PREVIEW: in the Gulf a link is pasted into a WhatsApp group long before it is posted anywhere public, so the unfurled card IS the landing page for most first impressions. WhatsApp's own documented rules are strict and unforgiving (required tags inside the first 300KB of HTML, image under 600KB, min 300px wide, no cache purge), and Vercel's satori — the tool the stack will reach for — explicitly does not do full Unicode bidi, which quietly breaks mixed Arabic/Latin cards. Loop three is REPUTATION: one memorable, technically clean interaction earns gallery listings (Awwwards scores usability at 30%, so hostile experiments lose) and one recurring original-data asset earns press links and LLM citations for years. The research is consistent that valence is not the lever — physiological arousal is; awe, anger and anxiety spread, sadness does not. The strategic conclusion for a Middle East package site: stop optimising the page for the visitor and start optimising the OBJECT the visitor forwards to five people in a group chat, in the recipient's language, at the recipient's screen size, in under 600KB.

## Findings

### Sharing is driven by physiological AROUSAL, not by whether content is positive or negative. High-arousal emotions (awe, anger, anxiety) increase virality; low-arousal deactivating emotions (sadness) decrease it. These effects hold controlling for surprise, interest, and practical utility.

Confidence: reported · type: principle

Why it matters here: A travel package site defaults to 'pleasant' — soft beaches, calm gradients, gentle copy. Pleasant is low-arousal and is the single most predictable reason a beautiful travel site never gets shared. The design brief should target AWE (scale, vertigo, the unbelievable-but-true price, the 'wait, that's included?' moment) as a deliberate emotional register, not generic aspiration.

Evidence: Jonah Berger & Katherine Milkman, 'What Makes Online Content Viral', Journal of Marketing Research, 2012. Abstract: virality is 'partially driven by physiological arousal'; content evoking high-arousal positive (awe) or negative (anger, anxiety) emotions is more viral, low-arousal (sadness) less so. https://journals.sagepub.com/doi/10.1509/jmr.10.0353

Source: https://journals.sagepub.com/doi/10.1509/jmr.10.0353

### Berger's STEPPS framework identifies six drivers of contagion: Social Currency, Triggers, Emotion, Public, Practical Value, Stories. Social currency = 'the better something makes us look, the more likely we are to share'; Triggers = 'top of mind, tip of tongue'; Practical Value = 'news you can use'.

Confidence: reported · type: principle

Why it matters here: Gives a checklist the master doc can hold every feature against. For this site: Social Currency = the shared card must make the SHARER look like a smart traveller, not make the agency look good. Triggers = Ramadan, Eid, school holidays, Umrah season are recurring environmental cues that should have permanent, linkable pages so the site is what people reach for when the cue fires. Public = the artifact must be visible in a feed, not private in an account dashboard.

Evidence: Knowledge@Wharton, 'Contagious: Jonah Berger on Why Things Catch On' (Wharton, 2013 PDF: https://wbl.wharton.upenn.edu/wp-content/uploads/2014/09/Contagious-Why-Things-Catch-On.pdf) and CKGSB Knowledge interview. FLAG: source material dates to 2013 — pre-2023 and therefore potentially stale as commentary, though the framework itself is a timeless principle rather than a trend.

Source: https://wbl.wharton.upenn.edu/wp-content/uploads/2014/09/Contagious-Why-Things-Catch-On.pdf

### Wordle's growth came from the SHARE ARTIFACT, not the game. The share button copied a spoiler-free emoji grid (green/yellow/grey squares) to the clipboard — plain text, no image, no link, no spoiler payload. Daily players went from 90 on 1 Nov 2021 to 300,000 by 2 Jan 2022 to 2 million by 9 Jan 2022; the share feature was added in late Nov 2021. NYT acquired it 31 Jan 2022 for a low seven-figure sum.

Confidence: reported · type: pattern

Why it matters here: The decisive design lesson: the artifact was PLAIN TEXT, so it survived every channel — Twitter, WhatsApp, Slack, SMS, iMessage — with zero rendering risk, zero image-size limit, zero cache problem. A Middle East travel site should ship a text/emoji artifact alongside any image artifact, because WhatsApp group chats strip and mangle far more than they preserve, and a pasteable line of emoji has no 600KB limit and no cache.

Evidence: Puzzle Cottage, 'The History of Wordle — Josh Wardle, the NYT Acquisition, the Phenomenon' https://puzzlecottage.com/wordle-history ; CBS News on NYT acquisition https://www.cbsnews.com/newyork/news/wordle-sold-to-new-york-times/ . FLAG: events are 2021–2022, pre-2023, so treat the dates as history and the mechanic as a timeless principle.

Source: https://puzzlecottage.com/wordle-history

### Spotify Wrapped 2025 generated 3.4 million media and social mentions in the week after its 3 Dec 2025 launch (vs 3.46m in 2024), but the notable measured shift was CONVERSATION LONGEVITY: the day-two mention drop was only 14% in 2025 versus 60% in 2024. The single new feature, 'Listening Age', was ~3% of overall Wrapped conversation but generated 5% of engagement actions — disproportionate engagement per mention. 81% of posts from users with an 'older' Listening Age were positive.

Confidence: verified · type: data

Why it matters here: This is the most precise available evidence that ONE debatable, identity-scoring, slightly self-mocking metric outperforms an entire recap. For a travel site, the equivalent is not 'your 2026 in travel' — it is one contestable number people will argue about in the group chat ('Your travel age is 47', 'You are a 3.2-star traveller', 'You have seen 0.8% of the Gulf'). Design one number, not twelve slides.

Evidence: Meltwater, 'How Spotify Wrapped 2025 Went Viral: Listening Age Insights and Global Trends', published 12 Dec 2025. https://www.meltwater.com/en/blog/spotify-wrapped-listening-age-analysis

Source: https://www.meltwater.com/en/blog/spotify-wrapped-listening-age-analysis

### The 'Wrapped' / year-in-review format has been commoditised. Amazon Music ('2025 Delivered'), YouTube's recap, and Apple Music Replay all now ship the same format; industry analysis describes it as shifting 'from a Spotify differentiator to a baseline expectation'.

Confidence: reported · type: trend

Why it matters here: Directly on the operator's stated failure mode. Building a 'Your Travel Year Wrapped' in 2026 is the definition of the generic template. The transferable asset from Wrapped is the MECHANIC (personal data → identity claim → public card), not the FORMAT (annual, multi-slide, gradient, December). Apply the mechanic at a moment nobody owns — e.g. at the point of booking, or per-trip on return — not in December.

Evidence: eMarketer, 'Spotify Wrapped faces copycat pressure from Amazon, Apple, and YouTube'. https://www.emarketer.com/content/spotify-wrapped-faces-copycat-pressure-amazon-apple-youtube

Source: https://www.emarketer.com/content/spotify-wrapped-faces-copycat-pressure-amazon-apple-youtube

### WhatsApp's own developer documentation states hard link-preview requirements: og:title, og:description and og:url are mandatory and must sit in <head> within the FIRST 300KB of HTML; og:image must be an absolute URL, under 600KB, at least 300 pixels wide, with an aspect ratio of 4:1 or less. WhatsApp crawls with a User-Agent of the form 'WhatsApp/2.x.x.x [A|I|N]' and sends an Accept-Language header set to the RECIPIENT'S language preference. Previews should render within ~10 seconds in the composer.

Confidence: verified · type: constraint

Why it matters here: Two things almost nobody exploits. (1) The 300KB head budget is a real CI check — a Next.js page with heavy inline JSON-LD or an early RSC payload can push meta tags past it and silently kill previews in the region's dominant channel. (2) The Accept-Language header means the site can serve an ARABIC og:title, og:description and og:image to an Arabic-preferring recipient and an English one to an English recipient — from the same shared URL. That is a genuinely differentiated, verified, almost-unused lever for a Middle East travel site.

Evidence: Meta for Developers, 'Link Previews' (WhatsApp business messaging documentation). https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/ — fetched and read in full.

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/

### WhatsApp caches link previews with no official refresh mechanism. Cache duration is reported as days to weeks; the practical workarounds are appending a query parameter (?v=2) to change the URL identity, or running the URL through Facebook's Sharing Debugger and re-scraping. Reported minimum for a preview to render at all is 100×100px; 1200×630 is the recommended size for the large preview; supported formats JPG/JPEG/PNG/WebP — GIF and SVG are not supported.

Confidence: reported · type: constraint

Why it matters here: Consequence for architecture: the OG card for a package must be CORRECT ON FIRST SHARE. If a package price changes and the card is regenerated, WhatsApp will keep serving the stale card for days. The build must therefore version the shareable URL (content-hash query param) whenever the card content materially changes — a decision that has to be in the URL/routing design from day one, not retrofitted.

Evidence: OGrilla, 'WhatsApp Link Preview Requirements 2026: Complete Technical Guide' (updated January 2026) https://www.ogrilla.com/blog/whatsapp-link-preview-guide ; corroborated by LinkPeek https://www.getlinkpeek.com/blog/whatsapp-link-preview-not-working . Secondary sources — Meta's own docs do not document caching.

Source: https://www.ogrilla.com/blog/whatsapp-link-preview-guide

### The Open Graph protocol spec defines structured sub-properties for images — og:image:url, og:image:secure_url, og:image:type, og:image:width, og:image:height, og:image:alt — and supports multiple og:image tags where 'the first tag (from top to bottom) is given preference during conflicts'. It also defines og:locale (format language_TERRITORY, default en_US) and og:locale:alternate as an array.

Confidence: verified · type: constraint

Why it matters here: og:locale / og:locale:alternate is the declarative half of the bilingual preview strategy (the Accept-Language header is the dynamic half). And the 'first tag wins' rule is the reason the site must emit exactly ONE og:image per route: a stray default og:image in the root layout will beat the per-package card and every shared package link will unfurl with the same generic image — precisely the sameness failure the operator wants to avoid.

Evidence: The Open Graph protocol, ogp.me — fetched and read. https://ogp.me/

Source: https://ogp.me/

### Vercel's satori — the engine behind @vercel/og and next/og ImageResponse — does NOT support full Unicode bidirectional layout. The README states: 'Full Unicode bidirectional layout is not yet supported, so mixed LTR and RTL text may not follow browser ordering.' A GitHub issue (vercel/satori #74, 'RTL languages') tracks this and there is no stated plan. Satori does use HarfBuzz for glyph shaping, so Arabic letters JOIN correctly — the failure is in ordering, not shaping.

Confidence: verified · type: constraint

Why it matters here: This is the single highest-risk technical finding for this specific project. An Arabic travel card is inherently mixed-direction: Arabic destination text plus Latin/Arabic-numeral prices, dates, night counts ('4N/5D'), airport codes (DXB, JED), and the Latin Instagram handle. Generated dynamically through ImageResponse, those runs can render in the wrong order — producing a garbled card that gets shared into thousands of WhatsApp groups with no way to recall it. Mitigation must be designed in, not discovered at launch.

Evidence: vercel/satori README (fetched) https://github.com/vercel/satori ; issue #74 https://github.com/vercel/satori/issues/74

Source: https://github.com/vercel/satori

### @vercel/og constraints (Vercel docs, last updated 2026-06-16): recommended OG size 1200x630; only flexbox and a CSS subset are supported — display:grid does NOT work; only ttf/otf/woff fonts (woff2 unsupported), ttf/otf preferred for parse speed; maximum bundle size 500KB INCLUDING JSX, CSS, fonts, images and all assets. Satori additionally does not support calc(), z-index, 3D transforms, <style> tags, or external <link>/<script>. Vercel also recommends adding the OG route to Allow in robots.txt so social crawlers can fetch it.

Confidence: verified · type: constraint

Why it matters here: A premium Arabic display font subset plus a background photo will blow the 500KB bundle. The card design must be built to this budget from the first sketch: system-loadable subset font, flat/gradient background composed in CSS rather than a bitmap, at most one raster image fetched at runtime. Designing the card in Figma first and porting it later is how teams discover on deploy day that the card cannot be built.

Evidence: Vercel Docs, 'Open Graph (OG) Image Generation', last_updated 2026-06-16 — fetched in full. https://vercel.com/docs/og-image-generation ; satori README for the unsupported-CSS list https://github.com/vercel/satori

Source: https://vercel.com/docs/og-image-generation

### Next.js (docs v16.3.2, updated 2026-07-09) provides opengraph-image / twitter-image file conventions per route segment. Code-generated variants receive the route's dynamic params, support generateImageMetadata for multiple images per route, and export alt / size / contentType which Next auto-emits as og:image:alt, og:image:width, og:image:height, og:image:type. Generated images are STATICALLY OPTIMIZED (built once and cached) unless the route uses request-time APIs or uncached data. Hard limits: twitter-image must not exceed 5MB and opengraph-image must not exceed 8MB or THE BUILD FAILS.

Confidence: verified · type: constraint

Why it matters here: Gives the exact architecture for per-package cards: app/packages/[slug]/opengraph-image.tsx, params-driven, statically generated at build so there is no cold-start latency when WhatsApp's 10-second preview window is ticking. Critically, the default static caching means a price change will NOT regenerate the card unless the route opts into request-time data — which must be a conscious decision recorded in the project memory, because it interacts directly with WhatsApp's un-purgeable cache.

Evidence: Next.js docs, 'opengraph-image and twitter-image', version 16.3.2, lastUpdated 2026-07-09 — fetched in full. https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

### The Web Share API (navigator.share) can share FILES, not just links: navigator.canShare({files}) gates support, allowed image types include .png, .jpg, .webp, .avif, .gif, .svg. It requires a secure context (HTTPS) and transient user activation (a real user gesture), and throws AbortError when the user cancels or no share targets exist. MDN classifies it as 'Limited availability — not Baseline'; iOS Safari and Chrome Android support it, desktop support is patchy.

Confidence: verified · type: constraint

Why it matters here: This is the mechanism that turns a generated 1080x1920 PNG into a one-tap 'send to my WhatsApp group / post to my Story' action on the exact devices the Gulf audience uses. It removes the download-then-find-in-gallery-then-upload friction that kills nearly every share. Because it is not Baseline, the master doc must specify a three-tier fallback chain rather than a single share button.

Evidence: MDN Web Docs, 'Navigator: share() method' — fetched in full. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share ; W3C Web Share spec https://w3c.github.io/web-share/

Source: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share

### WhatsApp's own click-to-chat scheme (wa.me) accepts a URL-encoded pre-filled message: https://wa.me/?text=<encoded text> opens WhatsApp with the message ready and lets the sender pick any contact or group; https://wa.me/<international number, no +, no leading zero> targets a specific number. The recipient/sender can edit the text before sending.

Confidence: reported · type: pattern

Why it matters here: This is the universal fallback when navigator.canShare({files}) returns false, and it is also the direct channel into the region's dominant messaging app. It is also the plain-text artifact delivery vehicle: a pre-composed, emoji-structured trip summary can be dropped into a group chat with one tap and zero image-rendering risk.

Evidence: Documented across implementation guides citing WhatsApp's official click-to-chat documentation, e.g. https://u2l.ai/blog/whatsapp-click-to-chat-link (2026) and https://qualimero.com/en/blog/whatsapp-link . FLAG: I could not fetch faq.whatsapp.com directly in this session, so this is reported rather than verified against the primary page.

Source: https://u2l.ai/blog/whatsapp-click-to-chat-link

### Instagram Story canvas is 1080x1920 (9:16) with UI-safe margins commonly specified as 250px top and 340px bottom, leaving a safe payload block of roughly 1080x1330 centred vertically. Reels reserve more bottom space (~410px) for the CTA bar, caption and audio attribution. Portrait feed posts are 1080x1350 (4:5).

Confidence: reported · type: constraint

Why it matters here: Determines the geometry of the shareable artifact and, critically, WHERE the sara_dhaouadi_official handle goes. Placed at the true bottom edge, the standing branding requirement is covered by Instagram's own UI in every Story repost — the branding disappears exactly when it is doing its job. The handle must sit inside the safe block, not at the canvas edge.

Evidence: Multiple 2026 spec guides converge on these numbers, e.g. https://socialsizes.io/instagram-stories-size/ , https://campaignswift.com/blog/instagram-safe-zone-sizes , https://admakeai.com/blog/instagram-story-dimensions-2026 . FLAG: these are third-party spec aggregators; Meta does not publish a single authoritative safe-zone document, so treat the exact pixel values as reported and verify against a live device before locking the template.

Source: https://socialsizes.io/instagram-stories-size/

### A peer-reviewed experiment (Journal of Computer-Mediated Communication, published 24 January 2025, n=302 US adults aged 18-30, 2x2x2 between-subjects design) found screenshotting is normatively entrenched among young adults: 'normative perceptions were predictive of both screenshot collection and sharing'. The two dominant motivations are MEMORY/BOOKMARKING ('people collect screenshots when they just want to remember something') and SOCIAL SUPPORT ('youth commonly send screenshots of messages to their friends when they need advice'). Obscuring content on screenshot attempt significantly reduced capture; accountability notifications alone were ineffective.

Confidence: verified · type: data

Why it matters here: This is the closest thing to primary evidence for WHY people screenshot a web page, and both motivations map exactly onto travel: you screenshot a package to remember it, and you screenshot it to ask your friends/spouse/family whether to book. The design consequence is precise — the screenshot must be SELF-SUFFICIENT. Everything the recipient needs to make the decision (destination, nights, what is included, total price, per-person price, dates, who to contact) must be visible in a single mobile viewport without scrolling, because that viewport IS the shared artifact whether the site designs for it or not.

Evidence: 'Understanding screenshot collection and sharing on messaging platforms: a privacy perspective', Journal of Computer-Mediated Communication, vol 30 issue 1, published 24 Jan 2025 — fetched and read. https://academic.oup.com/jcmc/article/30/1/zmae023/7978203

Source: https://academic.oup.com/jcmc/article/30/1/zmae023/7978203

### Awwwards' published evaluation system weights Design 40%, Usability 30%, Creativity 20%, Content 10%. Each submission goes to a minimum of 18 jury members; the 3 scores furthest from the average are automatically discarded; voting runs 5 days; a score of 6.5+ earns an Honorable Mention; a Site of the Day that also scores above 7 with the developer jury earns the Developer Award; a site has 3 months from approval to win SOTD. Land-book, a curated gallery, states it reviews for 'current design trends, design aesthetics, website usability and accessibility, as well as content', with review taking days to a month and not every submission accepted.

Confidence: verified · type: constraint

Why it matters here: Kills the most common misreading of 'make it unique'. USABILITY IS 30% AND ACCESSIBILITY IS AN EXPLICIT LAND-BOOK CRITERION — an experimental, scroll-jacked, keyboard-hostile travel site loses nearly a third of the available points and gets rejected from curated galleries. The path to a listing is one exceptional, performant, accessible signature interaction inside an otherwise ruthlessly usable booking flow, not an art project.

Evidence: Awwwards, 'Evaluation System' — fetched in full. https://www.awwwards.com/about-evaluation/ ; Land-book submission guidelines criteria via https://land-book.com/submission-guidelines (direct fetch returned 403; criteria taken from search-result summary — reported, not verified).

Source: https://www.awwwards.com/about-evaluation/

### AI search is a high-quality but still low-volume referral channel. A study of 101,574 websites across 250 countries using aggregated Google Analytics data over Jan 2025 - Apr 2026 found AI referral traffic at 0.02% of total traffic in 2024, 0.24% in 2025 and 0.32% in 2026 (a 16x increase from 2024). Platform split in 2026: ChatGPT 74.78%, Gemini 11.56% (+231% YoY), Perplexity 7.23% (slight decline), Copilot 3.51%, Claude 2.62% (+320% YoY). AI-referred visitors spent 67.7% more time on site than organic search visitors (9m19s vs 5m33s).

Confidence: verified · type: data

Why it matters here: Calibrates expectations honestly. 'Get cited by ChatGPT' should NOT be the growth strategy in 2026 — it is under one third of one percent of traffic. But the engagement quality is real, and the content type that earns citations (original, structured, verifiable data) is the same content type that earns editorial links and screenshots. One asset serves all three. Build the data asset; do not build an AI-visibility programme.

Evidence: SE Ranking, 'Analysis of Top AI Search Engines', published 18 June 2026; 101,574 websites, 250 countries, 16-month window — fetched in full. https://seranking.com/blog/ai-traffic-research-study/

Source: https://seranking.com/blog/ai-traffic-research-study/

### Saudi Arabia's digital baseline (DataReportal Digital 2026, published 8 Nov 2025 using Oct 2025 data): 34.4m internet users (99.0% penetration), 38.6m social media identities (111% of the 34.7m population), 48.7m mobile connections (140%). Platform reach: TikTok 38.6m (18+), YouTube 27.5m, Snapchat 25.3m, Instagram 18.2m, Facebook 17.7m, X 15.0m, LinkedIn 12.0m. Median mobile download speed 194.49 Mbps. DataReportal publishes NO WhatsApp reach figure (Meta does not release WhatsApp ad-reach data).

Confidence: verified · type: data

Why it matters here: Three build consequences. (1) Snapchat at 25.3m outranks Instagram at 18.2m in Saudi — a share artifact designed only for Instagram misses the larger Saudi surface; the 9:16 card must be Snapchat-compatible too. (2) 194 Mbps median mobile means the performance excuse for a plain site is weak in-market — but the diaspora and lower-bandwidth MENA markets still need the site to work at 3G. (3) The widely repeated 'WhatsApp is dominant in the Gulf' claim has no ad-reach data behind it; it is supported by messaging-app surveys, not by DataReportal. Treat it as a strong working assumption, not a verified number.

Evidence: DataReportal, 'Digital 2026: Saudi Arabia', published 8 Nov 2025 — fetched in full. https://datareportal.com/reports/digital-2026-saudi-arabia

Source: https://datareportal.com/reports/digital-2026-saudi-arabia

### GCC creator/social context: the GCC influencer marketing market was $315.5m in 2025, projected to $771.6m by 2032 (13.9% CAGR). UAE TikTok penetration is reported at 135% of the adult population and Saudi at 154%. Snapchat reaches 90% of Saudis aged 13-34. UAE social media users number 9.83m (115% penetration). The claim that 'Arabic-first content generates 35-50% higher engagement rates in GCC markets compared to translated English' is attributed to Boomerang.ae.

Confidence: reported · type: data

Why it matters here: Arabic-first is not a localisation task appended at the end — it is the engagement multiplier. Combined with the WhatsApp Accept-Language finding and the satori bidi limitation, this defines the hardest and most defensible technical problem on the project: a genuinely Arabic-native shareable artifact pipeline. Competitors ship English cards with an Arabic toggle; almost nobody ships an Arabic-composed OG card that renders correctly.

Evidence: Kolsquare, 'Influencer Marketing in the Middle East: 2026 Guide' — fetched in full. https://www.kolsquare.com/en/blog/influencer-marketing-in-the-middle-east-in-2026-high-stakes-high-spend-and-the-arabic-first-imperative . FLAG: the 35-50% Arabic uplift figure is second-hand (Kolsquare citing Boomerang.ae) and I could not reach the underlying methodology — treat as directional, not as a number to quote publicly.

Source: https://www.kolsquare.com/en/blog/influencer-marketing-in-the-middle-east-in-2026-high-stakes-high-spend-and-the-arabic-first-imperative

### The formats that reliably earn editorial links and repeat citation are original data studies, interactive tools/calculators (which publishers embed), and recurring annual index/ranking reports that publications cite year after year. Practitioner guidance for 2026 also recommends a minimum of ~500 respondents for survey-based studies to hold up to scrutiny.

Confidence: reported · type: pattern

Why it matters here: Points at the one asset that compounds: a recurring, honest, public price/market index for Gulf travel packages that journalists and bloggers can cite and embed. It is also the exact content shape that AI search engines cite. However, the frequently repeated 'journalists are 3.2x more likely to cover stories featuring original data' has no traceable primary study behind it in any source I could reach — NO SOURCED FIGURE FOUND for that multiplier; do not put it in the master doc as a number.

Evidence: Digital Applied, 'Link Building 2026: Digital PR & Outreach Guide' https://www.digitalapplied.com/blog/link-building-2026-digital-pr-outreach-guide ; Blue Tree Digital, 'Digital PR Link Building' https://bluetree.digital/digital-pr-link-building/ . Both are agency/practitioner sources, not primary research.

Source: https://www.digitalapplied.com/blog/link-building-2026-digital-pr-outreach-guide

### Most sharing is invisible to analytics ('dark social') — links passed through WhatsApp, Telegram, private DMs and copy-paste carry no referrer, and screenshots carry no trace at all. The widely quoted '80%+ of global sharing happens in private' figure traces back to a RadiumOne study that is now roughly a decade old.

Confidence: inferred · type: constraint

Why it matters here: Two directives. (1) Measurement: if the site does not mint a distinguishable URL per share action, the entire virality programme will be unmeasurable and will get killed by a reasonable person looking at a referrer report showing 'direct'. (2) Honesty: the 80% number should be used as a directional argument, never quoted as current data. FLAG: the underlying study predates 2023 and should be treated as stale.

Evidence: Secondary aggregation of the RadiumOne finding at https://intentamplify.com/blog/dark-social/ and https://releasd.com/blog/dark-social-pr/ . I could not locate a current (2024-2026) primary measurement of dark-social share — NO CURRENT SOURCED FIGURE FOUND.

Source: https://intentamplify.com/blog/dark-social/

### Referral-loop arithmetic: viral coefficient K = (average invites sent per user) x (invite conversion rate). K > 1 is self-sustaining exponential growth; practitioner guidance for 2026 puts a realistic target at K = 0.3-0.6 and describes 0.5-1.0 as strong. Two-sided rewards (both referrer and referred get something) are reported to outperform one-sided programmes, and Dropbox's canonical case worked because the reward — storage — WAS the product.

Confidence: reported · type: pattern

Why it matters here: Sets an honest ceiling. A travel package site will not reach K > 1; referrals amplify other channels rather than replace them. The Dropbox lesson transfers precisely: the referral reward should be denominated in the product (trip credit, a free transfer, a room upgrade, an extra night) rather than cash, because a product-denominated reward doubles as a reason to come back. FLAG: the specific uplift percentages circulating for two-sided vs one-sided rewards vary by source and have no primary study behind them — NO RELIABLE SOURCED FIGURE FOUND for the exact uplift.

Evidence: GrowSurf viral coefficient glossary https://growsurf.com/glossary/viral-coefficient/ ; LaunchList 2026 K-factor guide https://getlaunchlist.com/blog/viral-coefficient-k-factor-guide ; First Round Review K-factor glossary https://review.firstround.com/glossary/k-factor-virality/ . All practitioner sources.

Source: https://getlaunchlist.com/blog/viral-coefficient-k-factor-guide

### neal.fun — a portfolio of single-purpose interactive web toys (Spend Bill Gates' Money, The Deep Sea, The Password Game) — is estimated at roughly 9.5m visits per month, with no signups, no onboarding, no tutorials, and one idea per URL. Commentary consistently attributes the spread to the low barrier to entry: the thing does its whole job in the first five seconds.

Confidence: reported · type: pattern

Why it matters here: The template for the 'one weird thing'. It is not a feature bolted onto a homepage — it is its own URL doing exactly one thing that can be understood from a screenshot. For a travel package site, the parallel is a standalone interactive that is genuinely useful and genuinely one-idea (e.g. 'how far can you actually go for 2,000 SAR', rendered as a live expanding radius) rather than a clever hover state on the hero. FLAG: the traffic figures come from third-party estimators (Similarweb, Semrush, hypestat) which are approximations, not measured analytics.

Evidence: Similarweb https://www.similarweb.com/website/neal.fun/ and Semrush overview (Feb 2026) https://www.semrush.com/website/neal.fun/overview/ for traffic estimates; commentary at https://webiano.digital/neal-fun-is-the-web-that-still-rewards-curiosity/ and https://www.futureparty.com/p/neal-agarwal-internet-archive .

Source: https://www.similarweb.com/website/neal.fun/

### X/Twitter card specification for summary_large_image: recommended 1200x628 (1.91:1), with 2:1 (e.g. 1200x600) also cited as the official ratio; minimum 300x157, maximum 4096x4096; file size under 5MB; formats JPG, PNG, WEBP, GIF. Next.js independently enforces the 5MB twitter-image ceiling at build time, citing developer.x.com.

Confidence: reported · type: constraint

Why it matters here: 1200x630 satisfies OG, WhatsApp and X simultaneously, so ONE landscape card can serve all link-preview surfaces — which matters because the 500KB satori bundle budget makes maintaining multiple card templates expensive. FLAG: developer.x.com returned HTTP 402 and could not be fetched directly in this session, so the exact ratio (1.91:1 vs 2:1) is reported from aggregators and Next.js's citation, not verified against X's own page. Verify before locking the template.

Evidence: Next.js docs cite the 5MB limit to developer.x.com https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image (verified); dimensions from aggregators e.g. https://opengraphplus.com/consumers/twitter/images and https://moda.app/resources/sizes/twitter-card .

Source: https://opengraphplus.com/consumers/twitter/images

## Design implications

- THREE-CROP ARTIFACT ENGINE, ONE SOURCE OF TRUTH. Build a single card composition that renders at three sizes from the same data: 1200x630 (link preview: OG + WhatsApp + X), 1080x1920 (Instagram/Snapchat Story), 1080x1350 (4:5 feed). On the 9:16 crop, ALL payload must sit inside the centred 1080x1330 safe block; on the 4:5 crop the whole canvas is usable. Route: app/packages/[slug]/opengraph-image.tsx for the landscape (statically generated), plus a /api/card/[slug]?format=story|feed endpoint for the vertical crops.
- ARABIC BIDI IS A BLOCKING TECHNICAL DECISION, NOT A POLISH TASK. satori does not do full Unicode bidi, so never let a mixed Arabic+Latin string reach ImageResponse as one text node. Enforce the rule: every card is composed of atomic flex children, each containing a SINGLE-DIRECTION run (Arabic run, or Latin/numeral run), with ordering handled by flex-direction: row-reverse on the RTL parent rather than by the text engine. Add a visual regression test that renders the five worst-case Arabic cards (price + nights + IATA code + handle) on every PR. If this proves unworkable, the fallback is a headless-Chromium render step (which does have full bidi) writing PNGs to Supabase Storage at publish time, with the OG route simply serving the stored PNG.
- BUDGET THE CARD IN BYTES BEFORE DESIGNING IT. Hard ceilings: 500KB total @vercel/og bundle (JSX + CSS + fonts + images), and under 600KB output for WhatsApp to render it at all. Practically: one subset Arabic display font in .ttf or .otf (never .woff2 — unsupported), background built from CSS gradients not a photo, at most one runtime-fetched raster. Add a CI check that fails the build if any generated OG image exceeds 500KB or any font file exceeds 150KB.
- CI-GUARD THE 300KB HEAD BUDGET. WhatsApp only reads meta tags inside the first 300KB of HTML. Add a build-time assertion that og:title, og:description, og:url and og:image all appear within the first 300KB of the rendered document for every route — heavy inline JSON-LD or an early RSC payload can silently push them past it and kill previews in the region's main sharing channel.
- EXACTLY ONE og:image PER ROUTE. The OG spec gives preference to the first og:image tag top-to-bottom. Do not set a default og:image in the root layout. Every package, destination and article route must own its card, or every shared link unfurls identically — the literal 'same UI everyone has' failure, expressed in the preview.
- LOCALISED PREVIEWS OFF THE Accept-Language HEADER. WhatsApp's crawler sends the recipient's language preference. Serve Arabic og:title / og:description and an Arabic-composed og:image when Accept-Language starts with 'ar', English otherwise, from the same canonical URL. Declare og:locale and og:locale:alternate to match. This is verified, buildable, and almost nobody does it.
- CONTENT-HASH THE SHAREABLE URL. WhatsApp caches previews for days-to-weeks with no purge. When a package's price, dates or inclusions change materially, the canonical share URL must change (append a short content hash, e.g. /packages/maldives-5n?c=a3f9). Decide and document the exact rule for what constitutes a material change; put it in .memory/projects/ with the date.
- THREE-TIER SHARE CHAIN, NOT A SHARE BUTTON. Tier 1: navigator.canShare({files}) true → navigator.share the generated PNG File directly into the OS sheet (WhatsApp, Instagram, Snapchat) — requires HTTPS and a real user gesture, and must handle AbortError silently. Tier 2: no file support → wa.me/?text= with the URL-encoded plain-text summary. Tier 3: always available → copy-to-clipboard of a plain-text/emoji trip line that needs no rendering at all. Never ship a row of Facebook/Twitter/Pinterest icons.
- SHIP A TEXT ARTIFACT ALONGSIDE THE IMAGE ARTIFACT. Wordle's grid was plain text and that is why it survived every channel. Design a copy-pasteable trip line — structured, emoji-delimited, price-visible, under 200 characters — that a user can drop into a family WhatsApp group. It has no size limit, no cache, no bidi risk, and works where images are stripped.
- DESIGN THE MOBILE VIEWPORT AS A SCREENSHOT. Peer-reviewed evidence says people screenshot to remember and to ask friends for advice. Therefore the package page must have one viewport-height band that is decision-complete: destination, nights, dates, total price AND per-person price, the 3-4 inclusions that actually decide it, and the handle — all visible without scrolling on a 390x844 screen. Treat that band as a designed artifact with its own review, because it is the artifact whether or not it is designed.
- HANDLE PLACEMENT INSIDE THE SAFE ZONE. sara_dhaouadi_official goes inside the 1080x1330 Story-safe block, not at the canvas edge — bottom-left of the safe block, not bottom-left of the canvas. At the true bottom edge it is covered by Instagram's own UI on every repost, which is exactly when the branding is supposed to work.
- LEGIBILITY AT THUMBNAIL, NOT AT DESKTOP. The card is first seen at roughly 100-160px wide in a WhatsApp chat list or IG grid. Rule for the master doc: one hero element (the price, or the one contestable number) must be readable when the card is scaled to 15% — in practice a cap-height of at least 10% of card height, high contrast, no thin weights, no text over photographic detail. Review every card at 15% scale before it ships. (Inferred rule, no sourced threshold exists — mark it as a house standard, not a cited finding.)
- ONE SIGNATURE INTERACTION, BUILT TO GALLERY STANDARDS. Awwwards weights usability at 30% and Land-book lists accessibility explicitly. The memorable thing must ship with a prefers-reduced-motion path, full keyboard operability, and no scroll-jacking — otherwise it forfeits a third of the score and gets rejected by curated galleries. Give it its own URL so it can be submitted, screenshotted and linked independently of the booking funnel.
- BUILD ONE RECURRING DATA ASSET AND MAKE IT EMBEDDABLE. A monthly Gulf package price index (per corridor: Riyadh-Tbilisi, Jeddah-Baku, Dubai-Bosnia, Kuwait-Georgia...) published as a public page WITH an iframe embed snippet carrying an attribution link. Original data plus an embeddable tool are the two formats that earn editorial links and AI citations. Calibrate expectations: AI referrals are ~0.32% of traffic in 2026 — this is a link-and-authority play, not a traffic play.
- INSTRUMENT DARK SOCIAL FROM DAY ONE. Every share action mints a short URL carrying a channel token and a share-session id, resolved server-side in Supabase. Without this the entire virality programme reports as 'direct' and cannot be defended. Log share-intent (button pressed) separately from share-completed, since navigator.share cannot confirm delivery.
- REFERRALS DENOMINATED IN THE PRODUCT, TWO-SIDED, TARGET K = 0.3-0.6. Reward both sides with trip credit / a free airport transfer / an extra night — never cash — so the reward is also a reason to return. Do not promise or plan for K > 1; referrals amplify, they do not replace acquisition.

## Anti-patterns to refuse

- THE SHARE-BUTTON ROW. A horizontal strip of Facebook / X / Pinterest / LinkedIn icons under the package. It is the universal signal of a templated site, it ignores that the region's sharing happens in WhatsApp and screenshots, and it produces almost no shares. The real mechanic is a generated artifact plus the OS share sheet.
- ONE GLOBAL og:image. A single brand card set in the root layout so every shared link — every package, every destination, every article — unfurls identically. Because the OG spec gives preference to the first og:image, this also silently overrides any per-route card you later add. This is the sameness failure rendered directly into the sharing channel.
- BUILDING 'YOUR TRAVEL YEAR, WRAPPED'. Amazon, YouTube and Apple have all cloned the Wrapped format; it is now a baseline expectation, not a differentiator. Copying the format in 2026 signals derivative thinking. Take the mechanic (personal data becomes an identity claim becomes a public card) and apply it at a moment nobody owns.
- AUTO-TRANSLATED ARABIC. Running English marketing copy through translation and calling the site bilingual. Arabic-first content is reported to materially outperform translated English in GCC markets, and a translated card additionally maximises the mixed-direction text that satori cannot order correctly. Arabic must be written natively and composed natively, or the card is worse than no card.
- AN ART-PROJECT HOMEPAGE. Scroll-jacking, a 12-second intro animation, a WebGL globe that blocks first paint, cursor hijacking. Awwwards scores usability at 30% and Land-book screens for accessibility, so this loses on the very listings it is chasing — and it loses the booking too. Uniqueness must live in one bounded, accessible, separately-URL'd interaction, not in the path to purchase.
- PHOTO-HEAVY OG CARDS. A full-bleed destination photograph inside the card blows the 500KB @vercel/og bundle and pushes the PNG past WhatsApp's 600KB ceiling, at which point WhatsApp shows no image at all — the worst possible outcome, indistinguishable from having no OG tags. Compose in CSS; use photography sparingly and compressed.
- GATING THE ARTIFACT BEHIND SIGNUP. Requiring an account before the user can see or share their result. The artifact's entire job is to leave the site and reach people who have never heard of it; a signup wall converts a growth loop into a lead form and kills the loop.
- 'SHARE TO UNLOCK' AND SHARE-NAG MODALS. Interstitials that beg for a share, countdown-timer share prompts, or discount-for-a-post mechanics. They read as desperate, they are widely distrusted in the region's group-chat culture, and Wordle's evidence is the opposite — it never asked, and the share format simply made sharing socially safe.
- STOCK-PHOTO EMOTIONAL REGISTER. Sunsets, infinity pools, a woman in a hat facing away from the camera, 'Discover Your Dream Escape'. This is pleasant, and pleasant is low-arousal — the emotional register the research says does NOT spread. Every competitor already occupies it, which is precisely why it is safe and precisely why it is invisible.
- A DEFAULT-CACHED CARD WITH A LIVE PRICE. Next.js statically optimises generated OG images and WhatsApp caches previews with no purge. Shipping a card that prints a price without a versioning strategy means stale prices circulating in group chats for weeks with no recall mechanism — a commercial and trust problem, not just a technical one.
- QUOTING THE UNSOURCED NUMBERS. The '84% of sharing is dark social' figure traces to a pre-2016 study; the 'journalists are 3.2x more likely to cover original data' multiplier has no traceable primary source; the '35-50% Arabic engagement uplift' is second-hand. Do not put any of them in public-facing copy or in the master doc as fact.
- CHASING GALLERY LISTINGS AS THE STRATEGY. Awwwards gives a site 3 months from approval to win SOTD and Land-book rejects most submissions. Listings are a byproduct of one exceptional, accessible interaction — treating them as the goal produces a portfolio piece that does not sell travel packages.

## Differentiation moves

- THE TRIP RECEIPT. Render every package as an itemised thermal-till receipt — monospaced, perforated edge, line items for flights, each night, transfers, visa, insurance, then a SUBTOTAL and a PER PERSON line, with a barcode that is actually the package URL. It is instantly screenshot-legible, it is honest in a category built on opaque bundling, it is unmistakably not a template, and it degrades perfectly to plain text for WhatsApp. Nobody in travel does receipts; every OTA does gradient cards.
- PER-RECIPIENT BILINGUAL PREVIEWS. Serve an Arabic-composed OG card to recipients whose WhatsApp sends Accept-Language: ar and an English one to everyone else, from one shared link. Verified against Meta's own crawler documentation, buildable in a Next.js route handler, and effectively unused in the category — the same forwarded message renders natively for the Egyptian cousin and the British colleague in the same group.
- THE TRIP GRID. A Wordle-style plain-text strip encoding the shape of the trip in emoji — flight, nights by hotel tier, the one landmark, flight — that copy-pastes into any chat with no image, no size limit and no cache. Spoiler-free about the price if you want the recipient to click, or price-forward if you want the argument to start immediately. Two variants, A/B tested.
- SPLIT-THE-TRIP CARDS. Gulf travel is overwhelmingly group and family travel. Generate a per-traveller card ('your share: 2,400 SAR') that each person in the group can post or forward, turning one booking into four artifacts with four different audiences. The card that circulates is the one the sharer is IN, not the one the agency made.
- THE GULF PACKAGE PRICE INDEX. A public, monthly, honest index of what a 5-night package to each major corridor actually costs, published as a permanent URL with an embeddable widget and an attribution link. It is the linkable asset, the LLM-citation surface, the press hook and the recurring reason for travel media to come back — and publishing real prices in a category built on hiding them is itself the differentiator.
- THE TRIGGER CALENDAR. A permanent, beautiful, genuinely useful page mapping Ramadan, Eid al-Fitr, Eid al-Adha, Hajj and Umrah windows, and GCC school holidays against price and crowd curves. Berger's Triggers principle made literal: when the cue fires — and it fires on a fixed schedule for tens of millions of people — this is the page that is already bookmarked and already forwarded.
- THE PRACTICAL LAYER NOBODY SHIPS. Prayer times and qibla for the hotel, verified halal food within walking distance, visa-on-arrival status for each GCC passport, whether the resort has a family-only beach section. This is Berger's Practical Value — 'news you can use' — and it is the most shareable information in the category because it answers the question the family group chat is actually asking. No international OTA has it because no international OTA is built for this traveller.
- ONE STANDALONE INTERACTIVE AT ITS OWN URL. In the neal.fun mould: one idea, no signup, understandable in five seconds, screenshot-complete. Candidate — 'how far can 3,000 SAR actually take you', a live map whose reachable region breathes as you drag the budget slider, with the package that lands at the edge always named. It is submittable to galleries, postable to design communities, and it is a genuine lead source rather than decoration.
- THE ARABIC-NATIVE CARD AS THE TECHNICAL FLEX. Solving the satori bidi problem properly — and writing it up publicly as an engineering post with the code — earns links from the web-dev community, positions Sara AI Studio as technically serious, and produces an asset the category cannot copy quickly. The hard technical problem IS the differentiation, and it happens to be the same problem the product needs solved.

## Open questions

- Does WhatsApp's Accept-Language-based preview localisation actually work end-to-end in production, or does an intermediate cache collapse the variants into one? Meta documents that the header is sent, but says nothing about how caching interacts with content negotiation. This needs a live test with two devices set to ar and en before it is committed to the architecture.
- What is WhatsApp's real preview cache TTL in 2026? Every source says 'days to weeks' and none is authoritative. The answer determines whether content-hashing the share URL is a nice-to-have or mandatory for price-bearing cards.
- Can @vercel/og produce an acceptable Arabic card at all, or must the project fall back to a headless-Chromium render step writing to Supabase Storage? This should be spiked in week one — it changes the storage model, the build pipeline and the caching strategy.
- What is the actual WhatsApp reach figure for Saudi Arabia and the UAE? DataReportal publishes none because Meta releases no WhatsApp ad-reach data. The 'WhatsApp is dominant' assumption underpins several decisions here and rests on survey data I could not verify to a primary source.
- Snapchat reaches 25.3m in Saudi versus Instagram's 18.2m. Does the 9:16 artifact need Snapchat-specific safe zones and a Creative Kit integration, or does the Story-safe block cover both? Not resolved — Snapchat's own safe-zone documentation was not reachable in this session.
- Is there any published research on optimal text size for legibility at social-thumbnail scale? I found none. The 15%-scale review rule proposed above is an inferred house standard, not a sourced threshold, and should be validated with a small internal test rather than cited.
- What does the Middle East travel category's OG card landscape actually look like right now? A competitive audit — fetching the OG tags and cards of the top 20 regional package sites — would establish concretely how low the bar is, and was outside this dimension's scope.
- What is the honest conversion consequence of publishing real prices in the index? The differentiation case is strong; the commercial case needs the operator's judgement about margin transparency.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — Sharing is driven by physiological arousal, not valence; awe/anger/anxiety increase virality, sadness decreases it, controlling for surprise, interest and practical utility (Berger & Milkman, JMR).

Sagepub returned 403, so verified via OpenAlex record for DOI 10.1509/jmr.10.0353 (https://api.openalex.org/works/doi:10.1509/jmr.10.0353): 'What Makes Online Content Viral?', Berger & Milkman, Journal of Marketing Research. Abstract confirms virality is not determined by positivity/negativity; high-arousal positive (awe) and negative (anger, anxiety) content is shared more, low-arousal sadness less, and the patterns persist controlling for surprise, interest and practical utility, with experimental evidence for causality. Only quibble: OpenAlex dates it 2011 (online-first); the print issue is JMR 2012. Both dates are defensible.

### CONFIRMED — Berger's STEPPS framework: Social Currency, Triggers, Emotion, Public, Practical Value, Stories, with 'top of mind, tip of tongue' and 'news you can use'.

The Wharton PDF (https://wbl.wharton.upenn.edu/wp-content/uploads/2014/09/Contagious-Why-Things-Catch-On.pdf) would not render as text via fetch, so I extracted the PDF text streams locally. Berger's own words confirm all six: 'STEPPS is an acronym for: Social currency... Triggers, which is all about the idea of top of mind, tip of tongue... Ease for emotion... Public... Practical value: Basically, it's the idea of news you can use... Stories'. Social currency is defined as 'people talking about things to make themselves look good, rather than bad' - the summary's 'the better something makes us look' is book phrasing, not this source's wording, but is not misleading.

### PARTIALLY_TRUE — Wordle: 90 daily players 1 Nov 2021, 300,000 by 2 Jan 2022, 2 million by 9 Jan 2022; share feature added late Nov 2021; NYT acquired 31 Jan 2022 for low seven figures.

puzzlecottage.com returned 403 - the cited source is unfetchable. Verified instead against https://en.wikipedia.org/wiki/Wordle, which sources 90 and 300,000+ as daily but explicitly says 'more than 2 million weekly players' for mid-January. The daily/weekly conflation is a real error. Acquisition date and 'undisclosed price in the low-seven figures' confirmed. The mechanic itself - spoiler-free coloured emoji squares as plain text - is confirmed and is the load-bearing part.

Corrected: 90 daily players on 1 Nov 2021 and over 300,000 on 2 Jan 2022 (both daily). The 2 million figure is WEEKLY players in mid-January 2022, not daily players on 9 Jan. The spoiler-free emoji grid was adapted from a format invented by a group of New Zealand players, and drove the late-December 2021 Twitter surge; no source corroborates a 'late November 2021' ship date. NYT acquired Wordle on 31 Jan 2022 for an undisclosed price in the low seven figures.

### CONFIRMED — Spotify Wrapped 2025: 3.4m mentions week one (vs 3.46m 2024); day-two drop 14% in 2025 vs 60% in 2024; Listening Age ~3% of conversation but 5% of engagement; 81% of posts from users with an older Listening Age positive.

Fetched https://www.meltwater.com/en/blog/spotify-wrapped-listening-age-analysis (published 12 Dec 2025, launch 3 Dec 2025). Every figure matches: '3.4 million' vs 'about 3.46 million'; 'only about 14%' vs 'about 60%'; 'about 3%' of conversation and 'about 5% of overall engagement actions'; '81% of posts from users who said the feature aged them up were positive'. One precision note: the 81% is from users who SAID the feature aged them up (self-reported), not from users measured as having an older Listening Age. Minor, but the conversation-longevity finding is the durable insight and it holds.

### CONFIRMED — The Wrapped format is commoditised - Amazon Music '2025 Delivered', YouTube recap, Apple Music Replay; 'from a Spotify differentiator to a baseline expectation'.

Fetched https://www.emarketer.com/content/spotify-wrapped-faces-copycat-pressure-amazon-apple-youtube (published 4 Dec 2025). Article exists, names Amazon Music's '2025 Delivered', YouTube and Apple Music, and carries the quote 'the concept is shifting from a Spotify differentiator to a baseline expectation across streaming platforms'. Attribution and wording both check out.

### CONFIRMED — WhatsApp docs: og:title/og:description/og:url mandatory in <head> within first 300KB; og:image absolute, under 600KB, min 300px wide, aspect ratio 4:1 or less; UA 'WhatsApp/2.x.x.x [A|I|N]'; Accept-Language set to recipient's language; ~10s preview render.

Fetched the primary source in full: https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/. Verbatim matches on every figure - 'must appear within the first 300KB', 'under 600KB in size', '300px or more in width', '4:1 width/height or less aspect ratio', 'User-Agent header set to WhatsApp/2.x.x.x A|I|N', Accept-Language 'set to the language selected by the recipient', and the 10-second composer threshold. This is the strongest claim in the set. Confirms the doc says nothing about caching, which is why claim 7 has to lean on secondary sources.

### PARTIALLY_TRUE — WhatsApp caches previews with no refresh mechanism; workarounds are a query parameter OR Facebook's Sharing Debugger; min 100x100px, recommended 1200x630, JPG/PNG/WebP supported, GIF/SVG not.

Fetched https://www.ogrilla.com/blog/whatsapp-link-preview-guide (updated Jan 2026). Cache duration, no-refresh-mechanism, query-parameter workaround, 100x100 minimum, 1200x630 recommendation and the format list all check out. But the Sharing Debugger half of the workaround claim is contradicted by the very source cited - the guide says WhatsApp offers no cache clearing tool and never proposes the Debugger. This matters: it means the card is effectively write-once per URL.

Corrected: WhatsApp caches link previews for a duration reported as days to weeks with no official refresh mechanism, and provides no cache-clearing tool - the cited guide states 'Unlike Facebook, WhatsApp doesn't provide a cache clearing tool.' The only reliable workaround is changing the URL identity (e.g. ?v=2) or waiting for natural expiry. Facebook's Sharing Debugger is NOT a WhatsApp workaround. Minimum 100x100px to render, 300px+ width triggers the full-width card, 1200x630 recommended, 600KB ceiling, JPG/JPEG/PNG/WebP supported, GIF and SVG explicitly not.

### CONFIRMED — OGP spec defines og:image:url/secure_url/type/width/height/alt; multiple og:image supported with 'the first tag (from top to bottom) is given preference during conflicts'; og:locale is language_TERRITORY defaulting to en_US, with og:locale:alternate as an array.

Fetched https://ogp.me/ directly. All six structured sub-properties present. Verbatim: 'The first tag (from top to bottom) is given preference during conflicts.' And 'The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.' og:locale:alternate confirmed as 'An array of other locales this page is available in'. Fully accurate.

### CONFIRMED — Satori does not support full Unicode bidirectional layout ('mixed LTR and RTL text may not follow browser ordering'); issue #74 tracks RTL with no plan; HarfBuzz means Arabic glyphs still JOIN correctly, so the failure is ordering not shaping.

Fetched https://github.com/vercel/satori - README carries the sentence verbatim: 'Full Unicode bidirectional layout is not yet supported, so mixed LTR and RTL text may not follow browser ordering.' It also confirms HarfBuzz text shaping and that 'HarfBuzz also improves glyph shaping for complex scripts such as Arabic', which supports the shaping-vs-ordering distinction. Issue https://github.com/vercel/satori/issues/74 is titled 'RTL languages', is OPEN, carries a 'backlog' label, and the opening text reads 'There is no current plan for RTL languages, opening this issue to track.' Still unresolved as of 2026-08-22. This is the single most design-relevant confirmed constraint in the whole dimension.

### CONFIRMED — @vercel/og: 1200x630 recommended; flexbox only, display:grid does not work; ttf/otf/woff only, no woff2; 500KB max bundle including JSX, CSS, fonts, images and assets; satori also lacks calc(), z-index, 3D transforms, <style>, external <link>/<script>; robots.txt Allow recommended.

Fetched https://vercel.com/docs/og-image-generation, last_updated 2026-06-16 as stated. Verbatim: 'Only ttf, otf, and woff font formats are supported'; 'Only flexbox (display: flex) and a subset of CSS properties are supported. Advanced layouts (display: grid) will not work'; 'Maximum bundle size of 500KB. The bundle size includes your JSX, CSS, fonts, images, and any other assets'; 'Recommended OG image size: 1200x630 pixels'; and the robots.txt recommendation with the example 'Allow: /api/og/*'. The satori README independently confirms no calc(), no z-index ('There is no z-index support in SVG'), no 3D transforms, no <style>, no external <link>/<script>. Every element verified.

### CONFIRMED — Next.js opengraph-image/twitter-image conventions: params passed, generateImageMetadata supported, alt/size/contentType emitted as og:image:alt/width/height/type, statically optimized unless request-time APIs or uncached data, twitter-image max 5MB and opengraph-image max 8MB or the build fails. Docs v16.3.2, updated 2026-07-09.

Fetched https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image - frontmatter reads version 16.3.2, lastUpdated 2026-07-09, exactly as claimed. Verbatim: 'The twitter-image file size must not exceed 5MB, and the opengraph-image file size must not exceed 8MB... If the image file size exceeds these limits, the build will fail.' And 'By default, generated images are statically optimized (generated at build time and cached) unless they use Request-time APIs or uncached data.' generateImageMetadata, the params promise, and the alt/size/contentType to og:image:alt/width/height/type mapping are all documented as claimed. Fully accurate.

### PARTIALLY_TRUE — Web Share API can share files; canShare gates it; images include png/jpg/webp/avif/gif/svg; secure context and transient activation required; AbortError on cancel or no targets; MDN 'Limited availability - not Baseline'; iOS Safari and Chrome Android support it, desktop support patchy.

MDN (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) confirms the banner text 'not Baseline because it does not work in some of the most widely-used browsers', the file list, the secure-context note, AbortError, and - a detail the researcher omitted - the 'web-share Permissions Policy' requirement alongside transient activation. But caniuse.com/web-share shows 91.7% global support with Chrome/Edge/Safari all supporting on desktop. 'Desktop support is patchy' materially understates availability and could wrongly push the design toward a clipboard-only fallback. Firefox desktop is the lone holdout.

Corrected: navigator.share can share files, gated by navigator.canShare({files}); shareable image types include .png, .jpg, .webp, .avif, .gif and .svg (plus PDF, audio, video and text types). It requires a secure context, transient user activation, and the 'web-share' Permissions Policy - so it fails inside a cross-origin iframe without allow="web-share". It throws AbortError when the user cancels or there are no share targets. MDN labels it 'Limited availability - not Baseline', but caniuse puts global support at 91.7%: Chrome desktop 128+, Edge 95+, Safari macOS 12.1+, Safari iOS 12.2+, Chrome Android, Firefox Android 153+, Samsung Internet 8.2+. The only significant gap is Firefox on desktop.

### UNSUPPORTED — wa.me accepts a URL-encoded pre-filled message; https://wa.me/?text=<encoded> lets the sender pick any contact/group; https://wa.me/<international number, no +, no leading zero> targets a specific number.

Could not verify against any primary source in this session. faq.whatsapp.com/5913398998672934 and /425247423114725 both returned truncated content the fetcher declined to quote; https://developers.facebook.com/docs/whatsapp/link-generation/ returned HTTP 404. The researcher's own FLAG was honest, but the claim remains unverified against WhatsApp's own documentation, and the cited backing (u2l.ai, qualimero.com) are third-party blogs. The mechanic is widely implemented and very likely correct, but it must be tested on a live device before being written into a spec - do not treat the exact parameter behaviour as documented fact.

### FALSE — Instagram Story canvas 1080x1920 with safe margins of 250px top and 340px bottom, safe block ~1080x1330; Reels reserve ~410px bottom; portrait feed 1080x1350.

The primary cited URL, https://socialsizes.io/instagram-stories-size/, contains NO safe-zone pixel values at all - it gives only the 1080x1920 canvas and 9:16 ratio. The citation does not support the numbers attached to it. The second cited source, https://campaignswift.com/blog/instagram-safe-zone-sizes, gives 250px top and 250px BOTTOM with a 1080x1420 safe area, and Reels at 400px bottom-right / 270px bottom-left / 200px top with ~1080x1320 - none of which match the claimed 340px, 1080x1330 or ~410px. campaignswift also explicitly disclaims official status: 'Instagram doesn't publish a single official safe zone spec sheet'. Both the numbers and the sourcing fail.

Corrected: Instagram Story canvas is 1080x1920 (9:16) with community-derived safe margins of 250px top and 250px bottom, leaving a safe area of roughly 1080x1420 centred. Reels reserve ~200px top and roughly 400px on the bottom-right and 270px bottom-left for the CTA bar, caption and audio attribution, leaving ~1080x1320. Portrait feed posts are 1080x1350 (4:5). Meta publishes no official safe-zone spec sheet; these values are derived from the rendered UI and must be checked on a live device.

### CONFIRMED — JCMC study (24 Jan 2025, n=302, 18-30, 2x2x2): screenshotting is normatively entrenched; motivations are memory/bookmarking and social support; obscuring content reduced capture; accountability notifications alone were ineffective.

Fetched https://academic.oup.com/jcmc/article/30/1/zmae023/7978203 in full. Publication date 24 January 2025, n=302 (318 recruited, 16 removed), ages 18-30 (M=24.57), 2x2x2 between-subjects manipulating privacy rule, accountability and obscurity - all exactly as claimed. Normative perceptions predicted both collection and sharing. Obscurity prevented collection (B = -0.60, p < .001). One finding is STRONGER than reported: accountability alone did not merely fail, it PREDICTED INCREASED collection (B = 0.37, p = .04), and only combining obscurity with accountability reduced sharing (B = -0.65, p = .04). Explicit privacy rules reduced sharing (B = -0.33, p = .04) but not collection. The design lesson is sharper than the summary states: warning people you will notice backfires.

### PARTIALLY_TRUE — Awwwards weights Design 40/Usability 30/Creativity 20/Content 10; min 18 jurors; 3 furthest-from-average scores discarded; 5-day voting; 6.5+ Honorable Mention; SOTD scoring above 7 with developer jury earns Developer Award; 3 months from approval to win SOTD.

Fetched https://www.awwwards.com/about-evaluation/ - verbatim 'Design: 40% points, Usability: 30% points, Creativity: 20% points, Content: 10% points', 18-juror minimum, removal of 'the 3 jury scores furthest from the average', 5-day voting, 6.5+ Honorable Mention and 7+ Developer Award all confirmed. The '3 months from approval to win SOTD' does NOT appear on the page. Also uncovered a detail the researcher missed: a site can win early with 10+ Professional user votes. The Land-book half of the claim was self-flagged as unverified (403) and I did not independently confirm it - treat as unsourced. The load-bearing point for design - Usability at 30% - is solid.

Corrected: Awwwards' published evaluation system weights Design 40%, Usability 30%, Creativity 20%, Content 10%. A minimum of 18 jury members score each submission, the 3 scores furthest from the average are automatically discarded, and voting runs 5 days (a site can win earlier with high jury scores plus at least 10 Professional user votes). 6.5+ earns an Honorable Mention; Site of the Day winners scoring above 7 with the developer jury earn the Developer Award. No 3-month window from approval to SOTD is stated on the official evaluation page.

### CONFIRMED — SE Ranking study of 101,574 sites: AI referral traffic 0.02% (2024), 0.24% (2025), 0.32% (2026); ChatGPT 74.78%, Gemini 11.56% (+231%), Perplexity 7.23%, Copilot 3.51%, Claude 2.62% (+320%); AI visitors spend 67.7% more time on site (9m19s vs 5m33s).

Fetched https://seranking.com/blog/ai-traffic-research-study/ (published 18 June 2026). Sample of 101,574 websites across 250 countries, Jan 2025 - Apr 2026, Google Analytics data - all as claimed. Traffic shares 0.02/0.24/0.32% and the 16x framing confirmed. Platform split matches exactly, including Claude +320% and Gemini +231%. The 67.7% time-on-site uplift and 9m19s vs 5m33s confirmed. One caveat the summary should carry: the study also reports MEDIAN session times of 2m24s (AI) vs 1m53s (organic) - a 27% gap, not 68%. The mean is skewed; the median is the honest number for planning.

### CONFIRMED — DataReportal Digital 2026 Saudi Arabia: 34.4m internet users (99.0%), 38.6m social identities (111%), 48.7m mobile connections (140%), population 34.7m; TikTok 38.6m 18+, YouTube 27.5m, Snapchat 25.3m, Instagram 18.2m, Facebook 17.7m, X 15.0m, LinkedIn 12.0m; median mobile download 194.49 Mbps; no WhatsApp figure.

Fetched https://datareportal.com/reports/digital-2026-saudi-arabia (published 8 November 2025, October 2025 reference data). Every figure matches, including '99.0 percent', '111 percent', '140 percent of the total population' and '194.49 Mbps'. Confirmed that no WhatsApp reach figure is published. Additional detail worth carrying: Snapchat's 25.3m is 72.9% of the population and YouTube's 27.5m is 79.2% - which makes the summary's WhatsApp-and-Instagram-only framing look narrow, since Snapchat reaches nearly three in four Saudis.

### PARTIALLY_TRUE — GCC influencer market $315.5m (2025) to $771.6m (2032) at 13.9% CAGR; UAE TikTok 135%, Saudi 154%; Snapchat 90% of Saudis 13-34; UAE 9.83m social users (115%); Arabic-first content generates 35-50% higher engagement than translated English (Boomerang.ae).

Fetched https://www.kolsquare.com/en/blog/influencer-marketing-in-the-middle-east-in-2026-high-stakes-high-spend-and-the-arabic-first-imperative. All figures are transcribed accurately from the source, and the Arabic uplift is indeed attributed verbatim to Boomerang.ae. The transcription is honest; the underlying 35-50% number is not. It is a single agency assertion with no sample, no method and no date, restated by a vendor blog. Verdict: accurate reporting of an unreliable statistic. Notably, the Saudi TikTok 154% figure cross-validates perfectly against DataReportal, which raises confidence in Kolsquare's DataReportal-derived numbers but says nothing about the Boomerang one.

Corrected: Kolsquare reports the GCC influencer marketing market at $315.5m in 2025 rising to $771.6m by 2032 (13.9% CAGR), UAE TikTok penetration at 135% and Saudi at 154% of adults, Snapchat reaching 90% of Saudis aged 13-34, and 9.83m UAE social media users (115%). The Saudi TikTok figure is independently corroborated by DataReportal (154.3% of adults 18+). The '35-50% higher engagement for Arabic-first content' is Kolsquare quoting Boomerang.ae, an agency, with no published methodology - it carries no evidentiary weight and should not be quoted.

### CONFIRMED — Formats that earn editorial links: original data studies, interactive tools/calculators, recurring annual index/ranking reports; ~500 respondents minimum for survey studies.

Fetched https://www.digitalapplied.com/blog/link-building-2026-digital-pr-outreach-guide. It names original surveys with '500+ respondents', index reports, cost calculators, trend analysis and predictions reports, and states '500 or more respondents' for survey research. The claim is an accurate reading. Caveat that the researcher already flagged and I confirm: this is agency/practitioner guidance, not primary research - the 500 threshold is a rule of thumb with no statistical derivation behind it. Treat as heuristic, not requirement.

### FALSE — Most sharing is invisible to analytics; the '80%+ of global sharing happens in private' figure traces back to a decade-old RadiumOne study.

Fetched https://intentamplify.com/blog/dark-social/ - the cited source. It asserts '84%' and 'Research consistently shows that more than 80% of content sharing happens through Dark Social channels' with NO study, NO company, NO year and NO methodology, and it never mentions RadiumOne anywhere. So the stated attribution chain is broken at the very first link: the claim attributes the figure to a source that does not appear in the citation given. The page's only sourced statement is that Alexis Madrigal coined the term in The Atlantic in 2012. The researcher flagged 'NO CURRENT SOURCED FIGURE FOUND' - correct, but the honest conclusion is stronger: there is no sourced figure at all, current or historical, behind this citation. The mechanism is real and verifiable; the number is folklore.

Corrected: Private-channel sharing is structurally invisible to analytics: links passed through WhatsApp, Telegram and DMs commonly arrive with no referrer, and screenshots carry no trace at all. No credible current figure quantifies the share. The widely repeated '80%+' number has no traceable primary source and should not be used.

### PARTIALLY_TRUE — K = invites x conversion; K > 1 is self-sustaining; realistic 2026 target K = 0.3-0.6, with 0.5-1.0 described as strong; two-sided rewards outperform one-sided; Dropbox worked because the reward was the product.

Fetched https://getlaunchlist.com/blog/viral-coefficient-k-factor-guide. Formula, K > 1 threshold, two-sided superiority and the Dropbox reasoning ('the reward (more storage) was the same thing the product delivered') all confirmed verbatim. But the ranges are misquoted: the source says 0.3-0.7 (not 0.3-0.6) as 'healthy' and 0.5-0.9 (not 0.5-1.0) as 'strong amplifier'. Small drift, but it is exactly the kind of number that gets pasted into a growth target. Note also all three cited sources are vendor/practitioner content with no empirical basis - these are conventions, not findings.

Corrected: Viral coefficient K = i x c (average invites per user x invite conversion rate). K > 1 is self-sustaining exponential growth. Practitioner guidance for 2026 recommends K = 0.3-0.7 as a realistic target for most pre-launch waitlists and describes 0.5-0.9 as 'strong amplifier' performance. Two-sided incentives consistently outperform one-sided. Dropbox's referral programme worked because the reward - storage - was the product itself.

### FALSE — neal.fun is estimated at roughly 9.5m visits per month, with no signups, no onboarding, one idea per URL.

Fetched https://www.similarweb.com/website/neal.fun/. The 9.3m figure is explicitly labelled 'Total Visits Last 3 Months', not monthly. The researcher appears to have read a three-month total as a monthly rate, inflating traffic roughly 3x, and then rounded it up to 9.5m. The trend is also mildly negative, not the growth story the framing implies. The qualitative point about zero-friction single-purpose pages is uncontested and is the part worth keeping - but the number must go.

Corrected: neal.fun draws roughly 9.3 million visits over a trailing three-month window per Similarweb (data month July 2026) - approximately 3 million per month, not 9.5 million - and traffic was down 1.4% month-over-month with global rank slipping from 3,918 to 4,110. The structural observation stands: single-purpose toys, no signup, no onboarding, one idea per URL.

### UNSUPPORTED — X card summary_large_image: recommended 1200x628 (1.91:1), 2:1 also cited as official; min 300x157, max 4096x4096; under 5MB; JPG/PNG/WEBP/GIF.

Both https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image and .../cards/overview/markup returned HTTP 402 Payment Required. The claim's own hedging gives it away - it offers two different 'official' ratios (1.91:1 and 2:1) for the same card type, which is a tell that neither was checked at source. 1200x628 at 1.91:1 is the Open Graph convention; conflating it with X's spec is a real error that would produce a letterboxed or cropped card. The 5MB limit is the one figure that survives, verified indirectly via the Next.js docs.

Corrected: X's official card documentation is paywalled as of 2026-08-22 (developer.x.com returns HTTP 402), so no X image dimension figure can be verified at source. The only independently corroborated constraint is the 5MB twitter-image ceiling, which Next.js enforces at build time and attributes to developer.x.com. Note that 1.91:1 is the Facebook/Open Graph ratio, not X's - X's summary_large_image ratio is 2:1. Treat all dimension figures as unverified aggregator claims and test against the live X validator before locking a template.

### Corrections applied

- neal.fun traffic: Similarweb (data month July 2026) reports approximately 9.3 million visits over the TRAILING THREE MONTHS, i.e. roughly 3.1M/month, not 9.5M visits per month. Traffic was down 1.4% month-over-month and global rank slipped from 3,918 to 4,110. The '9.5m visits per month' figure overstates by ~3x and should be restated as '~3M monthly visits, trending slightly down'.
- Instagram Story safe zones: the canvas is 1080x1920 (9:16), but the cited sources give 250px TOP and 250px BOTTOM, leaving a safe area of ~1080x1420 - not 250/340 leaving 1080x1330. Reels reserve ~200px top and roughly 400px bottom-right / 270px bottom-left, leaving ~1080x1320 - not '~410px bottom'. socialsizes.io, the cited URL, contains no safe-zone pixel values at all. Portrait feed at 1080x1350 (4:5) is correct. campaignswift explicitly states Meta publishes no official safe-zone spec sheet and that these are derived from the rendered UI.
- Web Share API support: navigator.share is at ~91.7% global support (caniuse, checked 2026-08-22): Chrome desktop 128+, Edge 95+, Safari macOS 12.1+, Safari iOS 12.2+, Chrome Android, Firefox Android 153+, Samsung Internet 8.2+. Desktop support is NOT patchy - the single significant gap is Firefox on desktop, which is the sole reason MDN still labels it 'Limited availability - not Baseline'. MDN additionally requires the 'web-share' Permissions Policy, so the API fails inside a cross-origin iframe without allow="web-share".
- WhatsApp preview cache: WhatsApp caches previews for days to weeks with no official refresh mechanism, and the cited source states explicitly that 'Unlike Facebook, WhatsApp doesn't provide a cache clearing tool.' It does NOT offer Facebook's Sharing Debugger as a WhatsApp workaround - that half of the claim is unsupported. The only reliable lever is changing the URL identity (e.g. ?v=2). Design implication: the OG card must be right on first publish, because it cannot be purged.
- Wordle growth figures: 90 daily players on 1 Nov 2021 and over 300,000 on 2 Jan 2022 are correct, but the 2 million figure is WEEKLY players in mid-January 2022 per Wikipedia's sourcing, not 2 million daily players on 9 Jan. The emoji-grid was adapted from a format invented by a group of New Zealand players and drove a late-December 2021 Twitter surge; the specific 'added late Nov 2021' date is not corroborated. NYT acquisition on 31 Jan 2022 for an undisclosed price in the low seven figures is confirmed.
- Viral coefficient targets: the cited LaunchList 2026 guide recommends K = 0.3-0.7 as a realistic pre-launch target and describes 0.5-0.9 as 'strong amplifier' performance - not 0.3-0.6 and 0.5-1.0. K = i x c, K > 1 as self-sustaining, two-sided incentives outperforming one-sided, and the Dropbox reward-is-the-product point are all confirmed.
- X/Twitter card specs: developer.x.com now returns HTTP 402 Payment Required, so no X card dimension figure can be verified at source as of 2026-08-22. Only the 5MB twitter-image ceiling is verifiable, and only indirectly via Next.js citing developer.x.com. Note the internal contradiction in the original claim: 1.91:1 is the Facebook/Open Graph ratio; X's summary_large_image ratio is 2:1. Treat every X dimension number as an unverified aggregator claim.
- Dark social: drop the percentage entirely. The cited page asserts '84%' and 'more than 80% of content sharing happens through Dark Social channels' with no study, no company, no year, and never mentions RadiumOne - so the stated attribution chain is broken at the first link. What survives is the mechanism, not a statistic: private-channel shares and screenshots carry no referrer and no trace, so the true share is unmeasured rather than known to be 80%.
- Arabic-first engagement uplift: the '35-50% higher engagement rates in GCC markets compared to translated English' is Kolsquare quoting Boomerang.ae, an agency, with no published methodology or sample. It is accurately transcribed but has no evidentiary weight. Do not quote it publicly or use it to justify budget.
- Awwwards: the 40/30/20/10 weighting, 18-juror minimum, automatic discarding of the 3 scores furthest from the average, 5-day voting window, 6.5+ Honorable Mention threshold and 7+ developer-jury Developer Award are all confirmed on the official evaluation page. The '3 months from approval to win SOTD' is NOT stated there and should be dropped or re-sourced.

### Flagged as not covered

- THE ARABIC FONT/BUNDLE COLLISION IS NEVER DRAWN. The dimension verifies satori's bidi gap (claim 9) and the 500KB bundle ceiling including fonts (claim 10) but never puts them together. For an Arabic OG card these two constraints collide head-on: a Noto Naskh or Kufi face large enough to render Arabic well can consume most of a 500KB budget that must also hold JSX, CSS and any imagery. The actual engineering answer - subset the font to the glyphs used, or abandon satori for a headless-browser renderer - is absent.
- NO WORKAROUND FOR THE BIDI FAILURE. The dimension correctly identifies that satori breaks mixed Arabic/Latin ordering, then stops. It never states the mitigations: emit Arabic-only and Latin-only cards rather than mixed ones, insert explicit Unicode bidi control characters (U+202B/U+202C) to force ordering, pre-render with Playwright/Puppeteer instead of satori, or ship a static pre-rendered PNG per locale. Naming a blocker without a route around it is not a design decision.
- THE web-share PERMISSIONS POLICY IS OMITTED. MDN states navigator.share requires the 'web-share' Permissions Policy in addition to a secure context and transient activation. Any share button rendered inside a cross-origin iframe - a preview environment, an embedded booking widget, a partner placement - will throw unless allow="web-share" is set. This is a concrete implementation failure mode that never appears.
- SNAPCHAT IS IGNORED DESPITE THE OWN-CITED DATA. DataReportal (claim 18) puts Snapchat at 25.3m in Saudi Arabia - 72.9% of the population, and Kolsquare reports 90% reach among Saudis aged 13-34. The dimension names only WhatsApp and Instagram. A Gulf share-artifact strategy that ignores the platform reaching three in four Saudis is incomplete, and Snapchat's share surface (Snap-native stickers, 1080x1920 vertical) has different constraints from the OG card.
- NO PREVIEW BEHAVIOUR FOR NON-WHATSAPP UNFURLERS. Telegram, iMessage, X, LinkedIn and Slack each unfurl differently, cache differently, and have different image ceilings. iMessage matters specifically in the Gulf's high-iPhone-share segment. The dimension optimises exclusively for WhatsApp's rules and implicitly assumes they generalise. They do not.
- NO DARK-SOCIAL MEASUREMENT PLAN. The dimension asserts that most sharing is invisible (on a statistic that turns out to be unsourced) but proposes no way to measure it. The practical instrumentation is well established and absent: UTM-tagged copy-to-clipboard payloads, per-share short codes or hashed share IDs, and a self-reported 'how did you hear about us' field. Without one of these the whole strategy is unfalsifiable.
- THE ACCOUNTABILITY BACKFIRE IS UNDERSOLD. The JCMC study found accountability notifications did not merely fail to deter screenshotting - they PREDICTED INCREASED collection (B = 0.37, p = .04). For a travel site showing prices and itineraries this inverts a common instinct: telling users you can see them share makes them share more. The dimension reports this as 'ineffective', losing the actionable finding.
- NO REGULATORY TREATMENT OF REFERRAL LOOPS. The dimension proposes referral arithmetic (K-factor, two-sided rewards) for a Middle East market without touching Saudi Arabia's PDPL or the UAE's data protection regime. Contact-list uploads, invite-a-friend flows and pre-filled messages to third parties all carry consent obligations. Given the project's own rule that traveller data is not test data, this gap is material.
- NO FAILURE MODE FOR THE ARTIFACT ITSELF. Wordle's grid is brag-safe because it leaks nothing. A travel artifact naturally wants to encode destination, dates and price - which are exactly the things a user may not want forwarded into a group chat, and which may include another traveller's details. The dimension never asks what the object must NOT contain.
- AWWWARDS IS A PAID CHANNEL. Submission carries a fee, which makes gallery listings a marketing spend with an expected return, not free organic reach. The dimension files it under reputation without noting the cost or that a rejected submission is money spent for nothing. It also missed that a site can win early with 10+ Professional user votes, which changes the timing strategy.
- MEAN VERSUS MEDIAN ON THE AI TRAFFIC FINDING. SE Ranking's headline 67.7% time-on-site uplift is a comparison of means (9m19s vs 5m33s). The same study's medians are 2m24s vs 1m53s - a 27% gap. Planning against the mean overstates the quality of AI referral traffic by roughly 2.5x, and the dimension quotes only the flattering number.
- NO VERIFICATION STEP FOR THE UNVERIFIABLE SPECS. Three constraint sets could not be confirmed at source: X's card dimensions (docs paywalled, HTTP 402), the wa.me parameter format (WhatsApp FAQ unfetchable, Meta's link-generation doc 404), and Instagram's safe zones (Meta publishes none). The dimension presents all three as settled. Each needs a live-device or validator test written into the build plan before a template is locked.

## Sources

- [Link Previews — WhatsApp Business Messaging documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/) · Meta for Developers  
  Primary source for WhatsApp link preview requirements: required og tags, 300KB head limit, 600KB image limit, 300px min width, 4:1 max aspect ratio, crawler User-Agent, Accept-Language header, ~10s preview window.
- [Open Graph (OG) Image Generation](https://vercel.com/docs/og-image-generation) · Vercel · 2026-06-16  
  Primary source for @vercel/og constraints: 1200x630 recommendation, flexbox-only CSS, ttf/otf/woff fonts only, 500KB total bundle limit, robots.txt Allow recommendation, runtime support matrix.
- [opengraph-image and twitter-image (Next.js docs v16.3.2)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) · Vercel / Next.js · 2026-07-09  
  Primary source for the per-route card architecture: file conventions, params, generateImageMetadata, alt/size/contentType exports, static optimisation and caching defaults, 5MB twitter-image and 8MB opengraph-image build-failing limits.
- [vercel/satori (README and issue #74)](https://github.com/vercel/satori) · Vercel  
  Primary source for the blocking RTL finding: 'Full Unicode bidirectional layout is not yet supported, so mixed LTR and RTL text may not follow browser ordering'; also the unsupported-CSS list (no grid, calc, z-index, 3D transforms) and HarfBuzz shaping support.
- [The Open Graph protocol](https://ogp.me/) · ogp.me  
  Primary spec for og:image structured sub-properties, the first-tag-wins rule for multiple og:image tags, and og:locale / og:locale:alternate.
- [Navigator: share() method](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) · MDN Web Docs / Mozilla  
  Primary reference for the Web Share API: data fields including files, canShare gating, HTTPS and transient-activation requirements, permitted image file types, exception types, and 'Limited availability — not Baseline' support status.
- [Understanding screenshot collection and sharing on messaging platforms: a privacy perspective](https://academic.oup.com/jcmc/article/30/1/zmae023/7978203) · Journal of Computer-Mediated Communication (Oxford Academic) · 2025-01-24  
  Peer-reviewed evidence (n=302, 2x2x2 experiment) that screenshotting is normative among 18-30s and is motivated by memory/bookmarking and by seeking friends' advice — the basis for designing the mobile viewport as a self-sufficient artifact.
- [What Makes Online Content Viral?](https://journals.sagepub.com/doi/10.1509/jmr.10.0353) · Journal of Marketing Research (Berger & Milkman) · 2012  
  The arousal-not-valence principle: awe/anger/anxiety increase virality, sadness decreases it, controlling for surprise, interest and practical utility. FLAG: 2012, pre-2023 — timeless principle, stale as commentary.
- [How Spotify Wrapped 2025 Went Viral: Listening Age Insights and Global Trends](https://www.meltwater.com/en/blog/spotify-wrapped-listening-age-analysis) · Meltwater · 2025-12-12  
  Measured 2025 Wrapped figures: 3.4m mentions in launch week, 14% day-two drop vs 60% in 2024, Listening Age at 3% of conversation but 5% of engagement, 81% positive sentiment on 'older' results.
- [Spotify Wrapped faces copycat pressure from Amazon, Apple, and YouTube](https://www.emarketer.com/content/spotify-wrapped-faces-copycat-pressure-amazon-apple-youtube) · eMarketer  
  Evidence that the Wrapped/year-in-review format is now a commodity baseline rather than a differentiator — the anti-pattern warning.
- [Awwwards Evaluation System](https://www.awwwards.com/about-evaluation/) · Awwwards  
  Primary source for the scoring weights (Design 40 / Usability 30 / Creativity 20 / Content 10), 18-member minimum jury with 3 outliers dropped, 5-day voting, 6.5 Honorable Mention threshold, >7 developer award, 3-month eligibility window.
- [Digital 2026: Saudi Arabia](https://datareportal.com/reports/digital-2026-saudi-arabia) · DataReportal (We Are Social / Meltwater) · 2025-11-08  
  Saudi digital baseline: 34.4m internet users (99.0%), 38.6m social identities (111%), platform reach ranking (TikTok 38.6m, YouTube 27.5m, Snapchat 25.3m, Instagram 18.2m), 194.49 Mbps median mobile — and the absence of any WhatsApp reach figure.
- [Influencer Marketing in the Middle East: 2026 Guide](https://www.kolsquare.com/en/blog/influencer-marketing-in-the-middle-east-in-2026-high-stakes-high-spend-and-the-arabic-first-imperative) · Kolsquare · 2026  
  GCC market context: $315.5m influencer market (2025) to $771.6m by 2032, UAE TikTok 135% adult penetration, Snapchat reaching 90% of Saudis 13-34, and the second-hand 35-50% Arabic-first engagement uplift claim (attributed to Boomerang.ae).
- [Analysis of Top AI Search Engines: Who Is Catching Up to ChatGPT?](https://seranking.com/blog/ai-traffic-research-study/) · SE Ranking · 2026-06-18  
  AI referral reality check: 101,574 websites over Jan 2025-Apr 2026; AI traffic 0.02% (2024) to 0.24% (2025) to 0.32% (2026); ChatGPT 74.78% share; AI visitors spend 67.7% more time on site than organic.
- [WhatsApp Link Preview Requirements 2026: Complete Technical Guide](https://www.ogrilla.com/blog/whatsapp-link-preview-guide) · OGrilla · 2026-01  
  Secondary detail Meta does not document: preview cache duration (days to weeks), absence of any purge mechanism, query-parameter cache-busting workaround, 100x100 minimum, supported formats (GIF and SVG not supported).
- [The History of Wordle — Josh Wardle, the NYT Acquisition, the Phenomenon](https://puzzlecottage.com/wordle-history) · Puzzle Cottage  
  The share-artifact mechanic and growth timeline: plain-text spoiler-free emoji grid added late Nov 2021; 90 players (1 Nov 2021) to 300k (2 Jan 2022) to 2m (9 Jan 2022); NYT acquisition 31 Jan 2022.
- ['Contagious': Jonah Berger on Why Things Catch On](https://wbl.wharton.upenn.edu/wp-content/uploads/2014/09/Contagious-Why-Things-Catch-On.pdf) · Knowledge@Wharton · 2013  
  The STEPPS framework — Social Currency, Triggers, Emotion, Public, Practical Value, Stories. FLAG: pre-2023 source.
- [Instagram Stories Size 2026 — 1080x1920](https://socialsizes.io/instagram-stories-size/) · SocialSizes.io · 2026  
  Story/Reel/feed geometry: 1080x1920 canvas, 250px top and 340px bottom safe margins (1080x1330 payload block), ~410px bottom reserve on Reels, 1080x1350 portrait feed. Third-party aggregator — verify on device before locking templates.
- [Viral Coefficient & K-Factor: How to Calculate, Interpret, and Improve It (2026 Guide)](https://getlaunchlist.com/blog/viral-coefficient-k-factor-guide) · LaunchList · 2026  
  K-factor arithmetic and realistic targets (0.3-0.6), two-sided reward guidance, and the Dropbox product-denominated-reward lesson. Practitioner source, not primary research.
- [Link Building 2026: Digital PR & Outreach Guide](https://www.digitalapplied.com/blog/link-building-2026-digital-pr-outreach-guide) · Digital Applied · 2026  
  The four link-earning formats (original data studies, reactive PR, interactive tools/calculators, recurring index reports) and the ~500-respondent survey guidance. Practitioner source; the '3.2x' journalist multiplier it cites has no traceable primary study and should not be quoted.
