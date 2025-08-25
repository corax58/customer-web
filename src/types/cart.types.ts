import { AdditionalItem, ItemPrice, MenuItem } from "./restaurant.types";
import { ActionResult } from "./shared.types";

export interface CartItem {
  id: number;
  store_id: number;
  cart_id: number;
  product_id: number;
  store_type: number;
  price_id: number;
  selected_store_price: string;
  selected_rest_price: ItemPrice;
  quantity: number;
  total_price: number;
  state_id: number;
  type_id: number;
  created_on: string;
  created_by_id: number;
  cart_type: number;
  restaurant_items: MenuItem[];
  additional_items: AdditionalItem[];
}
export interface GetCartItemsResult extends ActionResult {
  data?: CartItem[];
}
export interface CartItemResponse {
  list: CartItem[];
}
export interface GetTotalCartPriceResult extends ActionResult {
  data?: number;
}
export interface TotalCartPriceResponse {
  total_price: number;
}

export interface DeliveryInfo{
  fee: number;
  time:number;
  distance:number;
}
export interface DeliveryFeeResponse {
  data: DeliveryInfo
}

export interface DeliveryFeePayload {
  address_id: number;
  restaurant_id: number;
}
export interface GetDeliveryFeeResults extends ActionResult {
  data?: DeliveryInfo;
}
