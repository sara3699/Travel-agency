# vendor/

Third-party code, copied in verbatim and never edited here.

- `scrollcraft/` — the scrollcraft scroll runtime (engine JS + token CSS), from
  the `nateherk-design` plugin. Theme it by overriding tokens in
  `app/globals.css`; write bespoke behaviour in the page, driven off `--sc-p`
  and your own `data-sc-*` attributes. Editing the engine to get a
  project-specific behaviour is the thing the skill forbids most explicitly.

This directory sits outside the `{app,components,lib,i18n}` glob that
`scripts/lint-logical-properties.mjs` walks, deliberately: the engine uses
physical properties internally and it is not ours to correct.
