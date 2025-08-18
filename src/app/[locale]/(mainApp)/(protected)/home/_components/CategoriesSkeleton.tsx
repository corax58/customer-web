import CategoryCardSkeleton from "@/components/CategoryCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="space-y-5">
      {/* Skeleton for the header */}
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-4">
          <div className="bg-muted h-6 w-16 rounded-md" />{" "}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
