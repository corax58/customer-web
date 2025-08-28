import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { DeliveryInfo } from "@/types/cart.types";
import { Offer } from "@/types/restaurant.types";

interface OrderButtonProps {
  handlePayment: () => void;

  selectedOffer: Offer | null;
  deliveryInfo: DeliveryInfo | null;
  isPendingDeliveryFee: boolean;
  disableOrder: boolean;
}
const OrderButton = ({
  handlePayment,

  selectedOffer,
  deliveryInfo,
  isPendingDeliveryFee,
  disableOrder,
}: OrderButtonProps) => {
  const t = useTranslations("components.checkout_sheet.order_button");
  const { isLoadingTotalPrice, totalPrice } = useCart();
  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;
  const total = deliveryInfo && totalPrice + deliveryInfo.fee - discount;
  return (
    <div>
      <div className="space-y-2">
        <FadingDivider />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground text-sm">
            {t("item_total")}
          </span>
          <span className="font-semibold text-orange-500">
            <FormattedAfghani amount={totalPrice} />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("delivery_fee")}</span>
          {isPendingDeliveryFee ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <span className="font-semibold text-orange-500">
              {deliveryInfo ? (
                <FormattedAfghani amount={deliveryInfo.fee} />
              ) : (
                t("select_address")
              )}
            </span>
          )}
        </div>
        {selectedOffer && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("discount")}</span>
            <span className="font-semibold text-orange-500">
              - <FormattedAfghani amount={selectedOffer?.discount} />
            </span>
          </div>
        )}
        <FadingDivider />
        <div className="flex justify-between text-lg">
          <span className="font-semibold">{t("total_price")}</span>
          {isLoadingTotalPrice || !deliveryInfo ? (
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
        {t("order_now")}
      </Button>
    </div>
  );
};

export default OrderButton;
