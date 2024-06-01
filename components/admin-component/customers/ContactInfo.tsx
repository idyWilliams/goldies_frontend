import { Call, Location, Sms } from "iconsax-react";
import React from "react";

export default function ContactInfo() {
  return (
    <div className="rounded-md bg-white py-5">
      <p className="px-4 text-[18px]">Customer Information</p>
      <div className="my-6 ml-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#494848]">
        <span className="items-center justify-center text-[24px] text-white">
          JD
        </span>
      </div>
      <div className="ml-8 text-[24px] font-bold capitalize">John Doe</div>
      <div className="my-8 border-b-2 border-gray-300"></div>
      <div className="ml-8 text-[24px] font-bold capitalize">Contact Info</div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="ml-8 flex gap-2 text-[18px] text-gray-700">
        <Call />
        <span>+447488855300</span>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="ml-8 flex gap-2 text-[18px]">
        <Sms className="items-center justify-center" />
        <span>johndoe@gmail.com</span>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
      <div className="ml-8 flex items-center gap-2">
        <Location size={25} className="mb-3" />
        <span className="text-[18px]">
          37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
        </span>
      </div>
      <div className="my-6 border-b-2 border-gray-300"></div>
    </div>
  );
}
