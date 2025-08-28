import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Help & Support | Time delivery",
  description:
    "Find answers to frequently asked questions and get help with your Time-Delivery orders and account.",
};

const HelpAndSupportPage = async () => {
  const t = await getTranslations("profile.help");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground mt-2">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("faq_card.title")}</CardTitle>
            <CardDescription>{t("faq_card.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <CustomLink href={"/profile/help/faq"}>
                {t("faq_card.button")}
              </CustomLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("chat_card.title")}</CardTitle>
            <CardDescription>{t("chat_card.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <CustomLink href={"/profile/help/chat"}>
                {t("chat_card.button")}
              </CustomLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;
