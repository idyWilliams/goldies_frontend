import React from "react";

const sortOption = [
  { label: "Recently Added", value: "recentlyAdded" },
  { label: "High To Low Price", value: "highToLow" },
  { label: "Low To High Price", value: "lowToHigh" },
  { label: "Status: Available", value: "available" },
];
export default function ProductSortBy({ setSortType, sortType }: any) {
  return (
    <div className="absolute right-5 top-[180px] z-40 w-[180px] rounded-md bg-black p-2 pb-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      {sortOption.map((option: any, index: number) => (
        <span
          key={index}
          className={`mb-2 inline-flex w-full items-center justify-center whitespace-nowrap rounded-[3px] p-1 px-2 text-main ${sortType === option.value ? "bg-[#E4D064] bg-opacity-20" : "bg-black"}`}
          onClick={() => setSortType(option.value)}
        >
          {option.label}
        </span>
      ))}
    </div>
  );
}
