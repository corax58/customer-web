import { Suspense } from "react";

import MobileRestaurantFilter from "./_components/MobileRestaurantFilter";
import RestaurantFilter from "./_components/RestaurantFilter";
import RestaurantListSkeleton from "./_components/RestaurantListSkeleton";
import RestaurantsList from "./_components/RestaurantsList";

export const dynamic = "force-dynamic";

interface RestaurantPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const RestaurantsPage = async ({ searchParams }: RestaurantPageProps) => {
  const param = await searchParams;
  const key = JSON.stringify(param);

  return (
    <div className="flex min-h-dvh pt-36 pb-20 lg:pt-32">
      <div className="content-container flex gap-10 max-lg:flex-col">
        <div className="flex w-full max-lg:justify-between lg:w-1/4 lg:flex-col lg:gap-5">
          <h2 className="text-3xl font-semibold">Restaurants</h2>

          <RestaurantFilter className="bg-card h-fit space-y-6 rounded-xl border p-5 max-lg:hidden" />
          <MobileRestaurantFilter className="w-fit" />
        </div>
        <div className="w-full lg:w-3/4 lg:pt-14">
          <Suspense fallback={<RestaurantListSkeleton />}>
            <RestaurantsList key={key} params={param} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
