import { Clock, Store } from "lucide-react";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent } from "@/components/ui/card";
import { Offer } from "@/types/restaurant.types";

interface OffersCardProps {
  offer: Offer;
}

const OffersCard = ({ offer }: OffersCardProps) => {
  const formatEndTime = (endTime: string) => {
    const date = new Date(endTime);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Expired";
    if (diffDays === 1) return "Expires today";
    if (diffDays <= 7) return `${diffDays} days left`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  // const getDiscountText = () => {
  //   if (offer.title.toLowerCase().includes("free delivery")) {
  //     return { main: "FREE", sub: "DELIVERY" };
  //   }
  //   if (
  //     offer.title.toLowerCase().includes("buy") &&
  //     offer.title.toLowerCase().includes("get")
  //   ) {
  //     return { main: "B2G1", sub: "FREE" };
  //   }
  //   return { main: offer.discount, sub: "% OFF" };
  // };

  // const discount = getDiscountText();
  return (
    <Card className="group border-primary dark:border-primary/50 w-full min-w-72 overflow-hidden rounded-lg border-2 border-dashed p-0">
      <CardContent className="rounded-none p-0">
        <div className="flex">
          <div className="from-primary flex w-20 flex-col items-center justify-center border-r-2 border-dashed border-orange-300 bg-gradient-to-b to-amber-500 text-white dark:border-orange-700 dark:from-orange-600 dark:to-amber-600">
            <div className="flex flex-col items-center justify-center px-2 font-semibold">
              <p className="text-nowrap">
                - {parseFloat(offer.discount).toFixed(2)}
              </p>
              <p>AFN</p>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-base font-semibold transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {offer.title}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Store className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">
                      {offer.restaruentDetail.title}
                    </span>
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{formatEndTime(offer.end_time)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-xs">
                  <span>Min. Order: </span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    <FormattedAfghani amount={offer.minimum_amount} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersCard;
