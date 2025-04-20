import { IProduct } from "@/interfaces/product.interface";
import { create } from "zustand";

interface Store {
  allProducts: IProduct[];
  activeProduct: IProduct | null;
  favProducts: IProduct[];
  setAllProducts: (products: IProduct[]) => void;
  removeProduct: (productId: string) => void;
  setActiveProduct: (product: IProduct | null) => void;
  setFavProducts: (products: IProduct[]) => void;
  addFavProduct: (product: IProduct) => void;
  removeFavProduct: (productId: string) => void;
}

const useUserPdctStore = create<Store>((set) => ({
  allProducts: [],
  activeProduct: null,
  favProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),
  removeProduct: (productId) =>
    set((state) => ({
      allProducts: state.allProducts.filter((prod) => prod._id !== productId),
    })),
  setActiveProduct: (product) => set({ activeProduct: product }),
  setFavProducts: (products) => set({ favProducts: products }),
  addFavProduct: (product) =>
    set((state) => ({ favProducts: [...state.favProducts, product] })),
  removeFavProduct: (productId) =>
    set((state) => ({
      favProducts: state.favProducts.filter((prod) => prod._id !== productId),
    })),
}));

export default useUserPdctStore;
