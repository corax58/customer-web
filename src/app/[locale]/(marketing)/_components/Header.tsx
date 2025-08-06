"use client";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import UnAuthUserPopover from "@/components/UnAuthUserPopover";
import { cn } from "@/lib/utils";

import MobileSheet from "./MobileSheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("header");

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
        "fixed top-0 z-50 flex h-fit w-full justify-between border-b-0 bg-transparent px-4 py-4 text-white transition-all duration-300 md:px-8 lg:px-20 xl:px-28",
        isScrolled && "bg-background text-foreground border-b",
      )}
    >
      <div className="flex w-1/3 items-center gap-2">
        <MobileSheet />
        <CustomLink href="/">
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
        <UnAuthUserPopover />
      </div>
    </div>
  );
};

export default Header;
