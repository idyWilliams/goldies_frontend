import React from "react";

interface ProductSortByProps {
  setSortType: (value: string) => void;
  sortType: string;
  setOpen: (value: boolean) => void;
}

const sortOption = [
  { label: "Recently Added", value: "recentlyAdded" },
  { label: "High To Low Price", value: "highToLow" },
  { label: "Low To High Price", value: "lowToHigh" },
  { label: "Status: Available", value: "available" },
];
export default function ProductSortBy({
  setSortType,
  sortType,
  setOpen,
}: ProductSortByProps) {
  return (
    <div className="absolute right-0 top-full z-40 w-[180px] rounded-md bg-black p-2 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      {sortOption.map((option: any, index: number) => (
        <span
          key={index}
          className={`mb-2 inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[3px] p-1 px-2 text-sm text-goldie-300 ${sortType === option.value ? "bg-[#E4D064] bg-opacity-20" : "bg-black"}`}
          onClick={() => {
            setSortType(option.value);
            setOpen(false);
          }}
        >
          {option.label}
        </span>
      ))}
    </div>
  );
}
