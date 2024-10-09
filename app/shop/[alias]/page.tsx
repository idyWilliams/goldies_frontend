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
  resetToastMessage,
} from "@/redux/features/product/productSlice";
import { cakeProducts1, cakeTimes } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { GiShoppingCart } from "react-icons/gi";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import StarRating from "@/components/StarRating";
import EachElement from "@/helper/EachElement";
import ProductStatusType from "@/components/shop-components/ProductStatusType";
import ProductReview from "@/components/shop-components/ProductReview";
import Select from "react-select";
import ProductCard from "@/components/shop-components/ProductCard";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "sonner";
import carrot from "../../../public/assets/carrot.jpeg";

const cakeSizes = [
  { value: "6-round", label: "6″ round serves 10 - 12" },
  { value: "6-square", label: "6″ square serves 16 – 18" },
  { value: "8-round", label: "8″ round serves 18 – 20" },
  { value: "8-square", label: "8″ square serves 30 – 32" },
  { value: "10-round", label: "10″ round serves 26 – 28" },
  { value: "10-square", label: "10″ square serves 48 – 50" },
];

const flavour = [
  { value: "vanilla", label: "Vanilla" },
  { value: "red-velvet", label: "Red Velvet" },
  { value: "lemon", label: "Lemon" },
  { value: "chocolate-chilli", label: "Chocolate Chilli" },
  { value: "strawberry", label: "Strawberry" },
];

const toppings = [
  { value: "decorative", label: "Decorative" },
  { value: "candy-and-sweet", label: "Candy and Sweet" },
  { value: "chocolate", label: "Chocolate" },
  { value: "unique-and-themed", label: "Unique and Themed" },
];

function generateSizeArray(minSize: any, maxSize: any) {
  const sizes = [];
  for (let i = minSize; i <= maxSize; i++) {
    sizes.push(i);
  }
  return sizes;
}

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

const schema = yup.object().shape({
  sizes: yup.string().required(),
  toppings: yup.string().required(),
  message: yup.string().required(),
});

interface FormValues {
  sizes: string;
  toppings: string;
  message: string;
}

function CakeDetailsPage({ params }: any) {
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flavour, setFlavour] = useState<SelectOptionType>(null);
  const [duration, setDuration] = useState<SelectOptionType>(null);
  const [addon, setAddon] = useState<SelectOptionType>(null);
  const [size, setSize] = useState<SelectOptionType>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const toastMessage = useSelector(
    (state: RootState) => state.product.toastMessage,
  );
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);
  console.log(cart, "cart");

  const cakes = addSlugToCakes(cakeProducts1);

  console.log(cakes, "kkk");
  const cakeProduct = useMemo(() => cakes, [cakes]);

  // console.log("Params Alias:", params);
  // console.log("Cake Products:", cakeProduct);

  const getProduct = cakeProduct.find(
    (product: { slug: any }) => product.slug === params.alias,
  );

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

  useEffect(() => {
    if (toastMessage) {
      toast(
        <div className="flex items-center p-3 gap-2">
          <Image
            src={getProduct?.imageUrl?.src}
            alt={getProduct?.name}
            width={40}
            height={40}
          />
          <strong>{toastMessage}</strong>

        </div>,
      );

      dispatch(resetToastMessage());
    }
  }, [toastMessage, dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!getProduct) {
    return <div>Product not found.</div>;
  }

  const selectTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // primary25: "hotpink",
      primary: "black",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
          <div className="wrapper py-4 md:grid md:grid-cols-2 md:items-start md:gap-4 lg:justify-evenly lg:gap-8 xl:grid-cols-[40%_50%] xl:gap-10">
            <div className="w-full overflow-hidden rounded-md md:h-3/4">
              <Image
                src={getProduct.imageUrl}
                alt={getProduct.slug}
                className="mx-auto h-full w-full object-cover object-center"
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
                <form
                  id="detail"
                  className="lg:w-[75%]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mt-4 space-y-3">
                    <label htmlFor="size" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*'] ">
                        Size
                      </span>
                      <Controller
                        control={control}
                        name="sizes"
                        render={({ field: { value, onChange } }) => {
                          console.log(value, "vavav");

                          return (
                            <Select
                              options={cakeSizes}
                              // value={value}
                              onChange={onChange}
                              theme={selectTheme}
                            />
                          );
                        }}
                      />
                    </label>
                    <label htmlFor="toppings" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*']">
                        Toppings
                      </span>
                      <Select options={toppings} theme={selectTheme} />
                    </label>
                    <label htmlFor="duration" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*'] ">
                        When do you need your cake?
                      </span>
                      <Select theme={selectTheme} options={cakeTimes} />
                      <p className="mt-1 text-sm">
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
                  <div className="grid grid-cols-2 gap-3 after:grid ">
                    <button
                      onClick={handleClick}
                      type="submit"
                      className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                    >
                      <div>
                        <Toaster
                          toastOptions={{
                            unstyled: true,
                            style: {
                              background: "black",
                              fontSize: "15px",
                              color: "yellow"
                            },
                          }}
                          position="top-right"
                          expand={true}
                          // richColors
                        />
                      </div>
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
        <section className="">
          <div className="wrapper">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="text-2xl font-bold">Related Product</h3>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-2xl font-bold text-green-700"
              >
                See All <ArrowRight />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_: any, index: number) => {
                return <ProductCard key={index} data={cakeProduct[index]} />;
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default CakeDetailsPage;
