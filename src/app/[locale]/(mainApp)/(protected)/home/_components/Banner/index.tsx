"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBanner } from "@/hooks/useBanner";
import { cn } from "@/lib/utils";

import BannerItem from "./BannerItem";
import DefaultBannerItems from "./DefaultBannerItems";

interface BannerProps {
  lat?: string;
  lon?: string;
}

const Banner = ({ lat, lon }: BannerProps) => {
  const { data, isPending } = useBanner({ lat, lon });

  if (isPending) {
    return (
      <div className="flex h-80 w-full gap-4 p-4">
        <div className="bg-accent h-full w-full animate-pulse rounded-xl" />
        <div className="bg-accent h-full w-full animate-pulse rounded-xl max-lg:hidden" />
      </div>
    );
  }

  return (
    <Carousel
      className="w-full"
      plugins={[Autoplay({ delay: 10000, stopOnInteraction: true })]}
      opts={{ loop: true, align: "start" }}
    >
      <CarouselContent className="-ml-4 h-80 pb-10">
        {data?.map((item, index) => (
          <CarouselItem key={index} className={cn("lg:basis-1/2")}>
            <BannerItem bannerDetail={item} />
          </CarouselItem>
        ))}
        <DefaultBannerItems currentBanners={data ? data.length : 0} />
      </CarouselContent>
      <CarouselPrevious className="bg-secondary dark:bg-secondary ml-12 border max-md:opacity-60 md:ml-8" />
      <CarouselNext className="bg-secondary dark:bg-secondary mr-12 border max-md:opacity-60 md:mr-8" />
      <CarouselDots />
    </Carousel>
  );
};

export default Banner;
