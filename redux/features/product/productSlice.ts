import { addSlugToCakes } from "@/helper";
import { ICake } from "@/types/products";
import { cakeProducts1 } from "@/utils/cakeData";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { toast } from "sonner";

const cakes = addSlugToCakes(cakeProducts1);

export interface ICart {
  [productId: string]: ICake;
}

export interface ProductState {
  productList: ICake[];
  cart: ICart;
  favorites: ICart;
  toastMessage: string | null; // Add this line
}

const initialState: ProductState = {
  productList: cakes,
  cart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "{}")
      : {},
  favorites: {},
  toastMessage: null, // Add this line
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Reducer to add products to the store
    setProducts: (state, action: PayloadAction<ICake | ICake[]>) => {
      if (Array.isArray(action.payload)) {
        state.productList = [...state.productList, ...action.payload];
        console.log(state, "state");
      } else {
        state.productList.push(action.payload);
      }

      // Update cart items based on new product list
      state.cart = Object.fromEntries(
        Object.entries(state.cart).filter(([id, product]) =>
          state.productList.some((p) => p.id === product.id),
        ),
      );
    },
    // Reducer to add products to cart
    addProductToCart: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      const product = state.productList.find(
        (product) => product.id === action.payload.id,
      );
      if (product && !state.cart[action.payload.id]) {
        product.quantity = 1;
        state.cart[action.payload.id] = product;
        toast.success(`${product?.name} added to cart`);
      } else {
        toast.info(`${product?.name} already in cart`);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Reducer to add products to favs
    addProductToFavorites: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      const product = state.productList.find(
        (product) => product.id === action.payload.id,
      );
      if (product) {
        state.favorites[action.payload.id] = product;
      }
    },
    deleteProductFromCart: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      const product = state.productList.find(
        (product) => product.id === action.payload.id,
      );
      if (product) {
        delete state.cart[action.payload.id];
        toast.success(`${product.name} is removed from cart`);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Reducer to increment product qty in cart
    incrementProductQty: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      if (state.cart[action.payload.id]) {
        const product = state.cart[action.payload.id];
        (product.quantity as number) += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Reducer to decrement product qty in cart
    decrementProductQty: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      if (state.cart[action.payload.id]) {
        const product = state.cart[action.payload.id];
        if ((product.quantity as number) > 1) (product.quantity as number) -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const {
  setProducts,
  addProductToCart,
  addProductToFavorites,
  deleteProductFromCart,
  incrementProductQty,
  decrementProductQty,
} = productSlice.actions;

export default productSlice.reducer;
