import { getBestSellingDishes } from "@/actions/actions";
import LandingDishCard from "@/components/LandingDishCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { BestSellingDishesSkeleton } from "./BestSellingDishesSkeleton";

interface BestSellingDishesProps {
  personalized?: string;
}
export async function BestSellingDishes({
  personalized,
}: BestSellingDishesProps) {
  if (personalized === undefined) {
    return <BestSellingDishesSkeleton />;
  }
  const { data: dishes } = await getBestSellingDishes();

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
          <h2 className="text-xl font-bold md:mb-2 md:text-3xl">
            Best Selling Dishes
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
              <LandingDishCard menuItem={dish} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
}
