import { Reveal } from "../../snippets/motion/reveal";
import { StaggerContainer, StaggerItem } from "../../snippets/motion/stagger-container";
import { FeatureCard } from "./feature-card";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Live transcription",
    description: "Accurate, speaker-labeled transcripts the moment the call ends.",
  },
  {
    title: "Auto-drafted recap",
    description: "A recap in your team's voice, ready to send in one click.",
  },
  {
    title: "Action items synced",
    description: "Tasks land in Linear, Jira, or Asana without anyone copy-pasting.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          Everything after the call, handled
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Three things Fieldnote does automatically so your team doesn&apos;t have to.
        </p>
      </Reveal>
      <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <FeatureCard title={feature.title} description={feature.description} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
