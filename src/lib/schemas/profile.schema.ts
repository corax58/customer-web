import { useTranslations } from "next-intl";
import { z } from "zod";

export const useChangePasswordSchema = () => {
  const t = useTranslations("zod");
  return z
    .object({
      password: z
        .string()
        .min(8, t("password_length_min", { minimum: 8 }))
        .max(64, t("password_length_max", { maximum: 64 }))
        .regex(/[a-z]/, t("password_lowercase"))
        .regex(/[A-Z]/, t("password_uppercase"))
        .regex(/[0-9]/, t("password_number"))
        .regex(/[^a-zA-Z0-9]/, t("password_special")),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      path: ["confirm_password"],
      message: t("passwords_do_not_match"),
    });
};

export const useDeleteAccountSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    password: z.string().min(8, t("password_length_min", { minimum: 8 })),
  });
};

export const useCancelOrderSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    reason: z
      .string()
      .min(10, t("too_small_string", { minimum: 10 }))
      .max(100, t("too_big_string", { maximum: 100 })),
  });
};

export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
export type DeleteAccountFormValues = z.infer<
  ReturnType<typeof useDeleteAccountSchema>
>;
export type CancelOrderValues = z.infer<
  ReturnType<typeof useCancelOrderSchema>
>;
