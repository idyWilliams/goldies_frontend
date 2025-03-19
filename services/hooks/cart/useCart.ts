"use client";
import { addToCartStoreDTO } from "@/interfaces/cart.interface";
import {
  addToCart as addProductToCart,
  clearCartFromStore,
} from "@/redux/features/product/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: addToCartStoreDTO) => {
    dispatch(addProductToCart(item));
  };

  return {
    cart,
    handleAddToCart,
    isLoading: false,
  };
};

export default useCart;
