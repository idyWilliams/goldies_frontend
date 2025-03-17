import { ICart } from "@/interfaces/cart.interface";
import { IProduct } from "@/interfaces/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartState {
  cart: ICart[];
  buyNowProduct: ICart | null;
}

const getLocalStorageCart = (): ICart[] => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("goldies_cart") || "[]");
    } catch {
      return [];
    }
  }
  return [];
};

const getLocalStorageBuyNowProduct = () => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("goldies_buyNow") || "null");
    } catch {
      return null;
    }
  }
  return null;
};

export const initialState: CartState = {
  cart: getLocalStorageCart(),
  buyNowProduct: getLocalStorageBuyNowProduct(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart[]>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<ICart>) => {
      state.cart.push(action.payload);
      localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload,
      );
      localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
    },
    setBuyNowProduct: (
      state,
      action: PayloadAction<{
        product: IProduct | null;
        quantity: number;
        size: string | undefined;
        toppings: string[] | undefined;
        // flavour: string[]| undefined ;
        flavour: string | undefined;
        dateNeeded: string | undefined;
        details?: string | undefined;
      }>,
    ) => {
      const {
        product,
        quantity,
        size,
        toppings,
        flavour,
        dateNeeded,
        details = "",
      } = action.payload;

      // Ensure product is not null
      if (!product) {
        toast.error("Product is required for Buy Now.");
        return;
      }

      state.buyNowProduct = {
        product,
        quantity,
        size,
        toppings,
        flavour,
        dateNeeded,
        details,
      };

      localStorage.setItem(
        "goldies_buyNow",
        JSON.stringify(state.buyNowProduct),
      );
    },

    clearBuyNowProduct: (state) => {
      state.buyNowProduct = null;
      localStorage.removeItem("goldies_buyNow");
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("goldies_cart");
    },
  },
});

export const {
  setCart,
  setBuyNowProduct,
  clearBuyNowProduct,
  addToCart,
  clearCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
