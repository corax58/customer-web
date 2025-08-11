import FormattedAfghani from "@/components/FormattedAfghani";
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
            "cursor-not-allowed border-red-500 dark:border-red-500",
        )}
      >
        <CardContent className="rounded-none p-0">
          <div className="flex">
            {/* Left side - Discount stub */}
            <div className="flex w-fit flex-col items-center justify-center border-r-2 border-dashed border-orange-300 bg-gradient-to-b from-orange-500 to-amber-500 text-white dark:border-orange-700 dark:from-orange-600 dark:to-amber-600">
              <div className="py-4 text-center">
                <div className="flex flex-col items-center justify-center px-2 font-semibold">
                  <p className="text-nowrap">
                    - {parseFloat(offer.discount).toFixed(2)}
                  </p>
                  <p>AFN</p>
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
      {!reachMinPrice && (
        <div className="absolute top-15 left-20 w-fit rounded-full bg-red-500 px-2 py-0.5">
          Order is below minimum amount
        </div>
      )}

      {offer.id == selectedOffer?.id && (
        <div className="absolute top-2 left-2 rounded-full bg-green-500/80 px-2">
          Selected
        </div>
      )}
    </button>
  );
};

export default OfferCard;
