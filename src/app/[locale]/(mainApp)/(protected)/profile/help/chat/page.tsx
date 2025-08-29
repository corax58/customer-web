import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import BackButton from "@/components/BackButton";
import { Icon } from "@/components/Icon";

import ChatBody from "./_components/ChatBody";

const LiveChatPage = async () => {
  const t = await getTranslations("profile.help.chat");
  return (
    <div className="flex w-full max-lg:justify-center">
      <div className="w-full max-w-2xl border-x lg:border-s-0 lg:border-e">
        <div className="flex gap-2">
          <BackButton>
            <Icon as={ArrowLeft} isDirectional />
          </BackButton>
          <div className="w-full border-b p-4">
            <h2 className="text-3xl font-bold">{t("title")}</h2>
            <p className="text-muted-foreground mt-2">{t("description")} </p>
          </div>
        </div>
        <ChatBody />
      </div>
    </div>
  );
};

export default LiveChatPage;
