import { Edit } from "iconsax-react";
import Image from "next/image";
import React from "react";

type Data = {
  id: number;
  name: string;
  age: number;
};

export default function Page({ params }: any) {
  console.log(params);
  return (
    <section className="h-screen bg-gray-100">
      <div className="p-5">
        <div className="">
          <h1 className="font-semibold uppercase">Product Details</h1>
        </div>
        <div className="flex justify-between">
          <p>
            Product - <span className="text-neutral-500">Product Details</span>
          </p>
          <div className="mb-2 flex items-center gap-2">
            <Edit size={20} />
            <p className="border-b border-black">Edit Product</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-[55%_1fr] gap-4">
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
              <div className="mb-5">
                <div className="flex justify-between">
                  <p>product price:</p>
                  <p>product ID:</p>
                  <p>product category:</p>
                </div>
                <div className="flex justify-between">
                  <p> &euro;213.99 - &euro;270.99</p>
                  <p>ID:0922DRF</p>
                  <p>Coconut Cake</p>
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
                <div className="">
                  <Image
                    src="/ATO213_coconut-cream-cake_s4x3.jpg"
                    alt="Image"
                    width={50}
                    height={50}
                    className="h-[244px] w-[244px]"
                  />
                </div>
                <div className="flex">
                  <div className="grid grid-cols-3">
                    <Image
                      src="/ATO213_coconut-cream-cake_s4x3"
                      alt="Image"
                      width={120}
                      height={120}
                      className=""
                    />
                  </div>
                  <div>
                    <Image
                      src="/ATO213_coconut-cream-cake_s4x3"
                      alt="Image"
                      width={120}
                      height={120}
                      className=""
                    />
                  </div>
                  <div>
                    <Image
                      src="/ATO213_coconut-cream-cake_s4x3"
                      alt="Image"
                      width={120}
                      height={120}
                      className=""
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
