"use client";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "@/services/hooks/category";
import Link from "next/link";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import UserCategoriesSkeleton from "@/components/shop-components/category/UserCategoriesSkeleton";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import Logo from "../../../public/assets/goldis-gold-logo.png";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

type AllCategoriesType = {
  [x: string]: any;
  image?: "";
  description?: "";
  _id?: "";
};
const limit: number = 15;

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCategories, setAllCategories] = useState<
    AllCategoriesType[] | null
  >(null);
  const [page, setPage] = useState<number>(1);

  const { data, status, isFetching } = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: async () => getPaginatedCategories(page, limit),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      setAllCategories(data?.categories);
    }
  }, [status, data]);

  const handleNext = () => {
    if (data?.currentPage === data?.totalPages) return;

    setPage((curPage) => curPage + 1);
    window.scroll(0, 0);
  };
  const handlePrev = () => {
    if (data?.currentPage === 1) return;

    setPage((curPage) => curPage - 1);
    window.scroll(0, 0);
  };

  const handlePaginateClick = (page: number) => {
    if (data?.currentPage === page) return;

    setPage(page);
    window.scroll(0, 0);
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
          {status === "pending" && <UserCategoriesSkeleton />}

          {status === "success" && allCategories && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              <EachElement
                of={allCategories}
                render={(cat: any, index: number) => {
                  if (!cat.status) return;
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

                      {!isLoaded && (
                        <Image
                          src={Logo}
                          alt="placeholder"
                          placeholder="blur"
                          priority
                          fill
                          sizes="(max-width: 1440px) 33vw"
                          className="absolute left-0 top-0 object-cover"
                        />
                      )}

                      <Image
                        src={cat?.image || ""}
                        alt={cat?.name || ""}
                        fill
                        sizes="(max-width: 1440px) 33vw"
                        className={`absolute left-0 top-0 object-cover  ${isLoaded ? "opacity-100 duration-300 group-hover:scale-110" : "opacity-0"} `}
                        onLoad={() => setIsLoaded(true)}
                      />
                    </Link>
                  );
                }}
              />
            </div>
          )}

          {data?.totalPages > 1 && (
            <div className="mt-10 flex w-full flex-col items-center gap-4 bg-white px-4 py-3 sm:px-6">
              <Pagination className="">
                <PaginationContent className="gap-2">
                  <PaginationItem className="flex items-center  justify-center">
                    <span
                      className={`flex items-center justify-center ${data?.currentPage === 1 ? "cursor-not-allowed" : ""}`}
                    >
                      <Button
                        disabled={data?.currentPage === 1}
                        className={twMerge(
                          "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 disabled:text-neutral-400",
                        )}
                        onClick={() => handlePrev()}
                      >
                        <span>
                          <RxCaretLeft size={32} />
                        </span>
                      </Button>
                    </span>
                  </PaginationItem>

                  <EachElement
                    of={new Array(data?.totalPages).fill(null)}
                    render={(item: any, index: number) => {
                      return (
                        <PaginationItem>
                          <Button
                            className={twMerge(
                              "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800",
                              data?.currentPage === index + 1 &&
                                "bg-goldie-300 text-black",
                            )}
                            onClick={() => handlePaginateClick(index + 1)}
                          >
                            {index + 1}
                          </Button>
                        </PaginationItem>
                      );
                    }}
                  />

                  <PaginationItem className=" flex items-center  justify-center  p-1">
                    <Button
                      disabled={data?.currentPage === data?.totalPages}
                      className={twMerge(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 disabled:text-neutral-400",
                      )}
                      onClick={() => handleNext()}
                    >
                      <span className="">
                        <RxCaretRight size={32} />
                      </span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {isFetching && <span>Loading....</span>}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
