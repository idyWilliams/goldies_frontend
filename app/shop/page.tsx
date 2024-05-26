"use client";
import Image, { StaticImageData } from "next/image";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";

import Layout from "../../components/Layout";
import { BsDash, BsPlus, BsX } from "react-icons/bs";
import { cakeProducts1 } from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ArrowDown2, Shuffle } from "iconsax-react";
import FilterComp from "@/components/custom-filter/FilterComp";
import { MdOutlineList } from "react-icons/md";
import { IoList } from "react-icons/io5";
import FilterSidebar from "@/components/custom-filter/FilterSideBar";
import { chunkArray } from "@/utils/helpers/chunkArray";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

let itemsPerPage = 6;

const ShopPage = ({ params }: any) => {
  const [cakes, setCakes] = useState(addSlugToCakes(cakeProducts1));
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  // const cakes = addSlugToCakes(cakeProducts1);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
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
        <section className="relative px-4 py-6 xl:bg-neutral-100">
          <div className="container mx-auto">
            <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%] xl:hidden">
              <div className="items-center justify-between lg:flex">
                <h3 className="text-2xl font-bold text-black">All Cakes</h3>
                <span className="text-sm text-neutral-500 lg:text-base">
                  Showing 1 - 20 of 2 results
                </span>
              </div>

              {/* MOBILE FILTER BUTTON FOR FILTER OVERLAY */}
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

            {/* DESKTOP PRODUCT DISPLAY */}
            <div className="hidden xl:grid xl:grid-cols-[300px_1fr] xl:items-start xl:gap-2">
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
                <FilterComp />
              </div>
              <div className="w-full bg-white p-4">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-400 pb-4 lg:grid lg:grid-cols-[85%_10%]">
                  <div className="items-center justify-between lg:flex">
                    <h3 className="text-2xl font-bold text-black">All Cakes</h3>
                    <span className="text-sm text-neutral-500 lg:text-base">
                      Showing 1 - 20 of 2 results
                    </span>
                  </div>
                  <div
                    // onClick={() => setShowFilter(true)}
                    className="hidden cursor-pointer items-center justify-center gap-3 border border-black p-2 xl:inline-flex"
                  >
                    <span>Sort</span>
                    <span>
                      <ArrowDown2 size={20} />
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
                    (cake: any, index: any) => {
                      return (
                        <div
                          data-aos="fade-down"
                          data-aos-delay={index * 200}
                          key={index}
                          className="flex w-full flex-col items-center"
                        >
                          <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                            <Image
                              src={cake.imageUrl}
                              alt={cake.name}
                              className="mx-auto h-full w-full object-cover"
                            />
                          </figure>

                          <h3 className="mt-3 text-xl font-bold capitalize">
                            {cake.name}
                          </h3>
                          <span className="text-lg">
                            &euro;{cake.minPrice} - &euro;{cake.maxPrice}
                          </span>
                          <Link
                            href={`/shop/${cake.slug}`}
                            className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                          >
                            Select Option
                          </Link>
                        </div>
                      );
                    },
                  )}
                </div>
                <div className="mt-10 flex items-center justify-center    gap-1 bg-white px-4 py-3 sm:px-6">
                  <button
                    onClick={() =>
                      currentPageIndex !== 1
                        ? setCurrentPageIndex(currentPageIndex - 1)
                        : null
                    }
                    className={
                      (currentPageIndex === 1 ? "no-item" : "") +
                      " rounded-l-lg border  border-[#A2A2A2] hover:bg-[#A2A2A2]  hover:text-white "
                    }
                  >
                    <RxCaretLeft size={22} />
                  </button>
                  <div className="pagination flex items-center gap-1">
                    {chunkArray(cakes, itemsPerPage).map((_, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentPageIndex(index + 1)}
                          className={` border   border-[#A2A2A2]  ${
                            currentPageIndex === index + 1
                              ? "active-page-index    rounded-lg border-[#197B30] bg-[#3b554115] text-[#197B30]"
                              : "rounded-lg border-[#A2A2A2]  text-[#A2A2A2] hover:bg-slate-100"
                          }`}
                        >
                          <span className="px-1.5 text-sm">{index + 1}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      currentPageIndex !== chunkArray(cakes, itemsPerPage).length
                        ? setCurrentPageIndex(currentPageIndex + 1)
                        : null
                    }
                    className={
                      (currentPageIndex ===
                      chunkArray(cakes, itemsPerPage).length
                        ? "no-items"
                        : "") +
                      " rounded-r-lg border  border-[#A2A2A2] hover:bg-[#A2A2A2]  hover:text-white"
                    }
                  >
                    <span className="">
                      <RxCaretRight size={22} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3 xl:hidden">
              {cakes.map((cake: any, index: number) => (
                <div
                  data-aos="fade-down"
                  data-aos-delay={index * 200}
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.imageUrl}
                      alt={cake.name}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize">
                    {cake.name}
                  </h3>
                  <span className="text-lg">
                    &euro;{cake.minPrice} - &euro;{cake.maxPrice}
                  </span>
                  <Link
                    href={`/shop/${cake.slug}`}
                    className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                  >
                    Select Option
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* FILTER SIDEBAR COMP */}
          <FilterSidebar
            className="xl:hidden"
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        </section>

        {/* CAKE PRODUCT LIST 1 */}
        <section className="hidden py-16 pt-3">
          <div className="wrapper">
            <h3
              data-aos="fade-down"
              className="mb-6 mt-4 text-2xl font-bold text-black "
            >
              All Cakes
            </h3>
            <div className="flex">
              <h3>All Cakes</h3>
              <span>Showing 1-20 of 2 results</span>
              <span>Sort by:</span>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
              {cakes.map((cake: any, index: number) => (
                <div
                  data-aos="fade-down"
                  data-aos-delay={index * 200}
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.imageUrl}
                      alt={cake.name}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize">
                    {cake.name}
                  </h3>
                  <span className="text-lg">
                    &euro;{cake.minPrice} - &euro;{cake.maxPrice}
                  </span>
                  <Link
                    href={`/shop/${cake.slug}`}
                    className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                  >
                    Select Option
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ShopPage;
