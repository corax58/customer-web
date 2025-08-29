import DOMPurify from "isomorphic-dompurify";
import { MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Restaurant } from "@/types/restaurant.types";

import AvailabilityModal from "./AvailabilityModal";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo = async ({ restaurant }: RestaurantInfoProps) => {
  const descriptionHtml = restaurant.description;
  const t = await getTranslations("restaurants.restaurant_details.info");
  const sanitizedDescription = DOMPurify.sanitize(descriptionHtml, {
    USE_PROFILES: { html: true },
  });
  return (
    <div className="flex flex-col gap-10 rtl:[direction:rtl]">
      <div className="space-y-4">
        <p className="mb-6 text-lg font-semibold">{t("title")}</p>
        <p className="font-bold">{t("about")}</p>
        <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
      <AvailabilityModal availability={restaurant.availability} />
      <div>
        <p className="mb-2 font-semibold">{t("contact_info")}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={24} strokeWidth={1} />
            <div>
              <p className="font-medium">{restaurant.location}</p>
              <p className="text-muted-foreground">{t("address")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={24} strokeWidth={1} />
            <div>
              <p className="font-medium">{restaurant.contact_no}</p>
              <p className="text-muted-foreground">{t("mobile")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
