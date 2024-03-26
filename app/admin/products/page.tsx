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

type Data = {
  id: number;
  name: string;
  age: number;
};

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

export default function Page() {
  return (
    <>
      <section className="w-full bg-main px-4 py-6 pt-[65px] lg:bg-white lg:p-8 lg:pt-24">
        <h1 className="text-lg font-extrabold">Products</h1>
        <p className="text-xs">List of all available products created</p>

        <label htmlFor="search" className="relative mt-6 block w-[500px] ">
          <input
            type="text"
            name="search"
            autoComplete="search"
            placeholder="search for product name, product ID..."
            className="w-full rounded-[50px] px-4 py-2 placeholder:text-xs"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <CiSearch />
          </span>
        </label>

        {/* <div>
          <AdminTable columns={TColumns} data={productList} />
        </div> */}

        <ProductTable />
      </section>
    </>
  );
}
