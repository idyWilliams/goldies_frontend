"use client";
import { ArrowLeft, Edit } from "iconsax-react";
import Image from "next/image";
import coconut from "../../../../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import strawberry from "../../../../public/assets/Fresh-Strawberry-Cake-with-Strawberry-Frosting-3-480x360.webp";
import carrot from "../../../../public/assets/carrot.webp";
import banana from "../../../../public/assets/banana-cake-with-cinnamon-cream-102945-1.webp";
import { useRouter } from "next/navigation";
import React from "react";

type Data = {
  id: number;
  name: string;
  age: number;
};

export default function Page({ params }: any) {
  const router = useRouter();
  console.log(params, "product details");
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
            <h1 className="px-6 pb-4 pt-6 font-semibold text-main">
              Product Information
            </h1>
            <div className="bg-white px-6 py-3">
              <div className="mb-5">
                <p className="font-semibold">product name:</p>
                <p className="">Coconut cream cake</p>
              </div>
              <div className="mb-5">
                <p className="font-semibold">Product Description:</p>
                <p>
                  Decadent coconut cake with layers of creamy coconut filling
                  and topped with shredded coconut
                </p>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <div className="">
                  <span>
                    product price: <span>&euro;213.99 - &euro;270.99</span>
                  </span>
                </div>
                <div className="">
                  <span>
                    product ID: <span>ID:0922DRF</span>
                  </span>
                </div>
                <div>
                  <span>
                    product category: <span>Coconut Cake</span>
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <p>Product Sizes:</p>
                <p>Mini, Small, Medium, Large, Extralarge</p>
              </div>
              <div className="mb-5">
                <p> Product Layers:</p>
                <p>3Layers, 4Layers, 5Layers, 6Layers</p>
              </div>
            </div>
          </div>
          <div className="rounded-md bg-black">
            <h1 className="px-6 pb-4 pt-6 font-semibold text-main">
              Product Images
            </h1>
            <div className="bg-white px-6 py-3">
              <div className="">
                <div className="mb-6 h-[220px]">
                  <Image
                    src={coconut}
                    alt="Coconut Cake"
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-[120px]">
                    <Image
                      src={strawberry}
                      alt="Strawberry Cake"
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-[120px]">
                    <Image
                      src={carrot}
                      alt="Carrot Cake"
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-[120px]">
                    <Image
                      src={banana}
                      alt="Banana Cake"
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
