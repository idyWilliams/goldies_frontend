import { IProduct } from "@/interfaces/product.interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICart extends IProduct {
  quantity?: number;
}

export interface ProductState {
  productList: IProduct[];
  cart: ICart[]; // Changed cart type to hold a collection of ICart
  toastMessage: string | null;
}

const getLocalStorageCart = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  }
  return [];
};

const initialState: ProductState = {
  productList: [],
  cart: getLocalStorageCart(),
  toastMessage: null, // Add this line
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Reducer to add products to the store
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.productList = action.payload;
    },

    // Reducer to add products to cart
    addProductToCart: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.productList.find(
        (product) => product._id === action.payload.id,
      );
      if (product) {
        const existingProductIndex = state.cart.findIndex(
          (item) => item._id === product._id,
        );

        if (existingProductIndex !== -1) {
          // If product already in the cart, increase quantity
          state.cart[existingProductIndex].quantity! += 1;
        } else {
          // If product is not in the cart, add it with quantity 1
          state.cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(state.cart));
        toast.success(`${product.name} is added to cart`);
      }
    },

    deleteProductFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.findIndex(
        (product) => product._id === action.payload.id,
      );
      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        state.cart.splice(productIndex, 1); // Remove product from cart
        toast.success(`${product.name} is removed from cart`);
        localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
      } else {
        toast.error("Product not found in the cart.");
      }
    },

    // Reducer to increment product qty in cart
    incrementProductQty: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.findIndex(
        (item) => item._id === action.payload.id,
      );
      if (productIndex !== -1) {
        state.cart[productIndex].quantity! += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // Reducer to decrement product qty in cart
    decrementProductQty: (
      state,
      action: PayloadAction<{ id: string | number }>,
    ) => {
      const productIndex = state.cart.findIndex(
        (item) => item._id === action.payload.id,
      );
      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        if ((product.quantity as number) > 1) {
          (product.quantity as number) -= 1;
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      }
    },
  },
});

export const {
  setProducts,
  addProductToCart,
  deleteProductFromCart,
  incrementProductQty,
  decrementProductQty,
} = productSlice.actions;

export default productSlice.reducer;
