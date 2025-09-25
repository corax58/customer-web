"use client";
import { Edit } from "lucide-react";
import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

import PersonalInfoSkeleton from "./PersonalInfoSkeleton";

const gender = ["male", "female", "other"];
const PersonalInfo = () => {
  const { user } = useAuth();
  const t = useTranslations("profile.personal_info");
  if (user)
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">{t("title")} </h2>
          <p className="text-muted-foreground mt-2">{t("subtitle")} </p>
        </div>
        <div className="space-y-6">
          <Card className="p-0 shadow-none">
            <CardContent className="flex items-center justify-between p-3 md:p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profile_file} />
                  <AvatarFallback className="text-lg">
                    {user.first_name[0] + user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p>{user.full_name}</p>
                  <p className="text-muted-foreground text-sm">
                    {user.email || `${user.country_code}${user.contact_no}`}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="lg" asChild>
                <CustomLink href={"/profile/edit"}>
                  <Edit className="h-4 w-4 sm:me-2" />
                  <span className="max-sm:hidden">{t("buttons.edit")}</span>
                </CustomLink>
              </Button>
            </CardContent>
          </Card>
          <Card className="p-6 py-6 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-lg">{t("personal_info")}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-7 px-0 py-0 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {t("labels.first_name")}
                </p>
                <p className="font-medium">{user.first_name || t("na")}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {t("labels.last_name")}
                </p>
                <p className="font-medium">{user.last_name || t("na")}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {t("labels.gender")}
                </p>
                {gender[user.gender] ? (
                  <p className="font-medium">
                    {t(`genders.${gender[user.gender]}`)}
                  </p>
                ) : (
                  <p className="font-medium">{t("na")}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {" "}
                  {t("labels.date_of_birth")}
                </p>
                <p className="font-medium">{user.date_of_birth || t("na")}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {t("labels.email")}
                </p>
                <p className="font-medium">{user.email || t("na")}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  {t("labels.phone_number")}
                </p>
                <p className="font-medium">
                  {user.contact_no
                    ? `${user.country_code}${user.contact_no}`
                    : t("na")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  return <PersonalInfoSkeleton />;
};

export default PersonalInfo;
