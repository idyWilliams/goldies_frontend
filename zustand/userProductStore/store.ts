import { create } from "zustand";

interface Store {
  products: any[];
  favProducts: any[];
  addProduct: (product: any) => void;
  removeProduct: (productId: number) => void;
  setFavProducts: (products: any[]) => void;
}

const useUserPdctStore = create<Store>((set) => ({
  products: [],
  favProducts: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((prod) => prod.id !== productId),
    })),
  setFavProducts: (products) => set((state) => ({ favProducts: products })),
}));

export default useUserPdctStore;
