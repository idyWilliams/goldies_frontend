import { RefObject } from "react";
import { StateCreator } from "zustand";
import { SubCategorySlice } from "./subCategorySlice";
import { SharedSlice } from "./sharedSlice";
import { QueryObserverResult } from "@tanstack/react-query";
import { Category } from "@/services/types";

export interface CategorySlice {
  isValid: boolean | null;
  // isPending: boolean;
  categories: Category[] | null;
  activeCategory: Category | null;
  categoryFormRef: RefObject<HTMLFormElement> | null;
  refetchCategory: (() => Promise<QueryObserverResult<any, Error>>) | null;
  setIsValid: (value: boolean) => void;
  // setIsPending: (value: boolean) => void;
  setCategoryFormRef: (value: RefObject<HTMLFormElement> | null) => void;
  setCategories: (allCategories: Category[] | null) => void;
  setActiveCategory: (category: Category | null) => void;
  setRefetchCategory: (
    refetchFn: () => Promise<QueryObserverResult<any, Error>>,
  ) => void;
}

export const categoryStoreSlice: StateCreator<
  CategorySlice & SubCategorySlice & SharedSlice,
  [],
  [],
  CategorySlice
> = (set) => ({
  // isPending: false,
  isValid: false,
  categories: null,
  activeCategory: null,
  categoryFormRef: null,
  refetchCategory: null, // Store the refetch function
  setIsValid: (value) => set({ isValid: value }),
  // setIsPending: (value) => set({ isPending: value }),
  setCategories: (allCategories) => set({ categories: allCategories }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setCategoryFormRef: (value) => set({ categoryFormRef: value }),
  setRefetchCategory: (refetchFn) =>
    set(() => ({ refetchCategory: refetchFn })),
});
