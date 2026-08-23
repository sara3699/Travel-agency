# Content operations and the agency-side admin experience

Dimension `content-operations-and-the-agency-side-admin-experie` · verification verdict: not separately verified

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Scope

Content operations and the agency-side admin experience — the production system, cost model, editing surface, image pipeline, and maintenance loop behind every differentiator in the master doc

## Summary

Every differentiator in the master doc is a recurring editorial bill, and nobody has priced it. One package built to spec — roughly thirty typed attributes, priced exclusions, a date-banded cancellation ladder, ordered itinerary beats, 8-15 first-party photographs with two-locale alt text, natively written Arabic and English, and a dated verifier on every faith facet — decomposes to about 18-31 hours the first time a property is used and 10-16 hours on reuse. Twelve packages is seven to eight full-time weeks. Three hundred is roughly 3,900 hours, about two FTE-years. Re-verification adds two to three hours per package per year, which at 300 packages is a full-time job on its own. No credible published Gulf or North-Africa freelance rate survived sourcing — Upwork, Bayt, ProZ and Glassdoor all refused fetches — so money figures here sit as an explicitly labelled planning band on top of one verified market anchor: Translated's published US$0.10-per-word average.

The tool question resolves against every headless CMS for a structural reason, not an aesthetic one. Supabase Postgres with RLS is already the system of record, and the live facet counts, comparison table and difference engine are SQL aggregates over typed columns. Sanity moves content out of Postgres entirely. Payload's Postgres adapter wants to own the schema. Directus is the strongest fallback and the only surface with verified full-studio RTL. The recommendation is a bespoke, Arabic-first, mobile-first Next.js admin behind Supabase Auth and RLS, with the audit trail and versioning pushed down into Postgres triggers so they survive anyone editing through Studio. The trade-off must be visible from day one: cut package count before cutting facet verification.

## Findings

### Supabase Image Transformations are a Pro-plan-and-above feature, priced at $5 per 1,000 origin images beyond a 100-image included quota, and the automatic-format feature currently serves WebP only, with AVIF documented as forthcoming. Transform parameters cap width and height at 1-2500px, quality 20-100 (default 80), with resize modes cover/contain/fill.

Confidence: verified · type: constraint

Why it matters here: The master doc's AVIF/WebP ladder at the layout's exact widths cannot be delivered by Supabase's on-the-fly transformer. For a Middle East package site the ladder must instead be pre-generated at upload with sharp and stored as flat objects, which converts a per-transformation bill into a flat storage bill ($0.0213/GB above the 100 GB Pro allowance) and removes the AVIF gap. This is a build-order decision, not a tuning decision.

Evidence: Supabase docs, Storage Image Transformations: "Pro Plan and above"; "$5 per 1,000 origin images"; "Storage will automatically find the best format supported by the client"; currently WebP only, AVIF noted as forthcoming. Cross-checked against Supabase pricing page: Pro $25/mo, "100 origin images included, then $5 per 1000 origin images", "100 GB file storage" then "$0.0213 per GB". Accessed 2026-08-22.

Source: https://supabase.com/docs/guides/storage/serving/image-transformations

### Vercel Functions cap both request and response body at 4.5 MB, returning 413 FUNCTION_PAYLOAD_TOO_LARGE above it. Node functions get 2 GB / 1 vCPU on Hobby and up to 4 GB / 2 vCPU on Pro, with a 300s default duration (Pro maximum 800s).

Confidence: verified · type: constraint

Why it matters here: A raw camera JPEG from a real hotel-room shoot routinely exceeds 4.5 MB, so the upload cannot be proxied through a Next.js route handler. The pipeline must be: browser uploads directly to Supabase Storage against a signed URL, then a separate Node function is triggered per image to generate derivatives. Getting this wrong is discovered on the first real shoot, after the admin is built.

Evidence: Vercel docs, Functions Limits (last_updated 2026-07-01): "The maximum payload size for the request body or the response body of a Vercel Function is 4.5 MB"; memory table Hobby 2 GB / 1 vCPU, Pro/Enterprise 4 GB / 2 vCPU; duration table Hobby 300s max, Pro 800s max.

Source: https://vercel.com/docs/functions/limitations

### Supabase recommends standard multipart uploads only for files up to 6 MB, and TUS resumable uploads above that; the hard ceiling for a standard upload is 5 GB. Storage access control is RLS policies on the storage.objects table, and service keys bypass RLS entirely.

Confidence: verified · type: constraint

Why it matters here: First-party photography means large originals uploaded over Gulf mobile networks, often from a phone in a hotel lobby. The admin must implement resumable upload for originals, not a naive single POST, or the operator loses a shoot to a dropped connection. And because RLS on storage.objects is the actual access control, the photo bucket policy has to land with the table, not after.

Evidence: Supabase docs, Standard Uploads: "we recommend using TUS Resumable Upload for uploading files greater than 6MB in size for better reliability"; max 5GB. Supabase docs, Storage Access Control: policies on storage.objects for insert/select/update/delete; "Service keys entirely bypass RLS policies". Accessed 2026-08-22.

Source: https://supabase.com/docs/guides/storage/uploads/standard-uploads

### Next.js image defaults are formats: ['image/webp'] only (AVIF is opt-in), deviceSizes [640, 750, 828, 1080, 1200, 1920, 2048, 3840], imageSizes [32, 48, 64, 96, 128, 256, 384], qualities [75], minimumCacheTTL 14400. Next.js documents that AVIF "generally takes 50% longer to encode but it compresses 20% smaller compared to WebP" and that each format is cached separately.

Confidence: verified · type: data

Why it matters here: Leaving these at default while enabling both formats produces a multiplicative transformation matrix across hundreds of package photographs. Vercel bills image transformations for every cache MISS and STALE at $0.05-$0.0812 per 1K with only 5K/month included on Hobby — and Hobby is restricted to non-commercial use, so a real agency site is on Pro and paying. The content-ops answer is to pre-generate a short, explicit width ladder matching the actual card/hero/gallery breakpoints and never let runtime optimisation see an unbounded matrix.

Evidence: Next.js docs, Image Component (version 16.3.2, lastUpdated 2026-08-18): exact default arrays for deviceSizes/imageSizes/qualities/formats and the AVIF encode/compression note. Vercel docs, Limits and Pricing for Image Optimization (last_updated 2026-02-23): "Image transformations | 5K/month | $0.05 - $0.0812 per 1K"; "Image transformations are billed for every cache MISS and STALE"; "Hobby teams are restricted to non-commercial personal use only".

Source: https://nextjs.org/docs/app/api-reference/components/image

### For remote or dynamic images Next.js requires blurDataURL to be supplied manually — it is only auto-generated for static imports — and the docs recommend "a very small image (10px or less)" and warn that "A large blurDataURL may hurt performance."

Confidence: verified · type: principle

Why it matters here: This is the exact hook for the master doc's ~100-byte inline LQIP plus dominant-colour placeholder. Because every package photo lives in Supabase Storage (a remote source), the LQIP is not free — it is a column the upload job must populate, and a column the completeness gate must check. If it is not generated at upload it will never be backfilled for 300 packages.

Evidence: Next.js docs, Image Component, blurDataURL section: "If the image is dynamic or remote, you must provide blurDataURL yourself"; "The image is automatically enlarged and blurred, so a very small image (10px or less) is recommended"; "A large blurDataURL may hurt performance. Keep it small and simple." (lastUpdated 2026-08-18)

Source: https://nextjs.org/docs/app/api-reference/components/image

### sharp's output defaults are WebP quality 80 / effort 4 (range 0-6) / chroma 4:2:0, and AVIF quality 50 / effort 4 (range 0-9) / chroma 4:4:4. AVIF and WebP quality scales are not comparable.

Confidence: verified · type: data

Why it matters here: A naive pipeline that passes the same quality integer to both encoders produces an AVIF that is either bloated or visibly degraded relative to its WebP sibling — and on a site whose whole claim is that these are the real rooms and the real transfer vehicle, visible artefacting in the proof photograph undoes the proof. The derivative job needs two separate quality settings recorded in the spec, not one.

Evidence: sharp API documentation, Output options: WebP quality default 80, effort default 4 (0-6), chromaSubsampling '4:2:0'; AVIF quality default 50, effort default 4 (0-9), chromaSubsampling '4:4:4'. Accessed 2026-08-22.

Source: https://sharp.pixelplumbing.com/api-output/

### Directus documents "comprehensive Right-to-Left (RTL) language support for both content editing and the entire studio interface", automatically detecting RTL for Arabic, Farsi and Hebrew, with a per-user manual override (Automatic / Left to Right / Right to Left) in profile settings.

Confidence: verified · type: pattern

Why it matters here: This is the single strongest argument for Directus over every alternative on this project. The operator will spend more hours inside the admin than any visitor spends on the site, and she is writing Arabic natively. An admin whose own chrome is LTR while the Arabic column is RTL produces exactly the mixed-direction confusion the master doc spends a whole dimension avoiding on the public side. No other evaluated CMS documents whole-interface RTL.

Evidence: Directus docs, Content > Translations (accessed 2026-08-22): documents comprehensive RTL support for content editing and the entire studio interface, automatic detection for Arabic/Farsi/Hebrew, and a manual direction override in user profile settings.

Source: https://directus.com/docs/guides/content/translations

### Directus models translations as a one-to-many junction collection (e.g. articles_translations) plus a languages collection, created via "Enable Translations" on a collection. Directus is free to self-host for organisations under $5M annual revenue and fewer than 50 employees under its Open Innovation Grant; the Core tier is limited to 3 user seats and 25 collections, and Team is $499/month annual ($599 monthly).

Confidence: verified · type: constraint

Why it matters here: The junction-table shape is not the same as the master doc's "two locale-keyed columns", so adopting Directus means every Next.js query joins a translations table and every completeness check counts rows rather than reading columns. That is workable in SQL but it changes the schema the rest of the research assumes. The licensing is genuinely favourable for a solo operator — but the 25-collection Core cap is close to what a thirty-field package model with facets, photos, itinerary beats, permissions and audit will consume.

Evidence: Directus docs, Content > Translations (translations O2M + languages collection). Directus pricing page (accessed 2026-08-22): "Organizations under $5M in annual revenue and fewer than 50 employees qualify for fully permissive access to Directus at no software cost"; Core free at 3 seats / 25 collections; Team $499/month annual, $599 monthly; Cloud add-on $99/mo; no free cloud tier.

Source: https://directus.com/pricing

### Payload is MIT-licensed (Copyright 2018-2026 Payload CMS, LLC), runs inside the Next.js app via @payloadcms/next, exposes a Local API for direct-to-database access from React Server Components with no HTTP overhead, and supports field-level localisation via localized: true with a per-locale rtl: true flag.

Confidence: verified · type: data

Why it matters here: On paper this is the closest fit to a Next.js App Router + Postgres project: one deployment, one repo, no second service, and localisation modelled per field rather than per document. For a bilingual package site the Local API means the package page can read from the same process that the admin writes to, which removes a whole class of staleness.

Evidence: Payload LICENSE.md on GitHub main branch: "MIT License", "Copyright (c) 2018-2026 Payload CMS, LLC". Payload docs, Configuration > Localization: locales array with code/label/rtl ("A boolean that when true will make the admin UI display in Right-To-Left"), defaultLocale, fallback, and field-level localized: true. Payload docs, Getting Started > Concepts: Local API is "direct-to-database access with no HTTP overhead".

Source: https://github.com/payloadcms/payload/blob/main/docs/configuration/localization.mdx

### In Payload, draft: true "Saves only to versions table, bypasses required field validation", and localized status is still marked Beta (localizeStatus). Versions record which user made each change, support diff views in the admin, and default to maxPerDoc: 100.

Confidence: verified · type: constraint

Why it matters here: This is the decisive design fact for the completeness gate, and it generalises beyond Payload. Required-field enforcement at save is the wrong gate — the operator needs to capture a half-finished package from a phone in an airport. Enforcement belongs at the publish transition. Any admin, bespoke or CMS, must therefore have two validation schemas: a permissive draft schema and a strict publish schema. Payload gives the versioning and authorship for free; it does not give the domain-specific publish gate, which must be written either way.

Evidence: Payload docs, Versions > Drafts: "draft: true — Saves only to versions table, bypasses required field validation"; _status field injected with draft/published/changed states; schedulePublish requires a Jobs queue; localizeStatus marked Beta. Payload docs, Versions > Overview: "Maintain an audit log / history of every change ever made to a document, including monitoring for what user made which change"; maxPerDoc defaults to 100.

Source: https://payloadcms.com/docs/versions/drafts

### Payload's Postgres adapter uses Drizzle and node-postgres, manages the database schema itself (db push in dev, migrations elsewhere), and requires the beforeSchemaInit hook plus Drizzle introspection to coexist with pre-existing tables.

Confidence: verified · type: constraint

Why it matters here: Supabase is already the system of record, with its own migration history and RLS policies attached to tables. Handing schema ownership to Payload creates two authorities over the same Postgres, and the loser is usually RLS — which the privacy dimension establishes as the actual security control for sensitive faith and health-adjacent fields under Saudi PDPL. This is the concrete reason Payload is not the recommendation here despite being the best pure Next.js CMS.

Evidence: Payload docs, Database > Postgres: adapter built on "Drizzle ORM and node-postgres"; "automatically manages changes to your database for you in development mode" via db push; existing tables preserved via the beforeSchemaInit hook with Drizzle introspection; pool.connectionString for external Postgres such as Supabase.

Source: https://payloadcms.com/docs/database/postgres

### Payload's admin RTL support has been repaired incrementally rather than shipped complete: issue #11162, opened 2025-02-13, documented tab buttons using left margin where RTL needs right, an incorrect publish-button border-radius in RTL, and an Archive component pinned left by ml-0; it was closed via PR #11282. A separate open issue (#9482) reported the locale dropdown not moving in RTL.

Confidence: verified · type: trend

Why it matters here: Arabic RTL in Payload's admin is a maintained but trailing concern, fixed as users report breakage. For a project whose primary author writes Arabic every day, that is a standing tax with no ceiling. Contrast with Directus, which documents whole-interface RTL as a feature. Flagged as a 2026 TREND, not a timeless property: Payload's RTL will keep improving, so this assessment should be re-checked before any future migration.

Evidence: GitHub payloadcms/payload issue #11162, opened 2025-02-13, assigned to @paulpopus, closed via PR #11282, listing .tabs-field__tab-button margin, publish-button border-radius, and Archive component alignment defects under RTL. Related issue #9482 on the localization dropdown not respecting RTL layout.

Source: https://github.com/payloadcms/payload/issues/11162

### Sanity offers two i18n models — field-level via sanity-plugin-internationalized-array and document-level via @sanity/document-internationalization — and stores content in its own document store, not in Postgres. Its documentation does not address RTL Studio support, per-locale required fields, or per-locale validation.

Confidence: verified · type: constraint

Why it matters here: Adopting Sanity would split the system of record. The master doc's live facet counts, the difference engine and the comparison table are SQL aggregate queries over typed columns; running them against a document store means either a sync pipeline (which is where drift is born) or losing them. For this project Sanity is disqualified by architecture, not by quality.

Evidence: Sanity docs, Localization (accessed 2026-08-22): field-level "A single document with content in many languages" via sanity-plugin-internationalized-array; document-level "A unique document version for every language" via @sanity/document-internationalization; v5 moved language identifiers from _key to a language field. No RTL, per-locale required-field or validation guidance present.

Source: https://www.sanity.io/docs/localization

### ISO 17100:2015 makes revision by a second person an obligatory part of the standard, and defines translator, reviser, reviewer, proofreader and project manager as distinct roles with distinct competence requirements.

Confidence: reported · type: principle

Why it matters here: This is the external authority for the Arabic QA step the brief asks for. It also sets the bar correctly: the second person is a reviser working in the target language and subject domain, not a bilingual checking strings. For this site the reviser must read the rendered Arabic build at real breakpoints — numerals, calendar, mirrored icons, line-height, no English leaking through the fallback — because per-locale validation is exactly what none of the evaluated tools provide.

Evidence: ISO 17100:2015 summary: the standard "sets minimum standards such as the requirements for translations to be subject to revision by a second person, which is an obligatory part of the standard"; defines translators, revisers, reviewers, proofreaders and project managers as separate roles. The ISO catalogue page itself (iso.org/standard/59149.html) returned 403 and could not be read directly.

Source: https://en.wikipedia.org/wiki/ISO_17100

### Nielsen Norman Group frames content strategy as four phases — planning, creation, maintenance, unpublishing — states that "Content won't govern itself", recommends forming a content-governance council to review low-performing, inaccurate or outdated content, and advises starting with "at least a 3-month interval for reviewing content and supporting collateral", using a maintenance checklist and content scorecard.

Confidence: verified · type: principle

Why it matters here: This is the timeless principle behind the maintenance loop, and it supplies a defensible default cadence for the policy-class fields (visa status, entry requirements) where nothing else does. The scorecard concept maps directly onto the completeness score as a queryable column. STALENESS FLAG: published 2022-11-13, which is older than the 2023 cut-off the brief sets — treat the 3-month figure as a reasonable default rather than current evidence, and note that NN/g's governance-council framing assumes a team the operator does not yet have.

Evidence: Nielsen Norman Group, "Content Strategy 101" by Anna Kaley, published 2022-11-13: four phases planning/creation/maintenance/unpublishing; "Content won't govern itself"; content-governance council; "at least a 3-month interval for reviewing content and supporting collateral"; unpublishing considerations covering redirects, archives and SEO consequences.

Source: https://www.nngroup.com/articles/content-strategy/

### Google's helpful-content guidance asks whether content "clearly demonstrate[s] first-hand expertise and a depth of knowledge (for example, expertise that comes from having actually used a product or service, or visiting a place)" and whether "bylines lead to further information about the author or authors involved, giving background about them and the areas they write about". It also asks whether the use of AI generation is "self-evident to visitors through disclosures or in other ways". Page last updated 2025-12-10.

Confidence: verified · type: principle

Why it matters here: The parenthetical "or visiting a place" is the most travel-specific sentence Google publishes, and it is the exact signal a template competitor cannot fabricate. Content ops must therefore make the byline a first-class schema object — an authors table with a real bio page, not a string — and make the dated trip report a required child of a published package rather than a nice-to-have. It also means the AI-assistance disclosure is a content-ops artefact the operator, who publishes as an AI educator, is unusually well placed to handle honestly.

Evidence: Google Search Central, "Creating helpful, reliable, people-first content", last updated 2025-12-10 UTC: first-hand expertise question quoted verbatim; byline question quoted verbatim; automation disclosure question quoted verbatim; "trust is most important" among E-E-A-T factors.

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### Saudi Arabia's PDPL defines personal data to include "fixed or moving pictures of the individual", placing photographs of identifiable people squarely inside the regime that also treats religious belief, health and location as sensitive data.

Confidence: reported · type: constraint

Why it matters here: The workspace already has a standing redaction rule for identifiable people in reused screenshots; PDPL turns that from a style preference into a legal control in the operator's primary market. A group photograph from a Umrah or Wadi Rum departure contains identifiable travellers, and the faith context makes the inference sensitive. The operational consequence is a content_permission table with the exact request wording and the exact reply, plus a hard rule that no identifiable third-party face publishes without a matching permission row.

Evidence: DLA Piper Data Protection Laws of the World, Saudi Arabia (accessed 2026-08-22), quoting the PDPL definition of personal data: "every data - of whatever source or form - that would lead to the identification of the individual specifically... fixed or moving pictures of the individual, and other data of personal nature." Cross-referenced with the project's own privacy-legal-data research dimension, which sources the sensitive-data definition (religious belief, health, location) to the same page.

Source: https://www.dlapiperdataprotection.com/index.html?t=law&c=SA

### PostgreSQL generated columns can only use immutable functions, "cannot use subqueries or reference anything other than the current row in any way", and "A generation expression cannot reference another generated column." VIRTUAL generated columns are only available from PostgreSQL 18; STORED has existed since 12.

Confidence: verified · type: constraint

Why it matters here: This kills the obvious implementation of the completeness score. The score must count child rows — itinerary beats, photographs with alt text in both locales, verified facets, cancellation bands — and a generated column cannot run that subquery. The correct pattern is trigger-maintained counter columns on the package row (beat_count, photo_count, verified_facet_count, missing_ar_fields) plus one STORED generated column that arithmetics those counters into a score. Discovering this after the schema ships means a migration across every package.

Evidence: PostgreSQL documentation, Generated Columns (current, covering versions 14-18): "The generation expression can only use immutable functions and cannot use subqueries or reference anything other than the current row in any way"; "A generation expression cannot reference another generated column"; VIRTUAL described as the default from PG 18, STORED computed on write.

Source: https://www.postgresql.org/docs/current/ddl-generated-columns.html

### Supabase Cron (pg_cron) schedules jobs "anywhere from every second to once a year", can run SQL snippets, database functions, HTTP requests or Edge Functions, records every run in cron.job_run_details, and Supabase recommends no more than 8 concurrent jobs each running under 10 minutes.

Confidence: verified · type: pattern

Why it matters here: This is the whole maintenance loop's engine, already in the stack, requiring no third-party scheduler. One nightly job recomputes staleness against the per-field-class cadences and writes the demotion state; one weekly job emails the operator the expiry queue. The 8-concurrent / 10-minute guidance is the design constraint: the re-verification sweep must be one set-based UPDATE across all packages, not a per-package job.

Evidence: Supabase docs, Cron (accessed 2026-08-22): "can run anywhere from every second to once a year depending on your use case"; "SQL snippets or database functions with zero network latency"; HTTP requests including Edge Functions; "Every Job's run and its status is recorded on the cron.job_run_details table"; "we recommend no more than 8 Jobs run concurrently. Each Job should run no more than 10 minutes."

Source: https://supabase.com/docs/guides/cron

### Supabase documents a concrete RBAC recipe: public.user_roles and public.role_permissions tables, a public.custom_access_token_hook(event jsonb) auth hook that injects the role into JWT claims via jsonb_set, and a public.authorize(requested_permission app_permission) security-definer function called from RLS policies. The service_role key holds bypassrls and must never reach the browser.

Confidence: verified · type: pattern

Why it matters here: This is exactly the shape needed when the operator adds one or two agency staff: a photographer who can upload and write alt text but cannot publish, an Arabic reviser who can approve the Arabic build but cannot change price, and the operator who can do everything. Because it lives in RLS rather than in a CMS permission table, it holds whether the edit arrives through the bespoke admin, a script, or Supabase Studio.

Evidence: Supabase docs, Custom Claims & Role-based Access Control (RBAC), accessed 2026-08-22: user_roles and role_permissions tables; custom_access_token_hook(event jsonb) with jsonb_set(claims, '{user_role}', to_jsonb(user_role)); authorize(requested_permission app_permission) reading (auth.jwt() ->> 'user_role')::public.app_role. Supabase RLS docs: service_role has bypassrls, "Never use a secret key in the browser".

Source: https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac

### The W3C WAI alt decision tree requires an empty alt attribute (alt="") for purely decorative images, brief descriptions for informative images, function descriptions for functional images, and information placed elsewhere on the page for complex images.

Confidence: verified · type: principle

Why it matters here: A completeness gate that simply requires alt_ar and alt_en to be non-empty on every photo will force alt text onto decorative frames, which actively harms screen-reader users. The photo table therefore needs an is_decorative boolean, and the gate must read "every non-decorative photo has alt text in both locales". This is the kind of detail that separates a real accessibility posture from a checkbox.

Evidence: W3C Web Accessibility Initiative, An alt Decision Tree (accessed 2026-08-22): five categories — informative, decorative, functional, images of text, complex; empty alt where images are redundant to nearby text, serve only visual effect, or are purely decorative.

Source: https://www.w3.org/WAI/tutorials/images/decision-tree/

### Google removed the FAQ rich result from Search entirely, announced May 2026; it had already been restricted in September 2023 to "well-known, authoritative government and health websites". Documentation last updated 2026-06-15.

Confidence: verified · type: trend

Why it matters here: A direct content-ops budgeting lesson: hours spent authoring and maintaining FAQ content shaped for a rich result are now hours spent on a feature that no longer exists. The general rule for this project is to spend editorial hours on structures that serve a human reader and an answer engine reading the page as text — the itinerary heading spine, priced exclusions, the cancellation ladder — and never on markup whose only payoff is a SERP ornament that a platform controls.

Evidence: Google Search Central, FAQ structured data documentation, last updated 2026-06-15: "The FAQ rich result feature is no longer shown in Google Search results, as announced in the changelog entry in May 2026"; prior September 2023 restriction to "well-known, authoritative government and health websites".

Source: https://developers.google.com/search/docs/appearance/structured-data/faqpage

### Translated publishes an average translation price of US$0.10 per word but does not publish a per-language rate for English-to-Arabic, noting only that "the rarer the language combination, the higher the translation rate". No published Gulf or North-Africa freelance rate benchmark for native Arabic copywriting or commercial photography could be retrieved: Upwork cost pages, Bayt career-salary pages, ProZ community rates and Glassdoor all returned 403 to automated fetches.

Confidence: verified · type: data

Why it matters here: This is the honest state of the cost model. $0.10/word is a defensible floor for the mechanical act of translation, and it is the wrong price for what this project needs, which is native Arabic authoring plus a second-person revision. The money figures in this specification are therefore an explicitly labelled planning band on top of a firm hours model — and the operator should replace them with two real quotes before committing to a 40- or 300-package plan. No sourced figure found for a transcreation-versus-translation multiplier.

Evidence: Translated, translation rates page (accessed 2026-08-22): "Translated offers an average price of US $0.10 per word"; no English-to-Arabic pair published; "the rarer the language combination, the higher the translation rate". Upwork /hire/*/cost/, bayt.com career pages, search.proz.com/employers/rates all returned HTTP 403 on 2026-08-22.

Source: https://translated.com/translation-rates

### Synthesis of the hours model: one package meeting the master doc's full specification decomposes to approximately 18-31 hours for a first-time property and 10-16 hours on reuse. Twelve packages ≈ 290 hours (7-8 full-time weeks); 40 packages with reuse ≈ 685 hours; 300 packages ≈ 3,900 hours (about two FTE-years). Annual re-verification runs 2-3 hours per package per year — roughly 100 hours/year at 40 packages, 600-900 hours/year at 300.

Confidence: inferred · type: data

Why it matters here: This is the number that decides the project's shape. It shows that a 300-package catalogue is structurally impossible for a solo operator at the master doc's quality bar, and that the correct launch target is 12-16 packages with every field filled. It also shows that re-verification is a permanent operating cost, not a launch cost — the differentiator has rent, not just a purchase price.

Evidence: INFERRED synthesis. Decomposition: supplier sourcing and term extraction 2.5-4h; structured field entry 1.5-2.5h; faith/facet verification with named source and date 2-4h new property (0.5h reuse); native Arabic authoring of ~2,400 words 3-5h; parallel English authoring 2-3.5h; second-person revision per ISO 17100 1-1.5h; photo selection, redaction, retouch, export and bilingual alt text for 8-15 finals 2-3.5h; share-card set 0.75-1.5h once templates exist; dated bylined trip report in both languages 3-5h; publish-gate QA in both directions 0.5-1h. Word-count basis derived from the master doc's required blocks. No external source validates these hours; they are a planning model to be corrected against the first three real packages.

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Design implications

- RECOMMENDED EDITING SURFACE — a bespoke Next.js admin at /(admin), Arabic-first and mobile-first, behind Supabase Auth with RLS as the enforcement layer. Justification: (a) the differentiators are SQL aggregates over typed columns, so the system of record must stay Postgres, which disqualifies Sanity outright; (b) Payload's Drizzle adapter wants schema ownership, creating two authorities over a database whose RLS policies are the actual security control under Saudi PDPL; (c) the hard requirements are domain validation — thirty typed fields, per-locale parity, verifier plus date on every facet, a completeness score gating publish — and Payload's own docs confirm draft:true bypasses required-field validation, so the publish gate must be hand-written in any tool; (d) the operator is mobile-first and social-native, and no CMS admin gives a one-field-at-a-time phone capture flow; (e) an admin whose own chrome is dir="rtl" with Arabic as the primary column is itself a differentiator and the opposite of every CMS default. FALLBACK RULE, stated now so it is not relitigated: if the admin build exceeds three weeks of effort, adopt Directus pointed at the same Supabase Postgres, specifically for its documented whole-studio RTL. Do not adopt Payload for content on this project. Never edit production content in Supabase Studio — it has no draft state, no bilingual pairing, no publish gate, and no record of who changed what.
- SCHEMA — the tables the recommendation implies. packages (slug, status enum draft|review|published|archived, nights, departure_city_id, board_basis, hotel_tier, transfer_type, physical_pace, party_suitability[], next_departure_date, base_price_minor, currency, price_basis_party, published_at, first_published_at). package_i18n (package_id, locale, name, subtitle, overview, who_for, who_not_for, practical_notes, authored_natively boolean, revised_by, revised_at) — one row per locale, PRIMARY KEY (package_id, locale), so parity is a row count, not a hope. package_facet (package_id, facet_key, value enum green|amber|red|na, evidence_note, verified_by, verified_at, verification_source, verification_method enum first_hand|supplier_written|property_written|phone) — the verifier and date live on the facet row, never on the package. package_inclusion and package_exclusion (ordered, with estimated_cost_minor on exclusions). package_cancellation_band (days_before_from, days_before_to, refund_pct, fee_minor) with an exclusion constraint so bands cannot overlap. package_beat (day_number, sequence, i18n child) for the itinerary. package_photo (storage_path, slug_filename, width, height, dominant_hex, lqip_data_url, is_decorative, is_hero, source enum first_party|supplier|traveller, subject_tag, shot_at, permission_id). photo_alt (photo_id, locale, alt_text). content_permission (subject_name_hashed, subject_contact, channel, request_text_exact, reply_text_exact, granted_at, scope[], expires_at, revoked_at, revoked_reason). trip_report (package_id, author_id, visited_on, published_on, i18n child). authors (real bio page, not a string). content_audit written by a row-level Postgres trigger with a JSONB diff, actor, timestamp and source (admin|studio|script) — pushed into the database so it survives anyone bypassing the admin. user_roles and role_permissions per Supabase's documented RBAC recipe.
- COMPLETENESS SCORE — implement as trigger-maintained counter columns plus one STORED generated column, not as a single generated expression. PostgreSQL forbids subqueries and cross-generated-column references in a generation expression, so counting itinerary beats, verified facets, priced exclusions and dual-locale alt text must happen in AFTER INSERT/UPDATE/DELETE triggers on the child tables, writing beat_count, verified_facet_count, exclusion_count, photo_count, photos_missing_alt_ar, photos_missing_alt_en and missing_ar_field_count onto the package row. The generated column then arithmetics those counters into completeness_score int. Index it, and drive both the listing default sort and the publish gate from it. VIRTUAL generated columns are PG18-only, so use STORED.
- PUBLISH GATE — two validation schemas, not one. The draft schema requires only slug plus one locale name, so the operator can capture a package from a phone in an airport lounge. The publish schema is a single SQL function assert_publishable(package_id) that must pass before status can move to published, enforced by a BEFORE UPDATE trigger rather than by application code. It requires: both package_i18n rows present with every text field non-empty and authored_natively true; revised_by set and distinct from the author, per ISO 17100's obligatory second-person revision; every declared facet carrying value, verified_by, verified_at within its class cadence, and verification_source; at least one priced exclusion; a complete non-overlapping cancellation ladder covering departure minus 90 days to departure; at least one beat per night; at least 8 photos of which at least 5 are source='first_party' and cover the required subject tags; every non-decorative photo carrying alt text in both locales; every photo with a face carrying a permission_id; lqip_data_url and dominant_hex populated on all; one trip_report with visited_on set.
- PER-PACKAGE DEFINITION OF DONE (the checklist the gate encodes, in author order) — 1. Supplier terms extracted verbatim, not paraphrased. 2. Thirty structured fields entered. 3. Every faith/women-traveller facet set green/amber/red with a named human source, a method, and today's date; unknown is amber with an evidence note, never green. 4. Inclusions listed; exclusions listed WITH estimated cost. 5. Cancellation ladder entered as bands. 6. Itinerary entered as ordered beats, one per night minimum, including the honest hard parts. 7. Arabic written natively, English written in parallel — neither is a translation of the other. 8. Second-person Arabic revision completed against the rendered build, not a string table. 9. 8-15 photographs uploaded with slugged descriptive filenames, dominant colour and LQIP generated, alt text in both locales for every non-decorative frame, permission rows for every identifiable face. 10. Share-card set generated. 11. Dated, bylined trip report attached. 12. Preview read end to end in RTL and in LTR on a phone. 13. Publish gate green.
- IMAGE PIPELINE — browser uploads the original DIRECTLY to Supabase Storage against a signed URL, using TUS resumable above 6 MB, because a Vercel Function's 4.5 MB request-body cap makes proxying a raw camera file impossible. Storage insert is governed by an RLS policy on storage.objects scoped to the photographer role. The upload then triggers ONE Node-runtime Vercel Function PER IMAGE (not per package) that runs sharp to produce the AVIF and WebP ladder at the layout's exact widths, plus a ~16px WebP encoded to a base64 data URL of roughly 100 bytes for lqip_data_url, plus sharp .stats() dominant colour into dominant_hex. Use separate quality settings per encoder — sharp's AVIF default is 50 and WebP's is 80, and the scales are not comparable. Write derivatives back to Storage as flat objects. Do NOT use Supabase Image Transformations (Pro-only, $5/1,000 origin images, WebP-only auto-format today) and do NOT leave Next.js image optimisation to discover an unbounded matrix at runtime: pin deviceSizes and imageSizes to the real breakpoints and keep qualities at a single value, because Vercel bills every cache MISS and STALE.
- CAPTURE STANDARD — a shot list that is a publish requirement, not a suggestion. Required subject tags: the actual room category sold (wide plus one detail); the actual bathroom, the single most-faked frame in the category; the prayer facility, qibla marker or prayer mat wherever a faith facet is claimed green, because this is the photograph that makes the facet credible; the actual transfer vehicle inside and out; the airport meet-and-greet point; the named guide; the meal actually served on the board basis sold; one frame that evidences any distance claim such as walking distance to the Haram; and at least one honest hard-part frame — the long driving day, the family-run guesthouse — which is what makes the 'not for you if' block believable rather than decorative. Stock is banned. Supplier photography is permitted only for scenery, must carry source='supplier', and must be visibly labelled on the page.
- REDACTION AND RIGHTS — Saudi PDPL's definition of personal data expressly covers 'fixed or moving pictures of the individual', so an identifiable traveller face is personal data in the primary market, and in a faith-travel context the surrounding inference is sensitive. Rule: compose around it at capture — turned, out of focus, cropped — rather than blurring in post, because a blur reads as evasion and looks cheap. Where a face must publish, a content_permission row is mandatory and stores the exact wording sent and the exact reply received, the channel, the granted date, the scope (site / organic social / paid), an expiry, and a revocation field. A revocation must cascade to unpublish the photo within 24 hours via the nightly Cron sweep. Never alter the original file; redaction produces a new derivative, per the workspace standing rule.
- MAINTENANCE CADENCE BY FIELD CLASS — Class A volatile (price, departure dates, availability): weekly, machine-diffed against the supplier where possible. Class B policy (visa status per passport, entry requirements): 90 days, matching NN/g's 'at least a 3-month interval' default. Class C property (faith and women-traveller facets, prayer facilities, distance claims): 180 days, and immediately on any renovation or management change. Class D contract (cancellation ladder, inclusions, exclusions, board basis): 365 days or on contract renewal. Class E media (photography, trip report): 730 days or immediately on renovation. Store the cadence in a field_class table so it is data, not code, and let one nightly Supabase Cron job run a single set-based UPDATE computing staleness across all packages — the 8-concurrent-job, 10-minute guidance rules out per-package jobs.
- DEMOTION LADDER, NOT A KILL SWITCH — a stale package must never silently vanish; that destroys accumulated links and breaks every share already in circulation. Three steps. (1) Soft demote: the stale facet's badge switches green to amber and renders 'last verified {date}' inline. This is honest and is genuinely better content than a confident green. (2) Rank demote: completeness_score drops below the listing threshold, so the package leaves default sort and loses eligibility for the comparison table and the difference engine — the reason being that a sparse row poisons a comparison table for every other row in it. (3) Unpublish: only when Class D contract or price data is stale, because only then is the page making a commercial promise it cannot honour. Unpublish serves 410 or redirects to the destination hub — never a soft 404.
- THE QUEUE VIEW IS THE ADMIN HOME SCREEN — a SQL view content_queue returning package, field class, days_until_stale (negative when overdue), current demotion step and owner, sorted soonest first. This, not a list of packages, is what the operator opens. It is the single interface element that determines whether the maintenance loop actually runs, and it must work on a phone: one card per expiring item with a one-tap 'verified today, source: phone call to property' action that writes verified_by, verified_at, verification_method and an audit row in a single transaction.
- ARABIC QA IS A PERSON READING THE BUILD, NOT A TOOL CHECKING STRINGS — ISO 17100 makes second-person revision obligatory, and this project should hold to it. The reviser is a native Arabic reader who did not write the Arabic, works inside the rendered site at real mobile breakpoints, and signs off by setting revised_by and revised_at on the package_i18n row. Their checklist: numeral form consistency (Arabic-Indic versus Western, chosen once and held), date and calendar rendering, mirrored icons and directional affordances, line-height sitting at Arabic values rather than inherited Latin ones, no English leaking through a fallback, and the plain question of whether this sounds like a person from the Gulf wrote it. Budget 1-1.5 hours per package and treat it as non-optional; it is the cheapest single item on the list and the one whose absence is most visible to the target audience.
- COSTED LAUNCH PLAN — target 12 to 16 packages at launch, not 40 and certainly not 300. At 18-31 hours for a first-time property and 10-16 on reuse, 12 packages is roughly 290 hours, or seven to eight full-time weeks of one person, plus a one-time 20-30 hours to build the share-card templates, the shot-list discipline and the first faith-facet verification playbook. Concentrate the twelve on three or four destination clusters so property, supplier and facet records are reused and the marginal package drops toward 10-13 hours. Then hold the catalogue flat for a full quarter and run the maintenance loop before adding anything, because the loop is the thing that has never been tested. Replace the money band in this document with two real quotes — one native Gulf Arabic commercial copywriter, one photographer or retoucher — before committing beyond 16 packages; no published regional rate benchmark was retrievable and every figure here is a planning band, not a market price.
- THE VISIBLE TRADE-OFF LADDER — if the content budget is not met, cut in this order and say so out loud. FIRST cut the per-package trip report; replace with one dated, bylined report per destination cluster. The first-hand-experience signal weakens but survives, and Google's guidance rewards visiting the place, not visiting it twelve times. SECOND cut catalogue ambition; twelve complete packages beat three hundred sparse ones, because the difference engine, comparison table and live facet counts all degrade to the generic catalogue the instant facets are sparse — the exact failure the project exists to avoid. THIRD narrow first-party photography to the proof frames only (room, bathroom, prayer facility, transfer, guide) and allow supplier photography for scenery with a visible source label; honest labelling is itself a differentiator, silent stock is the failure. NEVER cut the facet verifier and date, the priced exclusions, or the cancellation ladder. Those three are structurally uncopyable by a template competitor, they are the cheapest items per hour of differentiation bought, and every one of them is a data-entry cost rather than a creative cost.

## Anti-patterns to refuse

- Editing production content in Supabase Studio because it is already there. Studio is a database client: no draft state, no bilingual pairing, no publish gate, no completeness score, no record of who changed what, and unusable for a thirty-field bilingual form on a phone. It is also the surface most likely to be used with a privileged connection. This is the default that future build sessions will fall into if no admin is designed, and it is precisely how the tenth package ships with empty facets and a stale verification date.
- Modelling Arabic as a translation of English — an en column and an ar column where ar is filled last by pasting a translation. It produces English sentence rhythm in Arabic script, it guarantees the ar column silently holds English on some rows, and it makes the Arabic build feel like a localisation of somebody else's site to exactly the audience the site is for. The schema must make parity a row count in a package_i18n table with an authored_natively flag and a revised_by that differs from the author, so that pasted-in English is structurally visible rather than discoverable only by a native reader who happens to look.
- A single halal-friendly boolean, or facets without a verifier and a date. The master doc already bans the badge; the content-ops failure is subtler — shipping the facet columns but leaving verified_by, verified_at and verification_source nullable so that in practice they are null. An unverified green facet is worse than no facet, because it is an unbacked religious claim to an audience that will check.
- Enforcing required fields at save. It makes the admin hostile to the way the operator actually works — capturing fragments from a phone during a trip — so it produces either abandoned drafts or junk placeholder values entered to get past validation, which is worse than an empty field because a placeholder passes a completeness check. Payload's own draft:true behaviour, which deliberately bypasses required-field validation, is the correct model: permissive at save, strict at publish.
- Relying on a headless CMS's generic i18n and generic validation to enforce project-specific parity and completeness. None of Directus, Payload or Sanity documents per-locale required fields or per-locale validation. Whichever tool is chosen, the parity rule and the completeness gate are custom work; assuming the CMS covers it is how a bilingual site ends up with an Arabic build that is 60% English.
- Generating image derivatives on the fly and discovering the bill later. Vercel bills image transformations for every cache MISS and STALE, caches every format separately, and Next.js ships an eight-entry deviceSizes default; Supabase's transformer is Pro-only at $5 per 1,000 origin images and cannot emit AVIF today. Left at defaults with both formats enabled, a few hundred package photographs become a multiplicative billable matrix and a cold-cache latency problem at once — and the fix requires reprocessing every asset.
- Filenames like IMG_4821.jpg and alt text like 'hotel room'. Both are silent quality leaks: the filename discards a free descriptive signal, and generic alt text fails the informative-image case in the W3C decision tree while also failing the one job it has, which is to let a screen-reader user decide whether this room is the room they were promised. The inverse error is equally real — a completeness gate that demands alt text on decorative frames, which is why the photo table needs is_decorative.
- Publishing traveller and guide faces without a recorded permission, on the assumption that a verbal yes on the trip covers it. Saudi PDPL treats pictures of an identifiable individual as personal data, the workspace already carries a standing redaction rule, and a verbal yes cannot be produced when someone asks for it to be honoured. The permission record must contain the exact request and the exact reply, and revocation must be a field that actually unpublishes something.
- Unpublishing stale packages outright. It looks like hygiene and behaves like self-harm: it breaks every link and screenshot already circulating, which is the exact organic-reach mechanism the project is built on. Staleness should first become visible and honest (amber, last verified date), then become a ranking consequence, and only become a removal when a commercial promise is at stake.
- Planning a 300-package catalogue on the master doc's quality bar with one person. At roughly 10-16 hours per reused-property package, that is about two FTE-years of authoring before any maintenance, and the maintenance alone would run 600-900 hours a year. The plan does not fail loudly — it fails as a gradual thinning of facets and photography until the catalogue is indistinguishable from the templates it was meant to beat.
- Spending editorial hours on markup whose payoff a platform controls. Google restricted FAQ rich results to government and health sites in September 2023 and removed the feature entirely in May 2026. Author for a human and for an answer engine reading the page as text; treat rich-result eligibility as a byproduct, never as the reason a content structure exists.

## Differentiation moves

- Build the admin RTL-first with Arabic as the left-hand — that is, primary — column and English second. Every CMS on the market treats Arabic as the secondary locale slot; an admin that inverts this makes the Arabic the thing being written and the English the thing being matched, which is the only arrangement that reliably produces natively-written Arabic rather than translated Arabic. It costs nothing extra to build if decided before the first component, and it is unretrofittable afterwards.
- Publish the verification method, not just the verification date. A facet that reads 'women-only pool — verified 2026-07-14 — seen in person by Sarra' is a categorically different claim from one that reads 'verified — supplier email'. Storing verification_method as an enum and rendering it turns an internal QA field into the most link-worthy element on the page, and no aggregator can produce it because no aggregator visits.
- Make the shot list public. A short page titled 'what we photograph before we sell a trip' — the actual room, the actual bathroom, the actual transfer van, the prayer room, the meal, and one honest picture of the hard part — is a piece of content operations turned into marketing. It is screenshot-shaped, it is unarguable, and it puts every competitor's hotel-supplied hero shot on trial without naming anyone.
- Ship a per-package 'how this page was made' footer: who wrote it, in which language first, who revised the Arabic, when each field class was last verified, and whether AI assisted and how. Google's guidance explicitly asks whether automation is self-evident through disclosure. For an operator who publishes as an AI educator, this is a native advantage — the disclosure that reads as a liability for everyone else reads as authority here.
- Turn the maintenance queue into a public freshness signal. A small, honest 'last verified' stamp on every facet, plus a dated changelog on each package showing what changed and when, converts an internal ops artefact into the trust surface the category has never had. It also creates an incentive that actually works: the operator maintains data because the absence of maintenance is visible to customers, not because a reminder fired.
- Let the completeness score gate the site's own promises publicly. If a package falls below the threshold it leaves the comparison table and says so — 'we've pulled this from comparisons until we re-verify three facts'. Admitting a gap is a stronger trust signal than covering it, and it makes the completeness score a product feature rather than a hidden column.
- Capture on a phone, finish on a laptop, as an explicit two-mode admin. A mobile capture mode that takes a photo, tags its subject from the required shot list, dictates a one-line Arabic note and stamps a facet verification in one tap — then a desktop composition mode for the long-form writing. Every CMS admin is a desktop grid squeezed onto a phone; a purpose-built capture mode matches how a package is actually produced, which is in a hotel corridor, not at a desk.
- Colour the loading state with the destination. The dominant-colour placeholder resolving into a ~100-byte LQIP is already in the master doc as a performance decision; treated as a brand decision it becomes a recognisable loading behaviour — a wash of Wadi Rum red or Salalah green rather than a grey skeleton — that is generated automatically by the upload job at zero marginal editorial cost. A differentiator produced entirely by content ops, requiring no additional human hours.
- Name the reviser. A byline that reads 'Arabic revised by —' alongside the author gives the second-person revision step public standing, makes the ISO-17100-shaped process legible to the audience, and creates a small, real accountability that keeps the QA step from quietly lapsing at package thirty.

## Open questions

- No published Gulf or North-Africa freelance rate benchmark could be retrieved for native Arabic commercial copywriting or for travel photography — Upwork cost pages, Bayt career-salary pages, ProZ community rates and Glassdoor all returned HTTP 403 to automated fetch on 2026-08-22. The only verified market anchor obtained is Translated's published US$0.10-per-word average, which prices translation rather than native authoring. Two real quotes should replace the planning band before any commitment beyond 16 packages.
- No sourced figure was found for a transcreation-versus-translation cost multiplier. The 1.5-2.5x band used here is inferred and should be treated as a hypothesis to test against the operator's first commissioned piece.
- Strapi and Keystone were named in the brief but were not assessed — their documentation was not fetched, and the WebSearch budget for this session was exhausted after two queries. Any claim about their Arabic/RTL admin quality or localisation model would be unsupported. If either is a live candidate, it needs its own pass.
- Supabase's current PostgreSQL major version for new projects could not be confirmed from the configuration docs. This matters only for the STORED-versus-VIRTUAL generated column choice; STORED is safe from PG12 onward, so the recommendation is unaffected, but it should be confirmed before writing the migration.
- Whether Supabase Cron is available on the Free plan was not established — the Cron documentation does not state plan availability. Since the project needs Pro anyway (Vercel Hobby is explicitly non-commercial, and Supabase image features and storage headroom sit on Pro), this is unlikely to bind, but it should be checked before the maintenance loop is designed around it.
- The three-week threshold at which the bespoke admin should be abandoned for Directus is a judgement, not a measurement. It should be re-evaluated after the first week of admin work against how much of the publish gate and audit trail turned out to be reusable.
- Whether the operator wants an agency staff member to ever hold publish rights, or whether publish should remain hers alone, is unresolved and determines whether the role_permissions table needs a publish permission at all. Worth deciding before RLS policies are written, because retrofitting a role boundary through RLS touches every policy.
- Payload's admin RTL completeness should be re-checked before any future migration decision. The defects documented in early 2025 were fixed, but the pattern was repair-on-report rather than designed-in support, and that is a moving assessment rather than a fixed property.

## Sources

- [Storage Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations) · Supabase · accessed 2026-08-22  
  Pro-plan requirement, $5 per 1,000 origin images beyond 100 included, WebP-only automatic format with AVIF forthcoming, 1-2500px width/height, quality 20-100 default 80, resize modes cover/contain/fill, 25MB and 50MP source limits. Basis for rejecting on-the-fly transforms in favour of a sharp upload job.
- [Vercel Functions Limits](https://vercel.com/docs/functions/limitations) · Vercel · last updated 2026-07-01  
  4.5 MB request and response body cap (413 FUNCTION_PAYLOAD_TOO_LARGE), memory 2 GB/1 vCPU Hobby and 4 GB/2 vCPU Pro, 300s default duration with 800s Pro maximum. Basis for direct-to-Storage upload plus a per-image derivative function.
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing) · Vercel · last updated 2026-02-23  
  5K transformations/month included on Hobby, $0.05-$0.0812 per 1K on-demand, cache read and write billing, transformations billed per cache MISS and STALE, Hobby restricted to non-commercial personal use. Basis for pinning the width matrix and pre-generating derivatives.
- [Image Component (next/image) API Reference](https://nextjs.org/docs/app/api-reference/components/image) · Vercel / Next.js · version 16.3.2, lastUpdated 2026-08-18  
  Default formats ['image/webp'], deviceSizes and imageSizes default arrays, qualities default [75], minimumCacheTTL 14400, AVIF encodes ~50% slower and compresses ~20% smaller than WebP, each format cached separately, blurDataURL must be supplied manually for remote images with 10px or less recommended and large values warned against.
- [Output options (toFormat, webp, avif)](https://sharp.pixelplumbing.com/api-output/) · sharp (Lovell Fuller) · accessed 2026-08-22  
  WebP quality default 80 / effort 4 (0-6) / chroma 4:2:0; AVIF quality default 50 / effort 4 (0-9) / chroma 4:4:4. Basis for separate per-encoder quality settings in the derivative job.
- [Standard Uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads) · Supabase · accessed 2026-08-22  
  6 MB recommended ceiling for standard multipart uploads, TUS resumable recommended above that, 5 GB hard maximum. Basis for resumable upload of camera originals.
- [Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control) · Supabase · accessed 2026-08-22  
  RLS policies on storage.objects for insert/select/update/delete, owner_id and auth.jwt()->>'sub', and that service keys entirely bypass RLS. Basis for the photo bucket policy shipping with the table.
- [Custom Claims & Role-based Access Control (RBAC)](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac) · Supabase · accessed 2026-08-22  
  user_roles and role_permissions tables, custom_access_token_hook(event jsonb) injecting the role into JWT claims, authorize(requested_permission app_permission) called from RLS policies. Basis for the photographer / reviser / operator role split.
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) · Supabase · accessed 2026-08-22  
  Policy syntax for select/insert/update/delete, auth.uid() returning null when unauthenticated, raw_app_meta_data versus raw_user_meta_data for authorisation data, and service_role holding bypassrls. Basis for the draft/published visibility policy.
- [Cron](https://supabase.com/docs/guides/cron) · Supabase · accessed 2026-08-22  
  Scheduling from every second to once a year, SQL snippets / database functions / HTTP requests / Edge Functions, run history in cron.job_run_details, recommendation of no more than 8 concurrent jobs each under 10 minutes. Basis for the nightly set-based staleness sweep.
- [Supabase Pricing](https://supabase.com/pricing) · Supabase · accessed 2026-08-22  
  Free 1 GB storage / 500 MB database / 5 GB egress; Pro $25/mo with 100 GB storage then $0.0213/GB, 8 GB disk then $0.125/GB, 250 GB egress then $0.09/GB, 100 origin images then $5 per 1000; Team $599/mo. Basis for the infrastructure line of the costed plan.
- [Generated Columns](https://www.postgresql.org/docs/current/ddl-generated-columns.html) · PostgreSQL Global Development Group · current documentation, accessed 2026-08-22  
  Immutable-expression restriction, no subqueries, no reference to another generated column, no system columns except tableoid, VIRTUAL available from PG18 and STORED from PG12. Basis for implementing the completeness score as trigger-maintained counters plus one STORED column.
- [Content > Translations](https://directus.com/docs/guides/content/translations) · Directus · accessed 2026-08-22  
  Translations modelled as an O2M junction collection plus a languages collection; comprehensive RTL support for both content editing and the entire studio interface with automatic detection for Arabic, Farsi and Hebrew and a per-user direction override; no per-locale required-field or completeness validation documented.
- [Directus Pricing](https://directus.com/pricing) · Directus · accessed 2026-08-22  
  Open Innovation Grant giving fully permissive self-hosted access at no software cost below $5M revenue and 50 employees; Core free at 3 seats and 25 collections; Team $499/mo annual or $599/mo rolling; Cloud add-on $99/mo; no free cloud tier. Basis for the fallback-tool cost line.
- [Configuration > Localization](https://github.com/payloadcms/payload/blob/main/docs/configuration/localization.mdx) · Payload CMS · accessed 2026-08-22  
  locales array with code, label, rtl boolean ('will make the admin UI display in Right-To-Left') and fallbackLocale; defaultLocale; field-level localized: true on any named field; localized data stored as an object keyed by locale; no per-locale validation documented.
- [Versions > Drafts](https://payloadcms.com/docs/versions/drafts) · Payload CMS · accessed 2026-08-22  
  _status field with draft/published/changed; draft: true saves only to the versions table and bypasses required-field validation; autosave and schedulePublish options; localizeStatus in Beta. Basis for the two-schema permissive-save / strict-publish model.
- [Versions > Overview](https://payloadcms.com/docs/versions/overview) · Payload CMS · accessed 2026-08-22  
  Audit log of every change including which user made which change, versions collection fields (parent, autosave, version, createdAt, updatedAt), admin diff views, maxPerDoc default 100. Basis for the audit-trail requirement and for what a bespoke admin must reimplement.
- [Database > Postgres](https://payloadcms.com/docs/database/postgres) · Payload CMS · accessed 2026-08-22  
  Drizzle ORM plus node-postgres; schema managed by Payload with db push in development and migrations elsewhere; beforeSchemaInit with Drizzle introspection required to preserve existing tables; pool.connectionString for external Postgres such as Supabase. Basis for the schema-ownership conflict finding.
- [Add rtl support to dashboard some elements (issue #11162)](https://github.com/payloadcms/payload/issues/11162) · payloadcms/payload on GitHub · opened 2025-02-13, closed via PR #11282  
  Specific RTL defects in the Payload admin (tab button margin, publish button border-radius, Archive component alignment) fixed on report. Basis for treating Payload's Arabic admin RTL as improving-but-trailing rather than designed-in.
- [Localization (field-level vs document-level)](https://www.sanity.io/docs/localization) · Sanity · accessed 2026-08-22  
  Two i18n models via sanity-plugin-internationalized-array and @sanity/document-internationalization; content held in Sanity's own document store; no RTL, per-locale required-field or validation guidance. Basis for disqualifying Sanity on system-of-record grounds.
- [Content Strategy 101](https://www.nngroup.com/articles/content-strategy/) · Nielsen Norman Group (Anna Kaley) · 2022-11-13 — FLAGGED as older than the 2023 cut-off  
  Four phases (planning, creation, maintenance, unpublishing); 'Content won't govern itself'; content-governance council; 'at least a 3-month interval for reviewing content and supporting collateral'; maintenance checklist and content scorecard; unpublishing considerations for redirects, archives and SEO.
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · Google Search Central · last updated 2025-12-10  
  First-hand expertise question including 'or visiting a place'; byline question requiring author background; automation/AI disclosure question; 'trust is most important' among E-E-A-T factors; original reporting and substantial added value questions.
- [FAQ (FAQPage) structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) · Google Search Central · last updated 2026-06-15  
  FAQ rich results removed from Google Search as announced May 2026, after a September 2023 restriction to well-known authoritative government and health sites. Basis for the anti-pattern about spending editorial hours on platform-controlled markup.
- [An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) · W3C Web Accessibility Initiative · accessed 2026-08-22  
  Five image categories (informative, decorative, functional, images of text, complex); empty alt for decorative and redundant images; complex images require information elsewhere on the page. Basis for the is_decorative column and the shape of the alt-text completeness rule.
- [Data Protection Laws of the World — Saudi Arabia](https://www.dlapiperdataprotection.com/index.html?t=law&c=SA) · DLA Piper · accessed 2026-08-22  
  Saudi PDPL definition of personal data expressly including 'fixed or moving pictures of the individual'. Basis for the redaction rule and the content_permission table being a legal control rather than a style preference.
- [ISO 17100 (translation services requirements)](https://en.wikipedia.org/wiki/ISO_17100) · Wikipedia summary of ISO 17100:2015 (the ISO catalogue page at iso.org/standard/59149.html returned 403) · accessed 2026-08-22  
  Revision by a second person is an obligatory part of the standard; translator, reviser, reviewer, proofreader and project manager defined as distinct roles with subject-domain competence. Basis for the Arabic QA step and the revised_by field.
- [Translation rates](https://translated.com/translation-rates) · Translated · accessed 2026-08-22  
  Published average price of US$0.10 per word, with no English-to-Arabic pair published and a stated principle that rarer combinations cost more. The only verified market price anchor obtained; all other rate sources (Upwork, Bayt, ProZ, Glassdoor) returned HTTP 403.
