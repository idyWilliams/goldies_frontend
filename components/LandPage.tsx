import React from "react";
import Gif from "@/public/assets/cake.gif";
import { cn } from "@/helper/cn";
import EachElement from "@/helper/EachElement";
import { productList } from "@/utils/adminData";
import { addSlugToCakes } from "@/helper";
import { cakeProducts1 } from "@/utils/cakeData";
import ProductCard from "./shop-components/ProductCard";
import Image from "next/image";
import { Button } from "./ui/button";

const LandPage = () => {
  console.log(Gif?.src, "Images");

  return (
    <>
      {/* HERO */}
      <section className={cn("hero-bg h-[300px] w-full ")}>
        <div className="wrapper">
          <div>
            <h1>Taste the Extraordinary</h1>
            <p>Crafting Smiles, One Delicious Moment at a time.</p>
          </div>
        </div>
      </section>
      {/* CATEGORIES */}
      <section className="py-10">
        <div className="wrapper flex items-center gap-5">
          <h2 className="text-2xl font-bold">Explore Cake Categories</h2>
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,15 90,85 10,85"
                fill="black"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="absolute left-3 top-2.5 -z-[1] h-1 w-[100px] bg-black"></span>
          </div>
        </div>

        <div className="vector-bg mt-7 rounded-3xl border bg-cover bg-center py-10">
          <div className="wrapper grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* <EachElement
              of={addSlugToCakes(cakeProducts1)}
              render={(cake: any, index: any) => {
                if (index > 5) return;
                return <ProductCard data={cake} key={index} />;
              }}
            /> */}

            <div className="relative flex h-[300px] items-end p-4">
              <Image
                src={Gif}
                alt="imagesss"
                className="absolute left-0 top-0 h-full w-full"
              />
              <div className=" bg-white bg-opacity-40 p-4 backdrop-blur-md">
                <h3 className="font-bold text-white">Milestone Cakes</h3>
                <p className="text-white">
                  A special moist sponge cake,topped with festive candles and
                  tailored to the celebrant’s preference for birthday
                  celebration.
                </p>
                <Button className="mt-4 h-auto w-full bg-goldie-300 text-black">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section className="py-10">
        <div className="wrapper flex items-center gap-5">
          <h2 className="text-2xl font-bold">Popular Products</h2>
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,15 90,85 10,85"
                fill="black"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="absolute left-3 top-2.5 -z-[1] h-1 w-[100px] bg-black"></span>
          </div>
        </div>

        <div className="vector-bg mt-7 rounded-3xl border bg-cover bg-center py-10">
          <div className="wrapper grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <EachElement
              of={addSlugToCakes(cakeProducts1)}
              render={(cake: any, index: any) => {
                if (index > 5) return;
                return <ProductCard data={cake} key={index} />;
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandPage;
