import { Skeleton } from "@/components/ui/skeleton";

const MenuItemDetailSkeleton = () => {
  return (
    // The main container matches the DialogContent's flex-col layout
    <div className="flex h-full flex-col">
      {/* Header Carousel Skeleton */}
      <Skeleton className="h-48 w-full shrink-0 rounded-b-none sm:h-56" />

      {/* Scrollable container for Display and Form */}
      <div className="flex-grow space-y-5 overflow-y-auto px-4 pt-4">
        {/* --- MenuItemDisplay Skeleton --- */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            {/* Left side: Badge, Title */}
            <div className="flex flex-col items-start gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-7 w-48" />
            </div>
            {/* Right side: Price */}
            <Skeleton className="h-8 w-20" />
          </div>
          {/* Cook time */}
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Description Section Skeleton */}
        <div className="space-y-3 pb-4">
          <Skeleton className="h-5 w-1/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Quantity Control Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-28" />
        </div>

        {/* Divider Skeleton */}
        <Skeleton className="h-px w-full" />

        {/* Add-ons Section Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/3" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-14 shrink-0 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Skeleton className="size-5 rounded-md" />
              </div>
            ))}
          </div>
        </div>


        <div className="bg-secondary !mt-8 space-y-4 border-t p-4">
          <div className="flex w-full flex-col gap-2">
            {/* Price breakdown */}
            <div className="flex justify-between text-sm">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Divider Skeleton */}
            <Skeleton className="my-1 h-px w-full" />

            {/* Total price */}
            <div className="mb-6 flex w-full justify-between">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/5" />
            </div>

            {/* Add to Cart Button */}
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailSkeleton;
