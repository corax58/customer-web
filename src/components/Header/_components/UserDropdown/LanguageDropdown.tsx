"use client";
import { useState, useTransition } from "react";
import { useParams } from "next/navigation";

import { Check, ChevronDown, Languages, Loader } from "lucide-react";
import { Locale, useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "ps",
    name: "Pashto",
    nativeName: "پښتو",
  },
  {
    code: "prs",
    name: "Dari",
    nativeName: "دری",
  },
];
const getLanguage = (code: string) => {
  return languages.find((item) => item.code === code);
};
const LanguageDropDown = () => {
  const currentLocale = useLocale();
  const t = useTranslations("header");
  const router = useRouter();
  const [selectedLanguage, setSeletectedLanguage] =
    useState<string>(currentLocale);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const currentLanguage = getLanguage(selectedLanguage);

  function onLocaleChange(nextLocale: Locale) {
    if (nextLocale === params.locale) {
      return;
    }
    setSeletectedLanguage(nextLocale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <div className="px-2 py-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-3 px-2 py-3">
            <Languages className="h-5 w-5" />
            <div className="flex-1">
              <span>{t("language")}</span>
            </div>
            {isPending ? (
              <Loader className="mr-2 h-10 w-32 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm">{currentLanguage?.name}</span>
                <span className="text-muted-foreground text-sm">
                  {currentLanguage?.nativeName}
                </span>
                <ChevronDown className="h-4 w-4" />
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" side="bottom">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className="flex cursor-pointer items-center gap-3 px-3 py-2"
              onClick={() => onLocaleChange(language.code)}
            >
              <div className="flex flex-1 flex-col">
                <span className="">{language.name}</span>
                <span className="text-muted-foreground flex-1 text-sm">
                  {language.nativeName}
                </span>
              </div>
              {selectedLanguage === language.code && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageDropDown;
