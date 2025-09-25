import { usePathname } from "next/navigation";

import { Heart, ShoppingBag, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import LogoutButton from "../LogoutButton";
import UserAddress from "../UserAddress";

import LanguageDropDown from "./LanguageDropdown";

const dropdownItems = [
  {
    key: "profile",
    label: "Profile",
    link: "/profile",
    icon: User,
  },
  {
    key: "favourites",
    label: "Favourites",
    link: "/profile/favourites",
    icon: Heart,
  },
  {
    key: "orders",
    label: "Orders",
    link: "/profile/orders",
    icon: ShoppingBag,
  },
];
const UserDropdown = ({ className }: React.ComponentProps<"button">) => {
  const { user } = useAuth();
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();
  const handleNav = (link: string) => {
    if (pathname !== link) {
      router.push(link);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-secondary relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition-colors",
            className,
          )}
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user?.profile_file} alt={`@${user?.full_name}`} />
            <AvatarFallback>
              {user?.full_name
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        <button
          className="group w-full border-b p-1 transition-colors"
          onClick={() => handleNav("/profile")}
        >
          <div className="group-hover:bg-muted flex items-center gap-3 rounded-lg p-2 transition-all duration-300">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.profile_file}
                alt={`@${user?.full_name}`}
              />
              <AvatarFallback className="group-hover:bg-popover">
                {user?.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <p className="line-clamp-1 font-semibold">
                {user?.full_name.trim()}
              </p>
              <p className="text-muted-foreground text-sm">
                {user?.email || `${user?.country_code}${user?.contact_no}`}
              </p>
            </div>
          </div>
        </button>
        <div className="lg:hidden">
          <LanguageDropDown />
        </div>

        <div className="px-2 py-1">
          <UserAddress
            className="bg-popover hover:bg-secondary h-12 w-full rounded-sm"
            skeletonClassName="w-full h-12"
          />
        </div>

        <DropdownMenuSeparator className="" />
        <div className="px-2 py-1">
          {dropdownItems.map(({ key, icon: Icon, link }) => (
            <DropdownMenuItem
              key={link}
              className="flex cursor-pointer items-center gap-3 px-2 py-3"
              onClick={() => handleNav(link)}
            >
              <Icon className="me-2 h-4 w-4" />
              <span>{t(key)}</span>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="px-2 py-1">
          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
