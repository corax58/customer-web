"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Star } from "lucide-react";

import ReviewStars from "@/components/ReviewStars";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  className?: string;
}
const RatingFilter = ({ className }: RatingFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");

  const handleFilter = (rating: string) => {
    const params = new URLSearchParams(searchParams);
    if (rating == value) {
      setValue("");
      params.delete("rating");
      params.delete("highRating");
      router.replace(
        {
          pathname,
          query: Object.fromEntries(params),
        },
        { scroll: false },
      );
      return;
    }

    setValue(rating);
    if (rating == "highRating") {
      params.delete("rating");

      params.set("highRating", "true");
    } else {
      params.delete("highRating");
      params.set("rating", rating);
    }

    router.replace(
      {
        pathname,
        query: Object.fromEntries(params),
      },
      { scroll: false },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("rounded-full", className)}>
          <Star />
          Ratings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => handleFilter(value)}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <DropdownMenuRadioItem key={index} value={index.toString()}>
              <ReviewStars rating={index} />
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuRadioItem value="highRating">
            High Rating
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RatingFilter;
