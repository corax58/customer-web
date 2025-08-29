import React, { FormEvent, useCallback, useState } from "react";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Loader2, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAutocompleteSuggestions } from "@/hooks/use-autocomplete-suggestions";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface Props {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
  className?: string;
}

export const AutocompleteCustom = ({ onPlaceSelect, className }: Props) => {
  const places = useMapsLibrary("places");

  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce(inputValue, 1000);

  // Get loading state from the hook
  const { suggestions, resetSession, isLoading } =
    useAutocompleteSuggestions(debouncedInputValue);

  const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value);
  }, []);

  const handleSuggestionClick = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!places) return;
      if (!suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["viewport", "location"],
      });

      setInputValue("");

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession();

      onPlaceSelect(place);
    },
    [places, onPlaceSelect, resetSession],
  );

  // Show loading indicator when there's input but no suggestions yet
  const showLoading = inputValue && isLoading && suggestions.length === 0;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="text-muted-foreground absolute start-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2" />
        <Input
          value={inputValue}
          onInput={(event) => handleInput(event)}
          placeholder="Search for a place"
          className="h-10 bg-white ps-10 pe-4 text-sm dark:bg-white"
        />
        {showLoading && (
          <Loader2 className="text-muted-foreground absolute end-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="bg-popover text-popover-foreground absolute start-0 end-0 top-full z-50 mt-1 max-h-60 overflow-hidden rounded-md border shadow-md">
          <ul className="max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  className="hover:bg-accent hover:text-accent-foreground border-border cursor-pointer border-b px-4 py-3 text-sm transition-colors last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.placePrediction?.text.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
