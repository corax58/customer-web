"use client";

import { Bike, Star, User } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn, formatTimeHM } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import FavoriteButton from "../FavoriteButton";
import FormattedAfghani from "../FormattedAfghani";
import RestaurantDetailsLink from "../RestaurantDetailsLink";
import { Badge } from "../ui/badge";

interface RestaurantCardProps {
  isOpen: boolean;
  restaurant: Restaurant;
  className?: string;
}

const RestaurantCard = ({
  restaurant,
  className,
  isOpen,
}: RestaurantCardProps) => {
  const { user } = useAuth();
  const time = useTranslations("time");
  const t = useTranslations("components.restaurant_card");
  const formatter = useFormatter();

  return (
    <Card
      className={cn(
        "group bg-background w-full overflow-hidden border-0 p-0 shadow-none transition-all hover:cursor-pointer",
        className,
      )}
    >
      <CardContent className="space-y-2 px-0">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl">
          <RestaurantDetailsLink restaurantId={restaurant.id}>
            <CustomImage
              imgUrl={restaurant.image_file}
              title={restaurant.title}
              placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
            />
          </RestaurantDetailsLink>
          {user && (
            <FavoriteButton
              is_favorite={restaurant.is_favourite === 1}
              itemId={restaurant.id.toString()}
              type="restaurant"
              className="bg-card absolute start-4 top-4 z-10 rounded-full"
            />
          )}
          {!isOpen && (
            <Badge className="border-eed-700 absolute end-4 top-4 z-10 bg-red-500/90 text-white">
              {t("closed")}
            </Badge>
          )}
          {restaurant.price_per_person && (
            <div className="bg-background absolute -end-1 -bottom-1 z-10 flex w-fit items-center justify-center gap-1 rounded-ss-2xl px-4 py-1 pe-4 pb-2">
              <span className="text-foreground font-semibold">
                <FormattedAfghani amount={restaurant.price_per_person} />
              </span>
              <div className="flex items-end text-xs">
                /<User size={14} />
              </div>
            </div>
          )}
        </div>
        <RestaurantDetailsLink restaurantId={restaurant.id}>
          <div className="space-y-1 p-2">
            <p className="group-hover:text-primary truncate text-lg">
              {restaurant.title}
            </p>
            <div className="text-muted-foreground flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-primary text-primary" />
                <p>{formatter.number(restaurant.average_rating)}</p>
                {restaurant.rating_info && (
                  <p>
                    (
                    {formatter.number(
                      parseInt(restaurant.rating_info.totalReviews),
                    )}
                    )
                  </p>
                )}
              </div>
              {restaurant.delivery_info.delivery_time_minutes && (
                <div className="flex items-center gap-2">
                  <Bike size={20} />
                  <p>
                    {formatTimeHM(
                      restaurant.delivery_info.delivery_time_minutes,
                      time,
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </RestaurantDetailsLink>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
