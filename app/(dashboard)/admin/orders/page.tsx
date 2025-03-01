"use client";
import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import MobileOrderCard from "@/components/admin-component/MobileOrderCard";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { cn } from "@/lib/utils";
import { adminGetAllOrders } from "@/services/hooks/payment";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-10 px-3 py-[2px] text-sm text-green-700 capitalize">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          {status}
        </div>
      );
    case "cancelled":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-10 px-3 py-[2px] text-sm text-red-700 capitalize">
          <span className="h-2 w-2 rounded-full bg-red-700"></span> {status}
        </div>
      );
    case "pending":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-orange-600 bg-orange-600 bg-opacity-10 px-3 py-[2px] text-sm text-orange-600 capitalize">
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 10;

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["adminAllOrders"],
    queryFn: async () => adminGetAllOrders(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const processedOrders = useMemo<IOrder[]>(() => {
    if (!data?.orders) return [];

    let filtered = data.orders as IOrder[];
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

    return filtered;
  }, [data?.orders, selectedStatus, searchValue]);

  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(
    () =>
      processedOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [processedOrders, currentPage],
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

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
        <span className="text-[15px] capitalize">
          {row.original?.firstName + " " + row.original?.lastName}
        </span>
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
      <h1 className="text-lg font-extrabold uppercase">Orders</h1>
      <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

      <div className="my-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        {/* Filter Tabs */}
        <div className={cn("flex items-center justify-between gap-2 p-[2px]")}>
          <div className="flex items-center gap-1">
            {filteredTabs?.map((tab, index) => (
              <button
                key={index}
                className={`w-fit rounded-sm border px-2 ${
                  selectedStatus === tab
                    ? "bg-black text-goldie-300"
                    : "border-neutral-200 bg-white"
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
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="block md:hidden">
            <MobileOrderCard data={paginatedOrders} />

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
