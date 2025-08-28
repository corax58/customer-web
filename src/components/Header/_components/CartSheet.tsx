"use client";

import { Loader, ShoppingCart } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import CheckoutSheet from "@/components/CheckoutSheet";
import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

import CartListItem from "./CartListItem";

export function CartSheet() {
  const { cartItems, isPending, totalItems, isLoadingTotalPrice, totalPrice } =
    useCart();

  const t = useTranslations("header.cart");
  const formatter = useFormatter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg"
          }
        >
          <ShoppingCart size={18} />
          {totalItems > 0 && (
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              {formatter.number(totalItems)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col rounded-l-2xl border-0 px-2 md:px-6">
        <SheetHeader className="px-0">
          <SheetTitle className="text-lg font-semibold">
            {t("title")}
          </SheetTitle>
        </SheetHeader>

        {isPending ? (
          <div className="flex h-96 w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : totalItems > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 py-2">
                {cartItems &&
                  cartItems.map((item) => (
                    <CartListItem key={item.id} cartItem={item} />
                  ))}
              </div>
            </div>

            <FadingDivider />
            <SheetFooter className="p-0 pb-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>{t("subtotal")}</span>
                  <span className="">
                    {isLoadingTotalPrice ? (
                      <Loader className="size-3.5 animate-spin" />
                    ) : (
                      <FormattedAfghani amount={totalPrice} />
                    )}
                  </span>
                </div>

                <CheckoutSheet className="w-full" disabled={!totalPrice} />
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingCart className="text-muted-foreground h-16 w-16" />
            <p className="mt-4 text-lg font-semibold">
              {t("empty_cart_title")}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("empty_cart_desc")}
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
