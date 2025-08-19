import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const RestaurantAdsSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-40 w-full rounded-2xl md:w-1/4 md:rounded-l-none lg:w-full lg:rounded-l-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl max-md:hidden md:w-1/2 lg:w-full" />
      <Skeleton className="h-40 w-full rounded-2xl max-md:hidden md:w-1/4 md:rounded-r-none lg:w-full lg:rounded-r-2xl" />
    </div>
  );
};

export default RestaurantAdsSkeleton;
