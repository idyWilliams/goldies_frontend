"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EachElement from "@/helper/EachElement";
import { Button } from "./ui/button";
import Placeholder from "../public/assets/placeholder3.png";
import { getAllCategories } from "@/services/hooks/category";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/services/types";
import useBoundStore from "@/zustand/store";
import { isSubRowSelected } from "@tanstack/react-table";

type CategoriesType = {
  [x: string]: any;
  name: "";
  image: "";
  description: "";
  _id: "";
};

const CakeCategory = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const setAllCategories = useBoundStore((state) => state.setCategories);

  const { data, isError, error, isSuccess, isPending, isStale, refetch } =
    useQuery({
      queryKey: ["categories"],
      queryFn: getAllCategories,
      staleTime: 60 * 1000,
    });

  useEffect(() => {
    if (isStale) {
      refetch();
    }
  }, [isStale, refetch]);

  const { previewCategories, visibleCategories } = useMemo(() => {
    if (isSuccess) {
      const allCategories: Category[] = [...data?.categories].reverse();
      const visibleCategories = allCategories.filter(
        (cat: Category) => cat?.status === true,
      );
      console.log(allCategories);

      const previewCategories = visibleCategories.slice(0, 3);

      return { previewCategories, visibleCategories };
    }
    return { previewCategories: null, visibleCategories: null };
  }, [data?.categories, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setAllCategories(visibleCategories);
      setCategories(previewCategories);
    } else {
      setCategories(null);
    }
    if (isError) {
      console.error(`${error?.name}: ${error?.message}`);
    }
  }, [
    isSuccess,
    isError,
    error?.message,
    error?.name,
    previewCategories,
    visibleCategories,
    setAllCategories,
  ]);

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
            {(isPending ||
              (isError && !categories) ||
              (categories && categories?.length < 1)) && (
              <>
                <EachElement
                  of={new Array(3).fill(null)}
                  render={(item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="relative flex h-[300px] items-end bg-goldie-50  sm:w-[300px] lg:w-full"
                      >
                        <Image
                          src={Placeholder}
                          alt="placeholder for image"
                          fill
                          sizes="(max-width: 1024px) 33vw"
                          priority
                          placeholder="blur"
                          className="animate-pulse object-cover object-center"
                        />
                      </div>
                    );
                  }}
                />
              </>
            )}

            {categories && categories?.length > 0 && (
              <EachElement
                of={categories}
                render={(cake: CategoriesType, index: any) => {
                  if (index > 2) return;
                  return (
                    <div className="relative flex h-[300px] items-end sm:w-[300px] lg:w-full">
                      {!isLoaded && (
                        <Image
                          src={Placeholder}
                          alt="placeholder for image"
                          placeholder="blur"
                          sizes="(max-width: 1024px) 33vw"
                          priority
                          fill
                          className="absolute left-0 top-0 animate-pulse object-cover object-center"
                        />
                      )}

                      <Image
                        src={cake?.image}
                        alt={cake?.name}
                        fill
                        sizes="(max-width: 1024px) 33vw"
                        className={`object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setIsLoaded(true)}
                      />

                      <div className="flex min-h-[180px] flex-col items-start justify-between bg-black bg-opacity-10 p-4 backdrop-blur-md">
                        <div className="w-full grow">
                          <h3 className="font-bold text-white">
                            {cake?.name || ""}
                          </h3>
                          <p className="line-clamp-3 break-all text-white">
                            {cake?.description || ""}
                          </p>
                        </div>
                        <Button className="mt-4 h-auto w-full bg-goldie-300 text-black hover:bg-goldie-200">
                          <Link
                            href={`/shop/categories/${cake.name}?id=${cake?._id}&status=${cake?.status}`}
                            className="inline-block w-full"
                          >
                            Buy Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                }}
              />
            )}
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
