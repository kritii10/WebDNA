import type { Metadata } from "next";

import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Monitor website health, team activity, and optimization momentum across your WebDNA workspace."
};

export default function DashboardPage() {
  return <DashboardWorkspace />;
}
