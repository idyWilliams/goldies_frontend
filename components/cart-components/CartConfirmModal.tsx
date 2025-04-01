import { cn } from "@/helper/cn";
import { ICart } from "@/interfaces/cart.interface";
import Goldie from "@/public/assets/new-logo/logo-white.svg";
import { CloseSquare } from "iconsax-react";
import Image from "next/image";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export default function CartConfirmModal({
  item,
  setShowModal,
  removeItem,
  // isDeleting,
}: {
  item: ICart;
  setShowModal: (value: boolean) => void;
  removeItem: (id: string) => void;
  // isDeleting: boolean;
}) {
  const handleConfirm = () => {
    removeItem(item?.product?._id);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-900 bg-opacity-45 p-4",
      )}
    >
      <div className="w-full rounded-lg bg-brand-200 sm:w-[400px] md:w-[500px]">
        <div className="flex items-center justify-between border-b border-brand-200 border-opacity-40 px-4 py-4">
          <Image src={Goldie} alt="The cake app" className="w-[120px]" />

          <span
            className="cursor-pointer text-brand-200"
            onClick={() => setShowModal(false)}
          >
            <CloseSquare size={24} />
          </span>
        </div>
        <div className="px-4 py-5">
          <h3 className="leading-7 text-white">
            Are you sure you want to remove{" "}
            <span className="font-semibold capitalize">
              {item?.product?.name}
            </span>{" "}
            from your cart?
          </h3>
          <div className="mt-5 space-x-3">
            <button
              className="cursor-pointer rounded-md bg-brand-200 px-4 py-1.5 text-sm text-brand-100"
              onClick={handleConfirm}
              // disabled={isDeleting}
            >
              Yes
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md bg-brand-200 px-4 py-1.5 text-sm text-brand-100"
              onClick={() => setShowModal(false)}
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
