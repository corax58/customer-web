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
  const { noDefaultAddress, addressError, addressList, fetchLocations } =
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

      const params = new URLSearchParams(searchParams.toString());

      if (location.latitude !== 0 && location.latitude !== 0) {
        params.set("lat", location.latitude.toString());
        params.set("lon", location.longitude.toString());
      }
      params.set("personalized", "true");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      getGuestUserLocation();
    }
  }, [isLoading, isAuthenticated, getGuestUserLocation]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      refreshAddress();
    }
  }, [isLoading, isAuthenticated, refreshAddress]);

  useEffect(() => {
    if (guestLocation && !isAuthenticated) {
      const newLoc = {
        latitude: guestLocation?.latitude,
        longitude: guestLocation?.longitude,
      };
      updateParams({ latitude: newLoc.latitude, longitude: newLoc.longitude });
      console.log(newLoc);
      if (newLoc.latitude !== 0 && newLoc.longitude !== 0)
        setLocation((prev) =>
          prev?.latitude === newLoc.latitude &&
          prev?.longitude === newLoc.longitude
            ? prev
            : newLoc,
        );
    }

    if (!noDefaultAddress && isAuthenticated) {
      updateParams({
        latitude: 0,
        longitude: 0,
      });
    }
  }, [
    guestLocation,
    updateParams,
    isAuthenticated,
    addressList,
    noDefaultAddress,
  ]);

  const value = {
    location,
    isPending,
    addressList,
    addressError,
    refreshAddress,
  };
  return (
    <LocationContext.Provider value={value}>
      <div className="relative">
        {noDefaultAddress && (
          <div className="ablsolute font-sigmar fixed top-96 right-10 z-50 rounded-full border-8 border-red-800 bg-red-500 p-10 text-4xl">
            No defaultAddress
          </div>
        )}
        {children}
      </div>
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
