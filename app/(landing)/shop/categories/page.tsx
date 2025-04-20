"use client";
import React, { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "@/services/hooks/category";
import Link from "next/link";
import BreadCrumbs from "@/components/BreadCrumbs";

import UserCategoriesSkeleton from "@/components/shop-components/category/UserCategoriesSkeleton";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import Placeholder from "@/public/assets/placeholder3.png";
import useBoundStore from "@/zustand/store";
import { Category } from "@/services/types";
import { handleImageLoad } from "@/helper/handleImageLoad";
import sortArray from "@/helper/sortArray";
import AdminPagination from "@/components/admin-component/AdminPagination";
import { chunkArray } from "@/helper/chunkArray";
import { slugify } from "@/helper";

const limit = 12;

const Page = () => {
  const [isLoaded, setIsLoaded] = useState<{ [id: string]: boolean }>({});
  const allCategories = useBoundStore((state) => state.categories);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["categories", currentPage, limit],
    queryFn: async () => getPaginatedCategories(currentPage, limit),
    placeholderData: keepPreviousData,
  });

  const { sortedCategories, pages } = useMemo(() => {
    if (isSuccess && data?.categories) {
      return {
        sortedCategories: sortArray(data?.categories),
        pages: data?.totalPages,
      };
    } else if (!data?.categories && allCategories) {
      const paginatedCatArr = chunkArray(allCategories, limit);
      console.log(paginatedCatArr);

      return {
        sortedCategories: paginatedCatArr[currentPage - 1],
        pages: paginatedCatArr.length,
      };
    }
    return { sortedCategories: null, pages: 1 };
  }, [
    data?.categories,
    allCategories,
    isSuccess,
    currentPage,
    data?.totalPages,
  ]);

  useEffect(() => {
    if (sortedCategories) {
      console.log(sortedCategories);

      setCategories(sortedCategories);
      setTotalPages(pages);
    }
  }, [sortedCategories, pages]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [isError, error?.message]);

  const handleCategory = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className=" bg-neutral-900 py-3 ">
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
        <div className="py-6 pb-12">
          <h3 className="text-2xl font-semibold">Product Categories</h3>
          {isPending && !categories && <UserCategoriesSkeleton />}
          {isError && !categories && (
            <p className="flex  h-[60dvh] w-full items-center justify-center">
              There was an error getting the Categories
            </p>
          )}
          {categories && categories.length < 1 && (
            <p className="flex  h-[576px] w-full items-center justify-center text-xl xl:h-[636PX]">
              There are no Categories to display
            </p>
          )}

          {categories && categories.length > 1 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              <EachElement
                of={categories}
                render={(cat: any) => {
                  return (
                    <div className={`${!cat.status && "cursor-not-allowed"}`}>
                      <Link
                        href={
                          cat.status
                            ? `/shop/categories/${slugify(cat.name)}?id=${cat._id}&status=${cat.status}`
                            : "#"
                        }
                        key={cat?._id}
                        className={`${cat.status ? "group" : "pointer-events-none"}`}
                      >
                        <div
                          className="relative h-[270px] w-full overflow-hidden capitalize text-neutral-500 xl:h-[300px]"
                          onClick={() => handleCategory(cat)}
                        >
                          <span className="absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50">
                            <span
                              aria-label={cat.name || ""}
                              className="text-xl font-bold text-white"
                            >
                              {cat.name || ""}
                            </span>
                            {!cat?.status && (
                              <span className="text-white">Unavailable</span>
                            )}
                          </span>
                          {!cat.status && (
                            <div className=" absolute  left-0 top-0 z-10  h-full  w-full cursor-not-allowed bg-black/35 "></div>
                          )}

                          {!isLoaded[cat?._id] && (
                            <Image
                              src={Placeholder}
                              alt="placeholder"
                              placeholder="blur"
                              priority
                              fill
                              sizes="(max-width: 1440px) 33vw"
                              className="-z-0 animate-pulse object-cover object-center"
                            />
                          )}

                          <Image
                            src={cat?.image || ""}
                            alt={cat?.name || ""}
                            fill
                            sizes="(max-width: 1440px) 33vw"
                            className={`-z-0 object-cover object-center ${isLoaded[cat?._id] ? "opacity-100 duration-300 group-hover:scale-110" : "opacity-0"} `}
                            onLoad={() =>
                              handleImageLoad(cat?._id, setIsLoaded)
                            }
                          />
                        </div>
                      </Link>
                    </div>
                  );
                }}
              />
            </div>
          )}

          {totalPages > 1 && (
            <AdminPagination
              totalPage={totalPages}
              page={currentPage}
              setPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
