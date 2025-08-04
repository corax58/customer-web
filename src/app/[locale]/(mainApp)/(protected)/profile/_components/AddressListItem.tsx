"use client";
import { useTransition } from "react";

import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteAddress, setDefaultAddress } from "@/actions/profile.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Address } from "@/types/profile.types";
interface AddressListItemProps {
  address: Address;
}
const AddressListItem = ({ address }: AddressListItemProps) => {
  const [isDeleting, startDelete] = useTransition();
  const [isUpdating, startUpdate] = useTransition();
  const { refreshAddress } = useLocation();
  const router = useRouter();

  const handleDeleteAddress = () => {
    startDelete(async () => {
      const results = await deleteAddress(address.id.toString());
      if (results.success) {
        toast.success("Successfully deleted address");
        router.refresh();
      }
      if (results.error) {
        toast.error("Failed at deleting address");
      }
    });
  };

  const handleSetDefaultAddress = () => {
    startUpdate(async () => {
      const results = await setDefaultAddress(address.id.toString());
      if (results.success) {
        localStorage.removeItem("defaultAddress");
        refreshAddress();
        router.refresh();
      }
      if (results.error) {
        toast.error("Failed at setting default address");
      }
    });
  };
  return (
    <Card
      className={cn(
        "gap-0 px-4 py-2 shadow-none",
        address.is_default === 1 && "bg-secondary",
      )}
    >
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{address.title}</CardTitle>

          <div>
            {address.is_default == 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" disabled={isDeleting}>
                    {isDeleting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your this address. and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAddress}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-end justify-between px-0">
        <div className="text-muted-foreground space-y-1">
          <p>{address.address}</p>
          <p>{address.description}</p>
          <p>{address.pincode}</p>
        </div>
        <div>
          {address.is_default === 1 && (
            <Badge className="bg-card text-foreground border-border border text-sm">
              Default
            </Badge>
          )}
          {address.is_default == 0 && (
            <Button
              size={"sm"}
              variant={"link"}
              disabled={isUpdating}
              onClick={handleSetDefaultAddress}
              className="w-24"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Set Default"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressListItem;
