"use client";
import Image, { StaticImageData } from "next/image";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import { BsDash, BsPlus, BsX } from "react-icons/bs";
import { cakeProducts1 } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ArrowDown2, Shuffle } from "iconsax-react";
import FilterComp from "@/components/custom-filter/FilterComp";
import { IoList } from "react-icons/io5";
import FilterSidebar from "@/components/custom-filter/FilterSideBar";
import { chunkArray } from "@/helper/chunkArray";
import Pagination from "@/components/custom-filter/Pagination";
import ProductCard from "@/components/shop-components/ProductCard";
import { captalizedName } from "@/helper/nameFormat";

let itemsPerPage = 6;

const ShopPage = () => {
  const [cakes, setCakes] = useState<any[]>(addSlugToCakes(cakeProducts1));
  const [query, setQuery] = useState<any>();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([
    "Birthday Cakes",
  ]);

  const handleNext = () => {
    if (currentPageIndex !== chunkArray(cakes, itemsPerPage).length) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const handlePaginateClick = (index: number) => {
    setCurrentPageIndex(index + 1);
    window.scroll(0, 0);
  };

  const handlePrev = () => {
    if (currentPageIndex !== 1) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const min = () => {
    if (Array.isArray(cakes)) {
      const cakeMinPrices = cakes?.map((s: any) => s?.minPrice);
      return Math.trunc(Math?.min(...cakeMinPrices));
    }
    return 0; // or any default value
  };

  const max = () => {
    if (Array.isArray(cakes)) {
      const cakeMaxPrices = cakes?.map((s: any) => s?.maxPrice);
      return Math.trunc(Math?.max(...cakeMaxPrices));
    }
    return 100; // or any default value
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  console.log("currentPage", query);

  useEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    setQuery({ cat: searchParams.get("cat"), sub: searchParams.get("sub") });

    console.log(
      queryString,
      "query",
      searchParams.get("cat"),
      searchParams.get("sub"),
    );
  }, []);

  return (
    <>
      <Layout>
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
                    {"" ? captalizedName("") : "All Cakes"}
                  </h3>
                  <span className="text-sm text-neutral-500 lg:text-base">
                    Showing {currentPageIndex} - {itemsPerPage} of{" "}
                    {cakes?.length} results
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

              <div className="grid gap-8 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:hidden">
                {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
                  (cake: any, index: any) => {
                    return <ProductCard data={cake} key={index} />;
                  },
                )}
              </div>

              <Pagination
                className="lg:hidden"
                onNext={handleNext}
                onPrev={handlePrev}
                onPaginateClick={handlePaginateClick}
                itemsPerPage={itemsPerPage}
                currentPageIndex={currentPageIndex}
                arr={cakes}
              />

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

                    <span
                      className="cursor-pointer"
                      onClick={() => setShowFilter(false)}
                    >
                      <BsX size={24} />
                    </span>
                  </div>
                  <FilterComp
                    min={min()}
                    max={max()}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    category={query?.cat}
                    subcategory={query?.sub}
                  />
                </div>
                <div className="w-full bg-white p-4">
                  <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%]">
                    <div className="items-center justify-between lg:flex">
                      <h3 className="text-2xl font-bold text-black">
                        {" "}
                        {query?.cat ? captalizedName(query?.cat) : "All Cakes"}
                      </h3>
                      <span className="text-sm text-neutral-500 lg:text-base">
                        Showing {currentPageIndex} - {itemsPerPage} of{" "}
                        {cakes?.length} results
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
                  <div className="grid grid-cols-3 gap-5">
                    {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
                      (cake: any, index: any) => {
                        return <ProductCard data={cake} key={index} />;
                      },
                    )}
                  </div>

                  {cakes?.length < 1 && (
                    <div className="">No cake products found</div>
                  )}
                  {cakes?.length >= 1 && (
                    <Pagination
                      onNext={handleNext}
                      onPrev={handlePrev}
                      onPaginateClick={handlePaginateClick}
                      itemsPerPage={itemsPerPage}
                      currentPageIndex={currentPageIndex}
                      arr={cakes}
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
                category={query?.cat}
                subcategory={query?.sub}
              />
            </FilterSidebar>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ShopPage;
