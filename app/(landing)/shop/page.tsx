"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import { cakeProducts1 } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ArrowDown2, Shuffle } from "iconsax-react";
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
import { IProduct } from "@/interfaces/product.interface";

let itemsPerPage = 6;

const ShopPage = () => {
  const [cakes, setCakes] = useState<any[]>(addSlugToCakes(cakeProducts1));
  const [query, setQuery] = useState<any>();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const cakesProducts = addSlugToCakes(cakeProducts1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [cat, setCat] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const startIndex =
    totalProducts === 0 ? 0 : (currentPageIndex - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);
  const allProduct = useUserPdctStore((state) => state.allProducts);

  const { favorites } = useSavedItems();

  const { isPending, pages, allProducts } = useProducts(
    currentPageIndex,
    itemsPerPage,
  );

  console.log("from shop page", allProduct)

  useEffect(() => {
    if (pages) {
      setTotalPages(pages);
    }
  }, [pages]);

  useEffect(() => {
    if (allProducts) {
      setTotalProducts(allProducts);
    }
  }, [allProducts]);

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  const min = () => {
    if (Array.isArray(cakes)) {
      const cakeMinPrices = cakes?.map((s: any) => s?.minPrice);
      return Math.trunc(Math?.min(...cakeMinPrices));
    }
    return 0;
  };

  const max = () => {
    if (Array.isArray(cakes)) {
      const cakeMaxPrices = cakes?.map((s: any) => s?.maxPrice);
      return Math.trunc(Math?.max(...cakeMaxPrices));
    }
    return 100;
  };

  const handleFilter = () => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const category = searchParams.get("cat") || "";
    const subcategory = searchParams.get("sub");
    setCat(category);

    console.log("Category:", category, "Subcategory:", subcategory);
    setCakes(
      cakes?.filter((cake: any) =>
        selectedOptions?.includes(cake?.subcategory?.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (cat) {
      const cate = addSlugToCakes(cakeProducts1)?.filter(
        (product: any) => product?.category?.toLowerCase() === cat,
      );
      setCakes((prevCakes) =>
        JSON.stringify(prevCakes) !== JSON.stringify(cate) ? cate : prevCakes,
      );
    } else {
      setCakes((prevCakes) =>
        JSON.stringify(prevCakes) !== JSON.stringify(cakesProducts)
          ? cakesProducts
          : prevCakes,
      );
    }
  }, [cat, cakesProducts]);

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   console.log("window is", window.location.search);
  //   const searchParams = new URLSearchParams(queryString);
  //   // setQuery({ cat: searchParams.get("cat"), sub: searchParams.get("sub") });
  //   const category = searchParams.get("cat");
  //   const subcategory = searchParams.get("sub");
  //   // setQuery(category ? category : "");
  //   setQuery({ cat: category, sub: subcategory });
  //   console.log(
  //     queryString,
  //     "query",
  //     searchParams.get("cat"),
  //     searchParams.get("sub"),
  //     "category", category,
  //     "subcategory", subcategory,
  //   );
  // }, [setQuery]);

  return (
    <>
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
                    {" "}
                    {/* {"" ? captalizedName("") : "All Cakes"} */}
                    {cat ? captalizedName(cat) : "All Cakes"}
                    {/* {cat} */}
                  </h3>
                  {/* MOBILE PRODUCT DISPLAY */}
                  <span className="text-sm text-neutral-500 lg:text-base">
                    Showing {startIndex} - {endIndex} of {totalProducts} results
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
              <div className="xl:hidden">
                {isPending && allProduct.length === 0 && <ShopPageSkeleton />}
              </div>

              <div className="grid gap-8 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:hidden">
                {allProduct.length > 0 && (
                  <EachElement
                    of={allProduct}
                    render={(item: IProduct) => {
                      return <ProductCard data={item} key={item._id} />;
                    }}
                  />
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
                    min={min()}
                    max={max()}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    onFilter={handleFilter}
                    category={query?.cat}
                    subcategory={query?.sub}
                  />
                </div>
                <div className="w-full bg-white p-4">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%]">
                    <div className="items-center justify-between lg:flex">
                      <h3 className="text-2xl font-bold text-black">
                        {" "}
                        {/* {query?.cat ? captalizedName(query?.cat) : "All Cakes"} */}
                        {cat ? captalizedName(cat) : "All Cakes"}
                      </h3>
                      <span className="text-sm text-neutral-500 lg:text-base">
                        Showing {startIndex} - {endIndex} of {totalProducts}{" "}
                        results
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

                  {isPending && allProduct.length === 0 && <ShopPageSkeleton />}

                  <div className="grid grid-cols-3 gap-5">
                    {allProduct.length > 0 && (
                      <EachElement
                        of={allProduct}
                        render={(item: any) => {
                          return <ProductCard data={item} key={item._id} />;
                        }}
                      />
                    )}
                  </div>

                  {cakes?.length < 1 && (
                    <div className="">No cake products found</div>
                  )}

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
              data={cakes}
              className="xl:hidden"
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            >
              <FilterComp
                min={min()}
                max={max()}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                onFilter={handleFilter}
                category={query?.cat}
                subcategory={query?.sub}
              />
            </FilterSidebar>
          </div>
        </section>
      </>
    </>
  );
};

export default ShopPage;
