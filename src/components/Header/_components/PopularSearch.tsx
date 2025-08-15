import { useCallback, useEffect, useState } from "react";

import { TrendingUp } from "lucide-react";

import { getPopularSearches } from "@/actions/actions";
import { useAuth } from "@/contexts/AuthContext";
import { SearchTerm } from "@/types/restaurant.types";

interface PopularSearches {
  setSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  handleSearch: (searchTerm: string) => void;
  setPopularSearchesLength: (value: number) => void;
}

const PopularSearch = ({
  handleSearch,
  setOpen,
  setSearch,
  setPopularSearchesLength,
}: PopularSearches) => {
  const { user } = useAuth();
  const [popularSearches, setPopularSearch] = useState<SearchTerm[]>([]);

  const fetchPopularSearch = useCallback(async () => {
    if (!user) return;
    const { data } = await getPopularSearches();
    if (data) {
      setPopularSearch(data);
      setPopularSearchesLength(data.length);
    }
  }, [user, setPopularSearchesLength]);

  useEffect(() => {
    if (!user) return;
    fetchPopularSearch();
  }, [user, fetchPopularSearch]);
  return (
    <>
      {popularSearches.length > 0 && (
        <>
          <div className="flex flex-col p-4">
            <p className="text-muted-foreground text-sm">Popular search</p>
            <div>
              {popularSearches.map((searchItem) => (
                <div
                  key={searchItem.search_term}
                  onClick={() => {
                    setSearch(searchItem.search_term);
                    setOpen(false);
                    handleSearch(searchItem.search_term);
                  }}
                  className="hover:bg-secondary flex w-full cursor-pointer items-center gap-2 rounded-md p-2"
                >
                  <TrendingUp size={16} />
                  {searchItem.search_term}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopularSearch;
