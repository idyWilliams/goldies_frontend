"use client";
import {
  addToCart as addProductToCart,
  clearCart,
  setCart,
} from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { getCartList } from ".";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { addToCart } from "@/services/hooks/cart";
import { ICart } from "@/interfaces/cart.interface";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const queryClient = useQueryClient();

  // Mutation to add an item to the cart
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      // Update Redux store
      dispatch(addProductToCart(data.cartItem));
      toast.success(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        `Error: ${error.response?.data.message || "Failed to add to cart"}`,
      );
    },
  });

  // Mutation to sync the local cart with the backend
  // const syncCartMutation = useMutation({
  //   mutationFn: syncCartWithBackend,
  //   onSuccess: (data) => {
  //     // Update Redux store with the synced cart
  //     dispatch(setCart(data.cart));
  //     toast.success("Cart synced successfully!");
  //     // Clear local storage after syncing
  //     localStorage.removeItem("goldies_cart");
  //   },
  //   onError: (error: AxiosError<{ message: string }>) => {
  //     toast.error(
  //       `Error: ${error.response?.data.message || "Failed to sync cart"}`,
  //     );
  //   },
  // });

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: ICart) => {
    // addToCartMutation.mutate(item);
  };

  // Function to sync the local cart with the backend
  // const syncLocalCart = () => {
  //   const localCart = JSON.parse(localStorage.getItem("goldies_cart") || "[]");
  //   if (localCart.length > 0) {
  //     syncCartMutation.mutate(localCart);
  //   }
  // };

  return {
    cart,
    handleAddToCart,
    // syncLocalCart,
    clearCart: () => dispatch(clearCart()),
    isLoading: false
  };
};

export default useCart;
