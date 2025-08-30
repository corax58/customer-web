import { ActionResult } from "next/dist/server/app-render/types";

export interface LoginPayload {
  LoginForm: {
    username: string;
    country_code: string;
    password: string;
    role: number;
    device_type: string;
    device_token: string;
    device_udid: string;
  };
}

export interface SignupPayload {
  User: {
    first_name: string;
    last_name: string;
    password: string;
    country_code: string;
    contact_no: string;
    role_id: string;
  };
  referral_code?: string;
  confirm_password: string;
}

export interface UpdateProfilePayload {
  User: {
    [key: string]: string | Blob | undefined;

    profile_file?: Blob;
    first_name?: string;
    last_name?: string;
    country_code?: string;
    contact_no?: string;
    date_of_birth?: string;
    gender?: string;
  };
}

export interface VerifyOtpPayload {
  User: {
    otp: string;
    contact_no: string;
    country_code: string;
  };
  device_type: string;
}

export interface ResendOtpPayload {
  User: {
    contact_no: string;
    country_code: string;
  };
}

type numericBool = 0 | 1;
export interface UserDetail {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  contact_no: string;
  country_code: string;
  address: string | null;
  latitude: string;
  longitude: string;
  date_of_birth: string;
  gender: number;
  average_rating: number;
  total_trips: number;
  profile_file: string; // URL string
  license_file: string;
  government_id: string;
  business_proof: string;
  /** Note the typo in the key from the API */
  restrurant_id: string;
  merchant_id: number | null;
  bank_account_id: string | null;
  stripe_url: string | null;
  otp: number;
  is_online: numericBool;
  is_notify: numericBool;
  otp_verify: numericBool;
  is_added: numericBool;
  is_approve: numericBool;
  is_profile_setup: numericBool;
  is_social: boolean;
  is_default: number;
  role_id: number;
  state_id: number;
  type_id: number;
  unread_notification_count: string;
  created_on: string; // Datetime string
  viewPost: unknown[];
  document_file: unknown[];
}

export interface ApiResponse {
  message: string;
  datecheck: string;
  copyrights: string;
}

export interface LoginResponse extends ApiResponse {
  detail: UserDetail;
}

export interface ResendOtpResponse extends ApiResponse {
  detail: UserDetail;
}
export interface ForgotPasswordPayload {
  User: {
    contact_no: string;
    country_code: string;
  };
}
export interface ForgotPasswordResponse {
  message: string;
  detail: UserDetail;
}
export interface ForgotPasswordResult extends ActionResult {
  detail?: UserDetail;
}
