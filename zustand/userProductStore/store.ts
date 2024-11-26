import { create } from "zustand";

interface Store {
  products: any[];
  favProducts: any[];
  addProduct: (product: any) => void;
  removeProduct: (productId: number) => void;
  addFavProduct: (product: any) => void;
  removeFavProduct: (productId: string) => void;
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
  addFavProduct: (product) =>
    set((state) => ({ favProducts: [product, ...state.favProducts] })),
  removeFavProduct: (productId) =>
    set((state) => ({
      favProducts: state.favProducts.filter(
        (prod) => prod.id?.toString() !== productId,
      ),
    })),
}));

export default useUserPdctStore;
