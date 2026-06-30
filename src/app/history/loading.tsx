import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <Skeleton className="h-[40rem] rounded-[1.75rem]" />
    </div>
  );
}
