import { Card, CardContent } from "@/components/ui/card";

const RestaurantCardSkeleton = () => {
  return (
    <Card className="group animate-pulse overflow-hidden border p-0 shadow-none backdrop-blur-sm transition-all duration-300">
      <CardContent className="p-2 py-3">
        <div className="flex max-md:flex-col">
          {/* Image Placeholder */}
          <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-xl bg-gray-200 md:aspect-square md:w-2/5 dark:bg-gray-700">
            {/* Heart Button Placeholder */}
            <div className="absolute end-2 top-2 h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Text Content Placeholder */}
          <div className="flex w-full flex-col justify-between ps-2 md:col-span-2">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex w-full flex-col gap-2">
                {/* Title Placeholder */}
                <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                {/* Location Placeholder */}
                <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                {/* Description Placeholder */}
                <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-11/12 rounded-md bg-gray-200 dark:bg-gray-700"></div>

                {/* Rating and Delivery Time Placeholders */}
                <div className="mt-2 flex items-center gap-6 text-sm">
                  {/* Rating Placeholder */}
                  <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  {/* Delivery Time Placeholder */}
                  <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>

            {/* Price and Button Placeholders */}
            <div className="mt-4 flex w-full items-center justify-between">
              {/* Price Tag Placeholder */}
              <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              {/* Button Placeholder */}
              <div className="h-10 w-28 rounded-xl bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RestaurantsListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <RestaurantCardSkeleton key={index} />
      ))}
    </div>
  );
}
