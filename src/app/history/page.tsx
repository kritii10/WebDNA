import type { Metadata } from "next";

import { HistoryTable } from "@/components/dashboard/history-table";

export const metadata: Metadata = {
  title: "History",
  description:
    "Browse previous website analyses, reopen reports, and manage saved report history in WebDNA."
};

export default function HistoryPage() {
  return <HistoryTable />;
}
