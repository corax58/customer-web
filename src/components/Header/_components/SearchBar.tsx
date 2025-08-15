"use client";

import { FormEvent, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import SearchContents from "./SearchContents";

const SearchBar = ({ className }: React.ComponentProps<"div">) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);
  const router = useRouter();

  const inputRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", searchTerm);
      if (user) {
        params.set("id", user.id.toString());
      }
    }

    setOpen(false);
    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    setSearch("");
    params.delete("search");
    router.replace({
      pathname: "/restaurants",
      query: Object.fromEntries(params),
    });
  };
  const t = useTranslations("header");
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn("relative flex w-full items-center", className)}
            ref={inputRef}
          >
            <Search className="text-muted-foreground absolute left-3 z-10 size-5" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background dark:bg-secondary w-full rounded-lg pl-10 shadow-none"
              placeholder={t("search_placeholder")}
            />
            {search !== "" && (
              <Button
                size={"icon"}
                variant={"ghost"}
                type="button"
                className="text-muted-foreground absolute right-0 z-20 cursor-pointer"
                onClick={handleClear}
              >
                <X className="text-muted-foreground absolute right-3 z-10 size-5" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <SearchContents
          handleSearch={handleSearch}
          inputRef={inputRef}
          setOpen={setOpen}
          setSearch={setSearch}
        />
      </Popover>
    </form>
  );
};

export default SearchBar;
