import { getFormatter } from "next-intl/server";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/profile.types";

import MarkRead from "./MarkRead";
import NotificationDetail from "./NotificationDetail";

interface NotificationListItemProps {
  notification: Notification;
}
const NotificationListItem = async ({
  notification,
}: NotificationListItemProps) => {
  const formatter = await getFormatter();

  const isRead = notification.is_read == 1;
  return (
    <Card
      className={cn(
        "border py-0 shadow-none transition-all duration-200 hover:shadow-sm",
        !isRead && "border-blue-500/20 bg-blue-500/10",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm leading-tight font-semibold">
                    {notification.title}
                  </h3>
                  {!isRead && (
                    <div className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-blue-500"></div>
                  )}
                </div>

                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                  {notification.description}
                </p>

                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  {notification.created_on && (
                    <time dateTime={notification.created_on}>
                      {formatter.dateTime(new Date(notification.created_on), {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </time>
                  )}
                  {notification.full_name && (
                    <>
                      <span>•</span>
                      <span>{notification.full_name}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-1 max-sm:flex-col max-sm:gap-2">
                {!isRead && <MarkRead notificationId={notification.id} />}
                <NotificationDetail notification={notification} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationListItem;
