"use server";
import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import { buildApiUrl } from "@/lib/utils";
import {
  BannerDataResponse,
  GetBannerItemsResult,
  GetRestaurantAdResult,
  RestaurantAdResponse,
} from "@/types/home.types";

export async function getBannerItems(): Promise<GetBannerItemsResult> {
  const url = buildApiUrl("/api/cart-item/banners");

  try {
    const responseData: BannerDataResponse =
      await fetchWithAuth<BannerDataResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });
    return { success: true, data: responseData.banners };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error };
    else return { success: false, error: "Failed to fetch banner items" };
  }
}
export async function getRestaurantAds(): Promise<GetRestaurantAdResult> {
  const url = "/api/item-detail/banner-images";
  try {
    const responseData: RestaurantAdResponse =
      await fetchOnCondition<RestaurantAdResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch restaurant ads." };
  }
}
