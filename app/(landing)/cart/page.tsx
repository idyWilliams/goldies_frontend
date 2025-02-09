"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import illustration from "@/public/assets/illistration-removebg-preview.png";
import Image from "next/image";
import { BsPlus, BsDash, BsTrash } from "react-icons/bs";
import Layout from "../layout";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { GiEmptyChessboard } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  decrementProductQty,
  deleteProductFromCart,
  incrementProductQty,
  setProducts,
} from "@/redux/features/product/productSlice";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useAppSelector((state) => state.product);
  const router = useRouter();

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
    console.log(cart, "cart");
    console.log(cartTotal, "cartTotal");
    router.push("/billing");
  };

  // RETRIEVE CART ITEMS FROM LOCALSTORAGE ON INITIAL RENDER
  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      dispatch(setProducts(JSON.parse(localStorage.getItem("cart") as string)));
    }
  }, [dispatch]);

  return (
    <>
      <>
        <section className="bg-gradient-to-br from-black to-neutral-700 py-16 pt-20">
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
                <div className="mb-5 border-b border-goldie-300 pb-2 sm:grid sm:grid-cols-[2fr_1fr_1fr]">
                  <p className="text-goldie-300">Product</p>
                  <p className="w-[136px] text-goldie-300">Quantity</p>
                  <p className="w-[100px] text-goldie-300">Sub Total</p>
                </div>
              )}

              {/* CART FOR DESKTOP */}
              <>
                <div className="hidden sm:block">
                  {cartItems.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full items-start justify-start sm:inline-grid sm:grid-cols-[2fr_1fr_1fr]"
                      >
                        <div className="flex gap-3">
                          <figure className="h-[80px] w-[100px]">
                            <Image
                              src={item.images[0]}
                              alt="Lemon Cake"
                              className="h-full w-full object-cover"
                              width={300}
                              height={300}
                            />
                          </figure>
                          <h3 className="text-lg font-bold text-goldie-300">
                            {item.name}
                          </h3>
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
                          <span className="font-bold">{item.quantity}</span>
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
                          <span className="text-xl text-goldie-300">
                            &euro; {item.maxPrice}
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
              </>

              <>
                {cartItems.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[170px_1fr] gap-4 sm:hidden"
                    >
                      <figure className="h-[150px] w-full">
                        <Image
                          src={item.images[0]}
                          alt="Lemon Cake"
                          className="h-full w-full object-cover"
                          width={300}
                          height={300}
                        />
                      </figure>
                      <div className="flex flex-col items-start">
                        <h3 className="text-lg font-bold text-goldie-300">
                          {item.name}
                        </h3>
                        <span className="inline-block text-lg text-goldie-300">
                          &euro; {item.maxPrice}
                        </span>
                        <div className="mt-3 inline-flex items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
                          <span
                            onClick={() =>
                              dispatch(decrementProductQty({ id: item._id }))
                            }
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                          >
                            <BsDash size={24} />
                          </span>
                          <span className="font-bold">{item.quantity}</span>
                          <span
                            onClick={() =>
                              dispatch(incrementProductQty({ id: item._id }))
                            }
                            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-goldie-300"
                          >
                            <BsPlus size={24} />
                          </span>
                        </div>
                        <span
                          onClick={() =>
                            dispatch(deleteProductFromCart({ id: item._id }))
                          }
                          className="mt-3 inline-flex cursor-pointer items-center gap-3 text-goldie-300"
                        >
                          <BsTrash size={16} />
                          Delete
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>

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
                      <p className="text-goldie-300">
                        123 Westborough Street, London
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-end">
                      <div className="mt-6 flex w-full flex-wrap items-start justify-between sm:mt-0">
                        <ul className="flex flex-col gap-3 text-goldie-300">
                          <li>Product Total</li>
                          <li>Options Total</li>
                          <li>Grand Total</li>
                        </ul>
                        <ul className="flex flex-col gap-3 text-goldie-300">
                          <li>&euro;{cartTotal}</li>
                          <li>&euro;100.00</li>
                          <li>&euro;{cartTotal + 100}</li>
                        </ul>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="mt-7 cursor-pointer self-end rounded-full bg-goldie-300 px-5 py-2"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-10 text-center text-goldie-300">
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
      </>
    </>
  );
};

export default CartPage;
