import { ActionResult, PageData } from "./shared.types";

export interface Availability {
  id: number;
  day_id: number;
  resturant_id: number;
  start_time: string;
  end_time: string;
  is_default: number;
}

interface File {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

interface RatingInfo {
  totalReviews: string;
  averageRating: string;
}

export interface DeliveryInfo {
  distance_km: number;
  distance_formatted: string;
  delivery_time_minutes: number;
  delivery_fee: number;
}
export interface Restaurant {
  id: number;
  title: string;
  created_by_owner_name: string;
  created_by_first_name: string;
  created_by_last_name: string;
  created_by_email: string;
  fee: number;
  location: string;
  latitude: string;
  longitude: string;
  description: string;
  image_file: string;
  is_default: number;
  state_id: number;
  type_id: number;
  created_on: string;
  contact_no: string;
  created_by_id: number;
  created_by_number: string;
  rating_info: RatingInfo;
  average_rating: number;
  estimated_delivery_fees: number;
  estimated_delivery_distance: string;
  estimated_delivery_time: string;
  delivery_info: DeliveryInfo;
  price_per_person: string;
  is_favourite: number;
  availability: Availability[];
  files: File[];
}

export interface ItemPrice {
  id: number;
  title: string;
  price: string;
  quantity: string;
  item_id: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

interface MenuImage {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

interface AddOnCategory {
  id: number;
  title: string;
  image: string;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

export interface AddOn {
  id: number;
  title: string;
  price: string;
  limit: number;
  item_id: number;
  state_id: number;
  add_on_category_id: AddOnCategory;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

export interface AdditionalItem {
  id: number;
  cart_item_id: number;
  price: string;
  add_on_id: number;
  type_id: number;
  state_id: number;
  created_on: string;
  created_by_id: number;
}

export interface MenuItem {
  id: number;
  cart_item_id: string;
  title: string;
  cuisine_type: number;
  quantity: number;
  cuisine_type_name: string;
  item_type: number;
  restaurant_id: number;
  image_file: string; // URL
  category_id: number;
  price: string;
  customized_price: string;
  description: string;
  is_available: number;
  cook_time: string;
  start_time: string;
  end_time: string;
  preparation_time: string;
  out_of_stock: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
  item_count: number;
  is_favourite: number;
  is_added_in_cart: number;
  avg_rating: number;
  is_ordered: boolean;
  count: null | number;
  menuImages: MenuImage[];
  addOnsList: AddOn[];
  item_prices: ItemPrice[];
  itemPrice: ItemPrice[];
  item_price: string;
  availability: Availability[];
}

export interface AddToCartRequest {
  "Cart[store_id]": string;
  "Cart[type_id]": string;
  "CartItem[product_id]": string;
  "CartItem[price_id]": string;
  "CartItem[quantity]": string;
}

export interface RestaurantItem {
  id: number;
  title: string;
  cuisine_type: number;
  quantity: number | null;
  cuisine_type_name: string;
  item_type: number;
  restaurant_id: number;
  image_file: string;
  category_id: number;
  price: string;
  customized_price: number | null;
  description: string;
  is_available: number;
  cook_time: string;
  start_time: string;
  end_time: string;
  preparation_time: string;
  out_of_stock: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
  item_count: number;
  is_favourite: number;
  is_added_in_cart: number | null;
  avg_rating: number;
  is_ordered: boolean;
  menuImages: MenuImage[];
  itemPrice: ItemPrice[];
}

export interface SelectedRestPrice {
  id: number;
  title: string;
  price: string;
  quantity: string;
  item_id: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

export interface MenuItemImage {
  id: number;
  name: string;
  size: number;
  key: string;
  url: string;
  model_type: string;
  model_id: number;
  project_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
}

export interface Offer {
  id: number;
  title: string;
  code: string;
  discount: string; // String, but represents a number. Consider 'number' if you convert.
  image_file: string; // URL for the offer image
  description: string; // Contains HTML, will need sanitization
  minimum_amount: string; // String, but represents a number. Consider 'number' if you convert.
  item_id: number | null; // Can be null
  restaurant_id: number;
  end_time: string; // Consider Date if you'll parse it
  state_id: number;
  type_id: number;
  created_on: string; // Consider Date if you'll parse it
  created_by_id: number;
  restaruentDetail: Restaurant; // Note: Typo in backend 'restaruentDetail' instead of 'restaurantDetail'
}

export interface Category {
  id: number;
  title: string;
  image: string;
  created_on: string;
  created_by_id: number;
}

export interface OrderAddOn {
  add_on_id: number;
  price: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  item_price: string;
  price_id: number;
  product_name?: string;
  add_on?: OrderAddOn[];
}

export interface OrderPayload {
  type_id: number;
  store_id: number;
  total_price: string;
  payable_amount: string;
  delivery_charge: string;
  delivery_time: string;
  delivery_distance: string;
  address?: string;
  item: string;
}

export interface PlaceOrderResults extends ActionResult {
  payment_url?: string;
}

export interface PlaceOrderResponse {
  payment_url?: string;
}

export interface RestaurantResponce {
  list: Restaurant[];
  _meta: PageData;
}
export interface GetRestaurantsResult extends ActionResult {
  data?: Restaurant[];
  pageData?: PageData;
}
export interface RestaurantDetailResponce {
  detail: Restaurant;
}
export interface GetRestaurantDetailsResult extends ActionResult {
  data?: Restaurant;
}
export interface RestaurantMenuListResponse {
  list: MenuItem[];
}
export interface GetRestaurantMenuListResults extends ActionResult {
  data?: MenuItem[];
}
export interface MenuItemDetailResponse {
  detail: MenuItem;
}
export interface GetMenuItemDetailResult extends ActionResult {
  data?: MenuItem;
}
export interface RestaurantOffersResponse {
  list: Offer[];
}
export interface GetRestaurantOffersResult extends ActionResult {
  data?: Offer[];
}

export interface ReviewItem {
  id: number;
  restaurant_id: number;
  restaurant_rating: number;
  restaurant_comment: string;
  order_id: number;
  created_on: string;
  created_by_id: number;
  created_by_name: string;
  created_by_image: string; // URL
}

interface RatingCount {
  count: string;
}
export interface Reviews {
  "1_star": RatingCount;
  "2_star": RatingCount;
  "3_star": RatingCount;
  "4_star": RatingCount;
  "5_star": RatingCount;
  total_rating: RatingCount;
  average_rating: string;
  list: ReviewItem[];
}

export interface GetRestaurantReviewsResult extends ActionResult {
  data?: Reviews;
}

export interface SearchTerm {
  search_term: string;
}

export interface PopularSeachesResponse {
  data: SearchTerm[];
}
export interface getPopularSeachResult extends ActionResult {
  data?: SearchTerm[];
}
export interface RecentSearchResponse {
  data: SearchTerm[];
}
export interface getRecentSearchResult extends ActionResult {
  data?: SearchTerm[];
}
