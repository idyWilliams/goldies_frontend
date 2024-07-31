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
