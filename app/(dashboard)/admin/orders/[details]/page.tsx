"use client";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import img from "@/public/assets/AT0213_coconut-cream-cake_s4x3.jpg";
import { orderList } from "@/utils/adminData";
import AdminAuth from "@/components/admin-component/AdminAuth";

export default function Page({ params }: any) {
  const [order, setOrder] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const item = orderList.find(
      (item: any) => item.id === Number(params.details),
    );
    setOrder(item);
  }, [params.details]);

  const subTotal = order?.products
    ?.map((item: any) => item?.priceTo * item?.quantity)
    .reduce((acc: any, cur: any) => acc + cur, 0);

  const total = subTotal + order?.shipping + order?.tax;
  console.log(subTotal, "subTotal");

  // console.log(params, "order", order);
  return (
    <section className="min-h-screen bg-neutral-300 px-4 py-5">
      <div className="mb-5 border-b border-neutral-500 pb-5">
        <span
          className="inline-flex items-center gap-2"
          onClick={() => router.push("/admin/orders")}
        >
          <ArrowLeft />
          <span className="font-bold uppercase">Order Details</span>
        </span>
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-[55%_1fr] gap-5">
          <div className="rounded-md bg-white p-3">
            <div className="flex items-center justify-between">
              <span>Order ID: #GCF4972</span>
              <span className="items-center rounded-sm bg-green-700 px-3 text-white">
                Completed
              </span>
            </div>
            <div className="my-4 flex items-center justify-between">
              <div className="grid">
                <h3 className="text-[15px] font-semibold">Name</h3>
                <span className="text-[13.69px]">{order?.billingName}</span>
              </div>
              <div className="grid">
                <h3 className="text-[15px] font-semibold">Email</h3>
                <span className="text-[13.69px]">{order?.email}</span>
              </div>
              <div className="grid">
                <h3 className="text-[15px] font-semibold">Contact No.</h3>
                <span className="text-[13.69px]">{order?.mobile}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold"> Billing Address</h3>
                <address className="text-[13.69px]">
                  37 Wallenger Avenue, Romford, Essex, <br /> England, RM2 6EP
                </address>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold">Order Date</h3>
                <span className="text-[13.69px]">16/03/2024</span>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <div className="">
              <h3 className="mb-3 text-[15px] font-semibold">Order Note</h3>
              <p className="text-[13.69px]">
                I&apos;d love to order some of your delicious cakes for an
                upcoming celebration! Here&apos;s what I&apos;d like: Chocolate
                Fudge Cake - 8&quot;, Red Velvet Cupcakes - Dozen. Could you
                please let me know the total cost and earliest delivery date?
              </p>
            </div>

            <div>
              <h3 className="my-3 text-[15px] font-semibold">
                Shipping Address
              </h3>
              <address className="mb-4 text-[13.69px]">
                Jessica Moore <br /> Random Federation <br /> 115302, Moscow{" "}
                <br /> ul. Varshavskaya, 15-2-178
              </address>
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
                {order?.products?.map((item: any, index: number) => {
                  const productPrice = item?.priceTo * item?.quantity;
                  return (
                    <>
                      <div className="table-row">
                        <div className="table-cell py-2">
                          <div className="grid w-full grid-cols-[600px_1fr] text-[13.69px]">
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
                })}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold"> Sub Total:</span>
                <span>&euro;{subTotal}</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">Shipping:</span>
                <span>&euro;{order?.shipping}</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold"> Tax:</span>
                <span>&euro;{order?.tax}</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">Total:</span>
                <span>&euro;{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:hidden">
        <div className="rounded-md bg-white p-3">
          <h3 className="border-b border-zinc-700 pb-2 font-bold">
            Ordered Items
          </h3>
          <div className="table w-full">
            <div className="table-row-group">
              {order?.products?.map((item: any, index: number) => {
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
              })}

              <div className="table-row">
                <div className="table-cell border-b border-neutral-300 py-3">
                  <div className="grid grid-cols-1">
                    <div>
                      <h3>Sub Total</h3>
                    </div>
                  </div>
                </div>
                <div className="table-cell border-b border-neutral-300 py-3 align-top">
                  &euro;{subTotal}
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
                  &euro;{order?.shipping}
                </div>
              </div>
              <div className="table-row">
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
              </div>
              <div className="table-row">
                <div className="table-cell border-b border-neutral-300 py-3">
                  <div className="grid grid-cols-1">
                    <div>
                      <h3>Total</h3>
                    </div>
                  </div>
                </div>
                <div className="table-cell border-b border-neutral-300 py-3 align-top">
                  &euro;{total}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-white p-3">
          <div className="mb-4 grid gap-2">
            <div className="flex justify-between">
              <span>Order ID: #GCF4972</span>
              <span>
                Status:{" "}
                <span className="items-center rounded-sm bg-green-700 px-3 text-white">
                  Success
                </span>
              </span>
            </div>
            <h3 className="text-[15px] font-semibold">Shipping Address</h3>
            <address className="mb-3 text-[13.69px]">
              37 Wallenger Avenue, Romford, Essex, <br /> England, RM2 6EP
            </address>
          </div>
        </div>
        <div className="rounded-md bg-white p-3">
          <div>
            <h3 className="font-semibold">Billing Information</h3>
            <div className="my-3 border-b border-neutral-400"></div>
            <h3 className="mb-3">Neal Matthew</h3>
            <address className="mb-3 text-[13.69px]">
              37 Wallenger Avenue, Romford, Essex, <br /> England, RM2 6EP
            </address>
            <div className="mb-3">+447488855300</div>
            <div className="mb-3">nealmatthews@gmail.com</div>
          </div>
        </div>
      </div>
    </section>
  );
}
