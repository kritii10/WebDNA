import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-60 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border/70 bg-card/50 px-6 text-center",
        className
      )}
    >
      <div className="mb-4 rounded-full border border-sky-400/20 bg-sky-400/10 p-3 text-sky-300">
        <Sparkles className="size-5" />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
