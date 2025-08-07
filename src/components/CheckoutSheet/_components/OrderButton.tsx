import { Loader2 } from "lucide-react";

import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Offer } from "@/types/restaurant.types";

interface OrderButtonProps {
  handlePayment: () => void;

  selectedOffer: Offer | null;
  deliveryFee: number | null;
  isPendingDeliveryFee: boolean;
  disableOrder: boolean;
}
const OrderButton = ({
  handlePayment,

  selectedOffer,
  deliveryFee,
  isPendingDeliveryFee,
  disableOrder,
}: OrderButtonProps) => {
  const { isLoadingTotalPrice, totalPrice } = useCart();
  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;
  const total = deliveryFee && totalPrice + deliveryFee - discount;
  return (
    <div>
      <div className="space-y-2">
        <FadingDivider />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground text-sm">Item total</span>
          <span className="font-semibold text-orange-500">
            <FormattedAfghani amount={totalPrice} />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery fees</span>
          {isPendingDeliveryFee ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <span className="font-semibold text-orange-500">
              {deliveryFee ? (
                <FormattedAfghani amount={deliveryFee} />
              ) : (
                "Select an address"
              )}
            </span>
          )}
        </div>
        {selectedOffer && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-semibold text-orange-500">
              - <FormattedAfghani amount={selectedOffer?.discount} />
            </span>
          </div>
        )}
        <FadingDivider />
        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total price</span>
          {isLoadingTotalPrice || !deliveryFee ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <span className="font-bold text-orange-500">
              <FormattedAfghani amount={total ? total : 0} />
            </span>
          )}
        </div>
      </div>
      <Button
        className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
        onClick={handlePayment}
        disabled={disableOrder}
      >
        Order Now
      </Button>
    </div>
  );
};

export default OrderButton;
