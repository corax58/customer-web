"use client";

import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

import { Icon } from "../Icon";
import LocationLink from "../LocationLink";

import AccountMenu from "./_components/AccountMenu";
import MobileMenu from "./_components/MobileMenu";
import SearchBar from "./_components/SearchBar";

const Header = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const t = useTranslations("header");
  return (
    <div className="bg-background fixed top-0 z-50 w-full overflow-hidden border-b py-4 shadow-sm">
      <div className="content-container flex w-full items-center justify-center gap-5 max-lg:flex-col">
        <div className="flex items-center justify-between gap-2 max-lg:w-full lg:gap-10">
          <LocationLink href={isAuthenticated ? "/home" : "/"}>
            <Logo />
          </LocationLink>
          <LocationLink
            href="/restaurants"
            className="hover:text-primary flex min-w-fit items-center gap-1 font-medium text-nowrap max-md:text-sm"
          >
            {t("restaurants")}
            <Icon
              as={MoveUpRight}
              size={10}
              className="lg:hidden"
              isDirectional
            />
          </LocationLink>
          <MobileMenu isAuthenticated={isAuthenticated} isLoading={isLoading} />
        </div>
        <div className="flex w-full items-center gap-2">
          <SearchBar />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
