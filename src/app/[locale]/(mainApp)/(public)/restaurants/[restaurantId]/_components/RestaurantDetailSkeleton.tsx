import FadingDivider from "@/components/FadingDivider";
import { Skeleton } from "@/components/ui/skeleton";

import { MenuListSkeleton } from "./MenuListSkeleton";

const RestaurantDetailSkeleton = () => {
  return (
    <div>
      {/* Banner Skeleton */}
      <div className="mx-auto mb-12 w-full lg:container lg:px-8">
        <div className="dark:bg-card relative h-72 w-full border sm:rounded-3xl sm:p-2">
          <Skeleton className="h-full w-full sm:rounded-2xl" />
          <div className="absolute -bottom-12 max-sm:flex max-sm:w-full max-sm:justify-center sm:left-12">
            <Skeleton className="size-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mx-auto sm:px-6 lg:container lg:px-8">
        {/* Header Skeleton */}
        <div className="max-md:px-4">
          <div className="flex w-full items-center justify-between gap-5 py-6 pt-3 max-lg:flex-col">
            {/* Left side: Title */}
            <div className="flex w-full items-center gap-2 lg:w-auto">
              <Skeleton className="h-9 w-48 max-sm:w-3/5" />
            </div>
            {/* Right side: Delivery Info */}
            <div className="flex w-full items-stretch justify-end gap-3 lg:w-auto lg:items-center lg:gap-7">
              {/* Delivery Fee Skeleton */}
              <div className="flex flex-col items-center justify-start gap-2 lg:items-end">
                <Skeleton className="h-4 w-16 max-sm:w-14" />
                <Skeleton className="h-5 w-12" />
              </div>
              {/* Divider */}
              <div className="flex h-16 w-fit max-w-px flex-1 items-center max-lg:h-auto">
                <div className="bg-border h-8 w-px" />
              </div>
              {/* Delivery Time Skeleton */}
              <div className="flex flex-col items-center justify-start gap-2 lg:items-end">
                <Skeleton className="h-4 w-28 max-sm:w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              {/* Divider */}
              <div className="flex h-16 w-fit max-w-px flex-1 items-center max-lg:h-auto">
                <div className="bg-border h-8 w-px" />
              </div>
              {/* Delivered By Skeleton */}
              <div className="flex flex-col items-center justify-start gap-2 lg:items-end">
                <Skeleton className="h-4 w-20 max-sm:w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
          <div className="flex">
            <FadingDivider className="to-border" />
            <FadingDivider className="from-border" />
          </div>
        </div>

        {/* Tabs and Content Skeleton */}
        <div className="flex w-full py-5 lg:flex-row lg:gap-10">
          {/* Desktop Tabs List Skeleton */}
          <div className="mb-6 hidden h-fit flex-col space-y-2 lg:flex lg:w-1/5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-2xl" />
            ))}
          </div>

          <div className="w-full lg:w-4/5">
            {/* Mobile Tabs List Skeleton */}
            <div className="grid w-full grid-cols-5 gap-2 lg:hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            {/* Content Skeleton */}
            <div className="mt-5 max-md:px-4 lg:mt-0">
              <MenuListSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailSkeleton;
