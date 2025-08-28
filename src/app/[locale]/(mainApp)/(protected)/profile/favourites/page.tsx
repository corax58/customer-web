import { Suspense } from "react";

import { getTranslations } from "next-intl/server";

import FavoritesList from "./_components/FavoritesList";
import FavoritesListSkeleton from "./_components/FavoritesListSkeleton";

const FavouritesPage = async () => {
  const t = await getTranslations("profile.favourites");
  return (
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">{t("title")}</h2>
        </div>
      </div>
      <Suspense fallback={<FavoritesListSkeleton />}>
        <FavoritesList />
      </Suspense>
    </div>
  );
};

export default FavouritesPage;
