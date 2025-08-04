import { Suspense } from "react";

import ItemsList from "./_components/ItemsList";
import ItemsListSkeleton from "./_components/ItemsListSkeleton";
interface CategoryItemsPageProps {
  searchParams: Promise<{ title: string; lat: string; lon: string }>;
  params: Promise<{ id: string }>;
}

const CategoryItemsPage = async ({
  params,
  searchParams,
}: CategoryItemsPageProps) => {
  const { id } = (await params) || "1";
  const { title, lat, lon } = await searchParams;

  return (
    <div className="min-h-dvh space-y-10 px-3 pt-36 pb-20 sm:px-4 md:px-10 lg:px-14">
      <Suspense fallback={<ItemsListSkeleton />}>
        <ItemsList id={id} title={title} lat={lat} lon={lon} />
      </Suspense>
    </div>
  );
};

export default CategoryItemsPage;
