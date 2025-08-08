import { Heart, ShoppingBag, User } from "lucide-react";

import CustomLink from "@/components/CustomLink";
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
import { cn } from "@/lib/utils";

import LogoutButton from "../LogoutButton";
import UserAddress from "../UserAddress";

import LanguageDropDown from "./LanguageDropdown";

const UserDropdown = ({ className }: React.ComponentProps<"button">) => {
  const { user } = useAuth();
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
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.profile_file}
                alt={`@${user?.full_name}`}
              />
              <AvatarFallback>
                {user?.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.full_name}</p>
              <p className="text-muted-foreground text-sm">
                {" "}
                {user?.email || `${user?.country_code}${user?.contact_no}`}
              </p>
            </div>
          </div>
        </div>
        <div className="md:hidden">
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
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 px-2 py-3"
            asChild
          >
            <CustomLink href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CustomLink>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 px-2 py-3"
            asChild
          >
            <CustomLink href="/profile/favourites">
              <Heart className="mr-2 h-4 w-4" />
              <span>Favourites</span>
            </CustomLink>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 px-2 py-3"
            asChild
          >
            <CustomLink href="/profile/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </CustomLink>
          </DropdownMenuItem>
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
