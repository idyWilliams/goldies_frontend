"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import { Edit, Trash } from "iconsax-react";
import React, { useEffect, useState } from "react";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/hooks/category";
import useBoundStore from "@/zustand/store";
import ManageCategoriesSkeleton from "./ManageCategoriesSkeleton";
import { Category } from "@/services/types";
import Logo from "../../../public/assets/goldis-gold-logo.png";

const AllCategories = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLastLoaded, setIsLastLoaded] = useState(false);
  const [isClamped, setIsClamped] = useState<boolean>(true);

  const allCategories = useBoundStore((state) => state.categories);
  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);

  const { data, isSuccess, isError, error, isFetching, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (isSuccess) {
      const reversedCategories =
        data?.categories && [...data?.categories].reverse();

      setAllCategories(reversedCategories);
    }
  }, [isSuccess, setAllCategories, isFetching, data?.categories]);

  const setShowModal = useBoundStore((state) => state.setShowModal);
  const setActionType = useBoundStore((state) => state.setActionType);

  const handleEdit = (item: any) => {
    setActiveCategory(item);
    setActionType("edit");
    setShowModal(true);
  };

  const handleDelete = (item: any) => {
    setActiveCategory(item);
    setActionType("delete");
    setShowModal(true);
  };

  return (
    <>
      {isPending && <ManageCategoriesSkeleton />}

      {isError && (
        <p className="flex h-[75dvh] w-full items-center justify-center">
          There was an error fetching data: {error.message}
        </p>
      )}

      {isSuccess && !isFetching && allCategories?.length < 1 && (
        <EmptyStateCard
          url="/admin/manage-categories/create"
          className="h-[60vh] bg-transparent"
          titleClassName="font-semibold text-center text-xl"
          buttonText={"Add Category"}
          buttonClassName="bg-neutral-900 text-goldie-300"
          // handleClick={handleAddNewCategory}
          title={"No categories added yet"}
        />
      )}

      {isSuccess && (
        <div className="grid gap-5 md:grid-cols-2">
          <EachElement
            of={allCategories}
            render={(item: any, index: number) => (
              <div key={item._id} className="rounded-md bg-white p-4">
                <div className=" grid items-center gap-2 sm:grid-cols-[150px_1fr]">
                  <div className="relative h-[150px]">
                    {index === 0 && !isLastLoaded && (
                      <Image
                        src={Logo}
                        alt="placeholder"
                        placeholder="blur"
                        priority
                        fill
                        sizes="(max-width: 1440px) 33vw"
                        className="absolute left-0 top-0 rounded-md object-cover"
                      />
                    )}
                    {index === 0 && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 1440px) 33vw"
                        className={`absolute left-0 top-0 rounded-md object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"} `}
                        onLoad={() => {
                          setIsLastLoaded(true);
                        }}
                      />
                    )}

                    {!isLoaded && index !== 0 && (
                      <Image
                        src={Logo}
                        alt="placeholder"
                        placeholder="blur"
                        priority
                        fill
                        sizes="(max-width: 1440px) 33vw"
                        className="absolute left-0 top-0 rounded-md object-cover"
                      />
                    )}

                    {index !== 0 && (
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        fill
                        sizes="(max-width: 1440px) 33vw"
                        className={`rounded-md object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"} `}
                        onLoad={() => {
                          setIsLoaded(true);
                        }}
                      />
                    )}
                  </div>
                  <div className="py-1.5">
                    <div className="mb-1 flex items-center justify-between">
                      <StatusBar status={item?.status} />
                      <div className="inline-flex items-center gap-3">
                        <span
                          onClick={() => handleEdit(item)}
                          className="cursor-pointer text-blue-600 hover:text-blue-400"
                        >
                          <Edit size={24} />
                        </span>
                        <span
                          onClick={() => handleDelete(item)}
                          className="cursor-pointer text-red-600 hover:text-red-400"
                        >
                          <Trash size={24} />
                        </span>
                      </div>
                    </div>
                    <h3 className="">
                      <span className="font-semibold">Category:&nbsp;</span>
                      {item?.name}
                    </h3>
                    <p className="mt-1">
                      <span className="  font-semibold">
                        Description:&nbsp;
                      </span>
                      <span
                        className={` ${isClamped ? "line-clamp-3" : "line-clamp-none"} break-all `}
                        onClick={() => setIsClamped((old) => !old)}
                      >
                        {item?.description}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Subcategories</h3>
                  {!item?.subCategories ||
                    (item?.subCategories?.length < 1 && (
                      <p>There are no subcategories </p>
                    ))}
                  {item?.subCategories?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item?.subCategories && (
                        <EachElement
                          of={item?.subCategories}
                          render={(subcategory: any, index: number) => (
                            <span
                              key={index}
                              className="inline-block rounded-md bg-goldie-300 p-2 px-2.5 text-sm capitalize text-neutral-900 xl:text-base"
                            >
                              {subcategory.name}
                            </span>
                          )}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default AllCategories;
