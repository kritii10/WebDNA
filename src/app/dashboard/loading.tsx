import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-44 w-full rounded-[1.75rem]" />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[24rem] w-full rounded-[1.75rem]" />
        ))}
      </div>
    </div>
  );
}
