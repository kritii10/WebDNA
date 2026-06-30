"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Orbit, ShieldCheck, Sparkles } from "lucide-react";

import { authHighlights } from "@/data/public-site";

const icons = [Sparkles, ArrowUpRight, ShieldCheck] as const;

type AuthShowcaseProps = {
  title: string;
  description: string;
};

export function AuthShowcase({ title, description }: AuthShowcaseProps) {
  return (
    <div className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,47,73,0.96)_0%,rgba(14,116,144,0.9)_45%,rgba(15,23,42,0.98)_100%)]" />
      <div className="surface-grid absolute inset-0 opacity-30" />
      <motion.div
        animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
        className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-sky-400/16 blur-3xl"
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
        className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-emerald-400/14 blur-3xl"
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative z-10 flex items-center gap-3 px-10 py-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-white/10 font-display text-lg font-bold text-white">
          WD
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-white">WebDNA</p>
          <p className="text-sm text-white/70">Analyze. Improve. Grow.</p>
        </div>
      </div>
      <div className="relative z-10 px-10 pb-14">
        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <Orbit className="size-4" />
            Premium website intelligence
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/74">
            {description}
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {authHighlights.map((highlight, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={highlight}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel flex items-start gap-4 rounded-[1.5rem] border border-white/10 p-5"
                initial={{ opacity: 0, y: 18 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="rounded-full bg-white/10 p-2 text-white">
                  <Icon className="size-4" />
                </div>
                <p className="text-sm leading-6 text-white/82">{highlight}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
