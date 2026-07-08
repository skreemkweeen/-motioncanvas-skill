## What this changes and why

<!-- The "why" matters more than the "what" here — see CONTRIBUTING.md. -->

## Checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run format` passes (or `npm run format:write` was run)
- [ ] If this touches `plugins/` or a provider it wraps: `npm run plugins:smoke`
      passes, and a new/changed plugin is actually exercised by
      `plugins/examples/run-smoke.ts` (not just typechecked)
- [ ] If this touches `commands/registry.ts` or a file it references:
      `npm run validate:registry` passes
- [ ] If this touches `tokens/design-tokens.ts`: `npm run tokens:build` was
      run and the regenerated `snippets/tokens.css`/`design-tokens.ts`/etc.
      are committed alongside it
- [ ] Documented in the same change (a new subsystem/export without docs
      isn't done — see `CONTRIBUTING.md`)
- [ ] No fake integration — anything that can't actually work without a
      live external service is documented as an interface, not shipped as a
      working implementation that returns empty/hardcoded data
- [ ] No breaking change to an existing exported name/type, or the migration
      note is included below if there is one

## Migration notes (if any exported name/type changed or was removed)

<!-- Delete this section if not applicable. -->
