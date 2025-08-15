"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter } from "@/i18n/navigation";

const OrderFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentStatus = searchParams.get("state_id") || "1";
  const [status, setStatus] = useState(currentStatus);

  const debouncedStatus = useDebounce(status, 300);

  useEffect(() => {
    if (debouncedStatus != currentStatus) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedStatus === "5") {
        params.set("state_id", "5");
      } else {
        params.delete("state_id");
      }

      router.push(`${pathname}?${params.toString()}`);
    }
  }, [currentStatus, debouncedStatus, router, pathname, searchParams]);

  return (
    <div>
      <div className="md:hidden">
        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Active orders</SelectItem>
            <SelectItem value="5">Past orders</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ToggleGroup
        type="single"
        className="bg-secondary hidden p-1 md:flex"
        value={status}
        onValueChange={(status) => setStatus(status)}
      >
        <ToggleGroupItem
          value="1"
          className="data-[state=on]:bg-background rounded-md"
        >
          Active orders
        </ToggleGroupItem>
        <ToggleGroupItem
          value="5"
          className="data-[state=on]:bg-background rounded-md"
        >
          Past orders
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default OrderFilter;
