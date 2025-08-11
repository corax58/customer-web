"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBanner } from "@/hooks/useBanner";
import { cn } from "@/lib/utils";

import BannerItem from "./BannerItem";

interface BannerProps {
  lat?: string;
  lon?: string;
}

const Banner = ({ lat, lon }: BannerProps) => {
  const { data, error, isPending } = useBanner({ lat, lon });

  if (isPending) {
    return (
      <div className="flex h-80 w-full gap-4 p-4">
        <div className="bg-accent h-full w-full animate-pulse rounded-xl" />
        <div className="bg-accent h-full w-full animate-pulse rounded-xl max-lg:hidden" />
      </div>
    );
  }
  if (error) {
    return;
  }
  if (data && data.length > 0)
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
          {data?.map((item, index) => (
            <CarouselItem key={index} className={cn("lg:basis-1/2")}>
              <BannerItem bannerDetail={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-background bg-secondary ml-8 overflow-visible border" />
        <CarouselNext className="text-background bg-secondary mr-8 border" />
      </Carousel>
    );
};

export default Banner;
