import React from "react";

import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import BackButton from "@/components/BackButton";

import FaqList from "./_components/FaqList";

const FaqPage = async () => {
  const t = await getTranslations("profile.help.faq");
  return (
    <div className="w-full px-1 py-5 md:px-10">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div className="mb-5">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>
      </div>
      <FaqList />
    </div>
  );
};

export default FaqPage;
