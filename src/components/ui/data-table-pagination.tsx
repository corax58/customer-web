import { Table } from "@tanstack/react-table";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { Icon } from "../Icon";

import { Button } from "./button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <Icon as={ChevronsLeft} isDirectional />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <Icon as={ChevronsLeft} isDirectional />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <Icon as={ChevronsRight} isDirectional />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <Icon as={ChevronsRight} isDirectional />
        </Button>
      </div>
    </div>
  );
}
