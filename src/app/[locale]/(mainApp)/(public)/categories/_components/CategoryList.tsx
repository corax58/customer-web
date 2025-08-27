import { SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getCategiesList } from "@/actions/actions";
import CategoryCard from "@/components/CategoryCard";

import CategoryHeader from "./CategoryHeader";

const CategoryList = async () => {
  const t = await getTranslations("categories");
  const { data: categories, error } = await getCategiesList();
  if (error) {
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">{t("messages.something_went_wrong")}</p>
      </div>
    );
  }

  if (categories && categories.length == 0)
    return (
      <div className="col-span-1 flex h-dvh w-full flex-col items-center justify-center gap-5 sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <SearchX size={50} />
        <p className="text-xl">{t("messages.no_categories")}</p>
      </div>
    );

  if (categories && categories?.length > 0)
    return (
      <div>
        <CategoryHeader title="Categories" amount={categories.length} />

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    );
};

export default CategoryList;
