import { Call, Location, Sms } from "iconsax-react";
import React from "react";
import { MdContentCopy } from "react-icons/md";

export default function ContactInfo() {
  return (
    <div className="rounded-md bg-white py-5">
      <p className="px-4 text-[18px] font-semibold">Customer Information</p>
      <div className="my-6 ml-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#494848]">
        <span className="items-center justify-center text-[24px] text-white">
          JD
        </span>
      </div>
      <div className="px-8 text-[24px] font-bold capitalize">John Doe</div>
      <div className="my-8 border-b-2 border-gray-300"></div>
      <div className="px-8 text-[24px] font-bold capitalize">Contact Info</div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex gap-2 px-8 text-[18px] text-gray-700">
        <Call />
        <div className="flex flex-grow items-center justify-between">
          <span>+447488855300</span>
          <span className="cursor-pointer">
            <MdContentCopy />
          </span>
        </div>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex gap-2 px-8 text-[18px]  text-gray-700">
        <Sms className="items-center justify-center" />
        <div className="flex flex-grow items-center justify-between">
          <span>johndoe@gmail.com</span>
          <span className="cursor-pointer">
            <MdContentCopy />
          </span>
        </div>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="flex items-center gap-2 px-8  text-gray-700">
        <Location size={25} className="" />
        <span className="text-balance text-[18px]">
          37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
        </span>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
    </div>
  );
}
