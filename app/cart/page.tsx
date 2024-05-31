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
                  // {
                  //   name: "Shop",
                  //   link: "/shop",
                  // },
                  // {
                  //   name: "Cake Details",
                  //   link: "#",
                  //   fnx: () => router.back(),
                  // },
                  {
                    name: "Cart",
                    link: "/cart",
                  },
                ]}
              />
              <h2 className="text-goldie-300 mb-8 mt-4 text-2xl font-bold capitalize md:text-3xl">
                Cart({Object.values(cart).length})
              </h2>

              {/* CART FOR DESKTOP */}
              <>
                <div className="hidden sm:block">
                  <div className="border-goldie-300 mb-5 border-b pb-2 sm:grid sm:grid-cols-[2fr_1fr_1fr]">
                    <p className="text-goldie-300">Product</p>
                    <p className="text-goldie-300 w-[136px]">Quantity</p>
                    <p className="text-goldie-300 w-[100px]">Sub Total</p>
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
                            <h3 className="text-goldie-300 text-lg font-bold">
                              {item.name}
                            </h3>
                          </div>
                          <div className="inline-flex w-[100px] items-center justify-start gap-3 rounded-[50px] bg-white px-1.5 py-1">
                            <span
                              onClick={() =>
                                dispatch(decrementProductQty({ id: item.id }))
                              }
                              className="hover:bg-goldie-300 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300"
                            >
                              <BsDash size={24} />
                            </span>
                            <span className="font-bold">{item.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(incrementProductQty({ id: item.id }))
                              }
                              className="hover:bg-goldie-300 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300"
                            >
                              <BsPlus size={24} />
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-goldie-300 text-xl">
                              &euro; {item.maxPrice}
                            </span>
                            <span
                              onClick={() =>
                                dispatch(deleteProductFromCart({ id: item.id }))
                              }
                              className="text-goldie-300 cursor-pointer"
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
                          <h3 className="text-goldie-300 text-lg font-bold">
                            {item.name}
                          </h3>
                          <span className="text-goldie-300 inline-block text-lg">
                            &euro; {item.maxPrice}
                          </span>
                          <div className="mt-3 inline-flex items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
                            <span
                              onClick={() =>
                                dispatch(decrementProductQty({ id: item.id }))
                              }
                              className="hover:bg-goldie-300 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300"
                            >
                              <BsDash size={24} />
                            </span>
                            <span className="font-bold">{item.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(incrementProductQty({ id: item.id }))
                              }
                              className="hover:bg-goldie-300 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300"
                            >
                              <BsPlus size={24} />
                            </span>
                          </div>
                          <span
                            onClick={() =>
                              dispatch(deleteProductFromCart({ id: item.id }))
                            }
                            className="text-goldie-300 mt-3 inline-flex cursor-pointer items-center gap-3"
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
                <div className="border-goldie-300 my-8 w-full border-t">
                  <h2 className="text-goldie-300 mb-8 mt-4 text-xl font-bold capitalize">
                    Payment Details
                  </h2>

                  <div className="grid sm:grid-cols-2 sm:gap-5">
                    <div>
                      <h3 className="text-goldie-300 mb-1 font-bold">
                        Shipping Address
                      </h3>
                      <p className="text-goldie-300">
                        123 Westborough Street, London
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-end">
                      <div className="mt-6 flex w-full flex-wrap items-start justify-between sm:mt-0">
                        <ul className="text-goldie-300 flex flex-col gap-3">
                          <li>Product Total</li>
                          <li>Options Total</li>
                          <li>Grand Total</li>
                        </ul>
                        <ul className="text-goldie-300 flex flex-col gap-3">
                          <li>&euro;{cartTotal}</li>
                          <li>&euro;100</li>
                          <li>&euro;{cartTotal + 100}</li>
                        </ul>
                      </div>
                      <button className="bg-goldie-300 mt-7 self-end rounded-full px-5 py-2">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-goldie-300 space-y-2 text-center">
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
                    className="border-goldie-300 text-goldie-300 rounded-full border p-2"
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
