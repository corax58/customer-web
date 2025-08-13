"use client";

import AddAddressForm from "@/components/forms/AddAddressFrom";
import { useRouter } from "@/i18n/navigation";

const SetupAddress = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push("/home");
  };
  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-bold">Set Up Your Address</h1>
        <p className="text-muted-foreground text-sm">
          Where to deliver your food.
        </p>
      </div>
      <AddAddressForm onCreate={onCreate} />
    </div>
  );
};

export default SetupAddress;
