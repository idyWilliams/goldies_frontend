"use client";
import EachElement from "@/helper/EachElement";
import { chunkArray } from "@/helper/chunkArray";
import {
  ArrowLeft,
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

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <div className="text-green-700">Completed</div>;
    case "failed":
      return <div className="text-red-700">Failed</div>;
    case "pending":
      return <div className="text-orange-600">Pending</div>;
    default:
      return;
  }
};
const orderSummary = [
  {
    title: "Total Ordered",
    total: 8,
    icon: <ShoppingCart size={32} className="text-goldie-400" />,
  },
  {
    title: "Total Delivered",
    total: 8,
    icon: <TruckRemove size={32} className="text-green-600" />,
  },
  {
    title: "Total Canceled",
    total: 8,
    icon: <ShieldCross size={32} className="text-red-600" />,
  },
];

type Customer = {
  image: any;
  productName: string;
  orderDate: string;
  OrderId: number;
  quantity: number;
  amount: number;
  status: string;
  shipping: number;
  total: number;
};

const columnHelper = createColumnHelper<Customer>();

interface ITableProps {
  filteredTabs: any;
}

export default function CustomerOrder({ id }: { id: string }) {
  const router = useRouter();
  const [orders, setOrders] = useState(customerOrders);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const itemsPerPage = 10;

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["getUserOrdersById", id],
    queryFn: async () => getUserOrdersById(id),
  });

  console.log("orders id: " + id)
  console.log("orders: " + data)

  // const processedOrders = useMemo<IOrder[]>(() => {
  //     if (!ordersResponse?.userOrder) return [];
  
  //     let filtered = ordersResponse?.userOrder as IOrder[];
  //     if (selectedStatus !== "All") {
  //       filtered = filtered.filter(
  //         (order) =>
  //           order.orderStatus.toLowerCase() === selectedStatus.toLowerCase(),
  //       );
  //     }
  //     return filtered;
  //   }, [ordersResponse?.userOrder, selectedStatus]);
  
  //   const totalPages = Math.ceil(processedOrders.length / itemsPerPage);
  
  //   const paginatedOrders = useMemo(
  //     () =>
  //       processedOrders.slice(
  //         (currentPageIndex - 1) * itemsPerPage,
  //         currentPageIndex * itemsPerPage,
  //       ),
  //     [processedOrders, currentPageIndex],
  //   );
  
    // useEffect(() => {
    //   if (currentPage > totalPages && totalPages > 0) {
    //     setCurrentPageIndex(totalPages);
    //   }
    // }, [totalPages, currentPage]);

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "OrderId",
      cell: (info) => {
        return (
          <div className="grid grid-cols-[50px_1fr] items-center gap-2 text-sm">
            <h3 className="">{info.cell.row.original.OrderId}</h3>
          </div>
        );
      },
      header: () => <span className="whitespace-nowrap">Order ID</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "productName",
      cell: (info) => (
        <span className="whitespace-nowrap text-sm">
          {info.cell.row.original.productName}
        </span>
      ),
      header: () => <span className="whitespace-nowrap">Product Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "orderDate",
      cell: (info) => (
        <span className="text-sm">{info.cell.row.original.orderDate}</span>
      ),
      header: () => <span className="whitespace-nowrap">Order Date</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "quantity",
      cell: (info) => (
        <span className="text-sm">{info.cell.row.original.quantity}</span>
      ),
      header: () => <span>Qnty</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "amount",
      cell: (info) => (
        <span className="text-sm">&euro;{info.cell.row.original.amount}</span>
      ),
      header: () => <span>Amount</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "shipping",
      cell: (info) => (
        <span className="text-sm">&euro;{info.cell.row.original.shipping}</span>
      ),
      header: () => <span>Shipping</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "total",
      cell: (info) => (
        <span className="text-sm">&euro;{info.cell.row.original.total}</span>
      ),
      header: () => <span>Total</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row, {
      id: "status",
      cell: (info) => (
        <span className="cursor-pointer text-sm">
          {statusColor(info.cell.row.original.status)}
        </span>
      ),
      header: () => <span>Status</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <section className="bg-neutral-100 p-4">
      <div
        className="mb-5 inline-flex cursor-pointer items-center gap-2"
        onClick={() => router.push(`/admin/customers/${id}`)}
      >
        <ArrowLeft />
        <span className="font-bold uppercase">John&apos;s Order</span>
      </div>
      <div className="hide-scrollbar w-full overflow-x-auto">
        <div className="flex w-min space-x-5 md:w-full md:gap-4 md:space-x-0 lg:grid lg:grid-cols-3 lg:gap-10">
          <EachElement
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
            of={orderSummary}
          />
        </div>
      </div>
      <hr className="my-6 border-0 border-t-2 border-neutral-300" />
      <label htmlFor="search" className="relative mb-4 block w-full md:hidden">
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
      <div className="block space-y-4 md:hidden">
        {chunkArray(orders, itemsPerPage)[currentPageIndex - 1]?.map(
          (item: any, index: any) => {
            return (
              <div key={index} className="bg-white p-4 py-6">
                <div className="flex items-center justify-between">
                  <span>Order ID: {item?.OrderId}</span>
                  <span>{item?.orderDate}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="grid grid-cols-[50px_1fr] gap-3">
                    <Image
                      src={item?.image}
                      alt={item?.productName}
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{item?.productName}</h3>
                      <span className="text-sm font-semibold">
                        &euro;{item?.amount}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold capitalize text-green-600">
                      {statusColor(item?.status)}
                    </span>
                    <span>X{item?.quantity}</span>
                  </div>
                </div>
              </div>
            );
          },
        )}

        
      </div>
      <div className="hidden  md:block md:overflow-x-auto">
        <ProductTable
          columns={columns}
          Tdata={customerOrders}
          statusType="customer"
          filteredTabs={[]}
        />
      </div>
    </section>
  );
}
