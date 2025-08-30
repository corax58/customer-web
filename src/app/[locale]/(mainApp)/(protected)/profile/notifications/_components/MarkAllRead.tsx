"use client";
import { useTransition } from "react";

import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { MarkAllNotificationsRead } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const MarkAllRead = () => {
  const t = useTranslations("profile.notifications");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const { success } = await MarkAllNotificationsRead();
      if (success) {
        router.refresh();
      }
      if (!success) {
        toast.error(t("errors.failed_mark_all"));
      }
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="w-32"
    >
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        t("mark_all_read")
      )}
    </Button>
  );
};

export default MarkAllRead;
