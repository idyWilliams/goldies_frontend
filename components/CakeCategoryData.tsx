"use client";

import EachElement from "@/helper/EachElement";
import { getPaginatedCategories } from "@/services/hooks/category";
import { Category } from "@/services/types";
import useBoundStore from "@/zustand/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Placeholder from "../public/assets/placeholder3.png";
import { Button } from "./ui/button";
import sortArray from "@/helper/sortArray";
import { handleImageLoad } from "@/helper/handleImageLoad";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/helper";

const CakeCategoryData = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<{ [key: string]: boolean }>({});
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);

  const { data, isError, error, isSuccess, isPending } = useQuery({
    queryKey: ["categories", 1, 12],
    queryFn: async () => getPaginatedCategories(1, 12),
  });

  const sortedCategories = useMemo(() => {
    if (data?.categories) {
      return sortArray(data.categories);
    }
    return null;
  }, [data?.categories]);

  const preview = useMemo(() => {
    if (sortedCategories) {
      const visibleCategories: Category[] = sortedCategories.filter(
        (cat: Category) =>
          cat?.status === true &&
          cat?.subCategories &&
          cat?.subCategories.length > 0,
      );

      return visibleCategories.slice(0, 3);
    }
    return null;
  }, [sortedCategories]);

  useEffect(() => {
    if (isSuccess && sortedCategories) {
      setAllCategories(sortedCategories);
      setCategories(preview);
    }
  }, [isSuccess, preview, sortedCategories, setAllCategories]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [isError, error?.message]);

  const getCategory = (item: Category) => {
    setActiveCategory(item);
  };

  return (
    <div className="wrapper w-full gap-3 space-y-5 sm:flex sm:w-min sm:grid-cols-2 sm:space-x-5 sm:space-y-0 lg:grid lg:w-full lg:grid-cols-3 lg:space-x-0 xl:gap-7">
      {(isPending ||
        (isError && !categories) ||
        (isSuccess && categories && categories?.length < 1)) && (
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
          render={(category: Category) => {
            return (
              <div
                key={category._id}
                className="relative flex h-[300px] items-end sm:w-[300px] lg:w-full"
              >
                {!isLoaded[category._id] && (
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
                  src={category?.image}
                  alt={category?.name}
                  fill
                  sizes="(max-width: 1024px) 33vw"
                  className={`object-cover object-center ${isLoaded[category._id] ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => handleImageLoad(category._id, setIsLoaded)}
                />

                <div className="flex min-h-[180px] w-full flex-col items-start justify-between bg-black bg-opacity-10 p-4 backdrop-blur-[6.353761196136475px]">
                  <div className="flex w-full grow flex-col gap-2">
                    <h3 className="text-[32px] font-bold text-white">
                      {category?.name || ""}
                    </h3>
                    <p className="line-clamp-3 break-all text-lg text-white">
                      {category?.description || ""}
                    </p>
                  </div>

                  <Link href={`/shop/categories/${slugify(category.name)}?id=${category?._id}`} className="w-full">
                    <Button
                      className="mt-4 h-auto w-full bg-goldie-300 text-black hover:bg-goldie-200"
                      onClick={() => getCategory(category)}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default CakeCategoryData;
