import Layout from "@/components/Layout";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import React from "react";

const MyOrderDetails = () => {
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
              <span className="text-2xl font-semibold">Order Details</span>
            </Link>
          </div>
          <hr className="mb-8 border-0 border-b pb-3 " />

          <div>
            <div className="rounded-md bg-white p-4">
              {/* <ul className="space-y-3">
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
                      <span>&euro;{order?.shippingFee + order?.price * 1}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Date:</span>
                    <button className="inline-flex items-center gap-2 bg-neutral-900 px-2 py-1 text-sm text-goldie-300">
                      <span>View</span> <Eye size={20} />
                    </button>
                  </div>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyOrderDetails;
