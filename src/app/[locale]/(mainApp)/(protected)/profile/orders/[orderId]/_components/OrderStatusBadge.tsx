"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const OrderStatusMapping: Record<
  number,
  { key: string; label: string; className: string }
> = {
  0: {
    key: "order_placed",
    label: "Order Placed",
    className:
      "border border-orange-200 dark:border-orange-700 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  },
  1: {
    key: "order_placed",
    label: "Order Placed",
    className:
      "border border-orange-200 dark:border-orange-700 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  },
  // Merged "Order Confirmed"
  2: {
    key: "order_confirmed",
    label: "Order Confirmed",
    className:
      "border border-blue-200 dark:border-blue-700 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  },
  // Merged "Ready for Pickup"
  3: {
    key: "ready_for_pickup",
    label: "Ready for Pickup",
    className:
      "border border-orange-200 dark:border-orange-700 bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  },
  // Merged "Picked Up"
  4: {
    key: "picked_up",
    label: "Picked Up",
    className:
      "border border-purple-200 dark:border-purple-700 bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  },
  // Original "Delivered" state with better color
  5: {
    key: "delivered",
    label: "Delivered",
    className:
      "border border-green-200 dark:border-green-700 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  },
  // Original "Cancelled" state
  6: {
    key: "cancelled",
    label: "Cancelled",
    className:
      "border border-gray-200 dark:border-gray-700 bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400",
  },
  // Original "Rejected" state
  7: {
    key: "rejected",
    label: "Rejected",
    className:
      "border border-eed-200 dark:border-eed-700 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  },
};

interface OrderStatusBadgeProps {
  stateId: number;
}

const OrderStatusBadge = ({ stateId }: OrderStatusBadgeProps) => {
  const t = useTranslations("profile.orders.order_detail.order_status");
  const defaultState = {
    key: "unknown",
    label: "Unknown",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400",
  };

  const { className, key } = OrderStatusMapping[stateId] || defaultState;

  console.log(key);
  return <Badge className={cn("", className)}>{t(key)}</Badge>;
};

export default OrderStatusBadge;
