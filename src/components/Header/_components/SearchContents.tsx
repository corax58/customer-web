"use client";
import { RefObject, useState } from "react";

import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import PopularSearch from "./PopularSearch";
import RecentSearch from "./RecentSearch";

interface SearchContentsProps {
  inputRef: RefObject<HTMLDivElement | null>;
  setSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  handleSearch: (searchTerm: string) => void;
}
const SearchContents = ({
  handleSearch,
  inputRef,
  setOpen,
  setSearch,
}: SearchContentsProps) => {
  const [recentSearchesLength, setRecentSearchesLength] = useState(0);
  const [popularSearchesLength, setPopularSearchesLength] = useState(0);

  return (
    <PopoverContent
      className={cn(
        "w-full p-0",
        recentSearchesLength === 0 && popularSearchesLength === 0 && "hidden",
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
      style={{
        width: inputRef !== null ? inputRef.current?.clientWidth : 0,
      }}
    >
      <RecentSearch
        handleSearch={handleSearch}
        setOpen={setOpen}
        setSearch={setSearch}
        popularSearchesLength={popularSearchesLength}
        setRecentSeachesLength={setRecentSearchesLength}
      />
      <PopularSearch
        handleSearch={handleSearch}
        setOpen={setOpen}
        setSearch={setSearch}
        setPopularSearchesLength={setPopularSearchesLength}
      />
    </PopoverContent>
  );
};

export default SearchContents;
