import React, { PropsWithChildren } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

const AuthPagesLayout = ({ children }: PropsWithChildren) => {
  const t = useTranslations("auth.marketing");
  return (
    <div className="flex min-h-svh items-center justify-start">
      <div className="flex w-full justify-center lg:w-2/5">{children}</div>
      <div className="fixed end-0 top-0 -z-10 h-svh w-full overflow-hidden lg:w-3/5">
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
                <div className="flex items-center justify-end gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span>{t("feature1")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    <span>{t("feature2")}</span>
                  </div>
                  <div className="flex items-center gap-2">
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

export default AuthPagesLayout;
