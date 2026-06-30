import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function GradientBackground({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute left-[-12%] top-[-10%] h-72 w-72 rounded-full bg-sky-400/18 blur-3xl" />
      <div className="absolute right-[-8%] top-[18%] h-80 w-80 rounded-full bg-cyan-400/16 blur-3xl" />
      <div className="absolute bottom-[-18%] left-[28%] h-96 w-96 rounded-full bg-emerald-400/14 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_34%),linear-gradient(180deg,transparent,rgba(2,6,23,0.12))]" />
    </div>
  );
}
