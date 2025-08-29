import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LandingDishCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border p-0 shadow-none">
      <CardContent className="p-0">
        <div className="relative">
          {/* Image Skeleton */}
          <Skeleton className="h-40 w-full rounded-t-lg" />

          {/* Rating Skeleton */}
          <Skeleton className="absolute start-2 bottom-2 h-5 w-12 rounded-full" />
        </div>

        <div className="space-y-3 px-4 py-2">
          {/* Title and Badge Skeleton */}
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-1/5" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Price and Button Skeleton */}
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-7 w-1/3" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
