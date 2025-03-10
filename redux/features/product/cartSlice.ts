import { ICart } from "@/interfaces/cart.interface";
import { IProduct } from "@/interfaces/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartState {
  cart: ICart[];
  buyNowProduct: ICart | null;
}

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
  cart: [],
  buyNowProduct: getLocalStorageBuyNowProduct(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart[]>) => {
      state.cart = action.payload;
    },
    setBuyNowProduct: (
      state,
      action: PayloadAction<{
        product: IProduct | null;
        quantity: number;
        size: string;
        toppings: string[];
        // flavour: string[];
        flavour: string;
        dateNeeded: string;
        details?: string;
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
  },
});

export const { setCart, setBuyNowProduct, clearBuyNowProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
