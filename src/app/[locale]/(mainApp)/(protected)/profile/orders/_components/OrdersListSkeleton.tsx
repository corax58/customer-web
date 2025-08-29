import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersListSkeleton = () => {
  const columnCount = 5;

  const rowCount = 10;

  return (
    <div className="flex flex-col gap-4">
      {/* Skeleton for the DataTable */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Create a skeleton for each column header */}
              {Array.from({ length: columnCount }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Create a skeleton row for each item */}
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {/* Vary the width for a more realistic look */}
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Skeleton for the CommonPagination */}
      <div className="flex items-center justify-end gap-2 py-4">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
};

export default OrdersListSkeleton;
