"use client";

import { motion } from "framer-motion";

type CircularScoreProps = {
  label: string;
  score: number;
};

export function CircularScore({ label, score }: CircularScoreProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
      <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
        <circle
          className="stroke-border/60"
          cx="60"
          cy="60"
          fill="transparent"
          r={radius}
          strokeWidth="10"
        />
        <motion.circle
          animate={{ strokeDashoffset: offset }}
          cx="60"
          cy="60"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth="10"
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="-mt-20 text-center">
        <p className="font-display text-3xl font-semibold">{score}</p>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
