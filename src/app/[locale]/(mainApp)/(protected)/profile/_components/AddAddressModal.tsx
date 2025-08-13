"use client";
import { useState } from "react";

import { Plus } from "lucide-react";

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
          Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh min-w-dvw overflow-y-auto md:min-w-3xl lg:min-w-4xl xl:min-w-5xl">
        <DialogHeader>
          <DialogTitle>Add new addresss</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddAddressForm onCreate={onCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
