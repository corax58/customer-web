import React from "react";

import { useTranslations } from "next-intl";

import { Textarea } from "@/components/ui/textarea";

interface InstructionProps {
  additionalInstructions: string;
  setAdditionalInstructions: React.Dispatch<React.SetStateAction<string>>;
}
const Instructions = ({
  additionalInstructions,
  setAdditionalInstructions,
}: InstructionProps) => {
  const t = useTranslations("components.checkout_sheet");
  return (
    <div className="">
      <h3 className="mb-4 text-sm font-medium">{t("instruction")} </h3>
      <Textarea
        value={additionalInstructions}
        className="min-h-[80px] w-full resize-none rounded-2xl"
        onChange={(e) => setAdditionalInstructions(e.target.value)}
      />
    </div>
  );
};

export default Instructions;
