import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { ArrowLeft, Edit, Trash } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const addresses = [
  {
    id: 1,
    firstname: "Timilehin",
    lastname: "Abegunde",
    address:
      "3, Alade Yusuf Street, Off Epetedo B/Stop, Abaranje Road, Ikotun, Lagos.",
    city: "Ikotun",
    state: "Lagos",
    country: "Nigeria",
    phonenumber: "+234 801 234 5678",
    isDefault: true,
  },
  {
    id: 2,
    firstname: "Chimamanda",
    lastname: "Adichie",
    address: "15 Eze Crescent, Independence Layout, Enugu.",
    city: "Enugu",
    state: "Enugu",
    country: "Nigeria",
    phonenumber: "+234 802 345 6789",
    isDefault: false,
  },
  {
    id: 3,
    firstname: "Olumide",
    lastname: "Adeniyi",
    address: "22 Awolowo Road, Bodija, Ibadan.",
    city: "Ibadan",
    state: "Oyo",
    country: "Nigeria",
    phonenumber: "+234 803 456 7890",
    isDefault: false,
  },
  {
    id: 4,
    firstname: "Fatima",
    lastname: "Usman",
    address: "9 Waziri Street, Unguwan Rimi, Kaduna.",
    city: "Kaduna",
    state: "Kaduna",
    country: "Nigeria",
    phonenumber: "+234 804 567 8901",
    isDefault: false,
  },
];

const MyAddresses = () => {
  return (
    <div>
      <div className="mb-4 flex items-start gap-2 border-b border-neutral-200 pb-4 md:block">
        <Link href="/my-account" className="md:hidden">
          <ArrowLeft size={32} />
        </Link>
        <div>
          <h2 className="text-xl font-semibold">My Addresses</h2>
          <p>Manage your personal and frequently used shipping addresses.</p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <EachElement
          of={addresses}
          render={(item: any, index: number) => (
            <div
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded border p-4 pb-0",
              )}
              key={index}
            >
              <div className="">
                {item?.isDefault && (
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-700 border-opacity-20 px-3 py-1 text-sm font-medium text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-700 "></span>{" "}
                    Default
                  </span>
                )}
                <h3 className="font-medium">
                  {item?.firstname} {item?.lastname}
                </h3>
                <p className="text-neutral-600">
                  {item?.address} <br />{" "}
                  <span>
                    {item?.state}, {item?.country}
                  </span>
                </p>
                <p className="text-neutral-600">{item?.phonenumber}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t py-3">
                <span
                  className={cn(
                    "cursor-pointer rounded bg-neutral-900 px-3 py-2 text-sm uppercase text-goldie-300",
                    item?.isDefault &&
                      "cursor-not-allowed bg-opacity-5 text-neutral-300",
                  )}
                >
                  Set as default
                </span>
                <div className="inline-flex items-center gap-2">
                  <span className="cursor-pointer text-neutral-900">
                    <Edit />
                  </span>
                  <span className="cursor-pointer text-neutral-900">
                    <Trash />
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MyAddresses;
