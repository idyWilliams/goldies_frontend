import React, { useState } from "react";
import { productList } from "@/utils/adminData";
import { ArrowDown2, ArrowUp2, Edit, Eye, Trash } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductOptionModal from "./ProductOptionModal";
import { Product } from "@/app/(dashboard)/admin/products/page";
import { IProduct } from "@/interfaces/product.interface";

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "available":
      return (
        <div className="inline-flex items-center gap-1 rounded-md bg-green-700 px-3 py-1 text-[8px] uppercase tracking-wider text-white">
          {/* <span className="h-1 w-1 rounded-full bg-green-700"></span> */}
          Available
        </div>
      );
    case "unavailable":
      return (
        <div className="inline-flex items-center gap-1 rounded-md bg-red-700 px-3 py-1 text-[8px] uppercase tracking-wider text-white">
          {/* <span className="h-1 w-1 rounded-full bg-red-700"></span> */}
          Unavailable
        </div>
      );
    default:
      return;
  }
};

export default function MobileProductCard({ data }: { data: IProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any>();
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const handleView = () => {
    router.push(`/admin/products/${data?._id}`);
  };
  const accordionData = {
    title: (
      <div className="flex justify-between">
        <div>
          <div className="grid grid-cols-[70px_1fr] items-center gap-2">
            <>
              <Image
                src={data?.images[0]}
                alt={data?.name}
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            </>
            <div className="flex flex-col items-start">
              <span className="inline-block text-sm font-semibold">
                {data.name}
              </span>
              <span className="mb-1.5 mt-1 inline-block text-sm font-medium">
                &euro;{data?.minPrice} - &euro;
                {data?.maxPrice}
              </span>
              {statusColor(data?.status || "available")}
            </div>
          </div>
        </div>
        <div className="grid gap-5 text-right ">
          <span className="text-xs">{data?.createdAt}</span>
          {/* <span className="text-xs">X{data?.quantity || 1}</span> */}
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
          <li className="uppercase">{data?._id?.slice(0, 6)}</li>
          <li className="capitalize">{data?.category?.name}</li>
          <li className="inline-flex items-center gap-3">
            <span className="text-blue-700" onClick={handleView}>
              <Eye size={20} />
            </span>
            <span
              className="text-green-700"
              onClick={() => {
                setShowModal(true);
                setAction("edit");
                // setSelectedProducts("productName");
              }}
            >
              <Edit size={20} />
            </span>
            <span
              className="text-red-700"
              onClick={() => {
                setShowModal(true);
                setAction("delete");
                // setSelectedProducts("productName");
              }}
            >
              <Trash size={20} />
            </span>
          </li>
        </ul>
      </div>
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
      {showModal && (
        <ProductOptionModal
          action={action}
          product={data}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
