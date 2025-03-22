import { addToCartStoreDTO, ICart } from "@/interfaces/cart.interface";
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
      localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
    },
    addToCart: (state, action: PayloadAction<addToCartStoreDTO>) => {
      const {
        product,
        shape,
        size,
        toppings,
        flavour,
        dateNeeded,
        details,
        quantity,
      } = action.payload;

      // Check if the product already exists in the cart
      const existingItem = state.cart.find(
        (item) => item.product?._id === product?._id,
      );

      if (existingItem) {
        // Update the quantity if the product already exists
        existingItem.quantity += quantity;
      } else {
        // Add the product to the cart if it doesn't exist
        const newItem: ICart = {
          product,
          size,
          shape,
          toppings,
          flavour,
          dateNeeded,
          details,
          quantity,
        };
        state.cart.push(newItem);
      }

      localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload,
      );
      localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
    },
    setBuyNowProduct: (state, action: PayloadAction<addToCartStoreDTO>) => {
      const {
        product,
        quantity,
        size,
        shape,
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
        shape,
        toppings,
        flavour,
        dateNeeded,
        details,
      };

      localStorage.setItem(
        "goldies_buyNow",
        JSON.stringify(state.buyNowProduct),
      );

      toast.success("Product set for immediate purchase!");
    },

    clearBuyNowProduct: (state) => {
      state.buyNowProduct = null;
      localStorage.removeItem("goldies_buyNow");
      console.log("Buy now product cleared!");
    },
    clearCartFromStore: (state) => {
      state.cart = [];
      localStorage.removeItem("goldies_cart");
      console.log("Cart cleared!");
    },
    // Reducer to increment product qty in cart
    incrementProductQty: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.findIndex(
        (item) => item.product._id === action.payload.id,
      );
      if (productIndex !== -1) {
        state.cart[productIndex].quantity! += 1;
        localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
      }
    },
    // Reducer to decrement product qty in cart
    decrementProductQty: (state, action: PayloadAction<{ id: string }>) => {
      const productIndex = state.cart.findIndex(
        (item) => item.product._id === action.payload.id,
      );
      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        if ((product.quantity as number) > 1) {
          (product.quantity as number) -= 1;
          localStorage.setItem("goldies_cart", JSON.stringify(state.cart));
        }
      }
    },
  },
});

export const {
  setCart,
  setBuyNowProduct,
  clearBuyNowProduct,
  addToCart,
  clearCartFromStore,
  removeFromCart,
  incrementProductQty,
  decrementProductQty,
} = cartSlice.actions;

export default cartSlice.reducer;
