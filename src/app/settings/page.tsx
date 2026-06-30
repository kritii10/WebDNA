import type { Metadata } from "next";

import { SettingsWorkspace } from "@/components/dashboard/settings-workspace";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your WebDNA account, appearance, password, notifications, and workspace preferences."
};

export default function SettingsPage() {
  return <SettingsWorkspace />;
}
