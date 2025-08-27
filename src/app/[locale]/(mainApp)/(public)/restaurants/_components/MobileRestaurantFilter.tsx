"use client";
import { useState } from "react";

import { DialogDescription } from "@radix-ui/react-dialog";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import RestaurantFilters from "./RestaurantFilter";

interface MobileRestaurantFilterProps {
  className?: string;
}
const MobileRestaurantFilter = ({ className }: MobileRestaurantFilterProps) => {
  const t = useTranslations("restaurants.filter");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className={cn("border lg:hidden", className)}
        >
          <SlidersHorizontal /> {t("buttons.filters")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{t("title")}</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>
        <RestaurantFilters
          className="r flex w-full flex-col gap-5 px-5"
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MobileRestaurantFilter;
