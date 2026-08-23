# The Dual-Audience Problem

Dimension `the-dual-audience-problem` · verification verdict: not separately verified

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Scope

The Dual-Audience Problem: travel-package buyer vs. proof-of-capability audience (prospective Sara AI Studio clients + practitioner peers)

## Summary

The site has two audiences with incompatible reading paths, and the default resolution is failure in both directions. Left implicit, the studio value never lands; made explicit in the wrong place, the commercial surface becomes a case study in a travel-agency costume.

The resolution is architectural, not tonal: split the audiences by route, not by decoration. The commercial routes stay commercial and win on craft that is legible without explanation (the package card, the price block in Arabic numerals, the bilingual share artefact). A separate, indexed build layer at /build carries the practitioner argument as live evidence — a design system rendered from the real tokens with computed contrast, a public performance budget backed by first-party RUM, a written engineering piece, a motion contract, an accessibility statement. Each of those is a distinct object with its own distribution channel; none of them appears in the traveller's path except as one footer line.

The award-bait pressure is real and measurable. Awwwards weights Design 40% and Creativity 20% against Content 10% — a scoring function that rewards exactly what a task-focused enquiry-first buyer punishes, at $65 a submission. Meanwhile a single well-written engineering essay on Arabic typography reached 287 points on Hacker News in June 2026, in a topic space with almost no competition. The expected return on writing-led distribution dominates gallery submission for this operator.

The ethics constraint is not optional garnish: no fabricated licence numbers, reviews, testimonials or aggregateRating markup, and a persistent, honest demonstration-status disclosure. Vercel's own flagship proof piece ships as "Acme Store" on demo.vercel.store with a visible authorship credit — that is the convention, and it costs nothing.

## Findings

### Awwwards scores submissions Design 40%, Usability 30%, Creativity 20%, Content 10%; a minimum of 18 jury members score each site, the 3 scores furthest from the average are dropped, and 6.5+ earns an Honorable Mention. Submission costs $65 per site (Pro membership discounts apply). CSS Design Awards charges $50 per submission and notifies of nomination within 24 hours.

Confidence: verified · type: data

Why it matters here: The scoring function is structurally hostile to the site's actual job. A travel-package site earns its keep on content (itinerary detail, price legibility, inclusions/exclusions) and on task completion — the two things weighted 10% and 30% respectively, against 60% for Design+Creativity. Optimising for the gallery means spending craft budget on the surfaces that do not sell packages. At $65+$50 the cash cost is trivial; the design-decision cost is not.

Evidence: Awwwards evaluation page fetched 2026-08-22 states the four criteria and weights verbatim, plus the 18-juror rule and 6.5 Honorable Mention threshold; Awwwards submit page shows $65 for one website submission; CSS Design Awards submit page shows '$50 (USD)' and '8 award opportunities'.

Source: https://www.awwwards.com/about-evaluation/

### The inspiration-gallery landscape churns. Godly — one of the named target galleries — no longer accepts submissions: godly.website/submit 301-redirects to recent.design, whose own info page states 'Recent also takes the place of Godly, the popular website inspiration gallery.' Recent reports 250k+ monthly visitors and 900k+ pageviews, sells sponsorship at $5,000 per 30 days with 300k+ guaranteed impressions, and cites Framer earning 36k impressions and 1k clicks on day one.

Confidence: verified · type: data

Why it matters here: A gallery listing is a perishable asset — the gallery itself may not exist in eighteen months, and the backlink dies with it. It also sets the ceiling on what gallery reach is worth: the paid, guaranteed, top-of-site placement on a 250k-visitor design site delivers roughly a thousand clicks a day for $5,000/month. An unpaid feed listing is a small fraction of that. Any organic-reach plan that leans on galleries is leaning on a number that is now quantifiable and small.

Evidence: godly.website/submit returns HTTP 301 to recent.design (checked 2026-08-22); recent.design/info and recent.design/sponsor fetched 2026-08-22 carry the Godly succession statement, the 250k/900k traffic figures, the $5,000/30-day/300k-impression campaign terms and the Framer day-one numbers.

Source: https://recent.design/info

### Share artefacts are now a curated gallery genre in their own right: Recent runs a dedicated 'OG Images' feed alongside Websites, App Screenshots and App Icons, categorised by vertical.

Confidence: verified · type: trend

Why it matters here: The bilingual package share card is not only a traveller-forwarding object — it is independently submittable to a practitioner-facing gallery as a standalone artefact. That makes one build investment serve both audiences through two different channels, which is exactly the coexistence the dual-audience problem demands.

Evidence: recent.design/og-images fetched 2026-08-22: 'OG Images — The best Open Graph image inspiration on the Internet', with category filters (AI, Agency, Portfolio, SaaS, Ecommerce, Product, Technology, Finance, Music, Community, Entertainment, Personal).

Source: https://recent.design/og-images

### Travel is a thin category in web-design inspiration galleries. Httpster lists 3,116 featured websites in total, of which the Travel type accounts for 55 — under 2%. Submission is free.

Confidence: verified · type: data

Why it matters here: A genuinely well-made travel-package site faces far less comparison pressure in the practitioner channel than a SaaS landing page or an agency portfolio would. It is a cheap, high-relative-visibility listing. It also means the vertical has no strong visual convention in these galleries — the anti-generic goal is unusually achievable here.

Evidence: httpster.net homepage fetched 2026-08-22: category counts printed inline — 'Travel 55' against '3116 websites featured'.

Source: https://httpster.net/

### Generating a correct Arabic Open Graph / share image on this exact stack is an unsolved problem as of 2026-08-22. Next.js ImageResponse (v16.3.2 docs, updated 2026-08-06) is built on @vercel/og, Satori and Resvg, supports flexbox only, caps the whole bundle including fonts at 500KB, and says nothing about text direction. In Satori, issue #74 'RTL languages' has been open since 2022-07-11 (15 comments, last updated 2026-03-15); PR #745 'feat: RTL (Arabic/Hebrew) text rendering and layout' opened 2026-04-03 and is still unmerged. The underlying OpenType shaping crash — GSUB lookup type 5 substFormat 3, hit by fonts such as IBM Plex Sans Arabic — was fixed upstream in opentypejs/opentype.js#824, merged 2026-04-29.

Confidence: verified · type: constraint

Why it matters here: This is the single strongest candidate for a build-layer artefact that is evidence rather than decoration: a real, currently-open, precisely-documented defect in the default path of the chosen stack, which the site must solve anyway to ship an Arabic share card. It is also the reason the share artefact belongs in the craft budget: nobody gets it for free from the framework.

Evidence: GitHub API queries against vercel/satori (issues 74, 421, 743; PR 745) and opentypejs/opentype.js PR 824, run 2026-08-22; Next.js ImageResponse reference doc fetched 2026-08-22 (version 16.3.2, lastUpdated 2026-08-06) listing the Satori/Resvg pipeline, flexbox-only constraint, 500KB bundle cap and ttf/otf/woff-only font support.

Source: https://github.com/vercel/satori/pull/745

### A written engineering piece on Arabic typography reached 287 points and 83 comments on Hacker News on 2026-06-13 — and it took three submissions of the same URL to get there (6 points on 2026-06-10, 19 points on 2026-06-11, 287 points on 2026-06-13). The same article was also carried on Lobsters. Competing supply in the topic is near-zero: a Hacker News query for 'bidirectional text' restricted to stories above 20 points since 2023 returns a single result.

Confidence: verified · type: data

Why it matters here: This is the empirical case for writing-led distribution over gallery submission, and it is specific to this operator's unfair advantage. One essay, in a topic with essentially no competition, outperformed what a free gallery listing plausibly delivers — at zero cash cost. It also sets a realistic operational expectation: front-page placement is stochastic, and resubmission across days is normal practice, not gaming.

Evidence: HN Algolia API queries run 2026-08-22 returned three story records for lr0.org/blog/p/arabic/ (objectIDs 48484117 at 6 points, 48487690 at 19 points, 48516710 at 287 points/83 comments); the article itself states 'This post was discussed in Lobsters and HackerNews'; lobste.rs search confirms the story. Topic-scarcity measurement from the same API with numericFilters points>20, created_at_i after 2023-01-01.

Source: https://news.ycombinator.com/item?id=48516710

### Hacker News rules explicitly exclude the build layer's written artefacts from Show HN: 'blog posts, sign-up pages, newsletters, lists, and other reading material' are off topic, as are landing pages; Show HN is for 'things people can run on their computers or hold in their hands' with minimal barriers to entry and no mandatory signup.

Confidence: verified · type: constraint

Why it matters here: The two build-layer object types need different submission routes. The essay and the design-system page go to the normal HN submit path (and Lobsters). The live site itself — usable, no signup, real interaction — is the only thing that legitimately qualifies as a Show HN. Getting this wrong burns the submission and looks amateur to exactly the audience being courted.

Evidence: Show HN guidelines page fetched 2026-08-22.

Source: https://news.ycombinator.com/showhn.html

### Arabic justification does not work by stretching word spaces. The classical and correct mechanism is elongation of the connecting strokes inside words (kashida / taṭwīl, related to U+0640 ARABIC TATWEEL). CSS offers no shipped mechanism for it: text-justify: kashida existed in early CSS Text Level 3 drafts and shipped in Internet Explorer 5.5 in 2000 with a text-kashida-space property, then was removed for lack of implementations; the OpenType jstf table exists but is unread by engines; W3C chartered the Arabic Layout Requirements task force in 2015 and the relevant CSSWG issue (#7738, 'Enable finer control over text-justify', opened 2022-09-14) is still open.

Confidence: verified · type: principle

Why it matters here: It means text-align: justify on Arabic body copy is actively wrong, not merely suboptimal — and that a correctly justified Arabic headline is something no template can produce. That is a genuine, defensible distinctiveness surface, and it is invisible to anyone who does not read Arabic, which is precisely the kind of craft that earns respect from the regional practitioner audience without costing the traveller anything.

Evidence: W3C 'Arabic & Persian Layout Requirements' Group Draft Note, 02 October 2025, §7.2.5 Kashida and §7.2.6 Tatweel, fetched 2026-08-22; corroborated in detail by the lr0.org article (published 2026-06-10) which reproduces the failure live; GitHub API confirms w3c/csswg-drafts#7738 open since 2022-09-14.

Source: https://www.w3.org/TR/alreq/

### A card component styled with line-height: 1 and overflow: hidden clips Arabic vowel marks and diacritics, because Arabic mark and mkmk stacking extends well above the nominal line box. W3C ALReq §7.4 states that 'Arabic ascenders and descenders extend much further than those of the Latin script, and care must be taken to correctly align text in the different scripts when they appear together.' ALReq gives no numeric leading recommendation.

Confidence: verified · type: constraint

Why it matters here: This is the exact defect a package card ships with by default in every Tailwind-shaped design. It is a concrete, testable rule for the most important commercial surface on the site. Equally important: there is no sourced numeric line-height ratio for Arabic in the normative literature — so the master doc must specify a measurement procedure against the chosen face rather than a made-up figure like 1.7.

Evidence: W3C ALReq (Group Draft Note, 2025-10-02) §7.4 quoted directly; the clipping failure is demonstrated interactively in the lr0.org article (2026-06-10), which frames line-height: 1 with overflow: hidden as 'the cheapest way to ruin it that the web platform offers'. No sourced numeric line-height figure found in ALReq or WCAG.

Source: https://www.w3.org/TR/alreq/

### Arabic locales use distinct numeric separator codepoints — U+066B ARABIC DECIMAL SEPARATOR and U+066C ARABIC THOUSANDS SEPARATOR — which resemble a comma and an apostrophe but carry different bidi properties. Intl.NumberFormat('ar-EG') in modern Node emits them; older formatting paths emit ASCII '.' and ','. Both render plausibly; only one parses and sorts correctly downstream.

Confidence: reported · type: constraint

Why it matters here: The price block is named in the brief as a mandatory-distinctiveness surface, and this is the specific trap inside it. Two visually near-identical price renderings with different codepoints will pass visual QA and fail search, sorting, and any downstream comparison feature. It is also a perfect, small, concrete illustration for the engineering essay — the kind of detail that makes a practitioner audience trust the whole build.

Evidence: lr0.org, 'An interactive introduction to the terrific experience of rendering Arabic typography and its technical debt', published 2026-06-10, section on data formats and numbers; corroborated structurally by W3C ALReq §6.1 'Data formats & numbers' (2025-10-02).

Source: https://lr0.org/blog/p/arabic/

### The WebAIM Million report of February 2026 found detected WCAG 2 failures on 95.9% of the top one million home pages, averaging 56.1 errors per page (up 10.1% from 51 in 2025). Low-contrast text was the single most common failure at 83.9% of pages, followed by missing image alt text (53.1%), missing form input labels (51%), empty links (46.3%), empty buttons (30.6%) and missing document language (13.5%); 87.3% of pages declared a document language.

Confidence: verified · type: data

Why it matters here: It converts the design-system page from decoration into evidence. If the page renders computed contrast ratios from the real tokens and shows every pair passing WCAG 1.4.3 (4.5:1 body, 3:1 large text), it is demonstrating compliance with the failure mode that afflicts 83.9% of the web — a claim a prospective client can check in ten seconds. It also makes the accessibility statement and the lang/dir handling on a bilingual site into differentiators rather than hygiene.

Evidence: WebAIM Million 2026 report (February 2026) fetched 2026-08-22; WCAG 2.2 (W3C Recommendation, 12 December 2024) SC 1.4.3 Contrast (Minimum) specifies 4.5:1 with 3:1 for large text.

Source: https://webaim.org/projects/million/

### A public 'live field Core Web Vitals' page cannot be built on CrUX for a new site: CrUX only covers origins that are publicly discoverable and have sufficient traffic for statistical significance, and aggregates at origin level. Vercel Speed Insights is real-user (RUM) and reports p75, but on the Hobby plan it is limited to one project, 10,000 events per month and a 7-day reporting window; Pro costs $10 per project per month with a 30-day window and $0.65 per additional 10,000 events, and the data cannot be exported.

Confidence: verified · type: constraint

Why it matters here: This decides the implementation of one of the five build-layer routes before it is built. The performance page must collect its own field data (the web-vitals library posting to a Supabase table, rendered server-side at p75) rather than embedding or scraping a vendor dashboard. It also caps the honest claim: with a low-traffic demonstration build, the page should show sample counts alongside percentiles and say so, rather than presenting a p75 computed from forty page views as if it were a field measurement.

Evidence: Chrome UX Report documentation (last updated 2024-02-08) on eligibility and origin-level aggregation; Vercel Speed Insights overview and 'Limits and Pricing' docs, both lastUpdated 2026-06-16, giving the plan table (Hobby: 7-day window, 10,000 events/month; Pro: 30 days, $10 base) and the no-export note.

Source: https://vercel.com/docs/speed-insights/limits-and-pricing

### Current Core Web Vitals thresholds are LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, assessed at the 75th percentile and split between mobile and desktop; INP became a stable Core Web Vital in 2024, replacing FID. By contrast, web.dev's 'Performance budgets 101' — the canonical budget article — was last updated 5 November 2018 and its concrete numbers (under 170KB of critical-path resources, Time to Interactive under 5s on slow 3G on a Moto G4) are stale and reference a retired metric.

Confidence: verified · type: data

Why it matters here: The public performance-budget page is only credible if its numbers are current. Publishing a budget anchored on TTI and 3G Moto G4 in 2026 signals the opposite of what the page is for. Anchor the published budget on the p75 CWV thresholds plus a self-imposed transferred-bytes ceiling measured on the site's own routes, and cite the budget's own provenance on the page.

Evidence: web.dev 'Web Vitals' article, originally published 2020-05-04, last updated 2024-10-31, giving the three thresholds and the p75 rule; web.dev 'Performance budgets 101', last updated 2018-11-05, giving the 170KB / 5s-on-3G figures. STALENESS FLAG: the budgets article predates 2023 and should not be quoted as current guidance.

Source: https://web.dev/articles/vitals

### Nielsen Norman Group's scrolljacking research (published 6 August 2023) found that 'the majority of our study participants were at least mildly disoriented by scrolljacking', with observed reductions in user control, task-completion difficulty, and worse effects on mobile and when altered scroll rates are applied to text content.

Confidence: verified · type: principle

Why it matters here: This is the empirical spine of the award-bait guardrail. The single most common gallery-bait pattern is also the one that measurably breaks the traveller's task. It converts 'no scrolljacking' from taste into a citable rule a future build session cannot argue with.

Evidence: NN/g, 'Scrolljacking 101', published 2023-08-06, fetched 2026-08-22.

Source: https://www.nngroup.com/articles/scrolljacking-101/

### Fabricated trust signals are prohibited by rule, not just by taste. The FTC's Rule on the Use of Consumer Reviews and Testimonials, 16 CFR Part 465 (published 2024), bans fake or false consumer reviews, testimonials and celebrity endorsements (§465.2), buying reviews (§465.4), undisclosed insider reviews (§465.5), company-controlled review platforms (§465.6), review suppression (§465.7) and fake indicators of social-media influence (§465.8). Google's search spam policies separately define 'Scam and fraud' to include 'intentionally displaying false information about a business or service, or otherwise attracting users to a site on false pretenses', and 'Misleading functionality' as 'intentionally creating sites that trick users into thinking they would be able to access some content or services but in reality can't'. Google's review-snippet policy additionally makes self-controlled reviews ineligible for the star feature and prohibits aggregating reviews from other sites.

Confidence: verified · type: constraint

Why it matters here: It converts the ethics constraint into concrete build rules with named authorities. No invented licence or IATA number, no invented testimonials, no star ratings, and specifically no schema.org aggregateRating or review markup on the TravelAgency/Organization node — schema.org TravelAgency (v30.0, 2026-03-19) inherits LocalBusiness and exposes exactly those properties, which is where fabrication usually enters a travel build. 'Misleading functionality' is the sharper risk for an enquiry-first demonstration: a form that collects a traveller's trip details and reaches nobody is precisely the described harm.

Evidence: 16 CFR Part 465 section list and scope (Cornell LII, citing 89 FR 68077, 2024); Google Search Essentials spam policies page, last updated 2026-05-15; Google review snippet structured-data documentation, last updated 2026-07-24; schema.org/TravelAgency page showing Thing > Organization > LocalBusiness > TravelAgency inheritance with aggregateRating, review, address, telephone, priceRange (version 30.0, 2026-03-19).

Source: https://developers.google.com/search/docs/essentials/spam-policies

### The established convention for a vendor's flagship proof-of-capability build is an obviously fictional placeholder brand plus visible authorship and source. Vercel's Next.js Commerce (14,228 GitHub stars, created 2020-10-26, last pushed 2026-08-13) ships at demo.vercel.store under the title 'Acme Store', sells 'Acme Circles T-Shirt' and 'Acme Mug', and carries '© 2023-2026 ACME, Inc.', 'Created by ▲ Vercel' and 'View the source' in the footer.

Confidence: verified · type: pattern

Why it matters here: It settles the fictional-client question empirically. The credible pattern is not a plausible-sounding invented agency with a fake licence — it is a brand that is transparently a placeholder, on a domain containing 'demo', with the builder credited in the footer and the code linked. That satisfies the honest-labelling requirement at essentially zero design cost and without turning the commercial surface into a case study. A plausible fake, by contrast, is the configuration that triggers both the FTC and Google 'false information about a business' concerns.

Evidence: GitHub API for vercel/commerce (fetched 2026-08-22) and the live demo.vercel.store HTML (fetched 2026-08-22), whose <title> and og:title are 'Acme Store' and whose footer text includes '© 2023-2026 ACME, Inc.', 'Created by ▲ Vercel' and 'View the source'.

Source: https://demo.vercel.store/

### Motion has a hard accessibility floor and a settled authoring pattern. WCAG 2.2 (W3C Recommendation, 12 December 2024) SC 2.2.2 Pause, Stop, Hide is Level A for moving/auto-updating content; SC 2.3.3 Animation from Interactions is Level AAA and requires that motion animation triggered by interaction can be disabled unless essential. The prefers-reduced-motion media feature has been Baseline Widely Available since January 2020, and MDN recommends the reduced-first progressive-enhancement pattern — ship the calm version as the default and add motion inside @media (prefers-reduced-motion: no-preference).

Confidence: verified · type: principle

Why it matters here: It gives the motion contract a precondition that is checkable in review rather than negotiable in the moment: the signature interaction must be fully usable and fully legible with motion off, because the no-motion branch is the default branch. That is also what stops one bounded flourish from metastasising across the site.

Evidence: WCAG 2.2 W3C Recommendation, 2024-12-12, SC 2.2.2 (Level A) and SC 2.3.3 (Level AAA) quoted; MDN prefers-reduced-motion reference, Baseline Widely Available since January 2020, with the reduced-first example pattern.

Source: https://www.w3.org/TR/WCAG22/

### W3C WAI's accessibility-statement guidance (last updated 11 March 2021) specifies a required core — a commitment to accessibility, the standard applied (e.g. WCAG 2.2), and contact information for users who hit problems — plus recommended components: known limitations stated plainly, measures taken, technical prerequisites, tested environments, and references to applicable laws. It advises plain language over criterion numbers and prominent placement in footer, help menu, sitemap and about page with consistent link naming.

Confidence: verified · type: principle

Why it matters here: The accessibility statement is the one build-layer route that legitimately belongs in the traveller's footer on every page, which makes it the natural anchor for the honest-labelling disclosure too. Its 'known limitations, stated plainly' component is also the honest place to record what the demonstration build does not do — a disclosure format that reads as rigour to practitioners rather than as a disclaimer.

Evidence: W3C WAI 'Developing an Accessibility Statement', last updated 2021-03-11, fetched 2026-08-22. STALENESS FLAG: page predates 2023, but it is stable normative guidance rather than trend material, and it already names WCAG 2.2.

Source: https://www.w3.org/WAI/planning/statements/

## Design implications

- AUDIENCE MODEL — write these three into the master doc as named personas with distinct success criteria, and require every future build session to state which one a change serves. (A) THE TRAVEL BUYER. Arrives from search, Instagram link-in-bio, or a forwarded share card. First ten seconds must yield: what the package is, where it goes, how many nights, total price per person with currency and what is and is not included, and departure city. Screenshots the package card or the price/inclusions block, and sends it to a family group chat. Success = a submitted enquiry. (B) THE PROSPECTIVE STUDIO CLIENT (regional business owner, FMTC-adjacent corporate contact, AI-video client). Arrives from Sarra's Instagram bio, a DM, or a proposal link. First ten seconds must yield: this is a real, fast, bilingual, working product, and one identifiable human built it. Screenshots the site in Arabic next to the site in English, or the performance page. Success = a message to the studio. (C) THE PRACTITIONER PEER (regional designers/devs, the AI-build audience already following the account, HN/Lobsters readers). Arrives from a link to the engineering essay or the design-system page. First ten seconds must yield: a specific, hard, correctly-solved problem. Screenshots a code block, a contrast table, or a before/after of the Arabic share card. Success = a share, a repost, or an inbound 'who built this'.
- ROUTE MAP ANNOTATED BY AUDIENCE — adopt verbatim. TRAVELLER-ONLY (never optimise these for peers): /packages (index, search + filter), /packages/[slug] (detail), /packages/[slug]/enquire, /compare, /destinations/[slug], /enquiry/received. SHARED (traveller-primary, peer-legible without explanation): / (home, both locales), /packages/[slug]/card (the signature interaction, see below), /api/og/package/[slug].png (the share artefact itself), /accessibility (footer-linked from every page), /colophon (fonts, licences, data sources, credits). PRACTITIONER-ONLY BUILD LAYER, all under /build: /build (index — 'how this site is made', and the canonical demonstration-status page), /build/design-system (live tokens + computed contrast), /build/performance (published budget + first-party field data), /build/arabic (the engineering essay), /build/motion (the motion contract). STUDIO-CONVERSION: /studio (what this build demonstrates, what Sara AI Studio does, contact). INDEXING: index everything except /enquiry/received and preview deployments; the build layer is a discovery channel, not a secret. CROSS-LINKING RULE — one direction only. /build/* and /studio link freely up into the commercial routes. The commercial routes link down to the build layer from exactly two places: the persistent footer strip, and one line inside /accessibility. No ribbons, no corner badges, no 'built by' watermark, no interstitial on the package page.
- HONEST-LABELLING POLICY — four hard rules, applying to every future session. (1) BRAND: the travel brand must be transparently a placeholder, not a plausible-sounding invented agency. Follow the demo.vercel.store / 'Acme Store' convention — a name no one would mistake for a licensed operator, on a domain or subdomain that carries the demonstration status, with 'Built by Sara AI Studio' and a link to /build in the footer. (2) PERSISTENT DISCLOSURE: one small, non-modal, non-dismissible footer line on every route, in both locales, reading to the effect of 'Demonstration build. Enquiries reach Sara AI Studio, not a licensed travel agency.' Plus an inline restatement immediately above the enquiry submit button — this is the specific control that answers Google's 'misleading functionality' definition. (3) NO FABRICATED TRUST: zero invented licence numbers, IATA/ATOL/tourism-authority registrations, testimonials, reviews, star ratings, 'trusted by' logos, booking counts, or 'X people viewing' counters. In structured data, ship Organization/TouristTrip/Offer with real values only, and ship NO aggregateRating and NO review nodes at all — schema.org TravelAgency inherits them from LocalBusiness and their presence with invented values is the exact conduct 16 CFR 465 and Google's spam policy prohibit. (4) INVENTED-BUT-LABELLED DATA IS FINE: package names, itineraries, prices and photography may be invented, provided the /colophon page states plainly which content is illustrative and where imagery came from. If a real partner agency is ever attached, the disclosure changes wholesale — treat that as a re-decision, not an edit.
- CRAFT BUDGET ALLOCATION RULE — a two-column contract for future sessions. DISTINCTIVENESS IS MANDATORY on: (a) the package card — its information hierarchy, its Arabic/Latin dual-script setting, and its behaviour at 320px reflow; (b) the price block — per-person total, currency, inclusions/exclusions at a glance, correct Arabic-locale numerals via Intl.NumberFormat with U+066B/U+066C where the locale calls for them, never ASCII separators pasted into Arabic strings; (c) Arabic typography as a system — never text-align: justify on Arabic body copy, never line-height: 1 with overflow: hidden on any component that can contain Arabic, and a leading value chosen by measuring the actual chosen face's mark-stacking headroom rather than copied from a Latin scale; (d) the comparison view; (e) the share artefact; (f) the empty, loading and zero-results states of the package list. CONVENTION IS MANDATORY — do not innovate, copy the boring pattern — on: search entry placement (top of viewport, visible without scrolling, one primary field), date entry (native date inputs first; if a custom range picker is needed, two months visible, no scroll-based month changing, no custom scroll pickers), traveller-count controls (labelled steppers), all form mechanics (persistent visible labels, single column, correct autocomplete and inputmode attributes, errors adjacent to their field), the enquiry submit and confirmation sequence, primary navigation, footer, and the language/currency switch position. SCROLL IS SACRED: no scrolljacking anywhere, ever — NN/g found the majority of participants at least mildly disoriented by it. CEILING: one signature interaction, one URL, and no more than two fully-custom components beyond the design system. Anything beyond that requires deleting something else.
- THE SINGLE BOUNDED SIGNATURE INTERACTION — the bilingual share-card composer at /packages/[slug]/card. What it is: a live, in-page rendering of the package's share image, with a direction/locale toggle (AR ↔ EN) that flips the composition — mirrored layout, correct Arabic shaping and word order, correct numerals — plus a copy-link and a save action. Why this one: it is the only candidate that serves all three audiences from one build. The traveller gets the object they forward; the prospective client sees the product feel premium; the practitioner sees the solved version of a problem their framework cannot solve. PRECONDITIONS, all mandatory: (1) the same URL with a .png extension must return the server-rendered image with no JavaScript at all — the interaction is an enhancement over a static artefact, never the only path to it; (2) fully keyboard operable, with a visible focus ring and the toggle exposed as a real control, not a div; (3) the default branch is the no-motion branch — animate only inside @media (prefers-reduced-motion: no-preference), per the MDN reduced-first pattern; (4) it lives on its own route so it contributes zero JavaScript to /packages/[slug], which must keep its LCP under 2.5s at p75; (5) it must not become the hero of the package page — link to it from a secondary action, not from the primary CTA.
- BUILD-LAYER ROUTE SPECIFICATIONS, with an honest evidence-vs-decoration verdict for each. /build/design-system — GENUINE EVIDENCE, medium effort, high linkability. Must import the same token source the application imports and compute contrast ratios at render time; a hand-maintained table of hex values is decoration and will drift. Show every foreground/background pair with its computed ratio and a pass/fail against WCAG 1.4.3 (4.5:1 body, 3:1 large). Show AR and EN specimens side by side for every type step. This is the page that answers the 83.9%-of-the-web low-contrast failure with a checkable claim. /build/performance — GENUINE EVIDENCE, medium effort, medium linkability, but ONLY if it publishes the budget first and the measurement second, and states the sample size next to every percentile. Implement with the web-vitals library posting to a Supabase table and rendering p75 server-side; do not attempt to surface Vercel Speed Insights (Hobby gives 7 days and 10,000 events, no export) and do not rely on CrUX (a new low-traffic origin will not qualify). Anchor the budget on LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 at p75, plus a self-imposed transferred-bytes ceiling per route; do not quote the 2018 web.dev 170KB/3G figures. /build/arabic — HIGHEST-RETURN ARTEFACT, high effort, highest linkability. The written piece on the bidi share-card problem: what Satori does, why issue #74 has been open since 2022, what the GSUB lookup-type-5 shaping crash was, what the fix actually is, with live before/after renderings. This is the front door for the practitioner audience. /build/motion — MOSTLY DECORATION unless it is generated, low effort. Only worth shipping if the durations, easings and reduced-motion branches are read from the same tokens the components use; otherwise it is a promise, not evidence. /accessibility — GENUINE EVIDENCE, low effort, and it belongs in the shared footer. Follow the W3C WAI components: commitment, standard applied (WCAG 2.2 AA), contact route, and — critically — known limitations stated plainly, which is also where the demonstration build's honest gaps get recorded.
- SUBMISSION AND DISTRIBUTION PLAN — a ranked programme with costs. TIER 1, do these: (a) publish /build/arabic and submit the URL to Hacker News (normal submit, not Show HN — blog posts are explicitly off-topic there) and to Lobsters; expect several attempts across different days, since the comparable article scored 6, then 19, then 287 points on three submissions of the same URL. (b) Submit the site itself to Httpster (free; the Travel category holds 55 of 3,116 listings, so relative visibility is unusually high). (c) Submit the Arabic share card to Recent's OG Images feed as a standalone artefact — a second channel for one build investment. (d) Post the engineering piece as an Arabic and French carousel to the operator's own Instagram, where the practitioner audience already exists; this is the highest-conversion channel for audience (B) and costs nothing but the edit. TIER 2, only after the site is genuinely finished and only if there is spare cash: Awwwards at $65 and CSS Design Awards at $50. VERDICT: skip both at first. A task-focused, enquiry-first, convention-respecting travel site is competing under a rubric that weights Design 40% and Creativity 20% against Content 10% — it is the wrong instrument for this piece, and Godly's disappearance into Recent shows how perishable a gallery listing is. Revisit only if the signature interaction turns out to be genuinely novel. DO NOT: buy sponsorship (Recent's rate card is $5,000 per 30 days) — this is an organic-reach programme by definition.
- MEASUREMENT AND GOVERNANCE — give each audience its own success metric so the dual-audience tension stays visible rather than resolving itself silently. Traveller: enquiry submissions and package-detail-to-enquiry rate. Studio client: /studio page visits and inbound messages attributed to the site. Practitioner: referrers from news.ycombinator.com, lobste.rs, recent.design and httpster.net, plus /build/* pageviews. Store all three in the same Supabase analytics table so a future session can see, in one query, whether a change traded traveller throughput for practitioner applause. Add one standing review question to the master doc: 'Which audience does this serve, and what did the other one lose?' If a proposed change serves audience (C) and costs audience (A) anything measurable on /packages/[slug], it belongs in /build, not on the commercial route.

## Anti-patterns to refuse

- THE CASE STUDY IN A TRAVEL-AGENCY COSTUME. A studio ribbon, corner badge, 'built by' watermark, or process-narrative section bolted onto the commercial routes. It converts every package page into an advertisement for the builder, which insults the traveller and, worse, signals to a prospective client that the builder cannot restrain themselves inside someone else's brand — the precise opposite of the capability being demonstrated. The disclosure belongs in one footer line and one /build route.
- THE AWARD-BAIT HERO. A full-viewport WebGL or video hero with scrolljacked panels, where the first decision-relevant content sits below two or three scroll-locked screens. NN/g found the majority of study participants at least mildly disoriented by scrolljacking, with worse effects on mobile and on text content — and Gulf/North African traffic is overwhelmingly mobile. It also inflates LCP on the route that most needs to stay under 2.5s at p75. This pattern is optimised for a rubric (Design 40%, Creativity 20%) that this site is not entering.
- FABRICATED TRUST SIGNALS. Invented licence or IATA numbers, invented testimonials with invented headshots, star ratings, 'trusted by 10,000 travellers', 'trusted partner' logo walls, or schema.org aggregateRating/review nodes populated with made-up values. 16 CFR 465 §465.2 bans fake or false reviews and testimonials; Google's spam policy defines scam and fraud to include 'intentionally displaying false information about a business or service'; Google's own review-snippet policy makes self-controlled reviews ineligible regardless. It is also the single fastest way to destroy credibility with audience (B), who will look for the licence number and find nothing.
- THE DEAD ENQUIRY FORM. Collecting a traveller's name, phone, dates and party size behind a 'Request your quote' button that reaches nobody, with no disclosure. Google names this pattern directly under Misleading Functionality — 'intentionally creating sites that trick users into thinking they would be able to access some content or services but in reality can't'. If enquiries go to Sara AI Studio rather than to a travel operator, the form must say so above the submit button, in both locales.
- THE STATIC DESIGN-SYSTEM PAGE. A hand-written table of hex values, spacing steps and 'our typography' specimens that is not generated from the token source the application actually imports. It drifts within two build sessions, and a practitioner audience checks. If it is not computed at render time — including the contrast ratios — it is a portfolio slide, not evidence, and it should not be shipped.
- STALE PERFORMANCE THEATRE. Publishing a budget built on Time to Interactive and 'under 170KB on slow 3G on a Moto G4' — figures from a web.dev article last updated in November 2018, referencing a metric that has been superseded. Or presenting a p75 computed from a few dozen page views as a field measurement without stating the sample size. Both read as competence to a layperson and as carelessness to the audience the page exists for.
- LATIN TYPOGRAPHY WEARING AN ARABIC FONT. Applying text-align: justify to Arabic body copy (which stretches word spaces — the wrong mechanism entirely; the correct one is kashida elongation, which CSS does not ship), setting line-height: 1 with overflow: hidden on cards that can contain Arabic (which clips vowel marks), reusing the Latin type scale unmeasured, or formatting prices with ASCII separators inside Arabic strings instead of the locale's own U+066B/U+066C. Every one of these is invisible in an English-only review and glaring to the regional audience the site is for.
- SUBMISSION-CHANNEL CATEGORY ERRORS. Posting the engineering essay as a Show HN (blog posts and reading material are explicitly off-topic there), buying a gallery sponsorship and calling it organic reach, or treating an Awwwards submission as the distribution plan. Paying $5,000 for guaranteed impressions is advertising; the brief asked for reach the site generates itself.

## Differentiation moves

- Make the Arabic share card the flagship object of the whole project. It is simultaneously the traveller's forwarding artefact, the practitioner's proof, and a submittable entry to a curated OG-image gallery — and, because Satori issue #74 has been open since July 2022 and PR #745 is still unmerged, nobody using the default Next.js path currently has one that works. Solving it publicly is a defensible claim no template can copy.
- Ship a design-system page whose contrast ratios are computed at render time from the live tokens, with Arabic and Latin specimens paired at every type step. Against a web where 83.9% of home pages fail on low-contrast text (WebAIM Million, Feb 2026), a page that proves every pair passes is a ten-second credibility demonstration for a prospective client and a genuinely useful reference for a peer.
- Publish the performance budget before publishing the measurement, and show sample counts next to every percentile. Publishing a target you might miss, and then showing whether you met it, is a trust move almost nobody makes — and it inoculates the page against the 'low-traffic p75' criticism that would otherwise be its weakness.
- Apply kashida-aware justification to exactly one surface — the package title or the destination headline — using hand-placed or script-placed tatweel, and document the technique on /build/arabic. It is the visual signature of correct Arabic setting, it is something CSS cannot do (the text-justify: kashida value was removed from the spec for lack of implementations after IE 5.5 shipped it in 2000), and confining it to one surface keeps the cost bounded.
- Write a colophon that names every font and its licence, every image source, and states plainly which content is illustrative. It doubles as the honest-labelling artefact and as the kind of craft signal — the small-web, Tiny-Awards register rather than the Awwwards register — that the practitioner audience reposts.
- Make the language switch a real demonstration rather than a flag icon: switch locale and direction together, preserve scroll position and the current package, and show the numerals, the calendar, and the card layout all changing correctly. Screenshotted side by side, it is the single most legible proof of capability on the site, and it lives entirely inside the traveller's path without costing them anything.

## Open questions

- Is this a demonstration build or a real venture Sarra intends to operate? Every labelling rule above assumes demonstration. If a real, licensed operating entity is ever attached — or a real partner agency whose licence could be cited truthfully — the disclosure, the schema markup, and the enquiry routing all change wholesale. Decide this before the first commit, and record it in .memory/projects/ with a date.
- Where do enquiry submissions actually go — an inbox, a Supabase table nobody reads, or a real partner? The answer determines the exact wording of the mandatory disclosure above the submit button, and it is a legal-adjacent decision, not a copy decision.
- Which Arabic face? Amiri (aliftype/amiri, OFL-1.1, latest release 1.003 published 2025-06-13) is free, self-hostable and excellent for text, but it is a Naskh book face and may fight a modern premium brand at display sizes. A licensed contemporary Arabic display face plus Amiri or a Noto Arabic for body is the likely answer, but the licence cost and the 500KB total budget on the ImageResponse path (fonts included) both need checking before the type system is fixed.
- Should French be a third locale? Sarra's FMTC corporate-training clients are French-language, and audience (B) partly reads French. Adding it triples copy maintenance and adds a third bidi-neutral case; it may be better served by a French-language /studio page only, rather than a full third locale of the commercial routes.
- No well-sourced evidence was found on which specific practitioner channels carry regional (Gulf/North African) design and build work — the search budget was exhausted before that could be established, and the channels named in the distribution plan (HN, Lobsters, Httpster, Recent, Instagram) are global or the operator's own. Treat the regional-channel question as unresearched, and resolve it by asking the operator which regional communities she already reads rather than guessing.
- No sourced numeric line-height ratio for Arabic body text exists in the normative literature — W3C ALReq documents that Arabic ascenders and descenders extend much further than Latin but gives no figure, and none was found elsewhere. Do not adopt a number from memory. Specify a measurement procedure against the chosen face (render a fully-vowelled line, measure ink extent above and below the em box, set leading from that) and record the resulting value as a project decision.

## Sources

- [Awwwards — Evaluation Criteria](https://www.awwwards.com/about-evaluation/) · Awwwards · fetched 2026-08-22  
  The 40/30/20/10 Design/Usability/Creativity/Content weighting, the 18-juror scoring mechanism, and the 6.5 Honorable Mention threshold — the empirical basis for the award-bait guardrail.
- [Awwwards — Submit your website](https://www.awwwards.com/submit/) · Awwwards · fetched 2026-08-22  
  $65 per submission; membership tiers and their submission discounts. Cost side of the gallery-submission decision.
- [CSS Design Awards — Submit Your Site](https://www.cssdesignawards.com/submit) · CSS Design Awards · fetched 2026-08-22 (site © 2009-2026)  
  $50 USD per submission, 8 award categories, 24-hour nomination notification, and the explicit statement that templates may be entered — comparative cost and prestige data.
- [Recent — Info and Sponsor pages](https://recent.design/info) · Recent · fetched 2026-08-22  
  That Recent has replaced Godly as an inspiration gallery (godly.website/submit 301-redirects here); 250k+ monthly visitors / 900k+ pageviews; $5,000 per 30-day sponsorship with 300k+ guaranteed impressions; Framer's day-one 36k impressions / 1k clicks. Also the existence of a dedicated OG Images feed.
- [Httpster — website design inspiration](https://httpster.net/) · Httpster · fetched 2026-08-22  
  3,116 featured websites with only 55 in the Travel type — the thin-category argument for free listing there.
- [vercel/satori issue #74 'RTL languages', PR #745 'feat: RTL (Arabic/Hebrew) text rendering and layout', issue #421, issue #743; opentypejs/opentype.js PR #824](https://github.com/vercel/satori/pull/745) · GitHub (Vercel / opentype.js) · issue #74 opened 2022-07-11, last updated 2026-03-15; PR #745 opened 2026-04-03, unmerged as of 2026-08-22; opentype.js #824 merged 2026-04-29  
  That correct Arabic rendering in Next.js OG images is an open problem on the chosen stack today — the core justification for the Arabic share card as the signature artefact and for /build/arabic as the flagship written piece.
- [Next.js — ImageResponse API reference](https://nextjs.org/docs/app/api-reference/functions/image-response) · Vercel / Next.js · docs version 16.3.2, lastUpdated 2026-08-06  
  That ImageResponse runs on @vercel/og + Satori + Resvg, supports flexbox only, caps the whole bundle including fonts at 500KB, accepts only ttf/otf/woff, and says nothing about text direction.
- [An interactive introduction to the terrific experience of rendering Arabic typography and its technical debt](https://lr0.org/blog/p/arabic/) · La Vita Nouva (lr0.org) · published 2026-06-10; reached 287 points / 83 comments on Hacker News 2026-06-13 (item 48516710) after scoring 6 and 19 on two earlier submissions  
  Both the distribution argument (a written engineering piece as the highest-return practitioner artefact, and the realistic multi-attempt submission pattern) and the concrete Arabic typography constraints: kashida justification, the line-height:1 + overflow:hidden mark-clipping failure, Arabic Presentation Forms U+FB50–U+FEFF, and the U+066B/U+066C numeric separator trap.
- [Arabic & Persian Layout Requirements (ALReq)](https://www.w3.org/TR/alreq/) · W3C (Group Draft Note, ed. Richard Ishida) · 02 October 2025  
  Normative corroboration of kashida/tatweel justification (§7.2.5, §7.2.6, U+0640), text spacing behaviour (§7.3), and §7.4's statement that Arabic ascenders and descenders extend much further than Latin — plus the absence of any numeric leading recommendation.
- [The WebAIM Million — annual accessibility analysis of the top 1,000,000 home pages](https://webaim.org/projects/million/) · WebAIM, Utah State University · February 2026  
  95.9% of home pages with detected WCAG 2 failures; 56.1 average errors (up 10.1% from 51 in 2025); low-contrast text at 83.9%, missing alt text 53.1%, missing form labels 51%, empty links 46.3%, empty buttons 30.6%, missing document language 13.5%. Basis for treating the computed-contrast design-system page as genuine evidence.
- [Web Vitals](https://web.dev/articles/vitals) · Google / Chrome team (web.dev) · published 2020-05-04, last updated 2024-10-31  
  Current thresholds LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile, assessed separately for mobile and desktop; INP's 2024 promotion to a stable Core Web Vital. Anchor for the published performance budget.
- [Performance budgets 101](https://web.dev/articles/performance-budgets-101) · Google / Chrome team (web.dev) · last updated 2018-11-05 — FLAGGED AS STALE  
  The budget-type taxonomy (quantity-based, milestone timings, rule-based) and CI enforcement options remain useful, but its concrete numbers (170KB critical path, TTI under 5s on slow 3G / Moto G4) are eight years old and reference a retired metric. Cited here as a staleness warning, not as current guidance.
- [Speed Insights — Overview and Limits and Pricing](https://vercel.com/docs/speed-insights/limits-and-pricing) · Vercel · lastUpdated 2026-06-16  
  Real-user (RUM) p75 reporting; Hobby limited to one project, 10,000 events/month, 7-day reporting window; Pro $10 per project per month with a 30-day window and $0.65 per additional 10,000 events; data cannot be exported. Basis for building /build/performance on first-party RUM instead.
- [Chrome UX Report (CrUX) overview](https://developer.chrome.com/docs/crux) · Google / Chrome team · last updated 2024-02-08  
  That CrUX aggregates at origin level and only covers origins that are publicly discoverable with sufficient traffic for statistical significance — so a new demonstration build will not have field data there.
- [Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/) · Nielsen Norman Group · 2023-08-06  
  That the majority of study participants were at least mildly disoriented by scrolljacking, with reduced control, task-completion difficulty, and worse effects on mobile and on text content. The citable basis for the no-scrolljacking rule.
- [16 CFR Part 465 — Rule on the Use of Consumer Reviews and Testimonials](https://www.law.cornell.edu/cfr/text/16/part-465) · Federal Trade Commission, via Cornell Legal Information Institute · published 2024 (89 FR 68077)  
  §465.2 fake or false reviews and testimonials, §465.4 buying reviews, §465.5 insider reviews, §465.6 company-controlled review sites, §465.7 review suppression, §465.8 fake indicators of social-media influence. The legal spine of the no-fabricated-trust rule.
- [Google Search Essentials — Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) · Google Search Central · last updated 2026-05-15  
  'Misleading functionality' ('sites that trick users into thinking they would be able to access some content or services but in reality can't') and 'Scam and fraud' ('intentionally displaying false information about a business or service, or otherwise attracting users to a site on false pretenses') — the two policies a dead enquiry form and a plausible fake agency would engage.
- [Review snippet (structured data) — general guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · Google Search Central · last updated 2026-07-24  
  Self-controlled reviews are ineligible for star features; marked-up review content must be visible on the page; do not aggregate reviews from other sites; no fake or undisclosed incentivised reviews. Supports the rule to ship no aggregateRating or review nodes at all.
- [schema.org/TravelAgency](https://schema.org/TravelAgency) · schema.org · version 30.0, 2026-03-19  
  That TravelAgency inherits from LocalBusiness (Thing > Organization > LocalBusiness > TravelAgency) and exposes address, telephone, openingHours, priceRange, aggregateRating and review — the properties where fabricated business facts typically enter a travel build.
- [Next.js Commerce demo — 'Acme Store' (demo.vercel.store) and vercel/commerce](https://demo.vercel.store/) · Vercel · repo created 2020-10-26, last pushed 2026-08-13, 14,228 stars; live site fetched 2026-08-22  
  The honest-labelling convention in the wild: an obviously fictional placeholder brand ('Acme Store', 'Acme Mug'), a domain containing 'demo', and a footer carrying '© 2023-2026 ACME, Inc.', 'Created by ▲ Vercel' and 'View the source'.
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) · W3C · W3C Recommendation, 12 December 2024  
  SC 1.4.3 Contrast (Minimum) at 4.5:1 with 3:1 for large text; SC 2.2.2 Pause, Stop, Hide (Level A); SC 2.3.3 Animation from Interactions (Level AAA); SC 1.4.10 Reflow at 320 CSS pixels. Preconditions for the motion contract and the design-system contrast table.
- [prefers-reduced-motion (CSS media feature)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) · MDN Web Docs · Baseline Widely Available since January 2020  
  The reduced-first progressive-enhancement authoring pattern — ship the calm version as the default and add motion inside @media (prefers-reduced-motion: no-preference) — which becomes the signature interaction's accessibility precondition.
- [Developing an Accessibility Statement](https://www.w3.org/WAI/planning/statements/) · W3C Web Accessibility Initiative · last updated 2021-03-11 — pre-2023, flagged, but stable normative guidance  
  Required components (commitment, standard applied, contact route) and recommended components (known limitations in plain language, measures taken, technical prerequisites, tested environments, applicable laws), plus prominent multi-location placement. Structure for /accessibility and for recording the demonstration build's honest gaps.
- [Show HN guidelines](https://news.ycombinator.com/showhn.html) · Hacker News / Y Combinator · fetched 2026-08-22  
  That blog posts, landing pages, newsletters and other reading material are off topic for Show HN, and that Show HN requires something people can actually try with minimal barriers — the rule that splits the build layer's written artefacts from the site itself across submission channels.
