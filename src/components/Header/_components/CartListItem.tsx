"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { Dot, Loader2, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { deleteCartItem, updateCartItem } from "@/actions/cart.actions";
import CustomImage from "@/components/CustomImage";
import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import QuantityControl from "@/components/QuantityControl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import useDebounce from "@/hooks/useDebounce";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { getAddOns } from "@/lib/utils";
import { CartItem } from "@/types/cart.types";

interface CartListItemProps {
  cartItem: CartItem;
}
const CartListItem = ({ cartItem }: CartListItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(cartItem.quantity);

  const t = useTranslations("header.cart");

  const [isDeleting, startDeleteTransition] = useTransition();

  const { refreshCart, silentRefreshCart } = useCart();

  const debouncedQuantity = useDebounce(itemQuantity, 500);

  const initialRender = useRef(true);

  const updateQuantity = useCallback(async () => {
    const result = await updateCartItem(
      cartItem.id.toString(),
      debouncedQuantity.toString(),
    );
    if (result.success) silentRefreshCart();
    if (result.error) {
      toast.error(t("messages.failed_quantity_update"));
    }
  }, [cartItem.id, silentRefreshCart, debouncedQuantity, t]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (debouncedQuantity !== cartItem.quantity) {
      updateQuantity();
    }
  }, [debouncedQuantity, cartItem.quantity, updateQuantity]);

  const handleDelete = async () => {
    startDeleteTransition(async () => {
      const result = await deleteCartItem(cartItem.id.toString());
      if (result.error) {
        toast.error(t("messages.failed_remove_cart"));
      }
      if (result.success) refreshCart();
    });
  };

  return (
    <div key={cartItem.id} className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex h-full w-1/2 items-center gap-2 md:gap-4">
          <div className="relative h-14 w-16 min-w-16 overflow-hidden rounded-lg">
            <CustomImage
              imgUrl={cartItem.restaurant_items[0].image_file}
              title={cartItem.restaurant_items[0].title}
              placeholderImage={PLACEHOLDER_IMAGES.FOOD_ITEM}
            />
          </div>
          <div className="flex h-16 flex-col justify-between">
            <p className="line-clamp-2 leading-tight">
              {cartItem.restaurant_items[0].title}
            </p>
            <p className="text-muted-foreground font-medium">
              {cartItem.selected_rest_price.price ? (
                <FormattedAfghani amount={cartItem.selected_rest_price.price} />
              ) : (
                <span> </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-end pl-2 md:w-min md:flex-row-reverse md:items-center md:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background h-8 w-8 cursor-pointer hover:text-red-400"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
          </Button>

          <QuantityControl
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />
        </div>
      </div>

      {cartItem.additional_items && cartItem.additional_items.length > 0 && (
        <div className="flex w-full flex-col gap-2 pl-4">
          <div className="text-muted-foreground flex items-center text-sm font-medium">
            <Dot size={20} />
            {t("add_ons")}
          </div>
          <div className="flex flex-col gap-4">
            {getAddOns(cartItem).map((addOn) => (
              <div key={addOn.id} className="flex items-center gap-2 pl-6">
                <div className="bg-primary h-10 w-1 rounded-full" />
                <div className="flex flex-col gap-3">
                  <p className="line-he leading-1 font-medium">{addOn.title}</p>
                  <p className="text-muted-foreground text-sm">
                    <FormattedAfghani amount={addOn.price} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <FadingDivider />
    </div>
  );
};

export default CartListItem;
