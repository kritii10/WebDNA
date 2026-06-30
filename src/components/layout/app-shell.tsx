"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isCollapsed = useSidebar((state) => state.isCollapsed);
  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isPublicRoute) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div
        className={cn(
          "transition-[padding] duration-300 lg:pl-[18rem]",
          isCollapsed && "lg:pl-[6rem]"
        )}
      >
        <Navbar />
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[calc(100vh-9rem)] px-4 py-6 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 8 }}
          key={pathname}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}
