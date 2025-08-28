import { getTranslations } from "next-intl/server";

import { getOrdersList } from "@/actions/profile.actions";
import CommonPagination from "@/components/CommonPagination";
import { Card, CardContent } from "@/components/ui/card";
import { buildUrlSearchParams } from "@/lib/utils";

import OrderTable from "./OrderTable";

interface OrdersListProps {
  params: { [key: string]: string | string[] | undefined };
}
const OrdersList = async ({ params }: OrdersListProps) => {
  if (!params["state"]) {
    params["state"] = "CURRENT";
  }
  const t = await getTranslations("profile.orders");

  const queryParams = buildUrlSearchParams(params).toString();

  const { data, pageData, error } = await getOrdersList(queryParams);

  if (error) {
    return (
      <Card className="border shadow-none">
        <CardContent className="flex h-28 items-center justify-center">
          <div className="text-muted-foreground text-lg">
            {t("error.something_went_wrong")}
          </div>
        </CardContent>
      </Card>
    );
  }
  if (data?.length === 0) {
    return (
      <Card className="border shadow-none">
        <CardContent className="flex h-28 items-center justify-center">
          <div className="text-muted-foreground text-lg">
            {t("no_orders_title")}
          </div>
          <div className="text-muted-foreground">{t("no_orders_desc")}</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {data && <OrderTable data={data} />}
      {pageData && <CommonPagination pageData={pageData} />}
    </div>
  );
};

export default OrdersList;
