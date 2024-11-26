import { cn } from "@/helper/cn";
import React from "react";
import Goldie from "@/public/assets/goldis-gold-logo.png";
import Image from "next/image";
import { CloseSquare } from "iconsax-react";
import { ModalProps } from "@/utils/categoryTypes";
import useBoundStore from "@/zustand/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, deleteSubCategory } from "@/services/hooks/category";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  optimisticCategoryUpdate,
  optimisticSubCatUpdate,
} from "@/utils/optimisticCategoryUpdate";
import { QueryDataType } from "./CategoryForm";
import { Category } from "@/services/types";

type SubCatQueryDataType = {
  [x: string]: any;
  category: Category;
};

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

    onMutate: async (variable) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", page, limit],
      });
      const previousCategories = queryClient.getQueryData([
        "categories",
        1,
        50,
      ]);

      queryClient.setQueryData(
        ["categories", page, limit],
        (old: QueryDataType) => {
          const newData = optimisticCategoryUpdate("delete", old, variable);

          return { ...newData };
        },
      );
      return { previousCategories };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", page, limit] });
      setShowModal(false);
      setActionType("");
      setActiveCategory(null);
    },

    onSuccess: () => {
      toast.success("Category succesfully deleted");
    },

    onError: (error, newCategory, context) => {
      queryClient.setQueryData(
        ["categories", page, limit],
        context?.previousCategories,
      );
      console.error(error);
      toast.error("There was an error deleting  category");
    },
  });

  const deleteSubcategory = useMutation({
    mutationFn: deleteSubCategory,

    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ["categories", categoryId] });
      const previousCategory = queryClient.getQueryData([
        "categories",
        categoryId,
      ]);

      if (!previousCategory) return;

      queryClient.setQueryData(
        ["categories", categoryId],
        (old: SubCatQueryDataType) => {
          const newData = optimisticSubCatUpdate("delete", old, variable);

          return { ...newData };
        },
      );
      return { previousCategory };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
      setShowModal(false);
      setActionType("");
      setActiveSubcategory(null);
    },

    onSuccess: () => {
      toast.success("Category succesfully deleted");
    },

    onError: (error, newCategory, context) => {
      queryClient.setQueryData(
        ["categories", categoryId],
        context?.previousCategory,
      );
      console.error(error);
      toast.error("There was an error deleting  category");
    },
  });

  const handleConfirm = () => {
    if (actionType === "delete") {
      try {
        if (catOrSub.isCategory) {
          deleteActiveCategory.mutate(activeCategory?._id);
        } else {
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

          <span
            className="cursor-pointer text-goldie-300"
            onClick={handleClose}
          >
            <CloseSquare size={24} />
          </span>
        </div>
        <div className="px-4 py-5">
          <p className="leading-7 text-white">
            {actionType === "edit" &&
              `Are you sure you want to edit ${catOrSub.isCategory ? `${activeCategory?.name} category` : `${activeSubcategory?.name} subcategory`}? Editing this ${catOrSub?.isCategory ? "category" : "subcategory"} means you will overwrite the previous ${catOrSub?.isCategory ? "category" : "subcategory"} information.`}

            {actionType === "delete" &&
              `Are you sure you want to delete ${catOrSub.isCategory ? `${activeCategory?.name} category` : `${activeSubcategory?.name} subcategory`}? Deleting this ${catOrSub?.isCategory ? "category" : "subcategory"} means you will remove the ${catOrSub?.isCategory && "category, "}products and subcategories under it and can't be undone`}
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
