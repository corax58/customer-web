import { Suspense } from "react";
import { Metadata } from "next";

import OrderFilter from "./_components/OrderFilter";
import OrdersList from "./_components/OrdersList";
import OrdersListSkeleton from "./_components/OrdersListSkeleton";

export const metadata: Metadata = {
  title: "Your Orders | Time delivery",
  description:
    "View your past and current orders. Track the status of your delivery and reorder your favorite meals with ease.",
};

interface OrdersPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}
const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const params = await searchParams;
  const key = JSON.stringify(params);
  return (
    <div className="w-full space-y-6 px-0 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Order History
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            View and track your recent orders.
          </p>
        </div>
        <OrderFilter />
      </div>

      <div className="space-y-4">
        <Suspense fallback={<OrdersListSkeleton />}>
          <OrdersList key={key} params={params} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrdersPage;
