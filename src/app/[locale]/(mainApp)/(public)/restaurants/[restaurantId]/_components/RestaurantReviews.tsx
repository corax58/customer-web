import { getTranslations } from "next-intl/server";

import { getRestaurantReviews } from "@/actions/restaurants.actions";
import FadingDivider from "@/components/FadingDivider";

import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";

interface RestaurantReviewsProps {
  restaurantId: string;
}

const RestaurantReviews = async ({ restaurantId }: RestaurantReviewsProps) => {
  const { data: reviews } = await getRestaurantReviews(restaurantId);

  const t = await getTranslations("restaurants.restaurant_details.reviews");
  if (!reviews || !reviews.average_rating)
    return (
      <div className="">
        <h3 className="mb-8 text-xl font-semibold">{t("title")}</h3>
        <ReviewSummary
          averageRating={"0"}
          ratingDistribution={{
            "1_star": "0",
            "2_star": "0",
            "3_star": "0",
            "4_star": "0",
            "5_star": "0",
          }}
          totalRatings={"0"}
        />
      </div>
    );

  const ratingDistribution = {
    "5_star": reviews["5_star"].count,
    "4_star": reviews["4_star"].count,
    "3_star": reviews["3_star"].count,
    "2_star": reviews["2_star"].count,
    "1_star": reviews["1_star"].count,
  };

  return (
    <div className="space-y-6">
      <h3 className="mb-8 text-xl font-semibold">{t("title")}</h3>
      <ReviewSummary
        averageRating={reviews.average_rating}
        ratingDistribution={ratingDistribution}
        totalRatings={reviews.total_rating.count}
      />
      <FadingDivider className="max-h-px w-full" />
      {reviews.list.map((review) => (
        <>
          <ReviewCard key={review.id} review={review} />
          <FadingDivider />
        </>
      ))}
    </div>
  );
};

export default RestaurantReviews;
