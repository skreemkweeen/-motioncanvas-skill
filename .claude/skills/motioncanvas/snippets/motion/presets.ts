/**
 * Eight named motion presets — alternate full sets of the values in
 * `tokens.ts` (duration/ease/spring/distance/stagger) plus qualitative
 * interaction notes, so a project can swap its whole motion feel at once
 * instead of tuning primitives one prop at a time.
 *
 * Important framing: these are curated aesthetic interpretations of what
 * each named brand/style evokes — restraint vs. bounce, fast vs. cinematic —
 * not timing values measured or reverse-engineered from the real products.
 * Naming a preset "Stripe" is a claim about the vibe it's aiming for, not a
 * claim that it matches stripe.com's actual CSS. Don't present these as
 * extracted/verified data.
 *
 * Use like: swap `tokens.ts`'s exports for a preset's fields when building
 * within a given aesthetic, e.g. `duration: motionPresets.linear.duration`
 * instead of the default `duration` export.
 */

import type { Transition } from "framer-motion";

export interface MotionPreset {
  name: string;
  description: string;
  duration: Record<"fast" | "base" | "slow" | "slower", number>;
  ease: Record<"out" | "inOut" | "in", readonly [number, number, number, number]>;
  spring: Record<"snappy" | "gentle" | "bouncy", Transition>;
  distance: Record<"xs" | "sm" | "md" | "lg" | "xl", number>;
  stagger: Record<"tight" | "base" | "loose", number>;
  interactionNotes: string;
}

export const apple: MotionPreset = {
  name: "Apple",
  description: "Fluid and physical, restrained overshoot, generous but not slow.",
  duration: { fast: 0.2, base: 0.3, slow: 0.45, slower: 0.65 },
  ease: { out: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1], in: [0.7, 0, 0.84, 0] },
  spring: {
    snappy: { type: "spring", stiffness: 260, damping: 24 },
    gentle: { type: "spring", stiffness: 180, damping: 22 },
    bouncy: { type: "spring", stiffness: 300, damping: 18 },
  },
  distance: { xs: 6, sm: 14, md: 22, lg: 36, xl: 56 },
  stagger: { tight: 0.05, base: 0.09, loose: 0.16 },
  interactionNotes:
    "Hover/press feedback via subtle scale (~0.98) rather than color alone; entrances use spring with light overshoot; avoid hard linear eases anywhere.",
};

export const linear: MotionPreset = {
  name: "Linear",
  description: "Extremely snappy and precise, almost no overshoot — a UI-tool aesthetic.",
  duration: { fast: 0.1, base: 0.15, slow: 0.22, slower: 0.32 },
  ease: { out: [0.16, 1, 0.3, 1], inOut: [0.4, 0, 0.2, 1], in: [0.4, 0, 1, 1] },
  spring: {
    snappy: { type: "spring", stiffness: 500, damping: 40 },
    gentle: { type: "spring", stiffness: 400, damping: 38 },
    bouncy: { type: "spring", stiffness: 450, damping: 30 },
  },
  distance: { xs: 4, sm: 8, md: 12, lg: 20, xl: 32 },
  stagger: { tight: 0.02, base: 0.04, loose: 0.07 },
  interactionNotes:
    "No overshoot anywhere; motion should feel faster than perceptible reaction time. Reserve any spring/bounce for drag-release physics only, never for standard entrances.",
};

export const stripe: MotionPreset = {
  name: "Stripe",
  description:
    "Polished and confident, tasteful overshoot reserved for hero/pricing moments.",
  duration: { fast: 0.15, base: 0.25, slow: 0.4, slower: 0.6 },
  ease: { out: [0.19, 1, 0.22, 1], inOut: [0.65, 0, 0.35, 1], in: [0.7, 0, 0.84, 0] },
  spring: {
    snappy: { type: "spring", stiffness: 320, damping: 30 },
    gentle: { type: "spring", stiffness: 220, damping: 26 },
    bouncy: { type: "spring", stiffness: 380, damping: 20 },
  },
  distance: { xs: 8, sm: 16, md: 24, lg: 44, xl: 72 },
  stagger: { tight: 0.04, base: 0.08, loose: 0.14 },
  interactionNotes:
    "Reserve spring/overshoot for hero and pricing-card moments; dense UI (dashboards, tables) stays on eased transforms only. Backgrounds/gradients may drift slowly; foreground content should not.",
};

export const editorial: MotionPreset = {
  name: "Editorial",
  description: "Slow and deliberate, text-forward, print/magazine pacing.",
  duration: { fast: 0.2, base: 0.4, slow: 0.6, slower: 0.9 },
  ease: { out: [0.25, 1, 0.5, 1], inOut: [0.7, 0, 0.3, 1], in: [0.7, 0, 0.84, 0] },
  spring: {
    snappy: { type: "spring", stiffness: 200, damping: 28 },
    gentle: { type: "spring", stiffness: 150, damping: 26 },
    bouncy: { type: "spring", stiffness: 220, damping: 20 },
  },
  distance: { xs: 12, sm: 24, md: 36, lg: 56, xl: 88 },
  stagger: { tight: 0.08, base: 0.14, loose: 0.22 },
  interactionNotes:
    "Favor Reveal/ScrollReveal over snappy interaction feedback; hover states are quiet underline/opacity shifts, not scale or spring. Motion should feel like turning a page, not operating a tool.",
};

export const playful: MotionPreset = {
  name: "Playful",
  description: "High energy, bouncy, larger overshoot — for casual/consumer products.",
  duration: { fast: 0.12, base: 0.22, slow: 0.35, slower: 0.5 },
  ease: {
    out: [0.34, 1.56, 0.64, 1],
    inOut: [0.68, -0.6, 0.32, 1.6],
    in: [0.6, -0.28, 0.74, 0.05],
  },
  spring: {
    snappy: { type: "spring", stiffness: 380, damping: 15 },
    gentle: { type: "spring", stiffness: 260, damping: 16 },
    bouncy: { type: "spring", stiffness: 450, damping: 10 },
  },
  distance: { xs: 10, sm: 20, md: 32, lg: 50, xl: 80 },
  stagger: { tight: 0.03, base: 0.06, loose: 0.1 },
  interactionNotes:
    "Overshoot and spring are the default here, not the exception; hover states can combine rotation and scale. Still respect reduced motion — playful doesn't mean exempt from accessibility defaults.",
};

export const enterprise: MotionPreset = {
  name: "Enterprise",
  description:
    "Conservative and calm — dense B2B software where flashiness reads as unprofessional.",
  duration: { fast: 0.1, base: 0.18, slow: 0.28, slower: 0.4 },
  ease: { out: [0.4, 0, 0.2, 1], inOut: [0.4, 0, 0.2, 1], in: [0.4, 0, 1, 1] },
  spring: {
    snappy: { type: "spring", stiffness: 340, damping: 34 },
    gentle: { type: "spring", stiffness: 260, damping: 30 },
    bouncy: { type: "spring", stiffness: 300, damping: 26 },
  },
  distance: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  stagger: { tight: 0.02, base: 0.05, loose: 0.08 },
  interactionNotes:
    "Prefer Fade over Slide/Reveal wherever plausible. Avoid AuroraBackground/CursorGlow/FloatingCard entirely — this preset is for dashboards and admin tools where ambient motion reads as noise.",
};

export const minimal: MotionPreset = {
  name: "Minimal",
  description: "Motion nearly absent — opacity-only, very short, content-first.",
  duration: { fast: 0.08, base: 0.12, slow: 0.18, slower: 0.25 },
  ease: { out: [0.4, 0, 0.2, 1], inOut: [0.4, 0, 0.2, 1], in: [0.4, 0, 1, 1] },
  spring: {
    snappy: { type: "spring", stiffness: 280, damping: 40 },
    gentle: { type: "spring", stiffness: 220, damping: 38 },
    bouncy: { type: "spring", stiffness: 240, damping: 36 },
  },
  distance: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
  stagger: { tight: 0.02, base: 0.03, loose: 0.05 },
  interactionNotes:
    "Prefer Fade exclusively. If Slide/Reveal are used at all, keep their distance near zero. Springs are intentionally flattened here — 'bouncy' barely differs from 'snappy' since bounce doesn't fit this aesthetic. No ambient/looping motion under any circumstance.",
};

export const luxury: MotionPreset = {
  name: "Luxury",
  description:
    "Slow, cinematic, high-contrast — one deliberate hero moment, stillness elsewhere.",
  duration: { fast: 0.25, base: 0.5, slow: 0.8, slower: 1.2 },
  ease: { out: [0.16, 1, 0.3, 1], inOut: [0.83, 0, 0.17, 1], in: [0.7, 0, 0.84, 0] },
  spring: {
    snappy: { type: "spring", stiffness: 180, damping: 30 },
    gentle: { type: "spring", stiffness: 140, damping: 28 },
    bouncy: { type: "spring", stiffness: 160, damping: 26 },
  },
  distance: { xs: 16, sm: 32, md: 48, lg: 72, xl: 112 },
  stagger: { tight: 0.1, base: 0.18, loose: 0.3 },
  interactionNotes:
    "One hero moment per page gets the full slow treatment; everything else should be nearly still by comparison. Luxury reads through restraint and negative space, not through motion quantity — springs settle, they don't bounce.",
};

export const motionPresets = {
  apple,
  linear,
  stripe,
  editorial,
  playful,
  enterprise,
  minimal,
  luxury,
} as const satisfies Record<string, MotionPreset>;

export type MotionPresetName = keyof typeof motionPresets;
