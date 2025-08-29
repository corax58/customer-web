import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDivider = () => <Skeleton className="h-[1px] w-full" />;

const OrderDetailSkeleton = () => {
  return (
    <div className="flex max-w-2xl animate-pulse flex-col gap-7">
      <SkeletonDivider />

      {/* Order Number Section */}
      <div className="bg-card flex items-center justify-between rounded-2xl border px-4 py-3">
        <div className="flex h-full flex-col justify-between gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <div className="bg-card flex w-full items-center gap-5 rounded-2xl border px-4 py-3">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <div className="w-full space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Restaurant & Tracking Section */}
      <div className="flex flex-col gap-7">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="size-6" />
        </div>
        <SkeletonDivider />
        <div className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Ordered Items Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="flex w-full items-center justify-between gap-5 px-4 py-1">
              <div className="flex flex-1 items-center gap-4">
                <Skeleton className="size-14 shrink-0 rounded-xl" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
              <Skeleton className="h-5 w-12" />
            </div>
            {i === 1 && (
              <div className="space-y-3 ps-8">
                <Skeleton className="h-4 w-20" />
                <div className="grid grid-cols-2 gap-x-4 ps-8 max-sm:grid-cols-1 max-sm:px-4">
                  <div className="flex items-center gap-3 py-1">
                    <Skeleton className="h-10 w-1 rounded-full" />
                    <div className="w-full space-y-1.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <Skeleton className="h-10 w-1 rounded-full" />
                    <div className="w-full space-y-1.5">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <SkeletonDivider />
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="bg-card flex w-full items-center justify-between gap-5 rounded-2xl border px-4 py-3">
          <div className="w-1/2 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="mb-6 space-y-4">
        <SkeletonDivider />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-12" />
        </div>
        <SkeletonDivider />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="pb-6">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
