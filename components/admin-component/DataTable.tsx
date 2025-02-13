"use client";
import { cn } from "@/helper/cn";
import moment from "moment";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AdminPagination from "./AdminPagination";

interface DataTableProps<T> {
  columns: any;
  data: T[];
  filteredTabs?: string[];
  statusKey?: keyof T; // Key used for filtering (e.g., 'orderStatus' or 'status')
  searchKeys?: (keyof T)[]; // Keys used for search (e.g., ['productName', 'id'])
  showSearchBar?: boolean;

  // Pagination Props
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function DataTable<T>({
  columns,
  data,
  filteredTabs = [],
  statusKey,
  searchKeys = [],
  showSearchBar = true,
  totalPages,
  currentPage,
  setCurrentPage,
}: DataTableProps<T>) {
  const [selectedTab, setSelectedTab] = useState(filteredTabs[0] || "All");
  const [tableData, setTableData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300); // Adjust debounce time as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const table = useReactTable({
    data: useMemo(() => tableData, [tableData]),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Filter & Search Logic
  useEffect(() => {
    let filteredData = data;

    if (selectedTab && selectedTab !== "All") {
      filteredData = data.filter((item) =>
        statusKey
          ? (item[statusKey] as string)?.toLowerCase() ===
            selectedTab.toLowerCase()
          : true,
      );
    }

    if (debouncedSearch) {
      filteredData = filteredData.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
        }),
      );
    }

    setTableData(filteredData);
  }, [selectedTab, debouncedSearch, data, searchKeys, statusKey]);

  return (
    <div>
      {/* Filter Tabs & Search Bar */}
      <div
        className={cn(
          "flex items-center justify-between gap-2 mb-6 p-[2px]",
          filteredTabs?.length >= 1 && "mb-6",
        )}
      >
        <div className="flex items-center gap-1">
          {filteredTabs?.map((tab, index) => (
            <button
              key={index}
              className={`w-fit rounded-sm border px-2 ${
                selectedTab === tab
                  ? "bg-black text-goldie-300"
                  : "border-neutral-200 bg-white"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {showSearchBar && (
          <label htmlFor="search" className="relative block w-[500px]">
            <input
              value={searchValue}
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search..."
              className="w-full rounded-[50px] px-4 py-1 placeholder:text-sm focus:border-black focus:ring-black pr-10"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <CiSearch />
            </span>
          </label>
        )}
      </div>

      {/* Table or No Results Message */}
      {tableData.length > 0 ? (
        <div>
          <table className="w-full bg-[#fff]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-black">
                  {headerGroup.headers.map((header) => (
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
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-goldie-300 odd:bg-opacity-20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4">
                      {cell.column.id === "createdAt"
                        ? moment(cell.getValue() as string).format(
                            "MMM DD, YYYY HH:mm A",
                          )
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Using AdminPagination */}
          <div className="mt-4">
            <AdminPagination
              totalPage={totalPages}
              page={currentPage}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-gray-500">No results found</div>
      )}
    </div>
  );
}
