import { Metadata } from "next";

import { LoginForm } from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description:
    "Sign in to your Time-Delivery account to reorder your favorite meals, track your delivery, and manage your profile.",
};

interface LoginPageProps {
  searchParams: Promise<{ redirect_url: string }>;
}
const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirect_url } = await searchParams;
  return (
    <div className="bg-background flex w-fit justify-center rounded-xl p-10 max-sm:min-h-dvh max-sm:w-full max-sm:rounded-none">
      <LoginForm className="max-w-sm" redirect_url={redirect_url} />
    </div>
  );
};

export default LoginPage;
