import React from "react";
import Image from "next/image";

import CustomImage from "@/components/CustomImage";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantBannerProps {
  restaurant: Restaurant;
}
const RestaurantBanner = ({ restaurant }: RestaurantBannerProps) => {
  return (
    <div className="mx-auto mb-12 w-full lg:container lg:px-8">
      <div className="dark:bg-card relative h-72 w-full border shadow-xl lg:rounded-3xl lg:p-2">
        <div className="relative h-full w-full overflow-hidden lg:rounded-2xl">
          <CustomImage
            title={restaurant.title + " banner"}
            imgUrl={restaurant.image_file}
            placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
            quality={100}
            priority
            fill
          />
        </div>

        <div className="absolute -bottom-12 max-lg:flex max-lg:w-full max-lg:justify-center lg:left-12">
          <div className="border-card relative size-24 overflow-hidden rounded-full border-4 shadow-xl">
            <CustomImage
              title={restaurant.title + " image"}
              imgUrl={restaurant.image_file}
              placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
              quality={100}
              priority
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
