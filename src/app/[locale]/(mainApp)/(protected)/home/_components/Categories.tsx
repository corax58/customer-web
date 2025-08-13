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
  personalized?: string;
}
export async function Categories({ personalized }: CategoriesProps) {
  const { data: categories } = await getCategiesList();

  if (personalized == undefined) return <CategoriesSkeleton />;

  if (categories && categories.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:mb-2 md:text-4xl">Categories</h2>

          <div className="flex items-center gap-4 max-sm:flex-col">
            <CustomLink
              href="/categories"
              className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
            >
              See All
            </CustomLink>
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4 overflow-visible">
          {categories?.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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
