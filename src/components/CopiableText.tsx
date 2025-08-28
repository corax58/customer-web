"use client";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface CopiableTextProps {
  text: string;
  title: string;
  className?: string;
}
const CopiableText = ({ text, title, className }: CopiableTextProps) => {
  const t = useTranslations("components.copiable_text");
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(t("copy_success", { title }));
      })
      .catch(() => {
        toast.error(t("copy_failed"));
      });
  };
  return (
    <button
      className={cn(
        "text-secondary-foreground flex items-center gap-2 px-2 py-1 font-medium",
        className,
      )}
      onClick={handleCopy}
    >
      {text}
      <Copy size={14} />
    </button>
  );
};

export default CopiableText;
