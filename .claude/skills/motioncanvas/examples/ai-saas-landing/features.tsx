import { Reveal } from "../../snippets/motion/reveal";
import { StaggerContainer, StaggerItem } from "../../snippets/motion/stagger-container";
import { SpotlightFollow } from "../../snippets/motion/spotlight-follow";

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
    <section className="mx-auto max-w-5xl px-6 py-24">
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
            <SpotlightFollow className="h-full rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </SpotlightFollow>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
