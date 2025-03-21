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
import { IoMdClose } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSkeletonLoader from "./admin-skeleton";


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
interface DataTableProps<T> {
  data: T[];
  pagination: AdminPaginationInfo;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onBlock?: (admin: T) => void;
  onDelete?: (admin: T) => void;
  onReactivate?: (admin: T) => void;
  onEdit?: (admin: T) => void;
  onActivate?: (admin: T) => void;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
}
export interface AdminPaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

const isRecentlyCreated = (createdAt: string): boolean => {
  const created = moment(createdAt);
  const now = moment();
  return now.diff(created, "hours") < 24;
};


const needsActivation = (admin: Admin): boolean => {
  if (!admin.isVerified) return true;


  const statusHistory = admin.statusChanges || [];
  return (
    statusHistory.some((change) => change.status === "created") &&
    !admin.isBlocked &&
    !admin.isDeleted
  );
};

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
  currentTab,
  onTabChange,
  isLoading = false,
  onPageChange,
  onSearch,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSearchEnabled, setLocalSearchEnabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(pagination.page);

  // Reset to first page when tab changes
  useEffect(() => {
    if (pagination.page !== 1) {
      onPageChange(1);
    }
  }, [currentTab]);

  // Sync local page state with pagination prop
  useEffect(() => {
    setCurrentPage(pagination.page);
  }, [pagination.page]);

  const clearInput = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (onSearch && !localSearchEnabled) {
        onSearch(searchQuery);
        // Reset to first page when search changes
        if (pagination.page !== 1) {
          onPageChange(1);
        }
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, onSearch, localSearchEnabled]);

  // Handle page change with debounce to prevent flashing
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      // Small timeout to prevent UI jumping
      setTimeout(() => {
        onPageChange(newPage);
      }, 50);
    }
  };

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
          const isPending = needsActivation(admin);

          return (
            <div className="flex cursor-pointer items-center gap-2">
              {admin.isDeleted ? (
                <Badge className="bg-red-500">Deleted</Badge>
              ) : admin.isBlocked ? (
                <Badge className="bg-yellow-500">Blocked</Badge>
              ) : isPending ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="flex cursor-pointer items-center gap-1 bg-brand-200">
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
          const isPending = needsActivation(admin);

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

                {onActivate && isPending && (
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
      <div className="flex w-full items-center justify-between">
        <div className="w-full max-w-[500px]">
          <label htmlFor="search" className="relative block w-full">
            <input
              value={searchQuery}
              type="text"
              name="search"
              autoComplete="search"
              placeholder="Search admins..."
              className="w-full rounded-[50px] px-4 py-2 pr-10 placeholder:text-sm focus:border-black focus:ring-black"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                onClick={clearInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <IoMdClose />
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <CiSearch />
              </span>
            )}
          </label>
        </div>

        <div className="">
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={onTabChange}
          >
            <TabsList className="">
              <TabsTrigger value="all">All Admins</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="created">Pending Activation</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
              <TabsTrigger value="deleted">Deleted</TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} forceMount></TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Table with Skeleton Loader */}
      {isLoading ? (
        <TableSkeletonLoader />
      ) : tableData.length > 0 ? (
        <div className="rounded-md shadow-sm">
          <div className="overflow-x-auto">
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
                {(localSearchEnabled
                  ? table.getRowModel().rows
                  : table.getRowModel().rows
                ).map((row) => {
                  const isNew = isRecentlyCreated(row.original.createdAt);
                  const isPending = needsActivation(row.original);

                  return (
                    <tr
                      key={row.id}
                      className={cn(
                        "border-t transition-colors odd:bg-brand-100 odd:bg-opacity-20",
                        row.original.isDeleted
                          ? "bg-red-50 hover:bg-red-100"
                          : row.original.isBlocked
                            ? "bg-yellow-50 hover:bg-yellow-100"
                            : isPending
                              ? "bg-purple-50 hover:bg-purple-100"
                              : isNew
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "hover:bg-muted/50",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
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
                page={currentPage}
                setPage={handlePageChange}
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
