import React from "react";
import { useSearchParams } from "next/navigation";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import CustomLink from "./CustomLink";
const UnAuthUserPopover = ({ className }: React.ComponentProps<"div">) => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = new URLSearchParams(searchParams.toString());
  queryParams.delete("lat");
  queryParams.delete("lon");
  queryParams.delete("personalized");

  const queryString = queryParams.toString();

  const redirect_url = encodeURIComponent(
    `${pathname}${queryString ? `?${queryString}` : ""}`,
  );
  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer", className)}>
        <User />
        <span className="sr-only">User dropdown button</span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p>{t("create_an_account")}</p>

        <Button asChild>
          <CustomLink href={`/login?redirect_url=${redirect_url}`}>
            {t("login")}
          </CustomLink>
        </Button>
        <Button asChild variant={"outline"}>
          <CustomLink href={`/signup?redirect_url=${redirect_url}`}>
            {t("signup")}
          </CustomLink>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UnAuthUserPopover;
