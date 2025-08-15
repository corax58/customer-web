import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const SpecialFood = () => {
  const t = useTranslations("landing.special_food");
  return (
    <section className="w-full bg-[url('/assets/images/landing/special-bg.png')] bg-cover bg-center">
      <div className="flex h-full w-full justify-center bg-black/30">
        <div className="content-container flex gap-5 py-10 max-md:flex-col">
          <div className="flex h-full w-full flex-col justify-center gap-8 max-md:items-center md:w-1/2">
            <div className="flex w-full flex-col gap-3 text-white max-md:items-center max-md:text-center">
              <p className="text-primary">50% {t("off")}</p>
              <p className="text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
                {t("title")}
              </p>
              <p className="">
                The mouth-watering aroma of sizzling burgers now fills the
                streets thanks to the passionate pursuit of three brothers.
              </p>
              <p className="text-primary font-semibold">{t("limited_offer")}</p>
            </div>
            <Button className="w-fit text-base" size={"lg"}>
              {t("order_now")}
            </Button>
          </div>
          <div className="flex h-full justify-center px-10 md:w-1/2 md:py-10 xl:px-24">
            <div className="relative h-52 w-full max-md:w-80 lg:h-80">
              <Image
                src={"/assets/images/landing/special-offer.png"}
                fill
                alt="special food"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialFood;
