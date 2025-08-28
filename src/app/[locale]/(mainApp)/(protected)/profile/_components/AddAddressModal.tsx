"use client";
import { useState } from "react";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import AddAddressForm from "@/components/forms/AddAddressFrom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddAddressModal = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("profile.delivery_info");

  const onCreate = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t("address_list.add_new_address")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh min-w-dvw overflow-y-auto md:min-w-3xl lg:min-w-4xl xl:min-w-5xl">
        <DialogHeader>
          <DialogTitle>{t("address_list.add_new_address")}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddAddressForm onCreate={onCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
