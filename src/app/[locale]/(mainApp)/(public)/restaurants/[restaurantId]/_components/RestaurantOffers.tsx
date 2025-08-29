import React from "react";

import { getTranslations } from "next-intl/server";

import { getRestaurantOffers } from "@/actions/restaurants.actions";

import OffersCard from "./OffersCard";

interface RestaurantOffersProps {
  restaurantId: string;
}
const RestaurantOffers = async ({ restaurantId }: RestaurantOffersProps) => {
  const { data: offers, error } = await getRestaurantOffers(restaurantId);
  const t = await getTranslations("restaurants.restaurant_details.offers");
  if (error) {
    return <div> {t("something_went_wrong")} </div>;
  }

  if (offers && offers.length == 0)
    return (
      <div className="flex h-52 w-full items-center justify-center rtl:[direction:rtl]">
        <p>{t("no_offers")}</p>
      </div>
    );

  if (offers && offers.length > 0)
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 rtl:[direction:rtl]">
        {offers.map((offer) => (
          <OffersCard key={offer.id} offer={offer} />
        ))}
      </div>
    );
};

export default RestaurantOffers;
