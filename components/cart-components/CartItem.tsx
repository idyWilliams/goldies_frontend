import { formatCurrency } from "@/helper/formatCurrency";
import { ICart } from "@/interfaces/cart.interface";
import { updateCartItem } from "@/services/hooks/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { toast } from "sonner";

interface CartItemProps {
  item: ICart;
  removeItem: (id: string) => void;
}

const CartItem = ({ item, removeItem }: CartItemProps) => {
  const queryClient = useQueryClient();

  // Mutation to update the quantity
  const updateQuantityMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cartList"] });
    },
    onError: (error: any) => {
      console.error("Error updating quantity:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update quantity",
      );
    },
  });

  // Handle increasing the quantity
  const handleIncreaseQuantity = () => {
    updateQuantityMutation.mutate({
      product: item.product._id,
      quantity: item.quantity + 1,
    });
  };

  // Handle decreasing the quantity
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantityMutation.mutate({
        product: item.product._id,
        quantity: item.quantity - 1,
      });
    }
  };

  return (
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
        <h3 className="text-goldie-300">{item.product.name}</h3>
      </div>
      <div className="inline-flex w-[100px] items-center justify-start gap-3 rounded-[50px] bg-white px-1.5 py-1">
        <button
          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300 disabled:bg-gray-300 disabled:pointer-events-none"
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
        <span className=" text-goldie-300">
          {formatCurrency(parseInt(item?.product.maxPrice), "en-NG")}
        </span>
        <span
          onClick={() => removeItem(item?.product?._id)}
          className="cursor-pointer text-goldie-300"
        >
          <BsTrash size={20} />
        </span>
      </div>
    </div>
  );
};

export default CartItem;
