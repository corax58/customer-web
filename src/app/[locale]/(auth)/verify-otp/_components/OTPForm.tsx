"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";

import CustomLink from "@/components/CustomLink";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtp } from "@/hooks/authHooks/useVerifyOtp";
import { useRouter } from "@/i18n/navigation";
import { OTPValues, useOTPSchema } from "@/lib/schemas/auth.schema";
import { cn } from "@/lib/utils";

import ResendOtp from "./ResendOtp";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
  const oTPSchema = useOTPSchema();
  const toastTrans = useTranslations("toast");
  const t = useTranslations("auth.verification");
  const [contact_no, setContact_no] = useState("");
  const [country_code, setCountry_code] = useState("");
  const router = useRouter();
  const form = useForm<OTPValues>({
    resolver: zodResolver(oTPSchema),
    defaultValues: {
      code: "",
    },
  });
  const { error, isLoading, isSuccess, verifyOtp, user } = useVerifyOtp();

  function onSubmit(data: z.infer<typeof oTPSchema>) {
    verifyOtp({
      User: {
        otp: data.code,
        contact_no: contact_no,
        country_code: country_code,
      },
      device_type: "WEB",
    });
  }

  useEffect(() => {
    if (error) {
      toast.error(toastTrans("error"), { description: error });
    }
    if (isSuccess) {
      toast.success(`${toastTrans("welcome")} ${user?.full_name}`);
    }
  }, [error, isSuccess, user, toastTrans]);

  useEffect(() => {
    const unVerifiedUserItem = localStorage.getItem("unVerifiedUser");

    if (!unVerifiedUserItem) {
      router.push("/signup");
    } else {
      const unVerifiedUserData: { country_code: string; contact_no: string } =
        JSON.parse(unVerifiedUserItem);

      setContact_no(unVerifiedUserData.contact_no);
      setCountry_code(unVerifiedUserData.country_code);
    }
  }, [router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <CustomLink href="/" className="mb-4">
                <Logo className="h-9 w-24" />
              </CustomLink>
              <h1 className="text-xl font-bold">{t("title")}</h1>

              <div className="text-muted-foreground text-center text-sm">
                {t("enter_code_prompt")}{" "}
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={1} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={2} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("verify_button")
                )}
              </Button>
              <div className="text-muted-foreground flex items-center text-sm">
                {t("no_code_received")}
                <ResendOtp
                  contact_no={contact_no}
                  country_code={country_code}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default OTPForm;
