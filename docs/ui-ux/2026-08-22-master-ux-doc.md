# Master UI/UX document

Travel Agency App · version 2026-08-22 · Sarra Dhaouadi / Sara AI Studio

This is the standing design authority for this folder. Read it before any UI work.
It is written to be followed by a future session that has none of the context of
the one that produced it.

Revised the same day it was written, after the adversarial verification pass
finished. Of 397 claims checked, 18 came back false, 12 unsupported and 10 stale.
Everything they touched has been corrected in place and the corrections are noted
where they land. Parts 13 and 14 were added afterwards, from a completeness
critic and five gap-fill researchers. No earlier version of this file was
circulated, so it was revised rather than superseded by a second dated file.

## How to use this document

Parts 1 and 2 are the argument. Parts 3 to 12 are specifications you can build
against without re-reading the argument. Part 13 settles the places where the
research contradicts itself, Part 14 covers provenance, operations and launch, and
Parts 15 and 16 are the refusal list and the build order.

The document has three kinds of statement, and they bind differently.

A rule says MUST or MUST NOT. Breaking one needs a dated note on the project page
saying why. The Arabic contract, the performance budget, the accessibility
contract, and the refusal list are all rules.

A default says SHOULD. It is the decision already made so a future session does
not have to re-litigate it. Override it when the specific case argues for it, and
say so in the commit.

A move is an idea with a reason attached. Moves are optional and ranked by tier.
Nothing breaks if a move is dropped, but the site gets more generic with each one
you drop.

Numbers that drive a decision carry their source. Where a number is secondary or
contested, it says so. The per-dimension research files under
`docs/ui-ux/research/dimensions/` carry a confidence marking on every claim:
verified means a primary source was read, reported means a credible secondary
source, inferred means agent synthesis. Do not promote an inferred claim to a
public statement.

## What we are building, and what would count as failure

A website selling curated travel packages to Arab travellers across three
markets: the Gulf, the Levant plus Egypt, and North Africa.

The operator named the failure condition herself: having the same UI that
everyone has, and not providing a unique user experience. That is the standard
this document is measured against. A page that could be swapped into a competitor
site without anyone noticing has failed, however clean it looks.

Second-order failure is the opposite mistake, and it is the one design-led travel
sites usually make. Black Tomato, Pelorus, Inspirato and Original Travel all hide
their prices and lead with atmosphere. That works because they sell bespoke,
made-to-order trips at five figures per person and cannot quote a fixed price
anyway. Copying that surface without that business model produces a beautiful
site with no funnel. Much Better Adventures is the closer analogue: it sells
fixed departures, so it shows nights and prices on the card, and it still does
not look like a template.

So the target is narrow and it is worth stating plainly. Distinctive and
transactional. Not a brochure.

## Decisions in force

These were settled on 2026-08-22 and are recorded on the project page. Treat them
as given.

Audience is pan-Arab across three markets at once: the Gulf (Saudi Arabia, the
UAE, Kuwait, Qatar), the Levant plus Egypt, and North Africa (Tunisia, Morocco,
Algeria). There is no single seasonality calendar, no single payment rail, and no
single destination set across those three. The interface has to let
market-specific content vary without forking the design.

Languages are Arabic and English at true parity. RTL is a build-time requirement,
never a retrofit.

The conversion event is an enquiry over WhatsApp or a callback request. There is
no online checkout in scope. The package page sells a conversation.

The brand is a portfolio and demo piece. It is built to be seen, shared, and to
win client work. When craft and funnel throughput conflict, craft wins, which is
the opposite of the usual trade and it is deliberate.

Stack is Next.js App Router plus Supabase, deploying to Vercel. Nothing is
scaffolded yet.

### What being a demo piece changes, and what it does not

It changes the weighting. Signature interaction, typography, Arabic craft and the
share layer all get more budget than they would on a live agency site. Payment
integration, PCI scope and licence display are specified as an upgrade path
rather than built.

It does not change the funnel. A demo with no credible path from browse to
enquiry demonstrates nothing, and a prospective client will read the absence
correctly. Build the enquiry flow properly.

It does not license fake content either. Invented package data is fine and is
required by this folder's rules. Invented licence numbers, invented reviews and
invented traveller testimonials are not, because they are the exact artefacts the
trust section says destroy credibility. Where a real credential would sit, put a
visibly labelled placeholder that reads as a specimen, not as a claim.

## Open questions

These block specific work and are not decided.

Two of the questions listed here on 2026-08-22 were answered on 2026-08-23 and
have moved into `PRODUCT.md`. They are summarised below so this section is not
read as still open.

French is settled at the architecture level and open at the content level.
Internationalisation is library-backed and locale-count agnostic, French is a
planned third locale alongside Arabic and English, and locale routing sits under
`app/[lang]` with `dir` in server-rendered HTML. Adding a locale is therefore
content work rather than a rewrite, and nothing here is irreversible. What is
still undecided is how many locales carry full content at launch, which matters
because 14.2 prices one package at 18 to 31 hours across two languages.

The supplier model is settled: a specimen catalogue, labelled as such in the
schema rather than in copy. Packages are invented under an invented house brand.
The enforcement mechanism, the provenance enum and the specimen-mode CI gate, is
in 14.1, and it is a rule rather than a preference. The four differentiators that
survive on specimen data are the trip receipt, priced exclusions, the cancellation
ladder and the difference engine.

The agency name is open, and deliberately so. It is recorded as unset in
`PRODUCT.md` so that nothing downstream invents one. Club Med was proposed and
rejected: it is a trading company, so the name is not available, and its product,
all-inclusive stays at its own resorts, is not this product.

Umrah and Hajj are out of scope until someone decides otherwise. Both are
regulated products. Umrah providers must be licensed by the Saudi Ministry of
Hajj and Umrah, Hajj is quota-controlled and date-fixed, and the visa rules
depend on the traveller's country of residence. Selling either as an ordinary
flight-plus-hotel bundle is a legal exposure, not a design shortcut. If they are
wanted, they need their own product model.

## The thesis

Every competitor in this category hides the same three things: the total price,
what is excluded, and who they are.

The differentiated site shows all three, designs the showing, and lets that be
the brand.

Two things follow from the audience rather than the category. Arabic is designed
first and English inherits from it, because the harder typographic constraint
produces the better Latin design and because every regional competitor treats
Arabic as a mirrored afterthought. And the object that travels is a first-class
deliverable, because in this market a link is pasted into a family WhatsApp group
long before it is posted anywhere public, so the unfurled card is the first
impression far more often than the homepage is.

Four pillars carry that. Three are positive and one is a refusal.

## Part 1 · The generic template, named

You cannot avoid a pattern you have not named. Twenty-four competitor sites and
theme products were read directly for this; thirteen more blocked automated
access and are covered through search results and secondary reporting. The full
teardown is in `docs/ui-ux/research/dimensions/competitive-teardown-generic.md`.

The finding is that the layout is purchasable. ThemeForest's Tourm ships 250-plus
sections and eight homepage demos. Touro ships eight homepages and a block
literally named "Why Choose Touro". The live sites converge on the same order.

### The default anatomy, in sequence

1. Full-bleed hero photograph with a search box floating on top
2. Auto-rotating promotional banner carousel
3. Destination card grid, photo plus country name plus "from" price
4. Vanity counter row
5. Three-icon "why choose us" strip
6. Testimonial carousel
7. Partner and airline logo strip in greyscale
8. Blog teaser row
9. Newsletter bar
10. Mega-footer

Musafir ships the three icons verbatim as "Best Price Guarantee", "24/7 Customer
Support", "Easy & Secure Booking". Thomas Cook India's counter row reads "140+
Years of legacy", "4,000+ Tours", "1M+ Happy Travelers", "50+ Awards". Musafir's
reads "25 MN+ HAPPY TRAVELERS / 10+ GLOBAL OFFICES / 1,000+ TRAVEL PROFESSIONALS
/ 20+ YEARS EXPERIENCE / 5,000+ DAILY GUESTS". Two unrelated companies shipped
the same grammar. Almosafer's hero reads "The entire world awaits you!".

### The copy clichés

"Explore the world", "Your journey begins here", "Unforgettable memories", "Best
price guarantee", "Discover your dream escape", "We create unforgettable
memories". Also the destination-description formula: nestled, breathtaking,
vibrant, rich cultural heritage, boasts. That formula is doubly disqualified,
because it is both the category default and a textbook machine-writing signature.

### The imagery clichés

Person in a hat facing away from the camera. Infinity pool. Santorini blue dome.
Hot-air balloons. Jumping on a beach. Western couples with wine glasses. All
bought from the same libraries, which is why every competitor looks
interchangeable at the exact moment a traveller is deciding who to trust with a
deposit.

### What is load-bearing and must be kept

Not all of it is laziness. Jakob's Law is real and two pieces of the template are
doing genuine work.

Search prominence is real. Baymard's testing found 99% of participants at OTA,
large-brand hotel and whole-property rental sites look for the booking search
immediately, and 30% of travel accommodation sites fail to make it primary
homepage content. At IHG, 78% could not see it above the fold. Every
differentiated exemplar studied here changes the shape of the search control;
none deletes it.

Black Tomato is the case worth understanding precisely, because it is easy to
mislearn. Its Feelings Engine is not the absence of a search box. It is a
natural-language one: users type how they want to feel ("I want to feel
challenged and free") into a free-text field, answered by an AI layer over
roughly 400 of the company's own itineraries, and it asks for state and travel
distance when someone wants regional results. The five-emotion dropdown on the
landing page is the marketing widget, not the engine. The global header still
carries search and a Destinations megamenu as the first nav item.

So the rule is: change the shape of the primary control, keep its prominence, and
keep a conventional path alongside it. That distinction is the single most
important correction in this document.

Conventional navigation labels are real. A visitor needs to predict what is
behind a link.

### Where the regional players are weak

This is the opportunity, so it is worth being precise. Musafir's holiday cards
carry an image, a title and "From AED 8,999". No duration, no inclusions, no
rating, no departure date. Holiday Factory's deal cards are the same shape.
Baymard recorded participants abandoning tour sites specifically because prices
were not on the cards, saying they did not want to open each one. Up to 83% of
tour sites do not always give detailed tour information, 57% omit a map on the
tour details page, 85% never link ratings out to the third-party source, and 40%
lack industry-specific filters.

A note on which Baymard benchmark family applies, because it is easy to read the
wrong one. The 83%, 57% and 85% figures above come from the Tours and Experiences
benchmark, which is the right family for a package seller. The 30% booking-search
figure comes from the Travel Accommodations benchmark. Do not mix them.

Where they are strong is payment and channel, and this should be respected rather
than dismissed. Roughly 70% of Almosafer's Q1 2025 transactions came through its
app, BNPL hit 25% of bookings, and Apple Pay 36%. About a fifth of its assisted
stay bookings complete inside WhatsApp. Its BNPL stack is Tabby and Tamara, and
its trust badge set reads 14+ Years, 16M+ Travellers, 400K+ reviewers, 4.7 stars.

One correction to a tempting assumption: Almosafer does sell holiday packages,
and they appear as a service category in the hero. The gap is not that competitors
ignore packages. The gap is that they merchandise them as one tile among flights,
hotels, transfers and eSIM, and then ship a card too thin to decide from.

So the gap is the package itself. Keep search prominence, delete the decorative
strips, and move the package's actual contents onto the card.

## Part 2 · The four pillars

### Pillar 1 · Show what everyone hides

The category's margin depends on opacity, which is exactly why transparency is
defensible. A competitor running on hidden markup cannot copy this without
changing its business.

It is also where regulation is heading, so arriving voluntarily and early is
worth more than arriving under duress. The UK is the live front: the CMA fined AA
and BSM 4.2m pounds on 2026-04-15, its first financial penalty under DMCC Act
powers, then StubHub UK in June 2026, and on 2026-08-19 it opened drip-pricing
investigations into Trainline and Virgin Atlantic, the latter over resort fees
and local taxes excluded from headline holiday prices. Its operational test is
simple: the first price customers see should be the price they pay. In the US the
FTC fee rule (16 CFR 464, effective 2025-05-12) mandates total-price prominence,
but narrowly, covering only short-term lodging and live-event tickets, so
packages sit outside it. The EU Digital Fairness Act remains announced but not
tabled as of 2026-08-22, expected Q4 2026, and its consultation names countdown
timers and confirm-shaming explicitly. Do not cite it as law.

Separate two things that get fused, because the law now treats them differently.
Fake urgency is settled: the CMA forced six major booking sites to abandon it by
2019, and it is squarely inside the current guidance. Reference pricing is not
settled. The Emma Sleep judgment of 2026-07-30 went substantially against the CMA,
which failed to establish its blanket one-to-two sales-volume test for "was and
now" pricing. This document still bans invented strike-through prices, on honesty
grounds rather than on the claim that they are unlawful.

On the package-travel rules used later as a content spec: the revised Package
Travel Directive is now law, Directive (EU) 2026/1024, adopted 2026-04-29 and in
force from late May 2026, but it does not apply until roughly March 2029 after
transposition. Its service commitments, meaning the 7-day complaint
acknowledgement, the 60-day reasoned reply, insolvency refunds within six months,
are therefore available today as a voluntary differentiator rather than an
obligation.

The evidence that transparency is also the conversion move is strong. Baymard
puts cart abandonment at 70.22% across 50 studies from 2006 to 2025, with "extra
costs too high" the top non-browsing reason at 40% and "could not calculate total
cost upfront" at a further 12%. Hiding the exclusions does not avoid the
objection. It relocates it to the moment the sale is lost.

What this pillar produces, concretely:

- One canonical all-in per-person price, computed server-side with every
  mandatory fee, with the party assumption stated inline
- An exclusions column at the same visual weight as inclusions, with estimated
  costs attached: visa fee, tourist tax, optional excursions, uncovered meals
- A price breakdown drawer on every price
- A "who this trip is not for" block on every package
- A verify-us module that puts the licence number in a copyable field next to a
  button opening the government register's own search page
- A named human with languages, hours and a real response commitment, instead of
  a contact form

Two moves in this pillar are stronger than the rest and also more exposed. The
price x-ray that states the agency's own margin as a number, and the public
complaint log with dates, categories and days-to-resolve. Both are genuinely
unusual, both would get linked, and both commit the business to something. For a
demo piece they are buildable as a designed specimen. For a live agency they need
the operator's explicit agreement first.

### Pillar 2 · Design Arabic first

This is the cheapest available differentiation, because almost nobody does it
properly and the audience notices immediately.

The generic Arabic version is an English site with `direction: rtl` bolted on and
a translated string file. To a native reader it is visibly broken: clipped
descenders, letter-spaced Arabic, the wrong digits, month names from the wrong
region, prices whose currency symbol jumps to the wrong end, and a flag icon
standing in for a language spoken across roughly two dozen states.

Designing Arabic first is not a localisation task, it is a design method. Every
layout decision has to survive the harder constraint: deeper descenders, no
uppercase, no tracking, different string lengths. The English version then
inherits a design with more air, larger type and a hierarchy that does not lean
on case. That reads as premium in Latin too.

The binding rules are in Part 4. The differentiating consequences are these.

Locale data is product behaviour, not decoration. ICU and CLDR record that Saudi
Arabia's weekend is Friday to Saturday while the UAE's is Saturday to Sunday;
that Levantine Arabic uses كانون الثاني where Gulf Arabic uses يناير; that ar-AE
defaults to Western digits while ar-EG defaults to Arabic-Indic; and that Arabic
has six plural forms against English's two. A calendar that shades the correct
weekend per visitor is roughly thirty lines of code reading
`Intl.Locale(tag).getWeekInfo()`, and no international template has it. On a
travel site, where the calendar is the primary interaction and the weekend break
is a core product, hardcoded Saturday and Sunday is not a nitpick, it is a wrong
product.

Hijri is a first-class calendar, not a toggle. Show Gregorian primary with Umm
al-Qura Hijri as a persistent secondary line on every date: departure, return,
cancellation deadline, payment due. Two traps. The default calendar for ar-SA
resolves to `gregory`, not Hijri, so the Hijri view has to be requested explicitly
through the `-u-ca-islamic-umalqura` extension. And the Hijri variants genuinely
disagree: for one timestamp, `islamic-umalqura` and `islamic-tbla` can return one
date, `islamic-civil` a day earlier, and `islamic` a day later. Pick
`islamic-umalqura` and pin it, because that is the Saudi civil calendar. Then merchandise against it, which a
Gregorian-only competitor structurally cannot do.

Arabic type is where the brand lives. Almost every regional travel site uses
Cairo, Tajawal or the system default. Readex Pro, Alexandria and Kufam are all
OFL-licensed and all under about 33 KB for the Arabic variable subset, which buys
immediate visual separation at no licensing cost and negligible weight. Noto Sans
Arabic is the trap: it is roughly 166 KB for the Arabic variable subset, about
five times the alternatives, and it is the Android system Arabic face, so the
site inherits the visual identity of a system default.

### Pillar 3 · Design the object that leaves the page

In this market the link travels by WhatsApp forward before it is ever posted
publicly, and roughly 94% of the audience is reported to discover destinations
socially. The unfurled preview card is therefore the landing page for most first
impressions, and the screenshot is the primary distribution format.

Three loops carry organic reach, and the generic site ships none of them.

The preview loop is the most mechanical and the most neglected. WhatsApp's
documented rules are strict: og:title, og:description and og:url must be in
`<head>` within the first 300 KB of HTML; og:image must be an absolute URL, under
600 KB, at least 300 px wide, with an aspect ratio of 4:1 or less; and it renders
in about ten seconds. Previews are cached for days to weeks with no purge
mechanism. WhatsApp ships no cache-clearing tool and Facebook's Sharing Debugger
does not help. The card is effectively write-once per URL, which has a real
consequence: never print a live price on a card without a URL versioning
strategy, or stale prices circulate in group chats for weeks with no recall.

There is a specific technical trap here that nobody has priced. Satori, which
sits behind `@vercel/og` and `next/og`, states plainly that full Unicode
bidirectional layout is not supported. Arabic glyphs join correctly through
HarfBuzz, but mixed Arabic and Latin ordering breaks. The Vercel bundle ceiling
of 500 KB includes fonts, and Arabic faces are large. Solving this properly is a
real engineering problem, and writing it up publicly would earn links from the
web development community while producing an asset the category cannot copy
quickly. The hard technical problem is the differentiation, and it happens to be
the same problem the product needs solved.

The artifact loop is about emitting something portable. Wordle is the canonical
case and the lesson is often mislearned: the share artifact was plain text, so it
survived every channel with no rendering risk, no size limit and no cache. Ship a
text artifact alongside any image artifact. Note also that the Wrapped format is
now commoditised, with Amazon, Apple and YouTube all shipping versions, so
copying it in 2026 signals derivative thinking. Take the mechanic, not the form.

The reputation loop is about one memorable thing done well. Awwwards weights
Design at 40%, Creativity at 20%, Usability at 30% and Content at 10%. Two things
follow. Hostile experiments lose on the very listings they chase. And optimising
for a rubric that values content at 10% is a direct route to a site that looks
expensive and says nothing about what is included or what it costs. Listings are
a byproduct of one exceptional accessible interaction, never the strategy.

One caution on emotional register, because it is the least obvious finding here.
Berger and Milkman's work indicates that sharing is driven by physiological
arousal rather than by whether content is positive: awe, anger and anxiety
spread, sadness does not. The travel default is pleasant, and pleasant is
low-arousal. That is precisely why beautiful travel sites do not get shared.
Target awe, and target the "wait, that is included?" moment.

### Pillar 4 · Refuse the template

The refusal list is Part 15. It is a rule, not a preference. The single most
common way a project like this fails is that a future session reaches for a
"travel website design inspiration" listicle, which in practice is a list of
purchasable templates with no critique of their homogeneity, and regenerates
exactly the thing this document exists to prevent.

## Part 3 · Screen specifications

### 3.1 Homepage

The job is to answer "what can I get" rather than "where do you want to go". A
package buyer usually does not have a destination yet; the destination is the
output of the process, not the input.

Default: the primary control is not a from/to/dates/passengers widget. Use one of
two opening axes, and commit to one rather than shipping both.

The occasion engine. Five to seven occasion tiles calibrated to this audience:
Eid al-Fitr, Eid al-Adha, the summer school holiday, honeymoon, first trip
abroad, graduation, family reunion. Plus a month field and an explicit "I am not
sure, show me everything" escape. This borrows Black Tomato's structure, a
primary control organised around how the trip should feel rather than where it
goes, with an axis that is culturally specific rather than imported. No GCC
operator is organised this way. If it is built as free text rather than tiles,
the free text still has to resolve into the same filterable listing.

The price-first calendar. A budget slider and a nights selector, resolving to a
month grid where each departure date shows the cheapest complete package and its
destination, colour-coded by price band. Holiday Factory has the ingredients and
buries them as options. Making the calendar the homepage is unlike anything
currently in the market, and it is inherently screenshot-shaped: a single image
carrying a real, useful, surprising fact.

Rules for this screen:

- Conventional search MUST remain reachable from the header on every page. Demote,
  do not delete.
- No auto-rotating carousel. NN/g finds users scroll past and see only the first
  frame, animated ad-like content is viewed only about 27% of the time in
  eyetracking, and dot indicators are a poor cue on mobile.
- No vanity counter row, no three-icon strip, no greyscale logo soup, no blog
  teaser row.
- The merchandising module SHOULD reorganise itself by the Hijri year: Umrah and
  the holy cities during Ramadan, Eid escapes as Shawwal approaches, heat-escape
  packages from June, National Day short breaks in November. The site should
  visibly know what month it is in the calendar the user actually lives in.

Consider the anti-hero variant: no photograph above the fold at all, opening with
search, live price data and typography. Every competitor opens with an image, so
a text-and-data opening is the loudest available differentiation, and it makes
the search the LCP element, which is also the fastest possible build. The visual
richness then moves to where it does decision work, which is the package page.

### 3.2 Discovery and listing

Taxonomy MUST be constraint-shaped, not destination-shaped. The real filters for
this audience are departure city, month, nights, per-person budget, party type,
and visa and faith constraints. A flat A-Z country list assumes the user already
knows where they want to go.

Origin is identity, not a form field. The site knows and displays "from Jeddah"
permanently, editable in one click, and every price shown is the real all-in
per-person price from that city. Global operators bury origin in a dropdown and
quote land-only prices.

Filter state MUST live in the URL. This one decision carries three separate jobs
at once: it is the shareability surface, it is the SEO surface, and it is the
back-button contract. Holding filter state in component state forfeits all three,
and forfeits the organic-reach goal with them.

Card anatomy is where the category is weakest, so this is specified tightly. Every
card MUST carry destination, nights, departure city, next departure date, all-in
per-person price, and an inclusion ledger. The inclusion ledger is a fixed
six-slot row: flights, hotel with star tier, transfers, visa, breakfast, bags.
Included items render solid; excluded items render visibly struck through rather
than absent. Nobody in the region shows exclusions, and an incumbent cannot copy
this quickly because their inventory data is not clean enough to render it
honestly.

Two additions make the card do work no competitor's does. A difference line: a
generated sentence naming what makes this trip unlike its nearest neighbours, for
example "the only 7-night here with two nights in Kazbegi", or "cheapest from
Jeddah in March". And a second persistent price in per-day terms alongside the
total, which makes trips of different lengths genuinely comparable.

Facets: order by what users click, not by schema convenience. Show result counts.
Never leave zero-count options clickable. Multi-select MUST be multi-select;
forcing one theme or one month at a time tells the user the site cannot express
their actual question. Mobile should show roughly five to seven facet groups, not
twenty collapsed accordions in database order. Never use unexplained trade jargon
as a label: half board, FIT, twin sharing, land only, physical rating 3.

Zero results are a conversation, not a dead end. Name the binding constraint,
offer one-tap relaxation, show near-misses labelled with exactly what they break,
and hand off to a human with the failed query pre-filled. When the site widens a
constraint it MUST say so in an undoable chip: "we widened 5 nights to 4-6
nights". Log every zero-result query; that log is the inventory roadmap.

Faith and women-traveller attributes MUST be structured facets, not a marketing
page. The Global Muslim Travel Index 2026, published June 2026, reports 196
million Muslim traveller arrivals in 2025, 208 million projected for 2026, 262
million by 2030 and USD 310 billion of annual expenditure by 2030. Two findings in
it matter for this interface directly: women drive close to half of arrivals, and
around 80% of Muslim travellers now use AI tools to plan, which is an argument for
the server-rendered, quotable content in Part 10. Prayer facilities, alcohol-free property versus alcohol-free room, halal
kitchen versus halal options, women-only pool versus women-only beach,
gender-segregated facilities, female-only group, distance to the Haram. Modelled
as typed columns so they filter, count, compare and appear in structured data. A
single "halal-friendly" badge is worse than nothing: it forces a binary claim no
supplier can honestly guarantee, so it reads as marketing and destroys the trust
it was meant to build. Follow HalalBooking's green, amber and red pattern, and go
one step further by attaching a dated verification and a source to each facet.

No decorative map on the listing page. For pre-built packages geography is a
route, not a pick-list, so the map answers a question nobody has asked yet, and
it costs 100 KB to 2 MB of third-party JavaScript, layout shift, and trapped
mobile scroll gestures. NN/g found users did not ask for maps on results pages
that lacked them. Make the map an optional overlay loaded on demand.

### 3.3 Package detail

This is the page that has to survive being read as text, because that is what
makes it shareable and what makes it legible to an answer engine.

Above the fold: the package name, the all-in per-person price with the party
assumption, the total for the stated party, nights, departure city, the next
departure date, and the primary action.

Inclusions and exclusions MUST NOT be behind a click. The template default is
four collapsed accordions labelled Overview / Itinerary / Included / Terms, which
buries the two blocks that decide the purchase behind a heading-interpretation
task. The exclusions column carries estimated costs, at the same visual weight as
the inclusions.

The itinerary is a semantic document. A real Day 1 / Day 2 / Day 3 heading spine
using h2 and h3, deep-linkable per day, printable, skimmable in under ten
seconds. About 71.6% of screen reader users navigate a long page by heading, so
this is required anyway; pushed further it becomes the signature. Almost no
competitor's package page survives being read as text, which is also why almost
none of them are ever shared as a link.

A "who this trip is not for" block is a rule on this page. "Not for you if you
want a 5-star all-inclusive: this one has two long driving days and a family-run
guesthouse on night three." It converts by pre-empting the objection, it reads as
unmistakably human, and a competitor selling on volume cannot afford to copy it.

Prayer-time-aware itineraries are a strong differentiator and cheap to compute:
salah windows in destination local time, the qibla bearing from the hotel, and
the walking distance to the nearest masjid or the hotel's prayer room.

Gallery: thumbnails, not an undifferentiated swipe carousel with dot indicators.
About 76% of mobile sites ship the carousel and 50% of desktop users in testing
failed to find additional images at all, which on a package page means the
visitor never reaches the room photo, and the room photo is what closes the sale.

Ship no on-site review system at launch, and this is a rule rather than a
preference. A new agency has zero reviews, an insufficient adoption signal
actively reduces perceived value, and the alternative is seeding, which is
fabrication. Build the schema (review rows bound by foreign key to a completed
booking, RLS-enforced) and keep the surface dark until a declared threshold of
genuine reviews exists per package or corridor. Say what the threshold is. Until
then the proof stack is the named human with a real response commitment,
photography of the actual guide, vehicle and property, dated bylined first-hand
trip reports, and an outbound link to a real Google Business Profile.

The bar is also rising. BrightLocal's 2026 survey of 1,002 US adults found review
standards tightening, not loosening: 47% will not use a business with fewer than
20 reviews, 74% want reviews from the last three months, 68% require at least four
stars, and 45% now use ChatGPT for local recommendations, up from 6%. Older
figures still circulating, the "13 minutes 45 seconds reading 10 reviews"
and "92% read reviews first" numbers, are from the 2019 survey and should not be
quoted as current.

When reviews do exist, they SHOULD be tied to a specific departure rather than to
the company. "The
14 September Tbilisi departure, reviewed by the six people who were on it, with
dates" is more useful than a 4.7 company rating, is absent across the market, and
pulls long-tail search. Reviews live in server-rendered HTML at their own route,
never inside a JavaScript widget where no crawler can read them.

### 3.4 Comparison

Build the difference engine. Comparison opens showing only what differs between
the selected packages, in plain sentences, with identical rows collapsed behind
"and 14 things that are the same". Baymard's testing found users preferred
differences-only over highlighted-differences.

One honest caveat, because it changes the priority. Comparison worked on desktop,
where 67% used it where offered, but was essentially unused on mobile: 3 of 38
testers at one site, zero at another. Baymard recommends spending mobile effort
on the product list instead. So build the difference engine for desktop and for
its shareable URL, and put the mobile budget into the card.

Make the comparison URL shareable and its screenshot clean. It then becomes a
distribution unit that is genuinely useful rather than marketing.

### 3.5 Shortlist

Anonymous, no signup, persistent, shareable by URL and by one-tap WhatsApp.

Travel decisions here are made by couples and families, not individuals, and the
consideration window is long, so the decision leaves the browser. Building the
shortlist as a shared object rather than a private bookmark turns the site's
retention feature into its distribution mechanism.

Forced account creation is banned. About 18% of abandoners cite required account
creation and 89% of sites block guests from save features. Supabase makes the
gated version the path of least resistance, which is exactly why it will get
built by accident unless it is prohibited here.

### 3.6 Enquiry and the WhatsApp handoff

This is the conversion event, so it gets designed rather than bolted on.

The floating green bubble that opens a blank chat is banned. The visitor then has
to retype what they were looking at.

The handoff MUST carry state. Every package generates a pre-filled `wa.me` deep
link naming the package, the dates and the party total. WhatsApp's own
link-generation documentation was not retrievable when this was written, so the
exact parameter behaviour is widely implemented but not confirmed at source: test
it on a real device on both platforms before locking the format. The site writes a
matching Supabase record before a human ever replies, so the booking reference is
identical on both sides. The customer messaging first is also what opens the free
24-hour window; business-initiated marketing templates cost money per message, so
the direction of the first message is a commercial fact, not a detail.

Named humans, not a form. A person, their photo, their languages, and a real
response commitment: "Layla, Arabic and English, usually replies in under an
hour, 9am to 9pm Riyadh". NN/g's finding that trustworthiness explains about 52%
of the variance in brand desirability, with friendliness adding about 8%, is the
whole tone strategy for a five-figure purchase. Warm is a bonus. Credible is the
product.

Where a quote form is needed, build it as a single-question-per-screen flow in
the GOV.UK style, with pre-filled defaults, no progress stepper, and a
live-updating price estimate, ending in a real number. Giving a genuine
indicative price before asking for contact details inverts the category default
and earns the phone number instead of extracting it.

The twelve-field enquiry form as a qualification gate is banned. It does not
filter serious buyers, it filters buyers. Qualification belongs in the human
follow-up.

Never split name into first and last, and never split phone into country code,
area and number boxes. About 42% of users type their full name into the first box
when it is split, separate phone boxes break autofill and paste, and for
multi-part Arab names the two-box model is structurally wrong. Latin-only regex
validation that tells a user their real name is invalid is worse still.

A phone field labelled "WhatsApp" with no consent wording produces an asset the
business cannot legally or economically use. Ask properly or do not ask.

### 3.7 Post-enquiry status

The category norm is a black box between enquiry and reply, which is where
high-consideration leads go cold.

Ship a real status page backed by Supabase: "Received 14:22. Layla is checking
October availability. Quote expected before 18:00.". It is a conversion mechanism
disguised as a courtesy. On the upgrade path to real bookings it becomes the open
booking status page: supplier-by-supplier confirmation with timestamps, a named
human, a live cancellation deadline, and a refund clock if one is running. It is
also highly shareable, because a customer forwarding their status page to a
travelling companion distributes the brand into exactly the group that is about
to book.

### 3.8 Trust and verify page

A designed page, not a footer obligation. It carries the operating licence and
registration with a copyable number and a link into the government register's own
search, financial protection, the payment processor used, the country the
database sits in, what the site never stores, a breach contact, and a dated
changelog for the privacy notice. This is the page journalists, forums and
cautious buyers link to.

IATA offers no consumer-facing lookup, so an IATA badge verifies nothing. Unverifiable badges generally are banned: "SSL Secured", "Trusted Site",
"100% Safe", Norton-style seals, a bare IATA logo with no number. A logo with no
number and no register link is an assertion, not evidence, and it signals
template loudly while proving nothing.

### 3.9 Editorial and the trigger calendar

Editorial MUST terminate in a live listing rather than a link: "the 9 trips this
article is about, leaving from your city, 4,200 to 7,800 AED". That is what makes
inspiration and intent one surface rather than two silos, and it is what lets
destination-by-theme pages survive Google's thin-content bar.

The single highest-value organic asset available is a per-country travel calendar
mapping Ramadan, both Eids, Hajj, school terms and National Days for the next
three Hijri years, with moon-sighting caveats made explicit and a visible
verification date. It earns links from travel sites, HR blogs and expat forums,
it demonstrates domain competence before anyone has booked anything, and it is
Berger's Triggers principle made literal: the cue fires on a fixed schedule for
tens of millions of people, and this is the page already bookmarked.

Never hardcode lunar holiday dates into templates or campaign configs. Ramadan
and both Eids move with moon sighting and can shift by a day or two, and a
hardcoded date means a redeploy under pressure at the highest-traffic moment of
the year.

## Part 4 · The Arabic contract

These are rules. A future session that breaks one has shipped the thing this
document exists to prevent.

### Direction and layout

`dir` MUST be set on `<html>` in server-rendered output, on a prerendered
per-locale route. Setting it in a client effect or from a store causes the
paint-LTR-then-snap-to-RTL shift, which is the exact failure the brief names.

Direction MUST come from the `dir` attribute, never from a CSS class. A CSS-only
flip looks mirrored while the bidi algorithm, form controls, text selection and
screen readers all stay in LTR mode, so every mixed Arabic and Latin string still
reorders wrongly. W3C is explicit on this.

CSS MUST use logical properties only: `margin-inline-start`, `padding-block`,
`inset-inline`, `border-start-start-radius`. One stylesheet read in mirror, never
a second RTL stylesheet or a `[dir='rtl']` override file. Bootstrap's own docs
put the cost of the two-stylesheet approach at roughly 20 to 30% larger combined
CSS, and it drifts within weeks.

Never use `flex-direction: row-reverse` or CSS `order` to flip a layout. It
produces a mirror image whose DOM order no longer matches its visual order, which
silently breaks focus order in the locale where an LTR-reading reviewer is least
likely to notice.

Icon mirroring is a per-icon semantic decision. Never apply a global
`scaleX(-1)`. Directional arrows and chevrons mirror. Clocks, checkmarks, media
play buttons and brand marks do not.

Motion MUST mirror too. Logical properties will mirror the layout and give a
false sense of completeness while every arrow nudge, slide-in panel and page
transition still moves left to right, because `transform` has no logical
equivalent. Use `scroll(inline)` rather than `scroll(x)`, scope transforms by
direction, and flip view-transition types by direction. This is the most visible
and least-fixed quality tell on Arabic sites, and therefore the cheapest
differentiator to claim.

### Typography

Arabic MUST have its own type scale and line-height, derived from measured font
metrics rather than from Latin habits. Measured Arabic ink extents run 1.39 to
2.17em against Latin's 1.20 to 1.43em, and an Arabic baseline letterform is about
20% shorter than the same family's Latin x-height. Reusing the Latin scale
produces body copy that reads small and has its descenders and diacritics shaved
off, which is the single most recognisable tell of a translated site.

Letter-spacing on Arabic MUST be zero. Tracking disconnects cursive joins. A
global heading-tightening token is therefore banned, because it cannot be undone
per component once it is global.

ALL CAPS and small-caps do not exist in Arabic. An uppercase eyebrow label
becomes indistinguishable body text. Hierarchy must come from size, weight,
colour and space.

Semi-transparent Arabic text is banned. Transparency exposes the overlapping
outlines where letters join, producing visible dark seams inside words. It is
invisible to a designer who cannot read Arabic and glaring to everyone who can.

Choose the Arabic face first and select the Latin to harmonise with it, using
`size-adjust` to reconcile the metrics. Calligraphic styles, faux-Kufi, Thuluth
and Diwani, are ceremonial and read as costume when used for interface or body
text. Reserve them, if at all, for a single logotype-scale moment.

### Numbers, dates and money

Never hand-concatenate a price or a date. ICU wraps Arabic currency output in
U+200F and uses U+066C and U+066B separators in ar-EG for a reason. Any `.trim()`,
slugify or regex strip applied to an `Intl` result silently re-breaks it.

Never format all money with two decimals. KWD, BHD, OMR, JOD and TND have three
decimal places under ISO 4217. A `toFixed(2)`, a `numeric(10,2)` column, or a
store-cents-as-integers helper silently corrupts them by a factor of ten. Nothing
throws. This is the most common and most invisible localisation bug in the
region, and it usually surfaces first in a refund or an instalment split.

Never hardcode Arabic month-name arrays or Saturday-Sunday weekends. Levantine
Arabic uses كانون الثاني, not يناير. Saudi Arabia's weekend is Friday to
Saturday, the UAE's is Saturday to Sunday.

Mixed Arabic and Latin strings, which is every hotel name, flight number and
price on the site, MUST be isolated with `<bdi>` or `unicode-bidi: isolate`.

Plurals MUST be written as ICU plurals from the start. Arabic has six plural
categories against English's two, so "N nights" has one correct form out of six,
and a translation memory cannot invent the other five if the source string was
not written as a plural.

### Routing and switching

Never auto-redirect on IP or Accept-Language. Google explicitly advises against
it, W3C notes Accept-Language is unreliable, and it prevents both users and
crawlers from reaching the other locale, halving the indexable surface for a site
whose growth plan is organic reach.

Never use a flag icon for the language switcher. No flag represents Arabic.
Language, market and currency MUST be three independent controls with autonym
labels from `Intl.DisplayNames`, so a Lebanese expatriate in Dubai can browse in
English, depart from DXB and pay in USD. The blended region dropdown most travel
sites ship makes that combination impossible, and it is a very common real user.

Never put raw Arabic in a URL slug. An 18-character Arabic slug becomes 98
characters of percent-encoding when pasted into WhatsApp, an Instagram bio or a
screenshot of the address bar, which is directly hostile to a site whose
distribution strategy is people sharing it.

Use subfolders, not subdomains. Google states language subdomains give it no
audience signal, and a non-reciprocal hreflang set is ignored entirely, so the
split costs authority consolidation and buys nothing.

### Content

Arabic copy MUST be written in Arabic, not translated from English. This applies
with particular force to the legal and refund pages: obviously auto-translated
Arabic on the documents governing a customer's money is a stronger distrust
signal than having no Arabic at all.

Parity is a product promise, and it SHOULD be stated on the site. Identical
inventory, identical filters, identical prices, identical review counts. The
audience's lived experience is that the Arabic version is a stripped-down subset,
so contradicting that expectation is itself the differentiator.

## Part 5 · Design system

A design system does not make a site distinctive. It makes a site consistent.
Distinctiveness comes from what goes in the token layer, and enforcement comes
from making the generic option physically unavailable.

### Enforcement, which is the part that usually gets skipped

Tailwind v4 moved configuration into CSS via `@theme`, and `--color-*: initial`
deletes the entire default palette, after which `bg-blue-500` does not compile.
That is enforcement rather than a style guide, it is a two-line change, and most
projects never make it. Make it.

`@property` type-checks custom properties and falls back to `initial-value` on
garbage, so tokens can be made structurally unbreakable.

Hex literals and arbitrary values in components are banned: `bg-[#0F62FE]`,
`text-[13px]`, `p-[19px]`, inline style colours. Each one silently exits the
system, escapes the contrast test and breaks dark mode. Systems die by fifty
small exceptions, not by a decision.

Add a contrast test to CI. A design system that is a document of screenshots and
adjectives permits the brand; it does not enforce it.

### The shadcn question, correctly diagnosed

shadcn's recognisable face is almost entirely its token file, meaning the
background and foreground OKLCH pairs, the near-zero-chroma neutrals, the default
radius, the default control heights and the default lucide stroke weight. It is
not the components, which are primitive behaviour you own as source. Adding a
brand `--primary` on top of the untouched rest changes nothing, because the tell
is the neutrals, the radius and the padding rhythm.

Note the primitive has changed. Since 2026-07-03, Base UI is the default component
library for new shadcn/ui installs. Radix is not deprecated, remains supported,
and is opt-in through `shadcn init -b radix`, and every component ships for both.
Any older guidance describing shadcn as Radix-based is out of date.

So: use shadcn if it helps, replace the token file wholesale, and re-author the
base variants. If you want no inherited look at all, Base UI or Ark UI ship
equivalent accessibility with zero visual opinion.

### Colour

Author in OKLCH. It reached Baseline in 2023 alongside `color-mix()` and relative
colour syntax, so perceptual ramps can be derived in plain CSS with no build-time
colour library.

The OTA default of a Booking-style blue primary with an orange Book Now button is
banned. It is both the exact generic outcome to avoid and usually inaccessible,
since mid-tone orange on white typically fails 4.5:1 for normal text.

Default: a warm off-white ground instead of pure white or a cool slate, roughly
`oklch(0.97 0.008 85)`, with a warm ink instead of near-black, roughly
`oklch(0.24 0.02 70)`. It is a single-line change that removes the template read
instantly, and it flatters destination photography in a way cool greys do not.

Default: single-accent discipline. One high-chroma accent appearing at most once
per viewport, against a low-chroma neutral system. The screenshot signature
becomes the restraint, which is the opposite of the multi-colour badge clutter
that defines package-deal sites, and restraint photographs better in a shared
image than saturation does.

One tinted 12-step neutral plus an alpha ramp covers every legitimate surface,
border and text need. Two neutral ramps is a smell.

Name tokens by role, never by appearance. `--blue-500` referenced directly in a
component makes rebranding, seasonal skins and dark mode impossible without a
find-and-replace. Appearance names belong only in the primitive tier.

Dark mode is a second design, not a palette swap, and never `filter: invert()`,
which destroys every photograph on a travel site.

On cultural colour: avoid national and religious iconography as decoration. Flag
colour fields, crescents and especially the shahada are not neutral aesthetic
choices, and the shahada carries formal restrictions on its reproduction.

### Typography

Arabic face first, Latin selected to harmonise. See Part 4.

Fluid type with `clamp()`, both bounds in rem. Raw `vw` without clamp, or px
bounds, breaks the user's text-zoom preference and violates WCAG 1.4.4. Test at
200% zoom.

Treat the price-and-dates block as a designed component in its own right:
tabular numerals, an optical-size step down for the currency, a deliberate
relationship between the headline price and the per-person qualifier. On a
package site this is the single most screenshotted element, and it is almost
universally rendered as default text.

### Layout

Container queries, not viewport media queries, for component-level layout. They
have been Baseline since 2023, so there is no remaining reason for a card that
cannot be reused in a sidebar without a variant prop.

A named-line page grid plus subgrid, so full-bleed imagery breaks out of a
constrained prose column while card internals still align across a row. That is
the technical basis of an editorial feel: asymmetry that is systematic rather
than improvised.

A distinct radius language rather than one uniform value. A repeated non-obvious
shape becomes a mark; uniform 8px rounding is what everyone ships. Express it
with `border-start-start-radius` so it mirrors correctly in Arabic.

### Trends to refuse

Glassmorphism, bento grids, AI gradient meshes, oversized cursor effects, and the
2026 3D skeuomorphic icon style. These are trends, not principles. They read as
current for about eighteen months and dated forever after, and because everyone
adopts them simultaneously they produce sameness rather than distinction. Borrow
the structural idea (one custom consistent illustration system used identically
across site, OG cards and social) and not the styling.

## Part 6 · Motion contract

Motion is the cheapest thing to add and the most expensive thing to get wrong. In
2026 the premium-agency look is available off the shelf, which means the default
configuration of the default libraries is the generic look. Differentiation
cannot come from having motion. It has to come from one motion idea structurally
tied to what a travel package is.

### The one signature interaction

The card opens into the trip. The package card's hero and title morph into the
detail hero through a shared-element view transition, and the itinerary then
advances on a scroll-driven day rail. One continuous metaphor, functionally
informative rather than decorative, and impossible to bolt onto a template.

Build it on native CSS scroll-driven animations and View Transitions with zero
animation JavaScript. Scroll-driven animations run off the main thread and
shipped in Safari 26 on 2025-09-15; same-document View Transitions became
Baseline newly available on 2025-10-14. The audience's browser mix makes this
usable: Saudi mobile is roughly 46% Safari and about 50% iOS, and Firefox, the
one holdout on scroll timelines, is negligible here.

Pair it with Speculation Rules `prerender` at moderate eagerness on the two most
likely package links. Chrome documents prerender as producing near-zero LCP, so
the photo you tapped expands into the detail hero with no white flash and no
spinner. That reads as a native app, and it is the single most-repeated
interaction in the funnel.

Design one frame of that interaction to be the screenshot: pick the moment that
is most beautiful as a still, make it hold with no half-opacity text and no
motion blur, keep the handle present, and give it a stable deep link.

### Everything else

A disciplined token set of functional transitions in the 120 to 320 ms band,
named easing curves registered with `@property`. A consistent, slightly unusual
easing curve across every transition is a genuine brand asset and costs nothing
per component.

Peak-end reasoning applies: memory is built from the intense moments and the
ending. Twelve small effects spread evenly across every section produce cost and
risk with no memorable peak.

### Banned

Full-page scroll-jacking and pinned horizontal sections carrying text. NN/g found
the majority of participants disoriented, task-oriented users severely agitated
and ready to leave, and that altered scroll rate combined with readable text was
the worst usability of anything tested, with every problem worse on mobile. A
traveller comparing three packages is exactly the user this destroys.

Global smooth scrolling through Lenis or ScrollSmoother. Lenis's own README
documents a 60fps ceiling on Safari and 30fps in low power mode, no CSS
scroll-snap support, and anchor links disabled by default. With Safari at roughly
46% of Saudi mobile, this makes the site feel worse than doing nothing.

Word-by-word headline reveals and animated taglines. NN/g states directly that the
logo, the tagline and the main headline must not be animated, and that moving elements are frequently mistaken for ads.

Repeating scroll fade-ins with no element persistence, which is the default
configuration of AOS and most reveal-on-scroll snippets. Fading in text and
images at the same time, which NN/g found overwhelms users; alternate so only one
element type moves at a time.

A three.js or globe.gl globe on the landing page. It is 178 KB to 506 KB gzipped
before a single destination photo, and it is simultaneously the most predictable
idea a travel site can have. `cobe` delivers a credible globe for 5.9 KB, and an
SVG route line on a `view()` timeline delivers most of the emotional payload for
effectively nothing.

Custom cursors, magnetic buttons and image trails as the differentiator. They are
packaged primitives now, and they are pointer-only, so they contribute nothing to
the roughly 59 to 65% of this audience on touch.

Autoplaying hero video with motion running past five seconds and no control. WCAG
2.2.2 is Level A, the baseline conformance level, and requires a pause, stop or
hide mechanism.

### Reduced motion

`prefers-reduced-motion` MUST be honoured, and reduce does not mean none. Setting
`animation: none !important` destroys the spatial relationship a listing-to-detail
transition exists to communicate, leaving reduced-motion users with a worse
mental model than everyone else. Swap translate for cross-fade.

Ship a visible reduce-motion toggle in the footer, persisted per user. Roughly
half of all pages declare the media query and almost none expose a control. Then
design the reduced-motion branch as a deliberate second aesthetic (cross-fades,
colour shifts, instant state changes) rather than as a degradation, and say so on
an accessibility page.

WCAG 2.3.3 is Level AAA, so a reduced-motion branch will not surface on a
standard AA compliance pass. It gets skipped by default rather than by
decision, which is why it is a rule here.

## Part 7 · Performance budget

Performance is a differentiator in this category because almost nobody is fast.
Only 48% of mobile origins pass Core Web Vitals, AVIF sits at roughly 1% of
images served, and 57% of LCP images on the web are still JPEG. Being genuinely
fast on a photography-led site is rare enough to be a brand attribute.

The regional picture inverts the usual assumption. Gulf bandwidth is
world-leading, with UAE median mobile reported at 672.87 Mbps in June 2026, so
bytes are not the binding constraint in Riyadh or Dubai. Latency, round trips and
main-thread work are. But do not over-correct: LCP is dominated by round trips
and main-thread work rather than throughput, image and script object count
predicts bandwidth sensitivity even on fast connections, Egypt's networks are
weaker, and roughly a third of Gulf traffic is still desktop.

### The largest architectural risk, which is not a UI decision

Vercel has a Dubai region, `dxb1`. Supabase has no Middle East region at all.
Median round-trip time Dubai to Frankfurt is 112.9 ms against Dubai to Mumbai at
30.9 ms. Four sequential queries against a Frankfurt Postgres burns roughly 450 ms
of TTFB before a single byte ships, which is about 40% of an LCP budget spent on
geography.

This has two consequences. Query design has to avoid sequential round trips, and
destination and package pages should be statically generated or incrementally
revalidated rather than rendered per request. It also has a legal consequence,
covered in Part 12: every traveller record leaves the Kingdom by architecture.

### Budget

| Metric | Budget | Note |
|---|---|---|
| LCP, mobile field | under 2.5 s at p75 | The "good" threshold |
| INP, mobile field | under 200 ms at p75 | INP replaced FID |
| CLS | under 0.1 at p75 | |
| LCP image transfer | under 150 KB | AVIF, art-directed per breakpoint |
| Total fonts, both scripts | under 120 KB | Arabic subset dominates this |
| Third-party JS on the critical path | 0 KB | Everything deferred |
| Initial JS, listing page | under 180 KB gzipped | |
| Hero video | not on the critical path | See below |

Enforce these in CI. A budget nobody fails on is a wish.

### Images

The full-bleed autoplay hero video is banned. Be precise about why, because the
usual argument is wrong. With `preload="none"` or `"metadata"` plus a poster, the
poster is the LCP candidate and the video bytes never touch the LCP critical
path. The real costs are data, decode and CPU, INP, and the fact that it is the
single most template-identifying element in the category. A 6-second 1080p loop
lands in the low megabytes against roughly 130 KB for a poster frame, which is a
data-cost argument on a mobile connection, not an LCP one. If a video ships at
all, it is never `autoplay` with `preload="auto"`, and it always has a control,
because WCAG 2.2.2 is Level A.

Replace it with art-directed full-bleed photography using genuinely different
crops per breakpoint through `<picture>`. A site that is visibly more photographic
than its competitors while being far lighter is a contradiction people notice.

On format, resist the AVIF-always reflex. Next.js's own documentation puts AVIF at
roughly 20% smaller than WebP, takes longer to encode, and still recommends WebP
for most cases. An independent re-test on this project's own reference photographs
produced savings between about 1% and 13%, strongly dependent on image content.
So: test on your actual photography, use AVIF where it measurably wins on the LCP
hero, and do not blanket-enable both formats, which doubles the transformation and
cache matrix.

Never lazy-load the LCP image. HTTP Archive found 9.5% of pages lazy-load their
own LCP element. Equally, never set high fetch priority on more than one or two
images.

Bound the image matrix. Leaving Next.js `deviceSizes` at its 8-entry default,
enabling both AVIF and WebP, and allowing multiple qualities produces a
multiplicative number of billable transformations and cache entries per image,
and Next.js caches each format separately. On a site with hundreds of package
photos that is a surprise invoice and a cold-cache latency problem at once.

Placeholders: store a dominant colour per photo at upload and use it as the
placeholder ground, with a roughly 100-byte inline WebP LQIP resolving into it.
Prefer this to BlurHash and ThumbHash, which are seductively small but require
JavaScript to decode, so on the slowest connections, exactly where the
placeholder matters most, nothing paints until JS has loaded and run. It also
gives the brand a recognisable loading behaviour: a considered wash of the
destination's own colour rather than a grey skeleton.

Skeletons MUST match the final content box exactly. A skeleton whose height
differs from the resolved content converts a loading state into a layout shift.

### Fonts

The Arabic font tax ranges from about 8.9 KB to 123.8 KB per weight depending
purely on family choice. Arabic subsets cannot be trimmed the way Latin can,
because contextual presentation forms are required.

Preload, use metric overrides with `size-adjust` to eliminate swap shift, and
self-host. Choosing a light Arabic family and pairing it with one variable Latin
face, then spending the saved weight on a distinctive display cut for headlines
only, yields a more characterful voice at lower total weight. Let the constraint
drive the aesthetic.

### Third parties

Every third party is added with a measurement or not at all. Median third-party
inclusion chains are three deep, so five vendors is not five scripts. The
`worker` script strategy does not work in App Router, so there is no rescue
after the fact.

Never drop Instagram's or TikTok's embed script into the page for social proof.
It costs hundreds of kilobytes and over a second of blocked main thread, and when
the traveller goes private or deletes the post the page develops a hole with no
fallback. Self-host the footage.

## Part 8 · Accessibility contract

This is the one dimension where correct and different point the same direction.
The WebAIM Million of February 2026 found 95.9% of home pages with detected WCAG
2 failures and 56.1 errors per page, the first reversal of a seven-year improving
trend. Its top four failure types map almost exactly onto what this site does
most: low-contrast text at 83.9%, missing image alt at 53.1%, missing form input
labels at 51%, and empty links at 46.3%. The generic travel template fails all
four by construction.

Target: WCAG 2.2 AA. WCAG 3.0 is a Working Draft as of 2026-03-03 and explicitly
not citable as more than work in progress; APCA remains a candidate rather than a
normative method, so use it as a design tiebreaker for dark photographic overlays
and not as the compliance target.

The European Accessibility Act has applied since 2025-06-28 and explicitly names
e-commerce and passenger transport websites, apps and electronic tickets. Any
EU-facing sale pulls the site into scope.

The Gulf has its own policies, and an early draft of this research wrongly
concluded it did not, because the W3C WAI policy list carries no GCC entries and
that list disclaims being comprehensive. It does. Saudi Arabia's Digital
Government Authority requires WCAG 2.1 Level AA as the minimum for government
websites, alongside the Saudi Web Accessibility policy and the Disability Rights
Law. The UAE issued a National Policy for Digital Accessibility in March 2024,
with TDRA setting WCAG 2.1 Level AA for federal government sites, apps and
e-services. Qatar runs a National e-Accessibility Policy with the Mada Center.
None of these binds a private travel site directly, but they set the regional
expectation, and WCAG 2.2 AA clears all of them.

### The WCAG 2.2 criteria that land on travel components

Target size of 24 by 24 CSS px, which is the calendar day cell. Focus not
obscured, which is the sticky price bar. Dragging alternatives, which is map
panning and price sliders. Redundant entry, which is the multi-passenger form.
Consistent help. And accessible authentication, which is phone OTP, the default
Gulf login pattern and the single most likely 2.2 failure on this site.

### Rules

Contrast is a floor, not a preference. White display type over photography needs
a real mechanism. Frosted glass through `backdrop-filter` may be the look but
cannot be the guarantee: it renders nothing if the element is fully opaque, and
any ancestor with opacity below 1, a filter, a mask, a clip-path or
`mix-blend-mode` turns into a backdrop root and silently scopes the blur to
nothing. Use a real scrim or gradient underneath.

Thin low-contrast grey secondary text is banned for the details that decide a
booking: inclusions, cancellation terms, baggage, meal plan, the price footnote.
On a travel site this is worse than a compliance failure, because the information
a buyer needs to trust the price is rendered least legibly.

Every icon-only control needs an accessible name. Heart, share, compare, filter,
map toggle. A tooltip is not an accessible name and disappears on touch.

The six-box auto-advancing OTP input that blocks paste is banned. It is a direct
3.3.8 failure through the transcription clause. CAPTCHA in front of the booking
form is banned; it is the number one reported problem item in WebAIM's screen
reader survey.

Date of birth and passport expiry MUST NOT use a calendar picker. Nobody scrolls
back forty years through a month grid. Use GOV.UK's three labelled text inputs in
a fieldset with `bday-*` autocomplete tokens. The calendar belongs only on
departure and return dates.

`outline: none` on focus is banned. `:focus-visible` has been Baseline since
March 2022, so the old justification no longer exists, and SC 1.4.11 puts the
indicator on a 3:1 floor against adjacent colours. Design the focus ring as a
brand asset: a two-tone ring that reads correctly over dark hero photography,
white cards and the map. A site that is visibly, beautifully keyboard-navigable
is a thing designers screenshot.

Filter results MUST be announced through a live region, never by moving focus.
Moving focus to the results heading is a change of context that rips a keyboard
user out of the filter they were still adjusting.

Never clear the passenger form on a declined card or a validation failure. It is
a 3.3.7 Level A failure and the highest-frustration moment in the funnel.

Alt text: a gallery of forty destination photos does not need forty
keyword-stuffed strings, which converts a navigation aid into forty consecutive
spam announcements. Decide per image what is informative and what is decorative,
and write the alt in the page's language.

Captions on testimonial video are a production standard, in both languages,
burned in for social and as a track on site. The WCAG 1.2.2 requirement and the
Instagram sound-off requirement are the same requirement, which is the strongest
possible argument for a solo operator's production budget.

Watch the fixed-position pile-up: sticky price bar plus WhatsApp bubble plus
cookie banner plus newsletter slide-in can leave under 200 px of unobstructed
content on a 640 px viewport, into which the focused element must somehow land.

### The differentiating move

Ship a plain view toggle: the same package with photography suppressed,
inclusions, exclusions and terms as structured text, and the price breakdown as a
real table. It costs little, because the accessible text layer has to exist
anyway for the gallery and map alternatives. It loads instantly on a mid-range
Android over throttled data. And it is the version a family actually forwards to
the person paying.

Publish a dated, specific accessibility statement naming the conformance target,
what was tested, on what, with which assistive technology, and what is known to
fall short. Given that 95.9% of home pages have detectable failures, a statement
that admits specific gaps reads as competence.

## Part 9 · Copy rules

Every string that ships runs through the `no-ai-voice` skill before it enters the
codebase. That is a folder rule and it applies to landing copy, package
descriptions, UI labels, confirmations and error messages.

The realistic risk on this project is not that competitors sound generic. It is
that this site's own first draft does.

Banned, because it is both the category cliché and a machine-writing signature:
nestled, breathtaking, vibrant, boasts, rich cultural heritage, unforgettable
journey, discover your dream escape, your journey begins here, we create
unforgettable memories. The destination-description formula in general.

Write specifics instead. Name the hotel, the hours, the trade-off. A page that
names specific properties, specific driving times and specific compromises cannot
be confused with anyone. Compare what the differentiated exemplars actually ship:
Eleven's "No one will believe you, and that's okay.", Nihi's "This is not simply
an escape.", Black Tomato's "Go with a question / Bring back the answer." One of
these gets screenshotted. The other gets skipped.

Reading level matters here. Travel pages have one of the lowest tolerances for
complex vocabulary, and simpler copy is reported to convert substantially better.
Ornate bilingual brochure prose also reads as AI-written, which is the precise
opposite of the creator-brand advantage.

Error and validation copy is a real opportunity, because the competitive bar is
on the floor: 93% of e-commerce sites fail to write adaptive context-specific
validation messages and 31% have no inline validation at all. Say what is wrong
and how to fix it.

Empty states sell. "Nothing in Georgia under 4,000 SAR in August. Late September
starts at 3,450. Or tell Layla the budget and she will build it." Competitors
ship "No results found." The failure state is the cheapest place on the site to
look better than everyone else.

Never label a button "Book" when it opens a contact form. NN/g documented exactly
this failure on a travel site. It breaks the link promise at the moment the
visitor was leaning in, and it is worse than an honest "Get a quote".

Arabic copy is written in Arabic. See Part 4. Localisation covers formats,
symbols, imagery, name and address ordering and business-process logic, not text
substitution.

## Part 10 · Discovery

Discovery has split into two channels that reward opposite habits, and one
codebase has to serve both.

Google is effectively the only search engine that matters in the Gulf, reported
at about 95.95% share in Saudi Arabia and 95.93% in the UAE as of July 2026.

### What is worth marking up, and what is theatre

The rich-result surface for travel has quietly collapsed. HowTo rich results were
removed in 2023. FAQ rich results stopped rendering on 2026-05-07. TouristTrip,
TouristAttraction and Trip have never produced a Google rich result at all.

The markup with a live visual payoff on a package page is Product plus Offer or
AggregateOffer, plus AggregateRating, plus BreadcrumbList. Google bars
star review snippets on Organization and LocalBusiness nodes when the reviewed
entity controls its own reviews, which is exactly what a travel agency would
naively do, and it invites a manual action. Product markup on the listing page is
also a policy violation, not a near-miss, because Product rich results only
support pages focused on a single product.

TouristTrip with an ordered itinerary ItemList is still worth shipping, but for a
different reason: it makes the site legible to AI trip planners as a trip rather
than a SKU. Judge it on that, not on rich results.

llms.txt is theatre. Ahrefs' study of 137,210 domains found 97% of published
llms.txt files were never fetched, and no major provider has confirmed reading
them. Google's own documentation says there is no special markup and no AI file
needed; eligibility is being indexed and snippet-eligible.

### What actually decides AI visibility

AI crawlers do not execute JavaScript. Anything rendered client-side is invisible
to them. Fetching the package catalogue from Supabase in the browser makes the
entire product line invisible to ChatGPT, Claude and Perplexity, and generic
React travel templates do exactly this.

There is a specific Next.js trap: the streaming-metadata path appends metadata to
`<body>` for any bot not matched by its `HTML_LIMITED_BOT_UA_RE` regex, which
does not list GPTBot, OAI-SearchBot, ClaudeBot or PerplexityBot. Verify metadata
placement for those agents explicitly.

Keep AI referral in proportion, though. It is reported at about 0.32% of traffic
across 101,574 sites. Build for it because it is cheap and compounding, not
because it is a channel yet.

### What earns citation and links

Original data, comparison tables, and clean claim-and-evidence structures. The
package anatomy component, meaning an itemised priced breakdown rendered as a
real HTML table, is quoted by LLMs, screenshotted by humans, and avoided by
competitors because opacity is their margin. Reviews with real names, dates and
photos at their own indexable route were the single largest AI citation class for
branded prompts, and most agencies bury them in a JS widget.

E-E-A-T for travel rests on first-hand experience, and Google's canonical example
of the experience signal is literally visiting a place. Dated, bylined trip
reports with the operator's own photography, with the author's `sameAs` pointing
at the real Instagram profile, are simultaneously the hardest thing for a
template competitor to fake and the most human thing on the page.

### Programmatic pages, and where they become spam

Spinning up thousands of city-by-month pages from one template with the city name
swapped is the textbook definition of doorway abuse. The failure is not the
automation. It is generating a page before there is a distinct real answer to put
on it. Every generated page needs real editorial enrichment sitting on real
filtered data, ending in a live count-bearing listing.

Arabic search behaviour needs its own targets. Gulf travellers query in dialect
and in Arabizi transliteration, so MSA-translated keyword targets can have
effectively no search demand, and the page then ranks for nothing in either
language. Render destination names in Arabic script, Latin script and the common
transliteration as a deliberate typographic lockup rather than as hidden keyword
text, because the same traveller may type تبليسي, Tbilisi or Tiblisi.

Do not blanket-block AI crawlers as a content-protection reflex; it removes the
site from ChatGPT search answers while achieving nothing about training data the
models already have. Equally, blocking Google-Extended does not opt you out of AI
Overviews, and Google says so.

## Part 11 · The share layer

This is a build deliverable with its own acceptance criteria, not a marketing
afterthought.

### OG cards

Per-package generated cards through `ImageResponse`, carrying destination,
nights, departure city and all-in price. A single global og:image is banned:
because the OG spec prefers the first og:image, a card set in the root layout
also silently overrides any per-route card added later. That is the sameness
failure rendered directly into the sharing channel.

Constraints, all of them hard: under 600 KB, at least 300 px wide, aspect ratio
4:1 or less, absolute URL, tags inside the first 300 KB of `<head>`, and the
whole thing must render in about ten seconds. Compose in CSS rather than
embedding a full-bleed photograph, because a photo-heavy card blows the 500 KB
bundle and pushes the PNG past WhatsApp's ceiling, at which point WhatsApp shows
no image at all, which is indistinguishable from having no OG tags.

Arabic composition is the hard part. Satori does not do full Unicode bidi. Either
solve it, or compose Arabic cards so that no line mixes scripts. Test every card
in both languages before shipping.

Filtered listing URLs and shortlists get cards too, so pasting a search or a
saved list into a chat renders as a designed object. The thing people share is
often the search, not the trip.

### The screenshot

Design an explicit share region with a fixed aspect ratio, rendered both as the
OG image and as a 9:16 story export: price in the viewer's currency with correct
minor units, the instalment split, the halal facet badges, dual-calendar dates,
the licence mark and the handle. Put the credential on the card itself, not just
in the footer, because that is where the trust decision gets made when a package
is forwarded into a family group.

Add a "screenshot this" affordance rather than pretending screenshots do not
happen: a button that renders a self-contained card and shows it full-bleed to
capture.

### The text artifact

Ship a plain-text or emoji artifact alongside every image artifact. It has no
size limit, no cache problem and no rendering risk, and it survives every
channel. That was the actual mechanic behind Wordle.

### Banned

The horizontal row of Facebook, X, Pinterest and LinkedIn icons. It is the
universal signal of a templated site, it ignores that sharing here happens in
WhatsApp and in screenshots, and it produces almost no shares. Use a generated
artifact plus the OS share sheet.

Share-to-unlock, share-nag modals and discount-for-a-post mechanics. Wordle never
asked; the format simply made sharing socially safe.

Gating the artifact behind signup. The artifact's job is to leave the site and
reach people who have never heard of it. A signup wall converts a growth loop into
a lead form.

### The in-app browser problem

Most social traffic arrives inside Instagram's or TikTok's WebView, which does
not share state with the browser. Three consequences follow and all three are
silent failures that look like abandonment in analytics.

"Continue with Google" as the primary sign-in fails there, and Google explicitly
discourages WebView OAuth. Magic-link-only authentication, the default in every
Supabase tutorial, is broken too, though for a more specific reason than usually
stated. It is a property of the PKCE flow: the code verifier is created and stored
locally when the flow starts, so the code exchange has to happen in the same
browser and on the same device. An in-app-browser arrival almost guarantees the
email opens somewhere else. Use email OTP (a six-digit code) or the server-side
token_hash flow, both of which survive a browser switch. Both link and OTP are
limited to one request per 60 seconds and expire after an hour by default.

Attribution must be captured server-side on first request. WebKit's ITP caps
JavaScript-written cookies at 24 hours the moment it detects link decoration,
which is exactly what a UTM-tagged Instagram link is, and caps script-writable
storage at seven days. Client-side attribution produces a dashboard full of
"direct" traffic and no idea which reel sold which trip.

Do not spend effort on PWA install prompts for first-touch social traffic. Chrome
gates `beforeinstallprompt` behind interaction plus engagement, and the WebView
cannot install at all.

### Message match

The landing page must match the video frame for frame. If the first screen is not
the footage the viewer just watched, the click has already been half-wasted.
Reel-shortlinks that resolve to the exact package a video was about make that
routing trivial. Re-cutting a vertical reel into a horizontal 16:9 "brand video"
breaks frame-match and discards the burned-in captions that carried the meaning
without sound.

One counterintuitive finding worth acting on: reverse the trust hierarchy and put
the messy proof above the polish. Baymard finds customer-submitted photos are
perceived as more objective and trustworthy than official imagery, and TikTok's
own advertiser guidance says to look not overly polished. Lead with
traveller-shot phone footage and real DMs, and place the cinematic reel below as
the aspiration layer. Nearly every competitor does the exact opposite.

## Part 12 · Data, privacy, and legal constraints on the interface

Handled as a bolt-on, compliance ships three ugly artefacts everyone else ships.
Handled as design material, the same constraints produce a site that visibly
behaves better.

### The three facts that drive everything

Saudi Arabia's PDPL defines sensitive data to expressly include religious belief,
health data and location data. So a dietary-requirements dropdown, a wheelchair
access checkbox and a browser geolocation call are all sensitive-data processing
in the primary market, not neutral form fields.

Supabase has no Middle East region while Vercel does. Every traveller record
therefore leaves the Kingdom by architecture, which triggers the transfer regime
and must be disclosed.

The status of the UAE PDPL Executive Regulations is unresolved and must be checked
against a primary UAE source before any UAE-facing contractual decision. The
commonly cited legal summary is current only to January 2025 and says they were
unpublished; several 2026 sources assert implementing rules now exist. What is
confirmed either way: UAE electronic marketing is opt-in under the 2023 Trading by
Modern Technological Means Law and Cabinet Decision 56/2024, and the Cyber Crime
Law imposes AED 50,000 to 500,000 for unlawful collection and processing.

The GCC has no ePrivacy-style cookie law, and Saudi Arabia has no cookie-specific
legislation at all. The EU-style consent wall is legally unnecessary for most of
this audience, so shipping one anyway is self-inflicted damage to the first
impression.

### Rules

Progressive data disclosure: browse, then enquire, then confirm, then documents.
Passport number, date of birth and nationality MUST NOT appear in an enquiry or
checkout form. Collect them through a secure link close to departure. This is
legally better, it strips fields off the highest-stakes screen, and it is a
product promise a competitor cannot copy without rebuilding their flow.

A meal-preference dropdown listing halal, kosher, Hindu and vegetarian as a
required field is banned. It is a religion-revealing field, mandatory, sitting
between last name and phone number: special-category data under GDPR Article 9
and sensitive data under the Saudi PDPL, collected from everyone including the
people who did not need it. Reframe it as an optional, warmly written "how can we
look after you" step with explicit consent and a stated deletion date. This is
one of the rare cases where the lawyer's answer and the brand's answer are the
same.

Never auto-request browser geolocation on page load.

The consent banner is geo-scoped, self-hosted, bilingual, RTL-correct, with zero
layout shift and two equal-weight buttons. Never a full-screen interstitial over
the hero. Never a grey reject text link next to a bright accept button, which is
the canonical dark pattern and reads as cheap. Never pre-ticked marketing boxes
or bundled consent. Never a cookie wall. And never load a third-party CMP through
GTM at the top of head, which blocks the parser, imports someone else's design
language, and concentrates a burst of script loading behind the accept click,
wrecking INP at the exact moment of first interaction.

Card data MUST never touch the app. Use the PSP's hosted element and theme it. A
custom-styled card input moves the site from SAQ A to SAQ A-EP or SAQ D for a
marginal aesthetic gain.

Supabase specifics, and these connect to an existing risk on this project.
`NEXT_PUBLIC_` is a publication decision, not a scoping convenience: putting it
on the secret or service-role key, which carries `bypassrls`, inlines it into the
browser bundle and hands every visitor unrestricted read and write access to
every traveller record. RLS is the actual security control, not React logic, and
the Data API is directly reachable with the publishable key, so a table shipped
before its policies is readable and writable by anyone. Never use a public
Supabase storage bucket for document uploads.

Package-travel pre-contractual information rules, which run to 17 mandatory items
in the UK and EU model, are not a burden here. They are a ready-made content spec
for the most trustworthy package page in the market. Use them even though this
site is not EU-facing.

Cancellation terms MUST NOT be unstructured prose in a modal or a link to a PDF.
Build the date-aware cancellation calculator: enter your departure date, see your
exact refund position on any given day as a table. It converts the most
anxiety-laden question in package travel into an interactive, shareable answer.

Legal pages are bilingual and the Arabic is written, not machine-translated.
Kuwait requires bilingual explicitly, and everywhere else it fails the
informed-consent standard.

## Part 13 · Resolved tensions

The dimensions of this research contradict each other in twelve places. A future
session that reads only one section will reopen an argument that was already
settled. These are the resolutions.

### Search in the hero

The evidence for search prominence and the evidence against the metasearch box
both hold, because they are about different things. Baymard's 99% finding
describes shoppers who already have a destination. A package buyer usually does
not. The conflict is about the shape of the control, not its prominence.

Resolution: ship a prominent, above-the-fold, server-rendered primary control that
IS the LCP element, and make it the constraint builder (leaving from, month,
nights, who is going, budget per person) rather than From, To, Dates, Passengers.
Give it a visible escape into the browsable listing. Validate with five moderated
Gulf sessions, never with an A/B test the traffic cannot support.

### Arabic share cards

Three requirements cannot all be true inside satori: no full Unicode bidi, a 500
KB bundle ceiling that must also hold an Arabic font, and a demand that the Arabic
card be the more beautiful artefact.

Resolution: stop trying. Generate share cards with headless Chromium at publish
time, which gives full HarfBuzz shaping and correct bidi with no bundle cap, write
the PNGs to Supabase Storage, and have the `opengraph-image` route serve the
stored asset. This costs a publish-time job and an invalidation rule, and removes
a whole class of silent rendering failure. The workspace already uses exactly this
Chromium-render approach for Arabic PDFs, so the toolchain exists. Keep satori for
Latin-only cards if a runtime path is ever needed.

### A price on a card that cannot be purged

WhatsApp caches previews for weeks with no purge, which argues for a content hash
in the URL. Search needs a stable canonical URL, and shareable filter state needs
byte-identical URLs.

Resolution: two URL classes. The canonical package URL never changes and never
carries a hash. Share actions mint a short link under `/s/[code]` that resolves
server-side, which also gives the dark-social instrumentation the research asks
for, and can be re-minted when price or inclusions change materially. On the card
itself, either print the price with a visible "verified DD MMM" date, or leave the
price off the image and carry it in the plain-text trip line, which has no cache
and no size limit. Define "material change" once and write it to the project page
with the date.

### Personalisation against sensitive-data law

Departure city wants to be persistent global state. Location is expressly
sensitive data under the Saudi PDPL.

Resolution: departure city is a product question, not a profiling signal. Ask it
plainly as the first control, store the answer in a first-party cookie and the
URL, show it as an always-editable chip, and never call the browser geolocation
API at all. Use the edge country header only for coarse currency and
payment-method defaults, visibly labelled and one tap to change. Every
personalised surface carries its reason string ("because you are leaving from
Jeddah"), which is the trust move and the lawful-basis story at the same time.

### Motion against performance and accessibility

Resolution, as three standing rules. Motion carries no information the static page
does not already carry, and the decision band (price, party total, inclusions,
exclusions, dates) never animates. The signature interaction is CSS-native with
zero animation JavaScript in the initial bundle, gated behind
`@supports (animation-timeline: view())` with a reduced-motion branch that
cross-fades. Every animated element declares its box through `aspect-ratio` or a
reserved min-height, so its CLS contribution is structurally zero. Prerendering is
a Chromium-only progressive enhancement, capped at two, and the transition must
still read correctly as a plain fast navigation on iOS Safari.

### Urgency

One dimension permits three database-backed urgency devices. Two others call for
zero urgency and a public pledge.

Resolution: the pledge wins on marketing surfaces, and the permission survives
only where a server-side fact exists. No timer of any kind on a listing, package
or landing page. The only permitted countdown is a seat or price hold with a
server-persisted deadline that cannot reset on refresh. A remaining-seat count
only where the number is a real supplier allocation, with a visible "updated N
minutes ago". Because the supply model is undecided, the launch default is none of
them, and the pledge page says so plainly, which is a stronger position than any
of the three devices.

### All-in pricing against how package pricing actually works

Five dimensions demand an all-in first price. Package travel is priced per person
on a twin-share assumption, varies with party composition and departure date, and
carries different VAT regimes (Saudi 15%, UAE and Oman 5%, Bahrain 10%, Egypt 14%,
Qatar and Kuwait 0%).

Resolution: reframe the pledge as "the first price you see is the complete price
for the party you told us about", which forces party composition to be an early
input rather than a checkout field. That is the same conclusion the regional
research reaches for cultural reasons. Any "from" figure carries its assumption
inline on the same line: per person, 2 sharing, all fees included, departing
Jeddah 14 March. Where a component is genuinely live, show a verified-at timestamp
and offer a price-locked quote with a visible expiry instead of an asterisk. Model
price as a structured object with minor-unit integers and a per-currency decimal
count, so a three-decimal currency can never be rendered with two.

### Radical transparency against commercial reality

Nothing in the research checked whether supplier contracts permit disclosing net
rates, or whether a business with no booking history can publish any of these
honestly.

Resolution: keep the transparency that is contract-safe and verifiable, drop the
rest. Priced exclusions, the date-banded cancellation ladder, verification dates
and a "how we price and rank" page all survive. Margin disclosure is replaced by
the safer and equally persuasive "what the same trip costs if you book the parts
yourself" comparison, computed server-side, which the reader can check and which
leaks no confidential net rate. Complaint logs and refund medians ship only once
there is a real, non-zero history. Never as a designed component with invented
rows.

### Arabic-first against the English-preferring segment

Three decisions keep getting fused. Separate them.

Design lead: Arabic first, as a constraint on type, line-height, hierarchy and
layout. This costs nothing and improves the English build.

Routing: `/ar` and `/en` as equal prerendered subdirectories, `x-default` pointing
at a language-choice-capable landing page, no automatic redirect, a persistent
visible switcher with autonym labels, and the choice stored in a cookie.

Register: Modern Standard Arabic for trust, legal and answer-block content, which
is also what assistants quote; Gulf-inflected phrasing for calls to action, social
copy and merchandising. Record the register rule per string class in the design
system so future sessions cannot drift.

### Database region

One dimension recommends Mumbai on latency (30.9 ms from Dubai against 112.9 ms to
Frankfurt). Another recommends Frankfurt for a mixed audience, notes the Saudi
transfer regime requires a documented pre-transfer risk assessment with no
adequacy list published, and records that Supabase was ISP-blocked in the UAE in
September 2025.

Resolution: this is not primarily a latency decision. Remove the database from the
critical rendering path first, with package, destination and itinerary pages
prerendered or incrementally revalidated with cache tags, zero sequential queries
in the render path, and live availability behind Suspense. The region choice then
costs almost nothing on LCP and can be made on legal and availability grounds.
Mitigate the blocking risk structurally by never calling Supabase from the
browser: all data flows through same-origin route handlers, which also fixes the
AI-crawler JavaScript problem in Part 10. Write the region, the reasoning and the
transfer analysis to the project page with a date.

### Reviews against a site with no bookings

Resolved in 3.3: no on-site review system at launch, schema built, surface dark
until a declared threshold of genuine reviews exists.

### Portfolio craft against the evidence on award-bait

Resolution: spend the craft budget where the buyer is looking. Distinctiveness is
mandatory on the package card, the price and dates block, Arabic typography, the
exclusions table, the comparison view and the share artefact, which are the
surfaces that are both decision-critical and screenshot-critical. Convention is
mandatory on search placement, date entry, form mechanics and the enquiry flow.
The one piece of spectacle is a single bounded signature interaction with its own
URL, shipped with full keyboard operability and a reduced-motion path, so it can
be submitted, screenshotted and linked without ever sitting in the path to
purchase.

## Part 14 · Provenance, operations, and launch

The first sixteen research dimensions all optimised for the traveller and all
assumed a real operating agency. Neither assumption holds here. This part covers
what that changes.

### 14.1 Catalogue provenance, and the demo boundary

This is the largest hole in the whole research set, and it has to be closed before
the data model is written.

Roughly a third of the recommended differentiators are trust artefacts whose
entire value is that a reader can check them. On a portfolio build with no
contracted inventory and no booking history they cannot be populated honestly, and
the failure mode is not a weaker interface. It is fabricated records. An invented
licence number, an invented reviewer, a synthetic refund median and a hard-coded
seat counter are misrepresentation, and they are the exact conduct the trust
section cites regulators acting on.

The rule that makes this unforgeable is to put truth in the schema rather than in
a copy decision.

Adopt a five-value provenance enum as a NOT NULL column on every priced row:
`contracted`, `supplier_live`, `partner_listed`, `public_sample`, `illustrative`.
Gate the call-to-action verb on it in the renderer, so only `contracted` and
`supplier_live` may render Book. Everything else renders "Ask about this trip" or
"See it on [partner]". That is one column and one switch statement, and a future
session cannot undo it by editing copy.

Ship the provenance chip as a design-system component, rendered inside the same
visual bounding box as any number whose provenance is not contracted or live.
Footer disclaimers are worthless when the growth model is people screenshotting
single cards. Applied consistently across price, seat count, verification date and
index figure, the chip reads as rigour rather than apology, and it is itself a
visual signature no competitor has.

Two differentiators need no real inventory at all, which makes them the strongest
things available to build today. The cancellation ladder is a policy computed from
a rule table and date arithmetic against the traveller's own departure date: zero
inventory, zero supplier dependency, zero staleness. And the difference engine
compares your own catalogue to itself, so build it over composition rather than
price (nights, star band, board basis, transfers, flight included, distance band),
because composition differences never go stale.

The trip receipt is also safe, on a point worth knowing: it allocates the selling
price, not the net cost, so it engages no supplier contract. Make it sum-checked
in the database, with a constraint rejecting any component set whose included rows
do not sum to the all-in per-person price, and a check that an estimated row must
carry a source URL. An estimate without a citable source is an invented number,
and the constraint is what stops one appearing at 2am in month four.

Derive `last_verified_at` from a verifications table holding subject, facet,
timestamp, verifier and source, rather than storing it as a column. A derived
value cannot be hand-seeded with a lie.

Treat staleness as a four-stage ladder rather than a boolean: fresh renders fully;
ageing surfaces "checked on [date]"; stale hides the number, keeps the page
indexable, swaps price for "ask for the current price" and drops Offer markup;
expired drops from listings and facets but keeps the URL alive and surfaces the
next comparable departure. Prefer demote-and-replace over 404, because deleting
URLs destroys the link equity the whole organic-reach strategy depends on.

Cap the owned catalogue at 24 packages for this build, and make the cap a
positioning claim: "we run 18 packages, here they all are". Verification capacity
sets the number, not ambition.

Add a CI gate that FAILS the build in specimen mode if any row carries
`contracted` provenance, if any Review, AggregateRating, Offer or Product JSON-LD
is emitted, if any allocation total is non-null, or if any licence identifier
exists. Pair it with the harder rule that the `reviews`, `ratings`,
`testimonials`, `complaints`, `licences` and `refund_stats` tables must be absent
rather than empty. A table that does not exist cannot be quietly filled.

### 14.2 Content operations

Every differentiator in this document is a recurring editorial bill, and it has
not been priced anywhere else.

One package built to this specification, meaning roughly thirty typed attributes,
priced exclusions, a cancellation ladder, ordered itinerary beats, eight to
fifteen first-party photographs with alt text in two locales, natively written
Arabic and English, and a dated verifier on every faith facet, comes to roughly 18
to 31 hours the first time a property is used and 10 to 16 hours on reuse. Twelve
packages is seven to eight full-time weeks. Three hundred is about two
person-years. Re-verification adds two to three hours per package per year.

That number is the reason the catalogue is capped, and it is the reason the
completeness gate exists.

The editing surface should be a bespoke Next.js admin under `/(admin)`,
Arabic-first and mobile-first, behind Supabase Auth with RLS as the enforcement
layer. The reasoning is structural rather than aesthetic: the live facet counts,
comparison table and difference engine are SQL aggregates over typed columns, so
the system of record has to stay in Postgres. That rules out any headless CMS that
moves content out of it. The publish gate has to be hand-written in any tool
anyway, because draft states routinely bypass required-field validation.

State the fallback now so it is not relitigated later: if the admin build exceeds
three weeks of effort, adopt Directus pointed at the same Supabase Postgres,
specifically for its whole-studio RTL support. Never edit production content in
Supabase Studio, which has no draft state, no bilingual pairing, no publish gate,
and no record of who changed what.

Two schema points carry most of the value. Locale parity should be a row count
rather than a hope, so put translations in a `package_i18n` table with a primary
key of package and locale, and a boolean recording whether that locale was
written natively or translated. And the verifier and date belong on the facet
row, never on the package, so a claim about the women-only pool carries its own
provenance.

Maintain a completeness score through triggers on the child tables, and gate
publication on it.

### 14.3 The enquiry service layer

The decision that a WhatsApp enquiry is the conversion is an operations commitment
wearing an interface costume, and it has a hard date attached.

Meta's pricing documentation, updated 2026-08-05, states that from 2026-10-01 it
charges per message for all service messages, meaning every free-form human reply
inside the 24-hour window that has been free since 2024-11-01, with no volume
tiers. Any business without a payment method on file by 2026-09-30 has
service-message delivery stopped. That removes the assumption the enquiry model
rests on, which is that inbound-led human conversation is free.

There is a documented escape and it is this section's whole answer. Under
Coexistence a single number runs on the WhatsApp Business App and the Cloud API at
the same time. Meta states that replies sent from the Business App continue to be
free and are not subject to the customer service window, while the Cloud API still
receives every inbound message as a webhook and, through `smb_message_echoes`,
every reply typed by hand on the phone. The human keeps a free, untimed reply
surface. The database still gets both timestamps. The API is for reading, not
sending.

So: ship the WhatsApp Business App as the reply surface, add the Cloud API through
Coexistence via a provider, and use the API read-only. Provision a dedicated
business SIM first, never a personal number and never a number with history
outside the Business App, because a number already in use cannot be registered
without being deleted first.

The deep link has one canonical builder and no platform branching. Use
`encodeURIComponent`, never `URLSearchParams`, because the latter encodes a space
as `+` and it renders as a literal plus in the compose box. In the Arabic build,
put every Latin token (the reference code, the IATA code, the dates) on its own
line so the bidi algorithm never has to resolve a mixed run mid-sentence; where a
Latin token must sit inline, wrap it in FSI and PDI.

Create the Supabase enquiry row server-side BEFORE navigation, not after. On
click, post to a route handler that inserts the enquiry and returns a
six-character code from an alphabet excluding I, L, O and U so it survives being
retyped, embed that code in the message, then navigate. Reconciliation has to be
three-tier, because the user can edit the text away: exact code match, then a
fuzzy match on sender plus a recent share-intent event plus the package slug, then
a manual attach action. Never let the code be the only join key. Store the phone
number only once it arrives from the webhook; the site never asks for it.

Model the enquiry as a state machine with one owner and one timer per state, and
mirror the states onto WhatsApp Business App labels so the operator never touches
a second tool. Write transitions append-only into an events table so the median is
recomputable and no history is destroyed by a status overwrite.

The quote is a price-locked URL at `/q/[token]`, not a PDF and not a message. It
carries the package, the exact party and dates, the total and the per-person
breakdown, inclusions and exclusions, and a visible expiry in the traveller's own
timezone. On expiry it must not 404: render the same quote struck through with a
"request a fresh price" action, because a dead link at the moment of decision is
the worst possible failure. Quote pages are `noindex` and token-guarded through
RLS.

One honest constraint on the published promise. One person cannot hold a live
public median across three time zones including the late-night and Ramadan peaks.
Publish a window that is actually covered, and say what happens outside it.

### 14.4 Two audiences

This site has to sell packages to Arab travellers AND function as the proof piece
that wins studio work. Left implicit, that tension resolves badly by default: the
site becomes a portfolio object with a beautiful hero and nothing decidable on the
package page, or the studio value stays invisible and the piece wins nothing.

Resolve it by route, not by decoration.

The commercial routes stay commercial, and win on craft that is legible without
explanation: the package card, the price block in Arabic, the bilingual share
artefact.

A separate indexed layer at `/build` carries the practitioner argument as live
evidence: the design system rendered from the real tokens with computed contrast,
the performance budget with real field data, a written engineering piece on
solving Arabic bidi in generated share images, the motion contract, and the dated
accessibility statement. Each is a distinct object with its own distribution
channel. None of them appears in the traveller's path except as one footer line.

Every future build session should state which audience a change serves. A change
that serves neither is not a change worth making.

On where the reach actually comes from: gallery submission costs money per entry
and is scored by a function that weights content at 10%. A single well-written
engineering essay on Arabic typography reached the front page of Hacker News in
June 2026, in a topic space with almost no competition. Writing-led distribution
dominates gallery submission for this operator.

### 14.5 Launch shape

The sequencing rule has a sharp edge. An item belongs in version one if it is
architecturally irreversible, OR if the stated failure mode, looking like everyone
else, is caused by its absence. Everything else waits for volume the site does not
have yet.

Irreversible, and therefore in version one whatever its payoff date: locale
routing with every route file under `app/[lang]` and `dir` in the server-rendered
HTML; reciprocal self-referencing hreflang, since a non-bidirectional set is
ignored entirely and a half-implementation is worth zero rather than half; logical
properties only, with a CI lint that fails the build on physical directions
outside an allowlist; money as a minor-unit value object carrying its own currency
exponent, never assuming two decimals; the season and occasion model; filter state
in the URL; a server-rendered catalogue; a token layer with the Tailwind defaults
deleted; the share-card route; a frozen analytics event contract; and RLS from the
first migration.

Six cold-start screens have to be designed rather than defaulted, because they are
what a first visitor actually sees: an empty comparison tray, a filter combination
with no matches on a thin catalogue, a listing with twelve items, a package with
no reviews, a price index with one data point, and a search with no history.

On twelve packages, faceting does not earn its place. The version-one information
architecture is editorial, grouped by occasion window, with the facet layer
arriving when the catalogue justifies it.

The market has a forcing date. Ramadan 2027 is projected to begin around 8
February 2027 with Eid al-Fitr around 9 to 10 March, which is when Gulf package
demand and the Umrah window peak. Content and indexing need to be in place months
ahead of that, not during it. A launch plan that ignores the Hijri calendar wastes
a year of seasonality.

## Part 15 · The refusal list

If a future session is about to ship any of these, stop.

### Layout and structure

1. Full-bleed hero photograph with a search box floating on it
2. Auto-rotating banner or hero carousel
3. Vanity counter row
4. Three-icon "why choose us" strip
5. Greyscale partner and airline logo soup
6. Blog teaser row as a homepage fixture
7. Undifferentiated card grid of photo plus country plus "from" price
8. Four collapsed accordions labelled Overview / Itinerary / Included / Terms
9. Decorative map on the listing page
10. Swipe carousel with dot indicators as the package gallery

### Pricing and persuasion

11. "From $499" with an asterisk, or any per-person price without the party total
12. Mandatory fees revealed after commitment
13. Countdown timers, especially ones that reset on refresh
14. "3 people are viewing this" and any invented demand signal
15. Struck-through prices that were never charged
16. Pre-ticked insurance, seat selection or flexible-booking add-ons
17. Confirm-shaming decline copy
18. Testimonial carousel with stock headshots and first-name attribution
19. Unverifiable trust badges, including a bare IATA logo with no number
20. A global "X people booked this month" counter on a new site

### Forms and flow

21. Forced account creation before prices, saving, or enquiry
22. Twelve-field enquiry form as a qualification gate
23. Name split into first and last; phone split into three boxes
24. Passport number, date of birth or nationality in the enquiry or checkout form
25. Required meal-preference dropdown
26. Calendar picker for date of birth or passport expiry
27. Six-box auto-advancing OTP that blocks paste; CAPTCHA before the booking form
28. Clearing the form on a validation or payment failure
29. "Book" as the label on a button that opens a contact form
30. Confirmation page that says only "thank you, your reference is #48213"

### Arabic

31. `[dir='rtl']` override stylesheet, or a second RTL stylesheet
32. Direction set by CSS class instead of the `dir` attribute
33. `dir` set in a client effect
34. `flex-direction: row-reverse` or CSS `order` to flip layout
35. Global `scaleX(-1)` on icons
36. LTR motion in the Arabic build
37. Latin type scale and line-height reused for Arabic
38. Letter-spacing, ALL CAPS or small-caps on Arabic
39. Semi-transparent Arabic text
40. Hand-concatenated prices and dates; `toFixed(2)` on money
41. Hardcoded Arabic month names or Saturday-Sunday weekends
42. Flag icon as the language switcher; blended region dropdown
43. Raw Arabic slugs in URLs
44. Auto-redirect on IP or Accept-Language
45. Machine-translated Arabic anywhere, and above all on legal and refund pages

### Technical

46. Fetching the catalogue client-side from Supabase
47. Filter state held in component state instead of the URL
48. A single global og:image
49. Lazy-loading the LCP image
50. Autoplay hero video on the critical path
51. Three.js globe on the landing page
52. Global smooth scrolling and scroll-jacking
53. `animation: none !important` under reduced motion
54. `outline: none` on focus
55. Tailwind's default palette left enabled; shadcn's stock token file
56. Hex literals and arbitrary values in components
57. Instagram or TikTok embed scripts in the page
58. Public Supabase storage bucket for uploads; tables shipped before RLS policies
59. `NEXT_PUBLIC_` on any secret
60. Full-screen cookie interstitial; grey reject link beside a bright accept

### Process

61. Sourcing visual reference from "best travel website design" listicles, which
    are in practice lists of purchasable templates
62. Chasing gallery listings as the strategy rather than as a byproduct
63. Quoting a borrowed travel conversion benchmark as a target. Travel-sector
    benchmarks do exist and are free to read, but none of them measures a package
    purchase: Unbounce publishes landing-page conversion medians, Ruler Analytics
    publishes a cross-industry travel figure, and both are landing-page or lead
    measures. The honest statement is that no benchmark measures the right thing,
    not that none exists. Either way it is not a target
64. Shipping AI-written copy without the humanising pass

## Part 16 · Build order

The order matters, because three of these are expensive to retrofit and cheap to
build in.

Before any component: settle the French question, decide the catalogue provenance
model from 14.1, delete Tailwind's default palette, choose the Arabic face and
derive the Latin from it, set the token architecture, and stand up locale routing
with `dir` server-rendered under `app/[lang]`. Retrofitting RTL into a Latin-first
design system touches every component, icon, animation direction and form layout,
and it is one of the most expensive rewrites available. Retrofitting the locale
segment moves every route file.

Then the data model, because the interface promises depend on it. The provenance
enum on every priced row. Money as a minor-unit object carrying its own currency
exponent. All-in pricing computed server-side, inclusions and exclusions as
structured columns rather than prose, the cancellation ladder as a rule table,
faith and women-traveller attributes as typed columns with the verifier and date
on the facet row, and itineraries as an ordered beat list. RLS policies land with
each table, never after, and the specimen-mode CI gate lands with the first
migration.

Then the package card, because it is the unit the whole site is made of and it is
where the category is weakest.

Then listing with URL state, then the package page, then the enquiry and WhatsApp
handoff, then the share layer, then the signature interaction. Facets wait for a
catalogue big enough to need them; on twelve packages the version-one information
architecture is editorial, grouped by occasion window.

The signature interaction comes last deliberately. It is the most visible thing
and the most tempting to start with, and it is worthless attached to a generic
card.

One dated item sits outside the build order and cannot wait for it. If the
WhatsApp enquiry model is going to be real, a payment method has to be on the
WhatsApp Business account before 2026-09-30, because from 2026-10-01 Meta charges
per service message and stops delivery for accounts without one. See 14.3.

## Sources and research records

Sixteen research dimensions plus five gap-fill studies, 511 findings, and 508
distinct sources. Every dimension went through an adversarial verification pass:
397 claims were checked, 234 confirmed, 123 partially true, 18 false, 12
unsupported and 10 stale. Every dimension came back rated mostly solid, and no
dimension survived unamended.

The method, including what this research does not give you, is in
`docs/ui-ux/research/2026-08-22-method.md`. Per-dimension records with confidence
markings and the full verification transcript are under
`docs/ui-ux/research/dimensions/`. The deduplicated source list is
`docs/ui-ux/research/2026-08-22-sources.md`.

Three standing cautions on the numbers in this document.

Published travel conversion benchmarks are not reliable and are not targets. This
is stated as a rule in the refusal list because it is the most likely number to
be misused.

Several widely repeated figures were traced and found to be unsupported, and they
are named here so nobody reintroduces them: the "84% of sharing is dark social"
figure traces to a pre-2016 study, the "journalists are 3.2x more likely to cover
original data" multiplier has no traceable primary source, and the "35-50% Arabic
engagement uplift" is second-hand. Do not put any of them in public copy.

Regulatory positions move. The UK CMA actions, the FTC fee rule scope, and the EU
Digital Fairness Act status were all current as of 2026-08-22 and all three are
active files. Re-check before making a public claim that rests on one.
