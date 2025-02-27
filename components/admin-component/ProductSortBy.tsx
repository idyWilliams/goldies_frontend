import React from "react";

interface ProductSortByProps {
  sortBy: string;
  order: string;
  onSortChange: (sortBy: string, order: string) => void;
  setOpen: (isOpen: boolean) => void;
}

export default function ProductSortBy({
  onSortChange,
  order,
  sortBy,
  setOpen,
}: ProductSortByProps) {
  const handleSortChange = (sortBy: string, order: string) => {
    onSortChange(sortBy, order);
    setOpen(false); // Close the dropdown after selecting an option
  };

  // Function to check if a sorting option is active
  const isActive = (optionSortBy: string, optionOrder: string) => {
    return sortBy === optionSortBy && order === optionOrder;
  };

  return (
    <div className="absolute right-0 top-full z-40 w-[180px] rounded-md bg-black p-2 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      <ul className="py-2">
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("default", "asc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("default", "asc")}
        >
          Default
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("name", "asc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("name", "asc")}
        >
          A-Z
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("name", "desc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("name", "desc")}
        >
          Z-A
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("createdAt", "desc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("createdAt", "desc")}
        >
          Newest
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("createdAt", "asc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("createdAt", "asc")}
        >
          Oldest
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("maxPrice", "asc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("maxPrice", "asc")}
        >
          Price: High to Low
        </li>
        <li
          className={`cursor-pointer px-4 py-2 text-goldie-300 hover:bg-[#E4D064] hover:bg-opacity-20 ${
            isActive("maxPrice", "desc") ? "bg-[#E4D064] bg-opacity-20" : ""
          }`}
          onClick={() => handleSortChange("maxPrice", "desc")}
        >
          Price: Low to High
        </li>
      </ul>
    </div>
  );
}
