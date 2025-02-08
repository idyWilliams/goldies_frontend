"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import { cakeProducts1 } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Add, ArrowDown2, Minus, Shuffle } from "iconsax-react";
import FilterComp from "@/components/custom-filter/FilterComp";
import { IoList } from "react-icons/io5";
import FilterSidebar from "@/components/custom-filter/FilterSideBar";

import ProductCard from "@/components/shop-components/ProductCard";
import { captalizedName } from "@/helper/nameFormat";
import EachElement from "@/helper/EachElement";
import useProducts from "@/services/hooks/products/useProducts";
import AdminPagination from "@/components/admin-component/AdminPagination";
import ShopPageSkeleton from "@/components/shop-components/ShopPageSkeleton";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import useUserPdctStore from "@/zustand/userProductStore/store";
import {
  IProduct,
  ISubCategory,
  ProductParams,
  UCategory,
} from "@/interfaces/product.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RangeInput from "@/components/custom-filter/RangeInput";
import Checkbox from "@/components/custom-filter/Checkbox";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/hooks/category";

let itemsPerPage = 2;

const ShopPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [showFilter, setShowFilter] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [categories, setCategories] = useState<UCategory[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const queryCat = searchParams.get("cat")
    ? decodeURIComponent(searchParams.get("cat")!)
    : null;
  const querySubCat = searchParams.get("sub")
    ? decodeURIComponent(searchParams.get("sub")!)
    : null;
  const querySubCatId = searchParams.get("subCategoryIds");
  const queryMinPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : null;
  const queryMaxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : null;

  const {
    data: categoryData,
    isPending: loadingCat,
    isSuccess,
  } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["all categories"],
  });

  useEffect(() => {
    if (!loadingCat && isSuccess && categoryData?.categories) {
      setCategories(categoryData?.categories);
      setOpenIndexes(categories.map((_, index) => index)); // Open all initially
    }
  }, [loadingCat, isSuccess, categoryData, categories]);

  const [params, setParams] = useState<ProductParams>({
    page: currentPageIndex,
    limit: itemsPerPage,
  });

  useEffect(() => {
    const newParams: ProductParams = {
      page: currentPageIndex,
      limit: itemsPerPage,
    };

    if (querySubCatId) {
      newParams.subCategoryIds = querySubCatId;
    }

    if (queryMinPrice !== null && !isNaN(queryMinPrice)) {
      newParams.minPrice = queryMinPrice;
    }

    if (queryMaxPrice !== null && !isNaN(queryMaxPrice)) {
      newParams.maxPrice = queryMaxPrice;
    }

    // Update URL with new page using router
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPageIndex.toString());
    router.push(`${pathname}?${currentParams.toString()}`);

    setParams(newParams); // Update params state when URL changes
  }, [
    querySubCatId,
    queryMinPrice,
    queryMaxPrice,
    currentPageIndex,
    pathname,
    router,
    searchParams,
  ]);

  const {
    isPending,
    totalPages,
    totalProducts,
    products: allProducts,
  } = useProducts(params);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  const handleClick = (index: number) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Remove if already open
          : [...prev, index], // Add if not open
    );
  };

  const handleRangeChange = (newMin: number, newMax: number) => {
    setMinPrice(newMin);
    setMaxPrice(newMax);
  };

  const handleSelectedItem = (id: string, isChecked: boolean) => {
    setSelectedIds((prev) => {
      const updatedSet = new Set(prev);
      if (isChecked) {
        updatedSet.add(id);
      } else {
        updatedSet.delete(id);
      }
      return new Set(updatedSet); // Ensures re-render
    });
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedIds.size > 0) {
      params.set("subCategoryIds", Array.from(selectedIds).join(","));
    } else {
      params.delete("subCategoryIds");
    }

    // Only set price parameters if they differ from the default values
    if (minPrice > 0) {
      params.set("minPrice", String(minPrice));
    } else {
      params.delete("minPrice");
    }

    if (maxPrice < 1000) {
      params.set("maxPrice", String(maxPrice));
    } else {
      params.delete("maxPrice");
    }

    // Reset to page 1 on filter change
    params.set("page", "1");
    setCurrentPageIndex(1);

    router.push(`${pathname}?${params.toString()}`);

    setParams({
      page: 1,
      limit: itemsPerPage,
      subCategoryIds:
        selectedIds.size > 0 ? Array.from(selectedIds).join(",") : undefined,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 1000 ? maxPrice : undefined,
    });
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedIds(new Set());
    router.push(pathname); // Reset URL params
  };

  return (
    <>
      {/* BREADCRUMBS */}
      <div className="bg-black pb-4 pt-20 lg:pt-[96px]">
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
            ]}
          />
        </div>
      </div>

      <section className="relative py-6 xl:bg-neutral-100">
        <div className="wrapper">
          <div className="mx-auto w-full">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%] xl:hidden">
              <div className="items-center justify-between lg:flex">
                <h3 className="text-2xl font-bold text-black">
                  {queryCat ? captalizedName(queryCat) : "All Cakes"}
                </h3>
                {/* MOBILE PRODUCT DISPLAY */}
                <span className="text-sm text-neutral-500 lg:text-base">
                  Showing {allProducts.length} of {totalProducts} results
                </span>
              </div>
              <div
                onClick={() => setShowFilter(true)}
                className="inline-flex cursor-pointer items-center gap-3 border border-black p-2 xl:hidden"
              >
                <span>Filter</span>
                <span>
                  <Shuffle size={20} />
                </span>
              </div>
            </div>
            <div className="xl:hidden">{isPending && <ShopPageSkeleton />}</div>

            <div className="grid gap-8 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:hidden">
              {allProducts.length > 0 ? (
                <EachElement
                  of={allProducts}
                  render={(item: IProduct) => {
                    return <ProductCard data={item} key={item._id} />;
                  }}
                />
              ) : (
                <div className="col-span-full flex flex-col items-center text-center">
                  <p className="mt-4 text-lg font-semibold text-gray-600">
                    No products found
                  </p>
                </div>
              )}
            </div>

            <div className="xl:hidden">
              {totalPages > 1 && (
                <AdminPagination
                  totalPage={totalPages}
                  page={currentPageIndex}
                  setPage={setCurrentPageIndex}
                />
              )}
            </div>

            {/* DESKTOP PRODUCT DISPLAY */}
            <div className="hidden xl:grid xl:grid-cols-[300px_1fr] xl:items-start xl:gap-5">
              <div className="w-full bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-2 text-neutral-500">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <span>
                      <IoList size={20} />
                    </span>
                    Filter
                  </span>
                </div>

                <FilterComp
                  isPending={isPending}
                  categories={categories}
                  openIndexes={openIndexes}
                  handleClick={handleClick}
                  selectedIds={selectedIds}
                  handleSelectedItem={handleSelectedItem}
                  handleRangeChange={handleRangeChange}
                  applyFilter={applyFilter}
                  handleReset={handleReset}
                />
              </div>

              {/* product grid */}
              <div className="w-full bg-white p-4">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%]">
                  <div className="items-center justify-between lg:flex">
                    <h3 className="text-2xl font-bold text-black">
                      {" "}
                      {/* {query?.cat ? captalizedName(query?.cat) : "All Cakes"} */}
                      {queryCat ? captalizedName(queryCat) : "All Cakes"}
                    </h3>
                    <span className="text-sm text-neutral-500 lg:text-base">
                      Showing {allProducts.length} of {totalProducts} results
                    </span>
                  </div>
                  <div
                    // onClick={() => setShowFilter(true)}
                    className="hidden cursor-pointer items-center justify-center gap-3 border border-black border-opacity-10 bg-neutral-50 p-2 xl:inline-flex"
                  >
                    <span>Sort</span>
                    <span>
                      <ArrowDown2 size={20} />
                    </span>
                  </div>
                </div>

                {isPending && <ShopPageSkeleton />}

                <div className="grid grid-cols-3 gap-5">
                  {allProducts.length > 0 ? (
                    <EachElement
                      of={allProducts}
                      render={(item: any) => {
                        return <ProductCard data={item} key={item._id} />;
                      }}
                    />
                  ) : (
                    <div className="col-span-full flex flex-col items-center text-center">
                      <p className="mt-4 text-lg font-semibold text-gray-600">
                        No products found
                      </p>
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <AdminPagination
                    totalPage={totalPages}
                    page={currentPageIndex}
                    setPage={setCurrentPageIndex}
                  />
                )}
              </div>
            </div>
          </div>

          {/* FILTER SIDEBAR COMP */}
          <FilterSidebar
            className="xl:hidden"
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          >
            <FilterComp
              isPending={isPending}
              categories={categories}
              openIndexes={openIndexes}
              handleClick={handleClick}
              selectedIds={selectedIds}
              handleSelectedItem={handleSelectedItem}
              handleRangeChange={handleRangeChange}
              applyFilter={applyFilter}
              handleReset={handleReset}
              onClose={()=> setShowFilter(false)}
            />
          </FilterSidebar>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
