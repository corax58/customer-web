import MenuItemCardSkeleton from "@/components/MenuItemCard/MenuItemCardSkeleton";

export const TopRatedItemsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <MenuItemCardSkeleton key={index} />
      ))}
    </div>
  );
};
