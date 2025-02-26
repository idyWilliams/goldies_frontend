"use client";
import BillingInfo from "@/components/admin-component/customers/BillingInfo";
import ContactInfo from "@/components/admin-component/customers/ContactInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { IUser } from "@/interfaces/user.interface";
import { getUserById } from "@/services/hooks/admin-auth";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { details: string } }) {
  // const [activeSec, setActiveSec] = useState("contact");
  const [customer, setCustomer] = useState<IUser>();
  const router = useRouter();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryFn: async () => getUserById(params.details),
    queryKey: ["getUserById", params.details],
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCustomer(data.userDetails);
    }
  }, [isSuccess, data]);

  // const handleViewMore = () => {
  //   if (activeSec === "contact") {
  //     setActiveSec("billing");
  //     return;
  //   } else if (activeSec === "billing") {
  //     setActiveSec("contact");
  //     return;
  //   }
  // };

  return (
    <>
      <section className="px-4 py-5 ">
        <div className="mb-5 flex items-center justify-between border-b border-neutral-500 pb-5">
          <span
            className="inline-flex cursor-pointer items-center gap-2"
            onClick={() => router.push("/admin/customers")}
          >
            <ArrowLeft />
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span className="font-bold uppercase">Customer Details</span>
            )}
          </span>
          <Link href={`/admin/customers/${params.details}/orders`}>
            <button className="rounded-sm bg-black px-6 py-2 text-sm text-goldie-300">
              View Orders
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[45%_1fr]">
          <ContactInfo loading={isLoading} customer={customer!} />
          <BillingInfo
            loading={isLoading}
            billings={customer?.billingInfo ?? []}
          />
        </div>
        {/* <div className="grid grid-cols-1 gap-5 lg:hidden">
          {activeSec === "contact" && <ContactInfo />}
          {activeSec === "billing" && <BillingInfo />}
          <button className="text-cyan-600" onClick={handleViewMore}>
            View More
          </button>
        </div> */}
      </section>
      {/* <CustomerOrder /> */}
    </>
  );
}
