import { ChevronRight, Layers2, ServerCrash, Stars } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getOrderDetail } from "@/actions/profile.actions";
import CustomImage from "@/components/CustomImage";
import CustomLink from "@/components/CustomLink";
import FadingDivider from "@/components/FadingDivider";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Icon } from "@/components/Icon";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

import OrderCancelModal from "./OrderCancelModal";
import OrderedItems from "./OrderedItems";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import ReviewModal from "./ReviewModal";
import { TrackOrder } from "./TrackOrder";

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail = async ({ orderId }: OrderDetailProps) => {
  const { data: order } = await getOrderDetail(orderId);
  const t = await getTranslations("profile.orders.order_detail");

  if (!order)
    return (
      <div className="border-destructive/20 bg-card flex max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center">
        <div className="bg-destructive/10 flex size-16 items-center justify-center rounded-full">
          <ServerCrash className="text-destructive size-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-foreground text-xl font-semibold">
            {t("error.title")}
          </h2>
          <p className="text-muted-foreground">{t("error.description")} </p>
        </div>
      </div>
    );

  const renderOrderDetailFooter = (stateId: number) => {
    if (stateId < 5) {
      return <OrderCancelModal orderId={order.id} />;
    }
    if (stateId > 5) return;

    if (stateId == 5 && order.is_rating)
      return (
        <div className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border">
          <Stars className="fill-yellow-500 stroke-1 text-yellow-500" />
          {t("thanks_feedback")}
        </div>
      );

    if (stateId == 5)
      return (
        <ReviewModal
          order={order}
          className="bg-primary w-full py-3 text-lg font-semibold text-white hover:bg-orange-600"
        />
      );
  };

  return (
    <div className="flex max-w-2xl flex-col gap-7">
      <FadingDivider />

      <div className="bg-card flex items-center rounded-2xl border px-4 py-3">
        <div className="flex h-full min-w-fit flex-col justify-between">
          <p className="text-muted-foreground text-sm">{t("order_no")}</p>
          <p className="text-lg font-medium">#{order.order_no}</p>
        </div>
        {order.state_id > 5 && (
          <div className="flex w-full justify-end">
            <OrderStatusBadge stateId={order.state_id} />
          </div>
        )}
      </div>
      <div>
        <p className="mb-4 font-medium">{t("delivery_address")}</p>
        <div className="bg-card flex w-full items-center gap-5 rounded-2xl border px-4 py-3">
          <Layers2 className="text-primary" />
          <div>
            <p className="text-lg font-medium">
              {order.customer_address_deatil.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.customer_address_deatil.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <CustomLink href={`/restaurants/${order.store_id}`}>
          <div className="group flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-14 overflow-hidden rounded-full">
                <CustomImage
                  imgUrl={order.storeDetail.image_file}
                  title={order.store_title}
                  placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
                  className="object-cover"
                />
              </div>
              <div className="flex h-full flex-col justify-between gap-2">
                <p className="text-lg font-medium">{order.storeDetail.title}</p>
                <p className="text-muted-foreground text-sm">
                  {order.storeDetail.location}
                </p>
              </div>
            </div>
            <Icon
              as={ChevronRight}
              isDirectional
              className="transition-all group-hover:translate-x-4"
            />
          </div>
        </CustomLink>
        <FadingDivider />
        {order.state_id <= 5 && (
          <TrackOrder
            order_id={order.id.toString()}
            restaurant={order.storeDetail}
          />
        )}
      </div>
      <OrderedItems items={order.item_detail} />

      <div>
        <p className="mb-4 font-medium">{t("payment")}</p>
        <div className="bg-card flex w-full items-center justify-between gap-5 rounded-2xl border px-4 py-3">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              {t("payment_method")}
            </p>
            <p className="font-medium sm:text-lg">
              {order.payment_type == 1 && t("cash_on_delivery")}
              {order.payment_type == 4 && t("hesab_pay")}
            </p>
          </div>
          {(order.payment_status === 1 || order.payment_status == 0) && (
            <PaymentStatusBadge status={order.payment_status} />
          )}
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <FadingDivider />
        <div className="flex justify-between">
          <span className="text-secondary-foreground">{t("item_total")}</span>
          <span className="font-medium">
            <FormattedAfghani amount={parseFloat(order.total_price)} />
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-secondary-foreground">
            {t("delivery_charges")}
          </span>
          <span className="font-medium">
            <FormattedAfghani amount={parseFloat(order.delivery_charge)} />
          </span>
        </div>
        <FadingDivider />
        <div className="flex justify-between text-lg font-bold">
          <span className="">{t("total")}</span>
          <span className="">
            <FormattedAfghani amount={parseFloat(order.payable_amount)} />
          </span>
        </div>
      </div>

      <div className="pb-6">{renderOrderDetailFooter(order.state_id)}</div>
    </div>
  );
};

export default OrderDetail;
