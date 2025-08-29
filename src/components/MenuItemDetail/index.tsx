"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { addToCartAction } from "@/actions/cart.actions";
import { getMenuItemDetail } from "@/actions/restaurants.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { usePathname } from "@/i18n/navigation";
import { MenuItem } from "@/types/restaurant.types";

import AddToCartForm from "./AddToCartForm";
import MenuItemDetailSkeleton from "./MenuItemDetailSkeleton";
import MenuItemDisplay from "./MenuItemDisplay";
import MenuItemHeader from "./MenuItemHeader";

interface MenuItemDetailProps {
  menuItemId: string;
  className?: string;
  children: React.ReactNode;
}

const MenuItemDetail = ({
  menuItemId,

  children,
}: MenuItemDetailProps) => {
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const [isOpen, setIsOpen] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);
  const [isClearCartOpen, setClearCartOpen] = useState(false);

  const currentPath = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isLoadingItem, startLoadingItem] = useTransition();

  const { refreshCart, currentRestaurantId, cartItems } = useCart();

  const t = useTranslations("components.menu_item_detail");

  const checkIfInCart = (): boolean => {
    const itemInCart = cartItems?.find(
      (item) => item.product_id.toString() === menuItemId,
    );
    if (itemInCart) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !currentRestaurantId ||
      currentRestaurantId.toString() === menuItem?.restaurant_id.toString()
    ) {
      handleAddToCart();
    } else {
      setClearCartOpen(true);
    }
  };

  const handleAddToCart = async (clearCart?: boolean) => {
    if (!menuItem) return;

    if (checkIfInCart()) {
      toast.message(t("messages.item_in_cart"));
      return;
    }

    const getSelectedAddons = () => {
      return menuItem.addOnsList
        .filter((item) => selectedAddonIds.includes(item.id))
        .map((item) => ({
          add_on_id: item.id.toString(),
          price: item.price.toString(),
        }));
    };

    const data = {
      Cart: {
        store_id: menuItem.restaurant_id.toString(),
        type_id: menuItem.type_id.toString(),
        addones: JSON.stringify(getSelectedAddons()),
      },
      CartItem: {
        price_id: menuItem.itemPrice[0].id.toString(),
        product_id: menuItem.id.toString(),
        quantity: itemQuantity.toString(),
      },
    };

    startTransition(async () => {
      const results = await addToCartAction(data, clearCart);
      if (results.error) {
        toast.error(t("messages.failed_add_to_cart"), {
          description: results.error,
        });
      } else {
        toast.success(t("messages.success_add_to_cart"));
        setIsOpen(false);
        refreshCart();
      }
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    startLoadingItem(async () => {
      const data = await getMenuItemDetail(menuItemId);
      if (data.error) {
        toast.error(t("messages.failed_fetch"), {
          description: data.error,
        });
        setIsOpen(false);
      } else {
        setMenuItem(data.data);
      }
    });
  }, [menuItemId, isOpen, t]);

  return (
    <>
      <AlertDialog open={isClearCartOpen} onOpenChange={setClearCartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("clear_cart.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("clear_cart.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("clear_cart.buttons.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAddToCart(true)}>
              {t("clear_cart.buttons.continue")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-dvh min-w-72 flex-col gap-0 overflow-hidden border-0 p-0 max-sm:w-dvw max-sm:min-w-dvw"
        >
          <DialogHeader className="hidden">
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </DialogHeader>
          {isLoadingItem ? (
            <MenuItemDetailSkeleton />
          ) : (
            menuItem && (
              <>
                <MenuItemHeader menuItem={menuItem} />

                <div className="flex-grow overflow-y-auto">
                  <MenuItemDisplay
                    menuItem={menuItem}
                    selectedAddonIds={selectedAddonIds}
                    setSelectedAddonIds={setSelectedAddonIds}
                    itemQuantity={itemQuantity}
                    setItemQuantity={setItemQuantity}
                    setIsOpen={setIsOpen}
                  />
                  <AddToCartForm
                    menuItem={menuItem}
                    itemQuantity={itemQuantity}
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                    selectedAddonIds={selectedAddonIds}
                    setPreviousPath={() =>
                      localStorage.setItem("previousPath", currentPath)
                    }
                  />
                </div>
              </>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItemDetail;
