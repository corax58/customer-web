import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const Hero = () => {
  const t = useTranslations("landing.hero");
  return (
    <section className="relative h-dvh w-full">
      <Image
        fill
        src={"/assets/images/landing/banner.jpg"}
        alt={"hero section banner"}
        className="object-cover"
      />
      <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/85">
        <div className="content-container flex h-full w-full items-center justify-center gap-5 pt-20 pb-5 max-lg:flex-col">
          <div className="flex w-full flex-col text-white max-lg:text-center lg:w-1/2 xl:pr-20">
            <div className="mb-2 flex items-end gap-2 max-lg:justify-center">
              <p className="text-lg font-semibold">{t("subtitle")}</p>
              <div className="bg-primary mb-2 h-0.5 w-8"></div>
            </div>

            <h1 className="mb-4 text-2xl font-bold md:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              {t.rich("title", {
                span: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </h1>
            <p className="mb-8 font-semibold lg:mb-12 lg:text-lg">
              {t("description")}
            </p>
            <div className="mb-8 flex items-center gap-4 max-lg:justify-center lg:mb-12">
              <Button className="rounded-full" size={"lg"}>
                {t("order_now")}
              </Button>
              <Button
                className="text-primary border-primary rounded-full border bg-white hover:text-white"
                size={"lg"}
              >
                {t("contact_us")}
              </Button>
            </div>
          </div>
          <div className="flex h-full w-full items-center lg:w-1/2">
            <div className="relative h-full w-full">
              <Image
                fill
                src={"/assets/images/landing/heroimage.webp"}
                alt="banner image"
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
