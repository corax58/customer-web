import React from "react";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

import ProfileSetup from "./_components/ProfileSetup";

const ProfileUpdatePage = async () => {
  const t = await getTranslations("auth.marketing");
  return (
    <div className="flex min-h-svh items-center justify-start">
      <div className="flex w-full justify-center lg:w-2/5">
        <div className="bg-background flex w-fit justify-center rounded-xl p-10 pt-36 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none lg:pt-24">
          <ProfileSetup />
        </div>
      </div>
      <div className="absolute top-0 right-0 -z-10 h-svh w-full overflow-hidden lg:w-3/5">
        <div className="relative h-full w-full">
          <Image
            fill
            src="/assets/images/auth/Auth_page_image.jpeg"
            alt="Auth page background image"
            className="object-cover"
            priority
          />
          <div className="absolute -bottom-10 h-1/2 w-full bg-black/70 blur-3xl" />
          <div className="absolute bottom-0 hidden w-full justify-end text-3xl text-white lg:flex">
            <div className="flex flex-col justify-end p-12 text-white">
              <div className="max-w-md text-end">
                <h1 className="mb-4 text-end text-4xl font-bold">
                  {t("headline")}
                </h1>
                <p className="tex mb-6 text-lg text-white/90">
                  {t("subheadline")}
                </p>
                <div className="flex items-center justify-end space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span>{t("feature1")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    <span>{t("feature2")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    <span>{t("feature3")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
