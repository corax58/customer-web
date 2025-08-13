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
          {/* Placeholder for "See All" */}
          <div className="flex gap-2">
            <div className="bg-secondary size-8 rounded-md" />{" "}
            {/* Prev button */}
            <div className="bg-secondary size-8 rounded-md" />{" "}
            {/* Next button */}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div className="-ml-4 flex">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <CategoryCardSkeleton />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
