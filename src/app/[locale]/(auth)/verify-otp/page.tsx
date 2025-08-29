import { Metadata } from "next";

import { ArrowLeft } from "lucide-react";

import CustomLink from "@/components/CustomLink";
import { Icon } from "@/components/Icon";

import OTPForm from "./_components/OTPForm";

export const metadata: Metadata = {
  title: "Verify Your Account | Time delivery",
  description:
    "Enter the one-time password (OTP) sent to your device to verify your account and complete your registration or login.",
};

const VerifyOTPPage = () => {
  return (
    <div className="bg-background relative flex w-fit justify-center rounded-xl max-md:h-dvh max-md:rounded-none">
      <CustomLink href={"/signup"}>
        <Icon
          as={ArrowLeft}
          className="text-primary absolute m-5"
          isDirectional
        />
      </CustomLink>

      <div className="flex h-full w-full items-center justify-center p-10">
        <OTPForm className="max-w-sm" />
      </div>
    </div>
  );
};

export default VerifyOTPPage;
