"use client";
import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";

import React from "react";

export default function Page({ params }: any) {
  const router = useRouter();
  return (
    <section className="min-h-screen bg-neutral-300 px-4 py-5">
      <div className="mb-5 border-b border-neutral-500 pb-5">
        <span
          className="inline-flex items-center gap-2"
          onClick={() => router.push("/admin/customers")}
        >
          <ArrowLeft />
          <span className="font-bold uppercase">Customer Details</span>
        </span>
      </div>
    </section>
  );
}
