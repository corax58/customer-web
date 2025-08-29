import { useCallback, useEffect, useState, useTransition } from "react";

import { getRestaurantAds } from "@/actions/home.actions";
import { RestaurantAd } from "@/types/home.types";

export function useRestaurantAds() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RestaurantAd[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchRestaurantAds = useCallback(async () => {
    setError(null);

    startTransition(async () => {
      const result = await getRestaurantAds();
      if (result.error) {
        setError(result.error);
      }
      if (result.data) {
        setData(result.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchRestaurantAds();
  }, [fetchRestaurantAds]);

  return {
    data,
    isPending,
    error,
  };
}
