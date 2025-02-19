"use client";
import CustomerOrder from "@/components/admin-component/CustomerOrder";

export default function Page({ params }: { params: { details: string } }) {
  return (
    <>
      <CustomerOrder id={params.details} />
    </>
  );
}
