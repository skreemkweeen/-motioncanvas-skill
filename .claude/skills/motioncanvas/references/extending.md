# Extending this skill

## Adding a new motion primitive

1. Add `snippets/motion/<name>.tsx` (or `.ts` for a hook), following the
   pattern of the existing primitives: pull shared constants from
   `./tokens`, respect reduced motion via `useMotionPreferences`, and open
   with a short comment on what it's for and when _not_ to reach for it.
2. Add it to `snippets/motion/index.ts`'s barrel export.
3. Add a row to the table in `snippets/motion/README.md`.
4. Add a catalog entry in `providers/local-motion-library.ts` so
   `MotionLibraryProvider.search()`/`recommend()` can find it.
5. Run `npm run typecheck && npm run lint` before committing.

## Adding a new provider

See `providers/README.md`'s "Adding a new provider implementation" section
— don't duplicate those steps here. Its short version: pick or add an
interface in `providers/`, implement it only if it can genuinely function
without a live service that isn't actually integrated, and update the
status table in that same README.

## Adding a new reference example

1. Create `examples/<name>/` with the actual component files (composed from
   `snippets/`/`providers/` where relevant) plus a page-level composition.
2. Write a `README.md` following the shape of
   `examples/ai-saas-landing/README.md` — requirements analysis, design
   rationale, layout planning, tokens, motion decisions (including what was
   deliberately left out), an accessibility review, performance notes, and a
   pointer to the final implementation. The narrative is what makes it a
   _reference_ example, not just a demo.
3. Once two or three examples exist, promote them into a real
   `TemplateProvider` implementation — `providers/template-provider.ts`
   currently has none because a provider abstraction over a single entry
   has no real caller yet (see that file's doc comment).
4. Run `npm run typecheck && npm run lint`.

## General rules for any addition

- No fake integrations — if it can't actually work without a live service
  that isn't wired up here, it's an interface, not an implementation.
- No new dependency without a reason stated in the file's own doc comment.
- Every new subsystem gets documentation in the same change that adds it,
  not a follow-up "will document later."
- Keep `SKILL.md` skimmable — long-form reasoning belongs in `references/`,
  not inline in `SKILL.md`.
- Update `references/architecture.md`'s diagrams if the addition changes
  the structure they describe.
