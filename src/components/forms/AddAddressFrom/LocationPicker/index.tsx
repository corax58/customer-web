"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ControlPosition,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGeocoder } from "@/hooks/useGeocoder";
import useGeolocation from "@/hooks/useGeolocation";
import { cn } from "@/lib/utils";

import AutocompleteControl from "./AutocompleteControl";
import AutocompleteResult from "./AutocompleteResult";

interface LocationPickerProps {
  className?: string;
  onLocationSelect: (location: {
    address: string;
    position: google.maps.LatLngLiteral;
  }) => void;
  noAddressError: boolean;
}

export function LocationPicker({
  onLocationSelect,
  className,
  noAddressError,
}: LocationPickerProps) {
  const t = useTranslations("components.add_address_form");

  const {
    getGuestUserLocation,
    guestLocation,
    error: guestLocationError,
  } = useGeolocation();
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>({
      lat: guestLocation?.latitude as number,
      lng: guestLocation?.longitude as number,
    });
  const hasCurrentLocation =
    currentLocation.lat !== undefined && currentLocation.lng !== undefined
      ? currentLocation.lat !== 0 && currentLocation.lng !== 0
      : false;

  const [selectedMapLocation, setSelectedMapLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const {
    error: geocoderError,
    loading: geocoderLoading,
    reverseGeocode,
  } = useGeocoder();

  // For the autocomplete result
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null);

  // Sometimes the guestLocation is not available immediately, so we need check in 2sec and if re-assign the currentLocation
  useEffect(() => {
    // Only do this is the currentLocation is empty
    if (!currentLocation.lat && !currentLocation.lng) {
      const timer = setTimeout(() => {
        setCurrentLocation({
          lat: guestLocation?.latitude as number,
          lng: guestLocation?.longitude as number,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [guestLocation, currentLocation.lat, currentLocation.lng]);

  useEffect(() => {
    if (!guestLocation) {
      getGuestUserLocation();
    }

    if (guestLocation) {
      const newLocation = {
        lat: guestLocation.latitude,
        lng: guestLocation.longitude,
      };
      // Only update if the location actually changed
      if (
        currentLocation.lat !== newLocation.lat ||
        currentLocation.lng !== newLocation.lng
      ) {
        setCurrentLocation(newLocation);
      }
    }
  }, [
    guestLocation,
    getGuestUserLocation,
    currentLocation.lat,
    currentLocation.lng,
  ]);

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    const latLng = event.detail?.latLng;

    if (latLng) {
      const newPosition = {
        lat: latLng.lat,
        lng: latLng.lng,
      };
      setLocationSelected(false);
      setSelectedMapLocation(newPosition);
    }
  }, []);

  const [locationSelected, setLocationSelected] = useState(false);

  const handleConfirmLocation = async () => {
    if (selectedMapLocation) {
      const results = await reverseGeocode({
        lat: selectedMapLocation.lat,
        lng: selectedMapLocation.lng,
      });
      if (!results.success) return;
      onLocationSelect({
        address: results.address || "",
        position: selectedMapLocation as google.maps.LatLngLiteral,
      });
      setLocationSelected(true);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-2 text-sm">
        {t("messages.map_instruction")}
      </p>

      <div className="h-96 w-full overflow-hidden rounded-lg">
        {/* Only show tha map when the currentLocation is available */}
        {hasCurrentLocation && (
          <>
            <Map
              style={{ width: "full" }}
              defaultCenter={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              defaultZoom={15}
              gestureHandling={"greedy"}
              disableDefaultUI={false}
              onClick={handleMapClick}
            />
            <Marker
              position={
                selectedMapLocation || {
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }
              }
              clickable
            />
            <AutocompleteControl
              controlPosition={ControlPosition.LEFT_TOP}
              onPlaceSelect={(value) => {
                setSelectedPlace(value);
                const newPosition = JSON.parse(JSON.stringify(value));
                setLocationSelected(false);
                setSelectedMapLocation({
                  lat: newPosition?.location?.lat as number,
                  lng: newPosition?.location?.lng as number,
                });
              }}
            />

            <AutocompleteResult place={selectedPlace} />
          </>
        )}
        {guestLocationError?.code == 1 && (
          <div className="flex h-full w-full items-center justify-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              {t("messages.allow_location_permission")}
            </p>
          </div>
        )}
        {!currentLocation.lat &&
          !currentLocation.lng &&
          !guestLocationError && <Skeleton className="h-full w-full" />}
      </div>

      <div
        className={cn(
          "bg-secondary mt-4 rounded-lg border p-4",
          (noAddressError || geocoderError) && "ring-2 ring-red-400",
          locationSelected && "bg-green-500/10 ring-2 ring-green-500",
        )}
      >
        <Button
          onClick={handleConfirmLocation}
          disabled={!selectedMapLocation}
          className={cn(
            "w-44",
            locationSelected && "bg-green-600 hover:bg-green-700",
          )}
        >
          {locationSelected ? (
            <>
              <CheckCircle2 className="me-2 h-4 w-4" />
              {t("buttons.location_confirmed")}
            </>
          ) : geocoderLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("buttons.confirm_location")
          )}
        </Button>

        <div className="mt-2 text-sm">
          {locationSelected && (
            <span className="text-green-600">
              {t("messages.location_confirmed_success")}
            </span>
          )}

          {noAddressError && !locationSelected && (
            <span className="text-red-400">
              {t("messages.select_location_error")}
            </span>
          )}
          {geocoderError && (
            <span className="text-red-400">
              {t("messages.geocoding_error")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
