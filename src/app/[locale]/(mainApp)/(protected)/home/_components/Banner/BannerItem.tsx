import Image from "next/image";

import { MapPin, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import CustomImage from "@/components/CustomImage";
import CustomLink from "@/components/CustomLink";
import MenuItemDetail from "@/components/MenuItemDetail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BannerDetail } from "@/types/home.types";

interface BannerItemProps {
  bannerDetail: BannerDetail;
}

const BannerItem = ({ bannerDetail }: BannerItemProps) => {
  const t = useTranslations("home.banners.dynamic");
  const formatter = useFormatter();
  return (
    <Card className="dark:border-secondary relative flex h-full justify-end overflow-hidden rounded-3xl border-8 border-white bg-gradient-to-r from-orange-500 to-orange-600 p-0 shadow-xl dark:from-orange-600 dark:to-orange-700">
      <div className="absolute inset-0 bg-[url('/assets/images/banner_background.webp')] bg-[size:100%_100%] bg-repeat rtl:-scale-x-100 rtl:transition-transform"></div>

      <CardContent className="z-10 flex h-full w-full flex-col-reverse justify-between gap-2 py-2 text-white max-md:px-4 md:flex-row md:py-6">
        <div className="flex h-full justify-between md:w-1/2 md:flex-col md:px-8">
          <div className="flex h-full flex-col justify-around gap-2 md:gap-4">
            <div className="flex h-full flex-col justify-around gap-2">
              <h2
                className={cn(
                  "font-sigmar line-clamp-2 text-xl font-bold md:-rotate-6 md:text-5xl",
                  bannerDetail.restaurant.name.length > 6 && "md:text-4xl",
                )}
              >
                {bannerDetail.restaurant.name}
              </h2>

              {bannerDetail.item && (
                <MenuItemDetail menuItemId={bannerDetail.item.id.toString()}>
                  <div className="relative mb-2 size-10 overflow-hidden rounded-full border-2 border-white md:size-12 lg:size-14 xl:size-16">
                    <CustomImage
                      imgUrl={bannerDetail.item.image}
                      title={bannerDetail.item.name}
                      placeholderImage={PLACEHOLDER_IMAGES.FOOD_ITEM}
                    />
                  </div>
                </MenuItemDetail>
              )}
              <div className="flex h-min flex-col gap-2 text-sm md:hidden">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-white" />
                    <span>
                      {formatter.number(bannerDetail.restaurant.average_rating)}
                      (
                      {formatter.number(bannerDetail.restaurant.average_rating)}
                      )
                    </span>
                  </div>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-full text-sm font-semibold">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-2 text-sm">
                    {bannerDetail.restaurant.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 max-md:flex-col max-md:justify-end md:items-end md:gap-5">
            <div className="hidden h-full flex-col justify-between gap-2 text-sm md:flex">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-white" />
                  <span>
                    {formatter.number(bannerDetail.restaurant.average_rating)}(
                    {formatter.number(bannerDetail.restaurant.average_rating)})
                  </span>
                </div>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full text-sm font-semibold">
                <MapPin className="h-4 min-h-4 w-4 min-w-4" />
                <span className="line-clamp-2 text-sm">
                  {bannerDetail.restaurant.location}
                </span>
              </div>
            </div>
            <Button
              variant={"outline"}
              className="text-primary dark:hover:text-primary border-primary rounded-full bg-white p-4 dark:bg-white dark:hover:bg-white"
              asChild
            >
              <CustomLink href={`/restaurants/${bannerDetail.restaurant.id}`}>
                {t("order_now")}
              </CustomLink>
            </Button>
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center md:w-fit">
          <div className="relative overflow-hidden rounded-xl border-4 border-white/10 bg-white max-md:h-full max-md:w-full md:aspect-square md:size-52 md:rounded-full lg:size-44 lg:border-8 xl:size-52">
            <Image
              src={bannerDetail.restaurant.image}
              alt="banner image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerItem;
