"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useSearchParams } from "next/navigation";

import useAddress from "@/hooks/useAddress";
import useGeolocation from "@/hooks/useGeolocation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Address } from "@/types/profile.types";
import { Location } from "@/types/shared.types";

import { useAuth } from "./AuthContext";

interface LocationContextType {
  location: Location | null;
  isPending: boolean;
  addressList: Address[] | null;
  defaultAddress: Address | null;
  addressError: string | null;
  refreshAddress: () => void;
}

const LocationContext = React.createContext<LocationContextType | undefined>(
  undefined,
);

const LocationProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = React.useState<Location | null>(null);
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated, isLoading } = useAuth();
  const { getGuestUserLocation, guestLocation } = useGeolocation();
  const { defaultAddress, addressError, addressList, fetchLocations } =
    useAddress();

  const refreshAddress = useCallback(() => {
    startTransition(() => {
      fetchLocations();
    });
  }, [fetchLocations]);

  const updateParams = useCallback(
    (location: Location) => {
      const personalizedPath =
        pathname.includes("/restaurants") ||
        pathname.includes("/home") ||
        pathname.includes("/categories");
      if (!personalizedPath || !location) return;

      const latInUrl = searchParams.get("lat");
      const lonInUrl = searchParams.get("lon");

      const newLat =
        location.latitude === 0 ? "none" : location.latitude.toString();
      const newLon =
        location.longitude === 0 ? "none" : location.longitude.toString();

      if (latInUrl === newLat && lonInUrl === newLon) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("lat", newLat);
      params.set("lon", newLon);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if ((!isLoading && !isAuthenticated) || (addressList && !defaultAddress)) {
      getGuestUserLocation();
    }
  }, [
    isLoading,
    isAuthenticated,
    addressList,
    defaultAddress,
    getGuestUserLocation,
  ]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      refreshAddress();
    }
  }, [isLoading, isAuthenticated, refreshAddress]);

  useEffect(() => {
    if (
      (guestLocation && !isAuthenticated) ||
      (guestLocation && addressList && !defaultAddress)
    ) {
      const newLoc = {
        latitude: guestLocation?.latitude,
        longitude: guestLocation?.longitude,
      };
      updateParams({ latitude: newLoc.latitude, longitude: newLoc.longitude });
      setLocation((prev) =>
        prev?.latitude === newLoc.latitude &&
        prev?.longitude === newLoc.longitude
          ? prev
          : newLoc,
      );
    }

    if (defaultAddress && isAuthenticated) {
      const newLoc = {
        latitude: parseFloat(defaultAddress.latitude),
        longitude: parseFloat(defaultAddress.longitude),
      };
      updateParams({
        latitude: newLoc.latitude,
        longitude: newLoc.longitude,
      });
      setLocation((prev) =>
        prev?.latitude === newLoc.latitude &&
        prev?.longitude === newLoc.longitude
          ? prev
          : newLoc,
      );
    }
  }, [
    guestLocation,
    defaultAddress,
    updateParams,
    isAuthenticated,
    addressList,
  ]);

  const value = {
    location,
    isPending,
    addressList,
    defaultAddress,
    addressError,
    refreshAddress,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export default LocationProvider;
