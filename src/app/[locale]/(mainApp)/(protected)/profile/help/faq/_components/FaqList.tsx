import React from "react";

import { X } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getFaqList } from "@/actions/profile.actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FaqList = async () => {
  const { data: faqList, error } = await getFaqList();
  const t = await getTranslations("profile.help.faq");
  if (error)
    return (
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <X className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">
            {t("error.failed_fetch")}
          </h3>
        </CardContent>
      </Card>
    );
  if (faqList)
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full pl-12"
        defaultValue="item-1"
      >
        {faqList.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id.toString()}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
};

export default FaqList;
