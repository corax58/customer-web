import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import CustomLink from "@/components/CustomLink";
import { Card, CardContent } from "@/components/ui/card";
import { Offer } from "@/types/restaurant.types";

interface MobileOfferCardProps {
  offer: Offer;
}
const MobileOfferCard = async ({ offer }: MobileOfferCardProps) => {
  const t = await getTranslations("home.offers");

  return (
    <Card className="group border-card relative mb-4 h-40 w-full overflow-hidden border-4 bg-gradient-to-b from-red-500 to-red-800 p-0 shadow-lg transition-all duration-300">
      <CustomLink
        href={`/restaurants/${offer.restaurant_id}`}
        className="h-full"
      >
        <div className="absolute h-full w-full">
          <div className="relative h-full w-full opacity-30">
            <Image
              src={"/assets/images/wave.svg"}
              fill
              alt="wave images"
              className="object-cover"
            />
          </div>
        </div>
        <CardContent className="h-full p-0">
          <div className="flex h-full w-full items-center gap-2">
            {/* <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400" /> */}

            <div className="w-4/5 p-4 pr-0">
              <div className="mb-2 flex flex-col items-start justify-between">
                <h3 className="mb-1 text-xl font-bold text-white transition-colors dark:text-gray-100 dark:group-hover:text-orange-400">
                  {offer.title}
                </h3>
                <p className="line-clamp-1 w-full truncate text-xs text-white">
                  {offer.description}
                </p>
              </div>

              <div className="flex items-center gap-2 py-2 text-sm font-semibold text-orange-400">
                {t("see_detail")}
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </div>
            <div className="w-1/5">
              <div className="border-primary relative flex size-10 items-center justify-center rounded-full border-2 bg-gray-200">
                <div className="relative aspect-square size-6">
                  <Image
                    src={"/assets/images/landing/delivery.png"}
                    alt="delivery"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </CustomLink>
    </Card>
  );
};

export default MobileOfferCard;
