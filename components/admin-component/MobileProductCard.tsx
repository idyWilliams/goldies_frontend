import React, { useState } from "react";
import { productList } from "@/utils/adminData";
import { ArrowDown2, ArrowUp2, Edit, Eye, Trash } from "iconsax-react";
import ProductCard from "../ProductCard";
import Image from "next/image";

type Product = {
  id: string;
  image: any;
  productName: string;
  addedDate: string;
  category: string;
  priceFrom: number;
  priceTo: number;
  quantity: number;
  status: string;
};

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return (
        <div className="inline-flex items-center gap-1 rounded-md bg-green-700 px-3 py-1 text-[8px] uppercase tracking-wider text-white">
          {/* <span className="h-1 w-1 rounded-full bg-green-700"></span> */}
          Active
        </div>
      );
    case "inactive":
      return (
        <div className="inline-flex items-center gap-1 rounded-md bg-red-700 px-3 py-1 text-[8px] uppercase tracking-wider text-white">
          {/* <span className="h-1 w-1 rounded-full bg-red-700"></span> */}
          Inactive
        </div>
      );
    default:
      return;
  }
};

export default function MobileProductCard({ data }: { data: any }) {
  const [isActive, setIsActive] = useState(false);

  const accordionData = {
    title: (
      <div className="flex justify-between">
        <div>
          <div className="grid grid-cols-[50px_1fr] gap-2">
            <>
              <Image
                src={data.image}
                alt={data.productName}
                width={50}
                height={50}
                className="h-[50px] w-[50px] object-cover"
              />
            </>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">{data.productName}</span>
              <span className="mb-1 text-xs font-medium">
                &euro;{data.priceFrom} - &euro;
                {data.priceTo}
              </span>
              {statusColor(data.status)}
            </div>
          </div>
        </div>
        <div className="grid gap-5 text-right ">
          <span className="text-xs">{data.addedDate}</span>
          <span className="text-xs">X{data.quantity}</span>
        </div>
      </div>
    ),
    content: (
      <div className="mt-5 flex justify-between border-t border-neutral-500 pt-5">
        <ul className=" space-y-2">
          <li className="font-bold">Product ID:</li>
          <li className="font-bold">Category:</li>
          <li className="font-bold">Action:</li>
        </ul>
        <ul className="space-y-2 text-right">
          <li>{data.id}</li>
          <li className="capitalize">{data.category}</li>
          <li className="inline-flex items-center gap-3">
            <span className="text-blue-700">
              <Eye size={20} />
            </span>
            <span className="text-green-700">
              <Edit size={20} />
            </span>
            <span className="text-red-700">
              <Trash size={20} />
            </span>
          </li>
        </ul>
      </div>
      // <div>

      //   {productList.map((data: any, index: number) => {
      //     return (
      //       <div>
      //         <span>{data.id}</span>
      //         <span>{data.category}</span>
      //         <div className="inline-flex items-center gap-3">
      //           <span className="text-blue-700">
      //             <Eye size={20} />
      //           </span>
      //           <span className="text-green-700">
      //             <Edit size={20} />
      //           </span>
      //           <span className="text-red-700">
      //             <Trash size={20} />
      //           </span>
      //         </div>
      //       </div>
      //     );
      //   })}
      // </div>
    ),
  };

  const { title, content } = accordionData;
  return (
    <>
      <div className="relative rounded-lg border border-neutral-200 p-6 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          {isActive && <div>{content}</div>}
          <div className="absolute -bottom-3 left-1/2 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-500 bg-white ">
            {isActive ? <ArrowUp2 /> : <ArrowDown2 />}
          </div>
        </div>
      </div>
    </>
  );
}