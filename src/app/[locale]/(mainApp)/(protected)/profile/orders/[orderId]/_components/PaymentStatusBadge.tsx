"use client";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PaymentStates = {
  1: {
    label: "Paid",
    key: "paid",
    color: "green",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-500",
  },
  0: {
    label: "Unpaid",
    color: "red",
    key: "unpaid",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-500",
  },
};

interface PaymentStatusBadgeProps {
  status: 1 | 0;
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const t = useTranslations("profile.orders.order_detail.payment_status");
  const { key, className, color } = PaymentStates[status];

  return (
    <Badge className={cn("h-8 sm:w-20", className)}>
      <div className={cn("size-1.5 rounded-full", `bg-${color}-500`)} />
      {t(key)}
    </Badge>
  );
};

export default PaymentStatusBadge;
