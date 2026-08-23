# Roadmap: Mars

**Created:** 2026-08-23

Phase order follows Part 16 of the master document. Three items are expensive to
retrofit and cheap to build in, so they lead regardless of when their payoff
lands: locale routing, the token layer, and the money model.

## Phase 1: Foundation and visual direction

Scaffold, locale layer, token architecture, and three candidate visual worlds
rendered on the homepage and the package card in both scripts.

Covers FOUND-01 to FOUND-08, DIR-01 to DIR-05.

Done when: the app runs, `/ar` and `/en` both render server-side with correct
`dir`, the framework default palette does not compile, and three directions can be
compared side by side on both surfaces in both languages.

## Phase 2: Data model and specimen catalogue

Provenance enum, package schema, structured inclusions and exclusions, cancellation
rule table, faith facets, per-locale translation rows, RLS, and the specimen-mode
CI gate.

Covers DATA-01 to DATA-08.

Done when: a package can be represented end to end with honest provenance, and the
build fails if a licence number or review appears.

## Phase 2.5: Three-actor identity, roles, and enquiry capture

Pulled ahead of the public-site phases by operator decision of 2026-08-23. The admin
surface was previously deferred to v2 as V2-06; the roadmap below keeps its relative
order behind this phase.

Customer, employee and admin as first-class roles. Role in `user_roles`, carried into
the login token by an auth hook, enforced by RLS on every table. Optional customer
accounts with verification off. Enquiry capture written server-side only, with the
private `/q/<token>` journey for customers with no account.

Covers ROLE-01 to ROLE-04, ENQ-01 (schema half).

Done when: a customer cannot read another customer's enquiry, an employee cannot edit
package content, an employee cannot assign work to a colleague, nobody can promote
themselves, and none of it depends on React getting it right.

**Database complete and verified 2026-08-23.** Application layer (Supabase clients,
server action, sign-in screens, admin surface) not yet built.

## Phase 3: Discovery and listing

Constraint-builder homepage, the real package card, URL-held filter state, the
persistent departure-city chip, and the zero-result recovery.

Covers DISC-01 to DISC-08.

Done when: a visitor can shortlist without opening a tab per package.

## Phase 4: Package detail

All-in price with its party assumption, inclusions and exclusions above the fold,
itinerary as a document, the "not for you if" block, thumbnail gallery.

Covers PKG-01 to PKG-05.

Done when: the page survives being read as plain text.

## Phase 5: Comparison and shortlist

Difference engine, anonymous shareable shortlist.

Covers CMP-01, CMP-02.

Done when: comparing three packages shows only what differs.

## Phase 6: Enquiry and WhatsApp handoff

Server-side enquiry record, deep link carrying state, bidi-safe Arabic message
body, named human, correct form mechanics.

Covers ENQ-01 to ENQ-05.

Done when: an enquiry arrives with the package, dates and party already named, and
the reference matches on both sides.

## Phase 7: Share layer

Per-package cards generated with headless Chromium, size and ratio constraints
enforced, plain-text trip line.

Covers SHARE-01 to SHARE-04.

Done when: an Arabic card renders with correct shaping and ordering, under budget.

## Phase 8: Signature interaction

Card opens into the trip: shared-element view transition plus a scroll-driven day
rail, CSS-native, reduced-motion branch, RTL-mirrored.

Covers V2-03. Last deliberately: it is worthless attached to a generic card.

## Deferred

Faceted navigation, reviews, the quote artefact and status page, French content,
and the trigger calendar. See REQUIREMENTS.md v2.

~~the admin surface~~ — pulled forward into Phase 2.5 on 2026-08-23 by operator
decision. See `.memory/projects/travel-agency-app.md`.

---
*Roadmap created: 2026-08-23*
