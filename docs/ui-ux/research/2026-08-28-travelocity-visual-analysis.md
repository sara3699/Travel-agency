# Travelocity, looked at rather than described

Recorded 2026-08-28. Measured in a real browser at 1440x900, signed out, US
point of sale, from live pages. Automated fetching of travelocity.com is blocked
by bot protection (HTTP 429), so an earlier text survey had to work from search
results; everything below instead comes from reading the rendered DOM.

The operator asked for Travelocity's layout with our visual identity. This
records the layout numbers so that instruction can be followed precisely rather
than approximately.

## The grid

The content column is about 1190 to 1215 px, centred, with roughly 113 px of
gutter at 1440. Every page measured used the same column, so it is the site's
one container rather than a per-template choice.

The listing page splits that column into a 288 px sidebar, a 28 px gap, and an
872 px results column.

The header is 72 px tall, full bleed, and solid `rgb(10, 67, 139)`.

## The type scale

Four sizes carry the whole site, and nothing is bold except one thing.

| Role | Size | Weight |
|---|---|---|
| Page title (h1) | 36px | 500 |
| Section heading | 28px | 500 |
| Card and result title | 20px | 500 |
| Form group label | 16px | 500 |
| The party total | 20px | **700** |

The exception is the point. On a hotel result the nightly rate is 20 px at
weight 400 and the total is 20 px at weight 700, so the heavier figure is the
one you pay. Their own hierarchy already argues for the all-in total, which is
the position this project took independently.

## Controls

Pills are 32 px tall and fully rounded. Text fields and primary buttons are 48
px. Selected pills carry a pale blue fill (`rgb(235, 243, 249)`) rather than a
border change.

## Page grammar worth taking

**Homepage.** Startlingly lean: a search widget, one deals band, an app promo,
a footer. Total document height 3798 px at desktop. No inspiration grid, no
testimonials, no trust badges, no vanity counters. The depth lives on the
per-product landing pages, not the front door. This is the opposite of what the
category's templates do and it is worth copying.

**Product landing (`/Vacation-Packages`).** Plain h1 on white, no hero
photograph. The search is grouped by component with small headings: Flight, then
Stay, then Travelers, each its own labelled row. What is in the bundle is shown
as pills that read "Stay added" and "Flight added".

**Destination guide.** Breadcrumb, then a hero band with the photograph carrying
the h1 and the search widget, then three benefit lines, then a two-column body.
The left rail holds date shortcuts as tiles (Tonight, Tomorrow, Next weekend, In
two weeks). The right column holds results as horizontal rows, about 253 px
tall, each one image, then detail, then a right-aligned price block.

**Help centre.** An h1, a full-width search with a pill button, then category
cards in a three-column grid. Each card is 397 px wide and 64 px tall, gap 12 px,
row pitch 76 px, and reads as icon, label, chevron. They are compact rows rather
than large tiles.

## What we take, and what we do not

Take: the container and the two-column listing split, the four-size type scale,
the compact three-column category grid, breadcrumbs, result rows with a
right-aligned price block, the emphasis on the total over the unit rate, and the
lean homepage.

Do not take: the drip-pricing furniture that sits alongside it. Member-only
prices, struck-through reference prices, percentage-off badges, "we have 5 left",
price-freshness stamps, and resort fees disclosed below the fold under Important
information. Each one needs a number this catalogue does not have, and inventing
it would be a fabricated record rather than a weaker design. The full list is in
the route plan's refusal section.
