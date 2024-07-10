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
import { chunkArray } from "@/helper/chunkArray";
import Pagination from "@/components/custom-filter/Pagination";
import { initials } from "@/helper/initials";

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
let itemsPerPage = 6;
interface ITableProps {
  filteredTabs: any;
}
export default function Page() {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const handleNext = () => {
    if (currentPageIndex !== chunkArray(customers, itemsPerPage).length) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const handlePaginateClick = (index: number) => {
    setCurrentPageIndex(index + 1);
    window.scroll(0, 0);
  };

  const handlePrev = () => {
    if (currentPageIndex !== 1) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };
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
      <section className="min-h-screen w-full bg-[#EFEFEF] px-4 py-6">
        <h1 className="text-lg font-extrabold uppercase">Customers</h1>
        <hr className="my-3 hidden border-2 border-[#D4D4D4] md:block" />

        <div className="hidden  md:block">
          <ProductTable
            columns={columns}
            Tdata={customers}
            statusType="customer"
            filteredTabs={[""]}
          />
        </div>
        <div>
          <label
            htmlFor="search"
            className="relative mb-4 mt-6 block w-full md:hidden"
          >
            <input
              //   value={searchValue}
              type="text"
              name="search"
              autoComplete="search"
              placeholder="search for product name, product ID..."
              className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs focus:border-black focus:ring-black lg:py-2"
              //   onChange={(e) => handleChange(e)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <CiSearch />
            </span>
          </label>
          <div className="grid gap-5 md:hidden">
            {chunkArray(customers, itemsPerPage)[currentPageIndex - 1]?.map(
              (item: any, index: any) => {
                return (
                  <div key={index} className="bg-white p-4 py-6">
                    <div className="mt-3">
                      <div className="grid grid-cols-[50px_1fr] gap-3 gap-y-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-goldie-300">
                          {initials(item?.customerName)}
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col gap-2">
                            <h3 className="whitespace-nowrap font-bold">
                              {item?.customerName}
                            </h3>
                            <span className="text-sm">
                              +{item?.contactNumber}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="">
                              &euro;{item?.amountSpent} spent
                            </span>
                            <span className="inline-block text-right text-sm font-bold">
                              {item?.orders}orders
                            </span>
                          </div>
                        </div>
                        <div></div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Joined: {item?.dateOnboarded}
                          </span>
                          <button
                            className="items-center bg-black px-5 py-2 text-sm text-goldie-300"
                            onClick={() =>
                              router.push(`/admin/customers/${item?.id}`)
                            }
                          >
                            More Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
            )}

            <Pagination
              className="bg-transparent lg:hidden"
              onNext={handleNext}
              onPrev={handlePrev}
              onPaginateClick={handlePaginateClick}
              itemsPerPage={itemsPerPage}
              currentPageIndex={currentPageIndex}
              arr={customers}
            />
          </div>
        </div>
      </section>
    </>
  );
}
