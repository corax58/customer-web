"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TransactionStates = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  success: {
    label: "Success",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  },
};

type TransactionState = keyof typeof TransactionStates;
interface TransactionStatusBadgeProps {
  state: TransactionState;
}

const TransactionStatusBadge = ({ state }: TransactionStatusBadgeProps) => {
  const t = useTranslations("profile.transactions.status");
  const { className } =
    TransactionStates[state] || TransactionStates["pending"];

  return <Badge className={cn("rounded-full", className)}>{t(state)}</Badge>;
};

export default TransactionStatusBadge;
