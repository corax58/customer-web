import React from "react";
import { UseFormReturn } from "react-hook-form";

import { CountryCode } from "libphonenumber-js";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { PhoneInput } from "@/components/PhoneNumberInput";
import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { profileUpdateSchema } from "@/lib/schemas/auth.schema";

interface ProfileUpdateFormFieldsProps {
  form: UseFormReturn<z.infer<typeof profileUpdateSchema>>;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode | undefined>>;
}
const ProfileUpdateFormFields = ({
  form,
  setCountry,
}: ProfileUpdateFormFieldsProps) => {
  const t = useTranslations("components.profile_update_form");
  const { user } = useAuth();

  return (
    <>
      <FormField
        control={form.control}
        name="first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("first_name")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("last_name")}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("gender")}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{t("male")}</SelectItem>
                  <SelectItem value="1">{t("female")}</SelectItem>
                  <SelectItem value="2">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("date_of_birth")}</FormLabel>
            <FormControl>
              <DatePicker {...field} className="w-full" />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact_no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("mobile_number")}</FormLabel>
            <FormControl>
              <PhoneInput
                id="phone-number"
                defaultCountry="ET"
                onCountryChange={setCountry}
                {...field}
                disabled={!user?.contact_no}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProfileUpdateFormFields;
