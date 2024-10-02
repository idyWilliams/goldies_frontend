import { RefObject } from "react";
import { StateCreator } from "zustand";
import { CategorySlice } from "./categorySlices";
import { SharedSlice } from "./sharedSlice";

export interface SubCategorySlice {
  showSub: boolean;
  activeSubcategory: { [x: string]: any } | null;
  setActiveSubcategory: (subCategory: { [x: string]: any } | null) => void;
  setShowSub: (value: boolean) => void;
}

export const subCategoryStoreSlice: StateCreator<
  SubCategorySlice & CategorySlice & SharedSlice,
  [],
  [],
  SubCategorySlice
> = (set) => ({
  showSub: false,
  activeSubcategory: null,
  setActiveSubcategory: (subCategory) =>
    set({ activeSubcategory: subCategory }),
  setShowSub: (value) => set({ showSub: value }),
});
