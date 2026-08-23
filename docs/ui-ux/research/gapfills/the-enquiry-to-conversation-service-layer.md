# The enquiry-to-conversation service layer

Dimension `the-enquiry-to-conversation-service-layer` · verification verdict: not separately verified

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Scope

The enquiry-to-conversation service layer: WhatsApp product choice, deep-link and record construction, staff workflow, published promise, and handoff analytics

## Summary

The recorded decision that a WhatsApp enquiry IS the conversion is an operations commitment wearing a UI costume, and it has a hard deadline attached. Meta's pricing documentation, updated 2026-08-05, states that effective 2026-10-01 it "will charge on a per-message basis for all service messages" — every free-form human reply inside the 24-hour customer service window, free since 2024-11-01 — with no volume tiers, and that any business without a payment method on file by 2026-09-30 has service-message delivery stopped. That single change removes the assumption the enquiry model rests on: that inbound-led human conversation is free.

There is a documented escape, and it is this dimension's whole answer. Under Coexistence a number runs on the WhatsApp Business App and Cloud API simultaneously. Meta states plainly that replies sent from the Business App "continue to be free" and "are not subject to the customer service window and do not create, extend, or affect Cloud API conversation windows or Cloud API pricing" — while Cloud API still receives every inbound message as a webhook and, via `smb_message_echoes`, every reply the operator types by hand on her phone. The human keeps a free, untimed, any-language reply surface; the database still gets two timestamps. The API is for reading, not sending.

The rest follows from honesty about coverage. One person cannot hold a live public median across three time zones including the 22:00–02:00 and Ramadan peaks. Publish a window that survives the worst hour, measure the median privately, and let the post-enquiry status page carry the specificity the homepage cannot promise.

## Findings

### Effective 2026-10-01 Meta charges per-message for ALL service messages — i.e. every free-form human reply sent via Cloud API inside the 24-hour customer service window — at the same rate as utility/authentication for that market, with no volume tiers. Businesses without a payment method on file by 2026-09-30 have service-message delivery stopped.

Confidence: verified · type: constraint

Why it matters here: This is 40 days from today and it invalidates the usual 'Cloud API is free for inbound-led conversations' reasoning that an enquiry-first Middle East travel site would be built on. A consultative package conversation is 20-40 outbound turns; on Cloud API alone that becomes a metered per-turn cost plus a billing dependency that can halt replies entirely. Any architecture decision made from pre-2026 blog posts is now wrong.

Evidence: Meta developer docs, 'Upcoming pricing updates for Meta Business Agent, service and utility messages', updated 2026-07-01, and the main pricing page updated 2026-08-05: 'Effective October 1, 2026 - Meta will charge on a per-message basis for all service messages, consistent with how Meta charges for template messages. These messages have not been charged since November 1, 2024.' and 'Volume tiers: None.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages

### Under Coexistence, one phone number runs on the WhatsApp Business App and Cloud API at the same time, messages are mirrored between them, and replies sent from the Business App remain free AND are exempt from the 24-hour customer service window entirely.

Confidence: verified · type: principle

Why it matters here: This is the single fact that makes the whole enquiry-first thesis survive the October pricing change. The operator answers by hand from her phone — free, no template, no 24-hour clock, at 01:00, in Arabic — while the same number feeds a webhook that writes to Supabase. It resolves the supposed 'hard fork' between the App and the API: for this business size the correct answer is both, not either.

Evidence: Meta developer docs, 'Onboard WhatsApp Business app users': 'After a business customer has been onboarded to Cloud API, messages sent by the business via the WhatsApp Business app will continue to be free, but messages sent via Cloud API will be subject to Cloud API pricing.' and 'The 24-hour customer service window restriction applies to messages sent via Cloud API. Messages sent from the WhatsApp Business app are not subject to the customer service window and do not create, extend, or affect Cloud API conversation windows or Cloud API pricing.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/

### The `smb_message_echoes` webhook fires when a coexistence-onboarded business sends a message from the WhatsApp Business app or a companion device, delivering message id, timestamp, `from` (business number) and `to` (user number) to your endpoint.

Confidence: verified · type: pattern

Why it matters here: This is the answer to 'how is a WhatsApp reply measured at all'. Without it, a hand-typed reply is invisible and any published response median is fiction. With it, first_response_at is stamped automatically the moment the operator replies from her phone, with no discipline required of her and no cost. It is what converts an unverifiable trust claim into an instrumented one.

Evidence: Meta webhook reference, `smb_message_echoes`: triggered when 'A business customer with a WhatsApp Business app phone number... sends a message using the WhatsApp Business app or a companion device to a WhatsApp user or another business.' Payload carries id, timestamp, from, to and the message content object.

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/smb_message_echoes/

### Exact per-delivered-message USD rates effective 2026-07-01 (marketing / utility+authentication): Saudi Arabia $0.0501 / $0.0107; UAE $0.0499 / $0.0157; Egypt $0.0644 / $0.0036; Qatar $0.0341 / $0.0120; 'Rest of Middle East' (Kuwait, Jordan, Lebanon, Bahrain, Oman, Iraq, Yemen) $0.0341 / $0.0091; 'Rest of Africa' (Morocco, Tunisia, Algeria, Libya) $0.0225 / $0.0040. Service messages will be charged at the utility/authentication rate from 2026-10-01, with October rates published by 2026-09-01.

Confidence: verified · type: data

Why it matters here: These are the real numbers for exactly the three markets in scope, and they are counter-intuitive: Egypt has the highest marketing rate of the group ($0.0644) but the cheapest utility ($0.0036) — an 18x spread. That means template category discipline matters far more than message volume. Getting a follow-up classified as utility instead of marketing is a 5-16x cost difference per market, which is the actual lever, not send count.

Evidence: Meta's own USD rate card CSV linked from the pricing page, header row: 'Cost per message in USD on the WhatsApp Business Platform, effective July 1, 2026'. Downloaded and read in full 2026-08-22.

Source: https://developers.facebook.com/docs/whatsapp/pricing

### Morocco and Kuwait move out of their regional pricing bands to standalone rate-card entries on 2026-10-01, both with HIGHER utility and authentication rates plus a new, higher authentication-international rate. Qatar already made this move on 2026-07-01 with higher utility/auth rates.

Confidence: verified · type: trend

Why it matters here: North Africa is currently the cheapest band on the card ('Rest of Africa', $0.0040 utility) and is about to stop being. Any cost model built this month for Morocco is wrong from 1 October, and because service messages inherit the utility rate, the cost of simply talking to a Moroccan customer rises on the same date. This directly touches the unresolved French/North Africa question in the project memory.

Evidence: Meta pricing page, 'Rate card updates effective October 1, 2026': 'Kazakhstan*, Kuwait*, Morocco*, Oman*, Ukraine* – Higher utility and authentication rates, plus a new authentication-international rate that is higher vs. the current regional authentication rate.'

Source: https://developers.facebook.com/docs/whatsapp/pricing

### The WhatsApp Business App supports up to four linked 'companion' devices in addition to the primary phone. WhatsApp for Windows and WearOS are unsupported under coexistence; all other companions must be re-linked after onboarding.

Confidence: verified · type: constraint

Why it matters here: This is the multi-agent answer for a one-to-two person operation, and it costs nothing. Two people can work the same number concurrently from phone plus laptop web clients without any API, any BSP seat licence, or any shared-inbox SaaS. It removes the most common reason cited for jumping to Cloud API at this scale, and it means the roster can be doubled before any tooling changes.

Evidence: Meta developer docs, 'Onboard WhatsApp Business app users', Linked devices section: 'Businesses can link up to four WhatsApp "companion" clients to their WhatsApp Business app account on other devices... All companion clients are supported, except for WhatsApp for Windows and WhatsApp for WearOS.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/

### A phone number already active on WhatsApp or the WhatsApp Business App cannot be registered to Cloud API unless it is deleted from WhatsApp first. Coexistence onboarding is the only path that preserves the existing number, its 180 days of chat history and its contacts.

Confidence: verified · type: constraint

Why it matters here: This is the irreversible consequence the brief warns about, and it has a concrete implication for day one: the enquiry number must be a dedicated business SIM, never the operator's personal number and never a number already carrying customer history outside the Business App. Getting this wrong means either destroying the chat history that IS the relationship, or being permanently locked out of programmatic reads.

Evidence: Meta developer docs, business phone numbers: 'Numbers already in use with WhatsApp cannot be registered unless they are deleted first.' Coexistence doc describes history sync in three phases covering 180 days from onboarding, excluding group chats.

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers/

### Coexistence cannot be self-served. It requires onboarding via Embedded Signup with session logging by an entity that is already a Meta Solution Partner or Tech Provider, and it caps throughput at a fixed 20 messages per second.

Confidence: verified · type: constraint

Why it matters here: A BSP is therefore a hard architectural dependency, not an optional convenience — which inverts the usual advice to 'go direct to Cloud API to avoid BSP markup'. Vendor selection must be filtered on one question (does this BSP support coexistence onboarding?) before price, inbox features, or Arabic UI. The 20 mps cap is irrelevant at this volume and should not be treated as a reason to avoid coexistence.

Evidence: Meta developer docs, 'Onboard WhatsApp Business app users', Requirements: 'You must already be a Solution Partner or Tech Provider... You must use Embedded Signup with session logging.' Limitations: 'business phone numbers that are in use with both the WhatsApp Business app and Cloud API have a fixed throughput of 20 mps.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/

### Under coexistence the Business App keeps labels, quick replies, away message, greeting message, business profile and catalog with 'No change'. It loses broadcast lists (existing ones become read-only), and disappearing messages, view-once and live location are disabled for all 1:1 chats.

Confidence: verified · type: data

Why it matters here: The staff workflow this dimension has to design runs entirely on the surviving features: labels ARE the state machine, quick replies ARE the templates, and the away message IS the after-hours promise. None of them require the API. Meanwhile the loss of broadcast lists closes the cheapest bulk-outreach route, which pushes any campaign send onto paid marketing templates — a good outcome for discipline, a surprise if unplanned.

Evidence: Meta developer docs, 'Onboard WhatsApp Business app users', Feature comparison table: 'Messaging tools (for example, marketing messages, greeting message, away message, quick replies, labels) — No change.' 'Broadcast lists will be disabled. Business will not be able to create new Broadcast lists. Existing Broadcast lists will become read-only.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/

### The 72-hour Free Entry Point window opens ONLY when a user arrives via a Click-to-WhatsApp ad or a Facebook Page call-to-action button, on the Android or iOS app — desktop and web are explicitly excluded. A wa.me link from your own website does not open it.

Confidence: verified · type: constraint

Why it matters here: Directly contradicts a common assumption that 'traffic from social opens the free window'. An Instagram reel driving to the site and then to wa.me gets the ordinary 24-hour customer service window, not the 72-hour free one. If free-window economics ever matter, the reel must link to a Click-to-WhatsApp ad, not to the site — which is a paid-media decision, and this project is explicitly organic-reach only.

Evidence: Meta pricing page: 'If a WhatsApp user messages you via a Click to WhatsApp Ad or Facebook Page Call-to-Action button using a device running our Android or iOS app (our desktop and web apps are not supported)... FEP windows remain open for 72 hours.'

Source: https://developers.facebook.com/docs/whatsapp/pricing

### Tested 2026-08-22: wa.me returns an identical HTTP 302 to https://api.whatsapp.com/send/?phone=…&text=…&type=phone_number&app_absent=0 for desktop Chrome, iOS Safari, Android Chrome, and both the iOS and Android Instagram in-app-browser user agents. No server-side platform branching occurs. wa.me also rewrites %20 to + in its own redirect.

Confidence: verified · type: data

Why it matters here: It means no user-agent sniffing is needed and no separate Instagram code path exists at the network layer — one link string is correct everywhere, which removes a whole class of speculative branching from the build. It also proves the query is form-decoded downstream, so both %20 and + survive as spaces.

Evidence: Direct test: five user agents issued against https://wa.me/15551234567?text=… with redirects disabled; all five returned 302 with byte-identical Location headers. Method and results reproducible from the transcript of this session.

Source: https://faq.whatsapp.com/5913398998672934

### Tested 2026-08-22: with full percent-encoding (encodeURIComponent, no safe characters), the characters +, &, #, %, newline and Arabic-Indic digits (٢) all round-trip through wa.me byte-perfect. wa.me did not truncate a 15,391-character URL carrying 3,000 Arabic characters.

Confidence: verified · type: data

Why it matters here: Removes two invented constraints at once. The pre-filled message can safely contain a '+966' phone number, an '&' in a party description, a '#' reference, and multi-line structure — provided you use encodeURIComponent and NOT URLSearchParams, which form-encodes space as '+' and would render a literal plus in the compose box. And the length ceiling is not in the protocol, so the message length budget should be set by human readability, not by a guessed URL limit.

Evidence: Direct test: messages containing each character class were percent-encoded, sent to wa.me, and the returned Location header decoded and compared to the source string — all matched. Length probes at 100/500/1k/2k/4k/6k/8k/12k Latin chars and 98–3,000 Arabic chars all returned 302 with the text parameter intact.

Source: https://faq.whatsapp.com/5913398998672934

### Measured 2026-08-22: Arabic text percent-encodes at ~4.44 encoded characters per source character versus ~1.47 for English. A realistic 8-line Arabic enquiry message (242 characters) produces a 1,106-character URL; the equivalent English message (258 characters) produces 410.

Confidence: verified · type: data

Why it matters here: A link-length budget expressed in visible characters silently gives the Arabic user a 2.7x larger payload than the English one, so any truncation rule written against character count will mangle Arabic first — the exact 'RTL as afterthought' failure the project is built to avoid. The budget must be expressed in encoded bytes and validated on the Arabic string, which is always the worst case.

Evidence: Direct measurement using Python urllib.parse.quote(safe='') on parallel Arabic and English enquiry messages of equivalent content; per-character expansion computed from the results.

Source: https://faq.whatsapp.com/5913398998672934

### WhatsApp's documented behaviour is that the pre-filled message 'will automatically appear in the text field of a chat' — it lands in the compose box and is not sent. The user must still press send, and can edit or delete any of it first.

Confidence: verified · type: principle

Why it matters here: There is a real, unlogged drop-off between opening WhatsApp and a message actually arriving, and it is where the enquiry funnel silently leaks. It also means any reconciliation identifier embedded in the text can be deleted by the user, so the identifier can never be the only join key. Both facts must be designed for rather than assumed away.

Evidence: WhatsApp Help Center, 'How to use click to chat': 'The pre-filled message will automatically appear in the text field of a chat. Use https://wa.me/whatsappphonenumber?text=urlencodedtext...' Read in full via browser 2026-08-22.

Source: https://faq.whatsapp.com/5913398998672934

### Utility templates must be 'non-promotional, not containing any promotional or persuasive intent' and 'specific to or requested by the user'; templates with unclear content default to marketing. Meta may recategorise an approved template with 1-day notice, and a review can be requested within 60 days. Template review is automatic and takes up to 24 hours.

Confidence: verified · type: constraint

Why it matters here: It draws the line for this exact funnel: an acknowledgement of an enquiry the traveller themselves initiated is defensibly utility; a day-3 'still thinking about Cappadocia?' nudge is marketing and will be priced and judged as such. Building the follow-up cadence without this distinction produces templates that get recategorised mid-campaign — at 5-16x the cost depending on market — or rejected before launch.

Evidence: Meta developer docs on template categorization: utility requires messages 'triggered by user actions' with no sales language; mixed utility-plus-promo content is categorised marketing; recategorisation carries 1-day advance notice with a 60-day review request window. Template docs: 'Review can take up to 24 hours.'

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization/

### WhatsApp template languages include Arabic as `ar` plus five regional variants — `ar_EG`, `ar_AE`, `ar_LB`, `ar_MA`, `ar_QA` — and French includes `fr_MA` (Morocco). Templates are never auto-translated; each language is a separate approved template.

Confidence: verified · type: data

Why it matters here: The locale layer this project has not yet settled has a concrete downstream shape: Meta already models exactly the market split in the project memory (Gulf, Levant, Egypt, Maghreb), and the existence of ar_MA and fr_MA means the North Africa question can be answered inside the messaging layer without forking the site. It also means every template is authored N times, so template count is the real cost of adding a locale, not translation.

Evidence: Meta developer docs, supported template languages reference: Arabic `ar` with regional variants ar_EG, ar_AE, ar_LB, ar_MA, ar_QA; French `fr` with variants including Morocco; over 100 codes total; 'templates don't receive automatic translation'.

Source: https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages

### Webhook deliveries must be validated with an X-Hub-Signature-256 HMAC-SHA256 over the raw payload using the app secret, require a valid non-self-signed TLS certificate, may be batched up to 1000 updates per request, and are retried with decreasing frequency for up to 7 days on any non-200 response. There is no API to recover historical webhooks.

Confidence: verified · type: constraint

Why it matters here: Three concrete build rules fall out: store the raw payload before parsing it (no replay exists if you crash), key every write on the WhatsApp message id so 7 days of retries cannot create duplicate enquiries, and never let business logic run before returning 200. In an enquiry-first product the webhook IS the conversion event log, so losing one is losing a customer.

Evidence: Meta developer docs on creating a webhook endpoint and setting up webhooks: signature validation via HMAC-SHA256 with app secret; 'Your webhook endpoint server must have a valid TLS or SSL digital security certificate... Self-signed certificates are not supported'; 'Meta retries delivery with decreasing frequency until the request succeeds, for up to 7 days'; batching up to 1000 updates; no historical recovery API.

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint/

### The `user_preferences` webhook reports marketing opt-out and opt-in with category `marketing_messages` and value `stop` or `resume`, plus a timestamp. Meta's Business Messaging Policy places the choice of opt-in method on the business — it does not prescribe a format or specify where the record must be kept — while requiring opt-in before messaging and permitting non-template replies within 24 hours of the user's last message.

Confidence: verified · type: constraint

Why it matters here: It answers the brief's opt-in question honestly: WhatsApp gives a machine-readable stop/resume signal you must store and honour, but it does not tell you where to keep your own consent record, so that obligation falls to local law (Saudi PDPL, UAE, Egypt) and to your own schema. The safe design is to keep the record in Supabase with source, timestamp, exact wording shown and locale — and to treat the inbound message itself as the opt-in for service replies, which is what the 24-hour window already encodes.

Evidence: Meta webhook reference `user_preferences` (category `marketing_messages`, value `stop`/`resume`, timestamp). WhatsApp Business Messaging Policy: businesses are 'solely responsible for determining the method of opt-in'; may 'reply to a user message without use of a Message Template as long as it's within 24 hours of the last user message'; travel is not a prohibited or restricted category.

Source: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/user_preferences/

### navigator.sendBeacon() sends an asynchronous POST that survives page unload, capped at roughly 64 KiB, and the reliable trigger is the `visibilitychange` event when visibilityState becomes 'hidden' — not `unload` or `beforeunload`, which do not fire on Chrome Android or Safari navigation and break bfcache.

Confidence: verified · type: principle

Why it matters here: This is exactly the WhatsApp handoff moment: tapping wa.me backgrounds the browser and foregrounds WhatsApp, which fires visibilitychange→hidden, not unload. Instrumenting the handoff with an unload handler — the intuitive choice — logs nothing on the majority-mobile audience this site serves, which is precisely how the analytics hole gets built in.

Evidence: MDN Web Docs, Navigator.sendBeacon(): ~64 KiB payload limit, POST only, returns boolean; 'The most reliable approach' uses visibilitychange with visibilityState 'hidden'; unload/beforeunload are unreliable on mobile and incompatible with bfcache; fetch() with keepalive:true is the alternative when a response is needed.

Source: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon

### Instagram reaches roughly 71% of adults aged 18+ in Saudi Arabia (18.2m users) and 85.5% of adults 18+ in the UAE (8.05m users) as of late 2025, with internet penetration at 99.0% in both.

Confidence: reported · type: data

Why it matters here: It grounds the attribution requirement rather than the reach claim: for this audience the reel is the top of the funnel and WhatsApp is the bottom, and the join between them is the only measurement that matters. It also means share-intent instrumentation must assume the Instagram in-app browser as a primary, not edge-case, entry surface.

Evidence: DataReportal Digital 2026 country reports for Saudi Arabia and the United Arab Emirates, citing Meta advertising resources and Kepios analysis, data as of October/late 2025.

Source: https://datareportal.com/reports/digital-2026-saudi-arabia

### No sourced figure found for the '~71-day travel consideration window' cited in the brief, and no sourced 2024-or-later speed-to-lead statistic was located within this session's tooling. The widely circulated lead-response numbers trace to 2007-2011 studies and are stale by the project's own 2023 cutoff rule.

Confidence: inferred · type: principle

Why it matters here: The follow-up cadence and the response SLA must therefore be justified by something verifiable rather than by a borrowed number. The 24-hour customer service window is a documented, hard, platform-enforced deadline and makes a far better anchor for the acknowledgement timer than any unsourced 'respond in 5 minutes' folklore. Design the cadence so it degrades gracefully if the real consideration window turns out to be 30 days or 120.

Evidence: Attempted retrieval of Expedia Group Media Solutions path-to-purchase research (DNS resolution failed) and of current lead-response studies; no primary source obtained. Reported as a negative finding rather than substituted with a remembered number.

## Design implications

- PRODUCT DECISION — ship WhatsApp Business App as the reply surface, add Cloud API via Coexistence through a BSP, and use the API for reading only. Filter BSP candidates (360dialog, Twilio, Infobip, Wati, Respond.io) on one gating question first — do you support Embedded Signup coexistence onboarding for an existing Business App number — then on Arabic UI and price. Provision a dedicated business SIM before anything else: never the operator's personal number, never a number with history outside the Business App, because a number in use on WhatsApp 'cannot be registered unless [it is] deleted first'. Migration path is Business App alone → Coexistence (additive, keeps number, 180-day history sync, contacts) → full Cloud API (irreversible, only if headcount ever justifies a true shared inbox). Add a payment method to the WABA before 2026-09-30 regardless, because that deadline stops service-message delivery.
- THE DEEP LINK — one canonical builder, no platform branching. Format: `https://wa.me/<E164 digits, no +, no leading zeros, no dashes>?text=<encodeURIComponent(body)>`. Use encodeURIComponent, never URLSearchParams or `URL.searchParams.set` — the latter form-encode space as `+`, which renders as a literal plus in the compose box. Body template, RTL-aware, ≤350 source characters (validate the Arabic string, which encodes at ~4.44x): line 1 greeting; line 2 package name; line 3 `Ref: <slug>`; line 4 departure city + IATA; line 5 dates; line 6 party composition; line 7 `#<CODE>`; line 8 a one-line note that the message is editable. Put every Latin token (slug, IATA code, dates, the reference code) on its own line in the Arabic build so the bidi algorithm never has to resolve a mixed run mid-sentence; if a Latin token must sit inline, wrap it in FSI U+2068 … PDI U+2069 (percent-encodes to %E2%81%A8 / %E2%81%A9). Do not pad with LRM/RLM by reflex — line isolation solves it more robustly and costs fewer bytes.
- THE RECORD AND THE JOIN — create the Supabase enquiry row server-side BEFORE navigation, not after. On click: POST to a Next.js route handler that inserts the enquiry and returns a 6-character Crockford base32 code (alphabet excluding I, L, O, U to survive being retyped); build the wa.me URL with that code embedded as `#<CODE>`; then navigate. Reconciliation is three-tier because the user can edit the text away: (1) exact regex match of the code in the inbound message body; (2) fallback fuzzy match on wa_id + inbound within 60 minutes of a share-intent event + package slug substring; (3) a manual 'attach to enquiry' action in the ops view for the remainder. Never let the code be the only join key. Store `phone_e164` only once it arrives from the webhook — the site never asks for it.
- THE ENQUIRY STATE MACHINE — eight states, each with one owner and one timer, implemented as a `status` enum plus a `state_changed_at` column, and mirrored one-to-one onto WhatsApp Business App labels so the operator never has to touch a second tool. received (owner: system; timer: none — set by webhook or by the pre-navigation insert) → acknowledged (owner: operator; timer: the published window; a human or template reply has gone out) → qualified (owner: operator; timer: 24h; dates, party, budget and departure city confirmed) → quoted (owner: operator; timer: quote expiry; a price-locked quote URL has been sent) → held (owner: operator; timer: the hold expiry, which must be shorter than the supplier's own release deadline) → converted | lost (terminal; `lost_reason` enum is mandatory, not free text) ; dormant (owner: system; entered automatically after 14 days with no inbound, exits on any inbound). Transitions are append-only into an `enquiry_events` table so the median is recomputable and no history is destroyed by a status overwrite.
- THE QUOTE ARTEFACT — a price-locked URL at `/q/<token>` rendered from a `quotes` row, not a PDF and not a message. It carries: the package, the exact party and dates, the total and the per-person breakdown, what is and is not included, an explicit `expires_at` rendered as a visible countdown in the traveller's own timezone, and a single 'continue on WhatsApp' button that deep-links back with the quote code pre-filled. On expiry the page must not 404 — it renders the same quote struck through with a 'request a fresh price' action, because a dead link at the moment of decision is the worst possible failure. Quote pages are `noindex` and token-guarded via RLS on an unguessable token column; they are shareable by design (families decide together in this market) so they must be readable without login but must never enumerate.
- THE FOLLOW-UP CADENCE AND ITS TEMPLATE CATEGORIES — inside the 24-hour window everything is a free hand-typed Business App reply. Outside it, only templates, and their category is a costed decision: the enquiry acknowledgement and the quote-ready and quote-expiring notices are drafted as UTILITY (user-triggered, non-promotional, no persuasive language, no price adjectives); anything that re-opens interest is MARKETING and is priced at 5-16x depending on market. Cadence: acknowledge within the published window; qualify within 24h; quote within 48h of qualification; then day 3, day 7, day 21 nudges, then dormant. Cap outbound marketing templates at three per enquiry, ever. Author each template in ar plus en, and add ar_MA/fr_MA only if North Africa is kept — every locale is a separate approved template with its own 24-hour review and its own quality rating.
- THE WEBHOOK RECEIVER — a Next.js App Router route handler at `/api/whatsapp/webhook` on Node runtime (not Edge — you need the raw body). GET returns `hub.challenge` as plain text when `hub.verify_token` matches. POST reads the raw body, validates X-Hub-Signature-256 as HMAC-SHA256 with the app secret using a timing-safe compare, writes the untouched payload to a `webhook_events` table keyed on the WhatsApp message id with a unique constraint, returns 200, and only then processes asynchronously. Subscribe to `messages` (inbound → received, stamp `received_at`), `smb_message_echoes` (operator replied from her phone → stamp `first_response_at` if null), and `user_preferences` (→ write `marketing_opt_out_at`). Because retries run for 7 days and batches carry up to 1000 updates and no historical recovery API exists, idempotency-on-message-id and store-before-parse are not optional.
- THE PUBLIC PROMISE AND THE ROSTERING RULE — the rule is: never publish a number better than what the thinnest rostered hour can deliver. With one person, publish stated hours plus a window measured against the worst hour of the week, and no live median, no counter, no 'replies in minutes'. Concretely: 'We answer on WhatsApp 09:00–01:00 Riyadh time, same day. Outside those hours, by 10:00.' Measure the median and p90 privately from `received_at` → `first_response_at` from day one. Only publish a rolling measured median once two rosters cover 08:00–02:00 AST AND the trailing 7-day sample is n ≥ 30 — and when you publish it, publish p90 beside it, because a median alone hides exactly the tail that burns people. The fallback UI when the number would embarrass is not a hidden widget: it is the stated window, which stays truthful whatever the median does.
- AFTER-HOURS AND THE HANDOFF WHEN NOBODY IS AT THE DESK — the Business App away message survives coexistence, so it is the mechanism. Schedule it against the published hours, write it in both languages, and make it state a specific return time rather than 'we will get back to you soon'. Roster explicitly against the documented 22:00–02:00 browsing peak and against Ramadan, when the peak shifts later — that is a staffing calendar entry, not a UI concern. If the desk is genuinely unattended, the site must not show a WhatsApp-first CTA that implies presence; swap the primary action to the callback form with a slot picker after the last rostered hour, and say why.
- THE CALLBACK ALTERNATIVE — a first-class path, not a fallback for the technically unlucky. Fields: name, phone (with country selector defaulting from IP region), preferred window as selectable slots inside rostered hours in the user's own timezone, and language preference (ar / en / fr). It writes into the same `enquiries` table with `channel='callback'` so one state machine and one median cover both. Its published promise is separate and stricter, because a scheduled call is a commitment to a time, not a window. Show the WhatsApp path and the callback path with equal visual weight — treating callback as the degraded option is a legibility failure for the older, higher-budget traveller who is the best customer on a package site.
- THE ANALYTICS JOIN — log two distinct events, never one. `enquiry_share_intent` fires on click via the pre-navigation POST (server-side, so ad blockers and the Instagram in-app browser cannot suppress it) and carries enquiry_id, package slug, locale, referrer, the filter state that produced the listing, and a first-party attribution id read from a cookie set on landing. `enquiry_message_received` is written only by the `messages` webhook. The gap between the two counts is the true handoff drop-off and is the single most valuable number this site can produce. Back it up with navigator.sendBeacon on `visibilitychange`→hidden as a client-side confirmation that the app switch actually happened — never on unload, which does not fire on Chrome Android or Safari navigation.
- CREDITING A REEL, A CARD OR A FILTERED LISTING — attribution is a server-side join, not a UTM read. On first landing, set a first-party `sess` cookie and insert an `attribution_sessions` row capturing referrer, landing path, full query string, UTM params if present, and locale. Every `enquiry_share_intent` carries that session id, so the enquiry inherits the whole path. For Instagram, where referrer is routinely stripped inside the in-app browser, use a distinct short landing path per reel (`/r/<slug>`) that 302s to the canonical page and stamps the source server-side — this is the only method that survives the in-app browser reliably. Report revenue back to the source by joining `enquiries.converted` → `attribution_sessions.source`, which finally makes an organic reel measurable in bookings rather than in views.
- SCHEMA — `enquiries` (id uuid, code text unique, status enum, channel enum, locale text, package_slug text, package_name text, departure_city text, depart_date date, return_date date, adults int, children int, child_ages int[], budget_band text, phone_e164 text null, wa_id text null, source_session_id uuid, received_at timestamptz, first_response_at timestamptz null, qualified_at, quoted_at, held_until, converted_at, lost_at, lost_reason enum null, dormant_at, marketing_opt_in_at, marketing_opt_out_at, consent_text_shown text, consent_locale text); `enquiry_events` (append-only transitions with actor and timestamp); `messages` (wa_message_id text unique, enquiry_id, direction enum, sent_from enum {business_app, cloud_api, user}, body text, timestamp); `quotes` (token, enquiry_id, currency, total_minor int, breakdown jsonb, expires_at); `webhook_events` (raw payload, signature_valid bool, processed_at); `attribution_sessions`. RLS on every table, deny-by-default; the anon key must reach nothing but the insert path for a new enquiry and the token-scoped read of a single quote. Money as integer minor units with an explicit currency column — never a float, and never a single implied currency across six markets.
- ESCALATION AND COMPLAINT ROUTE — publish one named human, one email address, and a stated response time for complaints separate from the sales SLA, on a page that is reachable from the footer of every page and from the post-enquiry status page. Route it away from the WhatsApp number, because a complaint sitting in the same thread as an active sale is a complaint that gets deprioritised. Log complaints as their own state so they cannot be closed by the person they are about.
- LANGUAGE OF THE REPLY — the reply language is set by the language of the site the enquiry came from and stored on the enquiry row, so the operator is never guessing at 01:00. Show it on the label. For North Africa, resolve the open French question before templates are authored, not after: template count, and therefore review cycles and per-locale quality ratings, scale with the number of locales, and Meta already provides ar_MA and fr_MA to model exactly that split.

## Anti-patterns to refuse

- Publishing a live median response time from day one because it looks like radical transparency. With one person across three time zones it is a public failure meter that goes red every night at 02:00 and during every Ramadan shift, and it converts the site's single strongest trust asset into evidence against itself. The generic move is to add the widget because a competitor has one; the correct move is to publish a window you can keep at your worst hour and measure the median privately until two rosters justify showing it.
- Jumping straight to Cloud API with a BSP shared inbox because that is what 'professional' looks like, and destroying the Business App number to do it. This is irreversible — a number in use on WhatsApp cannot be registered to the API unless it is deleted first — and from 2026-10-01 it converts every human reply into a billed service message with no volume tiers. It also throws away the free four-companion-device roster that already solves multi-agent access at this headcount. Coexistence gets the API's read access without paying either price.
- Firing the analytics event with an unload or beforeunload handler, or with a client-only GA event on click. On the mobile-majority, Instagram-in-app-browser audience this site actually has, unload does not fire on Chrome Android or Safari navigation, and client-only events are the first thing suppressed. The result is the classic symptom: WhatsApp 'converts' at an impossible rate because only the successes were ever logged. Log share-intent server-side before navigation and confirm with sendBeacon on visibilitychange.
- Building the wa.me link with URLSearchParams or template-string concatenation and testing it only in English. URLSearchParams form-encodes space as '+', which renders as literal plus signs in the compose box, and an unencoded '&' or '#' silently truncates the message at that character. Because Arabic percent-encodes at ~4.44x versus English at ~1.47x, any length rule written in visible characters mangles the Arabic message first — reproducing the exact 'RTL as afterthought' failure the project exists to avoid.
- Treating the enquiry as complete when the wa.me link is clicked. The pre-filled message lands in the compose box unsent and fully editable; the user must still press send, and many will not. A funnel that counts clicks as conversions is measuring its own optimism, and the gap between share-intent and message-received — the most diagnostic number the product can generate — never gets computed.
- Letting the enquiry arrive with no context, or into a personal phone. An enquiry that reads 'hi' from an unknown number destroys the entire premise that the human is the interface, because the operator must now re-ask everything the site already knew. Equally, routing to a personal number mixes customer history into a WhatsApp account that can never be migrated, cannot be handed to a second person, and cannot be instrumented.
- Sending follow-ups as marketing templates without categorisation discipline, or blasting via broadcast. Templates with unclear or mixed content default to marketing, which in Egypt costs 18x the utility rate, and Meta can recategorise an approved template with one day's notice. Broadcast lists become read-only under coexistence anyway, so the reflex to bulk-message has no cheap path — and a low template quality rating gets the number's sending paused, which takes the enquiry channel down entirely.
- Storing the state machine only in someone's head or only in the WhatsApp chat, with status tracked by scrolling. Without an append-only event table there is no recomputable median, no way to see which state enquiries die in, no dormancy sweep, and no way for a second person to pick up a thread. The generic competitor runs the whole pipeline out of the inbox; the differentiator is that the inbox and the database describe the same eight states, and the labels in the app are literally the enum.
- Asking for a phone number in a web form before the WhatsApp handoff. The number arrives free with the inbound webhook. Asking for it up front adds a field, adds a consent obligation, adds a validation surface across six country formats, and measurably costs enquiries — all to collect data the platform is about to hand over anyway.

## Differentiation moves

- Publish p90 next to the median, not the median alone, once measurement is honest enough to publish at all. Every competitor that shows a response time shows the flattering statistic; showing the tail — 'half of enquiries answered in 14 minutes, nine in ten within 2 hours' — is a claim a template site structurally cannot copy, because it requires instrumentation it does not have.
- Publish the hours as a living roster rather than a promise: a small always-current strip showing who is at the desk right now, in which languages, and when the next person comes on — driven off the same rostering table that sets the away message. It reframes 'nobody is here' from a failure into evidence that a real person exists, and it is screenshot-able in a way a chat bubble is not.
- Make the pre-filled message something the traveller is pleased to read. Most wa.me links carry 'Hello, I want more info'. A structured, editable, correctly bidi-isolated summary of the exact package, dates, departure city and party — that the user can amend in place before sending — is the first moment the service quality is demonstrated rather than claimed, and it happens before any human has touched the thread.
- Let the quote URL be shareable and beautiful, because in this market the decision is made by a family group, not an individual. A price-locked page with a visible expiry that survives being forwarded into a family WhatsApp group is both the conversion mechanism and an organic reach mechanism — the artefact travels further than the site does.
- Show the enquiry code back to the user on a post-enquiry status page and let them return to it without an account, so the handoff has a visible other end. Almost every enquiry-first competitor ends at 'thanks, we will be in touch', which is the moment the experience goes dark. Keeping a lit page on the site side is cheap and is the difference between a form and a service.
- Use per-reel landing paths (/r/<slug>) so that organic Instagram reach becomes measurable in bookings rather than views. It is invisible to the user and it is the piece that lets a creator-operated travel business prove which piece of content actually sold a trip — a claim almost nobody in this category can make.
- Treat the callback path as equal-weight rather than as the degraded option, with real slot selection in the user's own timezone. The highest-budget package buyer in this audience is often the least interested in typing, and every competitor buries the phone route.

## Open questions

- Which BSP actually supports coexistence onboarding for an existing WhatsApp Business App number today, and at what monthly floor? Meta requires a Solution Partner or Tech Provider with Embedded Signup and session logging, but does not publish which providers have shipped it — this needs direct verification with 360dialog, Twilio, Infobip, Wati and Respond.io before the number is provisioned, because the ordering is one-way.
- What are the exact per-message service rates effective 2026-10-01 for Saudi Arabia, UAE, Egypt and Morocco? Meta states they will match the utility/authentication rate for each market and will publish by 2026-09-01. The Morocco and Kuwait moves out of regional bands on the same date mean the North Africa figures specifically cannot be modelled from today's card.
- Does Saudi PDPL, UAE Federal Decree-Law 45/2021, or Egyptian Law 151/2020 require a specific form or retention period for a marketing consent record, beyond what Meta's Business Messaging Policy asks? Meta explicitly leaves the method to the business. The official Saudi SDAIA and Board of Experts sources were unreachable from this session, so this is unverified and needs legal review before any marketing template is sent.
- What is the true on-device behaviour of the wa.me handoff on iOS and Android, and inside the Instagram in-app browser? The network layer is now verified — an identical 302 for all five user agents, with full character fidelity and no truncation at 15KB URLs — but whether the Instagram in-app browser hands off to the WhatsApp app cleanly or interposes a chooser, and whether visibilitychange fires before the switch, can only be established on real handsets. Treat this as a required pre-launch device test, not a resolved question.
- Is there a defensible, current figure for the travel consideration window? The ~71-day figure carried into this brief could not be sourced within this session, and the widely quoted speed-to-lead numbers date to 2007-2011. The follow-up cadence has been designed to degrade gracefully if the real window is 30 days or 120, but the assumption should be replaced with measured data from the site's own first 90 days rather than a borrowed statistic.
- Is French in or out? Meta provides ar_MA and fr_MA template locales, so the messaging layer can model the Maghreb either way — but every added locale is a separate authored template with its own review cycle and its own quality rating, so template cost scales linearly with the answer. This blocks template authoring, not just routing.
- What is the exact character limit on a WhatsApp text message body? No sourced figure was found in Meta's message API reference during this session. It does not block the deep link, since the recommended ≤350-source-character budget is set by readability and verified to pass through wa.me intact, but it should be confirmed before any long template body is authored.

## Sources

- [Pricing on the WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing) · Meta / Facebook for Developers · Updated 2026-08-05 (read 2026-08-22)  
  Per-message pricing model since 2025-07-01; non-template messages free since 2024-11-01; utility templates free in an open CSW since 2025-07-01; the 72-hour Free Entry Point window and its Click-to-WhatsApp-ads-only restriction; country-to-region mapping placing Morocco/Tunisia/Algeria in 'Rest of Africa' and Kuwait/Jordan/Lebanon in 'Rest of Middle East'; the quarterly pricing calendar; the 2026-10-01 rate card moves for Morocco and Kuwait; links to the machine-readable rate cards.
- [WhatsApp Business Platform USD rate card CSV, effective July 1, 2026](https://developers.facebook.com/docs/whatsapp/pricing) · Meta / Facebook for Developers · Effective 2026-07-01 (downloaded 2026-08-22)  
  Exact per-delivered-message USD rates for Saudi Arabia, UAE, Egypt, Qatar, Rest of Middle East and Rest of Africa across marketing, utility, authentication and authentication-international. This is the primary numeric source behind every cost figure in this dimension.
- [Upcoming pricing updates for Meta Business Agent, service and utility messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages) · Meta / Facebook for Developers · Updated 2026-07-01 (read 2026-08-22)  
  The decisive finding: service messages become billable per-message on 2026-10-01 with no volume tiers, at utility/authentication rates by market; utility templates inside an open CSW also become billable on that date; delivery of service messages stops for any business without a payment method on file by 2026-09-30; October rates publish by 2026-09-01.
- [Onboard WhatsApp Business app users (Coexistence)](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/) · Meta / Facebook for Developers · Read 2026-08-22  
  That Business App replies stay free and are exempt from the customer service window while the same number runs on Cloud API; the Solution Partner / Tech Provider and Embedded Signup requirement; 20 mps throughput cap; 180-day three-phase chat history sync and contacts sync; the full feature comparison table (labels, quick replies, away message and greeting message unchanged; broadcast lists disabled; disappearing/view-once/live-location disabled for 1:1); the four linked companion devices limit.
- [smb_message_echoes webhook reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/smb_message_echoes/) · Meta / Facebook for Developers · Read 2026-08-22  
  That a message sent by the business from the WhatsApp Business app or a companion device triggers a webhook carrying id, timestamp, from and to — the mechanism that makes first-response time measurable when the human replies by hand for free.
- [user_preferences webhook reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/user_preferences/) · Meta / Facebook for Developers · Read 2026-08-22  
  Machine-readable marketing opt-out and opt-in signalling with category marketing_messages, value stop/resume, and a timestamp — the basis for the consent columns in the schema.
- [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/) · WhatsApp / Meta · Read 2026-08-22  
  Opt-in required before messaging, with the business 'solely responsible for determining the method of opt-in' and no prescribed storage location; free-form replies permitted within 24 hours of the user's last message; templates required to initiate; Meta's right to review, pause and reject templates; travel is not a prohibited or restricted category.
- [How to use click to chat](https://faq.whatsapp.com/5913398998672934) · WhatsApp Help Center · Read in full via browser 2026-08-22  
  The canonical wa.me link format, the international-format phone rule ('Omit any zeroes, brackets, or dashes'), the ?text= pre-filled message parameter with URL-encoded text, and that the pre-filled message 'will automatically appear in the text field of a chat' — i.e. it is editable and not sent automatically.
- [Direct testing of wa.me and api.whatsapp.com behaviour](https://faq.whatsapp.com/5913398998672934) · Own testing, this session · 2026-08-22  
  Verified by test: identical 302 to api.whatsapp.com/send for desktop Chrome, iOS Safari, Android Chrome and both Instagram in-app-browser user agents; %20 normalised to + by wa.me itself; byte-perfect round-trip of + & # % newline and Arabic-Indic digits under full percent-encoding; no truncation at a 15,391-character URL; Arabic encoding expansion ~4.44x versus English ~1.47x. Device-level app-switch behaviour was NOT tested and remains open.
- [Message template categorization guidelines](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization/) · Meta / Facebook for Developers · Read 2026-08-22  
  The utility versus marketing definition ('non-promotional, not containing any promotional or persuasive intent' and 'specific to or requested by the user'), that unclear content defaults to marketing, mixed utility-plus-promo counts as marketing, 1-day recategorisation notice and 60-day review request window.
- [Message templates and supported template languages](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages) · Meta / Facebook for Developers · Read 2026-08-22  
  Arabic template support as `ar` with regional variants ar_EG, ar_AE, ar_LB, ar_MA, ar_QA; French with fr_MA; no automatic translation, so each locale is a separately authored and separately reviewed template. Also automatic review 'up to 24 hours', template quality ratings and pausing.
- [Create a webhook endpoint / Set up webhooks](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/create-webhook-endpoint/) · Meta / Facebook for Developers · Read 2026-08-22  
  The hub.mode/hub.verify_token/hub.challenge GET handshake; X-Hub-Signature-256 HMAC-SHA256 validation over the raw payload; valid non-self-signed TLS requirement; batching up to 1000 updates; retries with decreasing frequency for up to 7 days; no historical webhook recovery API — the basis for the store-first and idempotency rules.
- [Business phone numbers — overview and registration](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers/) · Meta / Facebook for Developers · Read 2026-08-22  
  'Numbers already in use with WhatsApp cannot be registered unless they are deleted first' — the irreversible fork that forces a dedicated business SIM — plus verification by SMS/voice code and WABA-to-WABA number migration.
- [Navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) · MDN Web Docs · Read 2026-08-22  
  ~64 KiB POST-only payload limit; that visibilitychange with visibilityState 'hidden' is the reliable trigger; that unload/beforeunload do not fire on Chrome Android or Safari navigation and break bfcache; fetch with keepalive as the alternative. Basis for the share-intent instrumentation rule.
- [Digital 2026: Saudi Arabia and Digital 2026: United Arab Emirates](https://datareportal.com/reports/digital-2026-saudi-arabia) · DataReportal (Kepios / We Are Social / Meltwater), citing Meta advertising resources and GSMA Intelligence · Data as of October / late 2025  
  99.0% internet penetration in both markets; Instagram reaching ~71% of Saudi adults 18+ (18.2m users) and 85.5% of UAE adults 18+ (8.05m users) — grounding the reel-to-WhatsApp attribution requirement. Neither report carries WhatsApp-specific penetration data.
- [phone_number_quality_update webhook reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/phone_number_quality_update/) · Meta / Facebook for Developers · Read 2026-08-22  
  Messaging limit tiers TIER_50, TIER_250, TIER_2K, TIER_10K, TIER_100K, TIER_NOT_SET and TIER_UNLIMITED, and the ONBOARDING / THROUGHPUT_UPGRADE events — the ceiling on business-initiated conversations per day, relevant to any follow-up cadence.
