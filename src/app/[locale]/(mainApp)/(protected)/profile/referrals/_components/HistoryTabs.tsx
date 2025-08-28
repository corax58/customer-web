import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PointsHistoryEntry,
  ReferredUserEntry,
  UsageHistoryEntry,
} from "@/types/profile.types";

import PointsHistory from "./PointsHistory";
import ReferredUsers from "./ReferredUsers";
import UsageHistroy from "./UsageHistroy";

interface HistoryTabsProps {
  pointsHistory: PointsHistoryEntry[];
  usageHistory: UsageHistoryEntry[];
  referredUsers: ReferredUserEntry[];
}

export async function HistoryTabs({
  pointsHistory,
  usageHistory,
  referredUsers,
}: HistoryTabsProps) {
  const t = await getTranslations("profile.referrals.history_tabs");
  return (
    <Card className="border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="points">{t("points")}</TabsTrigger>
            <TabsTrigger value="usage">{t("usage")}</TabsTrigger>
            <TabsTrigger value="referrals">{t("users")}</TabsTrigger>
          </TabsList>

          <TabsContent value="points" className="mt-4">
            <PointsHistory pointsHistory={pointsHistory} />
          </TabsContent>

          <TabsContent value="usage" className="mt-4">
            <UsageHistroy usageHistory={usageHistory} />
          </TabsContent>

          <TabsContent value="referrals" className="mt-4">
            <ReferredUsers referredUsers={referredUsers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
