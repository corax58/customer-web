import { getOffersList } from "@/actions/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import OffersCard from "./OffersCard";
import { OffersSkeleton } from "./OffersSkeleton";

interface OffersProps {
  personalized?: string;
}
const Offers = async ({ personalized }: OffersProps) => {
  if (personalized === undefined) {
    return <OffersSkeleton />;
  }
  const { data } = await getOffersList({});

  if (data && data.length > 0)
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="space-y-5 overflow-visible"
      >
        <div className="flex w-full items-center justify-between gap-5">
          <h2 className="text-2xl font-bold md:mb-2 md:text-3xl">Offers</h2>

          <div className="flex items-center gap-4">
            {/* <CustomLink
              href="#"
              className="group text-muted-foreground flex items-center font-semibold hover:text-orange-600"
            >
              See All
            </CustomLink> */}
            <div className="flex gap-2">
              <CarouselPrevious className="bg-secondary text-foreground static -top-0 size-8 -translate-y-0 border-0 opacity-100" />
              <CarouselNext className="bg-secondary text-foreground static size-8 -translate-y-0 border-0 opacity-100" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4 overflow-visible">
          {data?.map((offer) => (
            <CarouselItem
              key={offer.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <OffersCard offer={offer} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
};

export default Offers;
