import { chunkArray } from "@/helper/chunkArray";
import { cn } from "@/helper/cn";
// import { getOrderColor } from "@/helper/getOrderColor";
import { Order, recentOrders } from "@/utils/adminData";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import React, { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import ProductTable from "../admin-component/ProductTable";

// export const recentOrders = [
//   {
//     name: "Strawberry Sponge Cake",
//     id: "B736383836hgdy73",
//     date: "2024-05-06",
//     price: "300.00",
//     status: "Pending",
//     quantity: 2,
//     // Options: Pending, Cancelled, Completed
//   },
//   {
//     name: "Chocolate Fudge Cake",
//     id: "C839383938dj38",
//     date: "2024-05-07",
//     price: "250.00",
//     status: "Delivered",
//     quantity: 1,
//   },
//   {
//     name: "Vanilla Cream Cake",
//     id: "V939383838dk39",
//     date: "2024-05-08",
//     price: "200.00",
//     status: "Cancelled",
//     quantity: 2,
//   },
//   {
//     name: "Red Velvet Cake",
//     id: "R828383828fj29",
//     date: "2024-05-09",
//     price: "320.00",
//     status: "Pending",
//     quantity: 2,
//   },
//   {
//     name: "Lemon Drizzle Cake",
//     id: "L737383727gj40",
//     date: "2024-05-10",
//     price: "180.00",
//     status: "Delivered",
//     quantity: 1,
//   },
//   {
//     name: "Carrot Cake",
//     id: "K929383728fh50",
//     date: "2024-05-11",
//     price: "270.00",
//     status: "Pending",
//     quantity: 1,
//   },
//   {
//     name: "Cheesecake",
//     id: "C826363638gh60",
//     date: "2024-05-12",
//     price: "230.00",
//     status: "Delivered",
//     quantity: 2,
//   },
//   {
//     name: "Black Forest Cake",
//     id: "B737363737hi70",
//     date: "2024-05-13",
//     price: "340.00",
//     status: "Cancelled",
//     quantity: 1,
//   },
//   {
//     name: "Pineapple Upside Down Cake",
//     id: "P826373738ij80",
//     date: "2024-05-14",
//     price: "290.00",
//     status: "Pending",
//     quantity: 3,
//   },
//   {
//     name: "Tiramisu",
//     id: "T738383939kj90",
//     date: "2024-05-15",
//     price: "310.00",
//     status: "Delivered",
//     quantity: 1,
//   },
// ];

const StatusColumn = ({ status }: { status: string }) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return (
        <span className="px-2 py-1 text-sm text-green-700 lg:bg-transparent lg:text-base lg:text-green-700">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="px-2 py-1 text-sm text-red-600  lg:bg-transparent lg:text-base lg:text-red-600">
          {status}
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 text-sm text-orange-500  lg:bg-transparent lg:text-base lg:text-orange-400">
          {status}
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 text-sm text-neutral-800  lg:bg-transparent lg:text-base lg:text-neutral-800">
          {status}
        </span>
      );
  }
};

const columnHelper = createColumnHelper<Order>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "orderID",
    header: () => <span>Order ID</span>,
    cell: (info) => (
      <span className="uppercase">
        #GOL{info?.cell?.row?.original?.id.slice(0, 4)}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "orderDate",
    header: () => <span className="whitespace-nowrap">Order Date</span>,
    cell: (info) => (
      <span className="">
        {info?.cell?.row?.original?.date.replace(/-/g, "/")}
      </span>
    ),
  }),
  columnHelper.accessor("quantity", {
    header: () => <span>Qnty</span>,
    cell: (info) => (
      <div className="">{info?.cell?.row?.original?.quantity}</div>
    ),
  }),
  columnHelper.accessor("price", {
    header: () => <span>Amount</span>,
    cell: (info) => (
      <div className="">&euro;{info?.cell?.row?.original?.price}</div>
    ),
  }),
  columnHelper.accessor("shippingFee", {
    header: () => <span>Shipping</span>,
    cell: (info) => (
      <div className="">&euro;{info?.cell?.row?.original?.shippingFee}</div>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => <StatusColumn status={info?.cell?.row?.original?.status} />,
  }),
  columnHelper.accessor((row) => row, {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: (info) => (
      <div className="flex justify-center text-neutral-600">
        <Link
          href={`/my-orders/${info?.cell?.row?.original?.id}`}
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

const Orders = () => {
  const [orders] = useState(recentOrders);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <div>
      {/* <div className="mb-4 flex items-center justify-between border-0 border-neutral-200 pb-4">
         <h2 className="text-xl font-semibold">Orders</h2>
        <p>Recent orders from the store.</p>
        <button className="rounded-md bg-black px-5 py-2 text-sm text-goldie-300">
          See all
        </button>
      </div> */}

      <div className="hide-scrollbar w-full overflow-x-auto">
        <div className="w-min lg:w-full">
          <ProductTable
            columns={columns}
            Tdata={recentOrders}
            statusType="order"
            showSearchBar={false}
            filteredTabs={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
