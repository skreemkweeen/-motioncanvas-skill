"use client";

import { useState } from "react";
import {
  Sidebar as SharedSidebar,
  GridIcon,
  TableIcon,
  BellIcon,
  GearIcon,
  type SidebarItem,
} from "../../snippets/components/sidebar";

const navItems: SidebarItem[] = [
  { label: "Overview", href: "#overview", icon: GridIcon },
  { label: "Requests", href: "#requests", icon: TableIcon },
  { label: "Alerts", href: "#alerts", icon: BellIcon },
  { label: "Settings", href: "#settings", icon: GearIcon },
];

export function Sidebar() {
  const [active, setActive] = useState("#overview");
  return (
    <SharedSidebar
      brand="Pulse"
      items={navItems}
      activeHref={active}
      onNavigate={setActive}
    />
  );
}
