# Travel Agency App - Operating Rules

This file stands on its own. When this folder is opened as the workspace root, in
Cowork or any other desktop sandbox, the workspace-root `CLAUDE.md` sits outside
the sandbox and cannot be read. Everything an agent needs in order to work here
safely is in this file or reachable from this folder.

## Recall before work

1. Read `MEMORY.md` in this folder before answering anything, including a
   one-line question. It is the routing table for this folder and it carries the
   machine-maintained recall block.
2. Before real work on a person or a project, read the matching file in
   `.memory/people/` and `.memory/projects/` inside this folder. Surface whatever
   is dated in there, a decision, a deadline, a status change, a commitment made
   to a client, without waiting to be asked. If no file exists yet for that
   person or project, say so once and carry on.
3. Search the vault before searching the disk by hand. With the whole workspace
   open, run `python3 .memory/.system/bin/mem search "your query"` from the
   workspace root; that CLI works inside Cowork's sandbox as well as in a
   terminal. With only this folder open, the CLI sits outside the sandbox, and
   the `<!-- auto:memory -->` block in `MEMORY.md` is the recall surface instead.
   It is refreshed for you.
4. Never hand-edit anything between the `<!-- auto:memory -->` markers in
   `MEMORY.md`. The worker owns that block and overwrites whatever is put there.
   A correction goes to `.memory/_inbox/pending/` at the workspace root as a
   dated proposal.

## Memory write rules

- **The ephemeral gate.** A real ongoing workstream gets its own file in `.memory/projects/`. A one-off that belongs to an existing project gets appended to that project's work log, and a one-off with no parent gets a dated line there. Never create files like "reply to X" or "notes before Tuesday call".
- **Absolute dates always.** Convert before saving. Never "yesterday" or "next week".

## The brief gate

Before any major request, get these five answers on the table. Fill in what the workspace
already tells you, show her what you filled in, and ask only about what is genuinely missing.
Asking her things her own memory vault already knows is a failure of this rule, not an
application of it.

A request is major when it produces something that leaves the chat (a document, a page, a
deck, a carousel, a script, an email, code that ships), when it touches a client, or when
getting it wrong costs more than a few minutes. A one-line question is not major. Neither is
the next step of a brief she already approved.

1. **Outcome, in business terms.** Not "design a page". "Convince Waseem to pay for a page."
   What has to change for whom once this lands.
2. **What I cannot see.** The client by name (then read their file in `.memory/people/`), the
   constraints, the audience, and above all what already failed. If round one was wrong, say
   what was wrong with it rather than describing the whole thing again.
3. **What good looks like.** Give a reference. Adjectives do not carry taste. Best case is a
   path to something that already exists here, a past carousel or the brand charter, because
   a file she already approved settles an argument that words cannot.
4. **Where it goes.** Which folder, which channel, which language, what shape, what length.
   A 6-slide carousel and a 2-page PDF are not the same brief, and neither is French and English.
5. **Where I stop.** The default is a draft, then her review, per Draft first, then approval.
   Say which slice of the work that draft covers, so she is not handed a finished deck when
   she wanted the outline.

When an output comes back wrong, one of the five was missing. Find out which one before rewriting.

## Scope

Design and build of the travel agency web app: product decisions, code, copy, and
deploys. These rules apply to everything under this folder.

## Domain rules

1. **Decisions land in a project page, not in code comments.** Stack choices,
   data-model calls, and third-party picks (booking API, payments, maps) go to
   `.memory/projects/` with an absolute date, so the reasoning survives the
   session that produced it.
2. **The UI/UX master document governs every interface change.** Read
   `docs/ui-ux/README.md` and the current master document before designing,
   building, or changing any screen, component, or string of UI copy. It carries a
   refusal list; shipping something on it needs a dated note on the project page
   saying why. Arabic is a build-time requirement there, not a later sprint.
3. **Never source visual reference from "best travel website" listicles.** They are
   in practice lists of purchasable templates, and using one regenerates the exact
   sameness the master document exists to prevent. The named anti-references and
   the worthwhile exemplars are both recorded in `docs/ui-ux/research/`.
4. **Copy that ships is outbound text.** Landing copy, UI strings, confirmation
   emails, and error messages run through the `no-ai-voice` skill before they go
   into the app.
5. **Client and traveller data is not test data.** Real names, emails, booking
   references, and payment details never get committed, seeded into fixtures, or
   pasted into memory. Use invented values.
6. **Secrets stay in the environment.** API keys for any booking, payment, or map
   provider live in a gitignored env file, never in this folder's memory or in
   the repo.

## What not to do

- Do not scaffold a framework or add a dependency before the stack is agreed and
  written down in `.memory/projects/`.
- Do not overwrite a shipped design or copy file in place; date the new version
  and keep the old one.
- Do not put audience-facing content deliverables here. Carousels, PDF guides,
  and lead magnets belong in `Content Creation/`.
