"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { getOrderByOrderId } from "@/services/hooks/payment";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "iconsax-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { statusColor } from "../page";

const LoadingSkeleton = () => {
  return (
    <div className="grid gap-5">
      {/* Order Details Section */}
      <div className="grid grid-cols-[55%_1fr] gap-5">
        {/* Left Side: Order Info */}
        <div className="rounded-md bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-32" /> {/* Order ID */}
            <Skeleton className="h-6 w-20" /> {/* Status */}
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20" /> {/* Name Label */}
              <Skeleton className="h-5 w-36" /> {/* Name */}
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20" /> {/* Email Label */}
              <Skeleton className="h-5 w-48" /> {/* Email */}
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-24" /> {/* Contact Label */}
              <Skeleton className="h-5 w-28" /> {/* Contact No */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" /> {/* Billing Address Label */}
              <Skeleton className="h-5 w-60" /> {/* Address */}
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-24" /> {/* Order Date Label */}
              <Skeleton className="h-5 w-32" /> {/* Order Date */}
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
            <Skeleton className="h-5 w-60" /> {/* Address */}
          </div>
        </div>
      </div>
      {/* Ordered Items Section */}
      <Skeleton className="h-6 w-48" /> {/* Ordered Items Label */}
      <div className="grid grid-cols-[70%_1fr] gap-5">
        <div className="rounded-md bg-white p-6">
          {/* Table Headers */}
          <div className="grid grid-cols-[40%_15%_20%_25%] gap-5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          {/* Table Rows (3 Sample Items) */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="mt-3 grid grid-cols-[40%_15%_20%_25%] gap-5"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" /> {/* Image */}
                <Skeleton className="h-5 w-32" /> {/* Product Name */}
              </div>
              <Skeleton className="h-5 w-10" /> {/* Quantity */}
              <Skeleton className="h-5 w-14" /> {/* Price */}
              <Skeleton className="h-5 w-16" /> {/* Total */}
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

export default function Page({ params }: { params: { details: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<IOrder>();
  const [openStatus, setOpenStatus] = useState(false);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryFn: async () => getOrderByOrderId(params.details),
    queryKey: ["getOrderByOrderId", params.details],
  });

  useEffect(() => {
    if (isSuccess && data) {
      setOrder(data.order);
    }
  }, [isSuccess, data]);

  const handleUpdateStatus = (newStatus: string) => {
    setOpenStatus(false);

    // TODO: Call API to update order status
    console.log(`Order status updated to: ${newStatus}`);
  };

  return (
    <section className=" px-4 py-5">
      <div className="mb-5 flex items-center justify-between border-b border-neutral-500 pb-5">
        <span
          className="inline-flex items-center gap-2"
          onClick={() => router.push("/admin/orders")}
        >
          <ArrowLeft />
          <span className="font-bold uppercase">Order Details</span>
        </span>

        <div>
          <Popover open={openStatus} onOpenChange={setOpenStatus}>
            <PopoverTrigger asChild>
              <button className="rounded-sm bg-black px-6 py-2 text-sm text-goldie-300">
                Update Status
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-40 rounded-md border-[#E4D064] bg-[#E4D064] p-2 shadow-md">
              <div className="flex flex-col">
                <button
                  className="flex items-center gap-2 rounded-md p-2 hover:bg-black hover:bg-opacity-20 text-sm duration-300"
                  onClick={() => handleUpdateStatus("Complete")}
                >
                  Complete
                </button>
                <button
                  className="flex items-center gap-2 rounded-md p-2 hover:bg-black hover:bg-opacity-20 text-sm duration-300"
                  onClick={() => handleUpdateStatus("Cancelled")}
                >
                  Cancel
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="hidden lg:block">
            <div className="grid grid-cols-[55%_1fr] gap-5">
              <div className="rounded-md bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Order ID: {order?.orderId}
                  </span>
                  <span>{statusColor(order?.orderStatus!)}</span>
                </div>
                <div className="my-4 flex items-center justify-between">
                  <div className="grid">
                    <h3 className="text-[15px] font-semibold">Name</h3>
                    <span className="text-sm">
                      {order?.firstName + "" + order?.lastName}
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
                      {order?.streetAddress}, {order?.cityOrTown},{" "}
                      {order?.state}, {order?.country}
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
                  <p className="text-sm">
                    I&apos;d love to order some of your delicious cakes for an
                    upcoming celebration! Here&apos;s what I&apos;d like:
                    Chocolate Fudge Cake - 8&quot;, Red Velvet Cupcakes - Dozen.
                    Could you please let me know the total cost and earliest
                    delivery date?
                  </p>
                </div>

                <div>
                  <h3 className="my-3 text-[15px] font-semibold">
                    Shipping Address
                  </h3>
                  <p className="mb-4 text-sm">
                    {order?.streetAddress}, {order?.cityOrTown}, {order?.state},{" "}
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
                      <div className="table-cell border-b border-neutral-300 pb-3">
                        Product
                      </div>
                      <div className="table-cell border-b border-neutral-300 pb-3">
                        Qnty
                      </div>
                      <div className="table-cell border-b border-neutral-300 pb-3 pl-5">
                        Price
                      </div>
                      <div className="table-cell border-b border-neutral-300 pb-3 pl-5">
                        Total
                      </div>
                    </div>
                  </div>
                  <div className="table-row-group">
                    {/* {order?.products?.map((item: any, index: number) => {
                    const productPrice = item?.priceTo * item?.quantity;
                    return (
                      <>
                        <div className="table-row">
                          <div className="table-cell py-2">
                            <div className="grid w-full grid-cols-[600px_1fr] text-sm">
                              <div className="mb-3 flex items-center gap-2">
                                <Image
                                  src={item?.image?.src}
                                  alt={item?.productName}
                                  width={50}
                                  height={30}
                                  className="h-[30px] w-[30px] object-cover object-center"
                                />
                                <h3>{item?.productName}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="table-cell py-2">{item?.quantity}</div>
                          <div className="table-cell py-3 pl-5">
                            {item?.priceTo}
                          </div>
                          <div className="table-cell py-3 pl-5">
                            &euro;{productPrice}
                          </div>
                        </div>
                      </>
                    );
                  })} */}
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
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold">Total:</span>
                    <span>{formatCurrency(order?.fee?.total!, "en-NG")}</span>
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
                  {/* {order?.products?.map((item: any, index: number) => {
                  const productPrice = item?.priceTo * item?.quantity;
                  console.log(item, "orderItem");
                  return (
                    <div className="table-row" key={index}>
                      <div className="table-cell border-b border-neutral-300 py-3">
                        <div className="grid grid-cols-[50px_1fr] items-center gap-1">
                          <Image
                            src={item?.image?.src}
                            alt={item?.productName}
                            width={50}
                            height={50}
                          />
                          <div>
                            <h3>{item?.productName}</h3>
                            <span>
                              &euro;{item?.priceTo} X {item?.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell border-b border-neutral-300 py-3 align-top">
                        &euro;{productPrice}
                      </div>
                    </div>
                  );
                })} */}

                  <div className="table-row">
                    <div className="table-cell border-b border-neutral-300 py-3">
                      <div className="grid grid-cols-1">
                        <div>
                          <h3>Sub Total</h3>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell border-b border-neutral-300 py-3 align-top">
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
                    <div className="table-cell border-b border-neutral-300 py-3 align-top">
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
                    <div className="table-cell border-b border-neutral-300 py-3 align-top">
                      {formatCurrency(order?.fee?.total!, "en-NG")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white p-3">
              <div className="mb-4 grid gap-2">
                <div className="flex justify-between">
                  <span>Order ID: {order?.orderId}</span>
                  <span>
                    Status: <span>{statusColor(order?.orderStatus!)}</span>
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold">Shipping Address</h3>
                <p className="mb-3 text-sm">
                  {order?.streetAddress}, {order?.cityOrTown}, {order?.state},{" "}
                  {order?.country}
                </p>
              </div>
            </div>
            <div className="rounded-md bg-white p-3">
              <div>
                <h3 className="font-semibold">Billing Information</h3>
                <div className="my-3 border-b border-neutral-400"></div>
                <h3 className="mb-3">
                  {" "}
                  {order?.firstName + "" + order?.lastName}
                </h3>
                <p className="mb-3 text-sm">
                  {order?.streetAddress}, {order?.cityOrTown}, {order?.state},{" "}
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
