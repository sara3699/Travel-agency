# Conversion and UX copywriting

Dimension `conversion-cro-copy` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Two structural findings survive, one intact and one narrowed.

The traffic wall is fully sourced and stands. NN/g's A/B Testing 101 (Neusesser, 30 Aug 2024) verifies verbatim: a 3% baseline with a 20% MDE at 95% needs 13,000 users, A/B testing "is not suited for: Low-traffic pages", tests need 1-2 weeks minimum, and "Only one in every seven A/B tests is a winning test." Govern by principle and researched defaults, not by future testing.

The enquiry-first finding must be narrowed. Trafalgar is not enquiry-only: its own FAQ confirms direct online booking, per-person twin-share pricing, and $200/$350 deposits by trip level. What is verified is that its HOMEPAGE suppresses price and leads with Get a Quote, Request a Brochure and a phone number, while Intrepid leads with "From USD $3,930" and deposits. So the decision is what the homepage leads with, and whether an enquiry path runs alongside purchase — not whether to have a purchase path.

On benchmarks, correct the doc: travel benchmarks do exist (Unbounce publishes a 4.8% travel landing-page median free of a form; Ruler Analytics puts travel at 2.8%). None measures package-purchase conversion for a small operator. Contentsquare gating and Dynamic Yield's literal 0% placeholders are real and verified.

Fully verified and actionable: Baymard's 70.22% abandonment (50 studies, 2006-2025) with extra costs 40%, card trust 19%, forced account 18%, checkout length 17%, site errors 17%, couldn't calculate total 12%; 11.3 checkout fields against an ideal of 8, with fields mattering more than steps; 7% adaptive-validation compliance; WCAG 2.2 SC 3.3.3 at Level AA; GOV.UK one-question-per-page with "Continue" left-aligned; NN/g's 2026 CTA formula and 3 C's; the Almosafer Gulf payment stack; DataReportal's Saudi/UAE penetration figures.

Tone: trustworthiness explaining 52% of desirability is real but comes from 100 US participants in four financial/health verticals in 2016. Directional, not measured for this audience.

## Summary as first written, before verification

The single most important structural decision for this site is that the primary conversion is almost certainly an ENQUIRY, not a payment — and the second most important is that you will never have enough traffic to A/B test your way to it. Both are sourced. NN/g's A/B Testing 101 (Aug 2024) puts a concrete number on the traffic wall: a 3% baseline metric with a 20% minimum detectable effect at 95% significance needs ~13,000 users, and "only one in every seven A/B tests is a winning test." A new package site will not see 13,000 qualified sessions per variant per fortnight. So the doc must govern by principle and by verified-by-research defaults, not by "we'll test it later."

On benchmarks, be honest: I fetched three vendor benchmark properties (Contentsquare 2026, Dynamic Yield, Triptease) and none published a travel-package conversion rate — Dynamic Yield's page rendered literal placeholders ("0%"), Triptease anonymised its engines, Contentsquare gated industry cuts. No sourced figure found for tour-operator package conversion rate. Anyone quoting one to Sarra is quoting a vendor's marketing.

What IS sourced and actionable: Baymard's 70.22% cart abandonment (50 studies, 2006–2025) with "extra costs too high" at 40% and "couldn't calculate total cost upfront" at 12%; 11.3 average checkout fields against an ideal of 8; only 7% of sites writing adaptive validation errors; NN/g's finding that trustworthiness explains 52% of the variance in brand desirability while friendliness adds 8%. For a high-ticket Gulf audience that is deciding whether to hand a stranger 15,000 SAR, that last number is the whole tone strategy: warm is a bonus, credible is the product.

## Findings

### No credible, publicly published conversion-rate benchmark exists for travel-package / tour-operator websites. Three separate commercial benchmark properties either gate, anonymise, or fail to render the number.

Confidence: verified · type: constraint

Why it matters here: The master doc must forbid target-setting against an imported benchmark. A Middle East package site's own baseline, measured over its first 90 days, is the only honest reference. Any 'travel sites convert at X%' claim in a future build session should be treated as vendor marketing until a primary source is produced.

Evidence: Contentsquare Digital Experience Benchmark 2026 (99 billion sessions, 6,500+ sites, 9 industries; data Q4 2024–Q4 2025) publishes engagement −10% YoY but gates industry-level conversion behind a form: https://go.contentsquare.com/en/digital-experience-benchmark/. Dynamic Yield's public benchmark page renders placeholder values — 'The average eCommerce conversion rate globally is 0%' and 'In August, the conversion rate from was the highest, at %': https://marketing.dynamicyield.com/benchmarks/conversion-rate/. Triptease's study of 10,000+ hotels (Mar–Jun 2021) reports only that 'the searcher conversion rate for the highest-performing booking engine is double that of the lowest' and withholds absolute rates: https://www.triptease.com/resources/booking-engine-conversion-rates-2021 (2021 — STALE, flagged).

Source: https://go.contentsquare.com/en/digital-experience-benchmark/

### The nearest defensible reference points are general-ecommerce, not travel: 1.4% average site-wide conversion (mobile 1.2%, desktop 1.9%) across 2,800 stores, and a 2.9% average macro-conversion rate cited by NN/g.

Confidence: reported · type: data

Why it matters here: Use these only to set the order of magnitude for funnel modelling (e.g. 'to get 30 enquiries/month at a 2% enquiry rate we need ~1,500 qualified sessions'), and label them in the doc as borrowed, not travel-specific. Note the Littledata data is Shopify-skewed physical-goods retail with a short consideration window — the opposite of package travel.

Evidence: Littledata benchmark: 1.4% average, top 10% 4.7%, mobile 1.2%, desktop 1.9%, 2,800 ecommerce sites, 2023 data — https://www.littledata.io/average/conversion-rate (2023 — flagged as ageing and non-travel). NN/g 'Macro vs. Micro Conversions' (Tim Neusesser, 19 Jul 2024) states macro conversions occur infrequently at an 'average rate: 2.9%' — https://www.nngroup.com/articles/micro-conversions/

Source: https://www.littledata.io/average/conversion-rate

### TIMELESS PRINCIPLE. The correct measurement model for a long-consideration purchase is macro conversion (the enquiry / deposit) plus two distinct classes of micro conversion: process-milestone (linear steps toward the macro) and secondary-action (non-linear predictors like newsletter signup or saving an itinerary).

Confidence: verified · type: principle

Why it matters here: This is the event taxonomy backbone. Package travel spans multiple sessions and devices, so a single 'conversion rate' number moves too slowly to steer design. Micro conversions 'enable granular tracking when macro conversion rates change slowly, allowing assessment of incremental design improvements before significant revenue impact becomes measurable' — exactly this site's situation.

Evidence: NN/g, 'Macro vs. Micro Conversions', Tim Neusesser, 19 Jul 2024. Macro = 'a desired user action that directly contributes to the primary goals of your business' (examples include 'submitted lead form'). Micro = 'actions that are indirectly related to KPIs but that tend to happen more frequently'. https://www.nngroup.com/articles/micro-conversions/

Source: https://www.nngroup.com/articles/micro-conversions/

### CONSTRAINT (2024 source, hard number). A/B test on this site will be statistically impossible for most changes: a 3% baseline with a 20% relative minimum detectable effect at 95% significance requires ~13,000 users, and NN/g explicitly lists 'low-traffic pages' as a case where A/B testing is unsuitable.

Confidence: verified · type: constraint

Why it matters here: The master doc should replace 'we'll A/B test the CTA' with a decision hierarchy: (1) apply a research-backed default, (2) run 5-user qualitative sessions, (3) instrument and watch direction over 90 days, (4) only then consider a test — and only on the highest-traffic single page. It also protects against the classic small-site failure of stopping a test early on noise.

Evidence: NN/g 'A/B Testing 101', Tim Neusesser, 30 Aug 2024: unsuitable for 'low-traffic pages: requires thousands of users to achieve statistical significance'; worked example 3% baseline / 20% MDE / 95% → 13,000 users; minimum duration 'at least 1-2 weeks'; and 'only one in every seven A/B tests is a winning test'. https://www.nngroup.com/articles/ab-testing/

Source: https://www.nngroup.com/articles/ab-testing/

### Realistic ceiling on UX-driven revenue lift is roughly 15–25–35% (low/mid/high), and gains compound with diminishing returns rather than adding up — 'complete UX overhauls won't double conversion rates overnight.'

Confidence: verified · type: data

Why it matters here: Sets honest expectations in the governing doc so future sessions don't chase a fantasy number, and forces prioritisation by (frequency of encounter × severity of friction) rather than by whichever idea is most fun to build.

Evidence: Baymard Institute, 'The Hidden Cost of Bad UX' opportunity-sizing calculator, 19 Aug 2026: revenue-lift caps of 15% (conservative), 25% (baseline), 35% (aggressive), derived from '200,000+ hours of UX testing across 40+ ecommerce industries', scored by frequency of encounter and severity of friction, using a compounding rather than additive model. https://baymard.com/blog/hidden-cost-bad-ux-revenue-calculator

Source: https://baymard.com/blog/hidden-cost-bad-ux-revenue-calculator

### VERIFIED INDUSTRY PATTERN (fetched Aug 2026). Premium package operators run enquiry-first, not booking-first. Trafalgar's homepage offers 'Get a Quote', 'Request a Brochure', a phone number and 'See Deals' — with no direct-purchase path visible and no per-tour prices on the homepage. Mid-market adventure operators (Intrepid) run booking-first with per-person 'From' prices.

Confidence: verified · type: pattern

Why it matters here: This is the business-model fork for Sarra's site, and it is observable rather than theoretical. It also means the 'obvious' template — grid of packages, Book Now on every card — is copying the mid-market pattern onto a high-ticket, high-touch product. The enquiry model needs a completely different page architecture: the package page's job is to make a person confident enough to start a conversation, not to fill a cart.

Evidence: Fetched https://www.trafalgar.com/ (Aug 2026): CTAs 'See Deals', 'Get a Quote', 'Request a Brochure', phone 866-513-1995; 'Secure your place with a low deposit, with no booking or change fees and the freedom to change your mind up to 90 days before travel'; scarcity copy 'Ends soon! Book now', 'Limited availability. Selling fast'; no direct-purchase functionality on the homepage. Fetched https://www.intrepidtravel.com/ (Aug 2026): 'From USD $3,930' per person, 'Was USD $4,225 / Now USD $3,625', 'Book now, pay later', 'Lock in your adventure with a deposit on selected trips'; no enquiry, callback or brochure option on the homepage.

Source: https://www.trafalgar.com/

### VERIFIED GULF MARKET BASELINE (fetched Aug 2026). The regional incumbent's conversion stack is: Tabby and Tamara BNPL ('split your booking into interest-free installments'), mada, STC Pay, Apple Pay, 'Pay at the Property', loyalty points, WhatsApp as a named support channel, and 'Always-On Support 24/7 in Arabic & English'.

Confidence: verified · type: pattern

Why it matters here: This is the table stakes a Middle East traveller now expects. A package site that offers only card checkout, English-only support and an email contact form will read as foreign and untrustworthy — not merely less convenient. Every one of these is a conversion surface with copy attached, and each needs a decision in the master doc.

Evidence: Fetched https://www.almosafer.com/en (Aug 2026): payment methods listed include Apple Pay, mada, STC Pay, Tabby and Tamara for interest-free instalments, 'Pay at the Property' and loyalty points; WhatsApp explicitly listed as a channel alongside app, web and '30+ branches'; support described as 24/7 in Arabic and English.

Source: https://www.almosafer.com/en

### BNPL mechanics to write copy against: Tabby's public product is 'Split it in 4 interest-free payments with no fees or in up to 12 monthly payments', regulated by the UAE Central Bank; Tabby Card plans reach 8 months.

Confidence: verified · type: data

Why it matters here: Instalment messaging must state the real structure, not a vague 'pay later'. The concrete, checkable version — '4 payments of 3,750 SAR. No interest, no fees.' — is both more persuasive and less legally exposed than 'flexible payment options'. It also lets you render a per-instalment figure next to the total, which is the single most effective way to make a 15,000 SAR package feel approachable without discounting it.

Evidence: Fetched https://tabby.ai/en-SA (Aug 2026): 'Split it in 4 interest-free payments with no fees or in up to 12 monthly payments'; Tabby Card payment plans up to 8 months; services provided by Tabby LLC under UAE Central Bank regulation. No stated user/merchant counts or travel-specific messaging on that page.

Source: https://tabby.ai/en-SA

### DATA (2025). Abandonment in ecommerce averages 70.22% across 50 studies spanning 2006–2025. Excluding browsers, the top causes are extra costs too high (40%), trust concerns with card details (19%), required account creation (18%), lengthy/complicated checkout (17%), and inability to calculate total cost upfront (12%).

Confidence: verified · type: data

Why it matters here: Four of the top five are copy-and-disclosure problems, not payment problems, and all four map directly onto a package purchase: hidden visa/transfer/tax add-ons, an unfamiliar new brand asking for card details, a forced account before an enquiry, and a per-person price that hides the family total. The site's pricing UI should be designed as an answer to this list, item by item.

Evidence: Baymard Institute, 'Cart Abandonment Rate' aggregate list, last updated 22 Sep 2025, 50 studies, 2006–2025: 70.22% average; reasons excluding 'just browsing' (42%) — extra costs 40%, slow delivery 20%, card trust 19%, forced account 18%, long checkout 17%, site errors 17%, returns policy 13%, couldn't calculate total upfront 12%. https://baymard.com/lists/cart-abandonment-rate

Source: https://baymard.com/lists/cart-abandonment-rate

### DATA (2024). Checkouts average 11.3 form fields against an ideal of 8, and 'the number of form fields impacts overall usability far more than the number of steps.' Specific field-level costs are measured: 42% of users type their full name into a first-name field (89% of sites don't offer a single name field); 30% of users pause at 'Address Line 2' (75% of sites don't hide it); 84% of sites fail to delay account creation to the confirmation step.

Confidence: verified · type: data

Why it matters here: This is the sourced answer to 'what does each extra field cost'. Note the honest limit: Baymard measures field count and specific friction behaviours, not a per-field conversion percentage. Beware the widely repeated 'every field costs X% conversion' claim — no sourced figure found for it. Build the enquiry form to a field budget, and put the budget in the doc as a hard rule.

Evidence: Baymard Institute, 'Checkout Form Field Findings', 26 Jun 2024: 2024 average 11.3 fields, ideal 8, average 5.1 steps; 17% abandoned due to a long/complicated checkout; 89% of sites don't use a single name field while 42% of users enter their full name in the first field; 75% don't hide Address Line 2 while 30% of users pause at it; 84% don't delay account creation until confirmation. https://baymard.com/blog/checkout-flow-average-form-fields

Source: https://baymard.com/blog/checkout-flow-average-form-fields

### TIMELESS PRINCIPLE, government-tested. One thing per page: split forms so each page carries a single question or decision. Label the forward button 'Continue', not 'Next', left-aligned. Progress indicators are optional and often unnecessary — the Carer's Allowance team removed a 12-step progress indicator with no negative effect on completion rates or times.

Confidence: verified · type: principle

Why it matters here: Directly supplies the 'one primary action per screen' rule for the quote builder / enquiry flow, from a source with millions of real users rather than a blog post. The progress-indicator finding is counterintuitive and worth citing when a future session wants to add a 5-step stepper to a 3-question enquiry.

Evidence: GOV.UK Design System, 'Question pages': ask 'just one question per question page'; set the legend/label as the page heading; 'Make sure your "Continue" button is labelled "Continue", not "Next"' and left-aligned; cites the Carer's Allowance 12-step progress indicator removal. https://design-system.service.gov.uk/patterns/question-pages/ . GOV.UK Service Manual, 'Form structure': build a 'question protocol' listing every item of information and justify each one — it 'forces you (and your organisation) to question why you're asking users for each item'. https://www.gov.uk/service-manual/design/form-structure

Source: https://design-system.service.gov.uk/patterns/question-pages/

### TIMELESS PRINCIPLE with 2019 evidence. Generic CTAs measurably misdirect users, and a travel site is the cited example of a broken link promise: Combadi's 'MORE INFO & BOOK' button opened a contact-form popup rather than booking options. Link and button labels must be Specific, Sincere, Substantial, Succinct — in that priority order, with no maximum length.

Confidence: verified · type: principle

Why it matters here: This is precisely the enquiry-vs-booking trap Sarra's site will fall into. If the primary conversion is an enquiry, the button must say so — 'Ask about this trip' or 'Get a quote for these dates' — not 'Book now' followed by a form. The 4 Ss also settle the length argument: an 11-word label is fine if it is specific and honest.

Evidence: NN/g, 'Better Link Labels: 4 Ss for Encouraging Clicks', Kate Moran, 24 Mar 2019 (2019 — flagged as older than 2023, but principle-level): 'A link is a promise'; bad example 'Combadi's "MORE INFO & BOOK" button led to a contact form popup, not booking options'; succinctness is subordinate to the other three Ss. https://www.nngroup.com/articles/better-link-labels/ . Supporting: NN/g, '"Get Started" Stops Users', Harley & Flaherty, 20 Aug 2017 (2017 — flagged stale) — in one meal-delivery study 6 of 8 users clicked 'Get Started' and hit a signup modal with no context; recommended fix is a specific label such as 'Take Our Style Quiz'. https://www.nngroup.com/articles/get-started/

Source: https://www.nngroup.com/articles/better-link-labels/

### 2026 GUIDANCE. NN/g's current CTA formula is three steps: start with an actionable verb, establish expectations, and communicate the action's value. Their 2026 microcopy framework adds the 3 C's — Clarity, Concision, Character — and the 3 I's — Inform, Influence, Interact.

Confidence: verified · type: principle

Why it matters here: Gives the master doc a testable rubric for every button and helper string rather than taste. 'Enquire' fails (verb only). 'Ask about Cappadocia — reply within 2 hours, no payment needed' passes all three. The 3 I's split is useful for governance: interaction microcopy must never be written in the voice of marketing microcopy.

Evidence: NN/g, 'The 3-Step CTAs Formula for Conversion', Taylor Dykes, 3 Aug 2026: 'Effective calls to action are essential for conversion. Start with an actionable verb, establish expectations, and communicate the action's value.' https://www.nngroup.com/videos/3-step-ctas-formula-for-conversion/ . NN/g, 'The 3 C's of Informational Microcopy', Taylor Dykes, 20 Mar 2026 — Clarity (signposting, information scent, relevance, terminology), Concision (example: Owala's 'Out of stock - Notify Me' leads with the barrier then the solution), Character. https://www.nngroup.com/articles/3-cs-microcopy/ . NN/g, 'The 3 I's of Microcopy', Dykes/Moran/Kaley, 1 Aug 2025. https://www.nngroup.com/articles/3-is-of-microcopy/

Source: https://www.nngroup.com/articles/3-cs-microcopy/

### DATA (2026). Adaptive, context-specific validation error messages are the single most-neglected microcopy opportunity in ecommerce: only 7% of sites comply, 93% do not. Separately, 31% of sites have no inline validation at all and a further 4% implement it incorrectly.

Confidence: verified · type: data

Why it matters here: A 93% failure rate means writing genuinely good error copy is a cheap, near-uncontested differentiator — and on an enquiry form it directly protects the only conversion that matters. Baymard's own contrast is exactly the level of specificity required: 'Your card number is incomplete' versus 'Invalid card number'.

Evidence: Baymard Institute, 'Mobile UX Trends 2026: 10 Best Practices', published 23 May 2024, updated 14 Jul 2026 — practice #5 'Use Adaptive Messages for Validation Errors': 7% of sites comply, 93% don't; example contrast 'Your card number is incomplete' vs 'Invalid card number'. Also #4 address validator/lookup 46% comply, #7 highlight current scope in mobile nav 6% comply. https://baymard.com/blog/mobile-ux-ecommerce . Baymard, 'Inline Form Validation', 9 Jan 2024: 31% of sites lack inline validation, 4% implement it incorrectly; validate on blur or at correct character length, remove errors at the keystroke level, use positive validation. https://baymard.com/blog/inline-form-validation

Source: https://baymard.com/blog/mobile-ux-ecommerce

### CONSTRAINT (legal floor, not a nicety). WCAG 2.2 Success Criterion 3.3.3 Error Suggestion, Level AA: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.' NN/g's scoring rubric operationalises this with at least 3 redundant error indicators and 7th–8th grade reading level.

Confidence: verified · type: constraint

Why it matters here: Turns 'write nicer errors' into a pass/fail requirement the master doc can enforce, with a scoring rubric future sessions can actually run against a build. The reading-level rule matters doubly for a bilingual audience reading English as a second language.

Evidence: W3C, Understanding WCAG 2.2, SC 3.3.3 Error Suggestion, Level AA — exact requirement quoted; examples include offering the valid set (January–December) when a month field receives '12'. https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html . NN/g, 'An Error Messages Scoring Rubric', Neusesser & Sunwall, 18 Jun 2023: 3 dimensions × 12 guidelines, 'at least 3 error indicators (such as supplemental labels, iconography, borders, or shading)', 7th–8th grade reading level, scored 1–4 and averaged to letter grades; real scores — Craigslist 2.08 (D), Google Flights 3.17 (B), J.Crew 3.67 (A). https://www.nngroup.com/articles/error-messages-scoring-rubric/

Source: https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html

### DATA (tone). Trustworthiness explains 52% of the variability in how desirable users find a brand; friendliness adds only a further 8%. A playful tone tested friendlier but 0.3 points LESS trustworthy on a 5-point scale, with no improvement in likelihood to recommend.

Confidence: verified · type: data

Why it matters here: This settles the tone question for a high-ticket travel brand better than any style debate. For a new agency asking a Gulf family to commit five figures, cleverness is not free — it can cost trust. The doc should mandate a voice that is warm and specific but never jokey at moments of financial commitment, and reserve personality for low-stakes surfaces (empty states, loading, thank-you pages).

Evidence: NN/g, 'The Impact of Tone of Voice on Users' Brand Perception', Kate Moran, published 7 Aug 2016, last reviewed 30 Jan 2024 (original study 2016 — FLAGGED as older than 2023, though re-reviewed 2024). Quantitative phase: 100 US participants, paired samples across insurance, banking, healthcare and security, varying only tone. Findings: '52% of the variability in the desirability scores is explained by trustworthiness'; friendliness explained an additional 8%; the playful insurance tone was rated friendlier but 0.3 points less trustworthy with no lift in recommendation. Four tone dimensions: funny/serious, formal/casual, respectful/irreverent, enthusiastic/matter-of-fact. https://www.nngroup.com/articles/tone-voice-users/

Source: https://www.nngroup.com/articles/tone-voice-users/

### TIMELESS PRINCIPLE (evidence pre-2023, flagged). Anchoring is real and measurable: Tversky & Kahneman's descending-vs-ascending multiplication produced median estimates of 2,250 vs 512 for the same product; Ariely's SSN study produced average bids of $16.09 vs $55.64 for the same keyboard; Oxfam's suggested donation values increased form completions by 23%.

Confidence: verified · type: principle

Why it matters here: Justifies three specific pricing-UI decisions: showing a genuine higher-tier package next to the target package; pre-filling a suggested budget range or traveller count in the quote builder rather than leaving it blank; and stating the deposit amount as the anchor for commitment ('from 500 SAR to hold') rather than the full price. The Oxfam finding is the strongest argument for defaults in the enquiry form.

Evidence: NN/g, 'The Anchoring Principle', Therese Fessenden, 9 Dec 2018 (2018 — FLAGGED as older than 2023; underlying studies 1974 and mid-2000s). Reports Tversky & Kahneman (1974) medians 512 vs 2,250 for 8!, Ariely et al. bids $16.09 (SSN 00-19) vs $55.64 (SSN 80-99), and an Oxfam test where suggested values increased form completions by 23%. UX applications named: default values, process time estimates, and original prices shown with discounts. https://www.nngroup.com/articles/anchoring-principle/

Source: https://www.nngroup.com/articles/anchoring-principle/

### CONSTRAINT / 2025-26 TREND. Price-transparency regulation is tightening around drip pricing and partitioned pricing. The UK CMA published dedicated price transparency guidance (CMA209) on 18 Nov 2025, updated 7 Jan 2026, covering 'what to include in your pricing information (including mandatory fees, taxes and charges)', 'drip pricing' and 'partitioned pricing' under the Digital Markets, Competition and Consumers Act 2024.

Confidence: reported · type: constraint

Why it matters here: Even where it does not bind a Gulf-registered seller, this is where the norm is heading and where any UK/EU-resident customers sit. It argues for a design rule that is also a trust asset: the headline package price includes every mandatory fee, and any per-person figure is shown beside the real total for the party. 'Unable to calculate total cost upfront' is already a named 12% abandonment cause (Baymard).

Evidence: GOV.UK, 'Price transparency (CMA209)', published 18 November 2025, last updated 7 January 2026, describing guidance on mandatory fees/taxes/charges, drip pricing and partitioned pricing under the DMCC Act 2024 — https://www.gov.uk/government/publications/price-transparency-cma209 . Related: 'Unfair commercial practices (CMA207)', published 4 April 2025, updated 18 November 2025 to reflect the new price-transparency guidance — https://www.gov.uk/government/publications/unfair-commercial-practices-cma207 . NOTE: I read the GOV.UK index pages only; the substantive rules sit in the 58-page PDF, so the specific requirements on strikethrough/reference prices and urgency claims are marked as not yet verified from primary text.

Source: https://www.gov.uk/government/publications/price-transparency-cma209

### DATA (Nov 2025). The Gulf audience is effectively 100% online and radically mobile-saturated: Saudi Arabia at 99.0% internet penetration with 48.7M mobile connections (140% of population); UAE at 99.0% internet penetration with 23.0M mobile connections (202% of population). Snapchat reaches 72.9% and YouTube 79.2% of the Saudi population.

Confidence: verified · type: data

Why it matters here: Design and copy must be phone-first in a stronger sense than 'responsive': multiple SIMs and multiple devices per person are the norm, which supports a phone-number-first contact model and messaging-app follow-up over email threads. The Snapchat/YouTube reach numbers also tell you where a screenshot of your site actually travels.

Evidence: DataReportal, 'Digital 2026: Saudi Arabia', published 8 Nov 2025 (data Oct 2025): 34.4M internet users (99.0%), 48.7M mobile connections (140% of population), YouTube 79.2%, Snapchat 72.9%, Instagram 52.4%, Facebook 50.8%, X 43.1%; report itself cautions that 'social media user identities figures may not represent unique individuals'. https://datareportal.com/reports/digital-2026-saudi-arabia . DataReportal, 'Digital 2026: United Arab Emirates', published 5 Nov 2025: 99.0% internet penetration (11.3M users), 23.0M mobile connections (202% of population). https://datareportal.com/reports/digital-2026-united-arab-emirates

Source: https://datareportal.com/reports/digital-2026-saudi-arabia

### DATA (2020, flagged) + PRINCIPLE. 76% of online shoppers prefer to buy with information in their native language and 40% will never purchase from websites in another language; W3C defines localization as adaptation covering currency, date/number formats, symbols and imagery, text direction, address formats, name ordering and even 'fundamental rethinking of processes' — explicitly not translation.

Confidence: reported · type: principle

Why it matters here: Translated marketing copy fails because marketing copy is the layer most dependent on cultural paradigm, not vocabulary. For Arabic this means the Arabic site is a separate piece of writing with its own headline logic, its own proof points (family suitability, prayer facilities, halal dining, visa handling, Hijri/Gregorian dates, SAR/AED framing), and its own register — not a mirrored English page. The 40% figure is the commercial argument for doing it properly rather than machine-translating.

Evidence: CSA Research, 'Can't Read, Won't Buy' press release, 7 July 2020 (2020 — FLAGGED as older than 2023): 8,709 verified consumers across 29 countries; 76% prefer to buy products with information in their native language; 40% will never purchase from websites in other languages; 65% prefer content in their language even if poor quality. https://csa-research.com/Blogs-Events/CSA-in-the-Media/Press-Releases/Consumers-Prefer-their-Own-Language . W3C i18n, 'Localization vs. Internationalization': localization is 'the adaptation of a product, application or document content to meet the language, cultural and other requirements of a specific target market', covering numeric/date/time/currency formats, symbols/icons/colours/imagery, keyboard layouts, text direction, address formats, postal codes, phone numbers and name ordering. https://www.w3.org/International/questions/qa-i18n

Source: https://csa-research.com/Blogs-Events/CSA-in-the-Media/Press-Releases/Consumers-Prefer-their-Own-Language

### GA4 ships a native lead lifecycle event set — generate_lead, qualify_lead, working_lead, close_convert_lead (plus disqualify/unconvert variants) — alongside the ecommerce set (view_item, select_item, add_to_cart, begin_checkout, purchase) with defined required parameters (currency, value, items, transaction_id).

Confidence: verified · type: pattern

Why it matters here: An enquiry-first travel site should instrument the LEAD lifecycle as its spine and borrow only the shape of the ecommerce events, so that a quote request carries a monetary value from the moment it is created and can be reconciled against an eventual booking. This is what makes 'our enquiry conversion rate' a number with money attached rather than a vanity count.

Evidence: Google Analytics 4 recommended events reference: lead-related events generate_lead, qualify_lead, working_lead, close_convert_lead are listed; select_item requires an items array with item_id or item_name and accepts item_list_id/item_list_name; add_to_cart and begin_checkout require currency, value and items; purchase requires currency, value, transaction_id and items; search requires search_term; sign_up accepts method. https://developers.google.com/analytics/devguides/collection/ga4/reference/events (fetched Aug 2026)

Source: https://developers.google.com/analytics/devguides/collection/ga4/reference/events

### There is a published, concrete catalogue of the linguistic tells that make text read as AI-generated — specific overused words, the avoidance of plain 'is/are' in favour of 'serves as / stands as / boasts', negative parallelism ('not just X, but Y'), participial commentary clauses ('highlighting its rich heritage'), and promotional buzzspeak including the exact travel words 'nestled', 'vibrant', 'rich heritage', 'natural beauty', 'breathtaking'.

Confidence: verified · type: pattern

Why it matters here: The overlap between the AI-writing tell list and standard travel-brochure vocabulary is almost total. 'Nestled in the breathtaking region of X, this vibrant town boasts a rich cultural heritage' is simultaneously the most common sentence on travel websites AND a textbook AI-detection signature. That single overlap is the sharpest possible weapon against the stated failure mode: banning that vocabulary makes the site sound neither templated nor machine-written.

Evidence: Wikipedia:Signs of AI writing (WP:AISIGNS), fetched Aug 2026. Lists AI vocabulary by era ('delve', 'tapestry', 'testament', 'vibrant', 'pivotal', 'meticulous', 'underscore', then 'align with', 'enhance', 'fostering', 'highlighting', 'showcasing'); copula avoidance ('is' → 'serves as', 'stands as', 'represents'; 'has' → 'features', 'boasts', 'offers'); negative parallelism ('not just X, but also Y', 'not X, but Y', 'X rather than Y'); superficial-analysis participles ('highlighting their historical significance'); and promotional buzzspeak with the worked example 'Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage'. https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing

Source: https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing

### PRINCIPLE. Confirmation and transactional messages have hard content requirements: a clear subject/headline, company name, order/enquiry summary, status and expected dates, contact information and a link to detail, plus easy opt-out — inside 50–240 characters for push, and with SMS reserved for information the user will need to retrieve later.

Confidence: verified · type: principle

Why it matters here: For an enquiry-led model the confirmation is not an afterthought; it is the moment the customer decides whether a stranger is going to reply. The named negative example is instructive: Zara sent a shipping-delay email carrying only an order number, with no items and no tracking. A quote-request confirmation that says only 'Thanks, we'll be in touch' commits the identical error.

Evidence: NN/g, 'Transactional Notifications: Their Characteristics and When to Use Them', Feifei Liu, 6 Nov 2022 (2022 — flagged as just outside the 2023+ window): character limits 50–240 for push; required components listed; SMS suits 'crucial information users may reference later'; positive example Amazon's refund SMS stating purpose, amount, item and destination account; negative example Zara's delay email with only an order number. https://www.nngroup.com/articles/transactional-notifications/

Source: https://www.nngroup.com/articles/transactional-notifications/

### No sourced figure found for several claims commonly asserted in travel CRO: (a) the average package-travel consideration window in days; (b) the conversion cost of each additional form field expressed as a percentage; (c) whether charm pricing (9-endings) still works at premium price points; (d) phone-vs-email as primary contact field for a Gulf audience; (e) sticky mobile CTA uplift percentages.

Confidence: inferred · type: constraint

Why it matters here: The master doc gains credibility by naming what is NOT known and marking those as instrumented open questions rather than smuggling in invented numbers. Each of these becomes a measurement task for the first 90 days rather than a design assertion.

Evidence: Attempted and failed to source: Expedia Group Media Solutions research (https://advertising.expedia.com/resources/ returned a TLS certificate mismatch); Think with Google travel research (redirects to https://business.google.com/us/think/ which failed to load article results); Sojern report library listed no path-to-purchase or booking-window report with public figures (https://www.sojern.com/reports/); Anderson & Simester's $9 price-endings paper could not be retrieved. Related evidence that DOES exist and bounds the questions: NN/g sticky-header guidance is qualitative, giving tap targets of at least 1cm × 1cm, ~16pt text and 300–400ms animations but no conversion figures (Page Laubheimer, 4 Apr 2021 — https://www.nngroup.com/articles/sticky-headers/, flagged 2021).

Source: https://www.nngroup.com/articles/sticky-headers/

## Design implications

- DECLARE THE BUSINESS MODEL IN THE DOC BEFORE ANY PAGE IS DESIGNED. Choose one of three, and let it dictate the whole IA: (A) Enquiry-first — primary macro conversion is a qualified quote request, no online payment, like Trafalgar's 'Get a Quote' homepage; (B) Deposit-first — a small fixed hold (e.g. 500 SAR) taken online, balance handled by a human, matching Intrepid's 'Lock in your adventure with a deposit'; (C) Full online booking. Recommendation for a new, unknown Middle East brand: (B) with (A) always available beside it. Model (C) demands trust the brand has not yet earned, and Baymard's abandonment data names 'trust concerns with credit card information' at 19% and 'required account creation' at 18%.
- EVERY PACKAGE PAGE GETS EXACTLY ONE PRIMARY ACTION, WITH A SECOND, LOWER-COMMITMENT ESCAPE HATCH. Primary: 'Hold this trip for 500 SAR' (or 'Get a quote for your dates'). Secondary, visually quieter: 'Ask a question on WhatsApp'. Nothing else gets button styling on that page. Sticky mobile bar carries the primary action plus the from-price and the per-person qualifier, never more than two controls, following NN/g's sticky-header rules — minimum 1cm × 1cm tap targets, ~16pt text, opaque background, 300–400ms animation, minimum vertical height.
- BAN 'GET STARTED', 'LEARN MORE', 'BOOK NOW', 'EXPLORE', 'DISCOVER' AND 'ENQUIRE' AS STANDALONE LABELS. Apply NN/g's 3-step formula (actionable verb + expectation + value) and the 4 Ss. Concrete rewrites: 'Book Now' → 'Hold these dates — 500 SAR, refundable for 14 days'. 'Enquire' → 'Get your price for 4 travellers'. 'Learn More' → 'See the day-by-day itinerary'. 'Contact Us' → 'Message Layla on WhatsApp — she replies in about an hour'. 'Submit' → 'Send my trip request'. Every button must survive the Combadi test: if the label says BOOK, clicking it must book, not open a contact form.
- SET A HARD FIELD BUDGET AND WRITE IT INTO THE DOC: the enquiry form gets a maximum of 5 visible fields at first paint — destination/package (pre-filled from context), travel month or date range, number of travellers, name, phone. Email becomes optional and appears only after the first successful step. Budget for the deposit flow: 8 fields maximum, Baymard's stated ideal. Use a single 'Full name' field rather than first/last (89% of sites get this wrong and 42% of users type the full name into the first box anyway). No 'Address Line 2'. No account creation before the confirmation step (84% of sites fail this).
- STRUCTURE THE QUOTE BUILDER AS ONE QUESTION PER SCREEN, GOV.UK-STYLE, with the question as the page heading, a back link on every step, and the forward button labelled 'Continue' — not 'Next' — left-aligned. Do not add a progress stepper by default; GOV.UK's Carer's Allowance team removed a 12-step indicator with no negative effect on completion. Before adding any field to any step, run the GOV.UK question protocol: state why the answer is needed, how it will be used, who must provide it, and how it will be stored (the Supabase RLS policy is the answer to that last one, and should be written at the same time).
- PRE-FILL EVERY DEFAULT — this is the cheapest anchoring win available and the one with a real number behind it (Oxfam's suggested values raised form completions by 23%). Traveller count defaults to 2 adults with a one-tap 'Family (2+2)' chip. Date field opens on a realistic month, not today. Budget selector, if present, defaults to the middle tier. Never present an empty field where a sensible default exists.
- PRICE PRESENTATION RULES, WRITTEN AS NON-NEGOTIABLES: (1) Show the per-person figure AND the computed party total together — 'From 4,900 SAR per person · 19,600 SAR for 2 adults + 2 children'. Baymard names 'unable to calculate total cost upfront' as a 12% abandonment cause and 'extra costs too high' as 40%. (2) The headline price includes every mandatory fee, tax and charge; anything excluded is named on the same line, not on a later step — this is where UK CMA price-transparency guidance (CMA209, Nov 2025) is heading and it is a trust asset regardless of jurisdiction. (3) Strikethrough only against a price genuinely charged, with the period stated ('4,900 SAR — was 5,600 SAR until 12 Aug'). A fake 'was' price is the fastest way to lose a market that screenshots and compares.
- BUILD THREE PACKAGE TIERS PER DESTINATION, NOT ONE, AND MAKE THE MIDDLE ONE THE TARGET. Good/Better/Best with genuinely different inclusions (hotel class, private vs shared transfers, guided days, flexibility window), the middle tier visually elevated and labelled by what it is rather than by hype — 'Most chosen by families' beats 'Most popular'. The high tier's job is partly to anchor. Do not fabricate a decoy tier nobody can buy; keep all three real and bookable, or the pattern becomes a dark pattern and, per NN/g, costs long-term trust for 'a few conversions here and there'.
- FRAME COMMITMENT AT THE SMALLEST HONEST NUMBER, AND SAY WHAT IT BUYS. 'From 500 SAR to hold your seats — refundable for 14 days, balance due 45 days before departure.' Both operators I examined lead with this device (Trafalgar: 'Secure your place with a low deposit, with no booking or change fees and the freedom to change your mind up to 90 days before travel'). Pair the deposit anchor with an instalment line stated in real mechanics, matching what Tabby actually offers — '4 payments of 1,225 SAR. No interest, no fees.' — never a vague 'flexible payment options'.
- MAKE PHONE THE PRIMARY CONTACT FIELD AND WHATSAPP A FIRST-CLASS CONVERSION SURFACE, not a floating green bubble. Justification: KSA has 48.7M mobile connections at 140% of population, UAE 202%, and the regional incumbent Almosafer lists WhatsApp alongside app, web and branches with 24/7 Arabic and English support. Implementation: country-code selector defaulting by geo-IP with mada/GCC codes at the top; numeric input mode; deep-link the WhatsApp CTA with a prefilled, editable message naming the specific package and dates ('Hi, I'd like a quote for Cappadocia, 5 nights, 2 adults + 2 kids, October'). Track it as a distinct GA4 generate_lead with a lead_source parameter. Treat this as a hypothesis to instrument, not a proven fact — no sourced study was found comparing phone vs email as primary field for a Gulf audience.
- INSTRUMENT THE GA4 LEAD LIFECYCLE, NOT JUST PAGEVIEWS. Spine: view_item (package viewed) → select_item (tier chosen) → a custom quote_builder_step with a step index → generate_lead (enquiry submitted, with currency, value = estimated package value, and lead_source) → qualify_lead → working_lead → close_convert_lead (booking confirmed, reconciled to purchase with transaction_id). Add secondary-action micro conversions per NN/g's taxonomy: save_itinerary, download_itinerary_pdf, whatsapp_click, price_calculator_used, share_click. Store the same events in Supabase alongside GA4 so the funnel survives ad-blockers and consent refusals, and so lead value can be joined to actual bookings.
- WRITE THE MEASUREMENT RULES INTO THE DOC SO FUTURE SESSIONS CANNOT A/B TEST NOISE. Rule: no A/B test on any page receiving fewer than 13,000 users per variant in the intended window (NN/g's worked figure for a 3% baseline and 20% MDE at 95%), and no test shorter than 1–2 weeks. Below that threshold the permitted methods are: apply the research-backed default; run 5-participant moderated sessions with real Gulf travellers; ship sequentially and watch a 90-day trend with a pre-declared guardrail metric. Explicitly forbid stopping a test on an early winner — NN/g notes only about one in seven tests wins, which means most 'early winners' are noise.
- ADOPT NN/G'S ERROR-MESSAGE RUBRIC AS A BUILD GATE: every error string must score at least 3.0 on the 12 guidelines, use at least 3 redundant indicators (label + icon + border/shading, never colour alone), read at 7th–8th grade level, preserve the user's input, and offer a fix. Validate on blur or at the correct character length, never on focus; clear the error at the keystroke level as soon as it is corrected. This satisfies WCAG 2.2 SC 3.3.3 (Level AA) at the same time. Concrete rewrites: 'Invalid phone number' → 'That number is missing a digit — Saudi mobiles are 9 digits after +966.' / 'Error: dates required' → 'Pick a month and we'll show you what's available — exact dates can come later.' / 'Invalid email' → 'Looks like the @ is missing. Did you mean layla@gmail.com?'
- BAN THE TRAVEL-CLICHE VOCABULARY LIST OUTRIGHT, because it doubles as the AI-writing tell list: nestled, breathtaking, vibrant, rich heritage, hidden gem, natural beauty, stands as, boasts, serves as, unforgettable, journey of a lifetime, curated, immerse yourself, delve, tapestry, testament, showcasing, highlighting. Also ban the negative-parallelism template ('not just a holiday, but an experience') and the participial commentary clause ('...highlighting the region's rich history'). Concrete rewrites — BEFORE: 'Nestled in the breathtaking Cappadocian valleys, this unforgettable journey immerses you in a rich tapestry of culture.' AFTER: 'Five nights in Göreme. You wake at 4:30am once, for the balloons. The rest is slow — cave hotel, two guided days, three days you plan yourself.' BEFORE: 'Our curated packages are meticulously designed to showcase the very best of Georgia.' AFTER: 'We run this trip nine times a year. Same driver, same three hotels, because they have not let us down yet.'
- MAKE THE ARABIC SITE A SEPARATE PIECE OF WRITING, NOT A TRANSLATION. Transcreation in practice for this project: rewrite headlines from the Arabic proposition outward rather than translating the English one; choose register deliberately (Modern Standard Arabic for formal trust signals such as terms, cancellation policy and confirmations; lighter Gulf-inflected phrasing for CTAs and social proof) and record the choice in the doc; localise proof points, not just words (family suitability, women-only or family sections, halal dining, prayer times, visa handling for the specific passport, school-holiday and Eid windows); localise formats per W3C's definition — SAR/AED with correct placement, Hijri dates alongside Gregorian where it aids decisions, GCC name ordering, GCC phone formats. Never let an Arabic CTA be a literal calque of the English button; write it as a native imperative. Budget for a native Gulf Arabic copywriter as a line item, not an afterthought — 40% of consumers say they will never buy from a site in another language (CSA, 2020).
- WRITE CONFIRMATION COPY AS A PROMISE WITH A DEADLINE ATTACHED, since in an enquiry model it is the moment trust is won or lost. Required elements per NN/g's transactional-notification guidance: what was requested (package, dates, party size restated), who will reply and by when ('Layla replies to trip requests within 2 working hours, 9am–9pm Riyadh time'), what happens next, a reference number, and a channel to reach a human immediately. Send the same content to WhatsApp and email, with SMS reserved for anything they will need to retrieve later. BEFORE: 'Thank you! Your request has been submitted. We will get back to you shortly.' AFTER: 'Got it — Cappadocia, 12–17 October, 2 adults + 2 children. Layla is putting your price together and will message you on WhatsApp before 6pm today. Reference TR-4471. Need it sooner? Reply to this message.'
- DESIGN EMPTY AND ZERO-RESULT STATES AS RECOVERY MOMENTS, NOT DEAD ENDS. No sourced NN/g guidance on empty states was found (their UX Writing Study Guide has no dedicated empty-state content), so treat this as principled synthesis: every zero-result state must name the constraint that caused it, offer the single nearest relaxation as a one-tap action, and offer the human. BEFORE: 'No packages found.' AFTER: 'Nothing in Georgia under 4,000 SAR in August — August is peak. Two options: the same trip in late September from 3,450 SAR, or tell Layla your budget and she'll build something.' Same treatment for saved-trips, no-reviews-yet, and search-with-typo states (Baymard: 28% of sites still fail to suggest corrections for misspelled search terms).
- SEPARATE THE THREE MICROCOPY REGISTERS IN THE DESIGN SYSTEM SO THEY CANNOT BLEED, following NN/g's 3 I's: Influence copy (headlines, package value props) may carry brand personality; Inform copy (what is included, cancellation terms, visa requirements) is plain and neutral; Interact copy (button labels, field labels, validation, placeholders) is functional and never cute. Enforce it as token-level classes in the codebase (e.g. text-marketing / text-informational / text-interactive) so a future session physically cannot write a jokey error message. Justification: trustworthiness explains 52% of desirability variance while friendliness adds only 8%, and playful tone tested 0.3 points LESS trustworthy with no lift in recommendation.
- APPLY THE 3 C's TO EVERY HELPER STRING — Clarity, Concision, Character — and lead with the barrier before the solution the way Owala's 'Out of stock - Notify Me' does. Travel equivalents: 'Sold out for October — join the November list', 'Visa needed for Saudi passports — we handle it, 3 days', 'Flights not included — we'll quote them with your package'. Each one names the friction first, then removes it, in under ten words.
- PRIORITISE THE BUILD BACKLOG BY (FREQUENCY OF ENCOUNTER × SEVERITY OF FRICTION), which is Baymard's own scoring model, and set the expected ceiling for the whole UX programme at 15% / 25% / 35% revenue lift (low/mid/high) with compounding, not additive, gains. Put those three numbers in the doc so no future session promises a doubling.

## Anti-patterns to refuse

- THE FAKE BOOK BUTTON. Every generic travel template puts 'Book Now' on every package card and then opens a contact form. This is the exact failure NN/g documented on a travel site — Combadi's 'MORE INFO & BOOK' button led to a contact-form popup rather than booking options — and it breaks the link promise on the first click. It is worse than an honest 'Get a quote' because it destroys trust at the precise moment the visitor was leaning in. If the site cannot take money at that button, the button must not say Book.
- THE CLICHE PARAGRAPH THAT DOUBLES AS AN AI SIGNATURE. 'Nestled in the breathtaking valleys, this vibrant destination boasts a rich cultural heritage, offering an unforgettable journey.' Every competitor writes this, and it is simultaneously indistinguishable AND a textbook machine-writing tell per WP:AISIGNS (promotional buzzspeak, copula avoidance with 'boasts', participial commentary). Copying it guarantees both failure modes at once: templated and robotic. A site whose destination copy names specific hotels, specific hours, and specific trade-offs cannot be confused with anyone.
- THE 12-FIELD ENQUIRY FORM AS A QUALIFICATION GATE. Generic operator sites ask for name, surname, email, confirm email, phone, country, destination, departure city, dates, budget, adults, children, hotel preference and 'additional comments' — on one screen — on the theory that it filters serious buyers. It filters buyers, full stop. Industry checkouts already average 11.3 fields against an ideal of 8, and a lead form has none of a checkout's motivational advantage. Qualification belongs in the human follow-up conversation, not in the gate.
- FALSE URGENCY AND FABRICATED SCARCITY. '3 people are viewing this', a countdown that resets on reload, 'was' prices never actually charged, permanent 'Limited availability. Selling fast' banners. Competitors run these openly. They are being regulated against (UK CMA price-transparency and unfair-practices guidance, Nov 2025 / Jan 2026), NN/g classes artificial scarcity as a dark pattern that trades long-term satisfaction for 'a few conversions here and there', and a screenshot-driven audience catches them fast. On a high-ticket purchase from an unknown brand, one caught lie ends the sale permanently.
- PER-PERSON PRICE WITH NO PARTY TOTAL, AND MANDATORY FEES REVEALED LATE. The template default is a big 'From 2,999 SAR*' with an asterisk, and taxes, transfers, visa fees and single supplements surfacing three screens later. Baymard names 'extra costs too high' as the #1 non-browsing abandonment cause at 40% and 'unable to calculate total cost upfront' at 12%. For a family of four in the Gulf, per-person pricing without the total is functionally a hidden 4x.
- GENERIC ERROR AND VALIDATION COPY. 'Invalid input.' 'An error occurred.' 'Please fill in all required fields.' Red text and nothing else. 93% of ecommerce sites fail to write adaptive, context-specific validation messages, and 31% have no inline validation at all — which means the competitive bar here is on the floor. Copying the default is copying a documented near-universal failure.
- THE FLOATING WHATSAPP BUBBLE AS THE ENTIRE MESSAGING STRATEGY. Every regional template bolts a green circle to the bottom-right corner that opens a blank chat. The visitor then has to retype what they were looking at. WhatsApp should be a designed conversion surface with package-and-date context deep-linked into the prefilled message, a named human, a stated response time, and its own tracked event — not a widget.
- THE STOCK HERO WITH A SEARCH BAR NOBODY NEEDS. Generic travel sites open with a full-bleed beach photo and a flight-style search form (from / to / dates / passengers) borrowed from metasearch. This site is not metasearch — the audience is choosing between curated packages, not querying inventory. Importing the OTA search widget imports the OTA's information architecture and the OTA's commodity positioning along with it.
- TRANSLATING THE ENGLISH SITE INTO ARABIC WORD FOR WORD. The default outcome is stiff, over-formal Arabic marketing copy that reads as machine output, with English-derived button phrasing calqued directly, Latin-ordered date formats, and proof points aimed at a Western traveller. W3C is explicit that localisation covers formats, symbols, imagery, name and address ordering and even business-process logic — not text substitution. A mirrored Arabic page is a visible tell that the Arabic customer is the afterthought.
- QUOTING A BORROWED CONVERSION BENCHMARK AS A TARGET. 'Travel sites convert at 2.3%, so we should hit that.' No credible public benchmark for travel-package conversion exists — the vendors that sell benchmarking either gate it, anonymise it, or ship pages rendering literal '0%' placeholders. Setting a target from a borrowed number produces bad decisions in both directions: false comfort and false panic.
- AI-WRITTEN COPY SHIPPED WITHOUT A HUMANISING PASS. Given the operator's own workflow, the realistic risk is not that competitors sound generic but that this site's own first draft does. Every string that ships — landing copy, package descriptions, UI labels, confirmations, error messages — needs the WP:AISIGNS checklist run against it before it enters the codebase, and the ban list belongs in the design system, not in someone's memory.

## Differentiation moves

- THE HONEST PRICE CARD. Instead of 'From 2,999 SAR*', ship a card that shows the party total, an itemised what's-in / what's-out list, and — the unusual part — an explicit 'What we don't include and roughly what it costs' line with real numbers (visa 460 SAR, airport transfer 120 SAR, lunches ~90 SAR/day). Nobody in this category volunteers the excluded costs. It directly attacks the 40% abandonment driver, it is screenshot-worthy precisely because it is unusual, and it is impossible for a competitor running on hidden margins to copy.
- NAMED HUMANS WITH REAL RESPONSE TIMES. Replace 'Contact Us' with a specific person, their photo, their languages, and a live-ish response commitment ('Layla — Arabic, English. Usually replies in under an hour, 9am–9pm Riyadh'). Given that trustworthiness explains 52% of brand desirability variance for a five-figure purchase, and that the enquiry — not the payment — is the conversion, the person IS the conversion mechanism. Generic sites hide behind a form.
- THE 60-SECOND QUOTE, ONE QUESTION PER SCREEN. Build the quote builder as a GOV.UK-style single-question flow with pre-filled defaults, no progress stepper, and a live-updating price estimate that changes as answers land — ending in a real number, not 'we'll be in touch'. Most operators either dump a 12-field form or refuse to show a price at all. Giving a genuine indicative price before asking for contact details inverts the category's default and earns the phone number instead of extracting it.
- SHAREABLE ITINERARY OBJECTS. Make every itinerary a proper page with a stable URL, an OG image auto-generated with the destination, dates, party size and party total, and a one-tap 'Send to my husband / to the family group' WhatsApp share. In a market where trips are decided in family group chats and Snapchat/YouTube reach 73%/79% of the Saudi population, the shared itinerary is the organic-reach engine — the site spreads through the decision process itself rather than through ads.
- THE TRADE-OFF SECTION. Add a standing 'Who this trip is not for' block to every package. 'Not for you if you want a 5-star all-inclusive — this one has two long driving days and a family-run guesthouse on night three.' This is the single most anti-template move available: it is unquotable by competitors (they cannot afford the honesty), it converts by pre-empting the objection, and it reads as unmistakably human — the opposite of AI-generated promotional prose.
- INSTALMENT MATHS RENDERED LIVE, IN THE CARD. Show '4 × 1,225 SAR, interest-free' computed from the actual party total, next to the deposit line, on the package card itself rather than as a logo strip at checkout. Tabby's real product is 4 interest-free payments or up to 12 months; almost nobody surfaces the arithmetic at the point of desire, only at the point of payment.
- AN ARABIC SITE THAT IS VISIBLY NOT A TRANSLATION. Different hero image logic, different proof points (Eid and school-holiday windows, family sections, prayer facilities, visa handling by passport), Hijri dates alongside Gregorian, and headlines written natively rather than mirrored. When a bilingual visitor toggles languages and finds the Arabic side is not a shadow of the English one, that is a trust event no competitor in the category currently produces.
- A PUBLIC 'HOW WE PRICE' PAGE. One page explaining the margin structure in plain language: what the agency earns, why a package can be cheaper than booking the parts, when it is not, and when to book direct instead. Extremely rare, highly linkable, and it converts by making every other price on the site credible. It also gives Sarra's Instagram audience something to screenshot that is not a discount.
- POST-ENQUIRY TRANSPARENCY. After a request is submitted, show a real status page (Supabase-backed) rather than only an email: 'Received 14:22 → Layla is checking October availability → quote expected before 18:00'. The category norm is a black box between enquiry and reply, which is where high-consideration leads go cold. A visible pipeline is a conversion mechanism disguised as a courtesy.
- EMPTY STATES THAT SELL. Every zero-result and out-of-stock state names the constraint, offers the nearest real alternative with a price, and offers the human — 'Nothing in Georgia under 4,000 SAR in August. Late September starts at 3,450. Or tell Layla the budget and she'll build it.' Competitors ship 'No results found.' The failure state is the cheapest place to look unmistakably better than everyone else.

## Open questions

- What is the actual consideration window for a Gulf family booking a package — days from first visit to enquiry, and enquiry to payment? No sourced figure was found; Expedia Group's research library was unreachable (TLS certificate mismatch) and Sojern's and Think with Google's public pages carried no such figure. Instrument first_visit → generate_lead → close_convert_lead in GA4 and Supabase from day one, and treat the first 90 days as the source of truth.
- Phone number or email as the primary contact field for this audience? No sourced comparative study found. The mobile-saturation data (KSA 140%, UAE 202% mobile connections per capita) and Almosafer's WhatsApp-forward support model argue for phone, but this should be a declared hypothesis with a measurable fallback, not an assumption baked into the schema.
- Does charm pricing (9-endings) still work at a 15,000 SAR price point, and does it read differently in SAR/AED where round thousands are culturally salient? No sourced figure found — the Anderson & Simester price-endings paper could not be retrieved. Provisional stance: use round, clean numbers at premium tiers and reserve charm pricing for add-ons, then revisit with sourced evidence.
- What is the real split between WhatsApp enquiry, form enquiry and phone call for this audience, and do they convert to booking at different rates? This determines how much design weight each channel earns. It is answerable within 90 days by tagging lead_source on every generate_lead event.
- Does showing an indicative price before contact capture increase total bookings or just increase unqualified enquiries? This is the highest-stakes untested decision in the whole model and it is too consequential to guess. It is also one of the few questions where a sequential 90-day comparison (not an A/B test) is genuinely informative, given the traffic constraint.
- Which specific Arabic register converts better for CTAs — MSA imperative versus Gulf-inflected phrasing — and does it differ between Saudi and UAE traffic? No sourced study found. Needs a native Gulf Arabic copywriter and qualitative sessions rather than a test.
- What do the substantive UK CMA CMA209 price-transparency rules actually require regarding reference/strikethrough prices and urgency claims? Only the GOV.UK index pages were read; the rules sit in a 58-page PDF. Worth reading in full before shipping any 'was/now' pricing, even though the primary market is the Gulf.
- What is the site's own baseline enquiry rate, and what counts as good for it? Unknowable in advance given that no travel-package benchmark exists publicly. The doc should mandate a 90-day baselining period with no targets, then set targets against the site's own measured floor.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### FALSE — Claim 1 headline: 'No credible, publicly published conversion-rate benchmark exists for travel-package / tour-operator websites.'

The researcher checked three properties and generalised to a universal negative. Searching for the benchmark rather than for its absence surfaces several within two queries. Unbounce travel figures visible without a form: https://unbounce.com/conversion-benchmark-report/travel-hospitality-conversion-rate/ . Ruler Analytics 2026 by-industry: https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/ . This matters because the doc uses the absence of benchmarks to justify governing by principle alone.

Corrected: No *tour-operator-specific* conversion benchmark was found, but several free travel-sector benchmarks do exist. Unbounce publishes travel & hospitality landing-page conversion medians without a form (4.8% median overall; accommodations 3.7%; transportation & travel services 14.8%; desktop 18.1% vs mobile 16.4%; drawn from 57M+ landing-page conversions). Ruler Analytics publishes travel at 2.8% in its 2026 cross-industry study. Fullstory publishes a 2025 Travel & Hospitality Benchmark Report on 14B+ sessions, and Invoca a 2025 travel call-conversion benchmark. These are landing-page or lead-vertical measures, not package-purchase rates, so they are the wrong unit for this site — but the honest statement is 'no benchmark measures the right thing', not 'no benchmark exists'.

### CONFIRMED — Claim 1 sub-evidence: Contentsquare gates industry cuts; Dynamic Yield renders literal placeholder values; Triptease withholds absolute rates.

Verified directly. Contentsquare (https://go.contentsquare.com/en/digital-experience-benchmark/) publishes 99 billion sessions, 6,500+ sites, 9 industries, Q4 2024–Q4 2025, and gates industry cuts behind a form; no Travel & Hospitality rate is shown. Dynamic Yield (https://marketing.dynamicyield.com/benchmarks/conversion-rate/) genuinely renders 'The average eCommerce conversion rate globally is 0%' and 'In August, the conversion rate from was the highest, at %' — a broken template. One detail does not check out: the claim says Contentsquare 'publishes engagement −10% YoY'; the public page I fetched shows −5.1% for change in share of visits including a conversion event, and +1% revenue YoY. The −10% engagement figure is unverified.

### PARTIALLY_TRUE — Claim 2: nearest defensible reference points are 1.4% average site-wide conversion (mobile 1.2%, desktop 1.9%) across 2,800 stores, and a 2.9% average macro-conversion rate cited by NN/g.

Littledata page states 'the average conversion rate for Shopify was 1.4%' — https://www.littledata.io/average/conversion-rate . NN/g Micro-Conversions article states 'the average macro-conversion rate is only 2.9%' with a source citation to Ruler Analytics — https://www.nngroup.com/articles/micro-conversions/ . The doc is internally inconsistent: it rejects vendor benchmarks in claim 1 and accepts one in claim 2 purely because NN/g repeated it.

Corrected: Littledata's 1.4% average (top 10% 4.7%; mobile 1.2%; desktop 1.9%; 2,800 sites; 2023 data, not since updated) is specifically a Shopify-store benchmark, not general ecommerce. NN/g's 2.9% macro-conversion figure is not NN/g research — NN/g cites Ruler Analytics, a vendor. It is the same class of number the doc elsewhere warns Sarra against quoting.

### CONFIRMED — Claim 3: NN/g distinguishes macro conversions from process-milestone and secondary-action micro conversions.

Verified verbatim at https://www.nngroup.com/articles/micro-conversions/ (Tim Neusesser, 19 Jul 2024). Macro = 'A desired user action that directly contributes to the primary goals of your business'; micro = 'Actions that are indirectly related to KPIs but that tend to happen more frequently'. Both sub-types named: process-milestone = 'Conversions that represent linear movement toward a macro conversion'; secondary-action = 'Micro conversions that do not directly lead up to a macro conversion but may predict future macro conversions'.

### CONFIRMED — Claim 4: NN/g A/B Testing 101 gives a 3% baseline / 20% MDE / 95% significance → ~13,000 users, lists low-traffic pages as unsuitable, recommends 1-2 weeks minimum, and states only one in seven A/B tests wins.

All five elements verified verbatim at https://www.nngroup.com/articles/ab-testing/ (Tim Neusesser, 30 Aug 2024): 'your required sample size is 13,000 users'; 'A/B testing is not suited for: Low-traffic pages'; 'run your A/B test for at least 1-2 weeks'; 'Only one in every seven A/B tests is a winning test'. This is the strongest-sourced claim in the set and the traffic-wall argument stands.

### CONFIRMED — Claim 5: Baymard revenue-lift caps of 15/25/35%, compounding not additive, 'complete UX overhauls won't double conversion rates overnight.'

Verified at https://baymard.com/blog/hidden-cost-bad-ux-revenue-calculator (19 Aug 2026): 15% conservative / 25% baseline / 35% aggressive, '200,000+ hours of UX testing' across '40+ ecommerce industries', and 'Fixing two separate UX issues on a website does not produce simple additive results' with diminishing returns. The researcher's version of the quote is a paraphrase presented inside quotation marks — fix before it ships.

Corrected: Same substance, but the quoted sentence should read as Baymard actually wrote it: 'Even a complete overhaul of every UX issue will not double a site's conversion rate overnight.'

### PARTIALLY_TRUE — Claim 6: 'Premium package operators run enquiry-first, not booking-first.' Trafalgar shows no direct-purchase path; Intrepid runs booking-first.

Trafalgar's own FAQ confirms direct online booking and per-person pricing: https://www.trafalgar.com/en-us/frequently-asked-questions/before-you-book . Homepage CTAs verified as claimed (Get a Quote, Request a Brochure, See Deals, 866 513 1995, 'Secure your place with a low deposit... up to 90 days before travel', 'Limited availability. Selling fast'). Intrepid verified for 'From USD $3,930' pricing and 'Lock in your adventure with a deposit on selected trips' — but the claimed 'Book now, pay later' string was not visible, and Intrepid DOES offer 'Get in touch' and 'Live chat' on the homepage, contradicting 'no enquiry... option'. This is the doc's single most load-bearing structural claim and it is drawn from two homepages.

Corrected: Trafalgar's HOMEPAGE leads with 'Get a Quote', 'Request a Brochure' and a phone number rather than prices — but Trafalgar is not enquiry-first as a business. It sells online: customers select a departure and complete a reservation on trafalgar.com, prices are shown per person twin-share during booking, and deposits are $200 or $350 depending on trip level. The correct generalisation is that premium operators run a low-price-salience HOMEPAGE with assisted-selling CTAs on top of a working online booking funnel — not that they replace purchase with enquiry.

### CONFIRMED — Claim 7: Almosafer's conversion stack includes Tabby/Tamara BNPL, mada, STC Pay, Apple Pay, 'Pay at the Property', loyalty points, WhatsApp, and 24/7 Arabic & English support.

Verified at https://www.almosafer.com/en (Aug 2026). Payment methods listed: Cards, Mada, STC Pay, Apple Pay, Pay at the Property, Tabby, Tamara, loyalty points. Installment wording: 'Split your booking into interest-free installments and pay in a way that suits your budget'. Channels: 'App, web, WhatsApp & 30+ branches'. Support: 'Always-On Support - Here 24/7 in Arabic & English'. Every element checks out.

### PARTIALLY_TRUE — Claim 8: Tabby's product is 4 interest-free payments or up to 12 monthly payments, Tabby Card up to 8 months, 'regulated by the UAE Central Bank'.

Product strings verified at https://tabby.ai/en-SA ('Split it in 4 interest-free payments with no fees or in up to 12 monthly payments'; Tabby Card 'Payment plans up to 8 months'; 'Tabby Payments LLC, which is licensed by the Central Bank of the UAE'). SAMA licensing confirmed: https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1116.aspx and https://tamara.co/en-sa/blog-post/tamara-secures-saudi-central-bank-finance-license . The researcher quoted a footer without checking jurisdiction.

Corrected: The product wording is exact, but the regulator is wrong for the market this site serves. The 'Regulated by the UAE Central Bank' line is UAE-entity boilerplate that appears on Tabby's Saudi-localised page. BNPL in Saudi Arabia is regulated by SAMA (the Saudi Central Bank): SAMA licensed Tabby for BNPL activity in November 2025 and Tabby holds SAMA consumer-finance and SME-finance licences; Tamara received a SAMA consumer finance licence on 3 March 2025. Any compliance or disclosure copy for a KSA-facing travel site answers to SAMA, not the UAE Central Bank.

### PARTIALLY_TRUE — Claim 9: 70.22% average cart abandonment across 50 studies 2006-2025; top causes extra costs 40%, card trust 19%, forced account 18%, long checkout 17%, can't calculate total 12%.

Verified at https://baymard.com/lists/cart-abandonment-rate (last updated 22 Sep 2025, 50 studies, 2006-2025, 70.22%). Site errors/crashes at 17% is omitted from the doc entirely and is arguably the most actionable item for a new build. 'Delivery too slow' has no travel analogue and can be dropped — but say so rather than quietly renumbering the list.

Corrected: All figures are exact, but 'the top causes' as listed silently drops the second- and equal-fourth-ranked items. The full ranking excluding 'just browsing' (42%) is: extra costs 40%, delivery too slow 20%, card trust 19%, forced account 18%, long checkout 17%, site errors/crashes 17%, returns policy 13%, couldn't calculate total 12%, card declined 10%, too few payment methods 9%.

### CONFIRMED — Claim 10: Checkouts average 11.3 form fields against an ideal of 8; fields matter more than steps; 42%/89% name field, 30%/75% Address Line 2, 84% fail to delay account creation.

Every figure verified verbatim at https://baymard.com/blog/checkout-flow-average-form-fields (26 Jun 2024): '11.3 form fields'; 'most sites need only 8 form fields in total'; '5.1 steps'; 'the number of form fields in a checkout impacts overall usability far more than the number of steps'; '42% of participants typed their full name in the First Name field at least once'; '89% of sites... have more than one name field'; '30% of participants came to a stop when arriving at Address Line 2'; 75% don't hide it; 84% fail to delay account creation.

### CONFIRMED — Claim 11: GOV.UK one question per page; label the forward button 'Continue', not 'Next', left-aligned; Carer's Allowance removed a 12-step progress indicator with no negative effect.

Verified at https://design-system.service.gov.uk/patterns/question-pages/ : 'Asking just one question per question page helps users...'; button 'Continue, not "Next"', 'aligned to the left so users do not miss it'; Carer's Allowance 'removed a 12-step progress indicator without any negative effects'. The Design System also adds guidance the doc omits: test without a progress indicator first and fix question ordering before adding one, and if you use one keep it simple ('Question 3 of 9').

### CONFIRMED — Claim 12: NN/g 4 Ss (Specific, Sincere, Substantial, Succinct) with no maximum length; Combadi's 'MORE INFO & BOOK' opened a contact-form popup.

Verified at https://www.nngroup.com/articles/better-link-labels/ (Kate Moran, 24 Mar 2019). Combadi example present: the button led to 'a popup with a contact form', with the tested user reacting 'Oh. Ugh. I don't like that. How do I get out of this?'. Length guidance verified: 'There is no maximum word count for links. They can be as long as they need to be to achieve those other three priorities — but no longer than that.' Note the irony worth flagging in the doc: the Combadi failure is a booking button that opened an enquiry form — precisely the pattern this dimension is recommending, so the lesson is about label honesty, not against enquiry CTAs.

### CONFIRMED — Claim 13: NN/g 2026 CTA formula (actionable verb, establish expectations, communicate value); 3 C's of microcopy (Clarity, Concision, Character); 3 I's (Inform, Influence, Interact).

All three sources exist and the dates are right, which is notable given how often 2026-dated citations are fabricated. https://www.nngroup.com/videos/3-step-ctas-formula-for-conversion/ (Taylor Dykes, 3 Aug 2026): 'Start with an actionable verb, establish expectations, and communicate the action's value.' https://www.nngroup.com/articles/3-cs-microcopy/ (Taylor Dykes, 20 Mar 2026), Owala 'Out of stock - notify me' example present. https://www.nngroup.com/articles/3-is-of-microcopy/ — full title 'The 3 I's of Microcopy: Inform, Influence, and Interact', by Dykes, Moran and Kaley, 1 Aug 2025.

### CONFIRMED — Claim 14: Only 7% of sites use adaptive validation error messages (93% don't); 31% have no inline validation and 4% implement it incorrectly.

Verified at https://baymard.com/blog/mobile-ux-ecommerce (published 23 May 2024, updated 14 Jul 2026): practice #5 'Use Adaptive Messages for Validation Errors' at '93% Don't'. Also verified the two supporting figures: address validator/lookup '54% Don't' (i.e. 46% comply, as claimed) and navigation scope '94% of Mobile Sites Don't' (6% comply, as claimed). One framing caution: 'single most-neglected microcopy opportunity' is the researcher's inference — highlighting current scope in mobile nav is worse at 94% non-compliance, so 7% is the second-lowest on that list, not the lowest.

### CONFIRMED — Claim 15: WCAG 2.2 SC 3.3.3 Error Suggestion is Level AA with the quoted normative text; NN/g rubric requires at least 3 redundant error indicators and 7th-8th grade reading level.

W3C text verified verbatim and level confirmed as AA at https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html , including the month-field example ('Choose one of: January, February, March...' / 'Do you mean "December"?'). Worth adding to the doc: SC 3.3.3 only bites when an error is automatically detected AND a correction is known — it is not a blanket requirement to guess at every bad input, so the 'legal floor' framing should not be overstated.

### CONFIRMED — Claim 16: Trustworthiness explains 52% of the variability in brand desirability, friendliness adds 8%; playful tone rated 0.3 points less trustworthy on a 5-point scale.

Verified at https://www.nngroup.com/articles/tone-voice-users/ (Kate Moran, published 7 Aug 2016, last reviewed 30 Jan 2024): '52% of the variability in the desirability scores is explained by trustworthiness'; friendliness added 8%; the playful insurance sample rated 0.3 points less trustworthy on a 5-point scale. The dimension summary leans on this number as 'the whole tone strategy' for a Gulf audience — that is a long extrapolation from four US financial/health verticals in 2016.

Corrected: Same numbers, but flag the transfer risk: the study tested 100 US participants across auto insurance, banking, home security and healthcare — no travel category and no Gulf/Arabic-speaking sample. Treat 52% as a directional argument for credibility over warmth, not as a measured coefficient for this audience.

### CONFIRMED — Claim 18: UK CMA published price transparency guidance CMA209 on 18 Nov 2025, updated 7 Jan 2026, covering mandatory fees, drip pricing and partitioned pricing under the DMCC Act 2024.

GOV.UK page confirms dates and subject matter: https://www.gov.uk/government/publications/price-transparency-cma209 . Enforcement detail and DMCC in-force timing from Osborne Clarke, Reed Smith and CMS legal updates. The researcher correctly flagged that they read only the index page; the 58-page PDF is at https://assets.publishing.service.gov.uk/media/691b10065a253e2c40d705d9/Price_transparency_-_CMA209_.pdf and remains unread — strikethrough/reference-price and urgency-claim rules are still unverified.

Corrected: Confirmed and materially understated. The DMCC Act's consumer provisions came into force April 2025. On the same day CMA209 was published (18 Nov 2025), the CMA opened its first DMCC consumer investigations into 8 businesses and sent advisory letters to 100 more, targeting presentation of mandatory fees, drip pricing, default opt-ins and pressure selling. Scope caveat the doc must state: this binds UK-facing traders. For a Saudi/Gulf-facing travel site it is a design standard worth adopting, not a legal obligation.

### CONFIRMED — Claim 19: Saudi Arabia 99.0% internet penetration, 48.7M mobile connections (140% of population); UAE 99.0% and 23.0M (202%); Snapchat 72.9% and YouTube 79.2% reach in Saudi.

Verified at https://datareportal.com/reports/digital-2026-saudi-arabia (published 8 Nov 2025, data Oct 2025): 34.4M internet users, 99.0%, 48.7M mobile connections at 140%, YouTube 79.2%, Snapchat 72.9%, Instagram 52.4%, Facebook 50.8%, X 43.1%. The researcher correctly carried DataReportal's own caveat that 'social media user identities figures may not represent unique individuals'; DataReportal adds a second caveat worth carrying — reported changes may reflect source-data corrections rather than real behaviour change.

### STALE — Claim 20: CSA Research 'Can't Read, Won't Buy' — 76% prefer to buy with information in their native language, 40% will never purchase from websites in another language.

Verified at https://csa-research.com/Blogs-Events/CSA-in-the-Media/Press-Releases/Consumers-Prefer-their-Own-Language (7 July 2020): 8,709 verified consumers across 29 countries, vetted from 31,000+ by Kantar; 76%, 40% and 65% all confirmed. Six years old and the researcher flagged it, which is right — but the doc should note the sample is 29 countries with no published Gulf breakout, so it cannot be used to size Arabic demand for this specific audience.

Corrected: Figures are accurate and the source is live, but the survey is from July 2020 and pre-dates both the current machine-translation baseline and any Gulf-specific data. Use it as directional support for Arabic-first design, not as a 2026 statistic.

### CONFIRMED — Claim 21: GA4 ships native lead lifecycle events generate_lead, qualify_lead, working_lead, close_convert_lead alongside the ecommerce set with defined required parameters.

Lead lifecycle events confirmed across multiple independent sources (generate_lead, qualify_lead, disqualify_lead, working_lead, close_convert_lead, close_unconvert_lead) — note the sixth event is close_unconvert_lead, not 'unconvert_lead' as the claim implies. Ecommerce required parameters confirmed at https://developers.google.com/analytics/devguides/collection/ga4/reference/events : add_to_cart / begin_checkout require currency, value, items; purchase adds transaction_id; select_item requires items; search requires search_term; sign_up has no required parameter (method optional). Rename confirmed via Search Engine Land and CMSWire coverage of the 21 Mar 2024 change.

Corrected: Confirmed, with one terminology correction the tracking plan must absorb: GA4 renamed 'conversions' to 'key events' on 21 March 2024. In GA4 today you mark a key event; 'conversion' now refers specifically to a key event imported into Google Ads. A tracking spec written in GA4 'conversion' language will not match the admin UI or the API fields.

### CONFIRMED — Claim 22: Wikipedia:Signs of AI writing catalogues copula avoidance, negative parallelism, participial commentary, and travel buzzspeak including 'nestled', 'vibrant', 'rich heritage', 'breathtaking'.

Verified at https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing . Sections confirmed: 'Avoidance of basic copulatives', 'Negative parallelism' (with the three subtypes 'Not just X, but also Y', 'Not X, but Y', 'X rather than Y'), 'Superficial analyses' for the -ing commentary clauses, and 'Promotional and advertisement-like language' with nestled/vibrant/rich/breathtaking/natural beauty. The Alamata Raya Kobo example is present verbatim. Directly relevant since this workspace's no-ai-voice skill is built on the same catalogue.

### Corrections applied

- REPLACE claim 1: 'No tour-operator-specific conversion benchmark is publicly published. Several free travel-sector benchmarks do exist but measure the wrong unit: Unbounce publishes travel & hospitality landing-page medians (4.8% overall, accommodations 3.7%) from 57M+ conversions without a form; Ruler Analytics puts travel at 2.8%; Fullstory and Invoca publish travel benchmark reports. Contentsquare gates its industry cuts, Dynamic Yield's benchmark page is a broken template rendering 0%, and Triptease anonymised its engines. The honest position is: nothing published measures package-purchase conversion for a small operator, so do not adopt any of these as a target.'
- REPLACE claim 2: 'Littledata's 1.4% average (mobile 1.2%, desktop 1.9%, top 10% 4.7%, 2,800 sites, 2023 data) is a SHOPIFY-store benchmark, not general ecommerce. NN/g's 2.9% macro-conversion figure is not NN/g research — NN/g cites Ruler Analytics, a vendor. Both are weaker provenance than the doc implies.'
- REPLACE claim 6: 'Premium package operators run a low-price-salience homepage over a working booking funnel — not enquiry instead of booking. Trafalgar's homepage leads with Get a Quote, Request a Brochure and a phone number and shows no prices, but Trafalgar sells online: customers select a departure and complete a reservation on trafalgar.com, at per-person twin-share pricing, with deposits of $200 or $350 by trip level. Intrepid leads with From USD prices and deposits, and also offers Get in touch and Live chat. The design decision is therefore about what the HOMEPAGE leads with, not about removing the purchase path.'
- REPLACE claim 8 regulator sentence: 'Tabby's product is 4 interest-free payments or up to 12 monthly payments, with Tabby Card plans up to 8 months. The UAE Central Bank line on tabby.ai/en-SA is UAE-entity boilerplate. For a Saudi-facing site the operative regulator is SAMA: SAMA licensed Tabby for BNPL activity in November 2025 and Tabby holds SAMA consumer- and SME-finance licences; Tamara received a SAMA consumer finance licence on 3 March 2025.'
- REPLACE claim 9 reason list: 'Full ranking excluding just browsing (42%): extra costs 40%, delivery too slow 20%, card trust 19%, forced account 18%, long/complicated checkout 17%, site errors/crashes 17%, returns policy 13%, couldn't calculate total upfront 12%, card declined 10%, too few payment methods 9%. Site errors at 17% is omitted from the doc and is the most actionable item for a new build.'
- FIX the Baymard quotation in claim 5 to the actual sentence: 'Even a complete overhaul of every UX issue will not double a site's conversion rate overnight.'
- ADD scope caveat to claim 18: the DMCC Act and CMA209 bind UK-facing traders. Adopt as a design standard for a Gulf-facing site, not as a legal obligation. Note also that the CMA opened investigations into 8 businesses and wrote to 100 more on 18 Nov 2025 over mandatory fees, drip pricing, default opt-ins and pressure selling.
- ADD to claim 21: GA4 renamed 'conversions' to 'key events' on 21 March 2024. Write the tracking spec in key-event language; 'conversion' in GA4 now means a key event imported into Google Ads. The sixth lifecycle event is close_unconvert_lead, not unconvert_lead.
- ADD transfer caveat to claim 16: the 52%/8% tone study is 100 US participants across insurance, banking, home security and healthcare, 2016. No travel vertical, no Arabic-speaking sample. Directional, not a measured coefficient for this audience.
- SOFTEN claim 14: adaptive validation errors at 7% compliance are the second-least-implemented practice on Baymard's mobile list, not the single most-neglected — highlighting current scope in mobile nav is worse at 6%.

### Flagged as not covered

- Saudi PDPL. Fully enforceable since 14 September 2024, supervised by SDAIA, with 48 enforcement decisions issued as of mid-January 2026. An enquiry-first site is a personal-data-collection machine — lawful basis, consent wording, retention and data-subject rights are conversion-copy decisions (they shape the form), and the dimension covers none of it. This is a far more binding constraint than the UK CMA guidance the doc does cite.
- Maroof registration and the Saudi E-Commerce Law. Saudi e-commerce businesses are expected to register on Maroof and display the badge; the law also requires displaying commercial identity, a clear contact channel and a return/cancellation policy. Payment gateways commonly require Maroof. This is a concrete, checkable trust element for a Saudi audience and outranks generic trust-badge advice.
- GA4 'conversions' were renamed 'key events' on 21 March 2024. The whole measurement section is written in obsolete terminology that will not match the GA4 admin UI or API fields.
- WhatsApp enquiry design. The doc's own Almosafer evidence names WhatsApp as a first-class channel, then gives no guidance on it — no WhatsApp Business API vs click-to-chat decision, no deep-link CTA pattern, no note that a WhatsApp handoff is invisible to GA4 without explicit event instrumentation. For a Gulf enquiry-first site this is the primary conversion surface and it is unaddressed.
- Arabic and RTL implementation. W3C's localization-vs-internationalization definition is cited at the abstract level, but nothing concrete: dir="rtl", CSS logical properties, Arabic-Indic vs Western numeral choice, mirrored progress and back/continue affordances, Arabic name-field ordering, or how the GOV.UK left-aligned Continue button inverts in RTL. The doc quotes a button-alignment rule that reverses in the target language and does not notice.
- Hijri calendar, Ramadan, Hajj and Umrah seasonality. These dominate Gulf travel demand and booking windows and are absent entirely — which also undercuts claim 24's complaint that no consideration-window data exists, since religious-travel seasonality is the structuring variable here.
- Currency and price display for the Gulf: SAR/AED symbol and placement conventions, VAT-inclusive display expectations, and whether prices are quoted per person or per booking. The doc raises drip pricing via the UK CMA but never lands the actual price-display spec for the market it is designing for.
- The CMA209 PDF itself remains unread, so the specific rules on strikethrough/reference prices and urgency claims are still unverified — while the doc simultaneously records Trafalgar's 'Ends soon!' and 'Limited availability. Selling fast' scarcity copy as a pattern to emulate. That is an unresolved contradiction.
- No treatment of the enquiry-to-booking handoff: response-time SLA, who replies, what the first reply contains. For an enquiry-primary site the enquiry is not the conversion — it is the start of a human sales process, and the doc's measurement model stops at the form submit.
- Trust and social proof specifics for high-ticket travel: review provenance, licence/accreditation display, cancellation and refund policy prominence. Baymard's abandonment data flags returns policy at 13% and the doc drops it as travel-irrelevant, when the travel analogue (cancellation policy) is arguably the single largest trust lever for a 15,000 SAR purchase.

## Sources

- [Checkout Form Field Findings — average 11.3 fields vs ideal 8](https://baymard.com/blog/checkout-flow-average-form-fields) · Baymard Institute · 2024-06-26  
  Field-count budget for enquiry and deposit forms; single name field (89% of sites fail, 42% of users type full name in first field); hide Address Line 2 (30% of users pause); delay account creation (84% of sites fail); 17% abandon due to long/complicated checkout.
- [Cart Abandonment Rate — 70.22% average across 50 studies](https://baymard.com/lists/cart-abandonment-rate) · Baymard Institute · 2025-09-22  
  Abandonment causes that map to copy and pricing decisions: extra costs 40%, card-trust 19%, forced account 18%, long checkout 17%, cannot calculate total upfront 12%. Data span 2006–2025.
- [Inline Form Validation — 31% of sites have none](https://baymard.com/blog/inline-form-validation) · Baymard Institute · 2024-01-09  
  Validation timing rules: validate on blur or at correct character length, never on focus; remove errors at keystroke level; use positive validation. 31% lack it, 4% implement it wrong.
- [Mobile UX Trends 2026: 10 Best Practices](https://baymard.com/blog/mobile-ux-ecommerce) · Baymard Institute · 2026-07-14  
  Adaptive validation error messages: only 7% of sites comply, 93% do not, with the 'Your card number is incomplete' vs 'Invalid card number' contrast. Also address lookup 46%, current-scope highlighting 6%, misspelling suggestions 72%.
- [The Hidden Cost of Bad UX: opportunity sizing calculator](https://baymard.com/blog/hidden-cost-bad-ux-revenue-calculator) · Baymard Institute · 2026-08-19  
  Realistic UX revenue-lift ceilings of 15%/25%/35%, compounding not additive, derived from 200,000+ hours of testing; prioritisation by frequency of encounter × severity of friction.
- [A/B Testing 101](https://www.nngroup.com/articles/ab-testing/) · Nielsen Norman Group · 2024-08-30  
  The traffic wall: ~13,000 users for a 3% baseline at 20% MDE and 95% significance; 1–2 week minimum duration; low-traffic pages unsuitable; only one in seven tests wins.
- [Macro vs. Micro Conversions](https://www.nngroup.com/articles/micro-conversions/) · Nielsen Norman Group · 2024-07-19  
  The measurement model for a long-consideration purchase: enquiry as macro conversion (average macro rate cited at 2.9%), plus process-milestone and secondary-action micro conversions.
- [Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/) · Nielsen Norman Group · 2023-05-14  
  The 13 guidelines across visibility, communication and efficiency; preserve user input; avoid blame; offer constructive remedies.
- [An Error Messages Scoring Rubric](https://www.nngroup.com/articles/error-messages-scoring-rubric/) · Nielsen Norman Group · 2023-06-18  
  A build gate for error copy: 3 dimensions × 12 guidelines, at least 3 redundant error indicators, 7th–8th grade reading level, 1–4 scoring with letter grades; benchmark scores for Craigslist, Google Flights and J.Crew.
- [The 3 C's of Informational Microcopy](https://www.nngroup.com/articles/3-cs-microcopy/) · Nielsen Norman Group · 2026-03-20  
  Clarity / Concision / Character rubric for helper strings; the barrier-then-solution pattern ('Out of stock - Notify Me').
- [The 3 I's of Microcopy: Inform, Influence, and Interact](https://www.nngroup.com/articles/3-is-of-microcopy/) · Nielsen Norman Group · 2025-08-01  
  Separation of marketing, informational and interaction microcopy registers, which becomes the design-system token split.
- [The 3-Step CTAs Formula for Conversion](https://www.nngroup.com/videos/3-step-ctas-formula-for-conversion/) · Nielsen Norman Group · 2026-08-03  
  Current CTA formula: actionable verb, establish expectations, communicate the action's value.
- [Better Link Labels: 4 Ss for Encouraging Clicks](https://www.nngroup.com/articles/better-link-labels/) · Nielsen Norman Group · 2019-03-24  
  Specific / Sincere / Substantial / Succinct, and the travel-specific broken-promise example (Combadi's 'MORE INFO & BOOK' opening a contact form). FLAGGED: 2019, principle-level rather than trend-level.
- ["Get Started" Stops Users](https://www.nngroup.com/articles/get-started/) · Nielsen Norman Group · 2017-08-20  
  Evidence that generic CTAs misdirect (6 of 8 users clicked into an unexpected signup modal) and the recommended fix of specific labels. FLAGGED: 2017, potentially stale.
- [The Impact of Tone of Voice on Users' Brand Perception](https://www.nngroup.com/articles/tone-voice-users/) · Nielsen Norman Group · 2016-08-07 (last reviewed 2024-01-30)  
  Trustworthiness explains 52% of desirability variance vs 8% for friendliness; playful tone tested 0.3 points less trustworthy with no recommendation lift; the four tone dimensions. FLAGGED: original study 2016.
- [Transactional Notifications: Their Characteristics and When to Use Them](https://www.nngroup.com/articles/transactional-notifications/) · Nielsen Norman Group · 2022-11-06  
  Required components of confirmation messages; 50–240 character limits; SMS for retrievable information; the Zara counter-example of a confirmation carrying only a reference number. FLAGGED: 2022.
- [The Anchoring Principle](https://www.nngroup.com/articles/anchoring-principle/) · Nielsen Norman Group · 2018-12-09  
  Anchoring evidence (Tversky & Kahneman 512 vs 2,250; Ariely $16.09 vs $55.64; Oxfam suggested values +23% form completions) supporting pre-filled defaults, tiering and deposit framing. FLAGGED: 2018 article, underlying studies older.
- [Sticky Headers: 5 Ways to Make Them Better](https://www.nngroup.com/articles/sticky-headers/) · Nielsen Norman Group · 2021-04-04  
  Persistent-element rules for the sticky mobile CTA bar: ≥1cm × 1cm tap targets, ~16pt text, opaque high-contrast background, 300–400ms animation, minimise height. FLAGGED: 2021, and qualitative — no conversion figures.
- [Interface Copy Impacts Decision Making](https://www.nngroup.com/articles/interface-copy-decision-making/) · Nielsen Norman Group · 2019-02-10  
  Framing effects, loss aversion and artificial scarcity as decision architecture, with the warning that manipulative tactics trade long-term loyalty for short-term conversions. FLAGGED: 2019.
- [Question pages pattern](https://design-system.service.gov.uk/patterns/question-pages/) · GOV.UK Design System · accessed 2026-08-22  
  One thing per page; 'Continue' not 'Next', left-aligned; back link on every step; the Carer's Allowance 12-step progress indicator removal with no negative effect.
- [Form structure — Service Manual](https://www.gov.uk/service-manual/design/form-structure) · GOV.UK · accessed 2026-08-22  
  The question protocol: justify every field before adding it, covering necessity, use, audience, verification and data handling.
- [Understanding SC 3.3.3: Error Suggestion (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html) · W3C / WAI · WCAG 2.2  
  The legal-grade floor for error copy: when an input error is detected and a correction is known, the suggestion must be provided.
- [Localization vs. Internationalization](https://www.w3.org/International/questions/qa-i18n) · W3C Internationalization · accessed 2026-08-22  
  Localization covers currency, date/number formats, symbols, imagery, text direction, address formats, phone formats and name ordering — and sometimes business-process rethinking — not text substitution. Underpins the transcreation argument for Arabic.
- [Can't Read, Won't Buy — B2C survey press release](https://csa-research.com/Blogs-Events/CSA-in-the-Media/Press-Releases/Consumers-Prefer-their-Own-Language) · CSA Research · 2020-07-07  
  76% prefer to buy in their native language; 40% will never purchase from sites in another language; 8,709 consumers across 29 countries. FLAGGED: 2020, potentially stale.
- [GA4 recommended events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events) · Google Analytics developer documentation · accessed 2026-08-22  
  The lead lifecycle event set (generate_lead, qualify_lead, working_lead, close_convert_lead) and ecommerce event parameter requirements (currency, value, items, transaction_id, search_term) for the travel funnel taxonomy.
- [Digital 2026: Saudi Arabia](https://datareportal.com/reports/digital-2026-saudi-arabia) · DataReportal / We Are Social / Meltwater · 2025-11-08  
  99.0% internet penetration, 48.7M mobile connections at 140% of population, YouTube 79.2%, Snapchat 72.9%, Instagram 52.4% — the mobile-first and share-surface argument.
- [Digital 2026: United Arab Emirates](https://datareportal.com/reports/digital-2026-united-arab-emirates) · DataReportal / We Are Social / Meltwater · 2025-11-05  
  99.0% internet penetration and 23.0M mobile connections at 202% of population, reinforcing multi-device, phone-reachable behaviour in the GCC.
- [Almosafer homepage (regional incumbent)](https://www.almosafer.com/en) · Almosafer (Seera Group) · fetched 2026-08-22  
  Verified Gulf conversion stack: Tabby and Tamara BNPL, mada, STC Pay, Apple Pay, Pay at the Property, loyalty points, WhatsApp as a named channel, 24/7 support in Arabic and English, 30+ branches.
- [Tabby product page (Saudi/UAE)](https://tabby.ai/en-SA) · Tabby · fetched 2026-08-22  
  Exact instalment mechanics for honest BNPL copy: 4 interest-free payments with no fees, or up to 12 monthly payments; Tabby Card plans to 8 months; UAE Central Bank regulated.
- [Trafalgar homepage](https://www.trafalgar.com/) · Trafalgar (TTC) · fetched 2026-08-22  
  Verified enquiry-first premium operator pattern: 'Get a Quote', 'Request a Brochure', phone number, no direct-purchase on the homepage; low-deposit risk reversal with a 90-day change window; scarcity messaging.
- [Intrepid Travel homepage](https://www.intrepidtravel.com/) · Intrepid Travel · fetched 2026-08-22  
  Verified booking-first mid-market pattern: per-person 'From USD $3,930', honest 'Was $4,225 / Now $3,625' strikethrough, 'Book now, pay later', 'Lock in your adventure with a deposit', no enquiry or callback option.
- [Holidayme homepage](https://www.holidayme.com/) · Holidayme (Dubai) · fetched 2026-08-22  
  Live example of the generic-CTA trap in this exact market: 'Get Started' and 'Book a Demo' as dominant calls to action, with no package pricing, enquiry, WhatsApp or payment detail on the homepage.
- [Digital Experience Benchmark 2026](https://go.contentsquare.com/en/digital-experience-benchmark/) · Contentsquare · 2026 (data Q4 2024–Q4 2025)  
  Scale of the dataset (99 billion sessions, 6,500+ sites, 9 industries) and engagement −10% YoY, plus evidence that industry-level travel conversion figures are gated rather than published.
- [Ecommerce conversion rate benchmarks (placeholder-rendering page)](https://marketing.dynamicyield.com/benchmarks/conversion-rate/) · Dynamic Yield · fetched 2026-08-22  
  Direct evidence that published travel conversion benchmarks are unreliable — the public page renders '0%' placeholders in place of every figure while claiming a 200M+ monthly unique user, 400+ brand dataset.
- [Booking engine conversion rates study](https://www.triptease.com/resources/booking-engine-conversion-rates-2021) · Triptease · 2021 (data Mar–Jun 2021)  
  10,000+ hotels studied; mobile is over half of all booking-engine traffic; best engine converts double the worst — but absolute rates are withheld. FLAGGED: 2021, and anonymised.
- [Average ecommerce conversion rate benchmark](https://www.littledata.io/average/conversion-rate) · Littledata · 2023  
  Order-of-magnitude reference only: 1.4% average, mobile 1.2%, desktop 1.9%, top 10% at 4.7%, across 2,800 stores. FLAGGED: 2023 data, Shopify-skewed physical goods, not travel.
- [Wikipedia:Signs of AI writing (WP:AISIGNS)](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) · Wikipedia · accessed 2026-08-22  
  The concrete ban list for copy: AI vocabulary, copula avoidance ('boasts', 'stands as', 'serves as'), negative parallelism, participial commentary, and promotional buzzspeak including 'nestled', 'vibrant', 'rich heritage', 'breathtaking' — which is also the standard travel-brochure register.
- [Price transparency (CMA209)](https://www.gov.uk/government/publications/price-transparency-cma209) · UK Competition and Markets Authority · published 2025-11-18, updated 2026-01-07  
  Direction of travel on total-price display, mandatory fees, drip pricing and partitioned pricing under the DMCC Act 2024. NOTE: index page only — substantive rules are in the 58-page PDF and remain unverified from primary text.
- [Unfair commercial practices (CMA207)](https://www.gov.uk/government/publications/unfair-commercial-practices-cma207) · UK Competition and Markets Authority · published 2025-04-04, updated 2025-11-18  
  Companion guidance under the DMCC Act 2024, updated to reflect the new price-transparency guidance; supports the argument against fake urgency and unsubstantiated reference prices. NOTE: index page only.
- [UX Writing: Study Guide](https://www.nngroup.com/articles/ux-writing-study-guide/) · Nielsen Norman Group · 2024-05-08  
  Index of NN/g's UX-writing canon used to locate the CTA, tone, error-message and link-label sources; also the basis for stating that NN/g publishes no dedicated empty-state guidance, so empty-state recommendations here are flagged as synthesis.
