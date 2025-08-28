// lib/schemas/auth.schema.ts
import { isValidPhoneNumber } from "react-phone-number-input";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useLoginSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    contact_no: z
      .string()
      .nonempty(t("required"))
      .refine(isValidPhoneNumber, t("invalid_phone")),
    password: z.string().min(8, t("password_length_min", { minimum: 8 })),
  });
};

export const useSignupSchema = () => {
  const t = useTranslations("zod");
  return z
    .object({
      first_name: z.string().min(1, t("first_name_required")),
      last_name: z.string().min(1, t("last_name_required")),
      contact_no: z
        .string()
        .nonempty(t("required"))
        .refine(isValidPhoneNumber, t("invalid_phone")),
      password: z
        .string()
        .min(8, t("password_length_min", { minimum: 8 }))
        .max(64, t("password_length_max", { maximum: 64 }))
        .regex(/[a-z]/, t("password_lowercase"))
        .regex(/[A-Z]/, t("password_uppercase"))
        .regex(/[0-9]/, t("password_number"))
        .regex(/[^a-zA-Z0-9]/, t("password_special")),
      confirm_password: z.string(),
      referral_code: z
        .string()
        .max(12, t("too_big_string", { maximum: 12 }))
        .optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
      path: ["confirm_password"],
      message: t("passwords_do_not_match"),
    });
};

export const useForgotPasswordSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    contact_no: z
      .string()
      .nonempty(t("required"))
      .refine(isValidPhoneNumber, t("invalid_phone")),
  });
};

export const useOTPSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    code: z.string().min(4, t("otp_length", { length: 4 })),
  });
};

export const useProfileUpdateSchema = () => {
  const t = useTranslations("zod");
  return z.object({
    first_name: z.string().min(1, t("first_name_required")),
    last_name: z.string().min(1, t("last_name_required")),
    contact_no: z
      .string()
      .nonempty(t("required"))
      .refine(isValidPhoneNumber, t("invalid_phone")),
    gender: z.string(),
    dob: z.date({
      required_error: t("required_dob"),
    }),
  });
};
export type LoginFormValues = z.infer<ReturnType<typeof useLoginSchema>>;
export type SignupFormValues = z.infer<ReturnType<typeof useSignupSchema>>;
export type ForgotPasswordValues = z.infer<
  ReturnType<typeof useForgotPasswordSchema>
>;
export type OTPValues = z.infer<ReturnType<typeof useOTPSchema>>;
export type ProfileUpdateValues = z.infer<
  ReturnType<typeof useProfileUpdateSchema>
>;
