import { AuroraBackground } from "../../snippets/motion/aurora-background";
import { HeroReveal } from "../../snippets/motion/hero-reveal";
import { PremiumButton } from "../../snippets/button.example";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950">
      <AuroraBackground
        position="absolute"
        className="inset-0 -z-10"
        colors={["#6366f1", "#8b5cf6", "#22d3ee"]}
      />
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-32 sm:py-40">
        <HeroReveal
          eyebrow={
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              Now in public beta
            </span>
          }
          heading={
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Meeting notes that write your follow-ups
            </h1>
          }
          subheading={
            <p className="max-w-xl text-lg text-white/70">
              Fieldnote listens to your calls, drafts the recap, and drops action items
              straight into your tracker — so the fifteen minutes after every meeting go
              back to being yours.
            </p>
          }
          actions={
            <div className="flex flex-wrap items-center gap-4">
              <PremiumButton>Start free trial</PremiumButton>
              <a
                href="#demo"
                className="rounded text-sm font-medium text-white/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Watch a 2-minute demo
              </a>
            </div>
          }
        />
      </div>
    </section>
  );
}
