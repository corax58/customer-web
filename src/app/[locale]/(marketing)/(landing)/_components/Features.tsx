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
    <div className="bg-secondary flex w-full flex-col items-center justify-center overflow-hidden py-28 pb-32">
      <div className="content-container flex flex-col items-center justify-center gap-48">
        <div className="flex w-full justify-evenly gap-8 max-lg:flex-col max-lg:justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "bg-card dark:border-border relative flex h-fit flex-col items-center justify-center gap-5 rounded-tr-4xl rounded-bl-4xl border p-4 xl:p-8",
                index == 1 && "mt-10 flex-col-reverse",
                index == 3 && "mt-10 flex-col-reverse",
              )}
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={100}
                height={100}
              />
              <div className="dark:text-foreground flex flex-col items-center justify-center gap-2 px-3 text-center text-gray-800 xl:px-10">
                <p className="text-xl font-bold">
                  {t(`${feature.nextIntlKey}.title`)}
                </p>
                <p className="dark:text-muted-foreground">
                  {t(`${feature.nextIntlKey}.description`)}
                </p>
              </div>
              <div className="absolute -top-4 flex w-full justify-center">
                <div className="before:conten-[' '] border-card before:bg-card z-10 size-8 rounded-full border-8 bg-gray-800 before:absolute before:h-40 before:w-1 before:translate-x-1.5 before:-translate-y-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="mad-md:flex-col-reverse flex h-72 w-full rounded-tr-4xl rounded-bl-4xl bg-gradient-to-r from-orange-500 to-orange-600 md:h-96">
          <div className="flex h-full w-full flex-col justify-center gap-10 pl-10 md:w-1/2">
            <div className="text-3xl font-bold text-white md:text-5xl">
              {t("app_promo")}
            </div>
            <div className="flex gap-5">
              <CustomLink href={"#"}>
                <Image
                  width={180}
                  height={100}
                  src={"/assets/images/landing/store1.png"}
                  alt="playstore icon"
                  className="cursor-pointer"
                />
              </CustomLink>
              <CustomLink href={"#"}>
                <Image
                  width={180}
                  height={100}
                  src={"/assets/images/landing/store2.png"}
                  alt="playstore icon"
                  className="cursor-pointer"
                />
              </CustomLink>
            </div>
          </div>
          <div className="relative h-full w-1/2 justify-center">
            <Image
              src={"/assets/images/landing/app-phone.png"}
              alt="mobile screenshot"
              width={327}
              height={613}
              className="absolute -top-28 right-10 min-sm:-top-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
