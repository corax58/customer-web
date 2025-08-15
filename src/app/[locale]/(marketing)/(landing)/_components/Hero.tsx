import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

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
      <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/60">
        <div className="content-container flex h-full w-full items-center justify-center gap-5 pt-20 pb-5 max-lg:flex-col">
          <div className="flex w-full flex-col gap-4 text-white max-lg:text-center lg:w-1/2">
            <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
              {t.rich("title", {
                span: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </h1>
            <p className="font-semibold lg:text-lg">{t("description")}</p>
          </div>
          <div className="flex h-full w-full items-center lg:w-1/2 lg:py-28">
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
