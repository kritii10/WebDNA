import type { Metadata } from "next";

import { LandingPage } from "@/components/marketing/landing-page";

export const metadata: Metadata = {
  title: "AI-Powered Website Intelligence Platform",
  description:
    "WebDNA helps modern teams analyze performance, accessibility, SEO, UX, and growth opportunities in one premium workspace."
};

export default function HomePage() {
  return <LandingPage />;
}
