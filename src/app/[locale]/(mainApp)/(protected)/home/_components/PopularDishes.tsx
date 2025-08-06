import { getPopularDishes } from "@/actions/actions";
import MenuItemCard from "@/components/MenuItemCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { PopularDishesSkeleton } from "./PopularDishesSkeleton";

interface PopularDishesProps {
  lat?: string;
  lon?: string;
}
export async function PopularDishes({ lat, lon }: PopularDishesProps) {
  if (lat === undefined || lon === undefined) {
    return <PopularDishesSkeleton />;
  }
  const { data: dishes } = await getPopularDishes(lat, lon);

  if (dishes && dishes.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex w-full items-center justify-between gap-5">
          <h2 className="text-lg font-bold md:mb-2 md:text-3xl">
            Popular Dishes
          </h2>

          <div className="flex items-center gap-4 max-sm:flex-col">
            {/* <CustomLink
              href="#"
              className="group text-muted-foreground flex items-center font-semibold text-nowrap hover:text-orange-600"
            >
              See All
            </CustomLink> */}
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="overflow-visible">
          {dishes?.map((dish) => (
            <CarouselItem
              key={dish.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <MenuItemCard menuItem={dish} isInRestaurant={false} isOpen />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
}
