"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IBillingInfo } from "@/interfaces/user.interface";
import illustration from "@/public/assets/illistration-removebg-preview.png";
import {
  decrementProductQty,
  deleteProductFromCart,
  incrementProductQty,
  setProducts,
} from "@/redux/features/product/productSlice";
import { useAppSelector } from "@/redux/hook";
import { getAllBllingInfo } from "@/services/hooks/payment";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.product);
  const router = useRouter();
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
          acc + parseFloat(current.maxPrice) * (current.quantity as number),
        0,
      ),
    [cartItems],
  );

  const handleCheckout = () => {
    router.push("/billing");
  };

  // RETRIEVE CART ITEMS FROM LOCALSTORAGE ON INITIAL RENDER
  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(setProducts(JSON.parse(localStorage.getItem("cart") as string)));
    }
  }, [dispatch]);

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

          {cartItems.length > 0 && (
            <div className="mb-5 grid grid-cols-[2fr_1fr] border-b border-goldie-300 pb-2 sm:grid-cols-[2fr_1fr_1fr]">
              <p className="text-lg font-semibold text-goldie-300">Product</p>
              <p className="hidden text-lg font-semibold text-goldie-300 md:block">
                Quantity
              </p>
              <p className="text-lg font-semibold text-goldie-300">Sub Total</p>
            </div>
          )}

          {/* CART FOR DESKTOP */}
          <div className="hidden divide-y divide-gray-400 sm:block">
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="w-full items-start justify-start py-3 sm:inline-grid sm:grid-cols-[2fr_1fr_1fr]"
                >
                  <div className="flex gap-4">
                    <Link href={`/shop/${item?.slug}?productId=${item?._id}`}>
                      <figure className="h-[80px] w-[80px]">
                        <Image
                          src={item.images[0]}
                          alt="Lemon Cake"
                          className="h-full w-full object-cover"
                          width={300}
                          height={300}
                        />
                      </figure>
                    </Link>
                    <h3 className="text-goldie-300">{item.name}</h3>
                  </div>
                  <div className="inline-flex w-[100px] items-center justify-start gap-3 rounded-[50px] bg-white px-1.5 py-1">
                    <span
                      onClick={() =>
                        dispatch(decrementProductQty({ id: item._id }))
                      }
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                    >
                      <BsDash size={24} />
                    </span>
                    <span className="">{item.quantity}</span>
                    <span
                      onClick={() =>
                        dispatch(incrementProductQty({ id: item._id }))
                      }
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                    >
                      <BsPlus size={24} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className=" text-goldie-300">
                      {formatCurrency(parseInt(item.maxPrice), "en-NG")}
                    </span>
                    <span
                      onClick={() =>
                        dispatch(deleteProductFromCart({ id: item?._id }))
                      }
                      className="cursor-pointer text-goldie-300"
                    >
                      <BsTrash size={20} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="divide-y divide-gray-400">
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-[2fr_1fr] py-3 sm:grid-cols-[2fr_1fr_1fr] md:hidden"
                >
                  <div className="flex gap-6 pr-8">
                    <figure className="h-[60px] w-[60px] shrink-0">
                      <Image
                        src={item.images[0]}
                        alt="Lemon Cake"
                        className="h-full w-full object-cover"
                        width={300}
                        height={300}
                      />
                    </figure>

                    <div className="flex flex-col">
                      <h3 className=" text-goldie-300">{item.name}</h3>
                      <div className="mt-3 inline-flex w-fit items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
                        <span
                          onClick={() =>
                            dispatch(decrementProductQty({ id: item._id }))
                          }
                          className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                        >
                          <BsDash size={20} />
                        </span>
                        <span className="">{item.quantity}</span>
                        <span
                          onClick={() =>
                            dispatch(incrementProductQty({ id: item._id }))
                          }
                          className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                        >
                          <BsPlus size={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start ">
                    <span className="inline-block  text-goldie-300">
                      {formatCurrency(parseInt(item.maxPrice), "en-NG")}
                    </span>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() =>
                        dispatch(deleteProductFromCart({ id: item._id }))
                      }
                      className=" inline-flex cursor-pointer items-center gap-3 text-goldie-300"
                    >
                      <BsTrash size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAYMENT DETAILS */}
          {cartItems.length > 0 ? (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
