# UI/UX authority for this folder

Read the master document before any UI work. Everything else here is the evidence
behind it.

## Which file answers which question

`2026-08-22-master-ux-doc.md` is the master document. Rules, defaults, screen
specifications, the Arabic contract, the design system, the performance budget,
the accessibility contract, twelve resolved contradictions, provenance and
operations, the refusal list, and the build order. This is the one to read.

`research/2026-08-22-method.md` explains how the research ran and, more usefully,
what it does not give you. Read it before quoting a number from any of this.

`research/2026-08-22-sources.md` is the deduplicated source list, 508 entries,
with what each one supports.

`research/dimensions/` holds one file per research dimension, sixteen in all.
Every claim carries a confidence marking: verified means a primary source was
read, reported means a credible secondary source, inferred means agent synthesis.
Each file also carries its full adversarial verification transcript, where a
second agent tried to refute the findings. Go here when the master document states
something and you want to know how solid it is.

`research/gapfills/` holds five studies commissioned after a completeness critic
read everything else and found what nobody had been assigned: catalogue
provenance and the demo boundary, content operations, the enquiry service layer,
the dual-audience problem, and launch sequencing. These became Part 14.

The dimension files are unedited machine research records. They have not been
through the house voice pass, and they sometimes contradict each other; the master
document is where the conflicts were resolved.

## Where to look for a specific problem

| Question | File |
|---|---|
| What does the generic competitor look like, exactly | `research/dimensions/competitive-teardown-generic.md` |
| What do the good travel sites do differently | `research/dimensions/differentiated-exemplars.md` |
| How do I build Arabic properly | Master document Part 4, then `research/dimensions/arabic-rtl-bilingual.md` |
| What does a package card need on it | Master document 3.2, then `research/dimensions/travel-booking-funnel.md` |
| Seasonality, payments, halal facets, social platforms | `research/dimensions/me-traveller-market.md` |
| What can I animate, and what will it cost | Master document Part 6, then `research/dimensions/motion-and-interaction.md` |
| What is the performance budget | Master document Part 7 |
| What is legal around pricing and urgency | Master document Part 2 and Part 12, then `research/dimensions/trust-persuasion-ethics.md` |
| What data can I ask for, and when | Master document Part 12, then `research/dimensions/privacy-legal-data.md` |
| Why does the OG card break in Arabic | Master document Part 11 and Part 13, then `research/dimensions/virality-mechanics.md` |
| Which packages and prices am I allowed to invent | Master document 14.1, then `research/gapfills/catalogue-provenance-and-the-demo-real-boundary.md` |
| Who authors and maintains all this content | Master document 14.2, then `research/gapfills/content-operations-and-the-agency-side-admin-experie.md` |
| How the WhatsApp enquiry actually works, and the October deadline | Master document 14.3, then `research/gapfills/the-enquiry-to-conversation-service-layer.md` |
| What ships in version one | Master document 14.5 and Part 16 |
| Two sections disagree, which wins | Master document Part 13 |
| How do I get found by Google and by AI assistants | Master document Part 10, then `research/dimensions/discovery-seo-aeo.md` |

## Versioning

Files are dated. Per this folder's rules a shipped design or copy document is not
overwritten in place. A revision creates a new dated file and the old one stays,
so the reasoning that produced a superseded decision survives.

The 2026-08-22 master document is the one exception, and it is recorded in the
file itself: it was revised the same day it was written, once the verification
pass finished, before any version of it had been circulated. There was nothing yet
to supersede.

## What verification changed

Every dimension went through an adversarial pass: 397 claims checked, 234
confirmed, 123 partially true, 18 false, 12 unsupported, 10 stale. Every dimension
came back rated mostly solid and none survived unamended. The master document was
corrected in place. If you are reading a dimension file and a claim there
contradicts the master document, the master document wins, because the correction
is recorded in that file's own verification section.

## Standing cautions

Travel conversion benchmarks are not targets. Free travel-sector figures do exist,
from Unbounce and Ruler Analytics among others, but they measure landing-page or
lead conversion, not a package purchase. The honest statement is that no benchmark
measures the right thing, not that none exists.

Three widely repeated figures were traced and found unsupported: the "84% of
sharing is dark social" number traces to a pre-2016 study, the "journalists are
3.2x more likely to cover original data" multiplier has no traceable primary
source, and the "35-50% Arabic engagement uplift" is second-hand. None of them
belongs in public copy.

Regulatory positions move. The UK CMA actions, the FTC fee rule scope and the EU
Digital Fairness Act status were current as of 2026-08-22 and all three are active
files.
