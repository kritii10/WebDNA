import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-1">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
