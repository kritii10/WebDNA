import { cn } from "@/lib/utils";

export function Skeleton({
  className
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-[linear-gradient(90deg,rgba(148,163,184,0.18)_0%,rgba(148,163,184,0.3)_50%,rgba(148,163,184,0.18)_100%)] bg-[length:200%_100%]",
        className
      )}
    />
  );
}
