# Visual identity engine

The mechanism behind the `VisualIdentity` gate every `motioncanvas-*` skill
requires before layout (`analysis/visual-identity.ts`). Its job is narrow:
force a real creative decision — a concept, a visual DNA, an originality
score — before any layout or component code exists, instead of letting the
first Tailwind-shaped idea that comes to mind become the output by default.

This is agent judgment applied through a documented rubric, not a scored
tool — same honesty rule as everywhere else in this skill: don't claim a
number came from software that didn't run.

## Why this exists

Left unconstrained, an LLM's "first idea" for a UI request converges on the
same handful of shapes, because they're the most heavily represented pattern
in training data: a centered hero with a gradient blob, a sidebar-plus-card
dashboard, a violet-to-blue accent color, Inter, `rounded-xl` and
`shadow-lg` on everything. None of that is wrong in isolation — the problem
is that it's the default for every request regardless of what the product
actually is, which is what makes generated UI recognizable as generated.
This file exists to make "is this the generic default, or a considered
choice" an explicit, checked step instead of an implicit one.

## Anti-generic rules

1. **A UI request is not a template-fill request.** Don't reach for "the
   SaaS landing page shape" or "the admin dashboard shape" as a starting
   point — start from what this specific product/audience/content actually
   needs, then check whether a common shape happens to fit (it often will,
   for genuinely good reasons — density needs a table, a funnel needs a
   linear scroll). The difference is arriving at the shape through
   reasoning, not defaulting to it.
2. **Never ship a pattern from the Known generic patterns list below as the
   default** — only when the user names it explicitly ("give me a
   three-column pricing table," "a standard sidebar layout is fine here").
   Silence from the user is not permission to default to the generic
   version.
3. **One deliberate signature move per build.** Something in the layout,
   type pairing, motion, or interaction should be specific enough that a
   screenshot of it couldn't be mistaken for a different product using the
   same template. This doesn't mean gratuitous decoration — see
   `motion-principles.md` and `quality-checklist.md`, which still govern
   restraint; original and busy are not the same thing.
4. **Constraints beat inspiration boards.** Don't ask "what do premium SaaS
   sites look like" — ask what this audience, this content, and this
   product's actual personality suggest, then check that against
   `analysis/project-profile.ts` (does the target repo already have a
   visual language to extend?) and `analysis/creative-brief.ts` (what does
   this build's own stated visual style say?).

## Visual DNA generation

Before layout, generate a short, concrete visual DNA — not a mood board, a
handful of decisions that constrain everything downstream:

| Element                | What to decide                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Color direction**    | Not "purple/blue gradient" — the actual role each color plays (one accent, used sparingly, for what)                                                                                 |
| **Typographic voice**  | The pairing and why it fits this audience — a display face for editorial confidence reads differently than a geometric sans for technical precision                                  |
| **Layout metaphor**    | A concrete reference point beyond "centered hero" — editorial spread, terminal/console, physical object, spatial map, timeline — chosen because it fits the content, not for novelty |
| **Motion personality** | Restrained/confident vs. playful/kinetic vs. none — see `motion-director.md`'s preset list, but the personality decision comes first, the preset second                              |
| **Signature element**  | The one specific, memorable move (see Anti-generic rule 3)                                                                                                                           |

`analysis/visual-identity.ts`'s `VisualIdentity` type has a field for each
of these; `summarizeVisualIdentity()` renders a filled one into the few
lines worth stating to the user before layout starts.

## Concept generation

For anything beyond a single component, generate the concept before the
visual DNA, in this order:

1. State the core idea in one sentence — what is this build actually
   about, in the fewest words that aren't generic ("a calm, high-trust tool
   for people who are stressed when they open it" says more than "a clean
   modern SaaS dashboard").
2. Name what makes this NOT interchangeable with a competitor's version of
   the same product category.
3. Only then move to visual DNA — the concept should produce the DNA, not
   the other way around (picking a gradient first and rationalizing a
   concept after it is how generic output happens).

## Layout innovation rules

- Default asymmetry over dead-centering when the content supports it — a
  centered single column is correct for a focused reading flow, wrong as
  the reflexive choice for every hero.
- Let content density and hierarchy dictate grid structure — a bento grid
  is a legitimate pattern for genuinely heterogeneous content blocks, and a
  generic one when applied to three identical feature cards because it
  looks currently fashionable.
- Break the viewport-height hero convention when the content doesn't need a
  full screen to make its point — padding a thin idea out to 100vh is a
  tell, not a design decision.
- Real negative space is a layout choice, not leftover space — decide what
  it's doing (isolating the one important element, creating breathing room
  around dense data) rather than filling it reflexively with more content.

## AI cliché detection

Check the finished layout/copy/visuals against this list before returning
work — if something on it is present and wasn't explicitly requested,
revise before handing back:

- Generic "Powered by AI" badge with a sparkle/star icon.
- Centered hero: eyebrow pill, giant bold headline, gray subhead, two
  buttons, gradient blob behind it — as the unexamined default for every
  landing page regardless of product.
- Glassmorphism (`backdrop-blur` + translucent white/black panel) applied
  everywhere rather than at one deliberate moment.
- The exact violet/indigo-to-blue or pink-to-orange gradient as the
  accent color, absent a reason tied to this specific brand.
- Bento grid used as the default section layout rather than for content
  that's genuinely heterogeneous in size/importance.
- Every card: `rounded-xl`, `shadow-lg`, white/near-white background,
  identical padding — with nothing to distinguish one from another besides
  its text.
- Emoji-in-a-colored-circle standing in for a real icon set.
- A 3-column "Simple / Pro / Enterprise" pricing table with a highlighted
  middle tier, when no pricing was requested or researched.
- A testimonial carousel with 5-star ratings and stock-photo avatars for a
  product with no real customers yet.
- Copy that reads as marketing-generic ("Supercharge your workflow",
  "Unlock your potential", "The future of X, today") rather than specific
  to this product's actual value.

## Known generic patterns (reject by default)

Concrete, named patterns from Anti-generic rule 2 — `KNOWN_GENERIC_PATTERNS`
in `analysis/visual-identity.ts` is this same list in checkable form:

- **Sidebar + card grid + purple/violet accent "dashboard"** — the reflexive
  shape for any admin/analytics request. Reject unless the user names it;
  instead let information density and task frequency (see
  `examples/analytics-dashboard/README.md`) decide nav placement, and pick
  an accent color tied to the product's actual brand, not "the SaaS purple."
- **Centered hero + gradient blob + two-button CTA** — see AI cliché
  detection above; the same shape for every landing page regardless of
  audience or product.
- **Generic 3-tier pricing table** — see AI cliché detection above.
- **Bento grid as default section layout** — legitimate for heterogeneous
  content, generic when forced onto uniform content.
- **Glassmorphism everywhere** — legitimate as one deliberate accent,
  generic as a blanket surface treatment.
- **Testimonial carousel with fabricated quotes** — never fabricate social
  proof; omit the section if there's no real content for it (see
  `examples/ai-saas-landing/README.md`'s §3 on why a testimonial section
  was cut rather than filled with placeholders).

## Originality scoring

Score every `VisualIdentity` 0–10 before layout begins (`originalityScore`
on the type). This is the agent's own honest judgment against this rubric,
stated with a one-line rationale (`originalityRationale`) — not a metric a
tool produced:

| Score | Meaning                                                                                     |
| ----- | ------------------------------------------------------------------------------------------- |
| 0–3   | Matches a Known generic pattern above with no adaptation. Revise before continuing.         |
| 4–6   | Competent but generic — correct execution of a template shape, no signature element.        |
| 7–8   | A real signature element present, grounded in the concept, not decorative for its own sake. |
| 9–10  | Distinct enough that a screenshot reads as this specific product, not "a SaaS product."     |

A score below 7 means: go back to Concept generation and Visual DNA
generation before writing any layout or component code. Reporting a low
score alongside generic output is not an acceptable outcome — the gate
exists to force the revision, not to produce a caveat.

## Premium design quality gate

Immediately before DesignCritique (the final gate in every `motioncanvas-*`
skill), confirm all of the following, in addition to
`quality-checklist.md`'s existing bar:

- [ ] VisualIdentity's originality score is 7 or higher, or the user
      explicitly asked for a standard/generic pattern by name.
- [ ] Nothing in AI cliché detection is present unexplained.
- [ ] The signature element from Visual DNA generation actually made it
      into the implementation, not just the plan.
- [ ] Copy (if any was generated) is specific to this product, not
      marketing-generic filler.
- [ ] The layout metaphor chosen is visible in the actual structure, not
      just named in the plan and then defaulted away from under
      implementation pressure.
