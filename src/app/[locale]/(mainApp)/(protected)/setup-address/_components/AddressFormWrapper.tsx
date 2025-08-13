"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";

import AddAddressForm from "../../profile/_components/AddAddressForm";

const AddressFormWrapper = () => {
  const router = useRouter();
  const { user } = useAuth();

  const onCreate = () => {
    if (user?.is_profile_setup == 0) {
      router.push("/profile-update");
    } else {
      router.push("/home");
    }
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

export default AddressFormWrapper;
