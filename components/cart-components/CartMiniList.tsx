"use client";
import { cn } from "@/helper/cn";
import useCart from "@/services/hooks/cart/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PopoverClose } from "@radix-ui/react-popover";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/products";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { useAppDispatch } from "@/redux/hook";
import { removeFromCart as removeFromCartSlice } from "@/redux/features/product/cartSlice";
import { removeFromCart } from "@/services/hooks/cart";

const CartMiniList = () => {
  const { auth } = useAuth();
  const { cart, isLoading } = useCart();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const cartItems = Object.values(cart);

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cartList"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleRemove = (id: string) => {
    if (auth?.user) {
      removeMutation.mutateAsync(id).then(() => {
        dispatch(removeFromCartSlice(id));
      });
    } else {
      dispatch(removeFromCartSlice(id));
      toast.success("Product removed from cart");
    }
  };

  return (
    <Card className={cn("w-full border-0 bg-transparent p-0 shadow-none")}>
      <CardHeader className="border-b border-gray-700/30 px-0 py-2">
        <CardTitle className="font-medium text-brand-200">Cart</CardTitle>
      </CardHeader>
      <CardContent className="my-1 p-0">
        <div className="max-h-40 divide-y divide-gray-700/50 overflow-y-auto px-2">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2Icon className="h-6 w-6 animate-spin" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center py-4">
              <p className="text-sm text-brand-200">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="flex w-full items-center py-1">
                <div className="h-12 w-12 shrink-0 overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="px-2">
                  <p className="text-sm font-medium">{item?.product?.name}</p>
                  <p className="text-sm">x{item?.quantity}</p>
                </div>
                <div className="ml-auto">
                  <button onClick={() => handleRemove(item?.product?._id)}>
                    <XIcon size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      {!isLoading && cartItems.length > 0 && (
        <CardFooter className="border-t border-gray-700/50 p-0">
          <div className="flex w-full flex-col gap-1">
            <PopoverClose asChild>
              <Link href="/cart">
                <Button
                  variant={"link"}
                  className="inline-block w-full cursor-pointer rounded-sm px-7 py-2.5 text-center text-sm duration-300"
                >
                  View Cart
                </Button>
              </Link>
            </PopoverClose>
            <PopoverClose asChild>
              <Link href="/billing">
                <Button className="inline-block w-full cursor-pointer rounded-sm bg-black px-7 py-2.5 text-center text-sm text-[#E4D064] duration-300 hover:bg-neutral-950">
                  Checkout
                </Button>
              </Link>
            </PopoverClose>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartMiniList;
