"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import BreadCrumbs from "@/components/BreadCrumbs";

import EachElement from "@/helper/EachElement";
import { getCategory } from "@/services/hooks/category";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/public/assets/placeholder3.png";
import UserCategorySkeleton from "@/components/shop-components/category/UserCategorySkeleton";
import useBoundStore from "@/zustand/store";
import { Category, SubCategory } from "@/services/types";
import { Button } from "@/components/ui/button";

import { handleImageLoad } from "@/helper/handleImageLoad";
import sortArray from "@/helper/sortArray";
import { chunkArray } from "@/helper/chunkArray";
import AdminPagination from "@/components/admin-component/AdminPagination";

const limit = 6;

const Page = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id") || "";

  const [isLoaded, setIsLoaded] = useState<{ [id: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const category = useBoundStore((state) => state.activeCategory);
  const setCategory = useBoundStore((state) => state.setActiveCategory);
  const setSubCategory = useBoundStore((state) => state.setActiveSubcategory);
  const setSubCategories = useBoundStore((state) => state.setSubCategories);
  const subCategories = useBoundStore((state) => state.subCategories);

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => getCategory(categoryId),
    placeholderData: category && category,
    enabled: !category || !!category?.status,
    // staleTime: 60 * 1000,
  });

  const categoryData: Category | null = useMemo(() => {
    if (isSuccess) {
      return data?.category;
    }
    return null;
  }, [isSuccess, data?.category]);

  const getSubCategories = useCallback(() => {
    if (categoryData?.subCategories.length > 0) {
      // console.log(categoryData);

      const sortedCategories = sortArray(categoryData?.subCategories);
      const paginatedSubCatArr = chunkArray(sortedCategories, limit);
      const pages = paginatedSubCatArr.length;

      return { subCategories: paginatedSubCatArr[currentPage - 1], pages };
    } else return { subCategories: [], pages: 1 };
  }, [categoryData, currentPage]);

  useEffect(() => {
    if (isSuccess && categoryData) {
      setCategory(categoryData);
      const { subCategories, pages } = getSubCategories();
      setSubCategories(subCategories);
      setTotalPages(pages);
    }
  }, [
    categoryData,
    isSuccess,
    setCategory,
    getSubCategories,
    setSubCategories,
  ]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [error?.message, isError]);

  const handleSubCategory = useCallback(
    (activeSubCat: SubCategory) => {
      setSubCategory(activeSubCat);
    },
    [setSubCategory],
  );

  return (
    <>
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
      {isPending && !category && <UserCategorySkeleton />}
      {isError && !category && (
        <p className="flex  h-[550px] w-full items-center justify-center">
          There was an error getting the Categories
        </p>
      )}

      {}

      {category && (
        <>
          <div className="wrapper relative mx-auto h-[200px] w-full py-6 md:my-[16px] md:w-[calc(100%_-_30px)]">
            <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-center gap-2  bg-categories px-4 pr-20">
              {/* <h2 className="font-bold text-goldie-100">Product Category</h2> */}
              <h1 className="text-lg font-semibold text-goldie-300 sm:text-2xl lg:text-4xl">
                {category?.name}
              </h1>
              <p className="max-w-[650px] text-xs text-goldie-75 sm:text-base">
                {category?.description}
              </p>
            </div>

            {!isLoaded[category?._id] && (
              <Image
                src={PlaceholderImage}
                alt="placeholder"
                placeholder="blur"
                priority
                fill
                sizes="(max-width: 1440px) 33vw"
                className="animate-pulse object-cover object-center"
              />
            )}
            <Image
              src={category?.image || ""}
              alt={category?.name}
              fill
              priority
              className={`absolute left-0 top-0 object-cover object-center ${isLoaded[category?._id] ? "opacity-100" : "opacity-0"} `}
              onLoad={() => handleImageLoad(category?._id, setIsLoaded)}
            />
          </div>

          {category?.subCategories && category?.subCategories.length < 1 && (
            <p className="flex  h-[576px] w-full items-center justify-center text-xl xl:h-[636PX]">
              There are no SubCategories to display
            </p>
          )}
          <div className="mb-10">
            {subCategories && subCategories.length > 0 && (
              <div className="wrapper mb-28 grid  gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:px-[2%]">
                <EachElement
                  of={subCategories}
                  render={(sub: any) => {
                    return (
                      <div
                        key={sub?._id}
                        className=" relative h-[270px] w-full  xl:h-[300px]"
                      >
                        <div className="absolute left-0 top-0 -z-20 flex h-full w-full flex-col justify-center gap-2 bg-gradient-to-r from-black/20 to-black/20 px-4 "></div>
                        <figure className="relative z-10 mx-auto flex h-full w-full items-end ">
                          <div className="box-border flex min-h-[180px] w-full flex-col items-start justify-between bg-black bg-opacity-40 p-4 text-white backdrop-blur-sm  ">
                            <div className=" w-full grow">
                              <h3 className="text-xl font-bold sm:text-2xl">
                                {sub?.name}
                              </h3>
                              <p className="line-clamp-3 w-full break-all   text-sm text-[#D9D9D9] ">
                                {sub?.description}
                              </p>
                            </div>
                            <Button
                              className=" mt-3  flex w-full items-center justify-center  rounded-md bg-goldie-300 p-2 text-center text-neutral-900 hover:bg-goldie-200 xl:p-3"
                              onClick={() => handleSubCategory(sub)}
                            >
                              <Link
                                href={`/shop?cat=${encodeURIComponent(category?.name?.toLowerCase())}&sub=${encodeURIComponent(sub?.name?.toLowerCase())}&subCategoryIds=${sub?._id}`}
                                className="inline-block w-full text-center font-bold"
                              >
                                Buy now
                              </Link>
                            </Button>
                          </div>
                        </figure>

                        {!isLoaded[sub?._id] && (
                          <Image
                            src={PlaceholderImage}
                            alt="placeholder"
                            placeholder="blur"
                            priority
                            fill
                            sizes="(max-width: 1440px) 33vw"
                            className="-z-50 animate-pulse object-cover object-center"
                          />
                        )}

                        <Image
                          src={sub?.image || ""}
                          alt={sub?.name}
                          fill
                          sizes="(max-width: 1440px) 33vw"
                          priority
                          className={`-z-50 object-cover object-center ${isLoaded[category?._id] ? "opacity-100" : "opacity-0"} `}
                          onLoad={() =>
                            handleImageLoad(category?._id, setIsLoaded)
                          }
                        />
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
        </>
      )}
    </>
  );
};

export default Page;
