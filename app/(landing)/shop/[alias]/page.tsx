"use client";
import Image from "next/image";

import BreadCrumbs from "@/components/BreadCrumbs";

import { BsDash, BsPlus } from "react-icons/bs";

import ProductCard from "@/components/shop-components/ProductCard";
import ProductReview from "@/components/shop-components/ProductReview";
import ProductStatusType from "@/components/shop-components/ProductStatusType";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { addSlugToCakes, slugify } from "@/helper";
import EachElement from "@/helper/EachElement";
import { formatCurrency } from "@/helper/formatCurrency";
import { ProductParams } from "@/interfaces/product.interface";
import Placeholder from "@/public/assets/placeholder3.png";
import {
  addProductToCart,
  setBuyNowProduct,
} from "@/redux/features/product/productSlice";
import { getActiveProduct, getAllProducts } from "@/services/hooks/products";
import { cakeTimes } from "@/utils/cakeData";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import * as yup from "yup";
import useIsLoggedIn from "@/services/hooks/users/useIsLoggedIn";
import { addToCart } from "@/services/hooks/cart";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DialogCloseButton } from "@/components/DialogModal";
import { Loader2 } from "lucide-react";
import { ErrorResponse } from "@/types/products";
// import {
//   cakeSizes,
//   toppings,
//   cakeShapes,
//   fillingsList,
// } from "@/utils/productDetails";

const cakeSizes = [
  { value: "6-round", label: "6″ round serves 10 - 12" },
  { value: "6-square", label: "6″ square serves 16 – 18" },
  { value: "8-round", label: "8″ round serves 18 – 20" },
  { value: "8-square", label: "8″ square serves 30 – 32" },
  { value: "10-round", label: "10″ round serves 26 – 28" },
  { value: "10-square", label: "10″ square serves 48 – 50" },
];

const flavours = [
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
export type SelectOptionUserType =
  | {
      label: string | number;
      value: string | number;
    }[]
  | undefined;

const schema = yup.object().shape({
  sizes: yup.string().required("Size is required"),
  toppings: yup.string().required("Topping is required"),
  flavours: yup.string().required("Flavour is required"),
  cakeTimes: yup.string().required("When do you need your cake?"),
  message: yup.string(),
});

interface FormValues {
  sizes: string;
  toppings: string;
  flavours: string;
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

function CakeDetailsPage() {
  const { activeProduct, setActiveProduct, allProducts, setAllProducts } =
    useUserPdctStore();
  const queryParams = useSearchParams();
  const productId = queryParams.get("productId");
  const [isLoaded, setIsLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isLogin = useIsLoggedIn();

  const featuredPdctLength = () => {
    if (isDesktop) {
      return 4;
    }
    if (isLaptop) {
      return 3;
    }
    if (isTablet) {
      return 2;
    }
    return 2;
  };

  const [featuredPdcts, setFeaturedProducts] = useState<any[] | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const [previewFav, setPreviewFav] = useState(false);
  const queryClient = useQueryClient();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      // const newToppings = toppings.filter((topping: any) => {
      //   return product.toppings.find((top: string) => topping.value === top);
      // });
      // console.log(newToppings);

      // setAddon(newToppings);

      setActiveProduct(product);
    }
  }, [data, setActiveProduct]);

  const params: ProductParams = {
    page: 1,
    limit: 6,
  };

  const {
    data: otherProducts,
    isError: allproductsError,
    isLoading: allProductsLoading,
  } = useQuery({
    queryKey: ["allProducts", 1, 6],
    queryFn: async () => getAllProducts(params),
    enabled: allProducts.length === 0,
  });

  const similarProducts = useMemo(() => {
    if (otherProducts) {
      return otherProducts.products;
    }
  }, [otherProducts]);

  useEffect(() => {
    if (similarProducts) {
      setAllProducts(addSlugToCakes(similarProducts));
    }
  }, [similarProducts, setAllProducts]);

  useEffect(() => {
    if (allProducts) {
      const getSimilarProducts = allProducts.filter(
        (product: { slug: string }) => product.slug !== activeProduct?.slug,
      );
      setFeaturedProducts(getSimilarProducts);
    }
  }, [allProducts, activeProduct?.slug]);

  function create(value: any) {
    if (value !== null) {
      const { label, description } = value;
      return { label, description };
    }
  }

  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setPreviewFav(false);
      queryClient.invalidateQueries({ queryKey: ["cartList"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setPreviewFav(false);
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  // const handleAddToCart = handleSubmit((data) => {
  //   if (data.sizes && data.toppings && data.cakeTimes) {
  //     dispatch(
  //       addProductToCart({
  //         id: activeProduct?._id as string,
  //         quantity: quantity,
  //         cakeDetails: {
  //           size: data.sizes,
  //           topping: data.toppings,
  //           flavour: data.flavours,
  //           cakeTime: data.cakeTimes,
  //           message: data.message,
  //         },
  //       }),
  //     );

  //     console.log("added product>>", data);
  //   } else {
  //     console.error(
  //       "Please fill in all required fields before adding to cart.",
  //     );
  //   }
  // });

  const handleAddToCart = handleSubmit((data) => {
    if (!data.sizes && !data.cakeTimes && !data.flavours && !data.toppings) {
      return;
    }
    console.log("cake data is ", data);
    if (!isLogin) {
      setPreviewFav(false);
      return;
    }

    cartMutation.mutate({
      product: activeProduct?._id as string,
      quantity: quantity,
      size: data.sizes,
      toppings: data.toppings,
      flavour: data.flavours,
      dateNeeded: data.cakeTimes || "",
      details: data.message || "",
    });
  });

  const handleBuyNow = handleSubmit((data) => {
    if (data.sizes && data.toppings && data.cakeTimes) {
      // Dispatch action to store product details in Redux state
      dispatch(
        setBuyNowProduct({
          id: activeProduct?._id as string,
          quantity: quantity,
          cakeDetails: {
            size: data.sizes,
            topping: data.toppings,
            flavour: data.flavours,
            cakeTime: data.cakeTimes,
            message: data.message,
          },
        }),
      );

      // Navigate to billing page
      router.push(`/billing?buyNow=true`);
    } else {
      console.error(
        "Please fill in all required fields before proceeding to checkout.",
      );
    }
  });

  const navigateToCart = () => {
    router.push("/cart");
  };

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

  return (
    <div>
      <div className="bg-black py-4">
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
      </div>
      <div className="py-12">
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
                  activeProduct.images.length > 0
                    ? activeProduct.images[0]
                    : exampleImage
                }
                alt={activeProduct.slug}
                fill
                sizes="(max-width: 1024px) 33vw"
                className={`mx-auto object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setIsLoaded(true)}
              />
            </div>

            <div className="mb-1 flex flex-col text-lg">
              <span className="text-base font-semibold text-neutral-500">
                {formatCurrency(parseInt(activeProduct?.minPrice), "en-NG")} -{" "}
                {formatCurrency(parseInt(activeProduct?.maxPrice), "en-NG")}
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
                      {activeProduct?.subCategories.map((subCat) =>
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
                  onSubmit={handleAddToCart}
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
                        <p className="text-sm text-red-500">
                          {errors.sizes.message}
                        </p>
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
                        <p className="text-sm text-red-500">
                          {errors.toppings.message}
                        </p>
                      )}
                    </label>
                    <label htmlFor="flavours" className="block w-full">
                      <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*']">
                        Flavour
                      </span>
                      {/* <Select options={toppings} theme={selectTheme} /> */}
                      <Controller
                        control={control}
                        name="flavours"
                        render={({ field: { value, onChange, ref } }) => {
                          return (
                            <Select
                              options={flavours}
                              value={flavours.find(
                                (option) => option.value === value,
                              )}
                              onChange={(selected) => onChange(selected?.value)}
                              ref={ref}
                              theme={selectTheme}
                            />
                          );
                        }}
                      />
                      {errors.flavours && (
                        <p className="text-sm text-red-500">
                          {errors.flavours.message}
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
                        <p className="text-sm text-red-500">
                          {errors.cakeTimes.message}
                        </p>
                      )}
                    </label>
                    <label htmlFor="message" className="block w-full">
                      <span className="mb-1.5 inline-block">
                        Additional Cake Details
                      </span>
                      <textarea
                        {...register("message")}
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
                  <div className="mt-4 grid grid-cols-2 gap-3 after:grid">
                    <Button
                      type="button"
                      size={"lg"}
                      variant={"secondary"}
                      className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                      onClick={handleBuyNow}
                    >
                      Buy now
                    </Button>

                    {isLogin ? (
                      <Button
                        type="submit"
                        size={"lg"}
                        className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                        disabled={cartMutation.isPending}
                      >
                        {cartMutation.isPending && (
                          <Loader2 className="animate-spin mr-1" />
                        )}
                        Add to cart
                      </Button>
                    ) : (
                      <DialogCloseButton setPreviewFav={setPreviewFav}>
                        <Button
                          type="submit"
                          size={"lg"}
                          className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                        >
                          Add to cart
                        </Button>
                      </DialogCloseButton>
                    )}
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

            {featuredPdcts && featuredPdcts?.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <EachElement
                  of={featuredPdcts}
                  render={(item: any, index: number) => {
                    if (index >= featuredPdctLength()) return;
                    return <ProductCard data={item} key={item._id} />;
                  }}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CakeDetailsPage;
