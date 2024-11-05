"use client";
import AdminAuth from "@/components/admin-component/AdminAuth";
import CustomerOrder from "@/components/admin-component/CustomerOrder";
import { usePathname } from "next/navigation";
import React from "react";

export default function Page({ params }: any) {
  const pathName = usePathname();
  console.log(params, "hello", pathName);
  return (
    <>
      <CustomerOrder id={params.details} />
    </>
  );
}
