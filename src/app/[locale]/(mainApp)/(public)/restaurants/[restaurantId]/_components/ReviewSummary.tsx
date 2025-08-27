import { getFormatter, getTranslations } from "next-intl/server";

import FadingDivider from "@/components/FadingDivider";
import ReviewStars from "@/components/ReviewStars";
import { Progress } from "@/components/ui/progress";

interface ReviewSummaryProps {
  averageRating: string;
  totalRatings: string;
  ratingDistribution: {
    "5_star": string;
    "4_star": string;
    "3_star": string;
    "2_star": string;
    "1_star": string;
  };
}
const ReviewSummary = async ({
  averageRating,
  totalRatings,
  ratingDistribution,
}: ReviewSummaryProps) => {
  const getRatingPercentage = (starCount: string) => {
    const total = Number.parseInt(totalRatings.replace(/,/g, ""));
    const count = Number.parseInt(starCount.replace(/,/g, ""));

    return total > 0 ? (count / total) * 100 : 0;
  };

  const ratingBars = [
    { stars: 5, count: ratingDistribution["5_star"] },
    { stars: 4, count: ratingDistribution["4_star"] },
    { stars: 3, count: ratingDistribution["3_star"] },
    { stars: 2, count: ratingDistribution["2_star"] },
    { stars: 1, count: ratingDistribution["1_star"] },
  ];
  const t = await getTranslations("restaurants.restaurant_details.reviews");
  const formatter = await getFormatter();
  return (
    <div className="flex items-center gap-4 lg:gap-8">
      <div className="flex h-full w-fit flex-col items-center justify-between">
        <div className="flex items-end gap-2">
          <div className="mb-1 text-5xl font-medium">
            {formatter.number(Number.parseFloat(averageRating), {
              maximumFractionDigits: 1,
            })}
          </div>
          <div className="text-muted-foreground mb-2 text-sm">
            ({formatter.number(parseInt(totalRatings))})
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ReviewStars rating={Number.parseFloat(averageRating)} />
        </div>
      </div>

      <div className="flex w-full items-center gap-4 md:w-1/2 lg:gap-8">
        <FadingDivider className="h-28 w-px bg-gradient-to-b max-md:hidden" />

        <div className="w-full">
          <div className="space-y-2">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="text-muted-foreground text-xs">
                  {formatter.number(bar.stars)}
                </span>

                <Progress
                  value={getRatingPercentage(bar.count) || 0}
                  className="bg-muted"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center gap-4 max-md:hidden lg:gap-8">
        <FadingDivider className="h-28 w-px min-w-px bg-gradient-to-b max-md:hidden" />
        <p className="text-muted-foreground text-sm max-md:hidden">
          {t("rating_description")}
        </p>
      </div>
    </div>
  );
};

export default ReviewSummary;
