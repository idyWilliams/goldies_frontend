"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/helper/cn";
import useBoundStore from "@/zustand/store";
import EmptyStateCard from "../category-comp/EmptyStateCard";
import ProductTable from "../ProductTable";
import StatusBar from "../category-comp/StatusBar";
import { Edit, Trash } from "iconsax-react";
import EachElement from "@/helper/EachElement";
import { getColumns } from "./SubcategoriesColumns";
import Placeholder from "../../../public/assets/placeholder3.png";
import { handleImageLoad } from "@/helper/handleImageLoad";
import { Category, SubCategory } from "@/services/types";
import { getCatorSubArr } from "@/utils/getCatorSubArr";
import { chunkArray } from "@/helper/chunkArray";
import AdminPagination from "../AdminPagination";

const limit = 5;

const SubCategories = () => {
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");

  const [isLoaded, setIsLoaded] = useState<{ [id: string]: boolean }>({});

  const isLoadedMemoized = useMemo(() => isLoaded, [isLoaded]);
  // const isLoadedMemoized = useMemo(() => isLoaded, [isLoaded]);

  const [subCats, setSubCats] = useState<SubCategory[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentData, setCurrentData] = useState<Category[] | null>(null);

  const category = useBoundStore((state) => state.activeCategory);
  const setShowSub = useBoundStore((state) => state.setShowSub);

  const setActiveSubcategory = useBoundStore(
    (state) => state.setActiveSubcategory,
  );
  const setActionType = useBoundStore((state) => state.setActionType);
  const setShowModal = useBoundStore((state) => state.setShowModal);

  const paginateSubCats = useCallback(getCatorSubArr, []);

  const subCategoryArr = useMemo(() => {
    if (category?.subCategories?.length > 0) return category?.subCategories;
  }, [category?.subCategories]);

  useEffect(() => {
    if (subCategoryArr) {
      const paginatedSubCatArr = paginateSubCats(
        subCategoryArr,
        limit,
        chunkArray,
        setSubCats,
      );
      setTotalPages(paginatedSubCatArr.length);
      setCurrentData(paginatedSubCatArr[currentPage - 1]);
    }
  }, [currentPage, paginateSubCats, subCategoryArr]);

  const handleAddSubcategory = () => {
    setShowSub(true);
  };

  const handleEdit = (item: any) => {
    setActiveSubcategory(item);
    setActionType("edit");
    setShowModal(true);
  };

  const handleDelete = (item: any) => {
    setActiveSubcategory(item);
    setActionType("delete");
    setShowModal(true);
  };

  const columns = getColumns(
    handleEdit,
    handleDelete,
    isLoadedMemoized,
    setIsLoaded,
  );

  if (isNewCreate) return;

  if (category?.subCategories && category?.subCategories?.length < 1) {
    return (
      <EmptyStateCard
        className="mt-6 p-4"
        buttonText={"Add Subategory"}
        isDisabled={isNewCreate}
        buttonElement={
          <button
            onClick={() => setShowSub(true)}
            className={cn(
              "mt-3 inline-block cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-goldie-300 disabled:cursor-auto disabled:bg-neutral-200 disabled:text-neutral-400",
            )}
          >
            Add Subcategory
          </button>
        }
        title={"No subcategories added yet"}
        buttonClassName="bg-neutral-900 text-goldie-300 text-sm"
        titleClassName="font-semibold text-xl text-center"
      />
    );
  }

  if (currentData && currentData.length >= 1) {
    return (
      <div className="mt-5 border-t pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold">Subcategories</h3>
          <button
            onClick={handleAddSubcategory}
            className={cn(
              "inline-block cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-goldie-300 disabled:bg-neutral-200 disabled:text-neutral-400 md:mt-3",
            )}
          >
            Add Subcategory
          </button>
        </div>

        {/* SUBCATEGORIES LIST FOR MOBILE */}
        <div className="grid gap-2 sm:grid-cols-2 md:hidden">
          <EachElement
            of={currentData}
            render={(sub: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3"
              >
                <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                  {!isLoaded[sub?._id] && (
                    <Image
                      src={Placeholder}
                      alt="placeholder"
                      placeholder="blur"
                      priority
                      width={60}
                      height={50}
                      className="aspect-square h-[50px] w-full object-cover object-center"
                    />
                  )}

                  <Image
                    src={sub?.image}
                    alt={sub?.name}
                    width={60}
                    height={50}
                    className={`aspect-square h-[50px] w-full object-cover object-center  ${isLoaded[sub?._id] ? "opacity-100" : "opacity-0"} `}
                    onLoad={() => handleImageLoad(sub?._id, setIsLoaded)}
                  />

                  <div>
                    <h3 className="text-sm font-bold md:text-base">
                      {sub?.name}
                    </h3>
                    <StatusBar status={sub?.status} className="text-xs" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2">
                  <span
                    onClick={() => handleEdit(sub)}
                    className="cursor-pointer text-blue-600"
                  >
                    <Edit size={20} />
                  </span>
                  <span
                    onClick={() => handleDelete(sub)}
                    className="cursor-pointer text-red-600"
                  >
                    <Trash size={20} />
                  </span>
                </div>
              </div>
            )}
          />
        </div>

        {/* SUBCATEGORIES LIST FOR DESKTOP */}
        <div className="hidden md:block">
          <ProductTable
            showSearchBar={false}
            columns={columns}
            Tdata={currentData}
            filteredTabs={[]}
          />
        </div>

        {totalPages > 1 && (
          <AdminPagination
            totalPage={totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
      </div>
    );
  }
};

export default SubCategories;
