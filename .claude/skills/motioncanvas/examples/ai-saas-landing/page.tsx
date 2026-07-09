import { MotionProvider } from "../../snippets/motion-provider";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { Features } from "./features";
import { Cta } from "./cta";

// Not typed against Next's `Metadata` — that would pull the `next` package in
// as a devDependency just for one type import. Next's App Router validates
// the shape of this export at build time regardless of whether it's
// explicitly annotated.
export const metadata = {
  title: "Fieldnote — AI meeting notes that write your follow-ups",
  description:
    "Fieldnote transcribes your calls, drafts the recap, and syncs action items to your tracker automatically.",
};

export default function AiSaasLandingPage() {
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
