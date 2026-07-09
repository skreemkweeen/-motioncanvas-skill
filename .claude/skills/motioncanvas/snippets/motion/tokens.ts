/**
 * Shared motion constants for the primitives in this directory. Import from
 * here instead of hand-rolling durations/easings/springs per component, so a
 * project's motion feels like one system. See
 * references/motion-principles.md for the reasoning behind these defaults.
 */

import type { HTMLAttributes } from "react";
import type { Transition } from "framer-motion";

/**
 * `HTMLAttributes<HTMLDivElement>` minus the handlers Framer Motion
 * redefines with its own gesture-event signatures (`onDrag`, animation
 * lifecycle callbacks). Spreading raw `HTMLAttributes` onto an `m.div` and
 * these collide under strict mode — every primitive in this directory that
 * accepts native div props extends this instead.
 */
export type MotionSafeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "className"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
>;

export const duration = {
  fast: 0.15, // micro-interactions: hover, toggle
  base: 0.25, // default entrance/exit
  slow: 0.4, // larger entrances, section reveals
  slower: 0.6, // hero/cinematic moments only
} as const;

// Cubic-bezier tuples usable directly as a Transition["ease"].
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, [number, number, number, number]>;

export const spring = {
  // touchable UI: buttons, cards, drags
  snappy: { type: "spring", stiffness: 300, damping: 30 } as const,
  // entrances that should settle without much overshoot
  gentle: { type: "spring", stiffness: 220, damping: 26 } as const,
  // playful overshoot for things arriving on screen
  bouncy: { type: "spring", stiffness: 400, damping: 17 } as const,
} satisfies Record<string, Transition>;

// Translate distances (px) for enter/exit transforms. Keep small for in-place
// UI, reserve `lg`/`xl` for hero/full-screen moments.
export const distance = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
} as const;

// Stagger delay (seconds) between siblings in a StaggerContainer.
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

export type Direction = "up" | "down" | "left" | "right";

export function directionToOffset(dir: Direction, px: number): { x: number; y: number } {
  switch (dir) {
    case "up":
      return { x: 0, y: px };
    case "down":
      return { x: 0, y: -px };
    case "left":
      return { x: px, y: 0 };
    case "right":
      return { x: -px, y: 0 };
  }
}
