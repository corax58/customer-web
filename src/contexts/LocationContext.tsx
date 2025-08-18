"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useTransition,
} from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

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
  setNoDefaultAddress: (value: boolean) => void;
}

const LocationContext = React.createContext<LocationContextType | undefined>(
  undefined,
);

const NoAddressRoutes = ["/setup-address", "/profile-setup", "/profile"];
const PERSONALIZED_ROUTES = ["/restaurants", "/home", "/categories"];

const LocationProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = React.useState<Location | null>(null);
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated, isLoading } = useAuth();
  const { getGuestUserLocation, guestLocation } = useGeolocation();

  const {
    noDefaultAddress,
    addressError,
    addressList,
    fetchLocations,
    setNoDefaultAddress,
  } = useAddress();

  const refreshAddress = useCallback(() => {
    setNoDefaultAddress(false);
    startTransition(() => {
      fetchLocations();
    });
  }, [fetchLocations, setNoDefaultAddress]);

  const updateParams = useCallback(
    (location: Location) => {
      const isPersonalizedPath = PERSONALIZED_ROUTES.some((route) =>
        pathname.includes(route),
      );

      if (!isPersonalizedPath || !location) return;

      const params = new URLSearchParams(searchParams.toString());

      if (location.latitude !== 0 && location.longitude !== 0) {
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
      if (newLoc.latitude !== 0 && newLoc.longitude !== 0)
        setLocation((prev) =>
          prev?.latitude === newLoc.latitude &&
          prev?.longitude === newLoc.longitude
            ? prev
            : newLoc,
        );
    }
  }, [guestLocation, updateParams, isAuthenticated]);

  useEffect(() => {
    if (!noDefaultAddress && isAuthenticated) {
      updateParams({
        latitude: 0,
        longitude: 0,
      });
    }
  }, [noDefaultAddress, updateParams, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !noDefaultAddress) return;

    const isNoAddressRoute = NoAddressRoutes.some((item) => item == pathname);

    if (!isNoAddressRoute) {
      router.push("/setup-address");
      toast.message("Set delivery address to continue using the app");
    }
  }, [isAuthenticated, noDefaultAddress, pathname, router]);

  const value = React.useMemo(
    () => ({
      location,
      isPending,
      addressList,
      addressError,
      refreshAddress,
      setNoDefaultAddress,
    }),
    [
      location,
      isPending,
      addressList,
      addressError,
      refreshAddress,
      setNoDefaultAddress,
    ],
  );

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
