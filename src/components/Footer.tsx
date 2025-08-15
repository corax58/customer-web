import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CustomLink from "./CustomLink";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-black text-white">
      <div className="content-container mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4">
            <Logo className="mb-2" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("about.description")}
            </p>
            <div className="flex space-x-3">
              <CustomLink
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </CustomLink>
              <CustomLink
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </CustomLink>
              <CustomLink
                href="#"
                className="hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </CustomLink>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("explore.title")}
            </h3>
            <nav className="space-y-3">
              <CustomLink
                href="/about-us"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.about_us")}
              </CustomLink>
              <CustomLink
                href="/contact-us"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.contact_us")}
              </CustomLink>
              <CustomLink
                href="/restaurants"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.restaurant")}
              </CustomLink>
              <CustomLink
                href="#"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.food_category")}
              </CustomLink>
              <CustomLink
                href="#"
                className="hover:text-primary text-muted-foreground block text-sm transition-colors"
              >
                {t("explore.links.help_center")}
              </CustomLink>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("contact.title")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <Phone className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600">
                  <Mail className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("newsletter.title")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("newsletter.description")}
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="focus:border-primary rounded-none border-t-0 border-r-0 border-b border-l-0 border-gray-600 bg-transparent px-0 text-white placeholder:text-gray-400 focus-visible:ring-0"
              />
              <Button
                size="sm"
                className="bg-primary ml-2 rounded px-4 text-white hover:bg-orange-600"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm text-gray-400 md:text-left">
              {t.rich("bottom_bar.copyright", {
                span: (chunk) => <span className="text-primary">{chunk}</span>,
                a: (chunk) => (
                  <a
                    href="https://www.growztech.com/"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    {chunk}
                  </a>
                ),
              })}
            </p>
            <div className="flex items-center space-x-6">
              <CustomLink
                href="/privacy"
                className="hover:text-primary text-sm text-gray-400 transition-colors"
              >
                {t("bottom_bar.privacy_policy")}
              </CustomLink>
              <CustomLink
                href="/terms-and-conditions"
                className="text-sm text-blue-500 transition-colors hover:text-blue-400"
              >
                {t("bottom_bar.terms_and_conditions")}
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
