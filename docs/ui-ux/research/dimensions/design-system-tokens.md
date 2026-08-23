# Design system and tokens

Dimension `design-system-tokens` · verification verdict: mostly_solid

> Unedited research record, kept for traceability. Not through the house voice
> pass; the master document is where conclusions were written up and conflicts
> resolved. Confidence markings: verified means a primary source was read,
> reported means a credible secondary source, inferred means agent synthesis.
> The verification pass below was adversarial: the checker was instructed to
> refute rather than confirm, and to mark a claim unsupported by default.


## Summary

A design system makes a site consistent, not distinctive. Distinctiveness comes from what goes in the token layer; enforcement comes from making the generic option unavailable. That thesis survives verification intact, and the 2026 platform genuinely makes it cheap.

Three enforcement facts hold. Tailwind v4 (2025-01-22) moved config into CSS via `@theme`, and `--color-*: initial` deletes the default palette so `bg-blue-500` stops compiling — real enforcement, not a style guide. `--*: initial` goes further but also wipes `--spacing`, breakpoints and font stacks; Tailwind's own example re-declares them. Second, OKLCH, `color-mix()` and relative colour syntax are all Baseline since May 2023, so perceptual ramps are authored in plain CSS — remembering that oklch L is 0–1, so steps are `calc(l + 0.1)`, not `+ 20`. Third, `@property` (Baseline July 2024) type-checks tokens and resets invalid values to `initial-value`, though the rule is silently dropped if `initial-value` is required and missing.

For contrast structure, Radix's twelve steps are the reference: focus rings live at step 7, hovered borders at 8, and steps 11/12 guarantee APCA Lc 60/90 against step 2. USWDS's grade arithmetic (40 = AA Large, 50 = AA, 70 = AAA) is the faster mental model, and both must still be reconciled with WCAG 2.2's ratio-based 4.5:1 / 3:1, which APCA does not satisfy on its own.

The shadcn diagnosis needs updating. Its recognisable face is still the token file — OKLCH background/foreground pairs plus `--radius` — not its components. But since 3 July 2026 shadcn's default primitive is Base UI, not Radix, so "swap to Base UI for zero lineage" no longer escapes anything. Replace the token file and re-author base variants; that is the whole lever.

Arabic remains the hard part: different vertical metrics, no letter-spacing, its own digits and bidi classes. Critically, `size-adjust` and `font-size-adjust` cancel each other — pick one. Logical properties cut most of the RTL sheet but not all of it.

## Summary as first written, before verification

A design system does not make a site distinctive. A design system makes a site *consistent* — distinctiveness comes from what you put in the token layer, and enforcement comes from making the generic option physically unavailable. That is the thesis, and in 2026 it is unusually cheap to execute because the browser now does the hard parts natively.

Three platform facts change the calculus. (1) Tailwind v4 (released 2025-01-22) moved configuration into CSS via `@theme`, and `--*: initial` / `--color-*: initial` will **delete** the entire default palette — after which `bg-blue-500` simply does not compile. That is enforcement, not a style guide. (2) OKLCH, `color-mix()` and relative colour syntax reached Baseline in 2023, so accessible perceptual ramps can be authored and derived in plain CSS with no build-time colour library. (3) `@property` (Baseline July 2024) type-checks custom properties and falls back to `initial-value` on garbage, so tokens can be made structurally unbreakable.

The shadcn problem is misdiagnosed. shadcn's recognisable face is almost entirely its token file — the `background`/`foreground` OKLCH pairs and `--radius` — not its components, which are Radix behaviour you own as source. Replace the token file and re-author the base variants and the lineage disappears; if you want none at all, Base UI 1.7.0 or Ark UI ship identical a11y with zero visual opinion.

The genuinely hard part here is Arabic. It is not a translation layer, it is a second typographic system with different vertical metrics, a prohibition on letter-spacing, and its own digit and bidi behaviour. Design the token system for it from token zero, not as an RTL override file.

## Findings

### [PLATFORM FACT] Tailwind v4's `@theme` directive accepts `--*: initial` to disable ALL default theme variables, and `--color-*: initial` to wipe one namespace. After that, only tokens you declare generate utilities — `bg-blue-500`, `text-slate-600` etc. cease to exist.

Confidence: verified · type: constraint

Why it matters here: This is the single strongest anti-genericness lever available. It converts 'please use brand colours' from a code-review request into a compile-time impossibility. For a solo operator who will hand future sessions to an AI agent, an enforced palette is the difference between a system that holds and one that decays into Tailwind defaults by session five.

Evidence: Tailwind CSS v4 theme docs show `@theme { --color-*: initial; --color-midnight: #121063; }` removing all default colours, and `@theme { --*: initial; ... }` disabling the entire default theme.

Source: https://tailwindcss.com/docs/theme

### [PLATFORM FACT] Tailwind v4.0 shipped 2025-01-22 with an OKLCH/P3 default palette, CSS-first `@theme` config, built-in container queries (`@container`, `@sm:`, `@min-*`/`@max-*`), and a spacing system derived from one variable — `.mt-8` compiles to `calc(var(--spacing) * 8)`, so every spacing utility is generated dynamically from a single token.

Confidence: verified · type: trend

Why it matters here: Two consequences. First, Tailwind's own defaults are now themselves a recognisable look (the OKLCH slate/blue set is on a huge share of 2025-26 sites), which strengthens the case for deleting them. Second, `--spacing` means the whole spatial rhythm of the site is one declaration — changing 0.25rem to 0.3125rem re-tunes every gap at once, which is a real distinctiveness dial almost nobody turns.

Evidence: Tailwind CSS v4.0 announcement, 2025-01-22: new engine, CSS-first `@theme`, 'modernized P3 color palette' in oklch, dynamic utility values from `--spacing`, container queries built in.

Source: https://tailwindcss.com/blog/tailwindcss-v4

### [PLATFORM FACT] `oklch()` is Baseline widely available since May 2023. L runs 0–1 (or 0–100%), C runs 0 to ~0.4 in practice (100% ≡ 0.4), H runs 0–360 — and the hue angles differ from HSL: in OKLCH red sits near 41deg, not 0deg.

Confidence: verified · type: constraint

Why it matters here: Perceptually uniform lightness is what lets you build a ramp where step 9 in every hue family is the same visual weight — the precondition for the Radix-style role map below. The hue-angle offset matters practically: the 'travel blue' everyone uses sits around H 250–265 in OKLCH and 'booking orange' around H 40–70, so you can literally write a forbidden-hue rule into the token file.

Evidence: MDN `oklch()` reference: L 0–1, C 0–0.4 practical max (100% = 0.4), H 0–360, '0deg ≈ magenta; red ≈ 41deg'; Baseline widely available since May 2023.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch

### [PLATFORM FACT] `color-mix()` (Baseline May 2023) and relative colour syntax (`oklch(from var(--brand) calc(l + 0.1) c h)`) let you derive tints, shades, state layers and complementary hues in pure CSS, with `in oklab` giving perceptually even steps. Channel values in relative syntax resolve to unitless numbers, so you cannot use percentages inside `calc()` on them.

Confidence: verified · type: constraint

Why it matters here: You do not need a colour library, a build step, or a Figma plugin to generate a ramp. Hover/active/selected states become `color-mix(in oklab, var(--accent) 88%, var(--surface))` — one rule instead of thirty hand-picked hexes. It also means a runtime brand switch (multi-brand / seasonal campaign skins) is one custom property change.

Evidence: MDN color-mix(): Baseline since May 2023, supports `in oklab`/`in oklch` with `shorter|longer|increasing|decreasing hue`. MDN Relative colors (updated 2025-12-16): `oklch(from var(--base-color) calc(l + 20) c h)`, channel values are `<number>`.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors

### [PATTERN] Radix Colors assigns a fixed job to each of 12 steps: 1 app background, 2 subtle background, 3/4/5 component background at rest/hover/active, 6/7/8 borders (non-interactive / interactive / focus ring), 9/10 solid fill and its hover, 11 low-contrast text, 12 high-contrast text. Steps 11 and 12 are guaranteed to APCA Lc 60 and Lc 90 against step 2 of the same scale.

Confidence: verified · type: pattern

Why it matters here: This is the best-documented semantic contract for a colour ramp and it is free to adopt. It answers 'how many neutrals do I need' — one 12-step neutral covers every surface, border and text role, so a second full grey ramp is nearly always redundant. It also makes new colour families auditable: a family that cannot fill all 12 slots is not a family.

Evidence: Radix Colors, Understanding the scale: full step-by-step role list; 'guaranteed to Lc 60 and Lc 90 APCA contrast ratio on top of a step 2 background from the same scale.'

Source: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

### [PATTERN] USWDS names colour tokens family-grade-variant (e.g. `blue-50v`) where grade 0–100 expresses standardised luminance across families, and publishes 'magic numbers': a grade difference of 40 clears WCAG AA Large, 50 clears AA (and AAA Large), 70 clears AAA. Grade 50 passes AA against both pure white (0) and pure black (100).

Confidence: verified · type: pattern

Why it matters here: This is accessibility by construction rather than by audit. If your OKLCH ramp fixes L per step across all hue families, you can state the same rule for your own system ('any pair ≥5 steps apart is AA') and then assert it in CI. For a package site full of price badges, urgency labels and photo overlays, a rule beats a spot-check.

Evidence: USWDS design tokens colour overview: grade expresses lightness consistently across families; magic numbers 40 / 50 / 70 for AA Large / AA / AAA.

Source: https://designsystem.digital.gov/design-tokens/color/overview/

### [PRINCIPLE] WCAG 2.2 SC 1.4.3 requires 4.5:1 for normal text and 3:1 for large text, where large means ≥18pt (≈24px) or ≥14pt bold (≈18.5px) at 1pt = 1.333px. Logotypes and incidental text are exempt; SC 1.4.11 covers non-text (UI component and graphical object) contrast.

Confidence: verified · type: principle

Why it matters here: The exact pixel thresholds decide whether a display-size heading may use a low-contrast brand tint. A 24px+ hero headline can sit at 3:1 — which is precisely where an editorial, non-generic type treatment lives. Below 24px you have no room to be moody. This should be encoded per type-scale step, not left to judgement.

Evidence: W3C WAI, Understanding SC 1.4.3 Contrast (Minimum), WCAG 2.2: 4.5:1 / 3:1; large-scale = 18pt or 14pt bold; 1pt = 1.333px; logotype and incidental exceptions.

Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

### [PRINCIPLE] WCAG 2.2 SC 1.4.12 requires the layout to survive user-applied line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12×, and word-spacing 0.16× the font size — with an explicit exception for 'human languages and scripts that do not make use of one or more of these text style properties'.

Confidence: verified · type: principle

Why it matters here: The exception is the legal cover for the Arabic rule below: Arabic does not use letter-spacing, so you are not obliged to apply tracking to it, and applying it is actively harmful. Practically, it also means the card and price components must not break when line-height jumps to 1.5 — test at those four values, not just at your design values.

Evidence: W3C WAI, Understanding SC 1.4.12 Text Spacing, WCAG 2.2: the four exact multipliers plus the language/script exception.

Source: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

### [PRINCIPLE] Per the W3C Arabic & Persian Layout Requirements (Group Draft Note, 2025-10-02): Arabic ascenders and descenders extend much further than Latin's; intra-word spacing may only be adjusted next to non-dual-joining letters, and 'moving two joined characters closer to or further from each other creates undesirable results'; justification uses kashida/tatweel (U+0640), alternate glyphs and ligatures rather than tracking.

Confidence: verified · type: constraint

Why it matters here: Three hard token rules fall out. Line-height tokens must be script-aware (Arabic needs more block space than the Latin value). Letter-spacing tokens must be scoped so they never reach Arabic text. And any 'justify' treatment you design for Latin prose will not transfer. Getting this wrong is the most common way a Gulf-facing site built by a Latin-first team looks amateur to its actual audience.

Evidence: W3C Arabic & Persian Layout Requirements (alreq), Group Draft Note 2 October 2025 — sections on vertical metrics, joining behaviour, and justification.

Source: https://www.w3.org/TR/alreq/

### [PLATFORM FACT] The Arabic/Latin pairing problem has a native CSS solution: the `@font-face` `size-adjust: N%` descriptor (Baseline widely available since September 2023) rescales all metrics of one face, and the `font-size-adjust` property with the two-value form (`cap-height 0.73`, `ex-height 0.5`, `ch-width`) is Baseline since July 2024. `size-adjust` on the face overrides the metric used by `font-size-adjust`.

Confidence: verified · type: constraint

Why it matters here: Arabic and Latin faces almost never share an optical size at the same `font-size`; mixed strings ('7 nights / ٧ ليالٍ', 'AED 4,200') look broken. Rather than maintaining two font-size scales, set one `size-adjust` percentage on the Arabic face once and every existing type token works for both scripts. This is a five-line fix for a problem most sites solve badly or not at all.

Evidence: MDN `@font-face`/`size-adjust` — Baseline widely available since September 2023; MDN `font-size-adjust` — Baseline newly available July 2024, metrics ex-height / cap-height / ch-width / ic-width / ic-height, formula u = (m / m′) × s.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust

### [PLATFORM FACT] Arabic has three numeral systems with different bidi classes: European (0–9), Arabic-Indic ٠–٩ (U+0660–0669, bidi class AN), and Eastern Arabic-Indic ۰–۹ (U+06F0–06F9, bidi class EN). AN and EN reorder differently in bidirectional text.

Confidence: verified · type: constraint

Why it matters here: Prices, durations and dates are the most-read strings on a package site. Choosing digits is a per-market product decision (Gulf and Egypt differ from Maghreb), and mixing systems inside one string produces reordering bugs that look like data corruption. This belongs in the token/locale layer as an explicit decision, not left to whatever the CMS pastes in.

Evidence: W3C alreq (2025-10-02), numeral systems section: three sets, with Arabic-Indic carrying bidi class AN and Eastern Arabic-Indic class EN.

Source: https://www.w3.org/TR/alreq/

### [PLATFORM FACT] CSS logical properties (`margin-inline-start`, `padding-block`, `inset-inline-end`, `border-start-start-radius`, `text-align: start/end`, `inline-size`/`block-size`) are Baseline-stable and automatically flip under `direction: rtl`, eliminating the need for a separate RTL stylesheet.

Confidence: verified · type: constraint

Why it matters here: For an Arabic/English site this is the difference between one design system and two. It also affects the token layer directly: radius tokens must be expressed with logical corner properties, or an asymmetric-corner brand shape will mirror wrongly (or fail to mirror) in Arabic.

Evidence: MDN CSS logical properties and values (updated Nov 2025): full logical equivalents list, baseline-stable across Chrome/Firefox/Safari/Edge since ~2023, with an explicit RTL rationale.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

### [PLATFORM FACT] `@property` is Baseline newly available since July 2024. It type-checks a custom property via `syntax`, requires `inherits`, and — critically — an invalid assigned value falls back to `initial-value` instead of cascading garbage. Registered properties are also animatable.

Confidence: verified · type: constraint

Why it matters here: This is how a token system defends itself. Register `--surface` as `<color>` and `--brand-h` as `<number>`, and a bad value from a future session degrades to the brand default rather than producing an invisible button. The animatability is a bonus: it lets you transition a hue or lightness token, which is where a signature motion identity can live.

Evidence: MDN `@property`: syntax/inherits/initial-value descriptors, invalid values rejected in favour of initial-value, registered properties animatable; Baseline 2024 newly available (July 2024).

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@property

### [PLATFORM FACT] Cascade layers (`@layer`) are Baseline widely available since March 2022, and once layer order is set, specificity is ignored between layers — but **unlayered styles override every layer**. Tailwind v4 itself ships `@layer theme, base, components, utilities`.

Confidence: verified · type: constraint

Why it matters here: A design system that can be overridden by any stray unlayered rule is not a system. Putting every stylesheet inside a declared layer (and forbidding unlayered CSS) makes override order a design decision rather than a specificity arms race — which is exactly what stops a codebase drifting over many sessions.

Evidence: MDN `@layer`: widely available since March 2022; 'styles outside layers always override styles in layers'; !important reverses layer order. Tailwind v4 theme docs show its own layer declaration.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@layer

### [PLATFORM FACT] Container queries reached Baseline in 2023 (Chrome/Edge 105, Firefox 110, Safari 16) with `container-type: inline-size|size`, named containers, and the `cqi`/`cqb`/`cqmin`/`cqmax` units. Container **style** queries work today only for custom properties — `@container style(--variant: compact)` — with regular declarations unimplemented in every browser.

Confidence: verified · type: constraint

Why it matters here: A package card appears in a 3-up grid, a 2-up comparison, a sidebar 'similar trips' rail and a full-width featured slot. Viewport media queries force four components; container queries make it one. Style queries additionally let a surface set `--density` and have every descendant re-tune itself — a distinctive systematisation move that almost no travel site uses.

Evidence: MDN Container queries (updated 2026-07-08) for syntax and units; web.dev Baseline 2023 for the browser versions; MDN Container size and style queries: 'only CSS custom properties are supported' for style queries.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries

### [PLATFORM FACT] Subgrid has been Baseline since September 2023. A nested grid set to `grid-template-columns: subgrid` adopts the parent's tracks, inherits its gap (overridable) and receives its named grid lines; it also prevents implicit track creation in that dimension.

Confidence: verified · type: constraint

Why it matters here: Subgrid plus named lines is the mechanism for an editorial page shell — a single named grid (`full`, `breakout`, `content`) declared once, with sections opting into it. That is what produces full-bleed image breakouts inside a constrained prose column and card internals that align across a row, i.e. the 'designed magazine' feel rather than the 'stacked cards' feel.

Evidence: MDN Subgrid: 'available across browsers since September 2023'; gap and line-name inheritance; implicit-track limitation.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid

### [PLATFORM FACT] Utopia's fluid type formula is: slope = (maxSize − minSize) / (maxViewport − minViewport); y-intercept = (−minViewport × slope) + minSize; result = `clamp(minSize, yIntercept + slope × 100vw, maxSize)`. Utopia recommends a conservative ratio at the small end and a more dramatic one at the large end. Adrian Roselli's research is cited as a warning that clamp can interfere with a user's explicit browser text-zoom preference.

Confidence: verified · type: principle

Why it matters here: This gives you a real formula rather than hand-picked breakpoint sizes, and the two-ratio idea is a genuine distinctiveness lever: keeping mobile calm (≈1.2) while letting desktop go loud (≈1.33–1.5) is what makes a page feel art-directed instead of templated. The zoom caveat means both bounds must be in rem and the result must be tested at 200% zoom.

Evidence: utopia.fyi 'Fluid Responsive Design' clamp post — slope/intercept derivation and the example `clamp(1rem, 0.7143rem + 1.4286vw, 2rem)` for 320→1440px; utopia.fyi 'Designing with fluid type scales' on differing ratios per end.

Source: https://utopia.fyi/blog/clamp/

### [PLATFORM FACT] Variable font registered axes are `wght` (1–1000, maps to font-weight), `wdth` (percentage, font-stretch), `ital` (0–1), `slnt` (−90 to 90 degrees), and `opsz` (font-optical-sizing: auto|none). Registered axis tags are lowercase; custom axes such as `GRAD` are uppercase. Prefer the standard CSS properties over `font-variation-settings`, which requires redeclaring all axes when changing one.

Confidence: verified · type: constraint

Why it matters here: A display face with a `wdth` axis is the cheapest source of a distinctive editorial voice — one file gives you condensed headline settings that no template has, without a second font download. `opsz` with `font-optical-sizing: auto` is what makes small print and large headlines feel drawn rather than scaled. Both are one-line token decisions.

Evidence: MDN Variable fonts guide: registered axes and ranges, lowercase/uppercase tag convention, `font-variation-settings` redeclaration caveat, `@font-face` weight ranges e.g. `font-weight: 300 900`.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide

### [PLATFORM FACT] `next/font` self-hosts Google fonts at build time with no browser request to Google, supports variable fonts without specifying weight, exposes a `variable: '--font-x'` option that emits a CSS custom property, and offers `adjustFontFallback` (default true) to reduce CLS. The documented Tailwind v4 wiring is `@theme inline { --font-sans: var(--font-inter); }`.

Confidence: verified · type: constraint

Why it matters here: This is the exact seam between font loading and the token layer: fonts enter as CSS variables on `<html>`, `@theme inline` turns them into `font-display`/`font-body`/`font-arabic` utilities, and nothing else in the codebase ever names a typeface. It also means swapping the display face later is a one-line change. `@theme inline` (not plain `@theme`) is required when a theme variable references another variable.

Evidence: Next.js Font Optimization docs (v16.3.2, updated 2026-05-27) and the next/font API reference (updated 2025-08-06): `variable`, `subsets`, `axes`, `display`, `adjustFontFallback`, and the `@theme inline` Tailwind v4 example.

Source: https://nextjs.org/docs/app/api-reference/components/font

### [PLATFORM FACT] `text-wrap: balance` is Baseline since March 2024 and is capped by browsers at 6 lines (Chromium) / 10 lines (Firefox), so its performance cost is negligible; `text-wrap: pretty` uses a slower algorithm to reduce orphans and should be limited to body copy.

Confidence: verified · type: trend

Why it matters here: Balanced headlines are one of the highest-craft-per-byte signals available, and they matter specifically for screenshot-driven organic reach — a hero headline that breaks 5/1 words looks amateur in a shared image. The line caps mean `balance` belongs on h1/h2/blockquote/card titles as a blanket token rule, not applied case by case.

Evidence: MDN `text-wrap`: Baseline 2024 (newly available March 2024); Chromium 6-line and Firefox 10-line limits for `balance`; `pretty` slower-algorithm caveat.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap

### [PLATFORM FACT] `light-dark()` is Baseline since May 2024 but only functions when `color-scheme: light dark` is set (typically on `:root`); setting `color-scheme: light` or `dark` on any subtree forces that branch.

Confidence: verified · type: constraint

Why it matters here: It collapses every two-value theme token to one declaration and — more usefully for an editorial site — lets you pin a single section to a fixed scheme. A permanently dark 'featured itinerary' band inside an otherwise light page becomes trivial, which is a strong art-direction device that media-query theming makes painful.

Evidence: MDN `light-dark()`: Baseline 2024 newly available since May 2024; requires `color-scheme: light dark`; per-element `color-scheme` override example.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark

### [DATA — PRE-2023, POSSIBLY STALE] NN/g (Raluca Budiu, 2020-02-02) reports light mode outperformed dark mode on visual-acuity and proofreading tasks for people with normal vision, while people with cloudy ocular media read faster in dark mode; NN/g advises against defaulting to dark for a general audience but always offering the switch, honouring system-level preference.

Confidence: reported · type: data

Why it matters here: It argues against the 2026 fashion of shipping dark-only 'premium' sites. For a package-browsing audience reading itineraries and prices, light should be the default and dark a first-class alternative respecting `prefers-color-scheme` — which is exactly what `color-scheme: light dark` + `light-dark()` gives. Flagging as 2020 research: re-verify before treating the effect sizes as current.

Evidence: Nielsen Norman Group, 'Dark Mode vs. Light Mode: Which Is Better?', Raluca Budiu, 2020-02-02.

Source: https://www.nngroup.com/articles/dark-mode/

### [PATTERN] shadcn/ui states plainly: 'This is not a component library. It is how you build your component library.' Its distribution is copy-paste source you own, built on Radix primitives, and its visual identity lives in a CSS variable file of `background`/`foreground` semantic pairs (card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1..5, sidebar) in OKLCH, exposed to Tailwind via `@theme inline`, plus a single `--radius`.

Confidence: verified · type: pattern

Why it matters here: This reframes the whole 'shadcn looks the same' problem. The recognisable face is the token file and the base variant styling, not the components — and both are yours to replace outright. You can keep Radix's tested accessibility while shipping a face with no shadcn lineage, provided you replace the token file wholesale and re-author every base variant *before* building screens, not after.

Evidence: shadcn/ui docs (philosophy, registry, Radix primitives) and shadcn/ui theming docs (the full semantic variable list, OKLCH values, `@theme inline` mapping, custom-variable pattern).

Source: https://ui.shadcn.com/docs/theming

### [PATTERN] Two credible zero-lineage alternatives exist. Base UI is at v1.7.0, unstyled, ships no CSS, adheres to WAI-ARIA patterns, and is built by the people behind Radix, Material UI and Floating UI. Ark UI is headless, powered by Zag.js finite state machines, offers 45+ components with a consistent API across React, Vue, Solid and Svelte, MIT licensed.

Confidence: verified · type: pattern

Why it matters here: If the operator wants zero risk of inherited visual identity, either library gives the same accessibility guarantees with literally no shipped styling to escape from. The trade is that you write every visual state yourself and lose shadcn's CLI/registry scaffolding speed. Whichever is chosen, never mix two primitive libraries in one app — focus management and portal behaviour will conflict.

Evidence: Base UI 'About' page: v1.7.0, unstyled, WAI-ARIA adherence, maintainer list. Ark UI GitHub README: headless, Zag.js state machines, React/Solid/Vue/Svelte, '45+ production-ready components', MIT.

Source: https://base-ui.com/react/overview/about

### [CONSTRAINT] The DTCG Design Tokens Format is still a Draft Community Group Report (dated 2026-07-30) that explicitly says 'Do not attempt to implement this version' and is not a W3C Standard. It does define `$value`/`$type`/`$description`/`$extensions`/`$deprecated`, groups with `$type` inheritance and `$extends`, `{group.token}` alias syntax plus JSON Pointer `$ref`, and forbids `$`, `{`, `}` and `.` in names. Style Dictionary (v5) consumes this shape through a nine-step parse → merge → transform → resolve → format pipeline.

Confidence: verified · type: constraint

Why it matters here: It is the right *shape* to author tokens in — it gives you tiering via groups, aliasing for the primitive→semantic link, and a stable naming discipline — but it is not stable enough to build tooling against, and for a solo operator a full Style Dictionary pipeline may be over-engineering. The pragmatic call: adopt the naming and aliasing discipline, emit CSS custom properties, and only add the build pipeline if a second output target (Figma, React Native, email) ever appears.

Evidence: designtokens.org DTCG Format spec, Draft Community Group Report 2026-07-30, including the name-character restrictions and alias syntaxes. Style Dictionary architecture docs (v5) for the nine-step build pipeline.

Source: https://www.designtokens.org/TR/drafts/format/

### [PATTERN] USWDS ships a deliberately sparse 8px-based spacing scale — 0.5(4px), 1(8), 1.5(12), 2(16), 2.5(20), 3(24), 4(32), 5(40), 6(48), 7(56), 8(64), 9(72), 10(80), 15(120) — plus 1px/2px hairlines and named large tokens (card 160, card-lg 240, mobile 320, tablet 640, desktop 1024, widescreen 1400). Note the deliberate gap: nothing between 80px and 120px. USWDS frames tokens as 'a scale of musical notes drawn from the spectrum of all possible frequencies'.

Confidence: verified · type: pattern

Why it matters here: The gaps are the design. Tailwind v4's dynamic spacing will happily generate `p-11` and `p-13`, which is how spatial rhythm dissolves. Declaring a permitted subset and lint-enforcing it is what makes vertical rhythm read as intentional — the thing that separates a designed page from a generated one. Absence of a value is a stronger system feature than presence of one.

Evidence: USWDS design tokens overview (constrained-palette philosophy) and spacing units page (the exact token → pixel table).

Source: https://designsystem.digital.gov/design-tokens/spacing-units/

### [PRINCIPLE] Jakob's Law: 'Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know.' (Jakob Nielsen). Deviating from convention is survivable when users get gradual transition and control, per the cited YouTube-redesign example.

Confidence: reported · type: principle

Why it matters here: This is the guardrail on the whole differentiation brief. Distinctiveness must be spent on the *skin* and the *content model* — colour, type, grid, motion, photography, the anatomy of a package card — and withheld from the *interaction model*: where search lives, how dates are picked, how prices and inclusions are read, how checkout steps sequence. Sites that invert this get screenshotted for the wrong reasons and convert badly.

Evidence: Laws of UX, 'Jakob's Law' (Jon Yablonski), quoting Jakob Nielsen / NN/g. Note: the law itself is long-standing and undated on that page — treat as timeless principle, not current research.

Source: https://lawsofux.com/jakobs-law/

### [CONSTRAINT — CULTURAL] The pan-Arab colours are black, white, green and red, from a 14th-century verse by Safi al-Din al-Hilli, first combined in the 1916 Arab Revolt flag and now in the flags of Egypt, Iraq, Jordan, Kuwait, Palestine, Sudan, Syria, the UAE, Yemen and Western Sahara. Green carries specific Islamic significance and is often associated with the Prophet Muhammad. Saudi Arabia's flag is green bearing the shahada in Thuluth; because the shahada is sacred it is never flown at half-mast and 'is not normally used on T-shirts or other items' — Saudi Arabia formally protested a FIFA plan to print it on footballs.

Confidence: reported · type: constraint

Why it matters here: Green is not a neutral brand colour in this market — a saturated green field with white type can read as national or religious rather than as a travel brand, and a green-and-white identity risks accidental flag resemblance. Equally important: never use the shahada, a crescent, or flag imagery as decorative brand furniture. Gold is the safer 'premium' signal, but flat metallic gold is itself a Gulf-luxury cliché; treat it as a multi-stop ramp, not one hex.

Evidence: Wikipedia, 'Pan-Arab colors' (al-Hilli verse, dynastic associations, flag list) and 'Flag of Saudi Arabia' (shahada in Thuluth, never at half-mast, merchandise restrictions, FIFA protest, green = Islam per Eriksen & Jenkins 2007).

Source: https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia

## Design implications

- TOKEN ARCHITECTURE — three tiers, one file each, aliases only downward. `tokens/primitive.css` holds raw values and is never referenced from a component (OKLCH ramps at fixed L per step, the rem scale, raw durations). `tokens/semantic.css` maps them to roles (`--surface-base`, `--surface-raised`, `--ink-primary`, `--ink-muted`, `--edge-subtle`, `--edge-strong`, `--accent-solid`, `--accent-solid-hover`, `--focus-ring`). `tokens/component.css` holds only tokens a single component owns (`--card-pad-block`, `--price-tag-radius`). Rule for every future session: JSX and Tailwind classes may reference tier 2 and 3 only. A grep for a tier-1 name outside `tokens/` is a review failure.
- ENFORCE BY DELETION — in `app/globals.css`, after `@import "tailwindcss"`, open `@theme` and set `--color-*: initial; --font-*: initial; --text-*: initial; --radius-*: initial; --shadow-*: initial; --ease-*: initial;` before declaring the project's own tokens. This removes `bg-blue-500`, `text-slate-700`, `rounded-lg`, `shadow-md` from existence. Keep `--spacing` and re-declare it once. This single block is the strongest anti-genericness mechanism in the build and should be the first thing written in the project.
- SPACING — set `--spacing: 0.25rem` and document a permitted subset (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32) modelled on USWDS's deliberate sparseness. Add a lint rule (regex over class strings in CI) rejecting spacing utilities outside the subset. The gaps are the design; Tailwind v4 will generate `p-11` unless you stop it.
- COLOUR CONSTRUCTION — author every ramp in OKLCH with L fixed per step across all hue families (a 12-step ladder, e.g. L ≈ 0.99, 0.97, 0.94, 0.90, 0.86, 0.80, 0.72, 0.62, 0.55, 0.50, 0.42, 0.24 — these are a starting construction, not a sourced figure; tune C per hue to stay in gamut). Adopt Radix's 12-step role map verbatim as the semantic contract. Any new colour family must fill all 12 slots or it does not enter the system.
- CONTRAST BY CONSTRUCTION — because L is fixed per step, state and CI-test a USWDS-style rule for your own ramp: 'any foreground/background pair ≥N steps apart clears 4.5:1; ≥M steps clears 3:1'. Determine N and M empirically once, write them into the token file as a comment, and add a Vitest/Node test that iterates every semantic pair defined in `semantic.css` and fails the build on a violation. Do not rely on spot-checking in Figma.
- FORBIDDEN HUE BANDS — write into `primitive.css` an explicit exclusion: no accent may sit in OKLCH H 220–265 (the Booking/Expedia/Skyscanner blue band) or H 30–70 at C > 0.15 (the 'Book now' orange band). Put the reasoning in a comment so a future session cannot quietly reintroduce them. Pick the brand accent outside those bands and commit to a single accent.
- NEUTRALS — ship exactly one 12-step neutral, tinted toward the brand hue at very low chroma (C ≈ 0.004–0.015) rather than a pure grey, plus a separate semi-transparent neutral ramp for scrims over photography (destination imagery makes opaque overlays look pasted on). Two full neutral ramps is one too many; pure `#FFFFFF` and `#000000` exist only as named constants for logos and pure-black scrims.
- GROUND COLOUR — do not start the page on `#FFF` or Tailwind's `slate-50`. A warm off-white ground (roughly `oklch(0.97 0.008 85)`) plus a deep warm ink (roughly `oklch(0.24 0.02 70)`) already reads as art-directed at zero cost and is the cheapest single non-template decision available. Values are a proposed construction, to be tuned against the chosen accent.
- GREEN AND GOLD — if green is used, keep it deep, desaturated and warm-shifted, used as a ground or an accent-on-dark, never as a large saturated field paired with white type (flag resemblance), and never alongside crescent, sword or calligraphic-shahada motifs. Treat gold as a 4–6 stop OKLCH ramp used in gradients, hairlines and type, never as one flat metallic hex, which is the Gulf-luxury cliché.
- DARK MODE — set `color-scheme: light dark` on `:root`, express theme-varying semantic tokens as `light-dark(a, b)`, and additionally support a `[data-theme="dark"]` attribute override for a manual switch. Author the dark ramp separately (lower chroma at high L, raise L for text) rather than inverting. Light stays the default per NN/g. Use per-section `color-scheme: dark` to pin an art-directed dark band inside a light page.
- TYPOGRAPHY — three families, no more: a display face carrying the brand (choose one with a `wdth` or `opsz` axis), a body face that disappears, and an Arabic face. Load all three through `next/font` with `variable: '--font-display' | '--font-body' | '--font-arabic'`, apply all three variable classnames on `<html>`, and wire them with `@theme inline { --font-display: var(--font-display); ... }`. No component ever names a typeface.
- FLUID TYPE — precompute clamp() per step using slope = (max − min) / (maxVW − minVW) and intercept = (−minVW × slope) + min, storing `--step--2` through `--step-6`. Express both bounds in rem so browser text zoom survives, and verify the page at 200% zoom (WCAG 1.4.4) because clamp can cap the user's zoom preference. Use a conservative ratio at 320px (≈1.2) and a dramatic one at 1440px (≈1.33–1.5) — the mobile/desktop ratio split is what makes the type feel art-directed.
- OPTICAL SIZING — set `font-optical-sizing: auto` globally and, on the display face, drive `wdth` from the container: `font-variation-settings: "wdth" clamp(88, 80 + 4cqi, 112)` inside an `inline-size` container. Headlines that compress with their column is a craft signal essentially no travel site ships.
- ARABIC LINE-HEIGHT — line-height must be a script-aware token, not one global value. Set `--leading-body` higher under `:lang(ar)` than under `:lang(en)` because Arabic ascenders and descenders extend much further than Latin's (alreq). No sourced multiplier exists — pick a starting value, then verify visually with fully vowelled text (diacritics stack above and below) and with the WCAG 1.4.12 1.5× stress test.
- ARABIC TRACKING — scope every letter-spacing token so it can never reach Arabic: define tracking utilities under `[lang="en"], [dir="ltr"]` and force `letter-spacing: 0` under `:lang(ar)`. Moving joined Arabic letters apart damages the script (alreq), and WCAG 1.4.12's script exception explicitly covers not applying it.
- ARABIC/LATIN HARMONISATION — after choosing the two faces, measure them and set one `size-adjust: N%` on the Arabic `@font-face` (or `font-size-adjust: cap-height <n>`) so both scripts render at the same optical size at the same `font-size`. This lets one type scale serve both languages instead of maintaining two.
- DIGITS — make an explicit, recorded decision on numeral system per locale (European vs Arabic-Indic U+0660 vs Eastern Arabic-Indic U+06F0) and never mix systems within one string; AN and EN bidi classes reorder differently. Use `font-variant-numeric: tabular-nums` on all prices, durations and dates so figures align in comparison tables.
- LOGICAL PROPERTIES ONLY — add a Stylelint rule rejecting `margin-left/right`, `padding-left/right`, bare `left/right`, `text-align: left/right`, and `border-*-left/right-radius`. Radius tokens must use `border-start-start-radius` etc. so any asymmetric brand corner mirrors correctly in Arabic. One stylesheet serves both directions; there is no `rtl.css`.
- PAGE GRID — declare one named 12-column shell grid once (`[full-start] [breakout-start] [content-start] ... [content-end] [breakout-end] [full-end]`) and have sections opt in with `grid-template-columns: subgrid`. Full-bleed images take `grid-column: full`, pull-quotes take `breakout`, prose stays in `content`. This is the mechanism for editorial asymmetry that still holds a system — not ad-hoc negative margins.
- CONTAINER-DRIVEN COMPONENTS — every card, rail item and media object sets `container-type: inline-size` on its wrapper and sizes internals in `cqi`, so the same package card serves a 3-up grid, a 2-up comparison, a sidebar rail and a featured slot. Add `@container style(--density: compact)` variants driven by a custom property the surface sets, rather than a `size` prop threaded through React.
- TYPED TOKENS — register every colour, length and numeric token with `@property` (`syntax: "<color>"`, `"<length>"`, `"<number>"`, `inherits` set deliberately, `initial-value` always present). A typo then degrades to the brand default instead of producing an invisible control, and hue/lightness tokens become animatable for signature transitions.
- CASCADE LAYERS — declare `@layer reset, tokens, base, components, utilities;` at the top of `globals.css` and put every rule inside a layer. Nothing unlayered, ever: unlayered styles beat all layers and are how override wars start.
- SHADCN, IF USED — treat the CLI as a scaffolder, not a dependency. Order of operations matters: (1) write the token file first and delete Tailwind's defaults, (2) generate components into `components/ui/`, (3) immediately re-author the base variants — radius language, border weight, shadow (or its absence), focus-ring treatment, control heights and internal padding rhythm, icon stroke weight — and only then (4) build screens. Re-skinning after screens exist never fully happens. If zero lineage is required instead, use Base UI 1.7.0 or Ark UI and never mix two primitive libraries in one app.
- CONVENTION BUDGET — spend distinctiveness on skin and content model; keep the interaction model conventional per Jakob's Law. Conventional: search placement, date range picker behaviour, price display, filter affordances, checkout step sequence, form validation. Distinctive: grid rhythm, type drama, colour, motion, photography treatment, and the anatomy of the package card (what a 'package' shows and in what order is where a package site can genuinely out-design a metasearch site).
- MICRO-TYPOGRAPHY DEFAULTS — `text-wrap: balance` on h1/h2/h3, blockquotes and card titles (browsers cap it at 6/10 lines so the cost is negligible); `text-wrap: pretty` only on long-form prose; `hanging-punctuation` where supported. These are token-level global rules, not per-page decisions.
- DOCUMENTATION THAT CANNOT DRIFT — ship a `/design` route inside the app that renders every token, every ramp with its computed contrast, every component in every state, read directly from the token source. A separate Storybook or Notion page drifts; a route that imports the real tokens cannot. Publish it — a public design-system page is itself a source of organic reach and links.
- MEMORY DISCIPLINE (per this project's CLAUDE.md) — every irreversible token decision (accent hue, type families, spacing base, primitive library, digit policy) is written to `.memory/projects/` with an absolute date and the reasoning, not left in a code comment. Superseded decisions are struck through, not deleted.

## Anti-patterns to refuse

- Leaving Tailwind's default theme enabled. `bg-blue-600`, `text-slate-500`, `bg-gray-50`, `rounded-lg`, `shadow-md` will appear within days, and Tailwind v4's OKLCH slate/blue set is now one of the most recognisable 'this is a template' tells on the web. Deleting the namespace with `--color-*: initial` is a two-line fix that most projects never make.
- Shipping shadcn/ui with its stock token file. The shipped `background`/`foreground` OKLCH pairs, near-zero-chroma neutrals, default `--radius`, default control heights and default lucide stroke weight are collectively the shadcn face — and it is now instantly identifiable. Adding a brand `--primary` on top of the untouched rest changes nothing; the tell is the neutrals, the radius and the padding rhythm, not the accent.
- The OTA colour default: a Booking-style blue primary with an orange 'Book Now' CTA. Beyond being the exact generic outcome the operator wants to avoid, mid-tone orange on white typically fails 4.5:1 for normal text, so the site is simultaneously derivative and inaccessible.
- Naming colour tokens after appearance (`--blue-500`, `--orange-accent`) and referencing them directly in components. This makes rebranding, seasonal skins, multi-brand and dark mode all impossible without a find-and-replace across the codebase. Appearance names belong only in the primitive tier, which components never touch.
- Hex literals and arbitrary values in components — `bg-[#0F62FE]`, `text-[13px]`, `p-[19px]`, `style={{ color: '#333' }}`. Each one silently exits the system, escapes the contrast test, and breaks dark mode. This is how systems die: not by a decision, but by fifty small exceptions.
- Bolting dark mode on late as a `.dark` class with unaudited contrast, or worse, `filter: invert()`. Inverted palettes produce muddy, over-saturated colours because sRGB inversion is not perceptually uniform, and every photograph in a travel site inverts catastrophically.
- Fluid type using raw `vw` without clamp, or with px bounds. It breaks the user's browser text-zoom preference (the Roselli caveat Utopia itself cites) and violates WCAG 1.4.4. Both clamp bounds must be in rem and the page must be tested at 200% zoom.
- Treating Arabic as a translation layer: one Latin font with a system fallback doing the Arabic shaping, `direction: rtl` bolted on via a separate `rtl.css`, and physical CSS properties throughout. The result reads as a Western site wearing Arabic, which is precisely the wrong signal for this audience.
- Applying a global letter-spacing 'tightening' to headings. It damages Arabic joined letterforms — alreq is explicit that moving joined characters apart produces undesirable results — and there is no way to fix it per-component once it is a global token.
- Picking an Arabic display face because it 'looks Arabic' — faux-Kufi, Thuluth or Diwani used for UI and body text. Calligraphic styles are ceremonial; used as interface type they read as costume to native readers and are hard to scan. Reserve them, if at all, for a single logotype-scale moment.
- Using national or religious iconography as decoration: the Saudi flag, the shahada, crescents, or flag colour fields used as brand furniture. The shahada in particular carries formal restrictions on its reproduction, and casual use is not a neutral aesthetic choice.
- Viewport media queries for component-level layout, so the package card cannot be reused in a sidebar without a `variant` prop and a second stylesheet. Container queries have been Baseline since 2023; there is no remaining reason.
- A Figma file as the source of truth with hex values hand-copied into CSS. The two drift within one sprint. Tokens should flow one direction, from a text source into both.
- A 'design system' that is a document of screenshots and adjectives. It permits the brand; it does not enforce it. Enforcement is: deleted defaults, typed properties, lint rules, and a contrast test in CI.
- Chasing 2026 visual trends as the differentiation strategy — glassmorphism, bento grids, AI gradient meshes, oversized cursor effects. These are trends, not principles: they read as current for about eighteen months and as dated forever after, and because everyone adopts them simultaneously they produce sameness rather than distinction.
- Two full neutral ramps, or a 'brand grey' plus Tailwind's zinc plus a one-off `#F7F7F7` someone added for a section background. One tinted 12-step neutral plus an alpha ramp covers every legitimate surface, border and text need.

## Differentiation moves

- Single-accent discipline. One high-chroma accent, appearing at most once per viewport, against a warm low-chroma neutral system. The screenshot signature becomes the restraint — it is the opposite of the multi-colour badge clutter that defines package-deal sites, and restraint photographs far better in a shared image than saturation does.
- Warm off-white ground instead of `#FFF`/`slate-50`, with a warm ink instead of near-black. Roughly `oklch(0.97 0.008 85)` on `oklch(0.24 0.02 70)`. It is a single-line change that removes the template read instantly, and it flatters destination photography in a way cool greys do not.
- Container-driven variable width on the display face: `font-variation-settings: "wdth"` interpolated from `cqi`, so headlines physically compress in narrow columns and expand in full-bleed bands. Almost no site does this, it is one font file, and it makes the type feel drawn for the layout rather than dropped into it.
- A named-line page grid plus subgrid, so full-bleed imagery breaks out of a constrained prose column while card internals still align across a row. This is the technical basis of an editorial, magazine-like feel — asymmetry that is systematic rather than improvised.
- Treat the price-and-dates block as a designed component in its own right: tabular numerals, an optical-size step down for the currency, a deliberate relationship between the headline price and the per-person qualifier. On a package site this is the single most screenshotted element, and it is almost universally rendered as default text.
- Invert the pairing order: choose the Arabic face first and select the Latin to harmonise with it, rather than the usual reverse. Combined with `size-adjust` harmonisation, this produces a genuinely Gulf-native typographic voice instead of a Western system with Arabic bolted on — a difference the target audience registers immediately even if they cannot name it.
- Style-query-driven density: surfaces set `--density: compact | comfortable | editorial` and components re-tune padding, type step and image ratio via `@container style(...)`. One card component, three genuine personalities, no prop explosion — a systematisation move that reads as sophistication to anyone who inspects the CSS.
- Dark mode as a second design rather than a palette swap — a 'night' treatment where the accent behaves as a light source over imagery, with per-section `color-scheme` pinning so a single dark band can be art-directed into a light page. Inverted greys are never screenshotted; a designed night mode is.
- Motion as tokens: named easing curves (`--ease-editorial`) and duration steps registered with `@property` so colour and lightness tokens are themselves animatable. A consistent, slightly unusual easing curve across every transition is a genuine brand asset and costs nothing per component.
- A distinct radius language rather than one uniform value — for example a single asymmetric corner expressed with `border-start-start-radius` so it mirrors correctly in Arabic. A repeated non-obvious shape becomes a mark; uniform 8px rounding is the default everyone ships.
- Publish the design system itself at `/design`, rendered from the live tokens with computed contrast values shown. Design-system pages get linked and shared by other builders, which is exactly the organic-reach mechanism the brief describes, and it doubles as the enforcement document future sessions read.

## Open questions

- What is the brand accent hue, and what register is the site aiming for — luxury-editorial (deep grounds, restrained accent, large type) or youthful-social (high chroma, dense imagery, motion)? Nearly every token decision above forks on this, and it is a decision only the operator can make.
- Which Arabic typefaces are actually available as variable fonts with the needed weight range and licensing for commercial web use, and does the Arabic UI ship at launch or in a later phase? I found no verified list of variable Arabic families; the Google Fonts CSS API returned static weight files for the family I probed, which is inconclusive (the API serves static fallbacks to some user agents) rather than evidence that variable versions do not exist. This needs direct verification against the chosen faces.
- No sourced figure exists for the correct Arabic body line-height multiplier relative to Latin. alreq confirms Arabic ascenders/descenders extend much further but publishes no number, and the W3C i18n text-size article gives only qualitative guidance. This must be settled empirically against the chosen Arabic face, with and without diacritics.
- Which numeral system do prices use, per market? Gulf, Egypt and Maghreb conventions differ, and the choice has bidi consequences (AN vs EN reordering). Needs a product decision per target locale before any price component is built.
- Does the system need a brand tier at all — i.e. is white-labelling for partner agencies ever in scope? If yes, the token architecture needs a fourth tier above primitives and the `@theme` block needs to be importable per brand. If no, that indirection is waste.
- Is a Style Dictionary build pipeline justified for a solo operator with one output target (CSS)? The DTCG format is still an unstable draft. My inclination is: adopt the naming and aliasing discipline, author CSS custom properties directly, and add the pipeline only when a second output (Figma variables, social-template generation) actually appears — but this is a cost/benefit call worth making explicitly.
- Wide-gamut policy: do we ship P3-range OKLCH values with sRGB fallbacks, and does the extra chroma actually land on the target audience's devices? Worth checking against expected device mix before designing a palette that depends on P3 vividness.
- Which contrast model governs acceptance — WCAG 2.2 ratios (4.5:1 / 3:1, a stable published standard) or APCA Lc values (used by Radix, but part of WCAG 3, which is not a standard)? Mixing the two produces arguments in review. Pick one as normative and note the other as advisory.
- Does an existing Sara AI Studio brand palette (the purple/turquoise premium-AI aesthetic in the workspace preferences) apply here, or should the travel brand be deliberately separated from the creator brand? These are different audiences and the answer changes the accent hue entirely.

## Verification pass

Statuses: CONFIRMED, PARTIALLY_TRUE, UNSUPPORTED, FALSE, STALE. Anything not
CONFIRMED was corrected or removed in the master document.

### CONFIRMED — Tailwind v4 `@theme` accepts `--*: initial` to disable all default theme variables and `--color-*: initial` to wipe one namespace; after that `bg-blue-500` ceases to exist.

tailwindcss.com/docs/theme shows both verbatim: `@theme { --*: initial; --spacing: 4px; --font-body: Inter, sans-serif; --color-lagoon: oklch(...) }` and `@theme { --color-*: initial; --color-white: #fff; --color-midnight: #121063; ... }`. Note the docs' own `--*: initial` example immediately re-declares `--spacing` and `--font-body` — wiping everything also kills the spacing scale, breakpoints and font stacks, so `--*: initial` is not a drop-in. https://tailwindcss.com/docs/theme

### CONFIRMED — Tailwind v4.0 shipped 2025-01-22 with OKLCH/P3 palette, CSS-first @theme, built-in container queries, and `.mt-8` compiling to `calc(var(--spacing) * 8)`.

Announcement post dated January 22, 2025. Verbatim: 'We've upgraded the entire default color palette from rgb to oklch'; 'the shift from configuring your project in JavaScript to configuring it in CSS'; 'We've brought container query support into core for v4.0'; and the literal generated rule `.mt-8 { margin-top: calc(var(--spacing) * 8); }`. https://tailwindcss.com/blog/tailwindcss-v4

### CONFIRMED — oklch() is Baseline widely available since May 2023; L 0–1, C 0–~0.4 (100% = 0.4), H 0–360, red ≈ 41deg not 0deg.

MDN verbatim: 'available across browsers since May 2023'; 'In this case, 0% is 0 and 100% is the number 0.4'; 'in the CIELab color space, 0deg corresponds to magenta, while red is approximately 41deg'. https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch

### CONFIRMED — color-mix() Baseline May 2023 with `in oklab`; relative-colour channel values resolve to unitless numbers so percentages cannot be used inside calc() on them.

MDN color-mix: 'available across browsers since May 2023', oklab listed, hue keywords shorter|longer|increasing|decreasing confirmed. MDN Relative colors (last modified Dec 16, 2025) verbatim: 'If we tried to do calc(l + 20%), that would result in an invalid color — l is a <number> and cannot have a <percentage> added to it.' One citation slip: MDN's `calc(l + 20)` example is on `lch()`, not `oklch()`. In oklch, L resolves 0–1, so the increment must be ~0.1 — the claim body has this right, the evidence line mislabels the function. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors

### PARTIALLY_TRUE — Radix Colors: 6/7/8 are borders (non-interactive / interactive / focus ring); steps 11 and 12 guaranteed to APCA Lc 60 / Lc 90 against step 2.

The APCA sentence is verbatim correct. The border roles are not: Radix puts focus rings on step 7 ('UI element border and focus rings'), and step 8 is 'Hovered UI element border', not the focus ring. Building focus-ring tokens off step 8 would ship a ring one step too dark and leave hover borders undefined. https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

Corrected: Radix Colors assigns: 1 app background, 2 subtle background, 3 UI element background, 4 hovered UI element background, 5 active/selected UI element background, 6 subtle borders and separators, 7 UI element border AND focus rings, 8 hovered UI element border, 9 solid backgrounds, 10 hovered solid backgrounds, 11 low-contrast text, 12 high-contrast text. Steps 11 and 12 are guaranteed to Lc 60 and Lc 90 APCA contrast on top of a step 2 background from the same scale.

### CONFIRMED — USWDS colour tokens are family-grade-variant; magic numbers 40 = AA Large, 50 = AA / AAA Large, 70 = AAA; grade 50 passes AA against both white (0) and black (100).

USWDS verbatim: grade difference 40 'results in WCAG 2.0 AA Large Text contrast'; 50 'results in WCAG 2.0 AA contrast or AAA Large Text contrast'; 70 'results in WCAG 2.0 AAA contrast'; 'Colors of grade 50 result in Section 508 AA contrast against both pure white (grade 0) and pure black (grade 100).' Minor: USWDS states these against WCAG 2.0 / Section 508, not WCAG 2.2 (the ratios are unchanged between versions, so it does not alter the decision). https://designsystem.digital.gov/design-tokens/color/overview/

### CONFIRMED — WCAG 2.2 SC 1.4.3: 4.5:1 normal, 3:1 large (≥18pt ≈24px, ≥14pt bold ≈18.5px, 1pt=1.333px); logotype and incidental exempt; 1.4.11 covers non-text.

W3C verbatim: 'The ratio between sizes in points and CSS pixels is 1pt = 1.333px, therefore 14pt and 18pt are equivalent to approximately 18.5px and 24px.' Logotypes and Incidental exceptions quoted verbatim in the SC text. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

### CONFIRMED — WCAG 2.2 SC 1.4.12 requires survival of line-height 1.5×, paragraph spacing 2×, letter-spacing 0.12×, word-spacing 0.16×, with a language/script exception.

All four multipliers verbatim, plus the exception verbatim: 'Human languages and scripts that do not make use of one or more of these text style properties in written text can conform using only the properties that exist for that combination of language and script.' This exception is what makes the Arabic letter-spacing prohibition compatible with 1.4.12. https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html

### CONFIRMED — W3C alreq (Group Draft Note, 2025-10-02): Arabic ascenders/descenders extend further than Latin; intra-word spacing only adjustable next to non-dual-joining letters; justification uses kashida/tatweel (U+0640).

Status line reads 'Group Draft Note, 02 October 2025'. Verbatim: 'Arabic ascenders and descenders extend much further than those of the Latin script, and care must be taken to correctly align text in the different scripts when they appear together'; 'The principal consideration is that gaps between characters only exist for those letters that join only to the right, such as dal and reh. Adjustment of intra-word space is not relevant where one letter is joined to its neighbors.' Kashida and tatweel justification confirmed. The specific string the researcher quoted ('moving two joined characters closer to or further from each other creates undesirable results') did not surface in my retrieval — the substance holds, the quotation should not be presented as verbatim. https://www.w3.org/TR/alreq/

### PARTIALLY_TRUE — `size-adjust` (Baseline Sept 2023) rescales one face's metrics; `font-size-adjust` two-value form Baseline July 2024; `size-adjust` on the face overrides the metric used by `font-size-adjust`.

Both Baseline dates confirmed. But MDN font-size-adjust states verbatim: 'If the specified <font-metric> has been overridden in @font-face, e.g., by using the size-adjust descriptor, then the overridden metric will be used in the font-size-adjust calculation. This means that when font-size-adjust and size-adjust are applied together, size-adjust does not have any effect.' The researcher's phrasing inverts the practical outcome — a reader would set both and expect size-adjust to win. It does not. This is the single most decision-changing error in the set for the Arabic/Latin pairing work. https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust

Corrected: `@font-face size-adjust: N%` is Baseline widely available since September 2023 and rescales all metrics of one face; `font-size-adjust` with the two-value form (`cap-height 0.73`, `ex-height 0.5`, `ch-width`, `ic-width`, `ic-height`) is Baseline newly available since July 2024, formula u = (m / m′) × s. The two do NOT stack: MDN states that when both are applied together, `size-adjust` has no effect, because font-size-adjust recomputes from the already-overridden metric. Pick one — `size-adjust` for a face you control and want permanently rescaled, `font-size-adjust` for normalising an arbitrary fallback.

### CONFIRMED — Arabic-Indic ٠–٩ (U+0660–0669) carry bidi class AN; Eastern Arabic-Indic ۰–۹ (U+06F0–06F9) carry bidi class EN; they reorder differently.

alreq lists exactly three families with these bidi categories — European U+0030–0039 EN, Arabic-Indic U+0660–0669 AN, Eastern Arabic-Indic U+06F0–06F9 EN — and explains: 'The difference in bidirectional category between Arabic-Indic digits and Eastern Arabic-Indic digits is due to the difference in the behavior desired in Arabic vs. Persian.' This is counter-intuitive and correctly stated. https://www.w3.org/TR/alreq/

### PARTIALLY_TRUE — CSS logical properties are Baseline-stable, auto-flip under direction: rtl, and eliminate the need for a separate RTL stylesheet; MDN gives an explicit RTL rationale and ~2023 baseline.

MDN's CSS logical properties landing page lists every property the claim names, but gives NO group Baseline status or date, and makes no claim about eliminating RTL stylesheets — it says only that logical properties let 'content translated into languages with different writing modes ... be rendered as intended.' The '~2023 baseline' and 'explicit RTL rationale' in the evidence line are the researcher's own additions attributed to MDN. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values

Corrected: CSS logical properties (`margin-inline-start`, `padding-block`, `inset-inline-end`, `border-start-start-radius`, `text-align: start/end`, `inline-size`/`block-size`) are all documented on MDN and resolve against writing direction, so authoring in them removes most of an RTL override sheet. They do not remove all of it: there are no logical equivalents for `background-position`, `transform` translations, `box-shadow` offsets, gradient angles, or directional iconography, and they do nothing for bidi text isolation (`dir="auto"`, `<bdi>`, U+2068/2069) or for digit-shape selection. Tailwind v4 exposes them as `ps-*`/`pe-*`, `ms-*`/`me-*`, `text-start`/`text-end`, `rounded-s-*`/`rounded-e-*`, plus `rtl:`/`ltr:` variants for the residue.

### CONFIRMED — `@property` is Baseline newly available since July 2024; requires syntax and inherits; invalid values fall back to initial-value; registered properties are animatable.

MDN verbatim: 'Since July 2024, this feature works across the latest devices and browser versions'; 'The @property rule must include both the syntax and inherits descriptors. If either is missing, the entire @property rule is invalid and ignored.' Registered properties are validated at computed-value time and reset to the registered initial value on invalid input; MDN's own 'Animating a custom property value' example demonstrates animatability. One omitted nuance: `initial-value` is itself required unless `syntax: "*"`, and if required-but-omitted the whole rule is dropped — so a typo'd @property block silently disables the very type-checking it was added for. https://developer.mozilla.org/en-US/docs/Web/CSS/@property

### CONFIRMED — Cascade layers are Baseline widely available since March 2022; unlayered styles override every layer; Tailwind v4 ships `@layer theme, base, components, utilities`.

MDN verbatim: 'available across browsers since March 2022' and 'Styles that are not defined in a layer always override styles declared in named and anonymous layers.' !important inverts the order. Tailwind's theme docs show `@layer theme, base, components, utilities;` verbatim. https://developer.mozilla.org/en-US/docs/Web/CSS/@layer

### PARTIALLY_TRUE — Container queries reached Baseline in 2023 (Chrome/Edge 105, Firefox 110, Safari 16); container STYLE queries work today only for custom properties, with regular declarations unimplemented everywhere.

MDN's 'only custom properties' caveat is itself timestamped 'At the time of this writing (February 2024)' — a two-and-a-half-year-old note the researcher passed through without re-verification. It happens to still hold for regular declarations, but the researcher's framing ('work today') obscures that Firefox had zero support until May 2026. A token system that routes variants through `@container style(--variant: compact)` would have been broken in Firefox for the whole of 2025. https://web-platform-dx.github.io/web-features-explorer/features/container-style-queries/

Corrected: Container size queries reached Baseline in 2023 (Chrome/Edge 105 Aug 2022, Safari 16 Sep 2022, Firefox 110 Feb 2023) with `container-type: inline-size|size`, named containers and cqi/cqb/cqmin/cqmax units, and went Baseline widely available in August 2025. Container STYLE queries are a much younger feature: Chrome/Edge 111 (Mar 2023), Safari 18 (Sep 2024), Firefox 151 (19 May 2026) — they only became Baseline newly available on 2026-05-19, three months ago, and are not projected widely available until ~Nov 2028. They still work only for custom properties; `@container style(color: green)` and other regular declarations are unimplemented in every browser.

### CONFIRMED — Subgrid Baseline since September 2023; inherits parent tracks, gap (overridable) and named lines; prevents implicit track creation.

MDN verbatim: 'available across browsers since September 2023'; 'Any gap, column-gap, or row-gap values specified on the parent are passed into the subgrid... This default behavior can be overridden'; 'The line names on the parent grid are passed into the subgrid'; and a dedicated heading 'No implicit grid in a subgridded dimension'. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid

### CONFIRMED — Utopia's clamp formula (slope, y-intercept) and its citation of Adrian Roselli warning that clamp interferes with browser text-zoom.

utopia.fyi verbatim: 'Slope = (MaxSize - MinSize) / (MaxWidth - MinWidth)' and 'yIntersection = (-1 * MinWidth) * Slope + MinSize'; the worked example `clamp(1rem, 0.7143rem + 1.4286vw, 2rem)` for 320→1440px. The attribution is real and verbatim: 'Adrian Roselli quite rightly warns that clamp can have a knock-on effect to the maximum font-size when the user explicitly sets a browser text zoom preference.' https://utopia.fyi/blog/clamp/

### CONFIRMED — Variable font registered axes wght (1–1000), wdth (%), ital (0–1), slnt (−90 to 90deg), opsz; registered tags lowercase, custom uppercase; font-variation-settings requires redeclaring all axes.

MDN verbatim: wght 'any number from 1 to 1000 is now valid'; ital 'can be set in the range [0-1]'; slnt 'The allowed range is from -90 to 90 degrees'; 'The registered axis names must be in lower case, and custom axes must be in upper case'; 'if you have set values using font-variation-settings and want to change one of those values, you must redeclare all of them'; and the W3C intent that the appropriate property be preferred. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide

### CONFIRMED — next/font self-hosts Google fonts at build time with no browser request to Google; `variable` emits a CSS custom property; `adjustFontFallback` defaults true; Tailwind v4 wiring is `@theme inline { --font-sans: var(--font-inter); }`.

Next.js docs (v16.3.2, lastUpdated 2025-08-06) verbatim: 'CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. No requests are sent to Google by the browser.' `variable` and `adjustFontFallback` both still in the API table — not deprecated. Default is `true` for next/font/google but `'Arial'` (a string) for next/font/local, which the claim flattens. The Tailwind v4 example is verbatim `@theme inline { --font-sans: var(--font-inter); --font-mono: var(--font-roboto-mono); }`. https://nextjs.org/docs/app/api-reference/components/font

### CONFIRMED — `text-wrap: balance` Baseline March 2024, capped at 6 lines (Chromium) / 10 (Firefox) so performance cost is negligible; `pretty` uses a slower algorithm, limit to body copy.

MDN verbatim: 'this value is only supported for blocks of text spanning a limited number of lines (six or less for Chromium and ten or less for Firefox)' and for pretty, 'the user agent will use a slower algorithm that favors better layout over speed... intended for body copy'. Baseline newly available March 2024 confirmed. Caveat: 'so its performance cost is negligible' is the researcher's inference, not MDN's — MDN's framing is that balancing IS 'computationally expensive', which is precisely why the cap exists. https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap

### CONFIRMED — `light-dark()` Baseline May 2024, only functions when `color-scheme: light dark` is set; per-subtree color-scheme forces a branch.

MDN verbatim: 'Since May 2024, this feature works across the latest devices and browser versions' and 'To enable support for the light-dark() color function, the color-scheme must have a value of light dark, usually set on the :root pseudo-class.' Per-element override confirmed. https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark

### CONFIRMED — NN/g (Budiu, 2020-02-02): light mode outperformed dark on visual acuity and proofreading for normal vision; cloudy ocular media read faster in dark; do not default to dark, always offer the switch and honour system preference.

Author and date confirmed as Raluca Budiu, February 2, 2020. Verbatim: 'at this point we don't recommend switching to dark mode by default if your target audience includes the general population' and 'if an operating system provides a dark-mode API (like iOS does), make sure you take advantage of it'. The cloudy-ocular-media finding is reported verbatim. The 'PRE-2023, POSSIBLY STALE' tag the researcher applied is appropriate and honestly flagged — NN/g has not superseded this article. https://www.nngroup.com/articles/dark-mode/

### STALE — shadcn/ui: 'This is not a component library. It is how you build your component library.' Distribution is copy-paste source you own, built on Radix primitives, identity in an OKLCH semantic variable file plus --radius, exposed via @theme inline.

The quote, the token list, OKLCH values (e.g. `--primary: oklch(0.205 0 0)`), `--radius: 0.625rem` and `@theme inline` all verified on ui.shadcn.com/docs/theming. But the Radix attribution is out of date by seven weeks at time of writing. shadcn's own changelog, July 2026: 'Starting today, Base UI is the default component library in shadcn/ui' and 'Radix is not being deprecated. We still support it, and every update and new component will ship for both libraries.' A February 2026 changelog had already consolidated the individual @radix-ui/react-* packages into a single `radix-ui` package. https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default

Corrected: shadcn/ui states 'This is not a component library. It is how you build your component library.' Its distribution is source you own, and its visual identity lives in a CSS variable file of background/foreground semantic pairs (card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1..5, sidebar) in OKLCH, exposed to Tailwind via `@theme inline`, plus `--radius: 0.625rem` with derived radius-sm..4xl. It is NO LONGER built on Radix by default: since 3 July 2026, Base UI is the default primitive for new shadcn/ui installs; Radix remains supported and is opt-in via `shadcn init -b radix`, and every component ships for both.

### CONFIRMED — Base UI is at v1.7.0, unstyled, ships no CSS, WAI-ARIA, built by the people behind Radix/Material UI/Floating UI. Ark UI is headless, Zag.js state machines, 45+ components across React/Vue/Solid/Svelte, MIT.

Base UI About page confirms v1.7.0, 'Base UI components are unstyled, don't bundle CSS, and don't prescribe a styling solution', 'adhere to WAI-ARIA design patterns', and the creators-of-Radix/MUI/Floating-UI framing (maintainers Colm Tuite, Marija Najdova, Flavien Delangle, James Nelson, Jenna Smith, Michał Dudak, Aarón García). Ark UI confirmed headless, Zag.js finite state machines, 45+ components, React/Solid/Vue/Svelte, MIT. The FACTS hold — but the ARGUMENT they support does not: Base UI is now shadcn's default primitive, so 'switch to Base UI to escape shadcn lineage' escapes nothing at the primitive layer. https://base-ui.com/react/overview/about

### PARTIALLY_TRUE — DTCG Format is a Draft Community Group Report dated 2026-07-30 saying 'Do not attempt to implement this version'; defines $value/$type/$description/$extensions/$deprecated, group $type inheritance and $extends, {group.token} and JSON Pointer $ref; forbids $, {, } and . in names. Style Dictionary v5 uses a nine-step pipeline.

Everything checks out except the name-character rule, which the claim flattens. DTCG verbatim: names 'MUST NOT' begin with `$`, and separately 'the following characters MUST NOT be used anywhere in a token or group name: { (left curly bracket), } (right curly bracket), . (period)'. A `$` mid-name is legal. Style Dictionary nine steps confirmed in order. https://www.designtokens.org/TR/drafts/format/ and https://styledictionary.com/info/architecture/

Corrected: The DTCG Design Tokens Format is a Draft Community Group Report dated 30 July 2026 (published as 'Design Tokens Format Module 2025.10', flagged '⚠️ This is a preview draft'). It states verbatim 'Do not attempt to implement this version of the specification. Do not reference this version as authoritative in any way' and 'is not a W3C Standard nor is it on the W3C Standards Track'. It defines $value/$type/$description/$extensions/$deprecated, group $type inheritance and $extends deep-merge, {group.token} aliases and JSON Pointer $ref. Name restrictions are asymmetric: a name must not BEGIN with `$`, while `{`, `}` and `.` must not appear ANYWHERE in a token or group name. Style Dictionary's build pipeline is nine steps: parse config → find token files → parse token files → deep merge → run preprocessors → transform → resolve aliases → format into files → run actions.

### PARTIALLY_TRUE — USWDS spacing scale: 0.5(4) 1(8) 1.5(12) 2(16) 2.5(20) 3(24) 4(32) 5(40) 6(48) 7(56) 8(64) 9(72) 10(80) 15(120), plus 1px/2px hairlines and named tokens card 160, card-lg 240, mobile 320, tablet 640, desktop 1024, widescreen 1400; gap between 80 and 120; 'musical notes' framing.

Numeric scale and hairlines verified exactly. The 'musical notes' framing is verbatim from the USWDS design tokens landing page: 'Our System design tokens are a limited set of discrete options, just like a scale of musical notes is drawn from the spectrum of all possible frequencies.' The three omitted named tokens matter if you are mapping USWDS breakpoint tokens onto Tailwind's --breakpoint-* namespace. https://designsystem.digital.gov/design-tokens/spacing-units/

Corrected: Same as stated, but the named-token list is incomplete: USWDS also ships mobile-lg 480px, tablet-lg 880px and desktop-lg 1200px alongside card 160, card-lg 240, mobile 320, tablet 640, desktop 1024 and widescreen 1400. The 80px→120px gap is real.

### CONFIRMED — Jakob's Law as quoted, attributed to Jakob Nielsen via Laws of UX; deviation survivable with gradual transition and control per the YouTube example.

lawsofux.com/jakobs-law carries the quote verbatim, attributes it to Jakob Nielsen (NN/g co-founder with Don Norman), and its third takeaway reads 'When making changes, minimize discord by empowering users to continue using a familiar version for a limited time', illustrated with YouTube's 2017 Material Design preview-and-revert rollout. The researcher's own note that the page is undated and should be treated as a timeless principle rather than current research is correct and honest. https://lawsofux.com/jakobs-law/

### CONFIRMED — Pan-Arab colours black/white/green/red from al-Hilli's 14th-century verse, first combined in the 1916 Arab Revolt flag; Saudi flag green with shahada in Thuluth, never at half-mast, 'not normally used on T-shirts or other items', FIFA football protest.

Wikipedia verbatim on all points: al-Hilli's 'White are our acts, black our battles, green our fields, and red our swords'; 'first combined in 1916 in the flag of the Arab Revolt or Flag of Hejaz'; 'written in the calligraphic Thuluth Script'; 'The flag is never lowered to half-mast as a sign of mourning because lowering it would be considered blasphemous'; 'Because the shahada is considered holy, the flag is not normally used on T-shirts or other items'; the 2002 World Cup FIFA football protest; 'The flag's green represents Islam'. Two small omissions: the country list also includes Somaliland, and the Saudi flag bears a sword beneath the shahada, not the shahada alone. Sourcing is Wikipedia, not a primary vexillological or religious authority — adequate for a design constraint, not for a client-facing cultural claim. https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia

### Corrections applied

- Radix Colors step roles: 1 app background, 2 subtle background, 3 UI element background, 4 hovered, 5 active/selected, 6 subtle borders and separators, 7 UI element border AND focus rings, 8 hovered UI element border, 9 solid backgrounds, 10 hovered solid, 11 low-contrast text, 12 high-contrast text. Focus rings are step 7, not step 8. The APCA guarantee (Lc 60 / Lc 90 for steps 11 and 12 against step 2 of the same scale) is verbatim correct.
- `size-adjust` and `font-size-adjust` do not stack — they cancel. MDN: 'when font-size-adjust and size-adjust are applied together, size-adjust does not have any effect.' For the Arabic/Latin pairing, choose one mechanism: `@font-face { size-adjust: N% }` to permanently rescale an Arabic face you control against the Latin face, OR `font-size-adjust: cap-height 0.73` to normalise an arbitrary fallback at use-site. Setting both silently discards the size-adjust.
- shadcn/ui has not been 'built on Radix primitives' since 3 July 2026. Base UI is now the default primitive for new installs ('Starting today, Base UI is the default component library in shadcn/ui'); Radix is still supported and opt-in via `shadcn init -b radix`, and components ship for both. Consequence for the thesis: naming Base UI as the 'zero-lineage alternative' to shadcn is now self-defeating — it is shadcn's own default. The genuine differentiator remains the token file and the base variants, which is the researcher's own point, only more strongly.
- Container style queries are not a settled 2023-era capability. They became Baseline newly available only on 2026-05-19, when Firefox 151 shipped (Chrome/Edge 111 Mar 2023, Safari 18 Sep 2024), and are not projected widely available until roughly November 2028. Only custom properties are queryable; `@container style(color: green)` and other regular declarations remain unimplemented in every browser. Treat `@container style(--variant: compact)` as a progressive enhancement with a declared fallback, not as a load-bearing variant mechanism.
- CSS logical properties reduce but do not eliminate an RTL override layer. MDN gives no group Baseline date and makes no such claim. There are no logical equivalents for `background-position`, `transform` translations, `box-shadow` offsets or gradient angles, and logical properties do nothing for bidi isolation (`dir="auto"`, `<bdi>`, U+2068/2069) or digit-shape selection. Budget for a small `rtl:` residue — Tailwind v4 exposes `ps-*`/`pe-*`, `ms-*`/`me-*`, `text-start`/`text-end`, `rounded-s-*`/`rounded-e-*` plus `rtl:`/`ltr:` variants.
- DTCG name restrictions are asymmetric, not uniform: a name must not BEGIN with `$`; `{`, `}` and `.` must not appear ANYWHERE. A `$` mid-name is legal.
- Tailwind's `--*: initial` wipes `--spacing`, breakpoints and font stacks along with colours. Tailwind's own documentation example re-declares `--spacing: 4px` and `--font-body` immediately after. Budget for re-declaring the structural namespaces, not just colour.
- MDN's `calc(l + 20)` relative-colour example is on `lch()`, where L runs 0–100. In `oklch()` L resolves 0–1, so the equivalent step is `calc(l + 0.1)`. Using `+ 20` in an oklch relative colour clamps to white.
- USWDS named spacing tokens also include mobile-lg 480px, tablet-lg 880px and desktop-lg 1200px.
- `text-wrap: balance` line caps exist because balancing is expensive, not to prove it is cheap. MDN calls counting and balancing 'computationally expensive'; the 6/10-line cap is the mitigation. Apply it to headings and pull quotes deliberately, not blanket-wide.

### Flagged as not covered

- No motion tokens at all. Duration, easing and delay scales are a first-class token namespace (Tailwind v4 exposes `--ease-*`), and `prefers-reduced-motion` is the enforcement mechanism. For a travel booking app with carousels, map transitions and skeleton loaders, this is a real omission — and a WCAG 2.3.3 / 2.2.2 exposure.
- No three-tier token architecture. The dimension never distinguishes primitive tokens (`--blue-500`) from semantic tokens (`--color-surface-raised`) from component tokens (`--button-primary-bg`). This is the single most consequential structural decision in a token system — it is what makes a dark-mode swap or a rebrand a one-file change — and it is what shadcn's background/foreground pairing actually is an instance of. Discussed only implicitly.
- WCAG 2.2 SC 2.5.8 Target Size (Minimum), Level AA: 24x24 CSS pixels, or 24px-diameter non-intersecting spacing. This is a direct sizing/spacing token constraint (it sets your minimum touch-target and icon-button tokens) and it is new in 2.2. Verified at w3.org/WAI/WCAG22/Understanding/target-size-minimum.html and entirely absent.
- WCAG 2.2 focus criteria. SC 2.4.11 Focus Not Obscured (Minimum) is Level AA and new in 2.2; SC 2.4.13 Focus Appearance is Level AAA and requires an indicator at least as large as a 2px perimeter of the component with 3:1 contrast between focused and unfocused states. These directly specify the focus-ring token (width, offset, colour) that Radix step 7 provides. Not mentioned.
- `unicode-range` on `@font-face` — the canonical native technique for Arabic/Latin pairing. It lets you bind an Arabic face to U+0600–06FF and a Latin face to U+0000–00FF within one family name, so mixed strings resolve per-character with no wrapper markup. Combined with `size-adjust` on the Arabic face this is the whole solution, and the dimension reaches for `font-size-adjust` instead — which, as verified, cancels `size-adjust`.
- `text-box-trim` / `text-box-edge` (the `text-box` shorthand) became Baseline newly available in August 2026 when Firefox 154 shipped (Chrome/Edge 133, Safari 18.2). It removes the half-leading above and below text, which is the single biggest source of spacing-token drift between design tool and browser. Degrades silently, so it is safe to adopt today. A month-old capability directly on-topic and unmentioned.
- Digit rendering and locale formatting. `font-variant-numeric: tabular-nums` for prices and times, `list-style-type: arabic-indic`, and `Intl.NumberFormat`/`Intl.DateTimeFormat` with `numberingSystem: 'arab'` vs `'latn'`. For a travel agency app the choice of which digits to show an Arabic-reading user is a product decision, not a font decision, and the AN/EN bidi split the researcher correctly identified is exactly why it cannot be left to the font.
- Hijri calendar and date-format expectations for an Arabic travel audience. `Intl.DateTimeFormat` supports `islamic-umalqura`. Not a token, but it is the kind of thing that has to be designed for from token zero in the same way the typography is.
- Token pipeline governance beyond the file format. The dimension verifies DTCG and Style Dictionary but not how tokens get from a design tool into the repo, whether a CI check fails a build on a raw hex value, or how a Figma variables export maps to `@theme`. Enforcement is the stated thesis, and the CI half of enforcement is missing.
- `@scope` and anchor positioning — both now shipping and both relevant to component-level token isolation and to popover/tooltip positioning in a booking flow. Not mentioned.
- APCA's actual standing. Radix guarantees APCA Lc values; WCAG 2.2 requires the 2.x contrast ratio. APCA is associated with the in-progress WCAG 3 work and is not a conformance standard today. The dimension cites both authorities without flagging that satisfying Radix's APCA guarantee does not by itself demonstrate 1.4.3 conformance for a legal or procurement audit.
- Forced-colors / Windows High Contrast Mode. A token system built entirely on custom properties breaks differently under `forced-colors: active`; `forced-color-adjust` and system colour keywords are the escape hatch. Relevant to any accessibility-claiming design system.

## Sources

- [Theme variables — Tailwind CSS docs](https://tailwindcss.com/docs/theme) · Tailwind Labs  
  @theme directive, namespaces, `--color-*: initial` and `--*: initial` to delete defaults, `@theme inline`, sharing a theme file across projects.
- [Tailwind CSS v4.0 (announcement)](https://tailwindcss.com/blog/tailwindcss-v4) · Tailwind Labs · 2025-01-22  
  Release date, OKLCH/P3 default palette, CSS-first config, dynamic spacing from `--spacing`, built-in container queries.
- [oklch() — CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) · MDN  
  L/C/H ranges, perceptual uniformity, hue-angle offset vs HSL (red ≈ 41deg), Baseline widely available since May 2023.
- [Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) · MDN · 2025-12-16  
  `from` keyword, channel keywords, calc() on channels, deriving tints/shades/complements in oklch, unitless channel caveat.
- [color-mix() — CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) · MDN  
  Interpolation colour spaces, hue interpolation methods, percentage normalisation, Baseline since May 2023, brand ramp example in oklab.
- [Understanding the scale — Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) · WorkOS / Radix  
  The 12-step role map (backgrounds, component backgrounds, borders, solids, text) and the APCA Lc 60 / Lc 90 guarantee for steps 11 and 12.
- [Design tokens: Color — overview](https://designsystem.digital.gov/design-tokens/color/overview/) · U.S. Web Design System (GSA)  
  family-grade-variant naming, grade as standardised luminance, the 40/50/70 'magic number' grade differences for AA Large / AA / AAA.
- [Design tokens: Spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/) · U.S. Web Design System (GSA)  
  The exact 8px-based spacing token table and the constrained-palette philosophy (deliberate gaps in the scale).
- [Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · W3C WAI (WCAG 2.2)  
  4.5:1 / 3:1 ratios, large-text definition at 18pt (≈24px) and 14pt bold (≈18.5px), logotype and incidental exceptions.
- [Understanding SC 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) · W3C WAI (WCAG 2.2)  
  Line height 1.5×, paragraph spacing 2×, letter spacing 0.12×, word spacing 0.16×, plus the language/script exception that covers Arabic tracking.
- [Arabic & Persian Layout Requirements (alreq)](https://www.w3.org/TR/alreq/) · W3C Group Draft Note · 2025-10-02  
  Arabic ascender/descender depth vs Latin, prohibition on separating joined letters, kashida/tatweel justification, the three numeral systems and their bidi classes.
- [size-adjust — @font-face descriptor](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust) · MDN  
  Per-face metric scaling for harmonising a second-script or fallback font; Baseline widely available since September 2023.
- [font-size-adjust — CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust) · MDN  
  Two-value metric syntax (ex-height, cap-height, ch-width, ic-width/height), the u = (m/m′)×s formula, Baseline newly available July 2024.
- [Variable fonts guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) · MDN  
  Registered axes wght 1–1000, wdth, ital 0–1, slnt −90..90, opsz; lowercase vs uppercase axis tags; font-optical-sizing; @font-face weight ranges.
- [Fluid Responsive Design — CSS clamp()](https://utopia.fyi/blog/clamp/) · Utopia (James Gilyead & Trys Mudford)  
  The exact slope/intercept derivation for fluid clamp() type, a worked 320→1440px example, and the Adrian Roselli browser-zoom caveat.
- [Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/) · Utopia  
  Using a conservative ratio at the small viewport and a more dramatic one at the large viewport, with step-number slots rather than fixed sizes.
- [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) · MDN · 2026-07-08  
  container-type inline-size vs size, container-name, @container syntax, cqw/cqi/cqb/cqmin/cqmax units and their viewport-unit fallback.
- [Container size and style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries) · MDN  
  Style query syntax `@container style(--var: value)`, custom-properties-only support today, @property registration affecting value matching, theming/variant use cases.
- [Subgrid — CSS grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid) · MDN  
  Baseline since September 2023, gap and named-line inheritance, card-alignment use case, the implicit-track limitation.
- [CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) · MDN · 2025-11  
  Full logical-property list including border-start-start-radius and text-align: start/end; baseline stability; the RTL rationale for Arabic.
- [@property — CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) · MDN  
  syntax/inherits/initial-value, invalid values falling back to initial-value, animatability of registered custom properties, Baseline July 2024.
- [@layer — CSS cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) · MDN  
  Layer ordering beating specificity, unlayered styles overriding all layers, !important reversal, widely available since March 2022.
- [light-dark() — CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) · MDN  
  Syntax, the mandatory `color-scheme: light dark`, per-section scheme pinning, Baseline newly available May 2024.
- [text-wrap — CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) · MDN  
  balance vs pretty vs stable, Chromium 6-line / Firefox 10-line caps on balance, performance guidance, Baseline March 2024.
- [Theming — shadcn/ui](https://ui.shadcn.com/docs/theming) · shadcn  
  The full semantic background/foreground token list in OKLCH, `--radius`, chart and sidebar tokens, and the `@theme inline` bridge to Tailwind v4 — i.e. exactly where shadcn's recognisable face lives.
- [Introduction — shadcn/ui docs](https://ui.shadcn.com/docs) · shadcn  
  'This is not a component library. It is how you build your component library.' — code ownership, registry distribution, Radix primitives, 'carefully chosen default styles'.
- [About Base UI](https://base-ui.com/react/overview/about) · Base UI  
  v1.7.0, unstyled with no bundled CSS, WAI-ARIA adherence, built by the Radix / Material UI / Floating UI maintainers.
- [Ark UI (GitHub README)](https://github.com/chakra-ui/ark) · Chakra Systems  
  Headless, Zag.js finite state machines, React/Solid/Vue/Svelte parity, 45+ components, MIT licence.
- [Design Tokens Format Module (Draft Community Group Report)](https://www.designtokens.org/TR/drafts/format/) · Design Tokens Community Group · 2026-07-30  
  Token structure ($value/$type/$description/$extensions/$deprecated), groups and $extends, alias and $ref syntax, name character restrictions, and its explicit non-standard draft status.
- [Style Dictionary — Architecture](https://styledictionary.com/info/architecture/) · Style Dictionary (Amazon, now community)  
  v5 nine-step build pipeline: parse config, find files, parse, deep merge, preprocess, transform, resolve references, format, actions.
- [Font Optimization / next/font API reference](https://nextjs.org/docs/app/api-reference/components/font) · Vercel (Next.js v16.3.2 docs) · 2025-08-06  
  Build-time self-hosting with no Google request, `variable` emitting a CSS custom property, subsets/axes/display/adjustFontFallback, and the `@theme inline { --font-sans: var(--font-inter); }` Tailwind v4 wiring.
- [Baseline 2023](https://web.dev/blog/baseline2023) · web.dev / Chrome team  
  Container queries reaching interop (Chrome/Edge 105, Firefox 110, Safari 16) and oklch()/oklab()/lch()/lab() plus color-mix() reaching Baseline in 2023.
- [Dark Mode vs. Light Mode: Which Is Better?](https://www.nngroup.com/articles/dark-mode/) · Nielsen Norman Group (Raluca Budiu) · 2020-02-02  
  Light mode advantage for normal vision, dark mode advantage for cloudy ocular media, and the recommendation to always offer a switch. FLAGGED: pre-2023, re-verify before relying on effect sizes.
- [Jakob's Law — Laws of UX](https://lawsofux.com/jakobs-law/) · Jon Yablonski, citing Jakob Nielsen / NN/g  
  The verbatim law and the guidance that novel patterns succeed when users retain control of the transition — the guardrail on where differentiation may be spent.
- [Pan-Arab colors](https://en.wikipedia.org/wiki/Pan-Arab_colors) · Wikipedia  
  Black/white/green/red, the al-Hilli verse, dynastic associations, green's Islamic significance, and the list of national flags using them.
- [Flag of Saudi Arabia](https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia) · Wikipedia  
  Green representing Islam, the shahada in Thuluth, the never-at-half-mast rule, and restrictions on reproducing the flag on merchandise — the cultural cautions for green/gold/iconography.
- [Text size in translation](https://www.w3.org/International/articles/article-text-size/) · W3C Internationalization  
  Arabic listed among scripts needing more vertical height than Latin; guidance to separate presentation so font sizes and line heights can be adapted per translation. No numeric multiplier is given.
