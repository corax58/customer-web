import React from "react";
import { UseFormReturn } from "react-hook-form";

import { CountryCode } from "libphonenumber-js";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { PhoneInput } from "@/components/PhoneNumberInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addressSchema } from "@/lib/schemas/address.schema";

interface AddressFormFieldsProps {
  form: UseFormReturn<z.infer<typeof addressSchema>>;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode | undefined>>;
}
const addressTypes = [
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
const AddressFormFields = ({ form, setCountry }: AddressFormFieldsProps) => {
  const t = useTranslations("components.add_address_form");

  return (
    <>
      <FormField
        control={form.control}
        name="addressType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t("labels.save_as")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-4"
              >
                {addressTypes.map((addressType) => (
                  <FormItem
                    key={addressType.value}
                    className="flex items-center space-y-0 space-x-2"
                  >
                    <FormControl>
                      <RadioGroupItem value={addressType.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t(`address_types.${addressType.key}`)}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("labels.title")}</FormLabel>
            <FormControl>
              <Input placeholder={t("placeholders.title")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("labels.address")}</FormLabel>
            <FormControl>
              <Input placeholder={t("placeholders.address")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.floor")}</FormLabel>
              <FormControl>
                <Input placeholder={t("placeholders.floor")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.landmark")}</FormLabel>
              <FormControl>
                <Input placeholder={t("placeholders.landmark")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="contact_no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("labels.mobile_number")}</FormLabel>
            <PhoneInput
              id="phone-number"
              defaultCountry="ET"
              {...field}
              onCountryChange={setCountry}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pinCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("labels.pincode")}</FormLabel>
            <FormControl>
              <Input placeholder={t("placeholders.pincode")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressFormFields;
