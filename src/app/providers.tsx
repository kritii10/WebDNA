"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { themeConfig } from "@/constants/theme";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeConfig.defaultTheme}
      disableTransitionOnChange
      enableSystem
      storageKey={themeConfig.storageKey}
    >
      {children}
    </NextThemesProvider>
  );
}
