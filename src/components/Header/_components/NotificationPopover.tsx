import React, { useCallback, useEffect, useState } from "react";

import { BellIcon, CircleX, Loader } from "lucide-react";
import { useTranslations } from "next-intl";

import { getNotificationList } from "@/actions/profile.actions";
import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/profile.types";

export function NotificationPopover({
  className,
}: React.ComponentProps<"button">) {
  const t = useTranslations("header.notifications");

  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    const result = await getNotificationList();

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.data) {
      setNotifications(result.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const renderNotifications = () => {
    if (error)
      return (
        <div className="flex h-full w-full items-center justify-center gap-4">
          <CircleX size={25} /> {t("failed_fetch")}
        </div>
      );
    if (isLoading)
      return (
        <div className="h- flex w-full items-center justify-center">
          <Loader size={25} />
        </div>
      );

    if (notifications && notifications.length == 0) {
      return (
        <div className="text-muted-foreground py-8 text-center">
          <p>{t("no_notifications")}</p>
        </div>
      );
    } else {
      return (
        <div className="flex h-full flex-col">
          {notifications?.slice(0, 4).map((notification) => (
            <CustomLink
              href={`/profile/notifications?id=${notification.id} `}
              key={notification.id}
            >
              <div className="flex h-20 items-center justify-between gap-4 border-b px-3 py-2">
                <div className="flex h-full w-full flex-col justify-between">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {notification.description}
                  </p>
                </div>
                {notification.is_read == 1 && (
                  <div className="size-2 min-w-2 animate-pulse rounded-full bg-blue-600" />
                )}
              </div>
            </CustomLink>
          ))}
        </div>
      );
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "text-foreground hover:bg-secondary hover:text-secondary-foreground relative flex size-10 cursor-pointer items-center justify-center transition-all hover:rounded-lg",
            className,
          )}
        >
          <BellIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 md:w-96">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-4">
            <h4 className="text-lg font-semibold">{t("title")}</h4>
          </div>
          <Separator />

          <div className="flex h-80 items-center justify-center space-y-4 overflow-y-auto pb-0">
            {renderNotifications()}
          </div>

          <Separator />
          <div className="p-2">
            <Button
              variant="ghost"
              className="hover:bg-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              <CustomLink href="/profile/notifications">
                {t("view_all")}
              </CustomLink>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
