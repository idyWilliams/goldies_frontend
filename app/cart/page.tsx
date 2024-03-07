"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import illustration from "../../public/assets/illistration-removebg-preview.png";
import Image from "next/image";
import { BsPlus, BsDash, BsTrash } from "react-icons/bs";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { GiEmptyChessboard } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  decrementProductQty,
  deleteProductFromCart,
  incrementProductQty,
} from "@/redux/features/product/productSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const router = useRouter();
  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);
  console.log(cart, "cart");
  console.log(cartTotal, "cartTotal");

  return (
    <>
      <Layout>
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
                    name: "Shop",
                    link: "/shop",
                  },
                  {
                    name: "Cake Details",
                    link: "#",
                    fnx: () => router.back(),
                  },
                  {
                    name: "Cart",
                    link: "/cart",
                  },
                ]}
              />
              <h2 className="mb-8 mt-4 text-2xl font-bold capitalize text-main md:text-3xl">
                Cart({Object.values(cart).length})
              </h2>

              {/* CART FOR DESKTOP */}
              <>
                <div className="hidden sm:block">
                  <div className="mb-5 border-b border-main pb-2 sm:grid sm:grid-cols-[2fr_1fr_1fr]">
                    <p className="text-main">Product</p>
                    <p className="w-[136px] text-main">Quantity</p>
                    <p className="w-[100px] text-main">Sub Total</p>
                  </div>
                  {Object.values(cart).length >= 1 &&
                    Object.values(cart).map((item, idx) => {
                      return (
                        <div
                          key={item.id}
                          className="w-full items-start justify-start sm:inline-grid sm:grid-cols-[2fr_1fr_1fr]"
                        >
                          <div className="flex gap-3">
                            <figure className="h-[80px] w-[100px]">
                              <Image
                                src={item.imageUrl}
                                alt="Lemon Cake"
                                className="h-full w-full object-cover"
                              />
                            </figure>
                            <h3 className="text-lg font-bold text-main">
                              {item.name}
                            </h3>
                          </div>
                          <div className="inline-flex w-[100px] items-center justify-start gap-3 rounded-[50px] bg-white px-1.5 py-1">
                            <span
                              onClick={() =>
                                dispatch(decrementProductQty({ id: item.id }))
                              }
                              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                            >
                              <BsDash size={24} />
                            </span>
                            <span className="font-bold">{item.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(incrementProductQty({ id: item.id }))
                              }
                              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                            >
                              <BsPlus size={24} />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xl text-main">
                              &euro; {item.maxPrice}
                            </span>
                            <span
                              onClick={() =>
                                dispatch(deleteProductFromCart({ id: item.id }))
                              }
                              className="cursor-pointer text-main"
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
                {Object.values(cart).length >= 1 &&
                  Object.values(cart).map((item, idx) => {
                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-[170px_1fr] gap-4 sm:hidden"
                      >
                        <figure className="h-[150px] w-full">
                          <Image
                            src={item.imageUrl}
                            alt="Lemon Cake"
                            className="h-full w-full object-cover"
                          />
                        </figure>
                        <div className="flex flex-col items-start">
                          <h3 className="text-lg font-bold text-main">
                            {item.name}
                          </h3>
                          <span className="inline-block text-lg text-main">
                            &euro; {item.maxPrice}
                          </span>
                          <div className="mt-3 inline-flex items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
                            <span
                              onClick={() =>
                                dispatch(decrementProductQty({ id: item.id }))
                              }
                              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                            >
                              <BsDash size={24} />
                            </span>
                            <span className="font-bold">{item.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(incrementProductQty({ id: item.id }))
                              }
                              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                            >
                              <BsPlus size={24} />
                            </span>
                          </div>
                          <span
                            onClick={() =>
                              dispatch(deleteProductFromCart({ id: item.id }))
                            }
                            className="mt-3 inline-flex cursor-pointer items-center gap-3 text-main"
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
              {Object.values(cart).length >= 1 ? (
                <div className="my-8 w-full border-t border-main">
                  <h2 className="mb-8 mt-4 text-xl font-bold capitalize text-main">
                    Payment Details
                  </h2>

                  <div className="grid sm:grid-cols-2 sm:gap-5">
                    <div>
                      <h3 className="mb-1 font-bold text-main">
                        Shipping Address
                      </h3>
                      <p className="text-main">
                        123 Westborough Street, London
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-end">
                      <div className="mt-6 flex w-full flex-wrap items-start justify-between sm:mt-0">
                        <ul className="flex flex-col gap-3 text-main">
                          <li>Product Total</li>
                          <li>Options Total</li>
                          <li>Grand Total</li>
                        </ul>
                        <ul className="flex flex-col gap-3 text-main">
                          <li>&euro;{cartTotal}</li>
                          <li>&euro;100</li>
                          <li>&euro;{cartTotal + 100}</li>
                        </ul>
                      </div>
                      <button className="mt-7 self-end rounded-full bg-main px-5 py-2">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-center text-main">
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
                  <button
                    onClick={() => router.push("/shop")}
                    className="rounded-full border border-main p-2 text-main"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CartPage;
