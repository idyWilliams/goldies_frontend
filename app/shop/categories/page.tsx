"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import EachElement from "@/helper/EachElement";
import { getAllCategories } from "@/services/hooks/category";
import { categories as cakeCategories } from "@/utils/cakeCategories";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type AllCategoriesType = {
  [x: string]: any;
  image?: "";
  description?: "";
  _id?: "";
};

const Page = () => {
  // const [categories, setCategories] = useState(cakeCategories);

  // const [isLoaded, setIsLoaded] = useState(false);
  const [allCategories, setAllCategories] = useState<AllCategoriesType[]>([]);

  const { data, status } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      setAllCategories(data.categories);
    }
  }, [status, data]);

  return (
    <Layout>
      <div className="mt-[65px] bg-neutral-900 py-3 lg:mt-20">
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
              // {
              //   name: "Shop",
              //   link: "/shop",
              // },
            ]}
          />
        </div>
      </div>
      <div className="wrapper ">
        <div className="py-6">
          <h3 className="text-2xl font-semibold">Product Categories</h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {allCategories.length > 1 && (
              <EachElement
                of={allCategories}
                render={(cat: any, index: number) => {
                  // if (!cat.status) return;
                  return (
                    <Link
                      href={`/shop/categories/${cat.name}?id=${cat?._id}&status=${cat?.status}`}
                      key={index}
                      className="group relative h-[270px] w-full overflow-hidden capitalize text-neutral-500 xl:h-[300px]"
                    >
                      <span className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                        <span
                          aria-label={cat.name || ""}
                          className="text-xl font-bold text-white"
                        >
                          {cat.name || ""}
                        </span>
                      </span>

                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={298}
                        height={238}
                        className="h-full w-full object-cover duration-300 group-hover:scale-110"
                      />
                    </Link>
                  );
                }}
              />
            )}
            {/* <EachElement
              of={categories}
              render={(cat: any, index: number) => (
                <Link
                  href={`/shop/categories/${cat.value}`}
                  key={index}
                  className="group relative h-[270px] w-full overflow-hidden capitalize text-neutral-500 xl:h-[300px]"
                >
                  <span className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <span
                      aria-label={cat.label}
                      className="text-xl font-bold text-white"
                    >
                      {cat.label}
                    </span>
                  </span>
                  <Image
                    src={cat.image}
                    alt={cat.value}
                    width={298}
                    height={238}
                    className="h-full w-full object-cover duration-300 group-hover:scale-110"
                  />
                </Link>
              )}
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
