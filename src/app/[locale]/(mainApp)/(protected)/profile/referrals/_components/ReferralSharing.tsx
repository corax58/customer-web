"use client";

import { useState } from "react";

import { Check, Copy, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReferralSharingProps {
  referralCode: string;
}

export function ReferralSharing({ referralCode }: ReferralSharingProps) {
  const t = useTranslations("profile.referrals.referral_sharing");
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL!}/signup?referral_code=${referralCode}`;

  const copyToClipboard = async (text: string, type: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type == "code") {
        setCodeCopied(true);
      } else {
        setLinkCopied(true);
      }
      if (type == "code") {
        toast(t("copied"), {
          description: t("code_copied"),
        });
      } else {
        toast(t("copied"), {
          description: t("link_copied"),
        });
      }
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast(t("error.failed_copy"));
    }
  };

  if (referralCode)
    return (
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")} </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-secondary-foreground mb-2 block text-sm font-medium">
              {t("referral_code")}
            </label>
            <div className="flex items-center gap-2">
              <div className="bg-secondary flex-1 rounded-lg border px-4 py-3 font-mono text-lg">
                {referralCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralCode, "code")}
                className="bg-secondary"
              >
                {codeCopied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-secondary-foreground mb-2 block text-sm font-medium">
              {t("referral_link")}
            </label>
            <div className="flex items-center gap-2">
              <div className="bg-secondary flex-1 rounded-lg border px-4 py-3 text-sm break-all">
                {referralLink}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(referralLink, "link")}
                className="bg-secondary"
              >
                {linkCopied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}
