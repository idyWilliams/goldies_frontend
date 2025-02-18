import { Skeleton } from "@/components/ui/skeleton";
import { IUser } from "@/interfaces/user.interface";
import { Call, Location, Sms } from "iconsax-react";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";

export default function ContactInfo({
  loading,
  customer,
}: {
  customer?: IUser;
  loading: boolean;
}) {
  const handleCopy = (text: string, type: "phone" | "email") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${type === "phone" ? "Phone number" : "Email"} copied!`, {
      duration: 2000,
    });
  };

  if (loading) {
    return (
      <div className=" rounded-md bg-white px-8 py-5">
        <p className="text-[18px] font-semibold">Customer Information</p>
        <div className="my-6 flex items-center justify-start">
          <Skeleton className="h-24 w-24 rounded-full"></Skeleton>
        </div>
        <Skeleton className="h-6 w-40 "></Skeleton>
        <Skeleton className="my-8 border-b-2"></Skeleton>

        <Skeleton className="h-6 w-40 rounded"></Skeleton>
        <Skeleton className="my-6 border-b-2"></Skeleton>

        <Skeleton className="h-6 w-full rounded"></Skeleton>
        <Skeleton className="my-6 border-b-2"></Skeleton>

        <Skeleton className="h-6 w-full rounded"></Skeleton>
        <Skeleton className="my-6 border-b-2"></Skeleton>

        <Skeleton className="h-6 w-full rounded"></Skeleton>
        <Skeleton className="my-6 border-b-2"></Skeleton>
      </div>
    );
  }

  if (!customer) {
    return (
      <p className="text-neutral-500">No customer information available.</p>
    );
  }

  return (
    <div className="rounded-md bg-white py-5">
      <p className="px-4 text-[18px] font-semibold">Customer Information</p>
      <div className="my-6 ml-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#494848]">
        <span className="items-center justify-center text-[24px] text-white">
          {customer?.firstName?.charAt(0) ?? "J"}
          {customer?.lastName?.charAt(0) ?? "D"}
        </span>
      </div>
      <div className="px-8 text-[24px] font-bold capitalize">
        {customer?.firstName && customer?.lastName
          ? `${customer?.firstName} ${customer?.lastName}`
          : "N/A"}
      </div>
      <div className="my-8 border-b-2 border-gray-300"></div>
      <div className="px-8 text-[24px] font-bold capitalize">Contact Info</div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex gap-2 px-8 text-[18px] text-gray-700">
        <Call />
        <div className="flex flex-grow items-center justify-between">
          <span>{customer?.phoneNumber ?? "N/A"}</span>
          <span
            className="cursor-pointer"
            onClick={() => handleCopy(`+${customer?.phoneNumber}`, "phone")}
          >
            <MdContentCopy />
          </span>
        </div>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex gap-2 px-8 text-[18px]  text-gray-700">
        <Sms className="items-center justify-center" />
        <div className="flex flex-grow items-center justify-between">
          <span>{customer?.email ?? "N/A"}</span>
          <span
            className="cursor-pointer"
            onClick={() => handleCopy(customer?.email, "email")}
          >
            <MdContentCopy />
          </span>
        </div>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex items-center gap-2 px-8 text-gray-700">
        <Location size={25} />
        <span className="text-balance text-[18px]">
          {customer?.billingInfo[0]?.streetAddress &&
          customer?.billingInfo[0]?.cityOrTown &&
          customer?.billingInfo[0]?.state &&
          customer?.billingInfo[0]?.country
            ? `${customer?.billingInfo[0]?.streetAddress}, ${customer?.billingInfo[0]?.cityOrTown}, ${customer?.billingInfo[0]?.state}, ${customer?.billingInfo[0]?.country}`
            : "N/A"}
        </span>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
    </div>
  );
}
