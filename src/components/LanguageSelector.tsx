"use client";

import { useState, useTransition } from "react";
import { useParams } from "next/navigation";

import { Languages, Loader2 } from "lucide-react";
import { Locale, useLocale } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

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
    code: "ps-AF",
    name: "Pashto",
    nativeName: "پښتو",
  },
  {
    code: "fa-AF",
    name: "Dari",
    nativeName: "دری",
  },
];

interface LanguageSelectorProps {
  className?: string;
  size?: "sm" | "default";
}
export default function LanguageSelector({
  className,
  size = "default",
}: LanguageSelectorProps) {
  const currentLocale = useLocale();
  const router = useRouter();
  const [language] = useState<string>(currentLocale);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onLocaleChange(nextLocale: Locale) {
    if (nextLocale === params.locale) {
      return;
    }
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { scroll: false, locale: nextLocale },
      );
    });
  }

  return (
    <div className="relative">
      <Select
        value={language}
        onValueChange={(value) => {
          onLocaleChange(value);
        }}
      >
        <SelectTrigger
          size={size}
          id={"language_selector"}
          className={cn(
            "border-border w-[100px] border ps-9 shadow-none",
            className,
          )}
          title={"Language selector"}
        >
          <Languages
            className={"text-muted-foreground absolute start-2.5 h-4 w-4"}
          />
          {isPending ? (
            <Loader2 size={15} className={"animate-spin"} />
          ) : (
            <SelectValue placeholder={"Select language"} />
          )}
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className={"flex items-center justify-between"}>
                <span>{lang.code}</span>
                <span className={"text-muted-foreground ms-2"}>
                  {lang.nativeName !== lang.name && lang.nativeName}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
