"use client";
import { useFormatter, useTranslations } from "next-intl";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { UsageHistoryEntry } from "@/types/profile.types";

interface UsageHistroyProps {
  usageHistory: UsageHistoryEntry[];
}
const itemPerPage = 5;
function UsageHistroy({ usageHistory }: UsageHistroyProps) {
  const t = useTranslations("profile.referrals.history_tabs");
  const formatter = useFormatter();
  const {
    currentPage,
    goNextPage,
    goPrevPage,
    isFirstPage,
    isLastPage,
    goToPage,
    totalPages,
  } = usePagination({
    itemPerPage,
    totalItems: usageHistory.length,
  });
  const start = currentPage * itemPerPage - itemPerPage;
  const end = currentPage * itemPerPage;
  return (
    <div className="space-y-4">
      {usageHistory.length == 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-muted-foreground">{t("no_usage")}</p>
        </div>
      )}
      {usageHistory.length > 0 &&
        usageHistory.slice(start, end).map((usage) => (
          <div
            key={usage.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex-1">
              {usage.order_number && (
                <p className="text-sm font-medium">
                  {t("order_no", { order_no: usage.order_number })}
                </p>
              )}
              {usage.used_at && (
                <p className="text-muted-foreground text-xs">
                  {formatter.dateTime(
                    new Date(usage.used_at),
                    "MMM dd',' yyyy',' hh:mm aa",
                  )}
                </p>
              )}
              {usage.status && (
                <p className="text-secondary-foreground text-xs">
                  {t("status", { status: usage.status })}
                </p>
              )}
            </div>
            {usage.discount_amount && (
              <div className="text-end">
                <p className="text-sm font-medium text-green-600">
                  <FormattedAfghani amount={usage.discount_amount} />
                </p>
                <Badge
                  variant={
                    usage.status === "completed" ? "default" : "secondary"
                  }
                  className={
                    usage.status === "completed"
                      ? "bg-green-500/10 text-green-800 hover:bg-green-500/10"
                      : "bg-yellow-500/10 text-yellow-800 hover:bg-yellow-500/10"
                  }
                >
                  {usage.status || "pending"}
                </Badge>
              </div>
            )}
          </div>
        ))}{" "}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goPrevPage}
                aria-disabled={isFirstPage}
                className={cn(
                  "cursor-pointer border",
                  isFirstPage && "text-muted-foreground cursor-not-allowed",
                )}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => goToPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {formatter.number(index + 1)}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={goNextPage}
                aria-disabled={isLastPage}
                className={cn(
                  "cursor-pointer border",
                  isLastPage && "text-muted-foreground cursor-not-allowed",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default UsageHistroy;
