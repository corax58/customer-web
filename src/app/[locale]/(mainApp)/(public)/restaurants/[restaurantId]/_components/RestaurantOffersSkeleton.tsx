import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OffersCardSkeleton = () => {
  return (
    <Card className="w-full min-w-72 overflow-hidden rounded-lg border-2 border-dashed border-gray-200 p-0 dark:border-gray-700">
      <CardContent className="rounded-none p-0">
        <div className="flex">
          {/* Left Side Skeleton */}
          <Skeleton className="h-auto w-20 rounded-none border-e-2 border-dashed border-gray-200 dark:border-gray-700" />

          {/* Right Side Skeleton */}
          <div className="flex-1 p-4">
            <div className="flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  {/* Title Skeleton */}
                  <Skeleton className="h-5 w-3/4" />
                  {/* Restaurant Name Skeleton */}
                  <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Expiry Date Skeleton */}
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex items-center justify-between">
                {/* Minimum Order Skeleton */}
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RestaurantOffersSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <OffersCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default RestaurantOffersSkeleton;
