"use client";
import React, { useState } from "react";
import Image from "next/image";

import CustomLink from "@/components/CustomLink";
import { CarouselItem } from "@/components/ui/carousel";
import { RestaurantAd } from "@/types/home.types";
interface RestaurantAdItemProps {
  ad: RestaurantAd;
}
const RestaurantAdItem = ({ ad }: RestaurantAdItemProps) => {
  const [error, setError] = useState(false);

  if (!error)
    return (
      <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
        <CustomLink href={`/restaurants/${ad.model_id}`}>
          <div className="relative h-40 w-full overflow-hidden rounded-2xl">
            <Image
              src={ad.url}
              alt={ad.key}
              fill
              className="object-cover"
              onError={() => setError(true)}
            />
          </div>
        </CustomLink>
      </CarouselItem>
    );
};

export default RestaurantAdItem;
