import { formatCurrency } from "@/helper/formatCurrency";
import { ICart } from "@/interfaces/cart.interface";
import { removeFromCart, updateCartItem } from "@/services/hooks/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { toast } from "sonner";
import CartConfirmModal from "./CartConfirmModal";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/products";
import { useAppDispatch } from "@/redux/hook";
import {
  decrementProductQty,
  incrementProductQty,
} from "@/redux/features/product/cartSlice";
import { useAuth } from "@/context/AuthProvider";
import { removeFromCart as removeFromCartSlice } from "@/redux/features/product/cartSlice";

interface CartItemProps {
  item: ICart;
}

const CartItem = ({ item }: CartItemProps) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  // const removeMutation = useMutation({
  //   mutationFn: removeFromCart,
  //   onSuccess: (data) => {
  //     toast.success(data.message);
  //     queryClient.invalidateQueries({ queryKey: ["cartList"] });
  //     setShowModal(false);
  //   },
  //   onError: (error: AxiosError<ErrorResponse>) => {
  //     const resError = error.response?.data;
  //     console.error(resError);
  //     const errorMessage = resError?.message ? resError?.message : resError;
  //     toast.error(`Error: ${errorMessage}`);
  //   },
  // });

  const handleRemove = (id: string) => {
    // if (auth?.user) {
    //   removeMutation.mutateAsync(id).then(() => {
    //     dispatch(removeFromCartSlice(id));
    //   });
    // } else {
      dispatch(removeFromCartSlice(id));
      toast.success("Product removed from cart");
    // }
  };

  // Mutation to update the quantity
  // const updateQuantityMutation = useMutation({
  //   mutationFn: updateCartItem,
  //   onSuccess: (data) => {
  //     toast.success(data.message);
  //     queryClient.invalidateQueries({ queryKey: ["cartList"] });
  //   },
  //   onError: (error: any) => {
  //     console.error("Error updating quantity:", error);
  //     toast.error(
  //       error?.response?.data?.message || "Failed to update quantity",
  //     );
  //   },
  // });

  // Handle increasing the quantity
  const handleIncreaseQuantity = () => {
    // if (auth?.user) {
    //   updateQuantityMutation
    //     .mutateAsync({
    //       product: item.product._id,
    //       quantity: item.quantity + 1,
    //     })
    //     .then(() => {
    //       dispatch(incrementProductQty({ id: item?.product?._id }));
    //     });
    // } else {
      dispatch(incrementProductQty({ id: item?.product?._id }));
    // }
  };

  // Handle decreasing the quantity
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      // if (auth?.user) {
      //   updateQuantityMutation
      //     .mutateAsync({
      //       product: item.product._id,
      //       quantity: item.quantity - 1,
      //     })
      //     .then(() => {
      //       dispatch(decrementProductQty({ id: item?.product?._id }));
      //     });
      // } else {
        dispatch(decrementProductQty({ id: item?.product?._id }));
      // }
    }
  };

  const subTotal = () => {
    const price = parseInt(item?.product?.maxPrice) || 0;
    return price * item.quantity;
  };

  return (
    <>
      <div className="w-full items-start justify-start py-3 sm:inline-grid sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex gap-4">
          <Link
            href={`/shop/${item?.product.slug}?productId=${item.product?._id}`}
          >
            <figure className="h-[80px] w-[80px]">
              <Image
                src={item.product.images[0]}
                alt="Lemon Cake"
                className="h-full w-full object-cover"
                width={300}
                height={300}
              />
            </figure>
          </Link>
          <h3 className="text-brand-200">{item.product.name}</h3>
        </div>
        <div className="inline-flex w-[100px] items-center justify-start gap-3 rounded-[50px] bg-white px-1.5 py-1">
          <button
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300 disabled:pointer-events-none disabled:bg-gray-300"
            onClick={handleDecreaseQuantity}
            disabled={item.quantity === 1}
          >
            <BsDash size={24} />
          </button>
          <span className="">{item.quantity}</span>
          <button
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
            onClick={handleIncreaseQuantity}
          >
            <BsPlus size={24} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="hidden md:block text-brand-200">
            {formatCurrency(parseInt(item?.product.maxPrice), "en-NG")}
          </span>
          <span className=" text-brand-200">
            {formatCurrency(subTotal(), "en-NG")}
          </span>
          <span
            onClick={() => {
              setShowModal(true);
            }}
            className="cursor-pointer text-brand-200"
          >
            <BsTrash size={20} />
          </span>
        </div>
      </div>

      {showModal && (
        <CartConfirmModal
          item={item}
          setShowModal={setShowModal}
          removeItem={handleRemove}
          // isDeleting={removeMutation.isPending}
        />
      )}
    </>
  );
};

export default CartItem;
