"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

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
  DeleteAccountFormValues,
  useDeleteAccountSchema,
} from "@/lib/schemas/profile.schema";

const DeleteAccountPage = () => {
  const deleteAccountSchema = useDeleteAccountSchema();
  const t = useTranslations("profile.security.delete-account");
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: DeleteAccountFormValues) {
    toast("data", {
      description: (
        <code>
          <p>Password: {values.password}</p>
        </code>
      ),
    });
  }
  return (
    <div className="w-full space-y-5 px-1 py-5 md:px-5">
      <div className="flex gap-2">
        <BackButton>
          <ArrowLeft />
        </BackButton>
        <div>
          <h2 className="text-3xl font-bold text-red-500">{t("title")}</h2>
          <p className="text-muted-foreground mt-2 mb-2">{t("description")}</p>
          <ul className="text-muted-foreground mb-4 ml-4 space-y-1 text-sm">
            <li>{t("list-item-1")}</li>
            <li>{t("list-item-2")}</li>
            <li>{t("list-item-3")}</li>
            <li>{t("list-item-4")}</li>
          </ul>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-5 pl-14"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password-label")}</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
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

          <Button
            type="submit"
            variant={"outline"}
            className="w-full border-red-500 bg-transparent text-red-500 dark:border-red-500"
          >
            {t("delete-account-button")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DeleteAccountPage;
