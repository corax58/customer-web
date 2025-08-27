"use client";

import DOMPurify from "isomorphic-dompurify";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import CustomImage from "@/components/CustomImage";
import CustomLink from "@/components/CustomLink";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent } from "@/components/ui/card";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Restaurant } from "@/types/restaurant.types";

interface PopularRestaurantCardProps {
  restaurant: Restaurant;
}
const PopularRestaurantCard = ({ restaurant }: PopularRestaurantCardProps) => {
  const t = useTranslations("landing.popular_restaurants");
  const descriptionHtml = restaurant.description;

  const sanitizedDescription = DOMPurify.sanitize(descriptionHtml, {
    USE_PROFILES: { html: true },
  });
  return (
    <CustomLink href={`/restaurants/${restaurant.id}`}>
      <Card className="w-full gap-4 overflow-hidden rounded-4xl border-neutral-800 bg-zinc-900 py-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="relative h-52 w-full">
          <CustomImage
            imgUrl={restaurant.image_file}
            title={restaurant.title}
            placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
          />
        </div>
        <CardContent className="p-4 pt-0 md:px-6">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white">
                {restaurant.title}
              </h3>
              <div className="mb-3 flex items-center text-gray-300">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="text-sm">{restaurant.location}</span>
              </div>
            </div>

            <p
              className="line-clamp-2 h-11 text-sm leading-relaxed text-gray-200"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
            <div className="border-t border-neutral-700 pt-2">
              {restaurant.price_per_person &&
                restaurant.price_per_person != "0" && (
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      <FormattedAfghani amount={restaurant.price_per_person} />
                    </span>
                    <span className="text-sm text-gray-400">
                      {t("per_person")}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </CustomLink>
  );
};

export default PopularRestaurantCard;
