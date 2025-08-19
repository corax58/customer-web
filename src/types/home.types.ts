import { Category, MenuItem, Offer } from "./restaurant.types";
import { ActionResult } from "./shared.types";

interface BannerFoodItem {
  id: number;
  name: string;
  description: string; // Contains HTML content
  price: string; // String, as it can be empty
  cook_time: string;
  category_id: number;
  category_name: string | null; // Can be null
  image: string; // URL string
  rating: number;
  is_featured: number; // Represents a boolean (0 for false, 1 for true)
}

export interface BannerDetail {
  restaurant: {
    id: string;
    name: string;
    image: string;
    location: string;
  };
  item: BannerFoodItem;
}

export interface BannerDataResponse {
  banners: BannerDetail[];
}
export interface GetBannerItemsResult extends ActionResult {
  data?: BannerDetail[];
}
export interface PopularDishesResponse {
  items: {
    list: MenuItem[];
  };
}

export interface BestSellingDishesResponse {
  list: MenuItem[];
}

export interface GetPopularDishesResult extends ActionResult {
  data?: MenuItem[];
}

export interface OffersListResponse {
  list: Offer[];
}

export interface GetOffersListResult extends ActionResult {
  data?: Offer[];
}
export interface CategoryItemsResponse {
  list: MenuItem[];
}
export interface CategoryItemsResult extends ActionResult {
  data?: MenuItem[];
}
export interface CategoriesListResponse {
  list: Category[];
}
export interface getCategoriesList extends ActionResult {
  data?: Category[];
}

export interface RestaurantAd {
  key: string;
  url: string;
  model_id: number;
}
export interface GetRestaurantAdResult extends ActionResult {
  data?: RestaurantAd[];
}
export interface RestaurantAdResponse {
  list: RestaurantAd[];
}
