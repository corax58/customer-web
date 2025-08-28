import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { CountryCode } from "libphonenumber-js";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { PhoneInput } from "@/components/PhoneNumberInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormValues } from "@/lib/schemas/auth.schema";

interface LoginFormFieldsProps {
  form: UseFormReturn<LoginFormValues>;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode | undefined>>;
}
const LoginFormFields = ({ form, setCountry }: LoginFormFieldsProps) => {
  const t = useTranslations("auth.login");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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
                {...field}
                onCountryChange={setCountry}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("password")}</FormLabel>
            <FormControl>
              <div className="flex">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...field}
                />
                <button
                  className="-m-6 cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default LoginFormFields;
