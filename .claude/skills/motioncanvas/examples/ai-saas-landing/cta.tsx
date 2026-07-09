import { Reveal } from "../../snippets/motion/reveal";
import { AnimatedBorder } from "../../snippets/motion/animated-border";
import { PremiumButton } from "../../snippets/button.example";

export function Cta() {
  return (
    <section id="demo" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <AnimatedBorder borderRadius={20} background="var(--background, #0a0a0a)">
          <div className="px-8 py-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              Try Fieldnote on your next call
            </h2>
            <p className="mt-3 text-muted-foreground">No credit card. Cancel any time.</p>
            <div className="mt-6 flex justify-center">
              <PremiumButton>Start free trial</PremiumButton>
            </div>
          </div>
        </AnimatedBorder>
      </Reveal>
    </section>
  );
}
