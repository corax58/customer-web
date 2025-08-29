"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useFormatter, useTranslations } from "next-intl";

import CopiableText from "@/components/CopiableText";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types/profile.types";

import TransactionStatusBadge from "./TransactionStatusBadge";

const useTransactionColumns = () => {
  const formatter = useFormatter();
  const t = useTranslations("profile.transactions.columns");
  const transactionColumns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: t("transaction_id"),
      cell: ({ row }) => {
        const transactionId = row.original.id;
        return (
          <CopiableText
            text={"# " + transactionId.toString()}
            title={t("transaction_id")}
            className="bg-secondary cursor-pointer rounded-full py-0 text-sm"
          />
        );
      },
    },
    {
      accessorKey: "store_title",
      header: t("restaurant"),
      cell: ({ row }) => {
        const store = row.original.restaurant_name;
        return <span className="font-medium">{store}</span>;
      },
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const transactionState = row.original.status;
        return <TransactionStatusBadge state={transactionState} />;
      },
    },
    {
      accessorKey: "order_no",
      header: t("order_no"),
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
      header: t("placed_on"),
      cell: ({ row }) => {
        return (
          <span>
            {row.original.created_at
              ? formatter.dateTime(
                  new Date(row.original.created_at),
                  "dd MMM yy 'at' hh:mm aa",
                )
              : t("na")}
          </span>
        );
      },
    },
    {
      accessorKey: "gateway",
      header: t("method.title"),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.gateway == "cash_on_delivery" &&
            t("method.cash_on_delivery")}
          {row.original.gateway == "hesabpay" && t("method.hesab_pay")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: t("amount"),
      cell: ({ row }) => (
        <span className="font-medium">
          <FormattedAfghani amount={parseFloat(row.original.amount)} />
        </span>
      ),
    },
  ];

  return {
    transactionColumns,
  };
};

export default useTransactionColumns;
