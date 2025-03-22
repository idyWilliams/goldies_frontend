import React from "react";

interface SortByProps {
  sortBy: string;
  order: string;
  onSortChange: (sortBy: string, order: string) => void;
  setOpen: (isOpen: boolean) => void;
}

const UserSortBy = ({ onSortChange, order, sortBy, setOpen }: SortByProps) => {
  const handleSortChange = (sortBy: string, order: string) => {
    onSortChange(sortBy, order);
    setOpen(false); // Close the dropdown after selecting an option
  };

  // Function to check if a sorting option is active
  const isActive = (optionSortBy: string, optionOrder: string) => {
    return sortBy === optionSortBy && order === optionOrder;
  };

  return (
    <div className="absolute right-0 top-full z-40 w-[180px] rounded-md bg-brand-100 p-2 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      <ul className="space-y-1 py-2">
        <li
          className={`cursor-pointer px-4 py-2  hover:bg-brand-200 hover:bg-opacity-20  ${
            isActive("", "")
              ? "bg-brand-200 bg-opacity-20 text-brand-100"
              : "text-brand-200 hover:text-brand-100"
          }`}
          onClick={() => handleSortChange("", "")}
        >
          Default
        </li>
        <li
          className={`cursor-pointer px-4 py-2  hover:bg-brand-200 hover:bg-opacity-20 ${
            isActive("name", "asc")
              ? "bg-brand-200 bg-opacity-20 text-brand-100"
              : "text-brand-200 hover:text-brand-100"
          }`}
          onClick={() => handleSortChange("name", "asc")}
        >
          Name: A-Z
        </li>
        <li
          className={`cursor-pointer px-4 py-2  hover:bg-brand-200 hover:bg-opacity-20 ${
            isActive("name", "desc")
              ? "bg-brand-200 bg-opacity-20 text-brand-100"
              : "text-brand-200 hover:text-brand-100"
          }`}
          onClick={() => handleSortChange("name", "desc")}
        >
          Name: Z-A
        </li>
        <li
          className={`cursor-pointer px-4 py-2  hover:bg-brand-200 hover:bg-opacity-20 ${
            isActive("date", "desc")
              ? "bg-brand-200 bg-opacity-20 text-brand-100"
              : "text-brand-200 hover:text-brand-100"
          }`}
          onClick={() => handleSortChange("date", "desc")}
        >
          Newest
        </li>
        <li
          className={`cursor-pointer px-4 py-2  hover:bg-brand-200 hover:bg-opacity-20 ${
            isActive("date", "asc")
              ? "bg-brand-200 bg-opacity-20 text-brand-100"
              : "text-brand-200 hover:text-brand-100"
          }`}
          onClick={() => handleSortChange("date", "asc")}
        >
          Oldest
        </li>
      </ul>
    </div>
  );
};

export default UserSortBy;
