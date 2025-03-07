import { formatCurrency } from "@/helper/formatCurrency";
import { ICart } from "@/interfaces/cart.interface";
import Image from "next/image";
import React from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";

interface CartItemProps {
  item: ICart;
  removeItem: (id: string) => void;
}

const MobileCartItem = ({ item, removeItem }: CartItemProps) => {
  return (
    <div className="grid grid-cols-[2fr_1fr] py-3 sm:grid-cols-[2fr_1fr_1fr] md:hidden">
      <div className="flex gap-6 pr-8">
        <figure className="h-[60px] w-[60px] shrink-0">
          <Image
            src={item?.product.images[0]}
            alt="Lemon Cake"
            className="h-full w-full object-cover"
            width={300}
            height={300}
          />
        </figure>

        <div className="flex flex-col">
          <h3 className=" text-goldie-300">{item?.product.name}</h3>
          <div className="mt-3 inline-flex w-fit items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
            <span
              onClick={() => {}}
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
            >
              <BsDash size={20} />
            </span>
            <span className="">{item?.quantity}</span>
            <span
              onClick={() => {}}
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
            >
              <BsPlus size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start ">
        <span className="inline-block  text-goldie-300">
          {formatCurrency(parseInt(item?.product.maxPrice), "en-NG")}
        </span>
      </div>

      <div className="mt-4">
        <button
          onClick={() => removeItem(item?.product?._id)}
          className=" inline-flex cursor-pointer items-center gap-3 text-goldie-300"
        >
          <BsTrash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MobileCartItem;
