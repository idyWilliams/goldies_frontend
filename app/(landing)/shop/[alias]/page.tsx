"use client";
import Image from "next/image";

import BreadCrumbs from "@/components/BreadCrumbs";

import { BsDash, BsPlus } from "react-icons/bs";

import { CgMenuCake } from "react-icons/cg";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  decrementProductQty,
  incrementProductQty,
  // resetToastMessage,
} from "@/redux/features/product/productSlice";
import { cakeProducts1, cakeTimes } from "@/utils/cakeData";
import { addSlugToCakes, slugify } from "@/helper";
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
import { Toaster } from "sonner";
import useUserPdctStore from "@/zustand/userProductStore/store";
import Placeholder from "@/public/assets/placeholder3.png";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getActiveProduct, getAllProducts } from "@/services/hooks/products";

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
  sizes: yup.string().required("Size is required"),
  toppings: yup.string().required("Topping is required"),
  cakeTimes: yup.string().required("cakeTimes is required"),
  // message: yup.string().required("Input any additional info"),
});

interface FormValues {
  sizes: string;
  toppings: string;
  cakeTimes: string;
  // message: string;
}

const setToUpperCase = (sentence: string) => {
  const uppercaseWord = sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return uppercaseWord;
};

const exampleImage =
  "https://firebasestorage.googleapis.com/v0/b/goldie-b3ba7.appspot.com/o/products%2Fbanana-cake-with-cinnamon-cream-102945-1.webp?alt=media&token=32e645da-9327-4f7f-9f79-a2cba1102676";

function CakeDetailsPage({ params }: any) {
  const activeProduct = useUserPdctStore((state) => state.activeProduct);
  const setActiveProduct = useUserPdctStore((state) => state.setActiveProduct);
  const allProducts = useUserPdctStore((state) => state.allProducts);
  console.log(activeProduct);
  console.log(params);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  console.log(productId);
  const [isLoaded, setIsLoaded] = useState(false);

  const [showReviews, setShowReviews] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [flavour, setFlavour] = useState<SelectOptionType>(null);
  const [duration, setDuration] = useState<SelectOptionType>(null);
  const [addon, setAddon] = useState<SelectOptionType>(null);
  const [size, setSize] = useState<SelectOptionType>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  // const toastMessage = useSelector(
  //   (state: RootState) => state.product.toastMessage,
  // );
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // register,
  // handleSubmit,

  // reset,

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  console.log(productId);
  console.log(activeProduct);

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ["allProducts", productId],
    queryFn: async () => productId && getActiveProduct(productId),
  });

  useEffect(() => {
    if (data) {
      const product = {
        ...data.productDetails,
        slug: slugify(data.productDetails.name),
      };

      setActiveProduct(product);
    }
  }, [data, setActiveProduct]);

  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);
  console.log(cart, "cart");

  const cakes = addSlugToCakes(allProducts);

  console.log(cakes, "kkk");
  // const cakeProduct = useMemo(() => cakes, [cakes]);

  const getSimilarProducts = allProducts.filter(
    (product: { slug: any }) => product.slug !== activeProduct.slug,
  );
  console.log(getSimilarProducts);

  function create(value: any) {
    if (value !== null) {
      const { label, description } = value;
      return { label, description };
    }
  }

  activeProduct.category.name && setToUpperCase(activeProduct.category?.name);

  // const handleClick = () => {
  //   console.log(getProduct.id);
  //   // setShapes(null)
  // };
  const handleClick = handleSubmit((data) => {
    if (data.sizes && data.toppings && data.cakeTimes) {
      dispatch(addProductToCart({ id: activeProduct._id }));
      console.log(activeProduct._id);
    } else {
      console.error(
        "Please fill in all required fields before adding to cart.",
      );
    }
  });

  // console.log(shapes, "shapes")

  const navigateToCart = () => {
    router.push("/cart");
  };

  // useEffect(() => {
  //   if (getProduct) {
  //     setLoading(false);
  //   }
  // }, [getProduct]);

  // useEffect(() => {
  //   if (toastMessage) {
  //     toast(
  //       <div className="flex items-center gap-2 p-3">
  //         <Image
  //           src={getProduct?.imageUrl?.src}
  //           alt={getProduct?.name}
  //           width={40}
  //           height={40}
  //         />
  //         <strong>{toastMessage}</strong>
  //       </div>,
  //     );

  //     dispatch(resetToastMessage());
  //   }
  // }, [toastMessage, dispatch, getProduct?.imageUrl?.src, getProduct?.name]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!activeProduct) {
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
    console.log("cake data is ", data);
  };

  return (
    <>
      <>
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
                  name: activeProduct ? activeProduct.name : "",
                  link: "/shop/cakes",
                },
              ]}
            />
          </div>
        </section>
        <section className="">
          <div className="wrapper py-4 md:grid md:grid-cols-2 md:items-start md:gap-4 lg:justify-evenly lg:gap-8 xl:grid-cols-[40%_50%] xl:gap-10">
            <div className="relative w-full overflow-hidden rounded-md md:h-3/4">
              {!isLoaded && (
                <Image
                  src={Placeholder}
                  alt="placeholder for image"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 33vw"
                  className="animate-pulse object-cover object-center"
                />
              )}
              <Image
                src={
                  activeProduct.images[0].includes("example")
                    ? exampleImage
                    : activeProduct.images[0]
                }
                alt={activeProduct.slug}
                fill
                sizes="(max-width: 1024px) 33vw"
                className={`mx-auto object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setIsLoaded(true)}
              />

              {/* <Image
            src={
              data.images[0].includes("example") ? exampleImage : data.images[0]
            }
            // src={data?.imageUrl ? data?.imageUrl : data.images[0]}
            alt={data?.name}
            fill
            sizes="(max-width: 1440px) 33vw"
            className={`object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
          /> */}
            </div>

            <div className="mb-1 flex flex-col text-lg">
              <span className="text-base font-semibold text-neutral-500">
                &euro;{activeProduct?.minPrice} - &euro;
                {activeProduct?.maxPrice}
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold capitalize">
                  {setToUpperCase(activeProduct?.name)}
                </h3>

                <ProductStatusType
                  status={setToUpperCase(activeProduct?.productType)}
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
                <p className="text-neutral-600">{activeProduct?.description}</p>
                <ul className="mt-1.5 space-y-1">
                  <li className="">
                    <span className="font-semibold">Category:</span>
                    <span>
                      &nbsp;{setToUpperCase(activeProduct?.category?.name)}
                    </span>
                  </li>
                  <li className="">
                    <span className="font-semibold">Subcategory:</span>
                    <span>
                      &nbsp;
                      {activeProduct?.subCategory.map((subCat: any) =>
                        setToUpperCase(subCat.name),
                      )}
                    </span>
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
                        render={({ field: { value, onChange, ref } }) => {
                          console.log(value, "vavav");

                          return (
                            <Select
                              options={cakeSizes}
                              value={cakeSizes.find(
                                (option) => option.value === value,
                              )}
                              onChange={(selected) => onChange(selected?.value)}
                              ref={ref}
                              theme={selectTheme}
                            />
                          );
                        }}
                      />
                      {errors.sizes && (
                        <p className="text-red-500">{errors.sizes.message}</p>
                      )}
                    </label>
                    <label htmlFor="toppings" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*']">
                        Toppings
                      </span>
                      {/* <Select options={toppings} theme={selectTheme} /> */}
                      <Controller
                        control={control}
                        name="toppings"
                        render={({ field: { value, onChange, ref } }) => {
                          console.log(value, "vavav");

                          return (
                            <Select
                              options={toppings}
                              value={toppings.find(
                                (option) => option.value === value,
                              )}
                              onChange={(selected) => onChange(selected?.value)}
                              ref={ref}
                              theme={selectTheme}
                            />
                          );
                        }}
                      />
                      {errors.toppings && (
                        <p className="text-red-500">
                          {errors.toppings.message}
                        </p>
                      )}
                    </label>
                    <label htmlFor="cakeTimes" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*'] ">
                        When do you need your cake?
                      </span>
                      {/* <Select theme={selectTheme} options={cakeTimes} /> */}
                      <Controller
                        control={control}
                        name="cakeTimes"
                        render={({ field: { value, onChange, ref } }) => {
                          console.log(value, "vavav");

                          return (
                            <Select
                              options={cakeTimes}
                              value={cakeTimes.find(
                                (option) => option.value === value,
                              )}
                              onChange={(selected) => onChange(selected?.value)}
                              ref={ref}
                              theme={selectTheme}
                            />
                          );
                        }}
                      />
                      <p className="mt-1 text-sm">
                        48hours is the minimum time required for all cake orders
                      </p>
                      {errors.cakeTimes && (
                        <p className="text-red-500">
                          {errors.cakeTimes.message}
                        </p>
                      )}
                    </label>
                    <label htmlFor="message" className="block w-full">
                      <span className="mb-1.5 inline-block">
                        Additional Cake Details
                      </span>
                      <textarea
                        // {...register("message")}
                        name="message"
                        id="message"
                        className="form-textarea h-[120px] w-full rounded-lg border-2 border-neutral-900 focus:border-neutral-900 focus:ring-neutral-900"
                      ></textarea>
                      {/* {errors.message && (
                        <p className="text-red-500">{errors.message.message}</p>
                      )} */}
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
                      type="button"
                      className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                    >
                      Buy now
                    </button>
                    <button
                      onClick={handleClick}
                      type="submit"
                      className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                    >
                      Add to cart
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
                return (
                  <ProductCard key={index} data={getSimilarProducts[index]} />
                );
              })}
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default CakeDetailsPage;
