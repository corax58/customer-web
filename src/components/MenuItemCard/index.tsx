"use client";
import { CookingPot, Eye } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { getMenuItemPrice } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import FavoriteButton from "../FavoriteButton";
import FormattedAfghani from "../FormattedAfghani";
import MenuItemDetail from "../MenuItemDetail";
import RestaurantDetailsLink from "../RestaurantDetailsLink";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface MenuItemCardProps {
  menuItem: MenuItem;
  isOpen: boolean;
  isInRestaurant: boolean;
}

const foodPlaceholder = "/assets/images/foodPlaceholder.jpg";

const MenuItemCard = ({
  menuItem,
  isOpen,
  isInRestaurant = true,
}: MenuItemCardProps) => {
  const { user } = useAuth();

  const currentPrice = getMenuItemPrice(menuItem);
  const minPercent = 10;
  const maxPercent = 30;
  const randomPercent =
    Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
  const canceledPrice = currentPrice * (1 + randomPercent / 100);

  const isAvailable = menuItem.is_available == 1 && isOpen;
  return (
    <div className="relative flex h-56 w-full items-end">
      <div className="bg-card flex h-48 w-full flex-col justify-between rounded-3xl border p-3 pt-4 max-sm:p-5 sm:min-w-72">
        <div className="flex w-full flex-col items-end justify-end">
          <p className="text-base font-semibold">
            <FormattedAfghani amount={currentPrice} />
          </p>
          <p className="text-muted-foreground text-xs line-through">
            <FormattedAfghani amount={canceledPrice} />
          </p>
        </div>
        <div className="space-y-4">
          <p className="line-clamp-1 text-lg font-semibold">{menuItem.title}</p>

          <div className="flex w-full justify-between gap-1.5">
            <div className="text-muted-foreground flex items-center gap-1">
              {menuItem.cook_time.trim() && (
                <div className="flex items-center gap-2">
                  <CookingPot size={14} />
                  <span>{menuItem.cook_time} min</span>
                </div>
              )}
            </div>

            {isInRestaurant ? (
              isAvailable && (
                <MenuItemDetail menuItemId={menuItem.id.toString()} />
              )
            ) : (
              <Button size={"icon"} asChild>
                <RestaurantDetailsLink restaurantId={menuItem.restaurant_id}>
                  <Eye />
                </RestaurantDetailsLink>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-5 h-28 w-36 overflow-hidden rounded-2xl shadow-lg sm:w-[155px] lg:w-40">
        <div className="relative h-full w-full">
          <CustomImage
            placeholderImage={foodPlaceholder}
            imgUrl={menuItem.image_file}
            title={menuItem.title}
          />
        </div>
        {user && (
          <FavoriteButton
            is_favorite={menuItem.is_favourite === 1}
            itemId={menuItem.id.toString()}
            type="menu_item"
            className="bg-card absolute top-2.5 left-2.5 z-10 size-7 rounded-full"
          />
        )}
        {!isAvailable && (
          <Badge className="absolute bottom-2.5 left-2.5 z-10 border-red-700 bg-red-500/80">
            Not available
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
