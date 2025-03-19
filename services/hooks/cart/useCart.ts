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
import { useAuth } from "@/context/AuthProvider";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart: localCart } = useAppSelector((state) => state.cart);
  const { auth } = useAuth();

  const {
    data: serverCart,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: getCartList,
    enabled: !!auth?.user,
  });

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
  };

  // Sync Redux cart with server cart on mount
  const updateCart = useCallback(() => {
    if (serverCart) {
      dispatch(setCart(serverCart?.cart?.products || []));
    }
  }, [serverCart, dispatch]);

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  const cart = auth?.user ? serverCart?.cart?.products || [] : localCart;

  return {
    cart,
    handleAddToCart,
    isLoading: auth?.user ? isLoading : false,
  };
};

export default useCart;
