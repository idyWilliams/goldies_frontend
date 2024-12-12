import { create } from "zustand";

interface Store {
  allProducts: any[];
  activeProduct: any | null;
  favProducts: any[];
  setAllProducts: (products: any[]) => void;
  removeProduct: (productId: number) => void;
  setActiveProduct: (product: any | null) => void;
  setFavProducts: (products: any[]) => void;
  addFavProduct: (product: any) => void;
  removeFavProduct: (productId: number) => void;
}

const useUserPdctStore = create<Store>((set) => ({
  allProducts: [],
  activeProduct: null,
  favProducts: [],
  setAllProducts: (products) => set((state) => ({ allProducts: products })),
  removeProduct: (productId) =>
    set((state) => ({
      allProducts: state.allProducts.filter((prod) => prod.id !== productId),
    })),
  setActiveProduct: (product) => set(() => ({ activeProduct: product })),
  setFavProducts: (products) => set((state) => ({ favProducts: products })),
  addFavProduct: (product) =>
    set((state) => ({ favProducts: [...state.favProducts, product] })),
  removeFavProduct: (productId) =>
    set((state) => ({
      favProducts: state.favProducts.filter((prod) => prod.id !== productId),
    })),
}));

export default useUserPdctStore;
