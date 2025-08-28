import React, { Suspense } from "react";

import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import BackButton from "@/components/BackButton";

import OrderDetail from "./_components/OrderDetail";
import OrderDetailSkeleton from "./_components/OrderDetailSkeleton";

interface OrderDetailPageProps {
  params: Promise<{ orderId: string }>;
}
const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { orderId } = await params;
  const t = await getTranslations("profile.orders.order_detail");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-5">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div>
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>
      </div>

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail orderId={orderId} />
      </Suspense>
    </div>
  );
};

export default OrderDetailPage;
