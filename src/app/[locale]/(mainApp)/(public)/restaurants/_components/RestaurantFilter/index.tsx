"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";

import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortRestaurants from "./SortRestaurants";

export interface RestaurantFilters {
  category: string[];
  min: string;
  max: string;
  rating: string;
  offer: string;
  sort_by: string;
}

const offers = [20, 45, 50, 60];

interface RestaurantFilterProps {
  className?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantFilter = ({ className, setOpen }: RestaurantFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue: RestaurantFilters = {
    category: searchParams.getAll("category"),
    min: searchParams.get("min") || "0",
    max: searchParams.get("max") || "500",
    rating: searchParams.get("rating") || "",
    offer: searchParams.get("offer") || "",
    sort_by: searchParams.get("sort_by") || "none",
  };
  const [filters, setFilter] = useState<RestaurantFilters>(initialValue);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (filters.category.length == 0) {
      params.delete("category");
    } else {
      params.delete("category");
      filters.category.forEach((category) =>
        params.append("category", category),
      );
    }

    if (filters.min == "0") {
      params.delete("min");
    } else {
      params.set("min", filters.min);
    }

    if (filters.max == "500") {
      params.delete("max");
    } else {
      params.set("max", filters.max);
    }

    if (filters.rating == "") {
      params.delete("rating");
    } else {
      params.set("rating", filters.rating);
    }

    if (filters.offer == "") {
      params.delete("offer");
    } else {
      params.set("offer", filters.offer);
    }
    if (filters.sort_by == "none") {
      params.delete("sort_by");
    } else {
      params.set("sort_by", filters.sort_by);
    }

    router.replace(`/restaurants?${params.toString()}`, { scroll: false });

    if (setOpen) {
      setOpen((prev) => !prev);
    }
  };

  const clearFilters = () => {
    setFilter({
      category: [],
      max: "500",
      min: "0",
      rating: "",
      offer: "",
      sort_by: "none",
    });
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    Object.keys(filters).forEach((key) => params.delete(key));

    router.replace(
      {
        pathname: "/restaurants",
        query: Object.fromEntries(params),
      },
      { scroll: false },
    );
  };

  const handleOfferChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,

      offer: prev.offer === value ? "" : value,
    }));
  };

  return (
    <div className={className}>
      <SortRestaurants setFilters={setFilter} filters={filters} />
      <CategoryFilter setFilters={setFilter} filters={filters} />
      <div className="w-full">
        <Label className="mb-4">Rating</Label>
        <Select
          value={filters.rating}
          defaultValue={filters.rating}
          onValueChange={(value) => {
            if (value == filters.rating) {
              setFilter((prev) => ({ ...prev, rating: "" }));
            } else {
              setFilter((prev) => ({ ...prev, rating: value }));
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <SelectItem value={`${index + 1}`} id={`${index + 1}-star`}>
                    <Star size={12} className="fill-primary text-primary" />
                    {index + 1}
                  </SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <PriceFilter filters={filters} setFilters={setFilter} />

      <div>
        <Label className="mb-4">Offers</Label>
        <RadioGroup value={filters.offer}>
          {offers.map((offer) => (
            <div key={offer} className="flex items-center space-x-2">
              <RadioGroupItem
                value={offer.toString()}
                id={`offer_${offer}`}
                // Add an onClick handler to each item.
                onClick={() => handleOfferChange(offer.toString())}
              />
              <Label htmlFor={`offer_${offer}`}>Upto {offer}% off</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button className="w-full" onClick={applyFilters}>
        Apply
      </Button>
      <Button
        variant={"outline"}
        className="border-primary w-full"
        onClick={clearFilters}
      >
        Clear
      </Button>
    </div>
  );
};

export default RestaurantFilter;
