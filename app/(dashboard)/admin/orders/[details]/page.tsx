"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { IProduct } from "@/interfaces/product.interface";
import { getOrderByOrderId, updateOrderStatus } from "@/services/hooks/payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "iconsax-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

const LoadingSkeleton = () => {
  return (
    <div className="grid gap-5">
      {/* Order Details Section */}
      <div className="grid gap-5 lg:grid-cols-[55%_1fr]">
        {/* Left Side: Order Info */}
        <div className="rounded-md bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Skeleton className="h-5 w-32" /> {/* Order ID */}
            <Skeleton className="h-6 w-20" /> {/* Status */}
          </div>
          <div className="my-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20" /> {/* Name Label */}
              <Skeleton className="h-5 w-36" /> {/* Name */}
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20" /> {/* Email Label */}
              <Skeleton className="h-5 w-48" /> {/* Email */}
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Skeleton className="h-4 w-24" /> {/* Contact Label */}
              <Skeleton className="h-5 w-28" /> {/* Contact No */}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" /> {/* Billing Address Label */}
              <Skeleton className="h-5 w-full md:w-60" /> {/* Address */}
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-24" /> {/* Order Date Label */}
              <Skeleton className="h-5 w-full md:w-32" /> {/* Order Date */}
            </div>
          </div>
        </div>
        {/* Right Side: Order Note */}
        <div className="rounded-md bg-white p-4">
          <Skeleton className="mb-2 h-4 w-32" /> {/* Order Note Label */}
          <Skeleton className="h-20 w-full" /> {/* Placeholder Text */}
          <div className="mt-4">
            <Skeleton className="mb-2 h-4 w-36" />{" "}
            {/* Shipping Address Label */}
            <Skeleton className="h-5 w-full md:w-60" /> {/* Address */}
          </div>
        </div>
      </div>
      {/* Ordered Items Section */}
      <Skeleton className="h-6 w-48" /> {/* Ordered Items Label */}
      <div className="grid gap-5 lg:grid-cols-[70%_1fr]">
        <div className="rounded-md bg-white p-6">
          {/* Table Headers */}
          <div className="hidden gap-5 md:grid md:grid-cols-[40%_15%_20%_25%]">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Table Rows (3 Sample Items) */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="mt-3 grid gap-5 md:grid-cols-[40%_15%_20%_25%]"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" /> {/* Image */}
                <Skeleton className="h-5 w-32" /> {/* Product Name */}
              </div>
              <Skeleton className="hidden h-5 w-10 md:block" /> {/* Quantity */}
              <Skeleton className="hidden h-5 w-14 md:block" /> {/* Price */}
              <Skeleton className="hidden h-5 w-16 md:block" /> {/* Total */}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="rounded-md bg-white p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-3 flex items-center justify-between">
              <Skeleton className="h-5 w-24" /> {/* Label */}
              <Skeleton className="h-5 w-16" /> {/* Value */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-10 px-3 py-[2px] text-sm text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          Completed
        </div>
      );
    case "cancelled":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-10 px-3 py-[2px] text-sm text-red-700">
          <span className="h-2 w-2 rounded-full bg-red-700"></span> Cancelled
        </div>
      );
    case "pending":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-orange-600 bg-orange-600 bg-opacity-10 px-3 py-[2px] text-sm text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-600"></span> Pending
        </div>
      );
    default:
      return;
  }
};

export default function Page({ params }: { params: { details: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();
  const [openStatus, setOpenStatus] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, isSuccess, isError, isLoading, refetch } = useQuery({
    queryFn: async () => getOrderByOrderId(params.details),
    queryKey: ["getOrderByOrderId", params.details],
  });

  const updateStatus = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setOrder(data.order);
    }
  }, [isSuccess, data]);

  const handleUpdateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await updateStatus.mutateAsync({
        id: params.details,
        orderStatus: newStatus,
      });
      toast.success(
        newStatus === "completed"
          ? "The order has been marked as completed!"
          : "The order has been cancelled.",
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setOpenStatus(false);
      setIsUpdating(false);
    }
  };

  return (
    <section className=" px-4 py-5">
      <div className="mb-5 flex items-center justify-between border-b border-neutral-500 pb-5">
        <span
          className="inline-flex cursor-pointer items-center gap-2"
          onClick={() => router.push("/admin/orders")}
        >
          <ArrowLeft />
          <span className="font-bold uppercase">Order Details</span>
        </span>

        {order?.orderStatus === "pending" && (
          <div>
            <Popover open={openStatus} onOpenChange={setOpenStatus}>
              <PopoverTrigger asChild>
                <button
                  className="relative rounded-sm bg-black px-6 py-2 text-sm text-brand-200 disabled:pointer-events-none disabled:opacity-75"
                  disabled={isUpdating}
                >
                  <span
                    className={`${isUpdating ? "block" : "hidden"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <CgSpinner className=" h-6 w-6  animate-spin " />
                  </span>

                  <span
                    className={`${isUpdating ? "opacity-0" : "opacity-100"}`}
                  >
                    Update Status
                  </span>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-40 rounded-md border-[#E4D064] bg-[#E4D064] p-2 shadow-md">
                <div className="flex flex-col">
                  <button
                    className="flex items-center gap-2 rounded-md p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    onClick={() => handleUpdateStatus("completed")}
                  >
                    Completed
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-md p-2 text-sm duration-300 hover:bg-black hover:bg-opacity-20"
                    onClick={() => handleUpdateStatus("cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="hidden md:block">
            <div className="grid grid-cols-[55%_1fr] gap-5">
              <div className="rounded-md bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Order ID: {order?.orderId}
                  </span>
                  <span>
                    <span className="mr-1 text-[15px] font-semibold">
                      Status
                    </span>{" "}
                    {statusColor(order?.orderStatus!)}
                  </span>
                </div>
                <div className="my-4 flex items-center justify-between">
                  <div className="grid">
                    <h3 className="text-[15px] font-semibold">Name</h3>
                    <span className="text-sm">
                      {order?.firstName + " " + order?.lastName}
                    </span>
                  </div>
                  <div className="grid">
                    <h3 className="text-[15px] font-semibold">Email</h3>
                    <span className="text-sm">{order?.email}</span>
                  </div>
                  <div className="grid">
                    <h3 className="text-[15px] font-semibold">Contact No.</h3>
                    <span className="text-sm">{`+${order?.phoneNumber}`}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold">
                      {" "}
                      Billing Address
                    </h3>
                    <p className="text-sm">
                      {order?.streetAddress} <br />
                      {order?.cityOrTown}, {order?.state}
                      <br />
                      {order?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold">Order Date</h3>
                    <span className="text-sm">
                      {moment(order?.createdAt).format("MMM DD, YYYY HH:mm A")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white p-4">
                <div className="">
                  <h3 className="mb-3 text-[15px] font-semibold">Order Note</h3>
                  <ul className="list-disc pl-4">
                    {order?.orderedItems.map((item, i) => (
                      <li key={i}>
                        <span className="italic">{item?.product?.name}</span>-{" "}
                        {item?.details}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="my-3 text-[15px] font-semibold">
                    Shipping Address
                  </h3>
                  <p className="mb-4 text-sm">
                    {order?.streetAddress} <br />
                    {order?.cityOrTown}, {order?.state}
                    <br />
                    {order?.country}
                  </p>
                </div>
              </div>
            </div>
            <h3 className="my-4 text-[15px] font-semibold">Ordered Items</h3>
            <div className="grid grid-cols-[70%_1fr] gap-5">
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
                              parseInt(item?.product?.maxPrice) *
                                item?.quantity,
                              "en-NG",
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white p-4">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold"> Sub Total:</span>
                    <span>
                      {formatCurrency(order?.fee?.subTotal!, "en-NG")}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold">Shipping:</span>
                    <span>
                      {formatCurrency(order?.fee?.deliveryFee!, "en-NG")}
                    </span>
                  </div>
                  {/* <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold"> Tax:</span>
                  <span>{formatCurrency(order?.fee?.subTotal!, "en-NG")}</span>
                </div> */}
                  <div className="mb-3 flex items-center justify-between ">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">
                      {formatCurrency(order?.fee?.total!, "en-NG")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="grid gap-4 md:hidden">
            <div className="rounded-md bg-white p-3">
              <h3 className="border-b border-zinc-700 pb-2 font-bold">
                Ordered Items
              </h3>
              <div className="table w-full">
                <div className="table-row-group">
                  {order?.orderedItems?.map((item, index) => {
                    return (
                      <div className="table-row" key={index}>
                        <div className="table-cell border-b border-neutral-300 py-3">
                          <div className="grid grid-cols-[50px_1fr] items-center gap-1">
                            <div className="h-[50px] w-[50px] overflow-hidden">
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
                        </div>
                        <div className="table-cell border-b border-neutral-300 py-3 text-right align-top">
                          {formatCurrency(
                            parseInt(item?.product?.maxPrice),
                            "en-NG",
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="table-row">
                    <div className="table-cell border-b border-neutral-300 py-3">
                      <div className="grid grid-cols-1">
                        <div>
                          <h3>Sub Total</h3>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell border-b border-neutral-300 py-3 text-right">
                      {formatCurrency(order?.fee?.subTotal!, "en-NG")}
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-cell border-b border-neutral-300 py-3">
                      <div className="grid grid-cols-1">
                        <div>
                          <h3>Shipping</h3>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell border-b border-neutral-300 py-3 text-right">
                      {formatCurrency(order?.fee?.deliveryFee!, "en-NG")}
                    </div>
                  </div>
                  {/* <div className="table-row">
                  <div className="table-cell border-b border-neutral-300 py-3">
                    <div className="grid grid-cols-1">
                      <div>
                        <h3>Tax</h3>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell border-b border-neutral-300 py-3 align-top">
                    &euro;{order?.tax}
                  </div>
                </div> */}
                  <div className="table-row">
                    <div className="table-cell border-b border-neutral-300 py-3">
                      <div className="grid grid-cols-1">
                        <div>
                          <h3>Total</h3>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell border-b border-neutral-300 py-3 text-right">
                      {formatCurrency(order?.fee?.total!, "en-NG")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white p-3">
              <div className="mb-4 grid gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Order ID: {order?.orderId}
                  </span>
                  <span>{statusColor(order?.orderStatus!)}</span>
                </div>
                <h3 className="text-[15px] font-semibold">Shipping Address</h3>
                <p className="mb-3 text-sm">
                  {order?.streetAddress} <br />
                  {order?.cityOrTown}, {order?.state}
                  <br />
                  {order?.country}
                </p>
              </div>
            </div>
            <div className="rounded-md bg-white p-3">
              <div>
                <h3 className="font-semibold">Billing Information</h3>
                <div className="my-3 border-b border-neutral-400"></div>
                <h3 className="mb-3 font-semibold">
                  {" "}
                  {order?.firstName + " " + order?.lastName}
                </h3>
                <p className="mb-3 text-sm">
                  {order?.streetAddress} <br />
                  {order?.cityOrTown}, {order?.state}
                  <br />
                  {order?.country}
                </p>
                <div className="mb-3">{`+${order?.phoneNumber}`}</div>
                <div className="mb-3">{order?.email}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
