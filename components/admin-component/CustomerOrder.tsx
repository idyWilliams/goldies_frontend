"use client";
import EachElement from "@/helper/EachElement";
import { chunkArray } from "@/helper/chunkArray";
import {
  ArrowLeft,
  Eye,
  ShieldCross,
  ShoppingCart,
  TruckRemove,
} from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Pagination from "../custom-filter/Pagination";
import { customerOrders } from "@/utils/adminData";
import Image from "next/image";
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import ProductTable from "@/components/admin-component/ProductTable";
import { useQuery } from "@tanstack/react-query";
import { getUserOrdersById } from "@/services/hooks/admin-auth";
import { IOrder } from "@/interfaces/order.interface";
import DataTable from "./DataTable";
import { Button } from "../ui/button";
import MobileOrderCard from "./MobileOrderCard";
import AdminPagination from "./AdminPagination";
import { Loader2Icon } from "lucide-react";
import { formatCurrency } from "@/helper/formatCurrency";
import moment from "moment";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-10 px-3 py-[2px] text-sm capitalize text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          {status}
        </div>
      );
    case "cancelled":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-10 px-3 py-[2px] text-sm capitalize text-red-700">
          <span className="h-2 w-2 rounded-full bg-red-700"></span> {status}
        </div>
      );
    case "pending":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-orange-600 bg-orange-600 bg-opacity-10 px-3 py-[2px] text-sm capitalize text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-600"></span> {status}
        </div>
      );
    default:
      return;
  }
};

const OrderSummarySkeleton = () => (
  <div className="inline-flex w-[250px] items-center justify-between rounded-md bg-white p-6 py-5 shadow-md md:w-full lg:py-10">
    <div>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="mt-2 h-4 w-24" />
    </div>
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
);

const columnHelper = createColumnHelper<IOrder>();

export default function CustomerOrder({ id }: { id: string }) {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const itemsPerPage = 10;

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getUserOrdersById", id],
    queryFn: async () => getUserOrdersById(id),
  });

  const allOrders = data?.orders as IOrder[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const processedOrders = useMemo<IOrder[]>(() => {
    if (!allOrders) return [];

    let filtered = allOrders;
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.orderStatus.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }

    if (searchValue) {
      filtered = filtered.filter(
        (order) =>
          order?.orderId?.toLowerCase().includes(searchValue.toLowerCase()) ||
          order?.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          order?.lastName?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    // Sort by createdAt in descending order (most recent first)
    return filtered.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [allOrders, selectedStatus, searchValue]);

  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(
    () =>
      processedOrders.slice(
        (currentPageIndex - 1) * itemsPerPage,
        currentPageIndex * itemsPerPage,
      ),
    [processedOrders, currentPageIndex],
  );

  useEffect(() => {
    if (currentPageIndex > totalPages && totalPages > 0) {
      setCurrentPageIndex(totalPages);
    }
  }, [totalPages, currentPageIndex]);

  const columns = [
    columnHelper.accessor((row) => row.orderId, {
      id: "orderId",
      header: () => <span>Order ID</span>,
      cell: ({ row }) => (
        <span className="text-[15px] capitalize">{row.original?.orderId}</span>
      ),
    }),
    columnHelper.accessor("firstName", {
      header: () => <span>Billing Name</span>,
      cell: ({ row }) => (
        <Link href={`/admin/orders/${row.original._id}`}>
          <span className="text-[15px] capitalize">
            {row.original?.firstName + " " + row.original?.lastName}
          </span>
        </Link>
      ),
    }),
    columnHelper.accessor("fee.total", {
      cell: ({ row }) => (
        <span className="text-[15px]">
          {formatCurrency(row.original.fee.total, "en-NG")}
        </span>
      ),
      header: () => <span>Total</span>,
    }),

    columnHelper.accessor((row) => row, {
      id: "createdAt",
      header: () => <span>Order Date</span>,
      cell: ({ row }) => (
        <span className="text-[15px]">
          {moment(row.original.createdAt).format("MMM DD, YYYY HH:mm A")}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row, {
      id: "status",
      cell: ({ row }) => statusColor(row.original.orderStatus),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("_id", {
      header: () => <span>Actions</span>,
      cell: ({ row }) => (
        <div className="inline-flex items-center ">
          <Link
            href={`/admin/orders/${row.original._id}`}
            className="cursor-pointer text-blue-700"
          >
            <Eye size={20} />
          </Link>
        </div>
      ),
    }),
  ];

  const filteredTabs = ["All", "Pending", "Completed", "Cancelled"];

  const orderSummary = useMemo(() => {
    if (!allOrders) return [];

    // Calculate totals
    const totalOrdered = allOrders.length;
    const totalDelivered = allOrders.filter(
      (order) => order.orderStatus === "completed",
    ).length;
    const totalCanceled = allOrders.filter(
      (order) => order.orderStatus === "cancelled",
    ).length;

    return [
      {
        title: "Total Ordered",
        total: totalOrdered,
        icon: <ShoppingCart size={32} className="text-brand-200" />,
      },
      {
        title: "Total Delivered",
        total: totalDelivered,
        icon: <TruckRemove size={32} className="text-green-600" />,
      },
      {
        title: "Total Canceled",
        total: totalCanceled,
        icon: <ShieldCross size={32} className="text-red-600" />,
      },
    ];
  }, [allOrders]);

  return (
    <section className="min-h-dvh bg-neutral-100 p-4">
      <div
        className="mb-5 inline-flex cursor-pointer items-center gap-2"
        onClick={() => router.push(`/admin/customers/${id}`)}
      >
        <ArrowLeft />
        <span className="font-bold uppercase">Customer&apos;s Orders</span>
      </div>
      <div className="hide-scrollbar w-full overflow-x-auto">
        <div className="flex w-min space-x-5 md:w-full md:gap-4 md:space-x-0 lg:grid lg:grid-cols-3 lg:gap-10">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <OrderSummarySkeleton key={index} />
            ))
          ) : (
            <EachElement
              of={orderSummary}
              render={(item: any, index: number) => (
                <div
                  key={index}
                  className="inline-flex w-[250px] items-center justify-between rounded-md bg-white p-6 py-5 shadow-md md:w-full lg:py-10"
                >
                  <div>
                    <h3 className="text-2xl font-bold">{item.total}</h3>
                    <p className="mt-1 capitalize">{item.title}</p>
                  </div>
                  <span className="inline-block">{item.icon}</span>
                </div>
              )}
            />
          )}
        </div>
      </div>
      <hr className="my-6 border-0 border-t-2 border-neutral-300" />

      <div className="my-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        {/* Filter Tabs */}
        <div className={cn("flex items-center justify-between gap-2 p-[2px]")}>
          <div className="flex items-center gap-1">
            {filteredTabs?.map((tab, index) => (
              <button
                key={index}
                className={`w-fit rounded-sm border px-2 ${
                  selectedStatus === tab
                    ? "bg-brand-200 text-brand-100"
                    : "border-brand-200 bg-white"
                }`}
                onClick={() => setSelectedStatus(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* search input */}
        <div className="w-full max-w-[500px]">
          <label htmlFor="search" className="relative block w-full">
            <input
              value={searchValue}
              type="text"
              name="search"
              autoComplete="search"
              placeholder="Search..."
              className="w-full rounded-[50px] px-4 py-2 pr-10 placeholder:text-sm focus:border-black focus:ring-black"
              onChange={handleChange}
            />
            {searchValue ? (
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
      </div>

      <div className="">
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-10">
            <Loader2Icon className="mr-2 animate-spin" />
            <p>Fetching Orders...</p>
          </div>
        ) : isError ? (
          <div className="py-5 text-center">
            <p className="mb-4 text-center text-red-500">
              Failed to load orders. Please try again.
            </p>

            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        ) : processedOrders.length > 0 ? (
          <>
            <div className="hidden md:block">
              <DataTable
                columns={columns}
                data={paginatedOrders}
                currentPage={currentPageIndex}
                totalPages={totalPages}
                setCurrentPage={setCurrentPageIndex}
              />
            </div>
            <div className="block md:hidden">
              <MobileOrderCard data={paginatedOrders} />

              {totalPages > 1 && (
                <AdminPagination
                  totalPage={totalPages}
                  page={currentPageIndex}
                  setPage={setCurrentPageIndex}
                />
              )}
            </div>
          </>
        ) : (
          <div>
            <p className="text-center text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
