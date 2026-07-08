# Walkthrough: design critique

## Prompt

> "Can you review our checkout page? Something feels off but I can't put my
> finger on it."

## Expected workflow

An explicit review ask with no request to change anything yet — switches
straight to `references/design-critique-mode.md` per `SKILL.md`'s own
routing rule ("If the request is to evaluate an _existing_ UI... switch to
`design-critique-mode.md` instead of this pipeline"). No intent-taxonomy
classification, no creative brief — those belong to the build workflow, not
critique mode.

1. Read the real checkout page files — not a guess from the route name.
2. Evaluate against `design-critique-mode.md`'s full list: hierarchy,
   spacing, typography, color usage, responsiveness, accessibility, motion
   quality, interaction quality, performance, maintainability — the same bar
   `references/quality-checklist.md` sets for new builds.
3. Write findings grouped Blocking → High → Medium → Low, each with
   Location/What's wrong/Why it matters/Suggested fix, skipping any empty
   group rather than padding the report.
4. Stop there — no code changes unless the user asks for fixes after seeing
   the findings.

## Generated artifacts

A findings report — no code. Illustrative example of the shape (not this
skill's own findings about anything real, just the format the mode produces):

> **High**
>
> - **Location**: `CheckoutForm.tsx`, card-number field
>   **What's wrong**: The field has no `aria-invalid`/`aria-describedby`
>   wiring to its validation message — the error text renders visually but
>   isn't announced.
>   **Why it matters**: A screen-reader user submitting an invalid card gets
>   no indication anything failed; the page just appears to do nothing.
>   **Suggested fix**: Add `aria-invalid={hasError}` and
>   `aria-describedby="card-number-error"` pointing at the message element.
>
> **Medium**
>
> - **Location**: `OrderSummary.tsx`
>   **What's wrong**: Line-item spacing is `gap-2` while every other list in
>   the app (per `references/design-system.md`'s scale) uses `gap-3`.
>   **Why it matters**: A one-off spacing value here reads as slightly
>   cramped next to the rest of the product, which is likely the "something
>   feels off" the prompt couldn't name.
>   **Suggested fix**: Change to `gap-3` to match the rest of the app.

## Explanation

The most common failure mode this mode is designed against is guessing at
problems from the page's reputation ("checkout pages are always janky")
instead of reading the actual code, and asserting a numeric score without
running a real tool. Both are explicitly disallowed by
`design-critique-mode.md`'s "What this mode does not do" section. The
"something feels off" framing in the prompt is exactly the case critique
mode is built for — a specific, groundable finding (a one-off spacing value)
is a more useful answer than a vague aesthetic judgment.
