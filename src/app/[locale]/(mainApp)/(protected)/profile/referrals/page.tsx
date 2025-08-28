import { Suspense } from "react";

import { getTranslations } from "next-intl/server";

import ReferralDetails from "./_components/ReferralDetails";
import { ReferralDetailsSkeleton } from "./_components/ReferralDetailsSkeleton";

const RefarralsPage = async () => {
  const t = await getTranslations("profile.referrals");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground mt-2">{t("description")}</p>
      </div>
      <Suspense fallback={<ReferralDetailsSkeleton />}>
        <ReferralDetails />
      </Suspense>
    </div>
  );
};

export default RefarralsPage;
