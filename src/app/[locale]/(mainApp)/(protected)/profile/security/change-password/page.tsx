"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { changePassword } from "@/actions/profile.actions";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordFormValues,
  useChangePasswordSchema,
} from "@/lib/schemas/profile.schema";

const ChangePasswordPage = () => {
  const changePasswordSchema = useChangePasswordSchema();
  const t = useTranslations("profile.security.change_password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: "", confirm_password: "" },
  });

  async function onSubmit(values: ChangePasswordFormValues) {
    setIsLoading(true);
    const result = await changePassword({ User: values });
    if (result.error) {
      toast.error(t("error"), { description: result.error });
    }
    if (result.success) {
      toast.success(t("success"));
    }
    setIsLoading(false);
  }
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-5">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div>
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="ml-10 max-w-xs space-y-8"
        >
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
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              t("change_password")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
