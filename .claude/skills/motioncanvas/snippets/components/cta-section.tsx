/**
 * Generalized from examples/ai-saas-landing/cta.tsx's original hardcoded
 * "Try Fieldnote on your next call" copy into a real reusable closing CTA:
 * any heading/description/action. Kept the explicit `text-white`/
 * `text-white/70` from the original — this section renders on a dark
 * `AnimatedBorder` background regardless of the page's own theme, so its
 * text needs its own explicit color rather than inheriting the page's
 * (see tokens/README.md's dark-mode notes for why relying on inheritance
 * here would be wrong).
 */
import type { ReactNode } from "react";
import { Reveal } from "../motion/reveal";
import { AnimatedBorder } from "../motion/animated-border";

export interface CtaSectionProps {
  heading: ReactNode;
  description?: ReactNode;
  action: ReactNode;
  id?: string;
}

export function CtaSection({ heading, description, action, id }: CtaSectionProps) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <AnimatedBorder borderRadius={20} background="var(--background, #0a0a0a)">
          <div className="px-8 py-12">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {heading}
            </h2>
            {description ? <p className="mt-3 text-white/70">{description}</p> : null}
            <div className="mt-6 flex justify-center">{action}</div>
          </div>
        </AnimatedBorder>
      </Reveal>
    </section>
  );
}
