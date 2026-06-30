"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-card/60 p-8 text-center shadow-[0_24px_90px_-42px_rgba(14,165,233,0.4)] backdrop-blur-xl sm:p-12">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-sky-400/12 text-sky-300"
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Compass className="size-10" />
        </motion.div>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.26em] text-sky-300">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          This route drifted out of the crawl map
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          The page you were looking for could not be found. Head back to the dashboard or return to the public WebDNA site.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PrimaryButton asChild>
            <Link href="/dashboard">Back Dashboard</Link>
          </PrimaryButton>
          <SecondaryButton asChild>
            <Link href="/">Back Home</Link>
          </SecondaryButton>
        </div>
      </div>
    </main>
  );
}
