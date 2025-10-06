"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoveUpRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Icon } from "@/components/Icon";
import { Badge } from "@/components/ui/badge";
import { toLocalDate } from "@/lib/utils";
import { Order } from "@/types/profile.types";

const useOrderColumns = () => {
  const formatter = useFormatter();
  const t = useTranslations("profile.orders.columns");
  const orderColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "store_title",
      header: t("restaurant"),
      cell: ({ row }) => {
        const store = row.original.store_title;
        return <span className="font-medium">{store}</span>;
      },
    },
    {
      accessorKey: "order_no",
      header: t("order_no"),
      cell: ({ row }) => {
        const orderNo = row.original.order_no;
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
            {formatter.dateTime(toLocalDate(row.original.created_on), {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "total_price",
      header: t("amount"),
      cell: ({ row }) => (
        <span className="font-medium">
          <FormattedAfghani amount={row.original.total_price} />
        </span>
      ),
    },
    {
      header: "Detail",
      cell: ({ row }) => {
        return (
          <CustomLink
            href={`/profile/orders/${row.original.id}`}
            className="text-secondary-foreground flex items-center underline"
          >
            {t("view")}

            <Icon as={MoveUpRight} size={12} isDirectional />
          </CustomLink>
        );
      },
    },
  ];
  return { orderColumns };
};

export default useOrderColumns;
