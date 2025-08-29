"use client";
import React, { useState } from "react";

import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AddOn } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import FormattedAfghani from "../FormattedAfghani";

interface AddOnListProps {
  addOns: AddOn[];
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const AddOnListItem = ({
  addOn,
  selectedAddonIds,
  setSelectedAddonIds,
}: {
  addOn: AddOn;
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    selectedAddonIds.includes(addOn.id),
  );

  return (
    <div
      className={cn("flex cursor-pointer items-center justify-between p-2")}
      onClick={() => {
        if (isSelected) {
          setSelectedAddonIds((prev) =>
            prev.filter((addonId) => addonId != addOn.id),
          );
          setIsSelected(false);
        } else {
          setSelectedAddonIds((prev) => [...prev, addOn.id]);
          setIsSelected(true);
        }
      }}
    >
      <div className="flex gap-4">
        <div className="relative size-14 overflow-hidden rounded-xl">
          <CustomImage
            imgUrl={addOn.add_on_category_id.image}
            title={addOn.title}
            placeholderImage={PLACEHOLDER_IMAGES.ADD_ON}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold">{addOn.title}</p>
          <p className="text-muted-foreground text-sm">
            <FormattedAfghani amount={addOn.price} />
          </p>
        </div>
      </div>
      <Checkbox checked={isSelected} />
    </div>
  );
};

const AddOnList = ({
  addOns,
  selectedAddonIds,
  setSelectedAddonIds,
}: AddOnListProps) => {
  const t = useTranslations("components.menu_item_detail");

  return (
    <div className="space-y-2">
      {addOns.length > 0 && <p className="font-medium">{t("add_ons")}</p>}
      <div className="space-y-4">
        {addOns.map((addOn) => (
          <AddOnListItem
            key={addOn.id}
            addOn={addOn}
            selectedAddonIds={selectedAddonIds}
            setSelectedAddonIds={setSelectedAddonIds}
          />
        ))}
      </div>
    </div>
  );
};

export default AddOnList;
