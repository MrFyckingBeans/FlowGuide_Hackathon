import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonManualCard() {
  return (
    <div className="space-y-4 p-4 rounded-lg border bg-card cursor-pointer transition-shadow">
      <div className="flex w-full space-x-4">
        {Array.from({ length: 1 }).map((_, index) => (
          <Skeleton key={index} className="w-24 h-24 rounded-md" />
        ))}
      </div>
      <div className="space-y-2 mt-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
