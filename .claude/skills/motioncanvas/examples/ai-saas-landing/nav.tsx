import { Navbar } from "../../snippets/components/navbar";
import { PremiumButton } from "../../snippets/button.example";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
];

export function Nav() {
  return (
    <Navbar
      brand="Fieldnote"
      links={navLinks}
      renderCta={(variant) =>
        variant === "desktop" ? (
          <PremiumButton className="px-4 py-2 text-xs">Start free trial</PremiumButton>
        ) : (
          <PremiumButton className="w-full justify-center">
            Start free trial
          </PremiumButton>
        )
      }
    />
  );
}
