"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import CartItem from "@/components/cart-components/CartItem";
import MobileCartItem from "@/components/cart-components/MobileCartItem";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IBillingInfo } from "@/interfaces/user.interface";
import illustration from "@/public/assets/illistration-removebg-preview.png";
import useCart from "@/services/hooks/cart/useCart";
import { getAllBllingInfo } from "@/services/hooks/payment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CartPage = () => {
  const router = useRouter();
  const { cart } = useCart();
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["allBllingInfo"],
    queryFn: async () => getAllBllingInfo(),
  });

  useEffect(() => {
    // If we have products, initial load is complete
    if (cart && cart.length > 0) {
      setIsInitialLoad(false);
    }
  }, [cart]);

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

  return (
    <section className="relative bg-brand-100 py-16 pt-24">
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
          <h2 className="mb-8 mt-4 text-2xl font-bold capitalize text-brand-200 md:text-3xl">
            Cart({cartItems.length})
          </h2>

          {/* Loading State */}
          {isInitialLoad && (
            <div className="flex justify-center py-10">
              <p className="text-brand-200">Retrieving your cart items...</p>
            </div>
          )}

          {/* Cart Items */}
          {!isInitialLoad && cartItems.length > 0 && (
            <div className="mb-5 grid grid-cols-[2fr_1fr] border-b border-brand-200 pb-2 md:grid-cols-[2fr_1fr_1fr]">
              <p className="text-lg font-semibold text-brand-200">Product</p>
              <p className="hidden text-lg font-semibold text-brand-200 md:block">
                Quantity
              </p>
              <div className="flex items-center justify-end md:justify-between">
                <p className="mr-2 hidden text-lg font-semibold text-brand-200 md:block">
                  Price
                </p>
                <p className="text-lg font-semibold text-brand-200">
                  Sub Total
                </p>
                <div className="hidden md:block"></div>
              </div>
            </div>
          )}

          {/* CART FOR DESKTOP */}
          {!isInitialLoad && (
            <div className="hidden divide-y divide-gray-400 md:block">
              {cartItems.map((item, i) => {
                return <CartItem key={i} item={item} />;
              })}
            </div>
          )}

          {/* CART FOR MOBILE */}
          {!isInitialLoad && (
            <div className="divide-y divide-gray-400">
              {cartItems.map((item, i) => {
                return <MobileCartItem key={i} item={item} />;
              })}
            </div>
          )}

          {/* PAYMENT DETAILS */}
          {!isInitialLoad && cartItems.length > 0 ? (
            <div className="my-8 w-full border-t border-brand-200">
              <h2 className="mb-8 mt-4 text-xl font-bold capitalize text-brand-200">
                Payment Details
              </h2>

              <div className="grid sm:grid-cols-2 sm:gap-5">
                <div>
                  <h3 className="mb-1 font-bold text-brand-200">
                    Shipping Address
                  </h3>
                  {!defaultBillingInfo ? (
                    <p className="text-gray-400">No shipping address</p>
                  ) : (
                    <p className="text-brand-200">
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
                    <ul className="flex flex-col gap-3 text-brand-200">
                      <li>Product Total</li>
                      {/* <li>Options Total</li> */}
                      <li>Grand Total</li>
                    </ul>
                    <ul className="flex flex-col gap-3 text-brand-200 ">
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
                    className="mt-7 self-end rounded-full bg-brand-200 text-brand-100 hover:bg-brand-200"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            !isInitialLoad && (
              <div className="h-full space-y-4 py-10 text-center text-brand-200">
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
                  className=" rounded-full border-brand-200 bg-transparent text-brand-200 hover:border-brand-200 hover:bg-transparent hover:text-brand-200"
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
