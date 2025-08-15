import { Suspense } from "react";

import ItemsList from "./_components/ItemsList";
import ItemsListSkeleton from "./_components/ItemsListSkeleton";
interface CategoryItemsPageProps {
  searchParams: Promise<{
    title: string;
    lat: string;
    lon: string;
    personalized: string;
  }>;
  params: Promise<{ id: string }>;
}

const CategoryItemsPage = async ({
  params,
  searchParams,
}: CategoryItemsPageProps) => {
  const { id } = (await params) || "1";
  const { title, lat, lon, personalized } = await searchParams;

  return (
    <div className="content-container min-h-dvh space-y-10 pt-36 pb-20">
      <Suspense fallback={<ItemsListSkeleton />}>
        <ItemsList
          id={id}
          title={title}
          lat={lat}
          lon={lon}
          personalized={personalized}
        />
      </Suspense>
    </div>
  );
};

export default CategoryItemsPage;
