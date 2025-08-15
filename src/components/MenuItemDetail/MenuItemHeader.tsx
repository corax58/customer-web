"use client";

import { X } from "lucide-react";

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

  return (
    <div className="relative">
      {menuItem.is_available && (
        <Badge className="absolute bottom-6 left-8 z-10 border-green-700 bg-green-500/50">
          Available
        </Badge>
      )}
      {user && (
        <FavoriteButton
          is_favorite={menuItem.is_favourite === 1}
          itemId={menuItem.id.toString()}
          type="menu_item"
          className="bg-card absolute top-6 left-8 z-10 rounded-full"
        />
      )}
      <DialogClose asChild>
        <Button
          type="button"
          variant="secondary"
          size={"icon"}
          className="bg-card absolute top-6 right-8 z-10 rounded-full"
        >
          <X />
        </Button>
      </DialogClose>
      <Carousel opts={{ loop: true }} className="w-full pt-0">
        <CarouselContent className="-ml-0 h-48 w-full sm:h-56">
          {menuItem.menuImages.map((img) => (
            <CarouselItem key={img.id} className="w-full pl-0">
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
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </div>
  );
};

export default MenuItemHeader;
