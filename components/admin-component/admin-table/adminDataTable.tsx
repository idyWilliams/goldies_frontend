// components/AdminDataTable.tsx
"use client";

import { cn } from "@/helper/cn";
import moment from "moment";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FaLock, FaTrash, FaUnlock, FaEdit, FaCheck } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiUserAddLine } from "react-icons/ri";
import AdminPagination from "./adminPagination";

// Define the Admin type based on the provided data structure
export interface Admin {
  _id: string;
  userName: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  statusChanges?: Array<{
    status: string;
    reason: string;
    timestamp: string;
  }>;
  OTP?: string;
}

export interface AdminPaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface DataTableProps<T> {
  data: T[];
  pagination: AdminPaginationInfo;
  // Action handlers
  onBlock?: (admin: T) => void;
  onDelete?: (admin: T) => void;
  onReactivate?: (admin: T) => void;
  onEdit?: (admin: T) => void;
  onActivate?: (admin: T) => void;
  // Optional loading state
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
}

// Function to determine if an admin was recently created (within last 24 hours)
const isRecentlyCreated = (createdAt: string): boolean => {
  const created = moment(createdAt);
  const now = moment();
  return now.diff(created, "hours") < 24;
};

// Global filter function for the table
const globalFilter: FilterFn<any> = (row, columnId, value) => {
  const searchValue = value.toLowerCase();
  const cellValue = String(row.getValue(columnId)).toLowerCase();
  return cellValue.includes(searchValue);
};

export default function AdminDataTable<T extends Admin>({
  data: tableData,
  pagination,
  onBlock,
  onDelete,
  onReactivate,
  onEdit,
  onActivate,
  isLoading = false,
  onPageChange,
  onSearch,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSearchEnabled, setLocalSearchEnabled] = useState(false);

  // Apply search after a short delay to avoid excessive API calls
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (onSearch && !localSearchEnabled) {
        onSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, onSearch, localSearchEnabled]);

  // Get columns for the table
  const columns = useMemo<ColumnDef<T>[]>(
    () => [
      {
        accessorKey: "userName",
        header: "Name",
        cell: ({ row }) => {
          const admin = row.original;
          const isNew = isRecentlyCreated(admin.createdAt);

          return (
            <div className="flex items-center gap-2">
              <span>{admin.userName}</span>
              {isNew && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-blue-400 text-xs">New</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Added within last 24 hours</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="capitalize">
            {row.original.role.replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const admin = row.original;
          const statusHistory = admin.statusChanges || [];
          const latestStatus =
            statusHistory.length > 0
              ? statusHistory[statusHistory.length - 1].status
              : admin.isVerified
                ? "active"
                : "created";

          // Check if this is a new account that needs activation
          const needsActivation =
            !admin.isVerified ||
            (latestStatus === "created" &&
              !admin.isBlocked &&
              !admin.isDeleted);

          return (
            <div className="flex items-center gap-2">
              {admin.isDeleted ? (
                <Badge className="bg-red-500">Deleted</Badge>
              ) : admin.isBlocked ? (
                <Badge className="bg-yellow-500">Blocked</Badge>
              ) : needsActivation ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="flex items-center gap-1 bg-purple-500">
                        <RiUserAddLine className="h-3 w-3" />
                        <span>Pending Activation</span>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Account needs to be activated</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Badge className="bg-green-500">Active</Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) =>
          moment(row.original.createdAt).format("MMM DD, YYYY"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const admin = row.original;
          const needsActivation =
            !admin.isVerified ||
            (admin.statusChanges?.[0]?.status === "created" &&
              !admin.isBlocked &&
              !admin.isDeleted);

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(admin)}>
                    <FaEdit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                )}

                {onActivate && needsActivation && (
                  <DropdownMenuItem onClick={() => onActivate(admin)}>
                    <FaCheck className="mr-2 h-4 w-4 text-green-500" />
                    <span>Activate Account</span>
                  </DropdownMenuItem>
                )}

                {onBlock && !admin.isBlocked && !admin.isDeleted && (
                  <DropdownMenuItem onClick={() => onBlock(admin)}>
                    <FaLock className="mr-2 h-4 w-4" />
                    <span>Block</span>
                  </DropdownMenuItem>
                )}

                {onReactivate && admin.isBlocked && !admin.isDeleted && (
                  <DropdownMenuItem onClick={() => onReactivate(admin)}>
                    <FaUnlock className="mr-2 h-4 w-4" />
                    <span>Unblock</span>
                  </DropdownMenuItem>
                )}

                {onDelete && !admin.isDeleted && (
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(admin)}
                  >
                    <FaTrash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                )}

                {onReactivate && admin.isDeleted && (
                  <DropdownMenuItem onClick={() => onReactivate(admin)}>
                    <FaUnlock className="mr-2 h-4 w-4" />
                    <span>Restore</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onActivate, onBlock, onDelete, onEdit, onReactivate],
  );

  // Configure the table
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: localSearchEnabled ? searchQuery : "",
    },
    globalFilterFn: globalFilter,
  });

  return (
    <div className="w-full space-y-4">
      {/* Search and filter controls */}
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Search mode:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={localSearchEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLocalSearchEnabled(true)}
                >
                  Client-side
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search within loaded data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={!localSearchEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLocalSearchEnabled(false)}
                >
                  Server-side
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search across all data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : tableData.length > 0 ? (
        <div className="rounded-md border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-muted/50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-4 text-left text-sm font-medium text-muted-foreground"
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
                {(localSearchEnabled
                  ? table.getRowModel().rows
                  : table.getRowModel().rows
                ).map((row) => {
                  const isNew = isRecentlyCreated(row.original.createdAt);
                  const needsActivation =
                    !row.original.isVerified ||
                    (row.original.statusChanges?.[0]?.status === "created" &&
                      !row.original.isBlocked &&
                      !row.original.isDeleted);

                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-t transition-colors",
                        row.original.isDeleted
                          ? "bg-red-50 hover:bg-red-100"
                          : row.original.isBlocked
                            ? "bg-yellow-50 hover:bg-yellow-100"
                            : needsActivation
                              ? "bg-purple-50 hover:bg-purple-100"
                              : isNew
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "hover:bg-muted/50",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4 text-sm">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="border-t p-4">
              <AdminPagination
                totalPage={pagination.pages}
                page={pagination.page}
                setPage={(newPage) => onPageChange(newPage)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border bg-muted/20 py-12 text-muted-foreground">
          <div className="mb-2 text-4xl">🔍</div>
          <p>No admins found</p>
          <p className="mt-1 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
