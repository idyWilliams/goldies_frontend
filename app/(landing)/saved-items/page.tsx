"use client";

import ProductCard from "@/components/shop-components/ProductCard";
import Pagination from "@/components/custom-filter/Pagination";
import { addSlugToCakes } from "@/helper";
import { chunkArray } from "@/helper/chunkArray";
import { cakeProducts1, savedItems } from "@/utils/cakeData";
import React, { useEffect, useState } from "react";
import useUserPdctStore from "@/zustand/userProductStore/store";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import EachElement from "@/helper/EachElement";
import AdminPagination from "@/components/admin-component/AdminPagination";
import ShopPageSkeleton from "@/components/shop-components/ShopPageSkeleton";
import ProductCardSkeleton from "@/components/shop-components/ProductCardSkeleton";

let itemsPerPage = 2;

const Page = () => {
  const favProducts = useUserPdctStore((state) => state.favProducts);
  console.log(favProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(
    favProducts.length,
  );
  const favProductChunks = chunkArray(favProducts, itemsPerPage);
  console.log(favProductChunks);
  const [currentData, setCurrentData] = useState<any[] | null>(null);

  const { favorites, isPending } = useSavedItems();

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  useEffect(() => {
    if (favProducts) {
      setTotalProducts(favProducts.length);
      const favProductChunks = chunkArray(favProducts, itemsPerPage);
      setCurrentData(favProductChunks[currentPageIndex - 1]);
      setTotalPages(favProductChunks.length);
    }
  }, [currentPageIndex, favProducts]);

  const [cakes, setCakes] = useState<any[]>(addSlugToCakes(savedItems));

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

        {isPending && !currentData && <ShopPageSkeleton />}

        <div className="grid justify-items-end gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
            (cake: any, index: any) => {
              return index <= 5 ? (
                <ProductCard data={cake} key={index} />
              ) : null;
            },
          )} */}

          {currentData && (
            <EachElement
              of={currentData}
              render={(item: any) => {
                return <ProductCard data={item} key={item._id} />;
              }}
            />
          )}
        </div>
        {totalPages > 1 && (
          <AdminPagination
            totalPage={totalPages}
            page={currentPageIndex}
            setPage={setCurrentPageIndex}
          />
        )}
        {/* <Pagination
          className=""
          onNext={handleNext}
          onPrev={handlePrev}
          onPaginateClick={handlePaginateClick}
          itemsPerPage={itemsPerPage}
          currentPageIndex={currentPageIndex}
          arr={cakes}
        /> */}
      </section>
    </>
  );
};

export default Page;
