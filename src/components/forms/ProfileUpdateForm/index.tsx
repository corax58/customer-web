"use client";
import { useEffect, useState } from "react";
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

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/authHooks/useUpdateProfile";
import { profileUpdateSchema } from "@/lib/schemas/auth.schema";
import { cn, formatYYYYMMDD } from "@/lib/utils";

import ProfileUpdateFormFields from "./ProfileUpdateFormFields";

interface ProfileUpdateFormProps {
  className?: string;
  onSuccess: () => void;
}
const ProfileUpdateForm = ({
  onSuccess,
  className,
}: ProfileUpdateFormProps) => {
  const t = useTranslations("components.profile_update_form");
  const { user } = useAuth();
  const [country, setCountry] = useState<CountryCode | undefined>("ET");

  const { error, isLoading, updateProfile, isSuccess } = useUpdateProfile();

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      contact_no: user ? user.country_code + user.contact_no : "",
      gender: user ? user.gender.toString() : "",
      dob: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof profileUpdateSchema>) {
    const phoneNumberObj = parsePhoneNumberFromString(values.contact_no);

    const contact_no = phoneNumberObj?.nationalNumber || "";
    const country_code = country ? getCountryCallingCode(country) : "";

    updateProfile({
      User: {
        first_name: values.first_name,
        last_name: values.last_name,
        country_code: "+" + country_code,
        contact_no: contact_no,
        date_of_birth: formatYYYYMMDD(values.dob),
        gender: values.gender,
      },
    });
  }

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
    if (isSuccess) {
      toast.success("Updated profile");
      onSuccess();
    }
  }, [error, onSuccess, isSuccess]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <ProfileUpdateFormFields form={form} setCountry={setCountry} />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  t("save_button")
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
