import { SearchX } from "lucide-react";

import { getCategoryItems } from "@/actions/actions";
import MenuItemCard from "@/components/MenuItemCard";

import CategoryHeader from "../../_components/CategoryHeader";

import ItemsListSkeleton from "./ItemsListSkeleton";

interface ItemsListProps {
  id: string;
  title?: string;
  lat?: string;
  lon?: string;
  personalized?: string;
}
const ItemsList = async ({
  id,
  title,
  lat,
  lon,
  personalized,
}: ItemsListProps) => {
  if (personalized === undefined) {
    return <ItemsListSkeleton />;
  }
  const { data: items, error } = await getCategoryItems(id, lat, lon);
  if (error) {
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">Something went wrong</p>
      </div>
    );
  }

  if (items && items.length == 0)
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">No items in this category</p>
      </div>
    );

  if (items && items?.length > 0)
    return (
      <div>
        <CategoryHeader title={title || "Category"} amount={items.length} />
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              menuItem={item}
              isInRestaurant={false}
              isOpen
            />
          ))}
        </div>
      </div>
    );
};

export default ItemsList;
