import { Clock, DollarSign } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Offer } from "@/types/restaurant.types";

interface OfferCardProps {
  offer: Offer;
  className?: string;
}

export async function OfferCard({ offer, className = "" }: OfferCardProps) {
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
    <div className={`relative mx-auto w-full ${className}`}>
      <div className="bg-card relative rounded-lg border-2 border-orange-500/30">
        <div className="ticket-perforation text-background pointer-events-none absolute inset-0 opacity-10" />

        <div className="from-primary text-primary-foreground relative rounded-md bg-gradient-to-l to-amber-600 px-6 py-4 dark:border-orange-700 dark:from-orange-600 dark:to-amber-600">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-3">
              <Clock className="h-4 w-4 text-white" />
              <span className="font-medium text-white">
                {formatEndTime(offer.end_time)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-end text-xl font-bold">
              <span>-</span>
              <FormattedAfghani amount={offer.discount} />
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="bg-primary/20 absolute start-0 top-0 h-px w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, currentColor 8px, currentColor 12px)",
            }}
          />

          <div className="bg-background border-background absolute -start-[18px] top-0 h-8 w-8 -translate-y-4 -rotate-45 transform rounded-full border-2 border-e-orange-500/30 border-b-orange-500/30" />

          <div className="bg-background border-background absolute -end-[17px] top-0 h-8 w-8 -translate-y-4 -rotate-45 transform rounded-full border-2 border-s-orange-500/30 border-t-orange-500/30" />
        </div>

        <div className="space-y-2 rounded-b-md p-4">
          <h3 className="text-card-foreground text-xl leading-tight font-bold text-balance">
            {offer.title}
          </h3>

          <div className="text-muted-foreground flex items-center gap-3">
            <DollarSign className="text-primary h-4 w-4" />
            <div className="text-sm">
              {t.rich("min_order", {
                highlight: (chunks) => (
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
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
  );
}
