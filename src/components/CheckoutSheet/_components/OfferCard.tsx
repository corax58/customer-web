import { useFormatter, useTranslations } from "next-intl";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Offer } from "@/types/restaurant.types";

interface OfferCardProps {
  offer: Offer;
  selectedOffer: Offer | null;
  setSelectedOffer: React.Dispatch<React.SetStateAction<Offer | null>>;
}
const OfferCard = ({
  offer,
  selectedOffer,
  setSelectedOffer,
}: OfferCardProps) => {
  const { totalPrice } = useCart();
  const t = useTranslations("components.checkout_sheet.offers");
  const formatter = useFormatter();

  const reachMinPrice = totalPrice >= parseInt(offer.minimum_amount);

  return (
    <button
      className="relative w-full"
      onClick={() => {
        if (!reachMinPrice) return;
        if (selectedOffer?.id == offer.id) {
          setSelectedOffer(null);
        } else {
          setSelectedOffer(offer);
        }
      }}
    >
      <Card
        className={cn(
          "group border-primary dark:border-primary/50 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed p-0",
          !reachMinPrice &&
            "border-eed-500 dark:border-eed-500 cursor-not-allowed",
        )}
      >
        <CardContent className="rounded-none p-0">
          <div className="flex">
            {/* Left side - Discount stub */}
            <div className="flex w-fit flex-col items-center justify-center border-e-2 border-dashed border-orange-300 bg-gradient-to-b from-orange-500 to-amber-500 text-white dark:border-orange-700 dark:from-orange-600 dark:to-amber-600">
              <div className="py-4 text-center">
                <div className="flex flex-col items-center justify-center px-2 font-semibold">
                  <p className="text-nowrap">
                    - {parseFloat(offer.discount).toFixed(2)}
                  </p>
                  <p>AFN</p>

                  <p>
                    {t("discount", {
                      discoount: formatter.number(parseFloat(offer.discount), {
                        minimumFractionDigits: 2,
                      }),
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-2">
              <div className="space-y-3">
                <div className="flex items-start">
                  <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400">
                    {offer.title}
                  </h3>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {t.rich("min_order", {
                        highlight: () => (
                          <span className="font-medium text-orange-600 dark:text-orange-400">
                            <FormattedAfghani amount={offer.minimum_amount} />
                          </span>
                        ),
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {!reachMinPrice && (
        <Badge
          variant={"destructive"}
          className="border-eed-700 absolute start-2 top-2 border bg-red-500 text-white"
        >
          {t("below_min")}
        </Badge>
      )}

      {offer.id == selectedOffer?.id && (
        <Badge className="absolute start-2 top-2 rounded-full border border-green-900 bg-green-600 px-2 text-white">
          {t("selected")}
        </Badge>
      )}
    </button>
  );
};

export default OfferCard;
