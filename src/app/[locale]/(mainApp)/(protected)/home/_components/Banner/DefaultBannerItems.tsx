import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";

const defaultBanners = [
  {
    id: 1,
    title: "Delicious Food, Fast Delivery",
    subtitle: "Get Orders In a Minutes",
    button: "Try Time Now!",
    key: "banner_1",
    img: "/assets/images/defaultBanner3.webp",
  },
  {
    id: 2,
    title: "Fast Bites, Faster Orders",
    subtitle: "Up to 3 Orders In time.",
    button: "Order Now!",
    key: "banner_1",
    img: "/assets/images/defaultBanner2.webp",
  },
  {
    id: 3,
    title: "Fast Bites, Faster Orders",
    subtitle: "Up to 3 Orders In time.",
    button: "Order Now!",
    key: "banner_1",
    img: "/assets/images/defaultBanner1.webp",
  },
];

interface DefaultBannerItemsProps {
  currentBanners: number;
}
const calculateVisibleBanner = (currentBanners: number) => {
  if (currentBanners == 0) {
    return 3;
  }
  if (currentBanners == 1) {
    return 1;
  }
  if (currentBanners > 1) {
    return 0;
  }
};
const DefaultBannerItems = ({ currentBanners }: DefaultBannerItemsProps) => {
  const t = useTranslations("home.banners.static");
  return defaultBanners

    .slice(0, calculateVisibleBanner(currentBanners))
    .map((banner) => (
      <CarouselItem key={banner.id} className={"lg:basis-1/2"}>
        <div className="dark:border-secondary relative flex h-full overflow-hidden rounded-3xl border-8 border-white p-0 shadow-xl">
          <div className="absolute h-full w-full">
            <Image
              src={banner.img}
              alt={`default banner ${1}`}
              fill
              className="max-md:object-cover rtl:-scale-x-100 rtl:transition-transform"
            />
          </div>
          <div className="absolute flex h-full w-2/3 flex-col justify-between py-8 ps-6 md:w-1/2 md:py-8 md:ps-12">
            <div className="flex flex-col gap-2">
              <p className="font-sigmar text-2xl text-white md:text-3xl">
                {t(`${banner.key}.title`)}
              </p>
              <p className="text-lg font-medium text-white">
                {t(`${banner.key}.subtitle`)}
              </p>
            </div>
            <Button
              className="w-min bg-white text-black hover:text-white"
              asChild
            >
              <CustomLink href={`/restaurants`}>
                {t(`${banner.key}.button`)}
              </CustomLink>
            </Button>
          </div>
        </div>
      </CarouselItem>
    ));
};

export default DefaultBannerItems;
