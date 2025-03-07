import { ICart } from "@/interfaces/cart.interface";
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
        id: string;
        quantity: number;
        cakeDetails: {
          size: string;
          topping: string;
          flavour: string;
          cakeTime: string;
          message?: string;
        };
      }>,
    ) => {
      const { id, quantity, cakeDetails } = action.payload;

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
