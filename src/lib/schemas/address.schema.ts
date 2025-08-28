import { isValidPhoneNumber } from "react-phone-number-input";

import { useTranslations } from "next-intl";
import { z } from "zod";

export const useAddressSchema = () => {
  const t = useTranslations("zod");

  const addressSchema = z.object({
    addressType: z.enum(["1", "2", "3", "4"], {
      required_error: t("required_select"),
    }),
    title: z
      .string()
      .min(3, t("too_small_string", { minimum: 3 }))
      .max(50, t("too_big_string", { maximum: 50 })),
    address: z.string().min(10, t("detailed_address_required")),
    latitude: z.string({ required_error: t("required_location") }),
    longitude: z.string({ required_error: t("required_location") }),
    floor: z.string().optional(),
    landmark: z.string().optional(),
    pinCode: z.string().optional(),
    contact_no: z.string().refine(isValidPhoneNumber, t("invalid_phone")),
  });

  return addressSchema;
};

export type AddressFormValues = z.infer<ReturnType<typeof useAddressSchema>>;
