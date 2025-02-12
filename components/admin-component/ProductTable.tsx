"use client";
import { cn } from "@/helper/cn";
import { IOrder } from "@/interfaces/order.interface";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Tooltip } from "react-tooltip";

interface TableProps {
  columns: any;
  Tdata: any[];
  filteredTabs?: string[];
  statusType?: "order" | "product";
  showSearchBar?: boolean;
}

export default function ProductTable({
  columns,
  Tdata,
  filteredTabs = [],
  statusType,
  showSearchBar = true,
}: TableProps) {
  const [selectedTab, setSelectedTab] = useState(filteredTabs[0] || "All");
  const [filteredData, setFilteredData] = useState(Tdata);
  const [searchValue, setSearchValue] = useState("");

  const data = useMemo(() => filteredData, [filteredData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!selectedTab || selectedTab === "All") {
      setFilteredData(Tdata);
    } else {
      setFilteredData(
        Tdata.filter((item) => {
          if (statusType === "order") {
            return (
              (item as IOrder).orderStatus?.toLowerCase() ===
              selectedTab.toLowerCase()
            );
          }
          return item?.status?.toLowerCase() === selectedTab.toLowerCase();
        }),
      );
    }
  }, [selectedTab, Tdata, statusType]);

  useEffect(() => {
    if (!searchValue) {
      setFilteredData(Tdata);
      return;
    }
    const lowerSearch = searchValue.toLowerCase();
    setFilteredData(
      Tdata.filter(
        (item) =>
          item?.productName?.toLowerCase()?.includes(lowerSearch) ||
          item?.name?.toLowerCase()?.includes(lowerSearch) ||
          item?.id?.toString()?.toLowerCase()?.includes(lowerSearch),
      ),
    );
  }, [searchValue, Tdata]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  // console.log(searchValue, "searchValue");
  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between gap-2",
          filteredTabs?.length >= 1 && "mb-6",
        )}
      >
        <div className="flex items-center gap-1">
          {filteredTabs &&
            filteredTabs.map((tab, index) => (
              <button
                key={index}
                className={`w-fit rounded-sm border px-2 ${selectedTab === tab ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
                onClick={() => {
                  setSelectedTab(tab);
                }}
              >
                {tab}
              </button>
            ))}
        </div>
        {showSearchBar && (
          <label htmlFor="search" className="relative block w-[500px] ">
            <input
              value={searchValue}
              type="text"
              name="search"
              autoComplete="search"
              placeholder="search for product name, product ID..."
              className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs focus:border-black focus:ring-black"
              onChange={(e) => handleChange(e)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <CiSearch />
            </span>
          </label>
        )}
      </div>

      <table className="w-full bg-[#fff]">
        <thead>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-black">
              {headerGroup?.headers?.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left capitalize text-goldie-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.map((row) => {
            return (
              <tr key={row.id} className="odd:bg-goldie-300 odd:bg-opacity-20">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
