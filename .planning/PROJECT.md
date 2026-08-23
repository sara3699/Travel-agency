# Mars

## What This Is

A website that sells curated travel packages to Arabic-speaking travellers across
the Gulf, the Levant and Egypt, and North Africa. A visitor chooses a pre-built
trip rather than assembling one, and converts by reaching a human on WhatsApp
instead of paying online. It is built as a portfolio and demonstration piece for
Sara AI Studio.

## Core Value

A traveller can decide between packages without opening a tab per package,
because the card carries the total price, the nights, the departure city and what
is excluded.

## Requirements

### Validated

(None yet: ship to validate)

### Active

- [ ] Locale layer that is library-backed and locale-count agnostic (ar, en, fr)
- [ ] Token layer with framework defaults deleted, three candidate visual worlds
- [ ] Package card carrying price, nights, departure city and an inclusion ledger
- [ ] Homepage whose primary control is a constraint builder, not a metasearch box
- [ ] Package detail readable as a document, inclusions and exclusions never behind a click
- [ ] Comparison that shows only what differs
- [ ] Enquiry handoff to WhatsApp carrying package, dates and party
- [ ] Per-package share cards that render correctly in Arabic

### Out of Scope

- Online checkout and payment: conversion is an enquiry, so there is no PCI surface
- Umrah and Hajj: regulated products needing licensing, quotas and residence-based visa logic
- On-site reviews at launch: a low count reduces perceived value and seeding is fabrication
- Real licence numbers, ratings, testimonials, complaint logs, refund statistics: specimen catalogue
- Facet navigation at launch: on twelve packages it does not earn its place

## Context

Design authority is `docs/ui-ux/2026-08-22-master-ux-doc.md`, sixteen parts, built
from twenty-one research studies with 508 sources and an adversarial verification
pass. Product truth is `PRODUCT.md` at the repo root, written via impeccable init.

Demand in these markets follows the Hijri calendar, not the Western retail one.
WhatsApp is a booking channel rather than a support channel. The buying unit is
usually a family or group, deciding over weeks, largely inside a group chat.

The catalogue is specimen data by decision, enforced in the schema rather than in
copy, because roughly a third of the recommended differentiators are trust
artefacts whose value is that a reader can check them.

## Constraints

- **Tech stack**: Next.js App Router, Supabase, Vercel. Decided 2026-08-22. SSR is
  required because destination and package pages must be indexable and AI crawlers
  do not execute JavaScript.
- **i18n**: library-backed and locale-count agnostic. Routing under `app/[lang]`
  with `dir` in server-rendered HTML. Retrofitting the locale segment moves every
  route file.
- **Right to left**: build-time requirement. Logical properties only, enforced by
  lint. No `[dir='rtl']` override stylesheet, no `row-reverse` layout flipping.
- **Money**: minor-unit integers with an explicit per-currency exponent. Five
  regional currencies use three decimals, so a two-decimal assumption is silent
  corruption.
- **Accessibility**: WCAG 2.2 Level AA.
- **Data**: Row Level Security lands with each table, never after.
- **Voice**: all shipped text passes the `no-ai-voice` skill before entering the codebase.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router + Supabase + Vercel | SSR for indexability; RLS protects traveller data | — Pending |
| Enquiry, not checkout | Matches Gulf buying behaviour for high-ticket travel; no payment provider needed | — Pending |
| Specimen catalogue, enum-enforced | Trust artefacts on invented data become fabricated records | — Pending |
| Arabic leads, English inherits | Harder constraint yields the better Latin result; competitors treat Arabic as afterthought | — Pending |
| i18n locale-count agnostic | French planned; adding a locale must be content work, not a rewrite | — Pending |
| Name: Mars | Operator's call, 2026-08-23 | ⚠️ Revisit — مارس also reads as "March" in Arabic |
| Research sweep skipped | 21 studies and 508 sources already verified in docs/ui-ux/ | — Pending |

---
*Last updated: 2026-08-23 after project initialization*
