# Privacy, legal, and data constraints

Dimension `privacy-legal-data` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Legal constraint is still the cheapest differentiator here, but the argument needs rebuilding on three corrected facts.

First, Saudi Arabia's PDPL does expressly define Sensitive Data to include religious belief, health, location, credit, ethnic or tribal origin, and biometric or genetic data. This survives verification against the statute, not just an aggregator. A dietary-requirements dropdown, a mobility checkbox and a geolocation call are sensitive-data processing in the operator's primary market. The design consequence — quarantine behind explicit opt-in — holds.

Second, Supabase offers 17 AWS regions and none in the Middle East, while Vercel offers dxb1 in Dubai. Traveller records therefore leave the Kingdom by architecture. But this is heavier than "disclose it": the August 2024 Transfer Regulations require an adequate-protection jurisdiction (SDAIA has published no adequacy list), no prejudice to national security or vital interests, and data minimisation, and SDAIA's February 2025 guideline requires a documented pre-transfer risk assessment. Add an availability risk the dimension missed entirely — Supabase was ISP-blocked in the UAE (September 2025), Yemen and India (February 2026). Residency alternatives deserve a real evaluation, not a footnote.

Third, the cookie conclusion must be softened. Neither KSA nor the UAE has ePrivacy-style cookie legislation, so a blocking EU-style consent wall is not required. But cookies collecting personal data are PDPL processing needing opt-in consent, Saudi's Digital Government Authority has issued cookie guidelines, and marketing without prior consent is the most frequently penalised violation across SDAIA's 48 enforcement decisions to February 2026. The move is lighter, non-blocking, granular consent plus a genuine marketing opt-in — with a consent-receipt table in the data model.

The remaining posture survives: progressive disclosure, zero card data touching the app (SAQ A via PSP iframes), RLS with indexed policy columns and reviewed SECURITY DEFINER functions, legacy Supabase keys migrated before the end-2026 deprecation, and total-price-first display. Two additions the dimension needs: the Saudi E-Commerce Law's mandatory storefront disclosures, three-day breach clock and travel exemption from the 7-day return right; and the European Accessibility Act, applicable since June 2025 to e-commerce and transport services at WCAG 2.1 AA.

## Summary as first written, before verification

Legal constraint is the cheapest source of differentiation this project has, because the generic travel template treats compliance as a bolt-on (a purchased cookie plugin, a copy-pasted privacy page, a passport field in the booking form) and therefore ships the same three ugly artefacts everyone else ships. Handled as a design material instead, the same constraints produce a site that visibly behaves better than its competitors.

Three hard facts drive everything. First, Saudi Arabia's PDPL defines Sensitive Data to expressly include religious belief, health data and location data — so a "dietary requirements" dropdown, a "wheelchair access" checkbox and a browser geolocation call are all sensitive-data processing in the operator's primary market, not neutral form fields (verified against the SDAIA-derived definition). Second, Supabase currently offers no Middle East region, while Vercel does (dxb1); every traveller record therefore leaves the Kingdom by architecture, which triggers the KSA transfer regime and must be disclosed. Third, the GCC has no ePrivacy-style cookie law — KSA has no cookie-specific legislation at all — so the EU-style consent wall is legally unnecessary for most of the target audience, and shipping one anyway is pure self-inflicted damage to the first impression.

The correct posture is progressive data disclosure (browse → enquire → confirm → document), sensitive fields quarantined behind explicit opt-in, geo-scoped consent UI, zero card data touching the app, RLS as the actual security control, and total-price-first display everywhere. Package-travel pre-contractual information rules (17 mandatory items in the UK/EU model) are not a burden here — they are a ready-made content spec for the most trustworthy package page in the market.

## Findings

### Saudi Arabia's PDPL defines "Sensitive Data" to expressly include religious belief, health data, location data, credit data, ethnic or tribal origin, and biometric/genetic data.

Confidence: reported · type: constraint

Why it matters here: For a Middle East travel package site this is the single most consequential legal fact. A halal/kosher meal preference reveals religious belief; a mobility or medical-assistance field is health data; a "find packages near me" geolocation call is location data. All three are routine in generic travel UI and all three are sensitive-category processing in the operator's home market — raising the bar to explicit, separately-captured consent, tighter storage, and criminal exposure on unlawful disclosure.

Evidence: DLA Piper Data Protection Laws of the World, Saudi Arabia page (accessed 2026-08-22), quoting the PDPL definition: sensitive data is "every personal data that includes a reference to an individual's ethnic or tribal origin, or religious, intellectual or political belief... as well as criminal and security data, biometric data, genetic data, credit data, health data, location data..."

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=SA

### The Saudi PDPL came into effect 14 September 2023, compliance was required by 14 September 2024, and it is actively enforced by SDAIA as of early 2026. Breaches must be notified to SDAIA within 72 hours; penalties run from warnings to SAR 5 million, with up to 2 years imprisonment and SAR 3 million for intentional disclosure of sensitive data, doubling for repeat offences.

Confidence: reported · type: constraint

Why it matters here: This is not a dormant law that can be deferred to "phase 2". The site launches into an enforced regime, and the sensitive-data criminal tier applies precisely to the dietary/health/location fields a travel site collects. It also means a breach runbook and an audit trail have to exist at launch, not after the first incident.

Evidence: DLA Piper Data Protection Laws of the World, Saudi Arabia (accessed 2026-08-22): effective 14 September 2023, compliance by 14 September 2024, "being actively enforced by SDAIA" as of February 2026; 72-hour notification via the National Data Governance Portal.

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=SA

### There is no legislation in Saudi Arabia that specifically regulates the use of cookies, and the UAE PDPL does not expressly address cookies either. Consent obligations flow from the general personal-data rules, not from an ePrivacy-style cookie regime.

Confidence: reported · type: constraint

Why it matters here: This kills the reflex to ship an EU cookie wall to a Gulf audience. TIMELESS principle: the consent UI should be scoped to the legal regime of the visitor, not to the strictest regime on earth. A GCC visitor can get a light, brand-consistent first-run notice while an EEA/UK visitor gets the full granular gate — which protects the first impression for the majority of the target audience without under-complying for the minority.

Evidence: DLA Piper Data Protection Laws of the World, Saudi Arabia (accessed 2026-08-22): "There is no specific legislation in the KSA that specifically regulates the use of cookies." UAE page (accessed 2026-08-22): "The PDPL does not expressly address cookies" though it applies to online processing generally.

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=SA

### Supabase projects can only be hosted in 16 AWS regions and none of them are in the Middle East (no Bahrain me-south-1, no UAE me-central-1). Vercel, by contrast, does offer a Dubai compute region (dxb1 / me-central-1) among its 20 regions.

Confidence: verified · type: constraint

Why it matters here: Given the already-decided stack, every traveller record — including sensitive dietary, accessibility and passport data — will be stored outside the GCC by architecture. That is a cross-border transfer under the KSA regime the moment the site launches, and it must be disclosed in the privacy notice and covered by a transfer assessment. It also creates an architecture trap: putting Vercel functions in dxb1 for "local" feel while the database sits in Frankfurt adds a transcontinental round trip per query, because Vercel's own guidance is to co-locate functions with the data source.

Evidence: Supabase docs, Regions (accessed 2026-08-22): 16 AWS regions across Americas, Europe, Asia-Pacific and South America; Middle East regions "are not currently supported". Vercel docs, Global network and regions (last updated 2026-03-05): region list includes dxb1 / me-central-1 / Dubai; "Functions should be executed in the same region as your database"; default for new projects is iad1 (Washington DC).

Source: https://supabase.com/docs/guides/platform/regions

### Saudi PDPL cross-border transfers are permitted to countries with protection no less than the PDPL or under appropriate safeguards, must not compromise national security or vital interests of KSA, and must be limited to the minimum amount of personal data needed.

Confidence: reported · type: constraint

Why it matters here: "Minimum amount of personal data needed" is a data-model instruction, not a lawyer's footnote. It argues directly for splitting the schema so that passport, health and dietary data live in narrow, separately-governed tables that can be retained on a shorter clock and excluded from analytics/replication paths, rather than one fat `bookings` row that gets copied everywhere.

Evidence: DLA Piper Data Protection Laws of the World, Saudi Arabia (accessed 2026-08-22), describing the Transfer Regulations: transfers must not "compromise the national security or vital interests of KSA" and must be "limited to the minimum amount of personal data needed".

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=SA

### GDPR Article 3(2) applies to a non-EU controller when it offers goods or services to data subjects in the Union "irrespective of whether a payment of the data subject is required", or monitors their behaviour in the Union.

Confidence: verified · type: constraint

Why it matters here: A Gulf-based package site that prices in EUR, publishes a French or German page, or runs remarketing pixels against EU visitors pulls itself into GDPR. This is a design decision, not an accident: the master doc should state explicitly whether the site targets EU residents, because the answer determines whether the full EEA consent gate, DSR tooling and Article 9 explicit-consent machinery are in scope or only defensive.

Evidence: GDPR Article 3(2)(a) and (b), reproduced verbatim at gdpr-info.eu (accessed 2026-08-22). Regulation (EU) 2016/679, in force since 25 May 2018 — pre-2023 but unamended and current.

Source: https://gdpr-info.eu/art-3-gdpr/

### GDPR Article 9(1) prohibits processing of personal data "revealing... religious or philosophical beliefs" and "data concerning health" unless an Article 9(2) condition applies, most relevantly 9(2)(a) explicit consent. The prohibition attaches to data that reveals the characteristic, not only to data that states it.

Confidence: verified · type: principle

Why it matters here: The word "revealing" is why a meal-preference dropdown is not a neutral logistics field. TIMELESS principle: the UI must treat inference-carrying fields as sensitive by default. Practically it means dietary and accessibility inputs need their own explicit, unticked consent with a stated purpose — they cannot be swept into a general "I accept the booking terms" checkbox.

Evidence: GDPR Article 9(1) and 9(2)(a), verbatim at gdpr-info.eu (accessed 2026-08-22): "Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs... data concerning health... shall be prohibited"; exception where "the data subject has given explicit consent... for one or more specified purposes".

Source: https://gdpr-info.eu/art-9-gdpr/

### GDPR Article 7(3) requires that "it shall be as easy to withdraw as to give consent", and Article 25(2) requires that by default only personal data necessary for each specific purpose are processed — covering the amount collected, extent of processing, storage period and accessibility.

Confidence: verified · type: principle

Why it matters here: Together these are the legal spine of both the consent banner design and the booking form design. 7(3) means a persistent, findable "Privacy choices" control (footer link plus a re-open affordance), not a one-shot banner. 25(2) is the direct authority for progressive data disclosure: a field that is not needed at this step must not exist at this step.

Evidence: GDPR Article 7(3) and Article 25(2), verbatim at gdpr-info.eu (accessed 2026-08-22).

Source: https://gdpr-info.eu/art-7-gdpr/

### noyb's audit of cookie banners found the specific violation patterns to be: no reject option on the first layer, pre-ticked boxes, different colouring/contrast for accept versus reject, false legitimate-interest claims, and hard withdrawal. Making withdrawal as easy as giving consent was the least-remedied item — only 18% fixed it — described as "the biggest obstacle for compliance".

Confidence: reported · type: pattern

Why it matters here: This is the concrete design checklist. It also identifies the differentiator: withdrawal is the item almost nobody gets right, so a visible, working "change my privacy choices" control is both the cheapest compliance win and the one most likely to read as unusual competence.

Evidence: noyb, "noyb files 422 formal GDPR complaints on nerve-wrecking cookie banners" (accessed 2026-08-22): of 516 sites warned in May 2021, 42% added a reject button, 68% removed pre-ticked boxes, 46% fixed accept/reject colour contrast, 22% dropped legitimate-interest claims, 18% made withdrawal as easy as giving consent.

Source: https://noyb.eu/en/noyb-files-422-formal-gdpr-complaints-nerve-wrecking-cookie-banners

### The EDPB's Opinion 08/2024 on consent-or-pay (adopted 17 April 2024) is scoped to large online platforms, but its reasoning on valid consent is general: consent must be granular ("free to choose which purpose of processing they accept, rather than being confronted with one consent request bundling several purposes"), users "should not be subject to deceptive design patterns", and detriment or imbalance of power undermines "freely given".

Confidence: verified · type: constraint

Why it matters here: A travel agency is not a large online platform, so a cookie wall or pay-to-refuse model is not the live question — but the granularity and deceptive-design findings are the governing standard for any banner. 2026 TREND note: consent-or-pay is a live regulatory battleground; building a site whose consent model does not depend on it is the safer long-term bet.

Evidence: EDPB Opinion 08/2024 on Valid Consent in the Context of Consent or Pay Models Implemented by Large Online Platforms, adopted 17 April 2024 (corrigendum October 2024); text extracted from the official EDPB PDF, sections on granularity, deceptive design patterns, detriment, conditionality, and the "equivalent alternative".

Source: https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-082024-valid-consent-context-consent-or_en

### Google's EU User Consent Policy applies to end users in the EEA, the UK and Switzerland, and requires site operators to obtain consent for the use of cookies/local storage and for the collection and use of personal data for ad personalisation, to retain records of consent given, and to provide users with clear instructions for revoking consent. Non-compliance can result in Google limiting, suspending or terminating product access.

Confidence: verified · type: constraint

Why it matters here: If the site runs Google Analytics or Google Ads at all — which a growth-focused operator will — this is a contractual obligation on top of the law, and it introduces a build requirement most templates skip: a durable consent record. That record has to live somewhere (a Supabase `consent_events` table with timestamp, policy version, choices and a hashed identifier) and it has to be queryable.

Evidence: Google, EU User Consent Policy (accessed 2026-08-22): applies to the EEA, UK and Switzerland; requires consent for "the use of cookies or other local storage where legally required" and "the collection, sharing, and use of personal data for personalization of ads"; operators must "retain records of consent given by end users" and "provide end users with clear instructions for revocation of consent".

Source: https://www.google.com/about/company/user-consent-policy/

### Google Consent Mode v2 added two parameters — ad_user_data and ad_personalization — to the existing ad_storage and analytics_storage signals in November 2023. Implementation requires a `default` command with all signals denied before any Google tag fires, an `update` command on user choice, `wait_for_update` when the consent tool loads asynchronously, and optionally `ads_data_redaction` to strip ad click identifiers while consent is denied.

Confidence: verified · type: constraint

Why it matters here: This is only needed if Google measurement/ads are used for EEA/UK/Swiss traffic — for a purely GCC-targeted site it is optional overhead. When it is needed, the ordering constraint (default before any tag) dictates that the consent state must be resolved server-side or in an inline head script, which in turn constrains how the banner can be built. 2026 TREND: consent mode is Google-specific plumbing and will keep changing; isolate it behind one module.

Evidence: Google Tag Platform developer documentation, "Consent mode" (accessed 2026-08-22): "Consent mode was updated in November, 2023 and now contains two additional parameters"; describes default/update commands, wait_for_update and ads_data_redaction.

Source: https://developers.google.com/tag-platform/security/guides/consent

### Chrome/web.dev guidance identifies cookie notices as "a very common source of layout shifts" (CLS), a frequent cause of poor INP because the Accept button triggers bulk third-party script loading, and occasionally the LCP element on mobile. Recommended fixes: reserve DOM space or use a sticky footer/modal overlay, place the notice in the footer rather than the header, load the script with `async` directly in HTML rather than via a tag manager, use preconnect/dns-prefetch, and consider self-hosting the script.

Confidence: verified · type: principle

Why it matters here: This is the bridge between the legal requirement and the "unique experience" goal. The generic site buys a CMP, drops it in GTM, and pays for it in CLS, INP and a ruined first impression. A self-hosted, server-rendered, space-reserved bottom sheet is measurably faster AND looks designed — the same decision serves compliance, Core Web Vitals and brand.

Evidence: web.dev (Chrome team), "Best practices for cookie notices" (accessed 2026-08-22): cookie notices as a common CLS source; Accept button causing high INP due to "a lot of processing to add those third-party scripts all at once"; recommendations on async, resource hints, reserved space, footer placement and self-hosting.

Source: https://web.dev/articles/cookie-notice-best-practices

### PCI DSS v4.0.1 was published 11 June 2024 and its future-dated requirements — including 6.4.3 (management and authorisation of every script on a payment page) and 11.6.1 (change- and tamper-detection on payment pages) — became effective 31 March 2025. Integration choice determines the assessment burden: card fields hosted in the PSP's iframes qualify for SAQ A, a self-hosted payment form pushes you to SAQ A-EP, and passing card data to the API directly pushes you to SAQ D, where over 300 controls may apply.

Confidence: verified · type: constraint

Why it matters here: This settles a design argument before it starts: no custom-styled card input, ever. It also has a direct UI consequence — 6.4.3 means the payment page's script inventory must be deliberate, so the payment step should be a lean route with no analytics, chat widgets, marketing pixels or font experiments loaded.

Evidence: PCI Security Standards Council blog, "Just Published: PCI DSS v4.0.1" (2024-06-11): v4.0.1 published 11 June 2024, v3.2.1 retired 31 March 2024, effective date for new requirements "remains unchanged at March 31, 2025". Stripe, PCI compliance guide and integration security guide (accessed 2026-08-22): SAQ A for Checkout/Elements where card data is collected in iframes on Stripe's domain, SAQ A-EP for self-hosted forms, SAQ D for direct API; "card information never touches your servers" with hosted methods.

Source: https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1

### 3-D Secure is mandatory under SCA/PSD2 in the EEA and equivalent regimes in the UK, India, Japan and Australia, and optional elsewhere; the issuer may challenge with an OTP, password or biometric prompt. Stripe's own CSP guidance requires `https://hooks.stripe.com` as a `frame-src` for redirect-based methods including 3DS.

Confidence: verified · type: constraint

Why it matters here: For a Gulf-issued card 3DS is usually a bank OTP anyway, so the challenge step is unavoidable in practice regardless of PSD2. The design job is to stop it eating bookings: keep the challenge in an in-page modal rather than a new tab, pre-warn the user before they hit Pay, hold a "do not close this window" state, and make the return path idempotent and webhook-confirmed so a dropped redirect never loses a paid booking.

Evidence: Stripe docs, "3D Secure authentication" (accessed 2026-08-22): SCA "is a regulatory requirement in effect as of September 14, 2019" under PSD2 in the EEA and similar regulations in the UK, India, Japan and Australia; issuer may request password, one-time code or biometric. Stripe integration security guide (accessed 2026-08-22): include `https://hooks.stripe.com` as a `frame-src` directive for payment methods with redirect functions such as 3D Secure.

Source: https://docs.stripe.com/payments/3d-secure

### In Supabase, a table in an exposed schema without RLS "is readable and writable by any role with a grant on it", and new tables receive automatic grants to anon, authenticated and service_role. Adding policies does not remove those grants. The publishable/anon key is safe in the browser only because Postgres roles plus RLS guard the data; the secret/service_role key has bypassrls and must never reach the client. Legacy anon and service_role keys are being replaced by publishable/secret keys and will be deprecated by the end of 2026.

Confidence: verified · type: constraint

Why it matters here: RLS is not a hardening step to add later — with this stack it is the only thing standing between the public internet and traveller passport data. Because the API is directly reachable with the publishable key, any control implemented only in React is decorative. Every table holding traveller data needs a policy written at the same time as the table.

Evidence: Supabase docs, Row Level Security (accessed 2026-08-22): "A table in an exposed schema without RLS is readable and writable by any role with a grant on it"; "Adding policies doesn't remove them"; service_role has bypassrls and "Never use a secret key in the browser". Supabase docs, API keys (accessed 2026-08-22): publishable keys safe to expose, data "guarded by Postgres via the built-in anon and authenticated roles"; legacy keys "will be deprecated by the end of 2026".

Source: https://supabase.com/docs/guides/database/postgres/row-level-security

### Supabase's `auth.uid()` returns null for unauthenticated requests, and because `null = user_id` evaluates false, policies silently fail closed — but the documented best practice is an explicit null check plus wrapping the call as `(select auth.uid())` for performance, and adding an index on every column a policy filters on. Supabase Storage allows no uploads to buckets without RLS policies, public buckets are publicly accessible by definition, and per-user folder restriction is done via `auth.jwt()->>'sub'` in the object path.

Confidence: verified · type: constraint

Why it matters here: Directly determines how passport scans and visa documents are stored: a private bucket, a path namespaced by booking and user, RLS on `storage.objects`, and short-lived signed URLs. A public bucket for "convenience" would make every uploaded passport scan world-readable to anyone who guesses or leaks a URL.

Evidence: Supabase docs, Row Level Security and Storage access control (both accessed 2026-08-22): auth.uid() null behaviour and `(select auth.uid())` initPlan optimisation; indexes on policy-filtered columns are mandatory for performance; "By default Storage does not allow any uploads to buckets without RLS policies"; per-user folder policies using the JWT `sub` claim.

Source: https://supabase.com/docs/guides/storage/security/access-control

### In Next.js, any environment variable prefixed `NEXT_PUBLIC_` is inlined into the JavaScript bundle at build time and shipped to the browser, and its value is frozen at build; variables without the prefix are server-only. The repository has already made a commit prefixing browser-facing env vars with `NEXT_PUBLIC_`.

Confidence: verified · type: constraint

Why it matters here: This is the most common way a Supabase secret key leaks in this exact stack — someone adds `NEXT_PUBLIC_` to a variable to make an import error go away and publishes a database god-key to every visitor. The master doc should carry a hard rule: `NEXT_PUBLIC_` is reserved for the Supabase URL and publishable key and the PSP publishable key, and nothing else, enforced by a CI check on the env schema.

Evidence: Next.js documentation, "How to use environment variables in Next.js" (version 16.3.2, last updated 2026-03-03): non-prefixed variables "are only available in the Node.js environment"; prefixing causes Next.js to "inline" the value at build time "into any JavaScript sent to the browser"; "all NEXT_PUBLIC_ variables will be frozen with the value evaluated at build time".

Source: https://nextjs.org/docs/app/guides/environment-variables

### The EU/UK package travel regime requires 17 categories of pre-contractual information before the traveller is bound, including the total price inclusive of taxes with disclosure of possible additional costs, payment arrangements and deposits, whether the package is suitable for persons with reduced mobility, passport/visa/health formalities, the right to terminate before the start against a fee, and cancellation/assistance insurance information. Price increases are only permitted for defined cost rises with at least 20 days' notice, and an increase above 8% of the total price entitles the traveller to cancel without penalty.

Confidence: verified · type: principle

Why it matters here: Even outside the EU this is the best available content specification for a package page. TIMELESS principle: the information a regulator forces you to disclose is the information a wavering buyer actually wants. Turning the 17 items into a designed, persistent "everything about this package" module — rather than a PDF link — converts a compliance chore into the most trustworthy package page in the market.

Evidence: Package Travel and Linked Travel Arrangements Regulations 2018, Schedule 1 (UK implementation of Directive (EU) 2015/2302), legislation.gov.uk (accessed 2026-08-22): 17 enumerated information categories. Your Europe (European Commission), Package travel (accessed 2026-08-22): "total price, inclusive of all taxes and where applicable all additional fees"; price increases require notice at least 20 days before departure and "If the increase exceeds 8% of the total price, you can cancel without penalty."

Source: https://www.legislation.gov.uk/uksi/2018/634/schedule/1/made

### Under the package travel regime a traveller may terminate at any time before the start of the package against reasonable standardised termination fees "based on the timing of cancellation and expected cost savings", and may terminate without any fee where unavoidable and extraordinary circumstances at the destination significantly affect performance, receiving a full refund but no additional compensation. Where no standardised fees are set, the charge must equal the price minus cost savings and income from alternative deployment.

Confidence: verified · type: constraint

Why it matters here: "Reasonable standardised fees based on timing" is an instruction to publish a date-banded fee table, not prose. That table can be computed live against the traveller's own departure date and rendered on the package page before payment — which is simultaneously the compliant behaviour and a conversion asset, because opaque cancellation terms are a known trust killer in package travel.

Evidence: Package Travel and Linked Travel Arrangements Regulations 2018, regulation 12, legislation.gov.uk (accessed 2026-08-22).

Source: https://www.legislation.gov.uk/uksi/2018/634/regulation/12/made

### The UK CMA published dedicated price transparency guidance (CMA209) on 18 November 2025, updated 7 January 2026, covering total price display, mandatory charges, drip pricing and partitioned pricing under the Digital Markets, Competition and Consumers Act 2024; the unfair commercial practices guidance (CMA207) was updated the same day to reflect it.

Confidence: reported · type: trend

Why it matters here: 2026 TREND, and a strong one: price transparency enforcement is tightening in the markets a Gulf travel site sells into, and travel is a named target because of resort fees, per-person pricing and booking fees. Designing total-price-first from day one avoids a rebuild and produces the screenshot-able "the price you see is the price you pay" claim that no drip-pricing competitor can make.

Evidence: GOV.UK, "Price transparency (CMA209)" (published 18 November 2025, updated 7 January 2026) and "Unfair commercial practices (CMA207)" (updated 18 November 2025 "to reflect new guidance on price transparency"), both accessed 2026-08-22. Note: only the publication landing pages were retrieved; the detailed rules inside the PDF/HTML guidance were not read.

Source: https://www.gov.uk/government/publications/price-transparency-cma209

### Baymard Institute's 2024 benchmark found the average checkout contains 11.3 form fields (down from 11.8 in 2021 and 12.7 in 2019), that "most sites need only 8 form fields in total for a checkout flow", and that 17% of users have abandoned a purchase due to checkout complexity — with field count mattering more to usability than step count.

Confidence: verified · type: data

Why it matters here: This is the commercial argument for the legal position. Passport number, issuing country, expiry date, date of birth, nationality and emergency contact are six fields that a generic travel checkout adds before payment and that no data-protection regime wants collected that early. Deferring them to a post-payment secure link both reduces the sensitive-data footprint and moves the checkout toward the 8-field target.

Evidence: Baymard Institute, "Checkout Flows Average 11.3 Form Fields Too Many" (published 26 June 2024, accessed 2026-08-22).

Source: https://baymard.com/blog/checkout-flow-average-form-fields

### The wider region imposes its own website-visible obligations: Kuwait's CITRA Data Privacy Protection Regulation (Administrative Decision No. 26 of 2024) requires service information to be provided in both English and Arabic with explicit prior consent and a right to withdraw; Egypt's Law 151/2020 requires a licence or permit from the Personal Data Protection Centre before processing electronic personal data or conducting electronic marketing, with electronic-marketing consent records kept for three years; Qatar's Law 13/2016 requires "affirmative, explicit and unambiguous" prior consent for electronic marketing; Bahrain's Law 30/2018 permits transfers to 83 pre-approved countries without prior authorisation and requires breach notification within 72 hours.

Confidence: reported · type: constraint

Why it matters here: Marketing consent cannot be a single ticked box at the bottom of a booking form. Across these jurisdictions it must be separate, opt-in, granular by channel, and evidenced with a durable record — and the Kuwait rule makes a genuine bilingual legal surface a legal requirement, not a nicety, for part of the audience. Egypt's licensing requirement is a genuine go/no-go item if Egyptian travellers are marketed to directly.

Evidence: DLA Piper Data Protection Laws of the World country pages for Kuwait, Egypt, Qatar and Bahrain (all accessed 2026-08-22). STALENESS FLAG: Qatar's law dates from 2016 and Bahrain's from 2018 — both pre-2023 and both should be re-verified against current regulator guidance before launch.

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=KW

### The UAE Federal Decree-Law 45/2021 Executive Regulations were still unpublished as of January 2025, with a six-month compliance window to follow their publication; the PDPL itself specifies no penalties (a Cabinet decision is pending), while the Cyber Crime Law imposes AED 50,000–500,000 for illegal collection and processing. Electronic marketing in the UAE is opt-in, reinforced by Article 6 of the Trading by Modern Technological Means Law (2023) and Article 4 of Cabinet Decision No. 56/2024.

Confidence: reported · type: constraint

Why it matters here: The UAE regime is a moving target, which argues for building to the stricter Saudi/GDPR baseline and treating UAE compliance as satisfied by construction, rather than building to the current minimum and rebuilding when the regulations land. The opt-in marketing rule is firm regardless and constrains the newsletter and WhatsApp-broadcast UI.

Evidence: DLA Piper Data Protection Laws of the World, United Arab Emirates (accessed 2026-08-22): Executive Regulations "remain unpublished" as of 6 January 2025 despite being due within six months of the 26 September 2021 issuance; opt-in marketing model under the TDRA Unsolicited Electronic Communications Regulation, the 2023 Trading by Modern Technological Means Law and Cabinet Decision No. 56/2024.

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=AE

### Supabase's own production checklist treats security as a set of pre-launch switches: RLS on all tables ("Tables that do not have RLS enabled with reasonable policies allow any client to access and modify their data"), SSL enforcement, network restrictions, account MFA, email confirmations, one-time-password expiry of 3600 seconds or lower, custom SMTP, CAPTCHA on signup/sign-in/password-reset endpoints, and Point-in-Time Recovery for databases over 4 GB. The auto-generated Data API additionally needs private tables kept in a non-exposed schema, with `SECURITY DEFINER` functions reviewed individually because RLS does not apply inside them.

Confidence: verified · type: constraint

Why it matters here: Two of these are UI decisions, not infra ones. CAPTCHA on auth endpoints changes the sign-in screen design and must be planned rather than bolted on. And the default auth email rate limit of 2 per hour will break a launch-day booking-confirmation flow unless custom SMTP is configured before launch — a concrete, dated gotcha.

Evidence: Supabase docs, "Production checklist" and "Securing your API" (both accessed 2026-08-22): RLS, SSL enforcement, network restrictions, MFA, email confirmations, OTP expiry ≤3600s, custom SMTP, CAPTCHA; email endpoints default to "2 emails per hour" as of September 2024; PITR for databases over 4 GB; "Review every SECURITY DEFINER function carefully" since "RLS doesn't apply to functions".

Source: https://supabase.com/docs/guides/deployment/going-into-prod

## Design implications

- PROGRESSIVE DATA DISCLOSURE — four stages, four tables, four retention clocks. Stage 1 browse: zero PII, zero cookies beyond strictly necessary. Stage 2 enquiry/hold: given name, contact, party size, approximate dates only. Stage 3 confirmed booking: full name as on passport, billing country. Stage 4 pre-departure (T-minus 21 days): passport number, nationality, DOB, document upload — delivered by a separate authenticated link, never by the checkout form. Model as `enquiries`, `bookings`, `travellers`, `traveller_documents` with independent RLS policies and independent deletion jobs, so the sensitive tail can be purged on a short clock without touching the financial record.
- SENSITIVE-FIELD QUARANTINE. Dietary requirements, accessibility/mobility needs and medical notes never appear inline in the passenger form. They live in one optional, collapsed 'Tell us how to look after you' panel with (a) its own unticked explicit-consent checkbox, (b) a one-line plain-language statement of purpose, recipients and deletion date, (c) free-text as the primary input rather than a religion-revealing dropdown of meal codes, and (d) storage in a separate table with its own RLS policy and its own retention job. Never required, never pre-selected, never sent to analytics, never included in any CSV export or replication path.
- GEOLOCATION IS SENSITIVE DATA IN SAUDI ARABIA — design accordingly. No `navigator.geolocation` call on page load, ever. Location personalisation requires an explicit user-initiated tap on a labelled control, and only a coarse city/country string is persisted; raw coordinates are used in-memory and discarded. Any map embed on a package page loads only after interaction, both for this reason and for LCP.
- GEO-SCOPED CONSENT UI, ONE COMPONENT, THREE MODES. Read Vercel's geolocation header at the edge. EEA/UK/CH visitors get the full granular gate (strictly necessary / analytics / marketing, all non-essential off by default, equal-weight Accept all and Reject all on the first layer). GCC visitors get a single-line first-run privacy notice with a link, because KSA has no cookie-specific legislation — plus a separate explicit opt-in wherever a marketing pixel or profiling actually fires. Everyone else gets the GCC mode. One React component, one design language, three configurations.
- BANNER AS DESIGNED OBJECT, NOT PLUGIN. Self-hosted, no CMP vendor, no tag manager. Server-rendered into the initial HTML with space reserved so CLS is zero; positioned as a bottom sheet on mobile and a bottom-corner card on desktop; never covering the hero; never the LCP element; never a full-screen interstitial. Buttons: 'Accept all' and 'Reject all' identical in size, weight, colour and contrast, with 'Manage' as a tertiary text link. Bilingual (Arabic/English) with correct RTL mirroring. No third-party script fires until a choice exists.
- PERSISTENT PRIVACY-CHOICES CONTROL. A footer link plus a small re-open affordance that restores the preference panel from any page. Google's EU User Consent Policy requires clear revocation instructions and GDPR Article 7(3) requires withdrawal to be as easy as consent; noyb's audit shows this is the item almost nobody implements, so it is both the cheapest compliance win and the most visible competence signal.
- CONSENT RECORD AS A FIRST-CLASS TABLE. `consent_events(id, subject_key, policy_version, purposes jsonb, action, source, occurred_at)` written server-side on every grant, change and withdrawal, immutable, RLS-locked, never client-writable. Required by Google's policy ('retain records of consent given'), by Egypt's three-year electronic-marketing record rule, and by the general accountability principle. Version the privacy notice and cookie notice as numbered documents with a changelog so the stored `policy_version` means something.
- GOOGLE CONSENT MODE V2 BEHIND A SINGLE MODULE. If Google measurement runs at all: emit `gtag('consent','default', {...all denied, wait_for_update})` in an inline head script before any Google tag, `update` on user choice, and set `ads_data_redaction`. Isolate every Google-specific line in one file so the inevitable next revision is a one-file change.
- ZERO CARD DATA, EVER. PSP hosted fields or hosted checkout only — no custom-styled card `<input>` under any aesthetic argument, because that is the difference between SAQ A and SAQ A-EP/D. Brand the PSP's own element theming to match the site instead. Store only the PSP-returned non-sensitive fields (brand, last four, expiry) for the receipt UI.
- PAYMENT ROUTE IS A CLEAN ROUTE. PCI DSS 6.4.3 requires every script on a payment page to be authorised and inventoried, and 11.6.1 requires tamper detection. Therefore the payment step loads no analytics, no chat widget, no marketing pixel, no A/B framework, no experimental font. Ship a strict Content-Security-Policy with exactly the PSP's documented directives (including `hooks.stripe.com` as `frame-src` for 3DS) and treat the CSP as the machine-readable script inventory.
- DESIGN THE 3-D SECURE MOMENT. Pre-warn before the Pay button: 'Your bank may ask you to approve this payment.' Render the challenge in an in-page modal, never a new tab. Hold a persistent 'Do not close this window' state with a spinner that does not look stalled. Make the return path idempotent — payment intent id in the URL, server-side confirmation, webhook as the source of truth — so an abandoned or dropped redirect never loses a paid booking, and show a 'we're confirming your payment' recovery screen rather than an error.
- RLS IS THE SECURITY MODEL, WRITTEN WITH THE TABLE. Every table in an exposed schema gets a policy in the same migration that creates it. Operational tables (pricing rules, supplier costs, rate limits, audit logs) live in a `private` schema outside the Data API. Every `SECURITY DEFINER` function is individually reviewed and documented. Policy-filtered columns are indexed. `auth.uid()` is wrapped as `(select auth.uid())` with an explicit null check. CI fails the build if any table in `public` lacks RLS.
- STORAGE POLICY FOR TRAVEL DOCUMENTS. Passport and visa uploads go to a private bucket, path `documents/{booking_id}/{user_id}/{uuid}`, with RLS on `storage.objects` binding the path segment to the JWT `sub` claim. Access only ever through short-lived signed URLs generated server-side (minutes, not days). A scheduled job deletes documents N days after return. Uploads are never rendered into any page a search engine or a shared link could reach.
- ENV VAR DISCIPLINE AS A HARD RULE. `NEXT_PUBLIC_` is permitted only for the Supabase project URL, the Supabase publishable key, and the PSP publishable key. Everything else — Supabase secret key, PSP secret key, any provider API key — is server-only and used exclusively in Route Handlers, Server Actions or Edge Functions. Enforce with a typed env schema and a CI check that greps the client bundle for known secret prefixes.
- REGION DECISION, WRITTEN DOWN. Supabase has no Middle East region, so pick one explicit region (Frankfurt eu-central-1 is the defensible default for a mixed GCC/EU audience) and set Vercel functions to the matching region (fra1) to co-locate with the database — do NOT set dxb1 for a 'local' feel while the data sits in Europe, because Vercel's own guidance is to run functions where the data is. Record the choice, the reason and the transfer analysis in `.memory/projects/`, and state the hosting country plainly in the privacy notice rather than hiding it in a sub-processor annexe.
- TOTAL-PRICE-FIRST, EVERYWHERE. The first price a user ever sees — search card, list row, hero, share preview, structured data — is the total inclusive of all taxes and mandatory fees. Per-person prices are labelled as such and the party total is shown immediately adjacent, not on the next screen. A breakdown drawer shows the components. No mandatory charge may first appear later than the first price. Optional extras are visually and structurally separate from the total.
- THE PACKAGE PAGE IS THE PRE-CONTRACTUAL INFORMATION. Build one persistent, always-visible module derived from the 17 statutory items: main characteristics and itinerary, transport and timings, accommodation and category, meals included, excursions included, language of guiding, suitability for reduced mobility, organiser identity and contact, total price and possible additional costs, payment schedule and deposit, minimum-participant/cancellation threshold, passport/visa/health formalities, termination rights and fees, and insurance. Structured content in Supabase, not prose in a CMS blob, so it renders consistently and can be diffed and versioned.
- CANCELLATION TERMS AS A COMPUTED TABLE. Render date-banded termination fees calculated against the traveller's own departure date ('Cancel before 12 Oct: full refund. 12 Oct–2 Nov: 25%. After 2 Nov: 60%'), shown on the package page before payment and repeated in the confirmation. Prose-only cancellation policies fail both the 'reasonable standardised fees' standard and the trust test.
- BILINGUAL LEGAL SURFACE, PROPERLY TRANSLATED. Privacy notice, cookie notice, booking terms and the sensitive-data explainer all exist in real Arabic and real English, with the Arabic reviewed by a human. Kuwait's CITRA regulation makes bilingual service information an explicit requirement, and for the operator's audience it is the difference between a legal page that is read and one that is scrolled past.
- GRANULAR MARKETING CONSENT BY CHANNEL. Separate unticked opt-ins for email, SMS and WhatsApp, captured at the point of collection with timestamp and source, never bundled into 'I accept the terms'. UAE, Qatar and Egypt are all opt-in regimes and Egypt requires three-year consent records. One-click unsubscribe honoured across all channels from a single preference centre.
- SELF-SERVICE DATA RIGHTS PAGE. An authenticated 'Your data' screen offering export, correction, deletion request, marketing preferences and consent withdrawal. Cheaper than a support queue, satisfies rights obligations across every regime in scope, and functions as a visible trust artefact that competitors do not have.
- BREACH READINESS FROM DAY ONE. Saudi Arabia, Qatar, Bahrain and Egypt all run a 72-hour notification clock. That requires an append-only audit log of access to sensitive tables, a documented incident runbook, and a named owner — all built at launch, because none of it can be retrofitted inside a 72-hour window.

## Anti-patterns to refuse

- THE FULL-SCREEN COOKIE INTERSTITIAL OVER THE HERO. The single most common first impression in travel, and the most destructive — it hides the one image the whole page was designed around, it is a documented CLS and INP source, and for a Gulf audience it is not even legally required, since Saudi Arabia has no cookie-specific legislation. Shipping it means paying a brand cost for a compliance benefit that does not exist for most of the traffic.
- GREY 'REJECT' TEXT LINK NEXT TO A BRIGHT 'ACCEPT ALL' BUTTON. The canonical dark pattern, explicitly identified in noyb's audit (46% of warned companies had to fix accept/reject colour contrast) and squarely inside the EDPB's 'deceptive design patterns' finding. It also reads as cheap: a visitor who notices the trick has learned something about how the company will treat their money.
- PRE-TICKED MARKETING CHECKBOXES AND BUNDLED CONSENT. 'I accept the booking terms and would like to receive offers' as one box fails the granularity standard the EDPB restated in Opinion 08/2024, fails the opt-in rules in the UAE, Qatar and Egypt, and produces a marketing list that cannot be evidenced later.
- PASSPORT NUMBER, DATE OF BIRTH AND NATIONALITY IN THE CHECKOUT FORM. Six extra fields on the highest-stakes screen, pushing a checkout further past Baymard's 8-field target when the average is already 11.3, in exchange for identity-document data that is not needed until weeks later. It maximises both abandonment and breach blast radius simultaneously — the worst trade available.
- A MEAL-PREFERENCE DROPDOWN LISTING HALAL, KOSHER, HINDU AND VEGETARIAN AS A REQUIRED FIELD. A religion-revealing field, mandatory, sitting between 'Last name' and 'Phone number'. Special-category data under GDPR Article 9 and Sensitive Data under the Saudi PDPL — collected from every traveller, including the ones who did not need it, with no explicit consent and no separate storage.
- AUTO-REQUESTING BROWSER GEOLOCATION ON PAGE LOAD to 'personalise' results. A permission prompt before any value has been delivered, generating data that the Saudi PDPL classifies as sensitive, in exchange for a feature nobody asked for.
- DRIP PRICING: 'FROM $499' THAT BECOMES $812 AT STEP FOUR. Per-person prices shown as if they were the total, service fees and mandatory supplements appearing after commitment. Directly in the crosshairs of the CMA's 2025/2026 price transparency guidance, contrary to the package-travel rule that the price shown must be inclusive of all taxes and applicable additional fees, and the fastest way to destroy the trust the rest of the site was built to earn.
- A CUSTOM-STYLED CARD INPUT 'so the checkout matches the brand'. Moves the site from SAQ A to SAQ A-EP or SAQ D, brings card data into scope, and buys a marginal aesthetic gain for an enormous, permanent compliance and liability cost. Theme the PSP's hosted element instead.
- LOADING A THIRD-PARTY CMP THROUGH GOOGLE TAG MANAGER AT THE TOP OF HEAD. Blocks the parser, imports someone else's design language, causes layout shift, and — per Chrome team guidance — concentrates a burst of script loading behind the Accept click, wrecking INP at the exact moment the user first interacts with the site.
- PUBLIC SUPABASE STORAGE BUCKET FOR DOCUMENT UPLOADS because signed URLs were fiddly. Public buckets are publicly accessible by definition; this turns every uploaded passport scan into a world-readable object behind a guessable or leakable URL.
- SECRETS BEHIND THE `NEXT_PUBLIC_` PREFIX. Adding the prefix to make an import error disappear inlines the value into the browser bundle at build time. With a Supabase secret/service_role key — which carries `bypassrls` — this hands every visitor unrestricted read/write access to every traveller record. The prefix is a publication decision, not a scoping convenience.
- TABLES SHIPPED BEFORE THEIR RLS POLICIES, with client-side checks standing in until 'we harden it later'. The Data API is directly reachable with the publishable key, so an unprotected table in an exposed schema is readable and writable by anyone, and no amount of React logic changes that.
- ENGLISH-ONLY LEGAL PAGES FOR AN ARABIC-FIRST AUDIENCE, or an Arabic version that is visibly machine-translated. It fails Kuwait's explicit bilingual requirement, fails the informed-consent standard everywhere, and signals that the Arabic-speaking traveller is an afterthought.
- CANCELLATION POLICY AS UNSTRUCTURED PROSE IN A MODAL. Technically 'disclosed', practically unreadable, and it forfeits the strongest trust asset a package seller has — a specific, dated, computed answer to 'what happens if I have to cancel?'
- A COOKIE WALL THAT BLOCKS THE SITE UNTIL THE VISITOR ACCEPTS. Legally fragile in the EEA, unnecessary in the Gulf, and it converts the very first interaction into a hostage negotiation.

## Differentiation moves

- 'WE DON'T ASK FOR YOUR PASSPORT TO SELL YOU A HOLIDAY.' Make passport-free booking an explicit, stated product promise, with document collection deferred to a secure link at T-minus 21 days. It is legally superior, it strips six fields off checkout, and it is a marketing line no competitor can copy without rebuilding their booking flow.
- A 'WHAT WE ASK, WHEN, AND WHY' TIMELINE PAGE. A single designed page showing every data field the site will ever request, mapped to the exact step it is requested at, why it is needed, who sees it, and when it is deleted. Nobody in travel publishes this. It is the most screenshot-able privacy artefact available and it costs one page to build.
- PRICE-LOCK BADGE WITH A LIVE BREAKDOWN DRAWER. Every price everywhere is the all-in total, with a small persistent 'Final price — nothing added later' mark and a drawer that itemises taxes, fees and supplements. In a market defined by drip pricing this is an unfakeable claim, and it survives the CMA-style transparency tightening that is squeezing everyone else.
- A CONSENT BANNER THAT LOOKS DESIGNED. Bilingual, RTL-correct, self-hosted, zero layout shift, two equal-weight buttons, tuned to the visitor's jurisdiction. Because the category norm is a grey vendor modal with a tricked reject link, a consent banner that is visibly part of the brand is genuinely novel — and it is the first thing a design-literate visitor sees, which makes it the highest-leverage 10 KB on the site.
- A DATE-AWARE CANCELLATION CALCULATOR ON THE PACKAGE PAGE. Enter your departure date, see your exact refund position on any given day as a table. Converts the most anxiety-laden question in package travel into an interactive, shareable answer, and satisfies the 'reasonable standardised fees' standard by construction.
- A PUBLIC TRUST PAGE. Operating licence and registration, insolvency/financial protection, the payment processor used, the country the database sits in, what the site never stores, breach contact, and a dated changelog for the privacy notice. Treat legal transparency as a designed page rather than a footer obligation — it is the page journalists, forums and cautious buyers link to.
- SENSITIVE-CARE PANEL AS A HOSPITALITY FEATURE, NOT A FORM FIELD. Reframe the legally-fraught dietary and accessibility inputs as an optional, warmly-written 'How can we look after you?' step with explicit consent and a stated deletion date. The compliant design is also the more human one — an unusual case where the lawyer's answer and the brand's answer are identical.
- VERSIONED, DIFFABLE LEGAL DOCUMENTS. Publish the privacy notice and booking terms with version numbers and a visible changelog of what changed and when. Cheap to build on the existing stack, near-unheard-of in travel, and it makes the stored consent record meaningful.
- ARABIC-FIRST LEGAL COPY. Write the privacy and terms copy in Arabic first for the primary market and translate outward, rather than the reverse. It changes the register of the whole document and it is immediately legible to the audience as a site built for them rather than localised at them.

## Open questions

- Travel licence display: I could not source the specific Saudi Ministry of Tourism or UAE (DET/DoT) requirement to display a tourism/travel-agency licence number on a website — both official sites returned 403. This must be verified before launch, because it is likely a mandatory on-page disclosure and it is also a strong trust element. No sourced requirement found.
- Saudi E-Commerce Law (2019) trader-disclosure obligations — name, address, commercial registration number, terms display, withdrawal rights — could not be sourced (laws.boe.gov.sa refused connection). Likely to impose concrete footer and checkout disclosure requirements. Needs verification.
- DIFC Data Protection Law No. 5 of 2020 and ADGM Data Protection Regulations 2021 specifics could not be retrieved (difc.ae returned 403, dp.difc.ae had a TLS certificate mismatch). These only bite if the operating entity is established in those free zones — a question for the operator before the master doc fixes a position.
- Oman's Personal Data Protection Law (Royal Decree 6/2022) and its Executive Regulations could not be sourced in this session. Reportedly stricter on consent form than its neighbours; verify before marketing into Oman.
- UAE PDPL Executive Regulations were still unpublished as of January 2025 per DLA Piper. Their publication starts a six-month compliance clock and may change consent, transfer and breach mechanics. Re-check at build time.
- The Package Travel Directive's refund timeline (commonly cited as 14 days) could not be confirmed from the regulation text I retrieved — regulation 12 of the UK implementation contains no day count. No sourced figure found; verify before publishing any refund-timing promise.
- Whether Supabase has added a Middle East region since the documentation read on 2026-08-22. If me-central-1 becomes available it materially changes the residency and latency calculus and the region decision should be revisited.
- Whether the operator intends to actively target EU/UK residents (EUR pricing, European-language pages, EU remarketing). This single answer determines whether the full EEA consent gate, Consent Mode v2, and Article 9 explicit-consent machinery are in scope or merely defensive.
- The precise mechanics required by the Saudi Transfer Regulations — whether a formal transfer risk assessment must be documented and whether SDAIA registration on the National Data Governance Platform applies to this entity, and at what threshold.
- The detailed content of CMA209 price transparency guidance: only the publication landing page was retrieved, not the guidance itself. The specific rules on 'from' prices, per-person pricing and optional-fee presentation should be read in full before finalising the pricing UI.
- Whether the EDPB Cookie Banner Taskforce report's substantive positions (adopted 18 January 2023) add anything beyond the noyb pattern list — the report PDF could not be text-extracted and only its adoption date was confirmed.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — Saudi PDPL defines Sensitive Data to include religious belief, health, location, credit, ethnic/tribal origin, biometric/genetic data.

Verified beyond the single aggregator. PDPL Article 1 definition reads: 'every personal data that includes a reference to an individual's ethnic or tribal origin, or religious, intellectual or political belief... as well as criminal and security data, biometric data, genetic data, credit data, health data, location data, and data that indicates that both parents of an individual or one of them is unknown.' Confirmed at https://saudiprivacylaw.com/saudi-pdpl-article-1-definitions-and-terminology/ and https://www.dlapiperdataprotection.com/?t=definitions&c=SA. The design inference (dietary/accessibility/geolocation fields are sensitive-data processing) follows.

### PARTIALLY_TRUE — PDPL effective 14 Sep 2023, compliance by 14 Sep 2024, actively enforced by SDAIA, 72-hour breach notice, warnings to SAR 5m, up to 2 years + SAR 3m for intentional disclosure of sensitive data, doubling for repeats.

Dates, SDAIA enforcement, 72-hour notice via the National Data Governance Portal all confirmed (https://www.dlapiperdataprotection.com/index.html?t=law&c=SA). Penalty split confirmed but mis-stated: Article 36 is the administrative track (warnings, fines to SAR 5m per violation); Article 35 is criminal and requires an additional mental element — disclosure/publication of sensitive data 'with the intention of harming the data subject or achieving personal benefit' — punishable by up to 2 years OR up to SAR 3m OR both. 'Intentional disclosure' alone does not trigger it. Enforcement is now concrete: IAPP (25 Feb 2026) reports 48 SDAIA committee decisions in the preceding year — https://iapp.org/news/a/saudi-arabia-s-data-protection-authority-steps-up-enforcement

Corrected: The PDPL took effect 14 September 2023 with compliance required by 14 September 2024, and SDAIA is now actively enforcing it — 48 violation decisions were issued in the year to February 2026. Breaches go to SDAIA within 72 hours via the National Data Governance Portal. Administrative penalties under Article 36 run from warnings to SAR 5 million per violation; Article 35 adds a criminal offence of up to 2 years' imprisonment and/or up to SAR 3 million for disclosing or publishing sensitive data with intent to harm the data subject or gain personal benefit, with fines doubled on repeat.

### PARTIALLY_TRUE — No KSA legislation specifically regulates cookies; UAE PDPL does not expressly address cookies; consent flows from general personal-data rules, not an ePrivacy-style regime.

The literal statements are accurate and quoted correctly from DLA Piper's KSA and UAE pages. But the design conclusion drawn in the summary is not supported. Saudi Arabia's Digital Government Authority has published non-binding Guidelines for the Use of Cookies and Similar Technologies stressing transparency, consent and user control, and cookies that collect personal data fall squarely under PDPL's opt-in consent requirement. SDAIA's enforcement record makes this live: 'a notable number of cases involved the sending of marketing and promotional messages without obtaining prior consent' (IAPP, 25 Feb 2026). See also https://cms.law/en/are/legal-updates/new-sdaia-rules-and-guidelines-published-as-ksa-s-personal-data-protection-framework-is-now-enforceable. 'No cookie statute' is not 'no consent obligation'.

Corrected: Neither KSA nor the UAE has ePrivacy-style cookie legislation, so the specific EU artefact — a blocking consent wall gating page load on cookie storage — is not legally required in the GCC. But consent obligations still attach: cookies that collect personal data are processing under the PDPL, which requires opt-in consent; the Saudi Digital Government Authority has issued non-binding cookie guidelines on transparency, consent and user control; and marketing without prior consent is among the most frequently penalised violations in SDAIA's 2025-26 enforcement wave. The correct design move is a lighter, non-blocking, granular consent surface plus a real marketing opt-in — not the absence of consent UI.

### PARTIALLY_TRUE — Supabase hosts in 16 AWS regions, none in the Middle East; docs say Middle East regions 'are not currently supported'. Vercel offers dxb1/me-central-1 Dubai among 20 regions.

Substance right, details wrong. https://supabase.com/docs/guides/platform/regions lists 17 AWS regions, not 16, and contains no Middle East region — but it also contains no sentence saying Middle East regions 'are not currently supported'. That quote is not in the source and should be dropped. Vercel fully confirmed at https://vercel.com/docs/regions (last updated 2026-03-05): 20 compute regions including dxb1 / me-central-1 / Dubai, 126 PoPs, iad1 default, and verbatim 'Functions should be executed in the same region as your database, or as close to it as possible, for the lowest latency.'

Corrected: Supabase projects can be hosted in 17 AWS regions, none of them in the Middle East (no me-south-1 Bahrain, no me-central-1 UAE); the docs simply omit the region rather than stating it is unsupported. Vercel, by contrast, offers dxb1 / me-central-1 / Dubai among its 20 compute regions, defaults new projects to iad1 (Washington DC), and advises running functions in the same region as the database.

### CONFIRMED — KSA cross-border transfers permitted to countries with protection no less than PDPL or under safeguards, must not compromise national security or vital interests, limited to minimum data needed.

Confirmed and materially expanded by King & Spalding, https://www.kslaw.com/news-and-insights/international-personal-data-transfers-under-saudi-arabias-data-protection-law. The Transfer Regulations were issued August 2024. Three Additional Conditions: no prejudice to national security or vital interests of KSA; importer in a jurisdiction SDAIA deems to afford an adequate level of protection; data minimisation. Critically, SDAIA has not yet published its adequacy list, and in February 2025 SDAIA published a Risk Assessment Guideline for Transferring Personal Data Outside the Kingdom requiring a documented pre-transfer assessment. The obligation is heavier than the claim implies.

Corrected: Under the Transfer Regulations (August 2024), KSA cross-border transfers require an adequate-protection jurisdiction as determined by SDAIA or appropriate safeguards (Saudi SCCs, BCRs, certificates), must not prejudice national security or the vital interests of KSA, and must observe data minimisation. SDAIA has not yet published an adequacy list, and its February 2025 Risk Assessment Guideline requires a documented transfer risk assessment before data leaves the Kingdom — so hosting the database outside KSA is a documented-compliance workstream, not a disclosure line.

### CONFIRMED — GDPR Art 3(2) applies to non-EU controllers offering goods/services to EU data subjects irrespective of payment, or monitoring behaviour in the Union.

Article 3(2)(a) and (b) verified verbatim at https://gdpr-info.eu/art-3-gdpr/. Regulation (EU) 2016/679 in force since 25 May 2018, unamended on this point.

### CONFIRMED — GDPR Art 9(1) prohibits processing of data 'revealing... religious or philosophical beliefs' and 'data concerning health' unless an Art 9(2) condition applies, most relevantly explicit consent; the prohibition attaches to data that reveals, not only states.

Verified verbatim at https://gdpr-info.eu/art-9-gdpr/. Art 9(1) reads 'Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data... data concerning health...shall be prohibited.' Art 9(2)(a) exception for explicit consent 'for one or more specified purposes' confirmed. The 'revealing' framing is correct and is what makes halal-meal and mobility fields in-scope.

### CONFIRMED — GDPR Art 7(3) requires withdrawal to be as easy as giving consent; Art 25(2) requires by-default processing of only necessary data across amount, extent, storage period and accessibility.

Verified at https://gdpr-info.eu/art-7-gdpr/ and https://gdpr-info.eu/art-25-gdpr/. Art 25(2) expressly covers 'the amount of personal data collected, the extent of their processing, the period of their storage and their accessibility'.

### CONFIRMED — noyb cookie-banner audit percentages; withdrawal least-remedied at 18%, described as 'the biggest obstacle for compliance'.

All five figures verified verbatim at https://noyb.eu/en/noyb-files-422-formal-gdpr-complaints-nerve-wrecking-cookie-banners — 516 sites warned 31 May 2021, 42% added reject, 68% removed pre-ticked boxes, 46% fixed colour/contrast, 22% dropped legitimate interest, 18% added withdrawal, and 'biggest obstacle for compliance' appears as quoted. 422 complaints across ten countries. Minor wording note: the source says 18% 'added withdrawal options' rather than 'made withdrawal as easy as giving consent'.

### PARTIALLY_TRUE — EDPB Opinion 08/2024 adopted 17 April 2024, scoped to large online platforms, corrigendum October 2024; reasoning on granularity, deceptive design, detriment is general.

Adoption date 17 April 2024, scope (consent or pay by large online platforms) and the corrigendum (12 October 2024) all confirmed at https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-082024-valid-consent-context-consent-or_en. The specific internal quotations on granularity, deceptive design patterns, detriment and 'equivalent alternative' could not be independently verified from the landing page; the claim's evidence asserts extraction from the PDF but I could not confirm the wording. Treat the quoted strings as unverified. The scope caveat also matters more than the claim allows: this is an Article 64(2) opinion about large online platforms running consent-or-pay, and a travel agency site is not the addressee.

Corrected: EDPB Opinion 08/2024 on consent or pay was adopted 17 April 2024 with a corrigendum on 12 October 2024, and is expressly scoped to large online platforms. Its general restatements of valid-consent doctrine — granularity, no deceptive design patterns, no detriment — are useful design guidance but should be cited as EDPB consent doctrine generally rather than as binding on a site of this kind, and the specific quoted passages should be re-checked against the PDF before they appear in a deliverable.

### CONFIRMED — Google's EU User Consent Policy covers EEA, UK and Switzerland; requires consent for cookies/local storage and ad personalisation, retention of consent records, clear revocation instructions; non-compliance can limit/suspend/terminate access.

All elements verified verbatim at https://www.google.com/about/company/user-consent-policy/, including 'If you fail to comply with this policy, we may limit or suspend your use of the Google product and/or terminate your agreement.'

### CONFIRMED — Consent Mode v2 added ad_user_data and ad_personalization in November 2023; requires default (all denied) before any Google tag, update on choice, wait_for_update for async CMPs, optional ads_data_redaction.

Verified at https://developers.google.com/tag-platform/security/guides/consent — 'Consent mode was updated in November, 2023 and now contains two additional parameters.' Four primary signals (ad_storage, ad_user_data, ad_personalization, analytics_storage) plus wait_for_update, url_passthrough, ads_data_redaction and region confirmed. No post-November-2023 version change found, so the claim is current as of 2026-08-22.

### CONFIRMED — web.dev/Chrome guidance: cookie notices are a common CLS source, a frequent INP cause via the Accept button, occasionally the mobile LCP element; fixes include reserved space, footer placement, async in HTML not via tag manager, resource hints, self-hosting.

Verified at https://web.dev/articles/cookie-notice-best-practices — last updated 13 June 2024, by Katie Hempenius and Barry Pollard. It does discuss INP (not the retired FID), states 'Cookie consent notices are a very common source of layout shifts', and attributes INP problems to 'the large amount of processing that happens when it's clicked' on the Accept button. All six recommendations confirmed.

### CONFIRMED — PCI DSS v4.0.1 published 11 June 2024, future-dated requirements effective 31 March 2025; SAQ A for PSP-iframe integrations, SAQ A-EP for self-hosted forms, SAQ D for direct API with 300+ controls.

Dates verified at https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1 (published 11 June 2024; v3.2.1 retired 31 March 2024; effective date for new requirements unchanged at 31 March 2025). SAQ mapping verified at https://stripe.com/guides/pci-compliance — Checkout/Elements host card inputs 'within an iframe served from Stripe's domain (not yours)' for SAQ A; Stripe.js v2 with a form on your own site requires SAQ A-EP; passing card data directly to the API requires SAQ D. The 300+ figure is confirmed at https://docs.stripe.com/security/guide as 'more than 300 security controls' for businesses handling sensitive card data directly.

### PARTIALLY_TRUE — 3DS is mandatory under SCA/PSD2 in the EEA and equivalent regimes in UK, India, Japan, Australia, optional elsewhere; Stripe CSP requires hooks.stripe.com as frame-src for 3DS.

CSP requirement confirmed verbatim at https://docs.stripe.com/security/guide: 'If you're using a payment method with redirect functions (for example, cards that might require 3D Secure or iDeal), include https://hooks.stripe.com as a frame-src directive.' But https://docs.stripe.com/payments/3d-secure does not say 3DS is mandatory — it says SCA 'might require using 3DS for card payments' and 'is optional in other regions'. SCA is the mandate; 3DS is the usual method of satisfying it, and Stripe maintains a dedicated SCA Exemptions page (low-value, TRA, merchant-initiated). Designing the flow as if every EEA card payment will be challenged is wrong.

Corrected: Strong Customer Authentication has been a regulatory requirement since 14 September 2019 under PSD2 in the EEA, with similar regimes in the UK, India, Japan and Australia; 3-D Secure is the usual way to satisfy it, but exemptions (low value, transaction risk analysis, merchant-initiated) mean not every payment is challenged, and 3DS is optional elsewhere as a fraud tool. When the issuer does challenge, it may use a password, a one-time code or biometric verification. Stripe's CSP guidance requires https://hooks.stripe.com as a frame-src for redirect-based methods including 3DS.

### CONFIRMED — Supabase: tables in exposed schemas without RLS are readable/writable by any role with a grant; new tables get automatic anon/authenticated/service_role grants; policies don't remove grants; service_role has bypassrls; legacy keys deprecated by end of 2026.

Verified verbatim at https://supabase.com/docs/guides/database/postgres/row-level-security ('A table in an exposed schema without RLS is readable and writable by any role with a grant on it'; 'Adding policies doesn't remove them'; service_role bypassrls). Key deprecation verified verbatim at https://supabase.com/docs/guides/api/api-keys: legacy keys 'will be deprecated by the end of 2026, and you should now use the publishable (sb_publishable_xxx) and secret (sb_secret_xxx) keys instead.' Still current as of 2026-08-22 — roughly four months of runway left, which makes this urgent rather than advisory. One addition the claim omits: secret keys are additionally blocked in-browser by User-Agent matching (HTTP 401), which the docs explicitly warn is not a real defence.

### CONFIRMED — auth.uid() returns null for unauthenticated requests so policies fail closed; best practice is explicit null check, (select auth.uid()) wrapping, and indexes on policy-filtered columns; Storage allows no uploads without RLS policies; per-user folders via auth.jwt()->>'sub'.

Verified at https://supabase.com/docs/guides/database/postgres/row-level-security and https://supabase.com/docs/guides/storage/security/access-control. Index guidance confirmed verbatim: 'Add an index on every column your policies filter on. Postgres evaluates the policy against each candidate row, so an unindexed filter column turns a read into a sequential scan.' The (select auth.uid()) initPlan caching optimisation is confirmed.

### CONFIRMED — NEXT_PUBLIC_ variables are inlined into the browser bundle at build time and frozen at build; non-prefixed variables are server-only. The repo already has a commit prefixing browser-facing env vars.

Verified at https://nextjs.org/docs/app/guides/environment-variables (version 16.3.2, lastUpdated 2026-03-03): 'Non-NEXT_PUBLIC_ environment variables are only available in the Node.js environment'; NEXT_PUBLIC_ values are inlined at build time 'into any JavaScript sent to the browser'; 'all NEXT_PUBLIC_ variables will be frozen with the value evaluated at build time'. Repo commit confirmed locally: 9c3d732 'Prefix browser-facing env vars with NEXT_PUBLIC_'. Worth adding: dynamic lookups such as process.env[varName] are NOT inlined, a common source of undefined-at-runtime bugs.

### CONFIRMED — EU/UK package travel requires 17 categories of pre-contractual information; price increases only for defined cost rises with 20 days' notice; increase above 8% lets the traveller cancel without penalty.

Schedule 1 of the Package Travel and Linked Travel Arrangements Regulations 2018 verified at https://www.legislation.gov.uk/uksi/2018/634/schedule/1/made — exactly 17 enumerated categories, including item 12 (total price inclusive of taxes and all additional fees, or an indication of unquantifiable additional costs), item 10 (suitability for persons with reduced mobility), item 15 (passport, visa and health formalities), item 16 (right to terminate against a termination fee) and item 17 (optional or compulsory insurance). Regulation 10 confirms notice at the latest 20 days before the start and the 8% threshold triggering regulation 11 cancellation rights. Scope caveat: this binds organisers established in or selling into the UK/EU, so for a Saudi-market operator it is a voluntary content spec rather than a legal obligation unless UK/EU travellers are targeted.

### CONFIRMED — Traveller may terminate before the start against reasonable standardised fees based on timing and expected cost savings; free termination for unavoidable and extraordinary circumstances with full refund but no compensation; absent standardised fees, price minus cost savings and income from alternative deployment.

Regulation 12 verified verbatim at https://www.legislation.gov.uk/uksi/2018/634/regulation/12/made — 12(4) standardised fees based on time of termination and expected cost savings and income from alternative deployment; 12(5) the residual formula; 12(7) unavoidable and extraordinary circumstances at the destination significantly affecting performance or carriage; 12(8) full refund but no additional compensation.

### CONFIRMED — UK CMA published price transparency guidance CMA209 on 18 November 2025, updated 7 January 2026, covering total price, mandatory charges, drip pricing and partitioned pricing under the DMCC Act 2024; CMA207 updated the same day.

Verified at https://www.gov.uk/government/publications/price-transparency-cma209 — published 18 November 2025, last updated 7 January 2026, 58-page PDF plus an HTML summary 'Providing clear and accurate information about prices' added 7 January 2026. Drip pricing, partitioned pricing and mandatory-charge coverage confirmed. The landing page does not itself name the DMCC Act 2024, though that is the operative regime. The researcher's own honesty flag stands: nobody has read the actual 58 pages, so no specific rule from inside CMA209 should be quoted in the deliverable yet.

### CONFIRMED — Baymard 2024: average checkout has 11.3 form fields (down from 11.8 in 2021, 12.7 in 2019), most sites need only 8, and 17% of users have abandoned due to checkout complexity.

All four figures verified at https://baymard.com/blog/checkout-flow-average-form-fields, published 26 June 2024. Attribution to Baymard is genuine, not invented. Staleness note only: the benchmark is now two years old and no newer Baymard field-count figure was found, so cite it as the 2024 benchmark rather than as a current-state fact.

### PARTIALLY_TRUE — Kuwait CITRA bilingual/consent rules; Egypt Law 151/2020 licensing and three-year marketing consent records; Qatar Law 13/2016 affirmative explicit unambiguous consent for e-marketing; Bahrain Law 30/2018 permits transfers to 83 pre-approved countries and requires 72-hour breach notification.

Only the Bahrain breach-notification element was independently verified: controllers must notify the PDPA within 72 hours of becoming aware unless the breach is unlikely to affect data subjects' rights, with notification to individuals where high risk (https://www.dlapiperdataprotection.com/?t=breach-notification&c=BH). The '83 pre-approved countries' figure could not be independently corroborated — the operative instrument is Resolution No. 42 of 2022, and no source I could reach states the number 83. The Kuwait, Egypt and Qatar particulars rest on a single aggregator and were not independently checked. The researcher's own staleness flag on the 2016 and 2018 laws is appropriate and should be widened to include Kuwait and Egypt.

Corrected: Bahrain's Law 30/2018 requires breach notification to the PDPA within 72 hours of awareness, and permits transfers to a list of pre-approved countries set out in Resolution No. 42 of 2022 (the exact count is not independently verified). The Kuwait CITRA, Egypt 151/2020 and Qatar 13/2016 particulars come from a single secondary aggregator and must be re-verified against each regulator before any of them shapes a design decision.

### STALE — UAE PDPL Executive Regulations still unpublished as of January 2025 with a six-month compliance window to follow; PDPL specifies no penalties; Cyber Crime Law imposes AED 50,000-500,000; e-marketing is opt-in under the 2023 Trading by Modern Technological Means Law and Cabinet Decision 56/2024.

The source says exactly this, but the source is out of date and the claim presents a January 2025 snapshot as the August 2026 state of the world. https://www.dlapiperdataprotection.com/countries/uae-general/law.html carries a last-modified date of 27 January 2025 and its statement is explicitly pinned 'as of 6 January 2025'. Multiple 2026 secondary sources now assert that implementing rules exist (variously attributed to Cabinet Decision No. 33 of 2024) and reference a compliance horizon of 1 January 2027; I could not confirm this against a primary or top-tier legal source, so the position is genuinely unresolved rather than settled either way. The Cyber Crime Law Article 13 range of AED 50,000-500,000 and the opt-in marketing model under Cabinet Decision 56/2024 are confirmed on the same page.

Corrected: UAE electronic marketing is opt-in, reinforced by the TDRA Unsolicited Electronic Communications Regulation, the 2023 Trading by Modern Technological Means Law and Cabinet Decision No. 56/2024, and the Cyber Crime Law imposes AED 50,000-500,000 for unlawful collection and processing. The status of the PDPL Executive Regulations is unresolved: the commonly cited source is current only to January 2025, and several 2026 sources assert implementing rules now exist. This must be re-checked against a primary UAE source before any UAE-facing design or contractual decision is made.

### CONFIRMED — Supabase production checklist: RLS on all tables, SSL enforcement, network restrictions, MFA, email confirmations, OTP expiry <=3600s, custom SMTP, CAPTCHA, PITR over 4 GB; private tables in non-exposed schemas; SECURITY DEFINER functions reviewed individually because RLS does not apply inside them.

Consistent with https://supabase.com/docs/guides/deployment/going-into-prod and the RLS/API security docs verified above. The SECURITY DEFINER caveat is the substantive one and is correct — such functions execute with the definer's privileges and bypass the caller's RLS context, so an unreviewed helper function is a direct hole through the security model the rest of the design depends on.

### Corrections applied

- Supabase lists 17 AWS regions, not 16, and none are in the Middle East. The docs simply omit Middle East regions — they contain no sentence saying Middle East regions 'are not currently supported'. Drop that quotation; it is not in the source.
- Add an availability risk the dimension never raises: Supabase has been network-blocked at the ISP level three times in the last year — the UAE TDRA had Etisalat and Du block *.supabase.co from 2 September 2025 for about 18 days, Yemen's YemenNet blocked it 2-10 February 2026, and India's MeitY blocked supabase.co under Section 69A from 24 February to 3 March 2026. For a travel site selling into the Gulf, this is a first-class availability risk, not a footnote (https://supabase.com/blog/navigating-regional-network-blocks).
- Rewrite the cookie posture. 'No ePrivacy-style cookie statute in the GCC' is true, but it does not make consent UI unnecessary. Cookies that collect personal data are PDPL processing requiring opt-in consent; Saudi's Digital Government Authority has issued non-binding Guidelines for the Use of Cookies and Similar Technologies covering transparency, consent and user control; and marketing without prior consent is among the most frequently penalised violations in SDAIA's 48 enforcement decisions to February 2026. The design conclusion should be 'lighter, non-blocking, granular consent plus a real marketing opt-in', not 'no consent wall'.
- Correct the PDPL penalty structure: Article 36 is administrative (warnings up to SAR 5 million per violation); Article 35 is criminal and requires intent to harm the data subject or obtain personal benefit — up to 2 years and/or up to SAR 3 million. Mere intentional disclosure does not meet the Article 35 threshold.
- Upgrade the cross-border transfer analysis. The Transfer Regulations were issued in August 2024 with three Additional Conditions (no prejudice to national security or vital interests, adequate-protection jurisdiction as determined by SDAIA, data minimisation), SDAIA has not yet published an adequacy list, and its February 2025 Risk Assessment Guideline requires a documented pre-transfer risk assessment. Hosting outside KSA is therefore a documented compliance workstream with Saudi SCCs, not a privacy-policy disclosure line.
- Soften the 3DS claim: SCA is the mandate, 3DS is the usual method of meeting it. Stripe's own docs say SCA 'might require' 3DS and maintain a dedicated SCA Exemptions page (low value, transaction risk analysis, merchant-initiated). Do not design the checkout on the assumption that every EEA card payment is challenged.
- Flag the UAE Executive Regulations position as unresolved rather than settled. The cited source is current only to 27 January 2025; several 2026 sources assert implementing rules now exist. Re-verify against a primary UAE source before it drives anything.
- Drop or qualify the Bahrain '83 pre-approved countries' figure — it could not be independently corroborated. The operative instrument is Resolution No. 42 of 2022.
- Treat the EDPB Opinion 08/2024 internal quotations as unverified pending a read of the PDF, and note its scope is expressly large online platforms running consent-or-pay, not a travel agency site.
- Note the package travel regime binds organisers established in or selling into the UK/EU. For a Saudi-market operator it is an excellent voluntary content spec — which is the researcher's actual point — but it should not be presented as a legal obligation on this project.

### Flagged as not covered

- The Saudi E-Commerce Law (2019) and its Implementing Regulations (in force 31 January 2020) — the single most directly website-visible legal regime for this project, and entirely absent. It requires the e-store to publish the provider's name, address and contact details, commercial registration and VAT number, and a privacy policy; requires prior consent before using consumer data for marketing plus a means to stop electronic advertisements; forbids retaining personal and electronic communication data beyond the transaction period; requires breach reporting to the Ministry of Commerce within three days (a second, shorter clock than the PDPL's 72 hours to SDAIA); and carries fines up to SAR 1 million plus suspension or blocking of the store. Maroof registration is part of the same compliance surface.
- The 7-day e-commerce right of return under Saudi law — and, crucially, that accommodation and transport purchases are exempt from it. This is a direct, checkable design decision about what the cancellation copy on a booking page may and may not promise, and it is nowhere in the dimension.
- The European Accessibility Act, applicable since 28 June 2025, covering e-commerce and passenger transport services and reaching non-EU businesses that sell to EU consumers, with EN 301 549 (incorporating WCAG 2.1 AA) as the presumption-of-conformity standard. For a UI/UX research document this is a glaring omission — and it is sharply ironic that the dimension discusses a 'wheelchair access checkbox' as sensitive data without noting that the site collecting it is itself legally required to be accessible.
- Regulation (EC) No 1008/2008 Article 23 on air fare price transparency: the final price must be indicated at all times and include the fare plus all unavoidable and foreseeable taxes, airport charges, surcharges and fees, broken out into those four components, from the first time a price is shown; optional supplements must be communicated clearly at the start of the booking process and accepted on a strict opt-in basis. For a travel agency this is a far more precise and more directly applicable anchor for 'total-price-first' than CMA209, and it forbids pre-ticked ancillaries outright.
- SDAIA's actual published guidance set (September 2024), which the dimension never mentions despite building its whole argument on Saudi law: the Elaboration and Developing Privacy Policy Guideline (prescribes required privacy-policy elements including phone number, website and postal address), the Rules Governing the National Register of Controllers (registration on the National Data Governance Platform for controllers whose main activity is personal data processing), the Minimum Personal Data Determination Guideline (a Saudi-sourced basis for the progressive-disclosure recommendation, which is currently argued only from GDPR Article 25), the DPO appointment rules, and the Saudi Standard Contractual Clauses.
- SDAIA's enforcement pattern as design input. 48 decisions in the year to February 2026, concentrated on processing without lawful basis, inadequate security controls, collection beyond stated purposes, and — most frequently flagged — marketing messages sent without prior consent. That is an empirical priority ordering for where consent UI actually matters in this market, and it points at the newsletter and WhatsApp opt-in, not the cookie banner.
- Whether the RTL/Arabic requirement is legal as well as aesthetic. The dimension notes Kuwait's bilingual rule in passing but never asks the equivalent question for the operator's primary market, despite the whole document turning on KSA.
- Data residency alternatives. Having established that Supabase has no Middle East region, the dimension stops at 'disclose it' and never evaluates the options — self-hosted Supabase on AWS me-central-1 or me-south-1, third-party managed Supabase with UAE or KSA residency, or splitting sensitive traveller records into an in-region store while keeping the rest on Supabase. Given that the KSA transfer regime now demands a documented risk assessment, this is the decision the architecture section should be making.
- Payment provider fit for the market. The dimension covers PCI scope and 3DS mechanics in detail but never asks whether the chosen PSP operates in the operator's primary market or supports locally dominant payment methods, which determines whether the iframe-based SAQ A path is even available.
- Consent record-keeping as a data-model requirement. Google's policy requires retaining consent records, KSA requires documented consent, and Egypt reportedly requires three-year marketing consent records — yet the dimension's data-model recommendations (RLS, progressive disclosure, quarantined sensitive fields) contain no consent-receipt table, no versioned policy text, and no withdrawal audit trail.

## Sources

- [Data Protection Laws of the World — Saudi Arabia](https://www.dlapiperdataprotection.com/index.html?t=law&c=SA) · DLA Piper · Accessed 2026-08-22; page states enforcement status as of February 2026  
  PDPL effective and compliance dates, active SDAIA enforcement, verbatim Sensitive Data definition (religion, health, location, credit), cross-border transfer conditions and minimisation, National Data Governance Platform registration, DPO triggers, 72-hour breach notification, penalties, and the absence of cookie-specific legislation in KSA.
- [Data Protection Laws of the World — United Arab Emirates](https://www.dlapiperdataprotection.com/index.html?t=law&c=AE) · DLA Piper · Accessed 2026-08-22; Executive Regulations status as of 2025-01-06  
  Federal Decree-Law 45/2021 status, unpublished Executive Regulations and six-month compliance window, consent exceptions, absence of heightened sensitive-data controls, DPO triggers, breach timing, penalty position, opt-in electronic marketing under TDRA rules, the 2023 Trading by Modern Technological Means Law and Cabinet Decision 56/2024, and the preservation of DIFC/ADGM regimes.
- [Data Protection Laws of the World — Qatar, Bahrain, Kuwait, Egypt](https://www.dlapiperdataprotection.com/index.html?t=law&c=KW) · DLA Piper · Accessed 2026-08-22  
  Qatar Law 13/2016 sensitive categories and explicit marketing consent; Bahrain Law 30/2018 pre-approved transfer countries, 72-hour breach rule and criminal penalties; Kuwait CITRA Administrative Decision 26/2024 bilingual English/Arabic requirement, explicit consent and withdrawal; Egypt Law 151/2020 licensing/permit requirement from the Personal Data Protection Centre, marketing consent records for three years, and breach timelines.
- [Supabase documentation — Row Level Security, API keys, Storage access control, Production checklist, Securing your API, Regions](https://supabase.com/docs/guides/database/postgres/row-level-security) · Supabase · Accessed 2026-08-22  
  RLS as the actual access control for a browser-exposed API; automatic grants to anon/authenticated/service_role; publishable vs secret key semantics and the end-of-2026 legacy key deprecation; auth.uid() null behaviour, (select auth.uid()) optimisation and policy indexing; storage bucket policies and per-user folder restriction; production security checklist including CAPTCHA, OTP expiry, custom SMTP and the 2-emails-per-hour default; private schemas and SECURITY DEFINER caveats; and the absence of any Middle East hosting region.
- [How to use environment variables in Next.js](https://nextjs.org/docs/app/guides/environment-variables) · Vercel / Next.js · Docs version 16.3.2, last updated 2026-03-03  
  That NEXT_PUBLIC_ variables are inlined into the browser bundle at build time and frozen at build, that non-prefixed variables are server-only, and the resulting hard rule about which keys may carry the prefix.
- [Global network and regions / Configuring regions for Vercel Functions](https://vercel.com/docs/regions) · Vercel · Last updated 2026-03-05 (regions) and 2026-07-15 (function regions)  
  The 20-region compute list including dxb1 (me-central-1, Dubai), the iad1 default for new projects, and the guidance to co-locate functions with the database — the basis for the region decision given Supabase has no Middle East region.
- [PCI DSS v4.0.1 publication announcement](https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1) · PCI Security Standards Council · 2024-06-11  
  PCI DSS v4.0.1 publication date, v3.2.1 retirement on 2024-03-31, v4.0 retirement on 2024-12-31, and the 2025-03-31 effective date for future-dated requirements including 6.4.3 payment-page script management and 11.6.1 tamper detection.
- [Integration security guide / PCI compliance guide / 3D Secure authentication](https://docs.stripe.com/security/guide) · Stripe · Accessed 2026-08-22  
  SAQ A vs SAQ A-EP vs SAQ D by integration type; card data never touching your servers with hosted fields; out-of-scope storable fields (brand, last four, expiry); TLS 1.2+ requirement; exact CSP directives including hooks.stripe.com as frame-src for 3DS redirects; the warning that third-party JavaScript makes your security dependent on theirs; and SCA/PSD2 applicability in the EEA, UK, India, Japan and Australia.
- [GDPR Articles 3, 7, 9 and 25](https://gdpr-info.eu/art-9-gdpr/) · Regulation (EU) 2016/679, reproduced at gdpr-info.eu · In force since 2018-05-25; accessed 2026-08-22  
  Article 3(2) territorial scope via targeting and monitoring; Article 7(3) withdrawal as easy as giving consent and 7(4) conditionality; Article 9(1) prohibition on data 'revealing' religious belief and on health data, with 9(2)(a) explicit consent; Article 25(2) data protection by default covering amount, extent, storage period and accessibility.
- [Opinion 08/2024 on Valid Consent in the Context of Consent or Pay Models Implemented by Large Online Platforms](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-082024-valid-consent-context-consent-or_en) · European Data Protection Board · Adopted 2024-04-17 (corrigendum October 2024)  
  The current EDPB position on freely given consent: granularity rather than bundled purposes, the prohibition on deceptive design patterns, detriment and imbalance of power, conditionality, and the 'equivalent alternative' concept in consent-or-pay models.
- [noyb files 422 formal GDPR complaints on nerve-wrecking cookie banners](https://noyb.eu/en/noyb-files-422-formal-gdpr-complaints-nerve-wrecking-cookie-banners) · noyb — European Center for Digital Rights · Accessed 2026-08-22; campaign began May 2021  
  The concrete catalogue of banner violations (no first-layer reject, pre-ticked boxes, accept/reject colour contrast, false legitimate-interest claims, hard withdrawal) and the remediation statistics, including that only 18% made withdrawal as easy as consent.
- [EU User Consent Policy](https://www.google.com/about/company/user-consent-policy/) · Google · Accessed 2026-08-22  
  Contractual consent obligations for EEA, UK and Switzerland traffic: consent for cookies/local storage and for personal data used in ad personalisation, retention of consent records, clear revocation instructions, party identification, and the enforcement consequence of product suspension.
- [Consent mode (Tag Platform security guides)](https://developers.google.com/tag-platform/security/guides/consent) · Google · Consent mode v2 parameters added November 2023; accessed 2026-08-22  
  The consent signal set, the ad_user_data and ad_personalization additions in v2, default vs update commands, wait_for_update for asynchronous consent tools, ads_data_redaction, and EEA-focused enforcement.
- [Best practices for cookie notices](https://web.dev/articles/cookie-notice-best-practices) · web.dev (Google Chrome team) · Accessed 2026-08-22  
  Cookie notices as a common CLS source, INP damage from bulk third-party script loading behind the Accept button, occasional LCP capture on mobile, and the concrete remedies: reserved space or overlay, footer placement, async loading directly in HTML rather than via tag manager, resource hints, and self-hosting.
- [Package Travel and Linked Travel Arrangements Regulations 2018, Schedule 1 and regulation 12](https://www.legislation.gov.uk/uksi/2018/634/schedule/1/made) · UK Government (legislation.gov.uk), implementing Directive (EU) 2015/2302 · In force 2018-07-01; accessed 2026-08-22  
  The 17 mandatory pre-contractual information categories including total price inclusive of taxes with disclosure of possible additional costs, deposit and payment arrangements, suitability for persons with reduced mobility, passport/visa/health formalities and insurance; and regulation 12 on termination before start, reasonable standardised termination fees based on timing and cost savings, and fee-free termination for unavoidable and extraordinary circumstances.
- [Package travel — Your Europe](https://europa.eu/youreurope/citizens/travel/holidays/package-travel/index_en.htm) · European Commission · Accessed 2026-08-22  
  Definition of a package, the requirement that the price shown be inclusive of all taxes and applicable additional fees, the 20-day notice rule for price increases, the 8% threshold entitling cancellation without penalty, transfer rights, organiser liability and insolvency protection.
- [Price transparency (CMA209) and Unfair commercial practices (CMA207)](https://www.gov.uk/government/publications/price-transparency-cma209) · UK Competition and Markets Authority · CMA209 published 2025-11-18, updated 2026-01-07; CMA207 updated 2025-11-18  
  That dedicated price transparency guidance exists under the DMCC Act 2024 covering total price display, mandatory charges, drip pricing and partitioned pricing — evidence of the tightening enforcement trend. Only the landing pages were retrieved, not the detailed guidance.
- [Checkout Flows Average 11.3 Form Fields Too Many](https://baymard.com/blog/checkout-flow-average-form-fields) · Baymard Institute · 2024-06-26  
  Average of 11.3 checkout form fields in 2024 (11.8 in 2021, 12.7 in 2019), the finding that most sites need only 8, that 17% of users have abandoned due to checkout complexity, and that field count matters more than step count — the commercial case for deferring passport and identity fields.
