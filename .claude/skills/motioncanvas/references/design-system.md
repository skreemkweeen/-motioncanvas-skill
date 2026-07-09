# Design system defaults

Use these when a project has no established tokens yet. When it does, extend
those instead — never run two parallel scales in one codebase.

## Type scale

Modular scale, ratio 1.25 ("major third"), base 16px:

| Token       | Size   | Line height | Use                |
| ----------- | ------ | ----------- | ------------------ |
| `text-xs`   | 12.8px | 1.5         | metadata, captions |
| `text-sm`   | 14px   | 1.5         | secondary body     |
| `text-base` | 16px   | 1.6         | body               |
| `text-lg`   | 20px   | 1.4         | lead paragraph     |
| `text-xl`   | 25px   | 1.3         | small heading      |
| `text-2xl`  | 31px   | 1.2         | section heading    |
| `text-3xl`  | 39px   | 1.15        | page heading       |
| `text-4xl`+ | 49px+  | 1.05–1.1    | hero display       |

Rules of thumb:

- Never more than 3 sizes visible in one viewport unless it's a data table.
- Tighten line-height as size increases; loosen as it decreases.
- Kerning: rely on the system/variable font's default tracking except for
  display sizes (4xl+), where `-0.02em` to `-0.03em` reads less loose.
- Line length: 45–75 characters for body copy; constrain with `max-w-prose` or
  an explicit `ch`-based width, not a raw pixel guess.

## Spacing scale

4px base unit: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Pick gaps from this list;
don't hand-roll one-off values like `13px`. Section padding on desktop
typically lands at 96–128px vertical, 24–48px horizontal gutters.

## Color

- Define semantic tokens (`background`, `foreground`, `muted`, `border`,
  `primary`, `destructive`, ...) as CSS variables in `:root` and a `.dark`
  (or `[data-theme="dark"]`) override — components reference the semantic
  token, never a raw hex. `snippets/tokens.css` is a starter set of these
  (plus typography/spacing/radius/elevation) to copy in when a target
  project has none yet — extend the project's existing tokens instead if it
  already has them.
- Contrast: body text ≥ 4.5:1 against its background, large/display text ≥ 3:1.
  Check both themes, not just light.
- Accent color used sparingly — one primary action color per view. If
  everything is emphasized, nothing is.
- Color psychology as a light touch, not a formula: cooler/desaturated for
  utility and data-dense surfaces, warmer/higher-saturation accents for
  conversion moments (CTAs, success states) — never the only signal (pair with
  icon/shape/text for colorblind users).

## Layout

- 12-column grid for dense/dashboard layouts; a simple centered
  `max-w-*` container with consistent gutters for marketing pages.
- Hero sections: an asymmetric split (roughly golden-ratio, ~60/40) reads more
  considered than a dead 50/50 unless the content is genuinely symmetric.
- Respect the rule of thirds for focal placement in image/illustration-heavy
  layouts rather than dead-centering everything.
- Negative space is a layout tool, not leftover space — increase it around the
  single most important element on a screen, not uniformly everywhere.
- Optical alignment over mathematical alignment for icons/glyphs next to text
  (e.g. nudge a circular icon 1px to visually center against a baseline).

## Component states

Every interactive component should define, explicitly: default, hover, focus
(visible focus ring, not just a color change), active/pressed, disabled, and
loading. Missing focus states are the most common accessibility miss — don't
skip it because it "looks fine" with mouse-only testing.
