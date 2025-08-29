import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { CartItem } from "@/types/cart.types";
import { AddOn, Availability, MenuItem } from "@/types/restaurant.types";
import { UrlValues } from "@/types/shared.types";

import { HttpError } from "./HttpError";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const objectToUrlEncoded = (data: object): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    params.append(key, String(value));
  }

  return params;
};

export const objectToFormData = (data: object): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
};
export async function processError(error: unknown) {
  try {
    if (error instanceof HttpError) {
      const errorResponse: { message: string } = await error.response
        .json()
        .catch(() => ({ message: "Something went wrong" }));
      console.log("Error details: ", errorResponse);
      return errorResponse.message;
    } else if (error instanceof Response) {
      // Fallback for direct Response errors (less common with HttpError)
      const errorResponse: { message: string } = await error
        .json()
        .catch(() => ({ message: "Something went wrong" }));
      return errorResponse.message;
    } else if (error instanceof Error) {
      // Catch standard JavaScript errors (e.g., network issues)
      return error.message || "An unexpected error occurred.";
    } else {
      console.log("Error details: ", error);
      return "Unknown error occurred.";
    }
  } catch (innerError) {
    console.error("Error processing error:", innerError); // Log the inner error
    return "An internal error occurred.";
  }
}

export function formatYYYYMMDD(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function buildUrlSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const params = new URLSearchParams();

  // Iterate over each key in the searchParams object
  for (const [key, value] of Object.entries(searchParams)) {
    // 1. If the value is a string, append it.
    if (typeof value === "string") {
      params.append(key, value);
    }
    // 2. If the value is an array, iterate and append each item.
    // This correctly handles cases like ?category=a&category=b
    else if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    }
    // 3. If the value is undefined, it will be skipped, which is the desired behavior.
  }

  return params;
}

export const getAddOns = (cartItem: CartItem) => {
  const addOns: AddOn[] = [];
  const additinoalItems = cartItem.additional_items;
  additinoalItems.forEach((item) => {
    cartItem.restaurant_items[0].addOnsList.forEach((addOn) => {
      if (addOn.id == item.add_on_id) {
        addOns.push(addOn);
      }
    });
  });
  return addOns;
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const getMenuItemPrice = (menuItem: MenuItem): number => {
  let price = "0";
  if (menuItem.itemPrice) {
    price = menuItem.itemPrice[0].price;
  }
  if (menuItem.item_prices) {
    price = menuItem.item_prices[0].price;
  }
  if (menuItem.item_price) {
    price = menuItem.item_price;
  }
  const value = parseFloat(price);
  return value;
};

type Translator = ReturnType<typeof useTranslations<"time">>;

export const formatTimeHM = (
  totalMinutes: number,
  t: Translator, // Accept the translator function as an argument
) => {
  // Handle invalid or zero input by using a translated string
  if (
    totalMinutes <= 0 ||
    totalMinutes === null ||
    typeof totalMinutes !== "number"
  ) {
    return t("zeroMinutes");
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return t("hoursAndMinutes", { hours, minutes });
  }

  if (hours > 0) {
    return t("hoursOnly", { hours });
  }

  // Default to minutes only
  return t("minutesOnly", { minutes });
};

function extractMinutesFromTime(time: string): number {
  if (!time) return 0;
  const hours = +(time[11] + time[12]);
  const minutes = +(time[14] + time[15]);
  return hours * 60 + minutes;
}

/**
 * Returns true if the restaurant is currently open.
 */
export function isRestaurantOpenNow(
  availability: Availability[],
  now: Date = new Date(),
): boolean {
  const today = now.getDay(); // Sunday = 0
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const slot of availability) {
    if (slot.day_id !== today) continue;

    const startMinutes = extractMinutesFromTime(slot.start_time);
    const endMinutes = extractMinutesFromTime(slot.end_time);

    const isOpen =
      currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    if (isOpen) return true;
  }

  return false;
}

export function formateDateMDYT(dateString: string) {
  const date = new Date(dateString);
  if (!date) return;
  return format(date, "MMM dd',' yyyy',' hh:mm aa");
}

export const buildApiUrl = (endPoint: string, values?: UrlValues) => {
  if (!values) {
    return endPoint;
  }

  const params = buildUrlSearchParams(values);
  const queryString = params.toString();

  return `${endPoint}${queryString ? `?${queryString}` : ""}`;
};
