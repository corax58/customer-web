import { getCategiesList } from "@/actions/actions";
import CategoryCard from "@/components/CategoryCard";
import CustomLink from "@/components/CustomLink";

import { CategoriesSkeleton } from "./CategoriesSkeleton";

interface CategoriesProps {
  lat?: string;
  lon?: string;
}
export async function Categories({ lat, lon }: CategoriesProps) {
  if (lat == undefined && lon == undefined) return <CategoriesSkeleton />;

  const latitude = lat == "none" ? "" : lat;
  const longitude = lon == "none" ? "" : lon;
  const { data: categories } = await getCategiesList(latitude, longitude);

  if (categories && categories.length > 0)
    return (
      <div className="space-y-5 overflow-visible">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:mb-2 md:text-4xl">Categories</h2>

          <CustomLink
            href="/categories"
            className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
          >
            See All
          </CustomLink>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-6">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    );
}
