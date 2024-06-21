import { cn } from "@/helper/cn";
import React from "react";
import Goldie from "../../../public/assets/goldis-gold-logo.png";
import Image from "next/image";
import { CloseSquare } from "iconsax-react";
import { ModalProps } from "@/utils/categoryTypes";

// Example data that matches the CatWithCategory type
const catData = {
  cat: "Persian",
  isCategory: true,
};

// Example data that matches the SubWithSubcategory type
const subData = {
  sub: "Sports",
  isSubcategory: true,
};

const ConfirmModal: React.FC<ModalProps> = ({
  actionType = "edit",
  catOrSub = { cat: "Milestones Cakes", isCategory: true },
  setShowModal,
  handleConfirm,
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-45 p-4",
      )}
    >
      <div className="w-full rounded-lg bg-neutral-900 sm:w-[400px] md:w-[500px]">
        <div className="flex items-center justify-between border-b border-goldie-300 border-opacity-40 px-4 py-4">
          <Image src={Goldie} alt="Goldie" className="w-[120px]" />

          <span
            className="cursor-pointer text-goldie-300"
            onClick={handleCloseModal}
          >
            <CloseSquare size={24} />
          </span>
        </div>
        <div className="px-4 py-5">
          <p className="leading-7 text-white">
            {actionType === "edit" &&
              `Are you sure you want to edit ${catOrSub?.cat || catOrSub?.sub} ${(catOrSub?.isCategory && "category") || (catOrSub?.isSubcategory && "subcategory")}? Editing this ${(catOrSub?.isCategory && "category") || (catOrSub?.isSubcategory && "subcategory")} means you will overwrite the previous ${(catOrSub?.isCategory && "category") || (catOrSub?.isSubcategory && "subcategory")} information.`}

            {actionType === "delete" &&
              `Are you sure you want to delete ${catOrSub?.cat || catOrSub?.sub} ${(catOrSub?.isCategory && "category") || (catOrSub?.isSubcategory && "subcategory")}? Deleting this ${(catOrSub?.isCategory && "category") || (catOrSub?.isSubcategory && "subcategory")} means you will ${catOrSub?.isCategory ? "remove the category, products and subcategories under it and can't be undone" : "remove the subcategory and products under it and can't be undone."}`}
          </p>

          <div className="mt-5 space-x-3">
            <button
              onClick={handleConfirm}
              className="cursor-pointer rounded-md bg-goldie-300 px-4 py-1.5 text-sm text-neutral-900"
            >
              {(actionType === "edit" && " Yes, Edit") ||
                (actionType === "delete" && "Yes, Delete")}
            </button>
            <button
              onClick={handleCloseModal}
              className="cursor-pointer rounded-md bg-red-600 px-4 py-1.5 text-sm text-neutral-50"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
