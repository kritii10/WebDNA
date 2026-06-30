import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-white/10 bg-white/6 shadow-[0_20px_80px_-48px_rgba(8,145,178,0.85)] backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}
