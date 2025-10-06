import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { HttpError } from "@/lib/HttpError";
import { processError } from "@/lib/utils";
import { LoginPayload, LoginResponse, UserDetail } from "@/types/auth.types";

export const useLogin = (redirect_url?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserDetail>();
  const { login: contextLogin } = useAuth();
  const router = useRouter();

  const login = async (data: LoginPayload) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    const body = JSON.stringify(data);
    try {
      const response = await fetch("/api/user/login", {
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

      console.log("✅ Login successful");
      contextLogin(responseData.detail);

      setUser(responseData.detail);
      setIsLoading(false);
      setIsSuccess(true);

      if (redirect_url) {
        const parsedUrl = decodeURIComponent(redirect_url);
        router.push(parsedUrl);
      } else {
        router.push("/home");
      }
    } catch (error: unknown) {
      const errorMessage = await processError(error);

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return { isLoading, error, login, isSuccess, user };
};
