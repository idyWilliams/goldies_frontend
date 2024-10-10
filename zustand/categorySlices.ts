import { RefObject } from "react";
import { StateCreator } from "zustand";
import { SubCategorySlice } from "./subCategorySlice";
import { SharedSlice } from "./sharedSlice";
import { QueryObserverResult } from "@tanstack/react-query";
import { Category } from "@/services/types";

export interface CategorySlice {
  isValid: boolean | null;
  isFetchingCategory: boolean;
  categories: Category[] | [];
  activeCategory: Category | null;
  categoryFormRef: RefObject<HTMLFormElement> | null;
  refetchCategory: (() => Promise<QueryObserverResult<any, Error>>) | null;
  setIsValid: (value: boolean) => void;
  setIsFetchingCategory: (value: boolean) => void;
  setCategoryFormRef: (value: RefObject<HTMLFormElement> | null) => void;
  setCategories: (allCategories: Category[]) => void;
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
  isFetchingCategory: false,
  isValid: false,
  categories: [],
  activeCategory: null,
  categoryFormRef: null,
  refetchCategory: null, // Store the refetch function
  setIsValid: (value) => set({ isValid: value }),
  setIsFetchingCategory: (value) => set({ isFetchingCategory: value }),
  setCategories: (allCategories) => set({ categories: allCategories }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setCategoryFormRef: (value) => set({ categoryFormRef: value }),
  setRefetchCategory: (refetchFn) =>
    set(() => ({ refetchCategory: refetchFn })),
});
