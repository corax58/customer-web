// components/FirebaseGoogleLoginButton.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useSocialSSO } from "@/hooks/authHooks/useSocialSSO";

interface GoogleLoginButtonProps {
  referral_code?: string;
  redirect_url?: string;
}
export function GoogleLoginButton({
  referral_code,
  redirect_url,
}: GoogleLoginButtonProps) {
  const { error, isLoading, isSuccess, login, user } = useSocialSSO({
    providerName: "google",
    referral_code,
    redirect_url,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error", { description: error });
    }
    if (isSuccess) {
      toast.success(`Welcome back ${user?.full_name}`);
    }
  }, [error, isSuccess, user]);

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={login}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Image
          src={"/assets/images/brand-icons/google.svg"}
          alt="google icon"
          width={20}
          height={20}
        />
      )}
    </Button>
  );
}
