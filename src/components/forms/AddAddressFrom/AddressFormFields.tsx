import React from "react";
import { UseFormReturn } from "react-hook-form";

import { CountryCode } from "libphonenumber-js";
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
    title: "Home",
    value: "1",
  },
  {
    title: "Office",
    value: "2",
  },
  {
    title: "Hotel",
    value: "3",
  },
  {
    title: "Other",
    value: "4",
  },
];
const AddressFormFields = ({ form, setCountry }: AddressFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="addressType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Save address as*</FormLabel>
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
                      {addressType.title}
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
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Home" {...field} />
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
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Near St. George's Church" {...field} />
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
              <FormLabel>Floor</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 3rd Floor, Apt 301" {...field} />
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
              <FormLabel>Nearby Landmark</FormLabel>
              <FormControl>
                <Input placeholder="(Optional)" {...field} />
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
            <FormLabel>Mobile Number</FormLabel>
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
            <FormLabel>Pincode</FormLabel>
            <FormControl>
              <Input placeholder="Enter pin code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddressFormFields;
