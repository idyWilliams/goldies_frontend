"use client";

import {
  Column,
  ColumnDef,
  createColumnHelper,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft } from "iconsax-react";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function ProductTable({
  columns,
  data,
  filteredTabs,
}: {
  columns: any;
  data: any;
  filteredTabs?: any;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  return (
    <div>
      <div className="my-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {filteredTabs &&
            filteredTabs.map((tabs: string, index: number) => (
              <button
                key={index}
                className="h-[21px] w-fit rounded-sm border border-neutral-200 bg-white px-2"
              >
                {tabs}
              </button>
            ))}
          {/* <button className="h-[21px] w-[69px] rounded-sm bg-white">
              Pending
            </button>
            <button className="h-[21px] w-[69px] rounded-sm bg-white">
              Success
            </button>
            <button className="h-[21px] w-[69px] rounded-sm bg-white">
              Failed
            </button> */}
        </div>
        <label htmlFor="search" className="relative block w-[500px] ">
          <input
            type="text"
            name="search"
            autoComplete="search"
            placeholder="search for product name, product ID..."
            className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs"
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
                  className="bg-black p-4 text-left capitalize text-main"
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
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="mt-8 flex w-full items-center justify-between gap-2">
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-black p-1 text-main"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FiChevronsLeft />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-main p-1 text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <BsChevronLeft size={15} />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-main p-1 text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <BsChevronRight size={15} />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-black p-1 text-main"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <FiChevronsRight />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 rounded border p-1 text-sm focus:border-black focus:outline-none focus:ring-black"
            />
          </span>
          <select
            className="rounded border p-1 pl-4 pr-9 text-sm focus:border-black focus:outline-none focus:ring-black"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
