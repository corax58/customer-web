import { Suspense } from "react";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import MarkAllRead from "./_components/MarkAllRead";
import NotificationList from "./_components/NotificationList";
import NotificationListSkeleton from "./_components/NotificationListSkeleton";

export const metadata: Metadata = {
  title: "Notification Settings | Time delivery",
  description:
    "Customize your notification preferences. Choose how you want to be updated about your orders and promotions from Time-Delivery.",
};

const NotificationsPage = async () => {
  const t = await getTranslations("profile.notifications");

  return (
    <div className="w-full space-y-6 py-5 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">{t("title")}</h2>
        </div>
        <div className="flex gap-2">
          <MarkAllRead />
        </div>
      </div>
      <Suspense fallback={<NotificationListSkeleton />}>
        <NotificationList />
      </Suspense>
    </div>
  );
};

export default NotificationsPage;
