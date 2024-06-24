"use client";

import Layout from "@/components/Layout";
import { ArrowLeft, Eye } from "iconsax-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { recentOrders } from "../page";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import RedVelvet from "../../../public/assets/red-velvet-cake.webp";
import Chocolate from "../../../public/assets/birthday-cake.webp";
import Image from "next/image";
import { cn } from "@/helper/cn";
import ProductTable from "@/components/admin-component/ProductTable";
import { createColumnHelper } from "@tanstack/react-table";

function getStatus(status: string) {
  switch (status?.toLowerCase()) {
    case "delivered":
      return (
        <span className="border-green-700 bg-green-700 bg-opacity-25 px-2 py-1 text-sm text-green-700">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="border-red-600 bg-red-600 bg-opacity-25 px-2 py-1 text-sm text-red-600">
          {status}
        </span>
      );
    case "pending":
      return (
        <span className="border-orange-400 bg-orange-500 bg-opacity-25 px-2 py-1 text-sm text-orange-400">
          {status}
        </span>
      );
    default:
      return (
        <span className="border-neutral-800 bg-neutral-800 bg-opacity-25 px-2 py-1 text-sm text-neutral-800">
          {status}
        </span>
      );
  }
}

// const columnHelper = createColumnHelper<MyOrders>();
// const columns = [
//   columnHelper.accessor((row) => row, {
//     id: "orderID",
//     header: () => <span>Order ID</span>,
//     cell: (info) => (
//       <span className="uppercase">
//         #GOL{info.cell.row.original.id.slice(0, 4)}
//       </span>
//     ),
//   }),
//   columnHelper.accessor((row) => row, {
//     id: "orderDate",
//     header: () => <span>Order Date</span>,
//     cell: (info) => (
//       <span className="">{info.cell.row.original.date.replace(/-/g, "/")}</span>
//     ),
//   }),
//   columnHelper.accessor("quantity", {
//     header: () => <span>Qnty</span>,
//     cell: (info) => <div className="">{info.cell.row.original.quantity}</div>,
//   }),
//   columnHelper.accessor("price", {
//     header: () => <span>Amount</span>,
//     cell: (info) => (
//       <div className="">&euro;{info.cell.row.original.price}</div>
//     ),
//   }),
//   columnHelper.accessor("shippingFee", {
//     header: () => <span>Shipping</span>,
//     cell: (info) => (
//       <div className="">&euro;{info.cell.row.original.shippingFee}</div>
//     ),
//   }),
//   columnHelper.accessor("status", {
//     header: () => <span>Status</span>,
//     cell: (info) => <StatusColumn status={info.cell.row.original.status} />,
//   }),
//   columnHelper.accessor((row) => row, {
//     id: "action",
//     header: () => <div className="text-center">Action</div>,
//     cell: (info) => (
//       <div className="flex justify-center text-neutral-600">
//         <Link
//           href={`/my-orders/${info.cell.row.original.id}`}
//           className="cursor-pointer"
//           id="my-anchor-element-id"
//         >
//           <Eye />
//         </Link>
//         <Tooltip
//           anchorSelect="#my-anchor-element-id"
//           content="view order"
//           place="left"
//         />
//       </div>
//     ),
//   }),
// ];

const MyOrderDetails = ({ params }: { params: any }) => {
  const { order: id } = params;
  const [order, setOrder] = useState<any>();

  useEffect(() => {
    const orderDetails = recentOrders.find((order) => order?.id === id);

    console.log(orderDetails);

    setOrder(orderDetails);
  }, [params]);

  return (
    <Layout>
      <div className="mt-[64px]" />
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <div className="py-0">
            <Link
              href={"/my-orders"}
              className="inline-flex items-center gap-2"
            >
              <span className="">
                <ArrowLeft />
              </span>
              <span className="text-lg font-semibold md:text-2xl">
                Order Details
              </span>
            </Link>
          </div>
          <hr className="mb-4 border-0 border-b pb-3 " />

          <div className="space-y-5 lg:hidden">
            <div className="rounded-md bg-white p-4">
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
                    <span>Name</span>
                    <span>John Doe</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Email</span>
                    <span>
                      <span>johndoe@gmail.com</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Contact No</span>
                    <span>
                      <span>+449093746253</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Order Date:</span>
                    <span>{order?.date.replace(/-/g, "/")}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <div className="flex flex-col  bg-goldie-50 px-1 py-2">
                    <h3 className="mb-1 font-medium">Billing Address</h3>
                    <p className="text-neutral-600">
                      37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col">
                    <h3 className="mb-1 font-medium">Shipping Address</h3>
                    <p className="text-neutral-600">
                      37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                      <Image
                        src={Chocolate}
                        alt="chocolate cake"
                        width={100}
                        height={55}
                        className="h-[55px] w-full object-cover"
                      />
                      <div>
                        <h3>Chocolate Fudge Cake</h3>
                        <span>1 Qty</span>
                      </div>
                    </div>
                    <span>€508.98</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                      <Image
                        src={RedVelvet}
                        alt="Redvelvet cake"
                        width={100}
                        height={55}
                        className="h-[55px] w-full object-cover"
                      />
                      <div>
                        <h3>Red Velvet Cake</h3>
                        <span>1 Qty</span>
                      </div>
                    </div>
                    <span>€508.98</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Category</span>
                    <span>
                      <span>Milestone Cakes</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Subcategory</span>
                    <span>
                      <span>Birthday Cakes</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Price</span>
                    <span>
                      <span>&euro;{order?.price}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>
                      <span>&euro;{order?.shippingFee}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between border-t bg-goldie-50 px-1 py-2">
                    <span>Total</span>
                    <span>
                      <span>&euro;{order?.shippingFee + order?.price * 1}</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden rounded-md bg-white p-5 lg:block">
            <span>Order ID : #GOL{order?.id?.slice(0, 4)}</span>
            <div className="flex justify-between">
              <ul>
                <li>Name</li>
                <li>John Doe</li>
              </ul>
              <ul>
                <li>Status</li>
                <li>{getStatus(order?.status)}</li>
              </ul>
            </div>
            <div className="flex justify-between">
              <ul>
                <li>Email</li>
                <li>johndoe@gmail.com</li>
              </ul>
              <ul>
                <li>Contact No</li>
                <li>+449387645218</li>
              </ul>
            </div>
            <div className="flex justify-between">
              <ul>
                <li>Billing Address</li>
                <li> 37 Wallenger Avenue, Romford, Essex, England, RM2 6EP</li>
              </ul>
              <ul>
                <li>Order Date</li>
                <li>{order?.date}</li>
              </ul>
            </div>
            <ul>
              <li>Shipping Address</li>
              <li> 37 Wallenger Avenue, Romford, Essex, England, RM2 6EP</li>
            </ul>
          </div>
          <div>
            {/* <ProductTable
              columns={columns}
              Tdata={recentOrders}
              filteredTabs={["All", "Pending", "Delivered", "Cancelled"]}
            /> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyOrderDetails;
