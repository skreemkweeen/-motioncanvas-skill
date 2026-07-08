# Reference workflow: AI SaaS landing page

A single, complete example built through the full `SKILL.md` workflow, for
"Fieldnote" (fictional) — an AI tool that transcribes meetings, drafts the
recap, and syncs action items to a tracker. This is the canonical example
future reference templates should follow the shape of, rather than one of
many shallow app stubs.

## 1. Requirements analysis

- **Audience**: product managers and eng leads evaluating a new tool for
  their team — busy, skeptical of AI hype, converted by clarity and speed
  more than spectacle.
- **Core goal**: get a qualified visitor to start a free trial or watch a
  short demo. Everything on the page should point at one of those two
  actions.
- **Constraints**: Next.js App Router, Tailwind CSS, Framer Motion only (no
  3D/Three.js — nothing in this product benefits from it, and it would cost
  bundle size and dev time for no clarity gain). Must work with JavaScript
  disabled for the core message (progressive enhancement — motion is an
  enhancement, not a requirement to read the page).

## 2. Design rationale

B2B software buyers distrust "AI SaaS" pages that lean on spectacle (giant
3D scenes, particle fields) over substance. The rationale here is
_confident and restrained_: one accent motion moment in the hero (an aurora
background + a sequenced headline reveal), then quieter, purposeful motion
everywhere else (viewport reveals, a hover highlight on feature cards). No
looping/ambient motion outside the hero — a dashboard-adjacent product
shouldn't feel busy.

Explicitly **not used**: `CursorGlow` and `FloatingCard`. Both were
considered for the hero and rejected — a cursor-following glow adds visual
noise without reinforcing the message for a form-heavy, information-dense
audience, and there's no product screenshot in this pass for a floating
card to lift. Choosing not to use a primitive is as much a design decision
as choosing one.

## 3. Layout planning

- Nav: sticky, translucent, backdrop-blurred — stays out of the way while
  scrolling without disappearing entirely. Collapses to a disclosure menu
  below `sm:`, not a second, different navigation pattern.
- Hero: asymmetric — content left-aligned in a constrained `max-w-3xl`
  column rather than centered, which reads as more considered than a dead-
  centered hero and leaves room for a future product screenshot to the
  right without a rebuild.
- Section order: nav → hero → features (the "what") → final CTA. No pricing/
  testimonial section in this pass — those need real content (numbers,
  quotes) this fictional pass doesn't have; adding a placeholder section
  with fake testimonials would be exactly the kind of unusable filler the
  skill should avoid generating.
- Feature grid: 3 columns on `sm:` and up, stacked on mobile — three items
  is the right count for a `StaggerContainer` grid to read as a set rather
  than a list.

## 4. Design tokens

Following `references/design-system.md`:

- Type: `text-4xl`/`sm:text-5xl` for the hero heading (the one 4xl+ moment
  on the page), `text-3xl` section headings, `text-lg` body — no more than
  those three sizes visible in a single viewport.
- Spacing: section vertical padding at `py-24`/`py-32`/`py-40` (all on the
  4px scale), content gutters at `px-6`.
- Color: dark hero (`bg-neutral-950`) for the one high-contrast moment on
  the page, semantic `border`/`card`/`muted-foreground` tokens everywhere
  else so the page inherits the target project's light/dark theme instead
  of hardcoding a second palette.

## 5. Motion decisions

| Where                   | Primitive                                  | Why                                                                                                                                                                                                       |
| ----------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero background         | `AuroraBackground`                         | The one decorative motion moment on the page; pure CSS, cheap, reserved for the hero per `references/motion-principles.md`.                                                                               |
| Hero copy               | `HeroReveal`                               | Eyebrow → heading → subheading → actions in sequence; heading gets the most distinct motion as the most important element.                                                                                |
| Section heading + intro | `Reveal`                                   | Scrolls into view once, quietly — a section heading doesn't need staggering.                                                                                                                              |
| Feature grid            | `StaggerContainer`/`StaggerItem`           | Three cards read as a set; ~80ms stagger between them.                                                                                                                                                    |
| Feature cards           | `SpotlightFollow`                          | A quiet hover affordance that says "this is interactive" without motion on page load.                                                                                                                     |
| Final CTA               | `AnimatedBorder` + `Reveal`                | One more (restrained) moment of visual interest at the page's single most important conversion point, not used anywhere else on the page.                                                                 |
| Mobile nav disclosure   | `m.nav` height/opacity (`AnimatePresence`) | The one bespoke animation in this build (no existing primitive fit a collapsible disclosure) — short (200ms), reduced-motion aware, matches the page's restrained feel rather than introducing a new one. |

## 6. Accessibility review

Against `references/quality-checklist.md`:

- Semantic structure: `<main>` → `<section>` per block, one `<h1>` (hero),
  `<h2>` per section — no skipped heading levels.
- All motion respects `prefers-reduced-motion` via `MotionProvider`'s shared
  flag — verified by reading each primitive's reduced-motion branch, not
  asserted blind (see each component's own file).
- `SpotlightFollow`'s overlay is `aria-hidden` + `pointer-events: none`; the
  card's real content underneath remains keyboard/screen-reader reachable.
- `PremiumButton` (from `snippets/button.example.tsx`) carries its own
  focus-visible ring and disabled/loading states — reused here rather than
  rebuilt.
- `Nav`'s mobile menu toggle has real `aria-expanded`/`aria-controls`, a
  visually-hidden label that changes with state ("Open menu"/"Close menu"),
  closes on `Escape`, and every link/button inside it carries its own
  focus-visible ring — the disclosure pattern is keyboard-operable start to
  finish, not just mouse-clickable.
- The hero's "Watch a 2-minute demo" link and the nav's "Demo" link both
  point at `#demo`, which now resolves to the CTA section's `id="demo"` —
  checked for real, not assumed, since a dangling anchor is an easy thing to
  ship unnoticed.
- Not yet verified: real contrast measurement against final theme tokens,
  since this pass uses `neutral-950`/`white` as placeholders for whatever
  the target project's actual dark-hero tokens are. Flagging this rather
  than asserting an unearned "WCAG AA" pass.

## 7. Performance considerations

- No 3D, no video, no external image — nothing here needs `next/image`,
  dynamic import, or a Suspense boundary yet. If a product screenshot is
  added later, it should load via `next/image` with explicit dimensions
  (avoids layout shift) and, if it's large, a `loading="lazy"` below the
  fold.
- `Hero`/`Features`/`Cta` are plain Server Components — only the motion
  primitives they render (`AuroraBackground`, `HeroReveal`, `Reveal`,
  `StaggerContainer`/`StaggerItem`, `SpotlightFollow`, `AnimatedBorder`,
  `PremiumButton`) carry `"use client"`, keeping the non-interactive markup
  server-rendered. `page.tsx` composes them and stays a Server Component
  itself, passing the client `MotionProvider` its children from the server.
- `Nav` is the one section that's a Client Component at its own root (it
  owns `useState` for the mobile menu) rather than a Server Component with
  client leaves — that's the correct boundary here, not a default; a nav
  with no interactive state would stay server-rendered like the others.
- `AuroraBackground` is pure CSS (no per-frame JS), the cheapest possible
  version of a hero background effect.

## 8. Final implementation

- `nav.tsx`, `hero.tsx`, `features.tsx`, `cta.tsx` — the four sections.
- `feature-card.tsx` — the reusable card component `features.tsx` composes;
  copy this file, not its inline markup, for a similar grid elsewhere.
- `page.tsx` — composes them under one `MotionProvider` and exports page
  metadata.

Typechecked together with the rest of the skill's snippets (React 18 +
Framer Motion 11, strict mode) — see the repo's `package.json`/`tsconfig.json`
for the command.

## 9. Showcase checklist

What makes this the canonical example rather than one more demo — each item
is verifiable in this directory, not just asserted:

- **Design system** — every color/spacing/type value traces to
  `references/design-system.md`'s scales (§4); no hardcoded one-off values.
- **Reusable components** — `feature-card.tsx` is extracted and documented
  as the pattern to copy, not inlined markup (§8).
- **Polished motion** — every animation in §5 traces to a specific reason,
  including the two primitives deliberately left out (§2) and the one
  bespoke disclosure animation, justified because no existing primitive fit.
- **Accessibility** — a full pass in §6, including real keyboard operability
  for the mobile nav disclosure, not just the primitives' built-in defaults.
- **Responsive behavior** — the nav's disclosure pattern, the feature grid's
  breakpoint behavior, and the hero's asymmetric layout are all specified
  per breakpoint in §3, not left to Tailwind's defaults unexamined.
- **Documentation** — this file: requirements through implementation, with
  what was deliberately left out and why, not just what was built.
