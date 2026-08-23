# Catalogue provenance and the demo/real boundary

Dimension `catalogue-provenance-and-the-demo-real-boundary` · verification verdict: not separately verified

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Scope

Catalogue provenance and the demo/real boundary — supply models, differentiator feasibility, permitted trust artifacts, and the day-2 freshness model

## Summary

Roughly a third of the recommended differentiators across the 16 dimensions are trust artifacts whose entire value is that they are checkable. On a portfolio build with no contracted inventory and no booking history, those artifacts cannot be populated honestly — and the failure mode is not "weaker UX", it is fabricated records. A fake tourism licence number, an invented reviewer, a synthetic refund median and a hard-coded seat counter are, respectively, banned in all circumstances under DMCC Sch 20 paras 3–4 and 13, prohibited under 16 CFR 465.2, and grounds for removal under Apple 2.3.1 and Google Ads misrepresentation. The recommendation is a **specimen catalogue now, owned-core hybrid later**: invented packages under an invented house brand, explicitly presented as specimen data, with an upgrade path to a small self-contracted core (12–24 SKUs) merchandised alongside an affiliate long tail on visibly different cards. Two findings unlock most of the feasibility table. First, an itemised trip receipt allocates the *selling price*, not net cost, so it engages no supplier contract and is buildable under every model including the demo. Second, the difference engine and the cancellation ladder require zero real inventory — one compares your own catalogue to itself, the other is a policy rather than a claim about the world — making them the two strongest screenshot-worthy assets available today. The enforcement principle is that truth must be a schema property, not a copy decision: provenance enums, CHECK constraints, and a CI gate that fails the build, because a future session under pressure edits copy before it edits a migration. Full decision doc written to `/Users/sarra/Travel Agency App/.memory/projects/catalogue-provenance.md`.

## Findings

### Bedbank feeds cannot produce a stable all-in price before a live search: Hotelbeds availability returns rate types BOOKABLE and RECHECK, and RECHECK rates require a CheckRate call before confirmation, at which point the price can move.

Confidence: verified · type: constraint

Why it matters here: Kills the headline 'all-in per-person total as the first thing you see' for any consolidator-sourced package. Under a feed model the card price can only be a 'from' price with a validity stamp, and the master doc must specify that treatment or every future build session will render a per-query price as if it were fixed.

Evidence: Hotelbeds HBX knowledge base: availability responses indicate rate types — "'RECHECK' rates require CheckRate calls, while 'BOOKABLE' rates can proceed directly to confirmation." https://developer.hotelbeds.com/documentation/hotels/knowledge-base/ (fetched 2026-08-22)

Source: https://developer.hotelbeds.com/documentation/hotels/knowledge-base/

### Itemising taxes and fees from a bedbank feed is a contract negotiation, not a code change. Hotelbeds' Tax Breakdown feature is disabled by default and which display combinations are permitted is settled per-client with an account manager.

Confidence: verified · type: constraint

Why it matters here: The 'trip receipt' and 'priced exclusions column' assume you can decompose the price. Under a feed you may itemise your own markup and service fee freely, but the supplier's tax/fee split is gated. The data contract must therefore separate operator-owned line items from supplier-owned ones, so a partial receipt degrades gracefully instead of showing a wrong total.

Evidence: Hotelbeds APItude Tax Breakdown docs: "By default this feature is disabled, so you will need to contact your HBX Technical Account Manager or apitude@hotelbeds.com", who "will guide you on which of the possible tax breakdown display combinations are suitable for you." https://developer.hotelbeds.com/documentation/hotels/knowledge-base/tax-breakdown/ (fetched 2026-08-22)

Source: https://developer.hotelbeds.com/documentation/hotels/knowledge-base/tax-breakdown/

### An itemised trip receipt does NOT require disclosing net rates. It allocates the customer-facing selling price across line items, which is a merchandising decision the operator fully controls; net-rate confidentiality only bites when you expose cost or margin.

Confidence: inferred · type: principle

Why it matters here: This is the crux that makes the single most distinctive component in the research set buildable today. It converts the receipt from a supply-side blocker into a pure design task, and it means the demo can ship a full receipt without a single dishonest number — provided the components sum to the displayed total.

Evidence: Synthesis from Hotelbeds' pricing-model documentation, which distinguishes the net model (partner "can add your own markup" unless hotelMandatory is true, in which case sellingRate must be respected) from the commissionable model where "prices are final", and refers net-rate display questions to the sales manager. https://developer.hotelbeds.com/documentation/hotels/knowledge-base/pricing-models/ (fetched 2026-08-22)

Source: https://developer.hotelbeds.com/documentation/hotels/knowledge-base/pricing-models/

### Fabricated licence numbers and trust badges are banned in all circumstances, not merely discouraged. UK DMCC Act 2024 Schedule 20 para 3 prohibits "Displaying a trust mark, quality mark or equivalent without having obtained the necessary authorisation", and para 4 prohibits claiming approval, endorsement or authorisation by a public or private body when false. In force 6 April 2025.

Confidence: verified · type: constraint

Why it matters here: Settles the licence question absolutely: no licence_number column may exist in the schema, in any environment, even behind a demo label — because a labelled fake licence still functions as a fake licence once screenshotted, and screenshots are this site's distribution model. The replacement trust signal must be something Sara AI Studio can truthfully assert about itself.

Evidence: Digital Markets, Competition and Consumers Act 2024, Schedule 20 (32 practices unfair in all circumstances), paras 1–4, 13, 25; all in force 6 April 2025. https://www.legislation.gov.uk/ukpga/2024/13/schedule/20 (fetched 2026-08-22)

Source: https://www.legislation.gov.uk/ukpga/2024/13/schedule/20

### Inventing a reviewer is separately illegal in the US: 16 CFR 465.2 prohibits writing, creating or selling reviews that materially misrepresent "that the reviewer or testimonialist exists", and DMCC Sch 20 para 13 defines a fake consumer review as one "that purports to be, but is not, based on a person's genuine experience."

Confidence: verified · type: constraint

Why it matters here: The package-departure-level review component recommended elsewhere in the research set cannot be demoed with placeholder testimonials — the standard convention in every travel template. The slot must be omitted, not filled, and replaced with a component that carries real information.

Evidence: 16 CFR Part 465 §465.2 (Fake or false consumer reviews) https://www.law.cornell.edu/cfr/text/16/465.2 ; DMCC Act 2024 Sch 20 para 13 https://www.legislation.gov.uk/ukpga/2024/13/schedule/20 (both fetched 2026-08-22)

Source: https://www.law.cornell.edu/cfr/text/16/465.2

### The SEO payoff that motivates fake on-site reviews largely does not exist. Google's review-snippet guidance states that if the reviewed entity controls the reviews about itself, its LocalBusiness/Organization structured-data pages are ineligible for the star review feature, and separately: "Don't aggregate reviews or ratings from other websites."

Confidence: verified · type: principle

Why it matters here: Removes the last commercial argument for a self-hosted review block on an agency site, real or demo. It reframes the omission from a sacrifice into a correct call, and redirects the space toward components that do earn rich results (FAQPage where the Q&A is genuinely on the page).

Evidence: Google Search Central, Review snippet structured data: "If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature"; "Don't aggregate reviews or ratings from other websites." https://developers.google.com/search/docs/appearance/structured-data/review-snippet (fetched 2026-08-22)

Source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

### Structured data may never be used to assert synthetic content, regardless of on-page labelling: "Don't mark up content that is not visible to readers of the page", "Don't mark up irrelevant or misleading content, such as fake reviews", and "Don't use structured data to deceive or mislead users." Violations cost rich-result eligibility via a structured-data manual action.

Confidence: verified · type: constraint

Why it matters here: A visible 'demo' banner is invisible to a parser, so the demo/real boundary must be enforced at the markup layer independently of the visual layer. Specimen mode must emit Organization, WebSite, BreadcrumbList, FAQPage and Place — and must be CI-blocked from emitting Offer, Product, Review or AggregateRating.

Evidence: Google Search Central, General structured data guidelines, last updated 10 July 2026. https://developers.google.com/search/docs/appearance/structured-data/sd-policies (fetched 2026-08-22)

Source: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

### Platform enforcement treats a false price as a termination-grade offence, not a content error. Apple App Store Review Guideline 2.3.1: "marketing your app in a misleading way, such as by promoting content or services that it does not actually offer … or promoting a false price, whether within or outside of the App Store, is grounds for removal of your app from the App Store … and termination of your developer account." Google Ads separately bans "Promising products, services, or promotional offers in the ad that are unavailable" and dishonest pricing practices.

Confidence: verified · type: constraint

Why it matters here: Gives the demo-price rule a hard, citable ceiling: an indicative price with a validity stamp and a provenance chip is defensible; the same number rendered next to a 'Book now' verb is not. The renderer must gate CTA verbs on the provenance enum, not on the designer's judgement.

Evidence: Apple App Store Review Guidelines 2.3.1 https://developer.apple.com/app-store/review/guidelines/ ; Google Ads Misrepresentation policy (Unavailable offers, Dishonest pricing practices) https://support.google.com/adspolicy/answer/6020955 (both fetched 2026-08-22)

Source: https://developer.apple.com/app-store/review/guidelines/

### Apple's own convention legitimises the pattern this project needs: demos and betas may not ship as products ("Demos, betas, and trial versions of your app don't belong on the App Store – use TestFlight instead"), but a "fully-featured demo mode" inside an honest product is explicitly expected for review.

Confidence: verified · type: principle

Why it matters here: Names the distinction the master doc has to encode: a demo *mode* inside an honestly-framed prototype is legitimate; a demo *presented as a live agency* is not. That is the sentence the entire specimen-catalogue policy hangs on, and it comes from a platform that adjudicates it at scale.

Evidence: Apple App Store Review Guidelines 2.2 Beta Testing and the 'Before You Submit' demo-account requirement ("an active demo account or fully-featured demo mode"). https://developer.apple.com/app-store/review/guidelines/ (fetched 2026-08-22)

Source: https://developer.apple.com/app-store/review/guidelines/

### The priced-exclusions column is legally load-bearing, not decorative, wherever EU rules reach. Directive (EU) 2015/2302 Art 5(1)(c) requires "the total price of the package inclusive of taxes and, where applicable, of all additional fees, charges and other costs or, where those costs cannot reasonably be calculated in advance … an indication of the type of additional costs which the traveller may still have to bear"; Art 6(2) provides that if those were not disclosed pre-contract, "the traveller shall not bear those fees, charges or other costs."

Confidence: verified · type: constraint

Why it matters here: Undisclosed costs transfer to the organiser. So the exclusions column is not a trust flourish — it is the mechanism that keeps cost where it belongs, and it must be complete and accurate rather than illustrative. It also converts the North Africa / French-locale question into a legal-scope question, since EU-facing sales pull the Directive in.

Evidence: Directive (EU) 2015/2302 on package travel, Articles 5 and 6. https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32015L2302 (fetched 2026-08-22)

Source: https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32015L2302

### Every consolidator channel in reach is B2B-gated, so no bedbank price can legitimately appear on this site until a trade relationship exists. WebBeds is "a global B2B travel marketplace servicing the travel trade"; RezLive is an agent-login B2B reservation system; Hotelbeds issues a free sandbox key on registration but production runs Register → Complete profile → Get Certified → Go Live.

Confidence: verified · type: constraint

Why it matters here: Establishes that the tempting shortcut — wire a sandbox key into the demo so prices look 'real' — is not a shortcut. Sandbox responses are test data; rendering them as prices is the same misrepresentation as inventing them. The master doc must say this explicitly, because it is exactly what a future build session will try.

Evidence: WebBeds About https://www.webbeds.com/about-us/ ; RezLive https://www.rezlive.com/ ; HBX Group developer portal four-step production access ("Register … For a free API Key. Access to Evaluation Plan and a generic Key" → Complete profile → Get Certified → Go Live) https://developer.hotelbeds.com/ (all fetched 2026-08-22)

Source: https://developer.hotelbeds.com/

### Affiliate resale has the lowest commercial bar and the lowest differentiator yield. Travelpayouts aggregates 90+ travel brands including Booking.com, Viator and GetYourGuide on revenue share, with white-label tools — but the price is the partner's, no cost components are exposed, and the site is a retailer rather than the organiser.

Confidence: reported · type: pattern

Why it matters here: Defines the long-tail lane in the hybrid model and, more importantly, defines what it may not claim. Affiliate cards must be a visually and semantically distinct card species from day one — driven by a source_type column — so the lane can be switched on later without redesigning the catalogue or contaminating the owned core's trust artifacts.

Evidence: Travelpayouts https://www.travelpayouts.com/en/ (fetched 2026-08-22): 90+ brands across flights, hotels, tours, activities; "Travelpayouts receives fees directly from the brands, leaving the full commission for you"; White Label listed among available tools.

Source: https://www.travelpayouts.com/en/

### A stock-photo licence does not authorise implying a commercial relationship with a depicted property. The Unsplash License grants download, modification and commercial use "without permission", and restricts only resale of unmodified images and compiling a competing service — it is silent on property releases, trademarks and endorsement.

Confidence: verified · type: constraint

Why it matters here: The common demo shortcut — a real hotel photo captioned as 'our partner property' — is not cured by the image licence. It is an affiliation claim, which Google Ads' misrepresentation policy and Google Play's deceptive-behavior policy both treat as prohibited. Media must therefore carry a depicts_real_property flag constrained against an actual contracted supplier.

Evidence: Unsplash License https://unsplash.com/license ; Google Play Deceptive Behavior policy ("Apps that falsely claim to be the official app of an established entity") https://support.google.com/googleplay/android-developer/answer/9888077 (both fetched 2026-08-22)

Source: https://unsplash.com/license

### Freshness automation exists in the chosen stack and has one specific trap. Supabase Cron (pg_cron) supports schedules "from every second to once a year" and can invoke Edge Functions or HTTP endpoints (recommended ≤8 concurrent jobs, ≤10 min each); Next.js on-demand revalidation "invalidates the cache entries but regeneration happens on the next request", and ISR serves the stale page while regenerating in the background.

Confidence: verified · type: data

Why it matters here: A corrected price can survive one more request after the data changes. Anything where that is unacceptable — a price shown next to a booking-shaped CTA — must be dynamically rendered rather than ISR-cached. This is the concrete mechanism behind the whole last_verified_at story, and it needs writing down before someone caches a price page at revalidate=3600.

Evidence: Supabase Cron https://supabase.com/docs/guides/cron ; Next.js ISR guide, lastUpdated 2026-06-23, version 16.3.2 https://nextjs.org/docs/app/guides/incremental-static-regeneration (both fetched 2026-08-22)

Source: https://nextjs.org/docs/app/guides/incremental-static-regeneration

### Verification capacity, not ambition, sets the catalogue cap. Assuming ~6 verifiable facets per package and a 90-day review interval, 12 packages is ~72 checks per cycle (~0.8/day, roughly an hour a month for one person) while 300 packages is ~1,800 checks (~20/day, a full job). No sourced figure exists for the crossover; the arithmetic here is my own from stated assumptions.

Confidence: inferred · type: principle

Why it matters here: A lapsed last_verified_at is worse than none — it converts a trust artifact into published evidence of neglect. So the per-facet verification differentiator is only honest below roughly 50–100 SKUs. That makes 'we run 18 packages, here is all of them' a positioning decision rather than a limitation, and it is the reason the recommendation caps the owned core at 24 SKUs.

Evidence: Author's arithmetic from a stated assumption set; no external source found for a verification-capacity threshold. Mechanism sourced to Supabase Cron scheduling limits (≤8 concurrent jobs, ≤10 min per job) https://supabase.com/docs/guides/cron (fetched 2026-08-22)

Source: https://supabase.com/docs/guides/cron

### IPTC Photo Metadata provides a Digital Source Type property with a controlled vocabulary at cv.iptc.org/newscodes/digitalsourcetype, plus dedicated fields for AI-generated images (AI System Used, AI System Version, AI Prompt Writer Name, AI Prompt Information) and guidance for composite images.

Confidence: verified · type: trend

Why it matters here: Gives the specimen catalogue a machine-readable way to be honest about synthetic imagery, which matters because the site's growth model is images travelling off-site as screenshots and social cards. Embedding provenance in the file means the disclosure survives the crop. Specific vocabulary term definitions (trainedAlgorithmicMedia, compositeSynthetic) were not retrievable in this pass.

Evidence: IPTC Photo Metadata User Guide, sections 'Applying Metadata to AI-generated Images' and 'IPTC recommendation for metadata about composite images'. https://www.iptc.org/std/photometadata/documentation/userguide/ (fetched 2026-08-22)

Source: https://www.iptc.org/std/photometadata/documentation/userguide/

### Schema.org Offer already models the honest-price object the research set asks for: priceValidUntil is defined as "The date after which the price is no longer available", alongside availability, validFrom, validThrough, priceSpecification and eligibleQuantity. Google's merchant-listing guidance notes a listing "may not display if the priceValidUntil property indicates a past date."

Confidence: verified · type: data

Why it matters here: The vocabulary exists, so a price without a validity horizon is a choice, not a limitation. That justifies the CHECK constraint requiring price_valid_until whenever a price is set — and it means that when the site does go live, the honest-price object maps cleanly onto markup rather than needing custom invention.

Evidence: schema.org/Offer https://schema.org/Offer ; Google Search Central merchant listing structured data https://developers.google.com/search/docs/appearance/structured-data/merchant-listing (both fetched 2026-08-22)

Source: https://schema.org/Offer

### IATA accreditation is tiered and the entry tier does not require a financial guarantee: the GoLite tier offers a "Simplified accreditation process and requirements" with "No minimum financial guarantee required to issue air tickets", while GoStandard/GoEurozone/GoGlobal involve different financial structures and review frequencies.

Confidence: reported · type: data

Why it matters here: Corrects a common assumption that any credible package site needs IATA. It does not — IATA matters only for issuing air tickets directly, and even then the entry tier is light. This removes a phantom blocker from the upgrade path and means the live-agency step is gated on a local tourism licence and supplier contracts, not on IATA.

Evidence: IATA Accreditation for travel agents https://www.iata.org/en/services/accreditation/accreditation-travel/ (fetched 2026-08-22). Detailed eligibility sits in per-country accreditation checklists and the Travel Agent's Handbook, not on the public page.

Source: https://www.iata.org/en/services/accreditation/accreditation-travel/

## Design implications

- Adopt a five-value provenance enum — contracted | supplier_live | partner_listed | public_sample | illustrative — as a NOT NULL column on every priced row, and gate the CTA verb on it in the renderer: only `contracted` and `supplier_live` may render 'Book'. Everything else renders 'Ask about this trip' or 'See it on ⟨partner⟩'. This is one column and one switch statement, and it makes the demo/real boundary unforgeable by a future session that only edits copy.
- Ship the provenance chip as a first-class design-system component, not an afterthought: a small, consistent origin marker rendered inside the same visual bounding box as any number whose provenance is not `contracted`/`supplier_live`. Footer disclaimers are worthless when the growth model is people screenshotting single cards. Applied consistently across price, seat count, verification date and index figure, the chip system reads as rigour rather than apology, and it is itself a visual signature no competitor has.
- Build the cancellation ladder first. It is a policy computed from a rule table plus date arithmetic against the traveller's own departure date — zero inventory, zero supplier dependency, zero staleness — and it answers the most anxiety-loaded question in Gulf high-ticket package buying. Schema: `cancellation_rules(days_before_from, days_before_to, penalty_type ∈ percent|fixed|nights, penalty_value, applies_to ∈ package|flight|accommodation)`, computed at render, never stored per traveller.
- Build the difference engine over composition, not price. Normalise every departure into `package_attributes(departure_id, attribute_key, value_num, value_text)` covering nights, star band, board basis, transfers included, flight included, distance-to-centre band. Composition differences ('3 nights fewer, breakfast instead of half-board, same star band') never go stale and engage no supplier contract; price differences may render only while both sides' `price_valid_until` is still in the future.
- Make the receipt sum-checked in the database. `price_components(kind, label_ar, label_en, amount, is_included, is_estimate, estimate_source_url)` with a trigger rejecting any row set whose included components do not sum to `package_departures.price_per_person_all_in`, and a CHECK that `is_estimate = true` requires `estimate_source_url IS NOT NULL`. An estimate without a citable source is an invented number, and the constraint is what stops one appearing at 2am in month four.
- Derive `last_verified_at` from a `verifications(subject_table, subject_id, facet, verified_at, verified_by, source_url, review_interval_days)` table rather than storing it as a column. `verified_by` holds a named human or a job id. A derived value cannot be hand-seeded with a lie, and per-facet granularity is what makes the halal-verification and visa-rule claims specific enough to be worth anything.
- Implement staleness as a four-stage ladder, not a boolean: Fresh (render fully) → Ageing at 1–2× interval (surface 'checked on ⟨date⟩') → Stale past 2× (hide the number, keep the page indexable, swap price for 'ask for the current price', drop Offer markup) → Expired past 4× or after the departure date (drop from listings and facets, keep the URL alive and surface the next comparable departure). Prefer demote-and-replace over 404: deleting URLs destroys the link equity the entire organic-reach strategy depends on.
- Cap the owned catalogue at 24 SKUs for the portfolio build and 60 if it goes live, and make the cap visible as a positioning claim ('we run 18 packages — here is all of them'). Verification capacity, not ambition, sets the number; above roughly 50–100 SKUs a per-facet verification stamp becomes a promise that decays in public.
- Do not ISR-cache any page whose price sits next to a booking-shaped CTA. Next.js on-demand revalidation invalidates the cache entry but regenerates on the next request, and ISR serves the stale page during background regeneration — so a corrected price survives one more request. Use a nightly Supabase Cron job (pg_cron, ≤8 concurrent jobs, ≤10 min each) to recompute staleness stage and call a revalidation route, and render price-with-CTA dynamically.
- Design two card species from day one, distinguished by `packages.source_type` rather than by copy: an owned card carrying the full trust stack (receipt, exclusions, ladder, verification dates) and a partner card carrying an attributed price, a timestamp, a link-out, and none of the trust artifacts. Retrofitting this after launch means redesigning the catalogue; specifying it now costs one enum.
- Add a CI gate that fails the build in specimen mode — not warns — if any row carries `price_provenance = 'contracted'`, if any Review/AggregateRating/Offer/Product JSON-LD is emitted, if any `allocation_total` is non-null, or if any licence/registration identifier exists. Pair it with the harder rule that `reviews`, `ratings`, `testimonials`, `complaints`, `licences`, `certifications` and `refund_stats` tables must be absent, not empty. A table that does not exist cannot be quietly filled.
- Replace the fabricated operational statistics with published commitments: 'we answer WhatsApp enquiries within one working day, and if we miss it we say so' instead of a synthetic response-time median. Constrain `media_assets` so `depicts_real_property = true` requires a linked contracted supplier, and tag synthetic imagery with IPTC Digital Source Type so the disclosure survives the crop when the image travels as a social card.

## Anti-patterns to refuse

- Placeholder testimonials that ship and never get replaced — 'Amazing trip! — Ahmed K., Riyadh' with a stock headshot and five gold stars. This is the single most common travel-template artifact and it is instantly legible as fake to anyone who has seen three sites in the category. It is also, the moment the site is public, a fake consumer review under DMCC Sch 20 para 13 and a material misrepresentation that the reviewer exists under 16 CFR 465.2. Do not seed it, do not label it 'demo', do not build the component.
- 'From $499*' where the asterisk does all the work — a per-query consolidator price dressed in the typography of a fixed price. Generic competitors do this because the feed gives them no other option and the design was drawn before the data was understood. It falls under Google Ads' prohibitions on unavailable offers and dishonest pricing practices, and it is precisely the drip-pricing pattern that regulators now treat as an unfair practice. If the price is per-query, the card must say so and carry a validity stamp.
- Hard-coded scarcity — '2 seats left at this price!', 'Booked 14 times today', a countdown that resets on refresh. Templated across thousands of travel sites, and the most cynical item in the whole generic playbook. There is no honest version of this without a real held allocation decremented against real confirmed bookings, so on a demo it is simply prohibited: the schema must permit `allocation_total` only when `price_provenance = 'contracted'`.
- Badge walls — IATA, ATOL, ISO and assorted trust seals pasted as flat images with no number, no issue date and no link to a register. Under DMCC Sch 20 para 3 displaying a trust mark without the necessary authorisation is unfair in all circumstances, and para 4 covers falsely claiming approval by a public or private body. A real badge that deep-links to a register is a differentiator; an image of a badge is the category's most common lie.
- Real hotel photography and real property names lifted from the hotel's own site, presented as 'our partner properties'. Generic operators do this because it makes an empty catalogue look stocked. A stock-photo licence does not cure it — the Unsplash License authorises the image, not the implied commercial relationship — and asserting an affiliation that does not exist is prohibited under both Google Ads misrepresentation and Google Play's deceptive-behavior policy.
- Scraping third-party review scores onto your own page and marking them up with AggregateRating to farm stars in search results. Google's guidance is explicit — 'Don't aggregate reviews or ratings from other websites' — and separately, an entity's own reviews about itself are ineligible for the star feature on Organization/LocalBusiness pages. The tactic risks a structured-data manual action for a rich result that was never available.
- A single footer line saying 'this is a demonstration site' while every component above it behaves exactly as a live booking engine would. It is the standard portfolio-piece compromise and it fails on this project's own terms: the growth mechanism is people screenshotting individual cards, and no card carries the footer. Disclosure must live inside the component that makes the claim, or it does not exist.
- Wiring a supplier sandbox key into the demo so the prices look 'real'. The most likely shortcut a future build session will reach for, and worth naming explicitly as forbidden: sandbox responses are test data, so rendering them as prices is exactly as misleading as inventing them, with the added hazard that they look authoritative.

## Differentiation moves

- A provenance chip system applied to every number on the site — price, seat count, verification date, index figure — with a consistent visual grammar for contracted / live / partner-listed / public-sample / illustrative. No competitor in this category does it. It turns the demo constraint into a visual signature, it is screenshot-legible, and when the site later goes live the chips do not disappear, they upgrade — which means the honesty is structural rather than a phase.
- A public method page: 'how we price' and 'how we sample', with the actual source URLs and a versioned methodology. It converts the price index from a marketing claim into something a reader can reproduce, which is what makes it linkable rather than merely shareable. The index built from cited public fares is more verifiable than one built on proprietary bookings — the demo constraint produces the stronger artifact.
- The cancellation ladder as an interactive component: the traveller enters their own departure date and sees the penalty bands resolve against it, with the money consequence at each band. Zero inventory required, answers the highest-anxiety question in Gulf package buying, and is the most screenshot-worthy thing a demo can legitimately ship. Competitors bury this in a PDF or a terms accordion.
- The difference engine expressed as composition rather than price: 'against the nearest three, this is 3 nights fewer, breakfast instead of half-board, same star band, airport transfer included where two of them charge for it.' Never stales, engages no supplier contract, works under every supply model, and reads as an operator who actually knows their own catalogue.
- Trade the review block for a dated, on-the-record answers block — the real questions people ask on WhatsApp, answered with a date and a name against each answer. It is true, it is FAQPage-eligible where the Q&A is genuinely on the page, and it fills the trust slot with information rather than social proof theatre.
- A visible catalogue cap as positioning: 'we run 18 packages, and here is all of them, on one page.' Inverts the category's infinite-inventory reflex, makes per-facet verification an honest promise rather than a decaying one, and is the kind of claim that gets quoted.
- Publish the verification calendar itself — which facets are checked, how often, by whom, and when each was last done — as a page rather than a tooltip. Nobody in travel exposes their own maintenance schedule; doing so makes last_verified_at mean something instead of being a badge.
- A 'who built this' panel that is entirely true: Sara AI Studio, the designer's name, the build date, the stack, the Instagram handle, and a plain sentence that this is a design prototype. For a portfolio piece whose real audience is prospective clients, this outperforms any regulator badge at the job the badge was supposed to do — and it is the only trust artifact in the set that is 100% verifiable today.

## Open questions

- Which jurisdiction would Sarra license in if this becomes a live agency — Tunisia, UAE, or elsewhere? It decides the licensing regime, the organiser-liability regime, and whether the EU Package Travel Directive applies at all. Attempts to fetch the Saudi Ministry of Tourism licensing pages and Dubai DET returned 403 in this pass, so GCC-specific licence-register and licence-display requirements remain unverified and need a dedicated check.
- Does the unresolved French / North Africa question pull EU-facing sales into scope? If Tunisian, Moroccan or Algerian travellers are sold to from an EU-established entity, Directive (EU) 2015/2302 Arts 5–6 bind the price-disclosure design, which turns the exclusions column from a differentiator into a compliance control.
- Would any prospective bedbank contract permit publishing derived aggregate price data (a corridor price index) built from net rates? Hotelbeds refers pricing-model and net-display questions to the account manager, so this must be asked before any index is built on feed data rather than on public samples.
- What is the operator's genuine response-time commitment on WhatsApp enquiries? Needed to replace the fabricated response-time median with a promise that can actually be kept and, if missed, acknowledged.
- Should the live agency share this codebase behind a mode flag, or be a fork? A single codebase is cheaper but keeps the fabrication risk permanently one environment variable away from production.
- No sourced figure was found for the catalogue-size threshold at which per-facet verification stops being maintainable — the 50–100 SKU crossover here is my own arithmetic from stated assumptions and should be treated as a working hypothesis, not a benchmark.
- Google's current guidance on out-of-stock, expired and seasonal product URLs could not be retrieved in this pass (404s on the ecommerce inventory docs), so the four-stage staleness ladder's SEO behaviour — particularly demote-and-replace versus noindex versus 410 — is synthesis and should be verified against Search Central before build.

## Sources

- [Hotels Knowledge Base — HBX Group (Hotelbeds) API Suite](https://developer.hotelbeds.com/documentation/hotels/knowledge-base/) · HBX Group / Hotelbeds · fetched 2026-08-22  
  Rate types BOOKABLE vs RECHECK and the requirement to call CheckRate before confirmation; existence of cancellation policies delivered through the API; index of pricing-model, tax-breakdown and crawler articles.
- [Tax Breakdown — Hotelbeds APItude knowledge base](https://developer.hotelbeds.com/documentation/hotels/knowledge-base/tax-breakdown/) · HBX Group / Hotelbeds · fetched 2026-08-22  
  Tax breakdown is disabled by default; permitted display combinations are determined per client via the HBX Technical Account Manager — i.e. itemising supplier taxes is contractual, not technical.
- [Pricing models — Hotelbeds APItude knowledge base](https://developer.hotelbeds.com/documentation/hotels/knowledge-base/pricing-models/) · HBX Group / Hotelbeds · fetched 2026-08-22  
  Net vs commissionable models; hotelMandatory forcing sellingRate; partner markup rights; net-rate display referred to the sales manager. Underpins the finding that a receipt itemises selling price, not cost.
- [HBX Group API Suite developer portal](https://developer.hotelbeds.com/) · HBX Group / Hotelbeds · fetched 2026-08-22  
  Four-step production access (Register for a free evaluation key → Complete profile → Get Certified → Go Live) and the existence of a free sandbox, establishing that sandbox data is test data.
- [About Us — WebBeds](https://www.webbeds.com/about-us/) · WebBeds · fetched 2026-08-22  
  WebBeds is B2B-only, "a global B2B travel marketplace servicing the travel trade" — no consumer or non-trade access to inventory or rates.
- [RezLive — B2B Global Reservation System](https://www.rezlive.com/) · Travel Designer Group · fetched 2026-08-22  
  Regional consolidator is agent-login B2B only; public eligibility criteria not published.
- [Travelpayouts](https://www.travelpayouts.com/en/) · Travelpayouts · fetched 2026-08-22  
  Affiliate model characteristics: 90+ brands including Booking.com, Viator, GetYourGuide; revenue share; white-label tooling. Basis for the affiliate lane's capabilities and limits.
- [Accreditation for travel agents](https://www.iata.org/en/services/accreditation/accreditation-travel/) · IATA · fetched 2026-08-22  
  Tiered accreditation; GoLite requires no minimum financial guarantee to issue air tickets. Removes IATA as a phantom blocker on the upgrade path.
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) · Google Search Central · last updated 10 July 2026  
  Do not mark up content not visible to readers; do not mark up misleading content such as fake reviews; do not use structured data to deceive; structured-data manual actions remove rich-result eligibility.
- [Review snippet (Review, AggregateRating) structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · Google Search Central · fetched 2026-08-22  
  Self-serving reviews ineligible for star features on Organization/LocalBusiness; prohibition on fake or undisclosed incentivised reviews; prohibition on aggregating third-party ratings; requirement that reviewed content be visible on the page.
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · Google Search Central · last updated 15 May 2026  
  Scam and fraud, including "intentionally displaying false information about a business or service", and misleading functionality — the search-side standard for a site that presents itself as an operating agency.
- [Misrepresentation — Google Ads policy](https://support.google.com/adspolicy/answer/6020955) · Google · fetched 2026-08-22  
  Unavailable offers not allowed; dishonest pricing practices not allowed; false statements about identity, affiliations or qualifications not allowed.
- [Misrepresentation — Google Merchant Center / Shopping ads policy](https://support.google.com/merchants/answer/6149970) · Google · fetched 2026-08-22  
  Prohibits promotions that "represent you or your products in a way that is not accurate, realistic, and truthful" and that prompt commitment without full information.
- [Deceptive Behavior — Google Play Developer Policy](https://support.google.com/googleplay/android-developer/answer/9888077) · Google · fetched 2026-08-22  
  Misleading claims in description/title/screenshots; false claims to be the official app of an established entity or affiliated with a government entity; hidden or undocumented functionality.
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) · Apple · fetched 2026-08-22  
  2.3.1 promoting a false price is grounds for removal and developer-account termination; 2.2 demos and betas do not belong on the store; the 'fully-featured demo mode' convention that legitimises an honest demo mode inside an honestly-framed product.
- [16 CFR § 465.2 — Fake or false consumer reviews, consumer testimonials, or celebrity testimonials](https://www.law.cornell.edu/cfr/text/16/465.2) · US Federal Trade Commission (via Cornell LII) · fetched 2026-08-22  
  Prohibition on creating, buying or disseminating reviews that materially misrepresent that the reviewer exists, used the product, or had the described experience; insider-review prohibition.
- [Digital Markets, Competition and Consumers Act 2024, Schedule 20](https://www.legislation.gov.uk/ukpga/2024/13/schedule/20) · UK Parliament / legislation.gov.uk · in force 6 April 2025  
  Practices unfair in all circumstances: para 3 displaying a trust mark without authorisation; para 4 false claims of approval by a public or private body; para 13 fake consumer reviews ("purports to be, but is not, based on a person's genuine experience"); para 25 falsely representing oneself as a consumer.
- [Directive (EU) 2015/2302 on package travel and linked travel arrangements](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32015L2302) · EUR-Lex / European Union · 2015, in force; fetched 2026-08-22  
  Art 5(1)(c) total price inclusive of taxes and all additional fees, or an indication of the type of additional costs; Art 6(2) undisclosed costs are not borne by the traveller. Makes the priced-exclusions column legally load-bearing.
- [schema.org Offer](https://schema.org/Offer) · Schema.org · fetched 2026-08-22  
  priceValidUntil ("The date after which the price is no longer available"), availability, validFrom/validThrough, priceSpecification, eligibleQuantity — the vocabulary for an honest-price object.
- [Merchant listing (Product) structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) · Google Search Central · fetched 2026-08-22  
  Only pages where a shopper can purchase are eligible; listings may not display where priceValidUntil is in the past; Google may verify product data before showing it.
- [Unsplash License](https://unsplash.com/license) · Unsplash · fetched 2026-08-22  
  Grants commercial use without permission; restricts only resale of unmodified images and building a competing service; silent on property releases, trademarks and endorsement — so it does not authorise implying a relationship with a depicted property.
- [IPTC Photo Metadata User Guide](https://www.iptc.org/std/photometadata/documentation/userguide/) · IPTC · fetched 2026-08-22  
  Digital Source Type property and controlled vocabulary; dedicated AI-generated image fields (AI System Used, AI Prompt Writer Name, etc.) and composite-image guidance — machine-readable disclosure that survives a crop.
- [How to implement Incremental Static Regeneration (ISR)](https://nextjs.org/docs/app/guides/incremental-static-regeneration) · Vercel / Next.js · lastUpdated 2026-06-23, v16.3.2  
  Time-based revalidate and on-demand revalidatePath/revalidateTag; stale-while-revalidate serving; the caveat that revalidatePath invalidates but regeneration happens on the next request — the freshness trap for priced pages.
- [Supabase Cron](https://supabase.com/docs/guides/cron) · Supabase · fetched 2026-08-22  
  pg_cron scheduling from every second to once a year; ability to invoke Edge Functions or HTTP endpoints; guidance of no more than 8 concurrent jobs and 10 minutes per job — the mechanism behind the day-2 freshness model.
