"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { APIProvider } from "@vis.gl/react-google-maps";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import { addAddress } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLocation } from "@/contexts/LocationContext";
import { useAddressSchema } from "@/lib/schemas/address.schema";

import AddressFormFields from "./AddressFormFields";
import { LocationPicker } from "./LocationPicker";

interface AddAddressFormProps {
  onCreate: () => void;
}

export const addressTypes = [
  {
    key: "home",
    value: "1",
  },
  {
    key: "office",
    value: "2",
  },
  {
    key: "hotel",
    value: "3",
  },
  {
    key: "other",
    value: "4",
  },
];

const AddAddressForm = ({ onCreate }: AddAddressFormProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!;

  const addressSchema = useAddressSchema();

  const t = useTranslations("components.add_address_form");
  const { refreshAddress } = useLocation();
  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: "1",
      address: "",
      landmark: "",
      floor: "",
      contact_no: "",
      apt_no: "",
    },
  });

  function onLocationSelect({
    address,
    position: { lat, lng },
  }: {
    address: string;
    position: { lat: number; lng: number };
  }) {
    form.clearErrors("address");
    form.setValue("address", address);
    form.setValue("latitude", lat.toString());
    form.setValue("longitude", lng.toString());
  }

  function onSubmit(values: z.infer<typeof addressSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    const selectedType = addressTypes.find(
      (addressType) => addressType.value == values.addressType,
    ) || { key: "", value: 0 };

    const data = {
      AddressManagement: {
        title: selectedType.key,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
        type_id: parseInt(values.addressType),
        description: values.landmark,
        pincode: 10001,
        contact_no: contact_no,
        country_code: "+" + country_code,
        floor: values.floor,
        apt_no: values.apt_no,
      },
    };

    startTransition(async () => {
      const results = await addAddress(data);

      if (results.success) {
        toast.success(t("messages.save_success"));
        form.reset();
        localStorage.removeItem("noDefaultAddress");
        refreshAddress();
        onCreate();
      }

      if (results.error) {
        toast.error(t("messages.save_error"));
      }
    });
  }
  return (
    <APIProvider apiKey={API_KEY} libraries={["places", "marker", "geocoding"]}>
      <div className="flex gap-5 max-md:flex-col">
        <LocationPicker
          onLocationSelect={onLocationSelect}
          className="md:w-1/2"
          noAddressError={form.formState.errors.latitude ? true : false}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:w-1/2"
          >
            <AddressFormFields form={form} setCountry={setCountry} />

            <Button type="submit" className="!mt-8 w-full" disabled={isPending}>
              {t("buttons.save_address")}
            </Button>
          </form>
        </Form>
      </div>
    </APIProvider>
  );
};

export default AddAddressForm;
