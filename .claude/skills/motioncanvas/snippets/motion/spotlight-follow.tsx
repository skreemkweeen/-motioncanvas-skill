"use client";

/**
 * Pointer-following radial highlight for cards/panels (the "spotlight card"
 * hover effect). Deliberately framer-motion-free: the pointer position is
 * written straight to a CSS custom property on the DOM node instead of React
 * state, since pointermove fires far too often to re-render on. Only the
 * hover on/off transition (two events per hover session) goes through state.
 *
 * Purely decorative — the overlay is `aria-hidden` and `pointer-events: none`,
 * so it never affects keyboard operability or the content underneath.
 */

import {
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

export interface SpotlightFollowProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  children: ReactNode;
  className?: string;
  /** CSS color for the glow. Defaults to a soft highlight for dark surfaces. */
  color?: string;
  /** Diameter in px of the spotlight gradient. */
  size?: number;
}

export function SpotlightFollow({
  children,
  className,
  color = "rgba(255, 255, 255, 0.15)",
  size = 400,
  ...props
}: SpotlightFollowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    node.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      className={className}
      style={{ position: "relative" }}
      {...props}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 200ms ease-out",
          background: `radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
