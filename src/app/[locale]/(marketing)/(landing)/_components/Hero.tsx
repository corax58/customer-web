import React from "react";
import Image from "next/image";

import { Star } from "lucide-react";
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
              <p className="text-lg font-semibold">Hot & Fresh Delivery.</p>
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
                Order Now
              </Button>
              <Button
                className="text-primary border-primary rounded-full border bg-white hover:text-white"
                size={"lg"}
              >
                Contact Us
              </Button>
            </div>
            <div className="flex items-center gap-3 max-lg:justify-center">
              <div className="flex">
                <div className="overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={"/assets/images/landing/customer.jpeg"}
                    alt="customer image"
                    width={40}
                    height={40}
                    className="aspect-square size-10 object-cover"
                  />
                </div>
                <div className="-ml-4 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={"/assets/images/landing/customer-2.jpg"}
                    alt="customer image"
                    width={40}
                    height={40}
                    className="aspect-square size-10 object-cover"
                  />
                </div>
                <div className="-ml-4 min-w-10 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={"/assets/images/landing/customer-3.jpg"}
                    alt="customer image"
                    width={40}
                    height={40}
                    className="aspect-square size-10 object-cover"
                  />
                </div>
              </div>

              <div className="text-sm">
                <p className="text-nowrap">Our Happy Customers</p>
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  4.9
                  <span className="text-muted-foreground"> (12k Reviews)</span>
                </div>
              </div>
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
