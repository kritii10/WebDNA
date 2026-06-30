import type { Metadata } from "next";

import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/constants/app";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://webdna.ai"),
  title: {
    default: `${APP_NAME} | ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "Website Intelligence Platform",
    "AI analytics",
    "SEO insights",
    "conversion intelligence",
    "SaaS dashboard"
  ],
  openGraph: {
    title: `${APP_NAME} | ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | ${APP_TAGLINE}`,
    description: APP_DESCRIPTION
  }
};
