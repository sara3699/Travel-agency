# Package discovery and information architecture

Dimension `package-discovery-ia` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

The "best package" job is a choosing problem, not an assembling problem, and most travel sites copy metasearch: a flight-style search box on a hero image, then a grid of near-identical cards separated only by a country name and a "from" price.

Baymard's product-list benchmark quantifies the cost, with one caveat the original summary missed: the 67-90% versus 17-33% gap is TASK abandonment observed in moderated lab testing, not live conversion, and the "4x leads" figure is Baymard's extrapolation from it. Separately, 36% of the 344 benchmarked sites have flaws Baymard calls "downright harmful" to product discovery, and the average site needs ~35 changes. Every Baymard "% of sites" number is heuristic expert scoring, not measured user failure — directionally strong, not a forecast.

The failure is not catalogue size. Dean, Ravindran and Stoye (arXiv:2212.03931, v4 Aug 2026) argue existing choice-overload tests are underpowered and that overload occurs more often than detected — against Scheibehenne et al.'s 2010 meta-analysis finding a near-zero mean effect with high variance. So the fix for 300 packages is differentiation and facet parity, not a shorter catalogue. Parity is measurable: 38% of sites lack filters for attributes they already display on cards, and 62% never explain industry-specific filter labels.

Three structural moves follow. First, taxonomy must be constraint-shaped, not destination-shaped: for a GCC audience, departure city, month, nights, per-person budget, party type and visa/faith constraints are the real filters. Air Arabia Holidays already makes "Leaving From" its first input, and Marriott's 2025 study of 4,700+ UAE/KSA travellers puts "getting a special price" as the top booking trigger at 54%. Second, inspiration and intent must live on one URL-addressable listing reached by two doors — Airbnb's "I'm Flexible" (launched 24 May 2021) logged 500M+ flexible-date searches by August 2021 and 2 billion by 2023. Third, filter state belongs in the URL: shareability, SEO and back-button contract at once. Google's faceted-nav doc (updated 2025-12-18) specifies how, and calls faceted navigation "by far the most common source of overcrawl issues site owners report."

## Summary as first written, before verification

The "best package" job is a *choosing* problem, not an *assembling* problem, and almost every travel site gets the IA wrong by copying metasearch: a flight-style search box on a hero image, then a grid of near-identical cards separated only by a country name and a "from" price. Baymard's product-list benchmark quantifies the cost — sites with mediocre list/filter usability see 67–90% task abandonment versus 17–33% on optimised ones, and 36% have flaws "downright harmful" to product discovery (baymard.com/research/ecommerce-product-lists). The failure is not catalogue size. Better-powered choice-overload work (Dean, Ravindran & Stoye, arXiv 2212.03931) finds overload is real but conditional; it bites hardest when options are hard to tell apart. So the fix for 300 packages is differentiation and facet parity, not a shorter catalogue.

Three structural moves follow. First, taxonomy must be *constraint-shaped*, not destination-shaped: for a GCC audience, departure city, month, nights, per-person budget, party type, and visa/faith constraints are the real filters — Air Arabia Holidays makes "Leaving From" its first input, and Marriott Bonvoy's 2025 UAE/KSA study puts "getting a special price" as the top booking trigger at 54%. Second, inspiration and intent must live on one URL-addressable listing, reached by two different doors; Airbnb's "I'm Flexible" proved the undated, un-destinationed door has enormous demand (500M+ flexible searches within weeks of launch). Third, filter state belongs in the URL — it is simultaneously the shareability surface, the SEO surface, and the back-button contract. Google's faceted-nav doc (updated 2025-12-18) specifies exactly how to make that crawlable without burning crawl budget.

## Findings

### Product-list and filtering quality is the highest-leverage variable in discovery: Baymard measured 67–90% abandonment on sites with mediocre product-list usability versus 17–33% on sites with optimised filtering and sorting, describing a potential up-to-4x increase in leads.

Confidence: verified · type: data

Why it matters here: For a package site, the listing page IS the product. This is the single strongest argument for spending the design budget on the listing/facet layer rather than on the hero video that most Middle East travel agency sites lead with.

Evidence: Baymard Institute, 'E-Commerce Product Lists & Filtering UX' research overview — methodology stated as 19 leading sites across 8 verticals, 83 guidelines from 700+ usability issues, 344 sites benchmarked, 25 rounds of qualitative testing, 4,400+ sessions. https://baymard.com/research/ecommerce-product-lists (fetched 2026-08-22; benchmark is continuously updated, 2025 edition cited)

Source: https://baymard.com/research/ecommerce-product-lists

### 36% of benchmarked e-commerce sites have product-list design and feature flaws severe enough that Baymard calls them 'downright harmful' to product discovery, and the average site needs ~35 design changes to reach optimal usability.

Confidence: verified · type: data

Why it matters here: Sets the bar: 'not obviously broken' is the industry median, so matching competitors like Travelwings or a typical GCC agency site is not a differentiation strategy — it is the generic default the operator explicitly wants to avoid.

Evidence: Baymard Institute product-lists research overview, https://baymard.com/research/ecommerce-product-lists ; corroborated in FACT-Finder's faceted-search article citing the same 36% figure, https://www.fact-finder.com/blog/faceted-search/

Source: https://baymard.com/research/ecommerce-product-lists

### Filter/list-item parity rule: any attribute displayed on a list card must also be filterable. 38% of sites violate this (42% when Baymard first measured it in 2015). Users hunt for the missing filter, sometimes repeatedly, then abandon.

Confidence: verified · type: principle

Why it matters here: Directly generates the facet list for a package card. If the card shows nights, departure city, group size, physical level, and 'meals included', all five must be facets. This one rule converts a decorative card into a navigable taxonomy.

Evidence: Baymard, 'Filter List Design: Have Filters for All Displayed List Item Info (38% Don't)', published 2019-09-17. Quote from the article: display in the list item 'reminds' users the attribute is important. Test observations include an Overstock user abandoning when unable to filter for non-wheeled backpacks. https://baymard.com/blog/have-filters-for-list-item-info — FLAG: published 2019, pre-2023, though the 38%/42% figures are re-benchmarked in the ongoing 344-site benchmark.

Source: https://baymard.com/blog/have-filters-for-list-item-info

### The largest facet gaps in industry are category-specific and thematic filters: 42% of top e-commerce sites lack category-specific filter types for several core categories, and 20% lack thematic filters despite selling products with obvious thematic attributes such as season and style.

Confidence: reported · type: data

Why it matters here: Thematic and category-specific facets are exactly what a package site needs and what generic travel templates omit: 'honeymoon', 'multi-generational', 'solo female', 'visa-free', 'Ramadan-safe pacing', 'shoulder season'. This is where a curated-package site can beat a metasearch clone.

Evidence: Baymard research findings summarised across their filtering research; figures surfaced in search results for Baymard's filtering blog collection and echoed on https://baymard.com/learn/ecommerce-filter-ui (fetched 2026-08-22). Also FACT-Finder best practice #3 'Add Thematic Facets' — occasion, intended use, price-sensitive options: https://www.fact-finder.com/blog/faceted-search/

Source: https://baymard.com/learn/ecommerce-filter-ui

### 62% of sites use unclear, jargon-heavy filter labels. When users do not understand a filter label they skip the filter entirely, overlook suitable products, leave to search the term externally ('I'll just Google it'), or apply-and-remove repeatedly to reverse-engineer its meaning.

Confidence: verified · type: data

Why it matters here: Travel is dense with trade jargon: 'FIT', 'half board', 'land only', 'B2B rate', 'twin sharing', 'physical rating 3'. A Middle East package site serving mixed Arabic/English audiences compounds this. Every non-obvious facet needs a plain-language label plus an inline explanation.

Evidence: Baymard, 'Always Explain Industry-Specific Filters (62% Don't)', published 2024-02-27. Recommends: eliminate jargon, add explanatory tooltips, add thumbnail images for visual attributes. https://baymard.com/blog/explain-industry-specific-filters

Source: https://baymard.com/blog/explain-industry-specific-filters

### Core filter-interaction failures are widespread and each is individually fixable: 14% of sites do not allow multiple options within one filter category; 20% fail to keep applied filters visible while browsing; 25% of desktop and 40% of mobile stores use unclear filter labels. Baymard describes showing match counts next to each option (e.g. 'Blue (34)') as one of the single highest-impact improvements available.

Confidence: verified · type: data

Why it matters here: Gives a concrete, testable acceptance checklist for the listing page: multi-select checkboxes not radios, persistent chips above the grid, live counts per option. Counts are especially valuable for packages because they pre-empt the empty-result dead end.

Evidence: Baymard, 'What Is an Ecommerce Filter? UI Best Practices', https://baymard.com/learn/ecommerce-filter-ui (fetched 2026-08-22). References Baymard guidelines 427 (selecting multiple filter options), 467 (indicating number of matches), 488 (applied filters on desktop), 493 (persisting filtering on back navigation).

Source: https://baymard.com/learn/ecommerce-filter-ui

### Desktop and mobile need different apply semantics: on desktop, a persistent left sidebar with real-time filtering (results update on selection) is the preferred pattern; on mobile, a full-screen overlay or bottom sheet with an explicit sticky 'Show X Results' button, with the count updating live on the button label, and 44×44pt tap targets.

Confidence: verified · type: pattern

Why it matters here: GCC traffic is mobile-heavy. A desktop-first filter sidebar squeezed into a mobile drawer with instant-apply causes disorienting reflows and is one of the commonest generic-template failures.

Evidence: Baymard filter UI guidance, https://baymard.com/learn/ecommerce-filter-ui ; Vitaly Friedman, 'Filtering UX', Smart Interface Design Patterns, 2022-12-26 — sticky Apply at screen bottom on mobile with dynamically updating product count, full-page overlay rather than split-screen, never freeze the UI during selection, avoid layout shift by placing applied filters above results. https://smart-interface-design-patterns.com/articles/filtering-ux/ — FLAG: Friedman article is 2022, pre-2023 threshold.

Source: https://smart-interface-design-patterns.com/articles/filtering-ux/

### Facet-count and ordering guidance: aim for roughly five to seven facets per results page on mobile; order facets by observed click behaviour rather than by database convenience; within a facet, once there are more than about six options, alphabetical ordering becomes the scannable default. Enterprise filter guidance adds ~40 characters as a practical truncation point for multi-select chip summaries before collapsing to 'Theme (4)'.

Confidence: reported · type: pattern

Why it matters here: Answers 'how many facets is too many' concretely. A package site can easily invent 15 facets; the discipline is choosing the 5–7 that carry the decision for this audience and demoting the rest behind 'More filters'.

Evidence: FACT-Finder, '9 best practices for faceted search' — mobile guidance 'five to seven facets per search results or category page', and 'if a facet has more than six options, alphabetical sorting is often the way to go'. https://www.fact-finder.com/blog/faceted-search/ ; Pencil & Paper, 'Filter UX Design Patterns', Fanny Vassilatos & Ceara Crawshaw, 2026-03-16 — ~40-character truncation, 2–3 line chip wrap maximum, high-traffic properties get higher visibility, few values ordered by importance / many values alphabetical. https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-filtering

Source: https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-filtering

### Zero-result states must never be dead ends. Baymard reports that nearly 50% of sites fail to provide effective recovery from a no-results search, and prescribes five recovery strategies: link to related/broader categories (ideally a pre-filtered list), suggest alternative searches, show personalised or recently viewed items, surface support contact, and promote popular products.

Confidence: verified · type: principle

Why it matters here: Package inventories are sparse compared to retail — 'Jeddah departure + 5 nights + under 3,000 SAR + honeymoon + March' will legitimately return zero. Graceful relaxation ('we removed the 5-night filter — here are 6-night trips') is a competitive advantage, not a nicety.

Evidence: Baymard, '5 Proven UX Strategies For "No Results" Pages', published 2019-02-04, updated 2025-02-18. https://baymard.com/blog/no-results-page . Note: the article does not itself cover automated filter relaxation — that is an extension. Separately, Baymard's filter UI page lists 'allowing filter combinations that produce zero results without graceful recovery' as one of four major mistakes.

Source: https://baymard.com/blog/no-results-page

### Google's official faceted-navigation guidance (last updated 2025-12-18) is prescriptive: use '&' as the parameter separator because commas, semicolons and brackets are hard for crawlers to detect; if you do not want facet URLs crawled, either robots.txt-disallow them by pattern (e.g. disallow: /*?*color=) or move state to a URL fragment (#), since Google generally does not crawl or index fragments; return HTTP 404 when a filter combination yields no results rather than redirecting; rel=canonical only gradually reduces crawl of non-canonical facet URLs; rel=nofollow only works if applied to every anchor pointing at filtered results. Google states faceted navigation is 'by far the most common source of overcrawl issues site owners report'.

Confidence: verified · type: constraint

Why it matters here: This is the exact contract for making shareable, indexable filter URLs without torching crawl budget on a Next.js App Router site. It decides which facet combinations get real routes and which stay client-side.

Evidence: Google, 'Managing crawling of faceted navigation URLs', Google Crawling Infrastructure docs, last updated 2025-12-18. https://developers.google.com/crawling/docs/faceted-navigation ; companion blog post 'Crawling December: Faceted navigation', December 2024, https://developers.google.com/search/blog/2024/12/crawling-december-faceted-nav

Source: https://developers.google.com/crawling/docs/faceted-navigation

### Inspiration-mode entry (no destination, no fixed dates) has demonstrated enormous latent demand. Airbnb's 'I'm Flexible' logged more than 500 million flexible-date searches within roughly five weeks of its 30 June 2021 launch, and Airbnb later reported the feature had been used more than 2 billion times. Flexible browsing shifted what people saved: wishlist additions rose 51% for treehouses, 160% for boats, 355% for domes.

Confidence: reported · type: data

Why it matters here: Proves that a prominent 'I don't know where yet' door is not a novelty — it is a primary entry mode, and it surfaces long-tail inventory that a destination-first search box never exposes. For a package site, the equivalent doors are 'surprise me from Jeddah in March' and theme collections.

Evidence: Airbnb newsroom via Hospitality Net, 'New Milestone: More Than 500 Million Flexible Searches On Airbnb', 2021-08-04, https://www.hospitalitynet.org/news/4105817.html ; the 2-billion figure from Airbnb newsroom 'New milestone: 2 billion flexible searches', https://news.airbnb.com/new-milestone-2-billion-flexible-searches/ (page returned 403 to direct fetch; figure seen in search results). FLAG: 2021 data is stale as a trend datapoint; the structural lesson is treated here as timeless.

Source: https://www.hospitalitynet.org/news/4105817.html

### Maps on discovery pages are usually decoration and carry a real cost. NN/g's mobile-maps research recommends omitting maps from mobile website search-results pages entirely, documents 'swipe ambiguity' (users trying to scroll instead pan the map), touch-target failures from densely clustered pins, and gesture-repeat/abandonment under slow rendering — and reports that not a single test user asked for a map on results pages that lacked one. A 2024 city-trip recommender UI study reported users preferring the card view over the map view (74% vs 26% in the reported summary).

Confidence: reported · type: pattern

Why it matters here: A map on the package listing page is the classic generic-travel-template decoration. For pre-built packages, geography is a *route*, not a set of pins to pick from — the map belongs on the package detail page as an itinerary illustration, not on the listing.

Evidence: Aurora Harley, 'Maps and Location Finders on Mobile Devices', Nielsen Norman Group, 2014-01-19, https://www.nngroup.com/articles/mobile-maps-locations/ — FLAG: 2014, well before the 2023 staleness threshold; the touch-gesture conflict it describes still exists but the article should not be cited as current evidence. Banerjee, Mahmudov & Wörndl, 'A User Interface Study on Sustainable City Trip Recommendations', arXiv:2405.11243, 2024-05-18, https://arxiv.org/abs/2405.11243 — CAVEAT: the 74%/26% card-vs-map split appeared in a search-result summary; I could not confirm it in the abstract I fetched, so treat that specific split as unverified.

Source: https://www.nngroup.com/articles/mobile-maps-locations/

### Third-party map embeds are heavy and directly threaten Core Web Vitals: popular embeds commonly ship over 100 KB of JavaScript and sometimes up to 2 MB, are often render-blocking, and cause layout shift as they load; the recommended mitigation is a facade / click-to-load pattern with reserved dimensions. Google's current CWV 'good' thresholds are LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, assessed at the 75th percentile segmented by mobile and desktop.

Confidence: verified · type: constraint

Why it matters here: Quantifies the map decision as a budget trade, not a taste debate. On a Vercel-hosted Next.js site targeting mobile GCC networks, an interactive map on the listing page can consume the entire LCP budget for a feature that testing says users do not ask for.

Evidence: web.dev, 'Best practices for lazy loading and embed performance' (embeds), last updated 2021-10-05, https://web.dev/articles/embed-best-practices — FLAG: 2021, pre-2023. web.dev, 'Web Vitals', last updated 2024-10-31, https://web.dev/articles/vitals

Source: https://web.dev/articles/vitals

### Comparison tools are commonly provided but badly built: roughly 38% of top-60 e-commerce sites have a dedicated comparison feature, and Baymard's testing finds users have severe difficulty both selecting items to compare and reading the comparison page. Four fixes tested well: (1) an 'only show differences' toggle, which users strongly preferred over merely highlighting differences; (2) grouping attributes into named categories rather than an alphabetical spec dump; (3) sticky column headers carrying name, price and thumbnail; (4) horizontal row banding or separators so scanning does not lose its place.

Confidence: verified · type: pattern

Why it matters here: Package comparison is high-value and almost nobody does it in travel. 'Only show differences' is the direct antidote to shallow differentiation: it mechanically surfaces what actually distinguishes two 7-night Georgia packages.

Evidence: Baymard, '4 Ways to Optimize the Comparison Feature for Scanning', 2022-10-19, https://baymard.com/blog/user-friendly-comparison-tools ; Baymard, 'Always Provide Comparison Features for Spec-Driven Industries (17% Don't)', https://baymard.com/blog/provide-comparison-features . The article does not specify an ideal number of items to compare simultaneously — no sourced figure found. FLAG: 2022 publication.

Source: https://baymard.com/blog/user-friendly-comparison-tools

### Choice overload is real but conditional, and the naive 'fewer options sell more' reading is not well supported. Meta-analytic estimates have produced an average effect near zero with substantial heterogeneity between studies; a better-powered re-test argues existing tests are underpowered and finds evidence that larger choice sets harm decision-makers more often than the literature detected. Separately, the effect is reported to bite hardest when options are hard to differentiate — similar features, comparable prices, unclear benefits.

Confidence: reported · type: principle

Why it matters here: Settles the strategic question for a large package catalogue: do not shrink the inventory, make the items distinguishable. The design work is per-card differentiation and comparison affordances, not curation-by-deletion.

Evidence: Mark Dean, Dilip Ravindran, Jörg Stoye, 'A Better Test of Choice Overload', arXiv:2212.03931, submitted 2022-12-07, latest revision v4 2026-08-13, https://arxiv.org/abs/2212.03931 ; Dar & Gul, 'The "less is better" paradox and consumer behaviour: a systematic review of choice overload', Qualitative Market Research 28(1) 122–145, 2025, PRISMA review of 53 articles 2000–2023, https://www.emerald.com/qmr/article/28/1/122/1245028/ . The 'hard to differentiate' moderator was reported secondhand via CMSWire citing Northwestern research — https://www.cmswire.com/customer-experience/choice-paralysis-is-quietly-wrecking-your-conversions/ — treat as reported, not verified.

Source: https://arxiv.org/abs/2212.03931

### Information scent governs whether a taxonomy works: users estimate a link's value before clicking from the label, its supporting text, accompanying imagery, and page context. NN/g explicitly names vague call-to-action navigation labels — 'Explore', 'Discover', 'Learn' — as an IA mistake because they lack differentiation and fail to guide choice, and recommends specific jargon-free labels plus summary text that conveys the gist, with images chosen to represent the category rather than for aesthetics.

Confidence: verified · type: principle

Why it matters here: This is the single most-violated rule on travel sites, which almost universally label nav items 'Explore', 'Discover', 'Our Trips', 'Inspiration'. Replacing them with constraint-bearing labels ('4 nights or less', 'No visa needed', 'Leaves from Jeddah') is a cheap, immediate differentiator.

Evidence: Raluca Budiu, 'Information Scent: How Users Decide Where to Go Next', NN/g, 2020-02-02, https://www.nngroup.com/articles/information-scent/ ; Page Laubheimer, '3 Common IA Mistakes (that Are All Due to Low Information Scent)', NN/g, 2023-04-16, https://www.nngroup.com/articles/3-ia-mistakes/ — also warns against forced parallel language and awkward conversational labels such as 'I want to…'.

Source: https://www.nngroup.com/articles/3-ia-mistakes/

### Personalisation has a narrow acceptable band. Qualtrics XM Institute's 2025 consumer privacy and personalisation report (based on a 2024 global study of more than 23,000 consumers) identifies purchase history and site visits as the top candidates for personalisation and ties comfort to trust in the brand's data practices, with comfort varying sharply by country. Secondary reporting on the same theme puts roughly two-thirds of consumers wanting tailored experiences but only 41% believing the benefits justify the privacy cost, with 51% having reduced data sharing and 54% having actively avoided AI-powered recommendation features.

Confidence: reported · type: data

Why it matters here: Argues for declared-signal personalisation over inferred-behaviour personalisation, which is also the only thing that works on a cold start. On a Supabase-backed site, storing an explicitly-chosen departure city and travel month is both more accurate and more acceptable than silently profiling.

Evidence: Qualtrics XM Institute, 'Consumer Preferences for Privacy and Personalization, 2025', sample >23,000 consumers from the 2024 Global Consumer Study, https://www.qualtrics.com/research/consumer-privacy-personalization-2025/ (landing page fetched; detailed statistics sit behind a gated PDF, so the specific percentages below are secondary). Secondary figures via Forbes, 'Personalization To Paranoia – Why Consumers Pull Back As AI Expands', 2026-04-21, https://www.forbes.com/sites/garydrenik/2026/04/21/personalization-to-paranoia--why-consumers-pull-back-as-ai-expands/

Source: https://www.qualtrics.com/research/consumer-privacy-personalization-2025/

### The GCC audience's decision variables are price-timing and trip-frequency, not destination novelty. A 2025 Marriott Bonvoy study of UAE and KSA travellers reports plans for around 7 trips in 2025 (2.7 domestic, 2.3 short-haul of four hours or less, 2.1 long-haul), with 84% travelling the same or more than 2024; 'getting a special price' is the single biggest booking trigger at 54% (51% UAE, 57% KSA); and 76% of UAE and 74% of KSA travellers have taken or considered shoulder-season breaks, primarily for better value.

Confidence: reported · type: data

Why it matters here: Directly ranks the facets. Month/season and per-person price are first-class navigation dimensions for this audience, not sort options — and short-haul (≤4h flight) deserves its own named facet because it is over a third of planned trips.

Evidence: Marriott International press release, 'Travellers in United Arab Emirates and Saudi Arabia are set to take more holidays in 2025', 2025-02-12, https://marriott.pressarea.com/en/news/12022025/travellers-in-united-arab-emirates-and-saudi-arabia-are-set-to-take-more-holidays-in-2025-with-savvy-spenders-bravecations-heritage-holidays-and-ai-on-the-rise ; corroborated by Gulf News, 'UAE, Saudi travellers will take at least 7 holidays in 2025', https://gulfnews.com/business/tourism/uae-saudi-travellers-will-take-at-least-7-holidays-in-2025-travel-trends-revealed-1.500044217 . CAVEAT: brand-commissioned research, not an independent statistics body.

Source: https://marriott.pressarea.com/en/news/12022025/travellers-in-united-arab-emirates-and-saudi-arabia-are-set-to-take-more-holidays-in-2025-with-savvy-spenders-bravecations-heritage-holidays-and-ai-on-the-rise

### Faith-aligned and women-specific trip attributes are a large, formally-indexed segment, not a niche: the 2025 Mastercard-CrescentRating Global Muslim Travel Index (10th edition, June 2025) reports 176 million international Muslim arrivals in 2024, up 25% year on year, projected to 245 million by 2030 with US$230bn of spend, and introduced new sub-indexes ranking Muslim Women-Friendly Destinations and Muslim-Friendly Accessible Destinations. Cited drivers include alcohol-free environments, halal-certified dining, prayer facilities and gender-segregated pools and spas, alongside a rise in solo and female travellers.

Confidence: reported · type: data

Why it matters here: Legitimises facets that generic Western templates simply do not have — 'prayer facilities on itinerary', 'alcohol-free hotel', 'halal-certified meals included', 'female-only group', 'women-friendly destination'. These are true differentiators for this audience and directly answer the shallow-differentiation problem with attributes competitors cannot fake.

Evidence: Mastercard-CrescentRating GMTI 2025, announced June 2025 — https://www.mastercard.com/news/ap/en/newsroom/press-releases/en/2025/mastercard-crescentrating-global-muslim-travel-index-reveals-trends-shaping-the-future-of-halal-travel/ (direct fetch returned 403; figures taken from the press release text surfaced in search results and corroborated by PATA and TTG Asia coverage). Follow-on 2026 release: https://www.mastercard.com/news/ap/en/newsroom/press-releases/en/2026/mastercard-and-crescentrating-reports-point-to-245-million-muslim-travelers-by-2030-with-women-driving-nearly-half-of-arrivals-today/

Source: https://www.crescentrating.com/reports/global-muslim-travel-index-2025.html

### Regional competitors already treat departure city as the primary search axis, and their taxonomies are geography-heavy but theme-light. Air Arabia Holidays leads with 'Leaving From' as its first search input (hubs Sharjah SHJ and Abu Dhabi AUH), groups destinations only as Africa / Asia / Europe / India, splits products as Packages | Hotels | Customized Holidays, prices in AED and USD 'per room per night', and offers only star-rating and airport-transfer filters. Travelwings (UAE) organises into 12 geographic groupings such as 'The Caucasus and Central Asia' and 'The Balkans and the Adriatic', prices in AED per person on double-sharing basis from AED 999 to AED 36,700+, spans 3–19 nights, and has no halal or visa category at all.

Confidence: verified · type: pattern

Why it matters here: This is the generic default to beat, verified by fetching the live sites. The gap is obvious: origin-first search is table stakes regionally, but theme, traveller-type, faith, visa and season facets are essentially absent — which is exactly the whitespace a differentiated package site should occupy.

Evidence: Fetched 2026-08-22: https://holidays.airarabia.com/ and https://www.travelwings.com/ae/en/holidays/index.html

Source: https://holidays.airarabia.com/

### A working reference implementation of package faceting exists: TourRadar's Middle East listing exposes facets with live counts across Travel Styles (River Cruise 538, Adventure & Adrenaline 288, Coach/Bus 141, Hiking & Trekking 92), Group type (Group 3,123 / Small Group 1,482 / Private-Personalized 1,507), Demographics (Solo Travelers 1,747, Couples 1,656, Seniors 50+ 435, Young Adults 18-39 29), duration presets (3/7/10 day), budget expressed as price-per-day ('Budget tours from $28/day', 'Luxury from $104/day') and seasonal buckets (Summer 2026, Fall 2026, Winter 2026/2027, Spring 2027) — over an inventory of 4,700+ tours. Cards differentiate with star rating and review count, duration, linked destinations, age requirement, operator name and badges, discount percentage, photos and maps, and a truncated traveller quote.

Confidence: verified · type: pattern

Why it matters here: Concretely demonstrates that traveller-type and season are viable top-level facets, that per-day pricing normalises trips of different lengths for comparison, and that live counts are achievable at scale. It also shows a card anatomy with roughly eight discriminating signals — the antidote to the photo-plus-price card.

Evidence: Fetched 2026-08-22: https://www.tourradar.com/d/middle-east . Taxonomy contrast: G Adventures uses named Travel Styles (Classic, Active, National Geographic Journeys) while Intrepid uses comfort tiers (Basix, Original, Comfort, Premium) — reported via https://www.tourradar.com/days-to-come/g-adventures-vs-intrepid-travel/

Source: https://www.tourradar.com/d/middle-east

### Evidence for quiz/matchmaker conversion is vendor-generated and methodologically thin. Interact's quiz report (updated 2025-12-25) publishes an overall 40.1% start-to-lead and 65% start-to-finish rate, with e-commerce at 37.6% / 55.5%, but discloses no sample size, no methodology, and no drop-off breakdown by question index. A widely-cited roundup of ten brand quiz examples provides named quiz lengths (Andie: 12 questions; Beardbrand: 'two minutes'; Big Hammer Wines: 'no more than a minute') but no independent performance data validating that any of them increased conversion. No sourced figure found for optimal question count or per-question drop-off from an independent research body.

Confidence: reported · type: constraint

Why it matters here: Means the quiz should not be justified by borrowed conversion numbers, and should be architected so it cannot fail as a gimmick: build it as a visible, editable, URL-addressable filter-builder whose output is a normal filtered listing, so its value does not depend on the quiz-conversion literature being true.

Evidence: Interact, 'Quiz Conversion Rate Report', updated 2025-12-25, https://www.tryinteract.com/blog/quiz-conversion-rate-report/ ; LeadsHook, '10 Product Recommendation Quiz Examples That Convert in 2025', https://www.leadshook.com/blog/product-recommendation-quiz-examples/ . RevenueHunt's 2026 benchmark (https://revenuehunt.com/state-of-product-recommendation-quizzes/) returned HTTP 403 and could not be verified.

Source: https://www.tryinteract.com/blog/quiz-conversion-rate-report/

### Schema.org TouristTrip, TouristAttraction and TouristDestination are parsed by Google for entity understanding but do not trigger a visual rich result; Product, Event and Hotel types do. TouristTrip's relevant properties for packages are itinerary (ordered stops), offers (pricing), provider, touristType, and arrival/departure times.

Confidence: reported · type: constraint

Why it matters here: Sets realistic expectations for the structured-data work: TouristTrip earns machine comprehension and AI-assistant citation, while a co-located Product/Offer where a fixed per-person price exists is what earns visible SERP enhancement. Both are cheap to emit from a Supabase row in a Next.js route.

Evidence: Schema.org TouristTrip definition and property list, https://schema.org/TouristTrip ; the rich-result distinction reported by practitioner sources including https://jsonschemaapp.com/travel-tourism-schema-markup/ and https://www.tourismtribe.com/schema-markup-tourism-what-google-knows/ . CAVEAT: the 'no visual rich result' claim is from practitioner reporting, not a Google doc I fetched — verify against Google's search gallery before building.

Source: https://schema.org/TouristTrip

### Facet UI has a specific accessibility contract: each facet group needs role="group" with aria-labelledby pointing at its visible label; each option needs an accessible name (visible text, aria-labelledby, or aria-label) and aria-checked of true / false / mixed; Space toggles a focused checkbox; explanatory text for a jargon facet attaches via aria-describedby on the checkbox or the group.

Confidence: verified · type: constraint

Why it matters here: Makes the 'explain your jargon facets' recommendation implementable without breaking screen readers, and gives an exact acceptance spec for the filter component. Pairs with an aria-live="polite" result-count region so applying a filter announces the new count instead of silently reflowing.

Evidence: W3C WAI ARIA Authoring Practices Guide, Checkbox Pattern, https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/ (fetched 2026-08-22)

Source: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

### On-site search on package inventories fails mostly at scoping, not matching: Baymard's on-site-search benchmark reports 56% of sites have mediocre or worse search UX, 46% get category-scope autodirection wrong (failing to send a user whose query matches a category to that category's filtered list), 96% lack contextual search snippets, 37% fail to persist users' search queries, and 69% do not offer relevant autocomplete for closely misspelled terms.

Confidence: verified · type: data

Why it matters here: On a package site, most queries ARE category queries — 'Georgia', 'Maldives honeymoon', 'Ramadan Umrah'. Autodirecting those to a pre-filtered, count-bearing, URL-addressable listing (rather than a mixed keyword result set) collapses search and browse into the same surface, which is the mechanism that lets one interface serve both inspiration and intent.

Evidence: Baymard on-site search article collection, https://baymard.com/blog/collections/on-site-search (fetched 2026-08-22); individual articles referenced include 'Search UX: Autodirect or Guide Users to Matching Category Scopes' (46% get it wrong) and 'Ecommerce Search UX 2026: 8 Search Query Types' (56% mediocre or worse).

Source: https://baymard.com/blog/collections/on-site-search

## Design implications

- ORIGIN-FIRST IA. Make departure city a persistent, global, editable state — set once (asked plainly, not inferred), stored in Supabase for signed-in users and a cookie otherwise, and displayed as an always-visible editable chip in the header ('Leaving from Jeddah — change'). Every price on every card is the all-in per-person price FROM that city, in that city's currency. Air Arabia already makes 'Leaving From' its first input, so origin-awareness is table stakes regionally; making it a *global site state* rather than a form field is the differentiated version.
- SEVEN-FACET CONTRACT, ORDERED FOR THIS AUDIENCE. Expose exactly these above the fold, in this order: (1) Departure city, (2) Month / season, (3) Nights (bands: 3-4, 5-6, 7-9, 10+), (4) Budget per person (in AED/SAR, with a secondary per-day figure so trips of different lengths compare), (5) Who's going (family / honeymoon / solo female / friends / multi-generational), (6) Theme, (7) Entry requirement (visa-free / e-visa / visa needed / no-fly-over-4h). Everything else — hotel star, pace, physical level, meal basis, group size, faith facilities — lives behind one 'More filters' disclosure. This respects the ~5-7 mobile facet guidance while keeping the two facets the GCC data says drive booking (price-timing and short-haul) at the top.
- FILTER/CARD PARITY AS A BUILD RULE. Enforce in code: the package card component may not render an attribute that does not have a corresponding facet, and no facet may exist that the card never shows. Implement as a shared TypeScript union of facet keys consumed by both the card and the filter panel, so a mismatch is a compile error rather than a UX bug. This is Baymard's 38%-violation rule made structural.
- LIVE COUNTS ON EVERY OPTION, ZERO-COUNT SUPPRESSION, NEVER A DEAD END. Return facet counts and result rows from a single Supabase RPC (a Postgres function doing the filtered count aggregation in one round-trip) so counts can never drift from results. Hide or disable options whose count is 0 for the current selection. When a combination would return zero, do not render an empty page: automatically relax the least-selective filter, render results, and show an explicit, dismissible chip — 'We widened 5 nights → 4-6 nights. Undo.' Also offer the Baymard recovery set: nearest broader category, alternative month, popular trips from this departure city.
- URL IS THE STATE, AND THE URL CONTRACT IS EXPLICIT. Only two facet dimensions get real crawlable routes — destination and theme — as path segments (/packages/georgia, /packages/georgia/honeymoon), each self-canonical and in the sitemap, each with genuine editorial copy above the listing. Every other facet is a query parameter joined with '&' in a fixed, alphabetically-sorted key order so the same selection always produces byte-identical URLs. Robots.txt disallows the parameter patterns (disallow: /*?*nights=, /*?*budget=, etc.) per Google's faceted-nav doc; parameterised pages carry rel=canonical up to their path-based parent. Filter state must survive back-navigation and page refresh — a filtered listing pasted into WhatsApp must reproduce exactly.
- TWO DOORS, ONE ROOM. Build a single URL-addressable listing route, reached by two distinct entry components on the home page: an INTENT lane (departure city + month + nights, three controls, no destination required) and an INSPIRATION lane (a scrollable set of constraint-named collections — not a 'Destinations' menu). Both resolve to the same /packages URL with different pre-applied chips, so a user who arrives dreaming and a user who arrives deciding end up in the same navigable, shareable, indexable place. This is what lets one interface serve both modes without building two products.
- SEARCH AUTODIRECTS TO SCOPE. Any query that matches a destination, theme, month, or traveller type must route to the corresponding pre-filtered listing with the chip already applied and the count visible — not to a keyword result page. Handle 'Georgia', 'Maldives honeymoon', 'Eid', 'Ramadan', 'visa free' as scope queries. Persist the query in the field after submission. This is where Baymard measures 46% of sites failing, and it is the mechanism that merges search and browse.
- THE MATCHMAKER IS A VISIBLE FILTER-BUILDER, NOT A BLACK BOX. Four to six steps, each mapping 1:1 to a real facet (leaving from → month → who's going → how many nights → budget → one theme choice). Show the running result count on every step ('47 trips still match'). Every step is a URL, so it is resumable, back-navigable and shareable. It terminates in the ordinary filtered listing with the chips visible and editable — never a single 'perfect match', never an email gate, never a spinner-and-reveal. Because the payload is just filter state, the feature retains value even if the quiz-conversion claims in vendor literature are wrong.
- PER-CARD DIFFERENTIATION LINE, GENERATED. For each package, compute at query time the two or three attributes on which it differs most from its nearest neighbours in the same destination+duration cohort, and render that as a plain-language line on the card: 'The only one here with 2 nights in Kazbegi', 'Cheapest 7-night from Jeddah', 'Smallest group (max 12)'. This attacks shallow differentiation mechanically instead of relying on copywriters to differentiate 40 Georgia packages by hand.
- COMPARISON: MAX 3, DIFFERENCES-ONLY BY DEFAULT. Sticky column header carrying trip name, per-person price from the user's departure city, and nights. Rows grouped into named sections — Route & pace, What's included, Where you sleep, Money, Requirements. The 'only show differences' toggle defaults ON, with 'show everything' available. Alternating row banding. Selection persists across the listing via a floating 'Compare (2)' tray.
- NO MAP ON THE LISTING PAGE. On the package detail page, render the itinerary as a lightweight static route illustration generated at build time (SVG polyline plus numbered stop markers over a simplified basemap) — no third-party JS. If an interactive map is genuinely needed, put it behind a click-to-load facade with reserved dimensions. Hold the page to LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 on mobile; a 100KB–2MB embed on a listing page cannot coexist with that budget.
- SIMILAR-TRIP RAILS MUST STATE THEIR RULE. Never ship an unlabelled 'You may also like'. Ship three named rails with visible logic: 'Same place, fewer nights', 'Same vibe, lower price', 'Same budget, different country'. Each rail is itself a filtered listing URL, so the rail heading is a link and the rail is shareable. Explainability here is both a trust move and a navigation move.
- COLD-START PERSONALISATION USES DECLARED SIGNALS ONLY. On first visit, personalise from nothing except what the user typed or clicked in this session — departure city, month, party type. No inferred profiling, no cross-session behavioural targeting before consent. Every personalised surface carries its reason string ('Because you're leaving from Jeddah in March'). Given that roughly half of consumers report actively avoiding AI-driven recommendation features, the reason string is the feature, not the decoration.
- FAITH, VISA AND SEASON AS FIRST-CLASS DATA, NOT TAGS. Model them as typed columns with defined vocabularies in Supabase — entry_requirement enum, prayer_facilities boolean, alcohol_free_hotel boolean, meals_halal_certified boolean, female_only_group boolean, best_months int[] — so they can be faceted, counted, compared, sorted and emitted into structured data. A free-text 'tags' column cannot do any of that, and this attribute set is the part of the taxonomy competitors like Travelwings currently have nothing for.
- ACCESSIBLE FACET COMPONENT SPEC. Native <input type=checkbox> inside a fieldset or role="group" with aria-labelledby on the group; aria-describedby on any facet whose label needs explaining (the plain-language gloss for 'half board', 'twin sharing', 'physical level 3'); an aria-live="polite" region announcing '47 trips match' after each change; applied-filter chips as real buttons with accessible names of the form 'Remove filter: departure Jeddah'; 44×44 minimum touch targets; the mobile sheet's Apply button sticky at the bottom with the live count in its label.
- STRUCTURED DATA ON BOTH LAYERS. Every package page emits TouristTrip with itinerary, offers, provider and touristType, plus a co-located Product/Offer where a fixed per-person price exists (that is the type that can earn a visible rich result). Every crawlable collection page emits ItemList plus a short FAQPage answering the three questions that collection's constraint implies ('Do I need a visa?', 'Is March a good month?', 'What's the shortest option?'). Verify against Google's rich-results gallery before shipping — TouristTrip is for machine comprehension, not for SERP decoration.
- MOBILE FILTER MECHANICS, NOT A SHRUNKEN SIDEBAR. Full-screen sheet, not a split view. Batch-apply with a sticky bottom button showing the live count. Chips row above the grid, horizontally scrollable, surviving back navigation. No auto-collapse of groups the user opened, no auto-scroll on a single input, no layout shift when results swap in.

## Anti-patterns to refuse

- THE METASEARCH MIMIC HERO. A full-bleed hero photo with a flights-style From / To / Dates / Travellers box bolted on. It is wrong because the job-to-be-done is choosing a pre-built trip, and the box demands the two things an inspiration-mode user does not have (a destination and dates). It also produces a home page indistinguishable from Expedia, Kayak and every regional agency template — precisely the stated failure mode.
- 'EXPLORE' / 'DISCOVER' / 'OUR TRIPS' NAVIGATION. NN/g names vague CTA verbs as a top information-architecture mistake because they carry no information scent: nothing distinguishes 'Explore' from 'Discover', so users cannot predict what is behind either. Travel sites do this almost universally, which is exactly why avoiding it reads as intentional design.
- DESTINATION-ONLY TAXONOMY. A flat A-Z country list, or continent accordions, as the entire IA. It assumes the user already knows where they want to go — which for a package-shopping audience is the *output* of the process, not the input. It also strands every trip whose appeal is a constraint rather than a place ('4 nights, visa-free, leaves Friday').
- THE UNDIFFERENTIATED CARD GRID. Photo + country name + 'From AED 2,499'. Two attributes cannot distinguish forty Georgia packages, and choice overload research indicates the effect bites hardest precisely when options are hard to tell apart. The generic template hides differentiation inside the detail page, so the listing becomes a lottery.
- FACETS WITHOUT COUNTS, WITH ZERO-COUNT OPTIONS LEFT CLICKABLE, LEADING TO A BARE 'NO RESULTS FOUND'. Baymard calls result counts one of the highest-impact improvements available and finds nearly half of sites offer no meaningful recovery from zero results. The generic version does all three wrong at once and manufactures dead ends on an inventory that is inherently sparse.
- FILTER STATE HELD IN COMPONENT STATE, NOT THE URL. Nothing is shareable to WhatsApp, nothing is indexable, the back button destroys the user's work, and the site's most valuable long-tail SEO surface (destination × theme) never exists. This single decision forfeits both the organic-reach goal and the shareability goal.
- THE DECORATIVE LISTING-PAGE MAP. Pins over a country the user has not chosen yet, costing 100KB–2MB of third-party JavaScript, causing layout shift, and trapping mobile scroll gestures. NN/g found users did not ask for maps on results pages that lacked them. For pre-built packages geography is a route, not a pick-list — the map answers a question nobody asked at this stage.
- THE EMAIL-GATED QUIZ BLACK BOX. Five opaque questions, a fake 'analysing your preferences' delay, then a single 'your perfect trip' or 'check your inbox'. The user cannot see what was inferred, cannot edit it, cannot share it, and cannot get back to a browsable list. It converts a navigation opportunity into a lead-capture tax, and the conversion claims used to justify it are vendor-published without sample sizes or methodology.
- TWENTY COLLAPSED FACET ACCORDIONS, ALL CLOSED, IN DATABASE ORDER. Baymard lists 'presenting 20+ filter categories simultaneously' as a major mistake; mobile guidance is roughly five to seven. Ordering facets by schema convenience rather than by what users actually click buries the two facets this audience decides on.
- UNEXPLAINED TRADE JARGON AS FACET LABELS. 'Half board', 'FIT', 'twin sharing', 'land only', 'physical rating 3', 'B2B rate'. 62% of sites use unclear filter labels; users skip filters they do not understand or leave the site to look the term up. In a bilingual Arabic/English context the penalty compounds.
- THE RULELESS 'YOU MAY ALSO LIKE' CAROUSEL. No stated basis, no heading that means anything, usually the same eight best-sellers on every page. It teaches users to ignore the whole surface, and it wastes the one place where a package site can genuinely help someone choose between near-identical items.
- BEHAVIOURAL PERSONALISATION ON A COLD START. Silently profiling a first-time visitor and reordering the listing without explanation. Roughly half of consumers report reducing data sharing and actively avoiding AI-powered recommendation features; unexplained reordering also destroys the user's ability to trust that the listing is complete.
- MULTI-SELECT AS RADIO BUTTONS. Forcing one theme, one month, or one destination at a time. 14% of sites make this mistake and it directly causes abandonment — a user who wants 'Georgia OR Azerbaijan in March' is told the site cannot express their actual question.

## Differentiation moves

- ORIGIN AS IDENTITY, NOT A FORM FIELD. The site knows and displays 'from Jeddah' everywhere, permanently, editable in one click — and every single price shown is the real all-in per-person price from that city. Global operators bury origin in a dropdown and quote 'land only' prices; regional operators ask for it once and forget it. Making it the site's persistent frame is both genuinely more useful and immediately visually distinct.
- THE DIFFERENCE LINE. Every card carries a machine-generated sentence naming what makes this trip unlike its nearest neighbours — 'the only 7-night here with two nights in Kazbegi', 'smallest group on this page (max 12)', 'cheapest from Jeddah in March'. Nobody in travel does this. It turns the shallow-differentiation problem from a copywriting burden into a computed feature, and it is inherently screenshot-friendly.
- CALENDAR-SHAPED BROWSE INSTEAD OF A DATE PICKER. A twelve-month strip where each month shows the two or three trips that are genuinely best *in that month* — weather, price, crowd — rather than a date field the user must fill from memory. It matches the GCC pattern of many short trips per year and the reported 74–76% interest in shoulder-season value, and it gives the site a signature layout no template ships with.
- CONSTRAINT COLLECTIONS AS NAMED, LINKABLE OBJECTS. 'Visa-free on a Saudi passport', 'Nothing over four hours in the air', 'Works with UAE school holidays', 'Ramadan-safe pacing', 'Female-only guided', 'Back before Thursday'. Each is a real crawlable route with real editorial copy and a live count. These are labels with genuine information scent, they map onto real facets, and they occupy vocabulary space competitors have not claimed.
- SHAREABLE FILTER URLS ENGINEERED AS SOCIAL OBJECTS. Every filtered listing generates an OG image on the fly showing the applied chips, the result count, and three trip thumbnails — so pasting a filtered URL into WhatsApp or an Instagram DM renders as a designed card, not a bare link. This is the concrete bridge between the discovery IA and the organic-reach goal: the thing people share is the *search*, not just the trip.
- PUBLIC SHORTLISTS. A saved list gets its own URL and its own OG card — 'Sarra's Eid shortlist: 4 trips'. Group and family decision-making is how this audience actually books, and a linkable shortlist turns an internal wishlist feature into a distribution channel. Supabase RLS makes owner-private-by-default with an explicit publish toggle straightforward.
- THE DIFF VIEW, NOT THE SPEC TABLE. Comparison opens showing ONLY what differs between the selected trips, in plain sentences, with the identical rows collapsed behind 'and 14 things that are the same'. Baymard's testing found users strongly preferred differences-only over highlighted-differences; almost no travel site offers comparison at all, and the ones that do ship an alphabetical spec dump.
- TRANSPARENT FILTER RELAXATION. When a combination has no matches the site widens one constraint, shows results, and says exactly what it did in a chip the user can undo. Competitors show an empty page or silently ignore a filter. Saying 'we widened 5 nights → 4-6 nights' out loud is a trust signal and a teaching moment about the inventory.
- PER-DAY PRICE AS A SECOND, PERSISTENT PRICE. Show both 'AED 4,200 per person' and 'AED 600/day'. It makes trips of different lengths genuinely comparable — TourRadar uses per-day framing for its budget tiers — and it gives value-seeking travellers (54% of whom name price as the booking trigger) a metric the rest of the market does not surface.
- EDITORIAL THAT ENDS IN A LIVE LISTING. Every story or guide terminates not in a link but in an embedded, count-bearing, filtered listing block — 'the 9 trips this article is about, leaving from your city, 4,200–7,800 AED'. This is what makes inspiration and intent the same surface rather than two silos, and it is what makes programmatic destination × theme pages survive Google's thin-content bar: real editorial enrichment sitting on top of real filtered data.
- FAITH AND WOMEN-TRAVELLER ATTRIBUTES AS STRUCTURED FACETS, NOT A MARKETING PAGE. Prayer facilities, alcohol-free hotel, halal-certified meals, gender-segregated facilities, female-only group, women-friendly destination index — modelled as typed columns so they filter, count, compare and appear in structured data. GMTI 2025 sizes this at 176M arrivals growing to 245M by 2030, and the regional sites checked here have no such facet at all.

## Open questions

- What is the actual inventory size at launch? The facet architecture, count-computation strategy and the case for a comparison tool all change materially between 40 packages and 4,000. Under roughly 100, live counts can be computed naively and 'huge inventory, shallow differentiation' is not yet the problem — the problem inverts to 'thin results on most filter combinations'.
- Which departure cities are actually served, and is pricing genuinely origin-specific? The origin-first IA is the strongest differentiation move here but it is a lie if all prices are land-only with a flight bolted on. If flights are not really packaged per origin, the whole frame must change.
- Is the site bilingual Arabic/English from day one, and if so does the URL contract carry locale as a path segment? This determines whether the crawlable facet routes are duplicated per locale and how hreflang and canonical interact with the parameter-suppression strategy. Another dimension covers RTL typography, but the IA consequence (route shape) has to be decided here.
- No sourced figure was found for optimal quiz length or per-question drop-off from any independent research body — the available numbers are all vendor-published without sample sizes or methodology. Should the matchmaker's step count be settled by a live A/B test on the operator's own traffic rather than by borrowed benchmarks?
- The 74%/26% card-vs-map preference split could not be confirmed against the primary paper's abstract, and NN/g's mobile-maps research is from 2014. Is there post-2023 evidence on map-versus-list preference for *package* (as opposed to accommodation) discovery, where geography is a route rather than a pick-list?
- Does the operator have supplier-level data rich enough to populate faith, visa, pace and inclusion attributes reliably? These facets are the core differentiation move, but a facet populated for 30% of inventory is worse than no facet — it silently hides valid trips. What is the data-completeness gate before a facet ships?
- Which facet combinations have real search demand in Arabic and English for GCC-origin queries? The decision about which combinations get crawlable path routes versus robots-disallowed parameters should follow keyword data, not intuition, and Google's guidance is explicit that unneeded facet URLs should simply be blocked.
- How will the 'difference line' be computed and validated? A generated claim like 'cheapest from Jeddah in March' is a factual assertion on a commercial page; it needs a guaranteed-correct derivation from the same query that produced the listing, and a rule for what to show when no meaningful difference exists.
- Should saved shortlists be public-by-default with an opt-out, or private-by-default with an explicit publish action? The organic-reach upside argues one way and the privacy findings argue the other; this needs an explicit decision recorded in .memory/projects/ rather than a default inherited from a library.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### PARTIALLY_TRUE — Baymard measured 67–90% abandonment on mediocre product-list sites vs 17–33% on optimised ones, a potential up-to-4x increase in leads.

Numbers verify verbatim on the source: 'sites with mediocre product list usability saw abandonment rates of 67-90%, whereas sites with just a slightly optimized toolset saw only 17-33% abandonments' and 'This translates into as much as a 4-fold increase in leads.' But Baymard's methodology page confirms these are LAB TASK abandonment rates from moderated qualitative testing, not live analytics or conversion data. The 4x is Baymard's extrapolation, not a measured lift. https://baymard.com/research/ecommerce-product-lists and https://baymard.com/research/methodology

Corrected: In Baymard's moderated lab testing, participants abandoned product-finding TASKS on 67–90% of attempts on sites with mediocre product-list usability versus 17–33% on sites with a slightly optimised toolset; Baymard extrapolates this to as much as a 4-fold increase in leads.

### CONFIRMED — 36% of benchmarked sites have product-list flaws Baymard calls 'downright harmful'; average site needs ~35 design changes.

Both verify verbatim: '36% of sites to have such severe design and feature flaws that it was downright harmful to their users' ability to find and select products' and 'On average each site will need to make 35 design changes to achieve optimal product list usability.' Benchmark is 344 top-grossing US/EU sites, 83 guidelines. Independently echoed by FACT-Finder. Caveat: the benchmark is heuristic expert review, not user testing. https://baymard.com/research/ecommerce-product-lists

### CONFIRMED — Filter/list-item parity: 38% of sites violate it, 42% when first measured in 2015.

Verbatim on the source: '38% of sites don't provide filtering options for even the product attributes they include as list item info' and 'this was 42% of sites back in 2015 when we first started to track the issue.' Published 17 Sept 2019 by Edward Scott. The 2019 date is a real staleness flag the researcher correctly raised. https://baymard.com/blog/have-filters-for-list-item-info

### STALE — 42% of top e-commerce sites lack category-specific filter types and 20% lack thematic filters — presented as current Baymard findings.

REFUTED as current data. Both figures trace to Christian Holst, 'The Current State Of E-Commerce Filtering', Smashing Magazine, 20 April 2015 — verbatim: '42% of top e-commerce websites lack such category-specific filtering types for several of their core product verticals' and '20% of top e-commerce websites still lack thematic filters.' That study benchmarked 50 major US sites against 93 guidelines, a different and smaller sample than the current 344-site benchmark. Eleven years old, not re-benchmarked as claimed. https://www.smashingmagazine.com/2015/04/the-current-state-of-e-commerce-filtering/

Corrected: As of Baymard's April 2015 benchmark of 50 major US sites, 42% lacked category-specific filter types for several core verticals and 20% lacked thematic filters. No current-benchmark equivalent of these figures could be located.

### CONFIRMED — 62% of sites use unclear, jargon-heavy filter labels; users skip, google the term, or apply-and-remove to reverse-engineer meaning.

Verified on source: '62% of sites use unclear labels', published 27 Feb 2024. All three user behaviours documented, including 'users who encounter ambiguous filter options can end up spending time applying and removing filter options just to understand their effect' and the offsite-search risk ('If users go offsite to learn the unknown term, there's a risk they won't return'). https://baymard.com/blog/explain-industry-specific-filters

### CONFIRMED — 14% don't allow multiple options per filter category; 20% fail to keep applied filters visible; 25% desktop/40% mobile use unclear labels; match counts are a highest-impact improvement.

All four verify verbatim, including 'Displaying the number of matching products next to each filter option (e.g., Blue (34))... is one of the single highest-impact improvements you can make to a filter UI' and the zero-results dead-end listed among major mistakes ('Allowing users to select a combination that produces no result, then showing them an empty page, is a dead end'). Note the 62% (claim 5) and 25%/40% (claim 6) measure different constructs and must not be stacked. https://baymard.com/learn/ecommerce-filter-ui

### CONFIRMED — Nearly 50% of sites fail at no-results recovery; Baymard prescribes five recovery strategies.

Verbatim: 'nearly 50% of sites fail to provide users with effective ways to recover from a search that yields no results.' Five strategies confirmed: related categories, alternative searches, personalised recommendations, sales phone/chat/help links, popular products and categories. Published 4 Feb 2019 but LAST UPDATED 18 Feb 2025 — so it is current, and the researcher's staleness worry is unwarranted here. https://baymard.com/blog/no-results-page

### CONFIRMED — Google's faceted-nav doc (updated 2025-12-18) prescribes '&' separators, robots.txt patterns, fragments, 404 on empty facets, canonical/nofollow limits; calls faceted nav the most common source of overcrawl.

Every prescription verifies verbatim, including 'Return an HTTP 404 status code when a filter combination doesn't return results', 'Google Search generally doesn't support URL fragments in crawling and indexing', 'Every anchor pointing to a specific URL must have the rel=nofollow attribute in order for it to be effective', and last-updated 2025-12-18 UTC. The overcrawl quote is confirmed from the companion Crawling December post: 'Faceted navigation is by far the most common source of overcrawl issues site owners report to Google.' Gary Illyes further quantifies it at ~50% of all reported crawl issues. https://developers.google.com/crawling/docs/faceted-navigation

### PARTIALLY_TRUE — Airbnb's 'I'm Flexible' logged 500M+ flexible searches within ~5 weeks of its 30 June 2021 launch; later 2 billion; wishlists rose 51%/160%/355%.

Wishlist figures verify verbatim (51% treehouses, 160% boats, 355% domes), as does the 500M milestone and the later 2-billion figure (reported March 2023). But the launch framing is wrong: 'I'm Flexible' flexible-DATE search launched 24 May 2021 in the Airbnb 2021 Summer Release; 30 June 2021 was the separate Flexible Destinations launch. The 4 Aug 2021 release says 500M+ flexible-date searches accumulated 'in just a few months', not five weeks. https://www.hospitalitynet.org/news/4105817.html and https://www.cnbc.com/2021/05/24/airbnbs-big-new-update-is-focused-on-flexibility-heres-whats-new.html

Corrected: Airbnb's 'I'm Flexible' flexible-date search launched 24 May 2021; by 4 August 2021 Airbnb reported more than 500 million flexible-date searches, and by March 2023 more than 2 billion. Flexible browsing shifted wishlist additions: +51% treehouses, +160% boats, +355% domes.

### CONFIRMED — NN/g recommends omitting maps from mobile results pages, documents swipe ambiguity, and no test user asked for a missing map; a 2024 study found 74% preferred card over map view (flagged unverified).

NN/g quotes verify verbatim: 'on mobile websites, maps on location search-results pages can safely be omitted', the pan-instead-of-scroll gesture conflict, and 'not a single user commented that they wished that a map had been provided.' Published 19 Jan 2014 — genuinely stale, correctly flagged. The 74/26 split the researcher could NOT confirm IS in the arXiv:2405.11243 full text with N=200: 'The majority (74%) preferred the card view, with only 26% opting for the map view.' 83% vs 36% rated card view good-or-better for surfacing sustainable options. https://www.nngroup.com/articles/mobile-maps-locations/ and https://arxiv.org/html/2405.11243v1

### CONFIRMED — Embeds ship 100KB+ JS, sometimes 2MB, are render-blocking, cause CLS; facade pattern is the fix. CWV good thresholds LCP 2.5s, INP 200ms, CLS 0.1 at p75 by device.

web.dev embed article verbatim: 'Many popular embeds include over 100 KB of JavaScript, sometimes even going up to 2 MB', render-blocking and CLS confirmed, facade and click-to-load recommended with width/height reservation. Last updated 2021-10-05 (correctly flagged as old). CWV thresholds confirmed on web.dev/articles/vitals (updated 2024-10-31) at the 75th percentile 'segmented across mobile and desktop devices', and independently confirmed unchanged as of 2026 — no new Core Web Vital has been added since INP replaced FID in March 2024. https://web.dev/articles/embed-best-practices and https://web.dev/articles/vitals

### PARTIALLY_TRUE — ~38% of top-60 sites have a comparison feature; four fixes including an 'only show differences' toggle preferred over highlighting.

The four techniques verify on the 2022 article (remove identical attributes, group by category, persist column headings on scroll, horizontal row styling), with a participant quote confirming users preferred hiding over highlighting: 'hiding is more helpful, so you could kind of parse out the differences faster that way.' But the 38% figure is NOT on that article — it sits on Baymard's comparison-tool design-examples page: '38% of the top 60 e-commerce sites have implemented a dedicated comparison tool.' Attribution must be split across two URLs. https://baymard.com/blog/user-friendly-comparison-tools and https://baymard.com/ecommerce-design-examples/39-comparison-tool

### PARTIALLY_TRUE — Choice overload is real but conditional; meta-analysis found ~zero average effect with heterogeneity; a better-powered re-test finds it occurs more often than detected.

arXiv:2212.03931 (Dean, Ravindran, Stoye; submitted 7 Dec 2022, v4 revised 13 Aug 2026) states verbatim: 'We argue that existing tests are likely to be underpowered and hence that choice overload may occur more often than the literature suggests', and reports 'strong evidence of choice overload that would likely be missed using current approaches.' But the near-zero meta-analytic estimate is NOT from this paper — it is Scheibehenne, Greifeneder & Todd, Journal of Consumer Research 37(3), Oct 2010: 63 conditions from 50 experiments, N=5,036, 'mean effect size of virtually zero but considerable variance between studies.' The 'hard to differentiate' moderator remains secondhand via CMSWire and is still unverified. https://arxiv.org/abs/2212.03931 and https://academic.oup.com/jcr/article-abstract/37/3/409/1827647

### CONFIRMED — Facet UI accessibility: role=group with aria-labelledby, accessible name per option, aria-checked true/false/mixed, Space toggles, aria-describedby for jargon explanation.

Every element verifies verbatim in the W3C ARIA APG Checkbox Pattern, including 'If a set of checkboxes is presented as a logical group with a visible label, the checkboxes are included in an element with role group that has the property aria-labelledby set to the ID of the element containing the label', the three aria-checked states (true/false/mixed), 'Pressing the Space key changes the state of the checkbox', and the aria-describedby guidance for descriptive static text on a checkbox or checkbox group. https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

### PARTIALLY_TRUE — Baymard on-site search: 56% mediocre-or-worse, 46% wrong category-scope autodirection, 96% lack snippets, 37% don't persist queries, 69% no misspelling autocomplete.

Four of five verify exactly against article titles: 46% get category scope wrong, 96% get contextual search snippets wrong, 37% don't persist queries, 69% don't offer autocomplete for closely misspelled terms. The fifth is reworded: the title reads 'Ecommerce Search UX 2026: 8 Search Query Types UX Best Practices (56% of Sites Have Issues)' — 56% have issues across eight query types, not '56% have mediocre or worse search UX'. https://baymard.com/blog/collections/on-site-search

Corrected: Baymard's on-site-search benchmark reports 56% of sites have issues across the eight search query types, 46% get category-scope autodirection wrong, 96% get contextual search snippets wrong, 37% don't persist users' search queries, and 69% don't offer relevant autocomplete for closely misspelled terms.

### PARTIALLY_TRUE — TouristTrip/TouristAttraction/TouristDestination are parsed but trigger no visual rich result; Product, Event and Hotel types do.

The first half is now VERIFIED against Google's own source rather than practitioner reporting — none of the three tourist types appear in Google's structured-data search gallery. But the second half is FALSE on one type: Hotel is NOT listed in the gallery. The supported list is Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription/paywalled content, Vacation rental, Video. TouristTrip's properties (itinerary, offers, provider, touristType, arrivalTime, departureTime) all verify on schema.org. https://developers.google.com/search/docs/appearance/structured-data/search-gallery and https://schema.org/TouristTrip

Corrected: TouristTrip, TouristAttraction and TouristDestination are absent from Google's structured-data search gallery and trigger no visual rich result, though they aid entity understanding. Product, Event and Vacation rental ARE supported gallery types; Hotel is not. TouristTrip's package-relevant properties are itinerary, offers, provider, touristType, arrivalTime and departureTime.

### CONFIRMED — Marriott Bonvoy 2025 UAE/KSA study: ~7 trips in 2025 (2.7/2.3/2.1), 84% same-or-more, 54% 'special price' top trigger (51% UAE / 57% KSA), 76% UAE / 74% KSA shoulder-season.

Every figure verifies verbatim across Gulf News and Marriott's release, including 'getting a special price' (54% - 51% in UAE and 57% in KSA) and 'Three-quarters (76% in UAE and 74% in KSA) say that they have, or have considered' shoulder-season breaks. Sample the researcher omitted, which strengthens the claim: 4,700+ UAE/KSA travellers within a 21,374-adult study across ten EMEA markets. Staleness risk: Marriott has since published a 2026 UAE/KSA edition (lux-scaping, passion pursuits, two-thirds trusting AI to book accommodation) that the researcher missed. https://gulfnews.com/business/tourism/uae-saudi-travellers-will-take-at-least-7-holidays-in-2025-travel-trends-revealed-1.500044217

### PARTIALLY_TRUE — Qualtrics 2025 privacy/personalisation report (2024 study, 23,000+ consumers); secondary: two-thirds want tailored experiences, 41% think benefits justify privacy cost, 51% reduced data sharing, 54% avoided AI recommendations.

Qualtrics methodology confirmed and sharpened: 23,730 consumers across 23 countries (~1,200 each, including the UAE), but FIELDED Q3 2023 — roughly three years old, staler than implied. Purchase history and site visits as top personalisation candidates confirmed. The secondary figures are misattributed: per Forbes (21 Apr 2026), 51% reduced data sharing is Relyance AI's 2025 Consumer Trust Survey and 54% avoided AI features is Cisco's 2024 Consumer Privacy Survey — neither is Qualtrics. The 41% figure does not appear in that Forbes article. A Qualtrics 2026 edition now exists (20,000+ consumers, 14 countries). https://www.forbes.com/sites/garydrenik/2026/04/21/personalization-to-paranoia--why-consumers-pull-back-as-ai-expands/

Corrected: Qualtrics XM Institute's 2025 privacy/personalisation report (fielded Q3 2023, 23,730 consumers across 23 countries including the UAE) names purchase history and site visits as top personalisation candidates and ties comfort to trust in data practices. Separately, Relyance AI's 2025 survey found 51% have reduced data sharing over AI concerns and Cisco's 2024 Consumer Privacy Survey found 54% have avoided AI-powered features. A Qualtrics 2026 edition now supersedes the 2025 report.

### PARTIALLY_TRUE — GMTI 2025: 176M Muslim arrivals in 2024 (+25%), 245M by 2030, US$230bn spend, new Women-Friendly and Accessible sub-indexes.

Headline figures verify: 176 million international Muslim arrivals in 2024, up 25%, projected 245 million by 2030 with USD 230 billion spend; 10th edition covering 153 destinations. The new Muslim Women-Friendly Destination sub-index is confirmed (Singapore ranked No. 1, scored on the ACES 'Environment' dimension — general safety, absence of faith restrictions, sustainability), created because more Muslim women travel solo and in female-only groups. STALENESS: a GMTI 2026 edition is already published (Malaysia 82; Indonesia, Türkiye, Saudi Arabia 79), so the 2025 edition is no longer current as of 2026-08-22. https://www.crescentrating.com/magazine/all/4297/gmti-2025-the-official-ranking-of-the-top-40-safest-destinations-for-muslim-women-travelers.html and https://crescentrating.com/insights/gmti

Corrected: GMTI 2025 (10th edition, June 2025) reported 176 million international Muslim arrivals in 2024, up 25%, projected to 245 million by 2030 with US$230bn spend, and introduced Muslim Women-Friendly and Muslim-Friendly Accessible destination sub-indexes. A GMTI 2026 edition has since been published and should be used for current figures.

### PARTIALLY_TRUE — Air Arabia Holidays leads with 'Leaving From' (SHJ/AUH), Africa/Asia/Europe/India grouping, three product tabs, AED/USD per room per night, star-rating filters only; Travelwings 12 geographic groupings, AED 999–36,700+, 3–19 nights, no halal or visa category.

Structural claims verify: 'Leaving From' is the first input, hubs are Sharjah (SHJ) and Abu Dhabi (AUH), destinations group as Africa/Asia/Europe/India, tabs are Packages | Hotels | Customized Holidays, star-rating filtering present. Corrections: pricing units are MIXED (packages per person, e.g. AED 999 per person; hotels per room per night) and currencies extend beyond AED/USD to GBP and others. Travelwings verifies on AED 999–36,700+, 3–19 nights, per-person double-sharing, and named regions including 'The Caucasus and Central Asia' and 'The Balkans and the Adriatic' — but it does surface a 'Holiday Themes' nav entry, so 'no thematic category' overstates it; the accurate gap is no halal, visa, or faith-constraint category. https://holidays.airarabia.com/ and https://www.travelwings.com/ae/en/holidays/index.html

### PARTIALLY_TRUE — TourRadar Middle East exposes facets with live counts: River Cruise 538, Adventure 288, Group 3,123, Solo 1,747, budget from $28/day, luxury from $104/day, over 4,700 tours.

Facet STRUCTURE fully verifies — Travel Styles, Group type, Demographics, duration presets, per-day budget framing, seasonal buckets, 4,700+ inventory, and card anatomy (rating + review count, traveller quote, map, duration, destinations, age range, operator, discounted price). Several counts verify exactly (River Cruise 538, Adventure 288, Coach/Bus 141, Hiking 92, Group 3,123, Small Group 1,482, Private 1,507, Solo 1,747, Couples 1,656, Seniors 435, Young Adults 29). But price floors have already drifted: budget now from $32/day (not $28) and luxury from $121/day (not $104), within hours of the researcher's capture. https://www.tourradar.com/d/middle-east

Corrected: TourRadar's Middle East listing demonstrates package faceting with live counts across Travel Styles, Group type, Demographics, duration presets, per-day budget framing and seasonal buckets over 4,700+ tours. Specific counts and price floors are volatile and drift within hours — cite the facet structure, not the numbers.

### CONFIRMED — Quiz/matchmaker conversion evidence is vendor-generated and thin: Interact reports 40.1% start-to-lead, 65% start-to-finish, e-commerce 37.6%/55.5%, with no methodology.

All four percentages verify exactly, updated 25 Dec 2025. The skepticism is warranted, with one nuance: the report does gesture at a base ('over 80 million leads generated since 2013') but discloses no sample for the specific figures, no date range, no methodology, and no per-question drop-off. The researcher's core conclusion — no independent sourced figure exists for optimal question count or per-question drop-off — holds. https://www.tryinteract.com/blog/quiz-conversion-rate-report/

### PARTIALLY_TRUE — Facet count/ordering: ~5-7 facets per page on mobile; more than six options → alphabetical; ~40-character truncation for multi-select chip summaries.

Both FACT-Finder quotes verify verbatim: 'A good rule of thumb is to offer five to seven facets per search results or category page' and 'If a facet has more than six options, alphabetical sorting is often the way to go.' But FACT-Finder is a commercial site-search vendor and its page carries no study, sample, or publication date — this is vendor heuristic, not research. Same category for the Pencil & Paper 40-character figure. Neither threshold has an independent evidentiary base. Use as testable defaults, not evidenced rules. https://www.fact-finder.com/blog/faceted-search/

Corrected: Vendor and practitioner guidance (FACT-Finder; Pencil & Paper) suggests roughly five to seven facets per mobile results page, alphabetical ordering once a facet exceeds about six options, and ~40 characters as a chip-summary truncation point. None carry a published study or sample; treat as starting defaults to validate, not evidenced thresholds.

### Corrections applied

- CORRECTED (claim 1): Baymard's 67–90% vs 17–33% figures are TASK abandonment observed in moderated lab usability testing (25 rounds, 4,400+ participant/site sessions across 19 sites), not live conversion or checkout abandonment. The 'up to 4-fold increase in leads' is Baymard's own extrapolation from that lab gap, not a measured A/B or field lift. Cite it as directional evidence that list/filter quality dominates discovery outcomes — never as a forecast of a 4x revenue result.
- CORRECTED (claims 1, 2, 3, 5, 6, 25): Every Baymard '% of sites' figure comes from heuristic expert evaluation, not user testing. Baymard staff score 344 top-grossing US/EU sites against ~810 review heuristics, reviewing 15–30 pages per site, producing 275,000+ manually assigned scores. Treat these as 'how many sites a UX reviewer would fault', not as measured user failure rates.
- CORRECTED (claim 4): The 42% lacking category-specific filters and 20% lacking thematic filters are NOT current benchmark figures. They trace to Christian Holst, 'The Current State Of E-Commerce Filtering', Smashing Magazine, 20 April 2015, benchmarking 50 major US sites against 93 guidelines. They are eleven years old and drawn from a smaller, different sample than today's 344-site benchmark. Do not present them as current-state industry data; the thematic-facet recommendation stands on its own merits without them.
- CORRECTED (claim 11): Airbnb's 'I'm Flexible' (flexible dates) launched 24 May 2021 as part of the Airbnb 2021 Summer Release; 30 June 2021 was the separate 'Flexible Destinations' launch. Airbnb's 4 August 2021 milestone release reports 500M+ flexible-date searches accumulated 'in just a few months' — roughly ten weeks since the May launch, not five weeks. The wishlist lifts (51% treehouses, 160% boats, 355% domes) and the later 2-billion-searches milestone (reported March 2023) are confirmed.
- CORRECTED (claim 12): The 74% card-view vs 26% map-view preference IS verified, not unconfirmed. Banerjee, Mahmudov & Wörndl (arXiv:2405.11243) state it in the full text with N=200: 'The majority (74%) preferred the card view, with only 26% opting for the map view.' 83% rated the card view 'good' or better for surfacing sustainable options versus 36% for the map view.
- CORRECTED (claim 17): The three secondary figures come from three different studies and must not be bundled under Qualtrics. Per Forbes (21 April 2026): 51% having reduced data sharing is from the Relyance AI 2025 Consumer Trust Survey; 54% having avoided AI-powered features is from the Cisco 2024 Consumer Privacy Survey. The 41% 'benefits justify privacy cost' figure does not appear in that Forbes article. Separately, the Qualtrics 2025 report's data was fielded in Q3 2023 (23,730 consumers, 23 countries, ~1,200 each, including the UAE) and a 2026 edition now exists (20,000+ consumers, 14 countries, 2025 Global Consumer Study).
- CORRECTED (claim 23): Google's structured-data gallery does NOT list Hotel as a supported rich result type. The supported list includes Product, Event and Vacation rental — not Hotel. The claim that TouristTrip, TouristAttraction and TouristDestination trigger no visual rich result is now verified against Google's own gallery (none are listed), upgrading it from practitioner reporting. Use Product with Offer for a package that needs a visible rich result.
- CORRECTED (claim 21): TourRadar's live facet counts and price floors have already drifted since the researcher captured them — budget now reads from $32/day (not $28) and luxury from $121/day (not $104). Additional Travel Styles not captured include Ancient Wonders (3,079), Fully Guided (3,374), City & Culture (922) and Sailing (85). Treat every TourRadar number as a volatile snapshot illustrating a facet SHAPE, never as a stable design input.
- CORRECTED (claim 25): Baymard's article title is 'Ecommerce Search UX 2026: 8 Search Query Types UX Best Practices (56% of Sites Have Issues)' — 56% of sites have issues across the eight query types, which is not the same as '56% have mediocre or worse search UX'. The other figures verify exactly against their article titles: 46% get category-scope autodirection wrong, 96% get contextual search snippets wrong, 37% don't persist search queries, 69% don't offer autocomplete for closely misspelled terms.
- CORRECTED (claims 5 and 6): The 62% and the 25%/40% figures measure different things and should not be stacked as if cumulative. 62% is the share failing to EXPLAIN industry-specific filters ('Always Explain Industry-Specific Filters (62% Don't)', 27 Feb 2024). The 25% desktop / 40% mobile figure is the share using unclear LABELS for category-specific filters. Quote them separately.
- CORRECTED (claim 8): The 'five to seven facets per page on mobile' and 'more than six options → alphabetical' rules are vendor guidance from FACT-Finder, a commercial site-search vendor, not independent research. Both quotes verify verbatim on their page, but the page carries no primary study, sample, or publication date. Treat as a defensible starting heuristic to test, not as an evidenced threshold. Same category for the Pencil & Paper ~40-character truncation figure.
- CORRECTED (claim 20): Air Arabia Holidays shows mixed pricing units, not a uniform 'per room per night' — packages display per-person prices (e.g. AED 999 per person) while hotel listings show per room per night — and offers more currencies than AED/USD (GBP and others). Travelwings does surface a 'Holiday Themes' navigation entry alongside its ~12 geographic groupings, so 'no thematic category at all' overstates the gap; the accurate finding is that it has no halal, visa, or faith-constraint category. Its AED 999–36,700+, 3–19 nights, per-person double-sharing basis all verify.
- CORRECTED (claim 14): The 38% figure is not on the article cited. The four comparison-tool techniques come from Baymard's 19 Oct 2022 article; the '38% of the top 60 e-commerce sites have implemented a dedicated comparison tool' figure sits on Baymard's comparison-tool design-examples page. Split the attribution across the two URLs.
- CORRECTED (claim 15): The near-zero meta-analytic estimate is not from the Dean/Ravindran/Stoye paper. It is Scheibehenne, Greifeneder & Todd, Journal of Consumer Research 37(3), October 2010 — 63 conditions from 50 experiments, N=5,036, 'mean effect size of virtually zero but considerable variance between studies'. Attribute the meta-analysis and the better-powered re-test separately.

### Flagged as not covered

- Arabic and RTL support is completely absent, and it is the single largest IA omission for a GCC travel product. Mirrored layout inverts filter sidebar placement, chip wrap direction, breadcrumb order, price-and-currency adjacency, and card scan path. Arabic-Indic versus Western numerals for prices, nights and dates is an unresolved product decision. None of the cited Western benchmarks (Baymard's 344 sites are US/EU) tested RTL, so their layout findings transfer with unknown fidelity.
- No accessibility coverage of the dynamic behaviour the dimension actually recommends. Claim 7 prescribes real-time desktop filtering where results update on selection, but the research never specifies an ARIA live region to announce the updated result count. Real-time filtering without aria-live is a silent content swap for screen reader users. The checkbox pattern covers the controls but not the consequence.
- Hijri calendar and Ramadan/Hajj/Umrah/Eid seasonality are not treated as facets, despite the dimension arguing that month is a primary constraint axis for a GCC audience. School-holiday calendars differ between UAE and KSA and drive package demand more than Gregorian season labels.
- Newer editions of three cited market sources are already published and were missed: Marriott's 2026 UAE/KSA edition, Qualtrics XM Institute's 2026 privacy/personalisation report, and GMTI 2026. The Qualtrics 2025 data was fielded in Q3 2023, making it roughly three years old.
- No privacy or consent regulation is addressed, despite recommending personalisation. UAE Federal Decree-Law 45/2021 (PDPL) and Saudi Arabia's PDPL govern consent for profiling in the exact target market, and GDPR applies to EU visitors. Personalised recommendations and recently-viewed surfacing on the discovery page are regulated processing, not just a UX choice.
- Price-display and consumer-protection rules are unaddressed. The competitor analysis notes Air Arabia mixes per-person and per-room-per-night units and Travelwings quotes per-person double-sharing — a comparability problem that is also a disclosure obligation. All-in pricing, taxes and mandatory fees must be settled before facet design, because 'per-person budget' as a filter axis is meaningless if the underlying unit is inconsistent.
- Filter state in the URL is asserted as the answer but never specified: no guidance on parameter naming, canonical parameter ordering (so ?city=dxb&month=nov and ?month=nov&city=dxb do not become two URLs), URL length limits, or which facet combinations should be indexable landing pages versus robots-disallowed. Google's doc tells you how to suppress crawling; it does not tell you which of your facets deserve to rank.
- No performance budget for the listing page itself. The research covers third-party map embeds and Core Web Vitals thresholds but never addresses the CLS and INP cost of the recommended real-time filtering pattern — re-rendering a result grid on every checkbox toggle is precisely an INP and layout-shift risk, and INP is the most commonly failed Core Web Vital.
- Nothing on how a 300-package inventory acquires the structured attribute data every facet depends on. Facet parity, match counts, thematic facets and comparison tables all assume clean per-package attributes (board basis, transfer included, visa required, prayer facilities, alcohol-free). Without an attribute-completeness audit and an editorial process, the IA is unbuildable.
- No treatment of sort as distinct from filter. Baymard's research is cited as 'product lists and filtering' throughout, but default sort order on a package listing — price ascending, popularity, departure-date proximity — is a separate high-leverage decision determining what a user sees before touching any filter.
- No zero-result PREVENTION, only recovery. Baymard's five no-results strategies are recovery-side. Disabling or greying facet options that would yield zero results, and showing match counts (already established as highest-impact), prevent the dead end from occurring — a cheaper fix than recovering from it.

## Sources

- [E-Commerce Product Lists & Filtering UX — research overview](https://baymard.com/research/ecommerce-product-lists) · Baymard Institute · Ongoing benchmark; 2025 edition cited (fetched 2026-08-22)  
  67–90% vs 17–33% abandonment gap; 36% of sites harmful to discovery; ~35 changes per site; 83 guidelines from 700+ issues; 344-site benchmark methodology.
- [What Is an Ecommerce Filter? UI Best Practices](https://baymard.com/learn/ecommerce-filter-ui) · Baymard Institute · Fetched 2026-08-22  
  14% no multi-select; 20% applied filters not visible; 25% desktop / 40% mobile unclear labels; result counts as highest-impact improvement; desktop instant-filter vs mobile Show-X-Results; 44×44 targets; the four major pitfalls including zero-result dead ends and 20+ simultaneous filter categories.
- [Filter List Design: Have Filters for All Displayed List Item Info (38% Don't)](https://baymard.com/blog/have-filters-for-list-item-info) · Baymard Institute · 2019-09-17 (FLAG: pre-2023)  
  The filter/list-item parity rule and the 38% (formerly 42% in 2015) violation rate; test observations of abandonment when an expected filter is missing.
- [Always Explain Industry-Specific Filters (62% Don't)](https://baymard.com/blog/explain-industry-specific-filters) · Baymard Institute · 2024-02-27  
  62% unclear filter labels; the four user behaviours on encountering jargon; the remedy set (de-jargon, tooltips, thumbnails).
- [5 Proven UX Strategies For 'No Results' Pages](https://baymard.com/blog/no-results-page) · Baymard Institute · Published 2019-02-04, updated 2025-02-18  
  Nearly 50% of sites fail at no-results recovery; the five recovery strategies including linking to a pre-filtered list rather than a bare category.
- [4 Ways to Optimize the Comparison Feature for Scanning](https://baymard.com/blog/user-friendly-comparison-tools) · Baymard Institute · 2022-10-19 (FLAG: pre-2023)  
  'Only show differences' preferred over highlighting; grouping specs by named category; sticky column headers; horizontal row banding. Companion piece supports the 38%-have / 17%-don't comparison-tool figures.
- [On-Site Search article collection](https://baymard.com/blog/collections/on-site-search) · Baymard Institute · Fetched 2026-08-22  
  56% mediocre-or-worse search UX; 46% get category-scope autodirection wrong; 96% lack contextual snippets; 37% do not persist queries; 69% fail autocomplete on close misspellings.
- [Managing crawling of faceted navigation URLs](https://developers.google.com/crawling/docs/faceted-navigation) · Google (Crawling Infrastructure docs) · Last updated 2025-12-18  
  '&' separator requirement; robots.txt disallow patterns; URL fragments as a non-crawled alternative; HTTP 404 for impossible filter combinations; the limited effect of rel=canonical and the all-anchors requirement for nofollow; faceted nav as the most common overcrawl source.
- [Crawling December: Faceted navigation](https://developers.google.com/search/blog/2024/12/crawling-december-faceted-nav) · Google Search Central Blog · December 2024  
  The block-if-not-needed versus follow-best-practices-if-needed decision framing for facet URLs.
- [Web Vitals](https://web.dev/articles/vitals) · Google / Chrome team (web.dev) · Last updated 2024-10-31  
  Current Core Web Vitals thresholds: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, assessed at the 75th percentile segmented by mobile and desktop.
- [Best practices for lazy loading and embed performance](https://web.dev/articles/embed-best-practices) · Google / Chrome team (web.dev) · Last updated 2021-10-05 (FLAG: pre-2023)  
  Third-party embeds commonly 100KB–2MB of JavaScript; render-blocking and CLS risk; the facade / click-to-load mitigation and dimension reservation.
- [3 Common IA Mistakes (that Are All Due to Low Information Scent)](https://www.nngroup.com/articles/3-ia-mistakes/) · Nielsen Norman Group (Page Laubheimer) · 2023-04-16  
  Vague CTA labels ('Explore', 'Discover', 'Learn') as a named IA mistake; forced parallel language; awkward conversational labels; labels needing explanation do not belong in navigation.
- [Information Scent: How Users Decide Where to Go Next](https://www.nngroup.com/articles/information-scent/) · Nielsen Norman Group (Raluca Budiu) · 2020-02-02  
  Definition of information scent and information-foraging basis; the four components (label, supporting text, context, prior knowledge); guidance on representative imagery and category summary text.
- [Maps and Location Finders on Mobile Devices](https://www.nngroup.com/articles/mobile-maps-locations/) · Nielsen Norman Group (Aurora Harley) · 2014-01-19 (FLAG: well pre-2023, cite as principle not current evidence)  
  Recommendation to omit maps from mobile search-results pages; swipe ambiguity / scroll trapping; touch-target failure on clustered pins; no user asked for a missing map.
- [A Better Test of Choice Overload](https://arxiv.org/abs/2212.03931) · arXiv — Mark Dean, Dilip Ravindran, Jörg Stoye · Submitted 2022-12-07, latest revision 2026-08-13  
  Existing choice-overload tests are underpowered; better-powered testing finds overload more prevalent than prior literature detected — the basis for 'differentiate, do not delete' rather than naive assortment reduction.
- [The 'less is better' paradox and consumer behaviour: a systematic review of choice overload](https://www.emerald.com/qmr/article/28/1/122/1245028/The-less-is-better-paradox-and-consumer-behaviour) · Qualitative Market Research 28(1) 122–145 (Dar & Gul) · 2025  
  PRISMA systematic review of 53 articles, 2000–2023, on choice-overload antecedents, moderators and outcomes; establishes the effect is context-dependent rather than universal.
- [9 best practices for faceted search](https://www.fact-finder.com/blog/faceted-search/) · FACT-Finder · Fetched 2026-08-22  
  Five to seven facets per results page on mobile; alphabetical ordering once a facet exceeds ~six options; order facets by click behaviour; thematic facets by occasion and intended use; interdependent facets; multi-select before a single apply.
- [Filter UX Design Patterns & Best Practices](https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-filtering) · Pencil & Paper (Fanny Vassilatos, Ceara Crawshaw) · 2026-03-16  
  ~40-character truncation point for multi-select chip summaries; 2–3 line chip wrap ceiling; sidebar vs inline vs filter-bar placement trade-offs; live vs per-filter vs batch apply guidance.
- [Filtering UX](https://smart-interface-design-patterns.com/articles/filtering-ux/) · Smart Interface Design Patterns (Vitaly Friedman) · 2022-12-26 (FLAG: pre-2023)  
  Sticky mobile Apply button with live count; full-page overlay over split-screen on mobile; applied filters above results to avoid layout shift; never freeze the UI or auto-collapse groups during filtering.
- [Checkbox Pattern — ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) · W3C Web Accessibility Initiative · Fetched 2026-08-22  
  role=checkbox, aria-checked true/false/mixed, Space to toggle, role=group + aria-labelledby for facet groups, aria-describedby for facet explanations.
- [New Milestone: More Than 500 Million Flexible Searches On Airbnb](https://www.hospitalitynet.org/news/4105817.html) · Hospitality Net (carrying Airbnb newsroom release) · 2021-08-04 (FLAG: pre-2023 as a trend datapoint)  
  500M+ flexible-date searches within ~5 weeks of the 2021-06-30 launch; wishlist increases of 51% treehouses, 160% boats, 355% domes; treehouses/beachfront/houseboats as top booked categories from flexible search.
- [Middle East tours listing (live facet inventory)](https://www.tourradar.com/d/middle-east) · TourRadar · Fetched 2026-08-22  
  Working example of package faceting with live counts across travel style, group type, demographics, duration, per-day budget and seasonal buckets over 4,700+ tours; the eight-signal card anatomy.
- [Flight + Hotel & Holiday Packages from UAE](https://holidays.airarabia.com/) · Air Arabia Holidays · Fetched 2026-08-22  
  Regional baseline: 'Leaving From' as the first search input, SHJ/AUH hubs, four-region destination grouping, Packages | Hotels | Customized Holidays split, AED+USD pricing per room per night, star-rating and airport-transfer as the only filters.
- [Tour Packages from Dubai](https://www.travelwings.com/ae/en/holidays/index.html) · Travelwings (UAE) · Fetched 2026-08-22  
  Regional baseline: 12 geographic groupings, seven prose trip-type themes, AED per person double-sharing pricing from AED 999 to 36,700+, 3–19 nights, and the complete absence of halal, visa or season facets.
- [Travellers in United Arab Emirates and Saudi Arabia are set to take more holidays in 2025](https://marriott.pressarea.com/en/news/12022025/travellers-in-united-arab-emirates-and-saudi-arabia-are-set-to-take-more-holidays-in-2025-with-savvy-spenders-bravecations-heritage-holidays-and-ai-on-the-rise) · Marriott International / Marriott Bonvoy · 2025-02-12 (CAVEAT: brand-commissioned research)  
  ~7 trips planned in 2025 (2.7 domestic / 2.3 short-haul ≤4h / 2.1 long-haul); 84% travelling same or more than 2024; 'getting a special price' top booking trigger at 54% (51% UAE, 57% KSA); 76%/74% shoulder-season consideration.
- [Global Muslim Travel Index 2025](https://www.crescentrating.com/reports/global-muslim-travel-index-2025.html) · Mastercard-CrescentRating · June 2025 (10th edition)  
  176M international Muslim arrivals in 2024, +25% YoY, 245M projected by 2030, US$230bn spend; new Muslim Women-Friendly and Muslim-Friendly Accessible sub-indexes; prayer facilities, halal dining, alcohol-free and gender-segregated facilities as decision attributes.
- [Quiz Conversion Rate Report](https://www.tryinteract.com/blog/quiz-conversion-rate-report/) · Interact · Updated 2025-12-25 (CAVEAT: vendor-published, no sample size or methodology disclosed)  
  The only quiz-performance figures obtainable (40.1% start-to-lead, 65% start-to-finish overall; e-commerce 37.6% / 55.5%) — and the finding that no independent per-question drop-off or optimal-length data is published.
- [TouristTrip type definition](https://schema.org/TouristTrip) · Schema.org · Current vocabulary  
  TouristTrip semantics and properties (itinerary, offers, provider, touristType, arrival/departure) for package structured data.
- [A User Interface Study on Sustainable City Trip Recommendations](https://arxiv.org/abs/2405.11243) · arXiv — Ashmi Banerjee, Tunar Mahmudov, Wolfgang Wörndl · 2024-05-18  
  Peer-reviewed evidence that sustainability, popularity and seasonality labels measurably shift trip choice — the basis for treating seasonality/crowd indicators as decision-bearing card attributes. CAVEAT: the 74%/26% card-vs-map split was seen only in a search-result summary and could not be confirmed in the abstract.
