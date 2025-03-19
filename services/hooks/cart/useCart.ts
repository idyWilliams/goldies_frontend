"use client";
import { addToCartStoreDTO } from "@/interfaces/cart.interface";
import {
  addToCart as addProductToCart,
  clearCart,
} from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useQueryClient } from "@tanstack/react-query";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const queryClient = useQueryClient();

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
  };

  return {
    cart,
    handleAddToCart,
    clearCart: () => dispatch(clearCart()),
    isLoading: false,
  };
};

export default useCart;
