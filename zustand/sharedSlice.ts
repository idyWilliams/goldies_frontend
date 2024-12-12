import { StateCreator } from "zustand";
import { CategorySlice } from "./categorySlices";
import { SubCategorySlice } from "./subCategorySlice";

export interface SharedSlice {
  page: number;
  limit: number;
  submitStatus: string;
  showModal: boolean;
  actionType: "" | "edit" | "delete";
  setShowModal: (value: boolean) => void;
  setSubmitStatus: (value: string) => void;
  setActionType: (value: "" | "edit" | "delete") => void;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
}

export const sharedSliceStore: StateCreator<
  CategorySlice & SubCategorySlice & SharedSlice,
  [],
  [],
  SharedSlice
> = (set) => ({
  page: 1,
  limit: 0,
  submitStatus: "idle",
  showModal: false,
  actionType: "",
  setShowModal: (value) => set({ showModal: value }),
  setSubmitStatus: (value) => set({ submitStatus: value }),
  setActionType: (value) => set({ actionType: value }),
  setPage: (value) => set({ page: value }),
  setLimit: (value) => set({ limit: value }),
});
