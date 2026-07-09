/**
 * Data shape for the "visual identity" the workflow's VisualIdentity gate
 * produces before any layout or component code exists — see
 * references/visual-identity-engine.md for the full rubric this is filled
 * in against. Same relationship to that doc as `project-profile.ts` has to
 * `analysis/README.md`: this is the data the agent fills in through its own
 * judgment, not something a script derives automatically.
 * `summarizeVisualIdentity` only renders an already-filled identity into a
 * readable note.
 */

export interface VisualIdentity {
  /** One sentence: the core creative idea driving this build. Not a mood board. */
  concept: string;
  /** What makes this NOT interchangeable with a competitor's version of the same category. */
  differentiator: string;
  /** The role each color plays, not just hex values — e.g. "one warm accent, used only for the primary action". */
  colorDirection: string;
  /** The type pairing and why it fits this audience. */
  typographicVoice: string;
  /** A concrete reference point beyond "centered hero" — see visual-identity-engine.md's examples. */
  layoutMetaphor: string;
  /** Restrained/confident vs. playful/kinetic vs. none — the personality, before picking a named preset. */
  motionPersonality: string;
  /** The one specific, memorable move that keeps this from reading as a template. */
  signatureElement: string;
  /** Known generic patterns considered and explicitly rejected, and why — not an exhaustive list, just the relevant ones. */
  rejectedGenericPatterns: readonly string[];
  /** 0–10 against visual-identity-engine.md's rubric — agent judgment, not a tool's score. */
  originalityScore: number;
  /** One line justifying the score above. */
  originalityRationale: string;
}

export function summarizeVisualIdentity(identity: VisualIdentity): string {
  const lines: string[] = [];

  lines.push(`Concept: ${identity.concept}`);
  lines.push(`Differentiator: ${identity.differentiator}`);
  lines.push(`Color direction: ${identity.colorDirection}`);
  lines.push(`Typographic voice: ${identity.typographicVoice}`);
  lines.push(`Layout metaphor: ${identity.layoutMetaphor}`);
  lines.push(`Motion personality: ${identity.motionPersonality}`);
  lines.push(`Signature element: ${identity.signatureElement}`);
  if (identity.rejectedGenericPatterns.length > 0) {
    lines.push(
      `Rejected generic patterns: ${identity.rejectedGenericPatterns.join("; ")}`,
    );
  }
  lines.push(
    `Originality score: ${identity.originalityScore}/10 — ${identity.originalityRationale}`,
  );

  return lines.join("\n");
}

export interface GenericPattern {
  id: string;
  pattern: string;
  whyItsGeneric: string;
  insteadTry: string;
}

/**
 * The checkable form of visual-identity-engine.md's "Known generic
 * patterns" list — used to fill `VisualIdentity.rejectedGenericPatterns`
 * against something concrete instead of a vague "avoid generic stuff", and
 * structurally verified (see plugins/examples/run-smoke.ts) so this can't
 * silently drift from the doc it backs.
 */
export const KNOWN_GENERIC_PATTERNS: readonly GenericPattern[] = [
  {
    id: "sidebar-card-purple-dashboard",
    pattern: "Sidebar + card grid + purple/violet accent as the default dashboard shape",
    whyItsGeneric:
      "The reflexive shape for any admin/analytics request, regardless of the product's actual brand or task frequency.",
    insteadTry:
      "Let information density and task frequency decide nav placement (see examples/analytics-dashboard/README.md); pick an accent tied to the product's actual brand.",
  },
  {
    id: "centered-hero-gradient-blob",
    pattern: "Centered hero, eyebrow pill, gradient blob, two-button CTA",
    whyItsGeneric:
      "The same shape for every landing page regardless of audience or product — see references/visual-identity-engine.md's AI cliché list.",
    insteadTry:
      "Let the concept and audience decide layout metaphor and symmetry — asymmetric, editorial, or content-first shapes are all legitimate alternatives when they fit.",
  },
  {
    id: "generic-three-tier-pricing",
    pattern:
      '"Simple / Pro / Enterprise" 3-column pricing table with a highlighted middle tier',
    whyItsGeneric:
      "Shipped by default even when no real pricing was requested or researched.",
    insteadTry: "Only build a pricing section when the user provides real tiers/numbers.",
  },
  {
    id: "bento-grid-default",
    pattern: "Bento grid used as the default section layout",
    whyItsGeneric:
      "Legitimate for genuinely heterogeneous content, generic when forced onto uniform content.",
    insteadTry: "Use it only when content blocks actually differ in size/importance.",
  },
  {
    id: "glassmorphism-everywhere",
    pattern: "Glassmorphism (blurred translucent panels) applied to every surface",
    whyItsGeneric:
      "Legitimate as one deliberate accent, generic as a blanket surface treatment.",
    insteadTry:
      "Reserve it for a single moment that benefits from the depth cue, if any.",
  },
  {
    id: "fabricated-testimonials",
    pattern: "Testimonial carousel with fabricated quotes and stock-photo avatars",
    whyItsGeneric: "Manufactured social proof for a product with no real customers yet.",
    insteadTry:
      "Omit the section entirely rather than fabricate content (see examples/ai-saas-landing/README.md's §3).",
  },
] as const;
