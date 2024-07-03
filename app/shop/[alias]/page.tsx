"use client";
import Image from "next/image";

import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";

import { CgMenuCake } from "react-icons/cg";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  decrementProductQty,
  incrementProductQty,
} from "@/redux/features/product/productSlice";
import {
  cakeProducts1,
  cakeShapes,
  cakeSizes,
  cakeTimes,
  fillingsList,
  toppings,
} from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { GiShoppingCart } from "react-icons/gi";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import StarRating from "@/components/StarRating";
import EachElement from "@/helper/EachElement";
import ProductStatusType from "@/components/shop-components/ProductStatusType";
import ProductReview from "@/components/shop-components/ProductReview";

function generateSizeArray(minSize: any, maxSize: any) {
  const sizes = [];
  for (let i = minSize; i <= maxSize; i++) {
    sizes.push(i);
  }
  return sizes;
}

/* 
          <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
                  <li>6″ round serves 10 - 12</li>
                  <li>6″ square serves 16 – 18</li>
                  <li>8″ round serves 18 – 20</li>
                  <li>8″ square serves 30 – 32</li>
                  <li>10″ round serves 26 – 28</li>
                  <li>10″ square serves 48 – 50</li>
                </ul>

*/

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

function CakeDetailsPage({ params }: any) {
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fillings, setFillings] = useState<SelectOptionType>(null);
  const [shapes, setShapes] = useState<SelectOptionType>(null);
  const [duration, setDuration] = useState<SelectOptionType>(null);
  const [addons, setAddons] = useState<SelectOptionType>(null);
  const [sizes, setSizes] = useState<SelectOptionType>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);
  // console.log(cart, "cart");

  const cakes = addSlugToCakes(cakeProducts1);

  console.log(cakes, "kkk");
  const cakeProduct = useMemo(() => cakes, [cakes]);

  // console.log("Params Alias:", params);
  // console.log("Cake Products:", cakeProduct);

  const getProduct = cakeProduct.find(
    (product: { slug: any }) => product.slug === params.alias,
  );

  const data = {
    shape: create(shapes),
    size: create(sizes),
    filling: create(fillings),
    cakeDetails: {
      time: time,
      duration: create(duration),
      addons: create(addons),
    },
    message: message,
  };

  function create(value: any) {
    if (value !== null) {
      const { label, description } = value;
      return { label, description };
    }
  }

  const handleClick = () => {
    dispatch(addProductToCart({ id: getProduct.id }));
    console.log(getProduct.id);
    // setShapes(null)
  };

  // console.log(shapes, "shapes")

  const navigateToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    if (getProduct) {
      setLoading(false);
    }
  }, [getProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!getProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <Layout>
        <div className="mt-[64px] lg:mt-20" />
        <section className="bg-black py-4">
          <div className="wrapper">
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
                  name: getProduct ? getProduct.name : "",
                  link: "/shop/cakes",
                },
              ]}
            />
          </div>
        </section>
        <section className="">
          <div className="wrapper py-4">
            <div className="">
              <Image
                src={getProduct.imageUrl}
                alt={getProduct.slug}
                className="mx-auto h-full w-full object-cover"
              />
            </div>

            <div className="mb-1 flex flex-col text-lg">
              <span className="text-base font-semibold text-neutral-500">
                &euro;{getProduct?.minPrice} - &euro;{getProduct?.maxPrice}
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold capitalize">
                  {getProduct?.name}
                </h3>
                <ProductStatusType
                  status={getProduct?.type}
                  className="text-sm"
                />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <StarRating iconSize={24} canRate={false} defaultRating={4} />
                <span
                  className="cursor-pointer underline"
                  onClick={() => setShowReviews((prev: any) => !prev)}
                >
                  {showReviews ? "Hide reviews" : "See reviews"}
                </span>
              </div>

              {/* CAKE DESCRIPTION */}
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-neutral-600">
                  A red crimson,or scalet colored layer cake,layered with ermine
                  icing.
                </p>
                <ul className="mt-1.5 space-y-1">
                  <li className="">
                    <span className="font-semibold">Category:</span>
                    <span>&nbsp;Milestone Cakes</span>
                  </li>
                  <li className="">
                    <span className="font-semibold">Subcategory:</span>
                    <span>&nbsp;Birthday Cakes</span>
                  </li>
                </ul>
              </div>

              {/* CUSTOM PICK */}
              {showReviews ? (
                <ProductReview setShowReviews={setShowReviews} />
              ) : (
                <form id="detail">
                  <div className="mt-4 space-y-3">
                    <label htmlFor="size" className="block w-full">
                      <span className="mb-1.5 inline-block">Size</span>
                      <CustomSelect
                        selectedOption={sizes}
                        setSelectOption={setSizes}
                        options={cakeSizes || []}
                      />
                    </label>
                    <label htmlFor="toppings" className="block w-full">
                      <span className="mb-1.5 inline-block">Toppings</span>
                      <CustomSelect
                        selectedOption={addons}
                        setSelectOption={setAddons}
                        options={toppings || []}
                      />
                    </label>
                    <label htmlFor="duration" className="block w-full">
                      <span className="mb-1.5 inline-block">
                        When do you need your cake?
                      </span>
                      <CustomSelect
                        selectedOption={duration}
                        setSelectOption={setDuration}
                        options={cakeTimes || []}
                      />
                      <p className="text-sm">
                        48hours is the minimum time required for all cake orders
                      </p>
                    </label>
                    <label htmlFor="message" className="block w-full">
                      <span className="mb-1.5 inline-block">
                        Additional Cake Details
                      </span>
                      <textarea
                        name="message"
                        id="message"
                        className="form-textarea h-[120px] w-full rounded-lg border-2 border-neutral-900 focus:border-neutral-900 focus:ring-neutral-900"
                      ></textarea>
                    </label>
                  </div>
                  <div className="my-3 inline-flex gap-3">
                    <span>Quantity</span>
                    <div className="inline-flex items-center gap-2 rounded-md bg-neutral-200 px-3 py-1 tabular-nums">
                      <span
                        className="cursor-pointer font-semibold"
                        onClick={() =>
                          setQuantity((prev: any) =>
                            prev === 1 ? prev : prev - 1,
                          )
                        }
                      >
                        <BsDash />
                      </span>
                      <span className="font-semibold">{quantity}</span>
                      <span
                        className="cursor-pointer font-semibold"
                        onClick={() => setQuantity((prev: any) => prev + 1)}
                      >
                        <BsPlus />
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="submit"
                      className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                    >
                      Buy now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default CakeDetailsPage;
