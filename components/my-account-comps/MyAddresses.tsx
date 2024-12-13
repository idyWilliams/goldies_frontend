import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { Edit, Trash } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import EditAddressModal from "../EditAddressModal";
import DeleteAddressModal from "../DeleteAddressModal";
import { useMediaQuery } from "react-responsive";

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

const MyAddresses = ({ myaddresses }: any) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  console.log(myaddresses);

  const handleEditClick = (data: any) => {
    setIsEditOpen(true);
    console.log("edit button clicked");
  };

  const handleDeleteClick = (data: any) => {
    setIsDeleteOpen(true);
    console.log("hello, delete button clicked");
  };

  const useIsMobile = () => {
    const isMobileView = useMediaQuery({ maxWidth: 768 });
    return isMobileView;
  };

  const isMobile = useIsMobile();

  return (
    <div>
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <p>Manage your personal and frequently used shipping addresses.</p>
      </div>

      {isEditOpen && (
        <div>
          {isMobile ? (
            <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
              <div
                className=" max-w-md rounded-lg border-2 bg-white p-2"
                style={{
                  width: "90vw",
                  height: "85vh",
                  maxHeight: "85vh",
                }}
              >
                <EditAddressModal onClose={() => setIsEditOpen(false)} />
              </div>
            </div>
          ) : (
            <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50   ">
              <EditAddressModal onClose={() => setIsEditOpen(false)} />
            </div>
          )}
        </div>
      )}

      {isDeleteOpen && (
        <DeleteAddressModal onClose={() => setIsDeleteOpen(false)} />
      )}

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
                  <span
                    className="cursor-pointer text-neutral-900"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit />
                  </span>
                  <span
                    className="cursor-pointer text-neutral-900"
                    onClick={() => handleDeleteClick(item)}
                  >
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
