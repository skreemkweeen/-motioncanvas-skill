---
name: Feature request
about: Propose a new capability, primitive, provider, or reference doc
title: ""
labels: enhancement
---

## What's the request

Describe the capability, not just the symptom — "add a `Marquee` motion
primitive" rather than "motion library feels incomplete."

## Why

What real use case does this unlock that the current
`snippets/`/`providers/`/`plugins/`/`references/` can't cover today? Check
`references/roadmap.md` first — it may already be listed as planned (in
which case a 👍 or a comment on context is more useful than a duplicate
issue) or explicitly out of scope (in which case say why this case is
different).

## Scope check

This repo's contribution rules (`CONTRIBUTING.md`) are specifically about
**not** overbuilding — please confirm before filing:

- [ ] This doesn't require a fake/stubbed implementation of a live external
      integration (see `CONTRIBUTING.md`'s "No fake integrations" rule).
- [ ] This doesn't require a new runtime dependency, or if it does, the
      dependency and why it's justified is named here.
- [ ] This is additive (a new file/export) rather than a breaking change to
      an existing exported name/type — or, if it must be breaking, that's
      called out explicitly.

## Proposed shape (optional)

If you have a concrete idea of what the API/interface/doc structure should
look like, sketch it here — a type signature, a doc outline, a file list.
Not required; a well-justified problem statement is enough to start a
discussion.
