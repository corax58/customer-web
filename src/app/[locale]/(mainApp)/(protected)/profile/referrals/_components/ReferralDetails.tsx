import { AlertTriangle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getReferralInfo } from "@/actions/profile.actions";

import { HistoryTabs } from "./HistoryTabs";
import { PointsOverview } from "./PointsOverview";
import { RedemptionRules } from "./RedemptionRules";
import { ReferralSharing } from "./ReferralSharing";
import { ReferralStatsCard } from "./ReferralStatsCard";

const ReferralDetails = async () => {
  const { data } = await getReferralInfo();
  const t = await getTranslations("profile.referrals");

  if (!data) {
    return (
      <div className="border-destructive/50 bg-destructive/5 flex min-h-96 flex-col items-center justify-center rounded-lg border p-8 text-center">
        <div className="bg-destructive/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <AlertTriangle className="text-destructive size-10" />
        </div>

        <h2 className="text-foreground text-xl font-semibold md:text-2xl">
          {t("error.title")}
        </h2>

        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          {t("error.desc")}
        </p>
      </div>
    );
  }

  const maxDiscount = Number.parseFloat(
    data.points_summary.max_percent_discount_per_order,
  );
  const currentDiscountPotential = Math.min(
    Math.floor(
      data.points_summary.current_available /
        data.points_summary.points_per_percent_discount,
    ),
    maxDiscount,
  );
  return (
    <div className="">
      <PointsOverview
        currentDiscountPotential={data.points_summary.current_available}
        pointsSummary={data.points_summary}
        referralStats={data.referral_stats}
      />
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ReferralSharing referralCode={data.user_info.referral_code} />
          <HistoryTabs
            pointsHistory={data.points_history}
            referredUsers={data.referred_users}
            usageHistory={data.usage_history}
          />
        </div>
        <div className="space-y-6">
          <RedemptionRules
            pointsSummary={data.points_summary}
            currentDiscountPotential={currentDiscountPotential}
            maxDiscount={maxDiscount}
          />

          <ReferralStatsCard stats={data.referral_stats} />
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
