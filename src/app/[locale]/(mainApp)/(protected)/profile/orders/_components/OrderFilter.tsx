"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
      <ToggleGroup
        type="single"
        className="bg-secondary p-1"
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
