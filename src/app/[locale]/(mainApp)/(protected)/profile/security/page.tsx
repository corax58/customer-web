import { getTranslations } from "next-intl/server";

import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SecurityPage = async () => {
  const t = await getTranslations("profile.security");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground mt-2">{t("description")} </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("change_password_card.title")}</CardTitle>
            <CardDescription>
              {t("change_password_card.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <CustomLink href={"/profile/security/change-password"}>
                {t("change_password_card.button")}
              </CustomLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("delete_acc_card.title")}</CardTitle>
            <CardDescription>
              {t("delete_acc_card.description")}{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="border-eed-500 dark:border-eed-500 w-full bg-transparent text-red-500"
              asChild
            >
              <CustomLink href={"/profile/security/delete-account"}>
                {t("delete_acc_card.button")}
              </CustomLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;
