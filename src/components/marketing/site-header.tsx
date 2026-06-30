"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/common/container";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { APP_NAME } from "@/constants/app";

const links = [
  { href: "#features", label: "Features" },
  { href: "#preview", label: "Preview" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" }
] as const;

export function SiteHeader() {
  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-4 z-50"
      initial={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Container>
        <div className="glass-panel flex items-center justify-between rounded-full border border-white/10 px-3 py-3 shadow-[0_20px_80px_-40px_rgba(14,165,233,0.45)]">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--accent))_0%,hsl(var(--accent-strong))_100%)] font-display text-base font-bold text-accent-foreground">
              WD
            </span>
            <div>
              <span className="block font-display text-lg font-semibold tracking-tight">
                {APP_NAME}
              </span>
              <span className="block text-xs text-muted-foreground">
                Analyze. Improve. Grow.
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SecondaryButton asChild className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </SecondaryButton>
            <PrimaryButton asChild>
              <Link href="/signup">Get Started</Link>
            </PrimaryButton>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
