"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import CartItem from "@/components/cart-components/CartItem";
import MobileCartItem from "@/components/cart-components/MobileCartItem";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IBillingInfo } from "@/interfaces/user.interface";
import illustration from "@/public/assets/illistration-removebg-preview.png";
import { removeFromCart } from "@/services/hooks/cart";
import useCart from "@/services/hooks/cart/useCart";
import { getAllBllingInfo } from "@/services/hooks/payment";
import { ErrorResponse } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const router = useRouter();
  const { cart, isLoading: isLoadingCart } = useCart();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["allBllingInfo"],
    queryFn: async () => getAllBllingInfo(),
  });

  const billingInfos = data?.user as IBillingInfo[];

  const defaultBillingInfo = billingInfos?.find(
    (info) => info.defaultBillingInfo,
  );

  const cartItems = Object.values(cart);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, current) =>
          acc +
          parseFloat(current?.product?.maxPrice) * (current.quantity as number),
        0,
      ),
    [cartItems],
  );

  const handleCheckout = () => {
    router.push("/billing");
  };

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
    removeMutation.mutate(id);
  };

  return (
    <section className="relative bg-gradient-to-br from-black to-neutral-700 py-16 pt-1">
      <div className="wrapper">
        <div className="">
          <BreadCrumbs
            items={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "Cart",
                link: "/cart",
              },
            ]}
          />
          <h2 className="mb-8 mt-4 text-2xl font-bold capitalize text-goldie-300 md:text-3xl">
            Cart({cartItems.length})
          </h2>

          {/* Loading State */}
          {isLoadingCart && (
            <div className="flex justify-center py-10">
              <p className="text-goldie-300">Retrieving your cart items...</p>
            </div>
          )}

          {/* Cart Items */}
          {!isLoadingCart && cartItems.length > 0 && (
            <div className="mb-5 grid grid-cols-[2fr_1fr] border-b border-goldie-300 pb-2 sm:grid-cols-[2fr_1fr_1fr]">
              <p className="text-lg font-semibold text-goldie-300">Product</p>
              <p className="hidden text-lg font-semibold text-goldie-300 md:block">
                Quantity
              </p>
              <p className="text-lg font-semibold text-goldie-300">Sub Total</p>
            </div>
          )}

          {/* CART FOR DESKTOP */}
          {!isLoadingCart && (
            <div className="hidden divide-y divide-gray-400 sm:block">
              {cartItems.map((item, i) => {
                return (
                  <CartItem key={i} item={item} removeItem={handleRemove} />
                );
              })}
            </div>
          )}

          {/* CART FOR MOBILE */}
          {!isLoadingCart && (
            <div className="divide-y divide-gray-400">
              {cartItems.map((item, i) => {
                return (
                  <MobileCartItem
                    key={i}
                    item={item}
                    removeItem={handleRemove}
                  />
                );
              })}
            </div>
          )}

          {/* PAYMENT DETAILS */}
          {!isLoadingCart && cartItems.length > 0 ? (
            <div className="my-8 w-full border-t border-goldie-300">
              <h2 className="mb-8 mt-4 text-xl font-bold capitalize text-goldie-300">
                Payment Details
              </h2>

              <div className="grid sm:grid-cols-2 sm:gap-5">
                <div>
                  <h3 className="mb-1 font-bold text-goldie-300">
                    Shipping Address
                  </h3>
                  {!defaultBillingInfo ? (
                    <p className="text-gray-400">No shipping address</p>
                  ) : (
                    <p className="text-goldie-300">
                      {defaultBillingInfo?.streetAddress}
                      <br />
                      {defaultBillingInfo?.cityOrTown},
                      {defaultBillingInfo?.state}
                      <br />
                      {defaultBillingInfo?.country}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap justify-end">
                  <div className="mt-6 flex w-full flex-wrap items-start justify-between sm:mt-0">
                    <ul className="flex flex-col gap-3 text-goldie-300">
                      <li>Product Total</li>
                      {/* <li>Options Total</li> */}
                      <li>Grand Total</li>
                    </ul>
                    <ul className="flex flex-col gap-3 text-goldie-300 ">
                      <li className="text-right">
                        {formatCurrency(cartTotal, "en-NG")}
                      </li>
                      {/* <li className="text-right">
                        {formatCurrency(100, "en-NG")}
                      </li> */}
                      <li className="text-right">
                        {formatCurrency(cartTotal, "en-NG")}
                      </li>
                    </ul>
                  </div>
                  <Button
                    size={"lg"}
                    onClick={handleCheckout}
                    className="mt-7 self-end rounded-full bg-goldie-300 text-black hover:bg-goldie-400"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            !isLoadingCart && (
              <div className="h-full space-y-4 py-10 text-center text-goldie-300">
                <figure className="mx-auto h-28 w-24">
                  <Image
                    src={illustration}
                    alt="illustration"
                    className="h-full w-full object-cover"
                    width={40}
                    height={660}
                  />
                </figure>

                <p>Oops!, Your cart is empty</p>

                <Button
                  variant={"outline"}
                  className=" rounded-full border-goldie-300 bg-transparent text-goldie-300 hover:border-goldie-400 hover:bg-transparent hover:text-goldie-400"
                  onClick={() => router.push("/shop")}
                >
                  Start Shopping
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
