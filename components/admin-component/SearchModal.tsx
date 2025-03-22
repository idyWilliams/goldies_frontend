import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsSearch, BsX } from "react-icons/bs";
import { useState } from "react";
import Fuse from "fuse.js";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  fetchSuggestions: (query: string) => void;
}

export function SearchModal({
  open,
  onOpenChange,
  searchTerm,
  onSearchTermChange,
  suggestions,
  onSuggestionClick,
  onSearch,
  onKeyPress,
  fetchSuggestions,
}: SearchModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onSearchTermChange("");
      fetchSuggestions("");
      setSelectedIndex(-1);
    }
    onOpenChange(open);
  };

  const handleClear = () => {
    onSearchTermChange("");
    fetchSuggestions("");
    setSelectedIndex(-1);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<span class='font-bold'>$1</span>");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        onSuggestionClick(suggestions[selectedIndex]);
      } else {
        onSearch();
      }
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-opacity-20 text-brand-200">
          <BsSearch size={18} />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[80vw] max-w-[80vw] rounded-md">
        <DialogTitle>Search</DialogTitle>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 border-none bg-transparent text-[13px] text-brand-200 placeholder:text-brand-200 placeholder:text-opacity-50 focus:border-0 focus:outline-none focus:ring-0"
            value={searchTerm}
            onChange={(e) => {
              onSearchTermChange(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="hover:text-brand-300 text-brand-200"
            >
              <BsX size={18} />
            </button>
          )}
          <button
            onClick={onSearch}
            className="hover:text-brand-300 text-brand-200"
          >
            <BsSearch size={18} />
          </button>
        </div>
        {searchTerm.trim() && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 ${
                      selectedIndex === index ? "bg-neutral-100" : ""
                    }`}
                    onClick={() => {
                      onSuggestionClick(suggestion);
                      handleOpenChange(false);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(suggestion, searchTerm),
                    }}
                  />
                ))}
              </ul>
            ) : (
              <div className="p-2 text-center text-sm text-neutral-500">
                No results found
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
