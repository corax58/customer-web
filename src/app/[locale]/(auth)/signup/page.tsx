import React from "react";
import { Metadata } from "next";

import SignupForm from "./_components/SignupForm";

export const metadata: Metadata = {
  title: "Create Your Time-Delivery Account | Time delivery",
  description:
    "Sign up for a new account to start ordering food from your favorite local restaurants. It's quick and easy.",
};

interface SignupPageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}
const SignupPage = async ({ searchParams }: SignupPageProps) => {
  const { redirect_url } = await searchParams;
  return (
    <div className="bg-background flex w-fit justify-center rounded-xl p-10 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none">
      <SignupForm className="max-w-sm" redirect_url={redirect_url} />
    </div>
  );
};

export default SignupPage;
