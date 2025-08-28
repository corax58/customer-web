import { getFormatter, getTranslations } from "next-intl/server";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointsSummary, ReferralStats } from "@/types/profile.types";

interface PointsOverviewProps {
  pointsSummary: PointsSummary;
  referralStats: ReferralStats;
  currentDiscountPotential: number;
}

export async function PointsOverview({
  pointsSummary,
  referralStats,
  currentDiscountPotential,
}: PointsOverviewProps) {
  const t = await getTranslations("profile.referrals.points_overview");
  const formatter = await getFormatter();
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card className="justify-between border shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            {t("available_points_title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">
            {formatter.number(pointsSummary.current_available)}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {t("max_discount", { discount: currentDiscountPotential })}
          </p>
        </CardContent>
      </Card>

      <Card className="justify-between border shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            {t("total_earned")}{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="text-2xl font-bold text-blue-400">
            {formatter.number(pointsSummary.total_earned)}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {t("all_time_earning")}
          </p>
        </CardContent>
      </Card>

      <Card className="justify-between border shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            {t("referrals")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-400">
            {formatter.number(referralStats.total_referred_users)}
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {t("friends_referred")}
          </p>
        </CardContent>
      </Card>

      <Card className="justify-between border shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-secondary-foreground text-sm font-medium">
            {t("discount_earned")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">
            <FormattedAfghani
              amount={referralStats.total_discount_earned / 100}
            />
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            {t("total_savings")}s
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
