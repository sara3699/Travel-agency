# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with Supabase (Postgres, Auth, Storage, Row Level Security),
deployed to Vercel. Decided 2026-08-22. Server-side rendering was the deciding
factor: destination and package pages have to be indexable, and AI crawlers do not
execute JavaScript. Supabase was chosen for Postgres, auth, storage and row-level
security in one service, with RLS as the actual control protecting traveller data
rather than any client-side check.

Internationalisation is a library-backed layer, not hand-rolled. The operator's
instruction on 2026-08-23 was that the project must use i18n properly. The layer
must be locale-count agnostic so adding a locale is content work rather than a
rewrite. Locale routing lives under `app/[lang]` with `dir` emitted in
server-rendered HTML.

Nothing is scaffolded yet. There is no `package.json` in the repository.

## Users

Arabic-speaking travellers choosing a pre-built travel package rather than
assembling a trip. Three markets, which do not share a calendar, a payment rail or
a destination set:

- The Gulf: Saudi Arabia, the UAE, Kuwait, Qatar. Highest spend, family and group
  travel, summer heat-escape and Eid peaks.
- The Levant and Egypt: larger volume, lower ticket size, heavier reliance on
  instalments.
- North Africa: Tunisia, Morocco, Algeria, where French is the commercial second
  language rather than English.

The buying unit is usually not one person. Decisions are made across a family or a
group, over a consideration window measured in weeks, and a large part of that
conversation happens in a WhatsApp group rather than on the site.

There is a second audience, and naming it is deliberate because it pulls in a
different direction. Prospective Sara AI Studio clients and practitioner peers
read this site as proof of capability. They are served on separate routes, never
by decorating the commercial ones. See Part 14.4 of the UI/UX master document.

## Product Purpose

A website that sells curated travel packages to Arab travellers, where the
conversion event is an enquiry over WhatsApp or a callback request rather than an
online checkout. The site sells the trip; a human closes it.

It exists as a portfolio and demonstration piece. It is built to be seen, shared,
and to win client work for Sara AI Studio. When craft and funnel throughput
conflict, craft wins. That is the opposite of the usual trade and it is
deliberate.

Success has two observable forms. A traveller can decide between packages without
opening a tab per package, and reaches a human with the package, dates and party
already carried into the message. And a prospective client can look at the site
and conclude that whoever built it is worth hiring.

## Positioning

Every competitor in this category hides the same three things: the total price,
what is excluded, and who they are. This product shows all three, designs the
showing, and lets that be the brand.

Two positions follow from the audience rather than the category. Arabic is the
design lead and English inherits from it, because the harder typographic
constraint produces the better Latin result and because every regional competitor
treats Arabic as a mirrored afterthought. And the object that leaves the page is a
first-class deliverable, because the link is forwarded into a family group chat
long before it is posted anywhere public, so the unfurled preview card is the
first impression more often than the homepage is.

None of these is a claim a neighbouring product could copy quickly. Transparency
is blocked by a competitor's margin depending on opacity and by inventory data too
dirty to render honestly. Arabic craft is blocked by literacy their template
vendor does not have.

## Operating Context

Travel demand in these markets is organised by the Hijri calendar, not the Western
retail one. Ramadan, Eid al-Fitr, Eid al-Adha, Hajj and Umrah windows, per-country
school terms, and the June to September escape from Gulf heat are the real peaks.
National Days cluster in November and December. Lunar dates move with moon
sighting and cannot be hardcoded.

WhatsApp is a booking channel, not a support channel. Roughly a fifth of one major
regional operator's assisted stay bookings complete inside it.

Payment reality differs per market: mada in Saudi Arabia, KNET in Kuwait, Benefit
in Bahrain, NAPS in Qatar, OmanNet in Oman, Apple Pay across the Gulf, and
buy-now-pay-later through Tabby and Tamara. Five regional currencies use three
decimal places. None of this is in scope for the build, but the interface must not
assume otherwise.

Social discovery is platform-split and no single plan covers the region. Snapchat
is unusually strong in Saudi Arabia; the UAE inverts toward Instagram and
LinkedIn; Egypt and Morocco are Facebook-led.

## Capabilities and Constraints

Confirmed in scope: package discovery and listing, package detail, comparison, an
anonymous shareable shortlist, the enquiry and WhatsApp handoff, a post-enquiry
status page, a trust page, and editorial including a per-country travel calendar.

Confirmed out of scope: online checkout and payment. There is no PCI surface. Card
data never touches the application.

Confirmed out of scope: Umrah and Hajj. Both are regulated products. Umrah
providers must be licensed by the Saudi Ministry of Hajj and Umrah, Hajj is
quota-controlled and date-fixed, and visa rules depend on the traveller's country
of residence. Selling either as an ordinary flight-and-hotel bundle is a legal
exposure, not a design shortcut.

Catalogue provenance, decided 2026-08-23: a specimen catalogue, labelled as such
in the schema. Packages are invented under an invented house brand. The decision
carries hard consequences that exist to stop a future session filling the gap
dishonestly:

- A five-value provenance enum sits as a NOT NULL column on every priced row and
  gates the call-to-action verb in the renderer.
- No licence number, no reviews, no ratings, no testimonials, no complaint log and
  no refund statistics. The tables must be absent, not empty.
- No `Review`, `AggregateRating`, `Offer` or `Product` structured data while in
  specimen mode.
- A CI gate fails the build if any of the above appears.

Four things remain honest and buildable under specimen data, which is why they
carry the differentiation: the itemised trip receipt, which allocates selling
price rather than net cost; the priced exclusions column; the cancellation ladder,
which is date arithmetic against a rule table; and the difference engine, which
compares the catalogue to itself.

Accessibility target is WCAG 2.2 Level AA. This is a constraint, not an
aspiration; see the section below.

Explicitly undecided:

- ~~The agency name.~~ **SETTLED 2026-08-28: أنيس, Anees.**
- How many locales ship content at launch. The architecture must support Arabic,
  English and French without a rewrite. Which of them carry full content on day
  one was not settled.

## Brand Commitments

The operator is Sarra Dhaouadi, publishing as Sara AI Studio, Instagram handle
`sara_dhaouadi_official`. Every page of a visual deliverable carries the handle.
This is standing and does not need re-asking.

Arabic and English are both first-class. Right-to-left is a build-time
requirement, never a retrofit. Arabic copy is written in Arabic rather than
translated, and this binds hardest on legal and refund pages, where visibly
machine-translated Arabic is a stronger distrust signal than no Arabic at all.

All outbound text runs through the `no-ai-voice` skill before it enters the
codebase. That covers landing copy, package descriptions, interface strings,
confirmations and error messages.

The agency is called **أنيس / Anees**, settled 2026-08-28. From `uns`, the ease
felt in good company: an `anees` is the companion who puts you at ease rather than
merely the one travelling alongside you. It was chosen to sit on the product's real
differentiator, which is that a person answers you rather than a checkout.

The name is never translated. Arabic pages render أنيس, every other locale renders
Anees, and no locale gets a translated equivalent. It is one name in two scripts.

"Club Med" was proposed and rejected before this: it is a trading company, so using
it would be impersonation and trademark infringement, and its product, all-inclusive
stays at its own resorts, is not this product. A future session must not resurrect it.

No logo or identity asset exists yet beyond the typographic wordmark.

## Evidence on Hand

Real and usable:

- `docs/ui-ux/2026-08-22-master-ux-doc.md`, the standing design authority. Sixteen
  parts covering screen specifications, the Arabic contract, the design system, a
  performance budget, the accessibility contract, twelve resolved contradictions,
  provenance and operations, a 64-item refusal list, and a build order.
- `docs/ui-ux/research/`, twenty-one research studies with 511 findings and 508
  sources, each claim carrying a confidence marking and a full adversarial
  verification transcript. 397 claims were checked; 18 came back false and were
  corrected.
Absent, and future work must not fabricate any of it:

- No contracted inventory, no supplier relationships, no real prices.
- No tourism licence or registration. No IATA membership.
- No customers, no bookings, no reviews, no testimonials, no complaint history,
  no refund statistics.
- No first-party photography of any property, guide or vehicle.
- No traffic, no field performance data, no conversion history.

## Product Principles

1. Truth is a schema property, not a copy decision. Anything a reader could check
   is either backed by a real record or structurally impossible to render.
2. Show what the category hides. Total price, what is excluded, and who is
   behind it. The competitor cannot follow, because their margin depends on not
   following.
3. Arabic leads and English inherits. The harder constraint produces the better
   result in both.
4. Design the object that leaves the page. The forwarded card and the screenshot
   are distribution, not decoration.
5. Convention where the buyer is working, distinctiveness where the buyer is
   looking. Search placement, date entry and form mechanics stay conventional.
   The package card, the price block, Arabic typography, the exclusions table and
   the share artefact carry the craft.

## Accessibility & Inclusion

Target WCAG 2.2 Level AA. WCAG 3.0 is a working draft and not a compliance target;
APCA is a design tiebreaker for text over photography, not the standard.

Criteria that land hardest on this product: 24 by 24 pixel target size on calendar
day cells, focus not obscured by a sticky price bar, dragging alternatives for
sliders, redundant entry across multi-passenger forms, and accessible
authentication, where phone one-time-passcode entry is the most likely failure.

Right-to-left focus order is a correctness requirement, not a nicety. Flipping
layout with `row-reverse` or CSS `order` desynchronises DOM order from visual
order and silently breaks it in the locale an English-reading reviewer is least
likely to check.

Regional context, since an early draft of the research got this wrong: the Gulf
does have published policies. Saudi Arabia's Digital Government Authority, the
UAE's TDRA and Qatar's Mada Center all set WCAG 2.1 Level AA for government
digital services. None binds a private travel site directly, and WCAG 2.2 AA
clears all of them.

The European Accessibility Act has applied since 2025-06-28 and names e-commerce
and passenger transport services. It bites only if the site sells to EU residents,
which the current scope does not.

Beyond disability: mid-range Android devices, throttled mobile data, bright
sunlight, and an older family member booking on behalf of a group are all normal
operating conditions here, not edge cases.
