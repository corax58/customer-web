import { useCallback, useState } from "react";

import { Location } from "@/types/shared.types";

export default function useGeolocation() {
  const [guestLocation, setGuestLocation] = useState<Location | null>(null);

  const [error, setError] = useState<{ code: number; message: string } | null>(
    null,
  );

  const getGuestUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGuestLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError(err);
          setGuestLocation({
            latitude: 0,
            longitude: 0,
          });
        },
      );
    } else {
      setError({
        code: 0,
        message: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  return { guestLocation, error, getGuestUserLocation };
}
