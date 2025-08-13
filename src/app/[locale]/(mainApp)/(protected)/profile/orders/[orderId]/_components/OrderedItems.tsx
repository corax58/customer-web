import { Dot } from "lucide-react";

import CustomImage from "@/components/CustomImage";
import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { ItemDetail } from "@/types/profile.types";

interface OrderedItemsProps {
  items: ItemDetail[];
}
const OrderedItems = ({ items }: OrderedItemsProps) => {
  return (
    <div>
      <p className="mb-4 font-medium">Order Items</p>
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex w-full items-center justify-between gap-5 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="relative size-14 overflow-hidden rounded-xl">
                <CustomImage
                  imgUrl={item.product_image}
                  title={item.product_detail}
                  placeholderImage={PLACEHOLDER_IMAGES.FOOD_ITEM}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">{item.product_detail}</p>
                <p className="text-muted-foreground text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-muted-foreground font-medium">
              <FormattedAfghani amount={parseFloat(item.item_price)} />
            </div>
          </div>
          {item.addOn.length > 0 && (
            <div>
              <div className="text-muted-foreground flex items-center text-sm font-medium">
                <Dot />
                Add-ons
              </div>

              <div className="grid grid-cols-2 px-8 max-sm:grid-cols-1 max-sm:px-4">
                {item.addOn.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="flex w-full items-center justify-between gap-5 rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-primary relative h-10 w-1 min-w-1 overflow-hidden rounded-full"></div>
                      <div className="flex h-full flex-col justify-between gap-1">
                        <p className="line-clamp-1 font-medium">
                          {addOn.title}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <FormattedAfghani amount={parseFloat(addOn.price)} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <FadingDivider />
        </div>
      ))}
    </div>
  );
};

export default OrderedItems;
