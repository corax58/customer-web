"use client";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

import MobileSheet from "./MobileSheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("header");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        "fixed top-0 z-50 h-fit w-full border-b-0 bg-transparent text-white transition-all duration-100",
        isScrolled && "bg-background text-foreground border-b",
      )}
    >
      <div className="content-container flex w-full justify-between py-4">
        <div className="flex w-1/3 items-center gap-2">
          <MobileSheet isAuthenticated={isAuthenticated} />
          <CustomLink href={isAuthenticated ? "/home" : "/"}>
            <Logo />
          </CustomLink>
        </div>
        <div className="flex w-1/3 items-center justify-evenly font-medium max-lg:hidden">
          <CustomLink href={"/restaurants"} className="hover:text-primary">
            {t("restaurants")}
          </CustomLink>
          <CustomLink href={"/about-us"} className="hover:text-primary">
            {t("about_us")}
          </CustomLink>
          <CustomLink href={"/contact-us"} className="hover:text-primary">
            {t("contact_us")}
          </CustomLink>
        </div>
        <div className="flex items-center justify-end lg:w-1/3 lg:gap-8">
          <LanguageSelector className="max-lg:hidden" />
          <ThemeToggle className="dark:hover:bg-secondary/50 hover:bg-secondary/30 border-0 bg-transparent shadow-none max-lg:hidden dark:bg-transparent" />
          {!isAuthenticated && <UnAuthUserPopover />}
        </div>
      </div>
    </div>
  );
};

export default Header;
