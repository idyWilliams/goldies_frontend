"use client";
import { addToCartStoreDTO, ICart } from "@/interfaces/cart.interface";
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
    select: (data) => data.cart.products as ICart[],
  });

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
  };

  // Sync Redux cart with server cart on mount
  const updateCart = useCallback(() => {
    if (serverCart) {
      // Filter out deleted products before syncing
      const validCartItems = serverCart.filter((item) => item.product);
      dispatch(setCart(validCartItems || []));
    }
  }, [serverCart, dispatch]);

  useEffect(() => {
    updateCart();
  }, [updateCart]);

  // Filter out deleted products from the cart
  const cart = auth?.user
    ? (serverCart || []).filter((item) => item.product)
    : localCart.filter((item) => item.product);

  return {
    cart,
    handleAddToCart,
    isLoading: auth?.user ? isLoading : false,
  };
};

export default useCart;
