"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/hooks/category";
import Link from "next/link";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import UserCategoriesSkeleton from "@/components/shop-components/category/UserCategoriesSkeleton";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import Placeholder from "../../../public/assets/placeholder3.png";
import useBoundStore from "@/zustand/store";
import { Category } from "@/services/types";
import { handleImageLoad } from "@/helper/handleImageLoad";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState<{ [id: string]: boolean }>({});
  const allCategories = useBoundStore((state) => state.categories);
  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    initialData: allCategories && allCategories,
    // staleTime: 60 * 1000,
  });

  const categories: Category[] | null = useMemo(() => {
    if (isSuccess) {
      const reversedCategories = data?.categories
        ? [...data?.categories].reverse().filter((cat) => cat?.status === true)
        : [];
      return reversedCategories;
    } else {
      return null;
    }
  }, [isSuccess, data?.categories]);

  useEffect(() => {
    if (categories && isSuccess) {
      setAllCategories(categories);
    }

    if (isError) {
      console.error(error?.message);
    }
  }, [isSuccess, isError, setAllCategories, error?.message, categories]);

  const handleCategory = (category: Category) => {
    setActiveCategory(category);
  };

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
          {isPending && !allCategories && <UserCategoriesSkeleton />}
          {isError && !allCategories && (
            <p className="flex  w-full items-center justify-center">
              There was an error getting the Categories
            </p>
          )}
          {isSuccess && allCategories && allCategories.length < 1 && (
            <p className="flex  h-[576px] w-full items-center justify-center text-xl xl:h-[636PX]">
              There are no Categories to display
            </p>
          )}

          {allCategories && allCategories.length > 1 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              <EachElement
                of={allCategories}
                render={(cat: any) => {
                  if (!cat.status) return;
                  return (
                    <Link
                      href={`/shop/categories/${cat.name}?id=${cat?._id}&status=${cat?.status}`}
                      key={cat?._id}
                      className="group"
                    >
                      <div
                        className="relative h-[270px] w-full overflow-hidden capitalize text-neutral-500 xl:h-[300px]"
                        onClick={() => handleCategory(cat)}
                      >
                        <span className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                          <span
                            aria-label={cat.name || ""}
                            className="text-xl font-bold text-white"
                          >
                            {cat.name || ""}
                          </span>
                        </span>

                        {!isLoaded[cat?._id] && (
                          <Image
                            src={Placeholder}
                            alt="placeholder"
                            placeholder="blur"
                            priority
                            fill
                            sizes="(max-width: 1440px) 33vw"
                            className="object-cover object-center duration-300 group-hover:scale-110"
                          />
                        )}

                        <Image
                          src={cat?.image || ""}
                          alt={cat?.name || ""}
                          fill
                          sizes="(max-width: 1440px) 33vw"
                          className={`object-cover object-center  ${isLoaded[cat?._id] ? "opacity-100 duration-300 group-hover:scale-110" : "opacity-0"} `}
                          onLoad={() => handleImageLoad(cat?._id, setIsLoaded)}
                        />
                      </div>
                    </Link>
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
