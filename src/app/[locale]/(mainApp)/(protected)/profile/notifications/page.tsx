import { Suspense } from "react";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

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
    <div className="w-full space-y-6 px-10 py-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold">{t("title")}</h2>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button> */}
        </div>
      </div>
      <Suspense fallback={<NotificationListSkeleton />}>
        <NotificationList />
      </Suspense>
    </div>
  );
};

export default NotificationsPage;
