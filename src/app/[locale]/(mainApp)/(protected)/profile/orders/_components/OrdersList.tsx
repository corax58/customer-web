import { getOrdersList } from "@/actions/profile.actions";
import CommonPagination from "@/components/CommonPagination";
import { DataTable } from "@/components/data-table";
import { buildUrlSearchParams } from "@/lib/utils";

import { orderColumns } from "./columns";

interface OrdersListProps {
  params: { [key: string]: string | string[] | undefined };
}
const OrdersList = async ({ params }: OrdersListProps) => {
  if (!params["state"]) {
    params["state"] = "CURRENT";
  }

  const queryParams = buildUrlSearchParams(params).toString();

  const { data, pageData } = await getOrdersList(queryParams);

  return (
    <div className="flex flex-col gap-4">
      {data && <DataTable columns={orderColumns} data={data} />}
      {pageData && <CommonPagination pageData={pageData} />}
    </div>
  );
};

export default OrdersList;
