import React from "react";

import { getRestaurantMenuList } from "@/actions/restaurants.actions";
import MenuItemCard from "@/components/MenuItemCard";

interface TopRatedItemsProps {
  restaurantId: string;
  isOpen: boolean;
}
const TopRatedItems = async ({ restaurantId, isOpen }: TopRatedItemsProps) => {
  const { data: menuList, error } = await getRestaurantMenuList(restaurantId);

  if (error) {
    return <div> Something went wrong </div>;
  }

  if (menuList && menuList.length == 0)
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p>No top rated items</p>
      </div>
    );

  if (menuList && menuList.length > 0)
    return (
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {menuList.map((menuItem) => (
          <MenuItemCard
            key={menuItem.id}
            menuItem={menuItem}
            isOpen={isOpen}
            isInRestaurant
          />
        ))}
      </div>
    );
};

export default TopRatedItems;
