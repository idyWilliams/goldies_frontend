"use client";
import { ArrowLeft, Eye } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import RedVelvet from "@/public/assets/red-velvet-cake.webp";
import Chocolate from "@/public/assets/birthday-cake.webp";
import Image from "next/image";
import ProductTable from "@/components/admin-component/ProductTable";
import { createColumnHelper } from "@tanstack/react-table";
import { recentOrders } from "@/utils/adminData";
import { useQuery } from "@tanstack/react-query";
import { getOrderByOrderId } from "@/services/hooks/payment";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder, IOrderProduct } from "@/interfaces/order.interface";

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

const MyOrderDetails = ({ params }: { params: { order: string } }) => {
  const { order: id } = params;
  const [order, setOrder] = useState<IOrder>();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getOrderByOrderId", id],
    queryFn: async () => getOrderByOrderId(id),
  });

  useEffect(() => {
    if (!isLoading && data) {
      setOrder(data.order);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <div className="py-0">
            <Skeleton className="h-8 w-24" />
          </div>
          <hr className="mb-4 border-0 border-b pb-3" />
          <div className="space-y-5 lg:hidden">
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
                <li>
                  <Skeleton className="h-6 w-full" />
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:mx-auto lg:block xl:max-w-[90%]">
            <div className="rounded-md bg-white p-5">
              <Skeleton className="h-8 w-24" />
              <div className="mt-3 flex justify-between">
                <div className="flex flex-col gap-5">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="flex flex-col gap-5">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Skeleton className="h-64 w-full" />
              <div className="mt-5 flex justify-end">
                <Skeleton className="h-24 w-[300px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    <div className="py-5 text-center">
      <p className="mb-4 text-center text-red-500">
        Failed to load order details. Please try again.
      </p>

      <Button onClick={() => refetch()}>Retry</Button>
    </div>;
  }

  if (!order) {
    return <div>No order details available.</div>;
  }

  console.log(">>>>order>>>> " + order);
  return (
    <section className="bg-neutral-100 py-6">
      <div className="wrapper">
        <div className="py-0">
          <Link href={"/my-orders"} className="inline-flex items-center gap-2">
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
                  {order.orderId}

                  <span>
                    <StatusColumn status={order?.orderStatus} />
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                  <span>Name</span>
                  <span>
                    {order?.firstName} {order?.lastName}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  <span>
                    <span>{order?.email}</span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                  <span>Contact No</span>
                  <span>
                    <span>{order?.phoneNumber}</span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span>Order Date:</span>
                  <span>
                    {moment(order?.createdAt).format("MMM DD, YYYY HH:mm A")}
                  </span>
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
                    {order?.streetAddress}, {order?.cityOrTown},{order?.country}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex flex-col">
                  <h3 className="mb-1 font-medium">Shipping Address</h3>
                  <p className="text-neutral-600">
                    {order?.streetAddress}, {order?.cityOrTown},{order?.country}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-md bg-white p-4">
            <ul className="divide-y divide-gray-200">
              {order?.orderedItems?.map((item) => (
                <>
                  <li>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-4">
                        <div className="h-[50px] w-[50px] shrink-0 overflow-hidden">
                          <Image
                            src={item?.product?.images[0]}
                            alt={item?.product?.name}
                            width={50}
                            height={30}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3>{item?.product?.name}</h3>
                          <span>x{item?.quantity}</span>
                        </div>
                      </div>
                      <span>
                        {formatCurrency(
                          parseInt(item?.product?.maxPrice),
                          "en-NG",
                        )}
                      </span>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>

          <div className="rounded-md bg-white p-4">
            <ul className="space-y-3">
              <li>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>
                    <span>{formatCurrency(order?.fee?.deliveryFee, "en-NG")}</span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between border-t bg-goldie-50 px-1 py-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                  {formatCurrency(order?.fee?.total!, "en-NG")}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:mx-auto lg:block xl:max-w-[90%]">
          {/* ORDER DETAILS */}
          <div className="rounded-md bg-white p-5">
            <span className="font-semibold ">{order.orderId}</span>

            <div className="mt-3 flex justify-between">
              <div className="flex flex-col gap-5">
                <ul>
                  <li className="font-medium">Name</li>
                  <li className="text-neutral-600">
                    {order?.firstName} {order?.lastName}
                  </li>
                </ul>
                <ul>
                  <li className="font-medium">Email</li>
                  <li className="text-neutral-600">{order?.email}</li>
                </ul>
                <ul>
                  <li className="font-medium">Billing Address</li>
                  <li className="text-neutral-600">
                    {order?.streetAddress}, {order?.cityOrTown},{order?.country}
                  </li>
                </ul>
                <ul>
                  <li className="font-medium">Shipping Address</li>
                  <li className="text-neutral-600">
                    {order?.streetAddress}, {order?.cityOrTown},{order?.country}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <ul>
                  <li className="font-medium">Status</li>
                  <li>{getStatus(order?.orderStatus)}</li>
                </ul>
                <ul>
                  <li className="font-medium">Contact No</li>
                  <li className="text-neutral-600">{order?.phoneNumber}</li>
                </ul>
                <ul>
                  <li className="font-medium">Order Date</li>
                  <li className="text-neutral-600">
                    {moment(order?.createdAt).format("MMM DD, YYYY HH:mm A")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ORDER ITEMS TABLE */}
          <div className="mt-5">
            <div className="rounded-md bg-white p-6">
              <div className="table w-full table-auto border-collapse">
                <div className="table-header-group">
                  <div className="table-row">
                    <div className="table-cell border-b border-neutral-300 pb-3 font-bold">
                      Product
                    </div>
                    <div className="table-cell border-b border-neutral-300 pb-3 font-bold">
                      Qty
                    </div>
                    <div className="table-cell border-b border-neutral-300 pb-3 pl-5 font-bold">
                      Price
                    </div>
                    <div className="table-cell border-b border-neutral-300 pb-3 pl-5 font-bold">
                      Total
                    </div>
                  </div>
                </div>
                <div className="table-row-group divide-y divide-gray-200">
                  {order?.orderedItems?.map((item, index) => {
                    return (
                      <div key={index} className="table-row">
                        <div className="table-cell py-2">
                          <div className="grid w-full grid-cols-[600px_1fr] text-sm">
                            <div className=" flex items-center gap-2">
                              <div className="h-[50px] w-[50px] overflow-hidden">
                                <Image
                                  src={item?.product?.images[0]}
                                  alt={item?.product?.name}
                                  width={50}
                                  height={30}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <h3>{item?.product?.name}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="table-cell py-2 align-top">
                          {item?.quantity}
                        </div>
                        <div className="table-cell py-3 pl-5 text-right align-top">
                          {formatCurrency(
                            parseInt(item?.product?.maxPrice),
                            "en-NG",
                          )}
                        </div>
                        <div className="table-cell py-3 pl-5 text-right align-top">
                          {formatCurrency(
                            parseInt(item?.product?.maxPrice) * item?.quantity,
                            "en-NG",
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className=" mt-5 flex justify-end">
              <div className="flex w-[300px] flex-col gap-3 bg-white p-4">
                <div className="inline-flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order?.fee?.subTotal!, "en-NG")}</span>
                </div>
                <div className="inline-flex items-center justify-between">
                  <span>Shipping</span>
                  <span>
                    {formatCurrency(order?.fee?.deliveryFee!, "en-NG")}
                  </span>
                </div>
                <div className="inline-flex items-center justify-between border-t pt-3">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    {formatCurrency(order?.fee?.total!, "en-NG")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrderDetails;
