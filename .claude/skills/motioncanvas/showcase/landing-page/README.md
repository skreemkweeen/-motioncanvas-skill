# Showcase: landing page

## 1. Prompt

See [`prompt.md`](prompt.md).

## 2. Baseline implementation

[`baseline/App.tsx`](baseline/App.tsx) — a plausible default/unguided
generation for the same prompt: inline styles with no shared scale, no
motion, no responsive handling, browser-default focus rings, a nav with no
mobile treatment at all. Deliberately representative of what skipping this
skill's workflow produces, not a strawman built to look artificially bad —
every choice in it (a single blue accent color, `system-ui`, ad hoc
padding) is a genuinely common default, not an exaggeration.

## 3. MotionCanvas implementation

[`after/App.tsx`](after/App.tsx) — not a rewrite, an import: it composes the
real `MotionProvider`, `Nav`, `Hero`, `Features`, and `Cta` from
`examples/ai-saas-landing/` exactly like that example's own `page.tsx`. If
those components change, this showcase's screenshots reflect that the next
time `npm run capture` runs — there's no separate copy to fall out of sync.

## 4. Screenshots

`screenshots/{baseline,after}-{desktop,tablet,mobile}.png` — six real
Playwright captures (1440px/834px/390px). Regenerate with `npm run capture`
from `showcase/`; see `../README.md` for what that command actually does
and why this pipeline is isolated from the core skill's own tooling.

## 5. Visual diff

See [`VISUAL_DIFF.md`](VISUAL_DIFF.md) — hierarchy, spacing, typography,
motion, accessibility, responsiveness, and performance, plus an honest
account of three real bugs this showcase's construction found and fixed in
the actual `examples/ai-saas-landing/` source (not hypothetical issues —
each one made something invisible or non-functional until fixed).

## 6. Code-level diff and rationale

The two implementations aren't a line-for-line diff of the same file (the
baseline is intentionally a different, simpler shape), so the meaningful
comparison is structural:

|                | Baseline                               | After                                                                                                              |
| -------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Styling        | Inline `style` objects, one-off values | Tailwind utilities against `tokens/design-tokens.ts`'s scale                                                       |
| Components     | One undifferentiated function          | `Nav`/`Hero`/`Features`/`FeatureCard`/`Cta`, composed                                                              |
| Motion         | None                                   | `HeroReveal`/`Reveal`/`StaggerContainer`/`StaggerItem`/`AnimatedBorder`/`AuroraBackground` from `snippets/motion/` |
| Mobile nav     | Links wrap in place, no disclosure     | Real disclosure: `aria-expanded`, `aria-controls`, `Escape` to close                                               |
| Reduced motion | N/A (no motion to guard)               | Respected via `MotionProvider`'s shared flag, per component                                                        |

Rationale for each individual choice lives in `examples/ai-saas-landing/README.md`
(§2 design rationale, §5 motion decisions, §6 accessibility review) rather
than being restated here — this showcase's job is to make that reasoning
visually checkable, not to duplicate it.
