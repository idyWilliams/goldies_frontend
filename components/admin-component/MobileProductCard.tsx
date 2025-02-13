import { formatCurrency } from "@/helper/formatCurrency";
import { IProduct } from "@/interfaces/product.interface";
import { ArrowDown2, ArrowUp2, Edit, Eye, Trash } from "iconsax-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductOptionModal from "./ProductOptionModal";

const statusColor = (status: string) => {
  switch (status) {
    case "Available":
      return (
        <div className="inline-flex items-center bg-green-700 px-3 py-1 text-xs capitalize tracking-wider text-white">
          Available
        </div>
      );
    case "Unavailable":
      return (
        <div className="inline-flex items-center bg-red-700 px-3 py-1 text-xs capitalize tracking-wider text-white">
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
  const [isActive, setIsActive] = useState(false);

  const accordionData = {
    title: (
      <div className="flex justify-between gap-8">
        <div className="flex items-start">
          <div className="mr-4 h-[60px] w-[60px] shrink-0 overflow-hidden">
            <Image
              src={data?.images[0]}
              alt={data?.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="mb-1 text-wrap font-semibold leading-tight">
              {data.name}
            </span>
            <span className="mb-2 mt-1 inline-block text-sm font-medium">
              {formatCurrency(parseInt(data?.minPrice), "en-NG")} -{" "}
              {formatCurrency(parseInt(data?.maxPrice), "en-NG")}
            </span>
            {statusColor(data?.status)}
          </div>
        </div>
        <div className="grid gap-5 text-right ">
          <span className="text-nowrap text-sm">
            {moment(data.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    ),
    content: (
      <div className="mt-5 flex justify-between border-t border-t-gray-500  pt-5">
        <ul className="space-y-2 text-sm">
          <li className="font-bold">Product ID:</li>
          <li className="font-bold">Category:</li>
          <li className="font-bold">Actions:</li>
        </ul>
        <ul className="space-y-2 text-right text-sm">
          <li className="uppercase">0922DRF</li>
          <li className="capitalize">{data?.category?.name}</li>
          <li className="flex items-center justify-end gap-3">
            <Link href={`/admin/products/${data?._id}`} className="flex">
              <span className=" text-blue-700">
                <Eye size={20} />
              </span>
            </Link>
            <span
              className="cursor-pointer text-green-700"
              onClick={() => {
                setShowModal(true);
                setAction("edit");
              }}
            >
              <Edit size={20} />
            </span>
            <span
              className="cursor-pointer text-red-700"
              onClick={() => {
                setShowModal(true);
                setAction("delete");
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
    <div className="relative">
      <div className="relative rounded-lg border border-neutral-200 bg-white p-3 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          {isActive && <div>{content}</div>}
          <button className="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-neutral-500 bg-white">
            {isActive ? <ArrowUp2 size={14} /> : <ArrowDown2 size={14} />}
          </button>
        </div>
      </div>
      {showModal && (
        <ProductOptionModal
          action={action}
          product={data}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
