import { CircleX } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getAddressList } from "@/actions/profile.actions";

import AddressListItem from "./AddressListItem";

const AddressList = async () => {
  const { data, error } = await getAddressList();
  const t = await getTranslations("profile.delivery_info.address_list");
  if (error)
    return (
      <div className="flex h-20 w-full items-center justify-center gap-2">
        <CircleX /> {t("errors.something_went_wrong")}
      </div>
    );
  if (data)
    return (
      <div className="grid gap-6">
        {data.map((address) => (
          <AddressListItem key={address.id} address={address} />
        ))}
      </div>
    );
};

export default AddressList;
