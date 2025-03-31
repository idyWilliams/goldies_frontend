"use client";

import BreadCrumbs from "@/components/BreadCrumbs";

import { BsDash, BsPlus } from "react-icons/bs";

import { DialogCloseButton } from "@/components/DialogModal";
import ProductCard from "@/components/shop-components/ProductCard";
import ProductReview from "@/components/shop-components/ProductReview";
import ProductStatusType from "@/components/shop-components/ProductStatusType";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import EachElement from "@/helper/EachElement";
import { formatCurrency } from "@/helper/formatCurrency";
import { IProduct, ProductParams } from "@/interfaces/product.interface";
import { addToCart } from "@/services/hooks/cart";
import useCart from "@/services/hooks/cart/useCart";
import { getAllProducts, getProductBySlug } from "@/services/hooks/products";
import useIsLoggedIn from "@/services/hooks/users/useIsLoggedIn";
import { ErrorResponse } from "@/types/products";
import { cakeTimes } from "@/utils/cakeData";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MultiSelect, Option } from "react-multi-select-component";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { toast } from "sonner";
import * as yup from "yup";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton ";
import ProductError from "./ProductError";
import ProductImages from "./ProductImages";
import { useAppDispatch } from "@/redux/hook";
import { setBuyNowProduct } from "@/redux/features/product/cartSlice";
import { Loader2 } from "lucide-react";

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
  shape: yup.string().required("Shape is required"),
  toppings: yup
    .array()
    .of(yup.string())
    .min(1, "At least one topping is required"),
  flavours: yup
    .array()
    .of(yup.string())
    .min(1, "At least one flavour is required"),
  cakeTimes: yup.string().required("When do you need your cake?"),
  message: yup.string(),
});

const setToUpperCase = (sentence: string) => {
  const uppercaseWord = sentence
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return uppercaseWord;
};

const SingleProductComp = ({ slug }: { slug: string }) => {
  const { allProducts, setAllProducts } = useUserPdctStore();
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 640 });
  const isLogin = useIsLoggedIn();
  const dispatch = useAppDispatch();

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
  const [previewFav, setPreviewFav] = useState(false);
  const queryClient = useQueryClient();
  const { handleAddToCart } = useCart();
  const { auth } = useAuth();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const maxDescriptionLength = 150;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: activeProduct,
    isError,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["getProductBySlug", slug],
    queryFn: async () => getProductBySlug(slug),
    select: (data) => data.product as IProduct,
  });

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
      setAllProducts(similarProducts);
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

  const handleAddItemToCart = handleSubmit((data) => {
    if (activeProduct?.productType === "preorder") {
      // For preorder products, validate and submit form data
      if (
        !data.sizes &&
        !data.cakeTimes &&
        !data.flavours &&
        !data.toppings &&
        !data.shape
      ) {
        return;
      }
    }

    if (auth?.user) {
      cartMutation
        .mutateAsync({
          product: activeProduct?._id as string,
          quantity: quantity,
          size:
            activeProduct?.productType === "preorder" ? data.sizes : undefined,
          shape:
            activeProduct?.productType === "preorder" ? data.shape : undefined,
          toppings:
            activeProduct?.productType === "preorder"
              ? (data.toppings as string[])
              : undefined,
          flavour:
            activeProduct?.productType === "preorder"
              ? (data.flavours as string[])
              : undefined,
          dateNeeded:
            activeProduct?.productType === "preorder"
              ? data.cakeTimes
              : undefined,
          details:
            activeProduct?.productType === "preorder"
              ? data.message
              : undefined,
        })
        .then(() => {
          handleAddToCart({
            product: activeProduct as IProduct,
            quantity: quantity,
            size:
              activeProduct?.productType === "preorder"
                ? data.sizes
                : undefined,
            shape:
              activeProduct?.productType === "preorder"
                ? data.shape
                : undefined,
            toppings:
              activeProduct?.productType === "preorder"
                ? (data.toppings as string[])
                : undefined,
            flavour:
              activeProduct?.productType === "preorder"
                ? (data.flavours as string[])
                : undefined,
            dateNeeded:
              activeProduct?.productType === "preorder"
                ? data.cakeTimes
                : undefined,
            details:
              activeProduct?.productType === "preorder"
                ? data.message
                : undefined,
          });
          reset({
            sizes: "",
            shape: "",
            toppings: [],
            flavours: [],
            cakeTimes: "",
            message: "",
          });
          setQuantity(1);
        });
    } else {
      handleAddToCart({
        product: activeProduct as IProduct,
        quantity: quantity,
        size:
          activeProduct?.productType === "preorder" ? data.sizes : undefined,
        shape:
          activeProduct?.productType === "preorder" ? data.shape : undefined,
        toppings:
          activeProduct?.productType === "preorder"
            ? (data.toppings as string[])
            : undefined,
        flavour:
          activeProduct?.productType === "preorder"
            ? (data.flavours as string[])
            : undefined,
        dateNeeded:
          activeProduct?.productType === "preorder"
            ? data.cakeTimes
            : undefined,
        details:
          activeProduct?.productType === "preorder" ? data.message : undefined,
      });
      reset({
        sizes: "",
        shape: "",
        toppings: [],
        flavours: [],
        cakeTimes: "",
        message: "",
      });
      setQuantity(1);
      toast.success("Product added to cart successfully");
    }
  });

  const handleBuyNow = handleSubmit((data) => {
    if (activeProduct?.productType === "preorder") {
      // For preorder products, validate form data
      if (
        !data.sizes &&
        !data.cakeTimes &&
        !data.flavours &&
        !data.toppings &&
        !data.shape
      ) {
        return;
      }
    }

    if (!isLogin) {
      setPreviewFav(false);
      return;
    }

    dispatch(
      setBuyNowProduct({
        product: activeProduct as IProduct,
        quantity: quantity,
        size:
          activeProduct?.productType === "preorder" ? data.sizes : undefined,
        shape:
          activeProduct?.productType === "preorder" ? data.shape : undefined,
        toppings:
          activeProduct?.productType === "preorder"
            ? (data.toppings as string[])
            : undefined,
        flavour:
          activeProduct?.productType === "preorder"
            ? (data.flavours as string[])
            : undefined,
        dateNeeded:
          activeProduct?.productType === "preorder"
            ? data.cakeTimes
            : undefined,
        details:
          activeProduct?.productType === "preorder" ? data.message : undefined,
      }),
    );

    // Navigate to billing page
    router.push(`/billing?buyNow=true`);
  });

  const selectTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // primary25: "hotpink",
      primary: "black",
    },
  });

  const formatText = (text: string) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const transformToOptions = (values: string[]) => {
    return values.map((value) => ({
      label: formatText(value),
      value: value,
    }));
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncatedDescription =
    activeProduct?.description &&
    activeProduct?.description?.length > maxDescriptionLength
      ? activeProduct.description.substring(0, maxDescriptionLength) + "..."
      : activeProduct?.description;

  if (isLoading || isPending) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return <ProductError refetch={refetch} />;
  }

  if (!activeProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="min-h-dvh">
      <div className="bg-brand-200 py-4 pt-16 sm:pt-24">
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
          <div className="wrapper py-4 ">
            <div className="grid grid-cols-1 gap-4 md:items-start lg:grid-cols-2 lg:justify-evenly lg:gap-8 xl:grid-cols-[40%_50%] xl:gap-10">
              <div className="relative w-full">
                <ProductImages product={activeProduct} />
              </div>

              <div className="mb-1 flex flex-col text-lg">
                <span className="text-base font-semibold text-neutral-500">
                  {formatCurrency(parseInt(activeProduct?.minPrice), "en-NG")} -{" "}
                  {formatCurrency(parseInt(activeProduct?.maxPrice), "en-NG")}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold capitalize">
                    {setToUpperCase(activeProduct?.name)}
                  </h3>

                  <ProductStatusType
                    status={setToUpperCase(activeProduct?.productType)}
                    className="text-sm"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <StarRating
                    iconSize={24}
                    canRate={false}
                    defaultRating={activeProduct?.averageRating}
                  />
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
                    {isDescriptionExpanded
                      ? activeProduct?.description
                      : truncatedDescription}
                  </p>
                  {activeProduct?.description.length > maxDescriptionLength && (
                    <button
                      onClick={toggleDescription}
                      className="mt-1 text-sm text-blue-500 hover:underline"
                    >
                      {isDescriptionExpanded ? "See less" : "See more"}
                    </button>
                  )}
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
                        {activeProduct?.subCategories?.map((subCat) =>
                          setToUpperCase(subCat.name),
                        )}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CUSTOM PICK */}
                {showReviews ? (
                  <ProductReview product={activeProduct} />
                ) : activeProduct?.productType === "preorder" ? (
                  <form
                    id="detail"
                    className="lg:w-[75%]"
                    onSubmit={handleAddItemToCart}
                  >
                    <div className="mt-4 space-y-3">
                      <label htmlFor="sizes" className="block w-full">
                        <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*'] ">
                          Size
                        </span>
                        <Controller
                          control={control}
                          name="sizes"
                          render={({ field: { value, onChange, ref } }) => {
                            const sizeOptions = transformToOptions(
                              activeProduct?.sizes || [],
                            );

                            return (
                              <Select
                                options={sizeOptions}
                                value={
                                  sizeOptions.find(
                                    (option) => option.value === value,
                                  ) || null
                                }
                                onChange={(selected) =>
                                  onChange(selected?.value)
                                }
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
                      <label htmlFor="shape" className="block w-full">
                        <span className="mb-1.5 inline-block after:inline-block after:text-red-600 after:content-['*'] ">
                          Shape
                        </span>
                        <Controller
                          control={control}
                          name="shape"
                          render={({ field: { value, onChange, ref } }) => {
                            const shapeOptions = transformToOptions(
                              activeProduct?.shapes || [],
                            );

                            return (
                              <Select
                                options={shapeOptions}
                                value={
                                  shapeOptions.find(
                                    (option) => option.value === value,
                                  ) || null
                                }
                                onChange={(selected) =>
                                  onChange(selected?.value)
                                }
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
                        <Controller
                          control={control}
                          name="toppings"
                          render={({ field: { value, onChange } }) => {
                            const safeValue = Array.isArray(value) ? value : [];
                            const toppingOptions = transformToOptions(
                              activeProduct?.toppings || [],
                            );
                            const selectedOptions = transformToOptions(
                              safeValue as string[],
                            );

                            return (
                              <MultiSelect
                                options={toppingOptions}
                                value={selectedOptions}
                                onChange={(selected: Option[]) => {
                                  const selectedValues = selected.map(
                                    (item) => item.value,
                                  );
                                  onChange(selectedValues);
                                }}
                                labelledBy="Select toppings"
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
                        <Controller
                          control={control}
                          name="flavours"
                          render={({ field: { value, onChange, ref } }) => {
                            const safeValue = Array.isArray(value) ? value : [];
                            const flavourOptions = transformToOptions(
                              activeProduct?.flavour || [],
                            );

                            const selectedOptions = transformToOptions(
                              safeValue as string[],
                            );

                            return (
                              <MultiSelect
                                options={flavourOptions}
                                value={selectedOptions}
                                onChange={(selected: Option[]) => {
                                  const selectedValues = selected.map(
                                    (item) => item.value,
                                  );
                                  onChange(selectedValues);
                                }}
                                labelledBy="Select flavour"
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
                        <Controller
                          control={control}
                          name="cakeTimes"
                          render={({ field: { value, onChange, ref } }) => {
                            return (
                              <Select
                                options={cakeTimes}
                                value={
                                  cakeTimes.find(
                                    (option) => option.value === value,
                                  ) || null
                                }
                                onChange={(selected) =>
                                  onChange(selected?.value)
                                }
                                ref={ref}
                                theme={selectTheme}
                              />
                            );
                          }}
                        />
                        <p className="mt-1 text-sm">
                          48 hours is the minimum time required for all cake
                          orders
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
                      {isLogin ? (
                        <Button
                          type="button"
                          size={"lg"}
                          variant={"secondary"}
                          className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                          onClick={handleBuyNow}
                        >
                          Buy now
                        </Button>
                      ) : (
                        <DialogCloseButton setPreviewFav={setPreviewFav}>
                          <Button
                            type="button"
                            size={"lg"}
                            variant={"secondary"}
                            className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                          >
                            Buy now
                          </Button>
                        </DialogCloseButton>
                      )}

                      <Button
                        type="submit"
                        size={"lg"}
                        className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                        disabled={cartMutation.isPending}
                      >
                        {cartMutation.isPending && (
                          <Loader2 className="mr-1 animate-spin" />
                        )}
                        Add to cart
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3 after:grid">
                    {isLogin ? (
                      <Button
                        type="button"
                        size={"lg"}
                        variant={"secondary"}
                        className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                        onClick={handleBuyNow}
                      >
                        Buy now
                      </Button>
                    ) : (
                      <DialogCloseButton setPreviewFav={setPreviewFav}>
                        <Button
                          type="button"
                          size={"lg"}
                          variant={"secondary"}
                          className="cursor-pointer bg-neutral-300 px-4 py-2 text-neutral-900"
                        >
                          Buy now
                        </Button>
                      </DialogCloseButton>
                    )}

                    <Button
                      type="button"
                      size={"lg"}
                      className="cursor-pointer bg-neutral-900 px-4 py-2 text-goldie-300"
                      onClick={handleAddItemToCart}
                      disabled={cartMutation.isPending}
                    >
                      {cartMutation.isPending && (
                        <Loader2 className="mr-1 animate-spin" />
                      )}
                      Add to cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="wrapper">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold">Related Product</h3>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-bold text-green-700 hover:underline"
              >
                See All <ArrowRight />
              </Link>
            </div>

            {allProductsLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductCardSkeleton />
              </div>
            ) : (
              featuredPdcts &&
              featuredPdcts?.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <EachElement
                    of={featuredPdcts}
                    render={(item: any, index: number) => {
                      if (index >= featuredPdctLength()) return;
                      return <ProductCard data={item} key={item._id} />;
                    }}
                  />
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleProductComp;
