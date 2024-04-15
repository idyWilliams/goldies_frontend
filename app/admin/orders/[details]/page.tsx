"use client";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import img from "../../../../public/assets/AT0213_coconut-cream-cake_s4x3.jpg";

export default function Page({ params }: any) {
  const router = useRouter();
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
      <div className="bg-white p-3">
        <div className="mb-4 grid gap-2">
          <span>Product ID: #GCF4972</span>
          <span>Billing Name: John Doe</span>
          <span>
            Status:{" "}
            <span className="items-center rounded-sm bg-green-700 px-3 text-white">
              Success
            </span>
          </span>
        </div>
        <h3 className="mb-2 border-b border-zinc-700 pb-2 font-bold">
          Ordered Items
        </h3>
        <div className="table w-full">
          <div className="hidden lg:table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">Song</div>
              <div className="table-cell text-left">Artist</div>
              <div className="table-cell text-left">Year</div>
            </div>
          </div>
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell">
                <div className="grid grid-cols-[50px_1fr] items-center gap-1">
                  <Image src={img} alt="" />
                  <div>
                    <h3>Chocolate Fudge Cake</h3>
                    <span>&euro;200 X 2</span>
                  </div>
                </div>
              </div>
              <div className="table-cell align-top">&euro;400</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
