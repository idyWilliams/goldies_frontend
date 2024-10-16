import { StateCreator } from "zustand";
import { CategorySlice } from "./categorySlices";
import { SharedSlice } from "./sharedSlice";
import { SubCategory } from "@/services/types";

export interface SubCategorySlice {
  subCategories: SubCategory[] | null;
  showSub: boolean;
  activeSubcategory: SubCategory | null;
  setSubCategories: (allCategories: SubCategory[] | null) => void;
  setActiveSubcategory: (subCategory: SubCategory | null) => void;
  setShowSub: (value: boolean) => void;
}

export const subCategoryStoreSlice: StateCreator<
  SubCategorySlice & CategorySlice & SharedSlice,
  [],
  [],
  SubCategorySlice
> = (set) => ({
  subCategories: null,
  showSub: false,
  activeSubcategory: null,
  setSubCategories: (subCategoryArr) => set({ subCategories: subCategoryArr }),
  setActiveSubcategory: (subCategory) =>
    set({ activeSubcategory: subCategory }),
  setShowSub: (value) => set({ showSub: value }),
});
