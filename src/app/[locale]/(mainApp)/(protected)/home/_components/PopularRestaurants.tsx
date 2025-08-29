import { getTranslations } from "next-intl/server";

import { getTopRestaurants } from "@/actions/restaurants.actions";
import CustomLink from "@/components/CustomLink";
import RestaurantCard from "@/components/RestaurantCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PopularRestaurantsSkeleton from "./PopularRestaurantsSkeleton";

interface PopularRestaurantsProps {
  lat?: string;
  lon?: string;
  personalized?: string;
}

const PopularRestaurants = async ({
  personalized,
}: PopularRestaurantsProps) => {
  if (personalized === undefined) {
    return <PopularRestaurantsSkeleton />;
  }
  const t = await getTranslations("home.popular_restaurants");

  const { data: restaurants } = await getTopRestaurants();

  if (restaurants && restaurants.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold md:mb-2 md:text-3xl">
            {t("title")}
          </h2>

          <div className="flex items-center gap-4">
            <CustomLink
              href="/restaurants"
              className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
            >
              {t("see_all")}
            </CustomLink>
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ms-4 overflow-visible">
          {restaurants?.map((restaurant) => {
            // const isOpen = isRestaurantOpenNow(restaurant.availability);

            return (
              <CarouselItem
                key={restaurant.id}
                className="ps-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <RestaurantCard restaurant={restaurant} isOpen={true} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    );
};

export default PopularRestaurants;
