# Requirements: Mars

**Defined:** 2026-08-23
**Core Value:** A traveller can decide between packages without opening a tab per package.

Derived from `docs/ui-ux/2026-08-22-master-ux-doc.md`. Where a requirement restates
a rule from that document, the part number is given so the reasoning stays reachable.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Locale routing under `app/[lang]`, every route file nested inside the segment (14.5)
- [ ] **FOUND-02**: `dir` and `lang` emitted in server-rendered HTML, never set in a client effect (Part 4)
- [ ] **FOUND-03**: Library-backed i18n layer that assumes no fixed locale count; ar, en, fr configured
- [ ] **FOUND-04**: Reciprocal, self-referencing hreflang generated from the same route params (Part 4)
- [ ] **FOUND-05**: Logical CSS properties only, enforced by a lint rule that fails the build (Part 4)
- [ ] **FOUND-06**: Money as a minor-unit integer with explicit per-currency exponent (Part 13)
- [ ] **FOUND-07**: Token layer with framework default palette deleted so generic utilities do not compile (Part 5)
- [ ] **FOUND-08**: Arabic typeface selected first, Latin harmonised to it via `size-adjust` (Part 4)

### Visual direction

- [ ] **DIR-01**: Three complete visual worlds, each defined purely as a token set
- [ ] **DIR-02**: Each direction rendered on both the homepage and the package card
- [ ] **DIR-03**: Each direction shown in Arabic and English, RTL correct in both
- [ ] **DIR-04**: A switcher allowing side-by-side comparison of the three
- [ ] **DIR-05**: Arabic wordmark shown in both candidate forms (مارس and المريخ)

### Data

- [ ] **DATA-01**: Provenance enum as NOT NULL on every priced row, gating the CTA verb (14.1)
- [ ] **DATA-02**: Package schema with nights, departure city, board basis, hotel tier, party suitability
- [ ] **DATA-03**: Inclusions and exclusions as ordered structured rows; exclusions carry estimated cost (14.1)
- [ ] **DATA-04**: Cancellation ladder as a rule table computed against the traveller's departure date (14.1)
- [ ] **DATA-05**: Faith and women-traveller attributes as typed columns with verifier and date on the facet row (3.2)
- [ ] **DATA-06**: Locale parity as a row count, via a per-locale translation table (14.2)
- [ ] **DATA-07**: Row Level Security policy lands in the same migration as its table
- [ ] **DATA-08**: Specimen-mode CI gate failing the build on licence, review, rating or Offer markup (14.1)

### Discovery

- [ ] **DISC-01**: Homepage primary control is a constraint builder, not From/To/Dates/Passengers (3.1)
- [ ] **DISC-02**: Conventional search reachable from the header on every page (Part 1)
- [ ] **DISC-03**: Package card carries destination, nights, departure city, next departure, all-in per-person price
- [ ] **DISC-04**: Inclusion ledger on every card, excluded items struck through rather than absent (3.2)
- [ ] **DISC-05**: Second persistent price in per-day terms alongside the total (3.2)
- [ ] **DISC-06**: Departure city as persistent editable state, shown as a chip, never from geolocation (Part 13)
- [ ] **DISC-07**: Filter state held in the URL, not component state (3.2)
- [ ] **DISC-08**: Zero results names the binding constraint and offers one-tap relaxation (3.2)

### Package detail

- [ ] **PKG-01**: All-in per-person price with the party assumption stated inline (Part 13)
- [ ] **PKG-02**: Inclusions and exclusions above the fold, never behind an accordion (3.3)
- [ ] **PKG-03**: Itinerary as a real heading spine, deep-linkable per day, readable as text (3.3)
- [ ] **PKG-04**: A "who this trip is not for" block on every package (3.3)
- [ ] **PKG-05**: Gallery as thumbnails, not a dot-indicator swipe carousel (3.3)

### Comparison

- [ ] **CMP-01**: Comparison opens showing only what differs, identical rows collapsed (3.4)
- [ ] **CMP-02**: Comparison state is URL-addressable and its screenshot is clean

### Enquiry

- [ ] **ENQ-01**: Enquiry row created server-side before navigation, returning a retype-safe code (14.3)
- [ ] **ENQ-02**: Pre-filled `wa.me` deep link carrying package, dates and party, built with `encodeURIComponent` (14.3)
- [ ] **ENQ-03**: Latin tokens isolated on their own lines in the Arabic message body (14.3)
- [ ] **ENQ-04**: Named human with languages, hours and a response commitment, not a contact form (3.6)
- [ ] **ENQ-05**: Name as a single field; phone never split into three boxes (3.6)

### Share

- [ ] **SHARE-01**: Per-package OG card; no single global `og:image` (Part 11)
- [ ] **SHARE-02**: Cards generated with headless Chromium at publish time, not satori (Part 13)
- [ ] **SHARE-03**: Card under 600 KB, at least 300 px wide, ratio 4:1 or less (Part 11)
- [ ] **SHARE-04**: Plain-text trip line shipped alongside every image artefact (Part 11)

### Quality

- [ ] **QUAL-01**: WCAG 2.2 AA; visible focus ring designed as a brand asset (Part 8)
- [ ] **QUAL-02**: `prefers-reduced-motion` honoured by cross-fade, never by removing motion (Part 6)
- [ ] **QUAL-03**: LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at p75 (Part 7)
- [ ] **QUAL-04**: No third-party JavaScript on the critical path (Part 7)
- [ ] **QUAL-05**: All shipped copy passes the `no-ai-voice` skill

## v2 Requirements

### Deferred

- **V2-01**: Faceted navigation, once the catalogue justifies it
- **V2-02**: Review system, once a declared threshold of genuine reviews exists
- **V2-03**: Signature interaction: card opens into trip via View Transitions
- **V2-04**: Post-enquiry status page and quote artefact at `/q/[token]`
- **V2-05**: French content (architecture ships in v1; content scope undecided)
- ~~**V2-06**: Admin surface for content operations~~ — promoted to Phase 2.5 on
  2026-08-23. See ROLE-01 to ROLE-04 below.
- **V2-07**: Trigger calendar as a public linkable asset

### Roles and access (added 2026-08-23, Phase 2.5)

- [x] **ROLE-01**: Three actors — customer, employee, admin — with the role held in
      `user_roles` and carried in the login token, never in client-side logic
- [x] **ROLE-02**: No self-promotion. `user_roles` has no client write policy; grants
      are server-side only
- [x] **ROLE-03**: Internal staff notes in their own table, permanently unreadable by
      customers
- [x] **ROLE-04**: Optional customer accounts. Browsing, shortlisting and enquiring all
      work signed-out (refusal item 21)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online checkout and payment | Conversion is an enquiry; avoids PCI scope entirely |
| Umrah and Hajj packages | Regulated products; licensing, quotas, residence-based visas |
| On-site reviews at launch | Low counts reduce perceived value; seeding would be fabrication |
| Licence numbers, complaint log, refund medians | Specimen catalogue; these would be fabricated records |
| Map on the listing page | Answers a question nobody has asked yet; heavy third-party cost |
| Hero video and carousels | Template-identifying, and the data cost is real |
| PWA install prompts | Social arrivals land in a WebView that cannot install |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 to FOUND-08 | Phase 1 | In Progress |
| DIR-01 to DIR-05 | Phase 1 | In Progress |
| DATA-01 to DATA-08 | Phase 2 | Schema done 2026-08-23 |
| ROLE-01 to ROLE-04 | Phase 2.5 | Database done 2026-08-23 |
| DISC-01 to DISC-08 | Phase 3 | Pending |
| PKG-01 to PKG-05 | Phase 4 | Pending |
| CMP-01, CMP-02 | Phase 5 | Pending |
| ENQ-01 to ENQ-05 | Phase 6 | Pending |
| SHARE-01 to SHARE-04 | Phase 7 | Pending |
| QUAL-01 to QUAL-05 | All phases | Pending |

**Coverage:**
- v1 requirements: 45 total
- Mapped to phases: 45
- Unmapped: 0

---
*Requirements defined: 2026-08-23*
