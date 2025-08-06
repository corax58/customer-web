"use client";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import { MapPin, Star } from "lucide-react";

import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBanner } from "@/hooks/useBanner";
import { cn } from "@/lib/utils";

interface BannerProps {
  lat?: string;
  lon?: string;
}

const Banner = ({ lat, lon }: BannerProps) => {
  const { data, error, isPending } = useBanner({ lat, lon });

  if (isPending || lat === undefined || lon === undefined) {
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
        <CarouselContent className="-ml-0 h-80">
          {data?.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "dark:bg-secondary rounded-xl border bg-white p-2 shadow",
                data.length > 1 && "lg:ml-4 lg:basis-1/2",
              )}
            >
              <Card className="flex h-full justify-end bg-gradient-to-r from-orange-500 to-orange-600 shadow-none max-md:rounded-none dark:from-orange-600 dark:to-orange-700">
                <CardContent className="flex h-full w-full pr-0 text-white max-md:flex-col-reverse max-md:px-2">
                  <div className="flex h-full justify-between md:w-1/2 md:flex-col md:px-8">
                    <div className="flex h-full flex-col justify-around gap-2">
                      <div className="flex h-full flex-col justify-around gap-2">
                        <h2 className="line-clamp-2 text-xl font-bold md:text-5xl">
                          {item.restaurant.name}
                        </h2>
                        <div className="flex w-fit items-center justify-center space-x-2 rounded-full bg-white/30 py-1 pr-3 text-xs md:p-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">
                            {item.restaurant.location}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-white" />
                            <span>4.5</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 flex gap-2">
                        {item.sample_item_images
                          .slice(0, 3)
                          .map((image, index) => (
                            <div key={index} className="relative size-10">
                              <Image
                                src={image}
                                alt={`${item.restaurant.name} sample item ${index}`}
                                fill
                                className="rounded-md object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex items-center text-sm max-md:items-end">
                      <Button
                        variant={"outline"}
                        className="hover:bg-primary rounded-full bg-white/20 p-4 hover:text-white"
                        asChild
                      >
                        <CustomLink href={`/restaurants/${item.restaurant.id}`}>
                          Order now
                        </CustomLink>
                      </Button>
                    </div>
                  </div>
                  <div className="md:rounded-r-0 relative h-full overflow-hidden rounded-xl bg-white md:w-1/2">
                    <Image
                      src={item.restaurant.image}
                      alt="banner image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-background bg-secondary ml-8 border" />
        <CarouselNext className="text-background bg-secondary mr-8 border" />
      </Carousel>
    );
};

export default Banner;
