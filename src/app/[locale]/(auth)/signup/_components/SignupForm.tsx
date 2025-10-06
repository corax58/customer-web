"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/hooks/authHooks/useSignup";
import { SignupFormValues, useSignupSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

import { GoogleLoginButton } from "../../_components/GoogleLoginButton";
import TermsAndConditions from "../../_components/TermsAndConditions";

import SignupFormFields from "./SignupFormFields";

const SignupForm = ({
  redirect_url,
  className,
  ...props
}: React.ComponentProps<"div"> & { redirect_url?: string }) => {
  const signupSchema = useSignupSchema();
  const t = useTranslations("auth.signup");

  const [country, setCountry] = useState<CountryCode | undefined>("ET");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { error, isLoading, signup, Otp } = useSignup();

  const searchParams = useSearchParams();
  const currentReferralCode = searchParams.get("referral_code") || undefined;

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      contact_no: "",
      password: "",
      confirm_password: "",
      referral_code: currentReferralCode,
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(
      form.getValues("contact_no"),
    );
    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";
    const uuid = crypto.randomUUID();

    const data = {
      User: {
        contact_no: contact_no,
        country_code: "+" + country_code,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        role_id: "2",
        device_type: "WEB",
        device_token: uuid,
        device_udid: uuid,
      },
      SIgnupForm: {
        device_name: "Chrome on macOS",
        device_type: "WEB",
        device_token: uuid,
        device_udid: uuid,
      },
      referral_code: values.referral_code,
      confirm_password: values.confirm_password,
    };

    signup(data);
  }

  useEffect(() => {
    if (error) {
      toast.error(t("messages.error"), { description: error });
    }
    if (Otp) {
      toast.message(t("messages.here_otp"), { description: Otp });
    }
  }, [error, Otp, t]);

  useEffect(() => {
    if (redirect_url) {
      sessionStorage.setItem("redirect_url", redirect_url);
    }
  }, [redirect_url]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2">
              <CustomLink href="/" className="mb-4">
                <Logo className="h-9 w-24" />
              </CustomLink>
              <h1 className="text-xl font-bold">{t("title")}</h1>
              <h3 className="text-muted-foreground font-bold">
                {t("create_account")}
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              <SignupFormFields form={form} setCountry={setCountry} />
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="agreeTerms"
                  checked={agreeToTerms}
                  disabled={isLoading}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
                />
                <div className="flex gap-2">
                  <Label htmlFor="agreeTerms">{t("agree")}</Label>
                  <TermsAndConditions className="hover:text-primary underline">
                    {t("terms_of_service")}
                  </TermsAndConditions>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!agreeToTerms || isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("signup_button")
                )}
              </Button>
              <div className="text-center text-sm">
                {t("already_have_account")}{" "}
                <CustomLink
                  href="/login"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  {t("login_link")}
                </CustomLink>
              </div>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                {t("or_divider")}
              </span>
            </div>
            <div className="">
              <GoogleLoginButton
                referral_code={form.getValues("referral_code")}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
