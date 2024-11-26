import { create } from "zustand";
import { createPdctStoreSlice, CreateProductSlice } from "./createPdctSlice";
import { getPdctStoreSlice, GetProductSlice } from "./getPdctSlice";

const usePdctBoundStore = create<CreateProductSlice & GetProductSlice>()(
  (...states) => ({
    ...createPdctStoreSlice(...states),
    ...getPdctStoreSlice(...states),
  }),
);

export default usePdctBoundStore;
