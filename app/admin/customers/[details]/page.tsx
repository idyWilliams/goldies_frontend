"use client";
import BillingInfo from "@/components/admin-component/customers/BillingInfo";
import ContactInfo from "@/components/admin-component/customers/ContactInfo";
import { customers } from "@/utils/adminData";
import { ArrowLeft, Call, Location, Sms } from "iconsax-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const [activeSec, setActiveSec] = useState("contact");
  const [customer, setCustomer] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const info = customers.find((info: any) => params.details * 1 === info.id);
    setCustomer(info);
  }, [params?.details]);

  console.log(params, customer);
  const handleViewMore = () => {
    if (activeSec === "contact") {
      setActiveSec("billing");
      return;
    } else if (activeSec === "billing") {
      setActiveSec("contact");
      return;
    }
  };
  return (
    <section className="px-4 py-5 lg:min-h-screen lg:bg-neutral-300 lg:px-10">
      <div className="mb-5 border-b border-neutral-500 pb-5">
        <span
          className="inline-flex items-center gap-2"
          onClick={() => router.push("/admin/customers")}
        >
          <ArrowLeft />
          <span className="font-bold uppercase">Customer Details</span>
        </span>
      </div>
      <div className="hidden grid-cols-[35%_1fr] gap-5 lg:grid">
        <ContactInfo />
        <BillingInfo />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:hidden">
        {activeSec === "contact" && <ContactInfo />}
        {activeSec === "billing" && <BillingInfo />}
        <button className="text-cyan-600" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </section>
  );
}
