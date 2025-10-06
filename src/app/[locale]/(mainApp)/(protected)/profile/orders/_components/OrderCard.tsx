import Image from "next/image";

import { format } from "date-fns";

import CustomLink from "@/components/CustomLink";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toLocalDate } from "@/lib/utils";
import { Order } from "@/types/profile.types";

interface OrderCardProps {
  order: Order;
}
const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card className="border-2 py-2 shadow-none">
      <CardContent className="flex justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative size-16 md:size-28">
            <Image
              src={order.storeDetail.image_file}
              alt={`${order.store_title} image`}
              fill
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-bold">{order.store_title}</p>
            <div className="flex items-center gap-2 text-sm">
              <p className="font-semibold">Order Id : </p>{" "}
              <p className="text-muted-foreground">{order.order_no}</p>
            </div>
            <p className="text-muted-foreground flex gap-2 text-sm">
              <span className="text-foreground font-semibold max-md:hidden">
                Placed on :
              </span>
              {format(toLocalDate(order.created_on), "dd MMM yy 'at' HH:mm")}
            </p>
            <div className="flex items-center gap-2 max-md:hidden">
              <p className="font-semibold">Delivered to : </p>
              <p className="text-muted-foreground">
                {order.customer_address_deatil.title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-primary text-lg font-bold">
            <FormattedAfghani amount={parseFloat(order.total_price)} />
          </div>
          <Button asChild>
            <CustomLink href={`/profile/orders/${order.id}`}>
              View Details
            </CustomLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
