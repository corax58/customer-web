"use client";
import { useState, useTransition } from "react";

import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { addRating } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { OrderDetail } from "@/types/profile.types";

import StarRating from "./StarRating";

interface ReviewModalProps {
  order: OrderDetail;
  className?: string;
}

const ReviewModal = ({ order, className }: ReviewModalProps) => {
  const t = useTranslations("profile.orders.order_detail.review_modal");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [restaurantRating, setRestaurantRating] = useState(0);
  const [restaurantComment, setRestaurantComment] = useState("");

  const [riderRating, setRiderRating] = useState(0);
  const [riderComment, setRiderComment] = useState("");

  const handleSaveReview = () => {
    if (restaurantRating === 0 && riderRating === 0) {
      toast.error(t("message.no_review"));
      return;
    }

    startTransition(async () => {
      try {
        const ratingPromises = [];

        if (restaurantRating > 0) {
          ratingPromises.push(
            addRating({
              Rating: {
                rating: restaurantRating.toString(),
                comment: restaurantComment,
                model_id: order.store_id.toString(),
                type_id: order.id.toString(),
                model_type: "Detail",
              },
            }),
          );
        }

        if (riderRating > 0 && order.driver_id) {
          ratingPromises.push(
            addRating({
              Rating: {
                rating: riderRating.toString(),
                comment: riderComment,
                model_id: order.driver_id.toString(),
                type_id: order.id.toString(),
                model_type: "Driver",
                driver_comment: riderComment,
                driver_id: order.driver_id.toString(),
                rider_rating: riderRating.toString(),
              },
            }),
          );
        }

        await Promise.all(ratingPromises);

        toast.success(t("message.success"));
        setIsReviewModalOpen(false); // Close modal on success
      } catch (error) {
        console.error("Failed to submit review:", error);
        toast.error(t("message.error"));
      }
    });
  };

  return (
    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
      <DialogTrigger asChild>
        <Button className={className} disabled={isPending}>
          {isPending ? <Loader className="animate-spin" /> : t("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto max-h-screen max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-medium">
            {t("title")}{" "}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="bg-secondary flex items-center gap-3 rounded-lg p-3">
            <p className="font-medium">
              {t("delivered_to", {
                address: order.customer_address_deatil.title,
              })}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">{t("rate_restaurant")}</h3>
            <StarRating
              rating={restaurantRating}
              onRatingChange={setRestaurantRating}
            />
            <Textarea
              placeholder={t("restaurant_placeholder")}
              value={restaurantComment}
              onChange={(e) => setRestaurantComment(e.target.value)}
              className="bg-secondary mt-3 resize-none border"
              rows={3}
            />
          </div>

          {order.driver_id && (
            <div className="space-y-3">
              <h3 className="font-medium">{t("rate_rider")}</h3>
              <StarRating
                rating={riderRating}
                onRatingChange={setRiderRating}
              />
              <Textarea
                placeholder={t("rider_placeholder")}
                value={riderComment}
                onChange={(e) => setRiderComment(e.target.value)}
                className="bg-secondary mt-3 resize-none border"
                rows={3}
              />
            </div>
          )}

          <Button
            onClick={handleSaveReview}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? <Loader className="animate-spin" /> : t("submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
