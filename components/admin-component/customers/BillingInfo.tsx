import { IBillingInfo } from "@/interfaces/user.interface";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingInfo({
  billings,
  loading,
}: {
  billings: IBillingInfo[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="rounded-md bg-white px-4 py-5">
        <p className="mb-6 text-[18px] font-semibold">Billing Information</p>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="">
              <Skeleton className="mb-1 h-4 w-32"></Skeleton>
              <Skeleton className="h-6 w-48 "></Skeleton>
              <Skeleton className="mt-1 h-6 w-3/4 "></Skeleton>
              <Skeleton className="my-8 border-b-2 "></Skeleton>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!billings || billings.length === 0) {
    return (
      <div className="rounded-md bg-white px-4 py-5">
        <p className="mb-6 text-[18px] font-semibold">Billing Information</p>
        <p className="text-neutral-500">No billing information available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white px-4 py-5">
      <p className="mb-6 text-[18px] font-semibold">Billing Information</p>
      {billings.map((bill, i) => (
        <div key={i} className="mb-6 border-b border-gray-300 pb-4">
          <div className="mb-3">
            <span className="text-neutral-500">Full name:&nbsp;</span>
            <span className="font-medium text-neutral-900">
              {bill?.firstName && bill?.lastName
                ? `${bill.firstName} ${bill.lastName}`
                : "N/A"}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-neutral-500">Email address:&nbsp;</span>
            <span className="font-medium text-neutral-900">
              {bill?.email || "N/A"}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-neutral-500">Billing address:&nbsp;</span>
            <span className="text-balance font-medium text-neutral-900">
              {bill?.streetAddress &&
              bill?.cityOrTown &&
              bill?.state &&
              bill?.country
                ? `${bill.streetAddress}, ${bill.cityOrTown}, ${bill.state}, ${bill.country}`
                : "N/A"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
