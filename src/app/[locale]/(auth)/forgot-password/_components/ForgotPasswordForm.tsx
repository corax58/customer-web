"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import { forgotPassword } from "@/actions/actions";
import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { PhoneInput } from "@/components/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "@/i18n/navigation";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth.forgot_password");
  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      contact_no: "",
    },
  });

  async function onSubmit() {
    setIsLoading(true);
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    const result = await forgotPassword({
      User: { contact_no, country_code: "+" + country_code },
    });
    if (result.detail && result.message) {
      toast.success(result.message, { description: result.detail.otp });
      const unVerifiedUser = {
        country_code: result.detail.country_code,
        contact_no: result.detail.contact_no,
      };

      localStorage.setItem("unVerifiedUser", JSON.stringify(unVerifiedUser));
      localStorage.setItem(
        "forgotPassword",
        JSON.stringify({ forgot_password: true }),
      );
      setIsLoading(false);
      router.push("/verify-otp");
    }
    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
    setIsLoading(false);
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <CustomLink href="/" className="mb-4">
                <Logo />
              </CustomLink>
              <h1 className="text-xl font-bold">{t("title")}</h1>
              <div className="text-muted-foreground text-center text-sm">
                {t("instruction")}
              </div>
            </div>
            <div className="flex flex-col gap-6">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("send_button")
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
