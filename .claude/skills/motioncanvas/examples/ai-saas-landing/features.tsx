import { FeatureGrid } from "../../snippets/components/feature-grid";

export function Features() {
  return (
    <FeatureGrid
      id="features"
      heading="Everything after the call, handled"
      description="Three things Fieldnote does automatically so your team doesn't have to."
      features={[
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
          description:
            "Tasks land in Linear, Jira, or Asana without anyone copy-pasting.",
        },
      ]}
    />
  );
}
