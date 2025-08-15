import React, { Suspense } from "react";
import { Metadata } from "next";

import { getRestaurantDetails } from "@/actions/restaurants.actions";

import RestaurantDetail from "./_components/RestaurantDetail";
import RestaurantDetailSkeleton from "./_components/RestaurantDetailSkeleton";

type GenerateMetaDataProps = {
  params: Promise<{ restaurantId: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const { restaurantId } = await params;

  const restaurant = await getRestaurantDetails(restaurantId);
  if (!restaurant.data) {
    return {
      title: "Restaurant Not Found | Time delivery",
    };
  }
  if (restaurant.data)
    return {
      title: `${restaurant.data.title} | Time delivery`,
      description: `Order online from ${restaurant.data.title}. View the full menu and get your meal delivered fast with Time delivery.`,

      alternates: {
        canonical: `/restaurants/${restaurant.data.id}`,
      },
    };

  return { title: "Time Delivery" };
}

interface RestaurantDetailPageProps {
  params: Promise<{ restaurantId: string }>;
  searchParams: Promise<{ lat: string; lon: string }>;
}
const RestaurantDetailPage = async ({
  params,
  searchParams,
}: RestaurantDetailPageProps) => {
  const { restaurantId } = await params;
  const { lat, lon } = await searchParams;

  return (
    <div className="min-h-dvh py-16 pt-32">
      <Suspense fallback={<RestaurantDetailSkeleton />}>
        <RestaurantDetail restaurantId={restaurantId} lat={lat} lon={lon} />
      </Suspense>
    </div>
  );
};

export default RestaurantDetailPage;
