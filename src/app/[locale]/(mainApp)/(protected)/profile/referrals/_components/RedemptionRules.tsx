import { Gift } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PointsSummary } from "@/types/profile.types";

interface RedemptionRulesProps {
  pointsSummary: PointsSummary;
  currentDiscountPotential: number;
  maxDiscount: number;
}

export function RedemptionRules({
  pointsSummary,
  currentDiscountPotential,
  maxDiscount,
}: RedemptionRulesProps) {
  const t = useTranslations("profile.referrals.redemption_rules");
  const formatter = useFormatter();
  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">{t("min_points")}</span>
            <span>
              {t("points", {
                points: formatter.number(pointsSummary.min_points_to_redeem),
              })}
            </span>
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">
              {t("points_per_percent")}
            </span>
            {t("points", {
              points: formatter.number(pointsSummary.min_points_to_redeem),
            })}{" "}
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary-foreground">
              {t("max_discount_per_order")}
            </span>
            <span>
              {t("max_discount_percent", {
                discount: formatter.number(
                  parseInt(pointsSummary.max_percent_discount_per_order),
                ),
              })}
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="text-secondary-foreground mb-2 text-sm">
            {t("current_discount")}
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={(currentDiscountPotential / maxDiscount) * 100}
              className="flex-1"
            />
            <span className="text-sm font-medium">
              {formatter.number(currentDiscountPotential)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
