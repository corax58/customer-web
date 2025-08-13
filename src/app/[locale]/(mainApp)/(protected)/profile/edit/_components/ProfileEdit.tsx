"use client";
import React, { useCallback } from "react";

import ProfileUpdateForm from "@/components/forms/ProfileUpdateForm";
import { useRouter } from "@/i18n/navigation";

const ProfileEdit = () => {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.push("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="max-w-md">
      <ProfileUpdateForm onSuccess={onSuccess} />
    </div>
  );
};

export default ProfileEdit;
