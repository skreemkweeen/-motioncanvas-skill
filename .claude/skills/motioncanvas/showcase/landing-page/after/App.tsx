/**
 * The "after" side of this showcase is not a re-derivation — it imports the
 * real, shipped components from examples/ai-saas-landing/ directly, composed
 * exactly like that example's own page.tsx. If those components change, this
 * showcase's screenshots go stale until re-captured (see ../README.md) rather
 * than silently drifting from what the skill actually produces.
 */
import { MotionProvider } from "../../../snippets/motion-provider";
import { Nav } from "../../../examples/ai-saas-landing/nav";
import { Hero } from "../../../examples/ai-saas-landing/hero";
import { Features } from "../../../examples/ai-saas-landing/features";
import { Cta } from "../../../examples/ai-saas-landing/cta";

export function App() {
  return (
    <MotionProvider>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Cta />
      </main>
    </MotionProvider>
  );
}
