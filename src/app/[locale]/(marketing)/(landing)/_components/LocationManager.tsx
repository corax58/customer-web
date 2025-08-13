"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LocationManager() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("lat") && searchParams.has("lon")) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        params.set("lat", latitude.toString());
        params.set("lon", longitude.toString());

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      },
      (error) => {
        console.error("Geolocation error:", error);

        params.set("lat", "none");
        params.set("lon", "none");

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, [pathname, router, searchParams]);

  return null;
}
