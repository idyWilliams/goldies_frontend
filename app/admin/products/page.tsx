"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { productList } from "@/utils/adminData";
import Image from "next/image";
import React from "react";
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

// const ProductColumn = ({ row }: any) => {
//   console.log(row, "Productrow");
//   return (
//     <div className="grid grid-cols-[100px_1fr]">
//       <Image
//         src={row?.image}
//         alt={row?.productName}
//         className="h-full w-full object-cover object-center"
//       />
//       <div>
//         <h3 className="font-medium capitalize">{row?.productName}</h3>
//         <span className="inline-block uppercase">id:{row?.id}</span>
//       </div>
//     </div>
//   );
// };
// const TColumns: readonly Column<object>[] = [
//   {
//     Header: "Product",
//     accessor: (row: any) => {
//       return <ProductColumn row={row} />;
//     },
//   },
//   {
//     Header: "Product",
//     accessor: "productName",
//   },
// ];

type Product = {
  id: string;
  image: any;
  productName: string;
  addedDate: string;
  category: string;
  priceFrom: number;
  priceTo: number;
  quantity: number;
  status: string;
};

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-20 px-1 py-[2px] text-sm text-green-700">
          <span className="h-3 w-3 rounded-full bg-green-700"></span>
          Active
        </div>
      );
    case "inactive":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-20 px-1 py-[2px] text-sm text-red-700">
          <span className="h-3 w-3 rounded-full bg-red-700"></span> Inactive
        </div>
      );
    default:
      return;
  }
};

const columnHelper = createColumnHelper<Product>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "productName",
    cell: (info) => {
      console.log(info, "column");
      return (
        <div className="grid grid-cols-[50px_1fr] gap-2">
          <Image
            src={info.cell.row.original?.image}
            alt={info.cell.row.original.productName}
          />
          <div className="flex flex-col">
            <h3 className="font-bold">{info.cell.row.original.productName}</h3>
            <span>ID: &nbsp; {info.cell.row.original.id}</span>
          </div>
        </div>
      );
    },
    header: () => <span>Product</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.category, {
    id: "category",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
    header: () => <span>Category</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "price",
    cell: (info) => (
      <span>
        &euro;{info.cell.row.original.priceFrom} - &euro;
        {info.cell.row.original.priceTo}
      </span>
    ),
    header: () => <span>Product</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("addedDate", {
    header: () => <span>AddedDate</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("quantity", {
    header: () => <span>Quantity</span>,
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
      <div className="inline-flex items-center gap-3">
        <span className="text-blue-700">
          <Eye size={20} />
        </span>
        <span className="text-green-700">
          <Edit size={20} />
        </span>
        <span className="text-red-700">
          <Trash size={20} />
        </span>
      </div>
    ),
    header: () => <span>Actions</span>,
    footer: (info) => info.column.id,
  }),
];

export default function Page() {
  return (
    <>
      <section className="w-full px-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold">Products</h1>
            <p className="text-xs">List of all available products created</p>
          </div>
          <button className="flex cursor-pointer items-center rounded-md bg-black px-5 py-4 text-[10px] text-main">
            <Add size={15} /> ADD NEW
          </button>
        </div>

        <div className="my-6 flex items-center justify-between gap-2">
          <label htmlFor="search" className="relative block w-[500px] ">
            <input
              type="text"
              name="search"
              autoComplete="search"
              placeholder="search for product name, product ID..."
              className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs lg:py-2"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <CiSearch />
            </span>
          </label>
          <button className="hidden cursor-pointer items-center rounded-md bg-black px-5 py-4 text-[10px] text-main md:block">
            <Add size={15} /> ADD NEW
          </button>
          <button className="flex min-w-[83px] cursor-pointer items-center justify-between rounded-md bg-black px-3 py-2 text-[10px] text-main md:hidden">
            Sort by <ArrowDown2 size={15} />
          </button>
        </div>
        {/* <div>
          <AdminTable columns={TColumns} data={productList} />
        </div> */}

        <div className="hidden md:block">
          <ProductTable columns={columns} data={productList} />
        </div>
        <div className="block md:hidden">
          <div className="">
            <MobileProductCard />
          </div>
        </div>
      </section>
    </>
  );
}
