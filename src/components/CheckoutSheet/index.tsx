"use client";
import { useEffect, useState, useTransition } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { placeOrder } from "@/actions/actions";
import { getDeliveryFee } from "@/actions/cart.actions";
import Instructions from "@/components/CheckoutSheet/_components/Instructions";
import Offers from "@/components/CheckoutSheet/_components/Offers";
import OrderButton from "@/components/CheckoutSheet/_components/OrderButton";
import SelectAddress from "@/components/CheckoutSheet/_components/SelectAddress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CartItem, DeliveryInfo } from "@/types/cart.types";
import { Address } from "@/types/profile.types";
import { Offer, OrderPayload } from "@/types/restaurant.types";

import { Button } from "../ui/button";

import PaymentMethods from "./_components/PaymentMethods";

interface CheckoutSheetProps {
  className?: string;
  disabled?: boolean;
}
const CheckoutSheet = ({ className, disabled = false }: CheckoutSheetProps) => {
  const {
    cartItems,
    totalPrice,
    currentRestaurantId,
    totalItems,
    refreshCart,
  } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const t = useTranslations("components.checkout_sheet");

  const router = useRouter();
  const [isOrdering, startOrdering] = useTransition();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [isPendingDeliveryFee, startDeliveryFee] = useTransition();

  const discount: number = selectedOffer ? parseInt(selectedOffer.discount) : 0;

  const disableOrder =
    !totalPrice ||
    !deliveryInfo ||
    isPendingDeliveryFee ||
    isOrdering ||
    !selectedAddress ||
    totalItems == 0 ||
    !selectedPaymentMethod;

  const getItemArray = () => {
    if (!cartItems || cartItems.length === 0) return [];
    return cartItems.map((item: CartItem) => ({
      item_price: item.selected_rest_price.price,
      price_id: item.price_id,
      product_id: item.product_id,
      quantity: item.quantity,
      add_on: item.additional_items,
      type_id: item.type_id,
      store_type: item.store_type,
    }));
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      toast.info(t("messages.select_address"));
      return;
    }
    if (!cartItems) {
      toast.info(t("messages.empty_cart"));
      return;
    }

    if (!currentRestaurantId || !deliveryInfo) return;

    const orderItems = getItemArray();
    startOrdering(async () => {
      const rawData: { Detail: OrderPayload } = {
        Detail: {
          store_id: currentRestaurantId,
          address: selectedAddress.id.toString(),
          payable_amount: (totalPrice - discount + deliveryInfo.fee).toString(),
          delivery_charge: deliveryInfo.fee?.toString(),
          delivery_time: deliveryInfo.time?.toString(),
          delivery_distance: deliveryInfo.distance?.toString(),
          total_price: totalPrice.toString(),
          type_id: parseInt(selectedPaymentMethod!),
          item: JSON.stringify(orderItems),
        },
      };

      const results = await placeOrder(JSON.stringify(rawData));

      if (results.error) {
        toast.error(t("messages.failed_order"));
        return;
      }

      if (results.payment_url) {
        window.location.href = results.payment_url;
      } else {
        refreshCart();
        router.push("/profile/orders");
        toast.success(t("messages.success_order"));
      }
    });
  };

  useEffect(() => {
    startDeliveryFee(async () => {
      if (!selectedAddress?.id || !currentRestaurantId) return;
      const { data, error } = await getDeliveryFee({
        address_id: selectedAddress?.id,
        restaurant_id: currentRestaurantId,
      });

      if (data) {
        setDeliveryInfo(data);
      }
      if (error) {
        toast.error(t("messages.error"), { description: error });
      }
    });
  }, [selectedAddress, t, currentRestaurantId]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={cn(className)} disabled={disabled}>
          {t("trigger")}
        </Button>
      </SheetTrigger>
      <SheetContent className="h-dvh gap-0 overflow-y-auto rounded-l-2xl max-sm:w-dvw">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {t("title")}
          </SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-5">
          <Instructions
            additionalInstructions={additionalInstructions}
            setAdditionalInstructions={setAdditionalInstructions}
          />
          <SelectAddress
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <Offers
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </div>
        <SheetFooter>
          <OrderButton
            deliveryInfo={deliveryInfo}
            isPendingDeliveryFee={isPendingDeliveryFee}
            selectedOffer={selectedOffer}
            handlePayment={handleOrder}
            disableOrder={disableOrder}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutSheet;
