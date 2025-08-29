import { Clock, Store } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent } from "@/components/ui/card";
import { Offer } from "@/types/restaurant.types";

interface OffersCardProps {
  offer: Offer;
}

const OffersCard = async ({ offer }: OffersCardProps) => {
  const formatter = await getFormatter();

  const t = await getTranslations("restaurants.restaurant_details.offers");
  const formatEndTime = (endTime: string) => {
    const date = new Date(endTime);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return t("expired");
    if (diffDays === 1) return t("expires_today");
    if (diffDays <= 7) return t("days_left", { days: diffDays });

    return formatter.dateTime(date, { dateStyle: "short", timeStyle: "short" });
  };

  return (
    <Card className="group border-primary dark:border-primary/50 w-full min-w-72 overflow-hidden rounded-lg border-2 border-dashed p-0">
      <CardContent className="rounded-none p-0">
        <div className="flex">
          <div className="from-primary flex w-20 flex-col items-center justify-center border-e-2 border-dashed border-orange-300 bg-gradient-to-b to-amber-500 text-white dark:border-orange-700 dark:from-orange-600 dark:to-amber-600">
            <div className="flex flex-nowrap items-center justify-center gap-1 px-2 text-sm font-semibold">
              <span>-</span> <FormattedAfghani amount={offer.discount} />
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
                  {t.rich("min_order", {
                    highlight: (chunks) => (
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        <FormattedAfghani amount={offer.minimum_amount} />
                        {chunks}
                      </span>
                    ),
                  })}
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
