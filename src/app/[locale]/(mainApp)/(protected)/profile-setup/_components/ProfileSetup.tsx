"use client";
import React, { useCallback } from "react";

import { useTranslations } from "next-intl";

import ProfileUpdateForm from "@/components/forms/ProfileUpdateForm";
import Logo from "@/components/Logo";
import { useRouter } from "@/i18n/navigation";

const ProfileSetup = () => {
  const t = useTranslations("profile_setup");
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.push("/setup-address");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <Logo className="mb-4 h-9 w-24" />
        <h1 className="text-xl font-bold">{t("title")}</h1>
      </div>
      <ProfileUpdateForm className="sm:w-sm" onSuccess={onSuccess} />
    </div>
  );
};

export default ProfileSetup;
