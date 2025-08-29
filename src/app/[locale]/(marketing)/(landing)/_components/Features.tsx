import Image from "next/image";

import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import { cn } from "@/lib/utils";

export const features = [
  {
    img: "/assets/images/landing/burger.png",
    nextIntlKey: "feature1",
    title: "Best Quality Food",
    description:
      "Our food is made from fresh ingredients and prepared by experienced chefs.",
  },
  {
    img: "/assets/images/landing/delivery.png",
    nextIntlKey: "feature2",
    title: "Faster Delivery",
    description:
      "We deliver your food within 30 minutes to ensure it reaches you hot and fresh.",
  },
  {
    img: "/assets/images/landing/cake.png",
    nextIntlKey: "feature3",
    title: "Real Taste",
    description:
      "Experience authentic flavors that will make you crave for more.",
  },
  {
    img: "/assets/images/landing/support.png",
    nextIntlKey: "feature4",
    title: "Support 24/7",
    description: "Our customer support team is available 24/7 to assist you.",
  },
];

const Features = () => {
  const t = useTranslations("landing.features");
  return (
    <div className="bg-secondary flex w-full flex-col items-center justify-center overflow-hidden py-16 pb-20 md:py-28 md:pb-32 lg:pb-40">
      <div className="content-container flex flex-col items-center justify-center gap-24 md:gap-48">
        <div className="flex w-full justify-evenly gap-8 max-lg:flex-col max-lg:items-center max-lg:justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "bg-card dark:border-border relative z-10 flex h-fit w-full max-w-sm flex-col items-center justify-center gap-3 rounded-se-4xl rounded-es-4xl border p-3 md:gap-5 md:p-4 lg:max-w-none xl:p-8",
                index == 1 && "flex-col-reverse lg:mt-10",
                index == 3 && "flex-col-reverse lg:mt-10",
              )}
            >
              <Image
                src={feature.img || "/placeholder.svg"}
                alt={feature.title}
                width={80}
                height={80}
                className="md:h-[100px] md:w-[100px]"
              />
              <div className="dark:text-foreground flex flex-col items-center justify-center gap-2 px-2 text-center text-gray-800 md:px-3 xl:px-10">
                <p className="text-lg font-bold md:text-xl">
                  {t(`${feature.nextIntlKey}.title`)}
                </p>
                <p className="dark:text-muted-foreground text-sm md:text-base">
                  {t(`${feature.nextIntlKey}.description`)}
                </p>
              </div>
              <div className="absolute -top-4 flex w-full justify-center">
                <div className="before:conten-[' '] border-card before:bg-card size-8 rounded-full border-8 bg-gray-800 before:absolute before:z-0 before:h-40 before:w-1 before:translate-x-1.5 before:-translate-y-full before:max-lg:hidden rtl:before:-translate-x-1.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-auto min-h-72 w-full flex-col overflow-visible rounded-se-4xl rounded-es-4xl bg-gradient-to-r from-orange-500 to-orange-600 max-sm:gap-10 md:h-96 md:flex-row">
          <div className="order-2 flex h-full w-full flex-col justify-center gap-6 p-6 max-md:items-center md:order-1 md:w-1/2 md:gap-10 md:ps-10">
            <div className="text-center text-2xl font-bold text-white md:text-start md:text-3xl lg:text-5xl">
              {t("app_promo")}
            </div>
            <div className="flex w-full max-w-md justify-center gap-3 md:justify-start md:gap-5">
              <CustomLink href={"#"} className="w-full">
                <div className="relative aspect-[3/1] w-full">
                  <Image
                    src={"/assets/images/landing/store1.webp"}
                    alt="playstore icon"
                    className="cursor-pointer md:h-[100px] md:w-[180px]"
                    fill
                  />
                </div>
              </CustomLink>
              <CustomLink href={"#"} className="w-full">
                <div className="relative aspect-[3/1] w-full">
                  <Image
                    src={"/assets/images/landing/store2.png"}
                    alt="playstore icon"
                    className="cursor-pointer md:h-[100px] md:w-[180px]"
                    fill
                  />
                </div>
              </CustomLink>
            </div>
          </div>
          <div className="order-1 flex h-48 w-full items-center justify-center py-4 md:order-2 md:h-full md:w-1/2 md:py-0">
            <div className="relative w-32 md:w-48 xl:w-72">
              <Image
                src={"/assets/images/landing/app-phone.webp"}
                alt="mobile screenshot"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
