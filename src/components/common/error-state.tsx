import { AlertTriangle, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";

import { SecondaryButton } from "@/components/common/secondary-button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  icon?: ReactNode;
};

export function ErrorState({
  title = "Unable to load data",
  description,
  actionLabel = "Try again",
  onAction,
  className,
  icon
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-60 flex-col items-center justify-center rounded-[1.75rem] border border-rose-500/20 bg-rose-500/5 px-6 text-center",
        className
      )}
    >
      <div className="mb-4 rounded-full border border-rose-400/20 bg-rose-400/10 p-3 text-rose-300">
        {icon ?? <AlertTriangle className="size-5" />}
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {onAction ? (
        <SecondaryButton className="mt-5" onClick={onAction}>
          <RefreshCcw className="size-4" />
          {actionLabel}
        </SecondaryButton>
      ) : null}
    </div>
  );
}
