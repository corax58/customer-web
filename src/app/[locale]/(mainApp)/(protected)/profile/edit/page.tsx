import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import BackButton from "@/components/BackButton";

import ProfileEdit from "./_components/ProfileEdit";

const ProfileEditPage = async () => {
  const t = await getTranslations("profile.edit_profile");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-5">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div>
          <div>
            <h2 className="text-3xl font-bold">{t("title")}</h2>
            <p className="text-muted-foreground mt-2">{t("description")}</p>
          </div>
        </div>
      </div>
      <ProfileEdit />
    </div>
  );
};

export default ProfileEditPage;
