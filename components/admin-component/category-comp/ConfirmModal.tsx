import { cn } from "@/helper/cn";
import { deleteImageFromFirebase } from "@/lib/utils";
import Goldie from "@/public/assets/goldis-gold-logo.png";
import { deleteCategory, deleteSubCategory } from "@/services/hooks/category";
import { Category } from "@/services/types";
import { ModalProps } from "@/utils/categoryTypes";
import useBoundStore from "@/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CloseSquare } from "iconsax-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { toast } from "sonner";

type SubCatQueryDataType = {
  [x: string]: any;
  category: Category;
};

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const ConfirmModal: React.FC<ModalProps> = ({ catOrSub }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryParams = useSearchParams();
  const categoryId = queryParams.get("categoryId");

  const setShowSub = useBoundStore((state) => state.setShowSub);
  const page = useBoundStore((state) => state.page);
  const limit = useBoundStore((state) => state.limit);

  const setShowModal = useBoundStore((state) => state.setShowModal);

  const actionType = useBoundStore((state) => state.actionType);
  const setActionType = useBoundStore((state) => state.setActionType);

  const activeCategory = useBoundStore((state) => state.activeCategory);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);

  const activeSubcategory = useBoundStore((state) => state.activeSubcategory);
  const setActiveSubcategory = useBoundStore(
    (state) => state.setActiveSubcategory,
  );

  const deleteActiveCategory = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setShowModal(false);
      setActionType("");
      setActiveCategory(null);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const deleteSubcategory = useMutation({
    mutationFn: deleteSubCategory,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
      setShowModal(false);
      setActionType("");
      setActiveSubcategory(null);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleRemoveCategoryImage = useCallback(async () => {
    if (
      activeCategory?.image &&
      typeof activeCategory?.image === "string" &&
      activeCategory?.image.startsWith("https://")
    ) {
      try {
        await deleteImageFromFirebase(activeCategory?.image);
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.warn(
            "Image not found in Firebase Storage:",
            activeCategory?.image,
          );
        } else {
          console.error("Failed to delete image from Firebase:", error);
        }
      }
    }
  }, [activeCategory?.image]);

  const handleRemoveSubCategoryImage = useCallback(async () => {
    if (
      activeSubcategory?.image &&
      typeof activeSubcategory?.image === "string" &&
      activeSubcategory?.image.startsWith("https://")
    ) {
      try {
        await deleteImageFromFirebase(activeSubcategory?.image);
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.warn(
            "Image not found in Firebase Storage:",
            activeSubcategory?.image,
          );
        } else {
          console.error("Failed to delete image from Firebase:", error);
        }
      }
    }
  }, [activeSubcategory?.image]);

  const handleConfirm = () => {
    if (actionType === "delete") {
      try {
        if (catOrSub.isCategory) {
          handleRemoveCategoryImage();
          deleteActiveCategory.mutate(activeCategory?._id);
        } else {
          handleRemoveSubCategoryImage();
          deleteSubcategory.mutate(activeSubcategory?._id);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (actionType === "edit") {
      if (catOrSub.isCategory) {
        router.push(
          `/admin/manage-categories/${activeCategory?.categorySlug}?categoryId=${activeCategory?._id}`,
        );
      } else if (!catOrSub.isCategory) {
        setShowSub(true);
      }
      setActionType("");
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    catOrSub.isCategory ? setActiveCategory(null) : setActiveSubcategory(null);
    setActionType("");
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

          <span className="cursor-pointer text-brand-200" onClick={handleClose}>
            <CloseSquare size={24} />
          </span>
        </div>
        <div className="px-4 py-5">
          <p className="leading-7 text-white">
            {actionType === "edit" &&
              `Are you sure you want to edit ${catOrSub.isCategory ? `${activeCategory?.name} category` : `${activeSubcategory?.name} subcategory`}? Editing this ${catOrSub?.isCategory ? "category" : "subcategory"} means you will overwrite the previous ${catOrSub?.isCategory ? "category" : "subcategory"} information.`}

            {actionType === "delete" &&
              `Are you sure you want to delete ${catOrSub.isCategory ? `${activeCategory?.name} category` : `${activeSubcategory?.name} subcategory`}? Deleting this ${catOrSub?.isCategory ? "category" : "subcategory"} means you will remove the ${catOrSub?.isCategory && "category, "} products and subcategories under it and can't be undone`}
          </p>

          <div className="mt-5 space-x-3">
            <button
              onClick={handleConfirm}
              className="cursor-pointer rounded-md bg-goldie-300 px-4 py-1.5 text-sm text-neutral-900"
              disabled={
                deleteActiveCategory.isPending || deleteSubcategory.isPending
              }
            >
              {deleteActiveCategory.isPending || deleteSubcategory.isPending
                ? "Processing..."
                : actionType === "edit"
                  ? "Yes, Edit"
                  : "Yes, Delete"}
            </button>
            <button
              onClick={handleClose}
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
