import { StateCreator } from "zustand";
import { CreateProductSlice } from "./createPdctSlice";

export interface GetProductSlice {}

export const getPdctStoreSlice: StateCreator<
  GetProductSlice & CreateProductSlice,
  [],
  [],
  GetProductSlice
> = (set) => ({});
