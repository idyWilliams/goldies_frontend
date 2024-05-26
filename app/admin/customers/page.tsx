"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { customers } from "@/utils/adminData";
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
  User,
} from "iconsax-react";
import MobileProductCard from "@/components/admin-component/MobileProductCard";
import MobileOrderCard from "@/components/admin-component/MobileOrderCard";
import OrderDetailsModal from "@/components/admin-component/OrderDetailsModal";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  image: any;
  customerName: string;
  dateOnboarded: string;
  orders: number;
  contactNumber: number;
  amountSpent: number;
  action: string;
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
      id: "customerName",
      cell: (info) => {
        console.log(info, "column");
        return (
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
              <span className="text-white">JD</span>
            </div>
            <h3 className="font-bold">{info.cell.row.original.customerName}</h3>
          </div>
        );
      },
      header: () => <span>Customers</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("dateOnboarded", {
      header: () => <span>Date Onboarded</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.contactNumber, {
      id: "contactNumber",
      cell: (info) => <span>+{info.getValue()}</span>,
      header: () => <span>Contact Number </span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("orders", {
      header: () => <span>Orders</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "amountSpent",
      cell: (info) => <span>&euro;{info.cell.row.original.amountSpent}</span>,
      header: () => <span>Amount Spent</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => (
        <span className="text-blue-400">{info.cell.row.original.action}</span>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <section className="w-full bg-[#EFEFEF] px-4 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold uppercase">Customers</h1>
          <span className="mr-10">
            <User />
          </span>
        </div>
        <hr className="mt-3 border-2 border-[#D4D4D4]" />

        <div className="hidden  md:block">
          <ProductTable
            columns={columns}
            Tdata={customers}
            statusType="customer"
            filteredTabs={["All", "Old", "New"]}
          />
        </div>
        <div className="block md:hidden">
          <MobileOrderCard />
        </div>
      </section>
    </>
  );
}
