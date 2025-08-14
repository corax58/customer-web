"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LocationManager() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (lat && lon && lat !== "none" && lon !== "none") {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isMounted) {
          const { latitude, longitude } = position.coords;
          params.set("lat", latitude.toString());
          params.set("lon", longitude.toString());
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
      },
      (error) => {
        if (isMounted) {
          console.error("Geolocation error:", error);

          params.set("lat", "none");
          params.set("lon", "none");
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    return () => {
      isMounted = false;
    };
  }, [pathname, searchParams, router]);

  return null;
}
