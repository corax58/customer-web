import { Skeleton } from "@/components/ui/skeleton";

const MenuItemCardSkeleton = () => {
  return (
    <div className="relative flex h-60 w-full items-end">
      {/* The background card */}
      <div className="bg-card flex h-48 w-full flex-col justify-between rounded-3xl border p-4 max-sm:p-5 sm:min-w-72">
        {/* Skeleton for Price (top-right) */}
        <div className="flex w-full justify-end">
          <Skeleton className="h-7 w-16" />
        </div>

        <div className="space-y-2">
          {/* Skeleton for Title (two lines) */}
          <div className="flex h-14 w-full items-center">
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="flex w-full justify-between gap-1.5">
            {/* Skeleton for Rating and Time */}
            <Skeleton className="h-6 w-1/2" />
            {/* Skeleton for Add Button */}
            <Skeleton className="size-10 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="absolute start-5 top-0 h-28 w-36 overflow-hidden rounded-3xl shadow-lg sm:w-44">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

export default MenuItemCardSkeleton;
