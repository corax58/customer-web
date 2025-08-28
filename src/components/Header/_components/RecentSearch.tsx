import { useCallback, useEffect, useState } from "react";

import { History } from "lucide-react";
import { useTranslations } from "next-intl";

import { getRecentSearches } from "@/actions/actions";
import FadingDivider from "@/components/FadingDivider";
import { useAuth } from "@/contexts/AuthContext";
import { SearchTerm } from "@/types/restaurant.types";

interface RecentSearchProps {
  setSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  handleSearch: (searchTerm: string) => void;
  setRecentSeachesLength: (value: number) => void;
  popularSearchesLength: number;
}

const RecentSearch = ({
  handleSearch,
  setOpen,
  setSearch,
  setRecentSeachesLength,
  popularSearchesLength,
}: RecentSearchProps) => {
  const { user } = useAuth();
  const [recentSearches, setRecetSearches] = useState<SearchTerm[]>([]);
  const t = useTranslations("header.search");

  const fetchRecentSeach = useCallback(async () => {
    if (!user) return;
    const { data } = await getRecentSearches(user.id.toString());
    if (data) {
      setRecetSearches(data);
      setRecentSeachesLength(data.length);
    }
  }, [user, setRecentSeachesLength]);

  useEffect(() => {
    if (!user) return;
    fetchRecentSeach();
  }, [user, fetchRecentSeach]);
  return (
    <>
      {recentSearches.length > 0 && (
        <>
          <div className="flex flex-col p-4">
            <p className="text-muted-foreground text-sm">
              {t("recent_searches")}
            </p>
            <div>
              {recentSearches.map((searchItem) => (
                <div
                  key={searchItem.search_term}
                  onClick={() => {
                    setSearch(searchItem.search_term);
                    setOpen(false);
                    handleSearch(searchItem.search_term);
                  }}
                  className="hover:bg-secondary flex w-full cursor-pointer items-center gap-2 rounded-md p-2"
                >
                  <History size={16} />
                  {searchItem.search_term}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {popularSearchesLength > 0 && <FadingDivider />}
    </>
  );
};

export default RecentSearch;
