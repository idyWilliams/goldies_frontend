"use client";

import Layout from "@/components/Layout";
import { ArrowLeft, Eye } from "iconsax-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import RedVelvet from "../../../public/assets/red-velvet-cake.webp";
import Chocolate from "../../../public/assets/birthday-cake.webp";
import Image from "next/image";
import { cn } from "@/helper/cn";
import ProductTable from "@/components/admin-component/ProductTable";
import { createColumnHelper } from "@tanstack/react-table";
import { recentOrders } from "@/utils/adminData";

type MyOrderList = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number;
  category: string;
  total: number;
};

function getStatus(status: string) {
  switch (status?.toLowerCase()) {
    case "delivered":
      return (
        <span className="rounded-full border border-green-700 bg-green-700 bg-opacity-10 px-3 py-1 text-green-700">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="rounded-full border border-red-600 bg-red-600 bg-opacity-10 px-3 py-1 text-red-600">
          {status}
        </span>
      );
    case "pending":
      return (
        <span className="rounded-full border border-orange-400 bg-orange-500 bg-opacity-10 px-3 py-1 text-orange-400">
          {status}
        </span>
      );
    default:
      return (
        <span className="rounded-full border border-neutral-800 bg-neutral-800 bg-opacity-10 px-3 py-1 text-neutral-800">
          {status}
        </span>
      );
  }
}

const orderItems = [
  {
    id: 0,
    name: "Chocolate Fudge Cake",
    image: Chocolate,
    price: 508.98,
    quantity: 1,
    category: "Milestone Cakes",
    total: 508.98,
  },
  {
    id: 1,
    name: "Red Velvet Cake",
    image: RedVelvet,
    price: 100.0,
    quantity: 1,
    category: "Milestone Cakes",
    total: 100.0,
  },
];

const columnHelper = createColumnHelper<MyOrderList>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "product",
    header: () => <span>Product</span>,
    cell: (info) => (
      <div className="grid grid-cols-[70px_1fr] items-center gap-2">
        <Image
          src={info.cell.row.original.image}
          alt={info.cell.row.original.name}
          className="h-[50px] w-full object-cover"
        />
        <span>{info.cell.row.original.name}</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "category",
    header: () => <span>Category</span>,
    cell: (info) => <span className="">{info.cell.row.original.category}</span>,
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
  columnHelper.accessor("total", {
    header: () => <span>Shipping</span>,
    cell: (info) => (
      <div className="">&euro;{info.cell.row.original.total}</div>
    ),
  }),
];

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
          <div className="hidden lg:mx-auto lg:block xl:max-w-[90%]">
            {/* ORDER DETAILS */}
            <div className="rounded-md bg-white p-5">
              <span className="font-semibold ">
                Order ID : #GOL{order?.id?.slice(0, 4)}
              </span>

              <div className="mt-3 flex justify-between">
                <div className="flex flex-col gap-5">
                  <ul>
                    <li className="font-medium">Name</li>
                    <li className="text-neutral-600">John Doe</li>
                  </ul>{" "}
                  <ul>
                    <li className="font-medium">Email</li>
                    <li className="text-neutral-600">johndoe@gmail.com</li>
                  </ul>
                  <ul>
                    <li className="font-medium">Billing Address</li>
                    <li className="text-neutral-600">
                      37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                    </li>
                  </ul>
                  <ul>
                    <li className="font-medium">Shipping Address</li>
                    <li className="text-neutral-600">
                      37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-5">
                  <ul>
                    <li className="font-medium">Status</li>
                    <li>{getStatus(order?.status)}</li>
                  </ul>
                  <ul>
                    <li className="font-medium">Contact No</li>
                    <li className="text-neutral-600">+449387645218</li>
                  </ul>
                  <ul>
                    <li className="font-medium">Order Date</li>
                    <li className="text-neutral-600">{order?.date}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS TABLE */}
            <div className="mt-5">
              <ProductTable
                columns={columns}
                Tdata={orderItems}
                filteredTabs={[]}
                showSearchBar={false}
              />

              <div className=" mt-5 flex justify-end">
                <div className="flex w-[300px] flex-col gap-3 bg-white p-4">
                  <div className="inline-flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>€608.98</span>
                  </div>
                  <div className="inline-flex items-center justify-between">
                    <span>Tax</span>
                    <span>€50.50</span>
                  </div>
                  <div className="inline-flex items-center justify-between border-t pt-3">
                    <span>Total</span>
                    <span>€659.48</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyOrderDetails;
