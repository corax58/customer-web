import { Clock, DollarSign } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

const OfferCardSkeleton = () => {
  return (
    <div className={`relative mx-auto w-full`}>
      <div className="bg-card relative rounded-lg border-2 border-orange-500/30">
        {/* Top Header Section (Gradient look) */}
        <div className="from-primary text-primary-foreground relative rounded-t-md bg-gray-200 px-6 py-4 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            {/* Clock and Expiry Time */}
            <div className="text-muted-foreground flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Skeleton className="h-4 w-28 bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Discount Amount */}
            <div className="flex items-center gap-1 text-end text-xl font-bold">
              <Skeleton className="h-6 w-16 bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>

        {/* Divider Section with "Perforations" */}
        <div className="relative">
          <div
            className="absolute start-0 top-0 h-px w-full bg-gray-300 dark:bg-gray-600"
            // You can keep the dashed line style for better visual mapping, or use a solid color
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, currentColor 8px, currentColor 12px)",
              color: "var(--color-border)", // Or a gray shade
            }}
          />

          {/* Left "hole" */}
          <div className="bg-background border-background absolute -start-[18px] top-0 h-8 w-8 -translate-y-4 -rotate-45 transform rounded-full border-2 border-e-gray-300 border-b-gray-300 dark:border-e-gray-600 dark:border-b-gray-600" />

          {/* Right "hole" */}
          <div className="bg-background border-background absolute -end-[17px] top-0 h-8 w-8 -translate-y-4 -rotate-45 transform rounded-full border-2 border-s-gray-300 border-t-gray-300 dark:border-s-gray-600 dark:border-t-gray-600" />
        </div>

        {/* Bottom Details Section */}
        <div className="space-y-3 rounded-b-md p-4">
          {/* Offer Title */}
          <Skeleton className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600" />

          {/* Minimum Order */}
          <div className="text-muted-foreground flex items-center gap-3">
            <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <div className="text-sm">
              <Skeleton className="h-4 w-40 bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantOffersSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <OfferCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default RestaurantOffersSkeleton;
