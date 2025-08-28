"use client";
import { useCallback, useEffect, useState } from "react";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { addToFavorites } from "@/actions/actions";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

interface FavoriteButtonProps {
  itemId: string;
  is_favorite: boolean;
  type: "restaurant" | "menu_item";
  className?: string;
}

const typeMap: {
  restaurant: number;
  menu_item: number;
} = {
  restaurant: 1,
  menu_item: 2,
};

const FavoriteButton = ({
  itemId,
  is_favorite,
  type,
  className,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(is_favorite);

  const t = useTranslations("components.favourite_button");
  const debouncedValue = useDebounce(isFavorite, 500);

  const toggleFavorite = useCallback(async () => {
    const result = await addToFavorites(itemId, typeMap[type].toString());
    if (result.success) {
      if (debouncedValue) {
        toast.success(t("removed_from_fav"));
      } else {
        toast.success(t("added_to_fav"));
      }
      return;
    } else {
      toast.error(t("failed"));
      return;
    }
  }, [itemId, type, t, debouncedValue]);

  useEffect(() => {
    if (debouncedValue !== isFavorite) {
      toggleFavorite();
    }
  }, [debouncedValue, isFavorite, toggleFavorite]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("cursor-pointer", className)}
      onClick={() => setIsFavorite((prev) => !prev)}
    >
      <Heart
        className={` ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground hover:text-red-500"
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
