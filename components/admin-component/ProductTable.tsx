"use client";

import {
  Column,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Pagination from "../custom-filter/Pagination";

export default function ProductTable({
  columns,
  Tdata,
  filteredTabs,
  statusType,
}: {
  columns: any;
  Tdata: any;
  filteredTabs?: any;
  statusType: string;
}) {
  const [selectedTabs, setSelectedTabs] = useState(filteredTabs[0]);
  const [chosenTab, setChosenTab] = useState(filteredTabs[0]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
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
              item?.status.toLowerCase() === chosenTab.toLowerCase(),
          ),
        );
      }
    }
  }, [chosenTab, filteredTabs, Tdata, statusType]);

  useEffect(() => {
    const filteredProducts = Tdata?.filter(
      (item: any) =>
        item?.productName.toLowerCase().includes(searchValue) ||
        item?.id.toString().toLowerCase().includes(searchValue),
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
      <div className="my-6 flex items-center justify-between gap-2">
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
      </div>

      <table className="w-full bg-[#fff]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="bg-black p-4 text-left capitalize text-goldie-300"
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPrev={undefined}
        onNext={undefined}
        onPaginateClick={undefined}
        currentPageIndex={currentPageIndex}
        itemsPerPage={0}
        arr={TData}
      />
    </div>
  );
}
