import { useTranslations } from "next-intl";
import { z } from "zod";

export const useContactSchema = () => {
  const t = useTranslations("zod");

  return z.object({
    name: z.string().min(1, t("required")),
    email: z.string().email(t("invalid_email")), // Zod's default email message is already good, but this ensures consistency
    message: z.string().min(50, t("too_small_string", { minimum: 50 })),
  });
};

export type ContactFormValues = z.infer<ReturnType<typeof useContactSchema>>;
