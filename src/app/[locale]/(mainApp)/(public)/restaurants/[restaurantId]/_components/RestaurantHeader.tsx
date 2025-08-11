import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { formatTimeHM } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant.types";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
  isOpen: boolean;
  className?: string;
}
const RestaurantHeader = ({
  restaurant,
  isOpen,
  className,
}: RestaurantHeaderProps) => {
  return (
    <div className={className}>
      <div className="flex w-full items-center justify-between gap-5 py-6 pt-3 max-lg:flex-col">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold lg:text-3xl">
            {restaurant.title}
          </p>
          {!isOpen && (
            <Badge className="h-fit rounded-full border-red-700 bg-red-500/90 text-white">
              Closed
            </Badge>
          )}
        </div>
        <div className="flex items-stretch gap-3 lg:items-center lg:gap-7">
          {restaurant.delivery_info.delivery_fee && (
            <div className="flex h-full flex-col items-center justify-start max-lg:gap-2 lg:items-end">
              <p className="text-muted-foreground text-sm max-sm:text-xs">
                Delivery fee
              </p>
              <p className="font-medium max-lg:text-sm">
                <FormattedAfghani
                  amount={restaurant.delivery_info.delivery_fee}
                />
              </p>
            </div>
          )}
          <div className="flex h-16 w-fit max-w-px flex-1 items-center">
            <div className="bg-border h-8 w-px" />
          </div>

          {restaurant.delivery_info.delivery_time_minutes && (
            <>
              <div className="flex h-full flex-col items-center justify-start max-lg:gap-2 lg:items-end">
                <p className="text-muted-foreground text-sm max-lg:text-center max-lg:text-xs">
                  <span className="max-sm:hidden">
                    Earliest Time of arrival
                  </span>
                  <span className="sm:hidden">Delivery Time</span>
                </p>
                <p className="font-medium max-lg:text-sm">
                  {formatTimeHM(parseFloat(restaurant.estimated_delivery_time))}
                </p>
              </div>
              <div className="flex h-16 w-fit max-w-px flex-1 items-center">
                <div className="bg-border h-8 w-px" />
              </div>
            </>
          )}
          <div className="flex h-full flex-col items-center justify-start max-lg:gap-2 lg:items-end">
            <p className="text-muted-foreground text-sm max-lg:text-center max-lg:text-xs">
              <span>Delivered by</span>
            </p>
            <p className="text-primary text-center font-medium max-lg:text-sm">
              Time Delivery
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <FadingDivider className="to-border" />
        <FadingDivider className="from-border" />
      </div>
    </div>
  );
};

export default RestaurantHeader;
