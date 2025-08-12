import { SearchX } from "lucide-react";

import { getRestaurants } from "@/actions/restaurants.actions";
import RestaurantCard from "@/components/RestaurantCard";
import { buildUrlSearchParams, isRestaurantOpenNow } from "@/lib/utils";

import RestaurantListSkeleton from "./RestaurantListSkeleton";
import RestaurantPagination from "./RestaurantPagination";

interface RestaurantListProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
  searchString?: string;
}
const RestaurantsList = async ({
  params,
  searchString,
}: RestaurantListProps) => {
  const lat = params["lat"];
  const lon = params["lon"];
  const personalized = params["personalized"];

  if (personalized === undefined) {
    return <RestaurantListSkeleton />;
  }

  if (lat == "none" && lon === "none") {
    delete params.lat;
    delete params.lon;
  }
  const queryParams = buildUrlSearchParams(params).toString();

  const {
    data: restaurants,
    pageData,
    error,
  } = await getRestaurants(queryParams);

  if (error) {
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">Something went wrong</p>
      </div>
    );
  }

  if (restaurants && restaurants.length == 0)
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">No Results</p>
      </div>
    );

  if (restaurants && restaurants?.length > 0)
    return (
      <div className="flex w-full flex-col gap-5">
        {searchString && (
          <div className="font-semibold">
            Results for &apos; {searchString} &apos;{" "}
            <span className="text-muted-foreground">
              ({pageData?.totalCount})
            </span>
          </div>
        )}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => {
            const isOpen = isRestaurantOpenNow(restaurant.availability);

            return (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isOpen={isOpen}
              />
            );
          })}
        </div>
        {pageData && <RestaurantPagination pageData={pageData} />}
      </div>
    );
};

export default RestaurantsList;
