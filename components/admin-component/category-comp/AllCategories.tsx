"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "@/services/hooks/category";
import useBoundStore from "@/zustand/store";
import ManageCategoriesSkeleton from "./ManageCategoriesSkeleton";
import { Category } from "@/services/types";
import { chunkArray } from "@/helper/chunkArray";
import AdminPagination from "../AdminPagination";
import CategoriesCards from "./CategoriesCards";

const limit = 8;

const AllCategories = ({ cat }: any) => {
  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);
  const setShowModal = useBoundStore((state) => state.setShowModal);
  const setActionType = useBoundStore((state) => state.setActionType);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentData, setCurrentData] = useState<Category[] | null>(null);

  useEffect(() => {
    setActiveCategory(null);
  }, [setActiveCategory]);

  const {
    data,
    isSuccess,
    isError,
    error,
    isPending,
    // refetch,
    // isStale,
  } = useQuery({
    queryKey: ["categories", 1, 50],
    queryFn: async () => getPaginatedCategories(1, 50),
    // initialData: cat,
    // staleTime: 60 * 1000,
  });

  function getCatArr(
    arr: Category[],
    limit: number,
    pagFxn: any,
    setCatArr: any,
  ) {
    const reversedCats = [...arr].reverse();
    setCatArr(reversedCats);
    const paginatedArr = pagFxn(reversedCats, limit);
    return paginatedArr;
  }

  const categoriesArr = useCallback(getCatArr, []);

  const categories = useMemo(() => {
    if (data?.categories) {
      return data?.categories;
    } else return null;
  }, [data?.categories]);

  useEffect(() => {
    if (categories) {
      const paginatedCats = categoriesArr(
        categories,
        limit,
        chunkArray,
        setAllCategories,
      );
      setTotalPages(paginatedCats.length);
      setCurrentData(paginatedCats[currentPage - 1]);
    }
  }, [isSuccess, categories, categoriesArr, currentPage, setAllCategories]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [isError, error?.message]);

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
      {isPending && !currentData && <ManageCategoriesSkeleton />}

      {isError && !currentData && (
        <p className="flex h-[75dvh] w-full items-center justify-center">
          There was an error fetching data: {error.message}
        </p>
      )}

      {currentData && currentData.length < 1 && (
        <EmptyStateCard
          url="/admin/manage-categories/create"
          className="h-[60vh] bg-transparent"
          titleClassName="font-semibold text-center text-xl"
          buttonText={"Add Category"}
          buttonClassName="bg-neutral-900 text-goldie-300"
          title={"No categories added yet"}
        />
      )}

      {currentData && currentData.length > 0 && (
        <CategoriesCards
          currentData={currentData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {totalPages > 1 && (
        <AdminPagination
          totalPage={totalPages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default AllCategories;
