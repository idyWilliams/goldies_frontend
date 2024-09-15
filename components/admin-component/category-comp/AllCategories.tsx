"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import { Edit, Trash } from "iconsax-react";
import React, { useEffect } from "react";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/hooks/category";
import useBoundStore from "@/zustand/store";
import ManageCategoriesSkeleton from "./ManageCategoriesSkeleton";


const AllCategories = () => {
  const allCategories = useBoundStore((state) => state.categories);
  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);
  const activeCategory = useBoundStore((state) => state.activeCategory);
  const setIsFetchingCategories = useBoundStore(
    (state) => state.setIsFetchingCategories,
  );

  const { data, error, isFetching, isPending, isSuccess, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    setIsFetchingCategories(isFetching);
  }, [isFetching, setIsFetchingCategories]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setAllCategories(data?.categories);
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
      {isFetching && <ManageCategoriesSkeleton />}

      {isError && !isFetching && (
        <p>There was an error fetching data: {error.message}</p>
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

      {isSuccess && !isFetching && allCategories?.length >= 1 && (
        <div className="grid gap-5 md:grid-cols-2">
          <EachElement
            of={data?.categories}
            render={(item: any, index: number) => (
              <div key={item._id} className="rounded-md bg-white p-4">
                <div className=" grid items-center gap-2 sm:grid-cols-[150px_1fr]">
                  <div className="relative h-[150px]">
                    <Image
                      src={
                        item.categorySlug === "birthday-cakes"
                          ? "https://firebasestorage.googleapis.com/v0/b/goldie-b3ba7.appspot.com/o/products%2Fcarrot.webp?alt=media&token=b1016453-3d8b-4a9f-bcea-691a4e214edf"
                          : item.image
                      }
                      alt={item.name}
                      width={100}
                      height={100}
                      // fill
                      // sizes=""
                      // placeholder="blur"
                      className="h-full w-full rounded-md object-cover object-center"
                    />
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
                      {item.name}
                    </h3>
                    <p className="mt-1">
                      <span className="font-semibold">Description:&nbsp;</span>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Subcategories</h3>
                  {item.subCategories.length < 1 && (
                    <p>There are no subcategories </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.subCategories && (
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
