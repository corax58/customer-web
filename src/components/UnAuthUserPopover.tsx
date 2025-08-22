import React from "react";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import CustomLink from "./CustomLink";
const UnAuthUserPopover = ({ className }: React.ComponentProps<"div">) => {
  const t = useTranslations("header");

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer", className)}>
        <User />
        <span className="sr-only">User dropdown button</span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p>{t("create_an_account")}</p>

        <Button asChild>
          <CustomLink href={"/login"}>{t("login")}</CustomLink>
        </Button>
        <Button asChild variant={"outline"}>
          <CustomLink href={"/signup"}>{t("signup")}</CustomLink>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UnAuthUserPopover;
