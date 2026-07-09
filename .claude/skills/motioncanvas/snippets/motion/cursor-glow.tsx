"use client";

/**
 * Soft blurred glow that follows the pointer across a section (distinct from
 * SpotlightFollow, which is a per-card hover overlay). Fixed-position,
 * `aria-hidden`, `pointer-events: none` — purely decorative.
 *
 * Skips entirely (renders nothing, attaches no listener) when reduced motion
 * is preferred or the pointer is coarse (touch has no persistent cursor to
 * follow).
 *
 * Requires <MotionProvider> ancestor (../motion-provider).
 */

import { useEffect } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useMotionPreferences } from "../motion-provider";

export interface CursorGlowProps {
  /** Diameter in px. */
  size?: number;
  color?: string;
  className?: string;
}

export function CursorGlow({
  size = 300,
  color = "rgba(99, 102, 241, 0.25)",
  className,
}: CursorGlowProps) {
  const { reducedMotion } = useMotionPreferences();
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX - size / 2);
      y.set(event.clientY - size / 2);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, size, x, y]);

  if (reducedMotion) return null;

  return (
    <m.div
      aria-hidden
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "9999px",
        pointerEvents: "none",
        zIndex: 50,
        filter: "blur(40px)",
        background: color,
        x: springX,
        y: springY,
      }}
    />
  );
}
