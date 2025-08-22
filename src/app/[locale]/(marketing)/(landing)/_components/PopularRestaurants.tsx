import { getTranslations } from "next-intl/server";

import { getTopRestaurants } from "@/actions/restaurants.actions";
import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";

import PopularRestaurantCard from "./PopularRestaurantCard";
import PopularRestaurantsSkeleton from "./PopularRestaurantsSkeleton";

interface PopularRestaurantsProps {
  lat?: string;
  lon?: string;
}
const PopularRestaurants = async ({ lat, lon }: PopularRestaurantsProps) => {
  const t = await getTranslations("landing.popular_restaurants");

  if (lat == undefined && lon == undefined)
    return <PopularRestaurantsSkeleton />;

  const latitude = lat == "none" ? "" : lat;
  const longitude = lon == "none" ? "" : lon;

  const { data: popularRestaurants } = await getTopRestaurants(
    latitude,
    longitude,
  );
  if (popularRestaurants && popularRestaurants.length > 0)
    return (
      <section className="relative w-full bg-[url('/assets/images/landing/popular-resturent-bg.webp')] bg-cover bg-center">
        <div className="flex w-full justify-center bg-black/60 py-20">
          <div className="content-container flex h-full w-full flex-col justify-center gap-16">
            <div className="flex w-full justify-center">
              <p className="text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
                {t("title")}
              </p>
            </div>
            <div className="grid h-full grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              {popularRestaurants.map((restaurant) => (
                <PopularRestaurantCard
                  restaurant={restaurant}
                  key={restaurant.id}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Button className="w-fit" asChild>
                <CustomLink href={"/restaurants"}>{t("view_all")}</CustomLink>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default PopularRestaurants;
