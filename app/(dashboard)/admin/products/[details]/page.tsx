"use client";
import { ArrowLeft, Edit } from "iconsax-react";
import Image from "next/image";
import coconut from "@/public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { productList } from "@/utils/adminData";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/hooks/products";
import { Product } from "../page";

type Data = {
  id: number;
  name: string;
  age: number;
};

export default function Page({ params }: { params: { details: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>();
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryFn: async () => getProduct(params.details),
    queryKey: ["product"],
  });

  useEffect(() => {
    if (!isSuccess) return;

    setProduct(data?.productDetails);
  }, [data?.productDetails, isSuccess]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-primary" role="status">
          <span className="">Loading...</span>
        </div>
      </div>
    );

  const formatText = (text: string) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="h-screen bg-gray-100">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <span
              className="inline-flex cursor-pointer gap-2"
              onClick={() => router.push("/admin/products")}
            >
              <ArrowLeft />
            </span>
            <div className="">
              <h1 className="font-semibold uppercase">Product Details</h1>
              <p>
                Product -
                <span className="text-neutral-500">Product Details</span>
              </p>
            </div>
          </div>
          <div
            className="mb-2 flex cursor-pointer items-center gap-2"
            onClick={() =>
              router.push(`/admin/create-products?edit=${product?._id}`)
            }
          >
            <Edit size={20} />
            <p className="border-b border-black">Edit Product</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[55%_1fr]">
          <div className="rounded-md bg-black">
            <h1 className="px-6 pb-4 pt-6 font-semibold text-goldie-300">
              Product Information
            </h1>
            <div className="bg-white px-6 py-3">
              <div className="mb-5">
                <p className="font-semibold capitalize">product name:</p>
                <p className="capitalize">{product?.name}</p>
              </div>
              <div className="mb-5">
                <p className="font-semibold">Product Description:</p>
                <p>{product?.description}</p>
              </div>
              <div className="mb-5 flex flex-wrap items-center justify-between">
                <div className="mb-5">
                  <p className="font-semibold">Product Price:</p>
                  <p>
                    &euro;
                    {product?.minPrice} - &euro;{product?.maxPrice}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product ID:</p>
                  <p className="uppercase">ID:{product?._id?.slice(0, 6)}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product Category:</p>
                  <p>{product?.category?.name}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Subcategory:</p>
                  <p>
                    {product?.subCategory?.map((item) => item?.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Sizes:</p>
                <p className="capitalize">
                  {product?.sizes?.map((item: any) => item).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Shapes:</p>
                <p className="capitalize">
                  {product?.shapes?.map((item: any) => item).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Fillings:</p>
                <p className="capitalize">
                  {product?.toppings?.map((item: string) => formatText(item)).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">
                  Toppings &amp; Addons:
                </p>
                <p className="capitalize">
                  {product?.toppings?.map((item: string) => formatText(item)).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className="h-fit rounded-md bg-black">
            <h1 className="px-6 pb-4 pt-6 font-semibold text-goldie-300">
              Product Images
            </h1>
            <div className="bg-white px-6 py-6">
              <div className="">
                <div className="mb-6 h-[300px]">
                  <Image
                    src={product?.images[selectedImage] || coconut}
                    alt="Coconut Cake"
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product?.images.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="h-[120px] cursor-pointer"
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={item}
                        alt={`cake-${index + 1}`}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
