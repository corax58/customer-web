import React from "react";

import { DataTable } from "@/components/data-table";
import { Order } from "@/types/profile.types";

import useOrderColumns from "./useOrderColumns";

interface OrderTableProps {
  data: Order[];
}
const OrderTable = ({ data }: OrderTableProps) => {
  const { orderColumns } = useOrderColumns();
  return <DataTable columns={orderColumns} data={data} />;
};

export default OrderTable;
