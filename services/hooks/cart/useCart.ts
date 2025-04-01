"use client";
import {
  addToCartDTO,
  addToCartStoreDTO,
  ICart,
  IMergeCart,
} from "@/interfaces/cart.interface";
import {
  addToCart as addProductToCart,
  setCart,
} from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartList, mergeLocalCart } from ".";
import { useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { auth } = useAuth();

  // const {
  //   data: serverCart,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["cartList"],
  //   queryFn: getCartList,
  //   enabled: !!auth?.user,
  //   select: (data) => data.cart.products as ICart[],
  // });

  // Mutation to sync local cart with server
  // const { mutate: syncLocalCart } = useMutation({
  //   mutationFn: (cartItems: ICart[]) => {
  //     const payload: IMergeCart = {
  //       localCartItems: cartItems.map((item) => ({
  //         product: item.product._id,
  //         size: item.size,
  //         shape: item.shape,
  //         toppings: item.toppings,
  //         flavour: item.flavour,
  //         dateNeeded: item.dateNeeded,
  //         details: item.details,
  //         quantity: item.quantity,
  //       })),
  //     };
  //     return mergeLocalCart(payload);
  //   },
  //   onSuccess: (data) => {
  //     console.log("syncLocalCart>>>", data);

  //     // Update Redux store with merged cart data from server
  //     if (data?.cart?.products) {
  //       dispatch(setCart(data.cart.products));
  //     }
  //     localStorage.removeItem("cart"); // Clear local cart after sync
  //   },
  //   onError: (error) => {
  //     console.error("Failed to sync cart:", error);
  //   },
  // });

  // Sync local cart to server when user logs in
  // useEffect(() => {
  //   if (auth?.user && localCart.length > 0) {
  //     console.log("first login>>>", localCart);
  //     syncLocalCart(localCart);
  //   }
  // }, [auth?.user, localCart, syncLocalCart]);

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
  };

  // Sync Redux cart with server cart on mount
  // const updateCart = useCallback(() => {
  //   if (serverCart) {
  //     // Filter out deleted products before syncing
  //     const validCartItems = serverCart.filter((item) => item.product);
  //     dispatch(setCart(validCartItems || []));
  //   }
  // }, [serverCart, dispatch]);

  // useEffect(() => {
  //   updateCart();
  // }, [updateCart]);

  // Filter out deleted products from the cart
  // const cart = auth?.user
  //   ? (serverCart || []).filter((item) => item.product)
  //   : localCart.filter((item) => item.product);

  return {
    cart,
    handleAddToCart,
    // isLoading: auth?.user ? isLoading : false,
    // localCart,
    // syncLocalCart
  };
};

export default useCart;
