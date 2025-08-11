import React from "react";

import { getRestaurantOffers } from "@/actions/restaurants.actions";

import OffersCard from "./OffersCard";

interface RestaurantOffersProps {
  restaurantId: string;
}
const RestaurantOffers = async ({ restaurantId }: RestaurantOffersProps) => {
  const { data: offers, error } = await getRestaurantOffers(restaurantId);

  if (error) {
    return <div> Something went wrong </div>;
  }

  if (offers && offers.length == 0)
    return (
      <div className="flex h-52 w-full items-center justify-center">
        <p>No offers</p>
      </div>
    );

  if (offers && offers.length > 0)
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OffersCard key={offer.id} offer={offer} />
        ))}
      </div>
    );
};

export default RestaurantOffers;
