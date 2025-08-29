import React from "react";
import { Metadata } from "next";

import { ArrowLeft } from "lucide-react";

import CustomLink from "@/components/CustomLink";
import { Icon } from "@/components/Icon";

import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Your Password?",
};

const ForgotPasswordPage = () => {
  return (
    <div className="bg-background relative flex w-fit justify-center rounded-xl max-md:h-dvh max-md:rounded-none">
      <CustomLink href={"/login"}>
        <Icon
          as={ArrowLeft}
          className="text-primary absolute m-5"
          isDirectional
        />
      </CustomLink>

      <div className="flex h-full w-full items-center justify-center p-10">
        <ForgotPasswordForm className="max-w-sm" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
