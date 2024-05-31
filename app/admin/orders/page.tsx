"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { orderList, productList } from "@/utils/adminData";
import Image from "next/image";
import React, { useState } from "react";
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

type Product = {
  id: string;
  image: any;
  productName: string;
  orderDate: string;
  billingName: string;
  priceFrom: number;
  totalPrice: number;
  status: string;
};

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

const columnHelper = createColumnHelper<Product>();

interface ITableProps {
  filteredTabs: any;
}
export default function Page() {
  const router = useRouter();
  const columns = [
    columnHelper.accessor((row) => row, {
      id: "productName",
      cell: (info) => {
        console.log(info, "column");
        return (
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <Image
              src={info.cell.row.original?.image}
              alt={info.cell.row.original.productName}
              className="h-[40px] w-full object-cover"
            />
            <h3 className="font-bold">{info.cell.row.original.productName}</h3>
          </div>
        );
      },
      header: () => <span>Product</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("id", {
      header: () => <span>Order ID</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.billingName, {
      id: "billingName",
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      header: () => <span>Billing Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("orderDate", {
      header: () => <span>Order Date</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "totalPrice",
      cell: (info) => <span>&euro;{info.cell.row.original.totalPrice}</span>,
      header: () => <span>Total</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "status",
      cell: (info) => statusColor(info.cell.row.original.status),
      header: () => <span>Status</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: (info) => (
        <button
          className="bg-goldie-300 rounded-[50px] px-4 py-1 text-black"
          onClick={() =>
            router.push(`/admin/orders/${info.cell.row.original.id}`)
          }
        >
          View Details
        </button>
      ),
      header: () => <span> </span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <section className="w-full bg-[#EFEFEF] px-4 pt-6">
        <h1 className="text-lg font-extrabold">Orders</h1>
        <hr className="mt-3 border-2 border-[#D4D4D4]" />

        <div className="hidden  md:block">
          <ProductTable
            columns={columns}
            Tdata={orderList}
            statusType="order"
            filteredTabs={["All", "Pending", "Success", "Failed"]}
          />
        </div>
        <div className="block md:hidden">
          <MobileOrderCard />
        </div>
      </section>
      {/* <OrderDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  );
}
