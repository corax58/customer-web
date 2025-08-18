import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="group h-full w-full overflow-hidden p-0 shadow-none">
      <div className="h-full w-full">
        <div className="px-0 py-0">
          <div className="relative h-28 sm:h-40 lg:h-32 xl:h-48">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="relative p-2 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="mb-1 h-5 w-3/4 xl:h-6" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
