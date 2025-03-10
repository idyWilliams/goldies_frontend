"use client";
import { setCart } from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { getCartList } from ".";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["cartList"],
    queryFn: getCartList,
  });

  const { cartData } = useMemo(() => {
    if (!data || isLoading || isError) return { cartData: [] };

    return {
      cartData: data?.cart?.products ?? [],
    };
  }, [data, isLoading, isError]);

  const updateStore = useCallback(() => {
    if (cartData.length > 0) {
      dispatch(setCart(cartData));
    } else {
      dispatch(setCart([])); // Clear Redux store
    }
  }, [cartData, dispatch]);

  useEffect(() => {
    updateStore();
  }, [updateStore]);

  return {
    cart,
    isLoading,
    isError,
  };
};

export default useCart;
