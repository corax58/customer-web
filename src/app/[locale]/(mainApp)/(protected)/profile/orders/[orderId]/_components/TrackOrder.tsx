"use client";

import { useCallback, useEffect, useState } from "react";

import { MapPin, Phone, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getOrderStatus } from "@/actions/profile.actions";
import CustomImage from "@/components/CustomImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types/profile.types";
import { Restaurant } from "@/types/restaurant.types";

import OrderStatusSkeleton from "./OrderStatusSkeleton";

const orderStates: {
  stage: number;
  label: string;
  color: string;
  bgColor: string;
  status: string;
}[] = [
  {
    stage: 1,
    label: "Order Placed",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    status: "PENDING",
  },
  {
    stage: 2,
    label: "Order Confirmed",
    color: "text-green-500",
    bgColor: "bg-green-500",
    status: "ASSIGNED",
  },
  {
    stage: 3,
    label: "Ready for Pickup",
    color: "text-red-500",
    bgColor: "bg-gray-400",
    status: "WAITING",
  },
  {
    stage: 4,
    label: "Picked Up",
    color: "text-blue-500",
    bgColor: "bg-gray-400",
    status: "PICKED_UP",
  },
  {
    stage: 5,
    label: "Delivered",
    color: "text-orange-500",
    bgColor: "bg-gray-400",
    status: "DELIVERED",
  },
];

interface TrackOrderProps {
  order_id: string;
  restaurant: Restaurant;
}
export function TrackOrder({ order_id, restaurant }: TrackOrderProps) {
  const t = useTranslations("profile.orders.order_detail.track_order");
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  const checkCurrentStage = useCallback(
    (statusId: string) => {
      const stage = orderStates.find((status) => status.status == statusId);
      if (stage) setCurrentStage(stage.stage);
    },
    [setCurrentStage],
  );

  const fetchOrderStatus = useCallback(async () => {
    setisLoading(true);
    setFetchFailed(false);
    const { status, success } = await getOrderStatus(order_id);
    if (!success) {
      toast.error(t("error.failed_fetch"));
      setFetchFailed(true);
    }
    if (status) {
      setOrderStatus(status);
      checkCurrentStage(status.status_history.delivery_status);
    }
    setisLoading(false);
  }, [order_id, checkCurrentStage, t]);

  const handleRefresh = () => {
    fetchOrderStatus();
  };
  useEffect(() => {
    if (!isOpen) return;
    fetchOrderStatus();
  }, [fetchOrderStatus, isOpen]);

  const getCurrentBarHeight = () => {
    switch (currentStage) {
      case 1:
        return "h-0";
      case 2:
        return "h-1/4";
      case 3:
        return "h-2/4";
      case 4:
        return "h-3/4";
      case 5:
        return "h-full";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <MapPin className="mr-2 h-4 w-4" />
          {t("trigger")}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="bg-secondary dark:bg-card flex max-h-dvh max-w-md flex-col items-center overflow-hidden overflow-y-auto rounded-3xl p-2 transition-all sm:p-6"
      >
        <DialogHeader className="w-full">
          <div className="group flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-10 overflow-hidden rounded-full">
                <CustomImage
                  imgUrl={restaurant.image_file}
                  title={restaurant.title}
                  placeholderImage={PLACEHOLDER_IMAGES.RESTAURANT}
                  className="object-cover"
                />
              </div>
              <div className="flex h-full flex-col justify-between gap-2">
                <p className="text-lg font-medium">{restaurant.title}</p>
                {orderStatus?.restaurant.phone_number && (
                  <p className="text-muted-foreground text-sm">
                    {orderStatus?.restaurant.phone_number}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-background dark:bg-secondary rounded-full border p-3">
              <Phone size={18} />
            </div>
          </div>
        </DialogHeader>
        <DialogTitle />
        <DialogDescription />
        {isLoading ? (
          <OrderStatusSkeleton />
        ) : fetchFailed ? (
          <div className="py-4">
            <div className="flex h-80 w-full flex-col items-center justify-center gap-4">
              <p>{t("error.failed_fetch")}</p>
              <Button
                variant={"outline"}
                size={"lg"}
                onClick={handleRefresh}
                aria-label="referesh button"
                className="py-0 text-base"
              >
                <RefreshCcw />
                {t("buttons.try_againt")}
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="relative flex w-full flex-col justify-between"
            style={{ height: "22rem" }}
          >
            <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 rounded-full bg-gray-200">
              <div
                className={cn(
                  "bg-primary h-0 w-full rounded-full transition-all",
                  getCurrentBarHeight(),
                )}
              />
            </div>

            {orderStates.map((state) => (
              <div
                key={state.stage}
                className={cn(
                  "z-10 flex items-center justify-center",
                  state.stage == 1 && "items-start",
                  state.stage == 5 && "items-end",
                )}
              >
                {state.stage % 2 === 1 ? (
                  <div className={cn("-ml-px w-1/2 pr-6 text-right")}>
                    <p className="text-muted-foreground text-sm">
                      {t("status")}
                    </p>
                    <p
                      className={cn(
                        "font-medium",
                        currentStage < state.stage && "text-muted-foreground",
                        currentStage == state.stage && "text-primary",
                        currentStage > state.stage && "text-foreground",
                      )}
                    >
                      {t(state.status)}
                    </p>
                  </div>
                ) : (
                  <div className="w-1/2" />
                )}

                <div className="border-secondary bg-primary dark:border-card flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
                  <div className="bg-secondary dark:bg-card size-2 rounded-full" />
                </div>

                {state.stage % 2 === 0 ? (
                  <div className="-mr-px w-1/2 pl-5 text-left">
                    <p className="text-muted-foreground text-sm">
                      {t("status")}
                    </p>
                    <p
                      className={cn(
                        "font-medium",
                        currentStage < state.stage && "text-muted-foreground",
                        currentStage == state.stage && "text-primary",
                        currentStage > state.stage && "text-foreground",
                      )}
                    >
                      {t(state.status)}
                    </p>
                  </div>
                ) : (
                  <div className="w-1/2" />
                )}
              </div>
            ))}
          </div>
        )}
        <DialogFooter className="mt-5 flex w-full justify-center">
          <DialogClose className="w-full">
            <Button className="w-full">{t("buttons.close")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
