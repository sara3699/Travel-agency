# Accessibility and inclusive design

Dimension `accessibility-inclusive` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

Accessibility is the one dimension where "correct" and "different" point the same direction. The WebAIM Million (February 2026, verified) found 95.9% of home pages with detected WCAG 2 failures and 56.1 errors per page — 56,114,377 errors total, up 10.1% on 2025's 51, reversing a multi-year improving trend. Its top four failure types (low-contrast text 83.9%, missing image alt 53.1%, missing form input labels 51%, empty links 46.3%) map onto exactly what an image-heavy, bilingual, transactional travel site does most: white headlines over photography, destination galleries, long passenger forms, icon-only controls. WebAIM attributes the regression primarily to rising page complexity and ARIA volume — average page elements up 22.5% in one year — which is a direct warning about component-heavy builds, not just a headline number.

WCAG 2.2 (W3C Recommendation, 12 December 2024) is the build target. Verified against the Understanding documents, the criteria that bite here are 2.5.8 Target Size at 24×24 CSS px (the User Agent Control exception covers an unmodified native `<input type="date">` month grid but evaporates the moment you build a custom datepicker, which travel sites always do), 2.4.11 Focus Not Obscured (sticky price bars, cookie banners; C43 scroll-padding is the sufficient technique), 2.5.7 Dragging Movements (map pan needs directional buttons, sliders need track-click), 3.3.7 Redundant Entry (Level A, within one process only — nothing must persist across sessions), 3.2.6 Consistent Help, and 3.3.8 Accessible Authentication, where "transcription, such as typing in characters" is itself a cognitive function test. Manual OTP entry fails and paste must work: the single most likely 2.2 failure on a Gulf-market site.

Legal exposure, corrected. The EAA has applied to services provided to consumers since 28 June 2025, with e-commerce and passenger transport named in scope. There is no 2030 runway for the website — Article 32 covers products used to deliver services and legacy contracts, not digital services. EN 301 549 v3.2.1 (WCAG 2.1 AA) remains harmonised; v4.1.1 with WCAG 2.2 is expected in the OJEU around October 2026. Gulf regulation exists: Saudi DGA, the UAE's March 2024 national policy, and Qatar's e-Accessibility Policy all point at WCAG 2.1 AA. WCAG 3.0 is a Working Draft (3 March 2026), explicitly not citable as more than work in progress, and does not name APCA — treat APCA as a design tiebreaker for dark photographic overlays, never as the compliance target.

## Summary as first written, before verification

Accessibility is the one dimension where "correct" and "different" point the same direction. The WebAIM Million (February 2026) found 95.9% of home pages with detected WCAG 2 failures and 56.1 errors per page — the first reversal of a seven-year improving trend — and its top four failure types (low-contrast text 83.9%, missing image alt 53.1%, missing form input labels 51%, empty links 46.3%) map almost exactly onto what an image-heavy, bilingual, transactional travel site does most: white headlines over photography, large destination galleries, long passenger-detail forms, and icon-only controls. The generic travel template fails all four by construction. Building against them is simultaneously a compliance floor and a visible quality signal.

Three pressures shape the build. First, WCAG 2.2 (W3C Recommendation) adds criteria that land squarely on travel components: 24×24 CSS px targets (calendar day cells), focus not obscured (sticky "book now" price bars), dragging alternatives (map panning, price sliders), redundant entry (multi-passenger forms), consistent help, and accessible authentication (phone OTP — the default Gulf login pattern, and the single most likely 2.2 failure on this site). Second, the European Accessibility Act has applied since 28 June 2025 and explicitly names e-commerce and passenger transport websites, mobile apps and electronic tickets; any EU-facing sale pulls the site into scope, with a service transition running to 28 June 2030. Third, WCAG 3.0 is still a Working Draft (3 March 2026), explicitly not citable as more than work in progress, and APCA remains a candidate rather than a normative method — so ship WCAG 2.2 AA and treat APCA as a design tiebreaker for dark photographic overlays, not as the compliance target.

## Findings

### WCAG 2.2 is the current W3C Recommendation and adds nine success criteria over 2.1 while removing 4.1.1 Parsing as obsolete. The new AA-level ones are 2.4.11 Focus Not Obscured (Minimum), 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum) and 3.3.8 Accessible Authentication (Minimum); the new A-level ones are 3.2.6 Consistent Help and 3.3.7 Redundant Entry; 2.4.12, 2.4.13 Focus Appearance and 3.3.9 are AAA.

Confidence: verified · type: constraint

Why it matters here: A Middle East travel package site is exactly the shape of product these six new A/AA criteria were written against: sticky booking bars, calendar grids, map panning, price sliders, multi-passenger forms, WhatsApp/help affordances and OTP login. Targeting 'WCAG 2.1 AA' — still the default in most agency contracts — leaves every one of these untested. This is a TIMELESS principle (the criteria are stable), not a trend.

Evidence: W3C, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, publication date on the fetched document 12 December 2024. https://www.w3.org/TR/WCAG22/

Source: https://www.w3.org/TR/WCAG22/

### SC 2.5.8 Target Size (Minimum), Level AA, requires pointer targets of at least 24 by 24 CSS pixels, with five exceptions: Spacing (a 24 CSS px diameter circle centred on each undersized target's bounding box must not intersect another target or another undersized target's circle), Equivalent, Inline, User Agent Control, and Essential. The Understanding document names the native `<input type="date">` month grid as qualifying under User Agent Control because the author has not modified it.

Confidence: verified · type: constraint

Why it matters here: The custom date picker is the highest-risk component on any travel site: a 7-column month grid on a 360px-wide phone leaves roughly 44px of horizontal room per cell before padding, and designers routinely shrink day cells to fit two months side by side. A custom picker forfeits the User Agent Control exception entirely. The spacing exception is the practical escape hatch — a 20px day cell with 4px+ gutters can still pass — but it must be measured, not assumed.

Evidence: W3C WAI, Understanding SC 2.5.8 Target Size (Minimum), WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

### SC 2.4.11 Focus Not Obscured (Minimum), Level AA: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content." The Understanding document explicitly names sticky headers, sticky footers, cookie banners and chat widgets as failure sources, allows partial obscuring at AA (2.4.12 AAA forbids any obscuring), and points to CSS `scroll-padding` as a sufficient technique.

Confidence: verified · type: constraint

Why it matters here: Travel sites almost universally ship a sticky bottom bar ("From $1,240 — Book now") plus a floating WhatsApp button plus a cookie banner. Tab through the itinerary accordion on a short viewport and focused items land underneath all three. The fix is mechanical — `scroll-padding-block-end` matching the sticky bar height on the scroll container — but nobody does it because it is invisible to mouse users.

Evidence: W3C WAI, Understanding SC 2.4.11 Focus Not Obscured (Minimum), WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

### SC 2.5.7 Dragging Movements, Level AA: "All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent and not modified by the author." The Understanding document names maps ("drag the view of the map around") and sliders directly, and lists acceptable single-pointer alternatives: up/down/left/right buttons to move the map view, and "tapping or clicking on any point of the slider track".

Confidence: verified · type: constraint

Why it matters here: The two components this criterion targets are the two every travel site ships: an interactive destination map and a price-range slider in the filter panel. Both are drag-only in every mainstream library default (Leaflet/Mapbox pan, noUiSlider/rc-slider thumbs). This is a component-selection decision that must be made before the filter panel is built, not retrofitted.

Evidence: W3C WAI, Understanding SC 2.5.7 Dragging Movements, WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

### SC 3.3.8 Accessible Authentication (Minimum), Level AA, bans cognitive function tests in any authentication step unless one of four exceptions applies (Alternative, Mechanism, Object Recognition, Personal Content). A cognitive function test explicitly includes "transcription, such as typing in characters". The Understanding document states that manual transcription of a verification code fails, and that pasting must be enabled so the code can come from a password manager, a text-message application or a software security key, with password-manager autofill supported.

Confidence: verified · type: constraint

Why it matters here: Phone-number-plus-SMS-OTP is the dominant login and booking-confirmation pattern across Gulf consumer products. Building it the usual way — six separate single-character inputs that block paste and auto-advance on keypress — is a direct WCAG 2.2 AA failure, and it is also the pattern that most annoys everyone. Use one `<input inputmode="numeric" autocomplete="one-time-code">` that accepts a full paste, or offer a magic link as the Alternative. CAPTCHA is not outright prohibited but must clear an exception; WebAIM's survey ranks CAPTCHA the number one problem item for screen reader users.

Evidence: W3C WAI, Understanding SC 3.3.8 Accessible Authentication (Minimum), WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html ; WebAIM Screen Reader User Survey #10 (fielded December 2023 – January 2024) ranks CAPTCHA first among problematic items. https://webaim.org/projects/screenreadersurvey10/

Source: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html

### SC 3.3.7 Redundant Entry, Level A, requires information previously entered in the same process to be auto-populated or available for the user to select, with exceptions for essential re-entry, security, and information that is no longer valid. The Understanding document's examples include a billing-address-same-as-delivery confirmation and retaining form data after a checkout is rejected for an incorrect card. It applies within a single process only — nothing is required to persist across sessions.

Confidence: verified · type: constraint

Why it matters here: A four-passenger package booking asks for name, passport number, nationality, date of birth and contact per traveller. Level A — the lowest bar — now requires a 'same as lead traveller' / 'copy from passenger 1' affordance for shared fields (nationality, address, contact) and requires the form to survive a declined payment without clearing. Most travel checkouts wipe the form on payment failure, which is both a Level A failure and a direct cause of abandonment.

Evidence: W3C WAI, Understanding SC 3.3.7 Redundant Entry, WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

### SC 3.2.6 Consistent Help, Level A, requires that when a help mechanism appears on multiple pages of a set, it occurs in the same order relative to other page content unless the user initiates a change. Four mechanism types count: human contact details (phone, email, hours), a human contact mechanism (chat, contact form, social media), a self-help option (FAQ, support pages), and a fully automated contact mechanism (chatbot).

Confidence: verified · type: constraint

Why it matters here: Package travel in the Gulf is a high-trust, high-touch sale — the WhatsApp button and the phone number are the conversion mechanism, not a courtesy. This criterion turns 'where does the help affordance live' into a system-wide contract rather than a per-page decision, which is exactly the kind of rule a master UI/UX doc should freeze once: one fixed slot, same relative position on landing, package detail, search results, and every checkout step.

Evidence: W3C WAI, Understanding SC 3.2.6 Consistent Help, WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html

### WCAG 3.0 remains a W3C Working Draft published 3 March 2026, whose status section states it is "inappropriate to cite this document as other than a work in progress". W3C WAI states WCAG 3 "is not expected to be a completed W3C standard for a few more years", that "WCAG 3 will not supersede WCAG 2 and WCAG 2 will not be deprecated for at least several years after WCAG 3 is finalized", and that the Accessibility Guidelines Working Group planned to produce a more specific projected timeline by April 2026. The current WCAG 3 draft does not name APCA as its contrast method.

Confidence: verified · type: trend

Why it matters here: Any 2026 design doc that anchors on WCAG 3 or on APCA thresholds as the compliance target is building on a draft. Anchor conformance on WCAG 2.2 AA; treat WCAG 3 as roadmap awareness only. This is the correct answer to the fashionable 'WCAG 2 contrast is obsolete' argument that circulates in design circles.

Evidence: W3C, W3C Accessibility Guidelines (WCAG) 3.0, W3C Working Draft 3 March 2026. https://www.w3.org/TR/wcag-3.0/ ; W3C WAI, WCAG 3 Introduction. https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/

Source: https://www.w3.org/TR/wcag-3.0/

### APCA's own documentation states that the WCAG 2.x contrast ratio "far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when a color is near black", is not perceptually uniform, and that a blanket pass/fail ratio "is not instructive as a guideline". APCA outputs an Lc value on a 0–105+ scale and recommends Lc 90 preferred / Lc 75 minimum for body text at 18px+, and Lc 45 minimum for large text at 36px normal or 24px bold. APCA describes itself as "the candidate replacement" for WCAG 2.x contrast in WCAG 3.0 and is not yet normative.

Confidence: reported · type: trend

Why it matters here: This site will use dark photographic sections and a dark mode. That is precisely the region where the WCAG 2 math is weakest and where a 4.5:1-passing palette can still read badly. The defensible position: WCAG 2.2 ratios are the pass/fail gate, APCA Lc is the tiebreaker used to choose between two combinations that both pass. Never the reverse — an APCA-only palette can fail an EAA audit. Label this as a 2026 TREND with an unresolved endpoint, not a principle.

Evidence: APCA documentation, "Why APCA". https://git.apcacontrast.com/documentation/WhyAPCA

Source: https://git.apcacontrast.com/documentation/WhyAPCA

### SC 1.4.3 Contrast (Minimum), Level AA, requires 4.5:1 for text and 3:1 for large text, where large text is at least 18 point or 14 point bold (approximately 24px and approximately 18.5px, using 1pt = 1.333px). The exceptions cover incidental text, text that is "part of a picture that contains significant other visual content", logotypes, and inactive components. Separately, SC 1.4.11 Non-text Contrast, Level AA, requires 3:1 for visual information needed to identify UI components and their states, and for parts of graphics needed to understand content — and the Understanding document warns "The computed values should not be rounded (e.g. 2.999:1 would not meet the 3:1 threshold)."

Confidence: verified · type: constraint

Why it matters here: The 'part of a picture' exception is what travel designers reach for to justify white display type over a beach photo — and it does not apply. That exception covers text baked inside a photograph, not an HTML headline the author deliberately positioned over one. Overlaid hero copy must hit 4.5:1 (or 3:1 at ≥24px / ≥18.5px bold) against the actual pixels behind every glyph — which vary across the image, at every breakpoint, for every photo in the rotation. 1.4.11 additionally puts the input-field border, the focus ring, the dropdown chevron, the star-rating glyphs and the map pins on a 3:1 floor.

Evidence: W3C WAI, Understanding SC 1.4.3 Contrast (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ; Understanding SC 1.4.11 Non-text Contrast. https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

### The February 2026 WebAIM Million found 95.9% of home pages had detected WCAG 2 failures and an average of 56.1 errors per home page, a 10.1% increase over 2025's 51 — reversing a decline from roughly 60 errors per page in 2019–2020. The most common failure types were low contrast text 83.9%, missing alternative text 53.1%, missing form input labels 51%, empty links 46.3%, empty buttons 30.6%, and missing document language 13.5%. Pages with HTML5 doctypes averaged 1,497 elements versus 754 and 56.4 versus 51.7 errors.

Confidence: verified · type: data

Why it matters here: Four of the six most common failures are the four things this specific site does most: text over photography, a 40-image destination gallery, a long passenger form, and icon-only controls. The element-count correlation is a direct warning against the maximalist, animation-heavy travel landing page. It also quantifies the differentiation opportunity: if 95.9% of home pages have detectable failures, a genuinely clean one is rare enough to be noticed — and it is machine-checkable, which matters for the organic-reach goal since a11y auditors and dev-Twitter screenshot good examples.

Evidence: WebAIM, The WebAIM Million, February 2026 annual accessibility analysis of the top 1,000,000 home pages. https://webaim.org/projects/million/

Source: https://webaim.org/projects/million/

### WebAIM Screen Reader User Survey #10 (1,539 respondents, fielded December 2023 – January 2024) reports headings as the primary way users find information on a long page at 71.6% (78% among advanced users, 47% among beginners), versus 13.6% using find and 4.8% using links. Primary screen readers: JAWS 40.5%, NVDA 37.7%, VoiceOver 9.7%. 91.3% of respondents use a screen reader on a mobile device, with iOS/VoiceOver at 70.6%. The most problematic items reported were CAPTCHA, interactive elements behaving unexpectedly, ambiguous link or button text, unexpected screen changes, keyboard inaccessibility, and missing image descriptions.

Confidence: verified · type: data

Why it matters here: Heading structure is navigation infrastructure, not typographic decoration — 71.6% of screen reader users move through a package itinerary by heading. That has a direct design consequence: a visually beautiful itinerary built from styled divs and stacked cards with no h2/h3 spine is functionally a wall. And 91.3% mobile screen reader usage means VoiceOver/TalkBack on the real booking flow is the test that matters, not desktop NVDA. FLAG: fielded December 2023 — the most recent WebAIM screen reader survey available, but the field data is now over two years old.

Evidence: WebAIM, Screen Reader User Survey #10 Results, survey fielded December 2023 – January 2024. https://webaim.org/projects/screenreadersurvey10/

Source: https://webaim.org/projects/screenreadersurvey10/

### The European Accessibility Act (Directive (EU) 2019/882) has applied since 28 June 2025 and covers e-commerce and passenger transport services — including websites, mobile applications, electronic tickets and travel information services — alongside banking, e-books and consumer terminals. A microenterprise exemption applies to services provided by undertakings with fewer than 10 employees and annual turnover or balance sheet total not exceeding EUR 2 million. A transition allows services lawfully provided before June 2025 to continue until 28 June 2030. Conformance is presumed via EN 301 549 v3.2.1, which incorporates WCAG 2.1 Level AA; v4.1.1, expected in 2026, is reported to incorporate WCAG 2.2. Member-state maximum penalties differ widely (reported: Sweden ~EUR 900,000; Spain ~EUR 600,000; Germany ~EUR 100,000; France EUR 75,000 per violation).

Confidence: reported · type: constraint

Why it matters here: A site selling packages to travellers *from* the Middle East that also takes bookings from EU-resident customers, or that markets EU destinations to EU consumers, has a plausible EAA hook. The microenterprise exemption is the realistic shelter for a solo operator — but it evaporates the moment headcount or turnover crosses the line, with no grace period, so the architecture should not depend on it. Practical consequence: build to WCAG 2.2 AA now (superset of the 2.1 AA that EN 301 549 v3.2.1 requires) rather than retrofitting when v4.1.1 lands. CAUTION: I could not retrieve the EUR-Lex primary text in this session; article-level numbers below are secondary.

Evidence: European Commission, European Accessibility Act policy page (confirms e-commerce, transport, banking and e-books in scope). https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en ; Level Access, European Accessibility Act guide (dates, microenterprise threshold, EN 301 549 versions, penalties). https://www.levelaccess.com/blog/european-accessibility-act/

Source: https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en

### US exposure is asymmetric. DOJ states that ADA Title III prohibits discrimination by businesses open to the public and that this reaches their websites, but that "Businesses and state and local governments can currently choose how they will ensure that the programs, services, and goods they provide online are accessible" — no specific technical standard is mandated for private businesses; WCAG is offered as helpful guidance. The April 2024 final rule that does adopt WCAG 2.1 Level AA as a binding technical standard applies to Title II entities (state and local governments, special purpose districts, Amtrak and other commuter authorities), with compliance deadlines of 26 April 2027 for entities serving 50,000+ residents and 26 April 2028 for smaller entities and special districts. It does not apply to private businesses.

Confidence: verified · type: constraint

Why it matters here: For a private travel agency selling to US-based travellers, the risk is private litigation and demand letters rather than a regulator checking a version number. That changes the strategy: what matters is being demonstrably non-negligent — a dated accessibility statement, a known conformance target, a remediation contact, and no obvious automated-scan failures — rather than chasing a specific rule's deadline. Anyone quoting an 'April 2026/2027 ADA deadline' at a private travel business is misapplying the Title II rule.

Evidence: US DOJ, Guidance on Web Accessibility and the ADA. https://www.ada.gov/resources/web-guidance/ ; US DOJ, Fact Sheet on the Title II web and mobile app accessibility final rule (published in the Federal Register 24 April 2024). https://www.ada.gov/resources/2024-03-08-web-rule/

Source: https://www.ada.gov/resources/2024-03-08-web-rule/

### The W3C WAI "Web Accessibility Laws & Policies" listing contains no entries for Saudi Arabia, the United Arab Emirates, Qatar or Kuwait, while Israel is listed (Equal Rights of Persons with Disabilities Act as amended, 1998, WCAG 2.0 Level AA required, applying to both public and private sectors). W3C notes the list "is not a comprehensive or definitive listing". Qatar's Mada Center operates an ICT Accessibility Policy portal and an accredited-websites programme, but the specific WCAG version, mandated scope and dates were not retrievable. Saudi DGA and UAE federal portals returned 403/404 in this session.

Confidence: inferred · type: constraint

Why it matters here: Do not assert a Gulf legal requirement in the master doc. The honest position for a Sara AI Studio deliverable is: GCC digital accessibility obligations are real but poorly documented in English-language primary sources, and public-sector procurement standards (Saudi DGA, UAE federal, Qatar Mada accreditation) are the likely hooks rather than a general private-sector mandate. If the agency ever pitches a government tourism board or a state carrier as a partner, that accreditation question becomes live immediately — which is itself a reason to build to 2.2 AA from day one rather than discovering it during a tender.

Evidence: W3C WAI, Web Accessibility Laws & Policies (no GCC entries). https://www.w3.org/WAI/policies/ ; W3C WAI, Israel policy page. https://www.w3.org/WAI/policies/israel/ ; Mada Center, ICT Accessibility Policy Portal and accredited-websites programme referenced at http://www.mada.org.qa/

Source: https://www.w3.org/WAI/policies/

### Carousels carry a stack of specific obligations. The ARIA Authoring Practices Guide requires an auto-rotating carousel to have "a button for stopping and restarting rotation", to stop rotating when keyboard focus enters the carousel and while the mouse hovers over it, to label the button by its action, to use role=group with aria-roledescription "carousel" (slides: "slide"), and to set the slide container aria-live to "off" while auto-rotating and "polite" when not. SC 2.2.2 Pause, Stop, Hide (Level A) independently requires a pause/stop/hide mechanism for moving, blinking or scrolling content that starts automatically, lasts more than five seconds and is presented in parallel with other content — and for auto-updating information with no five-second grace at all. W3C WAI's own carousel tutorial states "Carousels are disputed from a usability perspective because their content can be hard to discover."

Confidence: verified · type: pattern

Why it matters here: The auto-rotating hero carousel is the single most template-identifying element in travel web design and it is a compliance liability, a discoverability problem and a performance cost at once. The 'no five-second grace for auto-updating information' clause also catches live price counters and 'X people viewing this package' urgency widgets. Killing the auto-rotating hero is simultaneously the accessibility fix and the strongest single differentiation move available.

Evidence: W3C, ARIA Authoring Practices Guide — Carousel Pattern. https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ ; W3C WAI, Carousels Tutorial. https://www.w3.org/WAI/tutorials/carousels/ ; W3C WAI, Understanding SC 2.2.2 Pause, Stop, Hide. https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

Source: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

### For hero and testimonial video the obligations split by whether there is an audio track. A silent background video needs no captions under SC 1.2.2 (there is no audio to caption) but falls under SC 1.2.1 Audio-only and Video-only (Prerecorded), which requires an alternative for time-based media — a text description of the visual content — and under SC 2.2.2 for a pause control. A video with audio requires captions (1.2.2, Level A) plus audio description or a media alternative (1.2.3, Level A) and audio description at 1.2.5 (Level AA). Separately SC 1.4.2 Audio Control (Level A): "If any audio on a web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level."

Confidence: verified · type: constraint

Why it matters here: This gives a clean, cheap rule for the build: hero video ships muted and silent with a visible pause control and a text description; any video with speech — the traveller testimonial, which is the highest-value social-proof asset for a package site — ships with real captions, not auto-generated ones, in both Arabic and English. Captions are also what make a testimonial clip work on Instagram with sound off, so the accessibility requirement and the organic-reach goal are the same requirement.

Evidence: W3C WAI, Understanding SC 1.2.2 Captions (Prerecorded). https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html ; Understanding SC 1.4.2 Audio Control. https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html

### For a large destination gallery, the W3C alt decision tree gives a specific reduction rule: use an empty alt attribute when the image's information is "redundant to real text nearby", use alt describing the destination or action when the image is functional (inside a link or button), and put the information elsewhere on the page for complex images. Separately, WebAIM's February 2026 data shows missing document language on 13.5% of home pages.

Confidence: verified · type: principle

Why it matters here: A 40-photo destination gallery does not need 40 descriptive alt strings, and writing them is what causes teams to give up and ship alt="" on everything or, worse, alt="Dubai travel package Dubai holiday best Dubai tour" keyword stuffing. The correct model: photos that carry booking-relevant information (the actual room, the actual dhow, the aircraft cabin, the excursion) get real alt; atmosphere shots that sit beside a text description are decorative and get alt="". Bilingually, this doubles: alt text is content, so it needs a translated string per locale keyed off the same asset, and the html lang/dir must switch with it or the screen reader reads Arabic alt with an English voice.

Evidence: W3C WAI, An alt Decision Tree. https://www.w3.org/WAI/tutorials/images/decision-tree/ ; WebAIM Million, February 2026 (missing document language 13.5%). https://webaim.org/projects/million/

Source: https://www.w3.org/WAI/tutorials/images/decision-tree/

### RTL correctness is a CSS architecture decision, not a translation task. CSS logical properties (margin-inline-start, padding-inline, border-inline-start, inset-inline-start, text-align: start/end, float: inline-start, inline-size/block-size) automatically follow `direction`, and are supported from Chrome 69, Firefox 41, Safari 12.1 and Edge 79. W3C i18n advises using markup rather than Unicode control characters for bidirectional text — the `dir` attribute, `<bdi>` for content of unknown direction (equivalent to FSI, auto-detecting from the first strong directional character), and `<bdo>` for overrides. Separately, SC 2.4.3 Focus Order requires focus to preserve meaning and operability, and the W3C Understanding document does not address RTL or script-specific reading order at all.

Confidence: verified · type: principle

Why it matters here: Three concrete consequences. (1) Ban physical left/right properties in the codebase so the Arabic build needs no [dir=rtl] override sheet. (2) User-generated review text and traveller names are exactly the unknown-direction case `<bdi>` exists for — an Arabic review containing a Latin hotel name, or a Latin review in an Arabic page, will scramble punctuation and bracket placement without it. Prices, flight numbers and booking references embedded in Arabic sentences are the same problem. (3) Because 2.4.3 is silent on RTL, focus order is entirely on the implementer: any visual reordering (flex row-reverse, grid placement, order:) desynchronises DOM order from visual order, and in RTL that mistake is doubled and invisible to an LTR-reading reviewer.

Evidence: MDN, CSS logical properties and values. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values ; W3C i18n, Unicode controls vs markup for bidi text. https://www.w3.org/International/questions/qa-bidi-unicode-controls ; W3C WAI, Understanding SC 2.4.3 Focus Order. https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

### SC 1.4.12 Text Spacing (Level AA) requires no loss of content or functionality when the user sets line height to at least 1.5× the font size, spacing after paragraphs to at least 2× the font size, letter spacing to at least 0.12× and word spacing to at least 0.16× the font size, changing no other property. SC 1.4.10 Reflow (Level AA) requires content to work without two-dimensional scrolling at a width equivalent to 320 CSS pixels (equal to a 1280 CSS pixel viewport at 400% zoom) and a height equivalent to 256 CSS pixels, excepting "parts of the content which require two-dimensional layout for usage or meaning" — the Understanding document names maps among the excepted items but states the exception "does not automatically extend to other content".

Confidence: verified · type: constraint

Why it matters here: 1.4.12 is the criterion that breaks fixed-height package cards, tightly-fitted price badges and single-line CTA buttons — all staples of travel card design. Design cards to grow, never to clip. The 0.12× letter-spacing injection is a specific hazard for Arabic: letter-spacing applied to a cursive joined script degrades legibility, so the Arabic build must be tested under the text-spacing bookmarklet separately rather than assumed to inherit the Latin result (that Arabic-specific consequence is my inference, not a sourced W3C statement). On reflow, the map canvas gets the two-dimensional exception but the filter panel, results list, map legend and any map-adjacent controls do not.

Evidence: W3C WAI, Understanding SC 1.4.12 Text Spacing. https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html ; Understanding SC 1.4.10 Reflow. https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

### SC 4.1.3 Status Messages (Level AA) requires that status messages be programmatically determinable via role or properties so assistive technology can present them without receiving focus. Cited examples include "5 results returned" near search results, an "Invalid entry" message above an input announced as "Postal code, invalid entry", and a cart region reading "5 items". Satisfying roles include role=status, role=alert, role=log and aria-live=polite. Moving focus to announce the message is a change of context and therefore falls outside the criterion.

Confidence: verified · type: constraint

Why it matters here: This is the criterion that governs the filter panel — the core interaction of a package-search site. When a traveller changes 'Budget: under 5,000 SAR' or 'Duration: 5–7 nights', the result count must be announced without stealing focus out of the filter control they are still using. Nearly every React filter implementation either announces nothing or yanks focus to the results heading; both are wrong, and the second is worse for sighted keyboard users too.

Evidence: W3C WAI, Understanding SC 4.1.3 Status Messages. https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html

### Form accessibility has three specific WCAG hooks beyond labelling. SC 1.3.5 Identify Input Purpose (Level AA) requires the purpose of fields collecting information about the user to be programmatically determinable, via HTML autocomplete tokens including name, given-name, family-name, username, email, tel, street-address, postal-code, country, cc-name, cc-number, cc-exp, bday and sex — the stated benefit being that with browser autofill "information does not need to be remembered by the user". SC 3.3.3 Error Suggestion (Level AA): "If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content." The GOV.UK Design System recommends three separate day/month/year text inputs inside a fieldset with a legend, using bday-day/bday-month/bday-year autocomplete tokens, citing WCAG 2.2 SC 1.3.5.

Confidence: verified · type: pattern

Why it matters here: A passenger-details form asks for legal name as on passport, nationality, passport number, expiry and date of birth. Autocomplete tokens are free conversion — they let an older traveller booking for four family members autofill three of the five fields per person — and they are a Level AA requirement, not a nicety. GOV.UK's evidence-based position that a date of birth should be three text inputs rather than a calendar widget is directly transferable: use a calendar picker for departure dates (a date near today the user is choosing) and plain text inputs for passport expiry and date of birth (dates the user already knows and would never scroll a calendar to reach).

Evidence: W3C WAI, Understanding SC 1.3.5 Identify Input Purpose. https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html ; Understanding SC 3.3.3 Error Suggestion. https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html ; GOV.UK Design System, Date input component. https://design-system.service.gov.uk/components/date-input/

Source: https://design-system.service.gov.uk/components/date-input/

### SC 2.1.2 No Keyboard Trap (Level A): if focus can be moved to a component by keyboard, it must be movable away by keyboard, and if that needs more than unmodified arrow or tab keys the user must be told how. The Understanding document accepts modal dialogs where "Tabbing from the last control in the dialog takes focus to the first control in the dialog" provided the user can dismiss via Cancel/OK or the Esc key, describing Esc as "a commonly used standard exit method". It names combining multiple content formats — plug-ins and embedded applications — as a typical trap source.

Confidence: verified · type: pattern

Why it matters here: A travel booking flow contains two guaranteed trap candidates: the date-picker overlay and the embedded payment iframe. A deliberate, bounded trap inside an open modal is correct and required; an accidental one inside an embedded map or third-party payment widget is a Level A failure the team does not own and must test for anyway. The full modal contract to specify once in the master doc: move focus in on open, cycle within, Esc closes, focus returns to the exact trigger element, background inert (the `inert` attribute or aria-hidden on the page shell).

Evidence: W3C WAI, Understanding SC 2.1.2 No Keyboard Trap. https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html

Source: https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html

### Focus styling should use :focus-visible, which browsers apply based on input-modality heuristics (shown for keyboard navigation, generally suppressed for pointer clicks). It has been Baseline since March 2022 (Chrome 86+, Firefox 85+, Safari 15.1+, Edge 86+). MDN recommends `outline` with `outline-offset` rather than `outline: none`, an `@supports not selector(:focus-visible)` fallback, and increasing outline width under `@media (forced-colors: active)`, noting SC 1.4.11's 3:1 minimum applies to the focus indicator.

Confidence: verified · type: pattern

Why it matters here: Removes the single most common excuse for `outline: none` — 'the ring looks bad when people click'. With :focus-visible you get a clean pointer experience and a strong keyboard ring at the same time, so the design system can afford a genuinely bold, brand-coloured focus ring rather than an apologetic one. Because 1.4.11 requires 3:1 against adjacent colours, the ring needs two-tone treatment (or an outline plus offset creating a light/dark sandwich) to survive over both the dark hero photography and the white card surfaces.

Evidence: MDN, :focus-visible. https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

### backdrop-filter reached Baseline "newly available" in September 2024, requires the element itself to be transparent or partially transparent for the effect to be visible, and is bounded by backdrop roots — an ancestor with opacity < 1, filter, mask, clip-path, mix-blend-mode or a relevant will-change becomes a backdrop root, so a child's backdrop-filter then blurs only content between that ancestor and the child rather than the page behind it.

Confidence: verified · type: constraint

Why it matters here: Frosted-glass scrims over hero photography are the current default 'premium' treatment and they are the wrong load-bearing solution for text contrast on this site: Baseline-2024 means older and low-end Android browsers may not render it, and a single ancestor with opacity < 1 silently defeats it. Contrast must be guaranteed by an opaque or fixed-alpha layer that always renders; backdrop-filter can sit on top as progressive enhancement only. This is a 2026 TREND with a real failure mode, not a principle.

Evidence: MDN, backdrop-filter (Baseline 2024, newly available since September 2024; backdrop root rules). https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

### Interaction to Next Paint (INP) is a responsiveness metric measured at the 75th percentile with thresholds of good ≤200 ms, needs improvement 201–500 ms, and poor >500 ms; it measures all interactions across the page lifetime rather than only the first, and web.dev notes "considerable variability in the capabilities of devices people use". Separately, prefers-reduced-motion has been Baseline widely available since January 2020, maps to OS settings including Android 9+ "Remove animations", and MDN's guidance is to reduce rather than remove motion — replacing vestibular triggers such as scaling and panning with opacity or colour changes.

Confidence: verified · type: data

Why it matters here: Inclusive design beyond disability comes down to two measurable budgets. INP at the 75th percentile is a device-class metric: heavy hydration, scroll-driven parallax and a client-side map on a mid-range Android will blow past 200 ms while looking fine on the designer's laptop, and INP is where that shows up. prefers-reduced-motion is the escape hatch that lets the site be genuinely animated for people who want it — the reduced branch should still be designed, using cross-fades and colour transitions, not a dead page. FLAG: I found no sourced figure for Android share or median connection speed in the Middle East in this session; StatCounter's regional charts require JavaScript and did not render.

Evidence: web.dev, Interaction to Next Paint (INP). https://web.dev/articles/inp ; MDN, prefers-reduced-motion. https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

Source: https://web.dev/articles/inp

### Nielsen Norman Group reports that between the ages of 25 and 60, people's ability to use websites declines by 0.8% per year, and identifies tiny type, small interactive elements, inflexible input formats and poor error messages as the dominant barriers for older adults; its full guideline set for users 65+ runs to 87 guidelines. NOTE: this article is dated 8 September 2019 and is therefore older than 2023 — treat the specific figures as potentially stale, though the directional finding is consistent with the WCAG 2.2 target-size and error-handling criteria added since.

Confidence: reported · type: data

Why it matters here: The person booking a family package is disproportionately the eldest decision-maker booking for four to six people — often a parent booking Umrah, a summer trip to Europe, or a multi-generation holiday. That user is simultaneously the highest-value customer and the one most affected by 20px tap targets, low-contrast grey secondary text, dropdown-heavy forms and strict input formats (e.g. rejecting a phone number typed with spaces). Designing the passenger form for that user, rather than for a 28-year-old solo traveller, is a commercially motivated inclusive-design decision, not charity.

Evidence: Nielsen Norman Group, "Usability for Senior Citizens", published 8 September 2019. https://www.nngroup.com/articles/usability-for-senior-citizens/

Source: https://www.nngroup.com/articles/usability-for-senior-citizens/

## Design implications

- Set the conformance target in the master doc as WCAG 2.2 Level AA, both locales, with the six new A/AA criteria (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8) written out as named acceptance criteria that every component ticket must reference. Do not write 'WCAG 2.1 AA' — EN 301 549 v3.2.1 currently maps to 2.1 AA but v4.1.1 is expected to move to 2.2, and 2.2 is a superset, so building to 2.2 now costs nothing extra and removes a future retrofit.
- Make hero text contrast deterministic, not decorative. Every image that carries overlaid HTML type must ship with a fixed protection layer defined in the design system — a solid or gradient scrim whose alpha is chosen so the worst-case pixel behind any glyph still clears 4.5:1 (or 3:1 at ≥24px, or ≥18.5px bold). Encode this as a token (e.g. --scrim-hero: linear-gradient(to top, rgb(8 12 20 / .78), rgb(8 12 20 / .28))) and forbid ad-hoc per-image overlays. Add a build-time or CI check that samples the darkest and lightest regions of the crop behind the text box at each breakpoint. backdrop-filter blur may sit on top as pure enhancement — never as the thing guaranteeing contrast, because it is only Baseline since September 2024 and any ancestor with opacity < 1 silently defeats it.
- Build the date picker as a first-class, spec'd component rather than pulling a library default. Requirements: day cells at 24×24 CSS px minimum or the spacing exception measured explicitly (24px-diameter circles must not intersect); roving-tabindex grid with arrow keys, PageUp/PageDown for month, Home/End for week; focus moves into the dialog on open, cycles inside, Esc closes, focus returns to the exact trigger; aria-live announcement of the focused date's full value; a text-input fallback path accepting a typed date. Use it only for departure/return dates. For passport expiry and date of birth, use three labelled text inputs in a fieldset with bday-day/bday-month/bday-year autocomplete tokens, per GOV.UK.
- Kill the auto-rotating hero carousel outright and replace it with either a single art-directed hero or a user-driven, snap-scrolling rail with visible prev/next buttons, no auto-advance, and no aria-live churn. If any auto-motion survives, it needs a persistent pause control (2.2.2, five-second rule), must stop on hover and on focus entry, and must set aria-live=off while rotating. The same rule kills 'X people are viewing this' auto-updating urgency widgets — auto-updating information gets no five-second grace at all under 2.2.2.
- Specify a single sticky-chrome contract to satisfy 2.4.11: one sticky element maximum per viewport edge, its height exposed as a CSS custom property, and scroll-padding-block-start/end on the scroll container set from that property. Cookie/consent UI and the WhatsApp button are included in the count. Test by tabbing the full booking flow at 360×640 and confirming no focused control is entirely hidden.
- Ban physical direction properties in the stylesheet (margin-left/right, padding-left/right, left/right, text-align: left/right, border-left/right) via a lint rule, and use logical properties throughout so the Arabic build needs zero [dir=rtl] override sheet. Never use flex-direction: row-reverse or CSS order to achieve RTL — flip via dir on the html element and let logical properties follow, so DOM order and focus order stay in sync (2.4.3 gives no RTL-specific guidance, so this is entirely on the implementer).
- Wrap every string of potentially opposite direction in <bdi> or dir="auto": traveller-submitted review text, reviewer names, Latin hotel and airline brand names inside Arabic sentences, booking references, flight numbers, and prices with currency codes. Set html lang and dir per locale, and make alt text and captions locale-keyed content in the database (one asset, one alt string per locale) rather than a single field — 13.5% of home pages in the WebAIM Million are missing document language at all.
- Adopt an explicit alt-text policy for the destination gallery: a photo is informative (real alt, describing what a buyer would want to verify — the actual room, the actual excursion, the aircraft cabin) or decorative (alt="") when its information is redundant to adjacent real text. Never keyword-stuff alt with destination SEO terms. Give the gallery a text-equivalent affordance — a real, linked list of what is shown — so it also survives images-off and slow connections.
- Design the filter/results interaction around 4.1.3: a visually-hidden or visible role=status region announcing the result count on every filter change, with focus staying in the filter control the user is operating. Debounce the announcement so a slider drag does not spam it. Never move focus to the results heading on filter change — that is a change of context and it is worse for sighted keyboard users too.
- Give every filter and range control a non-drag path (2.5.7): price and duration ranges get clickable track positions plus paired numeric text inputs plus arrow-key stepping; the map gets on-screen pan buttons and a zoom in/out pair, not drag-only; any drag-to-reorder itinerary UI gets a menu-based 'move up / move down' equivalent.
- Ship the map with a first-class text alternative, not an aria-label apology: a keyboard-reachable, screen-reader-readable list of the same locations with names, addresses/districts and distances, rendered as real DOM and toggleable as a 'List view' by any user. The map canvas takes the 1.4.10 two-dimensional exception; its legend, controls and results list do not, so they must all work at 320 CSS px without horizontal scrolling.
- Design the passenger-details form for the multi-passenger, older-booker case: full autocomplete tokens on every field (given-name, family-name, email, tel, country, postal-code, bday-*, cc-*); a 'Copy from lead traveller' control for shared fields (3.3.7); form state preserved verbatim through a declined payment; a top-of-form error summary that is a real focusable list of links to each failing field, plus inline messages tied via aria-describedby; error text that states the fix, not just the fault ('Passport expiry must be at least 6 months after your return date — try a date after 12 March 2027') per 3.3.3; and lenient parsing of phone numbers, spaces and Arabic-Indic digits rather than rejection.
- Implement OTP as one input with inputmode="numeric" and autocomplete="one-time-code" that accepts a full paste, or offer a magic-link/passkey alternative. Never build the six-box auto-advancing paste-blocking OTP widget — it is a direct 3.3.8 failure and it is also the pattern most likely to lose a booking on a phone. Avoid CAPTCHA entirely; if bot pressure demands it, use an invisible/behavioural challenge with a non-cognitive fallback.
- Freeze one help slot and never move it (3.2.6): the same phone/WhatsApp/human-contact affordance in the same relative position across landing, search, package detail and every checkout step. Given how much of the Gulf package-travel decision runs through a human conversation, this is a conversion decision that a Level A criterion happens to also require.
- Set performance budgets as accessibility budgets: INP good threshold ≤200 ms at the 75th percentile, and validate on a real mid-range Android over throttled 4G — not on the design machine. That budget is what forces the decisions that also make the site distinctive: server-rendered results, images not carousels, one map instance loaded on demand, and no scroll-driven parallax on the critical path.
- Design both motion branches. Under prefers-reduced-motion: reduce, replace transform-based scaling, panning and parallax with opacity and colour transitions rather than shipping a dead page — MDN's guidance is reduce, not remove. Pair this with :focus-visible focus rings styled as a deliberate brand element (two-tone outline plus outline-offset so it clears 3:1 against both the dark photographic hero and the white card surfaces), plus an @media (forced-colors: active) branch that thickens the outline.
- Make every card, badge, price chip and CTA survive the 1.4.12 text-spacing injection (line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12×, word-spacing 0.16×) with no clipping — which means no fixed-height cards, no single-line button assumptions, and no absolutely positioned price badges sized to their current string. Run the test separately on the Arabic build; letter-spacing behaves differently on a cursive joined script and the Latin result does not transfer.

## Anti-patterns to refuse

- The auto-rotating full-bleed hero carousel with white display type burned over five stock photos and no pause control. It is the single most template-identifying element in travel web design; it fails 2.2.2 (five-second rule), usually fails 1.4.3 on at least one slide because the scrim was tuned to slide one, and W3C WAI's own tutorial concedes carousel content 'can be hard to discover'. It also converts poorly because nobody reads slide four.
- Thin, low-contrast grey secondary text — the 'refined' typographic default — used for the details that actually decide a booking: what's included, cancellation terms, baggage, meal plan, the price footnote. Low-contrast text is the most common failure on the web at 83.9% of home pages in the February 2026 WebAIM Million. On a travel site it is worse than a compliance failure: the information a buyer needs to trust the price is exactly the information rendered least legibly.
- Icon-only controls with no accessible name — the heart/save, share, compare, filter, and map-toggle buttons. Empty buttons appear on 30.6% of home pages and empty links on 46.3%, and ambiguous link or button text ranks third among the items screen reader users report as most problematic. The generic fix (a tooltip) is not an accessible name and disappears on touch.
- The six-box auto-advancing OTP input that blocks paste, plus a CAPTCHA in front of the booking form. This is the default Gulf-market auth pattern and it is a direct 3.3.8 Level AA failure through the transcription clause; CAPTCHA is the number-one reported problem item in WebAIM's screen reader survey. It also fails the ordinary user on a phone who has to swap apps to read the SMS.
- Retrofitting Arabic by adding a [dir=rtl] override stylesheet on top of a left/right-based CSS codebase, and flipping layouts with flex-direction: row-reverse or CSS order. It produces a mirror image whose DOM order no longer matches its visual order, which silently breaks focus order (2.4.3) in the locale where an LTR-reading reviewer is least likely to notice — and it guarantees a permanent stream of directional bugs.
- Treating the destination gallery as a compliance chore and shipping either alt="" on all 40 photos or 40 identical keyword-stuffed strings ('Dubai holiday package best Dubai tour Dubai travel'). Missing alt text is on 53.1% of home pages; keyword-stuffed alt is arguably worse, because it converts a navigation aid into 40 consecutive spam announcements.
- A calendar picker used for date of birth and passport expiry. Nobody scrolls back forty years through a month grid. GOV.UK's evidence-based pattern is three labelled text inputs in a fieldset with bday-* autocomplete tokens; the calendar belongs only on departure and return dates, which are dates near today that the user is genuinely choosing.
- outline: none on focus, or a 1px hairline focus ring that vanishes over hero photography. :focus-visible has been Baseline since March 2022, so the old justification ('it looks bad when clicked') no longer exists, and SC 1.4.11 puts the indicator itself on a 3:1 floor against adjacent colours.
- Sticky bottom price bar + floating WhatsApp bubble + cookie banner + newsletter slide-in, all fixed-position, all at once. Beyond the obvious clutter, each one is a 2.4.11 failure source, and together on a 640px-tall viewport they can leave under 200px of unobstructed content — into which the focused element must somehow land.
- Frosted-glass (backdrop-filter) panels as the mechanism guaranteeing text contrast. It is Baseline only since September 2024, it renders nothing if the element is fully opaque, and any ancestor with opacity < 1, a filter, a mask, a clip-path or mix-blend-mode turns into a backdrop root and silently scopes the blur to nothing. The glass can be the look; it cannot be the guarantee.
- Announcing filter results by moving focus to the results heading — or not announcing them at all. Both are wrong under 4.1.3: focus movement is a change of context that also rips a keyboard user out of the filter they were still adjusting, and silence leaves screen reader users with no idea whether the price filter did anything.
- Clearing the passenger form when a card is declined. It is a 3.3.7 Level A failure, it is the highest-frustration moment in the entire funnel, and it disproportionately punishes the person who just typed four passports' worth of data by hand.

## Differentiation moves

- Make the itinerary a semantic document, not a stack of cards. 71.6% of screen reader users navigate a long page by heading, so a Day 1 / Day 2 / Day 3 heading spine with real h2/h3 elements is required anyway — but pushed further it becomes the site's signature: a package page that reads as a proper illustrated itinerary document, printable, linkable to a specific day (#day-4-wadi-rum), and skimmable in under ten seconds. Almost no competitor's package page survives being read as text, which is also why almost none of them are ever shared as a link.
- Ship a genuine 'plain view' toggle — the same package with photography suppressed, all inclusions/exclusions/terms as structured text, price breakdown as a real table. It costs little because the accessible text layer already has to exist for the gallery and map alternatives, it loads instantly on a mid-range Android over throttled data, and it is the version a family actually forwards to the person paying. The competitor set has nothing like it.
- Treat the focus ring as a brand asset. Because :focus-visible is Baseline and 1.4.11 requires 3:1 anyway, design a two-tone focus ring (dark core + light halo via outline plus outline-offset, or box-shadow sandwich) in the brand's turquoise that reads correctly over dark hero photography, white cards and the map. A site that is visibly, beautifully keyboard-navigable is a thing designers screenshot — which is the organic-reach goal, met by the accessibility work.
- Design the reduced-motion branch as a deliberate second aesthetic rather than a degradation: cross-fades, colour shifts and instant state changes, no scaling or panning. Then be loud about it — a short line in the footer or an /accessibility page describing what the site does when you ask it to calm down. This is genuinely rare and it is exactly the kind of detail an AI-education audience notices and reposts.
- Publish a dated, specific accessibility statement — conformance target (WCAG 2.2 AA), what has been tested, on what, with which assistive technology, what is known to fall short, and a real contact route. Given that 95.9% of home pages have detectable failures, a statement that admits specific gaps reads as competence rather than risk, and it is also the cheapest available defence against a US demand letter.
- Make the Arabic build the design lead, not the translation. Choose the Arabic type first, set its line-height and size independently of the Latin scale, build with logical properties so the Arabic layout is native rather than mirrored, and use <bdi> so mixed Arabic/Latin strings (hotel names, flight numbers, prices) never scramble. A site where the Arabic version is visibly the better-designed one is an instantly recognisable differentiator in a market where Arabic is almost always the afterthought skin.
- Replace the map-first results page with a keyboard-and-text-first one where the map is an optional overlay loaded on demand. This satisfies 2.5.7, 1.4.10 and the INP budget simultaneously, it removes the heaviest third-party payload from the critical path, and it produces a results page that is faster and more scannable than every metasearch competitor — whose maps exist mostly because everyone else has one.
- Bake captions into the testimonial video pipeline as a production standard (real captions in both languages, burned-in for social, as a track on site). The WCAG 1.2.2 requirement and the Instagram sound-off requirement are the same requirement, so the accessibility deliverable and the organic-reach deliverable are one asset — which is the strongest possible argument for a solo operator's production budget.

## Open questions

- This session's WebSearch budget was already fully consumed before research began, so all findings come from direct WebFetch of URLs I could address by name. That biases coverage toward well-known primary sources (W3C, WebAIM, MDN, web.dev, DOJ) and away from region-specific and practitioner sources. A follow-up pass with search available should specifically look for Gulf regulations, Arabic screen reader usage, and Baymard/NN-Group travel-booking form research.
- GCC digital accessibility law is unresolved. W3C WAI's Laws & Policies list has no entries for Saudi Arabia, UAE, Qatar or Kuwait (Israel is listed at WCAG 2.0 AA for public and private sectors). Saudi DGA returned 403 and UAE federal portals returned 404 in this session; Qatar's Mada runs an ICT Accessibility Policy portal and an accredited-websites programme whose WCAG version and mandatory scope I could not confirm. Needs a native-language search of DGA, TDRA and Mada policy documents before any legal claim goes into the master doc.
- I found no sourced figure for Android versus iOS share, device price distribution, or median mobile connection speed in the Middle East — StatCounter's regional charts require JavaScript and returned no data. The low-end-Android argument is therefore made on the general INP threshold rather than on regional device data. Worth sourcing from GSMA Mobile Economy MENA or Speedtest Global Index before setting a specific device-class test target.
- No sourced quantitative research was found on Arabic-script line-height, optimal font-size ratio versus Latin, or letter-spacing behaviour under the SC 1.4.12 text-spacing test. The claim that 0.12× letter-spacing degrades cursive Arabic is my inference from how the script joins, not a sourced finding. This needs either W3C i18n's Arabic layout requirements document or empirical testing with the actual chosen typeface.
- EAA Article-level specifics (the exact Article 2(2) service list wording, the Article 3 e-commerce definition, Article 4(5) microenterprise text, Article 31/32 dates) could not be verified against EUR-Lex, which returned empty bodies for every URL form tried. The dates and thresholds cited are from the European Commission summary page plus a vendor guide. Before the master doc makes a compliance claim, confirm against the Official Journal text — particularly whether a non-EU-established travel agency selling to EU consumers is in scope.
- Whether the site will take EU-resident bookings at all is a business decision that determines whether EAA applies and whether the microenterprise exemption is a viable long-term position. This should be settled before, not after, the architecture is fixed.
- EN 301 549 v4.1.1 is reported as expected in 2026 and to incorporate WCAG 2.2, but I could not verify the publication status against ETSI. Building to WCAG 2.2 AA makes this moot, but the master doc should not assert the version number without checking.
- No sourced data was found on assistive-technology usage among Arabic-speaking users specifically — WebAIM's survey respondents are overwhelmingly English-speaking. Whether JAWS/NVDA/VoiceOver Arabic support quality changes any of these recommendations is an open question worth a targeted test with an Arabic screen reader user.
- The 'bright sunlight' case has no sourced standard I could locate — there is no WCAG criterion for ambient light, and APCA is not normative. Practically this argues for exceeding minimum contrast on outdoor-use surfaces (the boarding-pass / voucher / on-trip screens) rather than sitting at 4.5:1, but that is a judgement call, not a sourced threshold.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — WCAG 2.2 is the current W3C Recommendation, adds nine success criteria over 2.1 and removes 4.1.1 Parsing; specific levels listed for each new SC.

Fetched the spec. Status line: 'published by the Accessibility Guidelines Working Group as a Recommendation', dated 12 December 2024. Document states 'WCAG 2.2 has removed one success criterion, 4.1.1 Parsing.' All nine new SC and their levels match exactly: 2.4.11 (AA), 2.4.12 (AAA), 2.4.13 (AAA), 2.5.7 (AA), 2.5.8 (AA), 3.2.6 (A), 3.3.7 (A), 3.3.8 (AA), 3.3.9 (AAA). https://www.w3.org/TR/WCAG22/

### CONFIRMED — SC 2.5.8 Target Size (Minimum), AA, requires 24x24 CSS px with five named exceptions; Understanding doc names native input type=date month grid under User Agent Control.

Normative text and all five exceptions (Spacing, Equivalent, Inline, User Agent Control, Essential) verified verbatim, including the 24 CSS px diameter circle wording. The doc does cite 'the days of the month calendar in an <input type="date">' as user-agent-determined. Design consequence the researcher left implicit: the exception evaporates the moment you build a custom datepicker, which is what a travel site always does. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

### CONFIRMED — SC 2.4.11 Focus Not Obscured (Minimum), AA; Understanding doc names sticky headers/footers, cookie banners, chat widgets; allows partial obscuring; points to CSS scroll-padding.

Normative text verified verbatim. Sticky footers/headers, cookie banners and chat windows all appear as named overlap sources. Sufficient technique 'C43: Using CSS scroll-padding to un-obscure content' is present. Partial obscuring allowed at AA, with the enhanced (AAA) version requiring none. https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html

### CONFIRMED — SC 2.5.7 Dragging Movements, AA; Understanding doc names maps with up/down/left/right buttons and slider track click/tap as acceptable alternatives.

Normative text verified verbatim. Doc contains 'A map allows users to drag the view of the map around, and the map has up/down/left/right buttons to move the view as well' and 'allows tapping or clicking on any point of the slider track to change the value and set the thumb to that position'. https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

### CONFIRMED — SC 3.3.8 Accessible Authentication (Minimum), AA, four exceptions; transcription counts as a cognitive function test; manual verification-code transcription fails; pasting must be enabled.

Verified verbatim. The four exceptions are Alternative, Mechanism, Object Recognition, Personal Content. The cognitive function test definition includes 'transcription, such as typing in characters'. The doc states 'A service that requires manual transcription of a verification code is not compliant' and that copy/paste can be relied on. This is the strongest single finding in the dimension and it survives intact. https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html

### CONFIRMED — SC 3.3.7 Redundant Entry, Level A, three exceptions; examples include billing-same-as-delivery and retaining data after a rejected card; applies within a single process only.

Verified verbatim, including both examples. The doc states explicitly: 'This success criterion does not add a requirement to store information between sessions.' The researcher's cross-session caveat is correct and load-bearing. https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

### CONFIRMED — SC 3.2.6 Consistent Help, Level A, same order relative to other page content; four mechanism types.

Verified verbatim including the phrase 'same order relative to other page content' and the four enumerated types (human contact details, human contact mechanism, self-help option, fully automated contact mechanism). https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html

### CONFIRMED — WCAG 3.0 is a Working Draft dated 3 March 2026, not citable as other than work in progress; WAI says not a completed standard for a few more years, will not supersede WCAG 2; AG WG planned a projected timeline by April 2026; draft does not name APCA.

Both sources verified. The draft is dated 03 March 2026 and carries 'It is inappropriate to cite this document as other than a work in progress.' APCA is not named in it. WAI carries both quoted sentences verbatim plus 'AG WG plans to develop a projected WCAG 3 timeline by April 2026'. Worth noting for freshness: that April 2026 date has now passed and the WAI page still reads 'by April 2026', so no firmer timeline has landed. https://www.w3.org/TR/wcag-3.0/ ; https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/

### PARTIALLY_TRUE — APCA recommends Lc 90 preferred / Lc 75 minimum for body text at 18px+, and Lc 45 minimum for large text at 36px normal or 24px bold.

The qualitative claims check out verbatim, but the researcher mis-bound the thresholds to font sizes: Lc 90 is anchored to 14px/400, not '18px+'. Lc 75 is the 18px/400 minimum. The 0-105+ scale figure was not stated on the page fetched. https://git.apcacontrast.com/documentation/WhyAPCA

Corrected: APCA documentation states that WCAG 2.x contrast 'far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when a color is near black', that 'a strict pass/fail with a blanket contrast ratio is not instructive as a guideline', and that WCAG 2.x contrast 'cannot be used for guidance designing dark mode'. Its readability levels are tied to specific size/weight pairs: Lc 90 preferred for fluent text at no smaller than 14px/weight 400, Lc 75 as the minimum for 18px/400, and Lc 45 as the minimum for larger, heavier text (36px normal or 24px bold). APCA is the candidate replacement for WCAG 2.x contrast in WCAG 3.0 and is not normative.

### CONFIRMED — SC 1.4.3 requires 4.5:1 / 3:1, large text is 18pt or 14pt bold (approx 24px and 18.5px at 1pt = 1.333px); SC 1.4.11 requires 3:1 and warns values should not be rounded.

Unusually precise and it holds. The Understanding doc contains the exact sentence 'The ratio between sizes in points and CSS pixels is 1pt = 1.333px, therefore 14pt and 18pt are equivalent to approximately 18.5px and 24px.' Exceptions for incidental text, 'part of a picture that contains significant other visual content', logotypes and inactive components all verified. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

### CONFIRMED — February 2026 WebAIM Million: 95.9% of home pages with WCAG 2 failures, 56.1 errors per page, +10.1% over 2025's 51; failure-type percentages as listed.

Re-fetched with a deliberately neutral prompt after the first fetch echoed my numbers back. Independent confirmation: '56,114,377 distinct accessibility errors were detected - an average of 56.1 errors per page', 95.9% with failures, 10.1% increase over 51 in 2025. Failure types confirmed at 83.9% / 53.1% / 51% / 46.3% / 30.6% / 13.5%. One nuance the researcher dropped: WebAIM attributes the regression primarily to rising page complexity and ARIA volume (average page elements up 22.5% in one year to 1,437), which is the actually actionable finding for a component-heavy build. https://webaim.org/projects/million/

### CONFIRMED — WebAIM Screen Reader User Survey #10, 1,539 respondents, December 2023 - January 2024; headings 71.6%; JAWS 40.5% / NVDA 37.7% / VoiceOver 9.7%; 91.3% mobile; CAPTCHA most problematic.

Every figure verified on the source page, including the 78% advanced / 47% beginner split, find 13.6%, links 4.8%, 70.6% iOS, and the ordered problem list led by CAPTCHA. Freshness warning the researcher should carry: Survey #11 is currently in the field with results scheduled for September 2026, so these figures are weeks from being superseded and the screen-reader market shares in particular are expected to move. https://webaim.org/projects/screenreadersurvey10/ ; https://webaim.org/projects/screenreadersurvey11/

### PARTIALLY_TRUE — EAA applies since 28 June 2025, covers e-commerce and passenger transport; microenterprise exemption under 10 employees / EUR 2m; transition allows services lawfully provided before June 2025 to continue until 28 June 2030; member-state penalties Sweden ~EUR 900k, Spain ~EUR 600k, Germany ~EUR 100k, France EUR 75k per violation.

Three separate problems. (1) The 2030 transition is materially mischaracterised - Article 32 covers products used to deliver services, legacy contracts and self-service terminals, not digital services. Confirmed against EUR-Lex recital 101 and a secondary explainer that states plainly 'There is no extension to 2030 for digital services themselves'. This matters: as written, the dimension summary invites a team to think the site has until 2030. (2) The penalty figures are contradicted. Other sources report Spain at ~EUR 1,000,000 (not 600k) and France at EUR 5,000-250,000 (not 75k per violation); no source found supports Sweden at ~EUR 900,000. All of these are vendor blogs with no primary citation. Only Germany's EUR 100,000 was corroborated. (3) The EC policy page confirms scope but carries neither the microenterprise threshold nor the 2030 date - those were verified separately against EUR-Lex. https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882 ; https://accessible.org/when-eaa-apply-compliance-timelines/ ; https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_30/en_301549v040100va.pdf

Corrected: The European Accessibility Act (Directive (EU) 2019/882) applies to services provided to consumers after 28 June 2025 and to products placed on the market after that date, and its scope names e-commerce and air, bus, rail and waterborne passenger transport services, alongside banking, e-books and consumer terminals. Article 4(5) exempts microenterprises providing services only - defined in Article 3(23) as an enterprise employing fewer than 10 persons and with annual turnover or balance sheet total not exceeding EUR 2 million. Article 32's transitional provisions do NOT give websites a grace period: they let service providers keep using products lawfully used before 28 June 2025 until 28 June 2030, let service contracts agreed before 28 June 2025 run to expiry for up to five years, and let self-service terminals run to end of economic life up to 20 years. A consumer-facing booking website had to be compliant on 28 June 2025. Conformance is presumed via EN 301 549 v3.2.1 (WCAG 2.1 AA), which remains the harmonised version; final draft v4.1.0 was published June 2026 and v4.1.1 incorporating WCAG 2.2 AA is expected to be cited in the Official Journal around October 2026. Penalties are set by Member States under Article 30 with no EU-level amounts; published ceilings vary widely and secondary sources disagree, so no specific national figure should be relied on without checking the national transposition.

### PARTIALLY_TRUE — The April 2024 final rule adopts WCAG 2.1 AA for Title II entities with deadlines of 26 April 2027 for 50,000+ and 26 April 2028 for smaller entities; DOJ mandates no standard for private businesses.

The substantive point (no mandated standard for private businesses) is CONFIRMED verbatim from DOJ. But the researcher got the deadlines right by accident and the provenance wrong: the April 2024 final rule set 24 April 2026 / 26 April 2027. A DOJ Interim Final Rule published 20 April 2026 (Federal Register doc 2026-07663) extended both by a year, citing resource constraints and the limits of generative AI for remediation, effective immediately with comments through 22 June 2026. The researcher's write-up describes a superseded rule state while quoting post-extension dates, which means they did not actually verify this against a current source. https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web ; https://www.ada.gov/resources/web-guidance/ ; https://www.ada.gov/resources/2024-03-08-web-rule/

Corrected: US exposure is asymmetric. DOJ states that ADA Title III reaches the websites of businesses open to the public but that 'Businesses and state and local governments can currently choose how they will ensure that the programs, services, and goods they provide online are accessible to people with disabilities' - no technical standard is mandated for private businesses, and WCAG is offered only as helpful guidance. The binding WCAG 2.1 Level AA technical standard applies to Title II entities (state and local governments, special purpose districts, Amtrak and other commuter authorities), not private businesses. Its original compliance dates of 24 April 2026 and 26 April 2027 were extended by one year by a DOJ Interim Final Rule published in the Federal Register on 20 April 2026, to 26 April 2027 for entities serving 50,000 or more residents and 26 April 2028 for smaller entities and special district governments.

### FALSE — W3C WAI's policy list contains no entries for Saudi Arabia, UAE, Qatar or Kuwait; Qatar's Mada portal and Saudi/UAE portals were not retrievable, so the mandated WCAG version and scope are unknown.

This is the weakest item in the set and it is the one closest to the project's actual market. The narrow fact (no GCC entries on the W3C page) is true and the Israel entry checks out, but the inference drawn from it is wrong and was refutable with a single search. Saudi DGA publishes 'The Guideline for Web Accessibility of Government Websites' setting WCAG 2.1 AA; UAE's national policy PDF is hosted on assets.u.ae; Qatar's e-Accessibility Policy PDF is on mcit.gov.qa. The researcher hit 403/404 on two portals and reported absence of evidence as evidence of absence. https://www.w3.org/WAI/policies/ ; https://dga.gov.sa/en/Web_Accessibility_of_Government_Websites ; https://tdra.gov.ae/en/media/press-release/2024/tdra-supports-the-implementation-of-national-digital-accessibility-policy ; https://mada.org.qa/policy-advocacy/ict-accessibility-policies/

Corrected: The W3C WAI policy list is not a reliable guide to Gulf requirements - it carries its own disclaimer that it 'is not a comprehensive or definitive listing', and all three relevant GCC states do have published digital accessibility policies. Saudi Arabia's Digital Government Authority requires WCAG 2.1 Level AA as the minimum for government websites, alongside Saudi Web Accessibility (SWA) policy and the Disability Rights Law. The UAE issued a National Policy for Digital Accessibility in March 2024, with TDRA setting WCAG 2.1 Level AA for federal government websites, mobile apps and e-services. Qatar's National e-Accessibility Policy, administered with the Mada Center, promotes WCAG adoption across websites, mobile applications, kiosks and digital content. Israel remains listed by W3C under the Equal Rights of Persons with Disabilities Act, based on WCAG 2.0.

### PARTIALLY_TRUE — APG carousel pattern requires a stop/restart button, stopping on focus entry and hover, role=group with aria-roledescription carousel/slide, and aria-live off while rotating / polite when not.

Verified against APG. One real error: APG says the container 'has either role region or role group' - the researcher stated role=group as though it were the only option, and region is in fact the more common choice for a landmark-level carousel. The aria-live guidance is also explicitly optional in APG, not required. The SC 2.2.2 five-second and auto-updating clauses and the WAI carousel tutorial quote were not independently re-verified in this session. https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

Corrected: The ARIA Authoring Practices Guide requires an auto-rotating carousel to have 'a button for stopping and restarting rotation', to stop rotating when keyboard focus enters the carousel and whenever the mouse hovers over it, and to give the carousel container either role region or role group with aria-roledescription set to 'carousel' (each slide container uses role group with aria-roledescription 'slide'). Optionally, an element wrapping the slides sets aria-atomic false and aria-live to 'off' while auto-rotating and 'polite' when not.

### PARTIALLY_TRUE — Silent background video needs no captions but falls under SC 1.2.1 and SC 2.2.2; video with audio needs 1.2.2, 1.2.3 and 1.2.5; SC 1.4.2 covers audio playing automatically for more than 3 seconds.

SC 1.4.2 verified verbatim at Level A including the 3-second figure. The 1.2.x mapping is structurally correct as a description of WCAG but the researcher overstates the 1.2.1 hook: 1.2.1 applies to video-only content that presents information, and a purely decorative hero loop that duplicates adjacent text carries no alternative requirement, while 2.2.2 bites only if the motion lasts more than five seconds and runs in parallel with other content. The practical constraint on a travel hero is 2.2.2 plus prefers-reduced-motion, not 1.2.1. Not independently fetched for the 1.2.x pages in this session. https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html

### PARTIALLY_TRUE — The W3C alt decision tree gives an empty-alt rule for redundant images, functional alt inside links/buttons, and information elsewhere for complex images; WebAIM Feb 2026 shows missing document language on 13.5% of home pages.

The 13.5% figure is CONFIRMED from the WebAIM Million. The alt decision tree summary was not independently fetched in this session and is reported from the claim alone. Substantive gap rather than error: the researcher cites the 13.5% document-language statistic in an alt-text claim without ever naming SC 3.1.1 Language of Page or SC 3.1.2 Language of Parts, which are the criteria that actually fix it - and on a bilingual Arabic/English site 3.1.2 is the one that matters, not 3.1.1. https://webaim.org/projects/million/

### PARTIALLY_TRUE — CSS logical properties are supported from Chrome 69, Firefox 41, Safari 12.1 and Edge 79.

The cited version numbers are the earliest-longhand figures and do not cover the shorthand and inset properties the researcher lists in the same sentence. caniuse reports full support at Chrome 89 / Firefox 66 / Safari 15 / Edge 89. Note also that float: inline-start has materially worse support than the rest of the group and should not be bundled with them. The decision does not change - logical properties are safe - but the numbers as published are wrong. https://caniuse.com/css-logical-props

Corrected: RTL correctness is a CSS architecture decision, not a translation task. CSS logical properties follow the element's direction automatically, and the full set including the shorthands (padding-inline, margin-inline, inset-inline-start, inline-size/block-size) reached support in Chrome 89, Edge 89, Firefox 66 and Safari 15 - comfortably safe in 2026, though the individual longhands such as margin-inline-start landed several years earlier. W3C i18n advises markup over Unicode control characters for bidirectional text: the dir attribute, <bdi> for content of unknown direction, and <bdo> for overrides.

### CONFIRMED — SC 1.4.12 Text Spacing thresholds; SC 1.4.10 Reflow at 320 CSS px width and 256 CSS px height, equal to 1280px at 400% zoom, with a two-dimensional-layout exception naming maps that does not automatically extend to other content.

Reflow verified verbatim including 320/256 and the exception clause. Two precision points the researcher blurred: the 1280px-at-400%-zoom equivalence is in informative Note 1, not the normative text, and maps appear in informative Note 2 rather than the criterion. The 'exception does not automatically extend to other content' wording is verified verbatim. Text Spacing thresholds not separately fetched but are standard and uncontested. https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

### CONFIRMED — SC 4.1.3 Status Messages, AA; examples include '5 results returned', 'Invalid entry' on a postal code, and a cart reading '5 items'; roles status/alert/log satisfy it; focus moves are changes of context and out of scope.

All three examples verified present, along with role=status, role=alert and role=log in the sufficient techniques, and the explicit statement that messages involving changes of context 'are not within the scope of this success criterion'. https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html

### CONFIRMED — GOV.UK Design System recommends three separate day/month/year text inputs in a fieldset with a legend, using bday-day/bday-month/bday-year, citing WCAG 2.2 SC 1.3.5.

Verified verbatim: three fields in a fieldset with legend, 'set the autocomplete attribute on the 3 fields to bday-day, bday-month and bday-year', and an explicit citation of 'WCAG 2.2 success criterion 1.3.5: Identify input purpose, level AA'. The SC 1.3.5 and 3.3.3 quotes were not separately fetched. https://design-system.service.gov.uk/components/date-input/

### UNSUPPORTED — SC 2.1.2 No Keyboard Trap, Level A; Understanding doc accepts modal dialogs with wrapped tabbing given Cancel/OK or Esc, describes Esc as a commonly used standard exit method, and names plug-ins and embedded applications as typical trap sources.

Not independently verified in this session. The description matches the well-known content of that page and nothing in it contradicts other verified material, but per the hostile default it should not be treated as checked. https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html

### PARTIALLY_TRUE — :focus-visible has been Baseline since March 2022 (Chrome 86+, Firefox 85+, Safari 15.1+, Edge 86+); MDN recommends outline with outline-offset, an @supports fallback, and forced-colors handling.

The March 2022 Baseline date is right but the Safari version attached to it is wrong: caniuse reports Safari 15.4 as first full support, with 15-15.3 disabled by default. MDN also classes it as Baseline 'Widely available', not merely 'Baseline'. The @supports fallback and outline/outline-offset pattern appear in MDN's examples rather than as prose recommendations, and the forced-colors advice was not found on the page fetched. https://caniuse.com/css-focus-visible ; https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

Corrected: Focus styling should use :focus-visible, which browsers apply on input-modality heuristics. MDN lists it as Baseline Widely available, across browsers since March 2022 - the date is set by Safari 15.4, not 15.1 (caniuse shows Safari 15 to 15.3 had it behind a flag). Chrome and Edge 86 and Firefox 85 shipped it unprefixed earlier. MDN's example pattern uses outline with outline-offset plus an @supports not selector(:focus-visible) fallback, and notes that the focus indicator must meet the 3:1 contrast minimum.

### CONFIRMED — backdrop-filter reached Baseline newly available in September 2024, requires a transparent element, and is bounded by backdrop roots created by ancestors with opacity < 1, filter, mask, clip-path, mix-blend-mode or will-change.

I expected this to fail - Firefox shipped backdrop-filter in 2022 - but MDN does show 'Baseline 2024, Newly available' with 'Since September 2024, this feature works across the latest devices and browser versions.' The transparency requirement and the full backdrop-root list are verified verbatim, including the opacity: 0.9 parent example. Directly relevant to a travel site's frosted-glass search bar over hero imagery. https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

### PARTIALLY_TRUE — INP is measured at the 75th percentile with good <=200ms, needs improvement 201-500ms, poor >500ms, measuring all interactions; prefers-reduced-motion Baseline since January 2020 with guidance to reduce rather than remove motion.

INP thresholds verified verbatim on web.dev, including 75th percentile and the all-interactions-versus-FID point. The prefers-reduced-motion half (January 2020 Baseline, Android 9+ 'Remove animations' mapping, reduce-not-remove guidance) was not independently fetched in this session and is unverified. Also worth flagging that INP is a performance metric, not an accessibility criterion - its inclusion here is defensible but it does not carry compliance weight. https://web.dev/articles/inp

### CONFIRMED — NNG reports ability to use websites declines 0.8% per year between ages 25 and 60, and its guideline set for users 65+ runs to 87 guidelines.

Attribution is real and the figures are exact. Article is 'Usability for Senior Citizens' by Lexie Kane, published 8 September 2019, containing the phrase 'between the ages of 25 and 60 people's ability to use websites declines by 0.8% per year' and referencing '87 design guidelines for targeting seniors (users ages 65+)'. The researcher's own staleness caveat is appropriate - the underlying measurement predates the article by many years and no newer NNG figure was found. https://www.nngroup.com/articles/usability-for-senior-citizens/

### Corrections applied

- EAA transition, corrected: Article 32 does NOT give websites a grace period to 28 June 2030. It lets service providers keep using products lawfully used before 28 June 2025 until 28 June 2030, lets service contracts agreed before 28 June 2025 run to expiry for up to five years, and lets self-service terminals run to end of economic life up to 20 years. A consumer-facing booking site serving EU consumers had to be compliant on 28 June 2025. There is no 2030 runway.
- EAA penalties, corrected: Article 30 leaves penalties to Member States with no EU-level amounts. The specific figures in the original claim are contradicted by other secondary sources (Spain reported at ~EUR 1,000,000 rather than 600,000; France at EUR 5,000-250,000 rather than 75,000 per violation) and no source supports Sweden at ~EUR 900,000. Only Germany's ~EUR 100,000 was corroborated. Cite no national penalty figure without checking the national transposition instrument.
- EN 301 549, sharpened: v3.2.1 (WCAG 2.1 AA) remains the harmonised version presumed to confer conformance. Final draft v4.1.0 was published by ETSI in June 2026; v4.1.1, incorporating WCAG 2.2 AA in clauses 9, 10 and 11, is expected to be cited in the Official Journal around October 2026. Until that citation, WCAG 2.1 AA is the legal floor and WCAG 2.2 AA is the forward-compatible build target.
- US Title II deadlines, corrected: the April 2024 final rule set compliance dates of 24 April 2026 and 26 April 2027. A DOJ Interim Final Rule published in the Federal Register on 20 April 2026 extended both by one year, to 26 April 2027 for entities serving 50,000 or more residents and 26 April 2028 for smaller entities and special district governments. It remains Title II only and does not reach private businesses; DOJ still mandates no technical standard under Title III.
- Gulf regulation, corrected: the absence of GCC entries from the W3C WAI policy list proves nothing - that page carries its own disclaimer that it is not comprehensive or definitive. Saudi Arabia's Digital Government Authority sets WCAG 2.1 Level AA as the minimum for government websites; the UAE issued a National Policy for Digital Accessibility in March 2024 with TDRA setting WCAG 2.1 Level AA for federal sites, apps and e-services; Qatar's National e-Accessibility Policy, administered with the Mada Center, promotes WCAG adoption across web, mobile and kiosk channels. For a Gulf-market travel site these are the operative regimes, not the EAA.
- APCA thresholds, corrected: Lc 90 is the preferred level for fluent text at no smaller than 14px/weight 400; Lc 75 is the minimum at 18px/400; Lc 45 is the minimum for larger, heavier text at 36px normal or 24px bold. The original claim mis-bound Lc 90 to '18px+'.
- CSS logical properties support, corrected: the full set including shorthands (padding-inline, margin-inline, inset-inline-start, inline-size/block-size) reached support at Chrome 89, Edge 89, Firefox 66 and Safari 15 per caniuse. The Chrome 69 / Firefox 41 / Safari 12.1 / Edge 79 figures apply only to the earliest longhands. float: inline-start has materially weaker support and should not be listed alongside them. The conclusion is unchanged - all of this is safe in 2026.
- :focus-visible support, corrected: Baseline Widely available since March 2022, a date set by Safari 15.4. Safari 15 through 15.3 had the selector behind a flag, so the '15.1+' figure is wrong.
- Carousel roles, corrected: the ARIA APG specifies the carousel container has either role region or role group with aria-roledescription 'carousel'; region is the more common choice. The aria-live off/polite behaviour is described as optional in APG, not required. The stop/restart button and the stop-on-focus and stop-on-hover behaviours are required.
- Reflow precision, corrected: the 320-CSS-px-equals-1280px-at-400%-zoom equivalence and the naming of maps as excepted content both appear in informative notes, not in the normative text of SC 1.4.10. The 'exception does not automatically extend to other content' rule is the part that constrains a design.

### Flagged as not covered

- Gulf accessibility law — the operative regime for this project — is left blank. Saudi DGA (WCAG 2.1 AA for government sites), the UAE National Policy for Digital Accessibility (March 2024, TDRA at WCAG 2.1 AA), and Qatar's National e-Accessibility Policy are all published and findable. The dimension leads with EAA exposure for a business whose primary market is almost certainly GCC.
- SC 3.1.1 Language of Page and SC 3.1.2 Language of Parts are never named, despite the summary quoting the 13.5% missing-document-language statistic. On a bilingual Arabic/English site 3.1.2 is the load-bearing one — every Arabic string inside an English page and every Latin brand name inside Arabic copy needs a lang switch or screen readers read it in the wrong voice. This is the single most concrete Arabic-specific accessibility requirement and it is absent.
- No coverage of Arabic screen-reader reality: which of JAWS, NVDA and VoiceOver have usable Arabic voices, how Arabic braille and diacritics behave, and whether the WebAIM Survey #10 market shares (a US/UK-weighted sample) transfer to a Gulf audience at all. The survey data is cited as though it were globally representative.
- The accessible date-picker is the hardest component in travel booking and gets one passing mention as 'calendar day cells'. Nothing on the APG grid pattern, roving tabindex versus aria-activedescendant, announcing unavailable dates, price-per-day labels, range selection, or the Hijri/Gregorian dual-calendar problem specific to this market.
- Nothing on seat maps, fare comparison tables, or price matrices: SC 1.3.1 Info and Relationships, table header association, and the boundary of the Reflow two-dimensional exception all apply, and a seat map is the clearest case in the whole product where the exception is arguable.
- SC 2.2.1 Timing Adjustable (Level A) is never mentioned, yet a fare-hold or seat-hold countdown is the canonical travel-booking failure of it. A timer that expires the basket without a warning-and-extend mechanism is a straightforward Level A failure.
- No position on accessibility overlays. A travel agency facing EAA pressure is precisely the buyer profile these are sold to; WebAIM publishes data on their prevalence and effect, and the disability community position is well documented. A doc that names the legal pressure without naming the trap is incomplete.
- No testing strategy: no statement that automated tooling catches only a minority of WCAG failures, no manual/AT test matrix, no CI gate (axe-core, Lighthouse, pa11y), and no mention of the accessibility statement that EN 301 549 and EAA conformance both expect a service to publish.
- Booking confirmations, e-tickets and PDF itineraries are out of scope in the doc but explicitly in scope under the EAA, which names electronic tickets. Tagged PDF / PDF-UA and accessible HTML email are separate disciplines with their own failure modes.
- The US section describes a superseded rule state. The DOJ Interim Final Rule of 20 April 2026 extending Title II deadlines by a year is absent, which suggests the US research was not refreshed against a current source even though the quoted dates happen to match the post-extension values.
- Freshness risk on the screen-reader data is not flagged: WebAIM Survey #11 is in the field with results due September 2026, so the JAWS/NVDA/VoiceOver shares and the problem ranking in this doc have a shelf life measured in weeks.

## Sources

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) · W3C · 2024-12-12 (Recommendation, fetched publication date)  
  The nine success criteria added over WCAG 2.1 with exact numbers, names and conformance levels; removal of 4.1.1 Parsing; current-standard status.
- [Understanding SC 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · W3C WAI  
  24×24 CSS px requirement, verbatim text of all five exceptions, the 24px-diameter circle spacing rule, and the User Agent Control exception covering native input type=date calendar grids.
- [Understanding SC 2.4.11: Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) · W3C WAI  
  Normative text, the sticky header/footer/cookie banner/chat widget failure list, the partial-vs-entire distinction against 2.4.12 AAA, and scroll-padding as a sufficient technique.
- [Understanding SC 2.5.7: Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) · W3C WAI  
  Normative text and the explicit naming of map panning, sliders and carousels, with directional buttons and track-clicking as accepted single-pointer alternatives.
- [Understanding SC 3.3.8: Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) · W3C WAI  
  Cognitive function test definition including transcription, the four exceptions, the requirement that OTP fields support paste and password-manager autofill, and CAPTCHA's constrained status.
- [Understanding SC 3.3.7: Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) · W3C WAI  
  Normative text, exceptions, same-process scope, and the examples covering billing-address reuse and preserving form data after a declined payment.
- [Understanding SC 3.2.6: Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) · W3C WAI  
  The four qualifying help mechanism types and the same-relative-order requirement across a set of web pages.
- [Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · W3C WAI  
  The 4.5:1 and 3:1 thresholds, the large-text definition in points and its pixel equivalents, and the scope of the incidental/logotype exceptions.
- [Understanding SC 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · W3C WAI  
  The 3:1 requirement for UI component identification and graphical objects, its application to focus indicators, input borders and icons, and the no-rounding rule (2.999:1 fails).
- [Understanding SC 1.4.10: Reflow and SC 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) · W3C WAI  
  320/256 CSS px reflow values and the 400% zoom equivalence; the two-dimensional exception covering maps but not surrounding content; and (from the companion text-spacing page) the 1.5×/2×/0.12×/0.16× spacing values.
- [Understanding SC 2.2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · W3C WAI  
  Normative text with the five-second rule for moving/blinking/scrolling content, and the absence of any grace period for auto-updating information.
- [Understanding SC 1.4.2: Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html) · W3C WAI  
  The three-second autoplaying-audio threshold and the pause/stop or independent volume control requirement.
- [Understanding SC 1.2.2: Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) · W3C WAI  
  Caption requirement and media-alternative exception; confirmation that a silent video needs no captions but falls under SC 1.2.1's alternative-for-time-based-media requirement.
- [Understanding SC 4.1.3: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) · W3C WAI  
  Normative text, the 'results returned' and cart-count examples, the qualifying roles, and the fact that moving focus is a change of context outside the criterion's scope.
- [Understanding SC 2.4.3: Focus Order and SC 2.1.2: No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) · W3C WAI  
  No Keyboard Trap normative text and the accepted modal pattern (cycle within, Esc to exit); and from the companion Focus Order page, that DOM order need not follow visual layout but should reinforce it — and that the document says nothing about RTL.
- [Understanding SC 1.3.5: Identify Input Purpose and SC 3.3.3: Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) · W3C WAI  
  The autocomplete token list for name/contact/payment/birthday fields and the cognitive-disability benefit; and from the companion page, the exact Error Suggestion requirement.
- [An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) · W3C WAI  
  The informative / decorative / functional / text / complex classification and the rule to use empty alt when the image is redundant to real text nearby — the basis of the 40-photo gallery policy.
- [ARIA Authoring Practices Guide — Carousel Pattern, and WAI Carousels Tutorial](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) · W3C  
  Pause/restart button requirement, stop-on-hover and stop-on-focus behaviour, role=group with aria-roledescription, aria-live off-while-rotating; and the WAI tutorial's own statement that carousels are disputed from a usability perspective.
- [The WebAIM Million](https://webaim.org/projects/million/) · WebAIM · February 2026  
  95.9% of home pages with detected WCAG 2 failures; 56.1 errors per page (up 10.1% YoY, first reversal in seven years); failure-type breakdown (low contrast 83.9%, missing alt 53.1%, missing form labels 51%, empty links 46.3%, empty buttons 30.6%, missing document language 13.5%); element-count correlation.
- [Screen Reader User Survey #10 Results](https://webaim.org/projects/screenreadersurvey10/) · WebAIM · Fielded December 2023 – January 2024  
  Heading navigation at 71.6%; JAWS 40.5% / NVDA 37.7% / VoiceOver 9.7%; 91.3% mobile screen reader usage; CAPTCHA ranked the most problematic item. Flagged as aging field data.
- [W3C Accessibility Guidelines (WCAG) 3.0, Working Draft; and WCAG 3 Introduction](https://www.w3.org/TR/wcag-3.0/) · W3C · 2026-03-03 (Working Draft)  
  WCAG 3.0's draft status and 'work in progress' caveat; that it does not name APCA; and WAI's statement that WCAG 3 will not supersede WCAG 2 for several years after finalisation.
- [Why APCA](https://git.apcacontrast.com/documentation/WhyAPCA) · APCA / Myndex  
  The critique of the WCAG 2.x ratio (dark-colour overstatement near black, lack of perceptual uniformity, uninstructive pass/fail), the Lc scale and thresholds (Lc 90/75 body, Lc 45 large), and APCA's status as a non-normative candidate.
- [European Accessibility Act](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en) · European Commission  
  Confirmation that the EAA covers e-commerce, air/bus/rail/waterborne passenger transport services, banking and e-books alongside consumer terminals.
- [European Accessibility Act guide](https://www.levelaccess.com/blog/european-accessibility-act/) · Level Access  
  28 June 2025 application date; 28 June 2030 service transition; microenterprise exemption (<10 employees, ≤EUR 2m); EN 301 549 v3.2.1 = WCAG 2.1 AA with v4.1.1 expected 2026 for WCAG 2.2; member-state penalty ranges. Secondary source — EUR-Lex primary text was not retrievable.
- [Guidance on Web Accessibility and the ADA; and Fact Sheet on the Title II web rule](https://www.ada.gov/resources/2024-03-08-web-rule/) · US Department of Justice · Rule published in the Federal Register 24 April 2024  
  That Title III reaches business websites but mandates no specific technical standard; that the WCAG 2.1 AA rule binds Title II entities only, with 26 April 2027 / 26 April 2028 deadlines by population — and does not apply to private businesses.
- [Web Accessibility Laws & Policies; Israel country page](https://www.w3.org/WAI/policies/) · W3C WAI  
  Absence of Saudi Arabia, UAE, Qatar and Kuwait entries (with W3C's own non-comprehensiveness caveat), and Israel's Equal Rights of Persons with Disabilities Act requiring WCAG 2.0 AA for public and private sectors.
- [Date input component](https://design-system.service.gov.uk/components/date-input/) · GOV.UK Design System  
  Three separate day/month/year text inputs in a fieldset with legend, bday-day/bday-month/bday-year autocomplete tokens cited against WCAG 2.2 SC 1.3.5, and the evidence from the Apply for Teacher Training service on month-name entry errors.
- [CSS logical properties and values; :focus-visible; backdrop-filter; prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) · MDN Web Docs  
  Logical property mappings and browser support (Chrome 69+, Firefox 41+, Safari 12.1+); :focus-visible Baseline March 2022 and the recommended outline/outline-offset and forced-colors patterns; backdrop-filter Baseline September 2024 plus backdrop-root gotchas; prefers-reduced-motion Baseline January 2020 and the reduce-don't-remove guidance.
- [Unicode controls vs markup for bidi text](https://www.w3.org/International/questions/qa-bidi-unicode-controls) · W3C Internationalization  
  Use markup (dir attribute, bdi, bdo) rather than Unicode control characters, and dir="auto"/bdi for content of unknown direction — the basis of the mixed Arabic/Latin string handling for reviews, prices and brand names.
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp) · web.dev / Chrome team  
  INP thresholds of good ≤200 ms, needs improvement 201–500 ms, poor >500 ms at the 75th percentile, and that it measures all interactions rather than only the first.
- [Usability for Senior Citizens](https://www.nngroup.com/articles/usability-for-senior-citizens/) · Nielsen Norman Group · 2019-09-08 — FLAGGED as older than 2023, potentially stale  
  The 0.8% per year decline in website usage ability between ages 25 and 60, and the barrier list (tiny type, small targets, inflexible input formats, poor error messages) underpinning the older-family-booker design case.
