import { Metadata } from "next";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import TitleBanner from "../_components/TitleBanner";

import ContactForm from "./_components/ContactForm";
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question or need help with your order? Contact the Time-Delivery support team. We're here to assist you.",
};

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    nextIntlKey: "phone",
    value: "+1 234 567 8900",
  },
  {
    icon: Mail,
    title: "Email",
    nextIntlKey: "email",
    value: "support@time.com",
  },
  {
    icon: MapPin,
    title: "Location",
    nextIntlKey: "location",
    value: "123 Food Street, City",
  },
];
const ContactUsPage = () => {
  const t = useTranslations("contact_us");
  return (
    <div>
      <TitleBanner title={t("header.title")} />
      <div className="content-container flex w-full justify-center gap-10 py-20 max-lg:flex-col">
        <div className="flex h-full w-full flex-col justify-between gap-8 lg:w-1/3">
          {contactDetails.map((contact, index) => (
            <div
              key={index}
              className="bg-secondary flex h-full min-h-48 w-full flex-col items-center justify-center border"
            >
              <div className="group relative mb-6 size-16">
                <div className="bg-primary/50 absolute top-0 size-16 -translate-x-3 -translate-y-3 rounded-full transition-all group-hover:translate-0"></div>
                <div className="bg-primary/50 absolute top-0 size-16 translate-x-3 translate-y-3 rounded-full transition-all group-hover:translate-0"></div>
                <div className="bg-primary absolute z-10 flex size-16 items-center justify-center rounded-full">
                  <contact.icon className="text-white" />
                </div>
              </div>
              <p className="text-lg font-bold">
                {t(`contact_details.${contact.nextIntlKey}.name`)}
              </p>
              <p className="text-muted-foreground">
                {t(`contact_details.${contact.nextIntlKey}.value`)}
              </p>
            </div>
          ))}
        </div>

        <ContactForm className="w-full lg:w-2/3" />
      </div>
    </div>
  );
};

export default ContactUsPage;
