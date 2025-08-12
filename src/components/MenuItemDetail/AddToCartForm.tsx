"use client";
import { FormEvent } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/types/restaurant.types";

import CustomLink from "../CustomLink";
import FadingDivider from "../FadingDivider";
import FormattedAfghani from "../FormattedAfghani";

interface AddToCartFormProps {
  menuItem: MenuItem;
  itemQuantity: number;
  handleSubmit: (e: FormEvent) => void;
  isPending: boolean;
  selectedAddonIds: number[];
  setPreviousPath: () => void;
}

const AddToCartForm = ({
  menuItem,
  itemQuantity,
  handleSubmit,
  isPending,
  selectedAddonIds,
  setPreviousPath,
}: AddToCartFormProps) => {
  const { user } = useAuth();

  const calculateAddOnPrice = () => {
    return menuItem.addOnsList.reduce((total, item) => {
      return selectedAddonIds.includes(item.id)
        ? total + parseInt(item.price)
        : total;
    }, 0);
  };

  const addOnPrice = calculateAddOnPrice();
  const basePrice = parseInt(menuItem.itemPrice[0].price);
  const totalPrice = (basePrice + addOnPrice) * itemQuantity;

  return (
    <>
      <DialogFooter className="bg-secondary border-t p-4">
        {user ? (
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
            <div className="text-muted-foreground flex justify-between rounded-lg text-sm font-medium">
              <div>
                <p>Item price</p>
                <p>Add-on price</p>
              </div>
              <div className="text-right">
                <p>
                  <FormattedAfghani amount={basePrice} />
                </p>
                <p>
                  <FormattedAfghani amount={addOnPrice} />
                </p>
              </div>
            </div>
            <FadingDivider />
            <div className="mb-6 flex w-full justify-between">
              <p className="font-bold">Total price</p>
              <p className="text-primary font-bold">
                <FormattedAfghani amount={totalPrice} />
              </p>
            </div>
            <Button
              disabled={isPending || itemQuantity <= 0}
              className="w-full"
              type="submit"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Add to cart"}
            </Button>
          </form>
        ) : (
          <Button className="w-full" asChild onClick={setPreviousPath}>
            <CustomLink href="/login">Login to Order</CustomLink>
          </Button>
        )}
      </DialogFooter>
    </>
  );
};

export default AddToCartForm;
