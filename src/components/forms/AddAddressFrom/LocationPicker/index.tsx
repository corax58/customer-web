"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  APIProvider,
  ControlPosition,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { CheckCircle2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
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
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!;
  const t = useTranslations("components.add_address_form");

  const { getGuestUserLocation, guestLocation } = useGeolocation();
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>({
      lat: guestLocation?.latitude as number,
      lng: guestLocation?.longitude as number,
    });

  const [selectedMapLocation, setSelectedMapLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

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

  const handleConfirmLocation = () => {
    if (selectedMapLocation) {
      setLocationSelected(true);
      onLocationSelect({
        address: selectedPlace?.displayName || "",
        position: selectedMapLocation as google.maps.LatLngLiteral,
      });
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-2 text-sm">
        {t("messages.map_instruction")}
      </p>

      <div className="h-96 w-full overflow-hidden rounded-lg">
        {/* Only show tha map when the currentLocation is available */}
        {currentLocation.lat && currentLocation.lng ? (
          <>
            <APIProvider apiKey={API_KEY} libraries={["places", "marker"]}>
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
            </APIProvider>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              {t("messages.allow_location_permission")}
            </p>
          </div>
        )}
      </div>

      <div
        className={cn(
          "bg-secondary mt-4 rounded-lg border p-4",
          noAddressError && "ring-2 ring-red-400",
          locationSelected && "bg-green-500/10 ring-2 ring-green-500",
        )}
      >
        <Button
          onClick={handleConfirmLocation}
          disabled={!selectedMapLocation}
          className={locationSelected ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {locationSelected ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {t("buttons.location_confirmed")}
            </>
          ) : (
            t("buttons.confirm_location")
          )}
        </Button>
      </div>

      {locationSelected && (
        <div className="mt-2 text-sm text-green-600">
          {t("messages.location_confirmed_success")}
        </div>
      )}

      {noAddressError && !locationSelected && (
        <div className="text-red-400">
          {t("messages.select_location_error")}
        </div>
      )}
    </div>
  );
}
