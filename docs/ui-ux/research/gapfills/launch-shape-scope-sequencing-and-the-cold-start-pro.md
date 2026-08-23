# Launch shape, scope sequencing and the cold-start problem

Dimension `launch-shape-scope-sequencing-and-the-cold-start-pro` · verification verdict: not separately verified

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Scope

Launch shape, scope sequencing and the cold-start problem — version one, designed empty states, the regional launch calendar, and a measurement programme honest about zero traffic

## Summary

A master doc that only specifies the mature state produces one of two failures: nothing ships because everything is a prerequisite, or the visual layer ships and the differentiation thesis is deferred to a phase two that never arrives. The fix is a sequencing rule with a sharp edge: an item belongs in v1 if it is architecturally irreversible OR if the stated failure mode (looking like everyone else) is caused by its absence. Everything else waits for volume it does not yet have.

Ten things are irreversible and go in v1 whatever their payoff date: `app/[lang]` locale routing with `dir` and reciprocal hreflang (Next.js requires every route file nested under the locale segment; Google ignores non-bidirectional hreflang); logical-property CSS only; money as a minor-unit integer with an explicit exponent; the season-window/occasion model; filter state in the URL; server-rendered catalogue; a token layer with Tailwind defaults deleted; the share-card route; a frozen analytics event contract; RLS from the first migration.

Six cold-start screens must be designed, not defaulted. On 12 packages, faceting does not earn its place — the v1 IA is editorial, grouped by occasion window. The review module is omitted entirely, because NN/g documented that low counts actively reduce perceived value and Google's own policy makes self-controlled review markup ineligible for stars; the substitutes are signed first-hand trip reports and an off-site Google Business Profile.

The calendar governs everything. Ramadan 2027 is projected to start 8 February 2027 (moon sighting pending). Working back through a 6-week indexing allowance puts soft launch at 5 October 2026 and engineering start at 24 August 2026 — two days from now. The schedule is already compressed.

## Findings

### Ramadan 2027 is projected to begin Monday 8 February 2027, with the crescent sought on the evening of Sunday 7 February, and Eid al-Fitr projected for Wednesday 10 March 2027 — but the start is confirmed only after each country's authorities sight the crescent.

Confidence: reported · type: constraint

Why it matters here: This is the hard forcing date for the whole launch. Every Ramadan/Umrah package must be live, indexed and shareable well before it. Equally important: the ±1 day uncertainty means Eid must be modelled as a two-day-wide window (9-11 March 2027) in the data model and never hard-coded as a single Gregorian date in copy or a countdown. A site that shows a confidently wrong Eid date for two days destroys the honesty positioning it is built on.

Evidence: Gulf News, 'Ramadan 2027 start date: When the holy month begins and how moon sighting confirms it' — states 'Monday, 8 February' and 'Wednesday, 10 March 2027', and that 'The final start date is confirmed only after religious authorities in each country observe the new crescent moon'. Published 4 August 2026.

Source: https://gulfnews.com/uae/ramadan/when-does-ramadan-2027-begin-everything-you-need-to-know-1.500630523

### Eid al-Adha 2027 is projected for 17-19 May 2027, with the Day of Arafah projected for 16 May 2027 — also a lunar projection subject to sighting.

Confidence: reported · type: constraint

Why it matters here: Sets the second seasonal peak. Eid al-Adha content must be live by mid-March 2027, i.e. immediately after Eid al-Fitr, which means the March content sprint is planned before the February one is finished. Hajj itself is licence-gated in Saudi Arabia and should be treated as out of scope unless the operator holds or partners with a licensed operator — so the May window is Eid al-Adha leisure travel plus (possibly) Umrah, not Hajj.

Evidence: National Today entries surfaced via Google News RSS: 'Eid al-Adha — May 17–19, 2027' and 'Waqfat Arafat Day — May 16, 2027', both dated 11 June 2026. Retrieved from the Google News RSS search endpoint on 22 August 2026.

Source: https://news.google.com/rss/search?q=Eid+al-Adha+2027+Hajj+2027+expected+date

### The GCC national-day cluster is fixed Gregorian and therefore fully plannable: Saudi 23 September; Oman 20-21 November (per Wikipedia — this CONTRADICTS the brief's 25-26 November and must be re-verified); UAE Eid Al Etihad 2-3 December; Bahrain 16-17 December; Qatar 18 December; Kuwait National 25 February plus Liberation 26 February.

Confidence: reported · type: data

Why it matters here: These are the only demand peaks a zero-authority site can plan for with certainty, and the December cluster (UAE 2-3, Bahrain 16-17, Qatar 18) falls roughly 10 weeks after a 5 October soft launch — long enough for indexing and for a first usable RUM sample. It is the first real traffic test. Separately, Kuwait National + Liberation Day (25-26 Feb 2027) falls INSIDE Ramadan 2027, which is a merchandising opportunity no template competitor will notice: a two-day holiday during fasting calls for short-haul, iftar-aware itineraries, not a long-haul beach package.

Evidence: UAE: u.ae official public-holidays page lists 'National Day (Eid Al Etihad): December 2-3'. Saudi: Wikipedia 'Saudi National Day' — 23 September, fixed Gregorian, commemorating the 1932 renaming. Qatar: Wikipedia 'National Day (Qatar)' — 18 December. Bahrain: Wikipedia 'Public holidays in Bahrain' — National Day 16-17 December. Kuwait: Wikipedia 'Public holidays in Kuwait' — National Day 25 February, Liberation Day 26 February. Oman: Wikipedia 'Public holidays in Oman' and 'National Day (Oman)' — National Day 20-21 November. All retrieved 22 August 2026.

Source: https://u.ae/en/information-and-services/public-holidays-and-religious-affairs/public-holidays

### Google states that crawling 'can take anywhere from a few days to a few weeks', that requesting a recrawl repeatedly will not speed it up, and that a crawl request does not guarantee inclusion at all.

Confidence: verified · type: constraint

Why it matters here: This is the single number that sets the launch date. Content cannot be published the week demand starts; it must be published and indexed before. Allowing six conservative weeks for a zero-authority bilingual domain, and taking the Ramadan demand ramp as opening ~16 November 2026 (12 weeks before 8 February 2027), the content-ready and deployed date is ~5 October 2026 — which, working back through content production and engineering, makes the engineering start date effectively now.

Evidence: Google Search Central, 'Ask Google to recrawl your URLs' — 'Crawling can take anywhere from a few days to a few weeks'; 'requesting a recrawl multiple times for the same URL won't get it crawled any faster'; 'Requesting a crawl does not guarantee that inclusion in search results will happen instantly or even at all.' Last updated 10 December 2025.

Source: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

### Nielsen Norman Group documented that a LOW social-proof count actively reduces perceived value: a test participant looking at an article with 1,000 Facebook shares concluded 'the article wasn't popular enough, so maybe it wasn't good.' NN/g names 'the perception that too few people approve' as the most significant risk of using social proof, and gives no numeric threshold — it recommends testing instead.

Confidence: verified · type: principle

Why it matters here: This settles the zero-review question by decision rather than by default. A '0 reviews — be the first' module is not neutral; it is net-negative. The correct v1 move is omission plus substitution, not an empty state. Note the article is from 2014 and therefore older than the 2023 currency bar — but the mechanism is a principle about perceived popularity, not a trend, and nothing has been published that reverses it.

Evidence: Nielsen Norman Group, 'Social Proof in the User Experience', published 19 October 2014. Direct quotes: 'the article wasn't popular enough, so maybe it wasn't good' and 'the most significant risk with using social proof is the perception that too few people approve'.

Source: https://www.nngroup.com/articles/social-proof-ux/

### Google's review-snippet documentation states that 'If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature', and separately prohibits aggregating reviews from other websites. The eligible types listed are Books, Courses, Events, Local Businesses, Movies, Products, Recipes and Software Apps.

Confidence: verified · type: constraint

Why it matters here: This removes the only SEO argument for building an on-site review system at launch. If a site cannot earn star snippets from reviews it controls, the cost of a review module has no search payoff to offset the NN/g low-count penalty. The v1 answer is therefore: no on-site review module, and route review-earning to an off-site Google Business Profile where the reviews are third-party controlled and do carry credibility. Note also that TouristTrip is not among the listed eligible types, so review markup on package pages is a dead end regardless.

Evidence: Google Search Central, 'Review snippet (Review, AggregateRating) structured data', last updated 24 July 2026.

Source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### Google Business Profile explicitly permits businesses to ask customers for reviews (via a link or QR code) but prohibits offering any incentive — free or discounted goods or services — in exchange for posting, modifying or removing a review, and prohibits review gating.

Confidence: verified · type: constraint

Why it matters here: It makes the off-site review substitute operationally legal and specific: a plain post-trip link with no discount attached, sent to every traveller, with no filtering of who gets asked. It also creates a hard separation rule with the usability-testing programme — a research participant paid an incentive must never subsequently be solicited for a review while that incentive is live, or the two programmes contaminate each other.

Evidence: Google Business Profile Help, 'Reviews on Google' — permits requesting reviews via link or QR code; bans incentives and review gating under the fake and misleading content policy. Retrieved 22 August 2026.

Source: https://support.google.com/business/answer/3474122

### CrUX requires an origin or page to be 'publicly discoverable' AND 'sufficiently popular', defined as 'a minimum number of visitors'; Google explicitly does not disclose the number, and 'Pages and origins that don't meet the popularity threshold are not included in the CrUX dataset.'

Confidence: verified · type: constraint

Why it matters here: A day-one site will have no CrUX record, therefore no field data in PageSpeed Insights and an empty Core Web Vitals report in Search Console — possibly for the entire first year. The master doc must state this as expected rather than as a defect, or the team will chase a metric that structurally cannot appear. The consequence: first-party RUM is the only performance record that exists at launch, and it must be instrumented on day one because performance data cannot be collected retroactively.

Evidence: Chrome Developers, 'CrUX methodology' — 'A page is determined to be sufficiently popular if it has a minimum number of visitors'; 'An exact number is not disclosed'; 'Pages and origins that don't meet the popularity threshold are not included in the CrUX dataset.' Retrieved 22 August 2026.

Source: https://developer.chrome.com/docs/crux/methodology/

### Vercel Speed Insights on the Hobby plan is capped at 10,000 events per month with a 7-day reporting window; Pro costs $10 per project per month for a 30-day window and no cap. It reports P75 by default, hides routes making up less than 0.5% of visits, and its data cannot be exported — 'you cannot export the Speed Insights data for later use', and disabling it loses access to existing data at the end of the billing cycle.

Confidence: verified · type: data

Why it matters here: Concrete day-one RUM decision: take Pro, because a 7-day reporting window on a low-traffic site puts too few events in each bucket to read a p75 at all. And because the data is non-exportable and evaporates if billing lapses, ALSO ship the `web-vitals` library reporting into a Supabase table, so the performance record is first-party, exportable and survives a plan change. The 0.5%-of-visits hiding rule is also a useful precedent for the site's own reporting threshold.

Evidence: Vercel docs, 'Limits and Pricing for Speed Insights' (last_updated 2026-06-16): Hobby 10,000 events/month, 7-day reporting window; Pro $10/project/month, 30-day window, no cap. Vercel docs, 'Speed Insights Overview' (last_updated 2026-06-16): P75 default, 'URLs that make up less than 0.5% of visits are not shown by default'.

Source: https://vercel.com/docs/speed-insights/limits-and-pricing

### Core Web Vitals 'good' thresholds are LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, assessed at the 75th percentile of page loads 'segmented across mobile and desktop devices'.

Confidence: verified · type: principle

Why it matters here: Gives the guardrail numbers exactly, and — critically — the segmentation rule. On a bilingual site the segmentation must go one level further: the Arabic listing route must be measured as its own p75, separately from English, because Arabic webfont loading is the likeliest LCP and CLS offender and an all-routes average will hide it entirely.

Evidence: web.dev, 'Web Vitals' — LCP 'within 2.5 seconds', INP '200 milliseconds or less', CLS '0.1 or less'; 'a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices'. Last updated 31 October 2024.

Source: https://web.dev/articles/vitals

### At a 2% enquiry-conversion baseline, detecting a 25% relative lift at 80% power and α = 0.05 two-sided requires roughly 13,800 users per variant (~27,600 total). At a 1% baseline and a 20% lift it is ~42,700 per variant. Evan Miller's own default worked example — a 10.2% baseline with a 3-percentage-point absolute MDE — needs 2,545 users per variation.

Confidence: inferred · type: data

Why it matters here: This is the arithmetic that takes A/B testing off the table and must be written into the doc as a rule, not a caveat. A site launching with 12 packages will not see 27,600 sessions before Ramadan 2027. The corollary rule: A/B testing is a v2 capability gated on ≥25,000 monthly sessions AND a measured (not assumed) baseline; until then, the answer to 'which of these two should we ship' is 'decide it on a stated principle and write down the reasoning'.

Evidence: Evan Miller, 'Sample Size Calculator' (page defaults: 10.2% baseline, 3pp MDE, 2,545 per variation) supplies the method and the reference point. The 13,800 and 42,700 figures are my own computation using the standard two-proportion sample-size formula n = (z_{α/2}+z_β)² · [p₁(1−p₁)+p₂(1−p₂)] / (p₂−p₁)², with z_{α/2}=1.96 and z_β=0.842 — computed 22 August 2026, not taken from any source.

Source: https://www.evanmiller.org/ab-testing/sample-size.html

### Kohavi, Deng, Longbotham and Xu (KDD 2014) give a rule of thumb that the minimum number of i.i.d. observations needed per variant for the mean to be normally distributed is 355 × skewness². Their Bing table: Revenue/User (skew 17.9) needs 114k users per variant for 4.4% sensitivity at 80% power; Revenue/User capped (skew 5.2) 9.7k; Sessions/User (skew 3.6) 4.70k; Time-To-Success (skew 2.1) 1.55k. They also state their own experiments used 'at least in the hundreds of thousands of users, with most experiments involving millions'.

Confidence: verified · type: principle

Why it matters here: It kills the fallback hope that a revenue- or value-based metric could be tested more cheaply than a binary conversion — skewed metrics need MORE users, not fewer, and package prices are heavily skewed (they note a commerce site where revenue/customer skew exceeded 30). It also supplies the authority for the anti-benchmark rule: Kohavi's Rule #3 is explicitly that attempts to replicate stellar results reported by others will likely not be as successful. Flag: 2014, older than the 2023 currency bar — but this is statistical methodology, which does not date, and I reproduced the table arithmetic exactly (355 × 17.9² = 113,746 ≈ 114k).

Evidence: R. Kohavi, A. Deng, R. Longbotham, Y. Xu, 'Seven Rules of Thumb for Web Site Experimenters', KDD 2014. Text extracted from the PDF at exp-platform.com on 22 August 2026; the 355×skew² constant verified by reproducing all four table rows.

Source: https://exp-platform.com/Documents/2014%20experimentersRulesOfThumb.pdf

### NN/g's model: each test user finds about 31% of usability problems, five users find approximately 85%, and the recommended allocation is three studies of five users rather than one study of fifteen. Where there are two distinct user groups, the recommendation is 3-4 users per group. For quantitative studies NN/g recommends 20 users, giving roughly a ±19% margin of error at 90% confidence; reaching ±10% would need 76 users, which NN/g calls 'a complete waste of money for almost all practical development projects'.

Confidence: verified · type: principle

Why it matters here: This is the entire alternative evidence programme, and it maps directly onto a bilingual audience: Arabic-first and English-first are two distinct groups, so 4 + 4 = 8 participants per round, three rounds. It also sets the reporting unit — with 8 participants the reportable fact is '5 of 8 participants could not find the exclusions list', never a percentage. Flag: published 2000 and 2006 respectively, well outside the 2023 currency bar. The discovery-rate model is a mathematical principle rather than a trend, but the doc should say so explicitly rather than present it as current research.

Evidence: Nielsen Norman Group, 'Why You Only Need to Test with 5 Users', 18 March 2000 — N(1−L)ⁿ with L≈31%; 3-4 per group for two distinct groups; three studies of five over one of fifteen. Nielsen Norman Group, 'Quantitative Studies: How Many Users to Test?', 25 June 2006 — 20 users, ±19% at 90% confidence, 76 users for ±10%.

Source: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/

### Baymard Institute's August 2026 quantitative e-commerce study — one of the most-cited sources in the field — is based on a survey of 1,083 US online shoppers.

Confidence: verified · type: constraint

Why it matters here: It is the concrete justification for the anti-benchmark rule. The industry's default quantitative UX evidence has a US sample. A figure about US returns behaviour, US newsletter fatigue or US account-feature priorities is not evidence about a Kuwaiti family choosing an Eid package or a Saudi traveller booking an Umrah trip. The master doc should carry a hard rule: no design decision may be justified by a conversion figure measured on someone else's site or someone else's market; borrowed data is a hypothesis generator only.

Evidence: Baymard Institute, 'Ecommerce Quantitative UX: 3 High-Level Trends & Takeaways', published 4 August 2026 — 'Survey Scope: 1,083 US online shoppers surveyed'.

Source: https://baymard.com/blog/ecommerce-quantitative-ux-insights-2026

### Next.js App Router internationalisation requires that 'all special files inside app/ are nested under app/[lang]', with the root layout at app/[lang]/layout.tsx setting <html lang={...}>, generateStaticParams enumerating locales for static rendering, and next/root-params providing the locale to server utilities without prop drilling. Routing may be by sub-path (/fr/products) or by domain.

Confidence: verified · type: constraint

Why it matters here: This is the clearest case of architectural irreversibility in the whole build. Adding a locale segment later means physically moving every route file, changing every internal link, and breaking every URL that has been shared or indexed. It must be in v1 even though the Arabic content may lag. Decision to write down now: sub-path routing (/ar/…, /en/…), no content at the bare root, and the <html> element carries both lang and dir in the same layout so direction is never a client-side afterthought.

Evidence: Next.js documentation, 'Internationalization' guide, version 16.3.2, lastUpdated 2026-06-10.

Source: https://nextjs.org/docs/app/guides/internationalization

### Google requires hreflang annotations to be bidirectional — 'If two pages don't both point to each other, the tags will be ignored' — with fully-qualified URLs, self-referencing entries, ISO 639-1 language codes, and x-default recommended as the fallback for unmatched users. The three implementation methods (HTML link elements, HTTP Link headers, XML sitemap xhtml:link) are equivalent.

Confidence: verified · type: constraint

Why it matters here: Half-implemented hreflang is silently worthless, not partially useful — Google ignores it entirely. Since bilingual parity is the differentiation thesis, the annotation must be generated from the same source of truth as the page itself (the locale route params), emitted for every route including self-reference, with x-default pointing at /en/. This is cheap on day one and a retrofit audit later. It also argues against any automatic language redirect that overrides an explicit locale in the URL: shared /ar/ links must resolve to Arabic for everyone, or every share is broken.

Evidence: Google Search Central, 'Localized versions of your pages', last updated 2025-12-22 UTC.

Source: https://developers.google.com/search/docs/specialty/international/localized-versions

### CSS logical properties map through the `direction` and `writing-mode` properties: for Arabic (RTL, horizontal), inline-start resolves to right where it resolves to left in English. Browser support is described as excellent for sizing (inline-size, block-size), margin, padding, border and inset properties; support is partial only for logical float/clear values and some border-radius variants.

Confidence: verified · type: principle

Why it matters here: This is the second irreversible decision. A codebase written with margin-left / padding-right / left: / right: and then patched with a [dir='rtl'] override stylesheet is the standard generic-Arabic-site failure — it always leaks, and fixing it later is a full re-skin. Writing margin-inline-start, inset-inline-start and border-start-start-radius from the first component costs nothing on day one. Enforce it with a CI lint that fails the build on physical directional properties outside a tiny allowlist.

Evidence: MDN, 'CSS logical properties and values', page last modified 18 November 2025. Full physical→logical mapping table and browser-support status.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

### Schema.org TouristTrip (schema version V30.0, dated 2026-03-19) exists with itinerary, touristType, arrivalTime, departureTime, offers, subTrip and partOfTrip, inheriting Trip → Intangible → Thing, and shows monthly usage of 10K–100K domains. It is not among the types Google lists as eligible for review snippets.

Confidence: verified · type: pattern

Why it matters here: TouristTrip is the right semantic shape for a package and cheap to emit from the season-window model, but the doc must be honest that there is no documented Google rich result to earn from it. Its value is for non-Google and LLM surfaces and for future-proofing, not for SERP appearance — so it is a v1 'emit it because the data model already has it' item, never a v1 'this will get us traffic' item.

Evidence: Schema.org, 'TouristTrip' type page, V30.0 dated 2026-03-19, usage '10K - 100K Domains'. Cross-referenced against the eligible-type list in Google's review-snippet documentation (last updated 24 July 2026), which lists Books, Courses, Events, Local Businesses, Movies, Products, Recipes and Software Apps.

Source: https://schema.org/TouristTrip

### The UAE's official u.ae academic-year page, last updated 19 August 2025, published only the 2025-2026 calendar (year starts 25 August 2025; winter break 8 December 2025 – 4 January 2026; spring break 16–29 March 2026) and no 2026-2027 dates. Separately, a three-year unified academic calendar covering 2026-2029 was reported in February 2026, with the 2026-27 year reported as starting 31 August 2026 with 185 teaching days; the Saudi 1448 calendar could not be retrieved from moe.gov.sa in this session.

Confidence: reported · type: constraint

Why it matters here: School-term merchandising windows cannot be hard-coded from memory or from a news headline. The operational rule this implies: every season window lives in a database row with a source_url and a verified_on date, never in code, and the school-break windows for both Saudi and the UAE must be re-verified against KHDA and the two ministries before any dated campaign is built. The 2025-26 UAE dates above are the only ones I could verify from an official source, and they are already stale for the launch year.

Evidence: u.ae, 'Academic year' page, last updated 19 August 2025 — 2025-2026 dates as listed, no 2026-2027 calendar published. Google News RSS retrieval (22 August 2026) surfaced 'UAE announces 2026-2027 university academic calendar' (Gulf News, 18 August 2026), 'Dubai private school calendar 2026–27: Key term dates and holidays announced' (Emirates 24|7, 20 August 2026) and 'UAE approves 3-year academic calendar' (Gulf Business, 24 February 2026); the underlying articles were not retrievable through the aggregator, so the specific 2026-27 dates remain unverified.

Source: https://u.ae/en/information-and-services/education/school-education-k-12/academic-year

### Search Console's Performance report defaults to the last three months of query, impression, click and position data, supports hourly/daily/weekly/monthly granularity, and marks the newest data as preliminary and subject to change.

Confidence: verified · type: constraint

Why it matters here: It defines when the Arabic keyword-discovery phase can actually start and what the data will be worth. A site launched 5 October has no meaningful query set until roughly mid-November. The operating rule: read Arabic and English query sets separately (they will differ in size, timing and shape — colloquial versus MSA, transliterated destination names), and do not act on a query until it has accumulated at least 10 impressions in a 28-day window. Everything discovered goes into a content backlog, never a feature backlog.

Evidence: Google Search Console Help, 'Performance report (Search)' — three-month default view, hourly/daily/weekly/monthly granularity, newest data 'still being collected and might change in the next few hours'. Retrieved 22 August 2026.

Source: https://support.google.com/webmasters/answer/7576553

## Design implications

- V1 SCOPE TABLE — IRREVERSIBLE (ship in v1 regardless of when the payoff lands). (1) Locale routing: every route file under app/[lang]; sub-path /ar/ and /en/; no content at the bare root; root layout emits <html lang={lang} dir={lang==='ar'?'rtl':'ltr'}>; generateStaticParams enumerates both locales; next/root-params supplies locale to server utilities. Retrofitting this moves every file and breaks every shared URL.
- V1 IRREVERSIBLE (2) hreflang generated from the same route params as the page: reciprocal, self-referencing, fully-qualified, x-default → /en/. Non-bidirectional hreflang is ignored entirely by Google, so a half-implementation is worth zero, not half.
- V1 IRREVERSIBLE (3) Logical-property CSS only. margin-inline-start, padding-inline-end, inset-inline-start, border-start-start-radius. Add a CI lint that fails the build on margin-left|margin-right|padding-left|padding-right|^left:|^right:|text-align:\s*(left|right) outside a named allowlist. Never ship a [dir='rtl'] override stylesheet — that is the generic-Arabic-site tell.
- V1 IRREVERSIBLE (4) Money as a minor-unit value object: { amount_minor: bigint, currency: char(3), exponent: smallint }. Do NOT assume two decimal places — several Gulf currencies use three (verify the exponent for KWD, BHD, OMR against ISO 4217 before the first migration; I did not source this in this session). Format only at the edge with Intl.NumberFormat(locale, {style:'currency'}). A float or a hard-coded 2dp assumption is unrecoverable data corruption once quotes are stored.
- V1 IRREVERSIBLE (5) Season-window and occasion model. A package is package × departure_window (date range, origin airport, price, seats) × occasion_tag (ramadan-umrah, eid-al-fitr, eid-al-adha, national-day-longweekend, school-winter, school-spring, summer). Every lunar row carries is_projection=true, projected_start, projected_end, source_url, verified_on and verify_after. Every school-break row carries source_url and verified_on. No calendar date is ever hard-coded in application code or in copy.
- V1 IRREVERSIBLE (6) Filter and sort state in the URL as canonical, even with 12 packages: /ar/packages?occasion=eid-al-fitr&from=DXB&sort=price. Server Component reads searchParams; no client-only filter state. This is what makes a filtered view shareable, screenshot-able with a working URL, and later indexable. Retrofitting URL state onto client state is a rewrite of the listing.
- V1 IRREVERSIBLE (7) Server-rendered catalogue. Listing and detail are Server Components querying Supabase directly — no client fetch waterfall. Protects LCP ≤2.5s at p75 and keeps pages fully crawlable during the multi-week indexing window when there is no other traffic source.
- V1 IRREVERSIBLE (8) Token layer with Tailwind defaults DELETED. Empty theme in the config: no default palette, no default type scale, no default spacing, no default radius, no default shadow. If bg-blue-500, rounded-lg, shadow-md or gap-4 compiles, the config is wrong. Add a CI grep that fails on default-palette class names. This is the cheapest anti-generic move available and the most expensive to retrofit once 60 components exist.
- V1 IRREVERSIBLE (9) Share-card route /[lang]/og/[slug] returning a generated image. This is v1 because it is the ONLY organic-reach mechanism a zero-authority site has, and because it depends on the package model, the token layer and the Arabic font subset all being right. Before committing: render a ligature-heavy Arabic string through the chosen image renderer and inspect it — most OG pipelines mangle Arabic shaping, and a broken Arabic share card is worse than none.
- V1 IRREVERSIBLE (10) Frozen analytics event contract and Supabase RLS on every table from the first migration. Event names cannot be renamed retroactively without destroying the only longitudinal series a low-traffic site has; a table holding traveller PII created without RLS and secured later has an unknown exposure window.
- V1 DIFFERENTIATION-LOAD-BEARING (not irreversible, but the failure mode is caused by their absence): separate Arabic type scale and leading tokens (--font-size-body-ar, --line-height-body-ar) rather than reusing the Latin scale; no italics and no letter-spacing on Arabic; an explicit per-country decision on Arabic-Indic versus Western digits; honest total-per-person pricing with the exclusions list rendered at the same type size and prominence as the inclusions list; signed, dated, first-hand trip reports; WhatsApp-first enquiry with a structured pre-filled message.
- V2 (needs volume or data the site does not have): faceted navigation with counts; a selectable comparison tray; an on-site review corpus with a visible negative tail; a price index or sparkline; accounts, saved searches and personalisation; A/B testing infrastructure; live multi-currency FX; programmatic corridor landing pages; structured data beyond Organization, BreadcrumbList and FAQ.
- NEVER (evidence too thin or cost not repaid): fake urgency and scarcity counters on a catalogue the operator personally knows the true inventory of; on-site review markup for star snippets (Google's own policy makes self-controlled reviews on Organization/LocalBusiness pages ineligible, and aggregating other sites' reviews is prohibited); a chatbot in v1; a first-visit newsletter modal; IP or Accept-Language auto-redirect that overrides an explicit locale in the URL; hero carousels as the primary discovery mechanism; any design decision justified by a borrowed conversion benchmark.
- COLD-START SCREEN A — LISTING WITH 12 RESULTS. Facets do not earn their place. V1 IA is editorial: one ordered page grouped by occasion window, each group a titled section of 2-5 packages, ordered by the operator's judgement with the ordering rationale stated in one line ('ordered by how much of the trip is already arranged for you'). One sort control (price, duration). Zero filters. The URL still carries ?occasion= and &sort= so nothing is thrown away. FLIP RULE: introduce the first facet only when some single facet value would both RETURN ≥5 results and EXCLUDE ≥5 results. Practical thresholds: 25 packages → sort plus one facet (departure city); 60 → facet counts (a facet showing '(1)' is worse than no facet); 120 → multi-select plus applied-filter chips.
- COLD-START SCREEN B — COMPARISON WITH TWO ITEMS. No tray. Ship a fixed, server-rendered 'how these two differ' block on the package detail page, appearing only when the package has ≥1 sibling in the same corridor and occasion window, showing ONLY the rows where the two differ, with the identical rows collapsed behind a single line ('9 other things are identical'). If a package has no sibling, the block does not render and no empty tray appears anywhere on the site — the absence is the design. FLIP RULE: enable a selectable tray when ≥3 packages share a corridor and window; never more than 3 columns on mobile.
- COLD-START SCREEN C — ZERO REVIEWS. Omit the review module entirely; do not design an empty state for it. Substitute two things. (i) A dated, signed, first-hand trip report per package, written by the operator, with her own photographs, that names what was disappointing as well as what worked — clearly labelled as the operator's own account, never dressed as a customer review. (ii) An off-site Google Business Profile link in the footer and on the enquiry confirmation, with a plain post-trip review request sent to every traveller and no incentive attached (incentives and gating are prohibited by Google policy). FLIP RULE: the on-site review module appears at ≥8 reviews for a given package, or ≥20 site-wide for an aggregate display — never before, because a low count measurably lowers perceived value. The visible negative tail is only shown once one 3-star among nine reads as range rather than as the verdict.
- COLD-START SCREEN D — PRICE INDEX WITH ONE DATA POINT. Do not draw a line through one point. V1 substitute: a stated, falsifiable price commitment ('This is the price we will honour for enquiries received before <absolute date>. If we quote you higher, we will tell you exactly why') plus a per-package 'Price last checked: <absolute date>' stamp refreshed on a weekly sweep. That stamp is a real fact on day one and delivers the honesty the index was meant to carry. FLIP RULE: a sparkline appears at ≥6 monthly observations for that corridor; a seasonal claim ('Eid weeks run about X% above this corridor's yearly median') only at ≥12 observations, and must display n and the date range beside it.
- COLD-START SCREEN E — ZERO RESULTS ON A THIN CATALOGUE. Make it unreachable rather than pretty. Disable (do not hide) any control that would return zero; sort can never return zero. Where a hand-edited or shared URL lands on an empty combination, never render an empty list — render the NEAREST NON-EMPTY set, explicitly labelled ('No 5-night Eid package departing Kuwait. Here are the 3 closest: 4 and 7 nights, or departing Dammam'), with the relaxed constraint shown as a removable chip, and one enquiry CTA that carries the UNSATISFIED query into the WhatsApp pre-fill so a near-miss becomes a lead. Follows NN/g's empty-state rule of state + cue + path to action, and never a blank panel. FLIP RULE: allow a genuine zero state only past 60 packages, where 'nothing matches' is informative rather than embarrassing.
- COLD-START SCREEN F — 'FROM' PRICE WITH ONE DEPARTURE. 'From' is a lie when there is one price. Render 'from' if and only if count(distinct price) ≥ 2 across that package's live departure windows. With one departure, print the price plainly with its basis and party assumption ('1,850 AED per person, based on 2 sharing'). When 'from' does appear, the RANGE is mandatory and not configurable — 'from 1,850 up to 2,400 AED', with the departure the low price belongs to named. A bare 'from' with a hidden ceiling is the travel industry's default deception and the first thing a careful buyer notices.
- LAUNCH SCHEDULE, dated and working backwards. Anchor: Ramadan 2027 projected to open 8 February 2027. Demand ramp assumed to open ~16 November 2026 (12 weeks prior — a deliberately wide bracket, see open questions). Subtract 6 weeks for indexing (Google: crawling takes days to weeks; recrawl requests do not accelerate it) → content-ready and deployed ~5 October 2026. Therefore: ENGINEERING START Mon 24 August 2026 (five weeks) → v1 shell complete Fri 25 September. CONTENT PRODUCTION RUNS IN PARALLEL from 1 September, not after — all 12-20 packages entered at AR/EN parity, trip reports written, share cards rendering, prices stamped, all copy through no-ai-voice → complete Fri 2 October. SOFT LAUNCH (indexable, unpromoted) Mon 5 October 2026: submit both sitemaps, verify both locales in Search Console, enable Speed Insights the same day. Saudi National Day 23 September 2026 is MISSED — accept it, do not compress the build to chase it.
- LAUNCH SCHEDULE continued. First reachable fixed-date moment: Oman National Day 20-21 November 2026 (RE-VERIFY the date). First real traffic test: the December national-day cluster — UAE 2-3, Bahrain 16-17, Qatar 18 December 2026 — roughly 10 weeks after soft launch, which is enough time for indexing and for a first readable RUM sample. Ramadan and Umrah content live and indexed by 16 November 2026. Ramadan merchandising switch-on 4 January 2027 (five weeks before 8 February). Eid al-Fitr treated as a 9-11 March 2027 WINDOW, never a single date. Kuwait National + Liberation Day 25-26 February 2027 falls inside Ramadan — build a dedicated short-haul, iftar-aware collection for that collision. Eid al-Adha content live by mid-March 2027 for the projected 17-19 May window. Moderated test rounds: week of 12 October, week of 9 November, week of 4 January.
- RE-VERIFICATION LOOP as a shipped feature. Every lunar row carries is_projection and verify_after. A scheduled job re-checks at 30 days out, 7 days out, and the evening before. Copy renders projections as 'expected Monday 8 February 2027 — confirmed by moon sighting' in both languages, with a visible changed-on stamp when a date moves. This is not just correctness hygiene; it is a differentiation artefact no template competitor ships, and it is exactly the kind of honesty that gets screenshotted.
- MEASUREMENT — THE FORBIDDEN MOVE, written into the doc as a rule: no design decision may be justified by a conversion figure measured on another site or another market. Every design rationale must cite one of (a) a first-party observation from this site's own users, (b) a platform constraint from primary documentation, or (c) a stated design principle with its reasoning. Never (d) someone else's conversion lift. Justification: the field's most-cited quantitative source sampled 1,083 US online shoppers, and Kohavi et al.'s Rule #3 is explicitly that attempts to replicate stellar results reported by others will likely not succeed. Borrowed data is a hypothesis generator only, and must be labelled as such wherever it appears.
- MEASUREMENT — A/B TESTING IS A V2 CAPABILITY, gated on ≥25,000 monthly sessions AND a measured (not assumed) baseline conversion rate. State the arithmetic in the doc so the gate is not relitigated: at a 2% enquiry baseline, detecting a 25% relative lift at 80% power and α=0.05 two-sided needs ~13,800 users per variant; at a 1% baseline and a 20% lift, ~42,700 per variant. Skewed value metrics are worse, not better — Kohavi's rule of 355 × skewness² per variant puts revenue-per-user at 114k users per variant at Bing's observed skew. Until the gate opens, competing options are decided on a stated principle and the reasoning is written down.
- MEASUREMENT — MODERATED PROTOCOL. Two distinct groups (Arabic-first, English-first) → 4 participants per group per round = 8 per round, three rounds (weeks of 12 Oct, 9 Nov, 4 Jan). Recruit through a paid panel with GCC-residency screening, expat/diaspora community groups in Riyadh, Jeddah, Dubai and Kuwait City, and referrals from the first genuine enquirers — NOT from the operator's Instagram audience, who follow her for AI training and are the wrong sample for a purchase task. Screen for: booked a package or Umrah trip in the last 24 months; is a decision-maker or co-decision-maker; and at least two of the eight on an Android device three or more years old, because device age is the CWV reality. Incentive: a flat cash-equivalent voucher of a stated amount, paid regardless of outcome, disclosed up front, and NEVER a discount on a package — and a participant must never be solicited for a Google review while that incentive is live.
- MEASUREMENT — THE SCRIPT, identical in both languages. T1 'You want to take your family somewhere for Eid al-Fitr — show me how you'd decide' (does the occasion grouping get used, or do they scroll past it?). T2 'You've found two that look similar — tell me the difference' (the comparison block). T3 'What is NOT included in this price?' (time to find, and whether they find it at all). T4 'Send this to your husband/sister/friend the way you normally would' (the share test — record whether they screenshot, copy the URL, or use the share control; this tests the reach thesis directly). T5 'Ask us a question about this trip' (the enquiry path). T6 switch language mid-session and repeat T1 (parity: does the switch keep them on the same package?). SIGNALS THAT COUNT: a task abandoned; a block re-read twice; a question asked of the moderator that the page should have answered; a participant using a different word for a thing than the word on screen (a copy defect); an unprompted screenshot (positive signal for the share thesis); a switch to a competitor tab. SIGNALS THAT DO NOT COUNT: stated preference, stated intent, and anything said after the moderator names a feature. Report as 'k of 8 participants', never as a percentage.
- MEASUREMENT — FIELD RUM FROM DAY ONE. Take Vercel Speed Insights on PRO ($10/project/month), not Hobby: Hobby's 7-day reporting window puts too few events per bucket to read a p75 at this traffic level, and Hobby caps at 10,000 events/month. ALSO ship the web-vitals JS library reporting into a Supabase table, sent with sendBeacon() and deferred so measurement does not degrade the metric — because Vercel's own docs state Speed Insights data cannot be exported and is lost if the feature is disabled. Expect NO CrUX record and therefore an empty Core Web Vitals report in Search Console and no field data in PageSpeed Insights, possibly for the whole first year; document that as expected rather than as a defect. Minimum-sample operating rule (inferred, not a sourced threshold — label it as such): do not report a p75 for a segment below 200 events in the window, and do not compare two periods' p75 below 1,000 events per period. Segment at minimum by device and by locale, and measure the Arabic listing route as its own p75 because Arabic webfont loading is the likeliest LCP and CLS offender.
- MEASUREMENT — LAUNCH EVENT CONTRACT, names frozen before the first deploy, every event carrying locale and occasion: page_view, listing_sort_changed, listing_relaxed_query_shown, package_view (slug, corridor), inclusions_expanded, exclusions_expanded, price_basis_expanded, comparison_block_viewed, share_intent (method), share_card_requested (the OG route hit — the only server-side proxy available for an unprompted screenshot), enquiry_started, enquiry_prefill_edited, enquiry_sent (channel), locale_switched (from, to, route_preserved boolean). Without locale and occasion on every event the data cannot answer the only two questions that matter.
- MEASUREMENT — PRE-DECLARED GUARDRAILS, checked weekly, any breach blocks the next release: (1) p75 LCP ≤2.5s on the Arabic listing route, measured separately from English; (2) p75 INP ≤200ms, mobile only; (3) CLS ≤0.1 on package detail; (4) AR/EN parity = 100% of live packages — a package live in one locale only is a release blocker, not a backlog item; (5) zero rendered empty states in production, monitored by a zero_results_rendered event that should never fire; (6) locale_switched route_preserved = 100%; (7) operator enquiry response time ≤4 working hours, measured outside the site — an enquiry-first site whose enquiries go unanswered is worse than no site; (8) no package live with price_verified_on older than 30 days; (9) error rate on the share-card route = 0, because an OG image that 500s renders every WhatsApp share as a blank card.
- POST-LAUNCH 90 DAYS (5 Oct 2026 → 3 Jan 2027). Days 0-14: submit both sitemaps, verify both locales in Search Console, expect nothing (crawling takes days to weeks and recrawl requests do not help); moderated round 1 week of 12 Oct; fix only what round 1 surfaced. Days 15-45: the Arabic keyword-discovery phase — read Arabic and English query sets separately, act on no query below 10 impressions in a 28-day window, and route every discovery into a CONTENT backlog, never a feature backlog; Ramadan and Umrah content live and indexed by 16 Nov. Days 30-60: content burn-down at one trip report or one occasion-window page per week; moderated round 2 week of 9 Nov; Oman National Day then the December cluster deliver the first real traffic and the first p75 that may clear the 1,000-events bar. Days 60-90: harvest what the December cluster actually converted; run the first full re-verification sweep (every price, every lunar projection, every verified_on stamp); Ramadan merchandising switch-on 4 Jan 2027; moderated round 3 week of 4 Jan.
- V2 UNLOCK GATES, stated as thresholds rather than dates so no one relitigates them: facets at ≥25 packages AND a facet value that both keeps ≥5 and removes ≥5; facet counts at ≥60 packages; comparison tray at ≥3 packages sharing a corridor and window; on-site reviews at ≥8 per package or ≥20 site-wide; price sparkline at ≥6 monthly observations for a corridor and a seasonal claim only at ≥12; A/B testing at ≥25,000 monthly sessions with a measured baseline; CrUX-based reporting only once the origin actually appears in the dataset.

## Anti-patterns to refuse

- Ships the visual layer first and defers the data model — the season/occasion structure degrades into a free-text 'tags' field, so every calendar surface is hand-built per campaign and rots within one cycle. This is exactly the phase-two-that-never-comes failure: the site looks finished and is architecturally incapable of the differentiation it was supposed to deliver.
- Ships a full faceted sidebar over a 12-item catalogue because the template came with one. Every second interaction becomes a dead end, most facet values show '(1)' or '(0)', and the site reads as an empty warehouse. Faceting signals scale; deploying it without scale signals the opposite of what it intends.
- Ships a '0 reviews — be the first to review!' module with aggregateRating markup attached. NN/g documented that low counts actively reduce perceived value, and Google's own policy makes self-controlled reviews on Organization/LocalBusiness pages ineligible for star features — so the module costs credibility AND earns nothing in search. It is the purest example of a generic default that is worse than omission.
- Prints 'from AED 1,850' on a package with exactly one departure and one price, and never shows the ceiling. A 'from' with a hidden upper bound is the travel industry's default deception; on a 12-package catalogue where the operator personally knows every price, it is also gratuitous.
- Treats Arabic as a translation pass over a Latin design: the same type scale and leading, margin-left everywhere patched by a [dir='rtl'] override sheet, Western digits inside Arabic sentences, italics applied to Arabic, and a language switcher that dumps the user on the homepage instead of the same page. This is the single most recognisable marker of a generic Middle East site and it is visible in the first three seconds.
- Hard-codes a single Gregorian Eid date into copy and a countdown timer, then displays a confidently wrong date for a day or two when the moon sighting moves it — destroying, in the highest-attention week of the year, precisely the honesty positioning the rest of the site is built on.
- Auto-redirects by IP or Accept-Language and overrides an explicit /ar or /en already in the URL. Every shared link then resolves to the wrong language for a share recipient in a different country, which silently breaks the only organic reach mechanism a new site has.
- Keeps filter and sort state in client React state, so no filtered view has a URL. Nothing is shareable, nothing is screenshot-able with a working link, nothing is indexable, and the entire 'people share the site' thesis is architecturally impossible.
- Adds fake urgency and scarcity — '3 people are viewing this', '2 seats left' — to a catalogue the operator personally manages. On a small, high-trust, enquiry-first site this is not merely ineffective; it is the specific behaviour that marks a site as a template with a plugin installed.
- Leaves Tailwind's default palette, type scale, spacing and radius in the config, so the output is identifiable as a Tailwind starter at a glance by anyone design-literate — including the operator's own audience, who are the people most likely to share or not share it.
- Runs an 'A/B test' on a few hundred sessions, reads a noisy difference as a result, and ships it. At a 2% baseline the arithmetic needs roughly 13,800 per variant to resolve a 25% lift; anything below that produces confident decisions from noise, which is worse than deciding on principle and writing down why.
- Justifies design decisions by quoting conversion percentages from US e-commerce benchmark studies, giving the doc an evidentiary veneer while grounding a Gulf package site's interface in data about American shoppers returning parcels.

## Differentiation moves

- Ship the projection-honesty layer as a visible product feature, not as internal hygiene: every lunar date renders as 'expected Monday 8 February 2027 — confirmed by moon sighting', with a verified_on stamp and a visible note when a date moves. No competitor does this. It is true, it is screenshot bait, and it converts a data-integrity constraint into the site's clearest trust signal.
- Invert the comparison matrix: show ONLY the rows where two packages differ, and collapse the identical rows behind a single line ('9 other things are identical'). Every competitor ships a six-column grid of mostly-matching ticks. The difference-only block is more useful on a thin catalogue and is the specific artefact people forward.
- Organise the IA by OCCASION WINDOW rather than by destination. Every competitor sorts by country. Sorting by Ramadan/Umrah, Eid al-Fitr, the National Day long weekend, school spring break and the Kuwait-National-inside-Ramadan collision matches how the market actually buys, and it is impossible to copy without building the underlying season model — so it is a defensible advantage, not a visual one.
- Render the exclusions list at the same type size, weight and page position as the inclusions list on every package. Nobody does this, because nobody wants to. It is the cheapest possible proof that the price is honest, and it directly answers the question the moderated script's T3 task is designed to expose.
- Get Arabic shaping right in the generated share card. Most OG-image pipelines mangle Arabic contextual forms and ligatures; a correctly-shaped Arabic preview appears in every WhatsApp forward and is an immediate, unmissable quality signal in exactly the surface where Gulf sharing actually happens.
- Replace the zero-result state with a near-miss result set: the closest non-empty alternatives, the relaxed constraint shown as a removable chip, and the UNSATISFIED query carried into the WhatsApp pre-fill so a dead end becomes a qualified lead with the customer's exact unmet requirement already written down.
- Build a dedicated short-haul, iftar-aware collection for Kuwait National + Liberation Day (25-26 February 2027) falling inside Ramadan. It is a two-day holiday during fasting and needs a completely different package shape from a long-haul beach trip. Only a calendar-native operator notices this collision, and noticing it is the whole positioning in one merchandising decision.
- Publish signed, dated, first-hand trip reports that name the disappointments as well as the highlights, clearly labelled as the operator's own account rather than dressed as customer reviews. It supplies on day one the honesty a review corpus would eventually carry, it is the operator's actual competitive asset (she is a content creator), and it is content Google can index while the review corpus does not yet exist.
- Stamp 'Price last checked on <absolute date>' on every package and run the weekly sweep that makes it true. It turns the absence of a price index into a stronger claim than the index would have been — a verifiable fact about this month rather than a chart about last year.

## Open questions

- Oman National Day: Wikipedia gives 20-21 November; the research brief states 25-26 November. These cannot both be right and I could not reach an official Omani source in this session (omannews.gov.om returned a TLS certificate error; the Oman Observer homepage carried no date). Re-verify against the Oman News Agency or the Royal Court Affairs before any dated merchandising is built.
- No sourced figure found for the claim that about half of Ramadan travellers book a month or more ahead. I could not verify it against any primary or credible secondary source in this session. The schedule above is deliberately built on a 6-to-12-week bracket that survives either answer; source the figure or drop it, and do not let it into the master doc as a number.
- Saudi academic calendar 1448 / 2026-27: not verified — moe.gov.sa returned only page chrome. UAE 2026-27 term and break dates: a three-year unified calendar (2026-2029, 2026-27 starting 31 August 2026, 185 teaching days) was reported in February and August 2026 news coverage, but the official u.ae page as of 19 August 2025 still published only 2025-26. Both must be re-verified against the two ministries and KHDA before school-break windows are entered into the season model.
- Does the operator hold, or partner with, a Saudi-licensed Umrah or Hajj operator? Hajj is licence-gated. If not, the May 2027 window is Eid al-Adha leisure travel only, and Hajj packages must be excluded from the catalogue and from the occasion taxonomy.
- What is the actual enquiry-conversion baseline for this site? Every sample-size figure in this document is conditional on it, and the 2% used above is an illustrative placeholder, not a measurement. Measure it across the first 90 days before quoting it anywhere.
- Does the chosen OG-image renderer correctly shape Arabic — contextual forms, ligatures, bidi mixing with Latin place names and numerals? This must be tested with a deliberately hard string before the share-card route is committed to v1, because a broken Arabic card is worse than no card.
- Which currency does each target country see, at what rate, sourced from where, and updated by whom? A stale rate that looks live is worse than a stated manual one with a visible 'rate as of <date>'. Also confirm the ISO 4217 minor-unit exponent for KWD, BHD and OMR before the first money migration — I did not source it in this session.
- Is Schema.org TouristTrip markup worth its cost given that it is not among the types Google lists as eligible for review snippets and I found no documented rich result for it? Probably yes for LLM and non-Google surfaces once the season model already holds the data, but the payoff is unproven and should not be sold as an SEO win.
- The two NN/g sources underpinning the whole moderated-testing programme date from 2000 and 2006, and the social-proof finding from 2014 — all outside the 2023 currency bar set for this research. They are mathematical and perceptual principles rather than trends, and I found nothing reversing them, but a current replication would strengthen the doc if one exists.

## Sources

- [Ramadan 2027 start date: When the holy month begins and how moon sighting confirms it](https://gulfnews.com/uae/ramadan/when-does-ramadan-2027-begin-everything-you-need-to-know-1.500630523) · Gulf News · 2026-08-04  
  Ramadan 2027 projected start Monday 8 February 2027, crescent sought evening of Sunday 7 February; Eid al-Fitr projected Wednesday 10 March 2027; explicit statement that dates are confirmed only after local moon sighting.
- [Public holidays (UAE official portal)](https://u.ae/en/information-and-services/public-holidays-and-religious-affairs/public-holidays) · Government of the UAE  
  UAE National Day (Eid Al Etihad) fixed at 2-3 December; official statement that Islamic holidays are determined by moon sighting; the fixed/lunar split used to structure the season model.
- [Academic year (UAE official portal)](https://u.ae/en/information-and-services/education/school-education-k-12/academic-year) · Government of the UAE · 2025-08-19  
  UAE 2025-2026 calendar (start 25 Aug 2025, winter break 8 Dec 2025 – 4 Jan 2026, spring break 16–29 Mar 2026) and the absence of a published 2026-2027 calendar as of the page's last update — the basis for requiring re-verification of school-break windows.
- [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) · Google Search Central · 2025-12-10  
  Crawling takes days to weeks; repeated recrawl requests do not accelerate it; inclusion is not guaranteed. The six-week indexing allowance that sets the 5 October 2026 soft-launch date.
- [Review snippet (Review, AggregateRating) structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · Google Search Central · 2026-07-24  
  Self-controlled reviews on Organization/LocalBusiness pages are ineligible for star review features; aggregating other sites' reviews is prohibited; the list of eligible types (which excludes TouristTrip). The basis for omitting the on-site review module in v1.
- [Social Proof in the User Experience](https://www.nngroup.com/articles/social-proof-ux/) · Nielsen Norman Group · 2014-10-19  
  Low social-proof counts actively reduce perceived value ('the article wasn't popular enough, so maybe it wasn't good'); 'the most significant risk with using social proof is the perception that too few people approve'; NN/g gives no numeric threshold. Flagged as pre-2023.
- [Why You Only Need to Test with 5 Users](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/) · Nielsen Norman Group · 2000-03-18  
  31% per-user problem-discovery rate, ~85% of problems found with 5 users, 3-4 users per group when there are two distinct groups, and three studies of five preferred over one of fifteen. The basis for the 4+4 bilingual, three-round protocol. Flagged as pre-2023.
- [Quantitative Studies: How Many Users to Test?](https://www.nngroup.com/articles/quantitative-studies-how-many-users/) · Nielsen Norman Group · 2006-06-25  
  20 users for a quantitative study giving roughly ±19% margin of error at 90% confidence; 76 users needed for ±10%, described as a waste for almost all practical projects. Supports reporting moderated results as counts rather than percentages. Flagged as pre-2023.
- [Designing Empty States in Complex Applications: 3 Guidelines](https://www.nngroup.com/articles/empty-state-interface-design/) · Nielsen Norman Group · 2021-09-19  
  Empty states must communicate system status, provide a learning cue, and offer a path to action; avoid totally empty states. The basis for the near-miss result set replacing a blank zero-result panel.
- [Seven Rules of Thumb for Web Site Experimenters (KDD 2014)](https://exp-platform.com/Documents/2014%20experimentersRulesOfThumb.pdf) · Kohavi, Deng, Longbotham & Xu — ACM KDD · 2014-08-24  
  Minimum sample per variant ≈ 355 × skewness²; Bing table (Revenue/User skew 17.9 → 114k users/variant at 4.4% sensitivity; Sessions/User skew 3.6 → 4.70k); experiments run at hundreds of thousands to millions of users; Rule #3 that others' stellar results will likely not replicate. Table arithmetic reproduced and verified.
- [Sample Size Calculator](https://www.evanmiller.org/ab-testing/sample-size.html) · Evan Miller  
  The four inputs (baseline, MDE, significance, power) and the default worked example of 2,545 users per variation at a 10.2% baseline with a 3pp absolute MDE — the reference point against which the ~13,800/variant figure at a 2% baseline was computed.
- [CrUX methodology](https://developer.chrome.com/docs/crux/methodology/) · Chrome Developers / Google  
  Origins and pages must be 'sufficiently popular' with an undisclosed minimum visitor count; those below it are simply not in the dataset. The basis for expecting no CrUX record, no PageSpeed field data and an empty Search Console CWV report for the first year.
- [Web Vitals](https://web.dev/articles/vitals) · web.dev / Google Chrome team · 2024-10-31  
  LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, assessed at the 75th percentile 'segmented across mobile and desktop devices'. The guardrail thresholds and the segmentation rule extended to locale.
- [Limits and Pricing for Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing) · Vercel · 2026-06-16  
  Hobby: 10,000 events/month, 7-day reporting window; Pro: $10/project/month, 30-day window, no cap; data cannot be exported and is lost on disable. The basis for taking Pro AND shipping a first-party web-vitals pipeline into Supabase.
- [Internationalization (Next.js App Router guide)](https://nextjs.org/docs/app/guides/internationalization) · Vercel / Next.js · 2026-06-10  
  All special files under app/[lang]; root layout sets <html lang>; generateStaticParams for static locale routes; next/root-params to read locale server-side without prop drilling; sub-path vs domain routing. The architectural-irreversibility argument for locale routing in v1. Docs version 16.3.2.
- [Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions) · Google Search Central · 2025-12-22  
  hreflang must be bidirectional or it is ignored entirely; fully-qualified URLs and self-reference required; x-default recommended; three equivalent implementation methods. The argument for generating hreflang from route params on day one.
- [CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) · MDN Web Docs · 2025-11-18  
  Full physical→logical mapping; inline-start resolves to right under RTL; excellent support for sizing, margin, padding, border and inset, partial for logical float/clear. The argument for logical-property-only CSS as an irreversible v1 decision.
- [Ecommerce Quantitative UX: 3 High-Level Trends & Takeaways](https://baymard.com/blog/ecommerce-quantitative-ux-insights-2026) · Baymard Institute · 2026-08-04  
  The study's sample is 1,083 US online shoppers — the concrete justification for the rule forbidding decisions justified by borrowed benchmarks from other markets.
- [Performance report (Search) — Search Console Help](https://support.google.com/webmasters/answer/7576553) · Google  
  Three-month default view; clicks, impressions, CTR, average position; hourly/daily/weekly/monthly granularity; newest data preliminary. Sets when the Arabic keyword-discovery phase can begin and what it will contain.
- [Reviews on Google — Business Profile Help](https://support.google.com/business/answer/3474122) · Google  
  Businesses may request reviews via link or QR code; incentives for reviews and review gating are prohibited. The operational rules for the off-site Google Business Profile substitute and its separation from the paid-participant research programme.
- [TouristTrip](https://schema.org/TouristTrip) · Schema.org · 2026-03-19  
  TouristTrip properties (itinerary, touristType, offers, subTrip, partOfTrip), inheritance from Trip, and 10K–100K domain usage. Schema version V30.0.
- [Saudi National Day / National Day (Qatar) / Public holidays in Bahrain / Kuwait / Oman](https://en.wikipedia.org/wiki/Saudi_National_Day) · Wikipedia (secondary — flagged for official re-verification)  
  Fixed Gregorian national-day dates: Saudi 23 September; Qatar 18 December; Bahrain 16-17 December; Kuwait 25 February National Day and 26 February Liberation Day; Oman 20-21 November (which conflicts with the brief's 25-26 November and is flagged for re-verification).
