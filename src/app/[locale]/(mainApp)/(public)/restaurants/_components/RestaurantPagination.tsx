"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { useFormatter } from "next-intl";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "@/i18n/navigation";
import { scrollToTop } from "@/lib/utils";
import { PageData } from "@/types/shared.types";

interface RestaurantPaginationProps {
  pageData: PageData;
}

const RestaurantPagination = ({ pageData }: RestaurantPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const format = useFormatter();

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > pageData.pageCount ||
      page === pageData.currentPage
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", (page - 1).toString());
    router.push(`${pathname}?${params.toString()}`);
    scrollToTop();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePageChange(pageData.currentPage - 1)}
          />
        </PaginationItem>
        {Array.from({ length: pageData.pageCount }, (_, i) => i + 1)
          .slice(0, 3)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(page)}
                isActive={page === pageData.currentPage}
              >
                {format.number(page)}
              </PaginationLink>
            </PaginationItem>
          ))}

        {pageData.pageCount > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handlePageChange(pageData.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default RestaurantPagination;
