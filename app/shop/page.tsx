"use client";
import Image, { StaticImageData } from "next/image";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";

import Layout from "../../components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";
import { cakeProducts1 } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";





const ShopPage = ({ params }: any) => {


  const cakes = addSlugToCakes(cakeProducts1);
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
              {cakes.map((cake: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.imageUrl}
                      alt={cake.name}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize">
                    {cake.name}
                  </h3>
                  <span className="text-lg">
                    &euro;{cake.minPrice} - &euro;{cake.maxPrice}
                  </span>
                  <Link
                    href={`/shop/${cake.slug}`}
                    className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                  >
                    Select Option
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>


      </Layout>
    </>
  );
};

export default ShopPage;
