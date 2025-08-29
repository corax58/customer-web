import { getRestaurantMenuList } from "@/actions/restaurants.actions";
import MenuItemCard from "@/components/MenuItemCard";

interface MenuListProps {
  restaurantId: string;
  isOpen: boolean;
}
const MenuList = async ({ restaurantId, isOpen }: MenuListProps) => {
  const { data: menuList, error } = await getRestaurantMenuList(restaurantId);

  if (error) {
    return <div> Something went wrong </div>;
  }

  if (menuList && menuList.length == 0)
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p>No menu items</p>
      </div>
    );

  if (menuList && menuList.length > 0)
    return (
      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 rtl:[direction:rtl]">
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

export default MenuList;
