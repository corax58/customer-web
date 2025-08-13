import { useCallback, useEffect, useState, useTransition } from "react";

import { getBannerItems } from "@/actions/actions";
import { BannerDetail } from "@/types/restaurant.types";

export function useBanner() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BannerDetail[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchBannerData = useCallback(async () => {
    setError(null);

    startTransition(async () => {
      const result = await getBannerItems();
      if (result.error) {
        setError(result.error);
      }
      if (result.data) {
        setData(result.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  return {
    data,
    isPending,
    error,
  };
}
