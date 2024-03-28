import React, { useState } from "react";
import ReactDOM from "react-dom";
import { productList } from "@/utils/adminData";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
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
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-20 px-1 py-[2px] text-sm text-green-700">
          <span className="h-3 w-3 rounded-full bg-green-700"></span>
          Active
        </div>
      );
    case "inactive":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-20 px-1 py-[2px] text-sm text-red-700">
          <span className="h-3 w-3 rounded-full bg-red-700"></span> Inactive
        </div>
      );
    default:
      return;
  }
};

const accordionData = {
  title: (
    <div className="">
      {productList.map((data: any, index: number) => {
        return (
          <ProductCard key={index} className="mb-4 mt-2 bg-white p-4 shadow-xl">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-2">
                  <Image
                    src={data.image}
                    alt={data.productName}
                    width={50}
                    height={20}
                    className=""
                  />
                  <div>
                    <p className="text-sm font-semibold">{data.productName}</p>
                    <p className="text-xs font-medium">
                      &euro;{data.priceFrom} - &euro;
                      {data.priceTo}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs">{data.addedDate}</p>
              </div>
            </div>
            <div className="ml-14 flex justify-between">
              <div className="text-[10px]">
                {statusColor}
                {data.status}
              </div>
              <p className="text-xs">X{data.quantity}</p>
            </div>
          </ProductCard>
        );
      })}
      ,
    </div>
  ),
  content: "",
};

const { title, content } = accordionData;

export default function MobileProductCard() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <div
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <div>{title}</div>
            <div>{isActive ? <ArrowUp2 /> : <ArrowDown2 />}</div>
          </div>
          {isActive && <div className="accordion-content">{content}</div>}
        </div>
      </div>
    </>
  );
}
