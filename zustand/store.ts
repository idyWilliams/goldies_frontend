import { create } from "zustand";
import { CategorySlice, categoryStoreSlice } from "./categorySlices";
import { SubCategorySlice, subCategoryStoreSlice } from "./subCategorySlice";
import { SharedSlice, sharedSliceStore } from "./sharedSlice";

const useBoundStore = create<CategorySlice & SubCategorySlice & SharedSlice>()(
  (...states) => ({
    ...categoryStoreSlice(...states),
    ...subCategoryStoreSlice(...states),
    ...sharedSliceStore(...states),
  }),
);

export default useBoundStore;
