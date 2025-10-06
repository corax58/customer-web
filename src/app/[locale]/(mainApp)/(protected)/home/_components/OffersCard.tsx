import { format } from "date-fns";
import { Clock, Store } from "lucide-react";

import CustomLink from "@/components/CustomLink";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toLocalDate } from "@/lib/utils";
import { Offer } from "@/types/restaurant.types";

interface OffersCardProps {
  offer: Offer;
}
const OffersCard = ({ offer }: OffersCardProps) => {
  return (
    <Card className="group dark:bg-card dark:border-border w-full overflow-hidden border border-orange-200 p-0 shadow-none transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute start-0 end-0 top-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400" />

          <div className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400">
                  {offer.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Store className="h-3 w-3" />
                  <span>{offer.restaruentDetail.title}</span>
                </div>
              </div>

              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-sm font-bold text-white shadow-lg hover:from-orange-600 hover:to-amber-600">
                <FormattedAfghani amount={offer.discount} /> OFF
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  Expires {format(toLocalDate(offer.end_time), "MMM dd','yyyy")}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="mt-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
              asChild
            >
              <CustomLink href={`/restaurants/${offer.restaurant_id}`}>
                View Detail
              </CustomLink>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersCard;
