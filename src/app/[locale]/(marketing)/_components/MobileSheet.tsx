import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import CustomLink from "@/components/CustomLink";
import LanguageSelector from "@/components/LanguageSelector";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "@/i18n/navigation";

const navigationItems = [
  { href: "/restaurants", label: "restaurants" },
  { href: "/about-us", label: "about_us" },
  { href: "/contact-us", label: "contact_us" },
];

interface MobileSheetProps {
  isAuthenticated: boolean;
}
const MobileSheet = ({ isAuthenticated }: MobileSheetProps) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-sm:w-full"
        hasCloseButton={false}
      >
        <SheetHeader>
          <SheetTitle className="sr-only">mobile navigation sheet</SheetTitle>
          <div className="flex items-center justify-between">
            <CustomLink href={isAuthenticated ? "/home" : "/"}>
              <Logo />
            </CustomLink>

            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <SheetClose>
                <Button variant={"ghost"} size={"icon"} className="shadow-none">
                  <X />
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-5 px-5 font-medium">
          {navigationItems.map((item) => (
            <CustomLink
              key={item.href}
              href={item.href}
              className={`hover:text-primary ${
                pathname === item.href ? "text-primary" : ""
              }`}
            >
              {t(item.label)}
            </CustomLink>
          ))}
          {!isAuthenticated && (
            <div className="flex w-full flex-col space-y-2">
              <Button asChild>
                <CustomLink href={"/login"}>{t("login")}</CustomLink>
              </Button>
              <Button variant={"outline"} className="border-primary" asChild>
                <CustomLink href={"/signup"}>{t("signup")}</CustomLink>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
