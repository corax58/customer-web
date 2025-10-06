"use client";
import { useEffect, useState, useTransition } from "react";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { setDefaultAddress as setDefaultAddressAction } from "@/actions/profile.actions";
import CustomLink from "@/components/CustomLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "@/contexts/LocationContext";
import { cn } from "@/lib/utils";
import { Address } from "@/types/profile.types";

interface UserAddressProps {
  className?: string;
  skeletonClassName?: string;
}
const UserAddress = ({ className, skeletonClassName }: UserAddressProps) => {
  const {
    addressError,
    addressList,

    isPending,
    refreshAddress,
  } = useLocation();

  const t = useTranslations("header.address");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, startUpdate] = useTransition();
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);

  const handleSetDefaultAddress = (address: Address) => {
    startUpdate(async () => {
      const results = await setDefaultAddressAction(address.id.toString());
      if (results.success) {
        refreshAddress();
        setIsOpen(false);
      }
      if (results.error) {
        toast.error(t("failed_default"));
      }
    });
  };

  useEffect(() => {
    if (!addressList) return;
    const currentDefaultAddress = addressList.find(
      (item) => item.is_default == 1,
    );
    if (currentDefaultAddress) {
      setDefaultAddress(currentDefaultAddress);
    }
  }, [addressList]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isUpdating || isPending ? (
        <Skeleton className={cn("h-10 w-32", skeletonClassName)} />
      ) : (
        <DialogTrigger asChild>
          {defaultAddress ? (
            <button
              className={cn(
                "bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold",
                className,
              )}
            >
              <MapPin className="h-4 w-4 min-w-4" />
              <div className="flex flex-col items-start">
                <span className="truncate text-sm font-medium text-nowrap">
                  {defaultAddress.title}
                </span>
                <p className="text-muted-foreground truncate text-xs text-nowrap">
                  {defaultAddress.address}
                </p>
              </div>
            </button>
          ) : (
            <button
              className={cn(
                "bg-secondary flex h-10 w-32 cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 text-sm font-semibold",
                className,
              )}
            >
              <MapPin className="h-4 w-4 min-w-4" />
              <div className="flex flex-col items-start">
                <span className="truncate text-sm font-medium text-nowrap">
                  {t("select_address")}
                </span>
              </div>
            </button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="max-h-dvh overflow-y-auto max-sm:min-w-screen">
        <DialogHeader>
          <DialogTitle>{t("select_default")}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {addressError ? (
          <p>Couldnt fetch addresses</p>
        ) : (
          <div className="flex w-full flex-col overflow-hidden">
            {addressList && addressList?.length > 0 ? (
              addressList.map((address) => (
                <Button
                  key={address.id}
                  variant="ghost"
                  className="h-auto cursor-pointer justify-between rounded-xl p-2"
                  onClick={() => handleSetDefaultAddress(address)}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-500 p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{address.title}</span>

                        {address.is_default == 1 && (
                          <Badge className="h-4 text-xs" variant={"secondary"}>
                            {t("default")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground truncate text-start text-wrap">
                        {address.address}
                      </p>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <div className="flex h-40 w-full items-center justify-center">
                {t("no_address")}
              </div>
            )}
            {}
            <Button className="mt-2 w-full" onClick={() => setIsOpen(false)}>
              <CustomLink href="/profile#delivery-info">
                {addressList && addressList.length == 0
                  ? t("add_new_address")
                  : t("edit_addresses")}
              </CustomLink>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserAddress;
