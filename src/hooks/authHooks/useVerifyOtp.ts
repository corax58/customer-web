import { useState, useTransition } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/HttpError";
import { processError } from "@/lib/utils";
import {
  LoginResponse,
  UserDetail,
  VerifyOtpPayload,
} from "@/types/auth.types";

export const useVerifyOtp = () => {
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const { login: contextLogin } = useAuth();
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const verifyOtp = async (data: VerifyOtpPayload) => {
    setError(null);
    startTransition(async () => {
      try {
        const body = JSON.stringify(data);

        const response = await fetch("/api/user/verify-otp", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body,
        });
        if (!response.ok) {
          throw new HttpError(response);
        }
        const responseData: LoginResponse = await response.json();
        contextLogin(responseData.detail);
        localStorage.removeItem("unVerifiedUser");
        setUser(responseData.detail);
        setIsSuccess(true);

        const forgotPassword = localStorage.getItem("forgotPassword");

        if (forgotPassword) {
          router.push("/change-password");
          return;
        }

        router.push("/profile-setup");
      } catch (error) {
        const errorMessage = await processError(error);
        setError(errorMessage);
        setIsSuccess(false);
      }
    });
  };

  return {
    isLoading,
    verifyOtp,
    error,
    isSuccess,
    user,
  };
};
