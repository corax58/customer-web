"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CopiableText from "@/components/CopiableText";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types/profile.types";

import TransactionStatusBadge from "./TransactionStatusBadge";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.original.id;
      return (
        <CopiableText
          text={"# " + transactionId.toString()}
          title="Transaction Id"
          className="bg-secondary cursor-pointer rounded-full py-0 text-sm"
        />
      );
    },
  },
  {
    accessorKey: "store_title",
    header: "Restaurant",
    cell: ({ row }) => {
      const store = row.original.restaurant_name;
      return <span className="font-medium">{store}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const transactionState = row.original.status;
      return <TransactionStatusBadge state={transactionState} />;
    },
  },
  {
    accessorKey: "order_no",
    header: "Order No",
    cell: ({ row }) => {
      const orderNo = row.original.order_id;
      return (
        <Badge variant={"secondary"} className="text-secondary-foreground">
          #{orderNo}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_on",
    header: "Placed on",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.created_at
            ? format(
                new Date(row.original.created_at),
                "dd MMM yy 'at' hh:mm aa",
              )
            : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "gateway",
    header: "Method",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.gateway == "cash_on_delivery" && "Cash on Delivery"}
        {row.original.gateway == "hesabpay" && "Hesab Pay"}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">
        {" "}
        <FormattedAfghani amount={parseFloat(row.original.amount)} />
      </span>
    ),
  },
];
