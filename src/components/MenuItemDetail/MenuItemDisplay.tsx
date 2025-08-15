import DOMPurify from "isomorphic-dompurify";
import { CookingPot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getMenuItemPrice } from "@/lib/utils";
import { MenuItem } from "@/types/restaurant.types";

import FadingDivider from "../FadingDivider";
import FormattedAfghani from "../FormattedAfghani";
import QuantityControl from "../QuantityControl";

import AddOnList from "./AddOnList";

interface MenuItemDisplayProps {
  menuItem: MenuItem;
  selectedAddonIds: number[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<number[]>>;
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItemDisplay = ({
  menuItem,
  selectedAddonIds,
  setSelectedAddonIds,
  itemQuantity,
  setItemQuantity,
}: MenuItemDisplayProps) => {
  const sanitizedDescription = DOMPurify.sanitize(menuItem.description || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="h-auto flex-1 space-y-5 overflow-y-auto px-4 pt-3 sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Badge
              variant="secondary"
              className="text-muted-foreground mb-1 rounded-full py-1"
            >
              {menuItem.cuisine_type_name}
            </Badge>
            <p className="text-lg font-medium">{menuItem.title}</p>
          </div>
          <p className="text-xl font-semibold">
            <FormattedAfghani amount={getMenuItemPrice(menuItem)} />
          </p>
        </div>

        <div className="text-muted-foreground flex items-center gap-1">
          <CookingPot size={16} /> {menuItem.cook_time}
          <span> min</span>
        </div>
      </div>

      <div className="space-y-2 pb-4">
        <p className="font-bold">Description</p>

        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p>Quantity</p>
        <QuantityControl
          setItemQuantity={setItemQuantity}
          itemQuantity={itemQuantity}
        />
      </div>

      {menuItem.addOnsList.length > 0 && <FadingDivider />}

      <AddOnList
        addOns={menuItem.addOnsList}
        selectedAddonIds={selectedAddonIds}
        setSelectedAddonIds={setSelectedAddonIds}
      />
    </div>
  );
};

export default MenuItemDisplay;
