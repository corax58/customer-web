"use client";
import { useTranslations } from "next-intl";

import AddAddressForm from "@/components/forms/AddAddressFrom";
import { useRouter } from "@/i18n/navigation";

const SetupAddress = () => {
  const t = useTranslations("setup_address");
  const router = useRouter();
  const redirect_url = sessionStorage.getItem("redirect_url");

  const onCreate = () => {
    if (redirect_url) {
      const parsedUrl = decodeURIComponent(redirect_url);
      router.push(parsedUrl);
    } else {
      router.push("/home");
    }
  };
  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
      </div>
      <AddAddressForm onCreate={onCreate} />
    </div>
  );
};

export default SetupAddress;
