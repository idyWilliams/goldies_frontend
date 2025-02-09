import { IProduct } from "@/interfaces/product.interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICart extends IProduct {
  quantity?: number;
  cakeDetails?: {
    size: string;
    topping: string;
    flavour: string;
    cakeTime: string;
    message?: string;
  };
}

export interface ProductState {
  productList: IProduct[];
  cart: ICart[];
  buyNowProduct: ICart | null;
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

const initialState: ProductState = {
  productList: [],
  cart: getLocalStorageCart(),
  buyNowProduct: getLocalStorageBuyNowProduct(),
  toastMessage: null,
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
    addProductToCart: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        cakeDetails?: {
          size: string;
          topping: string;
          flavour: string;
          cakeTime: string;
          message?: string;
        };
      }>,
    ) => {
      const { id, quantity, cakeDetails } = action.payload;
      const product = state.productList.find((product) => product._id === id);
      if (product) {
        const existingProductIndex = state.cart.findIndex(
          (item) => item._id === product._id,
        );

        if (existingProductIndex !== -1) {
          // If product already in the cart, increase quantity
          state.cart[existingProductIndex].quantity! += quantity;
          if (cakeDetails) {
            state.cart[existingProductIndex].cakeDetails = cakeDetails;
          }
        } else {
          // If product is not in the cart, add it with quantity 1
          state.cart.push({ ...product, quantity, cakeDetails });
        }

        console.log("added product>>", product);
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

    //  Reducer to handle "Buy Now" functionality
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
      const product = state.productList.find((product) => product._id === id);
      if (product) {
        state.buyNowProduct = {
          ...product,
          quantity,
          cakeDetails,
        };

        console.log("buyNowProduct from store", product);

        localStorage.setItem(
          "goldies_buyNow",
          JSON.stringify(state.buyNowProduct),
        );
      } else {
        toast.error("Product not found in the cart.");
        return;
      }
    },

    clearBuyNowProduct: (state) => {
      state.buyNowProduct = null;
      localStorage.removeItem("goldies_buyNow");
    },
  },
});

export const {
  setProducts,
  addProductToCart,
  deleteProductFromCart,
  incrementProductQty,
  decrementProductQty,
  setBuyNowProduct,
  clearBuyNowProduct,
} = productSlice.actions;

export default productSlice.reducer;
