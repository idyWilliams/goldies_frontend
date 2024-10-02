import { StateCreator } from "zustand";
import { CategorySlice } from "./categorySlices";
import { SubCategorySlice } from "./subCategorySlice";

export interface SharedSlice {
  submitStatus: string;
  showModal: boolean;
  actionType: "" | "edit" | "delete";
  isFetchingCategories: boolean;
  setShowModal: (value: boolean) => void;
  setSubmitStatus: (value: string) => void;
  setActionType: (value: "" | "edit" | "delete") => void;
  setIsFetchingCategories: (value: boolean) => void;
}

export const sharedSliceStore: StateCreator<
  CategorySlice & SubCategorySlice & SharedSlice,
  [],
  [],
  SharedSlice
> = (set) => ({
  submitStatus: "idle",
  showModal: false,
  actionType: "",
  isFetchingCategories: false,
  setShowModal: (value) => set({ showModal: value }),
  setSubmitStatus: (value) => set({ submitStatus: value }),
  setActionType: (value) => set({ actionType: value }),
  setIsFetchingCategories: (value) => set({ isFetchingCategories: value }),

});
