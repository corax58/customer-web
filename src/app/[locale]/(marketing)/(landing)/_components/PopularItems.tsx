import { Suspense } from "react";

import BestSellingItemsCarousel from "./BestSellingItemsCarousel";
import BestSellingItemsSkeleton from "./BestSellingItemsSkeleton";
import { Categories } from "./Categories";
import { CategoriesSkeleton } from "./CategoriesSkeleton";
import PopularItemsCarousel from "./PopularItemsCarousel";
import PopularItemsCarouselSkeleton from "./PopularItemsCarouselSkeleton";

interface PopularItemsProps {
  lat?: string;
  lon?: string;
}
const PopularItems = async ({ lat, lon }: PopularItemsProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-20 px-4 py-20 md:px-16">
      <div className="container flex flex-col gap-20">
        <Suspense fallback={<PopularItemsCarouselSkeleton />}>
          <PopularItemsCarousel lat={lat} lon={lon} />
        </Suspense>
        <Suspense fallback={<BestSellingItemsSkeleton />}>
          <BestSellingItemsCarousel lat={lat} lon={lon} />
        </Suspense>
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </div>
    </div>
  );
};

export default PopularItems;
