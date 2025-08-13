"use client";

import { Bike, Star, User } from "lucide-react";

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
              className="bg-card absolute top-4 left-4 z-10 rounded-full"
            />
          )}
          {!isOpen && (
            <Badge className="absolute top-4 right-4 z-10 border-red-700 bg-red-500/90 text-white">
              Closed
            </Badge>
          )}
          {restaurant.price_per_person && (
            <div className="bg-background absolute -right-1 -bottom-1 z-10 flex w-fit items-center justify-center gap-1 rounded-tl-2xl px-4 py-1 pr-4 pb-2">
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
                <p>{restaurant.average_rating}</p>
                <p>({restaurant.rating_info.totalReviews})</p>
              </div>
              {restaurant.delivery_info.delivery_time_minutes && (
                <div className="flex items-center gap-2">
                  <Bike size={20} />
                  <p>
                    {formatTimeHM(
                      restaurant.delivery_info.delivery_time_minutes,
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
