"use server";

import { revalidatePath } from "next/cache";

import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import { buildApiUrl } from "@/lib/utils";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ForgotPasswordResult,
  LoginResponse,
} from "@/types/auth.types";
import {
  BannerDataResponse,
  BestSellingDishesResponse,
  CategoriesListResponse,
  CategoryItemsResponse,
  CategoryItemsResult,
  GetBannerItemsResult,
  getCategoriesList,
  GetOffersListResult,
  GetPopularDishesResult,
  getPopularSeachResult,
  getRecentSearchResult,
  OffersListResponse,
  PlaceOrderResponse,
  PlaceOrderResults,
  PopularDishesResponse,
  PopularSeachesResponse,
  RecentSearchResponse,
} from "@/types/restaurant.types";
import { ActionResult } from "@/types/shared.types";

export async function updateProfileAction(body: string) {
  try {
    const responseData = await fetchWithAuth<LoginResponse>(
      "/api/user/profile-update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );

    return { data: responseData, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Failed to update profile." };
  }
}

export async function getBannerItems(
  lat?: string,
  lon?: string,
): Promise<GetBannerItemsResult> {
  const url = buildApiUrl("/api/cart-item/banners", { lat, lon });

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

export async function placeOrder(data: string): Promise<PlaceOrderResults> {
  try {
    const responseData: PlaceOrderResponse =
      await fetchWithAuth<PlaceOrderResponse>(`/api/cart-item/place-order`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (responseData.payment_url) {
      return { success: true, payment_url: responseData.payment_url };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to create order" };
  }
}

export async function getPopularDishes(
  lat?: string,
  lon?: string,
): Promise<GetPopularDishesResult> {
  const url = buildApiUrl("/api/cart-item/popular-dish", { lat, lon });
  try {
    const responseData: PopularDishesResponse =
      await fetchOnCondition<PopularDishesResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.items.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch popular dishes." };
  }
}

export async function getBestSellingDishes(
  lat?: string,
  lon?: string,
): Promise<GetPopularDishesResult> {
  const url = buildApiUrl("/api/restaurant/best-selling-dishes", { lat, lon });
  try {
    const responseData: BestSellingDishesResponse =
      await fetchOnCondition<BestSellingDishesResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch best selling dishes." };
  }
}

export async function getOffersList({
  id,
}: {
  id?: string;
}): Promise<GetOffersListResult> {
  try {
    const url = buildApiUrl("/api/restaurant/offer-list", { id });
    const responseData: OffersListResponse =
      await fetchWithAuth<OffersListResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch offers list." };
  }
}

export async function addToFavorites(
  id: string,
  typeId: string,
): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/state/favourite?id=${id}&type=${typeId}`);

    revalidatePath("/profile/favourites");
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to add item to favorites" };
  }
}

export async function getCategoryItems(
  id: string,
  lat?: string,
  lon?: string,
): Promise<CategoryItemsResult> {
  try {
    const url = buildApiUrl("/api/cart-item/items-by-category", {
      category_id: id,
      lat,
      lon,
    });
    const responseData: CategoryItemsResponse =
      await fetchOnCondition<CategoryItemsResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch category items." };
  }
}

export async function getCategiesList(
  lat?: string,
  lon?: string,
): Promise<getCategoriesList> {
  const url = buildApiUrl("/api/restaurant/category-list", {
    lat,
    lon,
  });
  try {
    const responseData: CategoriesListResponse =
      await fetchOnCondition<CategoriesListResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.list };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch categories list." };
  }
}

export async function forgotPassword(
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordResult> {
  const body = JSON.stringify(data);
  try {
    const responseData = await fetchOnCondition<ForgotPasswordResponse>(
      "/api/user/forgot-password",
      {
        method: "POST",

        body,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      succes: true,
      detail: responseData.detail,
      message: responseData.message,
    };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to initiate forgot password" };
  }
}

export async function getPopularSearches(): Promise<getPopularSeachResult> {
  const url = buildApiUrl("/api/state/popular-searches", {
    limit: "5",
  });
  try {
    const responseData: PopularSeachesResponse =
      await fetchOnCondition<PopularSeachesResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch popular searches." };
  }
}
export async function getRecentSearches(
  id: string,
): Promise<getRecentSearchResult> {
  const url = buildApiUrl("/api/state/search-history", {
    user_id: id,
    limit: "5",
  });
  try {
    const responseData: RecentSearchResponse =
      await fetchOnCondition<RecentSearchResponse>(url, {
        retry: { retries: 3, delay: 1000 },
      });

    return { success: true, data: responseData.data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch recent searches." };
  }
}
