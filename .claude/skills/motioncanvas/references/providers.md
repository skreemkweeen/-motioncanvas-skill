# Drawing on external design ecosystems

This skill has no live network access to any of the sites below — there is no
scraper, no API client, no cached index. "Using" one of these sources means:
draw on general knowledge of the patterns that ecosystem is known for, and
reimplement the *pattern* (a layout idea, an interaction idea, a motion
technique) in this project's own stack, tokens, and components. Never assert
that a specific page or component was fetched, scored, or copied from a named
site — that would be a fabricated claim.

If the user pastes an actual URL, screenshot, or file from one of these tools,
treat that as real input to work from (per the URL/image content actually
given), not as a trigger to pretend broader access exists.

## Component/pattern inspiration

- **Aceternity UI, Magic UI, Origin UI, HeroUI** — known for animated
  marketing-site patterns (spotlight cards, bento grids, animated borders,
  marquees). Reimplement the *technique* with this project's Tailwind tokens
  and whichever motion library it already depends on.
- **Shadcn UI / Radix** — the default source for accessible primitives
  (dialog, dropdown, popover, tabs, etc.) before building any of these from
  scratch. Compose, don't reinvent.
- **Tailwind Plus** (formerly Tailwind UI) — reference for well-structured
  marketing/app layout patterns; reimplement structure and spacing rhythm, not
  literal markup lifted from a paid product.

## Motion/3D inspiration

- **Framer, Motion.dev (Framer Motion), GSAP** — the actual libraries used in
  `snippets/`. "Framer" the design tool is a layout/prototyping reference only;
  ship real Framer Motion/GSAP code, not an embed.
- **Spline, Rive, LottieFiles** — for 3D scenes / vector animations that are
  genuinely asset-driven: these need an actual exported asset (a `.splinecode`,
  `.riv`, or Lottie JSON) supplied by the user or already in the repo. Don't
  fabricate a fake asset URL or pretend to generate one — ask for the export,
  or build the equivalent with React Three Fiber/CSS if no asset exists.

## Research inspiration (Awwwards, Mobbin, Godly, Cosmos)

Use these only as a mental reference for "what does best-in-class look like
for this category of product" — e.g. recalling that fintech dashboards
typically favor dense data + restrained motion, while consumer landing pages
favor bolder hero motion. Don't claim to have browsed a specific site in this
session.

## Decision order in practice

1. Something already in this repo.
2. Shadcn/Radix primitive.
3. A reimplemented pattern inspired by the animated-component ecosystem above.
4. Custom-built to the design-system/motion-principles references.

Skip straight to (4) when the ask is specific enough that patterns 2–3 don't
fit (e.g. a bespoke data visualization).
