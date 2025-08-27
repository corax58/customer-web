"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";

const RestaurantDetailError = () => {
  const t = useTranslations("restaurants.restaurant_details.error");
  const router = useRouter();
  return (
    <div className="min-h-screen pt-24">
      {/* Error Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="bg-primary/20 mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
              <AlertTriangle className="text-primary h-12 w-12" />
            </div>
            <h1 className="mb-2 text-4xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground text-lg">{t("description")} </p>
          </div>

          {/* Error Details Card */}
          <Card className="bg-secondary mb-8 border p-6 shadow-none">
            <div className="space-y-4 text-left">
              <h2 className="text-xl font-semibold">{t("details.title")}</h2>
              <ul className="text-muted-foreground space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t(`details.${index + 1}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => {
                router.refresh();
              }}
              size={"lg"}
              className="flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("button.try_again")}
            </Button>

            <Button onClick={() => router.back()} variant="outline" size={"lg"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("button.back")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailError;
