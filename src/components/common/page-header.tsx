import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHeader({
  className,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-400">
          Website Intelligence Platform
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}
