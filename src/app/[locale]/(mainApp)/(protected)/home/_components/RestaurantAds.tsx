"use client";

import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { useRestaurantAds } from "@/hooks/useAds";

import RestaurantAdItem from "./RestaurantAdItem";
import RestaurantAdsSkeleton from "./RestaurantAdsSkeleton";

interface RestaurantAdsProps {
  personalized?: string;
}

const RestaurantAds = ({ personalized }: RestaurantAdsProps) => {
  const { data: ads, isPending } = useRestaurantAds();

  if (personalized === undefined || isPending) {
    return <RestaurantAdsSkeleton />;
  }

  if (ads && ads.length > 0)
    return (
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        className="space-y-5 overflow-visible"
      >
        <CarouselContent className="-ml-4 overflow-visible">
          {ads?.map((ad, index) => <RestaurantAdItem key={index} ad={ad} />)}
        </CarouselContent>
      </Carousel>
    );
};

export default RestaurantAds;
