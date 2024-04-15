"use client";
import * as React from "react";

import {
  Column,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";

export default function ProductTable({
  columns,
  data,
  filteredTabs,
}: {
  columns: any;
  data: any;
  filteredTabs?: any;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    </div>
  );
}
