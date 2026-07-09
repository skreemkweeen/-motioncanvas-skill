"use client";

/**
 * Pointer-follow "magnetic" hover: the element leans toward the cursor within
 * a radius, then springs back on leave. Respects reduced motion (becomes a
 * no-op). Pair with a visible :focus-visible ring — this is a hover
 * enhancement, not a replacement for keyboard affordance.
 */

import { useRef, type MutableRefObject, type PointerEvent } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useMotionPreferences } from "./motion-provider";

interface MagneticButtonOptions {
  /** Fraction of the pointer offset the element follows. 0–1. */
  strength?: number;
  /** Distance in px from center at which the effect engages. */
  radius?: number;
}

interface MagneticButtonResult {
  // Mutable (not RefObject) because callers typically merge this with a
  // forwarded ref via a callback, which needs write access to `.current`.
  ref: MutableRefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

export function useMagneticButton({
  strength = 0.35,
  radius = 80,
}: MagneticButtonOptions = {}): MagneticButtonResult {
  const ref = useRef<HTMLElement | null>(null);
  const { reducedMotion } = useMotionPreferences();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring smooths the raw pointer delta instead of tracking 1:1, which is
  // what makes it feel "magnetic" rather than "dragged".
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    if (Math.hypot(offsetX, offsetY) > radius) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onPointerMove, onPointerLeave };
}
