import React, { useEffect, useState, useTransition } from "react";

import { BadgePercent, Edit, Plus, TicketPercent } from "lucide-react";

import { getOffersList } from "@/actions/actions";
import FormattedAfghani from "@/components/FormattedAfghani";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Offer } from "@/types/restaurant.types";

import OfferCard from "./OfferCard";

interface OffersProps {
  selectedOffer: Offer | null;
  setSelectedOffer: React.Dispatch<React.SetStateAction<Offer | null>>;
}

const Offers = ({ selectedOffer, setSelectedOffer }: OffersProps) => {
  const { currentRestaurantId } = useCart();
  const [offersList, setOffersList] = useState<Offer[] | null>();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!offersList && !isPending) {
      startTransition(async () => {
        if (!currentRestaurantId) return;
        const result = await getOffersList({
          id: currentRestaurantId?.toString(),
        });
        if (result.data) {
          setOffersList(result.data);
        } else if (result.error) {
          setError(result.error);
        }
      });
    }
  }, [isPending, offersList, currentRestaurantId]);

  return (
    <div className="">
      <h3 className="mb-3 font-medium">Apply Offer</h3>
      <Dialog>
        <DialogTrigger asChild>
          {selectedOffer ? (
            <Button
              variant="ghost"
              className="bg-secondary dark:bg-secondary h-auto w-full justify-between rounded-xl border p-2"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500 p-2">
                  <TicketPercent className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedOffer.title}</span>
                  </div>
                  <p className="text-muted-foreground">
                    - <FormattedAfghani amount={selectedOffer.discount} />
                  </p>
                </div>
              </div>
              <Edit size={20} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="bg-secondary dark:bg-secondary h-auto w-full justify-between rounded-xl border p-2"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500 p-2">
                  <TicketPercent className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">Apply Offer</span>
              </div>
              <div className="rounded-full bg-orange-500 p-1">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appl an Offer</DialogTitle>
            <DialogDescription>Select an Offer to apply</DialogDescription>
          </DialogHeader>
          <div>
            {offersList && offersList.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center gap-4">
                <BadgePercent size={25} />
                <p className="">No Offers Available</p>
              </div>
            ) : (
              offersList &&
              offersList.map((offer) => (
                <OfferCard
                  selectedOffer={selectedOffer}
                  setSelectedOffer={setSelectedOffer}
                  key={offer.id}
                  offer={offer}
                />
              ))
            )}
            {error && <p>Couldnt fetch offers</p>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Offers;
