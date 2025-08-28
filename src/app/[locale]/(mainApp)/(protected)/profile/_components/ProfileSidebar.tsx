"use client";

import {
  Bell,
  CreditCard,
  Gift,
  Heart,
  HelpCircle,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import LogoutButton from "@/components/Header/_components/LogoutButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Personal Info",
    icon: User,
    id: "personal",
    href: "/profile",
  },

  {
    title: "Favourites",
    icon: Heart,
    id: "favourites",
    href: "/profile/favourites",
  },

  {
    title: "Orders",
    icon: ShoppingBag,
    id: "orders",
    href: "/profile/orders",
  },
  {
    title: "Transaction History",
    icon: CreditCard,
    id: "transactions",
    href: "/profile/transactions",
  },
  {
    title: "Notifications",
    icon: Bell,
    id: "notifications",
    href: "/profile/notifications",
  },
  {
    title: "Referrals",
    icon: Gift,
    id: "referrals",
    href: "/profile/referrals",
  },

  {
    title: "Security",
    icon: Shield,
    id: "security",
    href: "/profile/security",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    id: "help",
    href: "/profile/help",
  },
];

const ProfileSidebar = () => {
  const t = useTranslations("profile.sidebar");
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <nav className="max-w-72 min-w-72 flex-1 space-y-5 p-4 max-lg:hidden">
        <p className="text-muted-foreground">{t("title")}</p>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <CustomLink
                href={item.href}
                className={cn(
                  "hover:bg-primary/50 hover:text-foreground text-muted-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200",
                  item.href === pathname &&
                    "bg-secondary text-foreground font-semibold",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{t(item.id)}</span>
              </CustomLink>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="w-full">
          <LogoutButton />
        </div>
      </nav>
      <div className="flex w-full justify-center border-b p-5 lg:hidden">
        <Select value={pathname} onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {navigationItems.map((item) => (
              <SelectItem key={item.id} value={item.href}>
                <CustomLink
                  href={item.href}
                  className="flex h-full items-center gap-2 p-2"
                >
                  <item.icon className="h-4 w-4" />
                  {t(item.id)}
                </CustomLink>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ProfileSidebar;
