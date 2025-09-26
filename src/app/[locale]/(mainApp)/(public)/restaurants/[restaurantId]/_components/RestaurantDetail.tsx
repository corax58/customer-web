import { Suspense } from "react";

import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getRestaurantDetails } from "@/actions/restaurants.actions";
import FadingDivider from "@/components/FadingDivider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isRestaurantOpenNow } from "@/lib/utils";

import MenuList from "./MenuList";
import { MenuListSkeleton } from "./MenuListSkeleton";
import RestaurantBanner from "./RestaurantBanner";
import RestaurantDetailError from "./RestaurantDetailError";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantOffers from "./RestaurantOffers";
import RestaurantOffersSkeleton from "./RestaurantOffersSkeleton";
import RestaurantPhotos from "./RestaurantPhotos";
import RestaurantReviews from "./RestaurantReviews";
import RestaurantReviewsSkeleton from "./RestaurantReviewsSkeleton";
import TopRatedItems from "./TopRatedItems";
import { TopRatedItemsSkeleton } from "./TopRatedItemsSkeleton";

interface RestaurantDetailProps {
  restaurantId: string;
  lat: string;
  lon: string;
}

const RestaurantDetail = async ({
  restaurantId,
  lat,
  lon,
}: RestaurantDetailProps) => {
  const { data: restaurant, error } = await getRestaurantDetails(
    restaurantId,
    lat,
    lon,
  );

  const t = await getTranslations("restaurants.restaurant_details.tabs");

  const tabs = [
    {
      title: t("top.full"),
      value: "top",
      display: (
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 max-md:hidden" />
          <span className="md:hidden">{t("top.short")}</span>
          <span className="max-md:hidden">{t("top.full")}</span>
        </div>
      ),
    },
    {
      title: t("menu"),
      value: "menu",
    },
    {
      title: t("reviews"),
      value: "reviews",
    },
    {
      title: t("photos"),
      value: "photos",
    },
    {
      title: t("info"),
      value: "info",
    },
    {
      title: t("offers"),
      value: "offers",
    },
  ];

  if (error) return <RestaurantDetailError />;
  if (restaurant) {
    const isOpen = isRestaurantOpenNow(restaurant.availability);

    return (
      <div className="lg:container lg:mx-auto lg:px-10 xl:px-14">
        <RestaurantBanner restaurant={restaurant} />
        <div className="mx-auto sm:px-6 lg:px-8">
          <RestaurantHeader
            className="max-md:px-4"
            restaurant={restaurant}
            isOpen={isOpen}
          />
          <Tabs
            defaultValue={"top"}
            className="flex w-full py-5 lg:flex-row lg:gap-10 lg:rtl:flex-row-reverse"
          >
            <TabsList className="lg:bg-background text-muted-foreground mb-6 grid h-fit w-full grid-cols-5 max-md:rounded-none lg:flex lg:w-1/5 lg:flex-col lg:gap-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="lg:data-[state=active]:bg-secondary lg:data-[state=inactive]:text-muted-foreground data-[state=active]:text-foreground w-full p-3 font-semibold lg:flex lg:justify-start lg:rounded-2xl lg:data-[state=active]:shadow-none lg:rtl:justify-end"
                >
                  {tab.display || tab.title}
                </TabsTrigger>
              ))}
              <FadingDivider className="max-lg:hidden" />
            </TabsList>
            <div className="max-md:px-4">
              <TabsContent value="top" className="space-y-6">
                <Suspense fallback={<TopRatedItemsSkeleton />}>
                  <TopRatedItems restaurantId={restaurantId} isOpen={isOpen} />
                </Suspense>
              </TabsContent>

              <TabsContent value="menu" className="space-y-6">
                <Suspense fallback={<MenuListSkeleton />}>
                  <MenuList restaurantId={restaurantId} isOpen={isOpen} />
                </Suspense>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Suspense fallback={<RestaurantReviewsSkeleton />}>
                  <RestaurantReviews restaurantId={restaurant.id.toString()} />
                </Suspense>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <RestaurantPhotos restaurant={restaurant} />
              </TabsContent>

              <TabsContent value="info" className="space-y-6">
                <RestaurantInfo restaurant={restaurant} />
              </TabsContent>
              <TabsContent value="offers" className="space-y-6">
                <Suspense fallback={<RestaurantOffersSkeleton />}>
                  <RestaurantOffers restaurantId={restaurant.id.toString()} />
                </Suspense>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
};

export default RestaurantDetail;
