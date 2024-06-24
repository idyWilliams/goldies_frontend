"use client";
import { cn } from "@/helper/cn";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Tooltip } from "react-tooltip";

export default function ProductTable({
  columns,
  Tdata,
  filteredTabs,
  statusType,
  showSearchBar = true,
}: {
  columns: any;
  Tdata: any;
  filteredTabs?: any;
  statusType?: string;
  showSearchBar?: boolean;
}) {
  const [selectedTabs, setSelectedTabs] = useState(filteredTabs[0]);
  const [chosenTab, setChosenTab] = useState(filteredTabs[0]);
  const [TData, setTData] = useState(Tdata);
  const data = useMemo(() => TData, [TData]);
  const [searchValue, setSearchValue] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    if (chosenTab === filteredTabs[0]) {
      setTData(Tdata);
    } else {
      if (statusType === "order" || statusType === "product") {
        setTData(
          Tdata?.filter(
            (item: any) =>
              item?.status.toLowerCase() === chosenTab?.toLowerCase(),
          ),
        );
      }
    }
  }, [chosenTab, filteredTabs, Tdata, statusType]);

  useEffect(() => {
    const filteredProducts = Tdata?.filter(
      (item: any) =>
        item?.productName?.toLowerCase()?.includes(searchValue) ||
        item?.id?.toString()?.toLowerCase()?.includes(searchValue),
    );
    setTData(filteredProducts);
  }, [searchValue, Tdata]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log(value, "value");
  };
  console.log(searchValue, "searchValue");
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
            filteredTabs.map((tabs: string, index: number) => (
              <button
                key={index}
                className={`w-fit rounded-sm border px-2 ${selectedTabs === tabs ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
                onClick={() => {
                  setSelectedTabs(tabs);
                  setChosenTab(tabs);
                }}
              >
                {tabs}
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
          {table.getRowModel().rows?.map((row) => (
            <tr key={row.id} className="odd:bg-goldie-300 odd:bg-opacity-20">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
