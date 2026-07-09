import { CtaSection } from "../../snippets/components/cta-section";
import { PremiumButton } from "../../snippets/button.example";

export function Cta() {
  return (
    <CtaSection
      id="demo"
      heading="Try Fieldnote on your next call"
      description="No credit card. Cancel any time."
      action={<PremiumButton>Start free trial</PremiumButton>}
    />
  );
}
