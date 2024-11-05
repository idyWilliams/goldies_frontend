"use client";
import { ArrowLeft, Edit } from "iconsax-react";
import Image from "next/image";
import coconut from "../../../../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import strawberry from "../../../../public/assets/Fresh-Strawberry-Cake-with-Strawberry-Frosting-3-480x360.webp";
import carrot from "../../../../public/assets/carrot.webp";
import banana from "../../../../public/assets/banana-cake-with-cinnamon-cream-102945-1.webp";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { productList } from "@/utils/adminData";
import ProductImages from "@/components/admin-component/ProductImages";
import AdminAuth from "@/components/admin-component/AdminAuth";

type Data = {
  id: number;
  name: string;
  age: number;
};

export default function Page({ params }: any) {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const product = productList.find(
    (item: any) => String(item.id) === params.details,
  );
  console.log(params, "product details", product);
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
          <div className="mb-2 flex cursor-pointer items-center gap-2">
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
                <p className="capitalize">{product?.productName}</p>
              </div>
              <div className="mb-5">
                <p className="font-semibold">Product Description:</p>
                <p>{product?.description}</p>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <div className="mb-5">
                  <p className="font-semibold">Product Price:</p>
                  <p>
                    &euro;
                    {product?.priceFrom} - &euro;{product?.priceTo}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product ID:</p>
                  <p>ID:{product?.id}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product Category:</p>
                  <p>{product?.category}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Subcategory:</p>
                  <p>{product?.subcategory}</p>
                </div>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Sizes:</p>
                <p className="capitalize">
                  {product?.sizes?.map((item: any) => item.name).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Shapes:</p>
                <p className="capitalize">
                  {product?.shapes?.map((item: any) => item.name).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Fillings:</p>
                <p className="capitalize">
                  {product?.fillings?.map((item: any) => item.name).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">
                  Toppings &amp; Addons:
                </p>
                <p className="capitalize">
                  {product?.toppings?.map((item: any) => item.name).join(", ")}
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
                    src={product?.image[selectedImage] || coconut}
                    alt="Coconut Cake"
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product?.image.map((item: any, index: number) => (
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
