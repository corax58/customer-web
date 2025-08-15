"use client";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "review-01",
    name: "Lina Hassan",
    date: "2025-06-20",
    review:
      "The spicy chicken pasta was incredible! The sauce had the perfect spicy kick, the chicken was tender, and the portion was very generous. It arrived hot, fresh, and even earlier than the estimated time. My new favorite, highly recommended!",
    stars: 5,
  },
  {
    id: "review-02",
    name: "Daniel Miller",
    date: "2025-06-18",
    review:
      "My absolute go-to for weeknight dinner. The vegetarian pizza is always a winner, with a perfect crust and generous, fresh toppings. Plus, the ordering process on their website is incredibly simple and user-friendly. A fantastic experience every time.",
    stars: 5,
  },
  {
    id: "review-03",
    name: "Fatuma Ahmed",
    date: "2025-06-15",
    review:
      "The beef burger and fries were fantastic, clearly made with high-quality, fresh ingredients. The patty was juicy and the fries were crispy. The only reason for 4 stars was the packaging, which was a bit crushed. The food itself was delicious.",
    stars: 4,
  },
  {
    id: "review-04",
    name: "Kevin Chen",
    date: "2025-06-12",
    review:
      "I order the sushi platter regularly and it never disappoints. The fish is always exceptionally fresh and the quality is unmatched. Everything is beautifully presented, and it's consistently the best sushi delivery you can find in town!",
    stars: 5,
  },
  {
    id: "review-05",
    name: "Sofia Garcia",
    date: "2025-06-10",
    review:
      "A very reliable choice for our family. The service is great, the food is consistently good, and delivery is always on time. What really stands out is the huge menu variety, which keeps us coming back again and again. A solid favorite.",
    stars: 4,
  },
];

const Testimonials = () => {
  const t = useTranslations("landing.testimonials");
  return (
    <section className="bg-background flex w-full flex-col items-center gap-20 py-20">
      <div className="content-container flex w-full flex-col items-center gap-10">
        <p className="text-foreground text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
          {t("title")}
        </p>

        <Carousel
          opts={{ loop: true }}
          className="h-full w-full"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="w-20 lg:basis-1/2">
                <div className="dark:bg-secondary flex h-full w-full gap-2 rounded bg-gray-300">
                  <data className="flex h-full w-10 justify-center">
                    <div className="bg-primary h-full w-px" />
                  </data>
                  <div className="flex w-full flex-col justify-between gap-5 p-5 md:p-10">
                    <div className="space-y-4">
                      <Quote size={30} className="text-pink-400" />
                      <p className="dark:text-muted-foreground text-lg text-gray-700">
                        {testimonial.review}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-bold">{testimonial.name}</p>
                      <div className="flex gap-2">
                        {Array.from({ length: testimonial.stars }).map(
                          (item, index) => (
                            <Star
                              key={index}
                              className="fill-yellow-500 text-yellow-500"
                            />
                          ),
                        )}
                        {Array.from({ length: 5 - testimonial.stars }).map(
                          (item, index) => (
                            <Star
                              key={index}
                              className="fill-gray-400 text-gray-400"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
