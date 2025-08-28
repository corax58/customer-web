import { getFormatter, getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Notification } from "@/types/profile.types";

interface NotificationDetailProps {
  notification: Notification;
}
const NotificationDetail = async ({
  notification,
}: NotificationDetailProps) => {
  const t = await getTranslations("profile.notifications");
  const formatter = await getFormatter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="ml-1">
          {t("view")}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-4">
        <DialogHeader>
          <DialogTitle className="sr-only">{notification.title}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div>{notification.title}</div>
        {notification.createdOn && (
          <div className="text-muted-foreground mb-4">
            {formatter.dateTime(new Date(notification.createdOn), {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>
        )}

        <div className="bg-secondary rounded-lg border p-3">
          {notification.description}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetail;
