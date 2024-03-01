"use client";
import Image, { StaticImageData } from "next/image";
import Chocolate from "../../public/assets/birthday-cake.webp";
import LemonCake from "../../public/assets/lemon-cake.webp";
import RedVelvet from "../../public/assets/red-velvet-cake.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";

import Layout from "../../components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";

// type CakeProduct = {
//   id: number;
//   cakeName: string;
//   slug: string;
//   image: StaticImageData;
//   priceFrom: number;
//   priceTo: number;
// };

// export const cakeProducts1 = [
//   {
//     id: 1,
//     cakeName: "Chocolate and Cream Butter",
//     slug: "chocolate-cream-butter",
//     image: Chocolate,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 2,
//     cakeName: "Lemon Cake Sponge",
//     slug: "lemon-cake-sponge",
//     image: LemonCake,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 3,
//     cakeName: "Red Velvet Cake",
//     slug: "red-velvet-cake",
//     image: RedVelvet,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 4,
//     cakeName: "Vanilla Lemon Sponge",
//     image: LemonCake,
//     slug: "vanilla-lemon-sponge",
//     priceFrom: 59,
//     priceTo: 150,
//   },
// ];

// const cakeProducts2 = [
//   {
//     id: 1,
//     cakeName: "Chocolate and Cream Butter",
//     slug: "chocolate-cream-butter",
//     image: Chocolate,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 2,
//     cakeName: "Lemon Cake",
//     slug: "lemon-cake",
//     image: LemonCake,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 3,
//     cakeName: "Red Velvet Cake Sponge",
//     slug: "red-velvet-cake-sponge",
//     image: RedVelvet,
//     priceFrom: 59,
//     priceTo: 150,
//   },
//   {
//     id: 4,
//     cakeName: "Vanilla Lemon Sponge",
//     slug: "vanilla-lemon-sponge",
//     image: LemonCake,
//     priceFrom: 59,
//     priceTo: 150,
//   },
// ];

const ShopPage = ({ params }: any) => {
  return (
    <>
      <Layout>
        {/* BREADCRUMBS */}
        <div className="bg-black pb-6 pt-20">
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
              ]}
            />
          </div>
        </div>

        {/* CAKE PRODUCT LIST 1 */}
        <section className="py-16 pt-3">
          <div className="wrapper">
            <h3 className="mb-6 mt-4 text-2xl font-bold text-black">
              All Cakes
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
              {/*    {cakeProducts1.map((cake: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.image}
                      alt={cake.cakeName}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize">
                    {cake.cakeName}
                  </h3>
                  <span className="text-lg">
                    &euro;{cake.priceFrom} - &euro;{cake.priceTo}
                  </span>
                  <Link
                    href={`/shop/${cake.slug}`}
                    className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                  >
                    Select Option
                  </Link>
                </div>
              ))} */}
            </div>
          </div>
        </section>

        {/* CAKE PRODUCT LIST 2 */}
        {/* <div className="bg-black py-16">
          <div className="wrapper">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
              {cakeProducts2.map((cake: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.image}
                      alt={cake.cakeName}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize text-main">
                    {cake.cakeName}
                  </h3>
                  <span className="text-lg text-main">
                    &euro;{cake.priceFrom} - &euro;{cake.priceTo}
                  </span>
                  <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold uppercase text-black underline">
                    Select Option
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
};

export default ShopPage;
