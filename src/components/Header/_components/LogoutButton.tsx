"use client";

import { Loader2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

import { Icon } from "@/components/Icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
}
const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { logout, isLoading } = useAuth();
  const pathname = usePathname();
  const t = useTranslations("header");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            "hover:bg-secondary hover:text-secondary-foreground bg-background text-foreground w-full shadow-none",
            className,
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Icon as={LogOut} isDirectional className="me-2 h-4 w-4" />
            </>
          )}
          <span>{t("logout")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("logout_warning")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout(pathname)}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
