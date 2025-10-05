import { getFormatter, getTranslations } from "next-intl/server";

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
import { cn } from "@/lib/utils";
import { Availability } from "@/types/restaurant.types";

interface AvailabilityModalProps {
  availability: Availability[];
}

function getTodayIndex() {
  const today = new Date();
  return today.getDay();
}
const AvailabilityModal = async ({ availability }: AvailabilityModalProps) => {
  const today = getTodayIndex();
  const t = await getTranslations(
    "restaurants.restaurant_details.info.availability",
  );
  const formatter = await getFormatter();
  const currentDayAvailabilty = availability.find(
    (day) => day.day_id === today,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-fit cursor-pointer rounded-full border"
        >
          {currentDayAvailabilty ? (
            <>
              <div className="size-1.5 rounded-full bg-green-500" />

              {t.rich("buttons.trigger", {
                startTime: formatter.dateTime(
                  new Date(currentDayAvailabilty.start_time),
                  { timeStyle: "short" },
                ),
                endTime: formatter.dateTime(
                  new Date(currentDayAvailabilty.end_time),
                  { timeStyle: "short" },
                ),

                highlight: (chunks) => (
                  <span className="font-bold text-green-600">{chunks}</span>
                ),
              })}
            </>
          ) : (
            t("buttons.closed")
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {availability.map((day, index) => (
            <div
              key={day.id}
              className={cn(
                "text-secondary-foreground flex items-center justify-between py-2",
                index < availability.length - 1 && "border-b",
              )}
            >
              <p>{t(`days.${day.day_id}`)}</p>
              <div className="flex items-center gap-2 font-medium">
                {t("days.opening_hours", {
                  startTime: formatter.dateTime(new Date(day.start_time), {
                    timeStyle: "short",
                  }),
                  endTime: formatter.dateTime(new Date(day.end_time), {
                    timeStyle: "short",
                  }),
                })}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button type="button" className="w-full font-semibold">
              {t("buttons.close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
