"use client";

import ProductCard from "@/components/shop-components/ProductCard";
import Pagination from "@/components/custom-filter/Pagination";
import { addSlugToCakes } from "@/helper";
import { chunkArray } from "@/helper/chunkArray";
import { cakeProducts1, savedItems } from "@/utils/cakeData";
import React, { useState } from "react";
import useUserPdctStore from "@/zustand/userProductStore/store";

const Page = () => {
  let itemsPerPage = 6;
  const favProducts = useUserPdctStore((state) => state.favProducts);
  console.log(favProducts);

  const [cakes, setCakes] = useState<any[]>(addSlugToCakes(savedItems));
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

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

  return (
    <>
      <section className="wrapper pb-10">
        <div className="mt-[65px] lg:mt-20"></div>
        <div className="py-8">
          <h2 className="text-center text-2xl font-bold">Favourite Products</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
            (cake: any, index: any) => {
              return index <= 5 ? (
                <ProductCard data={cake} key={index} />
              ) : null;
            },
          )}
        </div>
        <Pagination
          className=""
          onNext={handleNext}
          onPrev={handlePrev}
          onPaginateClick={handlePaginateClick}
          itemsPerPage={itemsPerPage}
          currentPageIndex={currentPageIndex}
          arr={cakes}
        />
      </section>
    </>
  );
};

export default Page;
