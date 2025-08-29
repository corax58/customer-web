"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/contexts/AuthContext";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { MenuItem } from "@/types/restaurant.types";

import CustomImage from "../CustomImage";
import FavoriteButton from "../FavoriteButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { DialogClose } from "../ui/dialog";

interface MenuItemHeaderProps {
  menuItem: MenuItem;
}

const MenuItemHeader = ({ menuItem }: MenuItemHeaderProps) => {
  const { user } = useAuth();
  const t = useTranslations("components.menu_item_detail");

  return (
    <div className="relative">
      {menuItem.is_available && (
        <Badge className="absolute start-8 bottom-6 z-10 border-green-700 bg-green-500/50">
          {t("available")}
        </Badge>
      )}
      {user && (
        <FavoriteButton
          is_favorite={menuItem.is_favourite === 1}
          itemId={menuItem.id.toString()}
          type="menu_item"
          className="bg-card absolute start-8 top-6 z-10 rounded-full"
        />
      )}
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          size={"icon"}
          className="bg-card absolute end-8 top-6 z-10 rounded-full"
        >
          <X />
        </Button>
      </DialogClose>
      <Carousel opts={{ loop: true }} className="w-full pt-0">
        <CarouselContent className="-ms-0 h-48 w-full sm:h-56">
          {menuItem.menuImages.map((img) => (
            <CarouselItem key={img.id} className="w-full ps-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg sm:h-56">
                <CustomImage
                  imgUrl={img.url}
                  title={img.name}
                  placeholderImage={PLACEHOLDER_IMAGES.FOOD_ITEM}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ms-14" />
        <CarouselNext className="me-14" />
      </Carousel>
    </div>
  );
};

export default MenuItemHeader;
