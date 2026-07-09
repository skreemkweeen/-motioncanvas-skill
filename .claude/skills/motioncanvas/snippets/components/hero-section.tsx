/**
 * Generalized from examples/ai-saas-landing/hero.tsx's original hardcoded
 * "Fieldnote" copy into a real reusable hero: eyebrow/heading/subheading/
 * actions stay caller-provided ReactNode (same as `HeroReveal` itself
 * already expects — see its own doc comment), so each page keeps full
 * control over its own copy and typography classes; this component wires
 * up the aurora background + hero-reveal composition around them.
 */
import type { ReactNode } from "react";
import { AuroraBackground } from "../motion/aurora-background";
import { HeroReveal } from "../motion/hero-reveal";

export interface HeroSectionProps {
  eyebrow?: ReactNode;
  heading: ReactNode;
  subheading?: ReactNode;
  actions?: ReactNode;
  /** Aurora blob colors, back to front. Omit to render without an aurora background. */
  auroraColors?: readonly [string, string, string];
  className?: string;
}

export function HeroSection({
  eyebrow,
  heading,
  subheading,
  actions,
  auroraColors,
  className = "bg-neutral-950",
}: HeroSectionProps) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      {auroraColors ? (
        <AuroraBackground
          position="absolute"
          className="inset-0 -z-10"
          colors={auroraColors}
        />
      ) : null}
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-32 sm:py-40">
        <HeroReveal
          eyebrow={eyebrow}
          heading={heading}
          subheading={subheading}
          actions={actions}
        />
      </div>
    </section>
  );
}
