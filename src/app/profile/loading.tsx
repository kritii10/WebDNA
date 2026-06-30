import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Skeleton className="h-[24rem] rounded-[1.75rem]" />
        <Skeleton className="h-[24rem] rounded-[1.75rem]" />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Skeleton className="h-[28rem] rounded-[1.75rem]" />
        <Skeleton className="h-[28rem] rounded-[1.75rem]" />
      </section>
    </div>
  );
}
