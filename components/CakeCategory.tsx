"use client";
import Image from "next/image";
import MilestoneCake from "../public/assets/milestone-cake.webp";
import KidCake from "../public/assets/kid-cake.webp";
import Cupcakes from "../public/assets/cupcake.webp";
import WeddingCake from "../public/assets/wedding-cake.webp";
import Link from "next/link";
import EachElement from "@/helper/EachElement";
import { categories } from "@/utils/cakeCategories";
import { Button } from "./ui/button";

const CakeCategory = () => {
  {
    /* CATEGORIES */
  }
  return (
    <section className="py-10">
      {/* HEADIng */}
      <div className="wrapper flex items-center gap-5">
        <h2 className="text-2xl font-bold">Explore Cake Categories</h2>
        <div className="relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,15 90,85 10,85"
              fill="black"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="absolute left-2 top-[7.5px] -z-[1] h-0.5 w-[40px] bg-black"></span>
        </div>
      </div>

      <div className="vector-bg mt-7 rounded-3xl border bg-cover bg-center py-10">
        <div className="hide-scrollbar w-full overflow-x-auto">
          <div className="wrapper w-full gap-3 space-y-5 sm:flex sm:w-min sm:grid-cols-2 sm:space-x-5 sm:space-y-0 lg:grid lg:w-full lg:grid-cols-3 lg:space-x-0 xl:gap-7">
            <EachElement
              of={categories}
              render={(cake: any, index: any) => {
                if (index > 2) return;
                return (
                  <div className="relative flex h-[300px] items-end sm:w-[300px] lg:w-full">
                    <Image
                      src={cake?.image}
                      alt={cake?.value}
                      className="absolute left-0 top-0 h-full w-full"
                    />
                    <div className=" bg-black bg-opacity-10 p-4 backdrop-blur-md">
                      <h3 className="font-bold text-white">{cake?.label}</h3>
                      <p className="text-white">{cake?.description}</p>
                      <Button className="mt-4 h-auto w-full bg-goldie-300 text-black">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className="wrapper mt-8 flex justify-end">
          <Link
            href={"/shop/categories"}
            className="text-xl underline underline-offset-2 sm:text-lg"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CakeCategory;
