import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Category } from "@/types/restaurant.types";

import { Card, CardContent } from "./ui/card";
import CustomImage from "./CustomImage";
import CustomLink from "./CustomLink";

interface CategoryCard {
  category: Category;
  className?: string;
}
const CategoryCard = ({ category, className }: CategoryCard) => {
  const t = useTranslations("components.category_card");
  return (
    <CustomLink href={`/categories/${category.id}?title=${category.title}`}>
      <Card
        className={cn(
          "group h-full w-full overflow-hidden p-0 shadow-none",
          className,
        )}
      >
        <CardContent className="px-0 py-0">
          <div className="relative aspect-square w-full">
            <CustomImage
              imgUrl={category.image}
              title={category.title}
              placeholderImage={PLACEHOLDER_IMAGES.CATEGORY}
            ></CustomImage>
          </div>

          <div className="relative px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="group-hover:text-primary mb-1 text-sm font-semibold text-nowrap transition-colors duration-200 sm:text-base xl:text-lg">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-xs text-nowrap sm:text-sm">
                  {t("explore")}
                  <span className="max-sm:hidden md:hidden lg:inline">
                    {" "}
                    {t("menu")}
                  </span>
                </p>
              </div>

              <div className="flex h-10 w-10 translate-x-2 transform items-center justify-center rounded-full bg-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out group-hover:w-full" />
          </div>
        </CardContent>
      </Card>
    </CustomLink>
  );
};

export default CategoryCard;
