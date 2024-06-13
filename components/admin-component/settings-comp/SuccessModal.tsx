import { cn } from "@/helper/cn";
import { Check } from "iconsax-react";
import React from "react";
import { BsX } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";

export default function SuccessModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 opacity-0 duration-300",
        showModal && "pointer-events-auto opacity-100",
      )}
    >
      <div className="relative flex w-full flex-col items-center bg-white p-6 py-20 sm:w-[300px]">
        <span
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <BsX size={24} />
        </span>
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white">
          <IoCheckmark size={32} />
        </span>
        <p className="mt-2 text-center text-xl">
          Password Reset <br /> Successfully
        </p>
      </div>
    </div>
  );
}
