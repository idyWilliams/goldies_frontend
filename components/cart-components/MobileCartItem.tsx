import { formatCurrency } from "@/helper/formatCurrency";
import { ICart } from "@/interfaces/cart.interface";
import { removeFromCart, updateCartItem } from "@/services/hooks/cart";
import { ErrorResponse } from "@/types/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { toast } from "sonner";
import CartConfirmModal from "./CartConfirmModal";
import { useAppDispatch } from "@/redux/hook";
import { useAuth } from "@/context/AuthProvider";
import { removeFromCart as removeFromCartSlice } from "@/redux/features/product/cartSlice";

import {
  decrementProductQty,
  incrementProductQty,
} from "@/redux/features/product/cartSlice";

interface CartItemProps {
  item: ICart;
}

const MobileCartItem = ({ item }: CartItemProps) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const dispatch = useAppDispatch();

  // const removeMutation = useMutation({
  //   mutationFn: removeFromCart,
  //   onSuccess: (data) => {
  //     toast.success(data.message);
  //     queryClient.invalidateQueries({ queryKey: ["cartList"] });
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
      <div className="grid grid-cols-[2fr_1fr] py-3 md:grid-cols-[2fr_1fr_1fr] md:hidden">
        <div className="flex gap-6 pr-8">
          <figure className="h-[60px] w-[60px] shrink-0">
            <Image
              src={item?.product.images[0]}
              alt="Lemon Cake"
              className="h-full w-full object-cover"
              width={300}
              height={300}
            />
          </figure>

          <div className="flex flex-col">
            <h3 className=" text-brand-200 truncate line-clamp-2">{item?.product.name}</h3>
            <span className="text-brand-200">
              {formatCurrency(parseInt(item?.product.maxPrice), "en-NG")}
            </span>
            <div className="mt-3 inline-flex w-fit items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
              <button
                onClick={handleDecreaseQuantity}
                disabled={item.quantity === 1}
                className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
              >
                <BsDash size={20} />
              </button>
              <span className="">{item?.quantity}</span>
              <span
                className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                onClick={handleIncreaseQuantity}
              >
                <BsPlus size={20} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <span className="text-right text-brand-200">
            {formatCurrency(subTotal(), "en-NG")}
          </span>
        </div>

        <div className="mt-4">
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className=" inline-flex cursor-pointer items-center gap-3 text-brand-200"
          >
            <BsTrash size={16} />
            Delete
          </button>
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

export default MobileCartItem;
