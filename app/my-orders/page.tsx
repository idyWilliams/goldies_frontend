"use client";
import Layout from "@/components/Layout";
import ProductTable from "@/components/admin-component/ProductTable";
import Pagination from "@/components/custom-filter/Pagination";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import EachElement from "@/helper/EachElement";
import { chunkArray } from "@/helper/chunkArray";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

type MyOrders = {
  name: string;
  id: string;
  date: string;
  price: string;
  status: string;
  total: number;
  shippingFee: number;
  quantity: number;
};

export const recentOrders = [
  {
    name: "Strawberry Sponge Cake",
    id: "B736383836hgdy73",
    date: "2024-05-06",
    price: "300.00",
    status: "Pending", // Options: Pending, Cancelled",Delivered
    total: 100,
    shippingFee: 5.5,
    quantity: 2,
  },
  {
    name: "Chocolate Fudge Cake",
    id: "C839383938dj38",
    date: "2024-05-07",
    price: "250.00",
    status: "Delivered",
    total: 100,
    quantity: 1,
    shippingFee: 5.5,
  },
  {
    name: "Vanilla Cream Cake",
    id: "V939383838dk39",
    date: "2024-05-08",
    price: "200.00",
    status: "Cancelled",
    total: 100,
    shippingFee: 5.5,
    quantity: 2,
  },
  {
    name: "Red Velvet Cake",
    id: "R828383828fj29",
    date: "2024-05-09",
    price: "320.00",
    status: "Pending",
    total: 100,
    shippingFee: 5.5,
    quantity: 3,
  },
  {
    name: "Lemon Drizzle Cake",
    id: "L737383727gj40",
    date: "2024-05-10",
    price: "180.00",
    status: "Delivered",
    total: 100,
    shippingFee: 5.5,
    quantity: 1,
  },
  {
    name: "Carrot Cake",
    id: "K929383728fh50",
    date: "2024-05-11",
    price: "270.00",
    status: "Pending",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Cheesecake",
    id: "C826363638gh60",
    date: "2024-05-12",
    price: "230.00",
    status: "Delivered",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Black Forest Cake",
    id: "B737363737hi70",
    date: "2024-05-13",
    price: "340.00",
    status: "Cancelled",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Pineapple Upside Down Cake",
    id: "P826373738ij80",
    date: "2024-05-14",
    price: "290.00",
    status: "Pending",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Tiramisu",
    id: "T738383939kj90",
    date: "2024-05-15",
    price: "310.00",
    status: "Delivered",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
];

const columnHelper = createColumnHelper<MyOrders>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "orderID",
    header: () => <span>Order ID</span>,
    cell: (info) => (
      <span className="uppercase">
        #GOL{info.cell.row.original.id.slice(0, 4)}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "orderDate",
    header: () => <span>Order Date</span>,
    cell: (info) => (
      <span className="">{info.cell.row.original.date.replace(/-/g, "/")}</span>
    ),
  }),
  columnHelper.accessor("quantity", {
    header: () => <span>Qnty</span>,
    cell: (info) => <div className="">{info.cell.row.original.quantity}</div>,
  }),
  columnHelper.accessor("price", {
    header: () => <span>Amount</span>,
    cell: (info) => (
      <div className="">&euro;{info.cell.row.original.price}</div>
    ),
  }),
  columnHelper.accessor("shippingFee", {
    header: () => <span>Shipping</span>,
    cell: (info) => (
      <div className="">&euro;{info.cell.row.original.shippingFee}</div>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => <StatusColumn status={info.cell.row.original.status} />,
  }),
  columnHelper.accessor((row) => row, {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: (info) => (
      <div className="flex justify-center text-neutral-600">
        <Link
          href={`/my-orders/${info.cell.row.original.id}`}
          className="cursor-pointer"
          id="my-anchor-element-id"
        >
          <Eye />
        </Link>
        <Tooltip
          anchorSelect="#my-anchor-element-id"
          content="view order"
          place="left"
        />
      </div>
    ),
  }),
];

let itemsPerPage = 6;

const MyOrders = () => {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [myOrders, setMyOrders] = useState(recentOrders);
  const [selectedTabs, setSelectedTabs] = useState("All");
  const [filteredData, setFilteredData] = useState(recentOrders);
  const handleTabClick = (status: string) => {
    setSelectedTabs(status);
    if (status === "All") {
      setFilteredData(recentOrders);
    } else {
      setFilteredData(
        recentOrders.filter(
          (item) => item?.status.toLowerCase() === status.toLowerCase(),
        ),
      );
    }
  };

  const handleNext = () => {
    if (currentPageIndex !== chunkArray(myOrders, itemsPerPage).length) {
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

  return (
    <Layout>
      <div className="mt-[64px]" />
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <h1 className="mb-8 border-b pb-3 text-2xl font-semibold">
            All Orders
          </h1>

          <div className="lg:hidden">
            <div className="flex gap-1">
              <EachElement
                of={["All", "Pending", "Delivered", "Cancelled"]}
                render={(tabs: string, index: number) => (
                  <button
                    key={index}
                    className={`w-fit rounded-sm border px-2 ${selectedTabs === tabs ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
                    onClick={() => {
                      handleTabClick(tabs);
                    }}
                  >
                    {tabs}
                  </button>
                )}
              />
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <EachElement
                of={
                  chunkArray(filteredData, itemsPerPage)[currentPageIndex - 1]
                }
                render={(order: any, index: any) => {
                  return (
                    <div key={index} className="rounded-md bg-white p-4">
                      <ul className="space-y-3">
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Order ID: #GOL{order?.id.slice(0, 4)}</span>
                            <span>
                              <StatusColumn status={order?.status} />
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                            <span>Order Quantity</span>
                            <span>{order?.quantity} products</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Amount</span>
                            <span>
                              <span>&euro;{order?.price}</span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                            <span>Shipping</span>
                            <span>
                              <span>&euro;{order?.shippingFee}</span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between border-t pt-2">
                            <span>Total</span>
                            <span>
                              <span>
                                &euro;{order?.shippingFee + order?.price * 1}
                              </span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Date:</span>
                            <button
                              onClick={() =>
                                router.push(`/my-orders/${order?.id}`)
                              }
                              className="inline-flex items-center gap-2 bg-neutral-900 px-2 py-1 text-sm text-goldie-300"
                            >
                              <span>View</span> <Eye size={20} />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                }}
              />
            </div>

            <Pagination
              className="bg-transparent"
              onNext={handleNext}
              onPrev={handlePrev}
              onPaginateClick={handlePaginateClick}
              itemsPerPage={itemsPerPage}
              currentPageIndex={currentPageIndex}
              arr={myOrders}
            />
          </div>

          <div className="hidden lg:block">
            <ProductTable
              columns={columns}
              Tdata={recentOrders}
              statusType="order"
              filteredTabs={["All", "Pending", "Delivered", "Cancelled"]}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyOrders;
