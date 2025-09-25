"use server";

import { cookies } from "next/headers";

import { isAuthenticated } from "@/lib/auth";
import { fetchOnCondition, fetchWithAuth } from "@/lib/fetchWrappers";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ForgotPasswordResult,
} from "@/types/auth.types";
import { ActionResult } from "@/types/shared.types";

export async function logoutAction(): Promise<ActionResult> {
  try {
    await fetchWithAuth(`/api/user/logout`, {
      method: "POST",
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    if (typeof error === "string") return { success: false, error: error };
    else return { success: false, error: "Failed to delete item from cart" };
  }
}
export async function checkAuth() {
  return await isAuthenticated();
}

export async function clearTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
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
