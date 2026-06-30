import { Skeleton } from "@/components/ui/skeleton";

export default function ReportLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Skeleton className="h-[26rem] rounded-[1.75rem]" />
        <Skeleton className="h-[26rem] rounded-[1.75rem]" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Skeleton className="h-[22rem] rounded-[1.75rem]" />
        <Skeleton className="h-[22rem] rounded-[1.75rem]" />
      </div>
    </div>
  );
}
