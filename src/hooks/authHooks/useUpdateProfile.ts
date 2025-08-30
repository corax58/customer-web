import { useState } from "react";

import { updateProfileAction } from "@/actions/actions";
import { useAuth } from "@/contexts/AuthContext";
import { UpdateProfilePayload } from "@/types/auth.types";

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const { login: contextLogin } = useAuth();

  const updateProfile = async (data: UpdateProfilePayload) => {
    setIsSuccess(false);
    setIsLoading(true);
    setError(null);
    const formData = new FormData();

    for (const user in data.User) {
      if (data.User[user]) {
        formData.append(`User[${user}]`, data.User[user]);
      }
    }
    const result = await updateProfileAction(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.data) {
      contextLogin(result.data.detail);

      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return {
    isSuccess,
    isLoading,
    updateProfile,
    error,
  };
};
