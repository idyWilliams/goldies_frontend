"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginatedCategories } from "@/services/hooks/category";
import useBoundStore from "@/zustand/store";
import ManageCategoriesSkeleton from "./ManageCategoriesSkeleton";
import { Category } from "@/services/types";
import AdminPagination from "../AdminPagination";
import CategoriesCards from "./CategoriesCards";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CategorySortBy from "./CategorySortBy";

const itemsPerPage = 8;

const AllCategories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setAllCategories = useBoundStore((state) => state.setCategories);
  const setActiveCategory = useBoundStore((state) => state.setActiveCategory);
  const setShowModal = useBoundStore((state) => state.setShowModal);
  const setActionType = useBoundStore((state) => state.setActionType);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentData, setCurrentData] = useState<Category[] | null>(null);
  const setLimit = useBoundStore((state) => state.setLimit);
  const setPage = useBoundStore((state) => state.setPage);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "All",
  );
  const querySortBy = searchParams.get("sortBy") || "";
  const queryOrder = searchParams.get("sortOrder") || "";

  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>(querySortBy);
  const [order, setOrder] = useState<string>(queryOrder);

  useEffect(() => {
    setActiveCategory(null);
  }, [setActiveCategory]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (currentPage !== 1) {
      currentParams.set("page", currentPage.toString());
    } else {
      currentParams.delete("page");
    }

    if (debouncedSearchValue) {
      currentParams.set("search", debouncedSearchValue);
    } else {
      currentParams.delete("search");
    }

    if (selectedStatus !== "All") {
      currentParams.set("status", selectedStatus);
    } else {
      currentParams.delete("status");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
  }, [
    currentPage,
    debouncedSearchValue,
    pathname,
    router,
    searchParams,
    selectedStatus,
  ]);

  // Map selectedStatus to boolean or null for the API
  const getStatusFilter = () => {
    switch (selectedStatus) {
      case "Active":
        return "true";
      case "Inactive":
        return "false";
      default:
        return ""; // "All" status
    }
  };

  const {
    data,
    isSuccess,
    isError,
    error,
    isPending,
    // refetch,
    // isStale,
  } = useQuery({
    queryKey: [
      "categories",
      currentPage,
      itemsPerPage,
      debouncedSearchValue,
      selectedStatus,
    ],
    queryFn: async () =>
      getPaginatedCategories(
        currentPage,
        itemsPerPage,
        debouncedSearchValue,
        getStatusFilter(),
      ),
    // initialData: cat,
    placeholderData: keepPreviousData,
    // staleTime: 60 * 1000,
  });

  const QueryData = useMemo(() => {
    if (data) {
      return data;
    } else return null;
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPage(currentPage);
    setLimit(itemsPerPage);
  }, [currentPage, setPage, setLimit]);

  useEffect(() => {
    if (QueryData) {
      setAllCategories(QueryData.categories);
      setTotalPages(QueryData.totalPages);
      setCurrentData(QueryData.categories);
    }
  }, [setAllCategories, QueryData]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
    setCurrentPage(1);
  };

  const filteredTabs = ["All", "Active", "Inactive"];

  return (
    <>
      <div className="my-6 flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* search input */}
          <div className="w-full max-w-[500px]">
            <label htmlFor="search" className="relative block w-full">
              <input
                value={searchValue}
                type="text"
                name="search"
                autoComplete="search"
                placeholder="Search..."
                className="w-full rounded-[50px] px-4 py-2 pr-10 placeholder:text-sm focus:border-black focus:ring-black"
                onChange={handleChange}
              />
              {searchValue ? (
                <button
                  onClick={clearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <IoMdClose />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CiSearch />
                </span>
              )}
            </label>
          </div>

          {/* sort */}
          {/* <div ref={sortDropdownRef} className="relative">
            <Button
              className="bg-transparent text-brand-200 ring-1 ring-brand-200 hover:bg-transparent "
              onClick={() => setOpen((prev) => !prev)}
              disabled={currentData?.length === 0}
            >
              Sort by{" "}
              {!isOpen ? (
                <IoIosArrowDown className="ml-2" />
              ) : (
                <IoIosArrowUp className="ml-2" />
              )}
            </Button>
            {isOpen && (
              <CategorySortBy
                sortBy={sortBy}
                order={order}
                onSortChange={(sortBy, order) => {
                  setSortBy(sortBy);
                  setOrder(order);
                  setCurrentPage(1);
                }}
                setOpen={setOpen}
              />
            )}
          </div> */}

          <div className="flex items-center gap-1">
            {filteredTabs?.map((tab, index) => (
              <button
                key={index}
                className={`w-fit rounded-[50px] border px-3 py-0.5 ${
                  selectedStatus === tab
                    ? "bg-brand-200 text-brand-100"
                    : "border-brand-200 bg-white"
                }`}
                onClick={() => setSelectedStatus(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

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
          buttonClassName="bg-neutral-900 text-brand-200"
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
