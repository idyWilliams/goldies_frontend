"use client";
import { addToCartStoreDTO } from "@/interfaces/cart.interface";
import {
  addToCart as addProductToCart,
  setCart,
} from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useQuery } from "@tanstack/react-query";
import { getCartList } from ".";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const {
    data: serverCart,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: getCartList,
  });

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
    // refetch();
  };

  // Sync Redux cart with server cart on mount
  const updateCart = useCallback(() => {
    if (serverCart) {
      dispatch(setCart(serverCart));
    }
  }, [serverCart, dispatch]);

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  return {
    cart,
    handleAddToCart,
    isLoading,
  };
};

export default useCart;
