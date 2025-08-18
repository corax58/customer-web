import { getCategiesList } from "@/actions/actions";
import CategoryCard from "@/components/CategoryCard";
import CustomLink from "@/components/CustomLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex items-center justify-center gap-5 max-md:flex-col md:justify-between">
          <h2 className="text-foreground text-4xl font-bold">Categories</h2>

          <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
            <CustomLink
              href="/categories"
              className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
            >
              See All
            </CustomLink>
            <div className="flex gap-4">
              <CarouselPrevious className="bg-primary dark:bg-primary static -top-0 size-14 -translate-y-0 border-0 text-white opacity-100" />
              <CarouselNext className="bg-primary dark:bg-primary static size-14 -translate-y-0 border-0 text-white opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4 overflow-visible">
          {categories?.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            >
              <div className="p-1">
                <CategoryCard category={category} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
}
