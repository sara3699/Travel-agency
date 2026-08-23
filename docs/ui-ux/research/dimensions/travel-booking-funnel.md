# The booking funnel evidence base

Dimension `travel-booking-funnel` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

The travel booking funnel is a decidability problem, and the strongest evidence for that is one source the original draft never used: Baymard's Travel Accommodations UX Benchmark 2026 (2026-01-15), which scored 9 OTA, hotel and rental sites and apps across 590+ parameters and found only one rated "decent" and none "good" or better. Travel-specific failures compound it: up to 83% of tour sites don't always give detailed tour info, 57% omit a map on the detail page, 85% never link reviews out to their third-party source, 40% lack industry-specific filters, and 30% don't make booking search the primary homepage content — despite 99% of participants looking for it first, and 78% missing it below the fold at IHG (Baymard, 2025-07-01 and 2022-08-16). The buyer arrives after ~71 days of consideration, 141 pages and 303 minutes of travel content (Expedia/Luth, 2023 data — now three years old). They are undecided about which package.

Two forces survive intact. All-in pricing is law where it applies: the FTC's 16 CFR 464 has required an upfront Total Price for short-term lodging since 2025-05-12 (taxes, actual-cost shipping and genuinely optional fees excluded but still disclosed before payment); the CMA fined the AA and BSM £4.2m on 2026-04-15 with £760k in refunds to 80,000+ consumers, its first DMCCA penalty; the EU Digital Fairness Act remains unproposed. Extra costs are the top documented abandonment reason at 40% (Baymard meta-analysis, 50 studies, 2025-09-22). And the funnel doesn't end at payment: 42% of sites force account creation before the order, 54% don't defer it to confirmation, 57% state no benefits, and 89% block guest save/wishlist.

One correction to the conclusion: comparison-in-one-screen rests on Baymard research from spec-driven retail whose own mobile result was near-zero adoption — 3 of 38 testers at Walgreens, none at B&H. Prove that pattern on mobile before making it the differentiator.

## Summary as first written, before verification

The evidence points to one uncomfortable conclusion: the travel booking funnel is not a conversion problem, it is a *decidability* problem. Baymard's own benchmarks show the category performing worse than general ecommerce — 52% of desktop and 62% of mobile product pages rate "mediocre or worse" (updated 2026-03-18), 78% of mobile product lists rate the same (updated 2025-09-09), and in travel specifically up to 83% of tour sites fail to give detailed tour info, 57% omit a map on the detail page, and 85% never link out to third-party reviews (Baymard, 2025-07-01). Meanwhile the buyer arrives after ~71 days of consideration and 141 pages of travel content (Expedia/Luth, 2023). They are not undecided about travelling. They are undecided about *which package*, and almost every site makes that specific comparison impossible.

Three structural forces should govern the design. (1) **Decidability**: every card, filter, and detail block exists to let someone eliminate or shortlist a package, not to admire it. (2) **All-in pricing is now law, not taste** — the FTC Rule on Unfair or Deceptive Fees (16 CFR 464) took effect 2025-05-12, the UK DMCCA 2024 produced a £4.2m CMA penalty for drip pricing, and the EU Digital Fairness Act proposal is slated for Q3 2026. The generic "from $899*" pattern is simultaneously the top documented abandonment cause (40% cite extra costs, Baymard meta-analysis of 50 studies, updated 2025-09-22) and a regulatory liability. (3) **The funnel does not end at payment** — the confirmation surface is where 54% of sites still fumble account creation and where the shareable, screenshot-able artefact (the itinerary) actually lives.

For a Middle East package site, the differentiator is not prettier cards. It is being the only site where three packages can be honestly compared in one screen, at a price that does not move.

## Findings

### 99% of test participants at OTA, large-brand hotel and whole-property rental sites immediately looked for the booking search feature on arrival; 25% of travel accommodation sites fail to make it the primary homepage content, and at IHG 78% of participants could not see it above the fold.

Confidence: verified · type: principle

Why it matters here: For a Middle East package site the equivalent primitive is not 'where to / check-in / check-out' — it is the package search (origin city, month or flexibility, party composition, budget band). Whatever occupies the hero must be the thing 99% of arrivals reach for. A cinematic hero video with the search pushed below it reproduces the exact IHG failure.

Evidence: Baymard Institute, 'Make the Travel Accommodations Booking Search Feature the Primary Content on the Homepage (25% Don't)', published 2022-08-16; and 'Travel Site UX: 5 Best Practices', published 2025-07-01. Direct participant quote recorded: 'Oh, IHG, come on! You're the one where now I have to scroll.'

Source: https://baymard.com/blog/travel-accommodations-booking-search

### Up to 83% of travel tour and experience sites fail to always provide detailed tour information (price, duration, start time, departure/meeting point, restrictions, cancellation policy). Participants at Blue Hawaiian Activities abandoned the site because prices were absent from tour cards: 'I don't want to have to go to each one I'm interested in to find out what I'm looking at for price.'

Confidence: verified · type: pattern

Why it matters here: Package cards on a Middle East travel site that show only a hero image, destination name and 'from' price force exactly this dead-end. The card is the comparison surface; if price, nights, departure city, month and what's included are not on the card, the visitor cannot shortlist and will open 8 tabs or leave.

Evidence: Baymard Institute, 'Travel Site UX: 5 Best Practices', published 2025-07-01, drawn from 25 rounds of qualitative usability testing and 4,400+ participant/site sessions.

Source: https://baymard.com/blog/travel-site-ux-best-practices

### 40% of travel sites don't provide popular industry-specific filters (star rating, bed type, kid-friendly, tour difficulty, duration, physical requirements). In general ecommerce, 51% of sites don't provide all five essential filter types (price, user rating, colour, size, brand) and user-rating filters are the single most commonly missing (53% don't offer one). A Marriott participant abandoned the site on discovering there was no star-rating filter.

Confidence: verified · type: data

Why it matters here: Package travel has its own irreducible filter set that generic templates never ship: departure city, trip length in nights, month/season, budget per person, halal-friendly/prayer facilities, visa-free or visa-on-arrival for the traveller's passport, family vs honeymoon vs solo-female suitability, and flight included yes/no. Missing any one of these forces a Gulf traveller to guess or leave.

Evidence: Baymard Institute, 'Travel Site UX: 5 Best Practices', 2025-07-01; 'Filtering UX: 5 Essential Filter Types', published 2020-08-18 (flagged: pre-2023, but re-confirmed by the 2025 Product List benchmark); 'Product List UX Best Practices', updated 2025-09-09.

Source: https://baymard.com/blog/current-state-product-list-and-filtering

### 20–28% of sites don't display an overview of applied filters. Without one, testing showed users had no immediate confirmation filters were applied (worst on mobile where the filter UI is hidden), found removal labour-intensive, and 'may misinterpret the range and type of products the site offers, because the filters that narrow the list aren't immediately obvious.' Baymard also flags that filter options which don't show match counts leave users unable to predict the impact of each choice.

Confidence: verified · type: pattern

Why it matters here: Package inventory is thin compared to hotel inventory — a Middle East operator might have 60 packages, not 60,000. Applying three filters can silently drop the list to two results, and without an applied-filter chip row plus per-option counts the visitor concludes 'this agency has nothing' rather than 'I over-filtered'. Counts are cheap in Postgres and are the single highest-leverage filter affordance here.

Evidence: Baymard Institute, 'Filtering UX: Display Applied Filters in an Overview', originally published 2020-10-06, updated 2026-05-13; 'Product List UX Best Practices', updated 2025-09-09 (20% figure on the current desktop benchmark); 'Filtering UX: 5 Essential Filter Types', 2020-08-18.

Source: https://baymard.com/blog/how-to-design-applied-filters

### Nearly 50% of ecommerce sites fail to provide effective recovery from a search that returns no results. Baymard's five documented recovery strategies are: feature related categories, suggest alternative searches (ideally with product previews, because 'users are often hesitant' to revise a query themselves), personalised recommendations, a visible direct phone number / chat / help link, and popular products and categories.

Confidence: verified · type: principle

Why it matters here: A thin-inventory package site will hit zero results constantly ('Maldives, 5 nights, under 4,000 AED, departing Riyadh in March'). Baymard's fourth strategy — a real phone number, not a support portal — maps directly onto the WhatsApp-first behaviour of GCC travel buyers. A zero-result state that hands off to a human with the failed query pre-filled converts a dead end into the agency's strongest asset.

Evidence: Baymard Institute, '5 Proven UX Strategies For No Results Pages', originally published 2019-02-04, updated 2025-02-18.

Source: https://baymard.com/blog/no-results-page

### 67% of participants on spec-driven sites used a comparison feature when one existed, yet 17% of sites with spec-driven products offer none. Baymard's guidance: always-visible checkboxes on list items (not hover-revealed), a sticky reminder panel showing selected items and remaining slots, and a 3–5 item cap. Comparison proved valuable on desktop but ineffective on mobile — only 3 of 38 mobile testers used it at Walgreens, zero at B&H Photo. Without it, users 'hesitate to visit multiple product pages' and miss suitable items.

Confidence: verified · type: pattern

Why it matters here: A travel package is the most spec-driven product in leisure commerce — nights, hotel tier, meal plan, transfers, excursions, flight class, cancellation terms. This is the single largest structural gap in the category and the clearest place to be the only site that solves it. But the mobile finding is a warning: a desktop-style comparison table will go unused on the mobile-dominant Gulf traffic, so mobile needs a different comparison form (a stacked, swipeable difference-first view), not a shrunken table.

Evidence: Baymard Institute, 'Product Comparison UX: Always Provide Comparison Features for Spec-Driven Industries (17% Don't)', published 2022-09-06 (flagged: pre-2023, but the underlying qualitative testing is the same corpus cited in the 2025–2026 benchmarks).

Source: https://baymard.com/blog/provide-comparison-features

### 57% of travel tours sites don't provide a map on the tour details page. Participants without one performed separate Google searches to locate pickup and meeting points; a participant on a site that did provide one said 'Here, they actually tell you where you're going specifically.'

Confidence: verified · type: data

Why it matters here: For a multi-stop package the map is not decoration, it is the itinerary's spatial argument — it answers 'how much of this trip is spent on a coach?' A route map with day markers, linked to the day-by-day list, is both a decision aid and, incidentally, the most screenshot-able element on the page.

Evidence: Baymard Institute, 'Travel Site UX: 5 Best Practices', published 2025-07-01.

Source: https://baymard.com/blog/travel-site-ux-best-practices

### 85% of travel tour sites don't link their review aggregate ratings out to the third-party source. Participants explicitly discounted on-site testimonials: 'I never read the testimonials on a website... obviously they're going to just put whatever nice things.' Sites whose Tripadvisor badge was a live link to the company profile performed better.

Confidence: verified · type: principle

Why it matters here: An unknown Middle East agency has no brand equity to spend. A carousel of hand-picked quotes is read as marketing and adds nothing; a clickable, verifiable Google/Tripadvisor rating is the cheapest credibility available. Baymard's related post-checkout research adds that user-submitted photos with reviews are trusted more than professional imagery — real traveller photos from actual departures are worth more than the stock library.

Evidence: Baymard Institute, 'Travel Site UX: 5 Best Practices', 2025-07-01; and '4 Ways to Improve the Post-Checkout UX', published 2025-03-25 (photo-upload finding).

Source: https://baymard.com/blog/travel-site-ux-best-practices

### 56% of users' first action on a product detail page is exploring the images. 25% of sites provide insufficient resolution or zoom (14% low-res, 11% no zoom, 5% inadequate zoom level). 76% of mobile sites don't use thumbnails to represent additional images, relying on dot indicators — and 50% of desktop users had trouble finding additional images at all.

Confidence: verified · type: data

Why it matters here: On a package page the gallery has to answer 'what is the hotel actually like' and 'what will I actually see', which is two galleries, not one. Dot indicators under a hero image mean the visitor never reaches the room photo, which is the one image that decides the sale. Thumbnails, grouped and labelled by subject (hotel / room / excursions / transport), beat an undifferentiated swipe carousel.

Evidence: Baymard Institute, 'Ensure Sufficient Image Resolution and Zoom', published 2020-04-02; 'Always Use Thumbnails to Represent Additional Product Images (76% of Mobile Sites Don't)', published 2020-10-20. Flagged: both pre-2023; the underlying benchmark has been re-run since (2026 product page benchmark), but treat the exact percentages as dated.

Source: https://baymard.com/blog/always-use-thumbnails-additional-images

### Baymard's 2026 product page benchmark rates 52% of desktop, 62% of mobile and 64% of app product pages as 'mediocre or worse'. Two specific failures matter for travel: 67% of sites don't give a total order cost estimate on the product page (guideline #825), and 89% don't let guests use save/wishlist features without an account (guideline #798). Product lists are worse: 58% of desktop and 78% of mobile ecommerce sites rate 'poor' to 'mediocre'.

Confidence: verified · type: data

Why it matters here: The mobile gap is the opportunity. Gulf traffic is mobile-dominant, and the mobile experience is where the whole category is weakest. The 89% guest-save figure is the decisive one: a package is a 71-day decision, so a save feature gated behind account creation destroys the site's only mechanism for surviving that window.

Evidence: Baymard Institute, 'Product Page UX Best Practices', originally published 2023-10-24, updated 2026-03-18 (30,000+ scored parameters, 155+ benchmarked sites); 'Product List UX Best Practices', updated 2025-09-09 (21,000+ parameters, 170+ sites).

Source: https://baymard.com/blog/current-state-ecommerce-product-page-ux

### Across a meta-analysis of 50 studies (2006–2025) the documented average cart abandonment rate is 70.22%. Among shoppers who were not merely browsing, the top reasons are: extra costs too high (shipping, tax, fees) 40%; delivery too slow 20%; didn't trust the site with card details 19%; site required account creation 18%; checkout too long/complicated 17%; site errors/crashes 17%; couldn't see or calculate total order cost upfront 12%.

Confidence: verified · type: data

Why it matters here: Two of the top four are pricing transparency and forced registration — both entirely within design control and both are exactly what the templated travel site gets wrong. Note the distinction Baymard draws between 'extra costs too high' (40%) and 'couldn't calculate total upfront' (12%): these are separate failures. A package site must solve both — show the all-in number, and let the visitor recompute it as they change party size, room type or add-ons.

Evidence: Baymard Institute, 'Cart Abandonment Rate Statistics', last updated 2025-09-22, aggregating 50 published studies.

Source: https://baymard.com/lists/cart-abandonment-rate

### Drip pricing has moved from UX bad practice to legal exposure in three major jurisdictions. The FTC Rule on Unfair or Deceptive Fees (16 CFR Part 464) took effect 2025-05-12 and requires businesses offering short-term lodging or live-event tickets to display the Total Price — including all mandatory fees the business knows and can calculate — upfront whenever any price is shown; government taxes may be disclosed later but before payment. The UK's Digital Markets, Competition and Consumers Act 2024 banned drip pricing, and the CMA issued a £4.2m penalty against AA/BSM Driving Schools with refunds to 80,000+ consumers — its first financial penalty under the new powers. The EU's Digital Fairness Act, targeting dark patterns and drip pricing, is slated for Commission proposal in Q3 2026.

Confidence: reported · type: constraint

Why it matters here: A Middle East agency selling to travellers who transact in USD/GBP/EUR, or advertising to travellers from those markets, inherits this exposure. More usefully: all-in pricing is now a *defensible marketing position* — 'the price you see is the price you pay, per person, all fees included' is both compliance and differentiation, at the precise moment the whole category is being forced there under duress.

Evidence: FTC, Rule on Unfair or Deceptive Fees FAQ and 16 CFR Part 464, effective 2025-05-12; Federal Register 2025-01-10. CMA/DMCCA coverage: Taylor Wessing (2025-04), A&O Shearman on the AA drip-pricing penalty. European Parliament Research Service, 'Regulating dark patterns in the EU: Towards digital fairness' (2025); Goodwin (2025-11) on DFA timing.

Source: https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions

### The CMA's 2019 undertakings against Booking.com, Expedia, Agoda, Hotels.com, ebookers and trivago (compliance deadline 2019-09-01) required them to stop 'giving a false impression of the availability or popularity of a hotel', stop 'rushing customers into making a booking decision based on incomplete information', disclose when commission affects search ranking, only promote discounts actually available at that time, and display all compulsory charges including taxes, booking and resort fees in the headline price.

Confidence: verified · type: constraint

Why it matters here: This is the definitive list of the travel-industry patterns a differentiated site must refuse: '3 people are looking at this right now', 'only 1 left at this price', struck-through fake anchors, sold-out results injected into the list, and commission-ordered results presented as relevance. Copying them makes the site look like every OTA and legally exposed; refusing them, visibly and in copy, is a positioning asset.

Evidence: UK Competition and Markets Authority, 'Hotel booking sites to make major changes after CMA probe', gov.uk, February 2019. Flagged: 2019, pre-2023 — the specific case is old, but it has been superseded upward by the DMCCA 2024 and the FTC 2025 rule, so the underlying prohibitions are stronger now, not weaker.

Source: https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe

### Baymard's field-count research (2024-06-26) puts the average checkout at 11.3 form fields against an ideal of 8. Specific evidence: with a split first/last name, 42% of users typed their complete name into the first field, whereas a single 'Full Name' field caused only 4% to briefly hesitate — yet 89% of sites still split it. About 30% of users pause at an always-visible 'Address Line 2' (hide it behind a link). 35% of sites display a coupon field prominently, causing users to pause or leave to hunt for codes. Only 24% default billing address to shipping address. A separate 2025 figure cited from Baymard's checkout benchmark puts the average US checkout at 23.48 form elements / 14.88 fields versus an ideal of ~12–14 elements / ~7–8 fields.

Confidence: verified · type: data

Why it matters here: A package booking is worse than ecommerce: it needs a full traveller record per person, not one address. The only way to stay near the ideal is to cut everything that is not legally or operationally required at booking time, and defer passport numbers, dietary requirements and emergency contacts to a post-booking traveller-details step. The full-name finding is doubly important for Arabic-script and multi-part Arab names, where a two-box first/last model is structurally wrong.

Evidence: Baymard Institute, 'Checkout Optimization: Minimize Form Fields', published 2024-06-26. The 23.48/14.88 element figures are reported from Baymard's 2025 checkout benchmark via secondary citation — treat as reported, not verified.

Source: https://baymard.com/blog/checkout-flow-average-form-fields

### 42% of ecommerce sites ask users to create an account at the start of checkout or before placing the order, and 54% still don't save account creation for the confirmation step; 57% fail to state concrete account benefits. In testing, participants hesitated, slowed, sometimes believed account creation was mandatory, and mistook standard guest-checkout fields for account-setup fields. Quotes: 'This is annoying… I don't want to just stop what I'm doing to go create an account'; 'I want to Continue as guest.' Baymard's recommendation is explicit: guest checkout by default, tell users at the account-selection step that they can create an account at the end, then offer it on the confirmation page with 3–5 named benefits.

Confidence: verified · type: principle

Why it matters here: Supabase makes auth so easy that the default build is a gated one. Resist it: the architecture should support an anonymous booking session (a signed token in a cookie, an RLS policy keyed to it) that gets claimed by an account only after payment. Combined with the 89% figure on guest save features, this defines the whole auth strategy for the site.

Evidence: Baymard Institute, 'Save Account Creation for the Confirmation Step (42% Don't)', published 2023-09-19; '4 Ways to Improve the Post-Checkout UX', published 2025-03-25 (54% and 57% figures).

Source: https://baymard.com/blog/delayed-account-creation

### Chrome/web.dev's payment and address form guidance specifies: use a single input for name (autocomplete="name"), phone (type="tel", autocomplete="tel") and card number — never split them, because splitting breaks autofill and paste; use type="text" with inputmode="numeric" rather than type="number" for card/phone/account numbers, because increment arrows are semantically wrong; use enterkeyhint="next"/"done" to label the mobile return key; use Unicode-aware validation (\p{L}) rather than [a-zA-Z] because 'it's rude to be told your name is invalid'; prefer two flexible address lines or a single textarea with autocomplete="street-address" over rigid house-number/street splits; use section prefixes (e.g. "shipping address-line-1", "billing postal-code") when the same field type appears twice; keep name and id attributes stable across deploys so browsers can autofill; label elements outside inputs, never placeholder-only; and don't disable the submit button waiting for validity — users read it as broken.

Confidence: verified · type: principle

Why it matters here: This is the entire mobile-conversion mechanic for a passenger-details form and it costs nothing to implement correctly. For a site serving travellers across GCC, Levant and North Africa, three items are load-bearing: Unicode-aware name validation (Arabic script must pass), single-input international phone with a country selector rather than three boxes, and section-prefixed autocomplete so passenger 1 and passenger 2 don't fight over the same autofill slot.

Evidence: web.dev (Chrome team), 'Payment and address form best practices', last updated 2020-12-09; 'Learn Forms: Autofill', last updated 2021-11-03. Flagged: both pre-2023. The autocomplete/inputmode/enterkeyhint APIs and the guidance are unchanged and still current, but verify against the live MDN autocomplete token list at build time.

Source: https://web.dev/articles/payment-and-address-form-best-practices

### NN/g's ten guidelines for form errors: aim for inline validation; indicate successful entry for complex fields; keep messages next to the field and make them 'explicit, human-readable, polite, precise, and give constructive advice'; use colour to differentiate states; add iconography for colourblind users; use modals sparingly; do NOT validate before the input is complete — wait until the user has finished with the field and moved on; never use a validation summary as the only indication; never use tooltips to report errors; and provide extra help after repeated errors.

Confidence: verified · type: principle

Why it matters here: Guideline 7 is the one almost every React form gets wrong: validating on every keystroke turns a passport-name field into a stream of red while the user is still typing. Validate on blur. Guideline 10 matters specifically for name-matches-passport rules — after two failed attempts, surface a short explanation of why the site is being fussy ('this must match your passport exactly or the airline will refuse boarding') rather than repeating the same terse error.

Evidence: Rachel Krause, Nielsen Norman Group, '10 Design Guidelines for Reporting Errors in Forms', published 2019-02-03, last reviewed 2024-12-12. NN/g cites no controlled experiment for these; they are codified interaction-design guidance, not measured effects.

Source: https://www.nngroup.com/articles/errors-forms-design-guidelines/

### NN/g research across 49 ecommerce sites found users treat the shopping cart as 'external memory' for comparison rather than as an intent-to-buy signal, and preferred adding to cart over wishlists because wishlists were perceived as requiring burdensome setup. The label 'Wishlist' itself suppressed adoption — users associated it with sharing gift ideas and feared seeming greedy; 'Favorites' or 'My List' tested better. An effective save-for-later feature needs high discoverability, clear labelling, and no registration barrier. NN/g's warning: 'an item left in the cart may actually be leading to a purchase later on.'

Confidence: verified · type: principle

Why it matters here: Against a 71-day consideration window this is the single most important non-checkout feature on the site. Call it 'My Shortlist' or 'محفوظاتي', not 'Wishlist'. Make it work with zero sign-up (anonymous Supabase session + RLS on an anon token), and make each shortlist shareable as a URL — which converts the save feature into the site's organic distribution mechanism, since travel decisions in the Gulf are made by families and couples, not individuals.

Evidence: Page Laubheimer, Nielsen Norman Group, 'Wishlist or Shopping Cart? Saving Products for Later in Ecommerce', published 2018-11-04. Flagged: pre-2023, treat the terminology finding as a hypothesis to re-test in Arabic, not a settled result.

Source: https://www.nngroup.com/articles/wishlist-or-cart/

### The order confirmation page is documented as 'too often a dead end'. Baymard's six uses for it: cross-sell with an 'Add to order' button that needs no re-entered payment data; newsletter signup with a prefilled email; account creation (email as username, one password field); informational resources — Baymard names itineraries explicitly; app/loyalty/social promotion; and a single-question checkbox survey (which outperforms open text). Related testing found users 'hanging around waiting at the page for minutes until they can confirm they've received the order confirmation email', and that the confirmation email should carry full order details so it serves as permanent proof of purchase.

Confidence: verified · type: pattern

Why it matters here: For package travel this page is not a receipt, it is the beginning of a 30–90 day pre-departure relationship — and it is the moment of peak emotional commitment, when someone will actually screenshot and send something to family. Design it as the trip's home: a shareable itinerary, an add-to-calendar file, a visa/document checklist, a WhatsApp channel opt-in, and named add-ons that can be bought against the existing payment. This is the highest-leverage under-built surface in the entire funnel.

Evidence: Baymard Institute, '6 Order Confirmation Page Best Practices', published 2023-11-08; 'E-Commerce Cart & Checkout Usability Research' (checkout benchmark overview); '4 Ways to Improve the Post-Checkout UX', 2025-03-25.

Source: https://baymard.com/blog/order-confirmation-page

### Expedia Group's Path to Purchase study (with Luth Research; 5,713 survey respondents plus a 70,000+ digital panel across AU, CA, FR, JP, MX, UK, US) found an average 71-day consideration window — 33 days of inspiration plus 38 days of research and planning — during which travellers view an average of 141 pages of travel content in the 45 days before booking (277 in the US) and consume 303 minutes of travel content. 80% visit an OTA before any travel purchase; other top resources are search engines 61%, social media 58%, airline sites 54%, metasearch 51%.

Confidence: reported · type: data

Why it matters here: No single session closes a package sale. The design must assume the visitor will leave and come back four to six times over two months, on different devices, possibly after a WhatsApp conversation with a spouse. That converts three features from 'nice to have' into architecture: persistent anonymous shortlist, a shareable/resumable quote URL with a locked price and visible expiry, and an emailed or WhatsApp-delivered resume link. Social media at 58% also means the package page must be built to look right when pasted into a WhatsApp or Instagram DM.

Evidence: Expedia Group Media Solutions, 'Path to Purchase' research, 2023 (methodology: Luth Research custom study, 7 markets). Flagged: 2023 — near the edge of the freshness window; the 2026 refresh was not locatable, so treat magnitudes as directional.

Source: https://partner.expediagroup.com/en-us/resources/research-insights/path-to-purchase

### In a 2026 Baymard survey of 3,125 US flight shoppers, 46% of leisure travellers booked nothing beyond the flight, versus 18% of business travellers. Leisure co-booking rates: hotel 35%, rental car 22%, travel insurance 14%, airport transfer/parking 13% (business: 56%, 40%, 26%, 26% respectively). 78% of flight shoppers belong to at least one airline loyalty programme, versus a 60% benchmark for general B2C ecommerce.

Confidence: verified · type: data

Why it matters here: This is the quantitative case for the package product itself: nearly half of leisure travellers never assemble the rest of the trip, not because they don't want a hotel and transfers, but because the assembly work defeats them. The site's core promise is 'the assembly is already done' — which means the interface must make the completeness legible at a glance (a visual 'what's in this package' strip: flights, nights, hotel tier, meals, transfers, excursions, visa support, insurance), because completeness is the product.

Evidence: Baymard Institute, 'Flight Booking & Airlines Quantitative UX Insights', published 2026-06-24, survey of 3,125 US online shoppers. Flagged: US sample, not Middle East — the directional finding (leisure travellers under-assemble) should transfer, the exact percentages should not be quoted for a Gulf audience.

Source: https://baymard.com/blog/flight-booking-and-airlines-quantitative-ux-insights-2026</a>

### The American Customer Satisfaction Index Travel Study 2025 (16,771 surveys, April 2024 – March 2025) scored online travel agencies at 75, down 3% year over year — Booking.com 78, Expedia 77, Priceline 74, Tripadvisor 74, Kayak 69, Orbitz 66. Hotels averaged 76 (down 1%), airlines 74 (down 4%). The study also reports that customers who book directly via a brand's own app or site rather than through an agent report substantially higher satisfaction.

Confidence: verified · type: data

Why it matters here: The incumbents the generic template imitates are getting less satisfying, not more, and the whole category is drifting down. The design brief that follows is not 'look like Booking.com' but 'be the thing people wish Booking.com were'. The direct-booking satisfaction finding also argues that an owned, well-designed direct channel is a satisfaction advantage, not merely a margin one.

Evidence: American Customer Satisfaction Index, ACSI Travel Study 2025, published 2025-04-22; 16,771 surveys collected April 2024 – March 2025.

Source: https://theacsi.com/news-and-resources/press-releases/2025/04/22/press-release-travel-study-2025/

### NN/g's guidance is that skeleton screens are perceived as faster than spinners because a spinner communicates activity without progress, whereas a structured placeholder previews the shape of the incoming content. NN/g's response-time research establishes that attention begins to drift after roughly one second of dead time. NO reliable sourced conversion or bounce-rate figure for skeleton vs spinner was found — widely circulated '9–20% bounce reduction' numbers could not be traced to a primary study and are not used here.

Confidence: reported · type: principle

Why it matters here: Package search that queries multiple suppliers is genuinely slow. Two things follow: render skeleton cards whose geometry exactly matches the real card (same image aspect ratio, same three text lines, same price block) so nothing reflows on arrival, and stream results progressively rather than waiting for the full set — Next.js App Router with Suspense boundaries and streaming SSR makes this the default rather than an optimisation. Reserve spinners for discrete confirmed actions like payment submission.

Evidence: Nielsen Norman Group, 'Skeleton Screens vs. Progress Bars vs. Spinners' (video). Secondary syntheses (LogRocket, UX Collective) report the perceived-duration effect on mobile. Explicitly flagged: no primary quantitative source located for the magnitude of the effect.

Source: https://www.nngroup.com/videos/skeleton-screens-vs-progress-bars-vs-spinners/

### Progressive disclosure via accordions reduces page length but 'increase[s] the interaction cost by requiring people to decide on topic headings', and NN/g warns that more than two levels of disclosure typically has low usability because users get lost moving between levels. No sourced study comparing day-by-day accordion vs vertical timeline vs map-linked itinerary layouts for travel packages was found.

Confidence: inferred · type: principle

Why it matters here: The default tour-operator pattern — four collapsed accordions labelled Overview / Itinerary / Inclusions / Terms — buries the two things that decide the sale (what's included and what isn't) behind a heading-interpretation task. The defensible position given the evidence: expand inclusions and exclusions by default, and make the itinerary a scannable expanded timeline with per-day expansion only for detail. Since no study settles the layout question, this should be one of the site's first real usability tests rather than a settled decision.

Evidence: Nielsen Norman Group accordion and progressive disclosure guidance (nngroup.com/topic/accordions/, /videos/progressive-disclosure/); Baymard 'Travel Site UX: 5 Best Practices' 2025-07-01 for the itinerary information requirements. Searches for a controlled itinerary-layout study returned no primary research — reporting 'no sourced figure found' rather than inventing one.

Source: https://www.nngroup.com/topic/accordions/

## Design implications

- HOMEPAGE / SEARCH — Build the package search as the hero component itself, not a bar floating over a video, sized to be fully visible at 360×640 with no scroll. Give it three modes rather than one: (a) 'I know where' — destination autocomplete; (b) 'I know when and how much' — month picker + budget-per-person slider + departure city, no destination required; (c) 'Inspire me' — trip-type entry (honeymoon / family half-term / Umrah+leisure / solo-female-friendly / long-weekend). Mode (b) and (c) are the documented 'I don't know where I want to go' case, and almost no competitor supports them. Persist the last search in a cookie and pre-fill on return, since the buyer is returning across a ~71-day window.
- DATE INPUT — Do not ship a two-ended check-in/check-out calendar. Package travel is bought by duration and month, so the primary control is a month grid (next 12 months, with a price-floor badge per month) plus a nights selector (3/5/7/10/14+), with exact-date selection as a secondary refinement. On mobile use a single full-screen vertical scrolling calendar with combined range selection, native-feeling momentum, and departure dates that are actually available rendered as enabled — never a desktop popover shrunk down. Always offer an explicit '± 3 days' and 'any date in this month' affordance so flexibility is a first-class input rather than a compromise.
- RESULTS / CARD ANATOMY — Fix one card contract and never deviate: [1] 4:3 image with grouped thumbnail affordance, [2] package name + destination, [3] duration in nights AND days, [4] departure city, [5] next available departure date, [6] all-in price per person with the party size it assumes stated inline ('per person, 2 sharing — all fees included'), [7] a four-to-six icon inclusion strip (flight / hotel tier / meals / transfers / excursions / visa support) where an excluded item is rendered greyed and struck, not omitted, [8] a linked third-party rating, [9] a persistent 'Compare' checkbox, [10] a persistent 'Shortlist' heart. Ten elements, fixed order, identical on every card. This single decision is what makes the list comparable and it is what almost no competitor does.
- FILTERS — Ship a travel-specific filter set (departure city, nights, month, budget per person, hotel tier, board basis, flight included, family/honeymoon/solo-female suitability, halal-friendly facilities, visa requirement for the visitor's passport, physical difficulty) with a live match count next to every option value, and a horizontally scrolling applied-filter chip row with individual × removal pinned above the list on both breakpoints. Compute counts server-side in Postgres in the same query as the results — a faceted count query, not N+1.
- EMPTY RESULTS — Never render a bare 'no packages found'. The zero-result state must show, in this order: which filter is the binding constraint ('Removing "under 4,000 AED" would show 11 packages') with a one-tap remove; then nearest-match packages that break exactly one criterion, each labelled with what it breaks ('7 nights instead of 5'); then a 'Ask us to build this' handoff that carries the failed query into WhatsApp/email pre-filled. Log every zero-result query to Supabase — it is the inventory roadmap.
- COMPARISON — Build a real comparison surface, because this is the category's largest unfilled gap. Desktop: sticky bottom tray showing up to 3 selected packages with remaining slots, opening into a side-by-side table whose first section is DIFFERENCES ONLY (identical rows collapsed behind 'show 14 identical items'). Mobile: do not shrink the table — use a horizontally paged card view with a locked row-label column, or a stacked 'A vs B' difference list. Make the comparison URL shareable and screenshot-clean, because a three-package comparison is the single most shareable artefact the site can produce.
- DETAIL PAGE ABOVE THE FOLD — Within the first viewport on mobile: package name, duration, departure city, next departure date, all-in per-person price with party assumption, the inclusion/exclusion icon strip, third-party rating, and a primary CTA. Add a sticky bottom bar on mobile carrying price + CTA once the hero scrolls away. Everything else — day-by-day, hotel detail, terms — sits below, but inclusions AND exclusions must be expanded by default, never collapsed.
- 'WHAT'S NOT INCLUDED' AS A TRUST DEVICE — Give exclusions equal visual weight to inclusions: two adjacent columns, same typography, same icon size, headed 'Included' and 'Not included — you'll pay for these separately', each excluded item carrying an estimated cost range where known (visa fee, tourist tax, optional excursions, tips, meals not covered). The category hides this; showing it is the cheapest credibility purchase available and it pre-empts the 40%-of-abandonments 'extra costs' failure.
- ITINERARY — Render day-by-day as an expanded vertical timeline (day number, headline, one-line summary, meals-included markers) with per-day expansion for detail, alongside a route map whose day markers are bidirectionally linked to the timeline rows. Do not nest more than two levels of disclosure. Treat the accordion-vs-timeline choice as an open question to usability-test, not a settled one — no published study was found either way.
- PRICING — Store and display one canonical all-in per-person figure that includes every mandatory fee the business can calculate, with government taxes itemised separately but shown before payment. Never render 'from $X' without the party assumption and departure date it derives from. Provide a party-composition control (adults / children with ages / rooms) that recomputes the total live, and show both per-person and party total simultaneously. Offer currency switching across AED/SAR/QAR/KWD/USD/EUR with the conversion basis and timestamp stated. Under no circumstances add fees at a later step.
- CHECKOUT STRUCTURE — Guest checkout by default, no account wall anywhere before payment. Target ≤8 fields for the lead booker at the payment step; defer passport numbers, dietary requirements, seat preferences and emergency contacts to a post-booking 'complete your traveller details' task with its own deadline. Multi-step is acceptable and often better than one page, but only if each step is short and the step count is honest — never a five-step wizard where step one is a marketing interstitial.
- FORM MECHANICS (implement verbatim) — Single full-name input with autocomplete="name"; single phone input with type="tel" autocomplete="tel" plus a searchable country selector defaulted by IP, never three boxes; type="text" inputmode="numeric" for card and document numbers, never type="number"; enterkeyhint="next"/"done" on mobile; Unicode-aware name validation using \p{L} so Arabic-script and multi-part Arab names pass; section-prefixed autocomplete tokens per traveller ("section-traveller1 name", "section-traveller2 name") so autofill doesn't collide; labels as real <label for> elements outside the input, never placeholder-only; stable name/id attributes across deploys; submit button never disabled pending validity.
- VALIDATION AND ERROR COPY — Validate on blur, never on keystroke. Error message sits directly under its field, in plain language, saying what is wrong and what to do. For the passport-name-match rule specifically: label it 'Name exactly as printed on your passport', show a small annotated passport-line illustration on focus, and after two failed attempts surface the consequence explicitly ('airlines refuse boarding if this doesn't match — we can't fix it after ticketing'). Never a tooltip, never a summary-only error block, never red text while the user is still typing.
- SAVE / RESUME / RECOVER — Ship an anonymous shortlist that requires no account: issue a signed session token in an httpOnly cookie, store shortlist rows in Supabase keyed to it, and write an RLS policy that scopes reads to that token; on later sign-up, claim the anonymous rows into the user id. Label it 'My Shortlist', not 'Wishlist'. Make every shortlist and every quote a shareable URL with a stated price-valid-until timestamp. Offer 'send me this shortlist' via email and WhatsApp with one tap — WhatsApp is the region's default resume channel, and this is how a 71-day decision survives across devices and family members.
- PERCEIVED PERFORMANCE — Stream search results with Next.js App Router Suspense boundaries rather than blocking on the full supplier response. Skeleton placeholders must match the real card geometry pixel-for-pixel (same image aspect ratio, same line count, same price block width) so there is zero layout shift on arrival. Reserve spinners for discrete confirmed actions — payment submission, quote generation. Show partial results with a 'still checking N suppliers' affordance rather than an empty screen.
- CONFIRMATION AS TRIP HUB — The confirmation page is not a receipt. Ship it as the trip's home: shareable itinerary link, .ics add-to-calendar for every departure and key activity, a personalised pre-departure checklist (visa status, passport validity months, vaccinations, baggage allowance), a WhatsApp channel opt-in for pre-departure updates, add-ons purchasable against the stored payment method with an 'Add to booking' button that needs no re-entered card details, account creation offered here for the first time with 3–5 named benefits, and one checkbox survey question ('how did you find us?'). Send a confirmation email that contains the complete booking, not a stub — it is the traveller's proof of purchase.
- REFUSE THE DARK PATTERNS AND SAY SO — No fabricated viewer counts, no 'only 1 left' unless it is literally true and verifiable, no struck-through anchor prices that were never charged, no sold-out results injected into the list, no commission-ordered results presented as relevance. Where the site does show genuine scarcity, state the source ('3 seats left on the 14 March departure — updated 12 minutes ago'). Then make the refusal explicit in a short, plainly written 'How we price and rank' page linked from every results list. Given the FTC rule, the DMCCA and the coming Digital Fairness Act, this is compliance and positioning in the same artefact.
- MEASURE THE FUNNEL AS A FUNNEL — Instrument in Supabase: search → results viewed → filter applied → zero-result → detail viewed → comparison used → shortlisted → checkout started → traveller details → paid → post-booking task completed. Track shortlist-to-book lag in days (expect weeks, not minutes) and do not judge the shortlist feature on same-session conversion; NN/g's finding that saved items convert in later sessions applies directly.

## Anti-patterns to refuse

- FULL-BLEED HERO VIDEO WITH THE SEARCH BAR FLOATING ON TOP OR BELOW IT — the exact IHG failure Baymard measured, where 78% of participants could not see the booking feature above the fold and 99% were looking for it on arrival. It reads as 'travel website' rather than 'a place to find my trip', and on a 360×640 Android screen the search is usually half-clipped or pushed under the fold.
- 'FROM $899*' WITH AN ASTERISK — the category's signature move and the single most damaging one. It is the top documented abandonment cause (40% of non-browsing abandoners cite extra costs; a further 12% cite being unable to calculate the total upfront), it is now unlawful for lodging in the US under 16 CFR 464 as of 2025-05-12 and in the UK under the DMCCA 2024, and it destroys the only thing a small agency can compete on against an OTA — being believed.
- FABRICATED URGENCY AND SCARCITY — '3 people are viewing this', 'booked 11 times today', countdown timers on evergreen prices, struck-through anchor prices that were never charged. These are precisely the practices the CMA forced six major booking sites to abandon by 2019-09-01 and that the EU Digital Fairness Act proposal targets. Beyond the legal exposure, they are the most recognisable tell of a template site: a design-literate visitor reads them instantly as 'this is a WordPress travel theme'.
- A FOUR-COLUMN GRID OF CARDS SHOWING ONLY IMAGE + DESTINATION + 'FROM' PRICE — beautiful, and completely undecidable. Baymard's testing recorded participants abandoning tour sites specifically because prices weren't on the cards ('I don't want to have to go to each one I'm interested in'). Without duration, departure city, next departure date and what's included on the card itself, the visitor cannot shortlist and must open a tab per package, which is the behaviour that loses them.
- FOUR COLLAPSED ACCORDIONS LABELLED OVERVIEW / ITINERARY / INCLUDED / TERMS — this buries the two blocks that actually decide the purchase behind a heading-interpretation task. NN/g's own accordion guidance notes that collapsing 'increase[s] the interaction cost by requiring people to decide on topic headings'. Inclusions and exclusions should never be behind a click.
- OMITTING EXCLUSIONS ENTIRELY, OR RELEGATING THEM TO TERMS — the template default is a green tick list of inclusions and silence about everything else. Since 'extra costs too high' is the leading abandonment reason, hiding exclusions doesn't avoid the objection, it just relocates it to checkout where it costs the sale. What is NOT included, priced and shown next to what is, is a trust device the competition is structurally unwilling to copy.
- FORCED ACCOUNT CREATION — before seeing prices, before saving, or at the start of checkout. 18% of abandoners cite required account creation; 42% of sites still ask at or before checkout; 89% of sites don't allow guest access to save features. Supabase makes the gated version the path of least resistance, which is exactly why it will get built by accident unless it is prohibited in the spec.
- 'REQUEST A QUOTE' AS THE ONLY CALL TO ACTION — the classic small-agency template, which converts a browsable catalogue into a lead-gen form and forfeits every advantage of being online. It also guarantees the site can never be screenshotted or shared usefully, since there is nothing concrete on the page to share.
- A CAROUSEL OF HAND-PICKED TESTIMONIALS AS THE ONLY SOCIAL PROOF — Baymard recorded participants dismissing these outright ('obviously they're going to just put whatever nice things'). 85% of tour sites fail to link out to verifiable third-party reviews; the template default actively signals that the operator has nothing verifiable to show.
- SPLITTING NAME INTO FIRST/LAST AND PHONE INTO COUNTRY-CODE / AREA / NUMBER BOXES — 42% of users type their full name into the first box when it's split; separate phone boxes break autofill, break paste, and make mobile entry miserable. For Arabic and multi-part Arab names the two-box model is not merely inconvenient, it is structurally wrong, and Latin-only regex validation tells users their real name is invalid.
- A FIVE-STEP CHECKOUT WIZARD WITH A PROGRESS BAR AND EVERY FIELD ASKED UP FRONT — passport numbers, dietary requirements, emergency contacts and seat preferences demanded before payment. The average checkout already carries ~11.3 fields against an ideal of 8; a package site that front-loads full traveller records will land at three times that. Everything not required to take payment belongs after the booking.
- AN UNDIFFERENTIATED SWIPE CAROUSEL WITH DOT INDICATORS ON MOBILE — 76% of mobile sites do this instead of thumbnails, and 50% of desktop users in testing failed to find additional images at all. On a package page it means the visitor never reaches the room photo, which is the image that closes the sale.
- A SPINNER OVER A BLANK SCREEN WHILE SUPPLIER APIS RESOLVE, THEN A FULL-PAGE REFLOW WHEN RESULTS LAND — a spinner communicates activity without progress, and the reflow undoes whatever trust the wait cost. Streaming plus geometry-matched skeletons is not an optimisation here, it is table stakes for a site whose search is genuinely slow.
- A CONFIRMATION PAGE THAT SAYS 'THANK YOU, YOUR BOOKING REFERENCE IS #48213' AND NOTHING ELSE — Baymard calls the confirmation step 'too often a dead end'. For package travel it is the single highest-emotion moment in the whole relationship and the one point at which a customer will voluntarily send something to their family. Wasting it is the most expensive omission in the funnel.

## Differentiation moves

- THE DIFFERENCE ENGINE — a comparison view whose default state hides everything three packages share and shows only what differs, with identical rows collapsed behind 'show 14 identical items'. Every competitor either has no comparison or has a 40-row table where the differences are invisible. Baymard measured 67% usage where comparison exists and 17% of spec-driven sites offering none; travel package sites are effectively at zero. Make its URL shareable and its screenshot clean and it becomes the site's primary organic distribution unit — a WhatsApp-forwardable artefact that is genuinely useful, not marketing.
- THE HONEST PRICE PLEDGE, BUILT INTO THE DATA MODEL — one canonical all-in per-person number, computed server-side with every mandatory fee, party assumption stated inline, and a short plainly-written 'How we price and rank' page linked from every results list stating that no fee appears later and no result is ordered by commission. The FTC rule, the DMCCA and the coming Digital Fairness Act are forcing the whole category here under duress; arriving voluntarily, early, and saying so is a positioning asset a large OTA cannot credibly claim.
- THE EXCLUSIONS COLUMN — 'Not included, and roughly what it'll cost you', with estimated ranges for visa fees, tourist taxes, optional excursions, uncovered meals and tips, rendered at the same visual weight as inclusions. It is counterintuitive, it is what an honest human travel agent actually does across a desk, and no template will ever ship it. It is also the most screenshot-able trust signal on the site.
- BUDGET-AND-MONTH-FIRST SEARCH — a discovery mode where the visitor enters departure city, a month, a budget per person and a trip type, and gets destinations back. This is the documented 'I don't know where I want to go' case and it is the actual mental state of a Gulf family planning around school half-term or a long Eid weekend. Almost every competitor requires a destination as the first input, which means they can only serve people who have already decided.
- THE SHORTLIST AS A SHARED OBJECT — anonymous, no-signup, persistent, and shareable by URL or one-tap WhatsApp. Travel decisions in the region are made by couples and families, not individuals, and the 71-day consideration window guarantees the decision leaves the browser. Building the shortlist as a shared artefact rather than a private bookmark turns the site's most important retention feature into its distribution mechanism at the same time.
- PRICE-LOCKED QUOTE LINKS WITH A VISIBLE EXPIRY — 'this configuration, this price, held until 14:00 on 4 September', as a URL. It replaces the fake countdown timer with real, honest scarcity; it is what a human agent does over WhatsApp; and it gives the visitor a concrete reason to come back that does not depend on remembering the site's name.
- THE CONFIRMATION PAGE AS THE TRIP'S HOME — not a receipt but a live hub: shareable illustrated itinerary, calendar files for every departure, a personalised document and visa checklist, WhatsApp pre-departure channel opt-in, and add-ons purchasable against the stored card. Baymard explicitly names itineraries as confirmation-page content and calls the page 'a dead end' on most sites. This is the loyalty and referral surface the whole category leaves empty.
- ZERO-RESULT AS A CONVERSATION STARTER — when the filters return nothing, name the binding constraint, offer one-tap relaxation, show near-misses labelled with exactly what they break, and hand off to a human with the failed query pre-filled. Baymard's own fifth recovery strategy is 'show a direct phone number', which happens to map perfectly onto how GCC travel agencies already operate. Logging every zero-result query also turns the failure state into the inventory roadmap.
- VISA-AWARE RESULTS — a passport-nationality control that annotates every package with visa-free / visa-on-arrival / visa-required-with-lead-time for that specific passport, and filters on it. For travellers on GCC, Levant, North African and South Asian passports this is the highest-anxiety unknown in the entire decision and it is almost never surfaced before checkout. Solving it in the results list is a genuine, defensible, hard-to-copy advantage.
- GEOMETRY-LOCKED STREAMING RESULTS — skeleton cards that match the real card pixel-for-pixel, results streaming in as suppliers respond with a visible 'still checking N suppliers' state. This is a craft signal rather than a feature: a design-literate visitor registers the absence of layout shift as competence, and it is the kind of detail that gets a site noticed and linked by the design community, which is itself a channel.

## Open questions

- No published UX study was found comparing day-by-day accordion vs vertical timeline vs map-linked itinerary layouts for multi-day travel packages. This should be the site's first moderated usability test rather than a settled design decision — five participants comparing two prototypes would resolve it.
- NN/g's finding that the label 'Wishlist' suppresses adoption (vs 'Favorites' / 'My List') was tested in English with a US/Western sample in 2018. The Arabic equivalent is untested — does 'قائمة أمنياتي' carry the same gift-registry connotation, and does 'محفوظاتي' / 'المفضلة' test better? Needs a small in-language test.
- Baymard's comparison-feature research found the pattern effectively unused on mobile (3 of 38 testers at Walgreens). Given that GCC travel traffic is heavily mobile, it is genuinely unknown whether a well-designed mobile-native comparison (paged cards with a locked label column, or a difference-first stacked view) can achieve usage, or whether comparison is structurally a desktop behaviour. This is the single highest-risk assumption in the recommended design.
- No sourced Middle East-specific travel-funnel figures were located — no regional cart abandonment rate, no regional mobile-vs-desktop booking split from a primary source, no data on WhatsApp-assisted booking completion rates. All behavioural magnitudes cited here derive from US/European samples and should be treated as directional for a Gulf audience until first-party analytics exist.
- The relationship between package price point and acceptable checkout length is unmeasured. A 15,000 AED family package may tolerate more friction than a 2,000 AED weekend break, or may demand more human contact instead of less. Whether high-value packages should route to an assisted WhatsApp close rather than a self-serve checkout is an open commercial question, not just a UX one.
- Whether a shareable comparison or shortlist URL actually produces measurable organic reach, or merely feels like it should, is unverified. No sourced data was found on share rates for travel comparison artefacts. Instrument it from day one and treat the virality hypothesis as falsifiable.
- The FTC rule applies to short-term lodging and live-event tickets; whether a bundled travel package sold from outside the US to a US-resident traveller falls inside its scope is a legal question not resolved by the FTC's published FAQ. Worth a lawyer's read before making all-in pricing a public compliance claim rather than simply a design choice.
- Baymard's leisure-vs-business bundling data (46% of leisure travellers book nothing beyond the flight) comes from a US flight-shopper survey. Whether Gulf leisure travellers under-assemble at similar rates — or whether the package format is already the regional default, making the finding moot — is unknown and materially affects how hard the site should argue the 'assembly is done for you' proposition.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### STALE — 99% of participants immediately looked for booking search; 25% of travel accommodation sites fail to make it primary homepage content; at IHG 78% couldn't see it above the fold.

Fetched https://baymard.com/blog/travel-accommodations-booking-search (pub. 2022-08-16): 99%, 78% and both quotes CONFIRMED verbatim. But https://baymard.com/blog/travel-site-ux-best-practices (2025-07-01) states '30% of sites don't make the booking search feature primary homepage content'. The researcher quoted the older 25%. Also fetched the newer https://baymard.com/blog/travel-accommodations-ux-benchmark-2026 (2026-01-15) which still cites the 25%-titled article but reports the homepage-search failure as an ongoing benchmark weakness.

Corrected: 99% of test participants at OTA, large-brand hotel and whole-property rental sites immediately looked for the booking search feature on arrival, and at IHG it fell below the fold for 78% of participants ('Oh, IHG, come on! You're the one where now I have to scroll'). Baymard's 2022 article put the failure rate at 25%; its July 2025 travel article restates it as 30%, so 30% is the current figure.

### PARTIALLY_TRUE — Up to 83% of travel tour sites fail to always provide detailed tour information; Blue Hawaiian participant quote about prices absent from tour cards.

83% CONFIRMED at https://baymard.com/blog/travel-site-ux-best-practices. The quoted sentence ('I don't want to have to go to each one I'm interested in to find out what I'm looking at for price') does NOT appear in the article I retrieved; the Blue Hawaiian quote on record is different. The cited methodology ('25 rounds, 4,400+ sessions') is not stated in the article — the article says only 'large-scale' testing. Author is Sally Collins, Senior UX Researcher.

Corrected: Up to 83% of travel tour and experience sites don't always provide detailed tour information (price, duration, start time, departure/meeting point, restrictions, cancellation policy). At Blue Hawaiian Activities a participant said: 'I wish that it would show me the price right away because that's going to save me time.'

### PARTIALLY_TRUE — 40% of travel sites lack industry-specific filters; 51% of general ecommerce sites lack all five essential filter types; user-rating filters most commonly missing (53%); a Marriott participant abandoned the site over a missing star-rating filter.

40% CONFIRMED (travel article). 51% and the 20% applied-filters figure CONFIRMED at https://baymard.com/blog/current-state-product-list-and-filtering (updated 2025-09-09, 21,000+ parameters, 170+ sites). 53% CONFIRMED via https://baymard.com/blog/5-essential-filters — note that same article says 57%, not 51%, don't offer all five; the researcher's 51% is the newer benchmark number and is the right one to use. 'Abandoned the site' is stronger than the sourced quote supports — the quote records frustration, not abandonment.

Corrected: 40% of travel sites don't provide popular industry-specific filters. In general ecommerce, 51% of sites don't provide all five essential filter types (price, user rating, colour, size, brand) on the current benchmark — the 2020 article put it at 57% — and user-rating filters are the most commonly missing at 53%. A Marriott participant objected to the missing star-rating filter: 'I don't like how you can't filter by "how many stars". This is not good.'

### CONFIRMED — 20–28% of sites don't display an overview of applied filters; worst on mobile; users may misinterpret the range of products offered.

Fetched https://baymard.com/blog/how-to-design-applied-filters (orig. 2020-10-06, last updated 2026-05-13): '28% of sites across Baymard's UX benchmarks don't display an applied filters overview', and it explicitly says the problem is 'even more troublesome' on mobile because users must open the filtering interface to confirm selections. The 20% figure is CONFIRMED separately on the 2025 product-list benchmark. The range 20–28% is fair. The exact quoted sentence about 'misinterpret the range and type of products' was not returned in my retrieval — the article's recorded phrasing is 'they could mistakenly assume that the site didn't have what they needed'. Treat the quote as paraphrase, not verbatim.

### CONFIRMED — Nearly 50% of ecommerce sites fail to provide effective no-results recovery; five documented strategies.

Fetched https://baymard.com/blog/no-results-page (orig. 2019-02-04, last updated 2025-02-18, Sonia Sousa). All five strategies match exactly: related categories, alternative searches, personalised recommendations, phone/chat/help links, popular products and categories. The hesitancy quote is real: 'Although users could manually remove keywords, they're often hesitant, fearing they'll hit another "No Results" page.'

### CONFIRMED — 67% of participants used comparison when available; 17% of spec-driven sites offer none; ineffective on mobile (3 of 38 at Walgreens, zero at B&H Photo); 3–5 item cap.

Fetched https://baymard.com/blog/provide-comparison-features (2022-09-06). 67%, 17%, 38 testers, 3 at Walgreens, zero at B&H all CONFIRMED, as is the 'hesitate to visit multiple product pages' quote. Baymard says up to 5, not '3–5'. CRITICAL for the summary: this is the only evidence behind the dimension's headline recommendation, and its own mobile finding contradicts a mobile-first comparison strategy.

Corrected: 67% of participants on spec-driven sites used a comparison feature when one existed, yet 17% of sites with spec-driven products offer none. Baymard recommends allowing up to 5 products to be compared. Comparison proved valuable on desktop but near-useless on mobile: of 38 mobile testers on the two sites that had it, only 3 used it at Walgreens and none at B&H Photo. Note this corpus is spec-driven retail (pharmacy, camera gear), not travel.

### CONFIRMED — 57% of travel tours sites don't provide a map on the tour details page.

57% CONFIRMED at https://baymard.com/blog/travel-site-ux-best-practices. The quote is real but belongs to Arctic Adventures, and the researcher truncated it. The 'participants performed separate Google searches' detail was not visible in my retrieval — plausible but unverified.

Corrected: 57% of travel tour sites don't always provide a map on the tour details page. A participant on a site that did (Arctic Adventures) said: 'Here, they actually tell you where you're going specifically. So, I like that very much.'

### PARTIALLY_TRUE — 85% of travel tour sites don't link review aggregate ratings out to the third-party source; participants discount on-site testimonials.

85% CONFIRMED at https://baymard.com/blog/travel-site-ux-best-practices ('85% of sites don't always link to third-party reviews'). The testimonial quote ('I never read the testimonials on a website...') did not appear in my retrieval of the article and remains unverified. The second evidence URL is also wrong: the post-checkout article lives at https://baymard.com/blog/post-checkout-ux-best-practices, not /improve-post-checkout-ux (404).

### PARTIALLY_TRUE — 56% of users' first action on a product page is exploring images; 25% of sites have insufficient resolution/zoom (14/11/5 split); 76% of mobile sites don't use thumbnails; 50% of desktop users had trouble finding additional images.

CONFIRMED: 56% first action and 25% insufficient resolution/zoom, via https://baymard.com/blog/ensure-sufficient-image-resolution-and-zoom. CONFIRMED: 76% and 50% via https://baymard.com/blog/always-use-thumbnails-additional-images (published 2020-10-20, and that page shows NO update since — the researcher's claim that 'the underlying benchmark has been re-run' is not evidenced on the page itself). The 14% low-res / 11% no zoom / 5% inadequate zoom breakdown was not located and is UNSUPPORTED.

### CONFIRMED — 2026 Baymard product page benchmark: 52% desktop, 62% mobile, 64% app 'mediocre or worse'; 67% no total order cost (guideline #825); 89% no guest save/wishlist (#798); product lists 58% desktop / 78% mobile 'poor' to 'mediocre'.

Every figure verified. https://baymard.com/blog/current-state-ecommerce-product-page-ux (pub. 2023-10-24, last updated 2026-03-18, 30,000+ scored parameters, 155+ sites): 52/62/64, #825 '67% Don't', #798 '89% Don't'. https://baymard.com/blog/current-state-product-list-and-filtering (updated 2025-09-09, 21,000+ parameters, 170+ sites): 58% desktop and 78% mobile 'poor' to 'mediocre'. This is the strongest-sourced claim in the set.

### CONFIRMED — 70.22% average cart abandonment across 50 studies (2006–2025); top reasons 40/20/19/18/17/17/12.

Fetched https://baymard.com/lists/cart-abandonment-rate (last updated 2025-09-22, studies 2006–2025). Every percentage matches exactly: extra costs 40%, delivery too slow 20%, distrust with card 19%, account required 18%, checkout too long 17%, errors/crashes 17%, couldn't see total cost 12%. The researcher omitted 'returns policy unsatisfactory 13%', which ranks above the 12% total-cost item. Watch out: the page now surfaces under a '2026' title in search results, so re-check the last-updated date before quoting.

### PARTIALLY_TRUE — Drip pricing is now legal exposure in three jurisdictions: FTC 16 CFR 464 effective 2025-05-12; UK DMCCA + £4.2m CMA penalty against AA/BSM with 80,000+ refunds; EU Digital Fairness Act proposal slated Q3 2026.

FTC scope and effective date CONFIRMED (ftc.gov returned 403, verified via the FTC press release title, the eCFR listing, and https://www.fee-clear.com/compliance/ftc-junk-fees-rule). Researcher missed that shipping and genuinely optional fees are also excluded, not just taxes. CMA CONFIRMED via https://www.gov.uk/government/news/cma-orders-the-aa-and-bsm-driving-schools-to-refund-learner-drivers-over-drip-pricing — but the date is 2026-04-15, not the 2025 implied by the cited Taylor Wessing/A&O material; the conduct ran April–December 2025. EU DFA: the EP Legislative Train (Feb 2026) and Goodwin/Streamlex trackers confirm consultation ran 2025-07-17 to 2025-10-24 and no proposal has been published — 'slated for Q3 2026' is now a deadline being missed, not a fact.

Corrected: The FTC Rule on Unfair or Deceptive Fees (16 CFR Part 464) took effect 2025-05-12 and requires anyone offering, displaying or advertising short-term lodging or live-event tickets to disclose the Total Price inclusive of all mandatory charges, at least as prominently as any other pricing information. Government taxes, reasonable actual-cost shipping, and genuinely optional fees are excluded from the Total Price but must still be disclosed before the consumer consents to pay. On 2026-04-15 the CMA fined the AA and BSM Driving Schools £4.2m (reduced 40% from £7m for early settlement) and ordered £760,000+ in refunds to 80,000+ consumers over an undisclosed £3 booking fee — the first financial penalty under its DMCCA 2024 direct enforcement powers. The EU Digital Fairness Act, which targets dark patterns and drip pricing, had still not been proposed by the Commission as of 2026-08-22; trackers put the proposal at Q3–Q4 2026 and application no earlier than 2028.

### CONFIRMED — CMA 2019 undertakings against Booking.com, Expedia, Agoda, Hotels.com, ebookers and trivago, compliance deadline 2019-09-01, five specific prohibitions.

Fetched https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe (announced 6 February 2019, deadline 1 September 2019). All six companies and all five commitments confirmed verbatim, including 'displaying all compulsory charges such as taxes, booking or resort fees in the headline price' and 'not giving a false impression of the availability or popularity of a hotel or rushing customers into making a booking decision based on incomplete information'.

### PARTIALLY_TRUE — Average checkout 11.3 fields vs ideal 8; 42% type full name into first-name field; 4% hesitate on a single Full Name field; 89% of sites split it; 30% pause at Address Line 2; 35% show a coupon field prominently; only 24% default billing to shipping; 23.48 elements / 14.88 fields from the 2025 benchmark.

Fetched https://baymard.com/blog/checkout-flow-average-form-fields (published 2024-06-26). 11.3/8, 42%, 4%, 89%, 30%, 35% all CONFIRMED. The billing-address statistic is INVERTED in the original claim: the article reports 24% of sites showing separate billing fields rather than defaulting, and https://baymard.com/blog/set-billing-equal-to-shipping states '14% of sites still don't default the two addresses to be the same, and another 8% don't hide the billing form fields when they are the same'. 'Only 24% default billing to shipping' is FALSE. The 23.48 / 14.88 element figures could not be traced to any Baymard page — UNSUPPORTED, drop them.

Corrected: Baymard's checkout field research (2024-06-26) puts the average checkout at 11.3 form fields against an ideal of 8. With a split first/last name, 42% of users type their complete name into the first field, whereas a single 'Full Name' field causes only 4% to briefly hesitate — yet 89% of sites still split it. About 30% of users pause at an always-visible 'Address Line 2'. 35% of sites display a coupon field prominently. Roughly 24% of sites fail to default the billing address to the shipping address (14% don't default it at all, a further 8% don't hide the fields when they match) — i.e. about three-quarters already do this correctly.

### CONFIRMED — 42% of sites ask for account creation at the start of checkout; 54% don't save it for confirmation; 57% don't state concrete account benefits; guest checkout by default.

42% CONFIRMED at https://baymard.com/blog/delayed-account-creation (2023-09-19), along with the quotes 'This is annoying…I don't want to just stop what I'm doing to go create an account, verify my email, then come back here' and 'I want to "Continue as guest"'. 54% and 57% CONFIRMED via the post-checkout article. The URL the researcher used for that article 404s.

Corrected: Same claim, with the corrected source URL: the 54% and 57% figures are in Baymard's '4 Ways to Improve the Post-Checkout UX' at https://baymard.com/blog/post-checkout-ux-best-practices (2025-03-25).

### CONFIRMED — web.dev payment/address form guidance: single inputs for name, phone and card; type=text + inputmode=numeric; enterkeyhint; \p{L} validation; street-address; section prefixes; stable name/id; labels outside inputs; don't disable submit.

Fetched https://web.dev/articles/payment-and-address-form-best-practices — page is live, last updated 2020-12-09. Every element confirmed, including the exact line 'It's rude to be told your name is "invalid"!', the warning 'Don't split the number into parts', the type=text + inputmode=numeric recommendation with the note that inputmode is 'very widely supported now', shipping/billing autocomplete prefixes, stable name/id for autofill, and the advice against prematurely disabling submit. The guidance is stable but the page has not been refreshed in over five years — verify autocomplete tokens against MDN at build time, as the researcher already flags.

### CONFIRMED — NN/g's ten guidelines for reporting form errors, including inline validation and 'don't validate before the input is complete'.

Fetched https://www.nngroup.com/articles/errors-forms-design-guidelines/ — Rachel Krause, published 2019-02-03, last reviewed 2024-12-12. All ten guideline titles match the claim one for one, including #7 'Don't Validate Fields Before Input is Complete' ('avoid showing an error until the user has finished with the field and moved to the next field') and the phrase 'explicit, human-readable, polite, precise, and give constructive advice'. The researcher's caveat that NN/g cites no controlled experiment is fair.

### CONFIRMED — NN/g study of 49 ecommerce sites: cart used as external memory; 'Wishlist' label suppresses adoption; 'Favorites'/'My List' test better; save-for-later needs no registration barrier.

Fetched https://www.nngroup.com/articles/wishlist-or-cart/ — Page Laubheimer, 2018-11-04, 49 sites. All elements confirmed. Added nuance: NN/g says the alternative labels still carry registration expectations, which the original claim drops. The researcher's flag that this needs re-testing in Arabic is well placed and unaddressed anywhere else in the dimension.

Corrected: NN/g research across 49 ecommerce sites found users treat the shopping cart as external memory for comparison rather than as an intent-to-buy signal, and preferred adding to cart over wishlists because wishlists were perceived as requiring burdensome setup. The 'Wishlist' label itself suppressed adoption — users associated it with sharing gift ideas. 'Favorites' or 'My List' avoided that connotation, though NN/g notes they still carry a registration expectation, so renaming alone does not remove the barrier. 'An item left in the shopping cart may actually be leading to a purchase later on.'

### PARTIALLY_TRUE — Order confirmation page is 'too often a dead end'; Baymard's six uses including itineraries; users wait for the confirmation email.

Fetched https://baymard.com/blog/order-confirmation-page (2023-11-08). All six uses CONFIRMED, including 'Add to order' cross-sell 'without having to resubmit any payment data', prefilled newsletter email, email-as-username account creation, 'itinerary or delivery details' as the informational-resources example, app/loyalty/social promotion, and a single-tap survey question. NOT confirmed: the phrase 'too often a dead end' and the quote about users 'hanging around waiting at the page for minutes'. The article's own line is 'have a short note stating that the confirmation has also been emailed to the user'. Treat the two quotes as unsourced.

### PARTIALLY_TRUE — Expedia Path to Purchase: 71-day window (33 inspiration + 38 research), 141 pages (277 US), 303 minutes, 80% OTA / 61% search / 58% social / 54% airline / 51% metasearch; 5,713 respondents + 70,000+ panel, 7 markets.

Methodology CONFIRMED at https://partner.expediagroup.com/en-us/resources/research-insights/path-to-purchase (5,713 respondents, 70,000+ panel, AU/CA/FR/JP/MX/UK/US). 71 days = 33 + 38, 141 pages, 277 US, and 303 minutes CONFIRMED. Resource percentages 80% OTA / 61% search engines / 58% social / 54% airline sites CONFIRMED via https://partner.expediagroup.com/en-us/resources/blog/path-to-purchase-insights. The 51% metasearch figure was NOT found — UNSUPPORTED. Data is 2023 (blog dated 2024-01-09); no refresh located, so it is now roughly three years old and should carry that caveat wherever it is quoted.

### CONFIRMED — Baymard 2026 flight-shopper survey: 46% leisure vs 18% business booked nothing beyond the flight; co-booking rates; 78% loyalty membership vs 60% B2C benchmark.

Fetched https://baymard.com/blog/flight-booking-and-airlines-quantitative-ux-insights-2026 (June 2026, 3,125 US online shoppers). Every figure matches: 46% vs 18%; leisure hotel 35 / car 22 / insurance 14 / transfer 13; business 56 / 40 / 26 / 26; '78% saying they belong to at least one program' against a general B2C ecommerce benchmark of 60%. The US-sample caveat the researcher added is appropriate.

### STALE — ACSI Travel Study 2025 (16,771 surveys, Apr 2024–Mar 2025): OTAs 75 down 3%; Booking.com 78, Expedia 77, Priceline 74, Tripadvisor 74, Kayak 69, Orbitz 66; hotels 76 down 1%; airlines 74 down 4%; direct booking beats agents on satisfaction.

Fetched https://theacsi.com/news-and-resources/press-releases/2026/04/21/press-release-travel-study-2026/. The 2025 numbers the researcher cites are internally consistent with the 2026 year-over-year changes, so they were probably accurate a year ago — but presenting them as the current state of the world in August 2026 is wrong, and the DIRECTION has flipped from decline to recovery. Kayak does not appear in the 2026 release. The assertion that customers booking directly via a brand's app or site report substantially higher satisfaction than through an agent is NOT in the 2026 release and is UNSUPPORTED.

Corrected: The ACSI Travel Study 2026 (published 2026-04-21, 14,910 surveys collected April 2025 – March 2026) reverses last year's decline: airlines rose 3% to 76, lodging rose 1% to 77, and online travel agencies rose ~1% to 76. Brand scores: Tripadvisor 77 (+4%), Booking.com 77 (−1%), Expedia 75 (−3%), Priceline 71 (−4%), Orbitz 68 (+3%). Airbnb and Hilton lead lodging at 79; Delta leads airlines at 79.

### FALSE — NN/g says skeleton screens are perceived as faster than spinners, and NN/g response-time research shows attention begins to drift after roughly one second.

Both mechanisms are wrong. Fetched https://www.nngroup.com/articles/skeleton-screens/ — a real NN/g article the researcher missed while citing only a video — which frames the benefit as cognitive load and content-shape preview, not perceived speed, and cites Mejtoft et al. 2018 as its only peer-reviewed source. Fetched https://www.nngroup.com/articles/response-times-3-important-limits/ — attention drift is the 10-second limit, not one second; 1s is flow-of-thought. The researcher was right that no primary conversion figure for skeleton vs spinner exists; the widely circulated '20–30% faster perceived' and Facebook '300ms' numbers surface only in secondary blogs.

Corrected: NN/g's 'Skeleton Screens 101' (Samhita Tankala, 2023-06-04) does not claim skeleton screens are perceived as faster than spinners. It gives thresholds instead: under 1 second, show no loading indicator at all; 1–10 seconds, a spinner suits an individual module while a skeleton screen suits a full-page load, because the skeleton previews page structure and lowers cognitive load; over 10 seconds, use a progress bar with an explicit duration estimate. NN/g also warns against frame-only skeletons (header/footer) and against animated skeletons, which can be distracting or create accessibility problems. Nielsen's three response-time limits are 0.1s (feels instantaneous), 1.0s (the limit for the user's flow of thought to stay uninterrupted — the user notices the delay but stays focused), and 10s (the limit for keeping attention on the task, after which users seek other activities).

### PARTIALLY_TRUE — Accordions 'increase the interaction cost by requiring people to decide on topic headings'; more than two levels of disclosure typically has low usability.

The substance survives but the quoted mechanism does not. NN/g's accordion material (https://www.nngroup.com/articles/accordions-on-desktop/, /videos/avoid-accordions/, /articles/progressive-disclosure/) attributes the interaction cost to the click and to reduced content visibility, not to 'requiring people to decide on topic headings'. I could not locate that sentence verbatim. The 'more than two levels' warning maps to NN/g's guidance against nested accordions rather than a stated numeric rule. The researcher's honesty about finding no itinerary-layout study is confirmed — I found none either.

Corrected: NN/g's position is that accordions implement progressive disclosure and reduce scrolling but diminish content visibility and increase interaction cost, because reaching the content requires a click. NN/g's practical warnings are to avoid nesting accordions and to limit the number of panels. No sourced study comparing day-by-day accordion vs vertical timeline vs map-linked itinerary layouts for travel packages was found.

### Corrections applied

- 30%, not 25%, of travel accommodation sites fail to make the booking search feature the primary homepage content (Baymard, 2025-07-01). The 25% figure is the 2022 article title and is superseded.
- Roughly 76–86% of ecommerce sites already default the billing address to the shipping address; only about 14–24% fail to. The original claim that 'only 24% default billing address to shipping address' is inverted and would send a team to fix a problem that mostly does not exist.
- Drop the '23.48 form elements / 14.88 fields' figures entirely. They could not be traced to any Baymard page and appear only in secondary citation. Use 11.3 fields vs an ideal of 8 (Baymard, 2024-06-26).
- The current travel satisfaction data is the ACSI Travel Study 2026 (published 2026-04-21, 14,910 surveys, April 2025 – March 2026): airlines 76 (+3%), lodging 77 (+1%), OTAs ~76 (+1%); Tripadvisor 77, Booking.com 77, Expedia 75, Priceline 71, Orbitz 68. Satisfaction is recovering, not declining. Kayak is not in the 2026 release, and the 'direct booking beats agents' line is not supported by it.
- NN/g does not say skeleton screens are perceived as faster than spinners. Use NN/g's actual thresholds from 'Skeleton Screens 101' (2023-06-04): no indicator under 1s; 1–10s spinner for a module or skeleton for a full-page load; progress bar with duration estimate over 10s. Avoid frame-only and animated skeletons.
- Nielsen's response-time limits are 0.1s (instantaneous), 1.0s (flow of thought stays uninterrupted, delay noticed), 10s (limit for keeping attention). Attention drift is the 10-second threshold, not one second.
- The CMA's AA/BSM drip-pricing penalty was announced 2026-04-15 for conduct between April and December 2025: £4.2m fine (reduced 40% from £7m for early settlement) plus £760,000+ in refunds to 80,000+ consumers. The evidence line dating it to 2025 is wrong.
- The EU Digital Fairness Act has NOT been proposed as of 2026-08-22. Consultation closed 2025-10-24; trackers place the Commission proposal at Q3–Q4 2026 with staggered application no earlier than 2028. State it as pending, not as a dated commitment.
- The FTC rule excludes government charges, reasonable actual-cost shipping, AND genuinely optional fees from the Total Price — all three must still be disclosed before the consumer consents to pay. The claim mentions only taxes.
- Baymard recommends allowing comparison of up to 5 products, not a '3–5 cap'.
- Baymard's 2020 filtering article says 57%, and the 2025 product-list benchmark says 51%, of sites lack all five essential filter types. Cite 51% as current and do not present the two as the same measurement.
- The Blue Hawaiian, Marriott and testimonial quotes as written are not in the sourced Baymard travel article. The verifiable quotes are: Blue Hawaiian — 'I wish that it would show me the price right away because that's going to save me time'; Marriott — 'I don't like how you can't filter by "how many stars". This is not good.'; Arctic Adventures — 'Here, they actually tell you where you're going specifically. So, I like that very much.'
- The 52%/62%/64% product-page and 58%/78% product-list scores are GENERAL ecommerce figures. They cannot be used to show travel performs worse than general ecommerce — that comparison is unsupported as written. Use Baymard's Travel Accommodations UX Benchmark 2026 instead (published 2026-01-15), which found only 1 of 9 benchmarked travel sites/apps rated 'decent' and none 'good' or better.

### Flagged as not covered

- Baymard's Travel Accommodations UX Benchmark 2026 (published 2026-01-15; 9 sites/apps, 590+ parameters, 3,500+ scores, 2,500+ best-practice examples; only 1 of 9 'decent', none 'good') — the most on-point evidence in existence for this dimension, entirely absent. Instead the summary borrowed general-ecommerce product-page scores and presented them as proof travel underperforms general ecommerce, which they cannot support.
- Any Gulf/MENA regulatory check. FTC, CMA and EU rules bind a Middle East package site only insofar as it targets US/UK/EU consumers. What actually binds a UAE operator is Federal Law No. 15 of 2020 (fines to AED 2,000,000), Cabinet Resolution No. 66 of 2023 on e-commerce, and the UAE VAT-inclusive price display rule. None researched.
- Any Arabic or RTL evidence at all. All 24 claims rest on US/EU English-language testing. Bilingual EN/AR switching, RTL filter sidebars and applied-filter chips, mixed LTR numerals inside price/date fields, and Arabic name/address form behaviour are unaddressed — and the one place the researcher flagged it (NN/g wishlist terminology) is the least consequential.
- Date-picker, flexible-date and occupancy/room selector research. This is the single most-used control in a package funnel and nothing in the 24 claims touches it. Hijri/Gregorian calendar handling for a Gulf audience is a further gap.
- Payment methods and payment trust for the region — cash on delivery, local card schemes, instalment plans, Apple Pay adoption. Every checkout claim is US form-field research; 19% distrust of entering card details is cited without any regional payment-preference evidence.
- Mobile app versus web. Baymard's 2026 product-page benchmark scores apps separately (64% mediocre or worse) and the travel accommodations benchmark covers 8 apps against 5 sites, yet the dimension treats the funnel as web-only.
- Measurable performance evidence. Claim 23 reaches for loading UX but there are no Core Web Vitals thresholds (LCP, INP), no evidence on search-result latency, and no data on what a slow package-search response does to abandonment — the lever most directly under the build team's control.
- Accessibility. No WCAG reference, no contrast or focus-order guidance, nothing on screen-reader behaviour for filters, price breakdowns or date pickers, despite these being the exact controls the dimension recommends building.
- Evidence that comparison works in travel specifically. The dimension's headline recommendation is sourced entirely from spec-driven retail (pharmacy, camera gear) and that same source reports near-zero mobile adoption. No travel-domain comparison research was sought, and the internal contradiction was not noticed.
- Post-booking and modification flows. The dimension asserts the funnel extends past payment but covers only the confirmation page. Nothing on cancellation and change policies as a pre-purchase decidability signal, despite Baymard's 2026 flight research listing cancellation importance as a headline topic.

## Sources

- [Travel Site UX: 5 Best Practices](https://baymard.com/blog/travel-site-ux-best-practices) · Baymard Institute · 2025-07-01  
  The five core travel-specific failures with percentages: industry-specific filters (40% don't), homepage booking search (30% don't), detailed tour info (up to 83% don't), map on tour detail page (57% don't), third-party review links (85% don't). Plus the 99% search-seeking figure and the 78% IHG above-the-fold failure, with verbatim participant quotes.
- [Travel Tours & Experience Booking Ecommerce UX Research](https://baymard.com/research/travel-tours-experience-booking) · Baymard Institute · accessed 2026-08-22  
  Methodology and scope for the travel tours corpus: 25 rounds of qualitative testing, 4,400+ participant/site sessions, 280+ travel UX guidelines, and the six research themes including 93 guidelines on booking checkout alone.
- [Make the Travel Accommodations 'Booking' Search Feature the Primary Content on the Homepage (25% Don't)](https://baymard.com/blog/travel-accommodations-booking-search) · Baymard Institute · 2022-08-16  
  The 99%/25% homepage search findings, the 73%/27% boutique-hotel split, and the three-part design guidance on position, style and size for a booking search feature.
- [Cart Abandonment Rate Statistics (meta-analysis of 50 studies)](https://baymard.com/lists/cart-abandonment-rate) · Baymard Institute · last updated 2025-09-22  
  The 70.22% documented average abandonment rate and the ranked reasons among non-browsing abandoners: 40% extra costs, 19% card-trust, 18% forced account creation, 17% checkout too long, 12% couldn't calculate total upfront.
- [Checkout Optimization: Minimize Form Fields](https://baymard.com/blog/checkout-flow-average-form-fields) · Baymard Institute · 2024-06-26  
  Average 11.3 checkout fields vs ideal 8; the 42%-vs-4% full-name field evidence; 89% of sites still splitting name; 30% pausing at Address Line 2; 35% showing coupon fields prominently; only 24% defaulting billing to shipping.
- [Save Account Creation for the Confirmation Step (42% Don't)](https://baymard.com/blog/delayed-account-creation) · Baymard Institute · 2023-09-19  
  The 42% figure, the qualitative evidence on hesitation and mistaken mandatory-account beliefs, verbatim user quotes, and the explicit recommendation to defer account creation to the confirmation page with 3–5 named benefits.
- [4 Ways to Improve the Post-Checkout UX](https://baymard.com/blog/post-checkout-ux-best-practices) · Baymard Institute · 2025-03-25  
  54% of sites don't save account creation for confirmation; 57% fail to communicate account benefits; 69% omit social/UGC visuals; and the finding that user-submitted photos are trusted over professional imagery.
- [6 Order Confirmation Page Best Practices](https://baymard.com/blog/order-confirmation-page) · Baymard Institute · 2023-11-08  
  The confirmation page as 'too often a dead end', and the six documented uses — cross-sell without re-entered payment, newsletter, account creation, informational resources (itineraries named explicitly), promotions, and single-question surveys.
- [Product Comparison UX: Always Provide Comparison Features for Spec-Driven Industries (17% Don't)](https://baymard.com/blog/provide-comparison-features) · Baymard Institute · 2022-09-06  
  67% participant usage of comparison features, 17% of spec-driven sites offering none, the 3-of-38 mobile usage finding, the 3–5 item cap, always-visible checkboxes and the sticky reminder panel pattern.
- [Filtering UX: Display 'Applied Filters' in an Overview](https://baymard.com/blog/how-to-design-applied-filters) · Baymard Institute · published 2020-10-06, updated 2026-05-13  
  The 28% non-compliance figure, the three documented user problems without an applied-filter overview, and concrete placement guidance for desktop and mobile including per-chip removal.
- [Product List UX Best Practices](https://baymard.com/blog/current-state-product-list-and-filtering) · Baymard Institute · published 2024-08-22, updated 2025-09-09  
  58% desktop / 78% mobile product lists rated poor-to-mediocre; 51% of sites missing all five essential filter types; 20% missing an applied-filter overview; 68–69% missing all four essential sort types; dataset of 21,000+ parameters across 170+ sites.
- [Product Page UX Best Practices](https://baymard.com/blog/current-state-ecommerce-product-page-ux) · Baymard Institute · published 2023-10-24, updated 2026-03-18  
  52% desktop / 62% mobile / 64% app product pages rated mediocre-or-worse; 89% not allowing guest access to save features; 67% not giving total order cost estimates; 44% not surfacing return policy. Dataset of 30,000+ scores across 155+ sites.
- [5 Proven UX Strategies For 'No Results' Pages](https://baymard.com/blog/no-results-page) · Baymard Institute · published 2019-02-04, updated 2025-02-18  
  Nearly 50% of sites failing no-results recovery, and the five documented strategies including the specific recommendation to show a direct phone number rather than a generic support link.
- [Flight Booking & Airlines Quantitative UX Insights](https://baymard.com/blog/flight-booking-and-airlines-quantitative-ux-insights-2026) · Baymard Institute · 2026-06-24  
  Survey of 3,125 US flight shoppers: 46% of leisure travellers book nothing beyond the flight vs 18% of business; co-booking rates for hotel, car, insurance and transfers; 78% airline loyalty membership vs 60% general B2C benchmark.
- [Ensure Sufficient Image Resolution and Zoom / Always Use Thumbnails to Represent Additional Product Images (76% of Mobile Sites Don't)](https://baymard.com/blog/always-use-thumbnails-additional-images) · Baymard Institute · 2020-04-02 and 2020-10-20  
  56% of users explore images as their first action; 25% of sites with insufficient resolution/zoom; 76% of mobile sites without thumbnails; 50% of desktop users failing to find additional images. Flagged as pre-2023.
- [10 Design Guidelines for Reporting Errors in Forms](https://www.nngroup.com/articles/errors-forms-design-guidelines/) · Nielsen Norman Group (Rachel Krause) · published 2019-02-03, last reviewed 2024-12-12  
  Inline validation on blur rather than during typing; error messages adjacent to fields; 'explicit, human-readable, polite, precise, constructive' wording; no tooltips; no summary-only errors; extra help after repeated errors.
- [Wishlist or Shopping Cart? Saving Products for Later in Ecommerce](https://www.nngroup.com/articles/wishlist-or-cart/) · Nielsen Norman Group (Page Laubheimer) · 2018-11-04  
  Cart-as-external-memory behaviour across 49 ecommerce sites; the 'Wishlist' label suppressing adoption vs 'Favorites'/'My List'; the four requirements for an effective save-for-later (discoverable, clearly labelled, no registration, transparently simple). Flagged as pre-2023.
- [Payment and address form best practices](https://web.dev/articles/payment-and-address-form-best-practices) · web.dev (Google Chrome team) · last updated 2020-12-09  
  Autocomplete token values, single-input name/phone/card, type=text + inputmode=numeric over type=number, enterkeyhint, Unicode-aware name validation with \p{L}, flexible international address lines, section-prefixed autocomplete, stable name/id attributes, and label/validation guidance. Flagged as pre-2023 but still the current Chrome guidance.
- [The Rule on Unfair or Deceptive Fees: Frequently Asked Questions (16 CFR Part 464)](https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions) · US Federal Trade Commission · rule effective 2025-05-12; final rule announced 2024-12-17  
  The legal requirement to display Total Price upfront for short-term lodging whenever any price is shown, what mandatory charges must be included, and that government taxes may be deferred but must appear before payment.
- [Hotel booking sites to make major changes after CMA probe](https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe) · UK Competition and Markets Authority · February 2019 (compliance deadline 2019-09-01)  
  The definitive list of prohibited travel-industry patterns: false availability/popularity impressions, rushing decisions on incomplete information, commission-influenced ranking without disclosure, unsubstantiated discount claims, and compulsory charges excluded from the headline price. Flagged as pre-2023; superseded upward by DMCCA 2024.
- [Regulating dark patterns in the EU: Towards digital fairness](https://www.europarl.europa.eu/RegData/etudes/ATAG/2025/767191/EPRS_ATA(2025)767191_EN.pdf) · European Parliamentary Research Service · 2025  
  The EU Digital Fairness Act's targeting of dark patterns, drip pricing and unfair personalisation, and the Commission proposal timeline (Q3 2026), establishing that the regulatory direction of travel is toward mandatory all-in pricing across all three major markets.
- [Path to Purchase research](https://partner.expediagroup.com/en-us/resources/research-insights/path-to-purchase) · Expedia Group Media Solutions with Luth Research · 2023  
  71-day consideration window (33 inspiration + 38 research/planning), 141 pages of travel content in the 45 days before booking (277 US), 303 minutes of content, 80% OTA visitation, and the resource mix (search 61%, social 58%, airline 54%, metasearch 51%). Methodology: 5,713 survey respondents plus a 70,000+ digital panel across 7 markets. Flagged as 2023.
- [ACSI Travel Study 2025](https://theacsi.com/news-and-resources/press-releases/2025/04/22/press-release-travel-study-2025/) · American Customer Satisfaction Index · 2025-04-22 (fieldwork April 2024 – March 2025, 16,771 surveys)  
  Online travel agency satisfaction at 75 and falling 3% year over year, with per-brand scores (Booking.com 78, Expedia 77, Kayak 69, Orbitz 66), hotels 76, airlines 74, and the finding that direct booking produces substantially higher satisfaction than third-party booking.
- [Skeleton Screens vs. Progress Bars vs. Spinners](https://www.nngroup.com/videos/skeleton-screens-vs-progress-bars-vs-spinners/) · Nielsen Norman Group · accessed 2026-08-22  
  The qualitative principle that spinners communicate activity without progress while skeleton placeholders preview incoming structure. Explicitly noted: no primary quantitative magnitude for the effect was located, and circulating '9–20% bounce reduction' figures could not be traced to a primary study and are not relied on.
- [Accordions topic hub / Progressive Disclosure](https://www.nngroup.com/topic/accordions/) · Nielsen Norman Group · accessed 2026-08-22  
  That accordions shorten pages but increase interaction cost by requiring users to interpret headings, and that more than two levels of disclosure typically has low usability — the basis for keeping inclusions/exclusions expanded by default on a package detail page.
