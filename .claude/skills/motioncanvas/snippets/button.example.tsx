"use client";

/**
 * Worked example composing the motion snippets into one component — the bar
 * to hit, not a component to import as-is. Swap `cn` for the target
 * project's own class-merge helper (e.g. `@/lib/utils`).
 */

import { forwardRef, type ButtonHTMLAttributes, type SVGProps } from "react";
import { m } from "framer-motion";
import { useMagneticButton } from "./use-magnetic-button";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Framer Motion's HTMLMotionProps redefines onDrag/onDragStart/onDragEnd and
// the animation/transition event handlers with its own gesture signatures,
// which collide with the native DOM event types of the same name — omit them
// from the spreadable native props so `m.button` wins for those keys.
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
>;

interface PremiumButtonProps extends NativeButtonProps {
  loading?: boolean;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  function PremiumButton(
    { className, children, loading, disabled, ...props },
    forwardedRef,
  ) {
    const { ref, x, y, onPointerMove, onPointerLeave } = useMagneticButton({
      strength: 0.3,
      radius: 60,
    });

    return (
      <m.button
        ref={(node) => {
          ref.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        style={{ x, y }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
          "bg-primary text-sm font-medium text-primary-foreground",
          "transition-colors hover:bg-primary/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {loading ? (
          <SpinnerIcon aria-hidden className="h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </m.button>
    );
  },
);

function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
