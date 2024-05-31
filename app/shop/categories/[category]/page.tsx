"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import EachElement from "@/helper/EachElement";
import { categories } from "@/utils/cakeCategories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// type categoryProps = {
//   label: string;
//   value: string;
//   image: StaticImageData;
//   description: string;
//   subcategories: {
//     label: string;
//     value: string;
//   }[];
// };

const Page = ({ params }: any) => {
  const [category, setCategory] = useState<any | null>(null);

  useEffect(() => {
    const category = categories.find(
      (item: any) => item.value === params.category,
    );

    setCategory(category);
  }, [params.category]);

  console.log(params, category);

  return (
    <Layout>
      <div className="mt-[65px] bg-neutral-900 py-3 lg:mt-[80px]">
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
                name: "Categories",
                link: "/shop/categories",
              },
              {
                name: category?.label,
                link: "",
              },
            ]}
          />
        </div>
      </div>
      <div className="wrapper relative mx-auto h-[200px] w-full py-6 md:my-[16px] md:w-[calc(100%_-_30px)]">
        <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-center bg-gradient-to-r from-[#221b0fee] to-[rgba(17,17,17,0.8)] px-4 ">
          <h1 className="text-2xl font-semibold text-main">
            {category?.label}
          </h1>
          <p className="text-[#f8eeb9]">{category?.description}</p>
        </div>

        <Image
          src={category?.image}
          alt={category?.value}
          className="absolute left-0 top-0 h-full w-full object-cover object-center"
        />
      </div>

      <div className="wrapper grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
        <EachElement
          of={category?.subcategories}
          render={(sub: any, index: number) => (
            <div
              key={index}
              className=" h-[270px] w-full  gap-4 bg-neutral-100 "
            >
              <figure className="relative h-full w-full">
                <div className="absolute left-0 top-0 flex h-full w-full items-end justify-center bg-black bg-opacity-40 pb-5">
                  <Link
                    href={`/shop?cat=${category?.label?.toLowerCase()}&sub=${sub?.label?.toLowerCase()}`}
                    className="inline-block border border-neutral-50 bg-white bg-opacity-40 px-4 py-3 font-semibold backdrop-blur-lg"
                  >
                    {sub?.label}
                  </Link>
                </div>
                <Image
                  src={category?.image}
                  alt={category?.value}
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          )}
        />
      </div>
    </Layout>
  );
};

export default Page;
