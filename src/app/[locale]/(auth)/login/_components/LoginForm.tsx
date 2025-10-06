"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/authHooks/useLogin";
import { LoginFormValues, useLoginSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

import { GoogleLoginButton } from "../../_components/GoogleLoginButton";
import TermsAndConditions from "../../_components/TermsAndConditions";

import LoginFormFields from "./LoginFormFields";

export function LoginForm({
  redirect_url,
  className,
  ...props
}: React.ComponentProps<"div"> & { redirect_url?: string }) {
  const loginSchema = useLoginSchema();
  const t = useTranslations("auth.login");
  const [country, setCountry] = useState<CountryCode | undefined>("ET");

  const { error, isLoading, isSuccess, login, user } = useLogin(redirect_url);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      contact_no: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    const uuid = crypto.randomUUID();

    login({
      LoginForm: {
        username: contact_no,
        country_code: "+" + country_code,
        password: values.password,
        role: 2,
        device_type: "WEB",
        device_token: uuid,
        device_udid: uuid,
      },
    });
  }

  useEffect(() => {
    if (error) {
      toast.error(t("messages.error"), { description: error });
    }
    if (isSuccess) {
      toast.success(
        t("messages.welcome_back", {
          fullName: user?.full_name ? user?.full_name : "",
        }),
      );
    }
  }, [error, isSuccess, user, t]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-6">
              <CustomLink href="/">
                <Logo className="h-9 w-24" />
              </CustomLink>
              <h1 className="text-center text-lg font-bold md:text-xl">
                {t("welcome")}
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <LoginFormFields form={form} setCountry={setCountry} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me">{t("remember_me")}</Label>
                </div>
                <CustomLink
                  href={"/forgot-password"}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  {t("forgot_password")}
                </CustomLink>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("login_button")
                )}
              </Button>
              <div className="text-center text-sm">
                {t("no_account")}{" "}
                <CustomLink
                  href={`/signup${redirect_url ? `?redirect_url=${encodeURIComponent(redirect_url)}` : ""}`}
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  {t("sign_up_link")}
                </CustomLink>
              </div>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                {t("or_divider")}
              </span>
            </div>
            <div className="">
              <GoogleLoginButton redirect_url={redirect_url} />
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary flex flex-wrap gap-1 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("terms_guide")}
        <TermsAndConditions className="hover:text-primary cursor-pointer underline">
          {t("terms_of_service")}{" "}
        </TermsAndConditions>
        {t("and")} <a href="#">{t("privacy_policy")}</a>.
      </div>
    </div>
  );
}
