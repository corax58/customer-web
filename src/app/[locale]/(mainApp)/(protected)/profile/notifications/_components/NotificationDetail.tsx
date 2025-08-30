"use client";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { Eye, Loader } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { MarkNotificationAsRead } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Notification } from "@/types/profile.types";

interface NotificationDetailProps {
  notification: Notification;
}

const NotificationDetail = ({ notification }: NotificationDetailProps) => {
  const t = useTranslations("profile.notifications");
  const formatter = useFormatter();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const markRead = useCallback(() => {
    startTransition(async () => {
      await MarkNotificationAsRead(notification.id);
      router.refresh();
    });
  }, [notification.id, router]);

  useEffect(() => {
    if (!open || notification.is_read == 1) return;
    markRead();
  }, [markRead, open, notification.is_read]);

  useEffect(() => {
    if (open) return;
    if (searchParams.get("id") !== notification.id.toString()) {
      return;
    }
    setOpen(true);
    const params = new URLSearchParams(searchParams.toString());

    params.delete("id");
    router.replace(`${pathname}?${params.toString()}`);
  }, [notification.id, open, pathname, router, searchParams]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="w-24">
          <Eye className="me-2 h-4 w-4" /> {t("view")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="gap-1">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            {notification.title}
            {isPending && <Loader className="h-4 w-4 animate-spin" />}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {notification.created_on &&
              formatter.dateTime(new Date(notification.created_on), {
                dateStyle: "medium",
                timeStyle: "short",
              })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-lg border p-4">
            <p className="text-sm leading-relaxed">
              {notification.description}
            </p>
          </div>
          {notification.full_name && (
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>From:</span>
              <span className="font-medium">{notification.full_name}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetail;
