import { UserDetail } from "./auth.types";
import { AddOn, Restaurant } from "./restaurant.types";
import { ActionResult, PageData } from "./shared.types";

export interface Address {
  id: number;
  title: string;
  title_ps: string; // Assuming 'ps' and 'fs' might stand for specific language variants
  title_fs: string; // or specific display formats, given the same value as 'title'.
  description: string;
  address: string;
  latitude: string; // Often strings when coming from forms/APIs, can be parsed to number
  longitude: string; // Often strings when coming from forms/APIs, can be parsed to number
  is_default: number; // Could be boolean (0 or 1) depending on use
  pincode: string;
  state_id: number;
  type_id: number;
  created_on: string; // Date string
  created_by_id: number;
  contact_no: string;
  country_code: string;
}

export interface OrderState {
  id: number;
  order_id: number;
  state_id: number;
  description: string | null;
  created_on: string;
  created_by_id: number;
}

export interface StoreFile {
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

export interface Order {
  id: number;
  otp: number | null;
  verify_otp: number;
  order_no: string;
  dispatch_enable: number | null;
  order_type: number | null;
  is_rating: number;
  rating_detail: string;
  store_id: number;
  store_title: string;
  store_image: string;
  customer_address_id: string;
  customer_address_deatil: Address;
  payable_amount: string;
  tax: string;
  coupon_id: number;
  delivery_charge: string;
  discount_price: string;
  description: string | null;
  payment_status: number;
  total_price: string;
  payment_type: number;
  state_id: number;
  updated_on: string | null;
  created_on: string;
  created_by_id: number;
  created_by_name: string;
  created_by_mobile_number: string;
  refund_reason: string | null;
  driver_id: number | null;
  driver_state: number | null;
  driver_latitude: string | null;
  driver_longitude: string | null;
  speed: number | null;
  initial_driver_latitude: string | null;
  initial_driver_longitude: string | null;
  rotation: number | null;
  // driver_deatil: any | null; // Specific interface if known
  customer_detail: UserDetail; // Nested type
  invoice: string;
  restaurant_to_driver_distance: number | null; // Can be null
  distance: string; // "0 Km" is a string
  time: string;
  is_self_order: boolean;
  orderState: OrderState[];
  storeDetail: Restaurant;
}

export interface OrderDetail {
  id: number;
  otp: null | string;
  verify_otp: number;
  order_no: string;
  order_type: null | number; // Assuming can be a number
  is_rating: number;
  rating_detail: string;
  store_id: number;
  store_title: string;
  store_image: string;
  customer_address_id: string;
  customer_address_deatil: Address;
  payable_amount: string;
  tax: string;
  coupon_id: number;
  delivery_charge: string;
  discount_price: string;
  description: null | string;
  payment_status: number;
  total_price: string;
  payment_type: number;
  state_id: number;
  updated_on: null | string;
  created_on: string;
  created_by_id: number;
  created_by_name: string;
  created_by_mobile_number: string;
  refund_reason: null | string;
  driver_id: null | number;
  driver_latitude: null | string;
  driver_longitude: null | string;
  speed: null | number;
  initial_driver_latitude: null | string;
  initial_driver_longitude: null | string;
  rotation: null | number;
  invoice: string;
  restaurant_to_driver_distance: null | number;
  distance: string;
  time: string;
  is_self_order: boolean;
  item_detail: ItemDetail[];
  orderState: OrderState[];
  storeDetail: Restaurant;
  transactions: Transaction[];
}

export interface ItemDetail {
  id: number;
  order_id: number;
  store_id: number;
  product_id: number;
  price_detail: object;
  item_title: string;
  ready_time: string;
  product_detail: string;
  product_image: string;
  quantity: number;
  item_price: string;
  state_id: number;
  type_id: number;
  price_id: number;
  store_type: number;
  created_on: string;
  created_by_id: number;
  addOn: AddOn[];
}

type gateway = "cash_on_delivery" | "hesabpay";
type TransactionState = "pending" | "success" | "failed";
export interface Transaction {
  id: number;
  order_id: number;
  user_id: number;
  store_id: number;
  amount: string;
  reference: string;
  status: TransactionState;
  gateway: gateway;
  restaurant_name?: string;
  response: {
    url: string;
  };
  created_at: string;
  updated_at: string;
  discount_amount: string;
  referral_points_used: number;
  platform_fee_reduction: string;
  platform_fee_paid: string;
  restaurant_discount: string;
  admin_owes_restaurant: string;
}

type NotificationState = 0 | 1;
export interface Notification {
  id: number;
  title: string;
  description: string;
  model_id: number | null;
  model_type: string | null;
  is_read: NotificationState;
  state_id: number;
  type_id: number;
  created_on: string; // ISO 8601 string for date/time
  to_user_id: number;
  created_by_id: number;
  full_name: string;
  image_file: string | null;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_on: string;
}

export interface SentMessageRequestType {
  fromId: string | number;
  fromName: string;
  toId: number;
  toName: string;
  message: string;
  createdOn: string;
  isRead: boolean;
  stateId: number;
  fromUserProfileFile: string;
  toUserProfileFile: string;
  typeId: number;
  sendOn: string;
}

export interface Message {
  id: number;
  message: string;
  from_id: number;
  from_name: string;
  to_name: string;
  to_id: number;
  readers: unknown[] | null;
  request_id: number | null;
  created_on: string;
  is_read: number;
  state_id: number;
  from_user_profile_file: string;
  to_user_profile_file: string;
  message_status: boolean;
  type_id: number;
  notified_users: unknown[] | null;
  send_on: string;
}
export interface GetAddressListResult extends ActionResult {
  data?: Address[];
}
export interface AddressListResponse {
  list: Address[];
}
export interface GetOrdersListResults extends ActionResult {
  data?: Order[];
  pageData?: PageData;
}
export interface OrdersListResponse {
  list: Order[];
  _meta: PageData;
}
export interface GetNotificationListResults extends ActionResult {
  data?: Notification[];
}
export interface NotificationListResponse {
  list: Notification[];
}

export interface GetFavoritesListResult extends ActionResult {
  data?: { model_detail: Restaurant }[];
}

export interface FavoritesListResponse {
  list: { model_detail: Restaurant }[];
}
export interface GetFaqResults extends ActionResult {
  data?: FAQ[];
}
export interface FaqListResponse {
  list: FAQ[];
}
export interface GetMessagesResult extends ActionResult {
  data?: Message[];
}
export interface MessagesResponse {
  messages: Message[];
}

export interface GetOrderDetailResult extends ActionResult {
  data?: OrderDetail;
}

export interface GetOrderDetailResponse {
  detail: OrderDetail;
}

export interface OrderStatus {
  status_history: {
    delivery_status: string;
    order_id: number;
  };

  restaurant: {
    name: string;
    phone_number: string;
    image: string;
  };
}

export interface GetOrderStatusResult extends ActionResult {
  status?: OrderStatus;
}

export interface GetTransactionsListResult extends ActionResult {
  data?: Transaction[];
}

export interface GetTransactionsListResponse {
  transactions: Transaction[];
}

type modelType = "Detail" | "Driver";
export interface RatingPayload {
  Rating: {
    model_id: string;
    rating: string;
    comment?: string;
    model_type: modelType;
    type_id: string;
    driver_comment?: string;
    rider_rating?: string;
    driver_id?: string;
  };
}

export interface PointsHistoryEntry {
  id: number;
  points: number;
  reason: string;
  created_at: string; // ISO 8601 date-time string
  type: "used" | "earned";
}

export interface UserInfo {
  id: number;
  name: string;
  referral_code: string;
  referred_by: string | null;
}

export interface PointsSummary {
  total_earned: number;
  total_used: number;
  current_available: number;
  min_points_to_redeem: number;
  points_per_percent_discount: number;
  max_percent_discount_per_order: string;
}

export interface ReferralStats {
  total_referred_users: number;
  total_orders_with_referral_discount: number;
  total_discount_earned: number;
}

export interface UsageHistoryEntry {
  id: number | null;
  order_number: string | null;
  discount_amount: number | null;
  used_at: string | null;
  status: string | null;
}

export interface ReferredUserEntry {
  id: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  joined_at: string | null;
  status: string | null;
  total_spent: number | null;
}
export interface UserPointsProfileResponse {
  user_info: UserInfo;
  points_summary: PointsSummary;
  points_history: PointsHistoryEntry[];
  usage_history: UsageHistoryEntry[];
  referred_users: ReferredUserEntry[];
  referral_stats: ReferralStats;
}

export interface GetReferralInfoResults extends ActionResult {
  data?: UserPointsProfileResponse;
}
