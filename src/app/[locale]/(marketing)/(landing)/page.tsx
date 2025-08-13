import { Suspense } from "react";

import Features from "./_components/Features";
import Hero from "./_components/Hero";
import LocationManager from "./_components/LocationManager";
import PopularItems from "./_components/PopularItems";
import PopularRestaurants from "./_components/PopularRestaurants";
import PopularRestaurantsSkeleton from "./_components/PopularRestaurantsSkeleton";
import SpecialFood from "./_components/SpecialFood";
import Testimonials from "./_components/Testimonials";

interface HomePageProps {
  searchParams: Promise<{ lat: string; lon: string }>;
}
export default async function HomePage({ searchParams }: HomePageProps) {
  const { lat, lon } = await searchParams;
  return (
    <div className="">
      <Hero />
      <PopularItems lat={lat} lon={lon} />
      <Suspense fallback={<></>}>
        <LocationManager />
      </Suspense>
      <Suspense fallback={<PopularRestaurantsSkeleton />}>
        <PopularRestaurants lat={lat} lon={lon} />
      </Suspense>
      <Features />
      <SpecialFood />
      <Testimonials />
    </div>
  );
}
