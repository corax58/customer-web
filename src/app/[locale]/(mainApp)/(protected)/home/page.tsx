import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";

import Banner from "./_components/Banner";
import { BestSellingDishes } from "./_components/BestSellingDishes";
import { BestSellingDishesSkeleton } from "./_components/BestSellingDishesSkeleton";
import { Categories } from "./_components/Categories";
import { CategoriesSkeleton } from "./_components/CategoriesSkeleton";
import Offers from "./_components/Offers";
import { OffersSkeleton } from "./_components/OffersSkeleton";
import { PopularDishes } from "./_components/PopularDishes";
import { PopularDishesSkeleton } from "./_components/PopularDishesSkeleton";
import PopularRestaurants from "./_components/PopularRestaurants";
import PopularRestaurantsSkeleton from "./_components/PopularRestaurantsSkeleton";

export const metadata: Metadata = {
  title: "Home | Time delivery",
  description:
    "Find and order food from restaurants near you. Browse menus, view ratings, and enjoy fast delivery with Time-Delivery.",
};

interface HomePageProps {
  searchParams: Promise<{
    lat: string;
    lon: string;
  }>;
}
const HomePage = async ({ searchParams }: HomePageProps) => {
  const { lat, lon } = await searchParams;
  return (
    <div className="h-full min-h-dvh">
      <Header />
      <div className="flex flex-col items-center pt-36 pb-20 md:px-14 md:pt-36">
        <div className="container flex w-full flex-col justify-center gap-10">
          <div className="flex w-full flex-col gap-4">
            <Banner lat={lat} lon={lon} />
            <div className="flex flex-col gap-10 p-5 md:gap-14">
              <Suspense fallback={<CategoriesSkeleton />}>
                <Categories />
              </Suspense>
              <Suspense fallback={<PopularRestaurantsSkeleton />}>
                <PopularRestaurants lat={lat} lon={lon} />
              </Suspense>
              <Suspense fallback={<PopularDishesSkeleton />}>
                <PopularDishes lat={lat} lon={lon} />
              </Suspense>
              <Suspense fallback={<BestSellingDishesSkeleton />}>
                <BestSellingDishes lat={lat} lon={lon} />
              </Suspense>
              <Suspense fallback={<OffersSkeleton />}>
                <Offers lat={lon} lon={lon} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
