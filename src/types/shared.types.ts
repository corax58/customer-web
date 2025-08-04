export interface PageData {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export type GeocodingApiStatus =
  | "OK"
  | "ZERO_RESULTS"
  | "INVALID_REQUEST"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  place_id: string;
  types: string[];
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
}

export interface GeocodingResponse {
  status: GeocodingApiStatus;
  results: GeocodingResult[];
  error_message?: string;
}
export type UrlValues = {
  [key: string]: string | string[] | undefined;
};
