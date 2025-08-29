import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import OffersCardSkeleton from "./OffersCardSkeleton";

export const OffersSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex w-full items-center justify-between gap-5">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="hidden h-6 w-16 sm:block" />
          <div className="flex gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
      </div>

      <Carousel>
        <CarouselContent className="-ms-4 overflow-visible">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="ps-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <OffersCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
