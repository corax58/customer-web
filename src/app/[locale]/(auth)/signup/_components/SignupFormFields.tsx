import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { CountryCode } from "libphonenumber-js";
import { Eye, EyeOff } from "lucide-react";
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
import { signupSchema } from "@/lib/schemas/auth.schema";

interface SignupFormFieldsProps {
  form: UseFormReturn<z.infer<typeof signupSchema>>;
  setCountry: React.Dispatch<React.SetStateAction<CountryCode | undefined>>;
}
const SignupFormFields = ({ form, setCountry }: SignupFormFieldsProps) => {
  const t = useTranslations("auth.signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="flex w-full gap-2">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("first_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("john")} {...field} />
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
                <Input placeholder={t("doe")} {...field} />
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
            <FormLabel>{t("mobile_number")}</FormLabel>
            <FormControl>
              <PhoneInput
                id="phone-number"
                defaultCountry="ET"
                onCountryChange={setCountry}
                {...field}
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
      <FormField
        control={form.control}
        name="confirm_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("confirm_password")}</FormLabel>
            <FormControl>
              <div className="flex">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  {...field}
                />
                <button
                  className="-m-6 cursor-pointer"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="referral_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("referral-code")}{" "}
              <span className="text-muted-foreground text-sm">
                {t("optional")}
              </span>
            </FormLabel>
            <FormControl>
              <Input id="referral_code" {...field} className="font-semibold" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SignupFormFields;
