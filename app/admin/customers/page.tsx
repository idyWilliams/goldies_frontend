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

type Customer = {
  id: string;
  image: any;
  customerName: string;
  dateOnboarded: string;
  orders: number;
  contactNumber: number;
  amountSpent: number;
  action: string;
};

const columnHelper = createColumnHelper<Customer>();

interface ITableProps {
  filteredTabs: any;
}
export default function Page() {
  const router = useRouter();
  const handleView = (id: string) => {
    router.push(`/admin/customers/${id}`);
  };
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
        <span
          className="cursor-pointer text-blue-400"
          onClick={() => handleView(info.cell.row.original.id)}
        >
          View More
        </span>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <section className="w-full bg-[#EFEFEF] px-4 pt-6">
        <h1 className="text-lg font-extrabold uppercase">Customers</h1>
        <hr className="mt-3 border-2 border-[#D4D4D4]" />

        <div className="hidden  md:block">
          <ProductTable
            columns={columns}
            Tdata={customers}
            statusType="customer"
            filteredTabs={["All", "Old", "New"]}
          />
        </div>
      </section>
    </>
  );
}
