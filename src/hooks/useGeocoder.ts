import { useCallback, useEffect, useMemo, useState } from "react";

import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface GeocodeResult {
  address: string;
  success: boolean;
}

export function useGeocoder() {
  const geocodingLib = useMapsLibrary("geocoding");
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (geocodingLib && !geocoder) {
      setGeocoder(new geocodingLib.Geocoder());
    }
  }, [geocodingLib, geocoder]);

  const reverseGeocode = useCallback(
    async (position: google.maps.LatLngLiteral): Promise<GeocodeResult> => {
      if (!geocoder) {
        setError("Geocoder not initialized.");
        return { address: "", success: false };
      }

      setLoading(true);
      setError(null);

      try {
        const response = await geocoder.geocode({ location: position });
        // const response = { results: [{ formatted_address: "My home" }] };
        if (response.results.length > 0) {
          const address = response.results[0].formatted_address;
          return { address, success: true };
        } else {
          return { address: "Address not found.", success: false };
        }
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setError("Error retrieving address.");
        return { address: "", success: false };
      } finally {
        setLoading(false);
      }
    },
    [geocoder],
  );

  return useMemo(
    () => ({
      reverseGeocode,
      loading,
      error,
      ready: !!geocoder,
    }),
    [reverseGeocode, loading, error, geocoder],
  );
}
