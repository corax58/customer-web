import { Award, Gift, TrendingUp, Users } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import FormattedAfghani from "@/components/FormattedAfghani";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferralStats } from "@/types/profile.types";

interface ReferralStatsProps {
  stats: ReferralStats;
}

export async function ReferralStatsCard({ stats }: ReferralStatsProps) {
  const t = await getTranslations("profile.referrals.referral_stats_card");
  const formatter = await getFormatter();
  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-secondary-foreground text-sm">
              {t("friends_joined")}
            </span>
          </div>
          <span className="font-medium">
            {formatter.number(stats.total_referred_users)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-green-400" />
            <span className="text-secondary-foreground text-sm">
              {t("orders_with_discount")}
            </span>
          </div>
          <span className="font-medium">
            {formatter.number(stats.total_orders_with_referral_discount)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-purple-400" />
            <span className="text-secondary-foreground text-sm">
              {t("total_discount")}
            </span>
          </div>
          <span className="font-medium">
            <FormattedAfghani amount={stats.total_discount_earned / 100} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
