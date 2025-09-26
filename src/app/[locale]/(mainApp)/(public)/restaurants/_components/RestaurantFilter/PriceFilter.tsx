import React from "react";

import { useTranslations } from "next-intl";

import FormattedAfghani from "@/components/FormattedAfghani";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";

import { RestaurantFilters } from ".";

interface PriceFilterProps {
  filters: RestaurantFilters;
  setFilters: React.Dispatch<React.SetStateAction<RestaurantFilters>>;
}
const PriceFilter = ({ filters, setFilters }: PriceFilterProps) => {
  const t = useTranslations("restaurants.filter");
  return (
    <div>
      <Label className="mb-10">{t("price_per_person")}</Label>
      <div className="flex w-full items-center gap-4 px-2">
        <DualRangeSlider
          label={(value) => (
            <span className="me-4 rtl:-me-4">
              {value && (
                <FormattedAfghani amount={value} minimumFractionDigits={0} />
              )}
            </span>
          )}
          value={[parseInt(filters.min), parseInt(filters.max)]}
          onValueChange={(e: number[]) =>
            setFilters((prev) => ({
              ...prev,
              min: e[0].toString(),
              max: e[1].toString(),
            }))
          }
          min={0}
          max={500}
          step={1}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
