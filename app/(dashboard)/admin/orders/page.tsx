"use client";
import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import MobileOrderCard from "@/components/admin-component/MobileOrderCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder, OrderParams } from "@/interfaces/order.interface";
import { cn } from "@/lib/utils";
import useOrders from "@/services/hooks/payment/useOrders";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, ShoppingBag } from "iconsax-react";
import { Loader2Icon, Undo2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

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

const columnHelper = createColumnHelper<IOrder>();

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemsPerPage = 10;

  const [params, setParams] = useState<OrderParams>({
    page: currentPage,
    limit: itemsPerPage,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const newParams: OrderParams = {
      page: currentPage,
      limit: itemsPerPage,
      status: selectedStatus === "All" ? "" : selectedStatus.toLowerCase(),
    };

    if (startDate && endDate) {
      newParams.startDate = startDate;
      newParams.endDate = endDate;
    }

    if (debouncedSearchValue) {
      newParams.searchQuery = debouncedSearchValue;
    }

    // Update URL with new search query and page
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPage.toString());

    if (currentPage !== 1) {
      currentParams.set("page", currentPage.toString());
    } else {
      currentParams.delete("page");
    }

    if (debouncedSearchValue) {
      currentParams.set("search", debouncedSearchValue);
    } else {
      currentParams.delete("search");
    }

    if (selectedStatus !== "All") {
      currentParams.set("status", selectedStatus.toLowerCase());
    } else {
      currentParams.delete("status");
    }

    if (startDate && endDate) {
      currentParams.set("startDate", startDate);
      currentParams.set("endDate", endDate);
    } else {
      currentParams.delete("startDate");
      currentParams.delete("endDate");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
    setParams(newParams);
  }, [
    currentPage,
    searchValue,
    debouncedSearchValue,
    pathname,
    router,
    searchParams,
    selectedStatus,
    startDate,
    endDate,
  ]);

  const { orders, isLoading, isError, refetch, totalPages, totalOrders } =
    useOrders(params);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
  };

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

  return (
    <section className="h-full w-full px-4 pt-6">
      <div className="">
        <div className="items center flex gap-2 ">
          <ShoppingBag variant="Bold" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold uppercase">Orders</h1>
            <Badge className=" bg-brand-200 text-[10px]">{totalOrders}</Badge>
          </div>
        </div>
        <p className="text-sm"></p>
      </div>

      <div className="my-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
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

          {/* Date Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-[50px] px-4 py-2 placeholder:text-sm focus:border-black focus:ring-black"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-[50px] px-4 py-2 placeholder:text-sm focus:border-black focus:ring-black"
            />
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className={cn(
                "flex items-center gap-1 rounded-[50px] bg-gray-200 px-4 py-2 hover:bg-gray-300",
                !startDate && !endDate && "cursor-not-allowed opacity-50",
              )}
              disabled={!startDate && !endDate}
            >
              <Undo2Icon size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={cn("flex items-center justify-between gap-2 p-[2px]")}>
          <div className="flex items-center gap-1">
            {filteredTabs?.map((tab, index) => (
              <button
                key={index}
                className={`w-fit rounded-[50px] border px-3 py-0.5 ${
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
      </div>

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
      ) : orders && orders?.length > 0 ? (
        <>
          <div className="hidden md:block">
            <DataTable
              columns={columns}
              data={orders!}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="block md:hidden">
            <MobileOrderCard data={orders!} />

            {totalPages > 1 && (
              <AdminPagination
                totalPage={totalPages}
                page={currentPage}
                setPage={setCurrentPage}
              />
            )}
          </div>
        </>
      ) : (
        <div>
          <p className="text-center text-gray-500">No orders found.</p>
        </div>
      )}
    </section>
  );
}
