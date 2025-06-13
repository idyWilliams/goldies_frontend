"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import AdminPagination from "./AdminPagination";

interface DataTableProps<T> {
  columns: any;
  data: T[];
  // Pagination Props
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function DataTable<T>({
  columns,
  data: tableData,
  totalPages,
  currentPage,
  setCurrentPage,
}: DataTableProps<T>) {
  const table = useReactTable({
    data: useMemo(() => tableData, [tableData]),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* Table or No Results Message */}
      {tableData.length > 0 ? (
        <div>
          <table className="w-full bg-[#fff]">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-brand-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 text-left capitalize text-brand-100"
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
                <tr key={row.id} className="odd:bg-brand-100 odd:bg-opacity-20">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <AdminPagination
                totalPage={totalPages}
                page={currentPage}
                setPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-gray-500">No results found</div>
      )}
    </div>
  );
}
