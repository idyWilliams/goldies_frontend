"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { orderList, productList } from "@/utils/adminData";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Column } from "react-table";
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import ProductTable from "@/components/admin-component/ProductTable";
import {
  Add,
  ArrowDown,
  ArrowDown2,
  Data,
  Edit,
  Eye,
  Trash,
} from "iconsax-react";
import MobileProductCard from "@/components/admin-component/MobileProductCard";
import MobileOrderCard from "@/components/admin-component/MobileOrderCard";
import OrderDetailsModal from "@/components/admin-component/OrderDetailsModal";
import { useRouter } from "next/navigation";
import AdminAuth from "@/components/admin-component/AdminAuth";
import { useQuery } from "@tanstack/react-query";
import { adminGetAllOrders } from "@/services/hooks/payment";
import { IOrder } from "@/interfaces/order.interface";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import AdminPagination from "@/components/admin-component/AdminPagination";
import momemt from "moment";
import { formatCurrency } from "@/helper/formatCurrency";

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-10 px-3 py-[2px] text-sm text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          Success
        </div>
      );
    case "failed":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-10 px-3 py-[2px] text-sm text-red-700">
          <span className="h-2 w-2 rounded-full bg-red-700"></span> Failed
        </div>
      );
    case "pending":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-orange-600 bg-orange-600 bg-opacity-10 px-3 py-[2px] text-sm text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-600"></span> Pending
        </div>
      );
    default:
      return;
  }
};

const columnHelper = createColumnHelper<IOrder>();

interface ITableProps {
  filteredTabs: any;
}
export default function OrderPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const itemsPerPage = 10;

  const { data, isLoading, isSuccess, refetch, isError } = useQuery({
    queryKey: ["adminAllOrders"],
    queryFn: async () => adminGetAllOrders(),
  });

  const processedOrders = useMemo<IOrder[]>(() => {
    if (!data?.orders) return [];

    let filtered = data.orders as IOrder[];
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.orderStatus.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }
    return filtered;
  }, [data?.orders, selectedStatus]);

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
        <span className="capitalize">{row.original?.orderId}</span>
      ),
    }),
    columnHelper.accessor("firstName", {
      header: () => <span>Billing Name</span>,
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original?.firstName + " " + row.original?.lastName}
        </span>
      ),
    }),
    columnHelper.accessor("fee.total", {
      cell: ({ row }) => (
        <span>{formatCurrency(row.original.fee.total, "en-NG")}</span>
      ),
      header: () => <span>Total</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Order Date</span>,
      cell: ({ row }) => (
        <span>
          {momemt(row.original.createdAt).format("MMM DD, YYYY HH:mm A")}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row, {
      id: "status",
      cell: ({ row }) => statusColor(row.original.orderStatus),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: ({ row }) => (
        <button
          className="rounded-[50px] bg-goldie-300 px-4 py-1 text-black"
          onClick={() => router.push(`/admin/orders/${row.original._id}`)}
        >
          View Details
        </button>
      ),
      header: () => <span> </span>,
      footer: (info) => info.column.id,
    }),
  ];

  return (
    <section className="h-full w-full px-4 pt-6">
      <h1 className="text-lg font-extrabold">Orders</h1>
      <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

      {isLoading ? (
        <div className="flex w-full items-center justify-center py-10">
          <Loader2Icon className="mr-2 animate-spin" />
          <p>Fetching Orders...</p>
        </div>
      ) : isError ? (
        <div className="py-5 text-center text-red-500">
          <p className="mb-4 text-center text-red-500">
            Failed to load orders. Please try again.
          </p>

          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : processedOrders.length > 0 ? (
        <>
          <div className="hidden md:block">
            <ProductTable
              columns={columns}
              Tdata={paginatedOrders}
              statusType="order"
              filteredTabs={["All", "Pending", "Success", "Failed"]}
            />
          </div>
          <div className="block md:hidden">
            {/* <MobileOrderCard data={processedOrders} /> */}
          </div>

          {totalPages > 1 && (
            <AdminPagination
              totalPage={totalPages}
              page={currentPage}
              setPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div>
          <p className="text-center text-gray-500">No orders found.</p>
        </div>
      )}
    </section>
  );
}
