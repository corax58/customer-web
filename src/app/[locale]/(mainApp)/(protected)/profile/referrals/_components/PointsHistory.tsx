"use client";

import { useFormatter, useTranslations } from "next-intl";

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
import { PointsHistoryEntry } from "@/types/profile.types";
interface PointsHistoryProps {
  pointsHistory: PointsHistoryEntry[];
}
const itemPerPage = 5;
const PointsHistory = ({ pointsHistory }: PointsHistoryProps) => {
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
    totalItems: pointsHistory.length,
  });
  const start = currentPage * itemPerPage - itemPerPage;
  const end = currentPage * itemPerPage;
  return (
    <div className="space-y-4">
      {pointsHistory.length == 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-muted-foreground">{t("no_points")}</p>
        </div>
      )}
      {pointsHistory.length > 0 &&
        pointsHistory.slice(start, end).map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{entry.reason}</p>
              {entry.created_at && (
                <p className="text-muted-foreground text-xs">
                  {formatter.dateTime(new Date(entry.created_at), {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={entry.type === "earned" ? "default" : "secondary"}
                className={
                  entry.type === "earned"
                    ? "border border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/10"
                    : "border-eed-500 border bg-red-500/10 text-red-500 hover:bg-red-500/10"
                }
              >
                {entry.type === "earned"
                  ? t("gained_points", {
                      points: formatter.number(entry.points),
                    })
                  : t("used_points", {
                      points: formatter.number(entry.points),
                    })}
              </Badge>
            </div>
          </div>
        ))}
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
};

export default PointsHistory;
