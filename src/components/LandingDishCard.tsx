import DOMPurify from "isomorphic-dompurify";
import { Eye, Star } from "lucide-react";

import CustomImage from "@/components/CustomImage";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { getMenuItemPrice } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import RestaurantDetailsLink from "./RestaurantDetailsLink";

interface LandingDishCardCardProps {
  menuItem: MenuItem;
}
const LandingDishCard = ({ menuItem }: LandingDishCardCardProps) => {
  const description = menuItem.description;
  const sanitizedDesc = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
  });

  return (
    <Card className="group overflow-hidden border p-0 shadow-none transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
            <CustomImage
              title={menuItem.title}
              imgUrl={menuItem.image_file}
              placeholderImage={PLACEHOLDER_IMAGES.FOOD_ITEM}
            />

            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-black">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">
                {menuItem.avg_rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-3 px-4 py-2 text-center">
            <div className="mb-1 flex w-full items-center justify-between">
              <h3 className="group-hover:text-primary truncate text-start text-lg font-semibold text-nowrap transition-colors">
                {menuItem.title}
              </h3>

              {menuItem.cuisine_type_name && (
                <Badge variant="outline" className="h-min text-xs">
                  {menuItem.cuisine_type_name}
                </Badge>
              )}
            </div>
            <p
              className="text-muted-foreground line-clamp-2 w-full text-start text-sm"
              dangerouslySetInnerHTML={{ __html: sanitizedDesc }}
            />

            <div className="w-ful flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary text-xl font-semibold">
                  <FormattedAfghani amount={getMenuItemPrice(menuItem)} />
                </span>
              </div>
              <div>
                <Button asChild>
                  <Button size={"icon"} asChild>
                    <RestaurantDetailsLink
                      restaurantId={menuItem.restaurant_id}
                    >
                      <Eye />
                    </RestaurantDetailsLink>
                  </Button>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingDishCard;
