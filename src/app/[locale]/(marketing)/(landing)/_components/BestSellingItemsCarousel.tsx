import { getTranslations } from "next-intl/server";

import { getBestSellingDishes } from "@/actions/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import LandingDishCard from "../../../../../components/LandingDishCard";

import BestSellingItemsSkeleton from "./BestSellingItemsSkeleton";

interface BestSellingItemsCarouselProps {
  lat?: string;
  lon?: string;
}
const BestSellingItemsCarousel = async ({
  lat,
  lon,
}: BestSellingItemsCarouselProps) => {
  if (lat == undefined && lon == undefined) return <BestSellingItemsSkeleton />;
  const t = await getTranslations("landing.popular_items.best_selling_dishes");

  const latitude = lat == "none" ? "" : lat;
  const longitude = lon == "none" ? "" : lon;

  const { data: dishes } = await getBestSellingDishes(latitude, longitude);

  if (dishes && dishes.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex items-center justify-center gap-5 max-md:flex-col md:justify-between">
          <h2 className="text-foreground text-4xl font-bold">{t("title")}</h2>
          <div className="flex gap-4">
            <CarouselPrevious className="bg-primary dark:bg-primary static -top-0 size-14 -translate-y-0 border-0 text-white opacity-100" />
            <CarouselNext className="bg-primary dark:bg-primary static size-14 -translate-y-0 border-0 text-white opacity-100" />
          </div>
        </div>

        <CarouselContent className="overflow-visible">
          {dishes.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
            >
              <LandingDishCard menuItem={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
};

export default BestSellingItemsCarousel;
