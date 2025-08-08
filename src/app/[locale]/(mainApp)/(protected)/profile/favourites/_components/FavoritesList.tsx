import { X } from "lucide-react";

import { getFavoritesList } from "@/actions/profile.actions";
import RestaurantCard from "@/components/RestaurantCard";
import { Card, CardContent } from "@/components/ui/card";
import { isRestaurantOpenNow } from "@/lib/utils";

const FavoritesList = async () => {
  const { data, error } = await getFavoritesList();

  if (data)
    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((favourite) => {
            if (!favourite.model_detail) return;
            const isOpen = favourite.model_detail.availability
              ? isRestaurantOpenNow(favourite.model_detail.availability)
              : true;
            return (
              <RestaurantCard
                key={favourite.model_detail.id}
                restaurant={favourite.model_detail}
                isOpen={isOpen}
              />
            );
          })}
        </div>

        {data.length === 0 && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">
                You have no favorite restaurants yet.
              </h3>
              <p className="text-muted-foreground">
                Tap the heart icon on any restaurant to save it here for easy
                access.
              </p>
            </CardContent>
          </Card>
        )}
        {error && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <X className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">
                Failed to fetch Favourites
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default FavoritesList;
