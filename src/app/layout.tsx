import type { ReactNode } from "react";

import { GradientBackground } from "@/components/common/gradient-background";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/app/providers";
import { displayFont, sansFont } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata = siteMetadata;

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sansFont.variable,
          displayFont.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased"
        )}
      >
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            <GradientBackground />
            <div className="relative z-10">
              <AppShell>{children}</AppShell>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
