# Search engines and answer engines

Dimension `discovery-seo-aeo` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Discovery in 2026 splits into two channels that reward opposite building habits, and a Middle East package site must serve both from one codebase.

Channel one is classical Google organic. Google is effectively the only engine in the Gulf — 95.95% share in Saudi Arabia, 95.93% in the UAE (StatCounter, July 2026) — and the rich-result surface for travel has genuinely collapsed. HowTo was cut to desktop-only in August 2023 and removed outright, documentation included, on 14 September 2023. FAQ was narrowed in August 2023 to well-known, authoritative government and health sites, stopped rendering entirely on 7 May 2026, and had its documentation deleted on 15 June 2026. TouristTrip, TouristAttraction, TouristDestination and Trip appear nowhere in Google's 25-feature gallery (last updated 2026-06-15), and TouristTrip is not even a stable schema.org type — it sits in the "new" area. Vacation rental is in the gallery but gated behind a Hotel Center partner program.

That leaves Product + Offer/AggregateOffer + AggregateRating + BreadcrumbList as the only travel-page markup with a live visual payoff — and two constraints bite. Product rich results "only support pages that focus on a single product," so package category pages are ineligible. And Google explicitly bars star review snippets where the reviewed entity controls its own reviews on LocalBusiness or any Organization type, "either directly in their structured data or through an embedded third-party widget" — precisely what a travel agency would naively build.

Channel two is answer engines, and it is brutally mechanical. Google states there is no special markup, no AI file, no schema needed; eligibility is simply indexed and snippet-eligible. Ahrefs found 97% of published llms.txt files across 137,210 domains got zero requests in May 2026. What does matter: no major AI crawler executes JavaScript, so client-rendered content is invisible — and Next.js appends metadata to `<body>` for any agent missing from HTML_LIMITED_BOT_UA_RE, which omits every AI crawler. The fix is the documented htmlLimitedBots override. The differentiated site wins on server-rendered, first-hand-experience content with original data and real photography, not schema volume.

## Summary as first written, before verification

Discovery in 2026 has split into two channels that reward opposite building habits, and a Middle East package site must serve both from one codebase. Channel one is classical Google organic, where Google is effectively the only engine that matters in the Gulf (95.95% share in Saudi Arabia, 95.93% in the UAE, StatCounter July 2026) and where the rich-result surface for travel has quietly collapsed: HowTo rich results were removed in 2023, FAQ rich results stopped rendering on 7 May 2026, and TouristTrip / TouristAttraction / Trip have never had a Google rich result at all. The only markup on a travel package page with a live visual payoff is Product + Offer/AggregateOffer + AggregateRating + BreadcrumbList — and Google explicitly bars star review snippets on Organization/LocalBusiness nodes when the reviewed entity controls its own reviews, which is exactly what a travel agency would naively do. Channel two is answer engines. Google's own documentation says there is no special markup, no llms.txt, no AI file needed — eligibility is "indexed and snippet-eligible." Ahrefs' 137,210-domain study found 97% of published llms.txt files were never fetched. What does matter is brutally mechanical: AI crawlers do not execute JavaScript, so anything rendered client-side is invisible to them — and Next.js's streaming-metadata path appends metadata to <body> for any bot not matched by its HTML_LIMITED_BOT_UA_RE regex, which does not list GPTBot, OAI-SearchBot, ClaudeBot or PerplexityBot. The differentiated site therefore wins on server-rendered, entity-dense, first-hand-experience content with original data and real photography — not on schema volume or page count.

## Findings

### The Core Web Vitals set as of 2026 is LCP, INP and CLS. INP became a stable Core Web Vital in 2024, fully replacing First Input Delay. Thresholds, measured at the 75th percentile of page loads segmented by mobile and desktop: LCP good ≤2.5s / poor >4.0s; INP good ≤200ms / poor >500ms; CLS good ≤0.1 / poor >0.25. Everything between good and poor is 'needs improvement'.

Confidence: verified · type: constraint

Why it matters here: A package site is image-heavy and interaction-heavy (date pickers, traveller counts, filters). These are the exact numbers the master UI/UX doc must treat as hard build budgets, not aspirations — especially INP, which punishes the client-side filtering UI that generic travel templates ship.

Evidence: web.dev/articles/vitals, Chrome team. States 'INP became a stable Core Web Vital metric in 2024' and gives the three thresholds and the 75th-percentile rule. Fetched 2026-08-22.

Source: https://web.dev/articles/vitals

### Google states there is 'no single signal' for page experience, but confirms 'Core Web Vitals are used by our ranking systems.' Google frames it as a tiebreaker: relevance wins first, but 'for many queries, there is lots of helpful content available. Having a great page experience can contribute to success in Search, in such cases.'

Confidence: verified · type: principle

Why it matters here: Travel package queries are exactly the 'lots of helpful content available' case — dozens of near-identical agency pages compete for 'رحلات جورجيا من الرياض'. CWV is therefore a genuine competitive lever here in a way it is not for a unique-content niche.

Evidence: developers.google.com/search/docs/appearance/page-experience, last updated 2025-12-10 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/page-experience

### Google's LCP guidance gives sub-part budgets: TTFB ~40% of LCP, resource load delay <10%, resource load duration ~40%, element render delay <10%. It states the LCP resource 'should be discoverable from the HTML source', that you should use fetchpriority="high" on the hero img (and not on several images at once), and 'Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay.'

Confidence: verified · type: constraint

Why it matters here: Every generic travel site opens with a full-bleed hero or a 5-slide carousel. These budgets convert that into a concrete rule: one server-rendered hero <img> with src/srcset in the initial HTML, fetchpriority high, no lazy attribute, and a TTFB budget of roughly 1s if LCP is to land under 2.5s.

Evidence: web.dev/articles/optimize-lcp, last updated 2025-03-31. Fetched 2026-08-22.

Source: https://web.dev/articles/optimize-lcp

### Google's INP guidance names client-side HTML rendering as a direct cause of presentation delay: 'by rendering HTML with JavaScript on the client, you get processing cost plus the browser will not yield until finished parsing.' It recommends minimising DOM size, using CSS content-visibility for off-screen elements, yielding to the main thread, and avoiding layout thrashing.

Confidence: verified · type: constraint

Why it matters here: The default architecture for a package-search UI — fetch results from Supabase in the browser and render 40 cards client-side — is named here as an INP failure mode. Server-render the result list and use content-visibility on below-fold cards instead.

Evidence: web.dev/articles/optimize-inp, last updated 2025-09-02. Fetched 2026-08-22.

Source: https://web.dev/articles/optimize-inp

### Google's FAQ structured data documentation now carries the notice: 'This feature will no longer appear in Google Search starting May 7, 2026.' HowTo rich results were removed earlier — the August 2023 announcement limited HowTo and restricted FAQ rich results to news, government and health/medical sites. Neither FAQPage nor HowTo appears in Google's current supported-features gallery (page last updated 2026-06-15).

Confidence: verified · type: constraint

Why it matters here: Every travel-site SEO checklist still says 'add FAQ schema for rich results'. That payoff no longer exists. FAQ content is still worth writing — as extractable answer blocks for LLMs and users — but the markup must not drive information architecture, and no build time should go into padding out 20 questions to chase a snippet that cannot render.

Evidence: developers.google.com/search/docs/appearance/structured-data/faqpage (deprecation notice quoting May 7, 2026); developers.google.com/search/blog/2023/08/howto-faq-changes (2023-08-08); developers.google.com/search/docs/appearance/structured-data/search-gallery (updated 2026-06-15, list excludes FAQ and HowTo). All fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/faqpage

### Google's complete supported structured-data feature list is: Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription and paywalled content, Vacation rental, Video. TouristTrip, TouristAttraction, TouristDestination and Trip are NOT on it — they produce no Google rich result.

Confidence: verified · type: constraint

Why it matters here: Kills the most common travel-schema myth. TouristTrip is still worth emitting as machine-readable itinerary data for LLM extraction and entity disambiguation, but it must be positioned in the master doc as an AEO artifact, not a SERP feature. The rich-result budget goes to Product, Review snippet, Breadcrumb and Organization.

Evidence: developers.google.com/search/docs/appearance/structured-data/search-gallery, last updated 2026-06-15 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/search-gallery

### schema.org/TouristTrip is not a stable type — it sits in the 'new' area pending implementation feedback. Its correct properties are: touristType (Audience|Text), and inherited from Trip: itinerary (ItemList|Place), arrivalTime (DateTime|Time), departureTime (DateTime|Time), offers (Demand|Offer), provider (Organization|Person), partOfTrip (Trip), subTrip (Trip), tripOrigin (Place), plus name/description/image/url from Thing.

Confidence: verified · type: pattern

Why it matters here: These are the exact property names to write into the JSON-LD spec so no build session invents 'duration', 'destination' or 'price' on a Trip node. itinerary → ItemList of TouristAttraction/Place is the day-by-day structure; tripOrigin is the departure city (Riyadh, Dubai, Jeddah), which is the single most important disambiguating entity for a Middle East package.

Evidence: schema.org/TouristTrip, fetched 2026-08-22. Page marks the type as being in the 'new' area rather than stable.

Source: https://schema.org/TouristTrip

### Product structured data requires name plus at least one of review, aggregateRating or offers. Recommended: offers.price or offers.priceSpecification.price, priceCurrency (ISO 4217), availability, priceValidUntil; for multiple sellers AggregateOffer with lowPrice, highPrice, priceCurrency, offerCount; aggregateRating with ratingValue and reviewCount. Critically: 'Currently, product rich results only support pages that focus on a single product (or multiple variants of the same product)' — general category pages are ineligible.

Confidence: verified · type: constraint

Why it matters here: This dictates URL architecture. One package = one URL = one Product node. A /packages listing page must not carry Product markup. Departure-date variants of the same package are 'variants of the same product' and can share a page with AggregateOffer lowPrice/highPrice — which is exactly how a seasonal package with 12 monthly departures should be modelled.

Evidence: developers.google.com/search/docs/appearance/structured-data/product-snippet and .../product, both last updated 2025-12-10 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/product-snippet

### Google's review snippet policy states: 'If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature.' This applies whether the reviews are native or pulled in via an embedded widget (Google Business, Facebook). Review requires author, itemReviewed and reviewRating.ratingValue; AggregateRating requires itemReviewed, ratingValue and at least one of ratingCount or reviewCount.

Confidence: verified · type: constraint

Why it matters here: This is the single highest-value technical distinction in this dimension. Putting aggregateRating on a TravelAgency/Organization node — the default move — is explicitly ineligible and risks a structured-data manual action. Putting the same ratings on the package Product node, where the reviewed entity is the trip rather than the agency, keeps star eligibility. Almost every competitor gets this backwards.

Evidence: developers.google.com/search/docs/appearance/structured-data/review-snippet, last updated 2026-07-24 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### Google's Carousel (ItemList) rich result supports only four content types: Course list, Movie, Recipe and Restaurant. Broader 'structured data carousels' exist only as a separate Early Adopters Program (beta). ItemList requires itemListElement with at least two ListItems of the same type; summary-page ListItems need position and url, and all URLs must be on the same domain.

Confidence: verified · type: constraint

Why it matters here: Rules out the 'wrap our package grid in ItemList and get a swipeable carousel' plan. ItemList is still worth emitting on collection pages for crawl structure and LLM enumeration, but it must be documented as producing no visual result today.

Evidence: developers.google.com/search/docs/appearance/structured-data/carousel, last updated 2025-12-10 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/carousel

### Google's structured data policies require that markup describe visible content: 'Don't mark up content that is not visible to readers of the page.' Markup must be a true representation of the page, complete, and located on the page it describes. Violations trigger manual actions that remove rich-result eligibility without affecting web ranking. Correct markup never guarantees a rich result.

Confidence: verified · type: principle

Why it matters here: Sets the rule that JSON-LD is generated from the same Supabase rows that render the visible page, never hand-authored separately. It also means the itinerary, price, inclusions and ratings in schema must all be on-page in visible text — which conveniently is also what makes the page extractable by LLMs.

Evidence: developers.google.com/search/docs/appearance/structured-data/sd-policies, last updated 2026-07-10 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

### Google's official position on AI features: 'There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary'; 'You don't need to create new machine readable files, AI text files, or markup to appear in these features'; 'There's also no special schema.org structured data that you need to add.' Eligibility = indexed and eligible for a snippet. nosnippet, data-nosnippet, max-snippet and noindex limit what appears in AI features. Google-Extended governs training/grounding in other Google systems and does NOT remove a page from AI Overviews or AI Mode.

Confidence: verified · type: principle

Why it matters here: Two operational consequences. First, the Google-Extended trap: an agency that blocks Google-Extended thinking it opts out of AI Overviews achieves nothing except losing Gemini grounding. Second, any max-snippet limit set for 'content protection' directly throttles AI Overview inclusion — so the master doc should mandate max-snippet:-1 and max-image-preview:large.

Evidence: developers.google.com/search/docs/appearance/ai-features, Google Search Central. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/appearance/ai-features

### Ahrefs analysed 137,210 domains that received traffic in May 2026. 28% published a valid llms.txt (~38,360 domains); 97% of those files received zero requests during the study period. Across the whole population only ~22,000 requests hit llms.txt paths at all, of which AI bots were 19.5% and AI retrieval bots — the ones that actually feed ChatGPT/Perplexity answers — were 1.1% of AI bot requests. Google's John Mueller separately said no AI service has stated it uses llms.txt and server logs show they don't check for it.

Confidence: verified · type: data

Why it matters here: Removes llms.txt from the AEO plan as a deliverable. Effort should go to server-rendered HTML and answer-shaped content instead. If the framework auto-generates one, fine — but it earns zero build hours and must not appear as a milestone in the master doc.

Evidence: ahrefs.com/blog/llmstxt-study/ (study of May 2026 data, fetched 2026-08-22); Mueller statement reported at stanventures.com/news/google-dismisses-llms-txt-as-ineffective-and-unused-by-ai-bots-2479/.

Source: https://ahrefs.com/blog/llmstxt-study/

### None of the major AI crawlers execute JavaScript. Vercel's analysis found ChatGPT's crawler fetches JS files in 11.50% of requests and Claude's in 23.84%, but both retrieve them as text without running them; only Google's Gemini (via Googlebot infrastructure) and AppleBot render JS. Measured volumes: GPTBot 569M requests/month, Claude 370M, PerplexityBot 24.4M, against Googlebot's 4.5B. ChatGPT's crawler wasted 34.82% of fetches on 404s and Claude's 34.16%, versus Googlebot's 8.22%.

Confidence: verified · type: data

Why it matters here: Any package data fetched from Supabase in the browser is invisible to ChatGPT, Claude and Perplexity. The whole catalogue must be server-rendered or statically generated. The 404 waste figures also make redirect hygiene and an accurate sitemap disproportionately valuable for AI discovery. Note: the crawl volumes are from late 2024 and are almost certainly stale as absolute numbers; the JS-rendering finding is the durable part.

Evidence: vercel.com/blog/the-rise-of-the-ai-crawler, Vercel engineering (published December 2024 — flag volumes as dated). Fetched 2026-08-22.

Source: https://vercel.com/blog/the-rise-of-the-ai-crawler

### Next.js App Router streams metadata for dynamically rendered pages: 'When generateMetadata resolves, the resulting metadata tags are appended to the <body> tag.' Blocking metadata in <head> is only produced for bots matched by HTML_LIMITED_BOT_UA_RE. That regex covers Google crawlers, Bingbot, applebot, facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, Discordbot, DuckDuckBot, yandex, baiduspider and similar — it does NOT include GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot or PerplexityBot. Prerendered pages don't stream at all.

Confidence: verified · type: constraint

Why it matters here: This is a concrete, checkable defect waiting to happen in this exact stack. A dynamically rendered package page served to GPTBot — which does not execute JavaScript — yields HTML with no <title>, no description, no canonical and no hreflang in <head>. Two fixes: prerender/ISR the routes (preferred, and better for LCP), or extend htmlLimitedBots in next.config to include the AI user agents.

Evidence: nextjs.org/docs/app/api-reference/functions/generate-metadata (v16.3.2, lastUpdated 2026-08-19), 'Streaming metadata' section; source regex at github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/html-bots.ts, read directly 2026-08-22.

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

### OpenAI runs three distinct crawlers with different consequences. OAI-SearchBot 'is used to surface websites in search results in ChatGPT's search features' and 'Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers.' GPTBot crawls content that may be used for model training. ChatGPT-User handles user-initiated actions and 'is not used to determine whether content may appear in Search.'

Confidence: verified · type: constraint

Why it matters here: Settles the 'should we block AI crawlers?' question for a travel business with a precise answer rather than a vibe: allow OAI-SearchBot unconditionally (it is a discovery channel), and treat GPTBot as the only genuine opt-out decision. A blanket robots.txt block — the default defensive move — deletes ChatGPT search visibility.

Evidence: developers.openai.com/api/docs/bots, OpenAI platform documentation. Fetched 2026-08-22.

Source: https://developers.openai.com/api/docs/bots

### Two independent 2026 studies with published methodology agree that transactional and comparison-shaped pages, plus third-party reviews, dominate AI citations. Wix AI Search Lab (75,000 AI answers, 1,056,727 citations across ChatGPT, Google AI Mode and Perplexity, published 2026-03-23): listicles 21.9%, articles 16.7%, product pages 13.7% of all citations; for transactional intent product pages peak at 24.88%; Perplexity uniquely draws 17% of citations from discussions/forums. Omniscient Digital (23,387 unique sources from 240 branded query prompts across ChatGPT, Perplexity, Gemini, AI Mode and AI Overviews, published 2026-01-20): Reviews & Social Proof 57%, Directory & Reference sites 17%, Product Pages & Commercial content 12%, About Us 1.92%, Home 1.82%, FAQs 0.41%.

Confidence: reported · type: data

Why it matters here: Directly contradicts the standard travel-agency content plan, which is a blog of destination guides plus a fat FAQ. For branded prompts ('is [agency] good', 'best Georgia packages from Riyadh') the citation weight sits in third-party reviews and directories, then in the commercial package page itself. FAQ pages at 0.41% are near-worthless. Build the reviewable, comparable, priced package page — and get onto third-party review surfaces — before writing another guide.

Evidence: wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms (2026-03-23, data via Peec AI); beomniscient.com/blog/content-types-cited-in-llms/ (2026-01-20). Both fetched 2026-08-22.

Source: https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms

### Semrush tracked 10M+ keywords through 2025: AI Overviews triggered on 6.49% of queries in January, peaked at 24.61% in July, and settled at 15.69% in November. Nearly 60% of AIO-triggering keywords have 100 or fewer monthly searches, and roughly 60% sit in the 21–60 Keyword Difficulty band. Tracking the same keywords before and after AIO appeared, zero-click rate fell from 33.75% to 31.53% — 'AI Overviews don't automatically increase zero-click behavior.' The study does not break out a Travel vertical.

Confidence: verified · type: data

Why it matters here: The AIO surface skews to long-tail, low-volume, mid-difficulty queries — which is precisely the '7-night Tbilisi package from Dammam in October with kids' shape a package site can own, and precisely the shape a big OTA ignores. It also means the doom narrative about AI Overviews destroying clicks is not supported by this dataset, so the strategy should be inclusion, not defence.

Evidence: semrush.com/blog/semrush-ai-overviews-study/ (January–November 2025 data). Fetched 2026-08-22.

Source: https://www.semrush.com/blog/semrush-ai-overviews-study/

### Google brought AI Overviews to the MENA region and to Arabic globally, announced 2025-05-20 at Google I/O, 'broadly available to all users in the MENA region and globally in Arabic, accessible on both mobile and desktop devices.' AI Mode subsequently rolled out across MENA (initially English) and later expanded to Arabic among 35+ additional languages. Google's share of search in the target markets remains near-total: Saudi Arabia 95.95% and UAE 95.93% (StatCounter, July 2026).

Confidence: verified · type: trend

Why it matters here: Arabic-language AI answers are live in the exact markets this site serves, so Arabic pages must be optimised for extraction, not just translated. And with ~96% Google share, there is no meaningful Bing/Yandex hedge — the technical spec can optimise single-mindedly for Google plus the AI assistants, which simplifies a lot of decisions.

Evidence: blog.google/intl/en-mena/product-updates/explore-get-answers/bringing-ai-overviews-to-mena-and-in-arabic-globally/ (2025-05-20); gs.statcounter.com/search-engine-market-share/all/saudi-arabia and .../united-arab-emirates (July 2026). All fetched 2026-08-22.

Source: https://blog.google/intl/en-mena/product-updates/explore-get-answers/bringing-ai-overviews-to-mena-and-in-arabic-globally/

### Google's hreflang rules: the first code is ISO 639-1 language and 'Google doesn't automatically derive the language from a country code'; the optional second code is ISO 3166-1 Alpha 2 region. A region code alone is invalid. Reciprocity is mandatory — 'If two pages don't both point to each other, the tags will be ignored.' x-default is the fallback for unmatched languages. Three equivalent methods: HTML link tags, HTTP Link headers, or XML sitemap xhtml:link. Separately, Google's multi-regional guidance says language subdomains 'are not used by Google to determine the target audience for the page; you must explicitly map the target audience', rates ccTLD / subdomain / subdirectory as all workable, calls URL parameters not recommended, and advises: 'Avoid automatically redirecting users from one language version of a site to a different language version.'

Confidence: verified · type: constraint

Why it matters here: Settles the architecture argument with a source. Use subdirectories on one domain (/ar/, /en/) because they are the low-maintenance option and consolidate authority; do not use ar.example.com expecting geo-signal, because Google says it gives none. Emit ar, ar-SA, ar-AE, en and x-default, all reciprocal. And never IP-redirect a Gulf visitor to /ar — Google explicitly advises against it, and it breaks the large Arabic-market English-preferring expat segment.

Evidence: developers.google.com/search/docs/specialty/international/localized-versions (last updated 2025-12-22 UTC); developers.google.com/search/docs/specialty/international/managing-multi-regional-sites (last updated 2025-12-10 UTC). Both fetched 2026-08-22.

Source: https://developers.google.com/search/docs/specialty/international/localized-versions

### Google's helpful-content guidance asks directly for first-hand travel experience: 'Does the content clearly demonstrate first-hand expertise and a depth of knowledge (for example, expertise that comes from having actually used a product or service, or visiting a place)?' It also asks 'Is it self-evident to your visitors who authored your content?', 'Is this content written or reviewed by an expert or enthusiast who demonstrably knows the topic well?', and 'Does the content provide original information, reporting, research, or analysis?' Trust is named the most important element of E-E-A-T. Google's image guidance adds that 'High-quality photos appeal to users more than blurry, unclear images', and recommends descriptive filenames, image sitemaps and primaryImageOfPage.

Confidence: verified · type: principle

Why it matters here: Google names 'visiting a place' as the canonical example of the Experience signal — travel is the vertical where E-E-A-T is most literally satisfiable. That makes a dated, bylined, own-photography trip report per package a ranking asset, not decoration. It also means the data model must carry author identity, travel date and original photos as first-class fields from day one, because retrofitting provenance is painful.

Evidence: developers.google.com/search/docs/fundamentals/creating-helpful-content (last updated 2025-12-10 UTC); developers.google.com/search/docs/appearance/google-images (last updated 2026-03-02 UTC). Both fetched 2026-08-22.

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### Google's spam policies define doorway abuse as pages 'created to rank for specific, similar search queries' that 'lead users to intermediate pages that are not as useful as the final destination', explicitly listing 'multiple domain names or pages targeted at specific regions or cities that funnel users to one page' and 'creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy'. Scaled content abuse is 'many pages are generated for the primary purpose of manipulating search rankings and not helping users'. These policies (scaled content abuse, site reputation abuse, expired domain abuse) were introduced March 2024 and enforced through 2024–2025.

Confidence: verified · type: constraint

Why it matters here: This is the exact line a destination × month × traveller-type page factory crosses. The defensible version of programmatic SEO here is not 'unique paragraph per page' but 'each page resolves to a different real answer' — different real departure dates, different real prices, different photos, different visa facts. The doc needs a machine-checkable completeness gate before a generated page is allowed into the sitemap.

Evidence: developers.google.com/search/docs/essentials/spam-policies, last updated 2026-05-15 UTC. Fetched 2026-08-22.

Source: https://developers.google.com/search/docs/essentials/spam-policies

### Cloudflare's analysis of its network found roughly 80% of AI crawler traffic is for training, with user-action and search purposes each under 5%. Crawl-to-refer ratios in early August 2025: Anthropic ~50,000:1, OpenAI 887:1, Perplexity 118:1 network-wide; for News & Publications specifically Anthropic 2,500:1, OpenAI 152:1, Perplexity 32.7:1. Cloudflare publishes no travel/tourism/hospitality breakdown.

Confidence: verified · type: data

Why it matters here: Quantifies the actual bargain: AI crawlers take far more than they send back, and the majority of their crawling is not the retrieval traffic that produces citations. For a travel business the honest framing is that allowing retrieval bots (OAI-SearchBot, PerplexityBot) is a cheap discovery bet, while allowing training crawlers is a separate judgement call with no measured return. Absence of a travel breakdown is itself a gap worth noting.

Evidence: blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/, published 2025-08-28. Fetched 2026-08-22.

Source: https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/

### Phocuswright research reported that 56% of U.S. leisure travellers used AI for at least one trip in 2026, up from 43% nine months earlier; 42% used generative AI to build an itinerary, 31% to search flights and hotels, 28% used chatbots on booking sites; 74% of Millennials and 72% of Gen Z used AI for at least one trip; 44% said they would book directly inside an AI platform. This is a U.S. leisure sample — no equivalent GCC-sample study was found.

Confidence: reported · type: data

Why it matters here: Directionally justifies treating answer engines as a primary acquisition channel rather than an experiment, and justifies designing package pages to survive being read by a machine and re-narrated to a traveller. But the geography mismatch is real and must be flagged in the master doc: do not present U.S. figures as Gulf behaviour. Primary Phocuswright/PhocusWire pages returned HTTP 403 to direct fetch, so this rests on secondary reporting.

Evidence: Reported via phocuswire.com/ai-surge-us-behavioral-shift-travel-phocuswright-research-2026 and insidertravelreport.com/new-phocuswright-survey-finds-most-us-travelers-now-use-ai-for-trips, citing Phocuswright 'The AI Surge: Travel's Fastest Behavioral Shift in a Decade' (2026). Direct fetch of both phocuswire.com and phocuswright.com returned 403 on 2026-08-22.

Source: https://www.phocuswire.com/ai-surge-us-behavioral-shift-travel-phocuswright-research-2026

### Arabic search behaviour differs from Latin-script search in ways that break naive translation: users query in regional dialect rather than Modern Standard Arabic (the cited example is Gulf 'kanaba' كنبة versus formal 'arika' أريكة), and Arabizi / Franco-Arabic — Arabic written in Latin letters with numerals for missing sounds — is documented across the Gulf, especially among younger and bilingual users. NO SOURCED FIGURE FOUND for the share of Gulf travel queries in dialect, in Arabizi, or in Arabic versus English; the available sources make these claims without data.

Confidence: inferred · type: pattern

Why it matters here: The design consequence survives the weak sourcing: a page must be findable under several surface forms of the same entity. That argues for visible bilingual and transliterated entity naming (Tbilisi / تبليسي / Tiblisi), for a search box that tolerates Arabizi input, and for treating Arabic keyword research as a first-party research task using post-launch Search Console query data rather than trusting Western keyword tools. It also means the master doc should NOT quote a dialect statistic, because none is verifiable.

Evidence: contentech.com/arabic-seo-in-2025-why-most-brands-are-still-getting-it-wrong/ (2026-05-14) — fetched and found to contain no citations or statistics; emergingssoftware.com/blog/arabic-seo-guide-2025-optimize-your-website-now/. Treat as practitioner opinion, not evidence.

Source: https://contentech.com/arabic-seo-in-2025-why-most-brands-are-still-getting-it-wrong/

### Next.js App Router provides the primitives needed for all of the above natively: alternates.canonical and alternates.languages in the metadata object emit link rel=canonical and hreflang tags; sitemap.ts supports per-URL alternates.languages (emitting xhtml:link hreflang), images and videos arrays; generateSitemaps splits large sitemaps with Google's 50,000-URL-per-file limit; opengraph-image.tsx with ImageResponse generates per-package OG images at 1200×630. Docs version 16.3.2, sitemap doc lastUpdated 2026-08-18.

Confidence: verified · type: pattern

Why it matters here: There is no need for a third-party SEO package. The master doc can specify exact file conventions — app/sitemap.ts, app/robots.ts, app/[locale]/packages/[slug]/opengraph-image.tsx — so every future build session has one canonical place for each concern rather than reinventing it.

Evidence: nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (v16.3.2, lastUpdated 2026-08-18); nextjs.org/docs/app/getting-started/metadata-and-og-images (lastUpdated 2026-06-01); nextjs.org/docs/app/api-reference/functions/generate-metadata (lastUpdated 2026-08-19). Fetched 2026-08-22.

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

## Design implications

- RENDERING CONTRACT (non-negotiable): every package, destination, itinerary and review page is server-rendered — static via generateStaticParams, or ISR with revalidate — never client-fetched from Supabase. Rationale is doubled: AI crawlers do not execute JavaScript (Vercel), and Google names client-side HTML rendering as a direct INP cost (web.dev). Client components are permitted only for genuinely interactive controls (date picker, traveller counter, filter chips) that hydrate over already-rendered HTML.
- NEXT.JS METADATA GUARD: because HTML_LIMITED_BOT_UA_RE excludes GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot and PerplexityBot, either (a) keep all indexable routes prerendered so streaming metadata never applies, or (b) set htmlLimitedBots in next.config.ts to a regex extending the default with those user agents. Add a CI check that curls a package URL with a GPTBot user agent and fails the build if <title> or <link rel=canonical> is absent from <head>.
- JSON-LD GRAPH PER PACKAGE PAGE, generated from the same Supabase row that renders the page: a single @graph containing (1) Product — name, description, image[] (own photos), brand→Organization, offers→AggregateOffer{lowPrice, highPrice, priceCurrency, offerCount, availability, priceValidUntil, url} for multi-departure packages or Offer{price, priceCurrency, availability, priceValidUntil} for a single departure; (2) aggregateRating{ratingValue, reviewCount} attached to the Product, never to the agency; (3) TouristTrip — itinerary as ItemList of TouristAttraction/Place, touristType, departureTime, arrivalTime, tripOrigin (Riyadh/Jeddah/Dubai), provider→Organization, offers; (4) BreadcrumbList with position/name/item, last item's item omitted. Use ISO 4217 codes SAR/AED/USD per locale.
- REVIEW ELIGIBILITY RULE: aggregateRating and Review nodes attach to the package Product only. The TravelAgency/Organization node carries no rating. Reviews must be real, non-incentivised, authored by named travellers with dates, and rendered visibly on a crawlable /packages/[slug]/reviews route — not injected by a third-party widget, and never marked up if not visible.
- URL + I18N ARCHITECTURE: one domain, subdirectory locales — /ar/… and /en/…. Emit hreflang for ar, ar-SA, ar-AE, en and x-default, reciprocally, from BOTH alternates.languages in generateMetadata and alternates.languages in sitemap.ts. No IP or Accept-Language auto-redirect; ship a persistent, visible language + currency switcher that changes the URL. Store locale in the URL, not in a cookie.
- PROGRAMMATIC PAGE GATE: destination × month and destination × traveller-type routes are generated only when the row passes a completeness score — at minimum a real price for that month, ≥1 real departure date, ≥3 first-party photos, ≥1 dated first-hand note, and locale-specific visa/entry facts. Pages below the threshold return noindex and are excluded from sitemap.ts. Store the score as a column so the gate is queryable and auditable, and log every page that flips state.
- STALENESS AS A FIRST-CLASS FIELD: every generated page carries last_verified_at, rendered visibly ('Prices verified 12 August 2026') and mirrored into offers.priceValidUntil. A scheduled job flags anything past its window and demotes it to noindex. Stale prices and dead departures are the main way travel programmatic SEO decays into thin content.
- E-E-A-T DATA MODEL: Supabase tables for author (name, bio, credentials, photo, sameAs URLs incl. instagram.com/sara_dhaouadi_official), trip_report (author_id, package_id, travel_date, body, photos[]), and a join so every package page renders a dated byline — 'Visited by <name>, March 2026' — plus original photos. Google's own example of first-hand experience is 'visiting a place'; make that machine-visible via Person + Review and human-visible above the fold of the itinerary.
- IMAGE PIPELINE: original photography only, stored in Supabase Storage with descriptive slugged filenames (tbilisi-old-town-sunset.jpg, not IMG_2043.jpg), served through next/image with srcset, bilingual alt text, primaryImageOfPage set, and every image URL emitted into sitemap.ts's images array. Reserve stock only for placeholder states that never ship.
- LCP CONTRACT: one hero image per page, present in the initial HTML with src/srcset, fetchpriority="high", no loading="lazy", no above-the-fold carousel. Budget TTFB ≈40% of the 2.5s LCP target (≈1.0s), which for Gulf visitors means Vercel edge caching and ISR rather than per-request Supabase queries on the critical path.
- INP CONTRACT: the results list renders server-side; filters update via URL search params and server re-render or a transition, not a client re-render of 40 card components. Apply content-visibility:auto to below-fold cards, keep DOM node count deliberately low, and split any long handler (price recalculation, availability lookup) so no task blocks past the 200ms budget.
- ANSWER BLOCK PATTERN on every destination and package page: an H2 phrased as the real question, immediately followed by a 40–60 word direct answer in plain prose, then the supporting table. This is the structure LLM citation studies find extractable, and it doubles as the featured-snippet shape. Name entities in full and unambiguously — 'Tbilisi, Georgia' not 'the city' — and repeat the departure city, because tripOrigin is the disambiguator that makes this site's answer different from a generic one.
- COMPARISON TABLES AS A CONTENT PRIMITIVE: at least one real table per destination page — package price vs. self-booked component cost, month-by-month price and weather, what's included vs. excluded with line-item prices. Listicle and comparison structures are the most-cited content shape across ChatGPT, AI Mode and Perplexity; tables also survive being read aloud by an assistant.
- ROBOTS POLICY, written explicitly in the doc with reasoning: allow Googlebot, Google-Extended, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot and Bingbot. GPTBot (training-only) is the sole genuine opt-out decision and should be a deliberate business call. Never blanket-block — blocking OAI-SearchBot removes the site from ChatGPT search answers per OpenAI's own docs. Add <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"> since max-snippet limits directly throttle AI Overview inclusion.
- ORGANIZATION / TRUST NODE on the home page or a single About page: Organization (or TravelAgency) with legalName, logo, url, name, description, address (PostalAddress), contactPoint, telephone, email, sameAs (Instagram, TikTok, YouTube, Google Business Profile), foundingDate, and the commercial licence / VAT identifier via vatID or iso6523Code. For a money-adjacent transaction in the Gulf, visible licence number, physical address and a named human are trust signals for both raters and buyers.
- FILE CONVENTIONS, fixed once: app/sitemap.ts (with generateSitemaps splitting at 50,000 URLs and alternates.languages per entry), app/robots.ts, app/[locale]/…/opengraph-image.tsx generating a per-package 1200×630 card with destination, nights, price and the departure city rendered in Arabic and English. Shared links are a discovery channel; every share should look designed.
- MEASUREMENT: field CWV at p75 from CrUX / Vercel Speed Insights (not lab Lighthouse) as the pass/fail gate; Search Console for Arabic vs English query data — that is the only reliable source for real Gulf dialect and Arabizi query forms, so treat the first 90 days post-launch as the Arabic keyword research phase; and a Supabase bot_hits table logging user-agent, path and status for AI crawlers, so 'did GPTBot receive rendered HTML for this package?' is answerable with data rather than assumption.
- THIRD-PARTY SURFACE STRATEGY: because reviews, directories and forums carry the majority of AI citation weight for branded queries, budget explicit work for Google Business Profile completeness, presence on regional travel directories, and genuine participation where Gulf travellers discuss trips. The site cannot be the only place the brand exists; AI engines cite the ecosystem, not just the domain.

## Anti-patterns to refuse

- Pasting a generator's TouristTrip + FAQPage + HowTo JSON-LD blob onto every page and calling it 'schema done'. None of those three produce a Google rich result: HowTo was removed in 2023, FAQ stopped rendering on 7 May 2026, and TouristTrip has never been in the supported-features gallery. This is busywork that looks like technical SEO and returns nothing on the SERP.
- Attaching aggregateRating to the agency's Organization/LocalBusiness node using reviews collected on the agency's own site or an embedded widget. Google explicitly rules this ineligible for the star review feature and it invites a structured-data manual action. Generic templates do this on the homepage by default.
- Auto-translating the English site into Modern Standard Arabic, flipping direction, and shipping it as 'the Arabic site'. Gulf travellers query in dialect and in Arabizi; MSA-translated keyword targets can have effectively no search demand, and the page then ranks for nothing in either language.
- Auto-redirecting visitors to /ar based on IP or Accept-Language. Google explicitly advises against automatic language redirection, it strands crawlers on one locale, and it actively harms the large English-preferring expat and bilingual segment in the UAE and Saudi Arabia.
- Spinning up thousands of [city] × [month] pages from one template with only the city name swapped. This is the textbook definition Google gives for doorway abuse — 'substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy' — and scaled content abuse. The failure is not the automation, it is generating a page before there is a distinct real answer to put on it.
- Fetching the package catalogue from Supabase in the browser. AI crawlers do not run JavaScript, so the entire product line becomes invisible to ChatGPT, Claude and Perplexity, and Google's own INP guidance names client-side HTML rendering as a presentation-delay cost. Generic React travel templates do exactly this.
- Shipping a 5-slide full-bleed hero carousel above the fold, then 'optimising' it by lazy-loading the images. Never lazy-load the LCP image — Google states this always adds unnecessary load delay. The carousel is a double loss: it wrecks LCP and it is the single most template-identifying element on the internet.
- Writing an llms.txt and treating it as the AI-visibility deliverable. 97% of published llms.txt files received zero requests in Ahrefs' 137,210-domain study, and no major AI provider has confirmed reading it. It is the 2026 equivalent of the keywords meta tag.
- Blanket-blocking AI crawlers in robots.txt as a content-protection reflex. That removes the site from ChatGPT search answers (OpenAI's own docs are explicit) while achieving nothing against training data the models already have. Equally naive in the other direction: blocking Google-Extended believing it opts you out of AI Overviews — Google states it does not.
- Stock photography of generic turquoise water and camel silhouettes. It supplies zero first-hand-experience signal — Google's canonical Experience example is literally 'visiting a place' — and it is the same image library every competitor bought from, so the site looks interchangeable in exactly the moment a traveller is deciding who to trust with a deposit.
- Putting Product markup on the /packages listing page. Product rich results only support pages focused on a single product or its variants; category pages are ineligible, and marking them up is a policy violation rather than a near-miss.
- Publishing anonymous, undated content — no byline, no author bio, no travel date, no 'last verified'. It fails Google's 'Is it self-evident to your visitors who authored your content?' test, fails the first-hand-experience test, and gives answer engines no recency or authorship signal to cite.
- Building a 30-question FAQ page to chase rich results. FAQ pages accounted for 0.41% of AI citations in the Omniscient dataset and can no longer render as a rich result. Answer real questions inside the pages where the decision is being made instead.
- Splitting Arabic onto ar.example.com for 'geo-targeting'. Google states language subdomains give it no audience signal, and a non-reciprocal hreflang set is ignored entirely — so the split costs authority consolidation and buys nothing.

## Differentiation moves

- A provenance layer, not a blog: every package carries a dated, bylined first-hand trip report with the operator's own photography and the author's sameAs pointing to instagram.com/sara_dhaouadi_official. Google's canonical example of the Experience signal is 'visiting a place'; almost no MENA package site renders that as structured, dated, attributed content. It is simultaneously the hardest thing for a template competitor to fake and the most human thing on the page.
- Publish original price data as a citable asset — 'What a 7-night Tbilisi package actually cost from Riyadh, month by month, 2024–2026' — as a real table with methodology. Original data and comparison tables are the highest-leverage citation shapes across ChatGPT, AI Mode and Perplexity, and no competitor can copy a dataset you generated from your own bookings.
- Trilingual entity naming as a visible design element: every destination renders its name in Arabic script, Latin script, and the common Arabizi/transliteration variant, styled as a deliberate typographic lockup rather than hidden keyword text. It solves a real retrieval problem (the same traveller may type تبليسي, Tbilisi, or Tiblisi) and it looks like nothing else on the market.
- A 'package anatomy' component: an itemised, priced breakdown of what is included and excluded, rendered as a real table in HTML. Humans screenshot it because it is the honest answer to 'what am I actually paying for'; LLMs quote it because it is a clean claim-evidence structure; competitors avoid it because opacity is their margin.
- Design one deliberately screenshot-shaped card per page — a single-frame 'Best months for Georgia from Riyadh' or 'Visa-free for GCC residents' card carrying the handle — so the site's own answer blocks become the shareable social object. This is the mechanism that turns organic reach into links rather than buying them, and it is native to how a social-first operator already works.
- Hijri-calendar-native seasonality: Ramadan, Eid al-Fitr, Eid al-Adha and Gulf school-holiday pages, recalculated and re-verified each year with a visible verification date. Western-built travel templates key everything to Gregorian summer. This is a durable content moat that is genuinely more useful to the actual audience.
- A public 'package vs. do-it-yourself' calculator per destination, computed server-side so the resulting numbers exist in the HTML rather than only in a client bundle. It makes the site quotable by assistants, it answers the objection that kills package sales, and it is a defensible reason to link.
- Treat the review corpus as an indexable product surface: /packages/[slug]/reviews with real names, dates, photos and Review markup on the Product node. Reviews and social proof were the single largest AI citation class for branded prompts; most agencies bury reviews inside a JS widget where no crawler can read them.
- Per-package generated OG images via ImageResponse carrying destination, nights, departure city and price in both scripts. Every WhatsApp forward — the dominant sharing channel in the Gulf — then renders as a designed card instead of a grey link, which is a discovery channel that costs one file to build.
- Publish a visible 'how we verify' page: where prices come from, when they were last checked, who visited, what changed. It is a trust artifact (Trust is the most important E-E-A-T element), an AEO artifact (explicit methodology is what makes claims citable), and a differentiator precisely because opacity is the industry norm.

## Open questions

- No sourced figure was found for the share of Gulf travel queries issued in Arabic vs English, in dialect vs MSA, or in Arabizi. This must be answered with first-party Search Console query data in the first 90 days post-launch rather than assumed — and no such statistic should be quoted in the master doc until then.
- Whether Google meaningfully differentiates ar-SA from ar-AE when the Arabic content is identical, or whether the extra alternates only add duplicate-content surface. No primary source found. Suggest launching with ar + en + x-default, then adding ar-SA/ar-AE only if Search Console shows country-level mismatch.
- Cloudflare publishes no AI-crawler breakdown for the travel/tourism/hospitality vertical, so crawl-to-refer economics for a travel site specifically are unknown. Instrument first-party bot logs and measure it directly.
- No study was found on whether AI Mode and AI Overviews in Arabic cite the same source mix as in English, or whether Arabic answers lean harder on a small set of regional publishers. This materially affects whether third-party placement or owned content is the better first investment in Arabic.
- The Phocuswright AI-adoption figures are U.S. leisure travellers. No GCC-sample equivalent was found. Treat the direction as real and the magnitude as unverified for this audience.
- Whether Google's structured-data carousel Early Adopters Program will open to travel or tour content — currently the Carousel rich result covers only Course list, Movie, Recipe and Restaurant, so ItemList on a packages grid has no visual payoff today.
- Whether ChatGPT, Perplexity or Gemini actually weight TouristTrip JSON-LD when selecting or grounding an answer. Google states no special schema is needed for its AI features; no primary source confirms or denies weighting by the other engines. Emit it — it is cheap — but do not budget against a promised return.
- Whether allowing GPTBot (training-only, no referral path) has any measurable downstream benefit for a travel brand, or whether the sensible policy is allow-retrieval / block-training. No data found either way; this is a business judgement to record with a date and revisit.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — Core Web Vitals as of 2026 are LCP/INP/CLS; INP became stable in 2024 replacing FID; thresholds LCP ≤2.5s/>4.0s, INP ≤200ms/>500ms, CLS ≤0.1/>0.25 at the 75th percentile segmented mobile/desktop.

web.dev/articles/vitals verbatim: 'INP became a stable Core Web Vital metric in 2024' and 'a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.' Good thresholds 2.5s / 200ms / 0.1 confirmed on that page. CAVEAT ON SOURCING: the cited page states only the GOOD thresholds. The poor cutoffs (>4.0s, >500ms, >0.25) are not on web.dev/articles/vitals — they come from web.dev/articles/defining-core-web-vitals-thresholds and the CrUX/Search Console classification, which also adds a detail the researcher omitted: CrUX grades on a 28-day rolling window. https://web.dev/articles/vitals ; https://web.dev/articles/defining-core-web-vitals-thresholds ; https://support.google.com/webmasters/answer/9205520

### CONFIRMED — Google says 'no single signal' for page experience but confirms 'Core Web Vitals are used by our ranking systems'; framed as a tiebreaker.

Fetched directly. Verbatim: 'There is no single signal. Our core ranking systems look at a variety of signals that align with overall page experience.' / 'Core Web Vitals are used by our ranking systems. We recommend site owners achieve good Core Web Vitals for success with Search.' / 'for many queries, there is lots of helpful content available. Having a great page experience can contribute to success in Search, in such cases.' Last updated 2025-12-10 UTC. https://developers.google.com/search/docs/appearance/page-experience

### CONFIRMED — LCP sub-part budgets TTFB ~40%, resource load delay <10%, load duration ~40%, render delay <10%; LCP resource must be discoverable in HTML; fetchpriority="high" on hero img; 'Never lazy-load your LCP image...'

All four budget percentages confirmed. Verbatim: 'Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay, and will have a negative impact on LCP.' Discoverability phrasing is actually about the preload scanner: 'it's critical that the resource is discoverable in the initial HTML document response by the browser's preload scanner.' fetchpriority guidance confirmed ('It's a good idea to set fetchpriority="high" on an <img> element if you think it's likely to be your page's LCP element'); the 'not on several images at once' warning was not surfaced in the fetch — treat that sub-clause as unverified. Last updated 2025-03-31. https://web.dev/articles/optimize-lcp

### CONFIRMED — Google's INP guidance names client-side HTML rendering as a cause of presentation delay and recommends minimising DOM size, content-visibility, yielding, avoiding layout thrashing.

Verbatim: 'by rendering HTML with JavaScript on the client, you not only get the cost of the JavaScript processing to create that HTML, but also the browser will not yield until it has finished parsing that HTML, and rendering it.' All four remedies confirmed present. Last updated 2025-09-02. https://web.dev/articles/optimize-inp

### STALE — Google's FAQ structured data documentation NOW carries the notice 'This feature will no longer appear in Google Search starting May 7, 2026'; the August 2023 announcement limited HowTo and restricted FAQ rich results to news, government and health/medical sites.

Three errors. (1) STALE: the notice is no longer on the FAQ doc — Google DELETED the page. Search Central changelog, 2026-06-15: 'Removed documentation for the FAQ rich result feature… The FAQ rich result feature is no longer shown in Google Search results, as announced in the changelog entry in May 2026.' The notice existed only between 2026-05-08 and 2026-06-15. (2) WRONG CATEGORIES: the Aug 2023 restriction was to 'well-known, authoritative government and health websites' — 'news' was never in it. (3) HowTo TIMELINE WRONG: 8 Aug 2023 restricted HowTo to DESKTOP ONLY; full removal came 14 Sept 2023: 'Removed the How-to structured data documentation, as this rich result is no longer shown in search results, on both desktop and mobile devices.' Also note Search Console API dropped FAQ support in August 2026. The load-bearing conclusion (no FAQ or HowTo rich result exists) survives intact. https://developers.google.com/search/updates ; https://developers.google.com/search/blog/2023/08/howto-faq-changes ; https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/

### CONFIRMED — The complete supported structured-data gallery is the named 25 features; TouristTrip, TouristAttraction, TouristDestination and Trip are NOT on it.

Fetched the gallery twice with different prompts; the second, verbatim-list prompt returned exactly the 25 names claimed, in order, with no tourist types. Last updated 2026-06-15 UTC. Two watch-items the researcher did not flag: Dataset is still listed but a Nov 2025 changelog entry marked it for removal from Search; and Book actions was retired in June 2025 then un-deprecated in Nov 2025 and lives outside the gallery listing. Neither affects travel. https://developers.google.com/search/docs/appearance/structured-data/search-gallery

### CONFIRMED — schema.org/TouristTrip is in the 'new' (non-stable) area; properties are touristType plus Trip's itinerary, arrivalTime, departureTime, offers, provider, partOfTrip, subTrip, tripOrigin.

Fetched schema.org/TouristTrip. Status notice verbatim: 'This term is in the "new" area - implementation feedback and adoption from applications and websites can help improve our definitions.' All eight inherited properties and touristType confirmed with the stated expected types. https://schema.org/TouristTrip

### PARTIALLY_TRUE — Product structured data requires name plus one of review/aggregateRating/offers; AggregateOffer with lowPrice, highPrice, priceCurrency, offerCount; 'product rich results only support pages that focus on a single product'.

Core requirement and the single-product restriction confirmed verbatim: 'Currently, product rich results only support pages that focus on a single product (or multiple variants of the same product)' — a category page such as 'shoes in our shop' is explicitly ineligible. CORRECTION: the researcher flattens AggregateOffer's four properties into one recommended bundle. Google splits them — lowPrice and priceCurrency are REQUIRED for AggregateOffer; highPrice and offerCount are only recommended. Last updated 2025-12-10 UTC. https://developers.google.com/search/docs/appearance/structured-data/product-snippet

### CONFIRMED — Google bars star review snippets where the reviewed entity controls its own reviews on LocalBusiness/Organization, including via embedded widgets; Review and AggregateRating required properties as listed.

Strongest and most decision-changing claim in the set, and it holds verbatim: 'If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature' — with the widget clause spelled out: 'either directly in their structured data or through an embedded third-party widget (for example, Google Business reviews or Facebook reviews widget).' Required properties confirmed, plus one the researcher omitted: itemReviewed.name (or the parent item's name) is also required. Last updated 2026-07-24 UTC. https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### CONFIRMED — Carousel rich results support only Course list, Movie, Recipe and Restaurant; broader structured data carousels are an Early Adopters Program beta; ItemList needs ≥2 same-type ListItems, position, url, same domain.

All four types confirmed, Early Adopters Program section confirmed present ('Structured data carousels (beta)'), and the same-domain rule verbatim: 'All URLs in the list must be unique, but live on the same domain (the same domain or sub/super domain as the current page).' Last updated 2025-12-10 UTC. https://developers.google.com/search/docs/appearance/structured-data/carousel

### CONFIRMED — Structured data must describe visible content; violations trigger manual actions that remove rich-result eligibility without affecting web ranking; correct markup never guarantees a rich result.

Verbatim: 'Don't mark up content that is not visible to readers of the page.' / manual action means 'a page loses eligibility for appearance as a rich result; it doesn't affect how the page ranks in Google web search.' / 'Google does not guarantee that your structured data will show up in search results, even if your page is marked up correctly.' Last updated 2026-07-10 UTC. https://developers.google.com/search/docs/appearance/structured-data/sd-policies

### PARTIALLY_TRUE — Google says no additional requirements, no machine-readable/AI files, no special schema for AI Overviews/AI Mode; eligibility = indexed and snippet-eligible; Google-Extended does NOT remove a page from AI Overviews or AI Mode.

The three quotes are verbatim and confirmed, as is the eligibility rule ('indexed and eligible to be shown in Google Search with a snippet') and the nosnippet/data-nosnippet/max-snippet/noindex controls. Last updated 2025-12-10 UTC (researcher gave no date). CORRECTION ON GOOGLE-EXTENDED: the ai-features page does not make that statement. It is an inference from the crawler doc, which says 'Google-Extended does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search' and scopes it to 'training future generations of Gemini models' plus grounding in Gemini Apps and Vertex AI. Neither page mentions AI Overviews or AI Mode by name. The inference is sound but should be labelled as inference, not as Google's stated position. https://developers.google.com/search/docs/appearance/ai-features ; https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers

### PARTIALLY_TRUE — Ahrefs: 137,210 domains, 28% published llms.txt, 97% got zero requests, ~22,000 total requests, AI bots 19.5%, AI retrieval bots 1.1% of AI bot requests. Mueller said no AI service uses it.

Sample, 28%, 97%, ~22K requests and 19.5% all confirmed verbatim for May 2026 data. CORRECTION ON THE 1.1%: the researcher states retrieval bots were '1.1% of AI bot requests.' The study's own breakdown — AI agents/infrastructure 10.5%, training crawlers 5.3%, assistants 2.5%, retrieval bots 1.1%, summing to ~19.4% ≈ the 19.5% AI-bot total — shows these are shares of ALL llms.txt requests, not shares of the AI-bot subset. Stated as '% of AI bot requests' the figure understates by roughly 5x. The Mueller statement is corroborated only by secondary reporting (he compared llms.txt to the keywords meta tag and said no AI service uses it and bots don't request it); no primary post was located. https://ahrefs.com/blog/llmstxt-study/

### CONFIRMED — No major AI crawler executes JavaScript. Vercel: ChatGPT fetches JS in 11.50% of requests, Claude 23.84%, neither executes; Gemini and AppleBot render. GPTBot 569M/mo, Claude 370M, PerplexityBot 24.4M vs Googlebot 4.5B; 404 rates 34.82%/34.16% vs 8.22%.

Every figure verified against the Vercel post — but the post is dated 17 December 2024, making the volumes 20 months stale as of 2026-08-22 (Botify has since reported OpenAI tripled its crawl). The researcher flagged the volumes but presented the no-JS finding as current, so I attacked that specifically: it survives. Independent 2026 sources confirm none of GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Meta-ExternalAgent or Bytespider render JS as of mid-2026, with Googlebot/Gemini the exception and Bingbot partial. Treat volumes and 404 rates as historical; treat the no-JS architecture constraint as live. https://vercel.com/blog/the-rise-of-the-ai-crawler ; https://searchoptimo.com/blog/do-ai-crawlers-render-javascript (2026-06-28) ; https://www.searchviu.com/en/ai-crawlers-javascript-rendering/

### CONFIRMED — Next.js streams metadata to <body> for dynamic pages; blocking <head> metadata only for bots matched by HTML_LIMITED_BOT_UA_RE, which excludes GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot and PerplexityBot.

Read both the doc (v16.3.2, lastUpdated 2026-08-19) and the source regex. Doc verbatim: 'When generateMetadata resolves, the resulting metadata tags are appended to the <body> tag.' Regex verbatim: /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i — confirming no AI crawler is listed. TWO NOTES. Pedantic: 'covers Google crawlers' is loose — the alternation requires a hyphen, so hyphenated agents (Google-InspectionTool, Storebot-Google) match but the literal token 'Googlebot' does not; that is deliberate, since Googlebot renders JS. Material: the researcher MISSED the fix — the doc documents an htmlLimitedBots config key, and 'htmlLimitedBots: /.*/' fully disables streaming metadata. https://nextjs.org/docs/app/api-reference/functions/generate-metadata ; https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/html-bots.ts

### PARTIALLY_TRUE — OpenAI runs THREE distinct crawlers: OAI-SearchBot, GPTBot, ChatGPT-User, with the quoted descriptions.

All three quotes verified verbatim, including 'Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers' (the doc adds 'though can still appear as navigational links' — the researcher truncated this) and 'ChatGPT-User is not used to determine whether content may appear in Search.' CORRECTION: the count is wrong. A second fetch asking for the complete list returned FOUR documented user agents — the three above plus OAI-AdsBot, 'used to validate the safety of web pages submitted as ads on ChatGPT.' A robots.txt written against a three-bot model will be incomplete. https://developers.openai.com/api/docs/bots

### CONFIRMED — Wix AI Search Lab (75,000 answers, 1,056,727 citations, 2026-03-23) listicles 21.9% / articles 16.7% / product pages 13.7%, transactional product pages 24.88%, Perplexity discussions 17%; Omniscient Digital (23,387 sources, 240 branded prompts, 2026-01-20) Reviews 57% / Directories 17% / Product 12% / About 1.92% / Home 1.82% / FAQs 0.41%.

I expected these to be fabricated and fetched both in full. Every number matches, including the 1,056,727 citation count, the 24.88% transactional figure (described as 82.1% above average) and all six Omniscient percentages. Two scope caveats the researcher should carry forward: Perplexity discussions are 17.35% versus a 7.52% cross-model average, and — more importantly — the Omniscient 57% is specifically 'of branded query citations', a narrower population than 'AI citations' generally, so it cannot be read as evidence about unbranded travel discovery. https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms ; https://beomniscient.com/blog/content-types-cited-in-llms/

### CONFIRMED — Semrush 10M+ keywords 2025: AIO triggered on 6.49% (Jan), 24.61% (Jul peak), 15.69% (Nov); ~60% of AIO keywords have ≤100 monthly searches and ~60% sit at KD 21–60; zero-click fell 33.75% → 31.53%; no Travel vertical.

All figures confirmed against the study, including the counter-intuitive zero-click decline. Two additions: the zero-click analysis uses a 200K+ keyword subset (not the full 10M) and the industry analysis an 11K-domain subset, so the sample sizes are not uniform across findings. Absence of a Travel breakdown confirmed — the industry cuts are Science, Computers & Electronics, People & Society, Food & Drink, Health, Real Estate, Shopping and others. https://www.semrush.com/blog/semrush-ai-overviews-study/

### CONFIRMED — AI Overviews came to MENA and Arabic globally 2025-05-20; AI Mode subsequently rolled out across MENA (English) then Arabic among 35+ languages; Google share Saudi 95.95% / UAE 95.93% (StatCounter July 2026).

Google blog confirmed, dated 2025-05-20, verbatim: 'broadly available to all users in the MENA region and globally in Arabic, accessible on both mobile and desktop devices' — but that post says nothing about AI Mode, so the AI Mode half rests on separate sources. Those check out: AI Mode launched in English across MENA in August 2025, and Modern Standard Arabic arrived in the October 2025 expansion of 35–36 languages. StatCounter July 2026 confirmed directly for both markets (Saudi 95.95%; UAE 95.93%, with Bing second at 2.47%). IMPORTANT NUANCE THE RESEARCHER MISSED: AI Mode's Arabic is Modern Standard Arabic (Fus'ha), which sits in direct tension with claim 25's dialect argument. https://blog.google/intl/en-mena/product-updates/explore-get-answers/bringing-ai-overviews-to-mena-and-in-arabic-globally/ ; https://gs.statcounter.com/search-engine-market-share/all/saudi-arabia ; https://gs.statcounter.com/search-engine-market-share/all/united-arab-emirates

### CONFIRMED — hreflang: ISO 639-1 language first, optional ISO 3166-1 Alpha 2 region; region alone invalid; Google doesn't derive language from country code; reciprocity mandatory; x-default; three methods. Multi-regional: subdomains not used to infer audience, ccTLD/subdomain/subdirectory all workable, parameters not recommended, avoid auto-redirect.

Verbatim: 'You can't specify the country code by itself. The first code stands for the language and Google doesn't automatically derive the language from a country code.' and 'If two pages don't both point to each other, the tags will be ignored. This is so that someone on another site can't arbitrarily create a tag naming itself as an alternative version of one of your pages.' x-default and the three implementation methods (HTML link tags, HTTP Link headers, XML sitemap) all confirmed. Last updated 2025-12-22 UTC. https://developers.google.com/search/docs/specialty/international/localized-versions

### CONFIRMED — Helpful-content guidance asks for first-hand experience including 'visiting a place', self-evident authorship, expert/enthusiast review, original information; Trust is the most important E-E-A-T element. Image guidance: 'High-quality photos appeal to users more than blurry, unclear images', descriptive filenames, image sitemaps, primaryImageOfPage.

All four self-assessment questions confirmed verbatim, including the travel-specific parenthetical '(for example, expertise that comes from having actually used a product or service, or visiting a place)'. E-E-A-T hierarchy confirmed: 'Of these aspects, trust is most important.' Last updated 2025-12-10 UTC. Image guidance confirmed verbatim, including the filename example (my-new-black-kitten.jpg over IMG00023.JPG), image sitemaps and the primaryImageOfPage recommendation. Last updated 2026-03-02 UTC. https://developers.google.com/search/docs/fundamentals/creating-helpful-content ; https://developers.google.com/search/docs/appearance/google-images

### CONFIRMED — Spam policies define doorway abuse and scaled content abuse as quoted; scaled content abuse, site reputation abuse and expired domain abuse were introduced March 2024.

Definitions confirmed verbatim, including 'Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page' and 'Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy'. Scaled content abuse verbatim as quoted, with the explicit generative-AI example: 'Using generative AI tools or other similar tools to generate many pages without adding value.' All three named policies present. Last updated 2026-05-15 UTC. The one sub-clause I could not surface verbatim is 'lead users to intermediate pages that are not as useful as the final destination' — treat as unverified phrasing, though the substance is present. https://developers.google.com/search/docs/essentials/spam-policies

### PARTIALLY_TRUE — Phocuswright: 56% of U.S. leisure travellers used AI for a trip in 2026, up from 43% nine months earlier; 42% built an itinerary with genAI, 31% searched flights/hotels, 28% used booking-site chatbots; Millennials 74%, Gen Z 72%; 44% would book inside an AI platform.

MISATTRIBUTION FOUND. Confirmed as Phocuswright: 56% (from 'The AI Surge: Travel's Fastest Behavioral Shift in a Decade'), the 43% prior figure, Millennials 74% / Gen Z 72%, and 44% willing to book directly through an AI platform (plus 40% who would let an AI assistant arrange flights and hotels — omitted by the researcher). NOT PHOCUSWRIGHT: the 42% / 31% / 28% triplet traces to Simon-Kucher data, not to the Phocuswright study, and is presented in the claim as if it came from the same source. Also, the trend is better stated as the published series 33% (H1 2025) → 43% (H2 2025) → 56% (2026) than as a vague 'nine months earlier'. Phocuswright and PhocusWire both returned 403 to direct fetch, so all of this rests on secondary reporting. https://www.phocuswright.com/Travel-Research/Consumer-Trends/The-AI-Surge-Travels-Fastest-Behavioral-Shift-in-a-Decade ; https://www.toolboxtravel.fi/2026/07/29/artificial-intelligence-is-rapidly-reshaping-how-travelers-plan-their-trips

### CONFIRMED — Cloudflare: ~80% of AI crawler traffic is training, user-action and search each under 5%; crawl-to-refer Anthropic ~50,000:1, OpenAI 887:1, Perplexity 118:1 network-wide; News & Publications 2,500:1 / 152:1 / 32.7:1; no travel breakdown.

All ratios and the ~80% training share confirmed against the post, published 2025-08-28, with ratios measured in the first week of August 2025 — a year old as of today, and the researcher does not caveat that these move fast. Absence of a travel/tourism/hospitality cut confirmed; the industry sets are News & Publications, Computer & Electronics, Gaming & Gambling and Cryptocurrency. https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/

### CONFIRMED — Arabic search behaviour: dialect over MSA, Arabizi documented in the Gulf, but NO SOURCED FIGURE exists for the share of Gulf travel queries in dialect, Arabizi, or Arabic vs English.

The researcher's honesty here is the finding, and it holds up. Independent searching surfaced a widely repeated '67% of Arabic product searches use local dialect' figure that traces to no primary study — exactly the kind of number the claim correctly declines to use. Arabizi/Franco-Arabic is well documented in the academic literature (Arabizi identification work, Gulf Arabic corpora, digraphia among Kuwaiti youth), so the qualitative pattern is real while the quantities are not available. Note the tension flagged above: Google's AI Mode serves Modern Standard Arabic, not Gulf dialect. https://aclanthology.org/P16-3008.pdf ; https://arxiv.org/pdf/1609.02960

### CONFIRMED — Next.js App Router natively provides alternates.canonical/languages, sitemap.ts with alternates.languages + images + videos, generateSitemaps with Google's 50,000-URL limit, and opengraph-image.tsx at 1200×630.

Read the sitemap doc in full (v16.3.2, lastUpdated 2026-08-18). The Sitemap return type is exactly Array<{url, lastModified?, changeFrequency?, priority?, alternates?: {languages?}, images?: string[], videos?: Videos[]}>; the localized example emits xhtml:link rel=alternate hreflang as claimed; generateSitemaps carries the inline comment "Google's limit is 50,000 URLs per sitemap". Localization support landed in v14.2.0. https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

### Corrections applied

- Google's FAQ structured data documentation no longer exists: the deprecation notice was added 2026-05-08 and the entire page was removed on 2026-06-15 ('Removed documentation for the FAQ rich result feature'), with Search Console API support dropped in August 2026. FAQ rich results stopped appearing on 2026-05-07.
- The August 2023 announcement restricted FAQ rich results to 'well-known, authoritative government and health websites' — not to news, government and health/medical sites. It simultaneously limited HowTo rich results to desktop only; HowTo was removed entirely on both desktop and mobile on 2023-09-14, when Google deleted the HowTo documentation.
- OpenAI documents FOUR crawlers, not three: OAI-SearchBot, GPTBot, ChatGPT-User, and OAI-AdsBot ('used to validate the safety of web pages submitted as ads on ChatGPT'). The OAI-SearchBot opt-out consequence is also fuller than quoted: opted-out sites 'will not be shown in ChatGPT search answers, though can still appear as navigational links.'
- In the Ahrefs llms.txt study, AI retrieval bots were 1.1% of ALL requests reaching llms.txt files, not 1.1% of AI bot requests. The sub-shares (agents/infrastructure 10.5%, training crawlers 5.3%, assistants 2.5%, retrieval bots 1.1%) sum to the 19.5% AI-bot total, confirming they are shares of the whole.
- The 42% itinerary-building / 31% flight-and-hotel-search / 28% booking-site-chatbot figures are Simon-Kucher data, not Phocuswright. Phocuswright's published series is 33% (H1 2025) → 43% (H2 2025) → 56% (2026) of U.S. leisure travellers using AI for at least one trip, with Millennials 74%, Gen Z 72%, 44% willing to book directly through an AI platform and 40% willing to let an AI assistant arrange flights and hotels.
- For AggregateOffer, Google requires lowPrice and priceCurrency; highPrice and offerCount are only recommended. Review also requires itemReviewed.name (or the parent item's name), which the claim omits.
- Google-Extended not affecting AI Overviews or AI Mode is an inference, not a Google statement. What Google actually says is 'Google-Extended does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search', scoped to training future Gemini models and grounding in Gemini Apps and Vertex AI. Neither the AI-features page nor the crawler page names AI Overviews or AI Mode in connection with Google-Extended.
- Next.js ships an escape hatch the claim omits: the htmlLimitedBots config key overrides the default user-agent list, and setting htmlLimitedBots: /.*/ in next.config.ts disables streaming metadata entirely, forcing blocking <head> metadata for every requester including GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot.
- The Vercel crawler volumes (GPTBot 569M/mo, Claude 370M, PerplexityBot 24.4M, Googlebot 4.5B) and 404 rates are from December 2024 and are 20 months stale; Botify has since reported OpenAI roughly tripled its crawl volume. Cloudflare's crawl-to-refer ratios are from the first week of August 2025. Only the no-JavaScript-execution finding is independently corroborated as still true in mid-2026.
- The Omniscient Digital 57% figure is the share of BRANDED-query citations going to reviews and social proof, drawn from 240 branded prompts. It is not evidence about unbranded or discovery-stage travel queries.
- Google's AI Mode in Arabic serves Modern Standard Arabic (Fus'ha), added in the October 2025 expansion of ~35 languages after an English-first MENA launch in August 2025. This cuts against a dialect-first content strategy for AI-channel visibility even if dialect matters for classical organic.
- Core Web Vitals 'poor' cutoffs (LCP >4.0s, INP >500ms, CLS >0.25) are not stated on web.dev/articles/vitals, which gives only the good thresholds; they come from the CrUX/Search Console classification, which also grades on a 28-day rolling window.

### Flagged as not covered

- THE ACTUAL FIX FOR THE STREAMING-METADATA PROBLEM. The dimension identifies the bug but not the one-line remedy Next.js documents: htmlLimitedBots in next.config.ts overrides the default user-agent regex, and htmlLimitedBots: /.*/ disables streaming metadata entirely. Without this the reader is told their metadata is invisible to AI crawlers and given no action. Note also that fully prerendered/static package pages never stream, so the bug only affects dynamically rendered routes — an argument for static generation of the package catalogue that the dimension never makes.
- GOOGLE BUSINESS PROFILE, LOCAL PACK AND MAPS. For a Gulf travel agency with a physical office this is plausibly a larger discovery channel than any schema decision, and it is completely absent. It also interacts directly with the review-snippet finding: reviews the agency cannot use for on-site stars are exactly the reviews that power its GBP star rating, and secondary reporting indicates ChatGPT leans on Google Business Profile data when surfacing local businesses. The dimension bars one review surface without pointing at the one that still works.
- A ROBOTS.TXT / AI-CRAWLER ACCESS DECISION. The dimension establishes that OAI-SearchBot opt-out means exclusion from ChatGPT search answers, and that Cloudflare measured Anthropic at ~50,000:1 crawl-to-refer, but never asks the product question those two facts force: which of GPTBot, OAI-SearchBot, ChatGPT-User, OAI-AdsBot, ClaudeBot, Claude-SearchBot and PerplexityBot to allow. Training access and search visibility are separable and the decision should be explicit.
- NON-GOOGLE ANSWER-ENGINE PLUMBING. 'Google is effectively the only engine that matters in the Gulf' is true of classical organic and false of the answer-engine channel the dimension itself argues for. ChatGPT search draws on a mix of Bing's index and OpenAI's own index/cache; Copilot rides Bing. Bing Webmaster Tools submission and IndexNow are cheap, concrete actions that go unmentioned.
- CANONICALS, FACETS AND INDEX BLOAT ON A PACKAGE CATALOGUE. The doorway-abuse and scaled-content-abuse policies are quoted but never connected to the build. A package site generates date, price, departure-city and duration permutations plus city landing pages — the exact shapes the policy names ('multiple domain names or pages targeted at specific regions or cities that funnel users to one page'). The dimension needs a rule for which permutations get indexed, which get noindex, and how canonicals collapse variants. This is where the doorway risk actually materialises.
- ARABIC AND RTL IMPLEMENTATION MECHANICS. hreflang rules are covered abstractly but never applied: which tags a Gulf site needs (ar, ar-SA, ar-AE, en, x-default), the mandatory reciprocity across every locale pair, html lang and dir='rtl', and Arabic-slug versus transliterated-slug URL policy. Given AI Mode serves Modern Standard Arabic while Gulf users query in dialect, the split between MSA-shaped content for the AI channel and dialect-shaped content for organic is a real design tension the dimension leaves unresolved.
- ANY TRAVEL-VERTICAL AI-VISIBILITY DATA. The dimension leans on Semrush, Wix and Omniscient, and correctly notes none breaks out Travel — but then does not go looking. Phocuswright is the one travel-specific source used and it is US-leisure only. No GCC-sample evidence is offered for any AI-channel claim, which means the entire answer-engine strategy for this market rests on extrapolation that is never labelled as such.
- MEASUREMENT AND FALSIFIABILITY. No instrumentation plan: no CrUX/field-data monitoring against the 28-day rolling window, no Search Console rich-result and Discover monitoring, no server-log segmentation by AI user agent to see which crawlers actually arrive, no AI-citation tracking. Every claim in the dimension is a build-time decision with no stated way to tell afterwards whether it worked.
- IMAGE AND VIDEO DELIVERY AS AN LCP PROBLEM. The dimension endorses 'real photography' on E-E-A-T grounds and separately quotes the LCP sub-part budgets, without noticing these collide: a hero-image-driven travel page is an LCP problem by construction. Missing: next/image sizing and priority, responsive srcset, AVIF/WebP, CDN policy, and the interaction with the 'never lazy-load your LCP image' rule.
- ORGANIZATION / TRAVELAGENCY ENTITY MARKUP AND THE EARLY ADOPTERS PATH. Even with no rich result, Organization markup with sameAs, logo, address and contact points feeds Google's knowledge graph and gives answer engines an entity to resolve — the 'entity-dense' recommendation the summary makes but never operationalises. The structured-data carousel Early Adopters Program is likewise mentioned in passing without noting that this is the only route to a multi-package carousel.

## Sources

- [Web Vitals](https://web.dev/articles/vitals) · Chrome team / web.dev · accessed 2026-08-22  
  Current Core Web Vitals metric set, exact good/needs-improvement/poor thresholds, 75th-percentile rule, INP promoted to stable in 2024 replacing FID.
- [Understanding page experience in Google Search results](https://developers.google.com/search/docs/appearance/page-experience) · Google Search Central · last updated 2025-12-10  
  'No single signal' framing plus explicit confirmation that Core Web Vitals are used by ranking systems; the six page-experience self-assessment questions.
- [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) · web.dev · last updated 2025-03-31  
  LCP sub-part budgets (TTFB ~40%, load delay <10%, load duration ~40%, render delay <10%), fetchpriority guidance, never-lazy-load-the-LCP-image rule, resource discoverability from HTML source.
- [Optimize Interaction to Next Paint](https://web.dev/articles/optimize-inp) · web.dev · last updated 2025-09-02  
  Causes of poor INP; client-side HTML rendering named as a presentation-delay cost; DOM size, content-visibility, yielding and layout-thrashing fixes.
- [Search gallery of rich results](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) · Google Search Central · last updated 2026-06-15  
  The complete list of supported rich-result features — and the absence of TouristTrip, TouristAttraction, Trip, FAQPage and HowTo from it.
- [FAQ (FAQPage) structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · Google Search Central · deprecation notice: no longer appears in Google Search from 2026-05-07  
  The exact FAQ rich-result deprecation date and Google's position that the markup can remain in place.
- [Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes) · Google Search Central Blog · 2023-08-08 (FLAGGED: pre-2024, but the operative original announcement, now superseded by the 2026 full deprecation)  
  Removal of HowTo rich results and the initial restriction of FAQ rich results to news, government and health sites.
- [Product (Product, Review, Offer) structured data / Product snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) · Google Search Central · last updated 2025-12-10  
  Required and recommended Product/Offer/AggregateOffer/AggregateRating properties; the single-product-page eligibility restriction that rules out category pages.
- [Review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · Google Search Central · last updated 2026-07-24  
  The self-serving review rule making Organization/LocalBusiness self-controlled reviews ineligible for stars; required Review and AggregateRating properties.
- [Carousel (ItemList) structured data](https://developers.google.com/search/docs/appearance/structured-data/carousel) · Google Search Central · last updated 2025-12-10  
  Carousel rich result limited to Course list, Movie, Recipe, Restaurant; ItemList required properties and same-domain URL rule.
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) · Google Search Central · last updated 2025-12-10  
  BreadcrumbList/ListItem required properties, optional item on the final element, and support for multiple breadcrumb trails.
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) · Google Search Central · last updated 2026-04-15  
  Full supported Organization property list including logo, sameAs, legalName, vatID, iso6523Code, contactPoint; placement on home or About page.
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) · Google Search Central · last updated 2026-07-10  
  Requirement that marked-up content be visible to users; relevance/completeness/location rules; manual actions remove rich-result eligibility only.
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · Google Search Central · accessed 2026-08-22  
  No special markup or AI text files needed; eligibility = indexed + snippet-eligible; nosnippet/max-snippet limit AI features; Google-Extended does not remove pages from AI Overviews or AI Mode.
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · Google Search Central · last updated 2025-12-10  
  E-E-A-T with Trust as most important; the first-hand experience question naming 'visiting a place'; Who/How/Why framework; originality questions.
- [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) · Google Search Central · last updated 2026-05-15  
  Definitions of doorway abuse, scaled content abuse and thin affiliate pages — the boundary line for destination × month programmatic pages.
- [Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions) · Google Search Central · last updated 2025-12-22  
  hreflang code format (ISO 639-1 + ISO 3166-1 alpha-2), mandatory reciprocity, x-default, three implementation methods, common mistakes.
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) · Google Search Central · last updated 2025-12-10  
  ccTLD vs subdomain vs subdirectory trade-offs, subdomains giving no audience signal, and the explicit advice against automatic language redirection.
- [Google Images SEO best practices](https://developers.google.com/search/docs/appearance/google-images) · Google Search Central · last updated 2026-03-02  
  High-quality image guidance, descriptive filenames, alt text, image sitemaps, primaryImageOfPage, srcset/picture requirements.
- [generateMetadata / Metadata and OG images / sitemap.xml file convention](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) · Vercel / Next.js docs (v16.3.2) · lastUpdated 2026-08-19 (sitemap doc 2026-08-18, metadata guide 2026-06-01)  
  alternates.canonical/languages for hreflang; streaming metadata appended to <body> for non-HTML-limited bots; htmlLimitedBots override; sitemap alternates.languages, images, videos; generateSitemaps 50,000-URL split; ImageResponse OG generation.
- [next.js html-bots.ts (HTML_LIMITED_BOT_UA_RE)](https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/html-bots.ts) · Vercel / Next.js source · read 2026-08-22  
  The exact default bot regex — proving GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot are not covered, so streamed metadata lands in <body> for them.
- [The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler) · Vercel · December 2024 (FLAGGED: volumes are dated; the JS-rendering finding is the durable part)  
  AI crawlers do not execute JavaScript; per-bot request volumes; 404 waste rates; recommendation to server-render critical content.
- [OpenAI bots documentation](https://developers.openai.com/api/docs/bots) · OpenAI · accessed 2026-08-22  
  OAI-SearchBot vs GPTBot vs ChatGPT-User purposes; blocking OAI-SearchBot removes a site from ChatGPT search answers; exact user-agent strings.
- [We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read](https://ahrefs.com/blog/llmstxt-study/) · Ahrefs · study of May 2026 data  
  llms.txt adoption and fetch data — 137,210 domains, 28% adoption, 97% zero requests, ~22,000 total requests, AI retrieval bots 1.1% of AI bot requests.
- [A deeper look at AI crawlers: breaking down traffic by purpose and industry](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/) · Cloudflare · 2025-08-28  
  ~80% of AI crawler traffic is training; crawl-to-refer ratios by bot and by industry; absence of a travel-vertical breakdown.
- [The content types most cited by LLMs](https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms) · Wix AI Search Lab (data via Peec AI) · 2026-03-23  
  75,000 AI answers / 1,056,727 citations: listicles 21.9%, articles 16.7%, product pages 13.7%; product pages 24.88% for transactional intent; Perplexity 17% discussions.
- [Which Content Types LLMs Cite Most: 23,000+ AI Citations Analyzed](https://beomniscient.com/blog/content-types-cited-in-llms/) · Omniscient Digital · 2026-01-20  
  23,387 sources from 240 branded prompts across five AI surfaces: Reviews & Social Proof 57%, directories 17%, product pages 12%, About 1.92%, Home 1.82%, FAQs 0.41%.
- [Semrush AI Overviews Study](https://www.semrush.com/blog/semrush-ai-overviews-study/) · Semrush · January–November 2025 data  
  AIO trigger rate 6.49% → 24.61% → 15.69%; long-tail/low-volume skew of AIO keywords; zero-click rate falling 33.75% → 31.53% on the same keywords.
- [Bringing AI Overviews to MENA, and in Arabic globally](https://blog.google/intl/en-mena/product-updates/explore-get-answers/bringing-ai-overviews-to-mena-and-in-arabic-globally/) · Google (blog.google MENA) · 2025-05-20  
  AI Overviews availability across MENA and in Arabic globally on mobile and desktop.
- [Search Engine Market Share Saudi Arabia / United Arab Emirates](https://gs.statcounter.com/search-engine-market-share/all/saudi-arabia) · StatCounter Global Stats · July 2026  
  Google 95.95% in Saudi Arabia and 95.93% in the UAE; Bing ~2.5%, all others negligible.
- [TouristTrip](https://schema.org/TouristTrip) · Schema.org · accessed 2026-08-22  
  Exact TouristTrip/Trip property names and value types (itinerary, touristType, tripOrigin, departureTime, arrivalTime, offers, provider, partOfTrip, subTrip) and its non-stable 'new' status.
- [The AI surge: 5 takeaways for travel leaders (reporting on Phocuswright research)](https://www.phocuswire.com/ai-surge-us-behavioral-shift-travel-phocuswright-research-2026) · PhocusWire / Phocuswright · 2026  
  56% of U.S. leisure travellers used AI for a trip in 2026 (from 43% nine months earlier), 42% itinerary building, 44% willing to book inside an AI platform. Secondary reporting — direct fetch returned HTTP 403.
- [Digital 2026: Saudi Arabia](https://datareportal.com/reports/digital-2026-saudi-arabia) · DataReportal / We Are Social / Meltwater · reporting late-2025 data, published 2026  
  34.4 million internet users at 99.0% penetration, 48.7 million mobile connections, 38.6 million social media identities — context for a mobile-first, near-universally-connected target market.
